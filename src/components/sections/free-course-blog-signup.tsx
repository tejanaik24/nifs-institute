"use client";

import { useId, useState } from "react";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/enquiry";

// Must match TOKEN_KEY in ergonomic-course/course-app.tsx: the course page reads
// this key on load and, if the token is valid, opens the course already signed in.
// Duplicated here so the blog page does not bundle the whole course app.
const TOKEN_KEY = "nifs-es-token";
const COURSE_URL = "/courses/ergonomic-safety/";

const input =
  "mt-1.5 h-12 w-full rounded-lg border border-slate-300 bg-white px-3.5 text-base text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-primary focus:ring-2 focus:ring-primary/20";
const label = "text-xs font-semibold uppercase tracking-wider text-slate-600";

/** Registers the reader for the free Ergonomic Safety course straight from a
 * blog post, then opens the course page already signed in. Uses the same
 * /api/free-course/register endpoint as the course page's own form. */
export function FreeCourseBlogSignup() {
  const id = useId();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/free-course/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(form)),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.token) throw new Error(data.error || "Something went wrong. Please try again.");
      trackEvent("free_course_register", { course: "nifs_es", source: "blog" });
      try { localStorage.setItem(TOKEN_KEY, data.token); } catch {}
      window.location.href = COURSE_URL;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setBusy(false);
    }
  }

  return (
    <div className="not-prose my-10 rounded-2xl border border-primary/25 bg-primary/5 p-6 shadow-sm md:p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-primary">Free course · NIFS ES</p>
      <h3 className="font-display mt-1 text-2xl italic text-slate-900 md:text-3xl">Register free and start now</h3>
      <p className="mt-2 text-sm text-slate-600">
        3 hours online, a study guide and a certificate by email. Fill this in and you go straight into the course.
      </p>
      <form onSubmit={submit} aria-busy={busy} className="mt-5 space-y-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-name`} className={label}>Your name</label>
            <input id={`${id}-name`} name="name" required minLength={2} maxLength={100} autoComplete="name" placeholder="Full name for certificate" className={input} />
          </div>
          <div>
            <label htmlFor={`${id}-country`} className={label}>Which country are you from?</label>
            <input id={`${id}-country`} name="country" required minLength={2} maxLength={100} defaultValue="India" placeholder="e.g. India, UAE, Oman, Nigeria" className={input} />
          </div>
        </div>
        <div className="grid gap-3.5 sm:grid-cols-2">
          <div>
            <label htmlFor={`${id}-phone`} className={label}>Mobile</label>
            <input id={`${id}-phone`} name="phone" type="tel" inputMode="tel" required maxLength={25} autoComplete="tel" placeholder="With country code if outside India" className={input} />
          </div>
          <div>
            <label htmlFor={`${id}-email`} className={label}>Email</label>
            <input id={`${id}-email`} name="email" type="email" required maxLength={200} autoComplete="email" placeholder="for your certificate" className={input} />
          </div>
        </div>
        {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
        <button
          type="submit"
          disabled={busy}
          className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-semibold text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90 disabled:opacity-60"
        >
          {busy ? "Please wait..." : "Register FREE and start"}
          {!busy && <ArrowRight className="h-4 w-4" aria-hidden />}
        </button>
        <p className="text-xs text-slate-500">
          No fees. NIFS may contact you about programs. Already registered?{" "}
          <a href={COURSE_URL} className="font-semibold text-primary underline underline-offset-2">Continue your course</a>.
        </p>
      </form>
    </div>
  );
}
