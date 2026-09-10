"use client";

import { useState } from "react";
import { BarChart3, TrendingUp, Users } from "lucide-react";
import type { TimeSeriesPoint } from "@/lib/analytics/ga4";

export function AnalyticsTrendChart({ points }: { points?: TimeSeriesPoint[] }) {
  const [metric, setMetric] = useState<"visitors" | "pageviews">("visitors");
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);

  if (!points || points.length === 0) return null;

  const data = points;
  const values = data.map((d) => d[metric]);
  const maxVal = Math.max(...values, 10);
  const minVal = Math.min(...values, 0);

  const width = 800;
  const height = 220;
  const padding = { top: 20, right: 20, bottom: 30, left: 40 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const getX = (i: number) => padding.left + (i / (data.length - 1)) * chartW;
  const getY = (v: number) => padding.top + chartH - ((v - minVal) / (maxVal - minVal || 1)) * chartH;

  const pathPoints = data.map((d, i) => `${getX(i)},${getY(d[metric])}`).join(" ");
  const areaPath = `M ${getX(0)},${getY(data[0][metric])} L ${pathPoints.replace(/ /g, " L ")} L ${getX(data.length - 1)},${padding.top + chartH} L ${getX(0)},${padding.top + chartH} Z`;
  const linePath = `M ${getX(0)},${getY(data[0][metric])} L ${pathPoints.replace(/ /g, " L ")}`;

  const total = values.reduce((a, b) => a + b, 0);
  const avg = Math.round(total / values.length);

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-semibold text-[var(--dash-text)]">Traffic Velocity & Growth (30 Days)</h2>
            <span className="flex items-center gap-0.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-600">
              <TrendingUp size={11} /> Live Trend
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)]">
            Total {metric === "visitors" ? "Visitors" : "Pageviews"}: <strong className="text-[var(--dash-text)]">{total.toLocaleString()}</strong> (avg {avg}/day)
          </p>
        </div>

        {/* Metric Switcher */}
        <div className="flex rounded-lg border border-[var(--dash-border)] bg-black/5 p-0.5 text-xs">
          <button
            onClick={() => setMetric("visitors")}
            className={`flex items-center gap-1 rounded-md px-3 py-1 font-medium transition-all cursor-pointer ${
              metric === "visitors"
                ? "bg-white text-[var(--dash-text)] shadow-xs font-semibold"
                : "text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
            }`}
          >
            <Users size={12} /> Visitors
          </button>
          <button
            onClick={() => setMetric("pageviews")}
            className={`flex items-center gap-1 rounded-md px-3 py-1 font-medium transition-all cursor-pointer ${
              metric === "pageviews"
                ? "bg-white text-[var(--dash-text)] shadow-xs font-semibold"
                : "text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
            }`}
          >
            <BarChart3 size={12} /> Pageviews
          </button>
        </div>
      </div>

      {/* SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto overflow-visible">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--dash-accent)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="var(--dash-accent)" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
            const y = padding.top + chartH * pct;
            const val = Math.round(maxVal - pct * (maxVal - minVal));
            return (
              <g key={pct}>
                <line x1={padding.left} y1={y} x2={width - padding.right} y2={y} stroke="var(--dash-border)" strokeDasharray="3 3" opacity="0.6" />
                <text x={padding.left - 8} y={y + 3} textAnchor="end" fontSize="9" fill="var(--dash-text-muted)" fontFamily="monospace">
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area & Line */}
          <path d={areaPath} fill="url(#chartGradient)" />
          <path d={linePath} fill="none" stroke="var(--dash-accent)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Data Points */}
          {data.map((d, i) => {
            const cx = getX(i);
            const cy = getY(d[metric]);
            const isHovered = hoverIdx === i;
            return (
              <g key={d.date} onMouseEnter={() => setHoverIdx(i)} onMouseLeave={() => setHoverIdx(null)} className="cursor-pointer">
                <circle cx={cx} cy={cy} r={isHovered ? 6 : 3} fill={isHovered ? "var(--dash-accent)" : "#fff"} stroke="var(--dash-accent)" strokeWidth="2" />
                {/* Date labels on bottom for every 4th point */}
                {i % 4 === 0 && (
                  <text x={cx} y={height - 8} textAnchor="middle" fontSize="9" fill="var(--dash-text-muted)" fontFamily="monospace">
                    {d.date}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Hover Tooltip */}
        {hoverIdx !== null && data[hoverIdx] && (
          <div
            className="pointer-events-none absolute top-2 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-2 shadow-lg text-xs"
            style={{ left: `${(hoverIdx / (data.length - 1)) * 80 + 5}%` }}
          >
            <div className="font-mono text-[10px] text-[var(--dash-text-muted)]">{data[hoverIdx].date}</div>
            <div className="font-bold text-[var(--dash-text)]">
              {data[hoverIdx][metric].toLocaleString()} {metric}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
