"use client";

import type { HourlyTrafficMetric } from "@/lib/analytics/ga4";
import { PhoneCall, Zap } from "lucide-react";

interface PeakHoursHeatmapProps {
  hours: HourlyTrafficMetric[];
}

export function PeakHoursHeatmap({ hours }: PeakHoursHeatmapProps) {
  const maxViews = Math.max(...hours.map((h) => h.views), 1);
  const totalDayViews = hours.reduce((acc, h) => acc + h.views, 0);

  // Busiest hours = actual top 3 traffic hours from the data (isPeakWindow is
  // computed from real numbers, not a fixed assumption). This describes
  // website traffic only — it is not calling advice, since there's no lead
  // outcome data yet to say which hours convert best.
  const peakHours = hours.filter((h) => h.isPeakWindow).sort((a, b) => a.hour - b.hour);
  const peakWindowViews = peakHours.reduce((acc, h) => acc + h.views, 0);
  const peakPercent =
    totalDayViews > 0 ? Math.round((peakWindowViews / totalDayViews) * 100) : 0;
  const peakLabel = peakHours.map((h) => h.label).join(", ");

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[var(--dash-text)]">
              Website Traffic by Hour
            </h3>
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
              Live Hourly Traffic
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)]">
            Hourly distribution of site visits over the last 28 days. Traffic
            pattern only — not calling advice.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          <PhoneCall size={13} />
          <span>
            Busiest hours: {peakLabel || "—"} ({peakPercent}% of traffic)
          </span>
        </div>
      </div>

      {/* 24-Hour Bar Chart */}
      <div className="mt-6">
        <div className="grid grid-cols-12 sm:grid-cols-24 gap-1 items-end h-36 pt-4 border-b border-[var(--dash-border)] pb-2">
          {hours.map((h) => {
            const heightPercent = Math.max(
              8,
              Math.round((h.views / maxViews) * 100),
            );
            const isPrime = h.isPeakWindow;
            const isEveningSpike = h.hour >= 20 && h.hour <= 22;

            return (
              <div
                key={h.hour}
                className="group relative flex flex-col items-center justify-end h-full"
              >
                {/* Tooltip on hover */}
                <div className="pointer-events-none absolute -top-12 z-20 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-[var(--dash-text)] px-2 py-1 text-[10px] font-semibold text-[var(--dash-bg)] shadow-md group-hover:block left-1/2">
                  <div className="text-center">{h.label}</div>
                  <div className="text-center font-normal opacity-90">
                    {h.views} views · {h.users} users
                  </div>
                </div>

                {/* Bar */}
                <div
                  className={`w-full rounded-t-sm transition-all duration-200 group-hover:opacity-100 ${
                    isPrime
                      ? "bg-amber-500 opacity-90 group-hover:bg-amber-400"
                      : isEveningSpike
                        ? "bg-purple-500 opacity-80 group-hover:bg-purple-400"
                        : "bg-[var(--dash-border)] opacity-60 group-hover:bg-[var(--dash-text-muted)]"
                  }`}
                  style={{ height: `${heightPercent}%` }}
                />

                {/* Hour Label */}
                <span className="mt-1 text-[9px] text-[var(--dash-text-muted)] group-hover:text-[var(--dash-text)]">
                  {h.hour % 3 === 0 ? h.label.replace(" ", "") : ""}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend & Advice */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-amber-500" />
              <span className="text-[var(--dash-text-muted)]">
                Top 3 Busiest Hours ({peakLabel || "—"})
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-3 w-3 rounded-xs bg-purple-500" />
              <span className="text-[var(--dash-text-muted)]">
                Evening Traffic (8 PM – 10 PM)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-[var(--dash-text-muted)]">
            <Zap size={12} className="text-amber-500" />
            <span>
              Not yet linked to call outcomes — traffic pattern only.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
