"use client";

import { useEffect, useRef, useState } from "react";
import { Figure, ZONE, objectY } from "./figure";

const SEGMENTS = 10;

function status(t: number) {
  if (t < 0.2) return { head: "Neutral posture", body: "Spine straight, elbow at the side, load at waist height." };
  if (t < 0.55) return { head: "Reaching", body: "The back starts to bend and the shoulder lifts. Strain is building." };
  return { head: "Awkward posture", body: "Back bent, arm above the shoulder, load out of reach. This is the pattern behind many MSDs." };
}

/** Hero interaction: drag the slider and the worker reaches; a live strain meter reacts. */
export function StrainLab({ compact = false }: { compact?: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [t, setT] = useState(0);
  const touched = useRef(false);

  // One gentle demo sweep so people notice it is alive. Any touch cancels it.
  useEffect(() => {
    const el = root.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        if (touched.current) return;
        const p = (now - start) / 2600;
        if (p >= 1) { setT(0.12); return; }
        setT(p < 0.55 ? (p / 0.55) * 0.92 : 0.92 - ((p - 0.55) / 0.45) * 0.8);
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, []);

  const s = status(t);
  const strain = Math.round(t * 100);
  const filled = Math.round(t * SEGMENTS);
  const inZone = objectY(t) >= ZONE.top && objectY(t) <= ZONE.bottom;

  return (
    <div ref={root} className="border border-[var(--es-line)] bg-[var(--es-paper)] p-5 shadow-[0_30px_60px_-30px_rgba(21,19,15,0.35)] md:p-7">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-primary">Strain Lab</p>
          <p className="font-display mt-1 text-2xl italic leading-tight md:text-3xl" aria-live="polite">{s.head}</p>
        </div>
        <div className="text-right">
          <p className="font-display text-5xl italic leading-none tabular-nums md:text-6xl">{strain}<span className="text-2xl">%</span></p>
          <p className="mt-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">Strain</p>
        </div>
      </div>

      <div className={`relative mx-auto mt-2 ${compact ? "h-64" : "h-72 md:h-80"} max-w-sm`}>
        <Figure t={t} label={`${s.head}. Strain ${strain} percent.`} />
      </div>

      <div className="mt-1 flex gap-1" aria-hidden>
        {Array.from({ length: SEGMENTS }, (_, i) => (
          <span
            key={i}
            className="h-2 flex-1 transition-colors duration-150"
            style={{ background: i < filled ? (i < 3 ? "#15130f" : "var(--primary)") : "var(--es-line)", opacity: i < filled && i >= 3 ? 0.55 + i * 0.045 : 1 }}
          />
        ))}
      </div>

      <label className="mt-3 block">
        <span className="sr-only">Reach: from neutral to overhead</span>
        <input
          type="range"
          min={0}
          max={100}
          value={Math.round(t * 100)}
          onChange={(e) => { touched.current = true; setT(Number(e.target.value) / 100); }}
          onPointerDown={() => { touched.current = true; }}
          className="es-range"
        />
      </label>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>Drag to reach</span>
        <span className={`font-semibold ${inZone ? "text-foreground" : "text-primary"}`}>{inZone ? "Load inside power zone" : "Load outside power zone"}</span>
      </div>
      {!compact && <p className="mt-3 border-t border-[var(--es-line)] pt-3 text-sm text-muted-foreground">{s.body}</p>}
    </div>
  );
}
