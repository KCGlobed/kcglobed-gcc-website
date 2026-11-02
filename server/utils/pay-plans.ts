// ── Custom Payment Forms (Cashfree) — plan + merchant config ──────────────────
// One form page serves every plan:  /pay/<code>   e.g. /pay/GCC5900
// Amounts are defined ONLY here (server side) so the browser cannot change them.
// To add a plan, add one entry below.

export interface PayPlan {
    code: string;
    amount: number;       // INR, charged as-is
    title: string;        // form heading + invoice line-item description
    description: string;  // shown on the form banner
    // Printed on the receipt (Program Details + line item)
    feeType: string;      // e.g. "Seat Reservation Fee"
    program: string;      // e.g. "AEUAP with US CPA"
    cohort: string;       // e.g. "Dec Cohort"
}

const DEFAULT_TITLE = "Secure Your Seat at GCC School";
const DEFAULT_DESCRIPTION =
    "Take the next step towards a global finance career through our US CPA pathway, industry-focused training, and placement-linked learning model.";

// Receipt defaults — change per plan below if a form is for a different program.
const RECEIPT = { feeType: "Seat Reservation Fee", program: "AEUAP with US CPA", cohort: "Dec Cohort" };

export const PAY_PLANS: Record<string, PayPlan> = {
    GCC5900:   { code: "GCC5900",   amount: 5900,   title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...RECEIPT },
    GCC11800:  { code: "GCC11800",  amount: 11800,  title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...RECEIPT },
    GCC25000:  { code: "GCC25000",  amount: 25000,  title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...RECEIPT },
    GCC50000:  { code: "GCC50000",  amount: 50000,  title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...RECEIPT },
    GCC75000:  { code: "GCC75000",  amount: 75000,  title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...RECEIPT },
    GCC100000: { code: "GCC100000", amount: 100000, title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION, ...RECEIPT },
};

// Shown on the form and printed on the invoice (top-right block)
export const PAY_MERCHANT = {
    name: "GCC School",
    email: "vironika.takkar@gccschool.com",
    phone: "8796880189",
    whatsapp: "9211088900",
    website: "https://gccschool.com/",
    address: ["Building 9B, 16th Floor, DLF Cyber City, Sector 24,", "Gurugram, Haryana - 122002"],
    instagram: "https://www.instagram.com/gccschool",
    facebook: "https://www.facebook.com/share/187jgT5gev/",
    linkedin: "https://www.linkedin.com/company/gccschool/",
};

// Program dropdown on the form (stored on the Cashfree order, shown in the email)
export const PAY_PROGRAMS = ["US CPA", "US EA", "ACCA", "CMA (US)", "Other"];

export const INDIAN_STATES = [
    "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar",
    "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa",
    "Gujarat", "Haryana", "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka",
    "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
    "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];

// Line item on the receipt, e.g. "Seat Reservation Fee – AEUAP with US CPA – Dec Cohort - GCC School"
export function getReceiptItem(plan: PayPlan | null, fallback = "Payment"): string {
    if (!plan) return fallback;
    return [plan.feeType, plan.program, plan.cohort].filter(Boolean).join(" – ") + " - GCC School";
}

export function getPayPlan(code: unknown): PayPlan | null {
    const key = String(code || "").trim().toUpperCase();
    return PAY_PLANS[key] || null;
}
