import { and, count, eq, gt } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { courseSuggestions } from "@/lib/db/schema";
import { getByToken, tokenSchema } from "@/lib/free-course/db";

const schema = tokenSchema.extend({ message: z.string().trim().min(3, "Write at least a few words").max(2000, "Keep it under 2000 characters") });
const MAX_PER_DAY = 5;

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid message" }, { status: 400 });
  const row = await getByToken(parsed.data.token);
  if (!row) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const [{ n }] = await db.select({ n: count() }).from(courseSuggestions).where(and(eq(courseSuggestions.registrationId, row.id), gt(courseSuggestions.createdAt, since)));
  if (n >= MAX_PER_DAY) return NextResponse.json({ error: "You have sent a few messages today already. Please try again tomorrow." }, { status: 429 });

  await db.insert(courseSuggestions).values({ registrationId: row.id, message: parsed.data.message });
  return NextResponse.json({ ok: true });
}
