import { accreditations, recruiters } from "@/lib/data/centers";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-14">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Approved &amp; Certified By
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {accreditations.map((a) => (
            <span key={a.name} className="text-sm font-medium text-foreground/80">
              {a.name}
            </span>
          ))}
        </div>

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Our Students Placed With
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {recruiters.map((r) => (
            <span key={r} className="text-sm font-medium text-foreground/70">
              {r}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
