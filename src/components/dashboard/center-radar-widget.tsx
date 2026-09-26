"use client";

import type { CenterCityMetric } from "@/lib/analytics/ga4";
import { Compass, ExternalLink, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

interface CenterRadarWidgetProps {
  analyticsCities: CenterCityMetric[];
}

export function CenterRadarWidget({ analyticsCities }: CenterRadarWidgetProps) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredCities = useMemo(() => {
    return analyticsCities.filter((c) => {
      return c.city.toLowerCase().includes(searchQuery.toLowerCase());
    });
  }, [analyticsCities, searchQuery]);

  return (
    <div className="rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-[var(--dash-border)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Compass size={18} />
            </div>
            <div>
              <h3 className="text-base font-bold text-[var(--dash-text)]">
                Website Visitors by City
              </h3>
              <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
                Google Analytics, last 28 days. "NIFS" tag = city has a NIFS centre.
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[200px]">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search city..."
            className="w-full rounded-xl border border-[var(--dash-border)] bg-[var(--dash-bg)] pl-9 pr-3 py-1.5 text-xs text-[var(--dash-text)] placeholder:text-[var(--dash-text-muted)] focus:outline-none focus:ring-1 focus:ring-[var(--dash-accent)]"
          />
        </div>
      </div>

      {/* Grid of Cities / Centers */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5 max-h-[300px] overflow-y-auto pr-1">
        {filteredCities.length === 0 ? (
          <div className="col-span-full py-6 text-center text-xs text-[var(--dash-text-muted)]">
            No cities match "{searchQuery}"
          </div>
        ) : (
          filteredCities.map((item, idx) => {
            const isTop3 = idx < 3;
            return (
              <div
                key={item.city}
                className={`p-3 rounded-xl border transition-all ${
                  isTop3
                    ? "border-amber-500/30 bg-amber-500/5 hover:border-amber-500/60"
                    : "border-[var(--dash-border)] bg-[var(--dash-bg)] hover:border-[var(--dash-accent)]/40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[var(--dash-text)] truncate">
                    {item.city}
                  </span>
                  {item.isMajorNifsHub && (
                    <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
                      NIFS
                    </span>
                  )}
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--dash-accent)]">
                    {item.views.toLocaleString()}{" "}
                    <span className="text-[9px] font-normal text-[var(--dash-text-muted)]">
                      views
                    </span>
                  </span>
                  <span className="text-[10px] text-[var(--dash-text-muted)]">
                    {item.users} visitors
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer link to 54 centers */}
      <div className="mt-4 pt-3 border-t border-[var(--dash-border)] flex items-center justify-between text-xs text-[var(--dash-text-muted)]">
        <span>
          Location is approximate (from the visitor's internet connection)
        </span>
        <Link
          href="/dashboard/analytics"
          className="font-semibold text-[var(--dash-accent)] hover:underline inline-flex items-center gap-1"
        >
          <span>Full Leaderboard</span>
          <ExternalLink size={12} />
        </Link>
      </div>
    </div>
  );
}
