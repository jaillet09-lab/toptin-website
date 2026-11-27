import type { Lead } from "@/lib/lead/types";

/**
 * Referral program (owner, 22 Nov 2026). Happy finished clients share toptinroofing.com/refer/<code>.
 * The TopTin System holds the codes: it gives back only the client's first name, and keeps a list of
 * the friends who sent the form from a link. $1,000 goes to the client once the friend's roof is
 * finished and paid in full, or comes off the friend's quote. If the System can't be reached the page
 * still works and the lead still reaches GHL with the code on it.
 */
const SYSTEM_URL = process.env.TOPTIN_SYSTEM_URL || "https://toptin-system.vercel.app";

export const REFERRAL_REWARD = "$1,000";

export const isReferralCode = (code: string) => /^[a-z0-9-]{3,40}$/.test(code);

/** The referring client's first name, or "" when the code is unknown or the System is down. */
export async function referrerFirstName(code: string): Promise<string> {
  if (!isReferralCode(code)) return "";
  try {
    const r = await fetch(`${SYSTEM_URL}/api/public/referrer/${code}`, { next: { revalidate: 300 }, signal: AbortSignal.timeout(4000) });
    if (!r.ok) return "";
    const j = (await r.json()) as { firstName?: string };
    return (j.firstName ?? "").slice(0, 40);
  } catch {
    return "";
  }
}

/**
 * Adds the friend to the System's referral list: from a referral link, or (owner, 27 Nov 2026) when they
 * answered "Did someone refer you to us?" with a name. The System puts a star on Referrals in its menu.
 * Best effort: the lead has already gone to GHL.
 */
export async function recordReferral(lead: Lead): Promise<void> {
  if (!lead.referralCode && !(lead.referred === "Yes" && lead.referrerName)) return;
  try {
    await fetch(`${SYSTEM_URL}/api/public/referral`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: lead.referralCode, referrerName: lead.referrerName, name: lead.name, phone: lead.phone, email: lead.email, address: lead.address, leadId: lead.id }),
      signal: AbortSignal.timeout(4000),
    });
  } catch (e) {
    console.error(`[toptin lead] referral (${lead.referralCode || lead.referrerName}) not recorded in the System for ${lead.id}`, e);
  }
}
