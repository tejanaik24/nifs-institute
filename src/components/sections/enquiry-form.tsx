"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(10, "Enter a valid 10-digit mobile number"),
  course: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EnquiryForm() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");

    const messageText = `*New Admission Enquiry*\n*Name:* ${values.name}\n*Phone:* ${values.phone}\n*Course:* ${values.course || "General Fire & Safety Enquiry"}`;
    const whatsappUrl = `https://wa.me/918374340999?text=${encodeURIComponent(messageText)}`;

    try {
      fetch("https://formsubmit.co/ajax/headoffice@nifsindia.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          course: values.course || "General Enquiry",
          _subject: `New quick enquiry from ${values.name} (${values.phone})`,
        }),
      }).catch((err) => console.error("FormSubmit backup failed:", err));
    } catch (e) {
      console.error(e);
    }

    setStatus("success");
    reset();
    window.location.href = whatsappUrl;
  };

  return (
    <div className="space-y-6">
      {/* Primary WhatsApp-First Fast Path */}
      <div className="rounded-2xl border-2 border-[#25D366]/40 bg-[#25D366]/5 p-6 text-left">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md shadow-[#25D366]/30">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-bold text-foreground">
              Instant Admission Helpline
            </h3>
            <p className="text-xs text-muted-foreground">
              Direct chat with senior counselors (0 wait time)
            </p>
          </div>
        </div>

        <a
          href="https://wa.me/918374340999?text=Hi%20NIFS%2C%20I%20want%20to%20know%20about%20Fire%20%26%20Industrial%20Safety%20courses%2C%20course%20fees%2C%20eligibility%20and%20job%20placements."
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[#075E54] py-3.5 text-sm font-bold text-white shadow-md shadow-[#075E54]/25 hover:bg-[#054239] transition-all"
        >
          <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86.173.086.275.072.376-.043.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.099.824zm-3.423-14.416c-6.627 0-12 5.373-12 12 0 2.112.551 4.095 1.517 5.823l-1.61 5.877 6.04-1.584c1.664.908 3.567 1.424 5.592 1.424 6.627 0 12-5.373 12-12s-5.373-12-12-12z" />
          </svg>
          <span>Chat on WhatsApp Now</span>
        </a>
      </div>

      <div className="relative flex items-center justify-center">
        <span className="h-px w-full bg-border" />
        <span className="absolute bg-background px-3 text-xs font-semibold uppercase text-muted-foreground">
          Or Request Quick Call Back
        </span>
      </div>

      {status === "success" ? (
        <div className="border border-primary/30 bg-primary/5 p-6 text-center rounded-xl">
          <p className="font-display text-lg italic text-foreground">
            Thank you — connecting to counselor on WhatsApp...
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="Enter your full name"
              className="mt-1"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-destructive">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Mobile Number</Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="10-digit mobile number"
              className="mt-1"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-destructive">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="course">Course Interested In (Optional)</Label>
            <Input
              id="course"
              {...register("course")}
              placeholder="e.g. ADIS, Fire Safety Diploma, NEBOSH"
              className="mt-1"
            />
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full bg-primary py-3 text-sm font-semibold text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-60 transition-colors"
          >
            {status === "submitting" ? "Connecting..." : "Request Call Back →"}
          </button>
        </form>
      )}
    </div>
  );
}
