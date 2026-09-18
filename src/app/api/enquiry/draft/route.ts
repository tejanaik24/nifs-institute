import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { isDraftWorthy } from "@/lib/enquiry-draft";
import { enquirySchema } from "@/lib/enquiry";

// Called a couple seconds after the visitor stops typing in the callback
// form, before they submit — see enquiry-form.tsx. Saves a real, callable
// lead even if they abandon the form for WhatsApp instead of hitting
// Submit. Never validates as strictly as the real submit endpoint
// (/api/enquiry) — a draft is allowed to be rough.
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as
    | { name?: unknown; phone?: unknown; course?: unknown }
    | null;
  const name = typeof body?.name === "string" ? body.name : "";
  const phone = typeof body?.phone === "string" ? body.phone : "";
  if (!isDraftWorthy(name, phone)) {
    return NextResponse.json({ error: "not enough to save yet" }, { status: 400 });
  }
  const course = typeof body?.course === "string" ? body.course : "";
  // Normalize like the real submit path so a formatted number (e.g.
  // "+91 (98765) 43210") doesn't trip the length cap or break tel: links
  // later. Loose on purpose: an unparseable draft phone still falls back
  // to the raw trimmed value instead of being rejected.
  const phoneParsed = enquirySchema.shape.phone.safeParse(phone);
  const normalizedPhone = phoneParsed.success ? phoneParsed.data : phone.trim();
  if (name.trim().length > 100 || normalizedPhone.length > 15 || course.length > 200) {
    return NextResponse.json({ error: "input too long" }, { status: 400 });
  }
  const [row] = await db
    .insert(enquiries)
    .values({ name: name.trim(), phone: normalizedPhone, course, status: "draft" })
    .returning({ id: enquiries.id });
  return NextResponse.json({ ok: true, id: row.id });
}
