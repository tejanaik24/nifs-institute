import { describe, expect, it } from "vitest";
import { isWhatsAppLink } from "./whatsapp-click";

describe("isWhatsAppLink", () => {
  it.each([
    "https://wa.me/918374340999",
    "https://wa.me/918374340999?text=hello",
    "http://wa.me/918374340999",
  ])("accepts %s", (href) => {
    expect(isWhatsAppLink(href)).toBe(true);
  });

  it.each([
    "https://api.whatsapp.com/send?phone=918374340999",
    "tel:+918374340999",
    "https://example.com",
    "",
    "/courses/adis",
  ])("rejects %s", (href) => {
    expect(isWhatsAppLink(href)).toBe(false);
  });
});
