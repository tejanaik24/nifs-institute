"use client";

import { useEffect, useState, type ReactNode } from "react";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { StrainLab } from "./posture-diagram";
import { Reveal } from "./motion";
import { HazardHunt, PowerZoneDrag, Quiz, SymptomMatch, TabPanel, TapChecklist, type QuizDef } from "./lessons";
import { benefits, disorders, factors, importance, outcomes, principles } from "./course-data";

const KEY = "nifs-es-lessons";
const eyebrow = "text-xs font-semibold uppercase tracking-widest text-primary";

type Beat = { title: string; node: ReactNode };
type Chapter = { id: string; title: string; beats: Beat[]; quiz: QuizDef };

const Lead = ({ children }: { children: ReactNode }) => <p className="max-w-2xl text-lg leading-relaxed">{children}</p>;
const Bullets = ({ items }: { items: string[] }) => (
  <ul className="space-y-3">
    {items.map((t) => (
      <li key={t} className="flex gap-3"><span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-primary" /><span>{t}</span></li>
    ))}
  </ul>
);

const chapters: Chapter[] = [
  {
    id: "introduction",
    title: "What is ergonomics?",
    beats: [
      {
        title: "The big idea",
        node: (
          <div className="space-y-6">
            <blockquote className="font-display border-t-4 border-primary pt-5 text-3xl italic leading-tight md:text-5xl">Rather than making the person adapt to fit the task, ergonomics fits the task to the person.</blockquote>
            <Lead>Ergonomics is the field of study concerned with keeping people safe, comfortable and productive by accommodating human characteristics, capabilities and limitations in a product or process, at work and at home.</Lead>
          </div>
        ),
      },
      {
        title: "Human factors engineering",
        node: (
          <div className="space-y-6">
            <Lead>Ergonomics, or human factors engineering, is the scientific discipline of designing tools, tasks, environments and systems to fit the capabilities and limitations of people.</Lead>
            <div className="grid gap-px border border-[var(--es-line)] bg-[var(--es-line)] sm:grid-cols-2">
              <div className="bg-white p-6"><p className={eyebrow}>It reduces</p><p className="font-display mt-2 text-2xl italic">Work-related musculoskeletal disorders (WMSDs), fatigue and discomfort</p></div>
              <div className="bg-[var(--es-ink)] p-6 text-[var(--es-paper)]"><p className={eyebrow}>It maximises</p><p className="font-display mt-2 text-2xl italic">Efficiency, productivity and overall well-being</p></div>
            </div>
          </div>
        ),
      },
    ],
    quiz: { q: "A desk is too high, so a worker keeps shrugging to type. What would ergonomics do?", options: ["Fit the desk to the worker", "Train the worker to shrug less", "Give the worker longer shifts"], correct: 0, explain: "Ergonomics fits the task and workstation to the person, not the other way round." },
  },
  {
    id: "outcomes",
    title: "Training outcomes",
    beats: [
      {
        title: "What you will be able to do",
        node: (
          <div className="space-y-5">
            <Lead>Completing an ergonomic safety course reduces workplace injuries and boosts daily productivity by addressing occupational risks. Tick each skill as you commit to it.</Lead>
            <TapChecklist items={outcomes} />
          </div>
        ),
      },
    ],
    quiz: { q: "Which of these is a skill you gain from this course?", options: ["Identify ergonomic hazards in workstations", "Repair industrial machinery", "Prescribe medicines"], correct: 0, explain: "Spotting hazards in workstations is a core outcome." },
  },
  {
    id: "importance",
    title: "Why it matters",
    beats: [
      {
        title: "Seven things every worker should know",
        node: (
          <ol className="grid gap-px border border-[var(--es-line)] bg-[var(--es-line)] sm:grid-cols-2">
            {importance.map((t, i) => (
              <li key={t} className="flex gap-4 bg-white p-5"><span className="font-display text-2xl italic text-primary">{String(i + 1).padStart(2, "0")}</span><span>{t}</span></li>
            ))}
          </ol>
        ),
      },
    ],
    quiz: { q: "A warehouse worker lifts boxes all day. Which item from this list applies most directly?", options: ["Material handling equipment", "Colour of the walls", "Company logo design"], correct: 0, explain: "Material handling equipment and safe lifting are part of applying ergonomics." },
  },
  {
    id: "benefits",
    title: "Key benefits",
    beats: [{ title: "Four benefits", node: <TabPanel tabs={benefits} /> }],
    quiz: { q: "Fewer absences and fewer compensation claims fall under which benefit?", options: ["Lower direct and indirect costs", "Better posture", "Early hazard reporting"], correct: 0, explain: "Preventing workplace pain reduces absenteeism, healthcare expenses and workers' compensation claims." },
  },
  {
    id: "hazards",
    title: "Workplace hazards",
    beats: [
      { title: "Hazard hunt", node: <HazardHunt /> },
      {
        title: "Factors and disorders",
        node: (
          <div className="grid gap-8 sm:grid-cols-2">
            <div><p className={eyebrow}>Ergonomic factors</p><div className="mt-4"><Bullets items={factors} /></div></div>
            <div><p className={eyebrow}>Ergonomic-related disorders</p><div className="mt-4"><Bullets items={disorders} /></div></div>
          </div>
        ),
      },
    ],
    quiz: { q: "A packer repeats the same wrist motion 800 times a shift. Which hazard is this?", options: ["Repetitive movements", "Extreme temperatures", "Inadequate lighting"], correct: 0, explain: "Repeating the same motion is a repetitive-movement hazard and can lead to repetitive motion injuries." },
  },
  {
    id: "msd",
    title: "Musculoskeletal disorders",
    beats: [
      {
        title: "What MSDs are",
        node: <Lead>MSDs affect muscles, bones, joints, ligaments and tendons. Symptoms range from mild aches to severe issues. They may worsen with activity or improve with rest, and often become persistent if ignored.</Lead>,
      },
      { title: "Symptom match", node: <SymptomMatch /> },
    ],
    quiz: { q: "Your wrist has been tingling for weeks after long typing sessions. What does this course say to do?", options: ["Report it early, before it becomes serious", "Wait until it stops on its own", "Ignore it if it improves with rest"], correct: 0, explain: "Recognise early signs of strain and report symptoms before they turn into lost-time injuries." },
  },
  {
    id: "principles",
    title: "Key principles",
    beats: [
      {
        title: "Two postures, one task",
        node: (
          <div className="space-y-5">
            <Lead>Design work to fit the user: neutral postures, less force and motion, everything in the comfort zone.</Lead>
            <div className="max-w-xl"><StrainLab compact /></div>
          </div>
        ),
      },
      { title: "Power zone", node: <PowerZoneDrag /> },
      {
        title: "The nine principles",
        node: (
          <ol className="grid gap-px border border-[var(--es-line)] bg-[var(--es-line)] sm:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <li key={p.title} className="bg-white p-5">
                <span className="font-display text-sm italic text-primary">{String(i + 1).padStart(2, "0")}</span>
                <h4 className="mt-1 font-medium">{p.title}</h4>
                <p className="mt-2 text-sm text-muted-foreground">{p.body}</p>
              </li>
            ))}
          </ol>
        ),
      },
    ],
    quiz: { q: "You use a stapler all day. Where should it sit?", options: ["Within easy reach, inside the power zone", "On the top shelf to save desk space", "On the floor under the desk"], correct: 0, explain: "Keep frequently used items between mid-thigh and shoulder height to minimise reaching." },
  },
];

export function StudyPlayer({ onProgress }: { onProgress?: (done: number, total: number) => void }) {
  const [done, setDone] = useState<string[]>([]);
  const [ci, setCi] = useState(0);
  const [bi, setBi] = useState(0);
  const [answered, setAnswered] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const s = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (Array.isArray(s.done)) setDone(s.done);
      if (Number.isInteger(s.ci) && s.ci >= 0 && s.ci < chapters.length) setCi(s.ci);
    } catch {}
  }, []);

  useEffect(() => {
    onProgress?.(done.length, chapters.length);
  }, [done, onProgress]);

  const save = (d: string[], c: number) => { try { localStorage.setItem(KEY, JSON.stringify({ done: d, ci: c })); } catch {} };
  const go = (c: number, b = 0) => { setCi(c); setBi(b); save(done, c); document.getElementById("study")?.scrollIntoView({ behavior: "smooth", block: "start" }); };

  const ch = chapters[ci];
  const onQuiz = bi === ch.beats.length;
  const beat = ch.beats[bi];
  const total = ch.beats.length + 1;
  const quizDone = answered[ch.id] !== undefined;
  const allDone = done.length === chapters.length;

  const finish = () => {
    const d = done.includes(ch.id) ? done : [...done, ch.id];
    setDone(d);
    save(d, Math.min(ci + 1, chapters.length - 1));
    if (ci < chapters.length - 1) { setCi(ci + 1); setBi(0); document.getElementById("study")?.scrollIntoView({ behavior: "smooth", block: "start" }); }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12 lg:px-10 lg:py-24">
      <nav aria-label="Chapters" className="min-w-0 lg:sticky lg:top-44 lg:self-start">
        <p className={eyebrow}>Step 1 · Study</p>
        <div className="mt-3 h-1.5 bg-[var(--es-line)]" role="progressbar" aria-valuenow={Math.round((done.length / chapters.length) * 100)} aria-valuemin={0} aria-valuemax={100} aria-label="Study progress">
          <div className="h-full bg-primary transition-[width] duration-500" style={{ width: `${(done.length / chapters.length) * 100}%` }} />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">{done.length} of {chapters.length} chapters</p>
        <ol className="mt-5 flex gap-2 overflow-x-auto pb-2 lg:block lg:space-y-1 lg:overflow-visible lg:pb-0">
          {chapters.map((c, i) => (
            <li key={c.id} className="shrink-0">
              <button type="button" onClick={() => go(i)} aria-current={i === ci ? "step" : undefined}
                className={`flex min-h-11 w-full items-center gap-3 border-l-2 px-3 py-2 text-left text-sm transition-colors ${i === ci ? "border-primary bg-white font-medium" : "border-[var(--es-line)] text-muted-foreground hover:text-foreground"}`}>
                <span className="font-display italic">{String(i + 1).padStart(2, "0")}</span>
                <span className="hidden lg:block lg:flex-1">{c.title}</span>
                {done.includes(c.id) && <Check className="h-4 w-4 text-primary" aria-label="completed" />}
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div id="study" className="min-w-0 scroll-mt-40">
        <Reveal>
          <div className="border border-[var(--es-ink)] bg-[var(--es-paper)] p-6 shadow-[8px_8px_0_0_var(--es-ink)] md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className={eyebrow}>Chapter {String(ci + 1).padStart(2, "0")} of {chapters.length}</span>
              <div className="flex gap-1.5" aria-label={`Part ${bi + 1} of ${total}`}>
                {Array.from({ length: total }, (_, i) => <span key={i} className={`h-1.5 w-8 transition-colors ${i <= bi ? "bg-primary" : "bg-[var(--es-line)]"}`} />)}
              </div>
            </div>
            <h2 className="font-display mt-3 text-4xl italic leading-tight md:text-6xl">{ch.title}</h2>
            {!onQuiz && <p className="mt-1 text-sm font-medium text-muted-foreground">{beat.title}</p>}

            <div key={`${ci}-${bi}`} className="es-pop mt-8 min-h-72">
              {onQuiz ? <Quiz key={ch.id} quiz={ch.quiz} onAnswered={(ok) => setAnswered((a) => ({ ...a, [ch.id]: ok }))} /> : beat.node}
            </div>

            <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--es-line)] pt-6">
              <button type="button" disabled={ci === 0 && bi === 0} onClick={() => (bi > 0 ? setBi(bi - 1) : go(ci - 1, chapters[ci - 1].beats.length))} className="inline-flex min-h-12 items-center gap-2 border border-[var(--es-line)] px-5 text-sm font-medium transition-colors hover:border-[var(--es-ink)] disabled:opacity-40">
                <ArrowLeft className="h-4 w-4" aria-hidden /> Back
              </button>
              {!onQuiz ? (
                <button type="button" onClick={() => setBi(bi + 1)} className="inline-flex min-h-12 items-center gap-2 bg-[var(--es-ink)] px-7 text-sm font-semibold text-[var(--es-paper)] transition-all hover:gap-3 hover:bg-primary">
                  {bi === ch.beats.length - 1 ? "Check yourself" : "Next"} <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              ) : (
                <button type="button" onClick={finish} className={`inline-flex min-h-12 items-center gap-2 px-7 text-sm font-semibold transition-all hover:gap-3 ${quizDone ? "bg-primary text-primary-foreground" : "border border-[var(--es-ink)] bg-transparent text-[var(--es-ink)] hover:bg-white"}`}>
                  {quizDone ? (ci === chapters.length - 1 ? "Finish study" : "Next chapter") : (ci === chapters.length - 1 ? "Skip and finish" : "Skip and continue")} <ArrowRight className="h-4 w-4" aria-hidden />
                </button>
              )}
            </div>
          </div>
        </Reveal>
        {allDone && (
          <p role="status" className="es-pop mt-6 border border-primary bg-primary/5 p-5">
            <strong className="font-display text-xl italic">Study complete.</strong> Download the PDF, then proceed directly to the final exam.
          </p>
        )}
      </div>
    </div>
  );
}
