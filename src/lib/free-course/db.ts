import { and, eq, isNull } from "drizzle-orm";
import { randomBytes, randomInt } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/db/client";
import { courseRegistrations as t, enquiries } from "@/lib/db/schema";
import { enquirySchema } from "@/lib/enquiry";
import { COURSE_TAG } from "@/components/sections/ergonomic-course/course-data";
import { EXAM_MS, GRACE_MS, TOTAL, answeredCount, deadline, scoreExam } from "./exam";

export const registerSchema = z.object({
  name: enquirySchema.shape.name,
  phone: enquirySchema.shape.phone,
  email: z.string().trim().toLowerCase().max(200, "Email is too long").pipe(z.email("Enter a valid email address")),
});

export const tokenSchema = z.object({ token: z.string().length(48) });

export type Row = typeof t.$inferSelect;
export type CourseState = {
  name: string;
  email: string;
  rollNo: string;
  timedOut?: boolean;
  assignmentDone: boolean;
  exam: "locked" | "ready" | "running" | "done";
  score?: number;
  total: number;
  remainingMs?: number;
};

export function stateOf(r: Row, now = Date.now()): CourseState {
  const exam = r.examSubmittedAt ? "done" : r.examStartedAt ? "running" : "ready";
  return {
    name: r.name,
    email: r.email,
    rollNo: `NIFS-ES-${String(r.id).padStart(5, "0")}`,
    assignmentDone: !!r.assignmentAt,
    exam,
    total: TOTAL,
    ...(exam === "done" ? { score: r.score ?? 0, timedOut: !!r.examStartedAt && !!r.examSubmittedAt && r.examSubmittedAt.getTime() >= deadline(r.examStartedAt) - 3000 } : {}),
    ...(exam === "running" && r.examStartedAt ? { remainingMs: Math.max(0, deadline(r.examStartedAt) - now) } : {}),
  };
}

/** Load by token. If the exam clock ran out while the student was away, finalize it from the last autosave. */
export async function getByToken(token: string): Promise<Row | null> {
  const [row] = await db.select().from(t).where(eq(t.token, token)).limit(1);
  if (!row) return null;
  if (row.examStartedAt && !row.examSubmittedAt && Date.now() > deadline(row.examStartedAt) + GRACE_MS) {
    const [done] = await db
      .update(t)
      .set({ examSubmittedAt: new Date(deadline(row.examStartedAt)), score: scoreExam(row.examAnswers ?? {}) })
      .where(and(eq(t.id, row.id), isNull(t.examSubmittedAt)))
      .returning();
    return done ?? { ...row, examSubmittedAt: new Date(deadline(row.examStartedAt)) };
  }
  return row;
}

export async function registerStudent(v: z.output<typeof registerSchema>, city: string, state: string): Promise<Row> {
  const [existing] = await db.select().from(t).where(and(eq(t.course, "ergonomic-safety"), eq(t.phone, v.phone), eq(t.email, v.email))).limit(1);
  if (existing) return existing;
  const [row] = await db.insert(t).values({ name: v.name, phone: v.phone, email: v.email, token: randomBytes(24).toString("hex") }).returning();
  // Keep the lead in the existing callbacks list too.
  await db.insert(enquiries).values({ name: v.name, phone: v.phone, course: COURSE_TAG, city, state }).catch(() => {});
  return row;
}

export async function findByContact(phone: string, email: string): Promise<Row | null> {
  const [row] = await db.select().from(t).where(and(eq(t.course, "ergonomic-safety"), eq(t.phone, phone), eq(t.email, email))).limit(1);
  return row ?? null;
}

export async function saveAssignment(id: number, answers: string[]) {
  await db.update(t).set({ assignmentAnswers: answers, assignmentAt: new Date() }).where(eq(t.id, id));
}

/** Sets the start time exactly once, even if two tabs press Start together. */
export async function startExam(row: Row): Promise<Row> {
  if (row.examStartedAt) return row;
  const [started] = await db
    .update(t)
    .set({ examStartedAt: new Date(), examSeed: randomInt(1, 2 ** 31 - 1), examAnswers: {} })
    .where(and(eq(t.id, row.id), isNull(t.examStartedAt)))
    .returning();
  if (started) return started;
  const [again] = await db.select().from(t).where(eq(t.id, row.id)).limit(1);
  return again;
}

export function cleanAnswers(raw: unknown): Record<string, number> {
  const out: Record<string, number> = {};
  if (raw && typeof raw === "object") {
    for (const [k, v] of Object.entries(raw as Record<string, unknown>)) {
      const id = Number(k);
      if (Number.isInteger(id) && id >= 0 && id < TOTAL && Number.isInteger(v) && (v as number) >= 0 && (v as number) <= 3) out[String(id)] = v as number;
    }
  }
  return out;
}

export async function saveExamAnswers(id: number, answers: Record<string, number>, final: boolean) {
  const [row] = await db
    .update(t)
    .set(final ? { examAnswers: answers, examSubmittedAt: new Date(), score: scoreExam(answers) } : { examAnswers: answers })
    .where(and(eq(t.id, id), isNull(t.examSubmittedAt)))
    .returning();
  return row ?? null;
}

/** Resets the candidate's exam state to allow rewriting the exam. */
export async function resetExam(row: Row): Promise<Row> {
  const [reset] = await db
    .update(t)
    .set({
      examStartedAt: null,
      examSubmittedAt: null,
      examSeed: null,
      examAnswers: {},
      score: null,
    })
    .where(eq(t.id, row.id))
    .returning();
  return reset ?? row;
}

export { EXAM_MS, answeredCount, deadline, TOTAL };
