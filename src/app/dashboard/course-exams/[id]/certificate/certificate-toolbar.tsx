"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Check, Mail, Printer, RefreshCw } from "lucide-react";
import { sendCertificateEmailAction } from "../../actions";

interface CertificateToolbarProps {
  id: number;
  email: string;
  initialSentAt?: Date | null;
}

export function CertificateToolbar({
  id,
  email,
  initialSentAt,
}: CertificateToolbarProps) {
  const [sentAt, setSentAt] = useState<string | null>(
    initialSentAt ? initialSentAt.toISOString() : null
  );
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async () => {
    if (sending) return;
    setSending(true);
    setError(null);

    try {
      const certEl = document.querySelector(".cert") as HTMLElement | null;
      let pdfBase64: string | undefined;
      if (certEl) {
        const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
          // html2canvas-pro, not html2canvas — vanilla html2canvas can't parse
          // the lab()/oklch() colors Tailwind v4 generates and throws instead
          // of rendering (confirmed by an actual failed capture, not a guess).
          import("html2canvas-pro"),
          import("jspdf"),
        ]);
        const canvas = await html2canvas(certEl, { scale: 2, useCORS: true });
        const pdf = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
        pdf.addImage(canvas.toDataURL("image/jpeg", 0.92), "JPEG", 0, 0, 297, 210);
        pdfBase64 = pdf.output("datauristring").split(",")[1];
      }

      const res = await sendCertificateEmailAction(id, pdfBase64);
      if (res.ok && res.sentAt) {
        setSentAt(res.sentAt);
      } else {
        setError(res.error ?? "Failed to send — try again.");
      }
    } catch {
      setError("Failed to send — try again.");
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
              ? "Sending..."
              : sentAt
              ? "Send Email Again"
              : `Send to ${email}`}
          </span>
        </button>
      </div>

      {/* Status Right */}
      <div className="flex items-center gap-4 text-xs">
        {error ? (
          <div className="inline-flex items-center gap-1.5 bg-red-50 text-red-800 border border-red-300 px-3 py-1.5 rounded-full font-medium">
            <AlertTriangle className="h-3.5 w-3.5 text-red-600" />
            <span>{error}</span>
          </div>
        ) : sentAt ? (
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-300 px-3 py-1.5 rounded-full font-medium">
            <Check className="h-3.5 w-3.5 text-emerald-600" />
            <span>Sent ({formattedSentDate})</span>
          </div>
        ) : (
          <span className="text-stone-500 font-medium">
            Status: <strong className="text-amber-700">Not sent yet</strong>
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

