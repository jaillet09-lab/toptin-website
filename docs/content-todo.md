# Content to do (waiting on the owner)

Everything below is built with a safe default and switched off or marked as a placeholder until confirmed.
Change the values in `site.config.ts` unless another file is named.

## Decisions (brief section 12)

| # | Item | Current default | Where to change |
|---|---|---|---|
| 1 | "50+ projects", "20+ years combined experience", "100+ five-star reviews": current and provable? | Off | `site.config.ts` → `claims` (set `enabled: true`; the SEO audit also blocks the wording, so remove the matching rule in `scripts/seo-audit.ts`) |
| 2 | Price match or beat offer, and the exact terms | Not published | `claims.priceMatch`. Needs written terms first |
| 3 | "No hidden fees" and "no upfront costs": accurate for how jobs are billed? | Soft wording: "A written quote with the price set out before any work starts." | `claims.noHiddenFees`, `pricingLine` |
| 4 | Services: only roof replacement and Colorbond, or also metal roofing, repairs, restoration, gutters, fascia? | Two services, metal roofing as a material option | `data/services.ts`, `services.metalRoofingPage` |
| 5 | Suburb list (22 default suburbs across Brisbane, Moreton Bay and Logan) | See `data/areas.ts` | `data/areas.ts` (pages, sitemap, footer and redirects follow) |
| 6 | Warranty and insurance wording (workmanship warranty, manufacturer warranty, Home Warranty, public liability amount) | Not mentioned anywhere | Add only with written confirmation |
| 7 | Reviewers happy to appear on the site; keep the rating and count current | Profile linked; 5.0 from 33 Google reviews (read 19 Oct 2026); 10 reviews from the old site shown as "a selection". Add a "write a review" link when available | `reviews.*` in `site.config.ts`; reviews in `content/reviews.json` |
| 8 | Commercial work offered? | Homeowners first | Copy in `data/services.ts` and the homepage |

## Other open items

- **Opening hours** now match the Google profile: Mon to Fri 7am to 6pm, Sat 9am to 5pm (owner confirmed 19 Oct 2026).

- **Second phone number.** The old site also shows 0410 656 969 (Ethan's mobile, used on TopTin proposals). The new site uses only 0480 095 902, and the build fails if any other number appears. Confirm that is right.
- **Owner story** for the About page: `[OWNER STORY]` placeholder in `app/about/page.tsx`. Who runs Top Tin, how it started, the crew.
- **Before and after photos**: the slider on the homepage and Projects page shows `[PHOTO: ...]` placeholders until real pairs exist (see `docs/photo-shotlist.md`). Add them in `app/page.tsx` and `app/projects/page.tsx` (`BeforeAfter` component, `before` and `after` props).
- **Project details**: the 15 real photos have no suburb or job description. To create `/projects/[slug]` pages (brief section 6), supply suburb, roof type and what was done for each job. Until then the Projects page is a gallery only.
- **Exact Colorbond colour names** for the photos (currently plain words: red, green, dark grey).
- **Privacy and terms pages**: plain-English drafts. Worth a quick review by the owner's lawyer.
- **Lead delivery**: set `RESEND_API_KEY` (and `LEAD_FROM_EMAIL` on a verified domain) in Vercel so quote requests email toptinroofing@gmail.com. Optionally `LEAD_WEBHOOK_URL` to send leads to the TopTin System.
- **Analytics**: set `NEXT_PUBLIC_GTAG_ID` (and `NEXT_PUBLIC_ADS_CONVERSION_ID` for Google Ads) when wanted. Consent defaults to denied.
