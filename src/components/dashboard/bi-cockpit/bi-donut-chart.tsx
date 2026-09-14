"use client";

import { PieChart } from "lucide-react";
import { useState } from "react";

export type DonutSlice = {
  label: string;
  value: number;
  color: string;
  sublabel?: string;
};

interface BIDonutChartProps {
  title: string;
  subtitle?: string;
  slices: DonutSlice[];
  totalLabel?: string;
}

export function BIDonutChart({
  title,
  subtitle,
  slices,
  totalLabel = "Total",
}: BIDonutChartProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const totalValue = slices.reduce((acc, s) => acc + s.value, 0);

  // Compute SVG arcs for donut
  let cumulativePercent = 0;
  const segments = slices.map((slice) => {
    const percent = totalValue > 0 ? (slice.value / totalValue) * 100 : 0;
    const startAngle = (cumulativePercent / 100) * 360;
    cumulativePercent += percent;
    const endAngle = (cumulativePercent / 100) * 360;

    return {
      ...slice,
      percent: Number(percent.toFixed(1)),
      startAngle,
      endAngle,
    };
  });

  // Helper to compute SVG arc path
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    radius: number,
    angleInDegrees: number,
  ) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians),
    };
  };

  const describeArc = (
    x: number,
    y: number,
    radius: number,
    startAngle: number,
    endAngle: number,
  ) => {
    const adjustedEndAngle = endAngle - startAngle >= 360 ? 359.999 : endAngle;
    const start = polarToCartesian(x, y, radius, adjustedEndAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = adjustedEndAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] shadow-xs overflow-hidden">
      {/* Header */}
      <div className="bg-indigo-950/80 dark:bg-indigo-950 px-4 py-3 border-b border-indigo-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <PieChart size={16} className="text-purple-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            {title}
          </h3>
        </div>
        {subtitle && (
          <span className="text-[10px] font-bold text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded border border-purple-700/40">
            {subtitle}
          </span>
        )}
      </div>

      {/* Donut & Legend Container */}
      <div className="p-4 flex-1 flex flex-col sm:flex-row items-center justify-center gap-4">
        {/* SVG Donut Circle */}
        <div className="relative flex items-center justify-center w-[160px] h-[160px] shrink-0">
          <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r="54"
              fill="none"
              stroke="var(--dash-bg)"
              strokeWidth="24"
            />

            {/* Slices */}
            {segments.map((seg, i) => {
              if (seg.percent <= 0) return null;
              const isHovered = hoveredIndex === i;

              // Stroke dash calculation for clean donut
              const circumference = 2 * Math.PI * 54;
              const dashLength = (seg.percent / 100) * circumference;
              const gapLength = circumference - dashLength;
              const offset = -((seg.startAngle / 360) * circumference);

              return (
                <circle
                  key={seg.label}
                  cx="80"
                  cy="80"
                  r="54"
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? 28 : 24}
                  strokeDasharray={`${dashLength} ${gapLength}`}
                  strokeDashoffset={offset}
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              );
            })}
          </svg>

          {/* Donut Center Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            {hoveredIndex !== null && segments[hoveredIndex] ? (
              <>
                <span className="font-mono text-sm font-black text-[var(--dash-text)]">
                  {segments[hoveredIndex].percent}%
                </span>
                <span className="text-[9px] font-bold text-[var(--dash-text-muted)] truncate max-w-[80px]">
                  {segments[hoveredIndex].label}
                </span>
              </>
            ) : (
              <>
                <span className="font-mono text-xs font-black text-[var(--dash-text)]">
                  {totalValue.toLocaleString()}
                </span>
                <span className="text-[9px] font-semibold text-[var(--dash-text-muted)]">
                  {totalLabel}
                </span>
              </>
            )}
          </div>
        </div>

        {/* Legend List */}
        <div className="flex-1 space-y-2 w-full">
          {segments.map((seg, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={seg.label}
                className={`flex items-center justify-between text-xs p-1.5 rounded-lg transition-colors cursor-pointer ${
                  isHovered ? "bg-[var(--dash-bg)] font-bold" : ""
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="flex items-center gap-2 min-w-0 pr-2">
                  <span
                    className="h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: seg.color }}
                  />
                  <span className="truncate text-xs text-[var(--dash-text)]">
                    {seg.label}
                  </span>
                </div>
                <div className="text-right shrink-0 flex items-center gap-1.5">
                  <span className="font-mono font-bold text-[var(--dash-text)]">
                    {seg.value.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--dash-text-muted)]">
                    ({seg.percent}%)
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
