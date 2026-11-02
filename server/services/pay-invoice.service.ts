// ── Custom Payment Forms — payment receipt PDF ────────────────────────────────
// A4 receipt: logo + PAYMENT RECEIPT + PAID badge, school contact, candidate
// and program sections, line item, totals and a contact footer.
// Receipt number = our order id, Payment ID = Cashfree payment id.
import { PDFDocument, StandardFonts, rgb, type PDFFont } from "pdf-lib";
import { PAY_MERCHANT, getPayPlan, getReceiptItem } from "../utils/pay-plans";
import { formatPayDate, formatPayMethod, amountInWords, type PayOrder } from "../utils/pay-finalize";

const PURPLE = rgb(0.322, 0.09, 0.471);       // #521778 — logo purple
const LAVENDER = rgb(0.957, 0.937, 0.98);     // section headers / table head
const GREEN = rgb(0.18, 0.49, 0.196);         // #2e7d32
const GREEN_BG = rgb(0.91, 0.965, 0.914);
const TEXT = rgb(0.13, 0.13, 0.17);
const MUTED = rgb(0.42, 0.42, 0.48);
const BORDER = rgb(0.86, 0.86, 0.9);
const WHITE = rgb(1, 1, 1);

const L = 40;      // left margin
const R = 555.28;  // right margin (A4 width 595.28 - 40)

// Standard PDF fonts are WinAnsi: keep Latin-1 plus dashes/quotes, drop the rest (e.g. emoji, ₹).
const safe = (value: unknown) =>
    String(value ?? "").replace(/[^\x20-\x7E\xA0-\xFF–—‘’“”•]/g, "").trim();
const money = (n: number) => new Intl.NumberFormat("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);

export async function loadReceiptLogo(): Promise<Uint8Array | null> {
    try {
        const raw = await useStorage("assets:server").getItemRaw("pay-receipt-logo.jpg");
        return raw ? new Uint8Array(raw as ArrayBuffer) : null;
    } catch {
        return null;
    }
}

export async function buildPayInvoicePdf(order: PayOrder): Promise<Uint8Array> {
    const pdf = await PDFDocument.create();
    pdf.setTitle(`Payment Receipt ${order.orderId}`);
    pdf.setAuthor(PAY_MERCHANT.name);

    const page = pdf.addPage([595.28, 841.89]); // A4
    const W = page.getWidth();
    const H = page.getHeight();
    const regular = await pdf.embedFont(StandardFonts.Helvetica);
    const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

    type Opts = { font?: PDFFont; size?: number; color?: any; maxWidth?: number };
    const fit = (str: string, font: PDFFont, size: number, maxWidth?: number) => {
        let s = safe(str);
        if (maxWidth && font.widthOfTextAtSize(s, size) > maxWidth) {
            while (s.length > 1 && font.widthOfTextAtSize(s + "...", size) > maxWidth) s = s.slice(0, -1);
            s += "...";
        }
        return s;
    };
    // "top" = distance from the top edge to the text baseline.
    const text = (str: string, x: number, top: number, o: Opts = {}) => {
        const font = o.font || regular;
        const size = o.size || 9.5;
        page.drawText(fit(str, font, size, o.maxWidth), { x, y: H - top, size, font, color: o.color || TEXT });
    };
    const textRight = (str: string, right: number, top: number, o: Opts = {}) => {
        const font = o.font || regular;
        const size = o.size || 9.5;
        const s = fit(str, font, size, o.maxWidth);
        page.drawText(s, { x: right - font.widthOfTextAtSize(s, size), y: H - top, size, font, color: o.color || TEXT });
    };
    const center = (str: string, top: number, o: Opts = {}) => {
        const font = o.font || regular;
        const size = o.size || 9.5;
        const s = safe(str);
        page.drawText(s, { x: (W - font.widthOfTextAtSize(s, size)) / 2, y: H - top, size, font, color: o.color || TEXT });
    };
    const wrap = (str: string, font: PDFFont, size: number, maxWidth: number) => {
        const lines: string[] = [];
        let line = "";
        for (const word of safe(str).split(" ")) {
            const next = line ? `${line} ${word}` : word;
            if (line && font.widthOfTextAtSize(next, size) > maxWidth) {
                lines.push(line);
                line = word;
            } else line = next;
        }
        if (line) lines.push(line);
        return lines;
    };
    const rect = (x: number, top: number, width: number, height: number, o: { fill?: any; border?: any } = {}) =>
        page.drawRectangle({
            x, y: H - top - height, width, height,
            color: o.fill, borderColor: o.border, borderWidth: o.border ? 0.8 : 0,
        });
    const hr = (top: number, color = BORDER, thickness = 0.8) =>
        page.drawLine({ start: { x: L, y: H - top }, end: { x: R, y: H - top }, thickness, color });

    const plan = getPayPlan(order.planCode);
    const item = getReceiptItem(plan, order.title);
    const paidAt = order.paidAt ? formatPayDate(order.paidAt) : "";
    const amount = Number(order.amount || 0);
    const currency = order.currency || "INR";
    const website = PAY_MERCHANT.website.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const websiteLabel = website.startsWith("www.") ? website : `www.${website}`;

    // Purple accent strip across the very top
    rect(0, 0, W, 6, { fill: PURPLE });

    // ── Header: big logo (left) · PAYMENT RECEIPT + PAID (right) ─────────────
    const logoBytes = await loadReceiptLogo();
    if (logoBytes) {
        const logo = await pdf.embedJpg(logoBytes);
        const lw = 210;
        const lh = (lw * logo.height) / logo.width;
        page.drawImage(logo, { x: L - 14, y: H - 26 - lh, width: lw, height: lh });
    } else {
        text(PAY_MERCHANT.name.toUpperCase(), L, 70, { font: bold, size: 24, color: PURPLE });
    }

    textRight("PAYMENT RECEIPT", R, 62, { font: bold, size: 20, color: PURPLE });
    const badge = "PAID";
    const badgeW = bold.widthOfTextAtSize(badge, 10.5) + 30;
    rect(R - badgeW, 74, badgeW, 22, { fill: GREEN });
    page.drawCircle({ x: R - badgeW + 11, y: H - 85, size: 3, color: WHITE });
    text(badge, R - badgeW + 19, 88.5, { font: bold, size: 10.5, color: WHITE });

    // ── School contact (left) · receipt meta (right) ─────────────────────────
    const contact: [string, any, PDFFont][] = [
        [PAY_MERCHANT.name, TEXT, bold],
        ...PAY_MERCHANT.address.map((a): [string, any, PDFFont] => [a, MUTED, regular]),
        [`Phone: +91 ${PAY_MERCHANT.phone}`, MUTED, regular],
        [`Email: ${PAY_MERCHANT.email}`, MUTED, regular],
        [`Website: ${websiteLabel}`, MUTED, regular],
    ];
    contact.forEach(([line, color, font], i) => text(line, L, 124 + i * 13, { font, size: i === 0 ? 11 : 9, color, maxWidth: 265 }));

    const meta: [string, string][] = [
        ["Receipt No.", order.orderId],
        ["Payment ID", order.paymentId],
        ["Date Paid", paidAt],
        ["Payment Method", formatPayMethod(order.paymentMethod)],
    ];
    meta.forEach(([label, value], i) => {
        const top = 124 + i * 15;
        text(label, 290, top, { size: 9, color: MUTED });
        textRight(value || "-", R, top, { font: bold, size: 8.5, maxWidth: 210 });
    });

    hr(212);

    // ── Confirmation banner ──────────────────────────────────────────────────
    rect(L, 226, R - L, 32, { fill: GREEN_BG });
    rect(L, 226, 4, 32, { fill: GREEN });
    text("Your seat reservation payment has been successfully received.", L + 16, 246, { font: bold, size: 10.5, color: GREEN });

    // ── Two sections: Candidate Details · Program Details ────────────────────
    const cardTop = 276;
    const cardW = (R - L - 16) / 2;
    const rowH = 19;
    const section = (x: number, title: string, rows: [string, string][]) => {
        const height = 26 + rows.length * rowH + 10;
        rect(x, cardTop, cardW, height, { border: BORDER });
        rect(x, cardTop, cardW, 26, { fill: LAVENDER });
        text(title, x + 12, cardTop + 17, { font: bold, size: 10, color: PURPLE });
        rows.forEach(([label, value], i) => {
            const top = cardTop + 26 + 18 + i * rowH;
            text(label, x + 12, top, { size: 9, color: MUTED });
            text(value || "-", x + 88, top, { font: bold, size: 9.5, maxWidth: cardW - 100 });
        });
        return height;
    };
    const candidateRows: [string, string][] = [
        ["Name", order.name],
        ["Email", order.email],
        ["Phone", order.phone ? `+91 ${order.phone}` : ""],
        ["Status", "Paid"],
    ];
    const programRows: [string, string][] = [
        ["Program", plan?.program || order.title],
        ["Cohort", plan?.cohort || ""],
        ["Fee Type", plan?.feeType || ""],
        ["Amount Paid", `${currency} ${money(amount)}`],
    ];
    const cardH = Math.max(
        section(L, "CANDIDATE DETAILS", candidateRows),
        section(L + cardW + 16, "PROGRAM ENROLLED FOR", programRows),
    );

    // ── Line item table ──────────────────────────────────────────────────────
    const tTop = cardTop + cardH + 24;
    const cQty = 360, cUnit = 455, cAmt = R - 10;
    rect(L, tTop, R - L, 24, { fill: LAVENDER });
    text("Description", L + 10, tTop + 16, { font: bold, size: 9.5, color: PURPLE });
    textRight("Qty", cQty, tTop + 16, { font: bold, size: 9.5, color: PURPLE });
    textRight(`Unit Price (${currency})`, cUnit, tTop + 16, { font: bold, size: 9.5, color: PURPLE });
    textRight(`Amount (${currency})`, cAmt, tTop + 16, { font: bold, size: 9.5, color: PURPLE });

    const itemLines = wrap(item, regular, 9.5, 270);
    const itemH = Math.max(32, itemLines.length * 13 + 18);
    itemLines.forEach((line, i) => text(line, L + 10, tTop + 24 + 19 + i * 13, { size: 9.5 }));
    textRight("1", cQty, tTop + 24 + 19);
    textRight(money(amount), cUnit, tTop + 24 + 19);
    textRight(money(amount), cAmt, tTop + 24 + 19);
    hr(tTop + 24 + itemH);

    // ── Totals ───────────────────────────────────────────────────────────────
    let y = tTop + 24 + itemH + 20;
    const totalsX = 340;

    // Amount in words (left of the totals)
    text("Amount in words", L, y, { size: 8.5, color: MUTED });
    wrap(amountInWords(amount), bold, 9.5, 260).forEach((line, i) => text(line, L, y + 15 + i * 13, { font: bold, size: 9.5 }));

    text("Subtotal", totalsX, y, { size: 9.5, color: MUTED });
    textRight(`${currency} ${money(amount)}`, cAmt, y);
    y += 17;
    text("Offers & Charges", totalsX, y, { size: 9.5, color: MUTED });
    textRight(`${currency} 0.00`, cAmt, y);
    y += 10;
    rect(totalsX - 10, y, R - totalsX + 10, 26, { fill: PURPLE });
    text("Amount Paid", totalsX, y + 17, { font: bold, size: 10.5, color: WHITE });
    textRight(`${currency} ${money(amount)}`, cAmt, y + 17, { font: bold, size: 10.5, color: WHITE });
    y += 26;

    // ── Confirmation statement + next steps ──────────────────────────────────
    const fTop = 712;
    y += 20;
    const statement =
        "Your payment has been successfully received. Thank you for taking the next step towards your academic journey with GCC School.";
    const stLines = wrap(statement, bold, 10.5, R - L - 36);
    const steps = [
        "Our admissions team will get in touch with you shortly with the next steps.",
        "Please keep this receipt for your records.",
        "Quote your Receipt No. for any payment-related query.",
    ];
    const boxH = 16 + stLines.length * 15 + 6 + 14 + steps.length * 13 + 4;
    if (y + boxH < fTop - 12) {
        rect(L, y, R - L, boxH, { fill: LAVENDER });
        rect(L, y, 4, boxH, { fill: PURPLE });
        let by = y + 21;
        stLines.forEach((line) => { text(line, L + 18, by, { font: bold, size: 10.5, color: PURPLE }); by += 15; });
        by += 6;
        text("WHAT HAPPENS NEXT", L + 18, by, { font: bold, size: 8, color: MUTED });
        by += 14;
        steps.forEach((step) => {
            page.drawCircle({ x: L + 21, y: H - by + 3, size: 1.8, color: PURPLE });
            text(step, L + 30, by, { size: 9.5 });
            by += 13;
        });
    } else {
        stLines.forEach((line, i) => text(line, L, y + 14 + i * 15, { font: bold, size: 10.5, color: PURPLE }));
    }

    // ── Footer ───────────────────────────────────────────────────────────────
    hr(fTop, PURPLE, 1.2);
    center("Thank you for choosing GCC School.", fTop + 22, { font: bold, size: 12, color: PURPLE });
    center("For payment-related queries, contact our admissions team:", fTop + 40, { size: 9.5, color: MUTED });
    center(`+91 ${PAY_MERCHANT.phone}   |   ${PAY_MERCHANT.email}`, fTop + 55, { font: bold, size: 9.5 });
    center(websiteLabel, fTop + 70, { font: bold, size: 9.5, color: PURPLE });
    center(
        "This is a computer-generated receipt and does not require a signature. Payment processed securely by Cashfree Payments.",
        fTop + 92,
        { size: 7.5, color: MUTED },
    );

    return pdf.save();
}
