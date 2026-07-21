"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "Enter your full name"),
  phone: z.string().min(8, "Enter a valid phone number"),
  email: z.string().email("Enter a valid email"),
  course: z.string().optional(),
  message: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export function EnquiryForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setStatus("submitting");
    try {
      const res = await fetch("https://formsubmit.co/ajax/admissions@nifsindia.net", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: values.name,
          phone: values.phone,
          email: values.email,
          course: values.course,
          message: values.message,
          _subject: `New enquiry from ${values.name}`,
        }),
      });
      if (!res.ok) throw new Error("failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="font-display text-xl italic">Thank you — we&apos;ve received your enquiry.</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Our admissions team will contact you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} className="mt-1.5" />
        {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} className="mt-1.5" />
          {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} className="mt-1.5" />
          {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
        </div>
      </div>
      <div>
        <Label htmlFor="course">Course Interested In</Label>
        <Input id="course" {...register("course")} className="mt-1.5" placeholder="e.g. B.Sc Fire & Industrial Safety" />
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" {...register("message")} className="mt-1.5" rows={4} />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive">Something went wrong — please try again or call us directly.</p>
      )}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary px-7 py-3.5 text-sm font-medium text-primary-foreground disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Submit Enquiry"}
      </button>
    </form>
  );
}
