"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { courseRegistrations } from "@/lib/db/schema";
import { sendCertificateEmail } from "@/lib/email/certificate";

export async function markCertificateSent(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.update(courseRegistrations).set({ certificateSentAt: new Date() }).where(eq(courseRegistrations.id, id));
  revalidatePath("/dashboard/course-exams");
}

export async function sendCertificateEmailAction(id: number, pdfBase64?: string) {
  const session = await getSession();
  if (!session) return { ok: false, error: "Unauthorized" };
  if (!Number.isInteger(id)) return { ok: false, error: "Invalid ID" };

  const [r] = await db.select().from(courseRegistrations).where(eq(courseRegistrations.id, id)).limit(1);
  if (!r || !r.examSubmittedAt) return { ok: false, error: "Certificate not found." };

  const date = r.examSubmittedAt.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
  const certNo = `NIFS-ES-${String(r.id).padStart(5, "0")}`;

  const result = await sendCertificateEmail({ to: r.email, name: r.name, certNo, date, pdfBase64 });
  if (!result.ok) return { ok: false, error: result.error };

  const now = new Date();
  await db.update(courseRegistrations).set({ certificateSentAt: now }).where(eq(courseRegistrations.id, id));
  revalidatePath("/dashboard/course-exams");
  revalidatePath(`/dashboard/course-exams/${id}/certificate`);

  return { ok: true, sentAt: now.toISOString() };
}

