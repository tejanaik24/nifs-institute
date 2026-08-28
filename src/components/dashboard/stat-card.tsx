export function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-[var(--dash-border)] bg-[var(--dash-surface)] p-5 transition-all hover:border-[var(--dash-accent)]/40 hover:shadow-[0_0_24px_-8px_var(--dash-accent)]">
      <div className="mb-1 text-xs text-[var(--dash-text-muted)]">{label}</div>
      <div className="font-mono text-2xl text-[var(--dash-text)]">{value}</div>
    </div>
  );
}
