import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/enquiry";

// Public endpoint hit by the admissions "Request Call Back" form. Stores the
// lead directly in Postgres instead of routing through formsubmit.co, whose
// AJAX endpoint silently rejects every submission until someone finds and
// clicks an "Activate Form" email — a failure mode invisible from the site.
export async function POST(request: NextRequest) {
  const parsed = enquirySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
  const { name, phone, course } = parsed.data;
  await db.insert(enquiries).values({ name, phone, course: course || "General Enquiry" });
  return NextResponse.json({ ok: true });
}
