"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What are the eligibility criteria for NIFS courses?",
    a: "Diploma courses require 10th / SSC / HSE. PG Diplomas and Advanced Diplomas require a Bachelor's Degree or 3-year Diploma in any stream. B.Sc. programs require 10+2. SBTET requires BE / B.Tech / Diploma with experience.",
  },
  {
    q: "How long do NIFS courses take?",
    a: "Certificate courses: 3-6 months. Diplomas: 1 year. Advanced Diplomas: 18 months. B.Sc.: 3 years. Course durations range from 3 months to 3 years.",
  },
  {
    q: "Does NIFS provide placement assistance?",
    a: "Yes. Dedicated placement cell connecting graduates with Adani, L&T, ITC, GMR, Amazon, Lansum, MEIL, Nilkamal, and hundreds of leading industries. Resume preparation, interview readiness, and recruiter coordination included.",
  },
  {
    q: "Where are NIFS centers located?",
    a: "86 training centers across 24 states. Headquarters in Visakhapatnam, Andhra Pradesh. Major centers in Chennai, Mumbai, Delhi NCR, Kolkata, Bangalore, Hyderabad, Ahmedabad, and many more. Also in 3+ African countries.",
  },
  {
    q: "Are NIFS certifications recognized for government jobs?",
    a: "Yes. NSDC approved, affiliated with Acharya Nagarjuna University, Annamalai University, and recognized by SBTET, Andhra Pradesh. Qualifications are valid for government and public sector job applications across India, Gulf, and international markets.",
  },
  {
    q: "Is education loan facility available?",
    a: "Yes, education loan facility is available for all NIFS courses. We assist students in connecting with financial institutions that offer education loans for professional safety training programs.",
  },
  {
    q: "Can I pursue NIFS courses online?",
    a: "Yes. NSDC-approved diploma programs and certain certificate courses are available through e-learning. Working professionals and students in remote areas can access NIFS training without relocating.",
  },
  {
    q: "What is the 70/30 curriculum model?",
    a: "70% practical hands-on training in fire drills, safety audits, hazard simulations, and industrial site visits. 30% classroom theory. This ensures graduates are job-ready from day one, not just degree-holders.",
  },
  {
    q: "Does NIFS offer Defensive Driving Training?",
    a: "Yes. NIFS offers Defensive Driving Certification recognized by the Government of Andhra Pradesh — a specialized program for transport and logistics safety professionals.",
  },
];

// On mobile show the first MOBILE_INITIAL questions by default.
// Desktop always shows all 9 (the extra wrapper has no effect at sm+).
const MOBILE_INITIAL = 4;

export default function HomeFaq() {
  const [open, setOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  return (
    <section className="w-full py-[80px] max-lg:py-[50px] max-md:py-[40px] max-sm:py-[50px] bg-white flex justify-center items-center flex-col overflow-x-hidden">
      <div className="w-[1100px] max-w-full max-lg:w-[90%] max-sm:w-[95%] flex flex-col gap-[40px] max-sm:gap-[24px] items-center">
        <h2 className="font-sans text-[5vw] max-lg:text-[8vw] max-sm:text-[36px] font-black leading-none text-left w-full break-words">FAQ</h2>

        <dl className="w-full flex flex-col gap-[20px] max-sm:gap-[16px]">
          {/* First MOBILE_INITIAL questions — always visible on all breakpoints */}
          {FAQS.slice(0, MOBILE_INITIAL).map((item, i) => (
            <div key={item.q} className="border-b-2 pb-[20px] faq-hidden">
              <dt>
                <button
                  type="button"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  className="w-full text-left font-sans text-[22px] max-md:text-[18px] max-sm:text-[16px] font-bold pb-[8px] cursor-pointer flex justify-between items-start gap-4"
                >
                  {item.q}
                  <span className={`text-nifs-red transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>+</span>
                </button>
              </dt>
              {open === i && (
                <dd className="font-sans text-black font-medium leading-[150%] text-[15px] max-sm:text-[14px]">{item.a}</dd>
              )}
            </div>
          ))}

          {/*
            Remaining questions (index 4-8):
            - Desktop (sm+): always visible — `sm:block` overrides the mobile hidden state.
            - Mobile: hidden until showAll is true.
            All items remain in the DOM, just visually toggled.
          */}
          {FAQS.slice(MOBILE_INITIAL).map((item, idx) => {
            const i = MOBILE_INITIAL + idx;
            return (
              <div
                key={item.q}
                className={`border-b-2 pb-[20px] faq-hidden ${showAll ? "" : "max-sm:hidden"}`}
              >
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(open === i ? null : i)}
                    aria-expanded={open === i}
                    className="w-full text-left font-sans text-[22px] max-md:text-[18px] max-sm:text-[16px] font-bold pb-[8px] cursor-pointer flex justify-between items-start gap-4"
                  >
                    {item.q}
                    <span className={`text-nifs-red transition-transform duration-200 ${open === i ? "rotate-45" : ""}`}>+</span>
                  </button>
                </dt>
                {open === i && (
                  <dd className="font-sans text-black font-medium leading-[150%] text-[15px] max-sm:text-[14px]">{item.a}</dd>
                )}
              </div>
            );
          })}
        </dl>

        {/* Show more / less toggle — only visible on mobile */}
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="sm:hidden font-sans text-[14px] font-semibold text-nifs-red underline underline-offset-2 cursor-pointer bg-transparent border-none p-0 self-start"
          aria-expanded={showAll}
        >
          {showAll ? "Show fewer questions" : "Show more questions"}
        </button>
      </div>
    </section>
  );
}
