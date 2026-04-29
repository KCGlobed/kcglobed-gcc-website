// ── Unified Payment Failure ──────────────────────────────────────────────
import { createCashfreeInstance } from "../utils/cashfree";
import { createRazorpayInstance } from "../utils/razorpay";
import { savePayment } from "../services/payment.service";
import { sendPaymentFailureEmail } from "../services/email.service";

// Helper: extract form_id from order_id string (e.g. "cf_322_1772694830212" → "322")
function extractFormIdFromOrderId(orderId: string): string | null {
    const parts = orderId.split('_');
    if (parts.length >= 3) {
        const extracted = parts[1];
        if (extracted && extracted !== 'guest' && extracted !== 'null') return extracted;
    }
    return null;
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig(event);
    const activeGateway = config.paymentGateway || 'RAZORPAY';
    console.log(activeGateway,'---acitve gateway')
    // Accept either razorpay or cashfree fields, or a generic 'order_id'
    const orderId = body.razorpay_order_id || body.cf_order_id || body.order_id;
    const paymentId = body.razorpay_payment_id || body.cf_payment_id || body.payment_id;
    const re_attempt_status=body.re_attempt_status || false;
    if (!orderId) {
        console.error("[PAYMENT][failure] FAILED — Missing order_id in failure report", {
            event: "client_reported_failure",
            reason: "missing_order_id",
            timestamp: new Date().toISOString()
        });
        throw createError({ statusCode: 400, message: "Missing order ID" });
    }

    // --- LOG: Client Reported Failure (received) ---
    console.log("[PAYMENT][failure] Client reported a payment failure", {
        event: "client_reported_failure_received",
        gateway: activeGateway.toLowerCase(),
        order_id: orderId,
        payment_id: paymentId || null,
        error_code: body.error_code || null,
        error_description: body.error_description || null,
        timestamp: new Date().toISOString()
    });

    let userId: string | null = null;
    let formType: string | null = null;
    let formId: string | null = null;
    let userName = '';
    let userEmail = '';
    let userMobile = '';
    let city = '';
    let state = '';
    let commingAmount = body.commingAmount || null;
    let amount = Number(commingAmount || config.cashfreePaymentAmount || process.env.CASHFREE_PAYMENT_AMOUNT || 2950);
    let currency = 'INR';
    let source = 1;
    if (activeGateway === 'RAZORPAY') {
        try {
            const { instance: razorpay } = createRazorpayInstance(config);
            const orderRes = await razorpay.orders.fetch(orderId);
            amount = Number(orderRes.amount) / 100;
            currency = orderRes.currency;
            console.log(orderRes,'---order res')
            if (orderRes.notes) {
                userId = orderRes.notes.user_id ? String(orderRes.notes.user_id) : null;
                formType = orderRes.notes.form_type ? String(orderRes.notes.form_type) : null;
                formId = orderRes.notes.form_id ? String(orderRes.notes.form_id) : null;
                userName = orderRes.notes.name ? String(orderRes.notes.name) : '';
                userEmail = orderRes.notes.email ? String(orderRes.notes.email) : '';
                userMobile = orderRes.notes.mobile ? String(orderRes.notes.mobile) : '';
                city = orderRes.notes.city ? String(orderRes.notes.city) : '';
                state = orderRes.notes.state ? String(orderRes.notes.state) : '';
                source = orderRes.notes.source ? Number(orderRes.notes.source) : 1;
            }
        } catch (fetchError: any) {
            console.warn("[PAYMENT][failure] Could not fetch Razorpay order", fetchError.message);
        }
    } else {
        // DEFAULT: CASHFREE
        let cashfree: ReturnType<typeof createCashfreeInstance>["instance"] | null = null;
        try {
            const cf = createCashfreeInstance(config, event);
            cashfree = cf.instance;
        } catch (e: any) {
            console.warn("[PAYMENT][failure] Cashfree config error", e.message);
        }

        if (cashfree) {
            try {
                const orderRes = await cashfree.PGFetchOrder(orderId);
                const orderData = orderRes.data;

                amount = orderData.order_amount || amount;
                currency = orderData.order_currency || currency;

                if (orderData.order_tags) {
                    userId = orderData.order_tags.user_id || null;
                    formType = orderData.order_tags.form_type || null;
                    formId = orderData.order_tags.form_id || null;
                    city = orderData.order_tags.city || '';
                    state = orderData.order_tags.state || '';
                    source = orderData.order_tags.source ? parseInt(orderData.order_tags.source) : 1;
                }

                if (!formId) {
                    formId = extractFormIdFromOrderId(orderId);
                }

                if (orderData.customer_details) {
                    if (!userName) userName = orderData.customer_details.customer_name || '';
                    if (!userEmail) userEmail = orderData.customer_details.customer_email || '';
                    if (!userMobile) userMobile = orderData.customer_details.customer_phone || '';
                }

            } catch (fetchError: any) {
                console.warn("[PAYMENT][failure] Could not fetch Cashfree order", fetchError.message);
            }
        }
    }

    // ── Step 2: Always save the failure record to DB ──────────────────────────
    try {
        console.log(userName,userEmail,userMobile,city,'----All the details---')
        await savePayment({
            re_attempt_status,
            student_id: userId || null,
            form_type: formType || 1,
            form_id: formId,
            razorpay_order_id: orderId,
            razorpay_payment_id: paymentId || 'N/A',
            razorpay_signature: 'N/A',
            amount,
            currency,
            status: "failed",
            response: JSON.stringify({
                ...body,
                source: "client_report",
                gateway: activeGateway.toLowerCase(),
                name: userName,
                email: userEmail,
                mobile: userMobile,
                city: city,
                state: state
            }),
            source: source || 1
        });

        // --- LOG: Failure Recorded Successfully ---
        console.log("[PAYMENT][failure] RECORDED — Client failure saved to DB", {
            event: "client_reported_failure",
            status: "failed",
            gateway: activeGateway.toLowerCase(),
            order_id: orderId,
            payment_id: paymentId || 'N/A',
            user_id: userId, name: userName, email: userEmail,
            timestamp: new Date().toISOString()
        });

        // ── Step 3: Send Failure Email ───────────────────────────────────────────
        if (userEmail) {
            try {
                const siteUrl = config.public?.siteUrl || "https://www.gccschool.com";
                const paymentLink = `${siteUrl}`;
                await sendPaymentFailureEmail({
                    to: userEmail,
                    name: userName || 'Candidate',
                    paymentLink: paymentLink,
                    emailHost: config.emailHost || process.env.EMAIL_HOST || '',
                    emailUser: config.emailUser || process.env.EMAIL_HOST_USER || '',
                    emailPassword: config.emailPassword || process.env.EMAIL_HOST_PASSWORD || '',
                    emailPort: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
                    emailSecure: process.env.EMAIL_USE_SSL === 'True' || process.env.EMAIL_USE_SSL === 'true',
                    fromEmail: process.env.DEFAULT_FROM_EMAIL || process.env.EMAIL_HOST_USER || ''
                });
                console.log("[PAYMENT][failure] Sent failure email to", userEmail);
            } catch (emailErr: any) {
                console.error("[PAYMENT][failure] Failed to send failure email", emailErr.message);
            }
        }

        return { success: true, message: "Failure recorded" };

    } catch (saveError: any) {
        console.error("[PAYMENT][failure] ERROR — Could not save failure record to DB", {
            event: "client_report_save_error",
            order_id: orderId,
            payment_id: paymentId || null,
            error_message: saveError?.message || saveError,
            timestamp: new Date().toISOString()
        });
        return { success: false, message: saveError?.message };
    }
});
