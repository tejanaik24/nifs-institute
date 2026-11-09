import { z } from "zod";

export const centerApplicationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Enter your full name (at least 2 characters)")
    .max(100, "Keep name under 100 characters"),
  location: z
    .string()
    .trim()
    .min(2, "Enter proposed city and state")
    .max(150, "Keep location under 150 characters"),
  phone: z
    .string()
    .trim()
    .min(7, "Enter a valid contact number")
    .max(35, "Contact number is too long")
    .regex(/^[+\d\s().-]+$/, "Enter a valid phone number with country/area code"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(200, "Email is too long")
    .pipe(z.email("Enter a valid email address")),
  message: z
    .string()
    .trim()
    .max(2000, "Keep message under 2000 characters")
    .optional()
    .default(""),
  // Honeypot: hidden from people, bots fill it. Any value = silently dropped.
  website: z.string().max(200).optional().default(""),
});

// Bot spam (Oct-Nov 2026) used one random mixed-case word for name/city, e.g.
// "pOEoCWyfkUjqFihXU". Real names have spaces or read as one normal word.
// ponytail: heuristic, catches this bot family only; add a captcha if new spam gets past it.
function looksRandom(s: string): boolean {
  const t = s.trim();
  if (/\s/.test(t) || t.length < 10) return false;
  const bumps = (t.match(/[a-z][A-Z]/g) ?? []).length;
  return bumps >= 2;
}

export function isSpamApplication(v: { name: string; location: string; message?: string; website?: string }): boolean {
  if (v.website) return true;
  return looksRandom(v.name) || looksRandom(v.location) || looksRandom(v.message ?? "");
}

export type CenterApplicationInput = z.input<typeof centerApplicationSchema>;
export type CenterApplicationValues = z.output<typeof centerApplicationSchema>;
