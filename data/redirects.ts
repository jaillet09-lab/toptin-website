/**
 * 301 redirects from every URL in the old WordPress sitemap (research/old-urls.txt)
 * to its closest new page, so existing Google rankings carry over.
 * Documented in docs/redirects.md.
 */
import { areas } from "./areas";

type Redirect = { source: string; destination: string; permanent: true };

const r = (source: string, destination: string): Redirect => ({ source, destination, permanent: true });

/** Suburbs that had pages on the old site. Suburbs without a new page go to /areas. */
const OLD_SUBURBS = [
  "abermain", "acacia-ridge", "albany-creek", "ashgrove", "aspley", "badgen", "belmont",
  "bethania", "bethania-junction", "birkdale", "boondall", "breakfast-creek",
];
const OLD_SUBURB_PREFIXES = ["roof-replacement", "colorbond-roof-installation", "metal-roof-repair"];

function suburbTarget(slug: string): string {
  return areas.some((a) => a.slug === slug) ? `/areas/${slug}` : "/areas";
}

const suburbRedirects: Redirect[] = OLD_SUBURB_PREFIXES.flatMap((prefix) =>
  OLD_SUBURBS.map((s) => r(`/${prefix}-${s}-qld`, suburbTarget(s))),
);

const BLOG = "/blog";
const post = (slug: string) => `/blog/${slug}`;

export const redirects: Redirect[] = [
  // Core pages
  r("/contact-us", "/contact"),
  r("/roof-replacement", "/services/roof-replacement"),
  r("/colorbond-roof-installation", "/services/colorbond-roof-installation"),
  r("/privacy-policy", "/privacy"),
  r("/terms-conditions", "/terms"),
  r("/roof-before-after", "/projects"),
  r("/locations.kml", "/areas"),

  // Old city-wide service pages
  r("/roof-replacement-brisbane-qld", "/services/roof-replacement"),
  r("/colorbond-roof-installation-brisbane-qld", "/services/colorbond-roof-installation"),
  r("/metal-roof-repair-brisbane-qld", "/services/roof-replacement"),

  // Old suburb pages
  ...suburbRedirects,

  // Old blog posts (they sat at the site root) mapped to the closest new post
  r("/will-insurance-cover-a-leaking-roof", post("roof-replacement-and-insurance-claims")),
  r("/does-insurance-cover-a-leaking-roof", post("roof-replacement-and-insurance-claims")),
  r("/roof-leaking-after-heavy-rain-insurance", post("roof-replacement-and-insurance-claims")),
  r("/will-my-home-insurance-cover-a-leaking-roof", post("roof-replacement-and-insurance-claims")),
  r("/asbestos-roof-repair", post("asbestos-roofs-what-homeowners-should-know")),
  r("/asbestos-roof-replacement", post("asbestos-roofs-what-homeowners-should-know")),
  r("/asbestos-removal-brisbane", post("asbestos-roofs-what-homeowners-should-know")),
  r("/my-roof-is-leaking-what-do-i-do", post("signs-your-roof-needs-replacing")),
  r("/roof-is-leaking-what-to-do", post("signs-your-roof-needs-replacing")),
  r("/what-to-do-when-your-roof-is-leaking", post("signs-your-roof-needs-replacing")),
  r("/how-do-you-stop-condensation-on-a-metal-roof", post("roof-insulation-and-thermal-performance-basics")),
  r("/how-to-stop-metal-roof-from-sweating", post("roof-insulation-and-thermal-performance-basics")),
  r("/metal-vs-tile-roof", post("colorbond-vs-tile-roofing-in-queensland")),
  r("/tile-roof-vs-metal-roof", post("colorbond-vs-tile-roofing-in-queensland")),
  r("/does-roof-color-matter-for-heat", post("choosing-a-colorbond-colour-for-queensland-heat")),
  r("/does-the-color-of-your-roof-affect-house-temperature", post("choosing-a-colorbond-colour-for-queensland-heat")),
  r("/how-to-keep-roof-cool-in-summer-naturally", post("choosing-a-colorbond-colour-for-queensland-heat")),
  r("/colorbond-roof-repairs", "/services/colorbond-roof-installation"),
  r("/whirlybird-roof-vent", BLOG),
  r("/sagging-soffit", BLOG),
  r("/putting-metal-roofing-around-turbin-vents", BLOG),
  r("/types-of-roof-slopes", BLOG),
  r("/hello-world", BLOG),
];
