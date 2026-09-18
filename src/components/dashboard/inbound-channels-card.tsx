"use client";

import { ArrowRight, FileText, Mail, MessageSquare, PhoneCall, Share2 } from "lucide-react";
import Link from "next/link";

interface InboundChannelsCardProps {
  whatsappCount: number;
  instagramCount?: number;
  websiteEnquiriesCount: number;
  emailApplicationsCount: number;
}

function InstagramIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

export function InboundChannelsCard({
  whatsappCount,
  instagramCount = 185,
  websiteEnquiriesCount,
  emailApplicationsCount,
}: InboundChannelsCardProps) {
  const totalInbound =
    whatsappCount + instagramCount + websiteEnquiriesCount + emailApplicationsCount;

  return (
    <div className="rounded-2xl border border-[var(--dash-border)] bg-[var(--dash-card)] p-5 sm:p-6 shadow-xs">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-4 border-b border-[var(--dash-border)]">
        <div>
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-indigo-500/10 p-2 text-indigo-600 dark:text-indigo-400">
              <MessageSquare size={18} />
            </div>
            <h3 className="text-base sm:text-lg font-black text-[var(--dash-text)]">
              Where Did Students Contact Us?
            </h3>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              {totalInbound.toLocaleString()} Total Inbound Touches
            </span>
          </div>
          <p className="text-xs text-[var(--dash-text-muted)] mt-0.5">
            4 active student channels: WhatsApp chats, Instagram social, website callbacks & email resumes.
          </p>
        </div>

        <span className="text-[11px] font-semibold text-[var(--dash-text-muted)]">
          28-Day Telemetry
        </span>
      </div>

      {/* 4 Inbound Channel Grid */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. WhatsApp Inquiries */}
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 flex flex-col justify-between hover:border-emerald-500/60 transition-all group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <MessageSquare size={16} />
                </div>
                <span className="font-extrabold text-xs text-[var(--dash-text)]">
                  WhatsApp
                </span>
              </div>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                #1 Channel
              </span>
            </div>

            <div className="mt-3">
              <div className="font-mono text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400">
                {whatsappCount.toLocaleString()}
              </div>
              <div className="text-[11px] font-semibold text-[var(--dash-text)] mt-0.5">
                Direct Student Chats
              </div>
              <p className="text-[10px] text-[var(--dash-text-muted)] mt-1 leading-relaxed">
                From website WhatsApp buttons, Priya chatbot redirects & course syllabus CTAs.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/918374340999"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400 group-hover:underline pt-2 border-t border-emerald-500/20"
          >
            <span>Open WhatsApp Hub</span>
            <ArrowRight size={12} />
          </a>
        </div>

        {/* 2. Instagram & Social */}
        <div className="rounded-xl border border-purple-500/30 bg-purple-500/5 p-4 flex flex-col justify-between hover:border-purple-500/60 transition-all group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-purple-500/15 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <InstagramIcon size={16} />
                </div>
                <span className="font-extrabold text-xs text-[var(--dash-text)]">
                  Instagram
                </span>
              </div>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-700 dark:text-purple-300">
                Social Reach
              </span>
            </div>

            <div className="mt-3">
              <div className="font-mono text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400">
                {instagramCount.toLocaleString()}
              </div>
              <div className="text-[11px] font-semibold text-[var(--dash-text)] mt-0.5">
                Social Inbound Visits
              </div>
              <p className="text-[10px] text-[var(--dash-text-muted)] mt-1 leading-relaxed">
                Students visiting via Instagram bio links, reels, placement carousels & posts.
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/iron_prince_official/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-between text-xs font-bold text-purple-600 dark:text-purple-400 group-hover:underline pt-2 border-t border-purple-500/20"
          >
            <span>View Social Profile</span>
            <ArrowRight size={12} />
          </a>
        </div>

        {/* 3. Website Callback Forms */}
        <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 flex flex-col justify-between hover:border-amber-500/60 transition-all group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <PhoneCall size={16} />
                </div>
                <span className="font-extrabold text-xs text-[var(--dash-text)]">
                  Website Leads
                </span>
              </div>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-700 dark:text-amber-300">
                Direct Calls
              </span>
            </div>

            <div className="mt-3">
              <div className="font-mono text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400">
                {websiteEnquiriesCount}
              </div>
              <div className="text-[11px] font-semibold text-[var(--dash-text)] mt-0.5">
                Callback Requests
              </div>
              <p className="text-[10px] text-[var(--dash-text-muted)] mt-1 leading-relaxed">
                Prospective students who filled out the admission form awaiting phone counseling.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/enquiries"
            className="mt-4 inline-flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:underline pt-2 border-t border-amber-500/20"
          >
            <span>Call Waiting Leads</span>
            <ArrowRight size={12} />
          </Link>
        </div>

        {/* 4. Email & Placement Resumes */}
        <div className="rounded-xl border border-blue-500/30 bg-blue-500/5 p-4 flex flex-col justify-between hover:border-blue-500/60 transition-all group">
          <div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <FileText size={16} />
                </div>
                <span className="font-extrabold text-xs text-[var(--dash-text)]">
                  Email & Resumes
                </span>
              </div>
              <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-700 dark:text-blue-300">
                Job Drives
              </span>
            </div>

            <div className="mt-3">
              <div className="font-mono text-2xl sm:text-3xl font-black text-blue-600 dark:text-blue-400">
                {emailApplicationsCount}
              </div>
              <div className="text-[11px] font-semibold text-[var(--dash-text)] mt-0.5">
                Resumes & Inquiries
              </div>
              <p className="text-[10px] text-[var(--dash-text-muted)] mt-1 leading-relaxed">
                Candidate applications received from company recruitment flyers and emails.
              </p>
            </div>
          </div>

          <Link
            href="/dashboard/applications"
            className="mt-4 inline-flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:underline pt-2 border-t border-blue-500/20"
          >
            <span>Review Resumes</span>
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
