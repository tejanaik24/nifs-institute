"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Check, Download } from "lucide-react";
import type { CourseState } from "@/lib/free-course/db";
import { ExamPanel } from "./exam";
import { Upsell } from "./landing-sections";
import { Reveal } from "./motion";
import { TabPanel } from "./lessons";
import { Activities } from "./activities";
import { SuggestionBox } from "./suggestion-box";
import { benefits } from "./course-data";

export const PDF_URL = "/downloads/NIFS-Ergonomic-Safety-Study-Guide.pdf";
const eyebrow = "text-xs font-semibold uppercase tracking-widest text-primary";

function PdfStack() {
  return (
    <div className="es-stack relative mx-auto h-72 w-56 md:h-80 md:w-64" aria-hidden>
      <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-3 bg-[#e9e3d6] shadow-lg" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rotate-1 bg-[#efe9dc] shadow-lg" />
      <div className="absolute inset-0 flex flex-col justify-between bg-[var(--es-paper)] p-5 shadow-2xl">
        <Image src="/images/nifs-official-logo-v3.png" alt="" width={48} height={48} className="h-9 w-auto self-start" />
        <div>
          <p className="font-display text-4xl italic leading-[0.95]">Ergonomic<br />Safety</p>
          <p className="font-display mt-2 text-sm italic text-primary">Fit the task to the person.</p>
        </div>
        <div className="bg-[var(--es-ink)] px-3 py-2 text-[9px] uppercase tracking-widest text-[var(--es-paper)]">Study guide · Exam regulations</div>
      </div>
    </div>
  );
}

export function CourseIndex({ token, state, onState, onLogout }: { token: string; state: CourseState; onState: (s: CourseState) => void; onLogout: () => void }) {
  const [downloaded, setDownloaded] = useState(false);
  const [readyLocal, setReadyLocal] = useState(false);
  useEffect(() => {
    try {
      setDownloaded(localStorage.getItem("nifs-es-dl") === "1");
      setReadyLocal(localStorage.getItem("nifs-es-ready") === "1");
    } catch {}
  }, []);
  // Anyone who already touched the exam is past the "ready" step.
  const ready = readyLocal || state.exam === "running" || state.exam === "done";
  const markDownloaded = () => { setDownloaded(true); try { localStorage.setItem("nifs-es-dl", "1"); } catch {} };
  const goReady = () => {
    setReadyLocal(true);
    try { localStorage.setItem("nifs-es-ready", "1"); } catch {}
    setTimeout(() => document.getElementById("activities")?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };
  const examLabel = { locked: "Locked", ready: "Ready", running: "In progress", done: `Done: ${state.score}/${state.total}` }[state.exam];
  const items = [
    { n: "01", t: "Study guide", d: downloaded ? "Downloaded" : "Download the PDF", href: "#pdf", done: downloaded },
    { n: "02", t: "Final exam", d: examLabel, href: ready ? "#exam" : "#pdf", done: state.exam === "done" },
  ];
  const doneCount = items.filter((i) => i.done).length;

  return (
    <>
      <section data-path-target="true" className="es-grain border-b border-[var(--es-line)] bg-[var(--es-cream)] pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="inline-flex items-center gap-2 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground">Free course <span className="opacity-70">·</span> NIFS ES</span>
              <h1 className="font-display mt-3 text-5xl italic leading-tight md:text-7xl">Welcome, {state.name.split(" ")[0]}.</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <a href={PDF_URL} download onClick={markDownloaded} className="inline-flex min-h-12 items-center gap-2 bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-[var(--es-ink)]"><Download className="h-4 w-4" aria-hidden /> Download study guide (PDF)</a>
              {ready ? (
                <a href="#exam" className="inline-flex min-h-12 items-center gap-2 bg-[var(--es-ink)] px-6 text-sm font-semibold text-[var(--es-paper)] transition-colors hover:bg-primary">Go to the exam <ArrowRight className="h-4 w-4" aria-hidden /></a>
              ) : (
                <button type="button" disabled={!downloaded} onClick={goReady} className="inline-flex min-h-12 items-center gap-2 border border-[var(--es-ink)] px-6 text-sm font-semibold transition-colors enabled:hover:bg-[var(--es-ink)] enabled:hover:text-[var(--es-paper)] disabled:cursor-not-allowed disabled:opacity-40">I&apos;m ready for the exam <ArrowRight className="h-4 w-4" aria-hidden /></button>
              )}
              <button type="button" onClick={onLogout} className="min-h-11 text-sm underline underline-offset-4 hover:text-primary">Not you? Switch account</button>
            </div>
          </div>

          <div className="relative mt-10">
            <div className="absolute left-0 right-0 top-[27px] hidden h-px bg-[var(--es-line)] md:block" aria-hidden />
            <div className="absolute left-0 top-[27px] hidden h-px bg-primary transition-[width] duration-700 md:block" style={{ width: `${(doneCount / 2) * 100}%` }} aria-hidden />
            <ol className="relative grid gap-4 sm:grid-cols-2">
              {items.map((it) => (
                <li key={it.n}>
                  <a href={it.href} className="group flex items-center gap-4 md:block">
                    <span className={`flex h-14 w-14 shrink-0 items-center justify-center border font-display text-xl italic transition-colors ${it.done ? "border-primary bg-primary text-primary-foreground" : "border-[var(--es-ink)] bg-[var(--es-paper)] group-hover:bg-white"}`}>
                      {it.done ? <Check className="h-5 w-5" aria-label="completed" /> : it.n}
                    </span>
                    <span className="mt-0 block md:mt-3">
                      <span className="block font-medium">{it.t}</span>
                      <span className="block text-sm text-muted-foreground">{it.d}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section id="benefits" className="mx-auto max-w-5xl scroll-mt-32 px-6 py-16 lg:py-24">
        <Reveal>
          <span className={eyebrow}>Before you start</span>
          <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">Four key benefits</h2>
          <p className="mb-8 mt-3 text-lg text-muted-foreground">Tap each one.</p>
        </Reveal>
        <TabPanel tabs={benefits} />
      </section>

      <section id="pdf" className="es-grain scroll-mt-32 border-y border-[var(--es-line)] bg-[var(--es-cream)]">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-16 lg:grid-cols-2 lg:px-10 lg:py-24">
          <Reveal>
            <span className={eyebrow}>Yours right now</span>
            <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">The NIFS Ergonomic Safety study guide</h2>
            <p className="mt-4 max-w-lg text-lg text-muted-foreground">Every chapter, the posture diagram and the exam regulations, in one printable PDF.</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={PDF_URL} download onClick={markDownloaded} className="inline-flex min-h-13 items-center gap-2 bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-[var(--es-ink)]">
                <Download className="h-4 w-4" aria-hidden /> Download PDF
              </a>
              {ready && (
                <a href="#exam" className="inline-flex min-h-13 items-center gap-2 border border-[var(--es-ink)] bg-[var(--es-ink)] px-8 py-3.5 text-base font-semibold text-[var(--es-paper)] transition-colors hover:bg-primary hover:border-primary">
                  You are ready. Go to the exam <ArrowRight className="h-4 w-4" aria-hidden />
                </a>
              )}
              {!ready && (
                <button type="button" disabled={!downloaded} onClick={goReady} className="inline-flex min-h-13 items-center gap-2 border border-[var(--es-ink)] px-8 py-3.5 text-base font-semibold transition-colors enabled:hover:bg-[var(--es-ink)] enabled:hover:text-[var(--es-paper)] disabled:cursor-not-allowed disabled:opacity-40">
                  I&apos;m ready for the exam <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
            {!ready && (
              <p className="mt-3 text-sm text-muted-foreground">
                {downloaded ? "Read it at your pace. Click when you are ready." : "Download the guide first. The exam button unlocks after."}{" "}
                {!downloaded && <button type="button" onClick={markDownloaded} className="underline underline-offset-4 hover:text-primary">I already have it</button>}
              </p>
            )}
          </Reveal>
          <Reveal delay={120}><PdfStack /></Reveal>
        </div>
      </section>

      {ready && (
        <>
      <Activities />

      <section id="exam" className="scroll-mt-32 bg-[var(--es-ink)]">
        <div className="mx-auto max-w-5xl px-6 py-16 lg:py-24">
          <span className={eyebrow}>Step 2</span>
          <h2 className="font-display mt-3 flex items-center gap-3 text-4xl italic text-[var(--es-paper)] md:text-6xl">
            Final exam: 20 marks
          </h2>
          <p className="mb-10 mt-3 text-lg text-[var(--es-paper)]/70">After the exam your certificate is emailed to {state.email} within 3 days.</p>
          <ExamPanel token={token} state={state} onState={onState} />
        </div>
      </section>
        </>
      )}

      <SuggestionBox token={token} />

      <Upsell />
    </>
  );
}
