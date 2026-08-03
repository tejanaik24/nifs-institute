import { updatesTabs } from "@/lib/data/updates-tabs";

export function UrgencyBar() {
  const loop = [...updatesTabs.updates, ...updatesTabs.updates];

  return (
    <div className="fixed inset-x-0 top-0 z-[60] h-9 overflow-hidden bg-primary text-white [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]">
      <div className="flex h-9 w-max animate-marquee items-center gap-16 text-xs font-medium tracking-wide whitespace-nowrap md:text-sm">
        {loop.map((text, i) => (
          <span key={i} className="flex items-center gap-2">
            🔥 {text}
          </span>
        ))}
      </div>
    </div>
  );
}
