import Link from "next/link";
import { LayoutDashboard, FileText, BarChart3, Bot } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/content", label: "Content", icon: FileText },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/agent", label: "Agent", icon: Bot },
];

export function Sidebar() {
  return (
    <nav className="flex h-full w-56 flex-col border-r border-[var(--dash-border)] bg-[var(--dash-surface)] p-4">
      <div className="mb-8 px-2 font-mono text-sm tracking-wide text-[var(--dash-text)]">
        NIFS DASHBOARD
      </div>
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="mb-1 flex items-center gap-2 rounded-md px-3 py-2 text-sm text-[var(--dash-text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--dash-text)]"
        >
          <Icon size={16} />
          {label}
        </Link>
      ))}
      <form action="/logout" method="post" className="mt-auto">
        <button className="w-full rounded-md px-3 py-2 text-left text-sm text-[var(--dash-text-muted)] transition-colors hover:bg-white/5 hover:text-[var(--dash-text)]">
          Sign out
        </button>
      </form>
    </nav>
  );
}
