import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { TOTAL, answeredCount, cleanAnswers, deadline, getByToken, saveExamAnswers, stateOf, tokenSchema } from "@/lib/free-course/db";

const schema = tokenSchema.extend({ answers: z.record(z.string(), z.number()), final: z.boolean() });

// final:false autosaves progress; final:true submits. The server clock decides everything.
export async function POST(request: NextRequest) {
  const parsed = schema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid submission" }, { status: 400 });
  const row = await getByToken(parsed.data.token);
  if (!row) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  if (!row.examStartedAt) return NextResponse.json({ error: "Exam not started" }, { status: 409 });
  // getByToken already finalizes an exam whose clock ran out, so a submitted row is simply reported.
  if (row.examSubmittedAt) return NextResponse.json({ ok: true, done: true, state: stateOf(row) });

  const answers = cleanAnswers(parsed.data.answers);
  const timeUp = Date.now() >= deadline(row.examStartedAt) - 3000;
  if (!parsed.data.final) {
    if (!timeUp) await saveExamAnswers(row.id, answers, false);
    return NextResponse.json({ ok: true });
  }
  if (answeredCount(answers) < TOTAL && !timeUp) {
    return NextResponse.json({ error: `Answer all ${TOTAL} questions before submitting.` }, { status: 400 });
  }
  await saveExamAnswers(row.id, answers, true);
  const fresh = await getByToken(parsed.data.token);
  return NextResponse.json({ ok: true, done: true, state: stateOf(fresh!) });
}
