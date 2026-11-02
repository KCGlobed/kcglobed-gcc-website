// POST /api/pay/start — create a Cashfree order for a custom payment form
// Nothing is stored locally: all form data travels on the Cashfree order
// (customer_details + order_tags) and is read back on webhook/verify.
import crypto from "crypto";
import { createCashfreeInstance } from "../../utils/cashfree";
import { getPayPlan, PAY_PROGRAMS, INDIAN_STATES } from "../../utils/pay-plans";
import { getPublicOrigin } from "../../utils/pay-finalize";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function clean(value: unknown, max = 200): string {
    return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const config = useRuntimeConfig(event);

    // ── 1. Validate ───────────────────────────────────────────────────────────
    const plan = getPayPlan(body?.code);
    if (!plan) throw createError({ statusCode: 400, message: "Invalid payment form" });

    const name = clean(body?.name, 100);
    const email = clean(body?.email, 100).toLowerCase();
    const phone = clean(body?.phone, 20).replace(/\D/g, "").replace(/^(91|0)(?=\d{10}$)/, "");
    const address = clean(body?.address, 250);
    const city = clean(body?.city, 60);
    const state = clean(body?.state, 60);
    const program = clean(body?.program, 60);

    const errors: string[] = [];
    if (name.length < 2) errors.push("name");
    if (!EMAIL_RE.test(email)) errors.push("email");
    if (!/^[6-9]\d{9}$/.test(phone)) errors.push("phone");
    // Optional for now — the form only asks for name, email and phone.
    if (state && !INDIAN_STATES.includes(state)) errors.push("state");
    if (program && !PAY_PROGRAMS.includes(program)) errors.push("program");
    if (body?.agree !== true) errors.push("agree");
    if (errors.length) {
        throw createError({ statusCode: 400, message: `Invalid fields: ${errors.join(", ")}`, data: { fields: errors } });
    }

    // ── 2. Create Cashfree order ──────────────────────────────────────────────
    let cf: ReturnType<typeof createCashfreeInstance>;
    try {
        cf = createCashfreeInstance(config, event);
    } catch {
        throw createError({ statusCode: 500, message: "Cashfree configuration missing on server" });
    }

    const orderId = `GCCPay_${plan.code}_${crypto.randomBytes(2).toString("hex")}_${Date.now()}`;
    const origin = getPublicOrigin(event);

    const orderRequest: any = {
        order_id: orderId,
        order_amount: plan.amount,
        order_currency: "INR",
        order_note: plan.title,
        customer_details: {
            customer_id: `cust_${phone}`,
            customer_name: name,
            customer_email: email,
            customer_phone: phone,
        },
        order_tags: {
            payment_type: "custom_form",
            plan_code: plan.code,
            program,
            address,
            city,
            state,
        },
    };

    // Cashfree only accepts https URLs. On localhost there is no webhook,
    // so /api/pay/verify sends the email instead (see pay-finalize.ts).
    if (origin) {
        orderRequest.order_meta = {
            notify_url: `${origin}/api/pay/webhook`,
            return_url: `${origin}/pay/status?order_id={order_id}`,
        };
    }

    try {
        const response = await cf.instance.PGCreateOrder(orderRequest);
        console.log(`[PAY][start] Order ${orderId} created — ${plan.code} ₹${plan.amount} (${cf.cfEnvironment})`);
        return {
            success: true,
            order_id: response.data.order_id,
            payment_session_id: response.data.payment_session_id,
            environment: cf.cfEnvironment,
        };
    } catch (error: any) {
        const message = error?.response?.data?.message || error?.message || "Failed to create order";
        console.error(`[PAY][start] Order creation failed:`, error?.response?.data || message);
        throw createError({ statusCode: 502, message });
    }
});
