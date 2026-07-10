"use client";

import { motion } from "framer-motion";
import { Building2 } from "lucide-react";

export function Recruiters() {
  const recruiters = [
    "Adani",
    "L&T",
    "MEIL",
    "GMR",
    "ITC",
    "Amazon",
    "Asian Paints",
    "Coca-Cola",
    "Power Mech",
    "Nilkamal",
    "NSL",
    "KCP",
    "Interarch",
    "Petron",
    "Bothla",
    "Indwell",
    "Lansum",
    "Skillease",
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
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" as const },
    },
  };

  return (
    <section
      data-path-target="true"
      data-path-stretch="true"
      className="relative py-24 bg-[#0A0A0A] z-10 px-6 md:px-10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-[#FF4500]"
          >
            Placement Record
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Our Recruiters
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            Top multinational corporations, heavy engineering firms, and logistics enterprises hire NIFS safety professionals.
          </motion.p>
        </div>

        {/* Grid of Recruiter Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4"
        >
          {recruiters.map((rec) => (
            <motion.div
              key={rec}
              variants={itemVariants}
              className="group flex flex-col items-center justify-center p-6 border border-white/5 bg-[#111111]/40 backdrop-blur-sm rounded-sm hover:border-[#FF4500]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,69,0,0.06)]"
            >
              <Building2 className="h-5 w-5 text-white/30 mb-3 group-hover:text-[#FF4500] transition-colors" />
              <span className="text-sm font-semibold tracking-wide text-white text-center group-hover:text-[#FF4500] transition-colors">
                {rec}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
