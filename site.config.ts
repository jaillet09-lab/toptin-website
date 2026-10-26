/**
 * Top Tin Roofing: single source of truth for business facts.
 *
 * Every page, the header, footer, schema markup, sitemap, the lead form and the
 * SEO audit read from this file. Change the phone number here and it changes
 * everywhere (the build fails if any other number appears on a page).
 *
 * Only facts confirmed by the owner belong here. Claims that exist on the old site
 * but are not yet confirmed live under `claims` as flags that default to false.
 * See docs/content-todo.md for everything waiting on the owner.
 */

export const siteConfig = {
  name: "Top Tin Roofing",
  legalName: "Top Tin Roofing",
  abn: "25 656 843 944",
  qbcc: "15587145",
  tagline: "Roof replacement and Colorbond roofing in Brisbane",
  description:
    "Brisbane roof replacement and Colorbond roof installation by a local, QBCC licensed crew. Free on-site quote, a written price, and a clean site when the job is done.",

  /** Canonical origin, no trailing slash. Override with NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://toptinroofing.com",

  /** The one business number: display form, tel link and E.164 form. */
  phone: "0480 095 902",
  phoneHref: "tel:+61480095902",
  phoneE164: "+61480095902",

  email: "toptinroofing@gmail.com",
  emailHref: "mailto:toptinroofing@gmail.com",

  base: {
    city: "Brisbane",
    state: "QLD",
    stateLong: "Queensland",
    country: "Australia",
    countryCode: "AU",
    timezone: "Australia/Brisbane",
  },

  /** Matches the Google Business Profile (confirmed by the owner 2026-10-19). */
  hours: {
    label: "Mon to Fri 7am to 6pm, Sat 9am to 5pm",
    schema: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "18:00",
      },
      {
        dayOfWeek: ["Saturday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  },

  /** The line under every form. No faster reply promise until the owner confirms one. */
  replyLine: "Free quote. We reply Mon to Fri 7am to 6pm, Sat 9am to 5pm.",

  serviceArea: {
    summary: "Brisbane, Ipswich, Logan and the Gold Coast",
    long: "All of Brisbane and north into Moreton Bay, west to Ipswich, south through Logan to the Gold Coast, and the suburbs in between.",
    /** Used in schema.org areaServed. */
    regions: ["Brisbane", "Ipswich", "Logan", "Gold Coast", "Moreton Bay"],
  },

  /**
   * Claims from the old site. Each stays OFF until the owner confirms it is current
   * and provable (brief section 12). The SEO audit blocks the wording while off.
   */
  claims: {
    projectsCount: { enabled: false, label: "50+ projects complete" },
    experience: { enabled: false, label: "20+ years of combined roofing experience" },
    reviewsCount: { enabled: false, label: "100+ five-star reviews" },
    /** "No hidden fees / no upfront costs". Off: the soft wording below is used instead. */
    noHiddenFees: { enabled: false, label: "No hidden fees and no upfront costs" },
    /** Price match or beat. Never on without exact written terms from the owner. */
    priceMatch: { enabled: false, label: "" },
  },

  /** Safe wording used while noHiddenFees is off. */
  pricingLine: "A written quote with the price set out before any work starts.",

  /** Services that have their own page. Metal roofing stays a material option unless confirmed. */
  services: {
    metalRoofingPage: false,
  },

  /**
   * Google reviews. content/reviews.json holds a SELECTION shown word for word (10 from the
   * old site). The profile has more: when the owner supplies the real overall rating and total
   * count from the Google Business Profile, set them here and they are shown and used in schema.
   * Until then no total is shown, so the site never understates (or invents) the number.
   */
  reviews: {
    /** Google Business Profile (owner supplied 2026-10-19; Google id /g/11wqmn70hn). */
    googleProfileUrl: "https://share.google/xvkUlSB603EpsoDZD",
    /** Review link from the profile ("Ask for reviews"), 26 Oct 2026. */
    googleReviewUrl: "https://g.page/r/CcU3g2bKcP1VEAE/review",
    /** Overall Google rating and a floor for the count (owner confirmed 50+ five-star reviews on 2026-10-26; shown as "50+"). Update as reviews grow. */
    googleRating: 5.0 as number | null,
    googleCount: 50 as number | null,
  },

  social: {
    facebook: "",
    instagram: "",
    googleBusinessProfile: "",
  },

  features: {
    /** GA4 measurement id (G-XXXX). Env var overrides the value here. */
    gtagId: process.env.NEXT_PUBLIC_GTAG_ID || "",
    /** Google Ads account tag (AW-XXXX), configured on the same gtag. */
    adsAccountId: process.env.NEXT_PUBLIC_ADS_ACCOUNT_ID || "",
    /** Google Ads conversion send_to values (AW-XXXX/LABEL). Empty = that conversion is off. */
    adsConversionId: process.env.NEXT_PUBLIC_ADS_CONVERSION_ID || "",          // quote form submitted (thank-you page)
    adsPhoneConversionId: process.env.NEXT_PUBLIC_ADS_PHONE_CONVERSION_ID || "", // phone number tapped
  },

  /** NAP block exactly as it should read on Google Business Profile and every directory. */
  nap: {
    name: "Top Tin Roofing",
    serviceArea: "Brisbane QLD, Ipswich, Logan and the Gold Coast (service area business, no walk-in address)",
    phone: "0480 095 902",
    email: "toptinroofing@gmail.com",
    website: "https://toptinroofing.com",
    categories: ["Roofing contractor", "Roofing service", "Metal roofing contractor"],
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** Absolute URL for a site path. */
export function absoluteUrl(path = "/"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${clean === "/" ? "" : clean}`;
}

/** Licence line shown in every footer and on the contact page. */
export const licenceLine = `QBCC licence ${siteConfig.qbcc} · ABN ${siteConfig.abn}`;
