import { NextResponse } from "next/server";
import { getActiveUsersRightNow } from "@/lib/analytics/ga4";

export async function GET() {
  try {
    const activeUsers = await getActiveUsersRightNow();
    return NextResponse.json({ activeUsers });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "GA4 realtime unavailable" },
      { status: 502 }
    );
  }
}
