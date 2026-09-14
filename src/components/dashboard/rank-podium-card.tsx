"use client";

import { Flame, MapPin } from "lucide-react";
import Link from "next/link";

export type RankedItem = {
  name: string;
  count: number;
  subtitle?: string;
  badge?: string;
  sharePercent?: number;
};

interface RankPodiumCardProps {
  title: string;
  subtitle: string;
  iconType: "course" | "city";
  items: RankedItem[];
  viewAllHref?: string;
  unitLabel?: string;
}

const RANK_STYLES = [
  {
    badge: "bg-amber-500 text-white font-black shadow-xs",
    label: "🥇 #1",
    barColor: "bg-gradient-to-r from-amber-500 to-amber-400",
    textHighlight: "text-amber-600 dark:text-amber-400 font-bold",
  },
  {
    badge: "bg-slate-400 text-white font-bold shadow-xs",
    label: "🥈 #2",
    barColor: "bg-gradient-to-r from-slate-400 to-slate-300",
    textHighlight: "text-[var(--dash-text)] font-semibold",
  },
  {
    badge: "bg-amber-700/80 text-white font-bold shadow-xs",
    label: "🥉 #3",
    barColor: "bg-gradient-to-r from-amber-700/70 to-amber-600/70",
    textHighlight: "text-[var(--dash-text)] font-medium",
  },
  {
    badge:
      "bg-[var(--dash-border)] text-[var(--dash-text-muted)] font-semibold",
    label: "#4",
    barColor: "bg-[var(--dash-border)]",
    textHighlight: "text-[var(--dash-text)]",
  },
  {
    badge:
      "bg-[var(--dash-border)] text-[var(--dash-text-muted)] font-semibold",
    label: "#5",
    barColor: "bg-[var(--dash-border)]",
    textHighlight: "text-[var(--dash-text)]",
  },
];

export function RankPodiumCard({
  title,
  subtitle,
  iconType,
  items,
  viewAllHref,
  unitLabel = "views",
}: RankPodiumCardProps) {
  const maxCount = Math.max(...items.map((i) => i.count), 1);

  return (
    <div className="rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--dash-border)]">
          <div className="flex items-center gap-2.5">
            <div
              className={`rounded-xl p-2.5 ${
                iconType === "course"
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                  : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
              }`}
            >
              {iconType === "course" ? (
                <Flame size={18} />
              ) : (
                <MapPin size={18} />
              )}
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--dash-text)]">
                {title}
              </h3>
              <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>

          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-xs font-semibold text-[var(--dash-accent)] hover:underline"
            >
              Explore All →
            </Link>
          )}
        </div>

        {/* 1st, 2nd, 3rd Bars */}
        <div className="mt-5 space-y-4">
          {items.length === 0 ? (
            <p className="text-xs text-[var(--dash-text-muted)] py-4 text-center">
              No ranked data available.
            </p>
          ) : (
            items.slice(0, 5).map((item, idx) => {
              const rank = RANK_STYLES[idx] || RANK_STYLES[3];
              const pctOfMax = Math.round((item.count / maxCount) * 100);

              return (
                <div key={item.name} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 min-w-0 pr-2">
                      <span
                        className={`inline-flex items-center justify-center rounded-lg px-2 py-0.5 text-[11px] shrink-0 ${rank.badge}`}
                      >
                        {rank.label}
                      </span>
                      <span
                        className={`truncate text-sm ${rank.textHighlight}`}
                      >
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className="rounded-full bg-emerald-500/10 px-2 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 shrink-0">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-sm text-[var(--dash-text)]">
                        {item.count.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-[var(--dash-text-muted)] ml-1">
                        {unitLabel}
                      </span>
                    </div>
                  </div>

                  {/* Relative Visual Bar */}
                  <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--dash-bg)] border border-[var(--dash-border)]">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${rank.barColor}`}
                      style={{ width: `${Math.max(pctOfMax, 8)}%` }}
                    />
                  </div>

                  {item.subtitle && (
                    <div className="text-[10px] text-[var(--dash-text-muted)] flex items-center justify-between px-0.5">
                      <span>{item.subtitle}</span>
                      {item.sharePercent !== undefined && (
                        <span>{item.sharePercent}% of total</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
