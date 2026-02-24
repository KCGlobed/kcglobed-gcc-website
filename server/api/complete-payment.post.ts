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

    const config = useRuntimeConfig(event);
    const keySecret = (config.razorpayKeySecret || "").replace(/['"]/g, '').trim();
    const keyId = (config.razorpayKeyId || "").replace(/['"]/g, '').trim();

    if (!keyId || !keySecret) {
        throw createError({
            statusCode: 500,
            message: "Razorpay configuration missing on server"
        });
    }

    // Initialize Razorpay
    const razorpay = new Razorpay({
        key_id: keyId,
        key_secret: keySecret
    });

    let userId = null;
    let formType = null;
    let formId = null;
    let amount = 0;
    let currency = 'INR';

    try {
        // Fetch order details first to get user_id and amount
        const order = await razorpay.orders.fetch(razorpay_order_id);

        // @ts-ignore
        userId = order.notes ? order.notes.user_id : null;
        // @ts-ignore
        formType = order.notes ? order.notes.form_type : null;
        // @ts-ignore
        formId = order.notes ? order.notes.form_id : null;

        amount = (order.amount as number) / 100;
        currency = order.currency;

        // form_id is optional — present in Dossier flow, absent in Student Application flow
    } catch (error: any) {
        console.error("Error fetching Razorpay order:", error);
        throw createError({
            statusCode: error.statusCode || 500,
            message: error.message || "Failed to fetch order details"
        });
    }

    // Verify Signature
    const generated_signature = crypto
        .createHmac("sha256", keySecret)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (generated_signature !== razorpay_signature) {
        // Save failed payment
        await savePayment({
            student_id: userId,
            form_type: formType,
            form_id: formId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
            currency,
            status: "failed",
            response: JSON.stringify({ ...body, error: "Invalid payment signature" })
        });

        throw createError({
            statusCode: 400,
            message: "Invalid payment signature"
        });
    }

    try {
        // Save success payment
        const paymentId = await savePayment({
            student_id: userId,
            form_type: formType,
            form_id: formId,
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount: amount,
            currency: currency,
            status: "success",
            response: JSON.stringify(body)
        });

        return {
            success: true,
            message: "Payment verified and saved successfully",
            payment_id: paymentId
        };

    } catch (error: any) {
        console.error("Payment Saving Error:", error);

        try {
            await savePayment({
                student_id: userId,
                form_type: formType,
                form_id: formId,
                razorpay_order_id,
                razorpay_payment_id,
                razorpay_signature,
                amount,
                currency,
                status: "failed",
                response: JSON.stringify({ ...body, error: error.message || "Failed to save payment" })
            });
        } catch (innerError) {
            console.error("Failed to save payment failure log:", innerError);
        }

        throw createError({
            statusCode: 500,
            message: error.message || "Failed to save payment"
        });
    }
});
