// ── Cashfree Webhook Handler ───────────────────────────────────────────────────
// Register this URL in your Cashfree Merchant Dashboard:
//   Dashboard → Developers → Webhooks → Add New Webhook
//   URL: https://yourdomain.com/api/cashfree-webhook
//
// Required env var:
//   CASHFREE_WEBHOOK_SECRET  (copy the secret from the webhook settings page)
//
// Why this is needed:
//   When a user's internet drops, browser crashes, or they close the tab
//   mid-payment, the /complete-payment browser callback never fires.
//   Cashfree calls THIS endpoint directly from their servers, ensuring
//   every successful payment is captured even if the browser fails.
// ──────────────────────────────────────────────────────────────────────────────

import crypto from "crypto";
import { savePayment } from "../services/payment.service";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);

    // ── 1. Read RAW body (required for HMAC verification) ────────────────────
    const rawBody = await readRawBody(event);
    if (!rawBody) {
        console.warn("[WEBHOOK][cashfree] Empty body received");
        return { success: false };
    }

    // ── 2. Verify Cashfree webhook signature ──────────────────────────────────
    // NEVER skip this — without it anyone can fake a payment success.
    const webhookSecret = config.cashfreeWebhookSecret || process.env.CASHFREE_WEBHOOK_SECRET || "";
    if (!webhookSecret) {
        console.error("[WEBHOOK][cashfree] ❌ CASHFREE_WEBHOOK_SECRET is not set!");
        return { success: false, message: "Webhook secret not configured" };
    }

    const timestamp = getHeader(event, "x-webhook-timestamp") || "";
    const receivedSig = getHeader(event, "x-webhook-signature") || "";

    // Cashfree signature algorithm: HMAC-SHA256(timestamp + rawBody, secret) → base64
    const expectedSig = crypto
        .createHmac("sha256", webhookSecret)
        .update(timestamp + rawBody)
        .digest("base64");

    if (receivedSig !== expectedSig) {
        console.error("[WEBHOOK][cashfree] ⚠️  Signature mismatch — possible spoofing attempt!");
        // Return 200 so Cashfree does not keep retrying (but do NOT process it)
        return { success: false, message: "Signature verification failed" };
    }

    console.log("[WEBHOOK][cashfree] ✅ Signature verified");

    // ── 3. Parse payload ──────────────────────────────────────────────────────
    let payload: any;
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return { success: false, message: "Invalid JSON" };
    }

    const eventType: string = payload?.type || "";
    const data = payload?.data || {};
    const orderData = data?.order || {};
    const paymentData = data?.payment || {};
    const customerData = data?.customer_details || {};
    const orderTags = orderData?.order_tags || {};

    const cfOrderId: string = orderData?.order_id || "";
    const cfPaymentId: string = String(paymentData?.cf_payment_id || "N/A");
    const paymentStatus = paymentData?.payment_status || "";
    const amount: number = Number(paymentData?.payment_amount || orderData?.order_amount || 0);
    const currency: string = orderData?.order_currency || "INR";
    const formType = orderTags?.form_type || null;
    const formId = orderTags?.form_id || null;
    const source = orderTags?.source ? parseInt(String(orderTags.source)) : 1;
    const city = orderTags?.city || "";
    const state = orderTags?.state || "";
    const userName = customerData?.customer_name || "";
    const userEmail = customerData?.customer_email || "";
    const userMobile = customerData?.customer_phone || "";

    console.log(`\n====== [WEBHOOK][cashfree] ======`);
    console.log(`Event    : ${eventType}`);
    console.log(`Order    : ${cfOrderId}`);
    console.log(`Payment  : ${cfPaymentId}`);
    console.log(`Status   : ${paymentStatus}`);
    console.log(`Amount   : ${amount} ${currency}`);
    console.log(`=================================\n`);

    // ── 4. PAYMENT_SUCCESS ───────────────────────────────────────────────────
    if (eventType === "PAYMENT_SUCCESS" || paymentStatus === "SUCCESS") {
        console.log(`[WEBHOOK][cashfree] 💰 Processing success for order: ${cfOrderId}`);

        // Mirror fee-waiver logic from complete-payment.post.ts
        const baseAmount = Number(config.paymentAmount || 1475);
        let feeWaiverCategory = "No Waiver";
        if (amount === 1 || amount === 0 || amount === 2) {
            feeWaiverCategory = "Free of cost (FOC)";
        } else if (amount < baseAmount) {
            const pct = Math.round(((baseAmount - amount) / baseAmount) * 100);
            feeWaiverCategory = `${pct}% Fee Waiver`;
        }

        const paymentPayload = {
            re_attempt_status: false,
            student_id: formId,
            form_type: formType || 1,
            form_id: formId,
            razorpay_order_id: cfOrderId,
            razorpay_payment_id: cfPaymentId,
            razorpay_signature: "cashfree_webhook_verified",
            amount,
            currency,
            status: "success",
            response: JSON.stringify({
                order_id: cfOrderId,
                payment_id: cfPaymentId,
                gateway: "cashfree",
                event_type: eventType,
                source_channel: "webhook",
                name: userName, email: userEmail, mobile: userMobile,
                city, state,
                timestamp: new Date().toISOString()
            }),
            source: source || 1,
            fee_waiver_category: feeWaiverCategory
        };

        try {
            const isReattempt = orderTags?.payment_type === "reattempt";

            if (isReattempt) {
                const apiBase = process.env.NUXT_PUBLIC_API_BASE;
                await $fetch(`${apiBase}/api/students/create_student_payment/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: paymentPayload
                });
                console.log(`[WEBHOOK][cashfree] ✅ Reattempt saved to external API: ${cfOrderId}`);
            } else {
                const savedId = await savePayment(paymentPayload);
                console.log(`[WEBHOOK][cashfree] ✅ Saved to DB. ID: ${savedId} | Order: ${cfOrderId}`);
            }
        } catch (err: any) {
            console.error(`[WEBHOOK][cashfree] ❌ Save failed for order: ${cfOrderId} — ${err?.message}`);
            // IMPORTANT: still return 200. Returning 500 causes Cashfree to
            // retry the webhook endlessly, which would create duplicate records.
        }

        // Always return 200 to stop Cashfree retry loop
        return { success: true };

        // ── 5. PAYMENT_FAILED ─────────────────────────────────────────────────────
    } else if (eventType === "PAYMENT_FAILED" || paymentStatus === "FAILED") {
        console.log(`[WEBHOOK][cashfree] ❌ PAYMENT_FAILED for order: ${cfOrderId}`);

        try {
            await savePayment({
                re_attempt_status: false,
                student_id: formId,
                form_type: formType || 1,
                form_id: formId,
                razorpay_order_id: cfOrderId,
                razorpay_payment_id: cfPaymentId,
                razorpay_signature: "cashfree_webhook_verified",
                amount, currency,
                status: "failed",
                response: JSON.stringify({
                    order_id: cfOrderId,
                    payment_id: cfPaymentId,
                    gateway: "cashfree",
                    event_type: eventType,
                    source_channel: "webhook",
                    failure_reason: paymentData?.payment_message || "unknown",
                    timestamp: new Date().toISOString()
                }),
                source: source || 1,
                fee_waiver_category: "N/A"
            });
        } catch (e: any) {
            console.error(`[WEBHOOK][cashfree] Failed to log payment failure: ${e?.message}`);
        }

        return { success: true };

        // ── 6. PAYMENT_USER_DROPPED ───────────────────────────────────────────────
    } else if (eventType === "PAYMENT_USER_DROPPED") {
        console.log(`[WEBHOOK][cashfree] 🚶 USER_DROPPED for order: ${cfOrderId}`);
        return { success: true };

        // ── 7. Everything else — acknowledge and ignore ───────────────────────────
    } else {
        console.log(`[WEBHOOK][cashfree] Unhandled event type: ${eventType}`);
        return { success: true };
    }
});
