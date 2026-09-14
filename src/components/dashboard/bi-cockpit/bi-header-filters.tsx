"use client";

import { ChevronDown, Clock, RotateCcw } from "lucide-react";

export interface FilterState {
  zone: string;
  category: string;
  city: string;
  dateRange: string;
}

interface BIHeaderFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onReset: () => void;
  availableCities: string[];
  lastRefreshTime?: string;
}

export function BIHeaderFilters({
  filters,
  onFilterChange,
  onReset,
  availableCities,
  lastRefreshTime = "2026-09-11 00:44:12 IST",
}: BIHeaderFiltersProps) {
  const updateFilter = (key: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="space-y-3">
      {/* Top Main Banner (matching reference deep-indigo banner) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 p-4 sm:p-5 text-white shadow-md">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight flex items-center gap-2.5">
            <span>Portfolio Summary Dashboard</span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-white/15 px-2 py-0.5 rounded-md border border-white/20">
              Executive View
            </span>
          </h1>
          <p className="text-xs text-indigo-200 mt-1">
            Real-time pan-India student admissions, course reading velocity &
            regional feeder analytics
          </p>
        </div>

        {/* Live Refresh Timestamp Box */}
        <div className="flex items-center gap-3 bg-black/25 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 shrink-0 self-start md:self-auto">
          <Clock size={16} className="text-indigo-300 animate-pulse" />
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
              Last Refresh
            </div>
            <div className="font-mono text-xs font-semibold text-white">
              {lastRefreshTime}
            </div>
          </div>
        </div>
      </div>

      {/* Filter Ribbon (matching reference filter dropdown bar) */}
      <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-3 sm:p-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 flex-1">
            {/* Zone / Region Filter */}
            <div className="flex flex-col gap-1 min-w-[130px]">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--dash-text-muted)]">
                Region / Zone
              </label>
              <div className="relative">
                <select
                  value={filters.zone}
                  onChange={(e) => updateFilter("zone", e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--dash-text)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8 shadow-2xs"
                >
                  <option value="All">All Regions</option>
                  <option value="South">South India (AP/TS/KA/TN)</option>
                  <option value="North">North India (DL/UP/PB/RJ)</option>
                  <option value="East">East India (BR/WB/OD/AS)</option>
                  <option value="West">West India (MH/GJ/MP/CG)</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
                />
              </div>
            </div>

            {/* Course Category Filter */}
            <div className="flex flex-col gap-1 min-w-[140px]">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--dash-text-muted)]">
                Course Category
              </label>
              <div className="relative">
                <select
                  value={filters.category}
                  onChange={(e) => updateFilter("category", e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--dash-text)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8 shadow-2xs"
                >
                  <option value="All">All Categories</option>
                  <option value="Diploma">Diploma (ADIS/DFS/DIS)</option>
                  <option value="Degree">Degree (B.Sc Fire Safety)</option>
                  <option value="PG Diploma">PG Diploma (PG-DHSE)</option>
                  <option value="Certificate">Certificates</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
                />
              </div>
            </div>

            {/* Center City Filter */}
            <div className="flex flex-col gap-1 min-w-[140px]">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--dash-text-muted)]">
                Center / City
              </label>
              <div className="relative">
                <select
                  value={filters.city}
                  onChange={(e) => updateFilter("city", e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--dash-text)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8 shadow-2xs"
                >
                  <option value="All">All 54 Centers</option>
                  {availableCities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
                />
              </div>
            </div>

            {/* Time Period / Range Filter */}
            <div className="flex flex-col gap-1 min-w-[130px]">
              <label className="text-[10px] font-extrabold uppercase tracking-wider text-[var(--dash-text-muted)]">
                Time Window
              </label>
              <div className="relative">
                <select
                  value={filters.dateRange}
                  onChange={(e) => updateFilter("dateRange", e.target.value)}
                  className="w-full appearance-none rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--dash-text)] focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 pr-8 shadow-2xs"
                >
                  <option value="28d">Last 28 Days (Verified)</option>
                  <option value="7d">Last 7 Days</option>
                  <option value="90d">Last Quarter (90 Days)</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
                />
              </div>
            </div>
          </div>

          {/* Reset Filters Button */}
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-3 py-2 text-xs font-semibold text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] hover:bg-[var(--dash-card)] transition-colors self-end"
            title="Reset all filters"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}
