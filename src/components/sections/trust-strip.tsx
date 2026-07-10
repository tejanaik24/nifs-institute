import { accreditationLogos, recruiterLogos } from "@/lib/data/centers";
import { LogoMarquee } from "@/components/sections/logo-marquee";

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-muted/40 py-14">
      <div className="mx-auto max-w-7xl lg:px-10">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Approved &amp; Certified By
        </p>
        <div className="mt-6">
          <LogoMarquee items={accreditationLogos} />
        </div>

        <p className="mt-12 text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Our Students Placed With
        </p>
        <div className="mt-6">
          <LogoMarquee items={recruiterLogos} />
        </div>
      </div>
    </section>
  );
}
