import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Gallery & Facilities | NIFS India",
  description:
    "NIFS practical training yard, hostel facilities, and industrial visit gallery.",
};

const gallery = [
  { slot: "gallery-practical-yard.jpg", label: "Practical Training Yard" },
  { slot: "gallery-industrial-visit.jpg", label: "Industrial Visit" },
  { slot: "training-yard-drill.jpg", label: "Hazard Drill" },
  { slot: "hostel-facility.jpg", label: "Hostel Facility" },
  { slot: "classroom-lecture.jpg", label: "Classroom Training" },
  { slot: "corporate-training-onsite.jpg", label: "Corporate Training" },
];

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery & Facilities"
        title="See where the training happens"
        description="Practical training yards, hostel accommodation, and real industrial visits."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {gallery.map((g) => (
            <div key={g.slot} className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border">
              <Image
                src={`/images/${g.slot}`}
                alt={g.label}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-sm font-medium text-white">{g.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
