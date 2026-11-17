import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Privacy Policy | NIFS India",
  description:
    "How National Institute of Fire and Safety (NIFS India) collects, uses and protects your information, including WhatsApp messages.",
  alternates: { canonical: "/privacy-policy/" },
};

const UPDATED = "17 November 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" />

      <article className="mx-auto max-w-3xl space-y-8 px-6 py-16 text-sm leading-relaxed text-muted-foreground lg:px-10 [&_h2]:mb-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-foreground [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        <p>Last updated: {UPDATED}</p>

        <p>
          This policy explains how National Institute of Fire and Safety (&quot;NIFS India&quot;,
          &quot;we&quot;) handles your information when you use nifsindia.net, fill in an
          enquiry form, call us, or message us on WhatsApp.
        </p>

        <section>
          <h2>What we collect</h2>
          <ul>
            <li>Your name, phone number, email, city and the course you ask about.</li>
            <li>Messages, voice notes and files you send us on WhatsApp.</li>
            <li>Notes our counsellors make about your enquiry (for example, a visit date).</li>
            <li>Basic website usage data (pages visited, device type) through analytics tools.</li>
          </ul>
        </section>

        <section>
          <h2>How we use it</h2>
          <ul>
            <li>To answer your questions about courses, fees, batches and admissions.</li>
            <li>To send you replies and reminders on WhatsApp about your enquiry or visit.</li>
            <li>To improve our courses and website.</li>
          </ul>
          <p className="mt-3">
            Some WhatsApp replies may be written automatically with the help of AI, and our
            counsellors can see and continue every conversation.
          </p>
        </section>

        <section>
          <h2>Stopping messages</h2>
          <p>
            Reply <strong>STOP</strong> on WhatsApp at any time and we will stop sending you
            messages, including automatic replies and reminders.
          </p>
        </section>

        <section>
          <h2>Who we share it with</h2>
          <p>
            We do not sell your information. We share it only with service providers that help
            us run our services, such as Meta (WhatsApp Business Platform), our hosting and
            database providers, and analytics tools, and only as needed for those services. We
            may also share information if the law requires it.
          </p>
        </section>

        <section>
          <h2>How long we keep it</h2>
          <p>
            We keep enquiry and conversation records for as long as needed to help you with
            admissions and to meet legal and accounting needs, and then delete them.
          </p>
        </section>

        <section id="data-deletion">
          <h2>Your rights and deleting your data</h2>
          <p>
            You can ask us to see, correct or delete the information we hold about you. Email{" "}
            <a href="mailto:headoffice@nifsindia.com" className="text-primary hover:underline">
              headoffice@nifsindia.com
            </a>{" "}
            or call{" "}
            <a href="tel:+918374340999" className="text-primary hover:underline">
              +91-8374-340-999
            </a>{" "}
            with your name and phone number. We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            National Institute of Fire and Safety, Door No. 47-10-15, 2nd Lane, Dwarakanagar, AG
            Avenue Building, 3rd Floor, Visakhapatnam (A.P.) – 530016.
          </p>
        </section>
      </article>
    </>
  );
}
