"use client";

import { useState } from "react";
import { Crosshair, HeartPulse, MoveVertical } from "lucide-react";
import { HazardHunt, PowerZoneDrag, SymptomMatch } from "./lessons";

const eyebrow = "text-xs font-semibold uppercase tracking-widest text-primary";

const TABS = [
  { id: "hazards", label: "Find the 9 hazards", Icon: Crosshair, node: <HazardHunt /> },
  { id: "symptoms", label: "Match the symptoms", Icon: HeartPulse, node: <SymptomMatch /> },
  { id: "zone", label: "Power zone", Icon: MoveVertical, node: <PowerZoneDrag /> },
];

/** Three optional hands-on activities. All stay mounted so progress is kept when switching tabs. */
export function Activities() {
  const [active, setActive] = useState(TABS[0].id);
  return (
    <section id="activities" className="mx-auto max-w-5xl scroll-mt-32 px-6 py-16 lg:py-24">
      <span className={eyebrow}>Try it · optional</span>
      <h2 className="font-display mt-3 text-4xl italic leading-[1.05] md:text-6xl">Learn by doing</h2>
      <p className="mb-8 mt-3 text-lg text-muted-foreground">Three quick activities. Or <a href="#exam" className="underline underline-offset-4 hover:text-primary">skip to the exam</a>.</p>

      <div className="border border-[var(--es-ink)] bg-[var(--es-paper)] shadow-[8px_8px_0_0_var(--es-ink)]">
        <div role="tablist" aria-label="Activities" className="grid grid-cols-1 border-b border-[var(--es-ink)] sm:grid-cols-3">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              role="tab"
              id={`act-tab-${id}`}
              aria-selected={active === id}
              aria-controls={`act-panel-${id}`}
              type="button"
              onClick={() => setActive(id)}
              className={`flex min-h-14 items-center justify-center gap-2.5 border-[var(--es-line)] px-4 py-3 text-sm font-semibold transition-colors sm:border-r last:sm:border-r-0 ${active === id ? "bg-primary text-primary-foreground" : "hover:bg-white"}`}
            >
              <Icon className="h-4 w-4" aria-hidden /> {label}
            </button>
          ))}
        </div>
        {TABS.map(({ id, node }) => (
          <div key={id} role="tabpanel" id={`act-panel-${id}`} aria-labelledby={`act-tab-${id}`} hidden={active !== id} className="p-6 md:p-10">
            {node}
          </div>
        ))}
      </div>
    </section>
  );
}
