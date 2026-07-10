import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { EnquiryForm } from "@/components/sections/enquiry-form";

export const metadata: Metadata = {
  title: "Admissions — How to Apply | NIFS India",
  description:
    "Apply to NIFS India's Fire & Industrial Safety and Health, Safety & Environment courses. Education loans available for all courses.",
};

const steps = [
  { title: "Choose your course", body: "Pick a program that matches your current stage — Certificate, Diploma, PG Diploma, B.Sc or MBA." },
  { title: "Submit your enquiry", body: "Fill the form below or call us directly — our admissions team responds within 24 hours." },
  { title: "Document verification", body: "Submit eligibility documents; our team verifies and confirms your seat." },
  { title: "Begin classes", body: "Join classroom or online batches, with education loan support available for all courses." },
];

export default function AdmissionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Admissions Open"
        title="How to apply"
        description="Diploma, PG Diploma, Degree and International courses — education loans available for all programs."
      />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-16 lg:grid-cols-2 lg:px-10">
        <div>
          <h2 className="font-display text-2xl italic">The Process</h2>
          <ol className="mt-6 space-y-8">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center border border-primary text-sm italic text-primary">
                  {i + 1}
                </span>
                <div>
                  <p className="font-medium">{s.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div>
          <h2 className="font-display text-2xl italic">Enquire Now</h2>
          <div className="mt-6">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
