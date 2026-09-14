"use client";

import type { CourseDemandMetric } from "@/lib/analytics/ga4";
import { GraduationCap } from "lucide-react";

interface BIMetricsTableProps {
  courses: CourseDemandMetric[];
}

export function BIMetricsTable({ courses }: BIMetricsTableProps) {
  const maxViews = Math.max(...courses.map((c) => c.views), 1);
  const totalViews = courses.reduce((acc, c) => acc + c.views, 0);
  const totalUsers = courses.reduce((acc, c) => acc + c.users, 0);
  const avgReadOverall =
    courses.length > 0
      ? Math.round(
          courses.reduce((acc, c) => acc + c.avgTimeSeconds, 0) /
            courses.length,
        )
      : 0;

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] shadow-xs overflow-hidden">
      {/* Table Header title */}
      <div className="bg-indigo-950/80 dark:bg-indigo-950 px-4 py-3 border-b border-indigo-900/50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GraduationCap size={16} className="text-cyan-400" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            Metrics by Course Demand
          </h3>
        </div>
        <span className="text-[10px] font-bold text-cyan-300 bg-cyan-900/40 px-2 py-0.5 rounded border border-cyan-700/40">
          {courses.length} Programs
        </span>
      </div>

      {/* Table Scroll Area */}
      <div className="overflow-x-auto overflow-y-auto max-h-[320px] flex-1">
        <table className="w-full text-left text-xs border-collapse">
          {/* Sub Header */}
          <thead className="bg-indigo-900/30 text-[10px] font-black uppercase tracking-wider text-[var(--dash-text-muted)] sticky top-0 backdrop-blur-xs z-10 border-b border-[var(--dash-border)]">
            <tr>
              <th className="py-2.5 px-3">Course Name</th>
              <th className="py-2.5 px-2">Tier</th>
              <th className="py-2.5 px-3 min-w-[140px]">Student Views</th>
              <th className="py-2.5 px-3 text-right">Students</th>
              <th className="py-2.5 px-3 text-right">Avg Read</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {courses.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-xs text-[var(--dash-text-muted)]"
                >
                  No course data matching current filters
                </td>
              </tr>
            ) : (
              courses.map((c) => {
                const barWidth = Math.max(
                  Math.round((c.views / maxViews) * 100),
                  12,
                );

                return (
                  <tr
                    key={c.path}
                    className="hover:bg-indigo-500/5 transition-colors group"
                  >
                    <td className="py-2.5 px-3 font-semibold text-[var(--dash-text)] text-xs">
                      {c.name}
                    </td>
                    <td className="py-2.5 px-2">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[var(--dash-bg)] border border-[var(--dash-border)] text-[var(--dash-text-muted)]">
                        {c.category}
                      </span>
                    </td>
                    {/* In-Cell Progress Bar (Cyan PowerBI Style) */}
                    <td className="py-2.5 px-3">
                      <div className="relative h-5 w-full bg-[var(--dash-bg)] rounded overflow-hidden border border-[var(--dash-border)]">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-600 to-sky-400 rounded-r flex items-center px-1.5 transition-all duration-500"
                          style={{ width: `${barWidth}%` }}
                        >
                          <span className="font-mono text-[10px] font-bold text-white drop-shadow-xs truncate">
                            {c.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono font-semibold text-[var(--dash-text)] text-xs">
                      {c.users.toLocaleString()}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-[11px] text-[var(--dash-text-muted)]">
                      {c.avgTimeSeconds}s
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Total Row (matching reference bottom total line) */}
      <div className="bg-indigo-950 text-white px-3 py-2.5 border-t border-indigo-900 flex items-center justify-between text-xs font-bold shrink-0">
        <span className="uppercase tracking-wider text-[10px] text-cyan-300">
          Total Summary
        </span>
        <div className="flex items-center gap-6 font-mono text-xs">
          <span className="text-cyan-300 font-bold">
            {totalViews.toLocaleString()} views
          </span>
          <span className="text-white">
            {totalUsers.toLocaleString()} students
          </span>
          <span className="text-indigo-200 text-[11px]">
            {avgReadOverall}s avg
          </span>
        </div>
      </div>
    </div>
  );
}
