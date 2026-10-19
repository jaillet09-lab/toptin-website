/**
 * Conversion events. Sent to the Google tag when NEXT_PUBLIC_GTAG_ID is set,
 * otherwise pushed to window.dataLayer if present, and logged in development.
 * Nothing here sets a cookie.
 */
export type EventName = "phone_click" | "email_click" | "quote_started" | "quote_submitted";
export type EventParams = Record<string, string | number | boolean | undefined>;

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };

export function track(name: EventName, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  const payload = { ...params, page_path: window.location.pathname };
  try {
    if (typeof w.gtag === "function") w.gtag("event", name, payload);
    else if (Array.isArray(w.dataLayer)) w.dataLayer.push({ event: name, ...payload });
  } catch {
    // Analytics must never break the page.
  }
  if (process.env.NODE_ENV !== "production") console.debug("[toptin analytics]", name, payload);
}

export function trackConversion(sendTo: string, params: EventParams = {}): void {
  if (!sendTo || typeof window === "undefined") return;
  const w = window as GtagWindow;
  try {
    if (typeof w.gtag === "function") w.gtag("event", "conversion", { send_to: sendTo, ...params });
  } catch {
    // ignore
  }
}
