import Image from "next/image";
import type { Recruiter } from "@/lib/data/centers";

function LogoTile({ name, logo }: Recruiter) {
  if (!logo) {
    return (
      <span className="flex h-16 shrink-0 items-center whitespace-nowrap border border-[#CC0000] px-5 text-sm font-medium text-[#CC0000]">
        {name}
      </span>
    );
  }

  return (
    <span className="relative flex h-16 w-32 shrink-0 items-center justify-center">
      <Image
        src={logo}
        alt={name}
        fill
        sizes="128px"
        className="object-contain"
      />
    </span>
  );
}

export function LogoMarquee({ items }: { items: Recruiter[] }) {
  const loop = [...items, ...items];

  return (
    <div className="group relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div className="flex w-max animate-marquee items-center gap-12 py-2 group-hover:[animation-play-state:paused]">
        {loop.map((item, i) => (
          <LogoTile key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
}
