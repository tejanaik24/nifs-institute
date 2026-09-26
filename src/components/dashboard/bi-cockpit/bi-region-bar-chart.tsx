"use client";

import { BarChart2 } from "lucide-react";
import { useState } from "react";

export type RegionBarData = {
  label: string;
  value: number;
  sublabel?: string;
  isHub?: boolean;
};

interface BIRegionBarChartProps {
  data: RegionBarData[];
  title?: string;
  height?: number;
}

export function BIRegionBarChart({
  data,
  title = "Website Visitors by City",
  height = 280,
}: BIRegionBarChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const maxValue = Math.max(...data.map((d) => d.value), 1);

  const formatK = (n: number) => {
    if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
    return n.toLocaleString();
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-950/80 dark:bg-indigo-950 px-4 py-3 border-b border-indigo-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BarChart2 size={16} className="text-amber-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            {title}
          </h3>
        </div>
        <span className="text-[10px] font-bold text-amber-300 bg-amber-900/40 px-2 py-0.5 rounded border border-amber-700/40">
          Regional Volume
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="p-4 flex-1 flex flex-col justify-end">
        {data.length === 0 ? (
          <div className="py-16 text-center text-xs text-[var(--dash-text-muted)]">
            No regional data available
          </div>
        ) : (
          <div className="flex items-end justify-between gap-1.5 sm:gap-2 h-[220px] pt-6 pb-2 px-1 border-b border-[var(--dash-border)]">
            {data.slice(0, 8).map((item, idx) => {
              const heightPct = Math.max(
                Math.round((item.value / maxValue) * 100),
                8,
              );
              const isHovered = hoveredIdx === idx;

              return (
                <div
                  key={item.label}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                >
                  {/* Floating Tooltip */}
                  {isHovered && (
                    <div className="absolute -top-10 z-20 whitespace-nowrap rounded-lg bg-gray-900 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg border border-gray-700 pointer-events-none animate-in fade-in zoom-in-95 duration-150">
                      <div>{item.label}</div>
                      <div className="text-amber-400 font-mono">
                        {item.value.toLocaleString()} views
                      </div>
                    </div>
                  )}

                  {/* Value on Top of Column (PowerBI Style) */}
                  <span
                    className={`font-mono text-[10px] font-extrabold mb-1.5 transition-colors ${
                      isHovered
                        ? "text-amber-500 scale-105"
                        : "text-[var(--dash-text)]"
                    }`}
                  >
                    {formatK(item.value)}
                  </span>

                  {/* Vertical Column Bar (Amber / Gold PowerBI Aesthetic) */}
                  <div className="w-full max-w-[42px] bg-[var(--dash-bg)] rounded-t-sm overflow-hidden flex items-end h-[170px]">
                    <div
                      className={`w-full rounded-t-sm transition-all duration-500 ${
                        isHovered
                          ? "bg-amber-400 shadow-md"
                          : "bg-gradient-to-t from-amber-500 to-amber-400"
                      }`}
                      style={{ height: `${heightPct}%` }}
                    />
                  </div>

                  {/* X-Axis Label */}
                  <div className="mt-2 text-center w-full">
                    <span
                      className="block truncate text-[10px] font-bold text-[var(--dash-text)] max-w-[55px] mx-auto"
                      title={item.label}
                    >
                      {item.label}
                    </span>
                    {item.sublabel && (
                      <span className="block text-[8px] text-[var(--dash-text-muted)] truncate max-w-[55px] mx-auto">
                        {item.sublabel}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer info */}
        <div className="mt-2.5 flex items-center justify-between text-[10px] text-[var(--dash-text-muted)] px-1">
          <span>Visitor location (Google Analytics, 28 days)</span>
          <span className="font-semibold text-amber-600 dark:text-amber-400">
            Ranked by visitors
          </span>
        </div>
      </div>
    </div>
  );
}
