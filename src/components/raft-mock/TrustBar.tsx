import Image from "next/image";
import { recruiterLogos } from "@/lib/data/centers";

export function TrustBar() {
  const track = (
    <div className="flex shrink-0 items-center gap-14 pr-14">
      {recruiterLogos.map((r) => (
        <div key={r.name} className="relative h-8 w-28 shrink-0 grayscale transition-[filter] duration-300 hover:grayscale-0">
          <Image src={r.logo!} alt={r.name} fill className="object-contain" sizes="112px" />
        </div>
      ))}
    </div>
  );

  return (
    <section className="border-y border-border bg-white py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="mb-6 text-center text-xs font-medium tracking-[0.15em] text-muted-foreground uppercase">
          Our graduates are placed at
        </p>
        <div
          className="group flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div className="animate-marquee flex group-hover:[animation-play-state:paused]">
            {track}
            {track}
          </div>
        </div>
      </div>
    </section>
  );
}
