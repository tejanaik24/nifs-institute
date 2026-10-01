"use client";

import type { SessionPayload } from "@/lib/auth/session";
import {
  BarChart3,
  Bot,
  Briefcase,
  Building2,
  ExternalLink,
  FileText,
  GraduationCap,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  PhoneCall,
  ShieldCheck,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STAFF_NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard Home", icon: LayoutDashboard },
  { href: "/dashboard/enquiries", label: "Callbacks & Leads", icon: PhoneCall },
  { href: "/dashboard/center-applications", label: "Center Proposals", icon: Building2 },
  { href: "/dashboard/course-exams", label: "Course Certificates", icon: GraduationCap },
  { href: "/dashboard/jobs", label: "Job Postings", icon: Briefcase },
  { href: "/dashboard/applications", label: "Job Applications", icon: Inbox },
  { href: "/dashboard/placement-leads", label: "Placement Leads", icon: Users },
  { href: "/dashboard/analytics", label: "Visitor Traffic & Stats", icon: BarChart3 },
];

const ADMIN_NAV_ITEMS = [
  { href: "/dashboard/content", label: "Articles & Blog", icon: FileText },
  { href: "/dashboard/admin/staff", label: "Staff & Admins", icon: Users },
  { href: "/dashboard/agent", label: "AI Assistant", icon: Bot },
];

export function Sidebar({ user }: { user?: SessionPayload | null }) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";

  const navItems = [...STAFF_NAV_ITEMS, ...(isAdmin ? ADMIN_NAV_ITEMS : [])];

  return (
    <nav className="flex h-full w-60 flex-col border-r border-[var(--dash-border)] bg-[var(--dash-surface)] p-4 shadow-sm">
      {/* Brand & Website Home Link (Clicking logo goes to Website Homepage) */}
      <Link
        href="/"
        title="Go to Website Homepage"
        className="group mb-3 flex items-center gap-2.5 rounded-xl border border-transparent p-2 transition-all hover:border-[var(--dash-border)] hover:bg-black/5"
      >
        <img
          src="/images/nifs-official-logo-v3.png"
          alt="NIFS India"
          width={38}
          height={38}
          className="h-9 w-9 object-contain drop-shadow-sm transition-transform group-hover:scale-105"
          loading="eager"
        />
        <div className="flex flex-col leading-tight">
          <span className="text-sm font-bold tracking-tight text-[var(--dash-text)] group-hover:text-[#DC1711]">
            NIFS India
          </span>
          <span className="text-[10px] font-medium tracking-wider uppercase text-[var(--dash-text-muted)]">
            Dashboard
          </span>
        </div>
      </Link>

      {/* Quick "View Website" Home Button */}
      <Link
        href="/"
        target="_blank"
        rel="noopener noreferrer"
        title="Open NIFS Website Homepage in new tab"
        className="mb-4 flex items-center justify-between rounded-lg border border-[var(--dash-border)] bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm transition-all hover:border-[#DC1711] hover:bg-red-50 hover:text-[#DC1711]"
      >
        <div className="flex items-center gap-2">
          <Home size={14} className="text-[#DC1711]" />
          <span>View Website Home</span>
        </div>
        <ExternalLink size={12} className="opacity-60" />
      </Link>

      {/* Navigation Section */}
      <div className="flex-1 space-y-0.5">
        <p className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-[var(--dash-text-muted)]">
          Navigation
        </p>
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-[var(--dash-accent-soft)] font-semibold text-[var(--dash-accent)] shadow-xs"
                  : "text-[var(--dash-text-muted)] hover:bg-black/5 hover:text-[var(--dash-text)]"
              }`}
            >
              <Icon size={16} />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Account & Logout */}
      <div className="mt-auto border-t border-[var(--dash-border)] pt-3">
        {user?.name && (
          <div className="mb-2 rounded-lg bg-stone-50 border border-stone-200/80 px-3 py-2">
            <div className="flex items-center justify-between">
              <span className="truncate text-xs font-bold text-[var(--dash-text)]">
                {user.name}
              </span>
              {isAdmin && (
                <span className="inline-flex items-center gap-1 rounded bg-[var(--dash-accent-soft)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--dash-accent)]">
                  <ShieldCheck size={10} />
                  admin
                </span>
              )}
            </div>
            {user?.email && (
              <p className="truncate text-[10px] text-[var(--dash-text-muted)] mt-0.5">
                {user.email}
              </p>
            )}
          </div>
        )}
        <form action="/logout" method="post">
          <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-[var(--dash-text-muted)] transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer">
            <LogOut size={15} />
            <span>Sign out</span>
          </button>
        </form>
      </div>
    </nav>
  );
}

