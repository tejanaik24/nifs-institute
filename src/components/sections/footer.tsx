"use client";

import Link from "next/link";
import { MessageSquare, Phone, Mail, MapPin } from "lucide-react";
import { NifsCrest } from "@/components/nifs-crest";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-path-target="true"
      className="relative bg-[#0A0A0A] border-t border-white/5 pt-16 pb-8 px-6 md:px-10 z-10 overflow-hidden"
    >
      {/* Footer Grid */}
      <div className="mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Column 1: Logo & Tagline */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2 group w-fit">
            <NifsCrest className="h-8 w-8 text-[#FF4500]" />
            <span className="font-sans text-lg font-bold tracking-wider text-white group-hover:text-[#FF4500] transition-colors">
              NIFS
            </span>
          </Link>
          <p className="text-xs text-white/50 leading-relaxed max-w-xs">
            National Institute of Fire and Safety (NIFS) is India's leading industrial safety training academy, igniting careers since 2006.
          </p>
          {/* Social Row */}
          <div className="flex items-center gap-3 mt-2">
            <Link
              href="https://facebook.com"
              target="_blank"
              className="p-2 border border-white/5 bg-[#111111]/60 text-white/70 hover:text-[#FF4500] hover:border-[#FF4500]/30 rounded-full transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H14c-3.3 0-5 1.7-5 5v2z"/>
              </svg>
            </Link>
            <Link
              href="https://instagram.com"
              target="_blank"
              className="p-2 border border-white/5 bg-[#111111]/60 text-white/70 hover:text-[#FF4500] hover:border-[#FF4500]/30 rounded-full transition-all"
            >
              <svg className="h-4 w-4 stroke-current fill-none stroke-2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </Link>
            <Link
              href="https://youtube.com"
              target="_blank"
              className="p-2 border border-white/5 bg-[#111111]/60 text-white/70 hover:text-[#FF4500] hover:border-[#FF4500]/30 rounded-full transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M23.5 6.8c-.3-1.1-1.1-2-2.2-2.3C19.3 4 12 4 12 4s-7.3 0-9.3.5c-1.1.3-1.9 1.2-2.2 2.3A29 29 0 0 0 0 12a29 29 0 0 0 .5 5.2c.3 1.1 1.1 2 2.2 2.3 2 .5 9.3.5 9.3.5s7.3 0 9.3-.5c1.1-.3 1.9-1.2 2.2-2.3.5-2 .5-5.2.5-5.2s0-3.2-.5-5.2zM9.5 15.5V8.5l6.5 3.5-6.5 3.5z"/>
              </svg>
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="p-2 border border-white/5 bg-[#111111]/60 text-white/70 hover:text-[#FF4500] hover:border-[#FF4500]/30 rounded-full transition-all"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF4500] font-bold">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-white/60">
            <li>
              <Link href="/" className="hover:text-[#FF4500] transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-[#FF4500] transition-colors">About NIFS</Link>
            </li>
            <li>
              <Link href="/placements" className="hover:text-[#FF4500] transition-colors">Placements Cell</Link>
            </li>
            <li>
              <Link href="/centers" className="hover:text-[#FF4500] transition-colors">Find a Center</Link>
            </li>
            <li>
              <Link href="/admissions" className="hover:text-[#FF4500] transition-colors">Admissions Guidelines</Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Courses */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF4500] font-bold">
            Top Programs
          </h4>
          <ul className="flex flex-col gap-2.5 text-xs text-white/60">
            <li>
              <Link href="/courses/diploma-in-fire-safety" className="hover:text-[#FF4500] transition-colors">Diploma in Fire Safety</Link>
            </li>
            <li>
              <Link href="/courses/diploma-in-health-safety-environment" className="hover:text-[#FF4500] transition-colors">Diploma in HSE</Link>
            </li>
            <li>
              <Link href="/courses/advanced-diploma-in-fire-safety" className="hover:text-[#FF4500] transition-colors">Advanced Diploma in Fire &amp; Safety</Link>
            </li>
            <li>
              <Link href="/courses/bsc-fire-safety" className="hover:text-[#FF4500] transition-colors">BSc Fire Safety Degree</Link>
            </li>
            <li>
              <Link href="/courses/mba-safety-management" className="hover:text-[#FF4500] transition-colors">MBA Safety Management</Link>
            </li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="flex flex-col gap-4">
          <h4 className="font-mono text-xs uppercase tracking-widest text-[#FF4500] font-bold">
            Contact
          </h4>
          <ul className="flex flex-col gap-3 text-xs text-white/60">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#FFB347]" />
              <span>+91-9246-624-690</span>
            </li>
            <li className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#FF4500]" />
              <Link
                href="https://wa.me/919246624690"
                target="_blank"
                className="hover:text-[#FF4500] transition-colors font-semibold"
              >
                WhatsApp Support
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#FFB347]" />
              <span>info@nifsindia.com</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#FF4500]" />
              <span>Visakhapatnam, AP, India</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="mx-auto max-w-7xl pt-8 border-t border-white/5 text-center text-[10px] text-white/40">
        &copy; {currentYear} National Institute of Fire and Safety. All rights reserved.
      </div>
    </footer>
  );
}
