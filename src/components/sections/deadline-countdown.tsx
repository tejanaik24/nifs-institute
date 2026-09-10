"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: number) {
  const diff = target - Date.now();
  if (diff <= 0) return null;
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return { days, hours, minutes, seconds };
}

const UNITS: { key: "days" | "hours" | "minutes" | "seconds"; label: string }[] = [
  { key: "days", label: "Days" },
  { key: "hours", label: "Hours" },
  { key: "minutes", label: "Minutes" },
  { key: "seconds", label: "Seconds" },
];

export function DeadlineCountdown({ applyByDate }: { applyByDate: string }) {
  const target = new Date(applyByDate).getTime();
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(target));

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  if (!timeLeft) return null;

  return (
    <div className="rounded-2xl bg-zinc-900 px-4 py-6 sm:px-6">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-widest text-primary">
        Applications close in
      </p>
      <div className="grid grid-cols-4 gap-2 sm:gap-4">
        {UNITS.map((u) => (
          <div key={u.key} className="text-center">
            <div className="rounded-xl bg-zinc-800 py-3 sm:py-5">
              <span className="font-mono text-3xl font-bold tabular-nums text-white sm:text-5xl">
                {String(timeLeft[u.key]).padStart(2, "0")}
              </span>
            </div>
            <span className="mt-2 block text-[10px] font-semibold uppercase tracking-wider text-primary sm:text-xs">
              {u.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
