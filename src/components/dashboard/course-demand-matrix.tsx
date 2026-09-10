"use client";

import type { CourseDemandMetric } from "@/lib/analytics/ga4";
import {
  Award,
  BookOpen,
  Clock,
  ExternalLink,
  Flame,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CourseDemandMatrixProps {
  courses: CourseDemandMetric[];
}

export function CourseDemandMatrix({ courses }: CourseDemandMatrixProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: "all", label: "All Programs" },
    { id: "Diploma", label: "Diplomas" },
    { id: "Degree", label: "B.Sc Degrees" },
    { id: "PG Diploma", label: "PG Diplomas" },
    { id: "Certificate", label: "Certificates" },
  ];

  const filtered = courses.filter((c) => {
    const matchesCategory =
      selectedCategory === "all" || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase().trim()) ||
      c.path.toLowerCase().includes(searchTerm.toLowerCase().trim());
    return matchesCategory && matchesSearch;
  });

  const totalViews = courses.reduce((acc, c) => acc + c.views, 0);
  const totalUsers = courses.reduce((acc, c) => acc + c.users, 0);

  const formatDuration = (sec: number) => {
    if (sec <= 0) return "< 30s";
    const mins = Math.floor(sec / 60);
    const remainder = sec % 60;
    if (mins > 0) return `${mins}m ${remainder}s`;
    return `${remainder}s`;
  };

  return (
    <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-[var(--dash-text)]">
              Course Demand & Syllabus Velocity Matrix
            </h3>
            <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-semibold text-blue-600 dark:text-blue-400">
              GA4 (28 days)
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)]">
            Relative applicant demand, reading depth, and syllabus engagement
            across all NIFS training tracks.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[var(--dash-text-muted)]"
          />
          <input
            type="text"
            placeholder="Search course or syllabus..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-8 w-44 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] pl-7 pr-2.5 text-xs text-[var(--dash-text)] placeholder-[var(--dash-text-muted)] focus:outline-hidden focus:ring-1 focus:ring-[var(--dash-accent)]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="mt-4 flex flex-wrap items-center gap-1.5 border-b border-[var(--dash-border)] pb-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
              selectedCategory === cat.id
                ? "bg-[var(--dash-text)] text-[var(--dash-bg)] font-semibold"
                : "bg-[var(--dash-bg)] text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Top 3 Demand Highlights */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {courses.length === 0 ? (
          <div className="rounded-lg border border-dashed border-[var(--dash-border)] p-3 text-xs text-[var(--dash-text-muted)] sm:col-span-3">
            Not enough engagement data yet.
          </div>
        ) : (
          (() => {
            const top = [...courses].sort((a, b) => b.views - a.views);
            const mostRead = [...courses].sort(
              (a, b) => b.avgTimeSeconds - a.avgTimeSeconds,
            )[0];
            const topDiploma =
              courses.find((c) => c.category === "PG Diploma" || c.category === "Diploma") ?? top[1];

            return (
              <>
                <div className="rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400">
                    <Flame size={14} /> #1 Most In-Demand Course
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[var(--dash-text)]">
                    {top[0].name}
                  </div>
                  <div className="mt-1 text-xs text-[var(--dash-text-muted)]">
                    {top[0].views.toLocaleString()} pageviews · {top[0].users.toLocaleString()} users
                  </div>
                </div>

                <div className="rounded-lg border border-blue-500/30 bg-blue-500/5 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400">
                    <Award size={14} /> Highest Reading Depth
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[var(--dash-text)]">
                    {mostRead.name}
                  </div>
                  <div className="mt-1 text-xs text-[var(--dash-text-muted)]">
                    {formatDuration(mostRead.avgTimeSeconds)} avg reading time
                  </div>
                </div>

                <div className="rounded-lg border border-purple-500/30 bg-purple-500/5 p-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-400">
                    <Sparkles size={14} /> Top Diploma
                  </div>
                  <div className="mt-1 text-sm font-semibold text-[var(--dash-text)]">
                    {topDiploma?.name ?? "No diplomas yet"}
                  </div>
                  <div className="mt-1 text-xs text-[var(--dash-text-muted)]">
                    {topDiploma ? `${topDiploma.views.toLocaleString()} pageviews · ${topDiploma.users.toLocaleString()} users` : "—"}
                  </div>
                </div>
              </>
            );
          })()
        )}
      </div>

      {/* Courses Table */}
      <div className="mt-4 max-h-96 overflow-y-auto rounded-lg border border-[var(--dash-border)]">
        <table className="w-full text-left text-xs">
          <thead className="sticky top-0 border-b border-[var(--dash-border)] bg-[var(--dash-bg)] text-[var(--dash-text-muted)]">
            <tr>
              <th className="py-2.5 pl-3 pr-2 font-medium">Program Name</th>
              <th className="px-2 py-2.5 font-medium">Level</th>
              <th className="px-2 py-2.5 font-medium text-right">
                Student Views
              </th>
              <th className="px-2 py-2.5 font-medium text-right">
                Unique Students
              </th>
              <th className="px-2 py-2.5 font-medium text-right">
                Avg Read Time
              </th>
              <th className="py-2.5 pl-2 pr-3 font-medium text-right">
                Share of Interest
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-8 text-center text-xs text-[var(--dash-text-muted)]"
                >
                  No courses matching your filter.
                </td>
              </tr>
            ) : (
              filtered.map((c) => (
                <tr
                  key={c.path}
                  className="transition-colors hover:bg-[var(--dash-bg)]"
                >
                  <td className="py-2.5 pl-3 pr-2">
                    <div className="flex items-center gap-2">
                      <BookOpen
                        size={13}
                        className="shrink-0 text-[var(--dash-accent)]"
                      />
                      <div className="min-w-0">
                        <Link
                          href={c.path}
                          target="_blank"
                          className="font-medium text-[var(--dash-text)] hover:underline inline-flex items-center gap-1"
                        >
                          <span className="truncate">{c.name}</span>
                          <ExternalLink
                            size={10}
                            className="shrink-0 opacity-50"
                          />
                        </Link>
                        <div className="text-[10px] text-[var(--dash-text-muted)] font-mono truncate">
                          {c.path}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 py-2.5">
                    <span
                      className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        c.category === "Degree"
                          ? "bg-purple-500/10 text-purple-600 dark:text-purple-400"
                          : c.category === "PG Diploma"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                            : c.category === "Certificate"
                              ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                              : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                      }`}
                    >
                      {c.category}
                    </span>
                  </td>
                  <td className="px-2 py-2.5 text-right font-medium text-[var(--dash-text)]">
                    {c.views.toLocaleString()}
                  </td>
                  <td className="px-2 py-2.5 text-right text-[var(--dash-text-muted)]">
                    {c.users.toLocaleString()}
                  </td>
                  <td className="px-2 py-2.5 text-right">
                    <div className="inline-flex items-center gap-1 font-medium text-[var(--dash-text)]">
                      <Clock
                        size={11}
                        className="text-[var(--dash-text-muted)]"
                      />
                      <span>{formatDuration(c.avgTimeSeconds)}</span>
                    </div>
                  </td>
                  <td className="py-2.5 pl-2 pr-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <span className="font-semibold text-[var(--dash-text)]">
                        {c.sharePercent}%
                      </span>
                      <div className="h-1.5 w-12 rounded-full bg-[var(--dash-bg)] overflow-hidden">
                        <div
                          className="h-full bg-[var(--dash-accent)]"
                          style={{
                            width: `${Math.min(100, Math.max(8, c.sharePercent * 3))}%`,
                          }}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
