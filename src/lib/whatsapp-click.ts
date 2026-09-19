// Matches any wa.me link — the format every WhatsApp CTA on the site uses.
// Deliberately narrow: api.whatsapp.com/send links aren't used anywhere in
// this codebase today, so treating them as WhatsApp too would be
// unverified scope creep.
export function isWhatsAppLink(href: string): boolean {
  try {
    const url = new URL(href, "https://nifsindia.net");
    return url.hostname === "wa.me";
  } catch {
    return false;
  }
}
