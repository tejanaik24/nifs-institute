"use client";

import { useEffect } from "react";

// The real homepage is a standalone static HTML file (public/homepage.html).
// When navigating to "/" on local dev server or static export, fetch and render
// public/homepage.html cleanly so the user sees the real NIFS homepage without glitches.
export default function HomePage() {
  useEffect(() => {
    fetch("/homepage.html")
      .then((res) => res.text())
      .then((html) => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch(() => {
        window.location.href = "/homepage.html";
      });
  }, []);

  return null;
}
