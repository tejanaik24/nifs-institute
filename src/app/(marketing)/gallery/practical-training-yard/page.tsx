import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { PageHero } from "@/components/sections/page-hero";
import { galleryCategories } from "@/lib/data/gallery";
import { BreadcrumbSchema } from "@/lib/seo/schema";
import type { Metadata } from "next";
import { Suspense } from "react";

const PAGE_URL = "https://nifsindia.net/gallery/practical-training-yard/";

export const metadata: Metadata = {
  title:
    "Practical Firefighting Training Yard & Hands-On Safety Drills | NIFS India",
  description:
    "Explore India's premier practical firefighting training yard in Visakhapatnam. Live Class A-D fire suppression drills, SCBA smoke chambers, high-rise rope rescues & hands-on industrial safety gear.",
  alternates: { canonical: "/gallery/practical-training-yard/" },
};

const practicalTrainingYard = galleryCategories.filter(
  (c) => c.slug === "practical-training-yard",
);

export default function PracticalTrainingYardPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://nifsindia.net/" },
          { name: "Gallery", url: "https://nifsindia.net/gallery/" },
          { name: "Practical Training Yard", url: PAGE_URL },
        ]}
      />
      <PageHero
        eyebrow="Gallery & Facilities"
        title="Practical Fire Safety Training Yard"
        description="Live-fire drills, rescue equipment, and hands-on safety exercises — real photos from NIFS's training yard in Visakhapatnam."
      />
      <Suspense fallback={null}>
        <GalleryGrid categories={practicalTrainingYard} />
      </Suspense>
    </>
  );
}
