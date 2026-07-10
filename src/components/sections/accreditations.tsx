"use client";

import { motion } from "framer-motion";
import { Shield } from "lucide-react";

export function Accreditations() {
  const accreditations = [
    { name: "NSDC", desc: "National Skill Development Corporation" },
    { name: "Skill India", desc: "Government Skill Initiative Partner" },
    { name: "ISO 9001:2015", desc: "Quality Management Certified System" },
    { name: "ANU", desc: "Acharya Nagarjuna University Affiliation" },
    { name: "Annamalai Univ.", desc: "Collaborative Academic Programs" },
    { name: "NSC", desc: "National Safety Council Member" },
    { name: "SBTET", desc: "State Board of Tech. Education & Training" },
    { name: "Lincoln Learning", desc: "International Certification Partner" },
    { name: "TSI", desc: "Technical Safety India Training Associate" },
    { name: "QCFI", desc: "Quality Circle Forum of India Member" },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative py-24 bg-[#0A0A0A] z-10 px-6 md:px-10 overflow-hidden">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-semibold uppercase tracking-widest text-[#FF4500]"
          >
            Accreditation &amp; Affiliations
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Recognized &amp; Accredited By
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            NIFS programs are recognized and structured in collaboration with premium government bodies, universities, and quality standard systems.
          </motion.p>
        </div>

        {/* Logo Grid of badged text cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {accreditations.map((acc) => (
            <motion.div
              key={acc.name}
              variants={itemVariants}
              className="group flex flex-col items-center justify-center p-6 border border-white/5 bg-[#111111]/40 backdrop-blur-sm rounded-sm hover:border-[#FF4500]/30 hover:bg-[#111111]/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,69,0,0.08)]"
            >
              <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-[#0A0A0A] mb-4 group-hover:border-[#FF4500]/40 transition-colors">
                <Shield className="h-5 w-5 text-[#FFB347] group-hover:text-[#FF4500] transition-colors" />
              </div>
              <h3 className="text-base font-bold text-white text-center font-mono group-hover:text-[#FF4500] transition-colors">
                {acc.name}
              </h3>
              <p className="mt-1 text-[10px] text-white/50 text-center leading-normal max-w-[130px]">
                {acc.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
