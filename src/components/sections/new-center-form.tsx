"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Send,
  Loader2,
  MessageSquare,
  Sparkles,
  ArrowRight,
  User,
} from "lucide-react";
import {
  centerApplicationSchema,
  type CenterApplicationInput,
  type CenterApplicationValues,
} from "@/lib/center-application";

export function NewCenterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successData, setSuccessData] = useState<{
    applicationId: string;
    directorEmail: string;
    values: CenterApplicationValues;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CenterApplicationInput, unknown, CenterApplicationValues>({
    resolver: zodResolver(centerApplicationSchema),
    defaultValues: {
      name: "",
      location: "",
      phone: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (values: CenterApplicationValues) => {
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/centers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Submission failed. Please try again.");
      }

      setSuccessData({
        applicationId: json.applicationId || "NIFS-CTR-CONFIRMED",
        directorEmail: json.directorEmail || "director@nifsindia.com",
        values,
      });
      reset();
    } catch (err: unknown) {
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Unable to process application right now. Please reach director@nifsindia.com directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (successData) {
    const v = successData.values;
    const mailSubject = encodeURIComponent(
      `New Center Application: ${v.location} - [${v.name}] (${successData.applicationId})`
    );
    const mailBody = encodeURIComponent(
      `Respected Director,\n\nI have submitted our application for opening a new NIFS Training Center in ${v.location}.\n\nApplication Details:\n- Reference ID: ${successData.applicationId}\n- Name: ${v.name}\n- Location: ${v.location}\n- Phone: ${v.phone}\n- Email: ${v.email}\n- Message: ${v.message || "N/A"}\n\nLooking forward to hearing from your office.\n\nWarm regards,\n${v.name}\n${v.phone}`
    );
    const mailtoUrl = `mailto:${successData.directorEmail}?subject=${mailSubject}&body=${mailBody}`;

    const waMsg = encodeURIComponent(
      `Hi NIFS Directorate, I have submitted an application for starting a new NIFS Center in ${v.location} (Ref: ${successData.applicationId}). My name is ${v.name} (${v.phone}). Please review my proposal.`
    );
    const waUrl = `https://wa.me/918374340999?text=${waMsg}`;

    return (
      <div className="rounded-3xl border border-emerald-500/40 bg-gradient-to-b from-emerald-950/30 via-slate-900/80 to-slate-950 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/50 text-emerald-400 shadow-xl shadow-emerald-900/40 animate-pulse">
            <CheckCircle2 className="h-10 w-10" />
          </div>

          <span className="inline-block rounded-full bg-emerald-500/20 border border-emerald-500/40 px-4 py-1 text-xs font-bold uppercase tracking-wider text-emerald-300 mb-3">
            Application Dispatched to Directorate
          </span>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-2">
            Center Proposal Received
          </h3>

          <div className="my-3 inline-block rounded-lg bg-emerald-950/70 border border-emerald-800/50 py-1.5 px-4 font-mono text-xs font-semibold text-emerald-300">
            Reference ID: {successData.applicationId}
          </div>

          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Your proposal to establish an authorized NIFS Training Center in{" "}
            <strong className="text-white">{v.location}</strong> has been logged in the NIFS Institutional Network database and forwarded directly to the{" "}
            <strong className="text-emerald-300">Office of the Director ({successData.directorEmail})</strong>.
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href={mailtoUrl}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-red-900/40 hover:bg-red-500 transition-all cursor-pointer"
            >
              <Mail className="h-4 w-4" />
              <span>Send Direct Email to Director</span>
            </a>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/40 hover:bg-emerald-500 transition-all cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
              <span>WhatsApp Directorate (+91-8374-340-999)</span>
            </a>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-950/70 p-5 text-left text-xs text-slate-400 space-y-2 mb-6">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>What happens next?</span>
            </div>
            <p>1. The Directorate reviews your proposed city/location for geographical feasibility and territorial zoning.</p>
            <p>2. A senior project coordinator will contact you directly within 24–48 business hours.</p>
            <p>3. Direct official correspondence will be initiated from <code className="text-emerald-300">director@nifsindia.com</code>.</p>
          </div>

          <button
            type="button"
            onClick={() => setSuccessData(null)}
            className="text-xs text-slate-400 hover:text-white underline cursor-pointer transition-colors"
          >
            ← Submit another application or update details
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/90 p-6 sm:p-10 shadow-2xl backdrop-blur-2xl">
      <div className="mb-7 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/20 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 mb-2">
          <Building2 className="h-3.5 w-3.5" />
          <span>Center Partnership Application</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Apply for a New NIFS Training Center
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1.5">
          Fast-track 1-minute application. Proposals are evaluated directly by the Directorate (<code className="font-mono text-red-600 dark:text-red-400">director@nifsindia.com</code>).
        </p>
      </div>

      {errorMsg && (
        <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-600 dark:text-red-400">
          ⚠️ {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name / Organization Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              {...register("name")}
              placeholder="e.g. Ramesh Varma / ABC Education Society"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 pl-10 pr-4 py-3 text-base sm:text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:border-red-600 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-red-600/20"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>

        {/* Proposed Location */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Proposed Location (City &amp; State) <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <MapPin className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              {...register("location")}
              placeholder="e.g. Surat, Gujarat or Nashik, Maharashtra"
              className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 pl-10 pr-4 py-3 text-base sm:text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:border-red-600 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-red-600/20"
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>
          )}
        </div>

        {/* Phone & Mail ID Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="tel"
                {...register("phone")}
                placeholder="+91-9876543210 (WhatsApp)"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 pl-10 pr-4 py-3 text-base sm:text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:border-red-600 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-red-600/20"
              />
            </div>
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Mail ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="email"
                {...register("email")}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 pl-10 pr-4 py-3 text-base sm:text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:border-red-600 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-red-600/20"
              />
            </div>
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Etc / Tell the Director box */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            Anything else you&apos;d like to mention? (Optional)
          </label>
          <textarea
            rows={3}
            {...register("message")}
            placeholder="Available carpet area / space, existing institute, prior safety experience, or any specific questions for the Director..."
            className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-950 px-4 py-3 text-base sm:text-sm text-slate-900 dark:text-white outline-none transition-all placeholder:text-slate-400 focus:border-red-600 focus:bg-white dark:focus:bg-slate-950 focus:ring-2 focus:ring-red-600/20 resize-none"
          />
        </div>

        {/* Direct Routing Tag */}
        <div className="flex items-center gap-2.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-xs text-emerald-900 dark:text-emerald-300">
          <Mail className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            Routed directly to the Director: <strong className="font-mono">director@nifsindia.com</strong>
          </span>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-red-600/25 transition-all hover:from-red-500 hover:to-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600/40 disabled:opacity-70 cursor-pointer flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Routing Proposal to Director...</span>
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                <span>Submit Center Proposal to Directorate →</span>
              </>
            )}
          </button>
          <p className="mt-2 text-center text-[11px] text-slate-500 dark:text-slate-400">
            Official NIFS India National Center Authorization Desk • Visakhapatnam Headquarters
          </p>
        </div>
      </form>
    </div>
  );
}
