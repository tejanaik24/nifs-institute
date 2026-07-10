import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { centers } from "@/lib/data/centers";
import Image from "next/image";
import { MapPin } from "lucide-react";
import { TiltWrapper } from "@/components/motion/tilt-wrapper";

export const metadata: Metadata = {
  title: "Our Centers — 15+ Locations Across India | NIFS India",
  description:
    "NIFS training centers across Visakhapatnam, Hyderabad, Chennai, Mumbai, Kolkata, Delhi and more — plus international centers.",
};

export default function CentersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Centers"
        title="Training centers across India"
        description="Headquartered in Visakhapatnam, with centers nationwide and international programs available."
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-sm">
          <Image
            src="/images/centers-exterior.jpg"
            alt="NIFS training center exterior"
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {centers.map((c) => (
            <TiltWrapper key={c.city} className="flex">
              <div
                className="flex flex-1 items-center gap-3 border border-border bg-card p-5"
              >
              <MapPin className="h-5 w-5 shrink-0 text-primary" />
              <div>
                <p className="font-medium">
                  {c.city}
                  {c.isHQ && (
                    <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-primary">
                      HQ
                    </span>
                  )}
                </p>
                <p className="text-sm text-muted-foreground">{c.state}</p>
              </div>
            </div>
          </TiltWrapper>
        ))}
        </div>
      </section>
    </>
  );
}
