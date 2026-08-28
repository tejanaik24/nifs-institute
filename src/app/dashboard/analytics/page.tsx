import {
  getDailySummary,
  getTrafficSources,
  getCountries,
  getRegions,
  getDeviceBreakdown,
  getBrowserBreakdown,
  getAgeBreakdown,
} from "@/lib/analytics/ga4";
import { getTopQueries, getKeywordGaps } from "@/lib/analytics/gsc";
import { getBingTrafficSummary } from "@/lib/analytics/bing";
import { getBotHitSummary } from "@/lib/db/bot-hits";
import { getAeoGeoHealth } from "@/lib/analytics/health";
import { NIFS_TARGET_KEYWORDS } from "@/lib/analytics/target-keywords";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatBadge3D } from "@/components/three/StatBadge3D";
import { RealtimeBadge } from "@/components/dashboard/realtime-badge";

export const revalidate = 3600; // daily-granularity data — refresh hourly, not per-request

// Every external call is isolated so one failing integration (an expired
// token, a quota limit) shows "unavailable" for that section only, instead of
// taking down the whole page — and never gets replaced with invented numbers.
async function safe<T>(promise: Promise<T>): Promise<{ ok: true; data: T } | { ok: false; error: string }> {
  try {
    return { ok: true, data: await promise };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Unavailable" };
  }
}

function Unavailable({ error }: { error: string }) {
  return <p className="text-sm text-[var(--dash-text-muted)]">Unavailable right now — {error}</p>;
}

function DimensionTable({
  title,
  rows,
  columnLabel,
  emptyHint,
}: {
  title: string;
  rows: { label: string; users: number }[];
  columnLabel: string;
  emptyHint?: string;
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-medium text-[var(--dash-text)]">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-xs text-[var(--dash-text-muted)]">
          {emptyHint ?? "No data for this period yet."}
        </p>
      ) : (
        <table className="w-full text-left text-sm">
          <thead className="text-[var(--dash-text-muted)]">
            <tr>
              <th className="pb-2 font-normal">{columnLabel}</th>
              <th className="pb-2 font-normal">Users</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-t border-[var(--dash-border)]">
                <td className="py-1.5">{row.label || "(not set)"}</td>
                <td className="py-1.5 font-mono">{row.users}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default async function AnalyticsPage() {
  const [
    summary,
    queries,
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
  ] = await Promise.all([
    safe(getDailySummary()),
    safe(getTopQueries()),
    safe(getKeywordGaps(NIFS_TARGET_KEYWORDS)),
    safe(getBingTrafficSummary()),
    safe(getBotHitSummary()),
    safe(getAeoGeoHealth()),
    safe(getTrafficSources()),
    safe(getCountries()),
    safe(getRegions()),
    safe(getDeviceBreakdown()),
    safe(getBrowserBreakdown()),
    safe(getAgeBreakdown()),
  ]);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Analytics</h1>

      {/* Hero numbers — the two things worth a 3D badge, everything else stays a plain readable table/card */}
      <div className="mb-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {summary.ok ? (
          <StatBadge3D value={String(summary.data.visitors)} label="Visitors yesterday" />
        ) : (
          <Unavailable error={summary.error} />
        )}
        <RealtimeBadge />
        {summary.ok && summary.data.topPages[0] ? (
          <StatBadge3D value={String(summary.data.topPages[0].views)} label={summary.data.topPages[0].path} />
        ) : (
          <Unavailable error={summary.ok ? "no page data" : summary.error} />
        )}
      </div>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Top pages (7 days) — which blogs are reaching more people
      </h2>
      {summary.ok ? (
        <table className="mb-8 w-full text-left text-sm">
          <thead className="text-[var(--dash-text-muted)]">
            <tr>
              <th className="pb-2 font-normal">Page</th>
              <th className="pb-2 font-normal">Views</th>
              <th className="pb-2 font-normal">Avg. time (s)</th>
            </tr>
          </thead>
          <tbody>
            {summary.data.topPages.map((page) => (
              <tr key={page.path} className="border-t border-[var(--dash-border)]">
                <td className="py-2">{page.path}</td>
                <td className="py-2 font-mono">{page.views}</td>
                <td className="py-2 font-mono">{Math.round(page.avgTimeSeconds)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Unavailable error={summary.error} />
      )}

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Google — top search keywords (28 days)
      </h2>
      {queries.ok ? (
        <table className="mb-8 w-full text-left text-sm">
          <thead className="text-[var(--dash-text-muted)]">
            <tr>
              <th className="pb-2 font-normal">Query</th>
              <th className="pb-2 font-normal">Clicks</th>
              <th className="pb-2 font-normal">Impressions</th>
              <th className="pb-2 font-normal">Avg. position</th>
            </tr>
          </thead>
          <tbody>
            {queries.data.map((q) => (
              <tr key={q.query} className="border-t border-[var(--dash-border)]">
                <td className="py-2">{q.query}</td>
                <td className="py-2 font-mono">{q.clicks}</td>
                <td className="py-2 font-mono">{q.impressions}</td>
                <td className="py-2 font-mono">{q.position.toFixed(1)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Unavailable error={queries.error} />
      )}

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Target keywords — ranking vs. not ranking yet
      </h2>
      <p className="mb-3 text-xs text-[var(--dash-text-muted)]">
        Checked against your own researched keyword list — Google never exposes a true
        &quot;not ranking anywhere&quot; list, so this only covers keywords you&apos;re actually targeting.
      </p>
      {keywordGaps.ok ? (
        <table className="mb-8 w-full text-left text-sm">
          <thead className="text-[var(--dash-text-muted)]">
            <tr>
              <th className="pb-2 font-normal">Keyword</th>
              <th className="pb-2 font-normal">Status</th>
              <th className="pb-2 font-normal">Position</th>
            </tr>
          </thead>
          <tbody>
            {keywordGaps.data.map((k) => (
              <tr key={k.keyword} className="border-t border-[var(--dash-border)]">
                <td className="py-2">{k.keyword}</td>
                <td className="py-2">
                  <span
                    className={
                      k.status === "ranking"
                        ? "rounded-full bg-[var(--dash-accent)]/20 px-2 py-0.5 font-mono text-xs text-[var(--dash-accent)]"
                        : "rounded-full bg-white/10 px-2 py-0.5 font-mono text-xs text-[var(--dash-text-muted)]"
                    }
                  >
                    {k.status === "ranking" ? "ranking" : "not ranking yet"}
                  </span>
                </td>
                <td className="py-2 font-mono">{k.status === "ranking" ? k.position.toFixed(1) : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Unavailable error={keywordGaps.error} />
      )}

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Who&apos;s visiting (28 days)
      </h2>
      <div className="mb-8 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        {trafficSources.ok ? (
          <DimensionTable title="Traffic sources" rows={trafficSources.data} columnLabel="Source" />
        ) : (
          <Unavailable error={trafficSources.error} />
        )}
        {countries.ok ? (
          <DimensionTable title="Country" rows={countries.data} columnLabel="Country" />
        ) : (
          <Unavailable error={countries.error} />
        )}
        {regions.ok ? (
          <DimensionTable title="State / region" rows={regions.data} columnLabel="State" />
        ) : (
          <Unavailable error={regions.error} />
        )}
        {devices.ok ? (
          <DimensionTable title="Device" rows={devices.data} columnLabel="Device" />
        ) : (
          <Unavailable error={devices.error} />
        )}
        {browsers.ok ? (
          <DimensionTable title="Browser" rows={browsers.data} columnLabel="Browser" />
        ) : (
          <Unavailable error={browsers.error} />
        )}
        {ageBrackets.ok ? (
          <DimensionTable
            title="Age"
            rows={ageBrackets.data}
            columnLabel="Age bracket"
            emptyHint="Age data isn't enabled on this GA4 property yet (needs Google Signals turned on) — not something I can fake, this fills in once that's switched on."
          />
        ) : (
          <Unavailable error={ageBrackets.error} />
        )}
      </div>

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        Bing — traffic (28 days)
      </h2>
      {bing.ok ? (
        <div className="mb-8 grid grid-cols-2 gap-4">
          <StatCard label="Bing clicks" value={bing.data.totalClicks} />
          <StatCard label="Bing impressions" value={bing.data.totalImpressions} />
        </div>
      ) : (
        <Unavailable error={bing.error} />
      )}

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        AI crawler visits (28 days) — GPTBot, ClaudeBot, Perplexity, and others
      </h2>
      <p className="mb-3 text-xs text-[var(--dash-text-muted)]">
        GA4 can&apos;t see these at all (bots don&apos;t run JavaScript) — this is real traffic
        logged directly by the site itself as it happens.
      </p>
      {botHits.ok ? (
        botHits.data.length > 0 ? (
          <table className="mb-8 w-full text-left text-sm">
            <thead className="text-[var(--dash-text-muted)]">
              <tr>
                <th className="pb-2 font-normal">Bot</th>
                <th className="pb-2 font-normal">Visits</th>
              </tr>
            </thead>
            <tbody>
              {botHits.data.map((b) => (
                <tr key={b.botName} className="border-t border-[var(--dash-border)]">
                  <td className="py-2">{b.botName}</td>
                  <td className="py-2 font-mono">{b.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mb-8 text-sm text-[var(--dash-text-muted)]">
            No AI crawler visits logged yet — this fills in as real bot traffic hits the live site.
          </p>
        )
      ) : (
        <Unavailable error={botHits.error} />
      )}

      <h2 className="mb-3 font-mono text-xs uppercase tracking-wide text-[var(--dash-text-muted)]">
        AEO / GEO health — real checks, not a made-up score
      </h2>
      {health.ok ? (
        <ul className="space-y-2">
          {health.data.map((check) => (
            <li key={check.label} className="flex items-start gap-2 text-sm">
              <span className={check.pass ? "mt-0.5 text-[var(--dash-accent)]" : "mt-0.5 text-red-400"}>
                {check.pass ? "✓" : "✗"}
              </span>
              <span>
                <span className="text-[var(--dash-text)]">{check.label}</span>
                <span className="block text-xs text-[var(--dash-text-muted)]">{check.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <Unavailable error={health.error} />
      )}
    </div>
  );
}
