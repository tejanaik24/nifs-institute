import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";
import { ExportButton } from "@/components/dashboard/export-button";

const exportCols = [
  { key: "name", label: "Candidate Name" },
  { key: "phone", label: "Phone Number" },
  { key: "course", label: "Course Requested" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "status", label: "Status" },
  { key: "dateReceived", label: "Date Received" },
];

export default async function EnquiriesPage() {
  const rows = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(200);

  // Pre-format data server-side — no functions cross the Server→Client boundary
  const exportData = rows.map((row) => ({
    name: row.name ?? "",
    phone: row.phone ?? "",
    course: row.course ?? "",
    city: row.city ?? "",
    state: row.state ?? "",
    status: row.status || "Submitted",
    dateReceived: row.createdAt
      ? new Date(row.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "",
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--dash-text)]">
            Callback Requests &amp; Leads
          </h1>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            {rows.length} student enquiries recorded
          </p>
        </div>
        <ExportButton
          data={exportData}
          filename="nifs-callbacks"
          columns={exportCols}
          label="Export to Excel / CSV"
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--dash-text-muted)]">No callback requests yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-[var(--dash-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--dash-surface)] text-[var(--dash-text-muted)]">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Phone</th>
                <th className="px-4 py-2 font-medium">Course</th>
                <th className="px-4 py-2 font-medium">City</th>
                <th className="px-4 py-2 font-medium">State</th>
                <th className="px-4 py-2 font-medium">Received</th>
                <th className="px-4 py-2 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.id} className="border-t border-[var(--dash-border)]">
                  <td className="px-4 py-2">{row.name}</td>
                  <td className="px-4 py-2">
                    <a className="underline" href={`tel:+91${row.phone}`}>{row.phone}</a>
                  </td>
                  <td className="px-4 py-2">{row.course}</td>
                  <td className="px-4 py-2">{row.city || "—"}</td>
                  <td className="px-4 py-2">{row.state || "—"}</td>
                  <td className="px-4 py-2 text-[var(--dash-text-muted)]">
                    {row.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-2">
                    {row.status === "draft" && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                        Draft
                      </span>
                    )}
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
