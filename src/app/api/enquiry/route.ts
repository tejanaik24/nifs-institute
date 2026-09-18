import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/enquiry";

// Public endpoint hit by the admissions "Request Call Back" form. Stores the
// lead directly in Postgres instead of routing through formsubmit.co, whose
// AJAX endpoint silently rejects every submission until someone finds and
// clicks an "Activate Form" email — a failure mode invisible from the site.
export async function POST(request: NextRequest) {
  const raw = (await request.json().catch(() => null)) as
    | (Record<string, unknown> & { draftId?: unknown })
    | null;
  const parsed = enquirySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  const { name, phone, course } = parsed.data;
  const draftId = typeof raw?.draftId === "number" ? raw.draftId : null;
  if (draftId !== null) {
    // Visitor already had a draft saved from auto-save — update that row
    // to "submitted" instead of inserting a second one.
    await db
      .update(enquiries)
      .set({ name, phone, course: course || "General Enquiry", status: "submitted" })
      .where(eq(enquiries.id, draftId));
  } else {
    await db.insert(enquiries).values({ name, phone, course: course || "General Enquiry" });
  }
  return NextResponse.json({ ok: true });
}
