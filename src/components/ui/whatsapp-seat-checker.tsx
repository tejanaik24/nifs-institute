"use client";

import { Building2, CheckCircle2, MessageSquare } from "lucide-react";
import { useState } from "react";

interface WhatsAppSeatCheckerProps {
  courseName: string;
  isUniversityDegree?: boolean;
}

const NIFS_CENTERS = [
  "Visakhapatnam (HQ)",
  "Hyderabad",
  "Vijayawada",
  "Bhubaneswar",
  "Chennai",
  "Bangalore",
  "Kolkata",
  "Mumbai / Pune",
  "Delhi NCR",
  "Patna",
  "Raipur",
  "Other Nearest Center",
];

export default function WhatsAppSeatChecker({
  courseName,
  isUniversityDegree = false,
}: WhatsAppSeatCheckerProps) {
  const [selectedCenter, setSelectedCenter] = useState(NIFS_CENTERS[0]);

  const message = isUniversityDegree
    ? `Hi NIFS, I want to check Acharya Nagarjuna University (ANU) degree seat availability, fee structure, and eligibility for ${courseName} at the ${selectedCenter} center.`
    : `Hi NIFS, I want to check admission seat availability, syllabus, and fee structure for ${courseName} at the ${selectedCenter} center.`;

  const waUrl = `https://wa.me/918374340999?text=${encodeURIComponent(message)}`;

  return (
    <div className="rounded-2xl border-2 border-[#25D366]/40 bg-[#25D366]/5 p-6 sm:p-8 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-5">
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#25D366]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#075E54]">
            <CheckCircle2 className="h-3.5 w-3.5" /> Direct Admissions Desk
          </span>
          <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mt-2">
            Check Seat Availability at Nearest NIFS Center
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            {isUniversityDegree
              ? "Limited university batch quota for Acharya Nagarjuna University degree programs."
              : "Direct admission counseling across 70+ training centers in India."}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground shrink-0 bg-background/80 px-3 py-1.5 rounded-lg border border-border">
          <Building2 className="h-4 w-4 text-primary" />
          <span>70+ Centers Pan-India</span>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:items-end">
        <div className="sm:col-span-2 space-y-1.5">
          <label
            htmlFor="center-select"
            className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
          >
            Select Your Preferred Center:
          </label>
          <select
            id="center-select"
            value={selectedCenter}
            onChange={(e) => setSelectedCenter(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm font-medium text-foreground focus:border-[#25D366] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
          >
            {NIFS_CENTERS.map((center) => (
              <option key={center} value={center}>
                {center}
              </option>
            ))}
          </select>
        </div>

        <div>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] px-5 py-3 text-sm font-bold text-white shadow-md shadow-[#25D366]/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageSquare className="h-4 w-4 fill-current" />
            <span>Check via WhatsApp</span>
          </a>
        </div>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground text-center sm:text-left">
        ⚡ Instant response from regional senior counselor • Official admission
        confirmation &amp; syllabus brochure via PDF.
      </p>
    </div>
  );
}
