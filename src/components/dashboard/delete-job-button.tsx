"use client";

import { useState } from "react";
import { deleteJobAction } from "@/app/dashboard/jobs/actions";
import { Trash2 } from "lucide-react";

export function DeleteJobButton({ id, companyName }: { id: number; companyName: string }) {
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    if (!confirm(`Delete the "${companyName}" job posting? This cannot be undone.`)) return;
    setDeleting(true);
    await deleteJobAction(id);
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={deleting}
      className="inline-flex items-center gap-1 rounded border border-red-300 bg-white px-2.5 py-1 text-xs font-medium text-red-600 hover:border-red-500 hover:bg-red-50 disabled:opacity-50"
    >
      <Trash2 size={12} />
      {deleting ? "Deleting..." : "Delete"}
    </button>
  );
}
