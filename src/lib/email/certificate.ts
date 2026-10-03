import { Resend } from "resend";

// NIFS's own domain must be verified in the Resend dashboard before this
// can actually deliver — see RESEND_API_KEY in .env.example for setup notes.
const FROM = "NIFS India Academics <academics@nifsindia.net>";

export async function sendCertificateEmail(opts: {
  to: string;
  name: string;
  certNo: string;
  date: string;
  pdfBase64?: string;
}): Promise<{ ok: true } | { ok: false; error: string }> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY is not set — email sending isn't configured yet." };
  }

  const resend = new Resend(apiKey);
  const { name, certNo, date, to, pdfBase64 } = opts;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1C1917;">
      <p>Dear ${name},</p>
      <p>Congratulations on successfully completing the executive credential program in <strong>Occupational Ergonomic Safety (NIFS-ES)</strong> conducted by the National Institute of Fire &amp; Safety (NIFS India).</p>
      <table style="margin: 16px 0; border-collapse: collapse;">
        <tr><td style="padding: 2px 12px 2px 0; color: #78716C;">Candidate Name</td><td><strong>${name.toUpperCase()}</strong></td></tr>
        <tr><td style="padding: 2px 12px 2px 0; color: #78716C;">Certificate ID</td><td><strong>${certNo}</strong></td></tr>
        <tr><td style="padding: 2px 12px 2px 0; color: #78716C;">Issue Date</td><td><strong>${date}</strong></td></tr>
      </table>
      <p>Your official certificate is attached to this email as a PDF.</p>
      <p>This certified qualification awards Continuing Professional Development (CPD) credits, recognized towards fast-track admission into the Advance Diploma in Industrial Safety (ADIS) and B.Sc. in Fire &amp; Industrial Safety.</p>
      <p style="background: #FDF4E7; border: 1px solid #E9D5A8; border-radius: 6px; padding: 12px 16px; margin: 16px 0;">
        <strong>Thinking about a full career in fire &amp; industrial safety?</strong> This course is your first step — NIFS graduates go on to work with Adani, L&amp;T, ITC, Amazon and more. Reply to this email or call/WhatsApp <strong>+91 8374 340 999</strong> and our admissions team will walk you through the next course and placement support, free of cost.
      </p>
      <p style="margin-top: 24px;">Warm regards,<br/>Controller of Academics &amp; Examination Board<br/>National Institute of Fire &amp; Safety (NIFS India)<br/>Govt. Recognized • Estd. 2004</p>
    </div>
  `;

  try {
    const result = await resend.emails.send({
      from: FROM,
      to,
      subject: `Official Certificate of Completion: Occupational Ergonomic Safety (${certNo}) - NIFS India`,
      html,
      attachments: pdfBase64
        ? [{ filename: `${certNo}.pdf`, content: Buffer.from(pdfBase64, "base64") }]
        : undefined,
    });
    if (result.error) {
      return { ok: false, error: result.error.message };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Failed to send email." };
  }
}
