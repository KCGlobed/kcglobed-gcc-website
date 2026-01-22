import Razorpay from "razorpay";
import { savePayment } from "../services/payment.service";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { razorpay_order_id, razorpay_payment_id, error_details } = body;

    if (!razorpay_order_id) {
        throw createError({
            statusCode: 400,
            message: "Missing order ID"
        });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        throw createError({
            statusCode: 500,
            message: "Razorpay secret not configured"
        });
    }

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: keySecret
    });

    try {
        // Fetch order to identify user
        const order = await razorpay.orders.fetch(razorpay_order_id);

        // @ts-ignore
        const userId = order.notes ? order.notes.user_id : null;

        if (!userId) {
            console.warn(`Payment failed report: User ID not found for order ${razorpay_order_id}`);
            return { success: false, message: "User ID not found" };
        }

        // Save failed payment
        await savePayment({
            user_id: userId,
            razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id || 'N/A',
            razorpay_signature: 'N/A', // No signature for failed transactions reported by client
            amount: (order.amount as number) / 100,
            currency: order.currency,
            status: "failed",
            response: JSON.stringify({
                ...body,
                source: "client_report"
            })
        });

        return { success: true, message: "Failure recorded" };

    } catch (error: any) {
        console.error("Error reporting payment failure:", error);
        // Don't throw to client, just return false, as this is a background report
        return { success: false, message: error.message };
    }
});
