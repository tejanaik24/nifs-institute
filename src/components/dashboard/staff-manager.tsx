"use client";

import { useState } from "react";
import { addStaffAction, deleteStaffAction } from "@/app/dashboard/admin/staff/actions";
import { UserPlus, Trash2, ShieldCheck, User } from "lucide-react";

type StaffUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
};

const FIELD =
  "w-full rounded-md border border-[var(--dash-border)] bg-white px-3 py-2 text-sm text-[var(--dash-text)] outline-none transition-colors placeholder:text-[var(--dash-text-muted)]/50 focus:border-[var(--dash-accent)] focus:ring-2 focus:ring-[var(--dash-accent-soft)]";
const LABEL = "mb-1 block text-xs font-medium text-[var(--dash-text-muted)]";

export function StaffManager({
  users,
  currentUserId,
}: {
  users: StaffUser[];
  currentUserId: number;
}) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleAddStaff(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const res = await addStaffAction(formData);
    setIsSubmitting(false);

    if (res.error) {
      setError(res.error);
    } else {
      setSuccess("New staff account created successfully.");
      form.reset();
    }
  }

  async function handleDelete(userId: number, userName: string) {
    if (!confirm(`Are you sure you want to remove ${userName || "this staff member"}? They will lose access immediately.`)) {
      return;
    }
    setError(null);
    setSuccess(null);
    const res = await deleteStaffAction(userId);
    if (res.error) {
      setError(res.error);
    } else {
      setSuccess("Staff account removed.");
    }
  }

  return (
    <div className="space-y-8">
      {error && (
        <div className="rounded-md border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-md border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-600">
          {success}
        </div>
      )}

      {/* Add Staff Box */}
      <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
        <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold text-[var(--dash-text)]">
          <UserPlus size={18} className="text-[var(--dash-accent)]" />
          Add New Staff
        </h2>

        <form onSubmit={handleAddStaff} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className={LABEL}>Full Name *</label>
            <input
              name="name"
              required
              placeholder="e.g. L. Seshagiri Rao"
              className={FIELD}
            />
          </div>
          <div>
            <label className={LABEL}>Email Address *</label>
            <input
              name="email"
              type="email"
              required
              placeholder="e.g. placements@nifsindia.net"
              className={FIELD}
            />
          </div>
          <div>
            <label className={LABEL}>Initial Password *</label>
            <input
              name="password"
              type="text"
              required
              placeholder="Password to hand over"
              className={FIELD}
            />
          </div>

          <div className="sm:col-span-3 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-md bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[var(--dash-accent-hover)] disabled:opacity-50"
            >
              <UserPlus size={16} />
              {isSubmitting ? "Creating..." : "Add Staff Account"}
            </button>
          </div>
        </form>
      </div>

      {/* Current Staff List */}
      <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
        <h2 className="mb-4 text-sm font-semibold text-[var(--dash-text)]">
          Current Team ({users.length})
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-[var(--dash-text-muted)] border-b border-[var(--dash-border)]">
              <tr>
                <th className="pb-3 font-normal">Name</th>
                <th className="pb-3 font-normal">Email</th>
                <th className="pb-3 font-normal">Role</th>
                <th className="pb-3 font-normal">Added On</th>
                <th className="pb-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => {
                const isSelf = u.id === currentUserId;
                return (
                  <tr key={u.id} className="border-b border-[var(--dash-border)] last:border-0">
                    <td className="py-3 font-medium text-[var(--dash-text)]">
                      <div className="flex items-center gap-2">
                        {u.role === "admin" ? (
                          <ShieldCheck size={16} className="text-[var(--dash-accent)]" />
                        ) : (
                          <User size={16} className="text-[var(--dash-text-muted)]" />
                        )}
                        <span>{u.name || "Unnamed"}</span>
                        {isSelf && (
                          <span className="rounded bg-black/5 px-1.5 py-0.5 text-[10px] text-[var(--dash-text-muted)]">
                            You
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-[var(--dash-text-muted)] font-mono text-xs">
                      {u.email}
                    </td>
                    <td className="py-3">
                      <span
                        className={`rounded px-2 py-0.5 font-mono text-xs ${
                          u.role === "admin"
                            ? "bg-[var(--dash-accent-soft)] text-[var(--dash-accent)] font-semibold"
                            : "bg-black/5 text-[var(--dash-text-muted)]"
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 font-mono text-xs text-[var(--dash-text-muted)]">
                      {new Date(u.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td className="py-3 text-right">
                      {!isSelf && (
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id, u.name)}
                          className="inline-flex items-center gap-1 rounded px-2.5 py-1 text-xs text-red-600 transition-colors hover:bg-red-500/10"
                        >
                          <Trash2 size={13} />
                          Remove
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
