import Razorpay from "razorpay";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { user_id, name, email, mobile, form_type, form_id } = body;

    const config = useRuntimeConfig(event);
    // Nuxt runtimeConfig only auto-maps NUXT_-prefixed vars on Cloud Run.
    // Fall back to process.env so plain-named vars (RAZORPAY_KEY_ID etc.) work too.
    const key_id = (config.razorpayKeyId || process.env.RAZORPAY_KEY_ID || "").replace(/['"]/g, '').trim();
    const key_secret = (config.razorpayKeySecret || process.env.RAZORPAY_KEY_SECRET || "").replace(/['"]/g, '').trim();

    console.log("Start Payment Request Body:", body);
    console.log(`Using Razorpay Key: runtimeConfig len=${(config.razorpayKeyId || '').length}, process.env len=${(process.env.RAZORPAY_KEY_ID || '').length}, resolved len=${key_id.length}`);

    if (!key_id || !key_secret) {
        console.error("Razorpay Keys missing in ENV/Config");
        return { success: false, message: "Razorpay configuration missing on server" };
    }

    const razorpay = new Razorpay({
        key_id,
        key_secret
    });

    try {
        const amount = Number(config.razorpayAmount || 2950) * 100;
        const currency = config.razorpayCurrency || 'INR';

        const orderOptions = {
            amount: amount,
            currency: currency,
            receipt: `receipt_${user_id || form_id}_${Date.now()}`,
            notes: {
                user_id,
                name,
                email,
                mobile,
                form_type,
                form_id
            }
        };

        console.log("Creating Razorpay Order with options:", orderOptions);

        const order = await razorpay.orders.create(orderOptions);

        return {
            success: true,
            razorpay_key: key_id.replace(/['"]/g, ''),
            razorpay_order_id: order.id,
            amount: order.amount,
            currency: order.currency
        };

    } catch (error: any) {
        console.error("Razorpay Order Creation Error Detail:", error);

        let errorMessage = "Failed to create Razorpay order";
        if (error.error && error.error.description) {
            errorMessage = error.error.description;
        } else if (error.message) {
            errorMessage = error.message;
        } else if (typeof error === 'string') {
            errorMessage = error;
        }

        return {
            success: false,
            message: errorMessage,
            debug: {
                error_raw: error,
                env_keys_present: !!key_id && !!key_secret,
                key_id_length: key_id.length,
                key_secret_length: key_secret.length,
                key_id_preview: `${key_id.substring(0, 6)}...${key_id.slice(-4)}`,
                key_secret_preview: `${key_secret.substring(0, 3)}...${key_secret.slice(-3)}`
            }
        };
    }
});
