"use client";

import { useState } from "react";

type TabName = "updates" | "events" | "jobs" | "industrial";

const TABS: { name: TabName; label: string; icon: React.ReactNode }[] = [
  {
    name: "updates",
    label: "NIFS Updates",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    name: "events",
    label: "Events",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    name: "jobs",
    label: "Jobs",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    name: "industrial",
    label: "Industrial Works",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
];

function Row({ dot, children }: { dot: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-[16px] cursor-pointer group">
      <span className={`w-2 h-2 rounded-full ${dot} mt-2 flex-shrink-0 group-hover:scale-125 transition-transform`} />
      {children}
    </div>
  );
}

export default function HomeUpdatesTabs() {
  const [tab, setTab] = useState<TabName>("updates");

  return (
    <section className="w-full bg-[#0d0d0d] py-[90px] max-lg:py-[60px]">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <span className="font-sans text-nifs-red text-xs font-bold uppercase tracking-[4px]">Live Feed</span>
          <h2 className="font-sans text-white text-[2.8vw] max-lg:text-[5vw] max-sm:text-[26px] font-black leading-tight break-words w-full">NIFS <span className="font-display italic">Updates</span></h2>
          <p className="font-sans text-white/40 text-[14px]">Real-time announcements, events, and opportunities from NIFS</p>
        </div>

        <div className="flex gap-6 max-lg:flex-col">
          <div className="flex flex-col gap-3 w-[220px] max-lg:flex-row max-lg:w-full max-lg:overflow-x-auto max-lg:pb-2 flex-shrink-0">
            {TABS.map((t) => (
              <button
                key={t.name}
                type="button"
                onClick={() => setTab(t.name)}
                className={`flex items-center gap-3 px-5 py-3.5 rounded-[14px] text-left transition-all duration-300 font-sans font-bold text-[14px] whitespace-nowrap cursor-pointer ${
                  tab === t.name ? "bg-nifs-red text-white shadow-lg" : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 bg-white/[0.04] border border-white/10 rounded-[24px] p-8 max-sm:p-5 min-h-[320px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-nifs-red/5 rounded-full blur-[80px] pointer-events-none" />

            {tab === "updates" && (
              <div className="flex flex-col gap-4">
                <Row dot="bg-nifs-red">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">Admissions Open for Diploma / PG Diploma / Degree / PG and International Courses 2026</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">Latest · Admissions</span>
                  </div>
                </Row>
                <Row dot="bg-nifs-orange">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">NIFS offering Certification in Defensive Driving Training recognized by Govt of Andhra Pradesh</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">Certification · New Program</span>
                  </div>
                </Row>
                <Row dot="bg-nifs-green">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">NIFS India achieves Milestone Collaboration with Acharya Nagarjuna University for advanced certifications</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">Partnership · July 2025</span>
                  </div>
                </Row>
                <Row dot="bg-nifs-red">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">NSDC-approved e-Learning programs now available for working professionals across India</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">E-Learning · Online</span>
                  </div>
                </Row>
              </div>
            )}

            {tab === "events" && (
              <div className="flex flex-col gap-4">
                {[
                  { day: "28", mon: "Jul", chip: "bg-nifs-red/20", num: "text-nifs-red", sub: "text-nifs-red/70", title: "Campus Recruitment Drive — Adani, L&T, GMR Group", meta: "Visakhapatnam HQ · Open to all graduates" },
                  { day: "05", mon: "Aug", chip: "bg-nifs-orange/20", num: "text-nifs-orange", sub: "text-nifs-orange/70", title: "Industrial Fire Safety Awareness Seminar — Hyderabad Center", meta: "Hyderabad · Free Entry" },
                  { day: "15", mon: "Aug", chip: "bg-nifs-green/20", num: "text-nifs-green", sub: "text-nifs-green/70", title: "NIFS Annual Convocation Ceremony — 2025 Batch", meta: "Vizag · Students & Parents Welcome" },
                ].map((e) => (
                  <div key={e.title} className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-[16px] cursor-pointer group">
                    <div className={`flex-shrink-0 flex flex-col items-center ${e.chip} rounded-[12px] px-3 py-2 min-w-[52px] text-center`}>
                      <span className={`font-sans ${e.num} font-black text-[20px] leading-none`}>{e.day}</span>
                      <span className={`font-sans ${e.sub} text-[10px] uppercase font-bold`}>{e.mon}</span>
                    </div>
                    <div>
                      <p className="font-sans text-white font-semibold text-[14px] leading-snug">{e.title}</p>
                      <span className="font-sans text-white/40 text-[12px] mt-1 block">{e.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "jobs" && (
              <div className="flex flex-col gap-4">
                {[
                  { dot: "bg-nifs-green", badge: "Hiring", badgeCls: "bg-nifs-green/20 text-nifs-green", title: "Safety Officer — Adani Ports, Visakhapatnam", meta: "B.Sc / Diploma · 1-3 yrs exp" },
                  { dot: "bg-nifs-green", badge: "Hiring", badgeCls: "bg-nifs-green/20 text-nifs-green", title: "Fire Safety Inspector — L&T Construction, Chennai", meta: "Diploma / PG Diploma · Fresher OK" },
                  { dot: "bg-nifs-orange", badge: "Urgent", badgeCls: "bg-nifs-orange/20 text-nifs-orange", title: "HSE Supervisor — GMR Group, Hyderabad Airport", meta: "Advanced Diploma · 2+ yrs exp" },
                ].map((j) => (
                  <div key={j.title} className="flex items-start gap-4 p-4 bg-white/5 hover:bg-white/10 transition-colors duration-200 rounded-[16px] cursor-pointer group">
                    <span className={`w-2 h-2 rounded-full ${j.dot} mt-2 flex-shrink-0`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="font-sans text-white font-semibold text-[14px] leading-snug">{j.title}</p>
                        <span className={`font-sans ${j.badgeCls} text-[11px] font-bold px-2.5 py-1 rounded-full`}>{j.badge}</span>
                      </div>
                      <span className="font-sans text-white/40 text-[12px] mt-1 block">{j.meta}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {tab === "industrial" && (
              <div className="flex flex-col gap-4">
                <Row dot="bg-nifs-red">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">Fire Safety Audit conducted at Nilkamal Manufacturing Plant, Silvassa</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">Industrial Services · June 2025</span>
                  </div>
                </Row>
                <Row dot="bg-nifs-orange">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">Emergency Response Drill for MEIL Infrastructure sites across 3 states</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">Industrial Services · May 2025</span>
                  </div>
                </Row>
                <Row dot="bg-nifs-green">
                  <div>
                    <p className="font-sans text-white font-semibold text-[14px] leading-snug">Safety Compliance Assessment for Amazon Fulfillment Center, Hyderabad — NIFS Certified</p>
                    <span className="font-sans text-white/40 text-[12px] mt-1 block">Compliance · April 2025</span>
                  </div>
                </Row>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
