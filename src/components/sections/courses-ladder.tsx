"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Award, Briefcase, GraduationCap, ShieldCheck, Star } from "lucide-react";

interface LadderLevel {
  level: string;
  icon: React.ReactNode;
  courses: { name: string; slug: string; desc: string }[];
}

export function CoursesLadder() {
  const ladderLevels: LadderLevel[] = [
    {
      level: "Certificate Programs",
      icon: <Award className="h-6 w-6 text-[#FFB347]" />,
      courses: [
        {
          name: "CCFS",
          slug: "certificate-course-in-fire-safety",
          desc: "Certificate Course in Fire Safety. Fundamental safety drills, fire prevention principles, and hazard basics.",
        },
      ],
    },
    {
      level: "Diploma Programs",
      icon: <ShieldCheck className="h-6 w-6 text-[#FF4500]" />,
      courses: [
        {
          name: "DFS",
          slug: "diploma-in-fire-safety",
          desc: "Diploma in Fire Safety. Operations-level hazard management, emergency response, and sprinkler installations.",
        },
        {
          name: "DHSE",
          slug: "diploma-in-health-safety-environment",
          desc: "Diploma in Health, Safety & Environment. Risk audits, environmental safety compliances, and accident recording.",
        },
      ],
    },
    {
      level: "Advanced & PG Diplomas",
      icon: <Briefcase className="h-6 w-6 text-[#FFB347]" />,
      courses: [
        {
          name: "ADFS / ADIS",
          slug: "advanced-diploma-in-fire-safety",
          desc: "Advanced Diploma in Fire Safety & Industrial Safety. Advanced prevention controls, site regulations, and rescue drills.",
        },
        {
          name: "PGDFS / PGDHSE",
          slug: "pg-diploma-in-fire-safety",
          desc: "Post Graduate Diploma in Fire Safety / HSE. Leadership audits, industrial risk mapping, and executive EHS compliance.",
        },
      ],
    },
    {
      level: "BSc Degrees",
      icon: <GraduationCap className="h-6 w-6 text-[#FF4500]" />,
      courses: [
        {
          name: "BSc Fire Safety / BSc HSE",
          slug: "bsc-fire-safety",
          desc: "Bachelor of Science in Fire Safety & HSE. Three-year academic degree programs offering engineering-level depth.",
        },
      ],
    },
    {
      level: "MBA Degrees",
      icon: <Star className="h-6 w-6 text-[#FFB347]" />,
      courses: [
        {
          name: "MBA Safety Management",
          slug: "mba-safety-management",
          desc: "Master of Business Administration. Executive safety consulting, organizational policy, and global health standards.",
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" as const },
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
            Academic Journey
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            The Courses Ladder
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            A structured career progression roadmap from core certifications to postgraduate management credentials.
          </motion.p>
        </div>

        {/* Timeline Ladder */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative max-w-4xl mx-auto flex flex-col items-center"
        >
          {/* Vertical Connecting Line */}
          <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF4500] via-[#FFB347] to-[#FF4500]/10 -translate-x-[1px] z-0" />

          {ladderLevels.map((lvl, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={lvl.level}
                variants={itemVariants}
                className={`relative w-full flex flex-col md:flex-row items-start md:items-center justify-between mb-16 last:mb-0 ${
                  isEven ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-[30px] md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#0A0A0A] border-2 border-[#FF4500] z-10 shadow-[0_0_15px_rgba(255,69,0,0.3)]">
                  {lvl.icon}
                </div>

                {/* Content Card (Glassmorphism) */}
                <div className={`w-full md:w-[45%] pl-16 md:pl-0 ${isEven ? "md:text-left" : "md:text-right"}`}>
                  <div className="p-6 rounded-sm border border-white/5 bg-[#111111]/60 backdrop-blur-sm hover:border-[#FF4500]/30 transition-all hover:bg-[#111111]/90 shadow-[0_4px_30px_rgba(0,0,0,0.4)] group">
                    <span className="font-mono text-xs font-semibold tracking-wider text-[#FFB347] uppercase block mb-1">
                      Level {index + 1}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#FF4500] transition-colors">
                      {lvl.level}
                    </h3>
                    <div className="flex flex-col gap-4">
                      {lvl.courses.map((course) => (
                        <div key={course.name} className="text-left">
                          <h4 className="text-sm font-semibold text-white/95 uppercase tracking-wide">
                            {course.name}
                          </h4>
                          <p className="mt-1 text-xs text-white/60 leading-relaxed">
                            {course.desc}
                          </p>
                          <Link
                            href={`/courses/${course.slug}`}
                            className="inline-flex items-center gap-1 mt-3 font-mono text-[10px] uppercase tracking-wider text-[#FF4500] hover:text-[#FFB347] transition-colors"
                          >
                            Explore Syllabus &rarr;
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Empty block for layout grid alignment on desktop */}
                <div className="hidden md:block w-[45%]" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
