"use client";

import { useEffect, useState } from "react";
import { StatBadge3D } from "@/components/three/StatBadge3D";

const STALE_AFTER_MS = 2 * 60_000; // 2 min = a few missed 30s polls in a row

export function RealtimeBadge() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [secondsAgo, setSecondsAgo] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/analytics/realtime");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.activeUsers === "number") {
          setActiveUsers(data.activeUsers);
          setLastUpdated(Date.now());
        }
      } catch {
        // leave last known value on a transient failure — staleness label below covers this
      }
    }

    poll();
    const interval = setInterval(poll, 30_000); // 30s — well under GA4 Realtime API quota
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const tick = setInterval(() => {
      if (lastUpdated !== null) setSecondsAgo(Math.round((Date.now() - lastUpdated) / 1000));
    }, 1000);
    return () => clearInterval(tick);
  }, [lastUpdated]);

  const isStale = lastUpdated === null || Date.now() - lastUpdated > STALE_AFTER_MS;

  return (
    <div>
      <StatBadge3D value={activeUsers === null ? "—" : String(activeUsers)} label="On site right now" />
      <p className={`mt-1 text-center text-[11px] ${isStale ? "font-semibold text-amber-600 dark:text-amber-400" : "text-[var(--dash-text-muted)]"}`}>
        {lastUpdated === null
          ? "Waiting for first refresh…"
          : isStale
            ? `Stale — last updated ${secondsAgo}s ago`
            : `Updated ${secondsAgo}s ago`}
      </p>
    </div>
  );
}
