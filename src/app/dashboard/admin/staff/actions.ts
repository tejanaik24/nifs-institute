"use server";

import { revalidatePath } from "next/cache";
import { getSession } from "@/lib/auth/session";
import { hashPassword } from "@/lib/auth/password";
import { createUser, deleteUser, getUserByEmail } from "@/lib/db/users";

export async function addStaffAction(formData: FormData): Promise<{ error?: string; success?: boolean }> {
  const session = await getSession();
  if (session?.role !== "admin") {
    return { error: "Unauthorized: Only administrators can add staff." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Please fill out all fields (Name, Email, Password)." };
  }

  const existing = await getUserByEmail(email);
  if (existing) {
    return { error: "A user with this email already exists." };
  }

  const passwordHash = await hashPassword(password);
  await createUser({
    name,
    email,
    passwordHash,
    role: "staff",
  });

  revalidatePath("/dashboard/admin/staff");
  return { success: true };
}

export async function deleteStaffAction(userId: number): Promise<{ error?: string; success?: boolean }> {
  const session = await getSession();
  if (session?.role !== "admin") {
    return { error: "Unauthorized: Only administrators can remove staff." };
  }

  if (session.userId === userId) {
    return { error: "You cannot delete your own admin account." };
  }

  await deleteUser(userId);
  revalidatePath("/dashboard/admin/staff");
  return { success: true };
}
