import { NextRequest, NextResponse } from "next/server";
import { getByToken, resetExam, stateOf, tokenSchema } from "@/lib/free-course/db";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = tokenSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const row = await getByToken(parsed.data.token);
  if (!row) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  const reset = await resetExam(row);
  return NextResponse.json({
    ok: true,
    state: stateOf(reset),
  });
}

