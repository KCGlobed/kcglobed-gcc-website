import Razorpay from "razorpay";
import crypto from "crypto";
import { savePayment } from "../services/payment.service";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        throw createError({
            statusCode: 400,
            message: "Missing required payment details"
        });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
        throw createError({
            statusCode: 500,
            message: "Razorpay secret not configured"
        });
    }

    // Verify Signature
    const generated_signature = crypto
        .createHmac("sha256", keySecret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        throw createError({
            statusCode: 400,
            message: "Invalid payment signature"
        });
    }

    // Initialize Razorpay to fetch order details (to get user_id and amount)
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: keySecret
    });

    try {
        const order = await razorpay.orders.fetch(razorpay_order_id);

        // Extract user_id from notes (assuming it was passed during order creation)
        // @ts-ignore
        const userId = order.notes ? order.notes.user_id : null;

        if (!userId) {
            throw createError({
                statusCode: 400,
                message: "User ID not found in order notes"
            });
        }

        // Save payment to database
        const paymentId = await savePayment({
            user_id: userId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount: (order.amount as number) / 100, // Convert paise to main currency unit
            currency: order.currency,
            status: "success",
            response: JSON.stringify(body)
        });

        return {
            success: true,
            message: "Payment verified and saved successfully",
            payment_id: paymentId
        };

    } catch (error: any) {
        console.error("Payment Verification Error:", error);
        throw createError({
            statusCode: 500,
            message: error.message || "Failed to verify payment"
        });
    }
});
