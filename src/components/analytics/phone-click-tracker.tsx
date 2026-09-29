"use client";

import { useEffect } from "react";

// Mounted once in the root layout, mirrors WhatsAppClickTracker. Listens for
// clicks bubbling up from any tel: link on the site and logs them without
// touching any of those files individually. Never blocks or delays the call
// from starting.
export function PhoneClickTracker() {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      const anchor = (event.target as HTMLElement)?.closest("a");
      if (!anchor || !anchor.href.startsWith("tel:")) return;
      // Staff dialing leads from inside the dashboard isn't visitor
      // interest — don't let it inflate the same click count.
      if (window.location.pathname.startsWith("/dashboard")) return;
      const payload = JSON.stringify({
        pagePath: window.location.pathname,
        linkLabel: anchor.textContent?.trim().slice(0, 200) ?? "",
      });
      fetch("/api/track/phone-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      }).catch(() => {
        // Logging must never interrupt the visitor's call.
      });
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
