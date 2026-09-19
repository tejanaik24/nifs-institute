import { NextRequest } from "next/server";

// Vercel's edge network tags every request with the visitor's location —
// no popup, no third-party service, no extra step. Empty outside Vercel
// (e.g. local dev), which callers must treat as "unknown", not an error.
export function getRequestLocation(request: NextRequest): { city: string; state: string } {
  const rawCity = request.headers.get("x-vercel-ip-city") ?? "";
  const city = rawCity ? decodeURIComponent(rawCity) : "";
  const state = request.headers.get("x-vercel-ip-country-region") ?? "";
  return { city, state };
}
