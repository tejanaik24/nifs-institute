"use client";

import { CheckCircle2, MessageSquare, PhoneCall, User } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";

export type EnquiryRecord = {
  id: number;
  name: string;
  phone: string;
  course: string;
  createdAt: string | Date;
};

interface ImmediateActionCenterProps {
  enquiries: EnquiryRecord[];
  totalCount: number;
}

function getRelativeTime(dateInput: string | Date): {
  label: string;
  isRecent: boolean;
} {
  const date = typeof dateInput === "string" ? new Date(dateInput) : dateInput;
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return { label: "Just now", isRecent: true };
  if (diffMinutes < 60) return { label: `${diffMinutes}m ago`, isRecent: true };
  if (diffHours < 24) return { label: `${diffHours}h ago`, isRecent: true };
  if (diffDays === 1) return { label: "Yesterday", isRecent: false };
  return { label: `${diffDays}d ago`, isRecent: false };
}

function cleanPhoneNumber(raw: string): string {
  return raw.replace(/[^0-9]/g, "");
}

export function ImmediateActionCenter({
  enquiries,
  totalCount,
}: ImmediateActionCenterProps) {
  const formattedEnquiries = useMemo(() => {
    return enquiries.map((enq) => {
      const timeInfo = getRelativeTime(enq.createdAt);
      const cleanPhone = cleanPhoneNumber(enq.phone);
      const internationalPhone = cleanPhone.startsWith("91")
        ? cleanPhone
        : `91${cleanPhone}`;
      const waText = encodeURIComponent(
        `Hello ${enq.name}, this is from NIFS India Admissions team regarding your enquiry for ${enq.course || "Safety Courses"}. How can we assist you today?`,
      );
      const waUrl = `https://wa.me/${internationalPhone}?text=${waText}`;

      return {
        ...enq,
        timeInfo,
        cleanPhone,
        waUrl,
      };
    });
  }, [enquiries]);

  return (
    <div className="rounded-2xl border-2 border-emerald-500/20 bg-[var(--dash-card)] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-[var(--dash-border)]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h2 className="text-base sm:text-lg font-bold text-[var(--dash-text)] flex items-center gap-2">
              <span>Immediate Action Center</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                {totalCount} Awaiting Call
              </span>
            </h2>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            Real student callback leads. One-click direct calling & WhatsApp
            outreach.
          </p>
        </div>

        <Link
          href="/dashboard/enquiries"
          className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[var(--dash-accent)] hover:underline"
        >
          View all {totalCount} leads →
        </Link>
      </div>

      {/* Leads List */}
      {formattedEnquiries.length === 0 ? (
        <div className="py-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
            <CheckCircle2 size={24} />
          </div>
          <p className="text-sm font-semibold text-[var(--dash-text)]">
            All caught up!
          </p>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            Zero pending callbacks waiting right now.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-[var(--dash-border)] mt-2">
          {formattedEnquiries.map((lead) => (
            <div
              key={lead.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[var(--dash-bg)]/50 rounded-xl px-2 transition-colors"
            >
              {/* Lead Info */}
              <div className="flex items-start gap-3">
                <div className="h-9 w-9 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  {lead.name.charAt(0).toUpperCase() || <User size={14} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[var(--dash-text)]">
                      {lead.name}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        lead.timeInfo.isRecent
                          ? "bg-red-500/10 text-red-600 dark:text-red-400 animate-pulse"
                          : "bg-[var(--dash-bg)] text-[var(--dash-text-muted)] border border-[var(--dash-border)]"
                      }`}
                    >
                      {lead.timeInfo.label}
                    </span>
                  </div>
                  <div className="text-xs text-[var(--dash-text-muted)] mt-0.5 flex flex-wrap items-center gap-1.5">
                    <span>Interested in:</span>
                    <span className="font-semibold text-[var(--dash-text)] bg-[var(--dash-bg)] px-2 py-0.5 rounded-md border border-[var(--dash-border)]">
                      {lead.course || "General Safety Admissions"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pl-12 sm:pl-0">
                {/* Big Green Click-to-Call */}
                <a
                  href={`tel:+91${lead.cleanPhone}`}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-3.5 py-2 text-xs font-bold shadow-xs transition-all"
                >
                  <PhoneCall size={14} />
                  <span>Call {lead.phone}</span>
                </a>

                {/* WhatsApp Quick Reach */}
                <a
                  href={lead.waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-xl border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-3 py-2 text-xs font-semibold transition-colors"
                  title="Chat on WhatsApp"
                >
                  <MessageSquare size={13} />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
