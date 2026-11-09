import { desc, eq, ne } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { courseRegistrations, enquiries } from "@/lib/db/schema";
import { ExportButton } from "@/components/dashboard/export-button";
import { COURSE_TAG } from "@/components/sections/ergonomic-course/course-data";
import { getLeadStatusResolver } from "@/lib/lead-status";

const exportCols = [
  { key: "name", label: "Candidate Name" },
  { key: "phone", label: "Phone Number" },
  { key: "email", label: "Email" },
  { key: "course", label: "Course Requested" },
  { key: "pagePath", label: "Came From Page" },
  { key: "city", label: "City" },
  { key: "state", label: "State" },
  { key: "status", label: "Status" },
  { key: "dateReceived", label: "Date Received" },
];

/** Free-course sign-ups are also written to `enquiries` (tagged COURSE_TAG, see
 * lib/free-course/db.ts), so the two lead lists are split on that tag. */
export async function LeadsTable({ freeCourse }: { freeCourse: boolean }) {
  // ponytail: no limit (a cap of 200 hid older real leads once free-course
  // sign-ups piled up); add paging if a list passes a few thousand rows.
  const [rows, leadStatus] = await Promise.all([
    db
      .select()
      .from(enquiries)
      .where(freeCourse ? eq(enquiries.course, COURSE_TAG) : ne(enquiries.course, COURSE_TAG))
      .orderBy(desc(enquiries.createdAt)),
    getLeadStatusResolver(),
  ]);
  // Free-course emails live on course_registrations; match them by phone.
  const emailByPhone = new Map<string, string>();
  if (freeCourse) {
    const regs = await db.select({ phone: courseRegistrations.phone, email: courseRegistrations.email }).from(courseRegistrations);
    for (const r of regs) if (!emailByPhone.has(r.phone)) emailByPhone.set(r.phone, r.email);
  }
  const cols = freeCourse ? exportCols : exportCols.filter((c) => c.key !== "email");
  const title = freeCourse ? "Free Course Leads" : "Callback Requests & Leads";

  // Pre-format data server-side — no functions cross the Server→Client boundary
  const exportData = rows.map((row) => ({
    name: row.name ?? "",
    phone: row.phone ?? "",
    email: emailByPhone.get(row.phone) ?? "",
    course: row.course ?? "",
    pagePath: row.pagePath ?? "",
    city: row.city ?? "",
    state: row.state ?? "",
    status: leadStatus(row),
    dateReceived: row.createdAt
      ? new Date(row.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })
      : "",
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--dash-text)]">
            {title}
          </h1>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            {freeCourse
              ? `${rows.length} free Ergonomic Safety course sign-ups`
              : `${rows.length} student enquiries recorded (free course sign-ups are under Free Course Leads)`}
          </p>
        </div>
        <ExportButton
          data={exportData}
          filename={freeCourse ? "nifs-free-course-leads" : "nifs-callbacks"}
          columns={cols}
          label="Export to Excel / CSV"
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--dash-text-muted)]">No leads yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-[var(--dash-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--dash-surface)] text-[var(--dash-text-muted)]">
              <tr>
                <th className="px-4 py-2 font-medium">Name</th>
                <th className="px-4 py-2 font-medium">Phone</th>
                {freeCourse && <th className="px-4 py-2 font-medium">Email</th>}
                <th className="px-4 py-2 font-medium">Course</th>
                <th className="px-4 py-2 font-medium">Came from</th>
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
                  {freeCourse && (
                    <td className="px-4 py-2">
                      {emailByPhone.get(row.phone) ? (
                        <a className="underline" href={`mailto:${emailByPhone.get(row.phone)}`}>{emailByPhone.get(row.phone)}</a>
                      ) : "—"}
                    </td>
                  )}
                  <td className="px-4 py-2">{row.course}</td>
                  <td className="px-4 py-2">{row.pagePath || "—"}</td>
                  <td className="px-4 py-2">{row.city || "—"}</td>
                  <td className="px-4 py-2">{row.state || "—"}</td>
                  <td className="px-4 py-2 text-[var(--dash-text-muted)]">
                    {row.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-4 py-2">
                    {leadStatus(row) === "Half-filled" && (
                      <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-700 dark:text-amber-400">
                        Draft
                      </span>
                    )}
                    {(leadStatus(row) === "Submitted later" || leadStatus(row) === "Joined free course") && (
                      <span className="whitespace-nowrap rounded-full bg-[var(--dash-surface)] px-2 py-0.5 text-[11px] font-semibold text-[var(--dash-text-muted)]">
                        {leadStatus(row)}
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
