import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import Image from "next/image";
import { industrialServices } from "@/lib/data/industrial-services";

export const metadata: Metadata = {
  title: "Industrial Services — Fire & Safety Audits | NIFS India",
  description:
    "NIFS Industrial Services: fire engineering, safety audits, HSE consultancy, and training for manufacturing, construction & EPC companies.",
  alternates: { canonical: "/industrial-services/" },
};

export default function IndustrialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrial Services"
        title="Safety training and consultancy for your workforce"
        description="Beyond student education — NIFS partners directly with companies across 10 service lines: training, audits, consultancy, and staffing."
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
              <Link
                href={`/industrial-services/${s.slug}`}
                className="relative block aspect-[4/3] w-full overflow-hidden rounded-sm"
                data-path-target="true"
              >
                <Image
                  src={`/images/${s.slot}`}
                  alt={s.title}
                  fill
                  className="object-cover"
                />
              </Link>
            </div>
            <div className={i % 2 === 1 ? "md:order-1" : ""}>
              <h2 className="font-display text-3xl italic">{s.title}</h2>
              <p className="mt-4 max-w-md text-muted-foreground">{s.body}</p>
              <Link
                href={`/industrial-services/${s.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
