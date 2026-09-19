// Looser than enquirySchema (src/lib/enquiry.ts) on purpose — this runs
// mid-typing, before the visitor has necessarily finished, so it only
// checks "is there enough here to be worth saving as a callable draft",
// not "is this submit-ready".
export function isDraftWorthy(name: string, phone: string): boolean {
  const digitCount = phone.replace(/\D/g, "").length;
  return name.trim().length >= 2 && digitCount >= 10;
}
