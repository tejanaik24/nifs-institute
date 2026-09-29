"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

const WA_URL = `https://wa.me/918374340999?text=${encodeURIComponent("Hi NIFS, I am doing the free Ergonomic Safety course (NIFS ES). ")}`;

export function SuggestionBox({ token }: { token: string }) {
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState<"idle" | "busy" | "sent">("idle");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("busy");
    setError("");
    try {
      const res = await fetch("/api/free-course/suggestion", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ token, message: msg }) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || "Could not send. Please try again.");
      setStatus("sent");
      setMsg("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not send. Please try again.");
      setStatus("idle");
    }
  }

  return (
    <section id="suggestions" className="mx-auto max-w-3xl scroll-mt-32 px-6 py-16 lg:py-24">
      <span className="text-xs font-semibold uppercase tracking-widest text-primary">Your voice</span>
      <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">Suggestion box</h2>
      <p className="mb-8 mt-3 text-lg text-muted-foreground">Anything is welcome: what was unclear, what you liked, what to add, or a problem you hit.</p>

      {status === "sent" ? (
        <div role="status" className="es-pop border border-primary bg-primary/5 p-6">
          <p className="font-display text-2xl italic">Thank you. We read every message.</p>
          <button type="button" onClick={() => setStatus("idle")} className="mt-3 min-h-11 text-sm underline underline-offset-4 hover:text-primary">Send another</button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <label htmlFor="sg" className="sr-only">Your suggestion</label>
          <textarea
            id="sg"
            required
            minLength={3}
            maxLength={2000}
            rows={5}
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type your message here..."
            className="w-full border border-[var(--es-ink)] bg-white p-4 text-base leading-relaxed outline-none transition-shadow focus:shadow-[4px_4px_0_0_var(--primary)]"
          />
          {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === "busy"} className="inline-flex min-h-12 items-center gap-2 bg-primary px-8 text-base font-semibold text-primary-foreground transition-colors hover:bg-[var(--es-ink)] disabled:opacity-60">
              <Send className="h-4 w-4" aria-hidden /> {status === "busy" ? "Sending..." : "Send suggestion"}
            </button>
            <a href={WA_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-[var(--es-ink)] px-6 text-sm font-semibold transition-colors hover:bg-white">
              <MessageCircle className="h-4 w-4" aria-hidden /> Or message us on WhatsApp
            </a>
          </div>
        </form>
      )}
    </section>
  );
}
