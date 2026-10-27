import { NextResponse } from "next/server";

/**
 * Address suggestions for the quote forms, from the Queensland Government's composite
 * locator (official Queensland address data, free, no key). Top Tin only works in
 * Queensland. Survey marks, valuations and place names are filtered out, so only street
 * addresses with a number come back, shortened to "12 Smith Street, Aspley QLD".
 * On any failure it returns no suggestions, and the form lets the person type the address.
 */
const LOCATOR = "https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Location/QldCompositeLocator/GeocodeServer/suggest";

const cache = new Map<string, { at: number; list: string[] }>();
const CACHE_MS = 24 * 60 * 60 * 1000;

/** "395 Hamilton Road, Chermside, Brisbane City, QLD" -> "395 Hamilton Road, Chermside QLD". */
function tidy(text: string): string | null {
  if (!/,\s*QLD$/.test(text) || !/^\d/.test(text) || /Gazetteer|RP Data|Mark Condition|Valuation|Datum/i.test(text)) return null;
  const parts = text.split(",").map((s) => s.trim());
  if (parts.length < 3) return null;
  const street = parts[0];
  const suburb = parts[1].replace(/\s*\([^)]*\)\s*$/, "");
  if (!/^\d+[a-z]?(-\d+[a-z]?)?\s+\S+/i.test(street) || !suburb) return null;
  return `${street}, ${suburb} QLD`;
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim().replace(/\s+/g, " ").slice(0, 120) ?? "";
  if (q.length < 3) return NextResponse.json({ suggestions: [] });

  const key = q.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return NextResponse.json({ suggestions: hit.list });

  const params = new URLSearchParams({ f: "json", text: q, maxSuggestions: "12", location: "153.02,-27.47" });
  let list: string[] = [];
  try {
    const res = await fetch(`${LOCATOR}?${params}`, { signal: AbortSignal.timeout(4000), cache: "no-store" });
    const j = (await res.json()) as { suggestions?: { text: string }[] };
    list = [...new Set((j.suggestions ?? []).map((s) => tidy(s.text)).filter((s): s is string => Boolean(s)))].slice(0, 6);
  } catch {
    return NextResponse.json({ suggestions: [], unavailable: true });
  }
  cache.set(key, { at: Date.now(), list });
  if (cache.size > 2000) cache.clear();
  return NextResponse.json({ suggestions: list }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
