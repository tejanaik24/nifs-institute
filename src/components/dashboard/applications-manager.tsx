"use client";

import { useState } from "react";
import Link from "next/link";
import { openApplicationAction } from "@/app/dashboard/applications/actions";
import {
  FileText,
  Phone,
  MessageCircle,
  ExternalLink,
  Eye,
  CheckCircle2,
  Clock,
  X,
  Building2,
  Briefcase,
  User,
} from "lucide-react";

type ApplicationItem = {
  id: number;
  jobId: number;
  positionId: number | null;
  applicantName: string;
  applicantPhone: string;
  resumeUrl: string | null;
  openedByUserId: number | null;
  openedAt: Date | null;
  createdAt: Date;
  jobCode: string | null;
  companyName: string | null;
  clientCompany: string | null;
  jobSlug: string | null;
  positionTitle: string | null;
  openedByName: string | null;
  openedByEmail: string | null;
};

export function ApplicationsManager({
  applications: initialApplications,
}: {
  applications: ApplicationItem[];
}) {
  const [applications, setApplications] = useState<ApplicationItem[]>(initialApplications);
  const [selectedApp, setSelectedApp] = useState<ApplicationItem | null>(null);

  async function handleSelect(app: ApplicationItem) {
    setSelectedApp(app);
    if (!app.openedByUserId) {
      const res = await openApplicationAction(app.id);
      if (res.success && res.application) {
        setSelectedApp(res.application as unknown as ApplicationItem);
        setApplications((prev) =>
          prev.map((item) =>
            item.id === app.id ? (res.application as unknown as ApplicationItem) : item
          )
        );
      }
    }
  }

  return (
    <div className="space-y-6">
      {applications.length === 0 ? (
        <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-12 text-center">
          <p className="text-sm text-[var(--dash-text-muted)]">
            No applications received yet.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)]">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-[var(--dash-border)] text-[var(--dash-text-muted)]">
              <tr>
                <th className="px-4 py-3 font-normal">Job</th>
                <th className="px-4 py-3 font-normal">Position</th>
                <th className="px-4 py-3 font-normal">Applicant</th>
                <th className="px-4 py-3 font-normal">Phone</th>
                <th className="px-4 py-3 font-normal">Resume</th>
                <th className="px-4 py-3 font-normal">Applied Date</th>
                <th className="px-4 py-3 font-normal">Status / Opened By</th>
                <th className="px-4 py-3 font-normal text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--dash-border)]">
              {applications.map((app) => {
                const isOpened = Boolean(app.openedByUserId);
                return (
                  <tr
                    key={app.id}
                    onClick={() => handleSelect(app)}
                    className="cursor-pointer transition-colors hover:bg-black/[0.02]"
                  >
                    <td className="px-4 py-3 font-medium text-[var(--dash-text)]">
                      <div className="flex flex-col">
                        <span>{app.companyName || "NIFS Job"}</span>
                        <span className="font-mono text-[11px] text-[var(--dash-accent)]">
                          {app.jobCode || `NIFS-${app.jobId}`}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-[var(--dash-text)]">
                      {app.positionTitle || <span className="text-[var(--dash-text-muted)]">General / Single</span>}
                    </td>
                    <td className="px-4 py-3 font-medium text-[var(--dash-text)]">
                      {app.applicantName}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--dash-text)]">
                      {app.applicantPhone}
                    </td>
                    <td className="px-4 py-3">
                      {app.resumeUrl ? (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1 rounded bg-black/5 px-2 py-0.5 text-xs text-[var(--dash-accent)] hover:underline"
                        >
                          <FileText size={12} />
                          Resume
                        </a>
                      ) : (
                        <span className="text-xs text-[var(--dash-text-muted)]">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--dash-text-muted)]">
                      {new Date(app.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="px-4 py-3">
                      {isOpened ? (
                        <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 text-xs text-emerald-700">
                          <CheckCircle2 size={12} />
                          {app.openedByName || "Opened"}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded bg-amber-500/15 px-2 py-0.5 text-xs font-semibold text-amber-700">
                          <Clock size={12} />
                          Not opened yet
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        className="rounded border border-[var(--dash-border)] bg-white px-2.5 py-1 text-xs font-medium text-[var(--dash-text)] hover:border-[var(--dash-accent)] hover:text-[var(--dash-accent)]"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Detail Slideover / Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="relative w-full max-w-lg rounded-xl border border-[var(--dash-border)] bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
            <button
              onClick={() => setSelectedApp(null)}
              className="absolute right-4 top-4 rounded-full p-1 text-[var(--dash-text-muted)] hover:bg-black/5 hover:text-[var(--dash-text)]"
            >
              <X size={18} />
            </button>

            <div className="mb-4 border-b border-[var(--dash-border)] pb-3">
              <span className="font-mono text-xs font-semibold text-[var(--dash-accent)]">
                {selectedApp.jobCode || `NIFS-${selectedApp.jobId}`}
              </span>
              <h2 className="text-lg font-bold text-[var(--dash-text)]">
                {selectedApp.applicantName}
              </h2>
              <p className="text-xs text-[var(--dash-text-muted)]">
                Applied for: {selectedApp.positionTitle || "General Role"} at {selectedApp.companyName}
              </p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="rounded-lg bg-[var(--dash-surface)] p-3 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--dash-text-muted)]">Phone Number</span>
                  <span className="font-mono font-medium">{selectedApp.applicantPhone}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--dash-text-muted)]">Application Date</span>
                  <span className="font-mono">
                    {new Date(selectedApp.createdAt).toLocaleString("en-IN")}
                  </span>
                </div>
                {selectedApp.clientCompany && (
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[var(--dash-text-muted)]">Client Company</span>
                    <span>{selectedApp.clientCompany}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`https://wa.me/${selectedApp.applicantPhone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 rounded-md bg-[#25D366] px-4 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle size={15} />
                  WhatsApp
                </a>
                <a
                  href={`tel:${selectedApp.applicantPhone}`}
                  className="flex items-center justify-center gap-2 rounded-md border border-[var(--dash-border)] bg-white px-4 py-2.5 text-xs font-semibold text-[var(--dash-text)] hover:bg-black/5"
                >
                  <Phone size={15} />
                  Call Candidate
                </a>
              </div>

              {selectedApp.resumeUrl && (
                <div className="pt-2">
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-md border border-[var(--dash-accent)] bg-[var(--dash-accent-soft)] px-4 py-2.5 text-xs font-semibold text-[var(--dash-accent)] hover:bg-[var(--dash-accent)] hover:text-white transition-colors"
                  >
                    <FileText size={15} />
                    View / Download Resume
                  </a>
                </div>
              )}

              {/* Audit Trail */}
              <div className="border-t border-[var(--dash-border)] pt-3 text-xs text-[var(--dash-text-muted)]">
                {selectedApp.openedByUserId ? (
                  <p>
                    ✓ First opened by{" "}
                    <span className="font-medium text-[var(--dash-text)]">
                      {selectedApp.openedByName || "Staff"}
                    </span>{" "}
                    on {new Date(selectedApp.openedAt!).toLocaleString("en-IN")}
                  </p>
                ) : (
                  <p className="text-amber-600">First recorded view will log your account.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
