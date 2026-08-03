import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import Image from "next/image";
import { industrialServices } from "@/lib/data/industrial-services";

export const metadata: Metadata = {
  title: "Industrial Services — In-House Training, Audits & Consultancy | NIFS India",
  description:
    "NIFS Industrial Services: in-house corporate training, safety audits, and manpower consultancy for manufacturing, construction and EPC companies.",
};

export default function IndustrialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrial Services"
        title="Safety training and consultancy for your workforce"
        description="Beyond student education — NIFS partners directly with companies on training, audits, and staffing."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {industrialServices.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            className={`grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 ${
              i !== industrialServices.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div
                data-path-target="true"
                className="relative aspect-[4/3] w-full overflow-hidden rounded-sm"
              >
                <Image
                  src={`/images/${s.slot}`}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <h2 className="font-display text-3xl italic">{s.title}</h2>
              <p className="mt-4 max-w-md text-muted-foreground">{s.body}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
