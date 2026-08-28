import Link from "next/link";
import { AlertOctagon, AlertTriangle, CheckCircle2, ArrowRight } from "lucide-react";
import { getRiskFlags } from "@/lib/risk-flags";

const SEVERITY = {
  red: {
    icon: AlertOctagon,
    ring: "ring-red-500/25",
    bar: "bg-red-500",
    iconColor: "text-red-400",
    badgeBg: "bg-red-500/10",
    label: "Urgent",
  },
  orange: {
    icon: AlertTriangle,
    ring: "ring-amber-500/25",
    bar: "bg-amber-500",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/10",
    label: "Warning",
  },
} as const;

export default async function DashboardIndexPage() {
  const flags = await getRiskFlags();
  const redCount = flags.filter((f) => f.severity === "red").length;
  const orangeCount = flags.filter((f) => f.severity === "orange").length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-lg text-[var(--dash-text)]">Overview</h1>
        <p className="mt-1 text-sm text-[var(--dash-text-muted)]">Content health across every published post.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] p-5">
          <div className="flex items-center gap-2 text-red-400">
            <AlertOctagon size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">Urgent</span>
          </div>
          <div className="mt-3 font-mono text-3xl text-[var(--dash-text)]">{redCount}</div>
        </div>
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-5">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">Warning</span>
          </div>
          <div className="mt-3 font-mono text-3xl text-[var(--dash-text)]">{orangeCount}</div>
        </div>
        <div className="rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
          <div className="flex items-center gap-2 text-[var(--dash-text-muted)]">
            <CheckCircle2 size={16} />
            <span className="text-xs font-medium uppercase tracking-wide">Total flags</span>
          </div>
          <div className="mt-3 font-mono text-3xl text-[var(--dash-text)]">{flags.length}</div>
        </div>
      </div>

      {flags.length === 0 ? (
        <div className="flex items-center gap-3 rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-6">
          <CheckCircle2 size={20} className="text-[var(--dash-accent)]" />
          <p className="text-sm text-[var(--dash-text)]">
            All clear — every published post has a meta description, SEO title, cover image, and FAQs.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {flags.map((flag, i) => {
            const s = SEVERITY[flag.severity];
            const Icon = s.icon;
            return (
              <div
                key={i}
                className={`flex items-start gap-4 overflow-hidden rounded-xl bg-[var(--dash-surface)] p-4 ring-1 ${s.ring} transition-shadow hover:shadow-[0_0_24px_-12px_var(--dash-accent)]`}
              >
                <span className={`h-full w-1 self-stretch rounded-full ${s.bar}`} />
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${s.badgeBg} ${s.iconColor}`}>
                  <Icon size={16} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-medium text-[var(--dash-text)]">{flag.title}</span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide ${s.badgeBg} ${s.iconColor}`}>
                      {s.label}
                    </span>
                  </div>
                  {flag.postTitle && (
                    <div className="mt-1 truncate text-xs text-[var(--dash-text-muted)]">{flag.postTitle}</div>
                  )}
                  <p className="mt-1.5 text-xs leading-relaxed text-[var(--dash-text-muted)]">{flag.why}</p>
                </div>
                {flag.postSlug && (
                  <Link
                    href="/dashboard/content"
                    className="mt-1 flex shrink-0 items-center gap-1 text-xs font-medium text-[var(--dash-accent)] hover:underline"
                  >
                    Fix it <ArrowRight size={12} />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
