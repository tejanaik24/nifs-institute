"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getUserByEmail } from "@/lib/db/users";
import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/session";

export async function login(_prevState: string | null, formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  let user;
  try {
    user = await getUserByEmail(email);
  } catch {
    return "Dashboard isn't fully connected yet — database setup is still in progress.";
  }

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return "Wrong email or password.";
  }

  const token = await createSessionToken(user.id);
  const cookieStore = await cookies();
  cookieStore.set("nifs_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  redirect("/dashboard");
}
