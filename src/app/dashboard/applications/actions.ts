"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { markApplicationOpened, getApplicationById } from "@/lib/db/jobs";

export async function openApplicationAction(id: number) {
  const session = await getSession();
  if (!session) {
    return { error: "Not logged in" };
  }

  // Atomically marks application opened if not opened yet
  const updated = await markApplicationOpened(id, session.userId);
  revalidatePath("/dashboard/applications");

  const fullApp = await getApplicationById(id);
  return { success: true, application: fullApp };
}
