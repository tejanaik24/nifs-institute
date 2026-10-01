import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { centerApplications as t } from "@/lib/db/schema";
import { ExportButton } from "@/components/dashboard/export-button";
import { Building2, Mail, Phone } from "lucide-react";

const exportCols = [
  { key: "name", label: "Applicant Name" },
  { key: "phone", label: "Phone" },
  { key: "email", label: "Email" },
  { key: "location", label: "Proposed Location" },
  { key: "message", label: "Message / Details" },
  { key: "status", label: "Status" },
  { key: "dateSubmitted", label: "Submitted Date" },
];

export default async function CenterApplicationsPage() {
  const rows = await db.select().from(t).orderBy(desc(t.createdAt));

  // Pre-format data server-side — no function props cross the Server→Client boundary
  const exportData = rows.map((r) => ({
    name: r.name ?? "",
    phone: r.phone ?? "",
    email: r.email ?? "",
    location: r.state ? `${r.city}, ${r.state}` : r.city,
    message: r.message ?? "",
    status: r.status ?? "new",
    dateSubmitted: r.createdAt
      ? new Date(r.createdAt).toLocaleString("en-IN", {
          dateStyle: "medium",
          timeStyle: "short",
          timeZone: "Asia/Kolkata",
        })
      : "",
  }));

  return (
    <div className="max-w-7xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-red-600" />
            <h1 className="text-xl font-bold tracking-tight text-[var(--dash-text)]">
              Training Center Proposals &amp; Applications
            </h1>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)] mt-1">
            {rows.length} applications recorded • Evaluated by Office of the Director (<code className="text-xs font-mono font-medium">director@nifsindia.com</code>)
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <ExportButton
            data={exportData}
            filename="nifs-center-applications"
            columns={exportCols}
            label="Export to Excel / CSV"
          />
        </div>
      </div>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-[var(--dash-border)] p-12 text-center">
          <Building2 className="mx-auto h-10 w-10 text-[var(--dash-text-muted)] opacity-50 mb-3" />
          <p className="text-sm font-semibold text-[var(--dash-text)]">No center proposals received yet.</p>
          <p className="text-xs text-[var(--dash-text-muted)] mt-1">
            New submissions from <code className="text-xs">/centers/apply</code> will be logged here and routed to the Director.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[var(--dash-border)] bg-black/5 text-[var(--dash-text-muted)] font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="px-4 py-3">Applicant Name</th>
                <th className="px-4 py-3">Contact Details</th>
                <th className="px-4 py-3">Proposed Location</th>
                <th className="px-4 py-3">Message / Remarks</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-black/5 transition-colors align-top">
                  <td className="px-4 py-3 font-semibold text-[var(--dash-text)]">
                    {r.name}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3 text-emerald-600 shrink-0" />
                      <a href={`tel:${r.phone}`} className="hover:text-red-600 underline">
                        {r.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-1.5 mt-1">
                      <Mail className="h-3 w-3 text-red-600 shrink-0" />
                      <a href={`mailto:${r.email}`} className="text-[var(--dash-text-muted)] hover:underline">
                        {r.email}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-[var(--dash-text)]">{r.city}</div>
                    {r.state && <div className="text-[11px] text-[var(--dash-text-muted)]">{r.state}</div>}
                  </td>
                  <td className="px-4 py-3 max-w-sm">
                    <p className="line-clamp-3 text-[var(--dash-text-muted)]" title={r.message || ""}>
                      {r.message || "—"}
                    </p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-[var(--dash-text-muted)] text-[11px]">
                    {r.createdAt
                      ? new Date(r.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                          timeZone: "Asia/Kolkata",
                        })
                      : "—"}
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
