// ── Unified Payment Start ──────────────────────────────────────────────
import { createCashfreeInstance } from "../utils/cashfree";
import { createRazorpayInstance } from "../utils/razorpay";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { user_id, name, email, mobile, form_type, form_id, city, state, payment_type, source = 1, commingAmount } = body;
    const config = useRuntimeConfig(event);
    const activeGateway = config.paymentGateway || 'CASHFREE';

    console.log(`\n====== [PAYMENT][start] Initiating payment ======`);
    console.log(`Gateway: ${activeGateway}`);
    console.log(`Payload:`, JSON.stringify({ name, email, mobile, city, state, form_type, form_id, payment_type, source, commingAmount }, null, 2));
    console.log(`Timestamp: ${new Date().toISOString()}`);
    console.log(`=================================================\n`);

    let amount = Number(commingAmount || config.paymentAmount || 2950);
    const currency = 'INR';
    console.log(amount, '-----amount')
    // Apply dynamic discount for reattempts
    if (payment_type === 'reattempt') {
        const discountPercent = Number(config.reattemptDiscountPercentage);
        const discount = amount * (discountPercent / 100);
        amount = Math.round(amount - discount);
        console.log(`[PAYMENT][start] Reattempt discount (${discountPercent}%) applied. New amount: ${amount}`);
    }

    if (activeGateway === 'RAZORPAY') {
        try {
            const { instance: razorpay, key_id } = createRazorpayInstance(config);
            const orderOptions = {
                amount: amount * 100, // Razorpay takes amount in paisa
                currency,
                receipt: `rcpt_${user_id || form_id || 'guest'}_${Date.now()}`,
                notes: { user_id, form_type, form_id, name, email, mobile, city, state, source }
            };

            const order = await razorpay.orders.create(orderOptions);

            // Forward to Django backend if reattempt or security_deposit
            if (payment_type === 'reattempt' || payment_type === 'security_deposit') {
                try {
                    const apiBase = process.env.NUXT_PUBLIC_API_BASE;
                    const authHeader = getHeader(event, 'authorization');
                    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                    if (authHeader) headers['Authorization'] = authHeader;

                    const endpoint = payment_type === 'security_deposit' 
                        ? '/api/students/create_student_profile_payment/' 
                        : '/api/students/create_student_payment/';

                const response=    await $fetch(`${apiBase}${endpoint}`, {
                        method: 'POST',
                        headers,
                        body: {
                            re_attempt_status: true,
                            student_id: form_id,
                            form_type: form_type || 1,
                            form_id: form_id || null,
                            razorpay_order_id: order.id,
                            razorpay_payment_id: 'N/A',
                            razorpay_signature: 'N/A',
                            amount,
                            currency,
                            status: 'initiated',
                            response: JSON.stringify({
                                source: "razorpay_start",
                                name, email, mobile, state, city,
                                timestamp: new Date().toISOString()
                            }),
                            source: source || 1
                        }
                    });
                    console.log(`[PAYMENT][start] Razorpay reattempt payment created successfully on external API.`,response);
                } catch (apiError: any) {
                    console.error(`[PAYMENT][start] Razorpay reattempt API call failed:`, apiError?.message || apiError);
                }
            }

            return {
                success: true,
                gateway: "razorpay",
                key: key_id,
                order_id: order.id,
                amount: amount,
                currency: currency,
                notes: orderOptions.notes
            };
        } catch (error: any) {
            console.error(`\n====== [PAYMENT][start] Razorpay order creation failed ======`);
            console.error(`Error Details:`, error?.response?.data || error?.message || error);
            console.error(`=============================================================\n`);
            return { success: false, message: error.message || "Failed to create Razorpay order" };
        }
    } else {
        // DEFAULT: CASHFREE
        let cashfree: ReturnType<typeof createCashfreeInstance>["instance"];
        let cfEnvironment: string;
        try {
            const cf = createCashfreeInstance(config, event);
            cashfree = cf.instance;
            cfEnvironment = cf.cfEnvironment;
        } catch (e: any) {
            return { success: false, message: "Cashfree configuration missing on server" };
        }

        try {
            const cfOrderId = `cf_${user_id || form_id || 'guest'}_${Date.now()}`;
            const customerId = `cust_${user_id || form_id || 'guest'}`;

            const orderRequest = {
                order_id: cfOrderId,
                order_amount: amount,
                order_currency: currency,
                customer_details: {
                    customer_id: customerId,
                    customer_name: name || "Applicant",
                    customer_email: email || "noemail@kcglobed.com",
                    customer_phone: mobile || "9999999999"
                },
                order_tags: {
                    user_id: String(user_id || ''),
                    form_type: String(form_type || ''),
                    form_id: String(form_id || ''),
                    city: String(city || ''),
                    state: String(state || ''),
                    source: String(source || '1')
                }
            };

            const response = await cashfree.PGCreateOrder(orderRequest);
            const orderData = response.data;
            console.log(body,'----body')
            // Forward to Django backend if reattempt or security_deposit
            if (payment_type === 'reattempt' || payment_type === 'security_deposit') {
                try {
                    const apiBase = process.env.NUXT_PUBLIC_API_BASE;
                    const authHeader = getHeader(event, 'authorization');
                    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                    if (authHeader) headers['Authorization'] = authHeader;
                    console.log({
                            re_attempt_status: true,
                            student_id: form_id,
                            form_type: form_type || 1,
                            form_id: form_id || null,
                            razorpay_order_id: orderData.order_id,
                            razorpay_payment_id: 'N/A',
                            razorpay_signature: 'N/A',
                            amount,
                            currency,
                            status: 'initiated',
                            response: JSON.stringify({
                                source: "cashfree_start",
                                name, email, mobile, state, city,
                                timestamp: new Date().toISOString()
                            }),
                            source: source || 1
                        }
                    ,'--body')
                    const endpoint = payment_type === 'security_deposit' 
                        ? '/api/students/create_student_profile_payment/' 
                        : '/api/students/create_student_payment/';
                const response=    await $fetch(`${apiBase}${endpoint}`, {
                        method: 'POST',
                        headers,
                        body: {
                            re_attempt_status: true,
                            student_id: form_id,
                            form_type: form_type || 1,
                            form_id: form_id || null,
                            razorpay_order_id: orderData.order_id,
                            razorpay_payment_id: 'N/A',
                            razorpay_signature: 'N/A',
                            amount,
                            currency,
                            status: 'initiated',
                            response: JSON.stringify({
                                source: "cashfree_start",
                                name, email, mobile, state, city,
                                timestamp: new Date().toISOString()
                            }),
                            source: source || 1
                        }
                    });
                    console.log(`[PAYMENT][start] Cashfree reattempt payment created successfully on external API.`,response);
                } catch (apiError: any) {
                    console.error(`[PAYMENT][start] Cashfree reattempt API call failed:`, apiError?.message || apiError);
                }
            }

            return {
                success: true,
                gateway: "cashfree",
                cf_order_id: orderData.order_id,
                payment_session_id: orderData.payment_session_id,
                amount,
                currency,
                environment: cfEnvironment
            };
        } catch (error: any) {
            const errorMessage = error?.response?.data?.message || error?.message || "Failed to create Cashfree order";
            console.error(`\n====== [PAYMENT][start] Cashfree order creation failed ======`);
            console.error(`Error Details:`, error?.response?.data || error?.message || error);
            console.error(`=============================================================\n`);
            return { success: false, message: errorMessage };
        }
    }
});
