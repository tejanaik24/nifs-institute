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
});

export type CenterApplicationInput = z.input<typeof centerApplicationSchema>;
export type CenterApplicationValues = z.output<typeof centerApplicationSchema>;
