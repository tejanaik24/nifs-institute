import { eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { COURSE_TAG } from "@/components/sections/ergonomic-course/course-data";

export type LeadStatus = "Submitted" | "Half-filled" | "Submitted later" | "Joined free course";

// A draft row stays "draft" forever when the visitor reloads/comes back and
// submits from a fresh page (the form only remembers its draft id in memory),
// so a draft is only truly half-filled if that phone never submitted anywhere.
export async function getLeadStatusResolver() {
  const submitted = await db
    .selectDistinct({ phone: enquiries.phone, course: enquiries.course })
    .from(enquiries)
    .where(eq(enquiries.status, "submitted"));
  const callbackPhones = new Set(submitted.filter((r) => r.course !== COURSE_TAG).map((r) => r.phone));
  const freeCoursePhones = new Set(submitted.filter((r) => r.course === COURSE_TAG).map((r) => r.phone));

  return (row: { status: string; phone: string }): LeadStatus => {
    if (row.status !== "draft") return "Submitted";
    if (callbackPhones.has(row.phone)) return "Submitted later";
    if (freeCoursePhones.has(row.phone)) return "Joined free course";
    return "Half-filled";
  };
}
