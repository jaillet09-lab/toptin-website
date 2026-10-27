/**
 * Paid-ads landing pages. They get a slim header (logo and phone, no menu), no site footer
 * or site mobile bar, and render their own, so a visitor from an ad has one thing to do.
 */
export const landingPaths = ["/roof-replacement-quote"];

export function isLandingPath(pathname: string | null): boolean {
  if (!pathname) return false;
  return landingPaths.some((p) => pathname === p || pathname.startsWith(p + "/"));
}
