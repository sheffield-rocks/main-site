import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

// Static export compatibility: make this route fully static.
export const dynamic = "force-static";
export const revalidate = false;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "public", "sky-config.json");
    const file = await fs.readFile(filePath, "utf8");
    return new NextResponse(file, {
      status: 200,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, max-age=600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "sky-config.json not found" }, { status: 404 });
  }
}
