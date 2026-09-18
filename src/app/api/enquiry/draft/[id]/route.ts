import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { isDraftWorthy } from "@/lib/enquiry-draft";
import { enquirySchema } from "@/lib/enquiry";

// Updates the same draft row as the visitor keeps typing, instead of
// inserting a new row on every debounced save.
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const draftId = Number(id);
  if (!Number.isInteger(draftId)) {
    return NextResponse.json({ error: "invalid id" }, { status: 400 });
  }
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
  const result = await db
    .update(enquiries)
    .set({ name: name.trim(), phone: normalizedPhone, course })
    .where(and(eq(enquiries.id, draftId), eq(enquiries.status, "draft")))
    .returning({ id: enquiries.id });
  if (result.length === 0) {
    return NextResponse.json({ error: "draft not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
