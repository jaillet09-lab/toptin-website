/**
 * Paid-ads landing pages. They get a slim header (logo and phone, no menu), no site footer
 * or site mobile bar, and render their own, so a visitor from an ad has one thing to do.
 */
export const landingPaths = ["/roof-replacement-quote"];

/**
 * Where "Get a free quote" goes. On a referral page (/refer/<code>) it is the form on the page, which
 * carries the referral code; /quote would lose it and the friend would not be marked as referred.
 */
export function quoteHref(pathname: string | null): string {
  return pathname?.startsWith("/refer/") ? "#quote" : "/quote";
}

export function isLandingPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return landingPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
