"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";

export function Centers() {
  const centerList = [
    "Vizag",
    "Hyderabad",
    "Guntur",
    "Chennai",
    "Bhubaneswar",
    "Kolkata",
    "Mumbai",
    "Delhi",
    "Kakinada",
    "Jamshedpur",
    "Nagpur",
    "Pondicherry",
    "& International Centers",
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative py-24 bg-[#111111]/30 z-10 px-6 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-[#FF4500]"
          >
            National Footprint
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            85+ Centers Across India
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            With training academies spanning major industrial hubs, safety education is always accessible.
          </motion.p>
        </div>

        {/* Card Grid of Centers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4"
        >
          {centerList.map((center) => (
            <motion.div
              key={center}
              variants={itemVariants}
              className="group flex items-center gap-3 p-5 border border-white/5 bg-[#111111]/60 rounded-sm hover:border-[#FF4500]/30 hover:bg-[#111111]/90 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,69,0,0.06)]"
            >
              <div className="p-2 rounded-sm border border-white/5 bg-[#0A0A0A] group-hover:border-[#FF4500]/40 transition-colors">
                <MapPin className="h-5 w-5 text-[#FF4500]" />
              </div>
              <span className="text-sm font-semibold tracking-wide text-white group-hover:text-[#FF4500] transition-colors">
                {center}
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <Link
            href="/centers"
            className="inline-flex items-center gap-1 font-mono text-xs uppercase tracking-wider text-[#FF4500] hover:text-[#FFB347] transition-colors"
          >
            View Complete Directory &amp; Map &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
