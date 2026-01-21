import Razorpay from "razorpay";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const { user_id, amount, currency, name, email, mobile } = body;
    console.log(body);
    if (!user_id || !amount) {
        return { success: false, message: "Missing required data" };
    }
    console.log(process.env.RAZORPAY_KEY_ID, process.env.RAZORPAY_KEY_SECRET, '-----------sec')
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID!,
        key_secret: process.env.RAZORPAY_KEY_SECRET!
    });

    try {
        const order = await razorpay.orders.create({
            amount: amount * 100, // Razorpay expects paise
            currency: currency || "INR",
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
