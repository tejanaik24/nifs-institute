import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, FileText, MoveVertical, Timer } from "lucide-react";
import { courses } from "@/lib/data/courses";
import { benefits, faqs } from "./course-data";
import { CertificateCard } from "./certificate-card";
import { Journey } from "./journey";
import { Reveal } from "./motion";

const eyebrow = "text-xs font-semibold uppercase tracking-widest text-primary";

const paid = ["certificate-course-in-fire-safety", "diploma-in-fire-safety", "diploma-in-health-safety-environment"]
  .map((s) => courses.find((c) => c.slug === s))
  .filter((c): c is (typeof courses)[number] => Boolean(c));

export function Landing() {
  return (
    <>
      {/* 1. what you actually get to touch */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <Reveal>
          <span className={eyebrow}>What you get</span>
          <h2 className="font-display mt-3 max-w-3xl text-4xl italic leading-[1.05] md:text-6xl">A study guide you keep. An exam that counts.</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
          <Reveal className="md:col-span-3">
            <div className="flex h-full min-h-64 flex-col justify-between bg-primary p-7 text-primary-foreground">
              <MoveVertical className="h-8 w-8" aria-hidden />
              <div>
                <p className="font-display text-3xl italic leading-tight md:text-4xl">Drag the spine. Watch the strain climb.</p>
                <p className="mt-2 text-sm opacity-85">The Strain Lab shows why posture hurts, live.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-3">
            <div className="flex h-full min-h-64 flex-col justify-between border border-[var(--es-ink)] bg-[var(--es-paper)] p-7">
              <FileText className="h-8 w-8 text-primary" aria-hidden />
              <div>
                <p className="font-display text-7xl italic leading-none text-primary">9</p>
                <p className="mt-1 font-display text-2xl italic">pages. A premium study guide you can download and keep.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0} className="md:col-span-2">
            <div className="flex h-full min-h-56 flex-col justify-between border border-[var(--es-line)] bg-[var(--es-paper)] p-7">
              <Clock className="h-8 w-8 text-primary" aria-hidden />
              <div>
                <p className="font-display text-2xl italic leading-tight">3 hours in total: 2 to study, 1 to assess.</p>
                <p className="mt-2 text-sm text-muted-foreground">Learn at your own pace.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="md:col-span-2">
            <div className="relative h-full min-h-56 overflow-hidden">
              <Image src="/images/corporate-training-onsite.webp" alt="Workers attending a workplace safety training session in a warehouse" fill sizes="(min-width:768px) 33vw, 100vw" className="object-cover" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 text-white">
                <p className="font-display text-xl italic">Built for offices and industrial floors.</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={200} className="md:col-span-2">
            <div className="flex h-full min-h-56 flex-col justify-between bg-[var(--es-ink)] p-7 text-[var(--es-paper)]">
              <Timer className="h-8 w-8 text-primary" aria-hidden />
              <div>
                <p className="font-display text-5xl italic leading-none tabular-nums">10:00</p>
                <p className="mt-2 text-sm opacity-80">A real timed exam. 20 questions in 10 minutes, then your certificate.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. how it helps */}
      <section className="es-grain border-y border-[var(--es-line)] bg-[var(--es-cream)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20 lg:px-10 lg:py-28">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <Reveal>
              <span className={eyebrow}>How this course helps you</span>
              <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">Fewer injuries. Better posture. A safer workplace.</h2>
            </Reveal>
          </div>
          <ol className="divide-y divide-[var(--es-line)] border-y border-[var(--es-line)]">
            {benefits.map((b, i) => (
              <li key={b.title}>
                <Reveal delay={i * 60} className="grid grid-cols-[3rem_1fr] gap-4 py-7 md:grid-cols-[4.5rem_1fr]">
                  <span className="font-display text-3xl italic text-primary md:text-5xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-2xl italic md:text-3xl">{b.title}</h3>
                    <p className="mt-2 text-muted-foreground">{b.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. the route */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <Reveal>
          <span className={eyebrow}>Your path</span>
          <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">Four steps. About three hours.</h2>
        </Reveal>
        <Journey />
      </section>

      {/* 4. the certificate */}
      <section className="es-grain overflow-hidden border-y border-[var(--es-line)] bg-[var(--es-cream)]">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <Reveal>
            <span className={eyebrow}>The finish line</span>
            <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">Finish the exam. Certificate in your inbox within 3 days.</h2>
            <p className="mt-5 max-w-lg text-lg text-muted-foreground">Register with the email you check. That is where NIFS sends your certificate of completion.</p>
            <a href="#register" className="mt-8 inline-flex min-h-12 items-center gap-2 bg-primary px-8 py-3 text-base font-semibold text-primary-foreground transition-all hover:gap-3 hover:bg-primary/90">
              Register free <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </Reveal>
          <Reveal delay={150} className="flex justify-center lg:justify-end">
            <CertificateCard sample />
          </Reveal>
        </div>
      </section>

      <Faq />
      <Upsell />
    </>
  );
}

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20 lg:py-28">
      <h2 className="font-display text-4xl italic md:text-5xl">Questions</h2>
      <div className="mt-8 divide-y divide-[var(--es-line)] border-y border-[var(--es-line)]">
        {faqs.map((f) => (
          <details key={f.question} className="group py-5">
            <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-lg font-medium [&::-webkit-details-marker]:hidden">
              {f.question}
              <span aria-hidden className="text-2xl text-primary transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-muted-foreground">{f.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function Upsell() {
  return (
    <section className="border-t border-[var(--es-line)] bg-[var(--es-ink)] text-[var(--es-paper)]">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <span className={eyebrow}>Keep going</span>
        <h2 className="font-display mt-3 max-w-3xl text-4xl italic leading-[1.05] md:text-6xl">Ergonomics is one part of workplace safety. Make it your career.</h2>
        <div className="mt-12 grid gap-px bg-white/15 md:grid-cols-3">
          {paid.map((c) => (
            <Link key={c.slug} href={`/courses/${c.slug}/`} className="group flex flex-col justify-between bg-[var(--es-ink)] p-7 transition-colors hover:bg-white/5">
              <div>
                <span className={eyebrow}>{c.tier} · {c.duration}</span>
                <h3 className="font-display mt-3 text-2xl italic leading-snug">{c.name}</h3>
              </div>
              <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium transition-all group-hover:gap-2 group-hover:text-primary">
                View curriculum <ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
        <p className="mt-5 text-sm opacity-70">
          For fees and batch dates, <Link href="/admissions/" className="underline hover:text-primary">contact NIFS admissions</Link>.
        </p>
      </div>
    </section>
  );
}
