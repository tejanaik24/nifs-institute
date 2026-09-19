"use client";

import { Check, Lightbulb, Share2 } from "lucide-react";
import { useState } from "react";

interface ExecutiveTakeawayProps {
  topCourseName?: string | null;
  topCourseViews?: number | null;
  coursePercent?: number | null;
  topCity?: string | null;
  totalVisitors28d?: number;
  totalCallbacks?: number;
}

export function ExecutiveTakeaway({
  topCourseName,
  topCourseViews,
  coursePercent,
  topCity,
  totalVisitors28d,
  totalCallbacks = 0,
}: ExecutiveTakeawayProps) {
  const [copied, setCopied] = useState(false);
  const hasData = topCourseName != null && topCity != null;

  const plainCourseRatio =
    coursePercent == null
      ? "an unknown share of"
      : coursePercent >= 85
        ? "9 out of 10"
        : coursePercent >= 75
          ? "8 out of 10"
          : `${coursePercent}% of`;

  const copyDailyBriefing = async () => {
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const text = [
      `*🏛️ NIFS INDIA — 5-SECOND EXECUTIVE BRIEFING*`,
      `📅 *Date:* ${today}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `💡 *Key Takeaway:*`,
      hasData
        ? `• *${topCourseName}* is currently your #1 popular course with ${topCourseViews!.toLocaleString()} student views.`
        : "",
      `• *${plainCourseRatio} visitors* are looking for courses and admissions rather than job openings.`,
      hasData ? `• *${topCity}* is your top student feeder hub.` : "",
      `• *${totalCallbacks} student callbacks* are awaiting counselor follow-up.`,
      totalVisitors28d
        ? `• *Total 28-Day Reach:* ${totalVisitors28d.toLocaleString()} student visitors.`
        : "",
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Generated from NIFS Executive Cockpit_`,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Takeaway message */}
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-amber-500 p-2.5 text-white shadow-xs shrink-0">
            <Lightbulb size={22} className="animate-pulse" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                5-Second Executive Summary
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              <span className="text-[11px] text-[var(--dash-text-muted)]">
                Today's Pulse
              </span>
            </div>
            <p className="text-sm sm:text-base font-medium text-[var(--dash-text)] leading-relaxed">
              {hasData ? (
                <>
                  <strong className="text-amber-600 dark:text-amber-400 font-bold">
                    {topCourseName}
                  </strong>{" "}
                  is your #1 in-demand course with{" "}
                  <strong className="text-[var(--dash-text)]">
                    {topCourseViews!.toLocaleString()} student reads
                  </strong>
                  .{" "}
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {plainCourseRatio} visitors
                  </span>{" "}
                  are looking for courses, and{" "}
                  <strong className="text-[var(--dash-text)]">{topCity}</strong>{" "}
                  is your top feeder hub.
                </>
              ) : (
                "Not enough analytics data yet to name a #1 course or top feeder city."
              )}
            </p>
          </div>
        </div>

        {/* 1-Tap WhatsApp Executive Dispatch Button */}
        <div className="shrink-0 flex items-center gap-2">
          <button
            type="button"
            onClick={copyDailyBriefing}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-4 py-2.5 text-xs font-bold shadow-xs transition-all"
          >
            {copied ? (
              <>
                <Check size={15} />
                <span>Copied Briefing!</span>
              </>
            ) : (
              <>
                <Share2 size={15} />
                <span>1-Tap WhatsApp Dispatch</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
