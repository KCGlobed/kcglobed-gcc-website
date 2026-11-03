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


// {{GCC_Base_url}}/api/students/webhook_create_payment/
// {
//     "razorpay_order_id": "Vslqwertyuioi",
//     "razorpay_payment_id": "wertyuiopi",
//     "razorpay_signature": "qwerty uiopoiu ytrewq",
//     "amount": 20.0,
//     "currency": "INR",
//     "status": "success",
//     "response": {
//         "city": "Noida",
//         "name": "Atul Tevatia",
//         "email": "atul.tevatia@kcglobed.com",
//         "state": "Uttar Pradesh",
//         "mobile": "8979221212",
//         "gateway": "cashfree",
//         "order_id": "cf_170528_1774940319358",
//         "payment_id": "5114926747419"
//     }
// }

import crypto from "crypto";
import { savePayment } from "../services/payment.service";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig(event);

    // ── 1. Read RAW body (required for HMAC verification) ────────────────────
    // Always use the raw request body (the exact, unmodified payload)
    const rawBodyBuffer = await readRawBody(event);
    const rawBody = rawBodyBuffer ? rawBodyBuffer.toString() : "";

    if (!rawBody) {
        console.warn("[WEBHOOK][cashfree] Empty body received");
        return { success: false };
    }

    // ── 2. Verify Cashfree webhook signature ──────────────────────────────────
    const webhookSecret = config.cashfreeWebhookSecret || process.env.CASHFREE_WEBHOOK_SECRET || "";
    if (!webhookSecret) {
        console.error("[WEBHOOK][cashfree] ❌ CASHFREE_WEBHOOK_SECRET is not set!");
        return { success: false, message: "Webhook secret not configured" };
    }

    const timestamp = getHeader(event, "x-webhook-timestamp") || "";
    const receivedSig = getHeader(event, "x-webhook-signature") || "";

    // Generate HMAC-SHA256 hash using the secret key, timestamp and raw request body
    const expectedSig = crypto
        .createHmac("sha256", webhookSecret)
        .update(timestamp + rawBody)
        .digest("base64");

    if (expectedSig !== receivedSig) {
        console.error("[WEBHOOK][cashfree] ⚠️  Signature mismatch — possible spoofing attempt!");
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

    // ── Payment Links (Dashboard → Developers → Webhooks → Payment Links) ────
    // Link events have a different shape (data.link_*, data.order.transaction_*)
    // so they are handled separately.
    if (eventType === "PAYMENT_LINK_EVENT") {
        return handlePaymentLinkEvent(payload?.data || {}, config);
    }

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
            dossier_form_id: formId,
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
        console.log(`[WEBHOOK][cashfree] ✅ Payment payload: ${JSON.stringify(paymentPayload)}`);
        try {
            const isReattempt = orderTags?.payment_type === "reattempt";

            if (isReattempt) {
                const apiBase = process.env.NUXT_PUBLIC_API_BASE;
                await $fetch(`${apiBase}/api/students/webhook_create_payment/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: paymentPayload
                });
                console.log(`[WEBHOOK][cashfree] ✅ Reattempt saved to external API: ${cfOrderId}`);
            } else {
                const apiBase = process.env.NUXT_PUBLIC_API_BASE;
                
                // Send fresh payment to Django backend (which handles duplicate checking)
                try {
                    await $fetch(`${apiBase}/api/students/webhook_create_payment/`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: paymentPayload
                    });
                    console.log(`[WEBHOOK][cashfree] ✅ Sent to external API webhook_create_payment. Order: ${cfOrderId}`);
                } catch (apiError: any) {
                    console.error(`[WEBHOOK][cashfree] ⚠️ External API webhook_create_payment failed: ${apiError?.message}`);
                }

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


// Mirror fee-waiver logic from complete-payment.post.ts
function getFeeWaiverCategory(amount: number, config: any): string {
    const baseAmount = Number(config.paymentAmount || 1475);
    if (amount === 1 || amount === 0 || amount === 2) {
        return "Free of cost (FOC)";
    }
    if (amount < baseAmount) {
        const pct = Math.round(((baseAmount - amount) / baseAmount) * 100);
        return `${pct}% Fee Waiver`;
    }
    return "No Waiver";
}

// ── PAYMENT_LINK_EVENT ────────────────────────────────────────────────────────
// Payload shape:
//   data.link_id, data.link_status ("PAID" | "PARTIALLY_PAID" | ...),
//   data.customer_details, data.link_notes,
//   data.order.{order_id, order_amount, transaction_id, transaction_status}
//
// form_id / form_type / source / city / state / payment_type are read from
// link_notes. Add them as notes when creating the link, otherwise the payment
// reaches the backend without a student/form id.
async function handlePaymentLinkEvent(data: any, config: any) {
    const order = data?.order || {};
    const customer = data?.customer_details || {};
    const notes = data?.link_notes || {};

    const linkId: string = data?.link_id || "";
    const linkStatus: string = data?.link_status || "";
    const txnStatus: string = order?.transaction_status || "";
    const cfOrderId: string = order?.order_id || "";
    const cfPaymentId: string = String(order?.transaction_id || "N/A");
    const amount: number = Number(order?.order_amount || data?.link_amount_paid || 0);
    const currency: string = data?.link_currency || "INR";

    console.log(`\n====== [WEBHOOK][cashfree][link] ======`);
    console.log(`Link     : ${linkId} (${linkStatus})`);
    console.log(`Order    : ${cfOrderId}`);
    console.log(`Payment  : ${cfPaymentId}`);
    console.log(`Status   : ${txnStatus}`);
    console.log(`Amount   : ${amount} ${currency}`);
    console.log(`=======================================\n`);

    if (txnStatus !== "SUCCESS") {
        console.log(`[WEBHOOK][cashfree][link] Ignoring non-success event for link: ${linkId}`);
        return { success: true };
    }

    const formId = notes?.form_id || null;
    const formType = notes?.form_type ? parseInt(String(notes.form_type)) : 1;
    const source = notes?.source ? parseInt(String(notes.source)) : 1;

    if (!formId) {
        console.warn(`[WEBHOOK][cashfree][link] ⚠️ link_notes.form_id missing for link: ${linkId}`);
    }

    const paymentPayload = {
        re_attempt_status: notes?.payment_type === "reattempt",
        student_id: formId,
        form_type: formType || 1,
        form_id: formId,
        dossier_form_id: formId,
        razorpay_order_id: cfOrderId,
        razorpay_payment_id: cfPaymentId,
        razorpay_signature: "cashfree_webhook_verified",
        amount,
        currency,
        status: "success",
        response: JSON.stringify({
            order_id: cfOrderId,
            payment_id: cfPaymentId,
            link_id: linkId,
            link_status: linkStatus,
            gateway: "cashfree",
            event_type: "PAYMENT_LINK_EVENT",
            source_channel: "payment_link_webhook",
            name: customer?.customer_name || "",
            email: customer?.customer_email || "",
            mobile: customer?.customer_phone || "",
            city: notes?.city || "",
            state: notes?.state || "",
            timestamp: new Date().toISOString()
        }),
        source: source || 1,
        fee_waiver_category: getFeeWaiverCategory(amount, config)
    };
    console.log(`[WEBHOOK][cashfree][link] ✅ Payment payload: ${JSON.stringify(paymentPayload)}`);

    try {
        const apiBase = process.env.NUXT_PUBLIC_API_BASE;
        // Django backend handles duplicate checking on razorpay_order_id
        await $fetch(`${apiBase}/api/students/webhook_create_payment/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: paymentPayload
        });
        console.log(`[WEBHOOK][cashfree][link] ✅ Sent to webhook_create_payment. Order: ${cfOrderId}`);
    } catch (err: any) {
        console.error(`[WEBHOOK][cashfree][link] ❌ webhook_create_payment failed for order: ${cfOrderId} — ${err?.message}`);
    }

    // Always return 200 to stop Cashfree retry loop
    return { success: true };
}
