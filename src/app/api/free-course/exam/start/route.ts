import { NextRequest, NextResponse } from "next/server";
import { deadline, getByToken, resetExam, startExam, stateOf, tokenSchema } from "@/lib/free-course/db";
import { buildExam } from "@/lib/free-course/exam";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = tokenSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  let row = await getByToken(parsed.data.token);
  if (!row) return NextResponse.json({ error: "unauthorized" }, { status: 401 });

  if (row.examSubmittedAt && body?.retake) {
    row = await resetExam(row);
  } else if (row.examSubmittedAt) {
    return NextResponse.json({ error: "Exam already completed.", state: stateOf(row) }, { status: 409 });
  }

  const started = await startExam(row);
  if (!started.examStartedAt || started.examSeed == null) return NextResponse.json({ error: "Could not start" }, { status: 500 });
  return NextResponse.json({
    ok: true,
    questions: buildExam(started.examSeed), // no answer key in this payload
    answers: started.examAnswers ?? {},
    remainingMs: Math.max(0, deadline(started.examStartedAt) - Date.now()),
  });
}
