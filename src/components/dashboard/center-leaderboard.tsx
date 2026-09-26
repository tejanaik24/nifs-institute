"use client";

import type { CenterCityMetric } from "@/lib/analytics/ga4";
import { Building2, CheckCircle2, MapPin, Search } from "lucide-react";
import { useState } from "react";

interface CenterLeaderboardProps {
  cities: CenterCityMetric[];
}

export function CenterLeaderboard({ cities }: CenterLeaderboardProps) {
  const [filter, setFilter] = useState("");
  const [onlyHubs, setOnlyHubs] = useState(false);

  const filtered = cities.filter((c) => {
    const matchesSearch = c.city
      .toLowerCase()
      .includes(filter.toLowerCase().trim());
    if (onlyHubs) return matchesSearch && c.isMajorNifsHub;
    return matchesSearch;
  });

  const totalUsers = cities.reduce((acc, c) => acc + c.users, 0);

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[var(--dash-text)]">
              Centers & Regional City Leaderboard
            </h3>
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
              GA4 (28 days)
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)]">
            Website visitors by city (Google Analytics, last 28 days).
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <Search
              size={13}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
            />
            <input
              type="text"
              placeholder="Filter city..."
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-8 w-36 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] pl-7 pr-2.5 text-xs text-[var(--dash-text)] placeholder-[var(--dash-text-muted)] focus:outline-hidden focus:ring-1 focus:ring-[var(--dash-accent)]"
            />
          </div>
          <button
            type="button"
            onClick={() => setOnlyHubs(!onlyHubs)}
            className={`flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-medium transition-colors ${
              onlyHubs
                ? "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
            }`}
          >
            <Building2 size={12} />
            NIFS centre cities only
          </button>
        </div>
      </div>

      {/* Top Insights Strip — real top 4 visitor cities */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cities.slice(0, 4).map((c, i) => (
          <div
            key={c.city}
            className="rounded-lg bg-[var(--dash-bg)] p-2.5 border border-[var(--dash-border)]"
          >
            <div className="text-[11px] text-[var(--dash-text-muted)]">
              #{i + 1} visitor city
            </div>
            <div className="text-sm font-bold text-[var(--dash-text)]">
              {c.city}
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400">
              {c.views.toLocaleString()} page views
            </div>
          </div>
        ))}
      </div>

      {/* City Table */}
      <div className="mt-4 max-h-96 overflow-y-auto rounded-lg border border-[var(--dash-border)]">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 border-b border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text-muted)]">
            <tr>
              <th className="py-2.5 pl-3 pr-2 font-medium">Rank & City</th>
              <th className="px-2 py-2.5 font-medium">NIFS Centre</th>
              <th className="px-2 py-2.5 font-medium text-right">
                Visitors
              </th>
              <th className="px-2 py-2.5 font-medium text-right">Pageviews</th>
              <th className="py-2.5 pl-2 pr-3 font-medium text-right">
                Audience Share
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-8 text-center text-xs text-[var(--dash-text-muted)]"
                >
                  No cities matching your filter.
                </td>
              </tr>
            ) : (
              filtered.map((c, idx) => {
                const share =
                  totalUsers > 0
                    ? ((c.users / totalUsers) * 100).toFixed(1)
                    : "0";
                return (
                  <tr
                    key={c.city}
                    className="transition-colors hover:bg-[var(--dash-bg)]"
                  >
                    <td className="py-2.5 pl-3 pr-2">
                      <div className="flex items-center gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--dash-bg)] text-[10px] font-bold text-[var(--dash-text-muted)]">
                          {idx + 1}
                        </span>
                        <div className="flex items-center gap-1.5 font-medium text-[var(--dash-text)]">
                          <MapPin
                            size={12}
                            className="text-[var(--dash-accent)]"
                          />
                          <span>{c.city}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-2.5">
                      {c.isMajorNifsHub ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 size={10} /> NIFS centre city
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--dash-bg)] px-2 py-0.5 text-[10px] text-[var(--dash-text-muted)]">
                          No NIFS centre
                        </span>
                      )}
                    </td>
                    <td className="px-2 py-2.5 text-right font-medium text-[var(--dash-text)]">
                      {c.users.toLocaleString()}
                    </td>
                    <td className="px-2 py-2.5 text-right text-[var(--dash-text-muted)]">
                      {c.views.toLocaleString()}
                    </td>
                    <td className="py-2.5 pl-2 pr-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <span className="font-medium text-[var(--dash-text)]">
                          {share}%
                        </span>
                        <div className="h-1.5 w-12 rounded-full bg-[var(--dash-bg)] overflow-hidden">
                          <div
                            className="h-full bg-[var(--dash-accent)]"
                            style={{
                              width: `${Math.min(100, Math.max(8, Number(share) * 4))}%`,
                            }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
