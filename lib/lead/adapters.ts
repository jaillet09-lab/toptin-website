import { siteConfig } from "@/site.config";
import type { Lead, LeadPhoto, SubmitResult } from "./types";

/**
 * Pluggable lead delivery. Every configured adapter runs; the lead counts as
 * delivered if at least one succeeds.
 *
 * - GHL_LEAD_WEBHOOK_URL  POST to the live GHL website-lead workflow (see ghlAdapter).
 * - RESEND_API_KEY      Email the lead (photos attached) to LEAD_TO_EMAIL, default
 *                       ethanfarrell9678@gmail.com. LEAD_FROM_EMAIL sets the sender
 *                       (must be a domain verified in Resend).
 * - LEAD_WEBHOOK_URL    POST the lead as JSON, for example to the TopTin System.
 *                       Optional LEAD_WEBHOOK_SECRET is sent as a bearer token.
 *                       LEAD_WEBHOOK_INCLUDE_PHOTOS=true inlines photos as base64.
 * - Nothing configured  In development the lead is logged to the console. In
 *                       production it is logged as an error and the form shows
 *                       the phone number instead.
 */

type Adapter = { name: string; enabled: () => boolean; send: (lead: Lead, photos: LeadPhoto[]) => Promise<void> };

function rows(lead: Lead): [string, string][] {
  return [
    ["Name", lead.name],
    ["Phone", lead.phone],
    ["Email", lead.email],
    ["Property", lead.address],
    ["Service", lead.serviceLabel],
    ["Roof type", lead.roofType],
    ["Roof age", lead.roofAge],
  ];
}

/** "Google Ads" when the form was sent from a page reached through an ad click, else "". */
export function adSource(sourcePage: string): string {
  const [path, query = ""] = sourcePage.split("?");
  if (/(^|&)(gclid|gbraid|wbraid)=/.test(query)) return `Google Ads (${path})`;
  const utm = /(^|&)utm_source=([^&]+)/.exec(query);
  if (!utm) return "";
  let name = utm[2];
  try { name = decodeURIComponent(name.replace(/\+/g, " ")); } catch { /* keep it as sent */ }
  return `${name.slice(0, 40)} (${path})`;
}

function leadToText(lead: Lead, photos: LeadPhoto[]): string {
  return [
    "Quote request from the website",
    "",
    ...rows(lead).map(([k, v]) => `${k}: ${v || "(not given)"}`),
    "",
    "Message:",
    lead.message || "(none)",
    "",
    `Photos: ${photos.length ? photos.map((p) => `${p.filename} (${Math.round(p.size / 1024)} KB)`).join(", ") : "none"}`,
    `Page: ${lead.sourcePage}`,
    `Submitted: ${lead.submittedAt}`,
    `Lead id: ${lead.id}`,
  ].join("\n");
}

function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

function leadToHtml(lead: Lead, photos: LeadPhoto[]): string {
  const row = ([k, v]: [string, string]) =>
    `<tr><td style="padding:6px 12px 6px 0;color:#667085;vertical-align:top">${k}</td><td style="padding:6px 0;color:#101828"><strong>${escapeHtml(v || "(not given)")}</strong></td></tr>`;
  return `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.5;color:#101828">
<h2 style="color:#0F162E;margin:0 0 12px">Quote request: ${escapeHtml(lead.serviceLabel)}</h2>
<table style="border-collapse:collapse">${rows(lead).map(row).join("")}</table>
<p style="margin:16px 0 4px;color:#667085">Message</p>
<p style="white-space:pre-wrap;margin:0">${escapeHtml(lead.message || "(none)")}</p>
<p style="margin:16px 0 0;color:#667085;font-size:13px">Photos: ${photos.length}. Page: ${escapeHtml(lead.sourcePage)}. Submitted ${escapeHtml(lead.submittedAt)}. Lead id ${lead.id}.</p>
</div>`;
}

const emailAdapter: Adapter = {
  name: "email",
  enabled: () => Boolean(process.env.RESEND_API_KEY),
  async send(lead, photos) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
      body: JSON.stringify({
        // Owner, 26 Oct 2026: lead emails go to Ethan, never the toptinroofing inbox. The sender
        // needs toptinroofing.com verified in Resend (set up 26 Oct 2026).
        from: process.env.LEAD_FROM_EMAIL || `${siteConfig.name} website <notifications@toptinroofing.com>`,
        to: [process.env.LEAD_TO_EMAIL || "ethanfarrell9678@gmail.com"],
        ...(lead.email ? { reply_to: lead.email } : {}),
        subject: `Quote request: ${lead.serviceLabel} at ${lead.address} (${lead.name}, ${lead.phone})`,
        text: leadToText(lead, photos),
        html: leadToHtml(lead, photos),
        attachments: photos.map((p) => ({ filename: p.filename, content: p.data.toString("base64") })),
      }),
    });
    if (!res.ok) throw new Error(`Email API responded ${res.status} ${(await res.text().catch(() => "")).slice(0, 300)}`);
  },
};

const webhookAdapter: Adapter = {
  name: "webhook",
  enabled: () => Boolean(process.env.LEAD_WEBHOOK_URL),
  async send(lead, photos) {
    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (process.env.LEAD_WEBHOOK_SECRET) headers.Authorization = `Bearer ${process.env.LEAD_WEBHOOK_SECRET}`;
    const includePhotos = process.env.LEAD_WEBHOOK_INCLUDE_PHOTOS === "true";
    const res = await fetch(process.env.LEAD_WEBHOOK_URL as string, {
      method: "POST",
      headers,
      body: JSON.stringify({
        source: "website",
        site: siteConfig.url,
        lead,
        photos: photos.map((p) => ({
          filename: p.filename,
          contentType: p.contentType,
          size: p.size,
          ...(includePhotos ? { base64: p.data.toString("base64") } : {}),
        })),
      }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  },
};

/**
 * The live GHL account's "New Website Lead - Contact Us Page" workflow (inbound webhook): it creates
 * the contact with source Website, alerts the call team and starts New Lead In, exactly as the old
 * WordPress site did. The payload copies the old site's shape ({ fields: { first_name, … } }) so the
 * published workflow's mapping works unchanged. Added 26 Oct 2026 after leads were found going
 * nowhere since the launch. GHL_LEAD_WEBHOOK_URL is that workflow's Inbound Webhook URL (kept out of
 * the repo); point it at the new account's workflow at cut-over.
 */
const ghlAdapter: Adapter = {
  name: "ghl",
  enabled: () => Boolean(process.env.GHL_LEAD_WEBHOOK_URL),
  async send(lead, photos) {
    const [first, ...rest] = lead.name.trim().split(/\s+/);
    const ad = adSource(lead.sourcePage);
    const details = [
      ad && `Came from: ${ad}`,
      lead.roofType && `Roof: ${lead.roofType}`,
      lead.roofAge && `Age: ${lead.roofAge}`,
      photos.length ? `${photos.length} photo(s) sent with the form (not attached in GHL)` : "",
      lead.message,
    ].filter(Boolean).join("\n");
    const res = await fetch(process.env.GHL_LEAD_WEBHOOK_URL as string, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formId: "toptinroofing.com/quote",
        fields: {
          first_name: first ?? "",
          last_name: rest.join(" "),
          phone: lead.phone,
          email: lead.email,
          address: lead.address,
          services: lead.serviceLabel,
          message: details,
        },
        referer: `${siteConfig.url}${lead.sourcePage}`,
        userAgent: lead.userAgent,
        lead_id: lead.id,
      }),
    });
    if (!res.ok) throw new Error(`GHL webhook responded ${res.status} ${(await res.text().catch(() => "")).slice(0, 200)}`);
  },
};

const consoleAdapter: Adapter = {
  name: "console",
  enabled: () => process.env.NODE_ENV !== "production",
  async send(lead, photos) {
    console.info("\n[toptin lead]\n" + leadToText(lead, photos) + "\n");
  },
};

const adapters: Adapter[] = [ghlAdapter, emailAdapter, webhookAdapter, consoleAdapter];

export async function submitLead(lead: Lead, photos: LeadPhoto[]): Promise<SubmitResult> {
  const active = adapters.filter((a) => a.enabled());
  const result: SubmitResult = { ok: false, delivered: [], errors: [] };
  if (!active.length) {
    console.error(`[toptin lead] No lead adapter configured. Set GHL_LEAD_WEBHOOK_URL, RESEND_API_KEY or LEAD_WEBHOOK_URL. Lead ${lead.id} from ${lead.name} (${lead.phone}) was NOT delivered.`);
    return result;
  }
  for (const adapter of active) {
    try {
      await adapter.send(lead, photos);
      result.delivered.push(adapter.name);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      result.errors.push(`${adapter.name}: ${message}`);
      console.error(`[toptin lead] ${adapter.name} failed for ${lead.id}: ${message}`);
    }
  }
  result.ok = result.delivered.length > 0;
  return result;
}
