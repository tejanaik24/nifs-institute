"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const field = "mt-1.5 w-full rounded-md border border-border bg-background px-4 py-3 text-base outline-none transition-shadow focus:border-primary focus:shadow-[0_0_0_3px_color-mix(in_oklab,var(--primary)_20%,transparent)]";

export function PlacementLeadForm() {
  const [status, setStatus] = useState<"idle" | "busy" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("busy");
    setError("");
    try {
      const res = await fetch("/api/placements/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Could not send. Please try again.");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <section id="placement-form" className="mx-auto max-w-3xl scroll-mt-28 px-6 py-16 lg:px-10">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">Placement cell</span>
      <h2 className="font-display mt-2 text-3xl italic leading-tight">Get placement updates</h2>
      <p className="mb-8 mt-3 text-muted-foreground">Share your details and our placement team will reach out when a suitable opening comes up.</p>

      {status === "sent" ? (
        <div role="status" className="rounded-md border border-primary bg-primary/5 p-6">
          <p className="font-display text-2xl italic">Thank you. Our placement team will contact you.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-3 min-h-11 text-sm underline underline-offset-4 hover:text-primary">Submit another</button>
        </div>
      ) : (
        <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-medium">Full name
            <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={field} />
          </label>
          <label className="text-sm font-medium">Date of birth
            <input name="dob" type="date" required min="1940-01-01" max={new Date().toISOString().slice(0, 10)} autoComplete="bday" className={field} />
          </label>
          <label className="text-sm font-medium">Mobile number
            <input name="phone" type="tel" inputMode="tel" required autoComplete="tel" className={field} />
          </label>
          <label className="text-sm font-medium">Email
            <input name="email" type="email" required maxLength={200} autoComplete="email" className={field} />
          </label>
          <label className="text-sm font-medium sm:col-span-2">Location (city)
            <input name="location" required minLength={2} maxLength={120} autoComplete="address-level2" className={field} />
          </label>
          {error && <p role="alert" className="text-sm text-destructive sm:col-span-2">{error}</p>}
          <div className="sm:col-span-2">
            <button type="submit" disabled={status === "busy"} className="inline-flex min-h-12 items-center gap-2 rounded-md bg-primary px-8 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60">
              <Send className="h-4 w-4" aria-hidden /> {status === "busy" ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
