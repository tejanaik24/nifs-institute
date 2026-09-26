"use client";

import { LayoutDashboard, Zap } from "lucide-react";
import { useState } from "react";

interface DashboardViewSwitcherProps {
  birdViewContent: React.ReactNode;
  actionFeedContent: React.ReactNode;
}

export function DashboardViewSwitcher({
  birdViewContent,
  actionFeedContent,
}: DashboardViewSwitcherProps) {
  const [activeTab, setActiveTab] = useState<"bird" | "action">("bird");

  return (
    <div className="space-y-6">
      {/* Top View Switcher Ribbon */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[var(--dash-card)] p-2 rounded-2xl border border-[var(--dash-border)] shadow-xs">
        <div className="flex items-center gap-2">
          {/* Bird's-Eye BI View Button */}
          <button
            type="button"
            onClick={() => setActiveTab("bird")}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "bird"
                ? "bg-indigo-900 text-white shadow-sm ring-2 ring-indigo-500/30"
                : "text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-[var(--dash-bg)]"
            }`}
          >
            <LayoutDashboard size={15} />
            <span>🦅 Bird's-Eye Executive Matrix</span>
          </button>

          {/* Daily Action Feed Button */}
          <button
            type="button"
            onClick={() => setActiveTab("action")}
            className={`flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === "action"
                ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30"
                : "text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-[var(--dash-bg)]"
            }`}
          >
            <Zap size={15} />
            <span>⚡ Zero-Tech Action Feed</span>
          </button>
        </div>

        <div className="text-[11px] font-semibold text-[var(--dash-text-muted)] px-3 text-right hidden md:block">
          {activeTab === "bird"
            ? "All metrics on one screen"
            : "Simplified 3-second action stream for counselors"}
        </div>
      </div>

      {/* Render Active View */}
      <div>{activeTab === "bird" ? birdViewContent : actionFeedContent}</div>
    </div>
  );
}
