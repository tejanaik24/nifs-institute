import { NextRequest, NextResponse } from "next/server";
import { getByToken, stateOf, tokenSchema } from "@/lib/free-course/db";

export async function POST(request: NextRequest) {
  const parsed = tokenSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const row = await getByToken(parsed.data.token);
  if (!row) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ ok: true, state: stateOf(row) });
}
