"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { CourseState } from "@/lib/free-course/db";
import { assignment } from "./course-data";

const words = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function AssignmentForm({ token, state, onState }: { token: string; state: CourseState; onState: (s: CourseState) => void }) {
  const [vals, setVals] = useState<string[]>(["", ""]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  if (state.assignmentDone) {
    return (
      <p className="es-pop inline-flex items-center gap-3 border border-primary bg-primary/5 px-5 py-4">
        <span className="flex h-7 w-7 items-center justify-center bg-primary text-primary-foreground"><Check className="h-4 w-4" aria-hidden /></span>
        Assignment submitted. Thank you.
      </p>
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/free-course/assignment", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, answers: vals }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Could not submit. Please try again.");
      onState(j.state);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not submit. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-8">
      {assignment.map((a, i) => (
        <div key={a.q}>
          <label htmlFor={`as-${i}`} className="flex items-start justify-between gap-4">
            <span className="font-display text-2xl italic leading-snug md:text-3xl"><span className="text-primary">Q{i + 1}.</span> {a.q}</span>
            <span className="shrink-0 border border-[var(--es-ink)] px-2 py-0.5 text-xs font-semibold">{a.marks} marks</span>
          </label>
          <textarea
            id={`as-${i}`}
            required
            minLength={20}
            maxLength={4000}
            rows={6}
            value={vals[i]}
            onChange={(e) => setVals(vals.map((v, j) => (j === i ? e.target.value : v)))}
            placeholder="Write in your own words..."
            className="mt-3 w-full border border-[var(--es-ink)] bg-white p-4 text-base leading-relaxed outline-none transition-shadow focus:shadow-[4px_4px_0_0_var(--primary)]"
          />
          <p className="mt-1 text-right text-xs text-muted-foreground tabular-nums">{words(vals[i])} words</p>
        </div>
      ))}
      {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={busy} className="min-h-12 bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60">
          {busy ? "Submitting..." : "Submit assignment"}
        </button>
        <p className="text-xs text-muted-foreground">Answers are final once submitted.</p>
      </div>
    </form>
  );
}
