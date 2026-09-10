import { desc } from "drizzle-orm";
import { db } from "@/lib/db/client";
import { enquiries } from "@/lib/db/schema";

export default async function EnquiriesPage() {
  const rows = await db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(200);

  return (
    <div>
      <h1 className="mb-6 text-lg font-semibold">Callback Requests</h1>
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
                <th className="px-4 py-2 font-medium">Received</th>
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
                  <td className="px-4 py-2 text-[var(--dash-text-muted)]">
                    {row.createdAt.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" })}
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
