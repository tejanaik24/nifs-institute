import { ROLE_PAGES } from "@/lib/auth/role-pages";
import { verifySessionToken } from "@/lib/auth/session";
import { AI_BOTS, INTERNAL_HEADER } from "@/lib/internal-secret";
import { NextRequest, NextResponse } from "next/server";

// GA4 never sees AI-crawler hits (bots don't run JS), so /api/bot-hit is the
// only real record of AI-crawler traffic anywhere in the stack.


export async function middleware(request: NextRequest) {
  // Server actions can be POSTed to any page URL, so block them for limited
  // logins everywhere (their lead pages have no actions) — except /login.
  if (request.headers.has("next-action") && !request.nextUrl.pathname.startsWith("/login")) {
    const token = request.cookies.get("nifs_session")?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (session?.role && ROLE_PAGES[session.role]) {
      return new NextResponse("Forbidden", { status: 403 });
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard") ||
    request.nextUrl.pathname.startsWith("/api/analytics/") ||
    request.nextUrl.pathname.startsWith("/api/agent/")
  ) {
    const token = request.cookies.get("nifs_session")?.value;
    const session = token ? await verifySessionToken(token) : null;
    if (!session) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    const allowed = ROLE_PAGES[session.role ?? ""];
    if (allowed) {
      const path = request.nextUrl.pathname;
      if (allowed.some((p) => path === p || path.startsWith(p + "/"))) {
        return NextResponse.next();
      }
      if (path.startsWith("/api/")) {
        return new NextResponse("Forbidden", { status: 403 });
      }
      return NextResponse.redirect(new URL(allowed[0] + "/", request.url));
    }
    if (
      request.nextUrl.pathname.startsWith("/dashboard/admin") &&
      session.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
    return NextResponse.next();
  }

  const userAgent = request.headers.get("user-agent") ?? "";
  const matchedBot = AI_BOTS.find((bot) => userAgent.includes(bot));
  if (matchedBot) {
    // Fire-and-forget — never block the actual page response on this.
    fetch(new URL("/api/bot-hit", request.url), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        [INTERNAL_HEADER]: process.env.INTERNAL_API_SECRET ?? "",
      },
      body: JSON.stringify({
        botName: matchedBot,
        path: request.nextUrl.pathname,
      }),
    }).catch(() => {});
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/analytics/:path*",
    "/api/agent/:path*",
    "/((?!_next/static|_next/image|favicon.ico|images/|api/).*)",
  ],
};
