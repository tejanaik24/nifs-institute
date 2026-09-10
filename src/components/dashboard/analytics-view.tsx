"use client";

import type {
  CenterCityMetric,
  CourseDemandMetric,
  HourlyTrafficMetric,
  IntentBreakdown,
  TimeSeriesPoint,
} from "@/lib/analytics/ga4";
import { classifyFreshness, unavailableFreshness } from "@/lib/analytics/freshness";
import {
  Activity,
  Bot,
  Briefcase,
  CheckCircle2,
  Flame,
  Globe,
  GraduationCap,
  Lightbulb,
  MapPin,
  Search,
  Sparkles,
  TrendingUp,
  Users,
  XCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { AnalyticsTrendChart } from "./analytics-trend-chart";
import { CenterLeaderboard } from "./center-leaderboard";
import { ConversionFunnel } from "./conversion-funnel";
import { CourseDemandMatrix } from "./course-demand-matrix";
import { IntentSplitCard } from "./intent-split-card";
import { PeakHoursHeatmap } from "./peak-hours-heatmap";
import { RealtimeBadge } from "./realtime-badge";
import { ReportExportButton } from "./report-export-button";

type TopPage = { path: string; views: number; avgTimeSeconds: number };
type Query = {
  query: string;
  clicks: number;
  impressions: number;
  position: number;
};
type KeywordGap = {
  keyword: string;
  status: "ranking" | "not-ranking-yet";
  position?: number;
  clicks?: number;
};
type DimensionRow = { label: string; users: number };
type BotHit = { botName: string; count: number };
type HealthCheck = { label: string; pass: boolean; detail: string };

/** Small truth-status label under a KPI — reuses the freshness classifier
 * that already existed in the codebase but was never wired to any screen. */
function FreshnessLabel({
  ok,
  error,
  fetchedAt,
  source,
}: {
  ok: boolean;
  error?: string;
  fetchedAt: string;
  source: string;
}) {
  const freshness = ok
    ? classifyFreshness("delayed", new Date(fetchedAt), {
        source,
        metricPeriod: "28d",
      })
    : unavailableFreshness(source, "28d", error ?? "Unavailable");

  const text =
    freshness.state === "unavailable"
      ? "Unavailable"
      : freshness.state === "delayed"
        ? `Delayed data — updated ${new Date(fetchedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`
        : freshness.state === "live"
          ? "Live now"
          : `Updated ${new Date(fetchedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}`;

  return (
    <span
      className={`text-[10px] ${freshness.state === "unavailable" ? "text-red-500 dark:text-red-400" : "text-[var(--dash-text-muted)]"}`}
    >
      {text}
    </span>
  );
}

interface AnalyticsViewProps {
  fetchedAt: string;
  summary: {
    ok: boolean;
    data?: { visitors: number; topPages: TopPage[] };
    error?: string;
  };
  queries: { ok: boolean; data?: Query[]; error?: string };
  siteTotals: {
    ok: boolean;
    data?: { totalClicks: number; totalImpressions: number; avgPosition: number };
    error?: string;
  };
  keywordGaps: { ok: boolean; data?: KeywordGap[]; error?: string };
  bing: {
    ok: boolean;
    data?: { totalClicks: number; totalImpressions: number };
    error?: string;
  };
  botHits: { ok: boolean; data?: BotHit[]; error?: string };
  health: { ok: boolean; data?: HealthCheck[]; error?: string };
  trafficSources: { ok: boolean; data?: DimensionRow[]; error?: string };
  countries: { ok: boolean; data?: DimensionRow[]; error?: string };
  regions: { ok: boolean; data?: DimensionRow[]; error?: string };
  devices: { ok: boolean; data?: DimensionRow[]; error?: string };
  browsers: { ok: boolean; data?: DimensionRow[]; error?: string };
  ageBrackets: { ok: boolean; data?: DimensionRow[]; error?: string };
  intent?: { ok: boolean; data?: IntentBreakdown; error?: string };
  timeSeries?: { ok: boolean; data?: TimeSeriesPoint[]; error?: string };
  centerCities?: { ok: boolean; data?: CenterCityMetric[]; error?: string };
  courseMatrix?: { ok: boolean; data?: CourseDemandMetric[]; error?: string };
  hourlyTraffic?: { ok: boolean; data?: HourlyTrafficMetric[]; error?: string };
}

type TabKey = "overview" | "intent" | "seo" | "audience" | "ai-health";

export function AnalyticsDashboardView({
  fetchedAt,
  summary,
  queries,
  siteTotals,
  keywordGaps,
  bing,
  botHits,
  health,
  trafficSources,
  countries,
  regions,
  devices,
  browsers,
  ageBrackets,
  intent,
  timeSeries,
  centerCities,
  courseMatrix,
  hourlyTraffic,
}: AnalyticsViewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [targetQuery, setTargetQuery] = useState("");
  const [showOpportunityOnly, setShowOpportunityOnly] = useState(false);

  // Real site-wide totals (not a sum of only the top keyword rows, which
  // understates the true number whenever the site ranks for more queries
  // than the top-N pull covers).
  const totalGoogleClicks = siteTotals.ok ? (siteTotals.data?.totalClicks ?? 0) : 0;
  const totalGoogleImp = siteTotals.ok ? (siteTotals.data?.totalImpressions ?? 0) : 0;
  const totalBotHits = botHits.ok
    ? (botHits.data?.reduce((acc, b) => acc + b.count, 0) ?? 0)
    : 0;

  const intentTotal =
    intent?.ok && intent.data ? intent.data.courseViews + intent.data.jobViews : 0;
  const coursePct =
    intent?.ok && intent.data && intentTotal > 0
      ? Math.round((intent.data.courseViews / intentTotal) * 100)
      : null;
  const jobPct = coursePct !== null && intentTotal > 0 ? 100 - coursePct : null;

  const topCourseFromData =
    courseMatrix?.ok && courseMatrix.data && courseMatrix.data.length > 0
      ? [...courseMatrix.data].sort((a, b) => b.views - a.views)[0]
      : null;

  const peakHour =
    hourlyTraffic?.ok && hourlyTraffic.data && hourlyTraffic.data.length > 0
      ? [...hourlyTraffic.data].sort((a, b) => b.users - a.users)[0]
      : null;

  const healthPassCount = health?.ok && health.data ? health.data.filter((h) => h.pass).length : 0;
  const healthTotal = health?.ok && health.data ? health.data.length : 0;
  const healthPct = healthTotal > 0 ? Math.round((healthPassCount / healthTotal) * 100) : null;

  // Filter queries
  const allQueries = queries.ok ? (queries.data ?? []) : [];
  const filteredQueries = allQueries.filter((q) => {
    const matchesSearch = q.query
      .toLowerCase()
      .includes(searchQuery.toLowerCase().trim());
    if (showOpportunityOnly) {
      return matchesSearch && q.position >= 4 && q.position <= 10;
    }
    return matchesSearch;
  });

  const filteredTargetKeywords = (
    keywordGaps.ok ? (keywordGaps.data ?? []) : []
  ).filter((k) =>
    k.keyword.toLowerCase().includes(targetQuery.toLowerCase().trim()),
  );

  const tabs: { id: TabKey; label: string; icon: LucideIcon; badge?: string }[] = [
    { id: "overview", label: "Executive Overview & Trends", icon: TrendingUp },
    {
      id: "intent",
      label: "Course Demand & Intent Matrix",
      icon: GraduationCap,
      badge: coursePct !== null ? `${coursePct}% Course` : undefined,
    },
    {
      id: "seo",
      label: "Google SERP & Keywords",
      icon: Search,
      badge: `${allQueries.length} Queries`,
    },
    {
      id: "audience",
      label: "Cities & Geographies",
      icon: Users,
      badge:
        centerCities?.ok && centerCities.data?.length
          ? `${centerCities.data.length} Cities`
          : undefined,
    },
    {
      id: "ai-health",
      label: "AI Search & GEO Health",
      icon: Bot,
      badge: healthPct !== null ? `${healthPct}% Pass` : undefined,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header with WhatsApp & Print Exporter */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--dash-text)]">
              Intelligence & Analytics Hub
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--dash-accent-soft)] px-2.5 py-0.5 text-xs font-bold text-[var(--dash-accent)]">
              <Sparkles size={12} /> Executive Tier
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)]">
            Data from Google Analytics 4, Search Console, Bing Webmaster, and
            server bot telemetry (standard reports are delayed by hours to
            days; only the "right now" badge is realtime).
          </p>
        </div>

        {/* 1-Click Exporter */}
        <ReportExportButton
          stats={{
            activeVisitors28d:
              intent?.ok
                ? (intent.data?.courseUsers ?? 0) + (intent.data?.jobUsers ?? 0)
                : undefined,
            courseIntentPercent: coursePct ?? undefined,
            jobIntentPercent: jobPct ?? undefined,
            topCourse: topCourseFromData?.name,
            googleSearchClicks: siteTotals.ok ? totalGoogleClicks : undefined,
            bingSearchClicks: bing.ok ? (bing.data?.totalClicks ?? 0) : undefined,
            totalBotHits: totalBotHits || undefined,
            topCity:
              centerCities?.ok && centerCities.data?.length
                ? centerCities.data[0].city
                : undefined,
          }}
        />
      </div>

      {/* Automated AI Executive Briefing Bar */}
      <div className="rounded-xl border border-[var(--dash-accent)]/20 bg-[var(--dash-accent-soft)]/40 p-4 shadow-xs">
        <div className="flex items-center gap-2 font-semibold text-xs text-[var(--dash-accent)]">
          <Lightbulb size={16} />
          <span>Executive Intelligence Briefing (Live Insights):</span>
        </div>
        <div className="mt-2.5 grid grid-cols-1 gap-2.5 md:grid-cols-3 text-xs text-[var(--dash-text)]">
          <div className="flex items-start gap-2 rounded-lg bg-[var(--dash-card)] p-2.5 shadow-2xs border border-[var(--dash-border)]">
            <span className="font-bold text-blue-600 dark:text-blue-400 shrink-0">
              {coursePct !== null ? `🎓 ${coursePct}%` : "🎓 —"}
            </span>
            <span>
              {coursePct !== null
                ? `of course + placement traffic seeks Admissions & Courses${
                    topCourseFromData
                      ? ` — top course: ${topCourseFromData.name} (${topCourseFromData.views.toLocaleString()} views).`
                      : "."
                  }`
                : "Insufficient data to describe the traffic mix yet."}
            </span>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-[var(--dash-card)] p-2.5 shadow-2xs border border-[var(--dash-border)]">
            <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">
              {peakHour ? `⏰ ${String(peakHour.hour).padStart(2, "0")}:00` : "⏰ —"}
            </span>
            <span>
              {peakHour
                ? `busiest hour by measured traffic (${peakHour.users.toLocaleString()} users).`
                : "Insufficient hourly data yet."}
            </span>
          </div>
          <div className="flex items-start gap-2 rounded-lg bg-[var(--dash-card)] p-2.5 shadow-2xs border border-[var(--dash-border)]">
            <span className="font-bold text-purple-600 dark:text-purple-400 shrink-0">
              🤖 {totalBotHits ? totalBotHits.toLocaleString() : "—"}
            </span>
            <span>
              {totalBotHits
                ? "AI bot visits measured (28d)."
                : "No AI bot visits logged yet."}{" "}
              {healthPct !== null
                ? `GEO health: ${healthPassCount}/${healthTotal} checks passing.`
                : "GEO health data unavailable."}
            </span>
          </div>
        </div>
      </div>

      {/* Top KPI Bento Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {/* Visitors */}
        <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Visitors Yesterday
            </span>
            <div className="rounded-lg bg-[var(--dash-accent-soft)] p-2 text-[var(--dash-accent)]">
              <Users size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {summary.ok ? summary.data?.visitors.toLocaleString() : "—"}
          </div>
          <p className="mt-1 text-[11px] text-[var(--dash-text-muted)]">
            Verified GA4 daily users
          </p>
          <div className="mt-1">
            <FreshnessLabel ok={summary.ok} error={summary.error} fetchedAt={fetchedAt} source="GA4" />
          </div>
        </div>

        {/* Realtime Live */}
        <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Live Right Now
            </span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400">
              <Activity size={16} />
            </div>
          </div>
          <div className="mt-3">
            <RealtimeBadge />
          </div>
          <p className="mt-1 text-[11px] text-[var(--dash-text-muted)]">
            Realtime users on site
          </p>
        </div>

        {/* Google Search Clicks */}
        <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Google Search Clicks (28d)
            </span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
              <Search size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {siteTotals.ok ? totalGoogleClicks.toLocaleString() : "Unavailable"}
          </div>
          <p className="mt-1 text-[11px] text-[var(--dash-text-muted)]">
            Site-wide total, not just top keywords
          </p>
          <div className="mt-1">
            <FreshnessLabel ok={siteTotals.ok} error={siteTotals.error} fetchedAt={fetchedAt} source="Search Console" />
          </div>
        </div>

        {/* Bing Search Clicks */}
        <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Bing Search Clicks (28d)
            </span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400">
              <Search size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {bing.ok ? (bing.data?.totalClicks ?? 0).toLocaleString() : "Unavailable"}
          </div>
          <p className="mt-1 text-[11px] text-[var(--dash-text-muted)]">
            {bing.ok ? "Bing Webmaster Tools" : bing.error ?? "Bing data could not be fetched"}
          </p>
          <div className="mt-1">
            <FreshnessLabel ok={bing.ok} error={bing.error} fetchedAt={fetchedAt} source="Bing" />
          </div>
        </div>

        {/* AI Crawler Visits */}
        <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              AI Bot Visits (28d)
            </span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400">
              <Bot size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {totalBotHits.toLocaleString()}
          </div>
          <p className="mt-1 text-[11px] text-[var(--dash-text-muted)]">
            Claude, ChatGPT, Perplexity
          </p>
        </div>
      </div>

      {/* Segmented Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--dash-border)] pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-[var(--dash-accent)] text-white shadow-sm font-semibold"
                  : "bg-[var(--dash-card)] text-[var(--dash-text-muted)] hover:bg-[var(--dash-bg)] hover:text-[var(--dash-text)] border border-[var(--dash-border)]"
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
              {tab.badge && (
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-bold ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[var(--dash-bg)] text-[var(--dash-text-muted)]"
                  }`}
                >
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: EXECUTIVE OVERVIEW & TRENDS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* 30-Day SVG Trend Area Chart */}
          {timeSeries?.ok && <AnalyticsTrendChart points={timeSeries.data} />}

          {/* Peak Hours Counseling Heatmap */}
          {hourlyTraffic?.ok && hourlyTraffic.data && (
            <PeakHoursHeatmap hours={hourlyTraffic.data} />
          )}

          {/* Website Activity & Outcomes */}
          <ConversionFunnel
            searchImpressions={
              queries.ok ? totalGoogleImp : undefined
            }
            visitors={
              intent?.ok
                ? (intent.data?.courseUsers ?? 0) +
                  (intent.data?.jobUsers ?? 0)
                : undefined
            }
            courseViews={
              intent?.ok
                ? (intent.data?.courseViews ?? 0) +
                  (intent.data?.jobViews ?? 0)
                : undefined
            }
          />

          {/* Top Pages Table */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-[var(--dash-text)]">
                  Top Pages (Last 7 Days)
                </h2>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  Which courses & blogs attract the most readers
                </p>
              </div>
              <span className="rounded bg-[var(--dash-accent-soft)] px-2 py-1 font-mono text-xs font-semibold text-[var(--dash-accent)]">
                {summary.ok ? (summary.data?.topPages.length ?? 0) : 0} pages
              </span>
            </div>

            {summary.ok ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-[var(--dash-border)] text-xs text-[var(--dash-text-muted)] uppercase tracking-wider">
                      <th className="pb-3 font-medium">Page URL</th>
                      <th className="pb-3 text-right font-medium">Views</th>
                      <th className="pb-3 text-right font-medium">
                        Avg Session Duration
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--dash-border)]">
                    {summary.data?.topPages.map((page, i) => (
                      <tr
                        key={page.path}
                        className="transition-colors hover:bg-[var(--dash-bg)]"
                      >
                        <td className="py-3 font-mono text-xs text-[var(--dash-text)]">
                          <span className="mr-2 inline-block w-4 text-[var(--dash-text-muted)] font-normal">
                            {i + 1}.
                          </span>
                          <span className="font-medium text-[var(--dash-text)]">
                            {page.path}
                          </span>
                        </td>
                        <td className="py-3 text-right font-mono font-semibold text-[var(--dash-accent)]">
                          {page.views.toLocaleString()}
                        </td>
                        <td className="py-3 text-right font-mono text-xs text-[var(--dash-text-muted)]">
                          {Math.round(page.avgTimeSeconds)}s
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-6 text-sm text-[var(--dash-text-muted)]">
                {summary.error}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: COURSE DEMAND & INTENT MATRIX */}
      {activeTab === "intent" && (
        <div className="space-y-6">
          <IntentSplitCard intent={intent?.data} />

          {/* Full Course Demand & Syllabus Velocity Matrix */}
          {courseMatrix?.ok && courseMatrix.data && (
            <CourseDemandMatrix courses={courseMatrix.data} />
          )}

          {/* Intent Summary Comparison */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-blue-500/20 bg-blue-500/[0.03] p-6">
              <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                <GraduationCap size={18} />
                <span>🎓 Course & Admissions Seekers</span>
              </div>
              <p className="mt-2 text-xs text-[var(--dash-text-muted)] leading-relaxed">
                {intent?.ok && intent.data
                  ? `${coursePct}% of measured traffic explores courses and admissions.`
                  : "Insufficient data yet — measurements begin once GA4 is reachable."}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs border-t border-blue-500/10 pt-3">
                <span className="text-[var(--dash-text)]">
                  Top Course Landing
                </span>
                <span className="font-mono font-semibold text-blue-600 dark:text-blue-400">
                  {intent?.ok && intent.data?.topCoursePages?.length
                    ? `${intent.data.topCoursePages[0].path} (${intent.data.topCoursePages[0].views.toLocaleString()} views)`
                    : "—"}
                </span>
              </div>
            </div>

            <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.03] p-6">
              <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold text-sm">
                <Briefcase size={18} />
                <span>💼 Job & Placement Seekers</span>
              </div>
              <p className="mt-2 text-xs text-[var(--dash-text-muted)] leading-relaxed">
                {intent?.ok && intent.data
                  ? `${jobPct}% of measured traffic explores placements and job postings.`
                  : "Insufficient data yet — measurements begin once GA4 is reachable."}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs border-t border-amber-500/10 pt-3">
                <span className="text-[var(--dash-text)]">
                  Top Placement Landing
                </span>
                <span className="font-mono font-semibold text-amber-600 dark:text-amber-400">
                  {intent?.ok && intent.data?.topJobPages?.length
                    ? `${intent.data.topJobPages[0].path} (${intent.data.topJobPages[0].views.toLocaleString()} views)`
                    : "—"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: GOOGLE SERP & KEYWORDS */}
      {activeTab === "seo" && (
        <div className="space-y-6">
          {/* Google Search Queries */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-[var(--dash-text)]">
                  Google Organic Search Queries (28 Days)
                </h2>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  Actual search keywords typed into Google with impressions &
                  ranks
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowOpportunityOnly(!showOpportunityOnly)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors cursor-pointer ${
                    showOpportunityOnly
                      ? "bg-amber-500 text-white"
                      : "border border-[var(--dash-border)] bg-[var(--dash-card)] text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
                  }`}
                >
                  <Flame size={13} />{" "}
                  {showOpportunityOnly
                    ? "Showing Pos #4–#10"
                    : "Filter Pos #4–#10"}
                </button>
                <div className="relative">
                  <Search
                    size={14}
                    className="absolute left-3 top-2.5 text-[var(--dash-text-muted)]"
                  />
                  <input
                    type="text"
                    placeholder="Filter queries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] py-1.5 pl-8 pr-3 text-xs text-[var(--dash-text)] outline-hidden placeholder:text-[var(--dash-text-muted)] focus:border-[var(--dash-accent)]"
                  />
                </div>
              </div>
            </div>

            {queries.ok ? (
              <div className="overflow-x-auto max-h-[480px]">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-[var(--dash-bg)] border-b border-[var(--dash-border)] text-xs text-[var(--dash-text-muted)] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 pl-2 font-medium">Search Query</th>
                      <th className="py-2.5 text-right font-medium">Clicks</th>
                      <th className="py-2.5 text-right font-medium">
                        Impressions
                      </th>
                      <th className="py-2.5 pr-2 text-right font-medium">
                        Avg Position
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--dash-border)]">
                    {filteredQueries.map((q) => (
                      <tr
                        key={q.query}
                        className="transition-colors hover:bg-[var(--dash-bg)]"
                      >
                        <td className="py-2.5 pl-2 font-medium text-[var(--dash-text)]">
                          {q.query}
                        </td>
                        <td className="py-2.5 text-right font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          {q.clicks}
                        </td>
                        <td className="py-2.5 text-right font-mono text-xs text-[var(--dash-text-muted)]">
                          {q.impressions.toLocaleString()}
                        </td>
                        <td className="py-2.5 pr-2 text-right">
                          <span
                            className={`inline-block rounded px-2 py-0.5 font-mono text-xs font-bold ${
                              q.position <= 3
                                ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                                : q.position <= 10
                                  ? "bg-[var(--dash-accent-soft)] text-[var(--dash-accent)]"
                                  : "bg-[var(--dash-bg)] text-[var(--dash-text-muted)]"
                            }`}
                          >
                            #{q.position.toFixed(1)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-6 text-sm text-[var(--dash-text-muted)]">
                {queries.error}
              </p>
            )}
          </div>

          {/* Target Keywords Radar */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-semibold text-[var(--dash-text)]">
                  Target Keywords Strategy Radar
                </h2>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  Tracking primary focus keywords against Google organic index
                </p>
              </div>
              <div className="relative">
                <Search
                  size={14}
                  className="absolute left-3 top-2.5 text-[var(--dash-text-muted)]"
                />
                <input
                  type="text"
                  placeholder="Filter target keywords..."
                  value={targetQuery}
                  onChange={(e) => setTargetQuery(e.target.value)}
                  className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] py-1.5 pl-8 pr-3 text-xs text-[var(--dash-text)] outline-hidden placeholder:text-[var(--dash-text-muted)] focus:border-[var(--dash-accent)]"
                />
              </div>
            </div>

            {keywordGaps.ok ? (
              <div className="overflow-x-auto max-h-[420px]">
                <table className="w-full text-left text-sm">
                  <thead className="sticky top-0 bg-[var(--dash-bg)] border-b border-[var(--dash-border)] text-xs text-[var(--dash-text-muted)] uppercase tracking-wider">
                    <tr>
                      <th className="py-2.5 pl-2 font-medium">
                        Target Keyword
                      </th>
                      <th className="py-2.5 font-medium">Status</th>
                      <th className="py-2.5 pr-2 text-right font-medium">
                        Position
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--dash-border)]">
                    {filteredTargetKeywords.map((k) => (
                      <tr
                        key={k.keyword}
                        className="transition-colors hover:bg-[var(--dash-bg)]"
                      >
                        <td className="py-2.5 pl-2 font-medium text-[var(--dash-text)]">
                          {k.keyword}
                        </td>
                        <td className="py-2.5">
                          {k.status === "ranking" ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                              Ranking
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-[var(--dash-bg)] px-2.5 py-0.5 text-xs font-medium text-[var(--dash-text-muted)]">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                              Not Ranking Yet
                            </span>
                          )}
                        </td>
                        <td className="py-2.5 pr-2 text-right font-mono font-semibold">
                          {k.status === "ranking" && k.position ? (
                            <span className="rounded bg-[var(--dash-accent-soft)] px-2 py-0.5 text-xs text-[var(--dash-accent)]">
                              #{k.position.toFixed(1)}
                            </span>
                          ) : (
                            <span className="text-xs text-[var(--dash-text-muted)]">
                              —
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="py-6 text-sm text-[var(--dash-text-muted)]">
                {keywordGaps.error}
              </p>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: 54 CENTERS & GEOGRAPHIES */}
      {activeTab === "audience" && (
        <div className="space-y-6">
          {/* 54 Centers Leaderboard */}
          {centerCities?.ok && centerCities.data && (
            <CenterLeaderboard cities={centerCities.data} />
          )}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Top States */}
            <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[var(--dash-text)]">
                  <MapPin size={15} className="text-[var(--dash-accent)]" /> Top
                  States in India
                </div>
                <span className="text-xs text-[var(--dash-text-muted)]">
                  28 Days
                </span>
              </div>
              {regions.ok ? (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {regions.data?.map((r) => (
                    <div
                      key={r.label}
                      className="flex items-center justify-between border-b border-[var(--dash-border)]/50 pb-2 text-xs"
                    >
                      <span className="text-[var(--dash-text)] font-medium">
                        {r.label || "(Unknown State)"}
                      </span>
                      <span className="font-mono font-semibold text-[var(--dash-text)]">
                        {r.users.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--dash-text-muted)]">
                  {regions.error}
                </p>
              )}
            </div>

            {/* Countries */}
            <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[var(--dash-text)]">
                  <Globe
                    size={15}
                    className="text-blue-600 dark:text-blue-400"
                  />{" "}
                  Top Countries
                </div>
                <span className="text-xs text-[var(--dash-text-muted)]">
                  28 Days
                </span>
              </div>
              {countries.ok ? (
                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {countries.data?.map((c) => (
                    <div
                      key={c.label}
                      className="flex items-center justify-between border-b border-[var(--dash-border)]/50 pb-2 text-xs"
                    >
                      <span className="text-[var(--dash-text)] font-medium">
                        {c.label || "(Unknown)"}
                      </span>
                      <span className="font-mono font-semibold text-[var(--dash-text)]">
                        {c.users.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[var(--dash-text-muted)]">
                  {countries.error}
                </p>
              )}
            </div>

            {/* Devices & Browsers */}
            <div className="space-y-6">
              <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
                <h3 className="mb-3 font-semibold text-sm text-[var(--dash-text)]">
                  Device Breakdown
                </h3>
                {devices.ok ? (
                  <div className="space-y-2 text-xs">
                    {devices.data?.map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between border-b border-[var(--dash-border)]/50 pb-1.5"
                      >
                        <span className="capitalize text-[var(--dash-text)]">
                          {d.label}
                        </span>
                        <span className="font-mono font-semibold text-[var(--dash-text)]">
                          {d.users.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--dash-text-muted)]">
                    {devices.error}
                  </p>
                )}
              </div>

              <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs">
                <h3 className="mb-3 font-semibold text-sm text-[var(--dash-text)]">
                  Browsers
                </h3>
                {browsers.ok ? (
                  <div className="space-y-2 text-xs">
                    {browsers.data?.map((b) => (
                      <div
                        key={b.label}
                        className="flex items-center justify-between border-b border-[var(--dash-border)]/50 pb-1.5"
                      >
                        <span className="text-[var(--dash-text)]">
                          {b.label}
                        </span>
                        <span className="font-mono font-semibold text-[var(--dash-text)]">
                          {b.users.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[var(--dash-text-muted)]">
                    {browsers.error}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AI SEARCH & GEO HEALTH */}
      {activeTab === "ai-health" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* AI Bots List */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="font-semibold text-[var(--dash-text)]">
                AI Engine Crawler Visits (Last 28 Days)
              </h2>
              <p className="text-xs text-[var(--dash-text-muted)]">
                Logged live by server middleware as AI engines index NIFS for
                ChatGPT, Claude, and Perplexity answers.
              </p>
            </div>

            {botHits.ok ? (
              <div className="space-y-3">
                {botHits.data && botHits.data.length > 0 ? (
                  botHits.data.map((b) => (
                    <div
                      key={b.botName}
                      className="flex items-center justify-between rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] p-3 transition-colors hover:bg-[var(--dash-card)]"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="rounded-md bg-purple-500/10 p-1.5 text-purple-600 dark:text-purple-400">
                          <Bot size={16} />
                        </div>
                        <span className="font-medium text-xs text-[var(--dash-text)]">
                          {b.botName}
                        </span>
                      </div>
                      <span className="font-mono text-sm font-bold text-[var(--dash-accent)]">
                        {b.count.toLocaleString()} visits
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-xs text-[var(--dash-text-muted)]">
                    No AI crawler visits logged yet.
                  </p>
                )}
              </div>
            ) : (
              <p className="py-4 text-sm text-[var(--dash-text-muted)]">
                {botHits.error}
              </p>
            )}
          </div>

          {/* AEO / GEO Health Checks */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4">
              <h2 className="font-semibold text-[var(--dash-text)]">
                AEO & GEO Technical Health
              </h2>
              <p className="text-xs text-[var(--dash-text-muted)]">
                Direct verification of schema markups, AI robots allowances, and
                llms.txt definitions.
              </p>
            </div>

            {health.ok ? (
              <div className="space-y-4">
                {health.data?.map((check) => (
                  <div
                    key={check.label}
                    className="flex items-start gap-3 rounded-lg border border-[var(--dash-border)] p-3.5"
                  >
                    {check.pass ? (
                      <CheckCircle2
                        size={18}
                        className="mt-0.5 text-emerald-600 dark:text-emerald-400 shrink-0"
                      />
                    ) : (
                      <XCircle
                        size={18}
                        className="mt-0.5 text-red-600 dark:text-red-400 shrink-0"
                      />
                    )}
                    <div>
                      <div className="font-medium text-xs text-[var(--dash-text)]">
                        {check.label}
                      </div>
                      <div className="text-xs text-[var(--dash-text-muted)] mt-0.5">
                        {check.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-4 text-sm text-[var(--dash-text-muted)]">
                {health.error}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
