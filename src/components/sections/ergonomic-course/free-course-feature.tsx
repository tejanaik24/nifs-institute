import Link from "next/link";
import { ArrowRight, Award, Clock, Laptop } from "lucide-react";
import { Figure } from "./figure";
import "./es-course.css";

/** Highlighted free-course card shown first on the Courses page. */
export function FreeCourseFeature() {
  return (
    <div className="es-root">
      <Link
        href="/courses/ergonomic-safety/"
        className="es-grain group grid overflow-hidden border-2 border-[var(--es-ink)] bg-[var(--es-cream)] shadow-[8px_8px_0_0_var(--primary)] transition-transform hover:-translate-y-0.5 md:grid-cols-[1.4fr_0.6fr]"
      >
        <div className="p-7 md:p-10">
          <span className="inline-flex items-center gap-2.5 bg-primary px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-primary-foreground shadow-[4px_4px_0_0_var(--es-ink)]">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" aria-hidden /> Free course
          </span>
          <h2 className="font-display mt-5 text-4xl italic leading-[1.02] md:text-6xl">
            Ergonomic <span className="text-primary">Safety</span>
          </h2>
          <p className="mt-3 max-w-xl text-lg text-muted-foreground">Fit the task to the person. Learn to spot workplace hazards and prevent injury, online and at no cost.</p>
          <ul className="mt-5 flex flex-wrap gap-2 text-sm font-medium">
            <li className="inline-flex items-center gap-1.5 border border-primary bg-primary/10 px-3 py-1.5 font-bold text-primary">100% FREE</li>
            <li className="inline-flex items-center gap-1.5 border border-[var(--es-line)] bg-[var(--es-paper)] px-3 py-1.5"><Clock className="h-3.5 w-3.5 text-primary" aria-hidden /> 3 hours</li>
            <li className="inline-flex items-center gap-1.5 border border-[var(--es-line)] bg-[var(--es-paper)] px-3 py-1.5"><Laptop className="h-3.5 w-3.5 text-primary" aria-hidden /> Online</li>
            <li className="inline-flex items-center gap-1.5 border border-[var(--es-line)] bg-[var(--es-paper)] px-3 py-1.5"><Award className="h-3.5 w-3.5 text-primary" aria-hidden /> Certificate in 3 days</li>
          </ul>
          <span className="mt-7 inline-flex min-h-13 items-center gap-2 bg-primary px-8 py-3.5 text-base font-semibold text-primary-foreground transition-all group-hover:gap-3 group-hover:bg-[var(--es-ink)]">
            Start the free course <ArrowRight className="h-4 w-4" aria-hidden />
          </span>
        </div>
        <div className="hidden items-center justify-center bg-[var(--es-paper)] p-6 md:flex" aria-hidden>
          <div className="h-64 w-56"><Figure t={0.55} label="" /></div>
        </div>
      </Link>
    </div>
  );
}
