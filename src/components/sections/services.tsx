"use client";

import { motion } from "framer-motion";
import { Layers, Flame, ClipboardCheck, Users } from "lucide-react";

export function IndustrialServices() {
  const services = [
    {
      title: "In-House Training",
      icon: <Layers className="h-8 w-8 text-[#FF4500]" />,
      desc: "Comprehensive hands-on safety, first aid, and firefighting drills executed directly within our specialized academy environments.",
    },
    {
      title: "Corporate Safety Training",
      icon: <Flame className="h-8 w-8 text-[#FFB347]" />,
      desc: "Tailored industrial hazard workshops and EHS compliance seminars designed for plant managers and factory floors.",
    },
    {
      title: "Safety Audits",
      icon: <ClipboardCheck className="h-8 w-8 text-[#FF4500]" />,
      desc: "Rigorous inspections, risk matrices evaluation, and safety compliance audits meeting national regulations (L&T, Adani standards).",
    },
    {
      title: "Manpower Consultancy",
      icon: <Users className="h-8 w-8 text-[#FFB347]" />,
      desc: "Strategic safety officer placements, EHS engineers mapping, and technical risk-analysts sourcing for corporate enterprises.",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
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
            Corporate Solutions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Industrial Training &amp; Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            NIFS partners with major industrial stakeholders to provide auditing, advisory, and skill development services on site.
          </motion.p>
        </div>

        {/* 4 dark cards with hover glow */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {services.map((svc) => (
            <motion.div
              key={svc.title}
              variants={itemVariants}
              className="group relative flex flex-col p-8 border border-white/5 bg-[#111111]/60 rounded-sm hover:border-[#FF4500]/30 hover:bg-[#111111]/90 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(255,69,0,0.08)]"
            >
              {/* Corner Glow Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#FF4500]/10 rounded-bl-full filter blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="mb-6 p-3 rounded-sm border border-white/5 bg-[#0A0A0A] w-fit group-hover:border-[#FF4500]/40 transition-colors">
                {svc.icon}
              </div>

              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF4500] transition-colors">
                {svc.title}
              </h3>

              <p className="text-sm text-white/65 leading-relaxed">
                {svc.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
