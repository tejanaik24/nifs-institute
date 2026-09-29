import { NextRequest, NextResponse } from "next/server";
import { getRequestLocation } from "@/lib/geo";
import { registerSchema, registerStudent, stateOf } from "@/lib/free-course/db";

export async function POST(request: NextRequest) {
  const parsed = registerSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid details" }, { status: 400 });
  }
  const { city, state } = getRequestLocation(request);
  try {
    const row = await registerStudent(parsed.data, city, state);
    return NextResponse.json({ ok: true, token: row.token, state: stateOf(row) });
  } catch {
    return NextResponse.json({ error: "Could not register right now. Please try again." }, { status: 500 });
  }
}
