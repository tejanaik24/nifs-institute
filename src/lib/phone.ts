// Normalize an applicant/enquiry phone into the last 10 digits for dedupe.
// Strips +91/0091/0 prefixes and any formatting. Non-Indian numbers are left
// as their raw digit run (10+ digits pass through unchanged otherwise).
export function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0091")) return digits.slice(4);
  if (digits.startsWith("91")) return digits.slice(2);
  if (digits.startsWith("0")) return digits.slice(1);
  return digits;
}