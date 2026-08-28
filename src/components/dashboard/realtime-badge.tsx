"use client";

import { useEffect, useState } from "react";
import { StatBadge3D } from "@/components/three/StatBadge3D";

export function RealtimeBadge() {
  const [activeUsers, setActiveUsers] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch("/api/analytics/realtime");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && typeof data.activeUsers === "number") setActiveUsers(data.activeUsers);
      } catch {
        // leave last known value on a transient failure
      }
    }

    poll();
    const interval = setInterval(poll, 30_000); // 30s — well under GA4 Realtime API quota
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return <StatBadge3D value={activeUsers === null ? "—" : String(activeUsers)} label="On site right now" />;
}
