import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getByToken, saveAssignment, stateOf, tokenSchema } from "@/lib/free-course/db";

const schema = tokenSchema.extend({
  answers: z.array(z.string().trim().min(20, "Write at least a couple of sentences for each answer").max(4000)).length(2),
});

export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid answers" }, { status: 400 });
  const row = await getByToken(parsed.data.token);
  if (!row) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await saveAssignment(row.id, parsed.data.answers);
  const fresh = await getByToken(parsed.data.token);
  return NextResponse.json({ ok: true, state: stateOf(fresh!) });
}
