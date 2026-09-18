import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { isDraftWorthy } from "@/lib/enquiry-draft";

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
  await db
    .update(enquiries)
    .set({ name: name.trim(), phone: phone.trim(), course })
    .where(eq(enquiries.id, draftId));
  return NextResponse.json({ ok: true });
}
