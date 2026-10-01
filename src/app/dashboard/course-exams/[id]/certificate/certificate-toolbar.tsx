"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Mail, Printer, RefreshCw } from "lucide-react";
import { sendCertificateEmailAction } from "../../actions";

interface CertificateToolbarProps {
  id: number;
  name: string;
  email: string;
  certNo: string;
  date: string;
  initialSentAt?: Date | null;
}

export function CertificateToolbar({
  id,
  name,
  email,
  certNo,
  date,
  initialSentAt,
}: CertificateToolbarProps) {
  const [sentAt, setSentAt] = useState<string | null>(
    initialSentAt ? initialSentAt.toISOString() : null
  );
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (sending) return;
    setSending(true);

    const mailSubject = encodeURIComponent(
      `Official Certificate of Completion: Occupational Ergonomic Safety (${certNo}) - NIFS India`
    );
    const mailBody = encodeURIComponent(
      `Dear ${name},\n\n` +
      `Congratulations on successfully completing the executive credential program in Occupational Ergonomic Safety (NIFS-ES) conducted by the National Institute of Fire & Safety (NIFS India).\n\n` +
      `YOUR OFFICIAL CREDENTIAL DETAILS:\n` +
      `• Candidate Name: ${name.toUpperCase()}\n` +
      `• Certificate ID: ${certNo}\n` +
      `• Issue Date: ${date}\n` +
      `• Verification Status: Verified & Tamper-Evident\n` +
      `• Verification Portal: https://www.nifsindia.net\n\n` +
      `ACADEMIC CREDIT PATHWAY & DIRECT ADMISSION:\n` +
      `This certified qualification officially awards Continuing Professional Development (CPD) credits, recognized towards prior learning assessment and direct fast-track admission into NIFS Sanctioned Programs:\n` +
      `1. Advance Diploma in Industrial Safety (ADIS) — 1 Year Sanctioned Program\n` +
      `2. B.Sc. in Fire & Industrial Safety — 4 Years Sanctioned Program\n\n` +
      `To claim your credit transfer and discuss direct admissions with placement assistance, please connect with our admissions team:\n` +
      `• Phone / WhatsApp: +91 8374 340 999\n` +
      `• Email: headoffice@nifsindia.com\n` +
      `• Course Portal: https://www.nifsindia.net/courses/\n\n` +
      `Warm regards,\n` +
      `Controller of Academics & Examination Board\n` +
      `National Institute of Fire & Safety (NIFS India)\n` +
      `Govt. Recognized • Estd. 2004`
    );

    // Open default mail client with pre-composed professional letter
    window.location.href = `mailto:${email}?subject=${mailSubject}&body=${mailBody}`;

    // Mark as sent in database
    try {
      const res = await sendCertificateEmailAction(id);
      if (res.ok && res.sentAt) {
        setSentAt(res.sentAt);
      }
    } catch (err) {
      console.error("Failed to mark certificate sent:", err);
    } finally {
      setSending(false);
    }
  };

  const formattedSentDate = sentAt
    ? new Date(sentAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata",
      })
    : null;

  return (
    <div className="no-print w-full max-w-[297mm] flex flex-wrap items-center justify-between gap-4 bg-white px-6 py-3.5 rounded-xl shadow-md border border-stone-200">
      {/* Actions Left */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#8B1E1E] hover:bg-[#701818] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all cursor-pointer"
        >
          <Printer className="h-4 w-4" />
          <span>Print / Save as PDF</span>
        </button>

        <button
          type="button"
          onClick={handleSend}
          disabled={sending}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-all cursor-pointer ${
            sentAt
              ? "bg-stone-100 hover:bg-stone-200 text-stone-800 border border-stone-300"
              : "bg-[#2563EB] hover:bg-[#1D4ED8] text-white"
          }`}
        >
          {sending ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <Mail className="h-4 w-4" />
          )}
          <span>
            {sending
              ? "Opening Mail..."
              : sentAt
              ? "Send Email Again"
              : `Send to ${email}`}
          </span>
        </button>
      </div>

      {/* Status Right */}
      <div className="flex items-center gap-4 text-xs">
        {sentAt ? (
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-full font-medium">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Marked as Sent ({formattedSentDate})</span>
          </div>
        ) : (
          <span className="text-stone-500 font-medium">
            Status: <strong className="text-amber-700">Not marked as sent yet</strong>
          </span>
        )}

        <Link
          href="/dashboard/course-exams"
          className="text-stone-500 hover:text-stone-900 underline underline-offset-2 ml-2"
        >
          ← Back to Exams
        </Link>
      </div>
    </div>
  );
}

