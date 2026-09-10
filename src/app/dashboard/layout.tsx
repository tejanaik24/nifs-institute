import { Sidebar } from "@/components/dashboard/sidebar";
import { getSession } from "@/lib/auth/session";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen bg-[var(--dash-bg)] text-[var(--dash-text)]">
      <Sidebar user={session} />
      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}
