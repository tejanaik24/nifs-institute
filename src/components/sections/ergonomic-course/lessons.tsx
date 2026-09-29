"use client";

import { useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { Figure, ZONE } from "./figure";
import { hazards, symptoms } from "./course-data";

const label = "text-xs font-semibold uppercase tracking-widest";

/* ---------- Quiz with a reacting figure ---------- */
export type QuizDef = { q: string; options: string[]; correct: number; explain: string };

export function Quiz({ quiz, onAnswered }: { quiz: QuizDef; onAnswered: (ok: boolean) => void }) {
  const [pick, setPick] = useState<number | null>(null);
  const answered = pick !== null;
  const ok = pick === quiz.correct;
  return (
    <div className="grid items-center gap-6 md:grid-cols-[1fr_9rem]">
      <div>
        <p className={`${label} text-primary`}>Check yourself</p>
        <h3 className="font-display mt-2 text-2xl italic leading-snug md:text-3xl">{quiz.q}</h3>
        <div role="radiogroup" aria-label={quiz.q} className="mt-5 space-y-2.5">
          {quiz.options.map((o, i) => {
            const isPick = pick === i;
            const state = !answered ? "border-[var(--es-line)] bg-white hover:border-[var(--es-ink)]" : i === quiz.correct ? "border-primary bg-primary/10" : isPick ? "border-[var(--es-ink)] bg-[var(--es-ink)]/5 es-shake" : "border-[var(--es-line)] opacity-60";
            return (
              <button
                key={o}
                type="button"
                role="radio"
                aria-checked={isPick}
                disabled={answered}
                onClick={() => { setPick(i); onAnswered(i === quiz.correct); }}
                className={`flex min-h-12 w-full items-center gap-3 border px-4 py-3 text-left transition-colors ${state}`}
              >
                <span className={`flex h-7 w-7 shrink-0 items-center justify-center border text-xs font-semibold ${answered && i === quiz.correct ? "border-primary bg-primary text-primary-foreground" : "border-current"}`}>
                  {answered && i === quiz.correct ? <Check className="h-4 w-4" aria-hidden /> : "ABC"[i]}
                </span>
                {o}
              </button>
            );
          })}
        </div>
        {answered && (
          <p role="status" className="es-pop mt-4 border border-primary/40 bg-primary/5 p-4">
            <strong>{ok ? "Yes." : "Not quite."}</strong> {quiz.explain}
          </p>
        )}
      </div>
      <div className="mx-auto hidden h-44 w-32 md:block" aria-hidden>
        <Figure t={!answered ? 0.06 : ok ? 0 : 0.6} label="" bare hideLoad />
      </div>
    </div>
  );
}

/* ---------- Hazard hunt: 9 hotspots in one workplace ---------- */
const HOTSPOTS: { x: number; y: number }[] = [
  { x: 168, y: 238 }, // 0 poor workstation setup (monitor)
  { x: 716, y: 160 }, // 1 repetitive movements (conveyor)
  { x: 76, y: 196 }, //  2 prolonged static postures (seated)
  { x: 470, y: 352 }, // 3 forceful exertions (lifting)
  { x: 738, y: 282 }, // 4 vibration (drill)
  { x: 842, y: 176 }, // 5 extreme temperatures (furnace)
  { x: 322, y: 232 }, // 6 inadequate lighting (lamp)
  { x: 812, y: 292 }, // 7 improper tools (wrench)
  { x: 262, y: 118 }, // 8 stress and workload (clock + papers)
];

export function HazardHunt() {
  const [found, setFound] = useState<number[]>([]);
  const [last, setLast] = useState<number | null>(null);
  const toggle = (i: number) => { setLast(i); setFound((f) => (f.includes(i) ? f : [...f, i])); };
  const all = found.length === hazards.length;
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground">Tap the glowing dots to find all nine hazards.</p>
        <p className="font-display shrink-0 text-3xl italic tabular-nums"><span className="text-primary">{found.length}</span>/{hazards.length}</p>
      </div>
      <p className="mt-2 text-xs text-muted-foreground md:hidden">Swipe the scene sideways to see everything.</p>
      <div className="mt-2 overflow-x-auto border border-[var(--es-line)] bg-[#f1ece2]">
        <svg viewBox="0 0 900 460" role="group" aria-label="Workplace scene with nine hidden ergonomic hazards" className="block w-full min-w-[720px]">
          <rect width="900" height="460" fill="#f1ece2" />
          <rect y="386" width="900" height="74" fill="#e3dccd" />
          <line x1="0" y1="386" x2="900" y2="386" stroke="#15130f" strokeOpacity="0.25" strokeWidth="2" />
          {/* office corner */}
          <g stroke="#15130f" strokeWidth="5" strokeLinecap="round" fill="none">
            <line x1="40" y1="300" x2="300" y2="300" strokeWidth="8" />
            <line x1="70" y1="304" x2="70" y2="386" /><line x1="270" y1="304" x2="270" y2="386" />
            <rect x="118" y="252" width="100" height="42" fill="#fff" />
            <line x1="168" y1="294" x2="168" y2="300" />
            <circle cx="76" cy="206" r="15" fill="#15130f" />
            <polyline points="80,222 96,262 70,296" />
            <line x1="96" y1="262" x2="132" y2="296" />
            <line x1="52" y1="270" x2="88" y2="270" strokeWidth="9" />
            <line x1="62" y1="272" x2="62" y2="386" />
          </g>
          <circle cx="262" cy="118" r="30" fill="#fff" stroke="#15130f" strokeWidth="5" />
          <polyline points="262,98 262,118 276,126" stroke="#15130f" strokeWidth="4" fill="none" strokeLinecap="round" />
          <g fill="#fff" stroke="#15130f" strokeWidth="3"><rect x="228" y="270" width="52" height="8" /><rect x="232" y="262" width="46" height="8" /><rect x="226" y="254" width="54" height="8" /></g>
          <g stroke="#15130f" strokeWidth="5" strokeLinecap="round" fill="none"><line x1="322" y1="300" x2="322" y2="250" /><line x1="322" y1="250" x2="346" y2="236" /></g>
          <polygon points="346,236 372,250 330,254" fill="#15130f" opacity="0.18" />
          {/* shelving + lifting */}
          <g stroke="#15130f" strokeWidth="6" strokeLinecap="round" fill="none">
            <line x1="400" y1="110" x2="400" y2="386" /><line x1="560" y1="110" x2="560" y2="386" />
            <line x1="400" y1="160" x2="560" y2="160" /><line x1="400" y1="260" x2="560" y2="260" /><line x1="400" y1="350" x2="560" y2="350" />
          </g>
          <g fill="var(--primary)" opacity="0.85"><rect x="420" y="118" width="60" height="40" /><rect x="486" y="132" width="54" height="26" /><rect x="430" y="222" width="70" height="36" /></g>
          <g stroke="#15130f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <circle cx="470" cy="304" r="14" fill="#15130f" />
            <polyline points="476,318 500,350 486,386" /><polyline points="500,350 522,386" />
            <polyline points="482,326 452,344" />
          </g>
          <rect x="436" y="338" width="52" height="36" fill="var(--primary)" />
          {/* right bench */}
          <g stroke="#15130f" strokeWidth="6" strokeLinecap="round" fill="none">
            <line x1="640" y1="312" x2="880" y2="312" strokeWidth="8" /><line x1="660" y1="316" x2="660" y2="386" /><line x1="860" y1="316" x2="860" y2="386" />
            <line x1="640" y1="190" x2="800" y2="190" /><line x1="640" y1="190" x2="640" y2="176" />
          </g>
          <g fill="var(--primary)" opacity="0.85"><rect x="656" y="150" width="30" height="30" /><rect x="700" y="150" width="30" height="30" /><rect x="744" y="150" width="30" height="30" /></g>
          <g stroke="#15130f" strokeWidth="5" fill="#15130f" strokeLinecap="round"><rect x="716" y="278" width="46" height="20" rx="4" /><line x1="762" y1="288" x2="782" y2="288" /></g>
          <g stroke="var(--primary)" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M710 262 q-8 6 0 12 q8 6 0 12" /><path d="M726 258 q-8 6 0 12 q8 6 0 12" /></g>
          <g stroke="#15130f" strokeWidth="6" strokeLinecap="round" fill="none"><path d="M800 300 l30 -14" /><circle cx="836" cy="284" r="12" /></g>
          <rect x="820" y="150" width="46" height="90" fill="#fff" stroke="#15130f" strokeWidth="5" />
          <rect x="828" y="196" width="30" height="36" fill="var(--primary)" opacity="0.8" />
          <g stroke="var(--primary)" strokeWidth="3" fill="none" strokeLinecap="round"><path d="M826 138 q-6 -8 0 -16" /><path d="M843 138 q-6 -8 0 -16" /><path d="M860 138 q-6 -8 0 -16" /></g>

          {HOTSPOTS.map((p, i) => {
            const on = found.includes(i);
            return (
              <g
                key={i}
                role="button"
                tabIndex={0}
                aria-label={on ? `Found: ${hazards[i]}` : `Hidden hazard ${i + 1}, tap to reveal`}
                onClick={() => toggle(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); toggle(i); } }}
                className="cursor-pointer outline-none [&:focus-visible>circle:last-of-type]:stroke-[var(--es-ink)]"
              >
                {!on && <circle cx={p.x} cy={p.y} r="16" fill="var(--primary)" className="es-ping" />}
                <circle cx={p.x} cy={p.y} r="30" fill="transparent" />
                <circle cx={p.x} cy={p.y} r="15" fill={on ? "#15130f" : "var(--primary)"} stroke="#fff" strokeWidth="3" />
                {on ? <path d={`M${p.x - 6} ${p.y} l4 5 l8 -10`} stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round" /> : <path d={`M${p.x - 6} ${p.y} h12 M${p.x} ${p.y - 6} v12`} stroke="#fff" strokeWidth="3" strokeLinecap="round" />}
              </g>
            );
          })}
          {(last === null ? [] : [last]).map((i) => {
            const p = HOTSPOTS[i];
            const w = hazards[i].length * 7.4 + 22;
            const x = Math.min(880 - w, Math.max(10, p.x - w / 2));
            const y = p.y > 120 ? p.y - 52 : p.y + 26;
            return (
              <g key={`l${i}`} className="es-pop pointer-events-none">
                <rect x={x} y={y} width={w} height="28" fill="#15130f" />
                <text x={x + w / 2} y={y + 19} textAnchor="middle" fontSize="13" fontWeight="600" fill="#fff">{hazards[i]}</text>
              </g>
            );
          })}
        </svg>
      </div>
      <ul className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3" aria-label="Hazards found">
        {hazards.map((h, i) => {
          const on = found.includes(i);
          return (
            <li key={h} className={`flex min-h-10 items-center gap-2 border px-3 py-2 text-sm transition-colors ${on ? "border-primary bg-primary/10 font-medium" : "border-[var(--es-line)] text-muted-foreground"}`}>
              {on ? <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden /> : <span className="h-4 w-4 shrink-0 border border-current opacity-40" aria-hidden />}
              {on ? h : "Not found yet"}
            </li>
          );
        })}
      </ul>
      {all && <p role="status" className="es-pop mt-4 border border-primary/40 bg-primary/5 p-4"><strong>All nine found.</strong> If you can name them, you can spot them.</p>}
    </div>
  );
}

/* ---------- Symptom match ---------- */
const ORDER = [3, 7, 1, 5, 0, 8, 2, 6, 4];

export function SymptomMatch() {
  const [sel, setSel] = useState<number | null>(null);
  const [done, setDone] = useState<number[]>([]);
  const [bad, setBad] = useState<number | null>(null);
  const tryMatch = (desc: number) => {
    if (sel === null || done.includes(desc)) return;
    if (sel === desc) { setDone([...done, desc]); setSel(null); }
    else { setBad(desc); setTimeout(() => setBad(null), 400); }
  };
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground">Pick a symptom, then tap what it feels like.</p>
        <p className="font-display shrink-0 text-3xl italic tabular-nums"><span className="text-primary">{done.length}</span>/{symptoms.length}</p>
      </div>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="space-y-2" role="group" aria-label="Symptoms">
          {symptoms.map((s, i) => {
            const d = done.includes(i);
            return (
              <button key={s.label} type="button" disabled={d} aria-pressed={sel === i} onClick={() => setSel(i)}
                className={`flex min-h-12 w-full items-center justify-between gap-3 border px-4 py-2.5 text-left font-medium transition-colors ${d ? "border-primary bg-primary text-primary-foreground" : sel === i ? "border-[var(--es-ink)] bg-[var(--es-ink)] text-[var(--es-paper)]" : "border-[var(--es-line)] bg-white hover:border-[var(--es-ink)]"}`}>
                {s.label}{d && <Check className="h-4 w-4" aria-hidden />}
              </button>
            );
          })}
        </div>
        <div className="space-y-2" role="group" aria-label="What it feels like">
          {ORDER.map((i) => {
            const d = done.includes(i);
            return (
              <button key={i} type="button" disabled={d || sel === null} onClick={() => tryMatch(i)}
                className={`flex min-h-12 w-full items-center gap-3 border px-4 py-2.5 text-left text-sm transition-colors ${d ? "border-primary bg-primary/10" : bad === i ? "es-shake border-primary" : "border-[var(--es-line)] bg-white enabled:hover:border-[var(--es-ink)]"} disabled:cursor-not-allowed`}>
                {d && <Check className="h-4 w-4 shrink-0 text-primary" aria-hidden />}
                {symptoms[i].body}
              </button>
            );
          })}
        </div>
      </div>
      {done.length === symptoms.length && <p role="status" className="es-pop mt-4 border border-primary/40 bg-primary/5 p-4"><strong>All nine matched.</strong> Notice it early, and report symptoms before they turn into a lost-time injury.</p>}
    </div>
  );
}

/* ---------- Drag items into the power zone ---------- */
const ITEMS = [
  { name: "Tool used every hour", y0: 34 },
  { name: "Daily reference file", y0: 372 },
  { name: "Frequent parts bin", y0: 82 },
];
const SLOTS = [148, 196, 244]; // item height is 40, so each slot ends inside the zone (140..290)

export function PowerZoneDrag() {
  const [ys, setYs] = useState(ITEMS.map((i) => i.y0));
  const [drag, setDrag] = useState<number | null>(null);
  const svg = useRef<SVGSVGElement>(null);
  const inZone = (y: number) => y >= ZONE.top && y + 40 <= ZONE.bottom + 4;
  const solved = ys.every(inZone);

  const move = (e: React.PointerEvent, i: number) => {
    if (drag !== i || !svg.current) return;
    const r = svg.current.getBoundingClientRect();
    const y = ((e.clientY - r.top) / r.height) * 440 - 20;
    setYs((a) => a.map((v, k) => (k === i ? Math.max(8, Math.min(392, y)) : v)));
  };
  const drop = (i: number) => {
    setDrag(null);
    setYs((a) => {
      const y = a[i];
      const mid = y + 20;
      if (mid < ZONE.top - 14 || mid > ZONE.bottom + 14) return a;
      const taken = a.filter((_, k) => k !== i && inZone(a[k])).map((v) => SLOTS.findIndex((s) => Math.abs(s - v) < 4));
      const free = SLOTS.map((s, k) => ({ s, k })).filter(({ k }) => !taken.includes(k)).sort((p, q) => Math.abs(p.s - y) - Math.abs(q.s - y))[0];
      return a.map((v, k) => (k === i ? (free ? free.s : v) : v));
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <p className="text-muted-foreground">Drag the three things you use most into the power zone, between shoulder and mid-thigh.</p>
        <p className="font-display shrink-0 text-3xl italic tabular-nums"><span className="text-primary">{ys.filter(inZone).length}</span>/3</p>
      </div>
      <div className="mt-4 border border-[var(--es-line)] bg-[#f1ece2]">
        <svg ref={svg} viewBox="0 0 560 440" role="group" aria-label="Drag items into the power zone" className="mx-auto block max-h-[26rem] w-full touch-none select-none">
          <rect x="10" y={ZONE.top} width="540" height={ZONE.bottom - ZONE.top} fill="var(--primary)" opacity={solved ? 0.16 : 0.08} stroke="var(--primary)" strokeDasharray="7 6" />
          <text x="18" y={ZONE.top - 8} fontSize="11" fontWeight="600" letterSpacing="2.5" fill="var(--primary)">POWER ZONE</text>
          <line x1="10" y1="410" x2="550" y2="410" stroke="#15130f" strokeOpacity="0.25" strokeWidth="2" />
          <svg x="0" y="0" width="360" height="440" viewBox="0 0 360 440"><Figure t={0} label="" bare hideLoad /></svg>
          {ITEMS.map((it, i) => {
            const on = inZone(ys[i]);
            return (
              <g
                key={it.name}
                transform={`translate(330 ${ys[i]})`}
                tabIndex={0}
                role="slider"
                aria-label={`${it.name}. ${on ? "In the power zone" : "Outside the power zone"}. Use arrow keys to move.`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round((1 - ys[i] / 392) * 100)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                    const dy = e.key === "ArrowUp" ? -30 : 30;
                    setYs((a) => { const n = a.map((v, k) => (k === i ? Math.max(8, Math.min(392, v + dy)) : v)); return n; });
                  }
                  if (e.key === "Enter") drop(i);
                }}
                onPointerDown={(e) => { (e.target as Element).setPointerCapture?.(e.pointerId); setDrag(i); }}
                onPointerMove={(e) => move(e, i)}
                onPointerUp={() => drop(i)}
                onPointerCancel={() => drop(i)}
                className={`${drag === i ? "cursor-grabbing" : "cursor-grab"} outline-none [&:focus-visible>rect]:stroke-[var(--es-ink)] [&:focus-visible>rect]:stroke-[3]`}
                style={{ transition: drag === i ? "none" : "transform 0.25s cubic-bezier(.2,.7,.2,1)" }}
              >
                <rect width="210" height="40" fill={on ? "#15130f" : "var(--primary)"} stroke="#fff" strokeWidth="2" />
                <text x="14" y="25" fontSize="14" fontWeight="600" fill="#fff" pointerEvents="none">{it.name}</text>
                <text x="196" y="26" fontSize="14" fill="#fff" textAnchor="end" pointerEvents="none">{on ? "✓" : "⇅"}</text>
              </g>
            );
          })}
        </svg>
      </div>
      {solved && <p role="status" className="es-pop mt-4 border border-primary/40 bg-primary/5 p-4"><strong>Everything you use most is now within easy reach.</strong> Less reaching, less strain.</p>}
    </div>
  );
}

/* ---------- Small helpers used by chapter beats ---------- */
export function TapChecklist({ items }: { items: string[] }) {
  const [on, setOn] = useState<number[]>([]);
  return (
    <div>
      <ul className="space-y-2.5">
        {items.map((t, i) => {
          const a = on.includes(i);
          return (
            <li key={t}>
              <button type="button" aria-pressed={a} onClick={() => setOn(a ? on.filter((x) => x !== i) : [...on, i])} className={`flex min-h-12 w-full items-center gap-3 border px-4 py-3 text-left transition-colors ${a ? "border-primary bg-primary/10" : "border-[var(--es-line)] bg-white hover:border-[var(--es-ink)]"}`}>
                <span className={`flex h-6 w-6 shrink-0 items-center justify-center border ${a ? "border-primary bg-primary text-primary-foreground" : "border-current"}`}>{a ? <Check className="h-4 w-4" aria-hidden /> : <Plus className="h-4 w-4 opacity-40" aria-hidden />}</span>
                {t}
              </button>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-sm text-muted-foreground">{on.length} of {items.length} ticked</p>
    </div>
  );
}

export function TabPanel({ tabs }: { tabs: { title: string; body: string }[] }) {
  const [i, setI] = useState(0);
  return (
    <div className="grid gap-px border border-[var(--es-line)] bg-[var(--es-line)] md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      <div role="tablist" aria-label="Benefits" className="flex flex-col gap-px bg-[var(--es-line)]">
        {tabs.map((t, k) => (
          <button key={t.title} role="tab" id={`bt-${k}`} aria-selected={i === k} aria-controls="bt-panel" type="button" onClick={() => setI(k)} className={`min-h-12 px-4 py-3 text-left text-sm font-medium transition-colors ${i === k ? "bg-primary text-primary-foreground" : "bg-white hover:bg-[var(--es-cream)]"}`}>
            {t.title}
          </button>
        ))}
      </div>
      <div role="tabpanel" id="bt-panel" aria-labelledby={`bt-${i}`} key={i} className="es-pop flex flex-col justify-center bg-white p-6 md:p-8">
        <p className="font-display text-2xl italic">{tabs[i].title}</p>
        <p className="mt-3 text-muted-foreground">{tabs[i].body}</p>
      </div>
    </div>
  );
}
