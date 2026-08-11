import type { Metadata } from "next";
import { Suspense } from "react";
import { PageHero } from "@/components/sections/page-hero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { galleryCategories } from "@/lib/data/gallery";
import { BreadcrumbSchema } from "@/lib/seo/schema";

const PAGE_URL = "https://nifsindia.net/gallery/practical-training-yard/";

export const metadata: Metadata = {
  title: "Practical Fire Safety Training Yard | NIFS India",
  description:
    "See NIFS's practical fire safety training yard in Visakhapatnam - live-fire drills, rescue gear & hands-on safety exercises. Real photos from real batches.",
  alternates: { canonical: "/gallery/practical-training-yard/" },
};

const practicalTrainingYard = galleryCategories.filter(
  (c) => c.slug === "practical-training-yard"
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
