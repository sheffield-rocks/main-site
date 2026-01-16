import { NextResponse } from "next/server";
import { getSkyConfig } from "@/lib/sky-data";

// Static export compatibility: make this route fully static.
export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  const config = await getSkyConfig();

  if (!config) {
    return NextResponse.json({ error: "sky-config.json not found" }, { status: 404 });
  }

  return NextResponse.json(config, {
    status: 200,
    headers: {
      "cache-control": "public, max-age=600, stale-while-revalidate=86400",
    },
  });
}
