import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email(),
  course: z.string().optional(),
  message: z.string().optional(),
});

// Per-instance in-memory rate limiter (not distributed across serverless cold starts).
// Upstash/@vercel/firewall is the upgrade path if real abuse volume shows up.
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export async function POST(request: Request) {
  // Rate limiting check
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "127.0.0.1";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const limit = 5;

  const record = rateLimitMap.get(ip);
  if (!record) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    if (now > record.resetTime) {
      rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    } else {
      if (record.count >= limit) {
        return NextResponse.json(
          { error: "Too many requests. Please try again after 10 minutes." },
          { status: 429 }
        );
      }
      record.count++;
    }
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid body format" },
      { status: 400 }
    );
  }

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
    console.log("[contact] RESEND_API_KEY not set — submission dropped");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
