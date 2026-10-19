import { absoluteUrl, siteConfig } from "@/site.config";
import reviewsData from "@/content/reviews.json";

export const ORG_ID = `${siteConfig.url}/#business`;
export const WEBSITE_ID = `${siteConfig.url}/#website`;

export type Review = { author: string; rating: number; text: string; source?: string; date?: string };
export type ReviewsFile = { rating: number | null; count: number; url: string; reviews: Review[] };

export const reviews = reviewsData as ReviewsFile;

/** Average rating computed from the real reviews file, never typed in by hand. */
export function averageRating(): number | null {
  if (!reviews.reviews.length) return null;
  const sum = reviews.reviews.reduce((s, r) => s + r.rating, 0);
  return Math.round((sum / reviews.reviews.length) * 10) / 10;
}

export function hasRealReviews(): boolean {
  return reviews.reviews.length > 0;
}

/** "Nicholas Delany" -> "Nicholas D." (single names are shown as given). */
export function displayName(author: string): string {
  const parts = author.trim().split(/\s+/);
  return parts.length > 1 ? `${parts[0]} ${parts[parts.length - 1][0]}.` : author;
}

/** schema.org business record: RoofingContractor is a LocalBusiness subtype. */
export function localBusinessSchema() {
  const sameAs = [...Object.values(siteConfig.social), siteConfig.reviews.googleProfileUrl].filter(Boolean);
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RoofingContractor",
    "@id": ORG_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phoneE164,
    email: siteConfig.email,
    image: absoluteUrl("/brand/icon-512.png"),
    logo: absoluteUrl("/brand/icon-512.png"),
    identifier: [
      { "@type": "PropertyValue", propertyID: "ABN", value: siteConfig.abn.replace(/\s/g, "") },
      { "@type": "PropertyValue", propertyID: "QBCC licence", value: siteConfig.qbcc },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.base.city,
      addressRegion: siteConfig.base.state,
      addressCountry: siteConfig.base.countryCode,
    },
    areaServed: siteConfig.serviceArea.regions.map((name) => ({ "@type": "City", name })),
    openingHoursSpecification: siteConfig.hours.schema.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.dayOfWeek,
      opens: h.opens,
      closes: h.closes,
    })),
    knowsAbout: ["Roof replacement", "Colorbond roof installation", "Metal roofing", "Tile to Colorbond roof replacement"],
  };
  if (sameAs.length) schema.sameAs = sameAs;
  // Aggregate rating only from the real Google totals (site.config.ts), never from the selection.
  const { googleRating, googleCount } = siteConfig.reviews;
  if (googleRating && googleCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: googleRating,
      reviewCount: googleCount,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (hasRealReviews()) {
    schema.review = reviews.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: displayName(r.author) },
      reviewBody: r.text,
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5, worstRating: 1 },
      ...(r.date ? { datePublished: r.date } : {}),
    }));
  }
  return schema;
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-AU",
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export type Faq = { q: string; a: string };

export function faqSchema(faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; serviceType: string; areaName?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(opts.path)}#service`,
    name: opts.name,
    serviceType: opts.serviceType,
    description: opts.description,
    url: absoluteUrl(opts.path),
    provider: { "@id": ORG_ID },
    areaServed: opts.areaName
      ? { "@type": "Place", name: `${opts.areaName}, Queensland` }
      : siteConfig.serviceArea.regions.map((name) => ({ "@type": "City", name })),
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: { "@type": "ContactPoint", telephone: siteConfig.phoneE164, contactType: "sales" },
      serviceUrl: absoluteUrl("/quote"),
    },
  };
}

export function articleSchema(opts: { title: string; description: string; path: string; datePublished: string; dateModified: string; wordCount?: number }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: opts.title,
    description: opts.description,
    url: absoluteUrl(opts.path),
    mainEntityOfPage: absoluteUrl(opts.path),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified,
    inLanguage: "en-AU",
    wordCount: opts.wordCount,
    image: [absoluteUrl("/brand/icon-512.png")],
    author: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    publisher: { "@id": ORG_ID },
  };
}
