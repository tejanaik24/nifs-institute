"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItemProps {
  number: number;
  suffix: string;
  label: string;
}

function StatCounter({ number, suffix, label }: StatItemProps) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = number;
      if (start === end) return;

      const duration = 2; // seconds
      const totalMiliseconds = duration * 1000;
      const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 15);
      
      const timer = setInterval(() => {
        start += Math.ceil(end / 60);
        if (start >= end) {
          clearInterval(timer);
          setCount(end);
        } else {
          setCount(start);
        }
      }, incrementTime);

      return () => clearInterval(timer);
    }
  }, [isInView, number]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center p-6 border border-white/5 bg-[#111111]/40 rounded-sm hover:border-[#FF4500]/20 hover:bg-[#111111]/80 transition-all hover:shadow-[0_4px_20px_rgba(255,69,0,0.05)]"
    >
      <div className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#FF4500] font-mono">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="mt-2 text-sm sm:text-base font-medium text-white/80 uppercase tracking-wider text-center">
        {label}
      </div>
    </div>
  );
}

export function StatsBar() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section className="relative py-16 bg-[#0A0A0A] border-t border-b border-white/5 z-10 px-6 md:px-10">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <StatCounter number={20} suffix="+" label="Years of Legacy" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCounter number={85} suffix="+" label="Training Centers" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCounter number={10000} suffix="+" label="Graduated Students" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCounter number={27} suffix="+" label="Recruiting Partners" />
        </motion.div>
      </motion.div>
    </section>
  );
}
