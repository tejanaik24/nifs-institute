"use client";

import { useEffect } from "react";
import { isWhatsAppLink } from "@/lib/whatsapp-click";

// Mounted once in the root layout. Listens for clicks bubbling up from any
// wa.me link on the site — there are ~60 of them scattered across course
// pages, all 54 center pages, the header, footer and chatbot widget — and
// logs them without touching any of those files individually. Never blocks
// or delays the WhatsApp link opening in its new tab.
export function WhatsAppClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor || !isWhatsAppLink(anchor.href)) return;
      const payload = JSON.stringify({
        pagePath: window.location.pathname,
        linkLabel: anchor.textContent?.trim().slice(0, 200) ?? "",
      });
      fetch("/api/track/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Logging must never interrupt the visitor's WhatsApp click.
      });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
