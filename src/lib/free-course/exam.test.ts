import { describe, expect, it } from "vitest";
import { TOTAL, answeredCount, buildExam, scoreExam } from "./exam";

describe("free course exam", () => {
  it("has 20 questions, every one appearing exactly once, and no key in the public payload", () => {
    const exam = buildExam(42);
    expect(exam).toHaveLength(20);
    expect(new Set(exam.map((q) => q.id)).size).toBe(20);
    expect(JSON.stringify(exam)).not.toMatch(/"a"|correct|answer/i);
  });

  it("is deterministic per seed and different across seeds", () => {
    expect(buildExam(7)).toEqual(buildExam(7));
    expect(buildExam(7).map((q) => q.id)).not.toEqual(buildExam(8).map((q) => q.id));
  });

  it("scores by original option index, ignoring shuffled order", () => {
    // question 0 correct option is index 1 in the bank
    expect(scoreExam({ "0": 1 })).toBe(1);
    expect(scoreExam({ "0": 0 })).toBe(0);
    expect(scoreExam({})).toBe(0);
    expect(TOTAL).toBe(20);
  });

  it("counts only valid answers as answered", () => {
    expect(answeredCount({ "0": 1, "1": 9, "2": -1 })).toBe(1);
  });
});
