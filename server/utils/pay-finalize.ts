// ── Custom Payment Forms — order lookup + "send invoice once" ─────────────────
// No database: Cashfree is the source of truth. Both the webhook and the
// browser-side verify call fetchPayOrder(), which reads the order + payments
// straight from the Cashfree API (never trusts the request body).
//
// Who sends the email:
//   • Orders created with a notify_url (any https host) → ONLY the webhook.
//   • Orders without notify_url (localhost dev)          → /api/pay/verify.
// So there is exactly one sender per order. The in-memory set below also
// absorbs Cashfree webhook retries that land on the same server instance.
import type { H3Event } from "h3";
import { createCashfreeInstance } from "./cashfree";
import { getPayPlan } from "./pay-plans";
import { buildPayInvoicePdf } from "../services/pay-invoice.service";
import { sendPayConfirmationEmail } from "../services/pay-email.service";

export type PayOrderStatus = "PAID" | "PENDING" | "FAILED";

export interface PayOrder {
    orderId: string;
    status: PayOrderStatus;
    planCode: string;
    title: string;
    amount: number;
    currency: string;
    name: string;
    email: string;
    phone: string;
    program: string;
    address: string;
    city: string;
    state: string;
    paymentId: string;
    paymentMethod: string;
    paidAt: Date | null;
    hasNotifyUrl: boolean;
}

// Public https origin of this request, or null for local/plain-http hosts.
export function getPublicOrigin(event: H3Event): string | null {
    const url = getRequestURL(event, { xForwardedHost: true, xForwardedProto: true });
    const isLocal = ["localhost", "127.0.0.1", "0.0.0.0"].includes(url.hostname);
    if (url.protocol !== "https:" || isLocal) return null;
    return url.origin;
}

// Reads the order from Cashfree. Returns null for unknown orders and for
// orders not created by the custom payment forms.
export async function fetchPayOrder(event: H3Event, orderId: string): Promise<PayOrder | null> {
    if (!/^GCCPay_[A-Za-z0-9_]+$/.test(orderId)) return null;

    const cf = createCashfreeInstance(useRuntimeConfig(event), event);

    let order: any;
    try {
        order = (await cf.instance.PGFetchOrder(orderId)).data;
    } catch (error: any) {
        if (error?.response?.status === 404) return null;
        throw error;
    }

    const tags = order?.order_tags || {};
    if (tags.payment_type !== "custom_form") return null;

    const paymentsRes = await cf.instance.PGOrderFetchPayments(orderId);
    const payments: any[] = Array.isArray(paymentsRes.data) ? paymentsRes.data : [];
    const success = payments.find((p) => p.payment_status === "SUCCESS");

    let status: PayOrderStatus = "PENDING";
    if (order.order_status === "PAID" || success) {
        status = "PAID";
    } else if (["EXPIRED", "TERMINATED"].includes(order.order_status)) {
        status = "FAILED";
    } else if (payments.length && payments.every((p) => ["FAILED", "USER_DROPPED", "CANCELLED"].includes(p.payment_status))) {
        status = "FAILED";
    }

    const plan = getPayPlan(tags.plan_code);
    const customer = order.customer_details || {};

    return {
        orderId,
        status,
        planCode: tags.plan_code || "",
        title: plan?.title || order.order_note || "Payment",
        amount: Number(success?.payment_amount ?? order.order_amount ?? 0),
        currency: order.order_currency || "INR",
        name: customer.customer_name || "",
        email: customer.customer_email || "",
        phone: customer.customer_phone || "",
        program: tags.program || "",
        address: tags.address || "",
        city: tags.city || "",
        state: tags.state || "",
        paymentId: success ? String(success.cf_payment_id) : "",
        paymentMethod: success?.payment_group ? String(success.payment_group).toUpperCase() : "",
        paidAt: success?.payment_time ? new Date(success.payment_time) : null,
        hasNotifyUrl: Boolean(order?.order_meta?.notify_url),
    };
}

const handledOrders = new Set<string>();

// Builds the invoice PDF and emails it. Safe to call more than once per order.
// Throws if sending fails so the webhook returns 500 and Cashfree retries.
export async function sendPayInvoiceOnce(order: PayOrder): Promise<"sent" | "skipped"> {
    if (order.status !== "PAID" || !order.email) return "skipped";
    if (handledOrders.has(order.orderId)) return "skipped";

    handledOrders.add(order.orderId);
    try {
        const pdf = await buildPayInvoicePdf(order);
        await sendPayConfirmationEmail(order, pdf);
        console.log(`[PAY][invoice] ✅ Invoice emailed for ${order.orderId} to ${order.email}`);
        return "sent";
    } catch (error) {
        handledOrders.delete(order.orderId);
        throw error;
    }
}

// "01 Nov 2026, 04:29 PM" in IST — same format as the Cashfree receipt
export function formatPayDate(date: Date): string {
    const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit", hour12: true,
    }).formatToParts(date);
    const get = (type: string) => parts.find((p) => p.type === type)?.value || "";
    return `${get("day")} ${get("month")} ${get("year")}, ${get("hour")}:${get("minute")} ${get("dayPeriod").toUpperCase()}`;
}

// "DEBIT_CARD" -> "Debit Card", "UPI" -> "UPI", "NET_BANKING" -> "Net Banking"
export function formatPayMethod(method: string): string {
    const keepUpper = new Set(["UPI", "EMI", "NEFT", "IMPS"]);
    return String(method || "")
        .split(/[_\s]+/)
        .filter(Boolean)
        .map((w) => (keepUpper.has(w.toUpperCase()) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()))
        .join(" ");
}

// Indian-system amount in words: 100000 -> "Rupees One Lakh Only"
export function amountInWords(amount: number): string {
    const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
        "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    const two = (n: number) => (n < 20 ? ones[n] : `${tens[Math.floor(n / 10)]} ${ones[n % 10]}`.trim());
    const three = (n: number) =>
        [n >= 100 ? `${ones[Math.floor(n / 100)]} Hundred` : "", two(n % 100)].filter(Boolean).join(" ");

    const rupees = Math.floor(amount);
    const paise = Math.round((amount - rupees) * 100);
    const parts: string[] = [];
    const crore = Math.floor(rupees / 1e7);
    const lakh = Math.floor((rupees % 1e7) / 1e5);
    const thousand = Math.floor((rupees % 1e5) / 1e3);
    const rest = rupees % 1e3;
    if (crore) parts.push(`${three(crore)} Crore`);
    if (lakh) parts.push(`${two(lakh)} Lakh`);
    if (thousand) parts.push(`${two(thousand)} Thousand`);
    if (rest) parts.push(three(rest));
    const words = parts.join(" ") || "Zero";
    return `Rupees ${words}${paise ? ` and ${two(paise)} Paise` : ""} Only`;
}
