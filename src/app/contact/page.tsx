import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { EnquiryForm } from "@/components/sections/enquiry-form";
import { Phone, Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | NIFS India",
  description: "Get in touch with NIFS India — Visakhapatnam headquarters and centers nationwide.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero eyebrow="Contact Us" title="Get in touch" />

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 py-16 lg:grid-cols-2 lg:px-10">
        <div className="space-y-8">
          <div className="flex gap-4">
            <MapPin className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG Avenue Building,
              3rd Floor, Visakhapatnam (A.P.) – 530016
            </p>
          </div>
          <div className="flex gap-4">
            <Phone className="h-5 w-5 shrink-0 text-primary" />
            <a href="tel:+918374340999" className="text-sm text-muted-foreground hover:underline">
              +91-8374-340-999
            </a>
          </div>
          <div className="flex gap-4">
            <Mail className="h-5 w-5 shrink-0 text-primary" />
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
              <a href="mailto:headoffice@nifsindia.com" className="hover:underline">
                headoffice@nifsindia.com
              </a>
              <a href="mailto:Counsellor@nifsindia.com" className="hover:underline">
                Counsellor@nifsindia.com
              </a>
            </div>
          </div>
        </div>

        <EnquiryForm />
      </section>
    </>
  );
}
