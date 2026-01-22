import Razorpay from "razorpay";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { user_id, name, email, mobile } = body;

    if (!user_id) {
        return { success: false, message: "Missing required data" };
    }

    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!
    });

    try {
        const order = await razorpay.orders.create({
            amount: Number(process.env.RAZORPAY_PAYMENT_AMOUNT!) * 100, // Razorpay expects paise
            currency: process.env.RAZORPAY_CURRENCY!,
            receipt: `receipt_${user_id}_${Date.now()}`,
            notes: {
                user_id,
                name,
                email,
                mobile
            }
        });

        return {
            success: true,
            razorpay_key: process.env.RAZORPAY_KEY_ID,
            razorpay_order_id: order.id,
            amount: order.amount,
            currency: order.currency
        };

    } catch (error: any) {
        console.error("Razorpay Error:", error);

        return {
            success: false,
            message: "Failed to create Razorpay order"
        };
    }
});
