import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { placementLeads as t } from "@/lib/db/schema";
import { ExportButton } from "@/components/dashboard/export-button";

const exportCols = [
  { key: "name", label: "Candidate Name" },
  { key: "dob", label: "Date of Birth" },
  { key: "phone", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "location", label: "Location" },
  { key: "submittedDate", label: "Submitted Date" },
];

export default async function PlacementLeadsPage() {
  const rows = await db.select().from(t).orderBy(desc(t.createdAt));

  // Pre-format data server-side — no functions cross the Server→Client boundary
  const exportData = rows.map((r) => ({
    name: r.name ?? "",
    dob: r.dob ? r.dob.split("-").reverse().join("/") : "",
    phone: r.phone ?? "",
    email: r.email ?? "",
    location: r.location ?? "",
    submittedDate: r.createdAt
      ? new Date(r.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "",
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--dash-text)]">
            Placement Leads
          </h1>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            {rows.length} candidates registered for career placements
          </p>
        </div>
        <ExportButton
          data={exportData}
          filename="nifs-placement-leads"
          columns={exportCols}
          label="Export to Excel / CSV"
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--dash-text-muted)]">No submissions yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-[var(--dash-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--dash-surface)] text-[var(--dash-text-muted)]">
              <tr>
                {["Name", "DOB", "Mobile", "Email", "Location", "Submitted"].map((h) => (
                  <th key={h} className="px-4 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[var(--dash-border)] align-top">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2">{r.dob.split("-").reverse().join("/")}</td>
                  <td className="px-4 py-2"><a className="underline" href={`tel:+91${r.phone}`}>{r.phone}</a></td>
                  <td className="px-4 py-2"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td className="px-4 py-2">{r.location}</td>
                  <td className="px-4 py-2 text-[var(--dash-text-muted)]">
                    {new Date(r.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
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
