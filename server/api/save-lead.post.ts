import { savePayment } from "../services/payment.service";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, email, mobile, state, city, form_type, form_id, action,source,commingAmount } = body;

    const intentId = `intent_${form_id || Date.now()}`;
    console.log("[LEAD][click] CTA clicked — saving lead", {
        action, name, email, mobile, state, city, form_type, form_id,
        intent_id: intentId, timestamp: new Date().toISOString()
    });

    try {
        const config = useRuntimeConfig(event);
        const amount = Number(commingAmount || config.cashfreePaymentAmount || process.env.CASHFREE_PAYMENT_AMOUNT || 1475);

        const isReattempt = body.payment_type === 'reattempt' || body.re_attempt_status === true || body.reAttemptStatus === true;

        const leadPayload = {
            re_attempt_status: isReattempt,
            student_id: null,
            form_type: form_type || null,
            form_id: form_id || null,
            razorpay_order_id: intentId,
            razorpay_payment_id: 'N/A',
            razorpay_signature: 'N/A',
            amount,
            currency: 'INR',
            status: 'initiated',
            response: JSON.stringify({
                source: "cta_click", action,
                name, email, mobile, state, city,
                timestamp: new Date().toISOString()
            }),
            source: source || 1,
        };

        let id = null;
        if (isReattempt) {
            // ── Call external API if reattempt ────────────────────────────────────
            try {
                const apiBase = process.env.NUXT_PUBLIC_API_BASE;
                const authHeader = getHeader(event, 'authorization');
                const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                if (authHeader) headers['Authorization'] = authHeader;

                await $fetch(`${apiBase}/api/students/create_student_payment/`, {
                    method: 'POST',
                    headers,
                    body: leadPayload
                });
                console.log(`[LEAD][save] Reattempt lead successfully sent to external API.`);
            } catch (apiError: any) {
                console.error(`[LEAD][save] Reattempt API call failed:`, apiError?.message || apiError);
            }
        } else {
            // Only save to local DB if not reattempt
            id = await savePayment(leadPayload);
        }

        console.log("[LEAD][click] Lead saved to DB", {
            db_id: id, intent_id: intentId, form_id,
            action, email, timestamp: new Date().toISOString()
        });

        return { success: true };

    } catch (error: any) {
        console.error("[LEAD][click] ERROR — Failed to save lead", {
            intent_id: intentId, form_id,
            error_message: error?.message || error,
            timestamp: new Date().toISOString()
        });
        return { success: false };
    }
});
