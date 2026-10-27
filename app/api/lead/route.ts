import { NextResponse } from "next/server";
import { submitLead } from "@/lib/lead/adapters";
import { parseSubmission } from "@/lib/lead/validate";
import { qualityFlags } from "@/lib/lead/quality";
import { siteConfig } from "@/site.config";

/* Best-effort rate limit per IP: 6 submissions per 10 minutes on this instance. */
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 6;
const hits = new Map<string, number[]>();

function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > LIMIT;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "unknown";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, message: `Too many requests. Please call ${siteConfig.phone} instead.` }, { status: 429 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ ok: false, message: "The form could not be read." }, { status: 400 });
  }

  const parsed = await parseSubmission(formData, { userAgent: request.headers.get("user-agent") ?? "" });
  if (!parsed.ok) {
    return NextResponse.json({ ok: false, message: parsed.message, errors: parsed.errors }, { status: parsed.status });
  }

  if (parsed.suspectedBot) {
    // Not sent to GHL (no call-team alert for a bot), but logged in full so a real person is never lost.
    const l = parsed.lead;
    console.warn(`[toptin lead] hidden field filled, held back from GHL. ${l.id}: ${l.name}, ${l.phone}, ${l.email || "no email"}, ${l.address}, ${l.serviceLabel}, page ${l.sourcePage}`);
    return NextResponse.json({ ok: true, id: l.id });
  }

  parsed.lead.flags = qualityFlags(parsed.lead, { previousRequestAt: parsed.previousRequestAt });
  const result = await submitLead(parsed.lead, parsed.photos);
  if (!result.ok) {
    return NextResponse.json(
      { ok: false, message: `We could not send your request just now. Please call ${siteConfig.phone} or email ${siteConfig.email}.` },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true, id: parsed.lead.id });
}
