import { getMergedStatus } from "@/lib/uptime-kuma";
import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET() {
  try {
    const data = await getMergedStatus();
    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
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
