import Link from "next/link";

// Sister centres shown under the answer box (Bot Desk 302/305: Mumbai pages
// cross-link, weak centres get links from their neighbours).
const NEARBY: Record<string, { name: string; href: string }[]> = {
  "borivali-w-mumbai": [
    { name: "NIFS Thane", href: "/centers/thane/" },
    { name: "NIFS Vashi", href: "/centers/vashi-navi-mumbai/" },
  ],
  thane: [
    { name: "NIFS Borivali", href: "/centers/borivali-w-mumbai/" },
    { name: "NIFS Vashi", href: "/centers/vashi-navi-mumbai/" },
  ],
  "vashi-navi-mumbai": [
    { name: "NIFS Thane", href: "/centers/thane/" },
    { name: "NIFS Borivali", href: "/centers/borivali-w-mumbai/" },
  ],
  bhubaneswar: [
    { name: "NIFS Rourkela", href: "/centers/rourkela/" },
    { name: "NIFS Berhampur", href: "/centers/berhampur/" },
  ],
  rourkela: [{ name: "NIFS Bhubaneswar", href: "/centers/bhubaneswar/" }],
  berhampur: [{ name: "NIFS Bhubaneswar", href: "/centers/bhubaneswar/" }],
  visakhapatnam: [
    { name: "NIFS Guntur (ANU campus)", href: "/centers/guntur/" },
    { name: "NIFS Chennai", href: "/centers/chennai/" },
  ],
  vijayawada: [{ name: "NIFS Guntur (ANU campus)", href: "/centers/guntur/" }],
  pondicherry: [{ name: "NIFS Chennai", href: "/centers/chennai/" }],
  cuddalore: [{ name: "NIFS Chennai", href: "/centers/chennai/" }],
};

/** 40-60 word answer at the top of a centre page: where, which courses, how to reach. */
export function CenterQuickAnswer({
  slug,
  city,
  address,
  phone,
  tel,
  whatsapp,
  courses,
}: {
  slug: string;
  city: string;
  address?: string;
  phone: string;
  tel: string;
  whatsapp: string;
  courses: string[];
}) {
  const nearby = NEARBY[slug];
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 p-5 text-sm sm:text-base text-slate-700 leading-relaxed shadow-sm">
      <p>
        <strong className="text-slate-900">Quick answer:</strong> NIFS {city}{address && ` is at ${address}`}. Courses here:{" "}
        {courses.join(", ")}, with an Acharya Nagarjuna University certificate on paid courses. Call{" "}
        <a href={tel} className="font-semibold text-primary underline">{phone}</a> or{" "}
        <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary underline">
          WhatsApp 83743 40999
        </a>{" "}
        for fees and the next batch.
      </p>
      {nearby && (
        <p className="mt-2">
          Also near you:{" "}
          {nearby.map((n, i) => (
            <span key={n.href}>
              {i > 0 && " · "}
              <Link href={n.href} className="font-semibold text-primary underline">{n.name}</Link>
            </span>
          ))}
        </p>
      )}
    </div>
  );
}

/** Phones only: Call (this centre's number) + WhatsApp bar fixed at the bottom of centre pages. */
export function CenterStickyBar({ tel, whatsapp }: { tel: string; whatsapp: string }) {
  return (
    <>
      <div aria-hidden="true" className="h-[68px] sm:hidden" />
      <aside
        id="centre-bar"
        aria-label="Call or WhatsApp this centre"
        className="sm:hidden fixed inset-x-0 bottom-0 z-[75] flex gap-3 border-t border-slate-200 bg-white/95 p-2.5 px-4 backdrop-blur-md"
      >
        <a href={tel} className="flex min-h-[48px] flex-1 items-center justify-center rounded-lg bg-primary text-sm font-bold text-white">
          Call this centre
        </a>
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-lg bg-whatsapp text-sm font-bold text-white"
        >
          WhatsApp
        </a>
      </aside>
    </>
  );
}
