import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { isDraftWorthy } from "@/lib/enquiry-draft";

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
  const [row] = await db
    .insert(enquiries)
    .values({ name: name.trim(), phone: phone.trim(), course, status: "draft" })
    .returning({ id: enquiries.id });
  return NextResponse.json({ ok: true, id: row.id });
}
