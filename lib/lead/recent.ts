/**
 * Remembers, in this browser only, that a quote request was sent, so a second visit says
 * "we already have your request" instead of silently making a duplicate. The person can
 * still send again (nothing is blocked); the repeat is marked in GHL by lib/lead/quality.ts.
 */
const KEY = "toptin-last-request";
const KEEP_MS = 30 * 24 * 60 * 60 * 1000;

export type RecentRequest = { at: string; phone: string };

export function readRecentRequest(): RecentRequest | null {
  try {
    const r = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as RecentRequest | null;
    if (r?.at && r.phone && Date.now() - Date.parse(r.at) < KEEP_MS) return r;
  } catch {
    // Storage blocked or unreadable: behave as a first visit.
  }
  return null;
}

export function saveRecentRequest(phone: string): void {
  try {
    window.localStorage.setItem(KEY, JSON.stringify({ at: new Date().toISOString(), phone }));
  } catch {
    // Storage blocked: nothing to remember, nothing lost.
  }
}

export function recentDate(r: RecentRequest): string {
  return new Date(r.at).toLocaleDateString("en-AU", { day: "numeric", month: "long" });
}
