import { NextResponse } from "next/server";

/**
 * Address suggestions for the quote forms, from the Queensland Government's composite
 * locator (official Queensland address data, free, no key). Top Tin only works in
 * Queensland. Survey marks, valuations and place names are filtered out, so only street
 * addresses with a number come back, shortened to "12 Smith Street, Aspley QLD".
 *
 * People type "12 smith st aspley" or "12 Smith St, Aspley QLD 4034", which the locator's
 * suggest service alone can't match (owner, 22 Nov 2026: Google ads leads were arriving as
 * "typed by hand"). So each search runs three lookups at once and merges them:
 *   1. the full address search (findAddressCandidates), which matches a complete address exactly;
 *   2. suggestions for the street part only, kept when the suburb matches what was typed after it;
 *   3. suggestions for the whole text, for addresses still being typed.
 * Short forms are spelled out first (St -> Street, Rd -> Road ...), and QLD and the postcode dropped.
 * On any failure it returns no suggestions, and the form lets the person type the address.
 */
const BASE = "https://spatial-gis.information.qld.gov.au/arcgis/rest/services/Location/QldCompositeLocator/GeocodeServer";
const NEAR_BRISBANE = "153.02,-27.47";

const cache = new Map<string, { at: number; list: string[] }>();
const CACHE_MS = 24 * 60 * 60 * 1000;

const TYPES: Record<string, string> = {
  st: "Street", str: "Street", rd: "Road", ave: "Avenue", av: "Avenue", cres: "Crescent", cr: "Crescent", cct: "Circuit",
  ct: "Court", crt: "Court", dr: "Drive", drv: "Drive", pl: "Place", pde: "Parade", tce: "Terrace", hwy: "Highway",
  cl: "Close", bvd: "Boulevard", blvd: "Boulevard", ln: "Lane", gr: "Grove", gve: "Grove", esp: "Esplanade", wy: "Way",
  sq: "Square", cir: "Circle", pkwy: "Parkway", vw: "View",
};
const TYPE_WORDS = new Set([...Object.values(TYPES), "Rise", "Row", "Track", "Trail"].map((t) => t.toLowerCase()));

/** "12 smith st, Aspley QLD 4034" -> "12 smith Street Aspley". */
function normalise(q: string): string {
  return q
    .replace(/,/g, " ")
    .replace(/\b(qld|queensland|australia)\b/gi, " ")
    .replace(/\b\d{4}\s*$/, " ")
    .replace(/\b([a-z]+)\b\.?/gi, (w, a: string) => TYPES[a.toLowerCase()] ?? w)
    .replace(/\s+/g, " ")
    .trim();
}

/** "12 Smith Street Holland Park" -> street "12 Smith Street", suburb "holland park" (split at the last street type word). */
function splitSuburb(n: string): { street: string; suburb: string } | null {
  const words = n.split(" ");
  if (!/^\d/.test(words[0] ?? "")) return null;
  for (let i = words.length - 2; i >= 1; i--) {
    if (TYPE_WORDS.has(words[i].toLowerCase())) return { street: words.slice(0, i + 1).join(" "), suburb: words.slice(i + 1).join(" ").toLowerCase() };
  }
  return null;
}

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

const keep = (list: (string | null)[]) => list.filter((s): s is string => Boolean(s));

async function suggest(text: string): Promise<string[]> {
  const p = new URLSearchParams({ f: "json", text, maxSuggestions: "15", location: NEAR_BRISBANE });
  const res = await fetch(`${BASE}/suggest?${p}`, { signal: AbortSignal.timeout(4000), cache: "no-store" });
  const j = (await res.json()) as { suggestions?: { text: string }[] };
  return keep((j.suggestions ?? []).map((s) => tidy(s.text)));
}

async function exactMatches(text: string): Promise<string[]> {
  const p = new URLSearchParams({ f: "json", SingleLine: text, maxLocations: "6", outFields: "Addr_type", location: NEAR_BRISBANE });
  const res = await fetch(`${BASE}/findAddressCandidates?${p}`, { signal: AbortSignal.timeout(4000), cache: "no-store" });
  const j = (await res.json()) as { candidates?: { address: string; score: number; attributes?: { Addr_type?: string } }[] };
  return keep((j.candidates ?? [])
    .filter((c) => c.score >= 90 && /PointAddress|Subaddress|StreetAddress/.test(c.attributes?.Addr_type ?? ""))
    .map((c) => tidy(c.address)));
}

export async function GET(request: Request) {
  const q = new URL(request.url).searchParams.get("q")?.trim().replace(/\s+/g, " ").slice(0, 120) ?? "";
  if (q.length < 3) return NextResponse.json({ suggestions: [] });

  const key = q.toLowerCase();
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return NextResponse.json({ suggestions: hit.list });

  const n = normalise(q);
  const split = splitSuburb(n);
  const looksComplete = /^\d/.test(n) && n.split(" ").length >= 3;
  const [exact, all, streetOnly] = await Promise.allSettled([
    looksComplete ? exactMatches(n) : Promise.resolve([]),
    suggest(n),
    split ? suggest(split.street) : Promise.resolve([]),
  ]);
  if ([exact, all, streetOnly].every((r) => r.status === "rejected")) return NextResponse.json({ suggestions: [], unavailable: true });

  const got = (r: PromiseSettledResult<string[]>) => (r.status === "fulfilled" ? r.value : []);
  const inSuburb = split ? got(streetOnly).filter((s) => s.split(",")[1]?.trim().toLowerCase().startsWith(split.suburb)) : [];
  const list = [...new Set([...got(exact), ...inSuburb, ...got(all)])].slice(0, 6);

  cache.set(key, { at: Date.now(), list });
  if (cache.size > 2000) cache.clear();
  return NextResponse.json({ suggestions: list }, { headers: { "Cache-Control": "public, max-age=3600" } });
}
