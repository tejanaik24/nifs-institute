import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/session";
import { getAllUsers } from "@/lib/db/users";
import { StaffManager } from "@/components/dashboard/staff-manager";

export default async function AdminStaffPage() {
  const session = await getSession();
  if (session?.role !== "admin") {
    redirect("/dashboard");
  }

  const usersList = await getAllUsers();

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-lg font-semibold">Staff Management</h1>
        <p className="text-sm text-[var(--dash-text-muted)]">
          Manage staff accounts who have access to the NIFS dashboard.
        </p>
      </div>

      <StaffManager users={usersList} currentUserId={session.userId} />
    </div>
  );
}
