"use server";

import { verifyPassword } from "@/lib/auth/password";
import { createSessionToken } from "@/lib/auth/session";
import { getUserByUsernameOrEmail } from "@/lib/db/users";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(_prevState: string | null, formData: FormData) {
  const username = String(
    formData.get("username") ?? formData.get("email") ?? "",
  );
  const password = String(formData.get("password") ?? "");

  let user;
  try {
    user = await getUserByUsernameOrEmail(username);
  } catch {
    return "Dashboard isn't fully connected yet — database setup is still in progress.";
  }

  if (!user || !(await verifyPassword(password, user.passwordHash))) {
    return "Wrong username or password.";
  }

  const token = await createSessionToken({
    userId: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  });
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
