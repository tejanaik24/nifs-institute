import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/enquiry";
import { getRequestLocation } from "@/lib/geo";

// Public endpoint hit by the admissions "Request Call Back" form. Stores the
// lead directly in Postgres instead of routing through formsubmit.co, whose
// AJAX endpoint silently rejects every submission until someone finds and
// clicks an "Activate Form" email — a failure mode invisible from the site.
export async function POST(request: NextRequest) {
  const raw = (await request.json().catch(() => null)) as
    | (Record<string, unknown> & { draftId?: unknown; draftToken?: unknown })
    | null;
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  const { name, phone, course } = parsed.data;
  const draftId = typeof raw?.draftId === "number" ? raw.draftId : null;
  const draftToken = typeof raw?.draftToken === "string" ? raw.draftToken : null;
  const { city, state } = getRequestLocation(request);
  let updated: { id: number }[] = [];
  if (draftId !== null && draftToken !== null) {
    // Visitor already had a draft saved from auto-save — update that row
    // to "submitted" instead of inserting a second one. Scoped to
    // status='draft' and the ownership token (see
    // migrations/lead-capture-draft-token.sql) so a guessed/stale id can
    // never overwrite an already-submitted (or someone else's) row.
    // Also refreshes city/state to this request's location — the draft may
    // have been created from a different network than where they finished
    // submitting, so the submit-time location is the more accurate one.
    updated = await db
      .update(enquiries)
      .set({ name, phone, course: course || "General Enquiry", city, state, status: "submitted" })
      .where(and(eq(enquiries.id, draftId), eq(enquiries.status, "draft"), eq(enquiries.draftToken, draftToken)))
      .returning({ id: enquiries.id });
  }
  if (updated.length === 0) {
    // No draftId given, or it didn't match a real draft row — insert fresh
    // rather than lose the submission.
    await db.insert(enquiries).values({ name, phone, course: course || "General Enquiry", city, state });
  }
  return NextResponse.json({ ok: true });
}
