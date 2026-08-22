"use client";

import { useState } from "react";

const TAGS: { label: string; href: string; active?: boolean }[] = [
  { label: "Government Fire College", href: "/courses" },
  { label: "Best Fire & Safety Institute", href: "/courses" },
  { label: "Top Institute Of Fire & Safety Management", href: "/courses" },
  { label: "Fire And Industrial Safety Jobs", href: "/admissions", active: true },
  { label: "Top Rank College Of Fire And Safety", href: "/courses" },
  { label: "Fire And Safety College Near Me", href: "/centers" },
  { label: "Industrial Safety Course Near Me", href: "/courses" },
  { label: "Best Fire And Safety Institute Near Me", href: "/courses" },
  { label: "Fire Engineering Course Near Me", href: "/courses" },
  { label: "Most Trusted Fire And Safety Institute", href: "/about" },
  { label: "Top 10 Fire And Safety Institute", href: "/courses" },
  { label: "Government Approved Fire And Safety Course", href: "/courses" },
  { label: "No. 1 Fire And Safety College In India", href: "/courses" },
  { label: "Best Fire & Safety College In Maharashtra", href: "/courses" },
  { label: "Best Fire And Safety Institute With Placement", href: "/placements" },
  { label: "Institute Of Fire Engineering", href: "/courses" },
  { label: "Jobs In Fire And Safety", href: "/placements" },
  { label: "Fire And Safety Course Government Colleges", href: "/courses" },
  { label: "Job In Industrial Safety", href: "/placements" },
  { label: "Nagpur Fire Service College", href: "/centers" },
  { label: "National Fire College", href: "/courses" },
  { label: "Industrial Safety Course", href: "/courses" },
  { label: "Admission In Fire And Safety Engineering", href: "/admissions" },
  { label: "Fire And Safety Course Government College List", href: "/courses" },
  { label: "Career In Fire And Safety", href: "/placements" },
  { label: "Job Oriented Course", href: "/courses" },
  { label: "Best Institute For Industrial Safety In India", href: "/courses" },
  { label: "National Institute Of Fire And Safety Engineering", href: "/courses" },
  { label: "100% Placement Fire And Safety Course", href: "/placements" },
  { label: "Fire And Safety Course With Job Guarantee", href: "/admissions" },
  { label: "Best Safety Officer Course In India", href: "/courses" },
  { label: "Fire And Safety Course Admission", href: "/admissions" },
  { label: "Fire And Safety Institute Admission", href: "/admissions" },
  { label: "Diploma In Fire And Safety Admission", href: "/admissions" },
  { label: "Fire And Safety Engineering Admission", href: "/admissions" },
  { label: "Industrial Safety Course Admission", href: "/admissions" },
  { label: "Safety Management Course Admission", href: "/admissions" },
  { label: "Fire And Safety Online Admission", href: "/admissions" },
  { label: "Fire And Safety Course Apply Online", href: "/admissions" },
  { label: "Fire And Safety Course", href: "/courses" },
  { label: "Diploma In Fire And Safety", href: "/courses" },
  { label: "Advanced Diploma Fire And Safety", href: "/courses" },
  { label: "Fire And Industrial Safety Course", href: "/courses" },
  { label: "Fire Safety Officer Course", href: "/courses" },
  { label: "Industrial Safety Management Course", href: "/courses" },
  { label: "Fire And Safety Jobs", href: "/placements" },
  { label: "Fire And Safety Salary", href: "/placements" },
  { label: "Fire Safety Officer Salary In India", href: "/placements" },
  { label: "Fire And Safety Government Jobs", href: "/placements" },
  { label: "Gulf Jobs For Fire And Safety", href: "/placements" },
  { label: "Safety Officer Course For Abroad Jobs", href: "/placements" },
  { label: "Best Fire And Safety Course For Job", href: "/placements" },
  { label: "Fire And Safety Scope In India", href: "/courses" },
];

export default function HomePopularSearches() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="popular-searches" className="w-full bg-white py-[60px] max-sm:py-[40px] px-[5%]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="font-sans text-[14px] font-black uppercase tracking-[0.25em] text-nifs-red mb-6">Popular Searches</h2>

        {/*
          All 54 tags stay in the DOM at all times — SEO crawlability preserved.
          Mobile: overflow-hidden + max-h transition collapses to ~2 tag rows (~96px).
          Desktop (sm+): max-h-none and overflow-visible — identical to before.
          The Tailwind classes for mobile are real static classes; no dynamic generation.
        */}
        <div
          className={[
            "flex flex-wrap gap-[10px]",
            // Desktop: unrestricted
            "sm:max-h-none sm:overflow-visible",
            // Mobile: clamp height; animate open/close
            "max-sm:overflow-hidden max-sm:transition-[max-height] max-sm:duration-500 max-sm:ease-in-out",
            expanded ? "max-sm:max-h-[9999px]" : "max-sm:max-h-[96px]",
          ].join(" ")}
        >
          {TAGS.map((tag) => (
            <a key={tag.label} href={tag.href} className={tag.active ? "pop-tag pop-tag--active" : "pop-tag"}>
              {tag.label}
            </a>
          ))}
        </div>

        {/* Toggle button — rendered only on mobile (sm:hidden) */}
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="sm:hidden mt-4 text-[13px] font-sans font-semibold text-nifs-red underline underline-offset-2 cursor-pointer bg-transparent border-none p-0"
          aria-expanded={expanded}
        >
          {expanded ? "Show less" : "Show all searches"}
        </button>
      </div>
    </section>
  );
}
