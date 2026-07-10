import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Industrial Services — In-House Training, Audits & Consultancy | NIFS India",
  description:
    "NIFS Industrial Services: in-house corporate training, safety audits, and manpower consultancy for manufacturing, construction and EPC companies.",
};

const services = [
  {
    id: "in-house-training",
    title: "In-House Trainings",
    body: "On-site fire and industrial safety training delivered directly at your facility, tailored to your specific hazard profile and workforce.",
    slot: "corporate-training-onsite.jpg",
  },
  {
    id: "corporate-training",
    title: "Corporate Trainings",
    body: "Structured EHS training programs for corporate teams — from induction-level safety awareness to advanced hazard management for supervisors.",
    slot: "control-room-risk-assessment.jpg",
  },
  {
    id: "safety-audits",
    title: "Safety Training & Audits",
    body: "Independent safety audits and compliance reviews conducted by certified assessors, benchmarked against ISO and national safety standards.",
    slot: "course-card-industrial-safety.jpg",
  },
  {
    id: "manpower-consultancy",
    title: "Manpower Consultancy",
    body: "Sourcing trained, certified safety personnel for your plant or project — drawn from our own graduate pipeline and placement network.",
    slot: "gallery-industrial-visit.jpg",
  },
];

export default function IndustrialServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industrial Services"
        title="Safety training and consultancy for your workforce"
        description="Beyond student education — NIFS partners directly with companies on training, audits, and staffing."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        {services.map((s, i) => (
          <div
            key={s.id}
            id={s.id}
            className={`grid grid-cols-1 items-center gap-10 py-16 md:grid-cols-2 ${
              i !== services.length - 1 ? "border-b border-border" : ""
            }`}
          >
            <div className={i % 2 === 1 ? "md:order-2" : ""}>
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm">
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
