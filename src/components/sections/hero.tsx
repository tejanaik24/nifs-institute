"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  // CSS for floating embers
  const emberStyles = `
    @keyframes floatUp {
      0% {
        transform: translateY(100vh) translateX(0) scale(1);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-10vh) translateX(100px) scale(0);
        opacity: 0;
      }
    }
    .ember {
      position: absolute;
      bottom: -10px;
      background: radial-gradient(circle, #FF4500 0%, rgba(255,179,71,0) 70%);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      filter: blur(1.5px);
    }
  `;

  // Create an array of random embers configs
  const embers = Array.from({ length: 25 }).map((_, i) => {
    const size = Math.random() * 6 + 2; // 2px to 8px
    const left = Math.random() * 100; // 0% to 100%
    const delay = Math.random() * 10; // 0s to 10s delay
    const duration = Math.random() * 8 + 6; // 6s to 14s duration
    return { id: i, size, left, delay, duration };
  });

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#0A0A0A] pt-24 px-6 md:px-10">
      <style dangerouslySetInnerHTML={{ __html: emberStyles }} />

      {/* Fire Gradient Overlay (Orange to Dark) */}
      <div className="absolute inset-0 bg-radial-gradient from-[#FF4500]/15 via-transparent to-transparent pointer-events-none z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-[#0A0A0A]/50 pointer-events-none z-0" />

      {/* CSS Floating Embers Container */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {embers.map((ember) => (
          <div
            key={ember.id}
            className="ember"
            style={{
              width: `${ember.size}px`,
              height: `${ember.size}px`,
              left: `${ember.left}%`,
              animation: `floatUp ${ember.duration}s linear infinite`,
              animationDelay: `${ember.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content (Framer Motion reveals) */}
      <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-[#FF4500]/30 bg-[#FF4500]/5 rounded-full font-mono text-xs uppercase tracking-wider text-[#FFB347]"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF4500] animate-pulse shadow-[0_0_10px_#FF4500]" />
          Accredited Safety Leadership
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" as const }}
          className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.1] max-w-4xl"
        >
          India&apos;s Premier <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-[#FF4500] to-[#FFB347] bg-clip-text text-transparent filter drop-shadow-[0_2px_10px_rgba(255,69,0,0.15)]">
            Fire &amp; Safety
          </span>{" "}
          Institute
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" as const }}
          className="mt-6 text-base sm:text-xl text-white/70 max-w-2xl leading-relaxed"
        >
          20+ Years of Academic Excellence | 85+ Training Centers Across India | 10,000+ Placed Graduates in Leading Industries.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" as const }}
          className="mt-10 flex flex-wrap justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/courses"
            className="w-full sm:w-auto bg-[#FF4500] hover:bg-[#FF4500]/90 text-white font-medium text-sm px-8 py-4 rounded-sm transition-all hover:shadow-[0_0_20px_rgba(255,69,0,0.4)]"
          >
            Explore Courses
          </Link>
          <Link
            href="/admissions"
            className="w-full sm:w-auto border border-white/20 bg-white/5 hover:bg-white/10 hover:border-white/40 text-white font-medium text-sm px-8 py-4 rounded-sm backdrop-blur transition-all"
          >
            Apply Now
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
