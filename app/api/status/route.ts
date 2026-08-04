import { getMergedStatus } from "@/lib/uptime-kuma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const data = await getMergedStatus("fresh");
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch status";
    return NextResponse.json(
      { error: message, updatedAt: new Date().toISOString() },
      { status: 502 },
    );
  }
}
