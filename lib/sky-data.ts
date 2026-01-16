import { promises as fs } from "fs";
import path from "path";

const SKY_RELATIVE_PATH = path.join("data", "sky", "sky-config.json");

function normalizeBaseUrl(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export type SkyConfig = {
  sunrise?: string;
  sunset?: string;
  weatherCode?: number;
  preset?: string;
  updatedAt?: string;
};

async function readJsonFile(filePath: string): Promise<SkyConfig | null> {
  try {
    const fileContents = await fs.readFile(filePath, "utf8");
    return JSON.parse(fileContents) as SkyConfig;
  } catch (error) {
    return null;
  }
}

async function fetchJson(url: string): Promise<SkyConfig | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    return (await response.json()) as SkyConfig;
  } catch (error) {
    return null;
  }
}

export async function getSkyConfig(): Promise<SkyConfig | null> {
  const baseUrl = process.env.SHEFFIELD_DATA_BASE_URL;
  if (baseUrl) {
    const url = `${normalizeBaseUrl(baseUrl)}/sky/sky-config.json`;
    const data = await fetchJson(url);
    if (data) {
      return data;
    }
  }

  const dataDir = process.env.SHEFFIELD_DATA_DIR;
  const candidatePaths = [
    dataDir ? path.join(dataDir, SKY_RELATIVE_PATH) : null,
    path.join(process.cwd(), "..", "..", "data", SKY_RELATIVE_PATH),
  ].filter(Boolean) as string[];

  for (const filePath of candidatePaths) {
    const data = await readJsonFile(filePath);
    if (data) {
      return data;
    }
  }

  return null;
}
