import { AnalyticsTrendChart } from "@/components/dashboard/analytics-trend-chart";
import { RealtimeBadge } from "@/components/dashboard/realtime-badge";
import {
  getCenterCityBreakdown,
  getCourseDemandMatrix,
  getDailySummary,
  getDailyTimeSeries,
  getIntentBreakdown,
} from "@/lib/analytics/ga4";
import { getSession } from "@/lib/auth/session";
import { getBotHitSummary } from "@/lib/db/bot-hits";
import { db } from "@/lib/db/client";
import { enquiries, jobApplications, jobs, posts } from "@/lib/db/schema";
import { getRiskFlags } from "@/lib/risk-flags";
import { desc, eq, sql } from "drizzle-orm";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  MapPin,
  PhoneCall,
  Plus,
  Zap,
} from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // refresh overview data every 60s

const SEVERITY = {
  red: {
    icon: AlertOctagon,
    ring: "ring-red-500/25",
    bar: "bg-red-500",
    iconColor: "text-red-600 dark:text-red-400",
    badgeBg: "bg-red-500/15",
    label: "Urgent",
  },
  orange: {
    icon: AlertTriangle,
    ring: "ring-amber-500/25",
    bar: "bg-amber-500",
    iconColor: "text-amber-600 dark:text-amber-400",
    badgeBg: "bg-amber-500/10",
    label: "Warning",
  },
} as const;

export default async function DashboardIndexPage() {
  const session = await getSession();
  const userName = session?.name || "Kusuma";

  // Fetch live counts & records in parallel
  const [
    flags,
    recentEnquiries,
    enquiriesCountRes,
    recentJobs,
    jobsCountRes,
    applicationsCountRes,
    postsCountRes,
    dailySummaryRes,
    timeSeriesRes,
    intentRes,
    centerCitiesRes,
    courseMatrixRes,
    botHitsRes,
  ] = await Promise.all([
    getRiskFlags().catch(() => []),
    db
      .select()
      .from(enquiries)
      .orderBy(desc(enquiries.createdAt))
      .limit(5)
      .catch(() => []),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(enquiries)
      .catch(() => [{ count: 0 }]),
    db
      .select()
      .from(jobs)
      .orderBy(desc(jobs.createdAt))
      .limit(4)
      .catch(() => []),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(jobs)
      .where(eq(jobs.status, "open"))
      .catch(() => [{ count: 0 }]),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(jobApplications)
      .catch(() => [{ count: 0 }]),
    db
      .select({ count: sql<number>`count(*)::int` })
      .from(posts)
      .catch(() => [{ count: 0 }]),
    getDailySummary().catch(() => ({ visitors: 0, topPages: [] })),
    getDailyTimeSeries().catch(() => []),
    getIntentBreakdown().catch(() => null),
    getCenterCityBreakdown().catch(() => []),
    getCourseDemandMatrix().catch(() => []),
    getBotHitSummary().catch(() => []),
  ]);

  const totalEnquiries = enquiriesCountRes[0]?.count ?? 0;
  const activeJobs = jobsCountRes[0]?.count ?? 0;
  const totalApplications = applicationsCountRes[0]?.count ?? 0;
  const totalPosts = postsCountRes[0]?.count ?? 0;

  const totalCourseUsers = intentRes?.courseUsers ?? null;
  const totalJobUsers = intentRes?.jobUsers ?? null;
  const totalUsers28d =
    totalCourseUsers !== null && totalJobUsers !== null
      ? totalCourseUsers + totalJobUsers
      : null;
  const coursePct =
    totalCourseUsers !== null && totalJobUsers !== null && totalUsers28d! > 0
      ? Math.round((totalCourseUsers / totalUsers28d!) * 100)
      : null;

  const totalBotHits = botHitsRes.reduce((acc, b) => acc + b.count, 0);

  return (
    <div className="space-y-8">
      {/* Top Welcome & Quick Actions Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--dash-text)]">
              Executive Mission Control
            </h1>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Dashboard
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)] mt-1">
            Welcome back,{" "}
            <strong className="text-[var(--dash-text)]">{userName}</strong>.
            Live overview across admissions, placement drives, and search
            intelligence.
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/dashboard/jobs/new"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[var(--dash-accent)] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[var(--dash-accent-hover)]"
          >
            <Plus size={14} /> Post Recruitment Drive
          </Link>
          <Link
            href="/dashboard/enquiries"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-card)] px-3.5 py-2 text-xs font-semibold text-[var(--dash-text)] transition-colors hover:bg-[var(--dash-bg)] shadow-2xs"
          >
            <PhoneCall size={14} className="text-amber-500" />
            <span>Callbacks ({totalEnquiries})</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--dash-border)] bg-[var(--dash-card)] px-3.5 py-2 text-xs font-semibold text-[var(--dash-text)] transition-colors hover:bg-[var(--dash-bg)] shadow-2xs"
          >
            <BarChart3 size={14} className="text-blue-500" />
            <span>Analytics Hub</span>
          </Link>
        </div>
      </div>

      {/* Top 4 KPI Bento Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* 1. Admission Callbacks */}
        <Link
          href="/dashboard/enquiries"
          className="group rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Student Callbacks
            </span>
            <div className="rounded-lg bg-amber-500/10 p-2 text-amber-600 dark:text-amber-400 transition-transform group-hover:scale-110">
              <PhoneCall size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {totalEnquiries}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-[var(--dash-text-muted)]">
            <span>Pending guidance calls</span>
            <span className="flex items-center gap-0.5 font-semibold text-[var(--dash-accent)] group-hover:underline">
              Call Now <ArrowRight size={10} />
            </span>
          </div>
        </Link>

        {/* 2. Active Placement Drives */}
        <Link
          href="/dashboard/jobs"
          className="group rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Placement Drives
            </span>
            <div className="rounded-lg bg-blue-500/10 p-2 text-blue-600 dark:text-blue-400 transition-transform group-hover:scale-110">
              <Briefcase size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {activeJobs}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-[var(--dash-text-muted)]">
            <span>{totalApplications} Candidate Resumes</span>
            <span className="flex items-center gap-0.5 font-semibold text-[var(--dash-accent)] group-hover:underline">
              Manage <ArrowRight size={10} />
            </span>
          </div>
        </Link>

        {/* 3. Prospective Students (28d) */}
        <Link
          href="/dashboard/analytics"
          className="group rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Course + Job Page Visitors (28d)
            </span>
            <div className="rounded-lg bg-emerald-500/10 p-2 text-emerald-600 dark:text-emerald-400 transition-transform group-hover:scale-110">
              <GraduationCap size={16} />
            </div>
          </div>
          <div className="mt-3 font-mono text-2xl font-bold text-[var(--dash-text)]">
            {totalUsers28d !== null
              ? totalUsers28d.toLocaleString()
              : "—"}
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-[var(--dash-text-muted)]">
            <span>
              {coursePct !== null
                ? `${coursePct}% Course Seekers · may include overlap`
                : "GA4 data unavailable"}
            </span>
            <span className="flex items-center gap-0.5 font-semibold text-[var(--dash-accent)] group-hover:underline">
              Breakdown <ArrowRight size={10} />
            </span>
          </div>
        </Link>

        {/* 4. Live Visitors & AI Telemetry */}
        <Link
          href="/dashboard/analytics"
          className="group rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 shadow-xs transition-all hover:border-[var(--dash-accent)]/40 hover:shadow-md"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[var(--dash-text-muted)]">
              Live Realtime & AI
            </span>
            <div className="rounded-lg bg-purple-500/10 p-2 text-purple-600 dark:text-purple-400 transition-transform group-hover:scale-110">
              <Activity size={16} />
            </div>
          </div>
          <div className="mt-3">
            <RealtimeBadge />
          </div>
          <div className="mt-1 flex items-center justify-between text-[11px] text-[var(--dash-text-muted)]">
            <span>
              {totalBotHits > 0
                ? `${totalBotHits.toLocaleString()} AI bot visits (28d)`
                : "No bot visits logged yet"}
            </span>
            <span className="flex items-center gap-0.5 font-semibold text-[var(--dash-accent)] group-hover:underline">
              Live Radar <ArrowRight size={10} />
            </span>
          </div>
        </Link>
      </div>

      {/* Counselor Action Alert Window Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 shadow-xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <div className="rounded-lg bg-amber-500/20 p-2 text-amber-600 dark:text-amber-400 shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <div className="text-xs font-bold text-[var(--dash-text)]">
                Counselor Enrollment Window: 11:00 AM – 5:30 PM
              </div>
              <p className="text-[11px] text-[var(--dash-text-muted)]">
                Reach enquiries as soon as they arrive — early callbacks give
                students answers before they compare institutes.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/enquiries"
            className="inline-flex shrink-0 items-center gap-1.5 rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs hover:bg-amber-600 transition-colors"
          >
            <PhoneCall size={12} /> Call Callbacks ({totalEnquiries})
          </Link>
        </div>
      </div>

      {/* Main Two-Column Hub Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column (2 Cols Wide) */}
        <div className="space-y-6 lg:col-span-2">
          {/* 30-Day Student Interest & Traffic Velocity Curve */}
          {timeSeriesRes.length > 0 && (
            <AnalyticsTrendChart points={timeSeriesRes} />
          )}

          {/* Recent Student Callbacks Table */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-[var(--dash-text)]">
                    Recent Admission Callback Requests
                  </h2>
                  <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-bold text-amber-600 dark:text-amber-400">
                    High Priority
                  </span>
                </div>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  Prospective students awaiting personalized counseling
                </p>
              </div>
              <Link
                href="/dashboard/enquiries"
                className="text-xs font-semibold text-[var(--dash-accent)] hover:underline"
              >
                View all ({totalEnquiries}) →
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[var(--dash-border)] p-6 text-center">
                <PhoneCall
                  size={24}
                  className="mx-auto text-[var(--dash-text-muted)] opacity-50"
                />
                <p className="mt-2 text-xs text-[var(--dash-text-muted)]">
                  No pending callback requests right now.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-[var(--dash-border)]">
                {recentEnquiries.map((enq) => (
                  <div
                    key={enq.id}
                    className="flex items-center justify-between py-3 transition-colors hover:bg-[var(--dash-bg)] rounded-lg px-2"
                  >
                    <div>
                      <div className="font-semibold text-xs text-[var(--dash-text)]">
                        {enq.name}
                      </div>
                      <div className="text-[11px] text-[var(--dash-text-muted)] mt-0.5 flex items-center gap-1.5">
                        <span>Course:</span>
                        <span className="font-medium text-[var(--dash-text)] bg-[var(--dash-bg)] px-1.5 py-0.5 rounded-md border border-[var(--dash-border)]">
                          {enq.course || "General Safety Course Inquiry"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <a
                        href={`tel:+91${enq.phone}`}
                        className="inline-flex items-center gap-1.5 rounded-md bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                      >
                        <PhoneCall size={12} /> {enq.phone}
                      </a>
                      <span className="text-[10px] text-[var(--dash-text-muted)] hidden sm:inline">
                        {enq.createdAt.toLocaleDateString("en-IN", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Active Placement & Recruitment Drives */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold text-[var(--dash-text)]">
                    Active Placement & Recruitment Drives
                  </h2>
                  <span className="rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-400">
                    Live Hiring
                  </span>
                </div>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  Job openings shown on website and recruitment flyer pages
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/dashboard/jobs/new"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--dash-accent)] hover:underline"
                >
                  <Plus size={12} /> Post Drive
                </Link>
                <Link
                  href="/dashboard/jobs"
                  className="text-xs font-medium text-[var(--dash-text-muted)] hover:text-[var(--dash-text)]"
                >
                  View all →
                </Link>
              </div>
            </div>

            {recentJobs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-[var(--dash-border)] p-8 text-center">
                <Briefcase
                  size={28}
                  className="mx-auto text-[var(--dash-text-muted)] opacity-50"
                />
                <p className="mt-2 text-sm font-semibold text-[var(--dash-text)]">
                  No active job listings right now
                </p>
                <p className="text-xs text-[var(--dash-text-muted)] mt-1 max-w-md mx-auto">
                  Publish a new placement recruitment drive to automatically
                  display company logos on the live homepage hiring ticker.
                </p>
                <Link
                  href="/dashboard/jobs/new"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-[var(--dash-accent)] px-3.5 py-2 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[var(--dash-accent-hover)]"
                >
                  <Plus size={14} /> Post First Recruitment Drive
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentJobs.map((job) => (
                  <div
                    key={job.id}
                    className="flex items-center justify-between rounded-lg border border-[var(--dash-border)] p-3.5 transition-colors hover:bg-[var(--dash-bg)]"
                  >
                    <div>
                      <div className="font-semibold text-xs text-[var(--dash-text)]">
                        {job.companyName}
                      </div>
                      <div className="text-[11px] text-[var(--dash-text-muted)] mt-0.5">
                        📍 {job.location} • Status:{" "}
                        <span className="capitalize font-medium text-[var(--dash-accent)]">
                          {job.status}
                        </span>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/jobs/${job.id}/edit`}
                      className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-card)] px-3 py-1.5 text-xs font-medium text-[var(--dash-text)] hover:border-[var(--dash-accent)] transition-colors"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1 Col Wide) */}
        <div className="space-y-6">
          {/* Top Courses Demand Matrix (Top 5 Live) */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[var(--dash-text)]">
                  <Flame size={15} className="text-amber-500" />
                  <span>Top In-Demand Courses</span>
                </div>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  Live reading velocity (28 Days)
                </p>
              </div>
              <Link
                href="/dashboard/analytics"
                className="text-xs font-semibold text-[var(--dash-accent)] hover:underline"
              >
                All →
              </Link>
            </div>

            {courseMatrixRes.length > 0 ? (
              <div className="space-y-3">
                {courseMatrixRes
                  .filter((c) => c.category !== "General")
                  .slice(0, 5)
                  .map((c, i) => (
                    <div key={c.path} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="truncate max-w-[160px] font-medium text-[var(--dash-text)]">
                          <span className="text-[var(--dash-text-muted)] mr-1 font-normal">
                            {i + 1}.
                          </span>
                          {c.name}
                        </span>
                        <span className="font-mono font-semibold text-[var(--dash-accent)]">
                          {c.views} views
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[var(--dash-text-muted)]">
                        <span>{c.users} prospective students</span>
                        <span className="inline-flex items-center gap-0.5">
                          <Clock size={9} /> {c.avgTimeSeconds}s avg
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--dash-text-muted)]">
                Loading course intelligence...
              </p>
            )}
          </div>

          {/* Top 5 Regional Student Feeder Hubs */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-sm text-[var(--dash-text)]">
                  <MapPin size={15} className="text-[var(--dash-accent)]" />
                  <span>Top Regional Hubs</span>
                </div>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  54 Center Geographic Traffic
                </p>
              </div>
              <Link
                href="/dashboard/analytics"
                className="text-xs font-semibold text-[var(--dash-accent)] hover:underline"
              >
                Centers →
              </Link>
            </div>

            {centerCitiesRes.length > 0 ? (
              <div className="space-y-2.5">
                {centerCitiesRes.slice(0, 5).map((c, idx) => (
                  <div
                    key={c.city}
                    className="flex items-center justify-between border-b border-[var(--dash-border)] pb-2 text-xs last:border-0"
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-[var(--dash-text-muted)]">
                        {idx + 1}.
                      </span>
                      <span className="font-medium text-[var(--dash-text)]">
                        {c.city}
                      </span>
                      {c.isMajorNifsHub && (
                        <span className="rounded-full bg-emerald-500/10 px-1.5 py-0.2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400">
                          Hub
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-semibold text-[var(--dash-text)]">
                      {c.views} views
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-[var(--dash-text-muted)]">
                Loading regional centers...
              </p>
            )}
          </div>

          {/* Content & SEO Health Card */}
          <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-6 shadow-xs">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-sm text-[var(--dash-text)]">
                  Content & SEO Shield
                </h3>
                <p className="text-xs text-[var(--dash-text-muted)]">
                  {totalPosts} published articles & guides
                </p>
              </div>
              <Link
                href="/dashboard/content"
                className="text-xs font-semibold text-[var(--dash-accent)] hover:underline"
              >
                Posts →
              </Link>
            </div>

            <div className="space-y-3">
              {flags.length === 0 ? (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 p-3 text-xs text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 size={14} className="shrink-0" />
                  <span>
                    Zero content risk flags — all articles fully optimized!
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  {flags.map((flag, i) => {
                    const s = SEVERITY[flag.severity];
                    const Icon = s.icon;
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-2 rounded-lg border border-[var(--dash-border)] p-2.5 text-xs"
                      >
                        <Icon
                          size={14}
                          className={`mt-0.5 ${s.iconColor} shrink-0`}
                        />
                        <div className="min-w-0 flex-1">
                          <span className="font-medium text-[var(--dash-text)]">
                            {flag.title}
                          </span>
                          {flag.postTitle && (
                            <div className="truncate text-[11px] text-[var(--dash-text-muted)]">
                              {flag.postTitle}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
