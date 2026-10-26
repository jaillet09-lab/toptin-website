import { areaCoords } from "@/data/area-coords";

/**
 * Finished Top Tin roofs closest to an area page, from the TopTin System's public endpoint. Street
 * and suburb only (never the house number), and only owners who said we could mention it.
 * Refreshed once a day; if the System cannot be reached the section is simply left out.
 */
const SYSTEM_URL = process.env.TOPTIN_SYSTEM_URL || "https://toptin-system.vercel.app";

/** Further than this and the job is not "near" the suburb. */
const MAX_KM = 15;

export type RecentJob = { street: string; suburb: string | null; km: number; job: string };

export async function recentJobsNear(slug: string, limit = 5): Promise<RecentJob[]> {
  const point = areaCoords[slug];
  if (!point) return [];
  try {
    const r = await fetch(`${SYSTEM_URL}/api/public/recent-jobs?lat=${point[0]}&lng=${point[1]}&limit=${limit}`, {
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(5000),
    });
    if (!r.ok) return [];
    const j = (await r.json()) as { jobs?: RecentJob[] };
    return (j.jobs ?? []).filter((x) => x.street && Number.isFinite(x.km) && x.km <= MAX_KM);
  } catch {
    return [];
  }
}
