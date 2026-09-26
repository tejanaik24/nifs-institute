"use client";

import { ArrowDown, CheckCircle2, PhoneCall, Search, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// Truthful funnel: every step is a separately-measured metric (different
// sources, different periods). Percentages between steps are only shown when
// both values exist; the funnel never invents numbers or implies a
// Google→callback conversion rate that the data cannot support.
export function ConversionFunnel({
  searchImpressions,
  visitors,
  courseViews,
  enquiries,
  whatsappClicks,
  phoneClicks,
}: {
  searchImpressions?: number;
  visitors?: number;
  courseViews?: number;
  enquiries?: number;
  whatsappClicks?: number;
  phoneClicks?: number;
}) {
  const steps: {
    label: string;
    measure?: number;
    unit: string;
    sub: string;
    icon: LucideIcon;
    color: string;
  }[] = [
    {
      label: "1. Google Search Impressions",
      measure: searchImpressions,
      unit: "shown on Google search results",
      sub: "Search Console (28 days)",
      icon: Search,
      color: "bg-blue-500",
    },
    {
      label: "2. Course & Placement Page Visitors",
      measure: visitors,
      unit: "unique users",
      sub: "Course + placement pages (28 days)",
      icon: Users,
      color: "bg-indigo-500",
    },
    {
      label: "3. Course & Placement Page Views",
      measure: courseViews,
      unit: "views",
      sub: "Admissions, diplomas, placements (28 days)",
      icon: Search,
      color: "bg-purple-500",
    },
    {
      label: "4. Website Enquiries (unique candidates)",
      measure: enquiries,
      unit: "candidates",
      sub: "Enquiry form, since 10 Sep (repeat submissions counted once)",
      icon: PhoneCall,
      color: "bg-amber-500",
    },
    {
      label: "5. Action Clicks (WhatsApp)",
      measure: whatsappClicks,
      unit: "clicks",
      sub: "WhatsApp button clicks on the website, since 19 Sep",
      icon: CheckCircle2,
      color: "bg-emerald-500",
    },
    {
      label: "6. Action Clicks (Phone)",
      measure: phoneClicks,
      unit: "clicks",
      sub: "Recorded when measured",
      icon: PhoneCall,
      color: "bg-emerald-500",
    },
  ];

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="font-semibold text-[var(--dash-text)]">
          Website Activity & Business Outcomes
        </h2>
        <p className="text-xs text-[var(--dash-text-muted)]">
          Separately-measured steps. Where a metric is not measured yet it is
          marked explicitly rather than guessed.
        </p>
      </div>

      <div className="space-y-3">
        {steps.map((step, i) => {
          const Icon = step.icon;
          const measured = typeof step.measure === "number";
          return (
            <div key={step.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 font-medium text-[var(--dash-text)]">
                  <Icon size={14} className="text-[var(--dash-text-muted)]" />
                  {step.label}
                </span>
                {measured ? (
                  <span className="font-mono font-bold text-[var(--dash-text)]">
                    {step.measure!.toLocaleString()}{" "}
                    <span className="font-normal text-[var(--dash-text-muted)]">
                      {step.unit}
                    </span>
                  </span>
                ) : (
                  <span className="font-mono text-xs text-[var(--dash-text-muted)]">
                    Not measured
                  </span>
                )}
              </div>
              <p className="text-[10px] text-[var(--dash-text-muted)] pl-5">
                {step.sub}
              </p>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-0.5">
                  <ArrowDown size={12} className="text-[var(--dash-text-muted)]/40" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}