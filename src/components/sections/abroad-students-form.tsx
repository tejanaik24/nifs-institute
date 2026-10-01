"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Globe2, ShieldCheck, Sparkles, Building2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

const COURSES = [
  {
    id: "Diploma - Advance Diploma in Industrial Safety",
    name: "Diploma - Advance Diploma in Industrial Safety",
    shortBadge: "1 Year · Advanced Diploma",
    level: "Technical Postgraduate / Advanced Diploma",
    highlights: "Statutory Factory Safety, Hazard Identification & Risk Assessment, Industrial Hygiene",
    suitability: "Graduates, engineers, & working professionals seeking statutory safety qualifications",
  },
  {
    id: "B.Sc. - Honors (Fire and Industrial Safety)",
    name: "B.Sc. - Honors (Fire and Industrial Safety)",
    shortBadge: "4 Years · Full Honours Degree",
    level: "Undergraduate Honours Degree (Acharya Nagarjuna University)",
    highlights: "Comprehensive Fire Dynamics, Structural HSE Management, Environmental Safety & Disaster Mitigation",
    suitability: "10+2 / High School graduates aiming for executive global safety leadership careers",
  },
] as const;

const SII_URL = "https://studyinindia.gov.in/Courses/ViewCoursesDetails";

export function AbroadStudentsForm() {
  const [selectedCourse, setSelectedCourse] = useState<string>(COURSES[0].id);
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "redirecting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim() || name.trim().length < 2) {
      setErrorMessage("Please enter your full name (at least 2 characters).");
      return;
    }
    if (!contactNo.trim() || contactNo.trim().length < 7) {
      setErrorMessage("Please enter a valid international contact number with country code.");
      return;
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!country.trim() || country.trim().length < 2) {
      setErrorMessage("Please enter your country of residence.");
      return;
    }
    if (!state.trim() || state.trim().length < 2) {
      setErrorMessage("Please enter your state or province.");
      return;
    }
    if (!selectedCourse) {
      setErrorMessage("Please select one of the two programs.");
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/abroad-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          contactNo: contactNo.trim(),
          email: email.trim(),
          country: country.trim(),
          state: state.trim(),
          city: city.trim(),
          course: selectedCourse,
        }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.error || "Submission failed. Please verify your details.");
      }

      setStatus("redirecting");

      setTimeout(() => {
        window.location.href = data?.redirectUrl || SII_URL;
      }, 1000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setStatus("error");
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      {status === "redirecting" ? (
        <div className="rounded-2xl border-2 border-primary/40 bg-primary/5 p-8 text-center sm:p-12 shadow-xl backdrop-blur-sm animate-in fade-in zoom-in-95 duration-300">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/25">
            <CheckCircle2 className="h-8 w-8 animate-pulse" />
          </div>
          <h3 className="font-display mt-6 text-2xl italic sm:text-3xl text-foreground">
            Profile Registered Successfully
          </h3>
          <p className="mx-auto mt-3 max-w-md text-sm sm:text-base text-muted-foreground">
            Diverting you to the official Government of India <strong className="text-foreground">Study in India</strong> portal to view course details and finalize your application...
          </p>
          <div className="mt-8">
            <a
              href={SII_URL}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-md transition-transform hover:scale-105"
            >
              Click here if you are not redirected automatically <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-border bg-card/90 p-6 sm:p-10 shadow-lg backdrop-blur-xs text-left"
        >
          {/* Header indicator */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-6">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <Globe2 className="h-3.5 w-3.5" /> International Student Registration
              </span>
              <h2 className="font-display mt-2 text-2xl italic sm:text-3xl text-foreground">
                Apply as an Abroad Student
              </h2>
            </div>
            <div className="text-right text-xs text-muted-foreground hidden sm:block">
              <span className="font-semibold text-foreground">Step 1 of 2</span>
              <p>Profile verification → SII Portal</p>
            </div>
          </div>

          {/* Course Selection Block */}
          <div className="mt-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Select Your Program <span className="text-primary">*</span>
            </label>
            <p className="mt-1 text-xs text-muted-foreground">
              NIFS offers two officially sanctioned programs for international students under the Study in India initiative:
            </p>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {COURSES.map((course) => {
                const isSelected = selectedCourse === course.id;
                return (
                  <button
                    type="button"
                    key={course.id}
                    onClick={() => setSelectedCourse(course.id)}
                    className={cn(
                      "relative flex flex-col justify-between rounded-xl border-2 p-5 text-left transition-all duration-200 cursor-pointer",
                      isSelected
                        ? "border-primary bg-primary/[0.04] shadow-md ring-1 ring-primary/40"
                        : "border-border bg-background hover:border-foreground/30 hover:bg-muted/30"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <span className={cn(
                          "rounded-md px-2.5 py-0.5 text-[11px] font-bold tracking-wide uppercase",
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                        )}>
                          {course.shortBadge}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        )}
                      </div>

                      <h3 className="font-display mt-3 text-lg italic leading-tight text-foreground">
                        {course.name}
                      </h3>
                      <p className="mt-1 text-xs text-primary font-medium">
                        {course.level}
                      </p>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {course.highlights}
                      </p>
                    </div>

                    <div className="mt-4 border-t border-border/60 pt-3 text-[11px] text-muted-foreground/80">
                      <strong>Target:</strong> {course.suitability}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Fields Grid: Name, Contact No, Mail ID, Country, State, City */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Full Name */}
            <div>
              <label htmlFor="abroad-name" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Full Name (As in Passport / Official ID) <span className="text-primary">*</span>
              </label>
              <input
                id="abroad-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Tariq Al-Mansoor / John Doe"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            {/* Contact No */}
            <div>
              <label htmlFor="abroad-contact" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Contact No (With Country Code) <span className="text-primary">*</span>
              </label>
              <input
                id="abroad-contact"
                type="tel"
                required
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                placeholder="e.g. +971 50 123 4567 or +44 7911 123456"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
              <span className="mt-1 block text-[11px] text-muted-foreground">
                WhatsApp active contact number recommended.
              </span>
            </div>

            {/* Email Address */}
            <div>
              <label htmlFor="abroad-email" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Mail ID / Email Address <span className="text-primary">*</span>
              </label>
              <input
                id="abroad-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. student@international.com"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            {/* Country */}
            <div>
              <label htmlFor="abroad-country" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Country <span className="text-primary">*</span>
              </label>
              <input
                id="abroad-country"
                type="text"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="e.g. United Arab Emirates, Saudi Arabia, Nepal, UK, USA"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            {/* State / Province */}
            <div>
              <label htmlFor="abroad-state" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                State / Province <span className="text-primary">*</span>
              </label>
              <input
                id="abroad-state"
                type="text"
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                placeholder="e.g. Dubai, Riyadh Province, Bagmati, California, England"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>

            {/* City / Town */}
            <div>
              <label htmlFor="abroad-city" className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
                City / Town <span className="text-xs font-normal text-muted-foreground">(Optional)</span>
              </label>
              <input
                id="abroad-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Deira, Kathmandu, London, Nairobi"
                className="mt-2 w-full rounded-lg border border-border bg-background px-4 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-colors"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mt-6 rounded-lg border border-destructive/40 bg-destructive/5 p-4 text-xs font-medium text-destructive">
              {errorMessage}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-8 flex flex-col gap-3">
            <button
              type="submit"
              disabled={status === "submitting"}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90 hover:scale-[1.008] active:scale-[0.99] disabled:opacity-60 cursor-pointer"
            >
              {status === "submitting" ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Verifying &amp; Redirecting...
                </>
              ) : (
                <>
                  <span>Proceed to Study in India Portal</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              By proceeding, your verified profile will be recorded and you will be directed to the official <strong>Study in India</strong> (Ministry of Education) portal to review full course details.
            </p>
          </div>

          {/* Trust badges footer */}
          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-border/80 pt-6 text-xs text-muted-foreground sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-primary shrink-0" />
              <span>Acharya Nagarjuna University Affiliated</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
              <span>Government of India SII Partner</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary shrink-0" />
              <span>Visa &amp; International Seat Assistance</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
