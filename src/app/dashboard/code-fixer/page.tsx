"use client";

import { useState } from "react";
import { Hammer, Check, X, Loader2 } from "lucide-react";

type Proposal = { worktreePath: string; branch: string; summary: string; diff: string };

export default function CodeFixerPage() {
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [applied, setApplied] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handlePropose(e: React.FormEvent) {
    e.preventDefault();
    if (!description.trim()) return;
    setLoading(true);
    setError(null);
    setProposal(null);
    setApplied(null);
    try {
      const res = await fetch("/api/agent/code-fix/propose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to propose a fix.");
      setProposal(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    if (!proposal) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/agent/code-fix/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worktreePath: proposal.worktreePath, branch: proposal.branch }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Failed to apply.");
      setApplied(data.branch);
      setProposal(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDiscard() {
    if (!proposal) return;
    setLoading(true);
    try {
      await fetch("/api/agent/code-fix/discard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ worktreePath: proposal.worktreePath, branch: proposal.branch }),
      });
      setProposal(null);
      setDescription("");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg text-[var(--dash-text)]">Code Fixer</h1>
        <p className="mt-1 text-sm text-[var(--dash-text-muted)]">
          Describe a bug. The agent proposes a fix on an isolated branch — nothing changes until you click Apply, and it never deploys on its own.
        </p>
      </div>

      <form onSubmit={handlePropose} className="space-y-3 rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g. The mobile menu doesn't close after clicking a link"
          rows={3}
          className="w-full resize-none rounded-lg border border-[var(--dash-border)] bg-[var(--dash-bg)] px-4 py-2.5 text-sm text-[var(--dash-text)] placeholder:text-[var(--dash-text-muted)] focus:border-[var(--dash-accent)]/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !description.trim()}
          className="flex items-center gap-2 rounded-lg bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-[var(--dash-bg)] transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {loading && !proposal ? <Loader2 size={14} className="animate-spin" /> : <Hammer size={14} />}
          Find a fix
        </button>
      </form>

      {error && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-4 text-sm text-red-400">{error}</div>
      )}

      {proposal && (
        <div className="space-y-3 rounded-xl border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5">
          <p className="text-sm text-[var(--dash-text)]">{proposal.summary}</p>
          <pre className="max-h-96 overflow-auto rounded-lg bg-black/30 p-4 font-mono text-xs text-[var(--dash-text-muted)]">
            {proposal.diff || "(no file changes detected)"}
          </pre>
          <div className="flex gap-2">
            <button
              onClick={handleApply}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg bg-[var(--dash-accent)] px-4 py-2 text-sm font-medium text-[var(--dash-bg)] hover:opacity-90 disabled:opacity-40"
            >
              <Check size={14} /> Apply
            </button>
            <button
              onClick={handleDiscard}
              disabled={loading}
              className="flex items-center gap-2 rounded-lg border border-[var(--dash-border)] px-4 py-2 text-sm text-[var(--dash-text-muted)] hover:text-[var(--dash-text)] disabled:opacity-40"
            >
              <X size={14} /> Discard
            </button>
          </div>
        </div>
      )}

      {applied && (
        <div className="rounded-xl border border-[var(--dash-accent)]/30 bg-[var(--dash-accent)]/5 p-4 text-sm text-[var(--dash-text)]">
          Saved to branch <code className="font-mono">{applied}</code> — not live yet. Merge it into main and deploy the normal way when you&apos;re ready.
        </div>
      )}
    </div>
  );
}
