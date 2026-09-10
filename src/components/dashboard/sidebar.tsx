"use client";

import type { SessionPayload } from "@/lib/auth/session";
import {
  BarChart3,
  Bot,
  Briefcase,
  FileText,
  Inbox,
  LayoutDashboard,
  PhoneCall,
  ShieldCheck,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STAFF_NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/enquiries", label: "Callbacks", icon: PhoneCall },
  { href: "/dashboard/jobs", label: "Jobs", icon: Briefcase },
  { href: "/dashboard/applications", label: "Applications", icon: Inbox },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
];

const ADMIN_NAV_ITEMS = [
  { href: "/dashboard/content", label: "Content", icon: FileText },
  { href: "/dashboard/admin/staff", label: "Staff", icon: Users },
  { href: "/dashboard/agent", label: "Agent", icon: Bot },
];

export function Sidebar({ user }: { user?: SessionPayload | null }) {
  const pathname = usePathname();
  const isAdmin = user?.role === "admin";

  const navItems = [...STAFF_NAV_ITEMS, ...(isAdmin ? ADMIN_NAV_ITEMS : [])];

  return (
    <nav className="flex h-full w-56 flex-col border-r border-[var(--dash-border)] bg-[var(--dash-surface)] p-4">
      <div className="mb-8 flex items-center gap-2 px-2">
        <Image
          src="/images/nifs-logo-dashboard.png"
          alt="NIFS"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
        />
        <span className="text-sm font-bold tracking-wide text-[var(--dash-text-muted)]">
          Dashboard
        </span>
      </div>

      <div className="flex-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`mb-1 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                active
                  ? "bg-[var(--dash-accent-soft)] font-medium text-[var(--dash-accent)]"
                  : "text-[var(--dash-text-muted)] hover:bg-black/5 hover:text-[var(--dash-text)]"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </div>

      <div className="mt-auto border-t border-[var(--dash-border)] pt-3">
        {user?.name && (
          <div className="mb-2 px-3 py-1">
            <div className="flex items-center justify-between">
              <span className="truncate text-xs font-semibold text-[var(--dash-text)]">
                {user.name}
              </span>
              {isAdmin && (
                <span className="inline-flex items-center gap-0.5 rounded bg-[var(--dash-accent-soft)] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[var(--dash-accent)]">
                  <ShieldCheck size={10} />
                  admin
                </span>
              )}
            </div>
          </div>
        )}
        <form action="/logout" method="post">
          <button className="w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--dash-text-muted)] transition-colors hover:bg-black/5 hover:text-[var(--dash-text)]">
            Sign out
          </button>
        </form>
      </div>
    </nav>
  );
}
