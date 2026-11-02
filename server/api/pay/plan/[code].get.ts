// GET /api/pay/plan/:code — public plan info for the custom payment form
import { getPayPlan, PAY_MERCHANT, PAY_PROGRAMS, INDIAN_STATES } from "../../../utils/pay-plans";

export default defineEventHandler((event) => {
    const plan = getPayPlan(getRouterParam(event, "code"));
    if (!plan) {
        throw createError({ statusCode: 404, message: "Payment form not found" });
    }
    return {
        plan,
        merchant: PAY_MERCHANT,
        programs: PAY_PROGRAMS,
        states: INDIAN_STATES,
    };
});
