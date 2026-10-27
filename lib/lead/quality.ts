import type { Lead } from "./types";
import { toAuE164 } from "./validate";

/**
 * Spam, fake and duplicate checks (owner, 27 Oct 2026: stop spam and duplicates without losing
 * any clients). None of these drop a lead. Each one adds a plain reason to the GHL message, so
 * the person calling sees "Check before calling: ..." and decides.
 */

const DISPOSABLE_EMAIL = /@(mailinator|guerrillamail|sharklasers|10minutemail|tempmail|temp-mail|yopmail|trashmail|getnada|dispostable|maildrop|throwawaymail|fakeinbox)\./i;

/** 0400 000 000, 0411 111 111, 0412 345 678, 0498 765 432 and the like. */
function phoneLooksMadeUp(phone: string): boolean {
  const e164 = toAuE164(phone);
  if (!e164) return false;
  const rest = e164.slice(4); // the eight digits after +614 (or after the area code digit)
  if (/^(\d)\1{7}$/.test(rest)) return true;
  if ("0123456789012345".includes(rest) || "9876543210987654".includes(rest)) return true;
  return /^(\d{2})\1{3}$/.test(rest) || /^(\d{4})\1$/.test(rest);
}

function nameLooksMadeUp(name: string): boolean {
  const words = name.trim().toLowerCase().split(/\s+/);
  if (words.length >= 2 && words.every((w) => w === words[0])) return true; // "Alex Alex"
  if (/\d|https?:|www\.|@/.test(name)) return true;
  return name.replace(/[^a-z]/gi, "").length < 2;
}

/** Repeat requests seen by this server in the last 7 days, by phone. Best effort: each server instance keeps its own list. */
const recent = new Map<string, number>();
const REPEAT_MS = 7 * 24 * 60 * 60 * 1000;

function when(ms: number): string {
  return new Date(ms).toLocaleString("en-AU", { timeZone: "Australia/Brisbane", day: "numeric", month: "long", hour: "numeric", minute: "2-digit" });
}

export function qualityFlags(lead: Lead, opts: { previousRequestAt?: string } = {}): string[] {
  const flags: string[] = [];
  if (phoneLooksMadeUp(lead.phone)) flags.push(`phone looks made up (${lead.phone})`);
  if (nameLooksMadeUp(lead.name)) flags.push(`name looks made up ("${lead.name}")`);
  if (lead.email && DISPOSABLE_EMAIL.test(lead.email)) flags.push(`throwaway email address (${lead.email})`);
  if (/https?:\/\/|www\./i.test(lead.message)) flags.push("the message contains a web link, common in spam");

  const key = toAuE164(lead.phone) || lead.phone;
  const now = Date.now();
  const seen = recent.get(key);
  if (seen && now - seen < REPEAT_MS) flags.push(`repeat request: the same number sent one on ${when(seen)}`);
  else if (opts.previousRequestAt) {
    const prev = Date.parse(opts.previousRequestAt);
    if (!Number.isNaN(prev) && now - prev < 30 * 24 * 60 * 60 * 1000) flags.push(`repeat request: this person sent one on ${when(prev)}`);
  }
  recent.set(key, now);
  if (recent.size > 5000) recent.clear();

  return flags;
}
