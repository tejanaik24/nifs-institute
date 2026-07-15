"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  {
    number: "01",
    title: "Practical Training Yard",
    body: "Real hazard simulations on actual equipment. 85% of curriculum is hands-on, not classroom theory.",
    icon: "/images/icons/training-yard.png",
  },
  {
    number: "02",
    title: "Direct Placement Cell",
    body: "Dedicated team with direct recruiter relationships at Adani, L&T, GMR and 45,000+ placements across India.",
    icon: "/images/icons/placement-cell.png",
  },
  {
    number: "03",
    title: "Industry Faculty Only",
    body: "Every trainer has minimum 10 years field experience. No academics teaching what they've never done.",
    icon: "/images/icons/faculty.png",
  },
  {
    number: "04",
    title: "Government Recognized",
    body: "NSDC + Skill India approved. Certificates valid across India, Gulf, and international markets.",
    icon: "/images/icons/government-recognized.png",
  },
  {
    number: "05",
    title: "86 Centers Nationwide",
    body: "Learn near home. Transfer between centers anytime. New centers opening every quarter.",
    icon: "/images/icons/centers-nationwide.png",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
            Why Choose NIFS
          </span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground lg:text-4xl">
            Trained. Placed. Proven.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Since 2004, NIFS has turned classroom training into real industrial
            safety careers — trusted by 45,000+ professionals and recruiters
            like Adani, L&amp;T and GMR.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={item.number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="rounded-xl border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-10 w-10">
                <Image src={item.icon} alt="" fill sizes="40px" className="object-contain" />
              </div>
              <h3 className="mt-4 text-sm font-semibold tracking-wide text-foreground uppercase">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
