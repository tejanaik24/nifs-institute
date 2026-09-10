import { desc, eq, ilike, or } from "drizzle-orm";
import { db } from "./client";
import { users } from "./schema";

export async function getUserByUsernameOrEmail(identifier: string) {
  const clean = identifier.trim();
  const rows = await db
    .select()
    .from(users)
    .where(
      or(
        ilike(users.email, clean),
        ilike(users.name, clean),
        eq(users.email, clean),
      ),
    )
    .limit(1);
  return rows[0] ?? null;
}

export async function getUserByEmail(email: string) {
  return getUserByUsernameOrEmail(email);
}

export async function getUserById(id: number) {
  const rows = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return rows[0] ?? null;
}

export async function getAllUsers() {
  return db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
    })
    .from(users)
    .orderBy(desc(users.createdAt));
}

export async function createUser(data: {
  name: string;
  email: string;
  passwordHash: string;
  role?: "admin" | "staff";
}) {
  const rows = await db
    .insert(users)
    .values({
      name: data.name,
      email: data.email,
      passwordHash: data.passwordHash,
      role: data.role ?? "staff",
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      createdAt: users.createdAt,
    });
  return rows[0];
}

export async function deleteUser(id: number) {
  const rows = await db.delete(users).where(eq(users.id, id)).returning();
  return rows[0];
}
