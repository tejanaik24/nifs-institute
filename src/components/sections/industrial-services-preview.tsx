"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Building2, ShieldCheck, ClipboardCheck, Users } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "In-House Trainings",
    description: "Customised safety training delivered at your facility",
  },
  {
    icon: ShieldCheck,
    title: "Corporate Safety Training",
    description:
      "EHS programs for MNCs, EPC contractors, and plant operations",
  },
  {
    icon: ClipboardCheck,
    title: "Safety Audits",
    description:
      "Risk assessment and compliance audits by certified professionals",
  },
  {
    icon: Users,
    title: "Manpower Consultancy",
    description: "Sourcing trained HSE professionals for your workforce",
  },
];

export function IndustrialServicesPreview() {
  return (
    <section className="bg-muted/30 py-14 lg:py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="font-display max-w-2xl text-4xl italic leading-tight md:text-5xl">
          We don&apos;t just train students. We serve industries.
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group border border-border bg-card p-8 transition-shadow hover:shadow-lg"
            >
              <service.icon className="h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="font-display mt-4 text-xl italic">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {service.description}
              </p>
              <Link
                href="/industrial-services"
                className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#CC0000] group-hover:underline"
              >
                Enquire →
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
