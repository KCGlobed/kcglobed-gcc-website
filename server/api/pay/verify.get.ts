// GET /api/pay/verify?order_id=... — payment status for the browser
// Reads the order from Cashfree. Returns no personal data except the first name.
// Sends the invoice email only for orders without a webhook (localhost dev).
import { fetchPayOrder, sendPayInvoiceOnce } from "../../utils/pay-finalize";

export default defineEventHandler(async (event) => {
    const orderId = String(getQuery(event).order_id || "");

    let order;
    try {
        order = await fetchPayOrder(event, orderId);
    } catch (error: any) {
        console.error(`[PAY][verify] Cashfree lookup failed for ${orderId}: ${error?.message}`);
        throw createError({ statusCode: 502, message: "Could not check payment status. Please refresh." });
    }
    if (!order) throw createError({ statusCode: 404, message: "Order not found" });

    if (order.status === "PAID" && !order.hasNotifyUrl) {
        try {
            await sendPayInvoiceOnce(order);
        } catch (error: any) {
            console.error(`[PAY][verify] Invoice email failed for ${orderId}: ${error?.message}`);
        }
    }

    return {
        order_id: order.orderId,
        status: order.status,
        plan_code: order.planCode,
        title: order.title,
        amount: order.amount,
        currency: order.currency,
        payment_id: order.paymentId,
        first_name: order.name.split(" ")[0] || "",
        email_masked: order.email.replace(/^(.).*?(@.*)$/, "$1***$2"),
    };
});
