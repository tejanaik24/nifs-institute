import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { centers } from "@/lib/data/centers";
import { SITE } from "@/lib/data/site-constants";
import { CenterDirectory } from "@/components/sections/center-directory";
import { ApplyNewCenterBanner } from "@/components/sections/apply-new-center-banner";

const TITLE = `Find Your Nearest NIFS Fire & Safety Centre: ${SITE.centerCount} Cities`;
const DESCRIPTION = `${SITE.centerCount} NIFS fire and safety centres in ${SITE.stateCount} states & UTs. Pick your city for the address, phone and WhatsApp. ANU certificate on paid courses.`;

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/centers/" },
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://nifsindia.net/centers/" },
};

export default function CentersPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Centers"
        title="Find Your Nearest NIFS Fire & Safety Centre"
        description={`NIFS India has ${SITE.centerCount} fire and safety training centres in ${SITE.stateCount} states & UTs. Pick your state below to see the centre address, phone number and directions. All paid courses give an Acharya Nagarjuna University certificate. Call or WhatsApp +91 83743 40999 for batch dates and fees.`}
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a href="tel:+918374340999" className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
            Call +91 83743 40999
          </a>
          <a
            href="https://wa.me/918374340999"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
          >
            WhatsApp
          </a>
        </div>
      </PageHero>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-14">
          <ApplyNewCenterBanner />
        </div>

        <CenterDirectory centers={centers} />

        <div className="mt-14 rounded-2xl border border-border p-6 text-sm leading-relaxed">
          <p>
            Not sure which course to pick? See <Link href="/courses/" className="font-semibold underline">all NIFS courses</Link> or start
            with the <Link href="/courses/ergonomic-safety/" className="font-semibold underline">free Ergonomic Safety course</Link>.
          </p>
          <p className="mt-3">
            City guides:{" "}
            <Link href="/blog/fire-and-safety-course-in-odisha/" className="underline">Fire and safety course in Odisha</Link>,{" "}
            <Link href="/blog/safety-officer-course-in-delhi/" className="underline">Safety officer course in Delhi</Link>,{" "}
            <Link href="/blog/safety-officer-course-in-jamshedpur/" className="underline">Safety officer course in Jamshedpur</Link>.
          </p>
        </div>
      </section>
    </>
  );
}

