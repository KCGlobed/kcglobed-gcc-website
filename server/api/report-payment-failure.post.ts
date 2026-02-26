import Razorpay from "razorpay";
import { savePayment } from "../services/payment.service";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { razorpay_order_id, razorpay_payment_id } = body;

    if (!razorpay_order_id) {
        throw createError({
            statusCode: 400,
            message: "Missing order ID"
        });
    }

    const config = useRuntimeConfig(event);
    const keyId = (config.razorpayKeyId || "").replace(/['"]/g, '').trim();
    const keySecret = (config.razorpayKeySecret || "").replace(/['"]/g, '').trim();

    if (!keyId || !keySecret) {
        throw createError({
            statusCode: 500,
            message: "Razorpay configuration missing"
        });
    }

    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    try {
        // Fetch order to identify user and form details
        const order = await razorpay.orders.fetch(razorpay_order_id);

        // @ts-ignore
        const userId = order.notes ? order.notes.user_id : null;
        // @ts-ignore
        const formType = order.notes ? order.notes.form_type : null;
        // @ts-ignore
        const formId = order.notes ? order.notes.form_id : null;

        if (!userId) {
            console.warn(`Payment failed report: No student_id for order ${razorpay_order_id} (guest payment, continuing...)`);
        }

        // Always save the failed payment record regardless of userId
        await savePayment({
            student_id: userId || null,
            form_type: formType,
            form_id: formId,
            razorpay_order_id,
            razorpay_payment_id: razorpay_payment_id || 'N/A',
            razorpay_signature: 'N/A',
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
