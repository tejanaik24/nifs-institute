"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { db } from "@/lib/db/client";
import { courseRegistrations } from "@/lib/db/schema";

export async function markCertificateSent(formData: FormData) {
  const session = await getSession();
  if (!session) return;
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await db.update(courseRegistrations).set({ certificateSentAt: new Date() }).where(eq(courseRegistrations.id, id));
  revalidatePath("/dashboard/course-exams");
}

export async function sendCertificateEmailAction(id: number) {
  const session = await getSession();
  if (!session) return { ok: false, error: "Unauthorized" };
  if (!Number.isInteger(id)) return { ok: false, error: "Invalid ID" };

  const now = new Date();
  await db.update(courseRegistrations).set({ certificateSentAt: now }).where(eq(courseRegistrations.id, id));
  revalidatePath("/dashboard/course-exams");
  revalidatePath(`/dashboard/course-exams/${id}/certificate`);

  return { ok: true, sentAt: now.toISOString() };
}

