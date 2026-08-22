"use client";

import { useRef, useState, useEffect, MouseEvent, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "framer-motion";
import { PageHero } from "@/components/sections/page-hero";
import {
  Shield,
  Award,
  GraduationCap,
  Scale,
  Stethoscope,
  Briefcase,
  Zap,
  Crown,
  Building2,
  Landmark,
  ShieldAlert,
  Rocket,
  Users,
  ClipboardCheck,
  FileCheck,
  Megaphone,
  FlaskConical,
  HardHat,
  TrendingUp,
  Wrench,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ── TYPES & DATA ──
type Advisor = {
  id: number;
  name: string;
  role: string;
  qualification: string;
  icon: typeof Shield;
  type: string;
  details: string;
};

const advisors: Advisor[] = [
  {
    id: 1,
    name: "Prof. SB Nageswara Rao (Retd.)",
    role: "Annamalai University",
    qualification: "Retd. Professor, Annamalai University",
    icon: GraduationCap,
    type: "Academic",
    details: "Former senior professor guiding curriculum development, educational compliance, and academic excellence frameworks for safety degrees.",
  },
  {
    id: 2,
    name: "Prof. V Chandra Sekhar Rao (Retd.)",
    role: "Acharya Nagarjuna University",
    qualification: "Retd. Professor, Acharya Nagarjuna University",
    icon: Award,
    type: "Academic",
    details: "Drives academic audits, regular degree syllabus syncing, and quality assurances for collaborative honours programs.",
  },
  {
    id: 3,
    name: "Sri. TSR Prasad",
    role: "Retd. Addl. S.P., Govt. of Andhra Pradesh",
    qualification: "Retd. Addl. S.P., Govt. of A.P.",
    icon: Shield,
    type: "Operations",
    details: "Oversees site security audits, emergency management protocols, and institutional discipline guidelines across all training yards.",
  },
  {
    id: 4,
    name: "Sri. Rama Sharana Sharma",
    role: "Advocate - High Court of Andhra Pradesh & Telangana",
    qualification: "Advocate, High Court of A.P. & Telangana",
    icon: Scale,
    type: "Legal",
    details: "Guides statutory compliance, affiliation audits, contractual framework clearances, and legal safety standards enforcement.",
  },
  {
    id: 5,
    name: "Dr. S. Surya Prakash Rao",
    role: "HOD – Dept. of General Medicine, ESI Hospital",
    qualification: "HOD – Dept. of General Medicine, ESI Hospital",
    icon: Stethoscope,
    type: "Health & Safety",
    details: "Directs health screening standards, industrial hygiene guidelines, occupational health modules, and campus medical response frameworks.",
  },
  {
    id: 6,
    name: "Sri. NLN Sharma",
    role: "Retd. Manager – Safety, NALCO",
    qualification: "Retd. Manager – Safety, NALCO",
    icon: Shield,
    type: "Industrial Safety",
    details: "Brings 30+ years of plant-floor safety audit, machine safeguarding, hazard identification, and risk assessment expertise directly to NIFS students.",
  },
  {
    id: 7,
    name: "Sri. Suneel Mahanty",
    role: "Chairman NIFS Group",
    qualification: "Chairman & CEO, NIFS Group",
    icon: Briefcase,
    type: "Management",
    details: "Founding visionary leading NIFS's strategic growth, international safety alliances, and academic collaboration programs across 21 states.",
  },
  {
    id: 8,
    name: "Smt. Kusuma Kumari . K",
    role: "GM – Operations, NIFS",
    qualification: "General Manager – Operations, NIFS",
    icon: Briefcase,
    type: "Operations",
    details: "Directs divisional operations, regional center governance, facility management, and academic administration across training centers.",
  },
  {
    id: 9,
    name: "Dr. GPR Krishna",
    role: "GM – Projects, IFESM",
    qualification: "General Manager – Projects, IFESM",
    icon: Briefcase,
    type: "Projects",
    details: "Leads project operations, industrial safety partnerships, practical training yard expansions, and technical vigilance frameworks.",
  },
];

// ── ISOMETRIC PEDESTAL ORG NODE + ROAD CONNECTORS ──
const COLORS = {
  chairman: { bg: "bg-gradient-to-b from-red-500 to-red-700", ring: "ring-red-400/50", text: "text-red-400", glow: "shadow-red-500/40", accent: "#f87171" },
  ops: { bg: "bg-gradient-to-b from-sky-400 to-sky-600", ring: "ring-sky-400/50", text: "text-sky-400", glow: "shadow-sky-500/40", accent: "#38bdf8" },
  finance: { bg: "bg-gradient-to-b from-emerald-400 to-emerald-600", ring: "ring-emerald-400/50", text: "text-emerald-400", glow: "shadow-emerald-500/40", accent: "#34d399" },
  vigilence: { bg: "bg-gradient-to-b from-violet-400 to-violet-600", ring: "ring-violet-400/50", text: "text-violet-400", glow: "shadow-violet-500/40", accent: "#a78bfa" },
  projects: { bg: "bg-gradient-to-b from-amber-400 to-amber-600", ring: "ring-amber-400/50", text: "text-amber-400", glow: "shadow-amber-500/40", accent: "#fbbf24" },
  academic: { bg: "bg-gradient-to-b from-teal-400 to-teal-600", ring: "ring-teal-400/50", text: "text-teal-400", glow: "shadow-teal-500/40", accent: "#2dd4bf" },
  legal: { bg: "bg-gradient-to-b from-yellow-400 to-yellow-600", ring: "ring-yellow-400/50", text: "text-yellow-400", glow: "shadow-yellow-500/40", accent: "#facc15" },
  health: { bg: "bg-gradient-to-b from-rose-400 to-rose-600", ring: "ring-rose-400/50", text: "text-rose-400", glow: "shadow-rose-500/40", accent: "#fb7185" },
  industrial: { bg: "bg-gradient-to-b from-orange-400 to-orange-600", ring: "ring-orange-400/50", text: "text-orange-400", glow: "shadow-orange-500/40", accent: "#fb923c" },
} as const;

type ColorKey = keyof typeof COLORS;

const ADVISOR_TYPE_COLOR: Record<string, ColorKey> = {
  Academic: "academic",
  Operations: "ops",
  Legal: "legal",
  "Health & Safety": "health",
  "Industrial Safety": "industrial",
  Management: "chairman",
  Projects: "projects",
};

// ── FLOATING GLASS PEDESTAL CARD (cursor-tilt + ambient bob + glow) ──
function AdvisorPedestalCard({
  advisor,
  index,
  size = "sm",
}: {
  advisor: Advisor;
  index: number;
  size?: "sm" | "md" | "lg";
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({});
  const reduceMotion = useReducedMotion() ?? false;
  const c = COLORS[ADVISOR_TYPE_COLOR[advisor.type]];
  const Icon = advisor.icon;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || reduceMotion) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    setRotate({
      x: -((my - rect.height / 2) / (rect.height / 2)) * 8,
      y: ((mx - rect.width / 2) / (rect.width / 2)) * 8,
    });
    setGlow({ background: `radial-gradient(circle 220px at ${mx}px ${my}px, ${c.accent}22, transparent)` });
  };
  const handleLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlow({});
  };

  const avatarDims = size === "lg" ? "h-32 w-32" : size === "md" ? "h-24 w-24" : "h-20 w-20";
  const iconDims = size === "lg" ? "h-14 w-14" : size === "md" ? "h-10 w-10" : "h-8 w-8";
  const nameSize = size === "lg" ? "text-2xl" : size === "md" ? "text-lg" : "text-base";
  const padding = size === "lg" ? "p-10" : size === "md" ? "p-7" : "p-6";

  return (
    <div
      className="advisor-node h-full"
      style={{
        perspective: "1000px",
        animation: reduceMotion ? undefined : `advisor-float ${4 + (index % 3) * 0.6}s ease-in-out infinite`,
        animationDelay: `${(index % 5) * 0.3}s`,
      }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: "transform 0.15s ease-out",
        }}
        className={`group relative flex h-full flex-col items-center justify-center rounded-3xl border text-center backdrop-blur-sm transition-all duration-300 ${padding} ${
          size === "lg"
            ? "border-primary/30 bg-gradient-to-b from-primary/[0.08] to-white/[0.03] shadow-2xl shadow-primary/10 hover:border-primary/50"
            : size === "md"
              ? "border-white/15 bg-white/[0.05] hover:border-white/25 hover:bg-white/[0.07]"
              : "border-white/10 bg-white/[0.04] hover:border-white/20 hover:bg-white/[0.06]"
        }`}
      >
        <div className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300" style={glow} />

        {size === "lg" && (
          <span className="absolute top-5 left-1/2 -translate-x-1/2 rounded-full bg-primary/15 border border-primary/30 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
            Chairman &amp; CEO
          </span>
        )}

        <div style={{ transform: "translateZ(30px)" }} className="relative flex flex-col items-center">
          <div className={`relative flex ${avatarDims} items-center justify-center rounded-full ${c.bg} shadow-xl ${c.glow} ring-4 ring-white/10 transition-transform duration-300 group-hover:scale-110`}>
            <Icon className={`${iconDims} text-white drop-shadow`} />
            <div className="pointer-events-none absolute -bottom-2 h-2 w-[70%] rounded-full bg-black/50 blur-[3px]" />
          </div>

          <h3 className={`font-display mt-5 ${nameSize} font-bold leading-tight text-white`}>{advisor.name}</h3>
          <p className={`mt-1 ${size === "lg" ? "text-sm" : "text-xs"} font-semibold ${c.text}`}>{advisor.role}</p>
          <span className="mt-3 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
            {advisor.type}
          </span>
        </div>
      </div>
    </div>
  );
}

function OrgNode({
  icon: Icon,
  label,
  sub,
  active,
  colorKey,
  size = "md",
  className = "",
}: {
  icon: typeof Shield;
  label: string;
  sub?: string;
  active: boolean;
  colorKey: ColorKey;
  size?: "lg" | "md" | "sm";
  className?: string;
}) {
  const c = COLORS[colorKey];
  const dims = size === "lg" ? "h-28 w-28" : size === "md" ? "h-20 w-20" : "h-14 w-14";
  const iconDims = size === "lg" ? "h-11 w-11" : size === "md" ? "h-8 w-8" : "h-6 w-6";
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <div
        className={`relative flex ${dims} items-center justify-center rounded-full ${c.bg} transition-all duration-300 ${
          active ? `scale-110 ring-4 ${c.ring} shadow-2xl ${c.glow}` : "ring-2 ring-white/10 shadow-lg"
        }`}
      >
        <Icon className={`${iconDims} text-white drop-shadow`} />
        <div className="pointer-events-none absolute -bottom-2 h-2 w-[70%] rounded-full bg-black/50 blur-[2px]" />
      </div>
      <div
        className={`rounded-lg border px-2.5 py-1.5 text-center transition-all duration-300 ${
          active ? `border-white/30 bg-white/10 ${c.text}` : "border-white/10 bg-white/5 text-zinc-300"
        }`}
      >
        <span className="block text-[9px] md:text-[10px] font-bold uppercase leading-tight tracking-wide">{label}</span>
        {sub && <span className={`mt-0.5 block text-[9px] font-semibold ${c.text}`}>{sub}</span>}
      </div>
    </div>
  );
}

function RoadV({ h, active, accent }: { h: number; active: boolean; accent: string }) {
  return (
    <div
      className="road-v shrink-0"
      style={{
        width: 3,
        height: h,
        backgroundImage: `repeating-linear-gradient(to bottom, ${active ? accent : "#52525b"} 0px, ${active ? accent : "#52525b"} 6px, transparent 6px, transparent 14px)`,
      }}
    />
  );
}

// Bus + drop-line row. Uses the exact same gridTemplateColumns as the node
// row beneath it, so each vertical drop lands under its node's own center
// instead of drifting when column widths differ (leaf branches are narrower
// than branches with children).
function ConnectorRow({
  columns,
  branches,
}: {
  columns: string;
  branches: { active: boolean; accent: string }[];
}) {
  return (
    <div className="grid w-full" style={{ gridTemplateColumns: columns }}>
      {branches.map((b, i) => {
        const color = b.active ? b.accent : "#52525b";
        return (
          <div key={i} className="relative flex flex-col items-center">
            <div
              className="road-h absolute top-0 h-[3px]"
              style={{
                left: i === 0 ? "50%" : 0,
                right: i === branches.length - 1 ? "50%" : 0,
                backgroundImage: `repeating-linear-gradient(to right, ${color} 0px, ${color} 6px, transparent 6px, transparent 14px)`,
              }}
            />
            <RoadV h={26} active={b.active} accent={b.accent} />
          </div>
        );
      })}
    </div>
  );
}

// Node row sharing the same gridTemplateColumns as its ConnectorRow above it.
function NodeRow({ columns, children }: { columns: string; children: ReactNode }) {
  return (
    <div className="grid w-full" style={{ gridTemplateColumns: columns }}>
      {children}
    </div>
  );
}

// ── MAIN GOVERNANCE PAGE ──
export default function GovernanceClient() {
  const advisorsSectionRef = useRef<HTMLDivElement>(null);
  const orgSectionRef = useRef<HTMLDivElement>(null);
  const [activeBranch, setActiveBranch] = useState<string | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Advisor pedestals entrance
  useEffect(() => {
    if (!advisorsSectionRef.current) return;
    const ctx = gsap.context(() => {
      if (reduceMotion) return;
      gsap.fromTo(
        advisorsSectionRef.current!.querySelectorAll(".advisor-node"),
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: advisorsSectionRef.current,
            start: "top 78%",
          },
        }
      );
    }, advisorsSectionRef);
    return () => ctx.revert();
  }, [reduceMotion]);

  // Org chart entrance & cascading flow animation
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
        ".org-node-lvl1",
        { opacity: 0, y: -30, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(1.7)" }
      )
        .fromTo(
          ".org-node-lvl2",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".org-node-lvl3",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
          "-=0.2"
        )
        .fromTo(
          ".org-node-lvl4",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: "power2.out" },
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
        description="Explore the administrative hierarchy, flowchart channels, and the official Board of Advisors behind NIFS safety education."
      />

      {/* ── BOARD OF ADVISORS SECTION (isometric pedestal style, same concept as org chart) ── */}
      <section ref={advisorsSectionRef} className="bg-zinc-950 pt-20 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 text-center">
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">
              Institutional Quality Guard
            </span>
            <h2 className="font-display mt-2 text-3xl italic text-white md:text-5xl">
              Board of Advisors
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400">
              Official 9-member advisory council overseeing educational accuracy, compliance standards, and organizational governance.
            </p>
          </div>

          {/* Glass stat cards — matches the red/black pedestal language used across the page */}
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: "9", label: "Board Advisors", icon: Users },
              { value: "25+", label: "Years Legacy", icon: Award },
              { value: "15", label: "Departments", icon: Landmark },
            ].map((stat) => (
              <div
                key={stat.label}
                className="relative flex flex-col items-center rounded-3xl border border-white/10 bg-white/[0.04] p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:border-primary/30"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-b from-red-500 to-red-700 shadow-lg shadow-red-500/30 ring-4 ring-white/10">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <span className="font-display mt-5 text-4xl font-bold italic text-white sm:text-5xl">{stat.value}</span>
                <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">{stat.label}</span>
              </div>
            ))}
          </div>

          {(() => {
            const lastThree = ["Sri. Suneel Mahanty", "Smt. Kusuma Kumari . K", "Dr. GPR Krishna"];
            const ordered = [
              ...advisors.filter((a) => !lastThree.includes(a.name)),
              ...lastThree.map((name) => advisors.find((a) => a.name === name)!),
            ];

            return (
              <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 lg:grid-cols-3">
                {ordered.map((advisor, i) => (
                  <AdvisorPedestalCard key={advisor.id} advisor={advisor} index={i} />
                ))}
              </div>
            );
          })()}
        </div>
      </section>

      {/* ── ORGANIZATIONAL STRUCTURE SECTION (isometric pedestal style) ── */}
      <section ref={orgSectionRef} className="border-t border-zinc-800 bg-zinc-950 pt-28 pb-24">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-8">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3.5 py-1 text-xs font-semibold uppercase tracking-widest text-primary border border-primary/20">
              <Zap className="h-3.5 w-3.5" /> Interactive Command Hierarchy
            </span>
            <h2 className="font-display mt-3 text-3xl italic text-white md:text-5xl">
              Organizational Structure
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-zinc-400">
              Official Organizational Flowchart (NIFS_FLOW CHART AUG2026 REVISED). Hover over any branch to highlight command pathways.
            </p>
          </div>

          {/* Org Chart Container */}
          <div
            className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-12 shadow-xl overflow-x-auto"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
              backgroundSize: "22px 22px",
            }}
          >
            <div className="w-[1240px] mx-auto flex flex-col items-center py-6 select-none font-sans">

              {/* LEVEL 1: CHAIRMAN and CEO */}
              <div
                onMouseEnter={() => setActiveBranch("all")}
                onMouseLeave={() => setActiveBranch(null)}
                className="org-node-lvl1 cursor-pointer relative z-10"
              >
                <OrgNode
                  icon={Crown}
                  label="Chairman and CEO"
                  active={activeBranch !== null}
                  colorKey="chairman"
                  size="lg"
                />
              </div>

              <RoadV h={40} active={!!activeBranch} accent={COLORS.chairman.accent} />

              {/* LEVEL 2: 4 branches, columns matched between connector row and node row */}
              <ConnectorRow
                columns="460px 160px 160px 420px"
                branches={[
                  { active: activeBranch === "ops" || activeBranch === "all", accent: COLORS.ops.accent },
                  { active: activeBranch === "finance" || activeBranch === "all", accent: COLORS.finance.accent },
                  { active: activeBranch === "vigilence" || activeBranch === "all", accent: COLORS.vigilence.accent },
                  { active: activeBranch === "projects" || activeBranch === "all", accent: COLORS.projects.accent },
                ]}
              />

              <NodeRow columns="460px 160px 160px 420px">
                {/* BRANCH 1: GENERAL MANAGER OPERATIONS & PRINCIPAL */}
                <div
                  onMouseEnter={() => setActiveBranch("ops")}
                  onMouseLeave={() => setActiveBranch(null)}
                  className="flex flex-col items-center"
                >
                  <div className="org-node-lvl2">
                    <OrgNode
                      icon={Building2}
                      label="GM Operations & Principal"
                      active={activeBranch === "ops" || activeBranch === "all"}
                      colorKey="ops"
                    />
                  </div>

                  <RoadV h={32} active={activeBranch === "ops" || activeBranch === "all"} accent={COLORS.ops.accent} />

                  <ConnectorRow
                    columns="repeat(4, 1fr)"
                    branches={Array(4).fill({ active: activeBranch === "ops" || activeBranch === "all", accent: COLORS.ops.accent })}
                  />

                  {/* LEVEL 3 (4 nodes under GM Operations) */}
                  <NodeRow columns="repeat(4, 1fr)">
                    {[
                      { label: "Regional Managers", icon: Users },
                      { label: "Admin. Dept.", icon: ClipboardCheck },
                      { label: "Academic Dept.", icon: GraduationCap },
                      { label: "Examination Dept.", icon: FileCheck },
                    ].map(({ label, icon }) => (
                      <div key={label} className="org-node-lvl3 flex justify-center">
                        <OrgNode icon={icon} label={label} active={activeBranch === "ops" || activeBranch === "all"} colorKey="ops" size="sm" />
                      </div>
                    ))}
                  </NodeRow>

                  <RoadV h={28} active={activeBranch === "ops" || activeBranch === "all"} accent={COLORS.ops.accent} />

                  <div className="w-[75%]">
                    <ConnectorRow
                      columns="repeat(3, 1fr)"
                      branches={Array(3).fill({ active: activeBranch === "ops" || activeBranch === "all", accent: COLORS.ops.accent })}
                    />
                    {/* LEVEL 4 (3 nodes) */}
                    <NodeRow columns="repeat(3, 1fr)">
                      {[
                        { label: "Placement Dept.", icon: Briefcase },
                        { label: "Marketing Dept.", icon: Megaphone },
                        { label: "R & D Dept.", icon: FlaskConical },
                      ].map(({ label, icon }) => (
                        <div key={label} className="org-node-lvl4 flex justify-center">
                          <OrgNode icon={icon} label={label} active={activeBranch === "ops" || activeBranch === "all"} colorKey="ops" size="sm" />
                        </div>
                      ))}
                    </NodeRow>
                  </div>
                </div>

                {/* BRANCH 2: FINANCE DEPARTMENT (Leaf Node) */}
                <div
                  onMouseEnter={() => setActiveBranch("finance")}
                  onMouseLeave={() => setActiveBranch(null)}
                  className="flex flex-col items-center"
                >
                  <OrgNode
                    icon={Landmark}
                    label="Finance Department"
                    active={activeBranch === "finance" || activeBranch === "all"}
                    colorKey="finance"
                  />
                </div>

                {/* BRANCH 3: VIGILENCE DEPARTMENT (Leaf Node) */}
                <div
                  onMouseEnter={() => setActiveBranch("vigilence")}
                  onMouseLeave={() => setActiveBranch(null)}
                  className="flex flex-col items-center"
                >
                  <OrgNode
                    icon={ShieldAlert}
                    label="Vigilence Department"
                    active={activeBranch === "vigilence" || activeBranch === "all"}
                    colorKey="vigilence"
                  />
                </div>

                {/* BRANCH 4: GENERAL MANAGER PROJECTS */}
                <div
                  onMouseEnter={() => setActiveBranch("projects")}
                  onMouseLeave={() => setActiveBranch(null)}
                  className="flex flex-col items-center"
                >
                  <div className="org-node-lvl2">
                    <OrgNode
                      icon={Rocket}
                      label="GM Projects"
                      active={activeBranch === "projects" || activeBranch === "all"}
                      colorKey="projects"
                    />
                  </div>

                  <RoadV h={32} active={activeBranch === "projects" || activeBranch === "all"} accent={COLORS.projects.accent} />

                  <ConnectorRow
                    columns="repeat(4, 1fr)"
                    branches={Array(4).fill({ active: activeBranch === "projects" || activeBranch === "all", accent: COLORS.projects.accent })}
                  />

                  {/* LEVEL 3 (4 nodes under GM Projects) */}
                  <NodeRow columns="repeat(4, 1fr)">
                    {[
                      { label: "Admin. Dpt.", icon: ClipboardCheck },
                      { label: "Industrial Trainings", icon: HardHat },
                      { label: "HR - Projects", icon: Users },
                      { label: "Business Development", icon: TrendingUp },
                    ].map(({ label, icon }) => (
                      <div key={label} className="org-node-lvl3 flex justify-center">
                        <OrgNode icon={icon} label={label} active={activeBranch === "projects" || activeBranch === "all"} colorKey="projects" size="sm" />
                      </div>
                    ))}
                  </NodeRow>

                  <RoadV h={28} active={activeBranch === "projects" || activeBranch === "all"} accent={COLORS.projects.accent} />

                  <div className="w-[55%]">
                    <ConnectorRow
                      columns="repeat(2, 1fr)"
                      branches={Array(2).fill({ active: activeBranch === "projects" || activeBranch === "all", accent: COLORS.projects.accent })}
                    />
                    {/* LEVEL 4 (2 nodes) */}
                    <NodeRow columns="repeat(2, 1fr)">
                      {[
                        { label: "Technical Dpt.", icon: Wrench },
                        { label: "R & D Dept.", icon: FlaskConical },
                      ].map(({ label, icon }) => (
                        <div key={label} className="org-node-lvl4 flex justify-center">
                          <OrgNode icon={icon} label={label} active={activeBranch === "projects" || activeBranch === "all"} colorKey="projects" size="sm" />
                        </div>
                      ))}
                    </NodeRow>
                  </div>
                </div>
              </NodeRow>

            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes road-flow-v {
          to { background-position: 0 -20px; }
        }
        @keyframes road-flow-h {
          to { background-position: -20px 0; }
        }
        .road-v { animation: road-flow-v 0.9s linear infinite; }
        .road-h { animation: road-flow-h 0.9s linear infinite; }

        @keyframes advisor-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </>
  );
}
