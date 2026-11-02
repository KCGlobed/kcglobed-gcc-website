// POST /api/pay/webhook — Cashfree server-to-server callback for custom forms
// Set automatically per order via order_meta.notify_url in /api/pay/start,
// so nothing needs to be registered in the Cashfree dashboard.
//
// Covers the case where the user pays but the browser never confirms
// (tab closed, network drop, app switch during UPI).
import { createCashfreeInstance } from "../../utils/cashfree";
import { fetchPayOrder, sendPayInvoiceOnce } from "../../utils/pay-finalize";

export default defineEventHandler(async (event) => {
    const rawBody = (await readRawBody(event)) || "";
    const signature = getHeader(event, "x-webhook-signature") || "";
    const timestamp = getHeader(event, "x-webhook-timestamp") || "";

    // ── 1. Verify signature (HMAC-SHA256 with the Cashfree client secret) ────
    let payload: any;
    try {
        const cf = createCashfreeInstance(useRuntimeConfig(event), event);
        payload = cf.instance.PGVerifyWebhookSignature(signature, rawBody, timestamp).object;
    } catch (error: any) {
        console.error(`[PAY][webhook] ⚠️ Signature verification failed: ${error?.message}`);
        setResponseStatus(event, 401);
        return { success: false };
    }

    const orderId: string = payload?.data?.order?.order_id || "";
    console.log(`[PAY][webhook] ${payload?.type} for ${orderId}`);

    // ── 2. Re-read the order from Cashfree and email the invoice once ────────
    try {
        const order = await fetchPayOrder(event, orderId);
        if (!order) {
            console.log(`[PAY][webhook] Ignored — not a custom form order: ${orderId}`);
            return { success: true };
        }
        if (order.status === "PAID") {
            await sendPayInvoiceOnce(order);
        }
        return { success: true };
    } catch (error: any) {
        // 500 makes Cashfree retry the webhook later.
        console.error(`[PAY][webhook] ❌ Failed for ${orderId}: ${error?.message}`);
        setResponseStatus(event, 500);
        return { success: false };
    }
});
