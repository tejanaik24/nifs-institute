import { NextRequest, NextResponse } from "next/server";
import { findByContact, getByToken, registerSchema, stateOf } from "@/lib/free-course/db";

// Already-registered students come back with mobile + email (both must match).
export async function POST(request: NextRequest) {
  const parsed = registerSchema.pick({ phone: true, email: true }).safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid details" }, { status: 400 });
  const found = await findByContact(parsed.data.phone, parsed.data.email);
  const row = found ? await getByToken(found.token) : null;
  if (!row) return NextResponse.json({ error: "No registration found for that mobile and email." }, { status: 404 });
  return NextResponse.json({ ok: true, token: row.token, state: stateOf(row) });
}
