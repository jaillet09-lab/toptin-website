/**
 * SEO and claims audit over the prerendered HTML in .next/server/app. Runs after
 * `next build` (package.json "postbuild") and FAILS the build on:
 *   missing title, description, canonical, H1 or JSON-LD; more than one H1; invalid JSON-LD;
 *   duplicate titles or descriptions; an image without alt;
 *   any phone-like number that is not the one business number, or a tel: link to another number;
 *   the phone number, QBCC licence or ABN missing from a page; no quote call to action;
 *   forbidden claims (brief section 1 and 11) or em dashes;
 *   too little text or too few internal links in the raw HTML (server rendering check).
 *
 * Run on its own: node --experimental-strip-types scripts/seo-audit.ts
 */
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appDir = path.join(root, ".next", "server", "app");

const PHONE_DISPLAY = "0480 095 902";
const PHONE_DIGITS = "0480095902";
const PHONE_E164 = "+61480095902";
const QBCC = "15587145";
const ABN = "25 656 843 944";

/** Claims that are not allowed, or are off until the owner confirms them (site.config.ts claims). */
const forbidden: { label: string; re: RegExp }[] = [
  { label: "em dash", re: /—/ },
  { label: "#1 claim", re: /#1\b|number one/i },
  { label: "best", re: /\bbest\b/i },
  { label: "leading", re: /\b(leading|market leader|market-leading)\b/i },
  { label: "unbeatable", re: /\bunbeatable\b/i },
  { label: "award", re: /\baward[- ]?winning\b|\bawards?\b/i },
  { label: "guarantee", re: /\bguarantee[sd]?\b/i },
  { label: "price match", re: /\bprice[- ]match|\bmatch (it|or beat)|\bbeat (it|any|their)/i },
  { label: "since 20xx", re: /\bsince 20\d\d\b/i },
  { label: "decades", re: /\bdecades?\b/i },
  { label: "unconfirmed counts", re: /\b(50|100)\+|\b20\+ years/i },
  { label: "no hidden fees", re: /no hidden (fees|charges|costs)|no upfront cost/i },
  { label: "hype words", re: /\b(world[- ]class|cutting[- ]edge|seamless solutions?)\b/i },
];

/** Real review text is quoted word for word and is exempt from the wording rules (not the phone rules). */
const reviewTexts: string[] = (() => {
  try {
    const data = JSON.parse(fs.readFileSync(path.join(root, "content", "reviews.json"), "utf8"));
    return data.reviews.map((r: { text: string }) => r.text);
  } catch {
    return [];
  }
})();

type Page = { route: string; html: string; title: string; description: string; canonical: string; h1s: string[]; noindex: boolean; jsonLd: unknown[]; words: number; links: number; text: string };

function walk(dir: string, out: string[] = []): string[] {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else if (e.name.endsWith(".html")) out.push(full);
  }
  return out;
}

function decode(s: string): string {
  return s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ");
}

function strip(html: string): string {
  return decode(html.replace(/<script[\s\S]*?<\/script>/gi, " ").replace(/<style[\s\S]*?<\/style>/gi, " ").replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
}

function attr(tag: string, name: string): string {
  const m = new RegExp(`${name}="([^"]*)"`, "i").exec(tag);
  return m ? decode(m[1]) : "";
}

function parse(file: string): Page {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(appDir, file).replace(/\\/g, "/");
  const route = "/" + rel.replace(/\.html$/, "").replace(/^index$/, "");
  const head = html.slice(0, html.indexOf("</head>") + 7);
  const metas = head.match(/<meta[^>]*>/gi) ?? [];
  const links = head.match(/<link[^>]*>/gi) ?? [];
  const pick = (list: string[], key: string, keyAttr: string, valAttr: string) => list.map((m) => (attr(m, keyAttr) === key ? attr(m, valAttr) : "")).find(Boolean) ?? "";
  const main = /<main[\s\S]*?<\/main>/i.exec(html)?.[0] ?? html;
  const jsonLd: unknown[] = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { jsonLd.push(JSON.parse(m[1])); } catch { jsonLd.push(new Error("invalid")); }
  }
  const text = strip(html);
  return {
    route: route === "" ? "/" : route,
    html,
    title: decode(/<title>([^<]*)<\/title>/i.exec(head)?.[1] ?? ""),
    description: pick(metas, "description", "name", "content"),
    canonical: pick(links, "canonical", "rel", "href"),
    h1s: (main.match(/<h1[^>]*>[\s\S]*?<\/h1>/gi) ?? []).map(strip),
    noindex: /noindex/i.test(pick(metas, "robots", "name", "content")),
    jsonLd,
    words: strip(main).split(/\s+/).filter(Boolean).length,
    links: new Set((main.match(/href="\/[^"#?]*/g) ?? []).map((h) => h.slice(6))).size,
    text,
  };
}

const files = walk(appDir).filter((f) => {
  const rel = path.relative(appDir, f).replace(/\\/g, "/");
  if (/^_not-found\.html$|^_global-error\.html$/.test(rel)) return false;
  if (/\[[^\]]+\]\.html$/.test(rel)) return false;
  return true;
});

if (!files.length) {
  if (process.env.VERCEL) {
    console.log("seo-audit: skipped on Vercel (prerendered HTML is not on disk at this step).");
    process.exit(0);
  }
  console.error("seo-audit: no prerendered HTML found under .next/server/app. Run next build first.");
  process.exit(1);
}

const pages = files.map(parse).sort((a, b) => a.route.localeCompare(b.route));
const errors: string[] = [];
const warnings: string[] = [];
const titles = new Map<string, string>();
const descs = new Map<string, string>();
const phoneLike = /(?:\+?61\s?|\b0)(?:4\d{2}\s?\d{3}\s?\d{3}|[2378]\s?\d{4}\s?\d{4})\b|\b1[38]00\s?\d{3}\s?\d{3}\b/g;

for (const p of pages) {
  const w = p.route;
  if (!p.title) errors.push(`${w}: missing <title>`);
  if (!p.description) errors.push(`${w}: missing meta description`);
  if (!p.canonical) errors.push(`${w}: missing canonical`);
  if (p.h1s.length === 0) errors.push(`${w}: missing H1`);
  if (p.h1s.length > 1) errors.push(`${w}: ${p.h1s.length} H1 elements`);
  if (!p.jsonLd.length) errors.push(`${w}: missing JSON-LD`);
  if (p.jsonLd.some((j) => j instanceof Error)) errors.push(`${w}: invalid JSON-LD`);

  if (p.title) {
    if (titles.has(p.title)) errors.push(`${w}: duplicate title (also ${titles.get(p.title)}): "${p.title}"`);
    titles.set(p.title, w);
    if (p.title.length < 45 || p.title.length > 65) warnings.push(`${w}: title length ${p.title.length} ("${p.title}")`);
  }
  if (p.description) {
    if (descs.has(p.description)) errors.push(`${w}: duplicate description (also ${descs.get(p.description)})`);
    descs.set(p.description, w);
    if (p.description.length < 130 || p.description.length > 165) warnings.push(`${w}: description length ${p.description.length}`);
  }

  for (const img of p.html.match(/<img[^>]*>/gi) ?? []) {
    if (!/\salt="/i.test(img)) errors.push(`${w}: image without alt: ${img.slice(0, 90)}`);
  }

  const numbers = new Set((p.text.match(phoneLike) ?? []).map((n) => n.replace(/\s/g, "")));
  for (const n of numbers) if (n.replace(/^\+61/, "0") !== PHONE_DIGITS) errors.push(`${w}: phone-like number that is not the business number: ${n}`);
  for (const tel of p.html.match(/href="tel:[^"]*"/g) ?? []) if (tel !== `href="tel:${PHONE_E164}"`) errors.push(`${w}: tel link is not ${PHONE_E164}: ${tel}`);
  if (!p.text.includes(PHONE_DISPLAY)) errors.push(`${w}: phone ${PHONE_DISPLAY} not visible`);
  if (!p.text.includes(QBCC)) errors.push(`${w}: QBCC licence ${QBCC} not on the page`);
  if (!p.text.includes(ABN)) errors.push(`${w}: ABN ${ABN} not on the page`);
  if (!p.noindex && !p.html.includes('href="/quote')) errors.push(`${w}: no quote call to action`);

  let scanned = `${p.text} ${p.title} ${p.description}`;
  for (const r of reviewTexts) scanned = scanned.split(r).join(" ");
  for (const f of forbidden) {
    const m = f.re.exec(scanned);
    if (m) errors.push(`${w}: forbidden wording (${f.label}): "${scanned.slice(Math.max(0, m.index - 40), m.index + 40)}"`);
  }

  if (!p.noindex && p.words < 150) errors.push(`${w}: only ${p.words} words of text in the raw HTML`);
  if (!p.noindex && p.links < 3) errors.push(`${w}: only ${p.links} internal links in the raw HTML`);
}

const report = [
  `SEO audit: ${pages.length} prerendered pages checked`,
  `Errors: ${errors.length}`,
  ...errors.map((e) => `  ERROR ${e}`),
  `Warnings: ${warnings.length}`,
  ...warnings.map((x) => `  warn  ${x}`),
  "",
  "Page summary (route | H1s | words | internal links | index):",
  ...pages.map((p) => `  ${p.route} | ${p.h1s.length} | ${p.words} | ${p.links} | ${p.noindex ? "noindex" : "index"}`),
].join("\n");
fs.mkdirSync(path.join(root, "docs"), { recursive: true });
fs.writeFileSync(path.join(root, "docs", "seo-audit-output.txt"), report + "\n");
console.log(report);
if (errors.length) {
  console.error(`\nseo-audit failed with ${errors.length} error(s).`);
  process.exit(1);
}
