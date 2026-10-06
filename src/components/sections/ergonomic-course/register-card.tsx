"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/enquiry";
import type { CourseState } from "@/lib/free-course/db";

const field =
  "mt-1.5 h-12 w-full border border-[var(--es-line)] bg-white px-3.5 text-base outline-none transition-colors placeholder:text-muted-foreground/70 focus:border-primary focus:ring-2 focus:ring-primary/20";
const label = "text-xs font-semibold uppercase tracking-widest text-muted-foreground";

export function RegisterCard({ onAuthed }: { onAuthed: (token: string, state: CourseState) => void }) {
  const id = useId();
  const [mode, setMode] = useState<"register" | "resume">("register");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/free-course/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(f)),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok || !j.token) throw new Error(j.error || "Something went wrong. Please try again.");
      trackEvent(mode === "register" ? "free_course_register" : "free_course_resume", { course: "nifs_es" });
      onAuthed(j.token, j.state);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div id="register" className="scroll-mt-32 border border-[var(--es-ink)] bg-[var(--es-paper)] p-5 shadow-[6px_6px_0_0_var(--es-ink)] md:p-7">
      <div className="flex items-baseline justify-between gap-3">
        <h2 className="font-display text-2xl italic md:text-3xl">{mode === "register" ? "Register free" : "Welcome back"}</h2>
        <span className="text-xs font-semibold uppercase tracking-widest text-primary">Step 1 of 4</span>
      </div>

      <form onSubmit={submit} aria-busy={busy} className="mt-4 space-y-3.5">
        {mode === "register" && (
          <div className="grid gap-3.5 sm:grid-cols-2">
            <div>
              <label htmlFor={`${id}-name`} className={label}>Your name</label>
              <input id={`${id}-name`} name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Full name for certificate" className={field} />
            </div>
            <div>
              <label htmlFor={`${id}-country`} className={label}>Which country are you from?</label>
              <input id={`${id}-country`} name="country" required minLength={2} maxLength={100} defaultValue="India" placeholder="e.g. India, UAE, Oman, Nigeria" className={field} />
            </div>
          </div>
        )}
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-phone`} className={label}>Mobile</label>
            <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" required maxLength={25} autoComplete="tel" placeholder="With country code if outside India" className={field} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>Email</label>
            <input id={`${id}-email`} name="email" type="email" required maxLength={200} autoComplete="email" placeholder="for your certificate" className={field} />
          </div>
        </div>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="group flex min-h-13 w-full items-center justify-center gap-2 bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60"
        >
          {busy ? "Please wait..." : mode === "register" ? "Register FREE and start" : "Continue my course"}
          {!busy && <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <button type="button" onClick={() => { setMode(mode === "register" ? "resume" : "register"); setError(""); }} className="min-h-11 text-sm underline underline-offset-4 hover:text-primary">
          {mode === "register" ? "Already registered? Continue" : "New here? Register free"}
        </button>
        <p className="text-xs text-muted-foreground">No fees. NIFS may contact you about programs.</p>
      </div>
    </div>
  );
}
