"use client";

import type { FeedbackSummaryData } from "@/lib/db/lead-feedback";
import { MessageSquareCheck, CheckCircle2, AlertCircle, Users } from "lucide-react";

interface LeadFeedbackSummaryCardProps {
  summary: FeedbackSummaryData;
}

export function LeadFeedbackSummaryCard({ summary }: LeadFeedbackSummaryCardProps) {
  const getOutcomeBadgeStyle = (outcome: string) => {
    if (outcome === "Joined") {
      return "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border-emerald-500/30";
    }
    if (outcome === "Not interested") {
      return "bg-rose-500/15 text-rose-700 dark:text-rose-400 border-rose-500/30";
    }
    return "bg-[var(--dash-bg)] text-[var(--dash-text-muted)] border-[var(--dash-border)]";
  };

  const hasData = summary.totalUpdates > 0;

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 shadow-xs">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2 border-b border-[var(--dash-border)] pb-4">
        <div>
          <h2 className="flex items-center gap-2 text-base font-semibold text-[var(--dash-text)]">
            <MessageSquareCheck className="h-5 w-5 text-[var(--dash-accent)]" />
            Lead feedback (last 30 days)
          </h2>
          <p className="mt-0.5 text-xs text-[var(--dash-text-muted)]">
            Admin only • Lead outcomes, drop-off reasons, and counsellor activity
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[var(--dash-accent-soft)] px-3 py-1 font-mono text-xs font-semibold text-[var(--dash-accent)]">
            {summary.totalUpdates} total {summary.totalUpdates === 1 ? "entry" : "entries"}
          </span>
        </div>
      </div>

      {!hasData ? (
        <div className="py-8 text-center text-sm text-[var(--dash-text-muted)]">
          No feedback entries recorded in the last 30 days yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Column 1: By Outcome */}
          <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--dash-text)]">
              <CheckCircle2 className="h-4 w-4 text-[var(--dash-accent)]" />
              <span>Outcomes</span>
            </div>
            {summary.byOutcome.length === 0 ? (
              <p className="text-xs text-[var(--dash-text-muted)]">None recorded</p>
            ) : (
              <div className="space-y-2">
                {summary.byOutcome.map((item) => (
                  <div
                    key={item.outcome}
                    className="flex items-center justify-between text-xs"
                  >
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-medium ${getOutcomeBadgeStyle(
                        item.outcome,
                      )}`}
                    >
                      {item.outcome}
                    </span>
                    <span className="font-mono font-semibold text-[var(--dash-text)]">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: By Reason */}
          <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--dash-text)]">
              <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <span>Reasons</span>
            </div>
            {summary.byReason.length === 0 ? (
              <p className="text-xs text-[var(--dash-text-muted)]">No reasons recorded</p>
            ) : (
              <div className="space-y-2">
                {summary.byReason.map((item) => (
                  <div
                    key={item.reason}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <span
                      className="truncate text-[var(--dash-text)]"
                      title={item.reason}
                    >
                      {item.reason}
                    </span>
                    <span className="font-mono font-semibold text-[var(--dash-text)] shrink-0">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Column 3: By Staff Member */}
          <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] p-4">
            <div className="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--dash-text)]">
              <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              <span>Staff Activity</span>
            </div>
            {summary.byStaff.length === 0 ? (
              <p className="text-xs text-[var(--dash-text-muted)]">No staff updates</p>
            ) : (
              <div className="space-y-2">
                {summary.byStaff.map((item) => (
                  <div
                    key={item.staffName}
                    className="flex items-center justify-between gap-2 text-xs"
                  >
                    <span
                      className="truncate font-medium text-[var(--dash-text)]"
                      title={item.staffName}
                    >
                      {item.staffName}
                    </span>
                    <span className="font-mono text-xs text-[var(--dash-text-muted)] shrink-0">
                      <strong className="text-[var(--dash-text)] font-semibold">
                        {item.leadCount}
                      </strong>{" "}
                      {item.leadCount === 1 ? "lead" : "leads"} ({item.updateCount}{" "}
                      {item.updateCount === 1 ? "save" : "saves"})
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
