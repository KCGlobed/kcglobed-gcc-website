// ── Custom Payment Forms — confirmation email with receipt PDF ────────────────
// Uses the same SMTP env vars as the payment-failure email.
// Table-based layout with inline styles so it renders in Gmail/Outlook/Apple Mail.
import nodemailer from "nodemailer";
import { PAY_MERCHANT, getPayPlan } from "../utils/pay-plans";
import { formatPayDate, formatPayMethod, amountInWords, type PayOrder } from "../utils/pay-finalize";
import { loadReceiptLogo } from "./pay-invoice.service";

const PURPLE = "#521778";
const PURPLE_SOFT = "#f4eefa";
const GREEN = "#2e7d32";
const TEXT = "#22222b";
const MUTED = "#6b6b7b";
const BORDER = "#ebe7f2";
const FONT = "'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const escapeHtml = (value: unknown) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

const inr = (n: number, currency = "INR", paise = true) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
        minimumFractionDigits: paise ? 2 : 0,
        maximumFractionDigits: paise ? 2 : 0,
    }).format(n);

export async function sendPayConfirmationEmail(order: PayOrder, receiptPdf: Uint8Array) {
    const config = useRuntimeConfig();
    const emailUser = String(config.emailUser || process.env.EMAIL_HOST_USER || "");
    const fromEmail = process.env.DEFAULT_FROM_EMAIL || emailUser;

    const transporter = nodemailer.createTransport({
        host: String(config.emailHost || process.env.EMAIL_HOST || ""),
        port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
        secure: process.env.EMAIL_USE_SSL === "True" || process.env.EMAIL_USE_SSL === "true",
        auth: { user: emailUser, pass: String(config.emailPassword || process.env.EMAIL_HOST_PASSWORD || "") },
    });

    const plan = getPayPlan(order.planCode);
    const currency = order.currency || "INR";
    const amount = Number(order.amount || 0);
    const amountShort = inr(amount, currency, !Number.isInteger(amount)); // ₹1,00,000
    const amountFull = inr(amount, currency);                             // ₹1,00,000.00
    const paidAt = order.paidAt ? formatPayDate(order.paidAt) : "";
    const method = formatPayMethod(order.paymentMethod);
    const firstName = (order.name || "").split(" ")[0] || "there";
    const program = plan?.program || order.title;
    const programMeta = [plan?.cohort, plan?.feeType].filter(Boolean).join("  ·  ");
    const receiptFile = `GCC_School_Payment_Receipt_${order.orderId}.pdf`;
    const website = PAY_MERCHANT.website;
    const websiteLabel = website.replace(/^https?:\/\//, "").replace(/\/$/, "").replace(/^(?!www\.)/, "www.");
    const whatsapp = `https://wa.me/91${PAY_MERCHANT.whatsapp}`;

    const logo = await loadReceiptLogo();

    const detailRows: [string, string, boolean?][] = [
        ["Receipt No.", order.orderId],
        ["Payment ID", order.paymentId],
        ["Date Paid", paidAt],
        ["Payment Method", method],
        ["Amount Paid", amountFull, true],
    ];
    const detailsHtml = detailRows
        .filter(([, v]) => v)
        .map(([k, v, strong], i, arr) => {
            const border = i < arr.length - 1 ? `border-bottom:1px solid ${BORDER};` : "";
            const value = strong
                ? `font-size:16px;font-weight:700;color:${PURPLE};`
                : `font-size:14px;font-weight:600;color:${TEXT};`;
            return `
              <tr>
                <td style="padding:12px 0;${border}font-size:13px;color:${MUTED};white-space:nowrap;vertical-align:top;">${k}</td>
                <td style="padding:12px 0 12px 16px;${border}${value}text-align:right;word-break:break-all;">${escapeHtml(v)}</td>
              </tr>`;
        })
        .join("");

    const steps = [
        "Our admissions team will get in touch with you shortly with the next steps.",
        "Keep the attached receipt for your records.",
        "Quote your Receipt No. for any payment-related query.",
    ];
    const stepsHtml = steps
        .map((step, i) => `
          <tr>
            <td width="34" style="padding:6px 0;vertical-align:top;">
              <div style="width:24px;height:24px;line-height:24px;border-radius:12px;background:${PURPLE};color:#fff;font-size:12px;font-weight:700;text-align:center;">${i + 1}</div>
            </td>
            <td style="padding:8px 0 6px;font-size:14px;color:${TEXT};line-height:1.5;">${step}</td>
          </tr>`)
        .join("");

    const preheader = `We received ${amountShort} for ${program}. Your receipt is attached.`;

    const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Payment Confirmed</title>
  <style>
    :root { color-scheme: light only; }
    @media (max-width: 600px) {
      .px { padding-left: 20px !important; padding-right: 20px !important; }
      .hero-amount { font-size: 30px !important; }
      .btn { display: block !important; margin: 0 0 10px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f3f1f8;font-family:${FONT};-webkit-font-smoothing:antialiased;">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(preheader)}</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f1f8;padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(82,23,120,0.08);">

        <!-- Accent + logo -->
        <tr><td style="height:6px;background:${PURPLE};font-size:0;line-height:0;">&nbsp;</td></tr>
        <tr>
          <td class="px" style="padding:24px 36px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td style="vertical-align:middle;">
                ${logo
                    ? `<img src="cid:gcc-logo" width="190" alt="GCC School" style="display:block;width:190px;max-width:100%;height:auto;border:0;">`
                    : `<span style="font-size:22px;font-weight:800;color:${PURPLE};">GCC SCHOOL</span>`}
              </td>
              <td align="right" style="vertical-align:middle;">
                <span style="display:inline-block;padding:6px 14px;border-radius:20px;background:#e8f5e9;color:${GREEN};font-size:12px;font-weight:700;letter-spacing:.5px;">&#9679; PAID</span>
              </td>
            </tr></table>
          </td>
        </tr>

        <!-- Hero -->
        <tr>
          <td class="px" align="center" style="padding:24px 36px 8px;">
            <div style="width:64px;height:64px;line-height:64px;border-radius:32px;background:#e8f5e9;color:${GREEN};font-size:34px;font-weight:700;text-align:center;margin:0 auto;">&#10003;</div>
            <h1 style="margin:16px 0 4px;font-size:24px;line-height:1.3;color:${TEXT};font-weight:700;">Payment Successful</h1>
            <p style="margin:0;font-size:14px;color:${MUTED};">Your seat reservation payment has been successfully received.</p>
            <div class="hero-amount" style="margin:18px 0 4px;font-size:38px;font-weight:800;color:${PURPLE};letter-spacing:-.5px;">${amountShort}</div>
            <p style="margin:0;font-size:13px;color:${MUTED};">${escapeHtml(paidAt)}${method ? ` &nbsp;·&nbsp; ${escapeHtml(method)}` : ""}</p>
          </td>
        </tr>

        <!-- Greeting -->
        <tr>
          <td class="px" style="padding:28px 36px 0;font-size:15px;color:${TEXT};line-height:1.7;">
            <p style="margin:0;">Dear <strong>${escapeHtml(order.name || firstName)}</strong>,</p>
            <p style="margin:10px 0 0;">Your payment has been successfully received. Thank you for taking the next step towards your academic journey with GCC School.</p>
          </td>
        </tr>

        <!-- Program -->
        <tr>
          <td class="px" style="padding:22px 36px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${PURPLE_SOFT};border-radius:12px;border-left:4px solid ${PURPLE};">
              <tr><td style="padding:18px 22px;">
                <p style="margin:0;font-size:11px;font-weight:700;letter-spacing:1px;color:${MUTED};">PROGRAM ENROLLED FOR</p>
                <p style="margin:6px 0 0;font-size:18px;font-weight:700;color:${PURPLE};">${escapeHtml(program)}</p>
                ${programMeta ? `<p style="margin:4px 0 0;font-size:13px;color:${TEXT};">${escapeHtml(programMeta)}</p>` : ""}
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Payment details -->
        <tr>
          <td class="px" style="padding:24px 36px 0;">
            <p style="margin:0 0 4px;font-size:11px;font-weight:700;letter-spacing:1px;color:${MUTED};">PAYMENT DETAILS</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${detailsHtml}</table>
            <p style="margin:6px 0 0;font-size:12px;color:${MUTED};text-align:right;">${escapeHtml(amountInWords(amount))}</p>
          </td>
        </tr>

        <!-- Attachment -->
        <tr>
          <td class="px" style="padding:22px 36px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px dashed #cdbfe0;border-radius:12px;">
              <tr>
                <td width="56" style="padding:14px 0 14px 16px;vertical-align:middle;">
                  <div style="width:40px;height:40px;line-height:40px;border-radius:8px;background:#e53935;color:#fff;font-size:11px;font-weight:700;text-align:center;">PDF</div>
                </td>
                <td style="padding:14px 16px;vertical-align:middle;">
                  <p style="margin:0;font-size:14px;font-weight:600;color:${TEXT};">Your payment receipt is attached</p>
                  <p style="margin:2px 0 0;font-size:12px;color:${MUTED};word-break:break-all;">${escapeHtml(receiptFile)}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Next steps -->
        <tr>
          <td class="px" style="padding:26px 36px 0;">
            <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;color:${MUTED};">WHAT HAPPENS NEXT</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${stepsHtml}</table>
          </td>
        </tr>

        <!-- Help -->
        <tr>
          <td class="px" style="padding:26px 36px 0;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf9fc;border-radius:12px;">
              <tr><td align="center" style="padding:22px 20px;">
                <p style="margin:0;font-size:15px;font-weight:700;color:${TEXT};">Questions about your payment?</p>
                <p style="margin:4px 0 16px;font-size:13px;color:${MUTED};">Our admissions team is happy to help.</p>
                <a class="btn" href="${whatsapp}" style="display:inline-block;margin:0 4px 8px;padding:11px 22px;border-radius:8px;background:#25d366;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;">Chat on WhatsApp</a>
                <a class="btn" href="tel:+91${PAY_MERCHANT.phone}" style="display:inline-block;margin:0 4px 8px;padding:10px 22px;border-radius:8px;border:1px solid ${PURPLE};color:${PURPLE};font-size:14px;font-weight:600;text-decoration:none;">Call +91 ${PAY_MERCHANT.phone}</a>
                <p style="margin:6px 0 0;font-size:13px;color:${MUTED};">or email <a href="mailto:${PAY_MERCHANT.email}" style="color:${PURPLE};font-weight:600;text-decoration:none;">${PAY_MERCHANT.email}</a></p>
              </td></tr>
            </table>
          </td>
        </tr>

        <!-- Sign-off -->
        <tr>
          <td class="px" style="padding:26px 36px 32px;font-size:15px;color:${TEXT};line-height:1.6;">
            <p style="margin:0;color:${PURPLE};font-weight:700;">Thank you for choosing GCC School.</p>
            <p style="margin:12px 0 0;">Warm regards,<br><strong>Team GCC School</strong></p>
          </td>
        </tr>
      </table>

      <!-- Footer -->
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr><td align="center" style="padding:22px 20px 8px;font-size:12px;color:${MUTED};line-height:1.7;">
          <a href="${website}" style="color:${PURPLE};font-weight:600;text-decoration:none;">${websiteLabel}</a>
          &nbsp;·&nbsp; <a href="${PAY_MERCHANT.instagram}" style="color:${MUTED};text-decoration:none;">Instagram</a>
          &nbsp;·&nbsp; <a href="${PAY_MERCHANT.linkedin}" style="color:${MUTED};text-decoration:none;">LinkedIn</a>
          &nbsp;·&nbsp; <a href="${PAY_MERCHANT.facebook}" style="color:${MUTED};text-decoration:none;">Facebook</a>
          <br>${PAY_MERCHANT.address.map(escapeHtml).join(" ")}
          <br><span style="font-size:11px;">You are receiving this email because you made a payment to GCC School. Payments are processed securely by Cashfree Payments.</span>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    const text = [
        `Dear ${order.name},`,
        "",
        "Your seat reservation payment has been successfully received.",
        "",
        `Program: ${program}${programMeta ? ` (${programMeta.replace(/\s+·\s+/g, ", ")})` : ""}`,
        `Amount Paid: ${amountFull} (${amountInWords(amount)})`,
        `Receipt No.: ${order.orderId}`,
        `Payment ID: ${order.paymentId}`,
        `Date Paid: ${paidAt}`,
        `Payment Method: ${method}`,
        "",
        "Your payment receipt is attached to this email.",
        "Thank you for taking the next step towards your academic journey with GCC School.",
        "",
        `Questions? Call +91 ${PAY_MERCHANT.phone}, WhatsApp +91 ${PAY_MERCHANT.whatsapp} or email ${PAY_MERCHANT.email}.`,
        "",
        "Warm regards,",
        "Team GCC School",
        websiteLabel,
    ].join("\n");

    const subjectProgram = [plan?.feeType, plan?.program].filter(Boolean).join(" – ") || order.title;
    const attachments: any[] = [
        { filename: receiptFile, content: Buffer.from(receiptPdf), contentType: "application/pdf" },
    ];
    if (logo) {
        attachments.push({
            filename: "gcc-school-logo.jpg",
            content: Buffer.from(logo),
            contentType: "image/jpeg",
            cid: "gcc-logo",
            contentDisposition: "inline",
        });
    }

    await transporter.sendMail({
        from: `"GCC School" <${fromEmail}>`,
        to: order.email,
        subject: `Payment Confirmed: ${subjectProgram}${plan?.cohort ? ` (${plan.cohort})` : ""} | ${amountShort}`,
        html,
        text,
        attachments,
    });
}
