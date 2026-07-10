"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      name: "Rohan Sharma",
      course: "PG Diploma in HSE",
      company: "L&T Heavy Engineering",
      text: "The rigorous training at NIFS Vizag practical yard gave me real site confidence. Today, managing safety audits at L&T feels like second nature. The placements team was outstanding.",
    },
    {
      name: "Sai Kiran",
      course: "BSc Fire Safety",
      company: "Adani Ports & SEZ",
      text: "NIFS didn't just teach me theories; we audited live floor plans and handled complex mock fire drills. Being placed directly at Adani Ports is a dream start to my HSE career.",
    },
  ];

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
            Alumni Success
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display mt-2 text-4xl sm:text-5xl font-bold tracking-tight text-white"
          >
            Graduate Stories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-white/60 max-w-xl mx-auto text-sm sm:text-base"
          >
            Hear from our graduates placed at India's leading industrial and construction projects.
          </motion.p>
        </div>

        {/* Two column layout: Video on Left, Quotes on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* YouTube Embed styled card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 bg-[#111111] shadow-[0_10px_35px_rgba(0,0,0,0.6)] hover:border-[#FF4500]/30 transition-all duration-300 group"
          >
            <iframe
              className="absolute inset-0 w-full h-full object-cover"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1"
              title="NIFS Safety Training Experience Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {/* Overlay border indicator */}
            <div className="absolute inset-0 border border-transparent group-hover:border-[#FF4500]/30 pointer-events-none transition-colors" />
          </motion.div>

          {/* Graduate Quote Cards */}
          <div className="flex flex-col gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative p-8 border border-white/5 bg-[#111111]/40 backdrop-blur-sm rounded-sm hover:border-[#FF4500]/20 hover:bg-[#111111]/75 transition-all duration-300 shadow-[0_4px_30px_rgba(0,0,0,0.3)]"
              >
                <Quote className="absolute top-6 right-8 h-8 w-8 text-white/5" />
                
                <p className="text-sm sm:text-base text-white/85 italic leading-relaxed">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="mt-6 flex flex-col">
                  <span className="text-base font-bold text-white">
                    {t.name}
                  </span>
                  <span className="text-xs text-[#FFB347] font-mono mt-1">
                    {t.course}
                  </span>
                  <span className="text-xs text-white/50 mt-0.5">
                    Placed at: {t.company}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
