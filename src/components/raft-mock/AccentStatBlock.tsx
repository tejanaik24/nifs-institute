"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const roles = [
  "Fire Safety Officer",
  "Industrial Safety Supervisor",
  "HSE Manager",
  "Emergency Response Coordinator",
  "Risk Analyst",
];

export function AccentStatBlock() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current!.querySelector(".accent-copy"),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
      gsap.fromTo(
        sectionRef.current!.querySelectorAll(".accent-pill"),
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-primary py-20 lg:py-28">
      <div className="accent-copy mx-auto max-w-3xl px-6 text-center">
        <span className="text-xs font-semibold tracking-[0.15em] text-white/70 uppercase">
          Career Outcomes
        </span>
        <div className="mt-4 text-6xl font-bold text-white lg:text-7xl">45,000+</div>
        <p className="mt-2 text-lg text-white/85">Candidates Placed</p>
        <p className="mt-6 text-sm text-white/70">
          Where our graduates work:
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {roles.map((role) => (
            <span
              key={role}
              className="accent-pill rounded-full border border-white/30 px-4 py-1.5 text-xs text-white"
            >
              {role}
            </span>
          ))}
        </div>
        <Link
          href="/placements"
          className="mt-8 inline-block rounded-md bg-white px-6 py-3 text-sm font-medium text-primary transition-opacity hover:opacity-90"
        >
          View All Placements
        </Link>
      </div>
    </section>
  );
}
