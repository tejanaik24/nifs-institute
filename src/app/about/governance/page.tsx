"use client";

import { useRef, useState, useEffect, MouseEvent } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import { StatBadge3D } from "@/components/three/StatBadge3D";
import { Shield, Award, GraduationCap, Scale, Stethoscope, Briefcase } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── TYPES & DATA ──
type Advisor = {
  name: string;
  role: string;
  qualification: string;
  icon: typeof Shield;
  type: string;
  details: string;
};

const advisors: Advisor[] = [
  {
    name: "Sri. Suneel Mahanty",
    role: "Chairman & CEO, NIFS Group",
    qualification: "M.Sc., M.Phil. & MBA (FISM)",
    icon: Briefcase,
    type: "Management",
    details: "Founding visionary leading NIFS's strategic growth, international safety alliances, and academic collaboration programs across 21 states.",
  },
  {
    name: "Prof. SB Nageswara Rao (Retd.)",
    role: "Academic Advisor",
    qualification: "Annamalai University",
    icon: GraduationCap,
    type: "Academic",
    details: "Former senior professor guiding curriculum development, educational compliance, and academic excellence frameworks for safety degrees.",
  },
  {
    name: "Prof. V Chandra Sekhar Rao (Retd.)",
    role: "Academic Advisor",
    qualification: "Acharya Nagarjuna University",
    icon: Award,
    type: "Academic",
    details: "Drives academic audits, regular degree syllabus syncing, and quality assurances for collaborative honours programs at Guntur campus.",
  },
  {
    name: "Sri. TSR Prasad",
    role: "Security & Operations Advisor",
    qualification: "Retd. Addl. S.P., Govt. of Andhra Pradesh",
    icon: Shield,
    type: "Operations",
    details: "Oversees site security audits, emergency management protocols, and institutional discipline guidelines across all training yards.",
  },
  {
    name: "Sri. Rama Sharana Sharma",
    role: "Legal Advisor",
    qualification: "Advocate - High Court of Andhra Pradesh & Telangana",
    icon: Scale,
    type: "Legal",
    details: "Guides statutory compliance, affiliation audits, contractual framework clearances, and legal safety standards enforcement.",
  },
  {
    name: "Dr. S. Surya Prakash Rao",
    role: "Medical & Health Advisor",
    qualification: "HOD – Dept. of General Medicine, ESI Hospital",
    icon: Stethoscope,
    type: "Health & Safety",
    details: "Directs health screening standards, industrial hygiene guidelines, occupational health modules, and campus medical response frameworks.",
  },
  {
    name: "Sri. NLN Sharma",
    role: "Industrial Safety Advisor",
    qualification: "Retd. Manager – Safety, NALCO",
    icon: Shield,
    type: "Industrial",
    details: "Brings 30+ years of plant-floor safety audit, machine safeguarding, hazard identification, and risk assessment expertise directly to NIFS students.",
  },
];

const operationsDepartments = [
  { name: "Regional Managers", desc: "State-wise center heads" },
  { name: "Placement Dept.", desc: "MNC tie-ups & placements" },
  { name: "Admin. Dept.", desc: "Facility & center resources" },
  { name: "Marketing Dept.", desc: "Campaigns & student reach" },
  { name: "Academic Dept.", desc: "Curriculum & tutor boards" },
  { name: "R & D Dept.", desc: "Safety course innovations" },
  { name: "Finance Department", desc: "Fee controls & payrolls" },
  { name: "Examination Dept.", desc: "Evaluation & transcripts" },
];

const projectDepartments = [
  { name: "Vigilance Department", desc: "Audit protocols & quality checks" },
  { name: "Admin. Dept.", desc: "Projects-side facility & resources" },
  { name: "Technical Dept.", desc: "Equipment & systems upkeep" },
  { name: "Industrial Trainings", desc: "Practical site schedules" },
  { name: "HR - Projects", desc: "Trainer hire & appraisals" },
  { name: "R & D Dept.", desc: "Safety course innovations" },
  { name: "Business Development", desc: "Partnerships & new yards" },
];

// ── 3D TILT + DEPTH-LAYERED ADVISOR CARD ──
function AdvisorCard3D({ advisor }: { advisor: Advisor }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowStyle, setGlowStyle] = useState({});
  const reduceMotion = useReducedMotion() ?? false;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rY = ((mouseX - width / 2) / (width / 2)) * 12;
    const rX = -((mouseY - height / 2) / (height / 2)) * 12;

    setRotateX(rX);
    setRotateY(rY);

    setGlowStyle({
      background: `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, rgba(220, 23, 17, 0.1), transparent)`,
    });
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setGlowStyle({});
  };

  const IconComponent = advisor.icon;

  return (
    <div
      className="advisor-card-wrap"
      style={{ perspective: "1200px" }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
          transition: "transform 0.15s ease-out, box-shadow 0.3s ease",
        }}
        className="relative flex flex-col justify-between overflow-visible rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-md hover:border-primary/20 hover:shadow-2xl"
      >
        {/* Follow-cursor glow overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
          style={glowStyle}
        />

        <div style={{ transform: "translateZ(28px)", transformStyle: "preserve-3d" }}>
          <div className="flex items-center justify-between">
            <div
              style={{ transform: "translateZ(24px)" }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm transition-transform duration-300 hover:rotate-12"
            >
              <IconComponent className="h-5 w-5" />
            </div>
            <span className="rounded-full bg-zinc-100 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-200/50">
              {advisor.type}
            </span>
          </div>

          <h3 className="font-display mt-6 text-2xl font-bold tracking-tight text-zinc-900">
            {advisor.name}
          </h3>
          <p className="mt-1 text-sm font-semibold text-primary">
            {advisor.role}
          </p>
          <p className="mt-4 text-xs leading-relaxed text-zinc-500 font-medium">
            {advisor.details}
          </p>
        </div>

        <div
          style={{ transform: "translateZ(12px)" }}
          className="mt-8 border-t border-zinc-100 pt-4"
        >
          <span className="block text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
            Affiliation / History
          </span>
          <p className="mt-1 text-xs font-semibold text-zinc-700 leading-snug">
            {advisor.qualification}
          </p>
        </div>
      </div>
    </div>
  );
}

// ── MAIN GOVERNANCE PAGE ──
export default function GovernancePage() {
  const advisorsSectionRef = useRef<HTMLDivElement>(null);
  const orgSectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Advisor cards — staggered 3D perspective entrance on scroll
  useEffect(() => {
    if (!advisorsSectionRef.current) return;
    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      gsap.fromTo(
        advisorsSectionRef.current!.querySelectorAll(".advisor-card-wrap"),
        { opacity: 0, y: 50, rotateX: -25 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: advisorsSectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, advisorsSectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  // Org chart — cascading reveal with growing connector lines
  useEffect(() => {
    if (!orgSectionRef.current) return;
    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: orgSectionRef.current,
          start: "top 70%",
        },
      });

      tl.fromTo(
        ".org-node-chairman",
        { opacity: 0, y: -20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".org-connector-1",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.3, ease: "power1.out", transformOrigin: "top" }
        )
        .fromTo(
          ".org-node-gm",
          { opacity: 0, y: -20, rotateX: -20 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.5, stagger: 0.15, ease: "back.out(1.7)" }
        )
        .fromTo(
          ".org-dept-card",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.35, stagger: 0.04, ease: "power2.out" },
          "-=0.2"
        );
    }, orgSectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <>
      <PageHero
        eyebrow="NIFS Governance"
        title="Command & Leadership Board"
        description="Explore the administrative hierarchy, flowchart channels, and the elite advisory panel behind NIFS safety education."
      />

      {/* ── BOARD OF ADVISORS SECTION ── */}
      <section ref={advisorsSectionRef} className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-12 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Institutional Quality Guard
          </span>
          <h2 className="font-display mt-2 text-3xl italic md:text-5xl">
            Board of Advisors
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500">
            Veteran scholars, safety compliance specialists, and legal leaders overseeing educational accuracy and yard safety.
          </p>
        </div>

        {/* Real 3D stat plates over contextual photography */}
        <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { value: "7", label: "Board Advisors", image: "board-advisors.jpg" },
            { value: "25+", label: "Years Legacy", image: "years-legacy.jpg" },
            { value: "13", label: "Departments", image: "departments.jpg" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-3xl"
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(9,9,11,0.55), rgba(9,9,11,0.85)), url(/images/governance/${stat.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex items-center justify-center p-4">
                <StatBadge3D value={stat.value} label={stat.label} />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor) => (
            <AdvisorCard3D key={advisor.name} advisor={advisor} />
          ))}
        </div>
      </section>

      {/* ── ORGANIZATIONAL STRUCTURE ── */}
      <section ref={orgSectionRef} className="border-t border-zinc-200 bg-muted/20 py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Command Architecture
            </span>
            <h2 className="font-display mt-2 text-3xl italic md:text-5xl">
              Organizational Structure
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-500">
              Divisional management flow outlining Project Operations and Institutional Administrations.
            </p>
          </div>

          {/* Org Chart Container */}
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-md md:p-12" style={{ perspective: "1400px" }}>
            <div className="flex flex-col items-center">

              {/* LEVEL 1: CHAIRMAN & CEO (merged) */}
              <div className="org-node-chairman w-72 rounded-2xl border-2 border-primary/30 bg-white p-5 text-center shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
                <span className="rounded-full bg-primary/10 border border-primary/20 px-2.5 py-1 font-mono text-[9px] font-bold text-primary uppercase tracking-widest">
                  National Command
                </span>
                <h4 className="font-display mt-3 text-xl italic">Chairman &amp; CEO</h4>
                <p className="text-xs text-zinc-500 mt-1">Suneel Mahanty</p>
              </div>

              <div className="org-connector-1 h-8 w-px bg-gradient-to-b from-primary/40 to-zinc-200" />

              {/* LEVEL 2: GMs GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-24 w-full max-w-5xl">

                {/* GM Column A: Projects */}
                <div className="flex flex-col items-center">
                  <div className="org-node-gm w-72 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm mb-6 transition-all hover:border-primary/30 hover:shadow-md">
                    <span className="rounded-full bg-zinc-100 border border-zinc-200/50 px-2.5 py-1 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      External Operations
                    </span>
                    <h4 className="font-display mt-3 text-lg italic">
                      GM – Projects
                    </h4>
                  </div>

                  {/* Departments grid under Projects */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {projectDepartments.map((dept) => (
                      <div
                        key={dept.name}
                        className="org-dept-card rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 text-center transition-colors hover:border-primary/20"
                      >
                        <h5 className="font-semibold text-xs text-zinc-800">{dept.name}</h5>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{dept.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* GM Column B: Operations & Principal */}
                <div className="flex flex-col items-center">
                  <div className="org-node-gm w-72 rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm mb-6 transition-all hover:border-primary/30 hover:shadow-md">
                    <span className="rounded-full bg-zinc-100 border border-zinc-200/50 px-2.5 py-1 font-mono text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      Institutional Control
                    </span>
                    <h4 className="font-display mt-3 text-lg italic">
                      GM – Operations &amp; Principal
                    </h4>
                  </div>

                  {/* Departments grid under Operations */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                    {operationsDepartments.map((dept) => (
                      <div
                        key={dept.name}
                        className="org-dept-card rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 text-center transition-colors hover:border-primary/20"
                      >
                        <h5 className="font-semibold text-xs text-zinc-800">{dept.name}</h5>
                        <p className="text-[10px] text-zinc-500 mt-0.5">{dept.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
