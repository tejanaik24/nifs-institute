"use client";

import { Check, Printer, Share2 } from "lucide-react";
import { useState } from "react";

interface ReportExportButtonProps {
  stats: {
    activeVisitors28d?: number;
    courseIntentPercent?: number;
    jobIntentPercent?: number;
    topCourse?: string;
    totalSearchClicks?: number;
    totalBotHits?: number;
    topCity?: string;
  };
}

const fmt = (n?: number) =>
  typeof n === "number" ? n.toLocaleString() : "Data unavailable";

export function ReportExportButton({ stats }: ReportExportButtonProps) {
  const [copied, setCopied] = useState(false);

  const generateReportText = () => {
    const today = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

    const lines = [
      "*📊 NIFS INDIA — DASHBOARD SNAPSHOT*",
      `📅 *Date:* ${today}`,
      "━━━━━━━━━━━━━━━━━━━━",
      `👥 *Active Visitors (28 Days):* ${fmt(stats.activeVisitors28d)}`,
    ];

    if (
      typeof stats.courseIntentPercent === "number" &&
      typeof stats.jobIntentPercent === "number"
    ) {
      lines.push("🎯 *Traffic Split:*");
      lines.push(`  • 🎓 Course & Admissions: *${stats.courseIntentPercent}%*`);
      lines.push(`  • 💼 Job & Placement: *${stats.jobIntentPercent}%*`);
    }

    if (stats.topCourse) lines.push(`🔥 *Top Course:* ${stats.topCourse}`);
    if (stats.topCity) lines.push(`🏛️ *Top City:* ${stats.topCity}`);
    lines.push(
      `🔍 *Google Search Clicks:* ${fmt(stats.totalSearchClicks)}`,
      `🤖 *AI Bot Visits (28d):* ${fmt(stats.totalBotHits)}`,
      "━━━━━━━━━━━━━━━━━━━━",
      "_Generated automatically from the NIFS dashboard._",
    );

    return lines.join("\n");
  };

  const handleCopyWhatsApp = async () => {
    try {
      const text = generateReportText();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // fallback
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={handleCopyWhatsApp}
        className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 transition-colors hover:bg-emerald-500/20"
      >
        {copied ? (
          <>
            <Check
              size={13}
              className="text-emerald-600 dark:text-emerald-400"
            />
            <span>Copied for WhatsApp!</span>
          </>
        ) : (
          <>
            <Share2 size={13} />
            <span>WhatsApp Flash Report</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-card)] px-3 py-1.5 text-xs font-semibold text-[var(--dash-text)] transition-colors hover:bg-[var(--dash-bg)]"
      >
        <Printer size={13} className="text-[var(--dash-text-muted)]" />
        <span>Print / PDF</span>
      </button>
    </div>
  );
}