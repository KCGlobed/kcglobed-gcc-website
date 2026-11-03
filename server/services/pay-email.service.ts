// ── Custom Payment Forms — confirmation email with invoice PDF ────────────────
// Uses the same SMTP env vars as the payment-failure email.
import nodemailer from "nodemailer";
import { PAY_MERCHANT } from "../utils/pay-plans";
import { formatPayDate, type PayOrder } from "../utils/pay-finalize";

const escapeHtml = (value: unknown) =>
    String(value ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));

export async function sendPayConfirmationEmail(order: PayOrder, invoicePdf: Uint8Array) {
    const config = useRuntimeConfig();
    const emailUser = String(config.emailUser || process.env.EMAIL_HOST_USER || "");
    const fromEmail = process.env.DEFAULT_FROM_EMAIL || emailUser;

    const transporter = nodemailer.createTransport({
        host: String(config.emailHost || process.env.EMAIL_HOST || ""),
        port: process.env.EMAIL_PORT ? Number(process.env.EMAIL_PORT) : 587,
        secure: process.env.EMAIL_USE_SSL === "True" || process.env.EMAIL_USE_SSL === "true",
        auth: { user: emailUser, pass: String(config.emailPassword || process.env.EMAIL_HOST_PASSWORD || "") },
    });

    const amount = new Intl.NumberFormat("en-IN", { style: "currency", currency: order.currency || "INR" }).format(order.amount);
    const paidAt = order.paidAt ? formatPayDate(order.paidAt) : "";

    const rows: [string, string][] = [
        ["Amount Paid", amount],
        ["Invoice Number", order.orderId],
        ["Receipt Number", order.paymentId],
        ["Date Paid", paidAt],
        ["Payment Method", order.paymentMethod],
        ["Program", order.program],
    ];
    const rowsHtml = rows
        .filter(([, v]) => v)
        .map(([k, v]) => `
          <tr>
            <td style="padding:10px 0;border-bottom:1px solid #ede8f8;font-size:14px;color:#666;">${k}</td>
            <td style="padding:10px 0;border-bottom:1px solid #ede8f8;font-size:14px;color:#2D1B5A;font-weight:600;text-align:right;">${escapeHtml(v)}</td>
          </tr>`)
        .join("");

    const html = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f4f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;">
        <tr>
          <td style="background:#61358f;padding:28px 32px;color:#fff;">
            <p style="margin:0;font-size:13px;opacity:.85;">Payment received</p>
            <h1 style="margin:6px 0 0;font-size:22px;">${escapeHtml(order.title)}</h1>
          </td>
        </tr>
        <tr>
          <td style="padding:28px 32px 0;font-size:15px;color:#333;line-height:1.7;">
            <p style="margin:0;">Dear <strong>${escapeHtml(order.name)}</strong>,</p>
            <p style="margin:12px 0 0;">Greetings from GCC School! We have received your payment of <strong>${amount}</strong>.
            Your invoice is attached to this email. Please keep it for your records.</p>
          </td>
        </tr>
        <tr>
          <td style="padding:20px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf7ff;border:1px solid #e2d9f3;border-radius:10px;padding:4px 20px;">
              ${rowsHtml}
            </table>
          </td>
        </tr>
        <tr>
          <td style="padding:0 32px 28px;font-size:14px;color:#555;line-height:1.7;">
            <p style="margin:0;">Our team will get in touch with you shortly with the next steps.</p>
            <p style="margin:12px 0 0;">For any help, write to
              <a href="mailto:${PAY_MERCHANT.email}" style="color:#61358f;">${PAY_MERCHANT.email}</a>
              or call +91 ${PAY_MERCHANT.phone}.</p>
            <p style="margin:16px 0 0;">Warm regards,<br><strong>Team GCC School</strong><br>
              <a href="${PAY_MERCHANT.website}" style="color:#61358f;">${PAY_MERCHANT.website}</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

    await transporter.sendMail({
        from: `"GCC School" <${fromEmail}>`,
        to: order.email,
        subject: `Payment Received – ${order.title} (${amount})`,
        html,
        attachments: [
            {
                filename: `Invoice_${order.orderId}.pdf`,
                content: Buffer.from(invoicePdf),
                contentType: "application/pdf",
            },
        ],
    });
}
