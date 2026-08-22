import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { centers } from "@/lib/data/centers";
import { CenterDirectory } from "@/components/sections/center-directory";

export const metadata: Metadata = {
  title: "NIFS Training Centers — 69 Locations, 21 States | NIFS India",
  description:
    "Find your nearest NIFS training center — verified centers across India with phone numbers and directions for every location.",
  alternates: { canonical: "/centers/" },
};

export default function CentersPage() {
  const stateCount = new Set(centers.map((c) => c.state)).size;
  const hq = centers.find((c) => c.isHQ);

  return (
    <>
      <PageHero
        eyebrow="Our Centers"
        title="Training centers across India"
        description={`Headquartered in ${hq?.city ?? "Visakhapatnam"}, with ${centers.length} verified centers across ${stateCount} states and union territories.`}
      />

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <CenterDirectory centers={centers} />
      </section>
    </>
  );
}
