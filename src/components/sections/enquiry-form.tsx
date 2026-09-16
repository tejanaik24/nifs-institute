"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useId, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  enquirySchema,
  submitEnquiry,
  trackEnquiry,
  type EnquiryValues,
} from "@/lib/enquiry";

const ADMISSION_COURSES = [
  "B.Sc in Fire & Industrial Safety (ANU Degree)",
  "B.Sc (Honours) in Fire & Industrial Safety (4 Yrs)",
  "Advanced Diploma in Industrial Safety (ADIS)",
  "Diploma in Fire & Safety (DFS - 1 Year)",
  "Diploma in Health, Safety & Environment (DHSE)",
  "PG Diploma in Fire & Safety (PG DFS)",
  "Certificate Course in Fire Safety (CCFS)",
];

const ADMISSION_CENTERS = [
  "Visakhapatnam (HQ)",
  "Hyderabad (Telangana)",
  "Patna (Bihar)",
  "Lucknow (Uttar Pradesh)",
  "Bengaluru (Karnataka)",
  "Mumbai / Pune (Maharashtra)",
  "Chennai (Tamil Nadu)",
  "Delhi NCR",
  "Bhubaneswar (Odisha)",
  "Kolkata (West Bengal)",
  "Other Nearest Center (70+ Pan-India)",
];

export function EnquiryForm() {
  const id = useId();
  const started = useRef(false);
  const pending = useRef(false);
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [fastTrackCourse, setFastTrackCourse] = useState(ADMISSION_COURSES[0]);
  const [fastTrackCenter, setFastTrackCenter] = useState(ADMISSION_CENTERS[0]);

  const fastTrackMsg = `Hi NIFS, I want to check admission eligibility, fee structure, and seat availability for ${fastTrackCourse} at the ${fastTrackCenter} center.`;
  const fastTrackWaUrl = `https://wa.me/918374340999?text=${encodeURIComponent(fastTrackMsg)}`;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.input<typeof enquirySchema>, unknown, EnquiryValues>({
    resolver: zodResolver(enquirySchema),
  });

  const onSubmit = async (values: EnquiryValues) => {
    if (pending.current) return;
    pending.current = true;
    setStatus("submitting");
    trackEnquiry("enquiry_attempt");
    try {
      await submitEnquiry(values);
      setStatus("success");
      reset();
      trackEnquiry("enquiry_accepted");
    } catch {
      setStatus("error");
      trackEnquiry("enquiry_error", "delivery");
    } finally {
      pending.current = false;
    }
  };

  return (
    <div className="space-y-6">
      {/* 2-Step Interactive Fast-Track Admission Desk */}
      <div className="rounded-2xl border-2 border-[#25D366]/40 bg-[#25D366]/5 p-6 text-left shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-border/80 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/30">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
              </svg>
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">
                1-Tap WhatsApp Admission Fast-Track
              </h3>
              <p className="text-xs text-muted-foreground">
                Check seat eligibility, fee details &amp; batch dates directly
                on WhatsApp.
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block rounded-full bg-[#25D366]/20 px-2.5 py-0.5 text-[11px] font-bold uppercase text-[#075E54]">
            Instant Response
          </span>
        </div>

        <div className="mt-4 space-y-3">
          <div>
            <label
              htmlFor="admissions-course-select"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Step 1: Choose Course
            </label>
            <select
              id="admissions-course-select"
              value={fastTrackCourse}
              onChange={(e) => setFastTrackCourse(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground focus:border-[#25D366] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
            >
              {ADMISSION_COURSES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="admissions-center-select"
              className="text-xs font-bold uppercase tracking-wider text-muted-foreground"
            >
              Step 2: Choose Nearest City Center
            </label>
            <select
              id="admissions-center-select"
              value={fastTrackCenter}
              onChange={(e) => setFastTrackCenter(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-medium text-foreground focus:border-[#25D366] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
            >
              {ADMISSION_CENTERS.map((cnt) => (
                <option key={cnt} value={cnt}>
                  {cnt}
                </option>
              ))}
            </select>
          </div>

          <a
            href={fastTrackWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEnquiry("enquiry_whatsapp_click")}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] py-3.5 text-sm font-bold text-white shadow-md shadow-[#25D366]/25 transition-all hover:scale-[1.01] active:scale-[0.99]"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
            </svg>
            <span>Check Seat &amp; Fee via WhatsApp →</span>
          </a>

          <p className="pt-1 text-center text-[11px] text-muted-foreground">
            ⚡ Direct connection with regional admission director • Official
            brochure &amp; fee structure in PDF.
          </p>
        </div>
      </div>

      <div className="relative flex items-center justify-center">
        <span className="h-px w-full bg-border" />
        <span className="absolute bg-background px-3 text-xs font-semibold uppercase text-muted-foreground">
          Or Request Quick Call Back
        </span>
      </div>

      {status === "success" ? (
        <div
          role="status"
          className="border border-primary/30 bg-primary/5 p-6 text-center rounded-xl"
        >
          <p className="font-display text-lg italic text-foreground">
            Thank you — your callback request has been accepted.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Our admissions team will contact you on the number you provided. You
            can stay on this page.
          </p>
        </div>
      ) : (
        <form
          id={`${id}-enquiry`}
          noValidate
          aria-busy={status === "submitting"}
          onChange={() => {
            if (!started.current) {
              started.current = true;
              trackEnquiry("enquiry_start");
            }
          }}
          onSubmit={(event) => {
            void handleSubmit(onSubmit, () =>
              trackEnquiry("enquiry_error", "validation"),
            )(event);
          }}
          className="space-y-4 text-left"
        >
          <p className="text-sm text-muted-foreground">
            Only your name and mobile number are required. No WhatsApp account
            needed.
          </p>
          <fieldset disabled={status === "submitting"} className="space-y-4">
            <div>
              <Label htmlFor={`${id}-name`}>Your Name</Label>
              <Input
                id={`${id}-name`}
                autoComplete="name"
                maxLength={100}
                aria-required="true"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${id}-name-error` : undefined}
                {...register("name")}
                placeholder="Enter your full name"
                className="mt-1 h-12"
              />
              {errors.name && (
                <p
                  id={`${id}-name-error`}
                  role="alert"
                  className="mt-1 text-xs text-destructive"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${id}-phone`}>Mobile Number</Label>
              <Input
                id={`${id}-phone`}
                autoComplete="tel"
                inputMode="tel"
                maxLength={25}
                aria-required="true"
                aria-invalid={!!errors.phone}
                aria-describedby={
                  errors.phone ? `${id}-phone-error` : undefined
                }
                type="tel"
                {...register("phone")}
                placeholder="10-digit mobile number or +91"
                className="mt-1 h-12"
              />
              {errors.phone && (
                <p
                  id={`${id}-phone-error`}
                  role="alert"
                  className="mt-1 text-xs text-destructive"
                >
                  {errors.phone.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor={`${id}-course`}>
                Course Interested In (Optional)
              </Label>
              <Input
                id={`${id}-course`}
                maxLength={200}
                aria-invalid={!!errors.course}
                aria-describedby={
                  errors.course ? `${id}-course-error` : undefined
                }
                {...register("course")}
                placeholder="e.g. ADIS, Fire Safety Diploma, DFS"
                className="mt-1 h-12"
              />
              {errors.course && (
                <p
                  id={`${id}-course-error`}
                  role="alert"
                  className="mt-1 text-xs text-destructive"
                >
                  {errors.course.message}
                </p>
              )}
            </div>
          </fieldset>

          <p className="text-xs text-muted-foreground">
            By requesting a callback, you agree that NIFS may contact you about
            this enquiry.
          </p>
          {status === "error" && (
            <div
              role="alert"
              className="rounded-lg border border-destructive/40 p-4 text-sm"
            >
              <p>
                We couldn’t confirm your request. Your details are still here.
                Please try again, use WhatsApp above, or{" "}
                <a
                  className="underline"
                  href="tel:+918374340999"
                  onClick={() => trackEnquiry("enquiry_phone_click")}
                >
                  call +91 8374 340 999
                </a>
                .
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-primary py-3 text-sm font-semibold text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {status === "submitting"
              ? "Sending your request..."
              : "Request Call Back →"}
          </button>
        </form>
      )}
    </div>
  );
}
