// ── Unified Payment Complete ──────────────────────────────────────────────
import { createCashfreeInstance } from "../utils/cashfree";
import { createRazorpayInstance } from "../utils/razorpay";
import { savePayment } from "../services/payment.service";
import { sendPaymentConfirmationEmail } from "../services/email.service";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig(event);
    const activeGateway = config.paymentGateway || 'RAZORPAY';
    console.log(activeGateway, '---acitve gateway')
    let userId: string | null = null;
    let formType: string | null = null;
    let formId: string | null = null;
    let userName = '';
    let userEmail = '';
    let userMobile = '';
    let amount = 0;
    let currency = 'INR';
    let state = "";
    let city = "";
    let actualPaymentId = 'N/A';
    let orderIdForDb = '';
    let reAttemptStatus = false;
    if (activeGateway === 'RAZORPAY') {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, re_attempt_status } = body;
        orderIdForDb = razorpay_order_id;
        reAttemptStatus = re_attempt_status || false;
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
            throw createError({ statusCode: 400, message: "Missing Razorpay payment details" });
        }

        const keySecret = (config.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || "").replace(/['"]/g, '').trim();
        const generated_signature = crypto.createHmac("sha256", keySecret)
            .update(razorpay_order_id + "|" + razorpay_payment_id).digest("hex");

        if (generated_signature !== razorpay_signature) {
            console.error("[PAYMENT][complete] Razorpay signature verification failed");
            throw createError({ statusCode: 400, message: "Invalid payment signature" });
        }

        try {
            const { instance: razorpay } = createRazorpayInstance(config);
            const orderRes = await razorpay.orders.fetch(razorpay_order_id);
            amount = Number(orderRes.amount) / 100;
            currency = orderRes.currency;

            if (orderRes.notes) {
                userId = orderRes.notes.user_id ? String(orderRes.notes.user_id) : null;
                formType = orderRes.notes.form_type ? String(orderRes.notes.form_type) : null;
                formId = orderRes.notes.form_id ? String(orderRes.notes.form_id) : null;
                userName = orderRes.notes.name ? String(orderRes.notes.name) : '';
                userEmail = orderRes.notes.email ? String(orderRes.notes.email) : '';
                userMobile = orderRes.notes.mobile ? String(orderRes.notes.mobile) : '';
                state = orderRes.notes.state ? String(orderRes.notes.state) : '';
                city = orderRes.notes.city ? String(orderRes.notes.city) : '';
            }
            actualPaymentId = razorpay_payment_id;
        } catch (error: any) {
            console.error("[PAYMENT][complete] Error fetching Razorpay order", error);
            throw createError({ statusCode: 500, message: "Failed to fetch order details" });
        }
    } else {
        // DEFAULT: CASHFREE
        const { cf_order_id, re_attempt_status } = body;
        orderIdForDb = cf_order_id;
        reAttemptStatus = re_attempt_status || false;
        if (!cf_order_id) {
            throw createError({ statusCode: 400, message: "Missing Cashfree order ID" });
        }

        let cashfree: ReturnType<typeof createCashfreeInstance>["instance"];
        try {
            const cf = createCashfreeInstance(config, event);
            cashfree = cf.instance;
        } catch (e: any) {
            throw createError({ statusCode: 500, message: "Cashfree configuration missing on server" });
        }

        try {
            const orderRes = await cashfree.PGFetchOrder(cf_order_id);
            const orderData = orderRes.data;
            amount = orderData.order_amount || 0;
            currency = orderData.order_currency || 'INR';

            if (orderData.order_tags) {
                userId = orderData.order_tags.user_id || null;
                formType = orderData.order_tags.form_type || null;
                formId = orderData.order_tags.form_id || null;
                city = orderData.order_tags.city || '';
                state = orderData.order_tags.state || '';
            }

            // Fallback to customer details for name, email, mobile
            if (orderData.customer_details) {
                if (!userName) userName = orderData.customer_details.customer_name || '';
                if (!userEmail) userEmail = orderData.customer_details.customer_email || '';
                if (!userMobile) userMobile = orderData.customer_details.customer_phone || '';
            }

            const paymentsRes = await cashfree.PGOrderFetchPayments(cf_order_id);
            const payments: any[] = Array.isArray(paymentsRes.data) ? paymentsRes.data : [paymentsRes.data];
            const successPayment = payments.find((p: any) => p.payment_status === 'SUCCESS');

            if (!successPayment) {
                throw createError({ statusCode: 400, message: "Payment not successful" });
            }
            actualPaymentId = String(successPayment.cf_payment_id);
        } catch (error: any) {
            if (error.statusCode) throw error;
            throw createError({ statusCode: 500, message: "Failed to verify Cashfree payment" });
        }
    }

    // ── Save success to DB ────────────────────────────────────────────────────
    try {
        const paymentDbId = await savePayment({
           re_attempt_status: reAttemptStatus,
            student_id: userId,
            form_type: formType || 1,
            form_id: formId,
            razorpay_order_id: orderIdForDb,
            razorpay_payment_id: actualPaymentId,
            razorpay_signature: `${activeGateway.toLowerCase()}_verified`,
            amount, currency,
            status: "success",
            response: JSON.stringify({
                order_id: orderIdForDb,
                payment_id: actualPaymentId,
                gateway: activeGateway.toLowerCase(),
                name: userName,
                email: userEmail,
                mobile: userMobile,
                city: city,
                state: state
            })
        });

        // ── Step 3: Send Confirmation Email ─────────────────────────────────────
        if (userEmail) {
            // Logic to send email confirmation can be added here if needed
            // (Assuming existing service handles it or it's called elsewhere)
        }

        return { success: true, message: "Payment verified and saved successfully", payment_id: paymentDbId };
    } catch (error: any) {
        console.error("[PAYMENT][complete] Error saving payment to DB", error);
        throw createError({ statusCode: 500, message: error.message || "Failed to save payment" });
    }
});
