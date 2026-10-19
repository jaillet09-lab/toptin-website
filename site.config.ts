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
  qbcc: "15465551",
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

  hours: {
    label: "Mon to Fri, 9am to 5pm",
    schema: [
      {
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "17:00",
      },
    ],
  },

  /** The line under every form. No faster reply promise until the owner confirms one. */
  replyLine: "Free quote. We reply Mon to Fri, 9am to 5pm.",

  serviceArea: {
    summary: "Brisbane, Moreton Bay and Logan",
    long: "Brisbane northside and southside, the western suburbs and the bayside, plus Moreton Bay and Logan.",
    /** Used in schema.org areaServed. */
    regions: ["Brisbane", "Moreton Bay", "Logan"],
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
    googleProfileUrl: "",
    googleReviewUrl: "",
    /** Overall Google rating, for example 4.9. null until confirmed. */
    googleRating: null as number | null,
    /** Total number of Google reviews. null until confirmed. */
    googleCount: null as number | null,
  },

  social: {
    facebook: "",
    instagram: "",
    googleBusinessProfile: "",
  },

  features: {
    /** Google tag. Off unless NEXT_PUBLIC_GTAG_ID is set. Consent defaults to denied. */
    gtagId: process.env.NEXT_PUBLIC_GTAG_ID || "",
    adsConversionId: process.env.NEXT_PUBLIC_ADS_CONVERSION_ID || "",
  },

  /** NAP block exactly as it should read on Google Business Profile and every directory. */
  nap: {
    name: "Top Tin Roofing",
    serviceArea: "Brisbane QLD, Moreton Bay and Logan (service area business, no walk-in address)",
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
