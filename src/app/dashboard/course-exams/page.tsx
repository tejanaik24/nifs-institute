import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { courseRegistrations as t, courseSuggestions } from "@/lib/db/schema";
import { markCertificateSent } from "./actions";
import { ExportButton } from "@/components/dashboard/export-button";

const fmt = (d: Date | null) => (d ? d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "—");

const exportCols = [
  { key: "name", label: "Candidate Name" },
  { key: "phone", label: "Mobile" },
  { key: "email", label: "Email" },
  { key: "certificateId", label: "Certificate ID" },
  { key: "examStatus", label: "Exam Status" },
  { key: "score", label: "Score" },
  { key: "certificateStatus", label: "Certificate Status" },
  { key: "registeredDate", label: "Registered Date" },
];

export default async function CourseExamsPage() {
  const rows = await db.select().from(t).orderBy(desc(t.createdAt));
  const suggestions = await db
    .select({ id: courseSuggestions.id, message: courseSuggestions.message, createdAt: courseSuggestions.createdAt, name: t.name, phone: t.phone, email: t.email })
    .from(courseSuggestions)
    .innerJoin(t, eq(courseSuggestions.registrationId, t.id))
    .orderBy(desc(courseSuggestions.createdAt));
  const waiting = rows.filter((r) => r.examSubmittedAt && !r.certificateSentAt).length;

  // Pre-format data server-side — no functions cross the Server→Client boundary
  const exportData = rows.map((r) => ({
    name: r.name ?? "",
    phone: r.phone ?? "",
    email: r.email ?? "",
    certificateId: `NIFS-ES-${String(r.id).padStart(5, "0")}`,
    examStatus: r.examSubmittedAt ? "Completed" : r.examStartedAt ? "In Progress" : "Registered",
    score: r.score != null ? `${r.score} / 20` : "",
    certificateStatus: r.certificateSentAt ? `Sent on ${fmt(r.certificateSentAt)}` : "Pending Dispatch",
    registeredDate: r.createdAt ? fmt(r.createdAt) : "",
  }));

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-[var(--dash-text)]">
            Course Exams &amp; Certificates: Ergonomic Safety
          </h1>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            {rows.length} registered candidates · <strong className="text-amber-700">{waiting} certificate{waiting === 1 ? "" : "s"} waiting to be dispatched</strong>
          </p>
        </div>
        <ExportButton
          data={exportData}
          filename="nifs-course-certificates"
          columns={exportCols}
          label="Export to Excel / CSV"
        />
      </div>

      {rows.length === 0 ? (
        <p className="text-sm text-[var(--dash-text-muted)]">No registrations yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-md border border-[var(--dash-border)]">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--dash-surface)] text-[var(--dash-text-muted)]">
              <tr>
                {["Name", "Mobile", "Email", "Assignment", "Exam", "Score", "Certificate"].map((h) => (
                  <th key={h} className="px-4 py-2 font-medium">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-[var(--dash-border)] align-top">
                  <td className="px-4 py-2">{r.name}</td>
                  <td className="px-4 py-2"><a className="underline" href={`tel:+91${r.phone}`}>{r.phone}</a></td>
                  <td className="px-4 py-2"><a className="underline" href={`mailto:${r.email}`}>{r.email}</a></td>
                  <td className="px-4 py-2">{r.assignmentAt ? "Submitted" : "—"}</td>
                  <td className="px-4 py-2 text-[var(--dash-text-muted)]">{r.examSubmittedAt ? fmt(r.examSubmittedAt) : r.examStartedAt ? "In progress" : "—"}</td>
                  <td className="px-4 py-2">{r.score != null ? `${r.score}/20` : "—"}</td>
                  <td className="px-4 py-2">
                    {!r.examSubmittedAt ? (
                      "—"
                    ) : (
                      <div className="flex flex-wrap items-center gap-3">
                        <a className="underline" href={`/dashboard/course-exams/${r.id}/certificate`} target="_blank" rel="noopener noreferrer">Print certificate</a>
                        {r.certificateSentAt ? (
                          <span className="text-xs text-[var(--dash-text-muted)]">Sent {fmt(r.certificateSentAt)}</span>
                        ) : (
                          <form action={markCertificateSent}>
                            <input type="hidden" name="id" value={r.id} />
                            <button className="rounded border border-[var(--dash-border)] px-2 py-0.5 text-xs hover:bg-[var(--dash-surface)]">Mark sent</button>
                          </form>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="mb-3 mt-12 text-lg font-semibold">Suggestion box ({suggestions.length})</h2>
      {suggestions.length === 0 ? (
        <p className="text-sm text-[var(--dash-text-muted)]">No suggestions yet.</p>
      ) : (
        <ul className="space-y-3">
          {suggestions.map((g) => (
            <li key={g.id} className="rounded-md border border-[var(--dash-border)] p-4">
              <p className="whitespace-pre-wrap text-sm">{g.message}</p>
              <p className="mt-2 text-xs text-[var(--dash-text-muted)]">
                {g.name} · <a className="underline" href={`tel:+91${g.phone}`}>{g.phone}</a> · <a className="underline" href={`mailto:${g.email}`}>{g.email}</a> · {fmt(g.createdAt)}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
