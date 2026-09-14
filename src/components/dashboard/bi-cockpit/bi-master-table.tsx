"use client";

import { ExternalLink, Link2, PhoneCall, Search, Table } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export type MasterRecord = {
  id: number;
  name: string;
  phone: string;
  course: string;
  city?: string;
  type: "enquiry" | "job";
  status: string;
  dateStr: string;
};

interface BIMasterTableProps {
  records: MasterRecord[];
  totalCount: number;
}

export function BIMasterTable({ records, totalCount }: BIMasterTableProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = useMemo(() => {
    return records.filter((r) => {
      const term = searchTerm.toLowerCase();
      return (
        r.name.toLowerCase().includes(term) ||
        r.course.toLowerCase().includes(term) ||
        (r.city && r.city.toLowerCase().includes(term))
      );
    });
  }, [records, searchTerm]);

  return (
    <div className="flex flex-col h-full rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] shadow-xs overflow-hidden">
      {/* Table Main Header (PowerBI Indigo Theme) */}
      <div className="bg-indigo-950/80 dark:bg-indigo-950 px-4 py-3 border-b border-indigo-900/50 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <Table size={16} className="text-indigo-300" />
          <h3 className="text-xs font-black uppercase tracking-wider text-white">
            Master Action Matrix • Inquiries & Drives
          </h3>
          <span className="text-[10px] font-bold text-indigo-300 bg-indigo-900/40 px-2 py-0.5 rounded border border-indigo-700/40">
            {totalCount} Total
          </span>
        </div>

        {/* Search input inside table header */}
        <div className="relative min-w-[220px]">
          <Search
            size={13}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-indigo-300"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search lead, course or city..."
            className="w-full rounded-lg border border-indigo-700/50 bg-indigo-900/40 pl-8 pr-3 py-1 text-xs text-white placeholder:text-indigo-300 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto overflow-y-auto max-h-[340px] flex-1">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-indigo-900/30 text-[10px] font-black uppercase tracking-wider text-[var(--dash-text-muted)] sticky top-0 backdrop-blur-xs z-10 border-b border-[var(--dash-border)]">
            <tr>
              <th className="py-2.5 px-3">Lead / Candidate Name</th>
              <th className="py-2.5 px-2 text-center">Action</th>
              <th className="py-2.5 px-3">Course / Role</th>
              <th className="py-2.5 px-3">Feeder City</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--dash-border)]">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="py-12 text-center text-xs text-[var(--dash-text-muted)]"
                >
                  No records matching "{searchTerm}"
                </td>
              </tr>
            ) : (
              filtered.map((row) => {
                const cleanPhone = row.phone.replace(/[^0-9]/g, "");
                const waPhone = cleanPhone.startsWith("91")
                  ? cleanPhone
                  : `91${cleanPhone}`;
                const waUrl = `https://wa.me/${waPhone}`;

                return (
                  <tr
                    key={`${row.type}-${row.id}`}
                    className="hover:bg-indigo-500/5 transition-colors group"
                  >
                    {/* Name */}
                    <td className="py-2.5 px-3 font-bold text-[var(--dash-text)] text-xs">
                      {row.name}
                    </td>

                    {/* Action 🔗 Icon Link (matching reference blue link icon) */}
                    <td className="py-2.5 px-2 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <a
                          href={`tel:+91${cleanPhone}`}
                          className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                          title={`Call ${row.phone}`}
                        >
                          <PhoneCall size={12} />
                        </a>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center h-6 w-6 rounded-md bg-blue-500/10 text-blue-600 dark:text-blue-400 hover:bg-blue-500/20 transition-colors"
                          title="WhatsApp Chat"
                        >
                          <Link2 size={12} />
                        </a>
                      </div>
                    </td>

                    {/* Course / Program */}
                    <td className="py-2.5 px-3">
                      <span className="font-medium text-[var(--dash-text)] bg-[var(--dash-bg)] px-2 py-0.5 rounded border border-[var(--dash-border)] text-xs">
                        {row.course || "General Safety Admissions"}
                      </span>
                    </td>

                    {/* Center / Feeder City */}
                    <td className="py-2.5 px-3 font-medium text-[var(--dash-text-muted)] text-xs">
                      {row.city || "Visakhapatnam"}
                    </td>

                    {/* Date */}
                    <td className="py-2.5 px-3 font-mono text-[11px] text-[var(--dash-text-muted)]">
                      {row.dateStr}
                    </td>

                    {/* Status Pill */}
                    <td className="py-2.5 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          row.status === "Pending Call"
                            ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                            : "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer view all link */}
      <div className="bg-indigo-950/40 px-4 py-2.5 border-t border-[var(--dash-border)] flex items-center justify-between text-xs text-[var(--dash-text-muted)]">
        <span>Displaying latest real-time admissions and candidate leads</span>
        <Link
          href="/dashboard/enquiries"
          className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
        >
          <span>View All Enquiries</span>
          <ExternalLink size={12} />
        </Link>
      </div>
    </div>
  );
}
