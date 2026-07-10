import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  course: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid submission", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toAddress = process.env.ADMISSIONS_EMAIL ?? "admissions@nifsindia.net";

  if (resendApiKey) {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NIFS Website <noreply@nifsindia.net>",
        to: toAddress,
        subject: `New enquiry from ${parsed.data.name}`,
        text: `Name: ${parsed.data.name}\nPhone: ${parsed.data.phone}\nEmail: ${parsed.data.email}\nCourse: ${parsed.data.course ?? "—"}\nMessage: ${parsed.data.message ?? "—"}`,
      }),
    });
  } else {
    console.log("[contact] RESEND_API_KEY not set — logging submission instead:", parsed.data);
  }

  return NextResponse.json({ ok: true });
}
