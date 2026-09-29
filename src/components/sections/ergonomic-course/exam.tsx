"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Flag, RotateCcw, ShieldAlert, Timer } from "lucide-react";
import type { CourseState } from "@/lib/free-course/db";
import { CertificateCard } from "./certificate-card";
import { examRules as rules } from "./course-data";

type Q = { id: number; q: string; options: { i: number; t: string }[] };
const TOTAL = 20;
const EXAM_MS = 10 * 60_000;

async function post(path: string, body: unknown, keepalive = false) {
  const res = await fetch(`/api/free-course${path}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), keepalive });
  return { ok: res.ok, j: await res.json().catch(() => ({})) };
}

const fmt = (ms: number) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
};

// Palette statuses follow the familiar online-exam convention.
type Status = "notVisited" | "notAnswered" | "answered" | "marked" | "answeredMarked";
const PALETTE: Record<Status, { cls: string; label: string }> = {
  notVisited: { cls: "border-[#b9b4a6] bg-white text-[#15130f]", label: "Not visited" },
  notAnswered: { cls: "border-primary bg-primary text-white", label: "Not answered" },
  answered: { cls: "border-[#1f7a45] bg-[#1f7a45] text-white", label: "Answered" },
  marked: { cls: "rounded-full border-[#b36b00] bg-[#f0b429] text-[#15130f]", label: "Marked for review" },
  answeredMarked: { cls: "rounded-full border-[#1f7a45] bg-[#1f7a45] text-white ring-2 ring-[#f0b429]", label: "Answered and marked" },
};

const initials = (n: string) => n.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]?.toUpperCase()).join("");

function enterFullscreen() {
  try { void document.documentElement.requestFullscreen?.().catch(() => {}); } catch {}
}
function leaveFullscreen() {
  try { if (document.fullscreenElement) void document.exitFullscreen?.().catch(() => {}); } catch {}
}

function Candidate({ name, rollNo, dark = false }: { name: string; rollNo: string; dark?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <span className={`flex h-12 w-12 shrink-0 items-center justify-center border-2 font-display text-lg italic ${dark ? "border-white/40 bg-white/10 text-white" : "border-[var(--es-ink)] bg-white"}`} aria-hidden>{initials(name)}</span>
      <span className="min-w-0 leading-tight">
        <span className="block truncate font-semibold">{name}</span>
        <span className={`block text-xs ${dark ? "text-white/60" : "text-muted-foreground"}`}>Roll no. {rollNo}</span>
      </span>
    </div>
  );
}

/** Sits on the dark exam band of the course page. */
export function ExamPanel({ token, state, onState }: { token: string; state: CourseState; onState: (s: CourseState) => void }) {
  const [phase, setPhase] = useState<"idle" | "instructions" | "running">(state.exam === "running" ? "running" : "idle");
  const [agreed, setAgreed] = useState(false);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (state.exam !== "done") return;
    const target = state.score ?? 0;
    if (target === 0) return;
    let n = 0;
    const t = setInterval(() => { n += 1; setShown(n); if (n >= target) clearInterval(t); }, 90);
    return () => clearInterval(t);
  }, [state.exam, state.score]);

  if (state.exam === "done") {
    return (
      <div role="status" className="grid items-center gap-10 lg:grid-cols-2">
        <div className="border border-white/25 p-7">
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Result · online test</p>
          {state.timedOut && <p className="mt-3 inline-flex items-center gap-2 bg-primary px-3 py-1 text-xs font-bold uppercase tracking-widest text-primary-foreground"><Timer className="h-3.5 w-3.5" aria-hidden /> Time is over. The exam has ended.</p>}
          <p className="font-display mt-4 text-8xl italic leading-none tabular-nums text-[var(--es-paper)]">{shown}<span className="text-4xl opacity-60"> / {state.total}</span></p>
          <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-white/20 pt-5 text-sm text-[var(--es-paper)]/85">
            <div><dt className="text-xs uppercase tracking-widest text-white/50">Candidate</dt><dd className="mt-1 font-medium">{state.name}</dd></div>
            <div><dt className="text-xs uppercase tracking-widest text-white/50">Roll no.</dt><dd className="mt-1 font-medium">{state.rollNo}</dd></div>
          </dl>
          <p className="mt-5 text-[var(--es-paper)]/85">Your certificate will reach <strong>{state.email}</strong> within 3 days.</p>
        </div>
        <div className="flex justify-center lg:justify-end"><CertificateCard name={state.name} /></div>
      </div>
    );
  }

  if (phase === "running") return <Running token={token} state={state} onFinished={(s) => { leaveFullscreen(); onState(s); }} />;

  if (phase === "instructions") {
    return (
      <div className="fixed inset-0 z-[2147483647] overflow-y-auto bg-[var(--es-paper)] text-[var(--es-ink)]" role="dialog" aria-modal="true" aria-label="Exam instructions">
        <header className="flex items-center justify-between gap-4 bg-[var(--es-ink)] px-6 py-3 text-[var(--es-paper)]">
          <div className="flex items-center gap-3"><Image src="/images/nifs-official-logo-v3.png" alt="" width={36} height={36} className="h-9 w-auto rounded-sm bg-white p-0.5" /><p className="text-sm font-semibold uppercase tracking-widest">NIFS · Online Examination</p></div>
          <Candidate name={state.name} rollNo={state.rollNo} dark />
        </header>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-primary">General instructions</p>
            <h2 className="font-display mt-2 text-4xl italic md:text-5xl">Ergonomic Safety (NIFS ES): Online Test</h2>
            <ol className="mt-6 space-y-3">
              {rules.map((r, i) => (<li key={r} className="flex gap-4"><span className="font-display text-xl italic text-primary">{i + 1}</span><span>{r}</span></li>))}
            </ol>
            <label className="mt-8 flex min-h-11 cursor-pointer items-start gap-3 border border-[var(--es-ink)] bg-white p-4">
              <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="mt-1 h-5 w-5 accent-[var(--primary)]" />
              <span>I have read and understood the instructions. I will attempt the test on my own.</span>
            </label>
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <button type="button" disabled={!agreed} onClick={() => { enterFullscreen(); setPhase("running"); }} className="inline-flex min-h-14 items-center gap-2 bg-primary px-10 text-base font-semibold text-primary-foreground transition-all enabled:hover:gap-3 disabled:cursor-not-allowed disabled:opacity-40">
                I am ready to begin <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <button type="button" onClick={() => setPhase("idle")} className="min-h-11 text-sm underline underline-offset-4 hover:text-primary">Go back</button>
            </div>
          </div>
          <aside className="space-y-6">
            <div className="border border-[var(--es-ink)] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Test details</p>
              <dl className="mt-3 grid grid-cols-3 gap-3 text-center">
                <div><dt className="text-xs text-muted-foreground">Questions</dt><dd className="font-display text-3xl italic">20</dd></div>
                <div><dt className="text-xs text-muted-foreground">Minutes</dt><dd className="font-display text-3xl italic">10</dd></div>
                <div><dt className="text-xs text-muted-foreground">Marks</dt><dd className="font-display text-3xl italic">20</dd></div>
              </dl>
            </div>
            <div className="border border-[var(--es-ink)] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Question palette</p>
              <ul className="mt-3 space-y-2.5">
                {(Object.keys(PALETTE) as Status[]).map((k, i) => (
                  <li key={k} className="flex items-center gap-3 text-sm"><span className={`flex h-8 w-8 items-center justify-center border text-xs font-semibold ${PALETTE[k].cls}`}>{i + 1}</span>{PALETTE[k].label}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h3 className="font-display text-3xl italic text-[var(--es-paper)]">Online test, like the real thing</h3>
        <ul className="mt-5 space-y-3 text-[var(--es-paper)]/90">
          <li>20 questions in 10 minutes, 1 mark each, no negative marking.</li>
          <li>Question palette, mark for review, full-screen exam window.</li>
          <li>When the time is over, the exam is over.</li>
        </ul>
      </div>
      <div className="flex flex-col justify-between gap-8 border border-white/20 p-7">
        <div>
          <p className="font-display text-7xl italic leading-none tabular-nums text-[var(--es-paper)]">10:00</p>
          <p className="mt-2 text-sm text-[var(--es-paper)]/70">Roll no. {state.rollNo}</p>
        </div>
        <button type="button" onClick={() => setPhase("instructions")} className="group flex min-h-14 w-full items-center justify-center gap-2 bg-primary px-6 text-base font-semibold text-primary-foreground transition-all hover:gap-3">
          Read instructions and begin <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function Running({ token, state, onFinished }: { token: string; state: CourseState; onFinished: (s: CourseState) => void }) {
  const [qs, setQs] = useState<Q[] | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [cur, setCur] = useState(0);
  const [visited, setVisited] = useState<number[]>([0]);
  const [marked, setMarked] = useState<number[]>([]);
  const [left, setLeft] = useState(EXAM_MS);
  const [confirm, setConfirm] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  const [warns, setWarns] = useState(0);
  const [warnMsg, setWarnMsg] = useState("");
  const endAt = useRef(0);
  const submitting = useRef(false);
  const latest = useRef(answers);
  latest.current = answers;
  const fin = useRef(onFinished);
  fin.current = onFinished;
  const noted = useRef(0);
  const timeUpRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    post("/exam/start", { token }).then(({ ok, j }) => {
      if (cancelled) return;
      if (!ok) { if (j.state) fin.current(j.state); else setErr(j.error || "Could not start the exam."); return; }
      endAt.current = Date.now() + j.remainingMs;
      setQs(j.questions);
      setAnswers(j.answers || {});
      setLeft(j.remainingMs);
    });
    return () => { cancelled = true; };
  }, [token]);

  const submit = useCallback(async () => {
    if (submitting.current) return;
    submitting.current = true;
    setErr("");
    const { ok, j } = await post("/exam/submit", { token, answers: latest.current, final: true });
    if (ok && j.state) {
      // Let "Time is over" register for a moment before the result replaces it.
      if (timeUpRef.current) await new Promise((r) => setTimeout(r, 3000));
      fin.current(j.state);
      return;
    }
    submitting.current = false;
    setErr(j.error || "Could not submit. Check your connection and try again.");
  }, [token]);

  // Display clock only; the server decides the real deadline. At 00:00 the exam is over.
  useEffect(() => {
    if (!qs) return;
    const t = setInterval(() => {
      const l = endAt.current - Date.now();
      setLeft(l);
      if (l <= 0) { timeUpRef.current = true; setTimeUp(true); setConfirm(false); void submit(); }
    }, 500);
    return () => clearInterval(t);
  }, [qs, submit]);

  useEffect(() => {
    const m = Math.ceil(left / 60_000);
    if (qs && left > 0 && [5, 1].includes(m) && noted.current !== m) {
      noted.current = m;
      setNote(`${m} minute${m > 1 ? "s" : ""} remaining`);
    }
  }, [left, qs]);

  // Autosave so a closed tab still keeps progress.
  useEffect(() => {
    if (!qs) return;
    const t = setTimeout(() => void post("/exam/submit", { token, answers, final: false }, true), 1200);
    return () => clearTimeout(t);
  }, [answers, qs, token]);

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => { e.preventDefault(); };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  // Leaving the exam window is recorded as a warning.
  useEffect(() => {
    if (!qs) return;
    const onHide = () => {
      if (document.visibilityState !== "hidden") return;
      setWarns((w) => { const n = w + 1; setWarnMsg(`Warning ${n}: do not leave the exam window.`); return n; });
    };
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [qs]);
  useEffect(() => { if (!warnMsg) return; const t = setTimeout(() => setWarnMsg(""), 5000); return () => clearTimeout(t); }, [warnMsg]);

  const goTo = useCallback((i: number) => {
    const n = Math.max(0, Math.min(TOTAL - 1, i));
    setCur(n);
    setVisited((v) => (v.includes(n) ? v : [...v, n]));
  }, []);

  // Keyboard: A-D or 1-4 choose, arrows move.
  useEffect(() => {
    if (!qs || timeUp) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const q = qs[cur];
      const k = "1234".indexOf(e.key) >= 0 ? "1234".indexOf(e.key) : "abcd".indexOf(e.key.toLowerCase());
      if (k >= 0 && q.options[k]) { setAnswers((a) => ({ ...a, [String(q.id)]: q.options[k].i })); return; }
      if (e.key === "ArrowRight") goTo(cur + 1);
      if (e.key === "ArrowLeft") goTo(cur - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [qs, cur, timeUp, goTo]);

  if (!qs) return <p role="status" className="text-[var(--es-paper)]">{err || "Loading your exam..."}</p>;

  const q = qs[cur];
  const isAnswered = (i: number) => answers[String(qs[i].id)] !== undefined;
  const statusOf = (i: number): Status => {
    const a = isAnswered(i);
    const m = marked.includes(i);
    if (a && m) return "answeredMarked";
    if (m) return "marked";
    if (a) return "answered";
    return visited.includes(i) ? "notAnswered" : "notVisited";
  };
  const counts = { answered: 0, notAnswered: 0, notVisited: 0, marked: 0 };
  qs.forEach((_, i) => {
    const st = statusOf(i);
    if (st === "answered" || st === "answeredMarked") counts.answered++;
    if (st === "notAnswered") counts.notAnswered++;
    if (st === "notVisited") counts.notVisited++;
    if (st === "marked" || st === "answeredMarked") counts.marked++;
  });
  const low = left < 120_000;
  const allAnswered = counts.answered === TOTAL;
  const clear = () => setAnswers((a) => { const n = { ...a }; delete n[String(q.id)]; return n; });
  const toggleMark = () => setMarked((m) => (m.includes(cur) ? m.filter((x) => x !== cur) : [...m, cur]));

  return (
    <div className={`fixed inset-0 z-[2147483647] flex flex-col bg-[#eeeae0] text-[var(--es-ink)] ${low ? "es-vignette" : ""}`} role="dialog" aria-modal="true" aria-label="Final exam" onContextMenu={(e) => e.preventDefault()}>
      <header className="flex flex-wrap items-center justify-between gap-3 bg-[var(--es-ink)] px-4 py-2.5 text-[var(--es-paper)] md:px-6">
        <div className="flex items-center gap-3">
          <Image src="/images/nifs-official-logo-v3.png" alt="" width={36} height={36} className="h-9 w-auto rounded-sm bg-white p-0.5" />
          <div className="leading-tight"><p className="text-xs font-semibold uppercase tracking-widest">NIFS · Online Examination</p><p className="hidden text-xs text-white/60 sm:block">Ergonomic Safety (NIFS ES)</p></div>
        </div>
        <div className="hidden md:block"><Candidate name={state.name} rollNo={state.rollNo} dark /></div>
        <div className="flex items-center gap-3">
          {warns > 0 && <span className="hidden items-center gap-1 text-xs text-[#f0b429] sm:inline-flex"><ShieldAlert className="h-4 w-4" aria-hidden /> Warnings {warns}</span>}
          <div className={`flex items-center gap-2 border-2 px-4 py-1.5 ${low ? "border-primary bg-primary text-white" : "border-white/40"}`} aria-hidden>
            <Timer className="h-5 w-5" />
            <span className="font-mono text-3xl font-bold tabular-nums leading-none">{fmt(left)}</span>
          </div>
        </div>
      </header>
      <p className="sr-only" aria-live="polite">{note}</p>
      {warnMsg && <p role="alert" className="bg-[#f0b429] px-4 py-2 text-center text-sm font-semibold">{warnMsg}</p>}

      <div className="flex min-h-0 flex-1 flex-col lg:flex-row">
        <main className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-[#cfc9b8] bg-white px-4 py-2 text-sm md:px-6">
            <span className="font-semibold">Section: Ergonomic Safety</span>
            <span className="text-muted-foreground">Correct +1 · Wrong 0 · No negative marking</span>
          </div>
          <div className="min-h-0 flex-1 select-none overflow-y-auto bg-white p-5 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Question no. {cur + 1}</p>
            <h2 className="mt-3 text-2xl font-medium leading-snug md:text-3xl">{q.q}</h2>
            <div role="radiogroup" aria-label={q.q} className="mt-7 max-w-3xl space-y-3">
              {q.options.map((o, k) => {
                const on = answers[String(q.id)] === o.i;
                return (
                  <button key={o.i} type="button" role="radio" aria-checked={on} disabled={timeUp} onClick={() => setAnswers({ ...answers, [String(q.id)]: o.i })}
                    className={`flex min-h-14 w-full items-center gap-4 border-2 px-4 py-3 text-left text-lg transition-colors ${on ? "border-[#1f7a45] bg-[#1f7a45]/10" : "border-[#cfc9b8] hover:border-[var(--es-ink)]"}`}>
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 ${on ? "border-[#1f7a45]" : "border-[#8a857b]"}`} aria-hidden>{on && <span className="h-3.5 w-3.5 rounded-full bg-[#1f7a45]" />}</span>
                    <span className="font-semibold text-muted-foreground">{"ABCD"[k]}.</span> {o.t}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-[#cfc9b8] bg-[#f6f3ea] px-4 py-3 md:px-6">
            <button type="button" disabled={timeUp} onClick={() => { toggleMark(); goTo(cur + 1); }} className="inline-flex min-h-11 items-center gap-2 border-2 border-[#b36b00] bg-[#f0b429] px-4 text-sm font-semibold hover:brightness-95 disabled:opacity-50"><Flag className="h-4 w-4" aria-hidden /> {marked.includes(cur) ? "Unmark & next" : "Mark for review & next"}</button>
            <button type="button" disabled={timeUp} onClick={clear} className="inline-flex min-h-11 items-center gap-2 border-2 border-[var(--es-ink)] px-4 text-sm font-semibold hover:bg-white disabled:opacity-50"><RotateCcw className="h-4 w-4" aria-hidden /> Clear response</button>
            <div className="ml-auto flex items-center gap-2">
              <button type="button" disabled={cur === 0 || timeUp} onClick={() => goTo(cur - 1)} className="min-h-11 border-2 border-[var(--es-ink)] px-4 text-sm font-semibold hover:bg-white disabled:opacity-40">Previous</button>
              <button type="button" disabled={timeUp} onClick={() => goTo(cur + 1)} className="inline-flex min-h-11 items-center gap-2 bg-[#1f7a45] px-6 text-sm font-semibold text-white hover:brightness-110 disabled:opacity-50">Save &amp; next <ArrowRight className="h-4 w-4" aria-hidden /></button>
            </div>
          </div>
        </main>

        <aside className="flex max-h-[42vh] w-full shrink-0 flex-col overflow-y-auto border-t border-[#cfc9b8] bg-[#f6f3ea] p-4 lg:max-h-none lg:w-80 lg:border-l lg:border-t-0">
          <div className="md:hidden"><Candidate name={state.name} rollNo={state.rollNo} /></div>
          <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2 text-xs md:mt-0">
            <li className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center border text-[11px] font-semibold ${PALETTE.answered.cls}`}>{counts.answered}</span>Answered</li>
            <li className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center border text-[11px] font-semibold ${PALETTE.notAnswered.cls}`}>{counts.notAnswered}</span>Not answered</li>
            <li className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center border text-[11px] font-semibold ${PALETTE.notVisited.cls}`}>{counts.notVisited}</span>Not visited</li>
            <li className="flex items-center gap-2"><span className={`flex h-7 w-7 items-center justify-center border text-[11px] font-semibold ${PALETTE.marked.cls}`}>{counts.marked}</span>Marked</li>
          </ul>
          <p className="mt-4 bg-[var(--es-ink)] px-3 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--es-paper)]">Question palette</p>
          <div className="mt-3 grid grid-cols-5 gap-2">
            {qs.map((x, i) => (
              <button key={x.id} type="button" disabled={timeUp} onClick={() => goTo(i)} aria-label={`Question ${i + 1}, ${PALETTE[statusOf(i)].label}`} aria-current={i === cur ? "true" : undefined}
                className={`flex h-11 items-center justify-center border text-sm font-semibold ${PALETTE[statusOf(i)].cls} ${i === cur ? "outline outline-2 outline-offset-2 outline-[var(--es-ink)]" : ""}`}>{i + 1}</button>
            ))}
          </div>
          <button type="button" disabled={!allAnswered || timeUp} onClick={() => setConfirm(true)} className="mt-5 min-h-12 w-full bg-primary px-4 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40">
            {allAnswered ? "Submit test" : `Answer all ${TOTAL} to submit`}
          </button>
          {err && <p role="alert" className="mt-3 text-sm text-primary">{err}</p>}
        </aside>
      </div>

      {confirm && !timeUp && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 p-4" role="alertdialog" aria-modal="true" aria-label="Confirm submission">
          <div className="w-full max-w-md border-2 border-[var(--es-ink)] bg-white p-6">
            <h3 className="font-display text-3xl italic">Submit the test?</h3>
            <dl className="mt-4 grid grid-cols-3 gap-3 text-center text-sm">
              <div className="border border-[#cfc9b8] p-3"><dt className="text-xs text-muted-foreground">Answered</dt><dd className="text-2xl font-bold">{counts.answered}</dd></div>
              <div className="border border-[#cfc9b8] p-3"><dt className="text-xs text-muted-foreground">Not answered</dt><dd className="text-2xl font-bold">{counts.notAnswered + counts.notVisited}</dd></div>
              <div className="border border-[#cfc9b8] p-3"><dt className="text-xs text-muted-foreground">Marked</dt><dd className="text-2xl font-bold">{counts.marked}</dd></div>
            </dl>
            <p className="mt-4 text-sm text-muted-foreground">You cannot change your answers after submitting.</p>
            <div className="mt-5 flex gap-3">
              <button type="button" onClick={() => void submit()} className="min-h-12 flex-1 bg-primary px-4 text-sm font-semibold text-primary-foreground">Yes, submit</button>
              <button type="button" onClick={() => setConfirm(false)} className="min-h-12 flex-1 border-2 border-[var(--es-ink)] px-4 text-sm font-semibold">Go back</button>
            </div>
          </div>
        </div>
      )}

      {timeUp && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0d0c0a]/95 p-6 text-center text-[var(--es-paper)]" role="alertdialog" aria-live="assertive" aria-label="Time is over">
          <Timer className="h-14 w-14 text-primary" aria-hidden />
          <p className="font-display mt-4 text-6xl italic md:text-8xl">Time is over</p>
          <p className="mt-3 text-xl text-white/80">The exam has ended. Your answers are being submitted.</p>
          {err && (<><p className="mt-4 text-sm text-red-300">{err}</p><button type="button" onClick={() => void submit()} className="mt-4 min-h-12 bg-primary px-8 text-sm font-semibold text-primary-foreground">Try submitting again</button></>)}
        </div>
      )}
    </div>
  );
}
