"use client";

import { useScrollProgress } from "./motion";

const steps = [
  { n: "01", t: "Register", d: "Name, mobile and email. One minute, no fee." },
  { n: "02", t: "Study", d: "Four key benefits, then download the premium study guide and read it at your pace. About 2 hours." },
  { n: "03", t: "Final exam", d: "After you are ready: three hands-on activities, then one exam of 20 questions in 10 minutes, 20 marks. When time is over, the exam is over." },
  { n: "04", t: "Assignment", d: "Two written questions in your own words. 10 marks. Submit any time. Your certificate reaches your email within 3 days of the exam." },
];

/** The path draws itself as you scroll; each stop lights up when the line reaches it. */
export function Journey() {
  const ref = useScrollProgress<HTMLOListElement>();
  return (
    <ol ref={ref} className="relative mt-12 space-y-10 pl-16 md:space-y-14 md:pl-24">
      <svg className="absolute left-[19px] top-2 h-[calc(100%-1rem)] w-1 overflow-visible md:left-[27px]" aria-hidden preserveAspectRatio="none">
        <line x1="2" y1="0" x2="2" y2="100%" pathLength={1} stroke="var(--es-line)" strokeWidth="3" strokeDasharray="0.012 0.012" />
        <line x1="2" y1="0" x2="2" y2="100%" pathLength={1} stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" className="es-route-line" />
      </svg>
      {steps.map((s, i) => (
        <li key={s.n} className="relative" style={{ ["--th" as string]: (i / (steps.length - 1)) * 0.92 }}>
          <span className="absolute -left-16 top-0 flex h-10 w-10 items-center justify-center border border-[var(--es-ink)] bg-[var(--es-paper)] font-display text-lg italic md:-left-24 md:h-14 md:w-14 md:text-2xl">
            <span className="absolute inset-0 bg-primary" style={{ opacity: "clamp(0, calc((var(--p) - var(--th)) * 14), 1)" }} aria-hidden />
            <span className="relative" style={{ color: "color-mix(in oklab, #fff calc(clamp(0, calc((var(--p) - var(--th)) * 14), 1) * 100%), var(--es-ink))" }}>{s.n}</span>
          </span>
          <h3 className="font-display text-3xl italic md:text-5xl">{s.t}</h3>
          <p className="mt-2 max-w-xl text-muted-foreground md:text-lg">{s.d}</p>
        </li>
      ))}
    </ol>
  );
}
