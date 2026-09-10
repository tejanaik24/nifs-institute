"use client";

import { Briefcase, GraduationCap, TrendingUp, Users } from "lucide-react";
import type { IntentBreakdown } from "@/lib/analytics/ga4";

export function IntentSplitCard({ intent }: { intent?: IntentBreakdown }) {
  if (!intent) return null;

  const totalTargeted = (intent.courseViews + intent.jobViews) || 1;
  const coursePct = Math.round((intent.courseViews / totalTargeted) * 100);
  const jobPct = Math.round((intent.jobViews / totalTargeted) * 100);

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[var(--dash-text)]">Course vs. Job Visitor Intent</h2>
          <p className="text-xs text-[var(--dash-text-muted)]">
            How many visitors are exploring admissions vs. seeking job placement drives (Last 28 Days)
          </p>
        </div>
        <span className="rounded bg-[var(--dash-accent-soft)] px-2.5 py-1 font-mono text-xs font-bold text-[var(--dash-accent)]">
          {((intent.courseViews + intent.jobViews)).toLocaleString()} Targeted Visits
        </span>
      </div>

      {/* Visual Intent Split Progress Bar */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="flex items-center gap-1.5 text-blue-600">
            <GraduationCap size={15} /> 🎓 Course & Admissions ({coursePct}%)
          </span>
          <span className="flex items-center gap-1.5 text-amber-600">
            💼 Jobs & Placements ({jobPct}%) <Briefcase size={15} />
          </span>
        </div>
        <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-black/5 p-0.5">
          <div
            className="h-full rounded-l-full bg-blue-600 transition-all duration-500"
            style={{ width: `${coursePct}%` }}
            title={`Course Intent: ${intent.courseViews.toLocaleString()} views`}
          />
          <div
            className="h-full rounded-r-full bg-amber-500 transition-all duration-500"
            style={{ width: `${jobPct}%` }}
            title={`Job Intent: ${intent.jobViews.toLocaleString()} views`}
          />
        </div>
        <div className="flex items-center justify-between text-[11px] text-[var(--dash-text-muted)]">
          <span>{intent.courseViews.toLocaleString()} views • {intent.courseUsers.toLocaleString()} unique users</span>
          <span>{intent.jobViews.toLocaleString()} views • {intent.jobUsers.toLocaleString()} unique users</span>
        </div>
      </div>

      {/* Side-by-side Top Pages for Each Intent */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 pt-2 border-t border-[var(--dash-border)]">
        {/* Course Pages */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--dash-text)]">
            <span className="flex items-center gap-1 text-blue-600">
              <GraduationCap size={14} /> Top Course Inquiries
            </span>
            <span className="text-[11px] text-[var(--dash-text-muted)] font-normal">Views</span>
          </div>
          <div className="space-y-1.5">
            {intent.topCoursePages.map((page, i) => (
              <div
                key={page.path}
                className="flex items-center justify-between rounded-lg bg-blue-500/[0.04] p-2 text-xs transition-colors hover:bg-blue-500/[0.08]"
              >
                <span className="truncate max-w-[200px] font-mono text-[var(--dash-text)]">
                  <span className="text-[var(--dash-text-muted)] mr-1.5 font-normal">{i + 1}.</span>
                  {page.path}
                </span>
                <span className="font-mono font-semibold text-blue-600">
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Job Pages */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-xs font-semibold text-[var(--dash-text)]">
            <span className="flex items-center gap-1 text-amber-600">
              <Briefcase size={14} /> Top Placement & Job Pages
            </span>
            <span className="text-[11px] text-[var(--dash-text-muted)] font-normal">Views</span>
          </div>
          <div className="space-y-1.5">
            {intent.topJobPages.map((page, i) => (
              <div
                key={page.path}
                className="flex items-center justify-between rounded-lg bg-amber-500/[0.04] p-2 text-xs transition-colors hover:bg-amber-500/[0.08]"
              >
                <span className="truncate max-w-[200px] font-mono text-[var(--dash-text)]">
                  <span className="text-[var(--dash-text-muted)] mr-1.5 font-normal">{i + 1}.</span>
                  {page.path}
                </span>
                <span className="font-mono font-semibold text-amber-600">
                  {page.views.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
