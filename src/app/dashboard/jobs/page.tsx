import Link from "next/link";
import { getAllJobs } from "@/lib/db/jobs";
import { getSession } from "@/lib/auth/session";
import { Plus, Building2, MapPin, Users, Calendar } from "lucide-react";
import { DeleteJobButton } from "@/components/dashboard/delete-job-button";

const STATUS_STYLE: Record<string, string> = {
  draft: "rounded-full bg-black/5 px-2.5 py-0.5 font-mono text-xs text-[var(--dash-text-muted)]",
  open: "rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-xs font-semibold text-emerald-600",
  closed: "rounded-full bg-red-500/15 px-2.5 py-0.5 font-mono text-xs text-red-600",
};

export default async function JobsListPage() {
  const jobs = await getAllJobs();
  const session = await getSession();
  const isAdmin = session?.role === "admin";

  return (
    <div className="max-w-6xl">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[var(--dash-text)]">Job Postings</h1>
          <p className="text-sm text-[var(--dash-text-muted)]">
            Manage corporate recruitment drives and multi-position placements.
          </p>
        </div>
        <Link
          href="/dashboard/jobs/new"
          className="inline-flex items-center gap-2 rounded-md bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--dash-accent-hover)]"
        >
          <Plus size={16} />
          New Posting
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-12 text-center">
          <p className="text-sm text-[var(--dash-text-muted)]">
            No job postings yet. Click &quot;New Posting&quot; to add a recruitment drive.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--dash-border)] text-[var(--dash-text-muted)]">
              <tr>
                <th className="px-4 py-3 font-normal">Job Code</th>
                <th className="px-4 py-3 font-normal">Company / Client</th>
                <th className="px-4 py-3 font-normal">Location</th>
                <th className="px-4 py-3 font-normal">Positions</th>
                <th className="px-4 py-3 font-normal">Total Vacancies</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Created</th>
                <th className="px-4 py-3 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {jobs.map((job) => (
                <tr key={job.id} className="transition-colors hover:bg-black/[0.02]">
                  <td className="px-4 py-3 font-mono text-xs font-semibold text-[var(--dash-accent)]">
                    {job.jobCode || `NIFS-${job.id}`}
                  </td>
                  <td className="px-4 py-3 font-medium text-[var(--dash-text)]">
                    <Link
                      href={`/dashboard/jobs/${job.id}`}
                      className="hover:text-[var(--dash-accent)]"
                    >
                      {job.companyName}
                      {job.clientCompany && (
                        <span className="block text-xs font-normal text-[var(--dash-text-muted)]">
                          Client: {job.clientCompany}
                        </span>
                      )}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-[var(--dash-text-muted)]">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin size={13} />
                      {job.location}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-[var(--dash-text)]">
                    {job.positions.length > 0 ? (
                      <div className="space-y-0.5">
                        {job.positions.slice(0, 2).map((p) => (
                          <div key={p.id} className="truncate max-w-[180px]">
                            {p.designation}
                          </div>
                        ))}
                        {job.positions.length > 2 && (
                          <div className="text-[11px] text-[var(--dash-text-muted)]">
                            +{job.positions.length - 2} more
                          </div>
                        )}
                      </div>
                    ) : (
                      <span className="text-[var(--dash-text-muted)] italic">None</span>
                    )}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--dash-text)]">
                    {job.totalVacancies ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <span className={STATUS_STYLE[job.status] ?? STATUS_STYLE.draft}>
                      {job.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-[var(--dash-text-muted)]">
                    {new Date(job.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/dashboard/jobs/${job.id}`}
                        className="rounded border border-[var(--dash-border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--dash-text)] hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)]"
                      >
                        Edit
                      </Link>
                      {isAdmin && (
                        <DeleteJobButton id={job.id} companyName={job.companyName} />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
