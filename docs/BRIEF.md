
You are rebuilding the marketing website for **Top Tin Roofing**, a roof replacement and Colorbond roofing business in Brisbane, Queensland, Australia. The current site is at **https://toptinroofing.com/** (WordPress). This is a **complete revamp**: new design, new structure, new copy, new SEO and conversion system. **The brand stays**: the logo, the gold and black identity and the tone of the business carry over. The site must win local search, turn visitors into quote requests and phone calls, and look like an established premium roofing contractor.

## 0. How to use the references

There are two references, used for different things.

1. **The current Top Tin site, https://toptinroofing.com/** : the source of the **brand** and the **facts**. Study it properly first. Download the logo files from the live site (listed in section 10) and keep the brand colours, logo and personality. Read every existing page (Home, About, Roof Replacement, Colorbond Roof Installation, Projects, Contact Us) and keep every true fact, real review and real project photo. **Do not keep the layout, the copy or the page structure.** Rewrite all copy from scratch.
2. **https://www.deltacleaning.com.au/** : the **structural and conversion reference** (another business built by the same owner). Study how it is organised: the hero, trust bar, services cards, before and after slider, process steps, areas, FAQ, quote form, final call to action, sticky mobile call bar, the service and suburb page templates, the blog system, the structured data and the build-time SEO audit. **Reuse the patterns, not the content.** Nothing from the Delta site's text, images or branding may appear on the Top Tin site.

## 1. Business facts (the only facts you may state)

| Item | Value |
|---|---|
| Trading name | Top Tin Roofing |
| ABN | 25 656 843 944 |
| QBCC licence | **15465551** (must appear in the footer of every page and on the contact page) |
| Base | Brisbane, Queensland |
| Phone | **+61 480 095 902** (display as 0480 095 902, tel link `+61480095902`). Store once in `site.config.ts` field `phone` |
| Email | toptinroofing@gmail.com |
| Hours | Mon to Fri, 9:00am to 5:00pm (as on the current site) |
| Services | Roof replacement. Colorbond roof installation. Metal roofing as a material option within a replacement |
| Customers | Homeowners mainly. Also commercial and business properties ("Australian homes and businesses" is on the current site) |
| Free quote | Obligation free quote, by form or phone |

### Claims on the current site (use only where marked)
These exist on the current site. Use them **only after the owner confirms** (CONFIRM list in section 12). Until confirmed, build them as config flags set to `false` and leave them off:
- "50+ projects complete", "20+ years roofing expertise" (written on the site as "over two decades of combined experience"), "100+ 5-star reviews".
- "No hidden fees", "no upfront costs", "the final cost matched the initial quote" (from a real review).
- "If you find a better quote, we'll match it or beat it". **Do not publish this price-match offer by default.** It is a promise with legal weight; the owner must decide the exact wording and terms.
- "We guarantee top-notch service at the best prices". **Do not use "guarantee" or "best prices".**

### Claims that are NOT allowed anywhere on the site
No "#1", "best in Brisbane", "leading", "unbeatable", "award winning", "market leader". No warranty length, manufacturer warranty terms, insurance figures or certifications unless the owner supplies them in writing. No before and after photos that are not real. No invented reviews, projects, statistics or named customers. No claim about being "licensed to do" a type of work other than what the QBCC licence covers (the owner confirms this). If a claim is not in section 1 or confirmed, do not write it.

## 2. Design direction (keep the brand, change everything else)

### Brand tokens (taken from the logo and the live site)
```css
:root {
  --gold:    #F2B01E;  /* brand accent. SAMPLE THE EXACT VALUE from the downloaded logo and use that */
  --gold-2:  #FFC93C;  /* hover / highlight */
  --black:   #0B0B0C;  /* primary dark, header text, hero */
  --ink:     #141416;  /* dark sections */
  --steel:   #2A2C30;  /* dark cards */
  --white:   #FFFFFF;
  --page:    #F7F7F5;  /* body background */
  --paper:   #EFEEEA;  /* alt sections */
  --line:    #DAD9D3;  /* hairlines */
  --text:    #17181A;
  --mute:    #5E6064;
  --radius-card: 14px;
  --radius-btn: 10px;
}
```
Gold and black are the brand. Use gold sparingly and confidently (buttons, key numbers, underlines), black and white for structure. Colorbond colour swatches may appear as small accents in the Colorbond page only.

### Typography
- **Headings:** a bold, confident, slightly condensed sans (for example **Barlow Condensed** or **Archivo**, weights 600 to 800), large, tight, uppercase only for small labels. Roofing is a trade: the look is strong, clear and physical, not soft or corporate.
- **Body:** Inter, 16px, line-height 1.55.
- Load with `next/font`, no layout shift.

### Look and feel
Premium trade contractor: big real photography of finished roofs and crews, strong gold on black, generous space, clean grids, large phone number. No stock-photo clutter, no cartoon icons, no gradient overload. Photography is the hero. Dark hero with a real roof photo, then light sections with crisp cards, then a dark proof section, then a gold call to action band.

### Components
- **Primary button:** gold background, black text, bold, radius 10px, slight lift on hover. **Secondary:** black outline on light, white outline on dark.
- **Header:** sticky, white or black (choose one and keep it consistent), logo left, nav centre (Services, Projects, About, Areas, Blog, Contact), right: phone number and a **Get a free quote** gold button. Mobile: hamburger plus a **sticky bottom bar** with **Call** and **Free quote**.
- **Cards:** white, 1px line border, radius 14px, shadow on hover only. Dark cards use `--steel`.
- Subtle scroll reveals, respect `prefers-reduced-motion`.

## 3. Tech stack and project rules

- **Next.js (App Router), TypeScript, Tailwind CSS**, statically generated, deployed on Vercel.
- Blog in **MDX** in `/content/blog` with frontmatter (title, description, date, updated, category, slug, relatedServices, relatedAreas).
- All business data (name, ABN, QBCC, phone, email, hours, services, areas, feature flags for the CONFIRM claims) in **one file** `site.config.ts`.
- Server render everything: all body text, links and JSON-LD in the raw HTML.
- Images through `next/image`, AVIF/WebP, lazy load below the fold. Target Lighthouse 95+ on mobile for Performance, Accessibility, Best Practices, SEO.
- WCAG 2.2 AA, visible focus, labels on all form fields, alt text on all images, 44px tap targets.
- No tracking cookies by default. Google tag behind a config flag.

## 4. Site map and URLs

```
/                                   Home
/services                           Services overview
/services/roof-replacement
/services/colorbond-roof-installation
/services/metal-roofing             (only if CONFIRMED as a service)
/projects                           Real projects gallery with before and after
/projects/[slug]                    One page per real project (only with real photos)
/about
/how-it-works                       The process from quote to completion
/areas                              Areas overview
/areas/[suburb]                     One page per suburb (config-driven, genuinely distinct copy)
/reviews                            Google reviews, read from reviews.json
/blog   /blog/[slug]
/contact                            Contact and quote form, QBCC and ABN shown
/quote                              Dedicated quote page
/thank-you                          noindex, fires the conversion event
/privacy  /terms
/sitemap.xml  /robots.txt
```
**Redirect every old URL to its new equivalent** (301): `/about`, `/contact-us` to `/contact`, `/projects`, `/roof-replacement` to `/services/roof-replacement`, `/colorbond-roof-installation` to `/services/colorbond-roof-installation`, plus any other URL found in the old site's sitemap (`/sitemap_index.xml`). Check the old sitemap and map every URL. Keep the Google rankings.

## 5. Homepage specification

1. **Hero** (dark, real roof photo): headline about replacing a roof properly, for example "Roof replacement and Colorbond roofing in Brisbane." Sub line in plain words. Buttons: **Get a free quote** and **Call 0480 095 902**. Beside or below: a small chooser "What do you need?" (Roof replacement, Colorbond installation, Not sure) that pre-selects the quote form.
2. **Trust bar:** "QBCC licence 15465551", "ABN 25 656 843 944", "Free quote", "Brisbane based", "Google reviews" (rating from the real reviews file). Confirmed claims (50+ projects, 20+ years) only if their flags are on.
3. **Services:** two large cards (Roof replacement, Colorbond installation) with a real photo each and a clear link, then a short "Materials we work with" row.
4. **Projects:** a before and after slider and a gallery of **real** projects only. Use the photos on the current site. Placeholders marked until more arrive.
5. **How it works:** 1 Free quote and roof inspection, 2 Written quote and colour or material choice, 3 Installation by our crew, 4 Clean up and final walk-through. One line each, no invented timeframes.
6. **Why Top Tin:** four true points built from the current site: local crew, transparent quote, communication through the job, clean site. Reuse the meaning, not the words.
7. **Reviews:** the real Google reviews already on the site (from `reviews.json`, exact text, first name and surname initial, "Posted on Google"). Overall rating computed from the file. Never display an invented review.
8. **Colorbond section:** why Colorbond suits Queensland, colours, thermal performance (use only claims on the current Colorbond page, which come from the manufacturer's general positioning; do not invent figures).
9. **Areas:** suburb pills linking to the area pages.
10. **FAQ:** 8 to 10 questions with FAQ schema (how a quote works, how long a replacement takes in general terms, what is included, asbestos roofs, insurance and licensing, payment, clean up, storm damage, colour choice, council approval).
11. **Quote form** and **final call to action** (gold band, phone number large).
12. **Footer:** logo, services, areas, quick links, phone, email, **QBCC 15465551**, **ABN 25 656 843 944**, hours, privacy and terms.

## 6. Page templates

- **Service page:** H1 with service and Brisbane, short intro, "What is included", "Materials and options", "How we do it" (steps), real project photos, FAQ with schema, related areas (internal links), mid-page call band, quote form. Unique copy, 600 to 900 words per page.
- **Area page** (config-driven): "Roof replacement in {Suburb}", genuinely distinct local copy (housing style and age, typical roof types, weather exposure), services with links, a short FAQ, the quote form pre-filled with the suburb, neighbouring areas. No find-and-replace doorway pages. Start with 20 to 24 Brisbane and Moreton Bay suburbs (CONFIRM the list in section 12).
- **Project page:** real project only: suburb, roof type, what was done, photos, a customer quote if real.
- **About:** the owner and crew story with placeholders where real content is missing, how the business works, the licence and ABN.

## 7. Conversion system (the main job of the site)

The phone number and a free quote must be **unmissable on every page**.
- Header: phone and **Get a free quote** always visible. Mobile: sticky bottom bar with Call and Quote.
- A call band on every page above the footer.
- **Quote form** (one component, used everywhere): name, phone, email, **property address** (suburb is enough to start), service (pre-filled), roof type (tile, metal, unsure), roughly how old the roof is, message, **optional photo upload (up to 5 images)**. Short multi-step version on mobile. Honeypot and time check, server-side validation.
- Copy under the form: "Free quote. We reply Mon to Fri, 9am to 5pm." (do not promise a faster response time unless the owner confirms one).
- On submit: POST to `/api/lead` with a pluggable adapter. Default sends an email to toptinroofing@gmail.com. Environment variable `LEAD_WEBHOOK_URL` points it at the owner's TopTin System / GoHighLevel webhook with no code change. Redirect to `/thank-you`.
- Events: `phone_click`, `quote_started`, `quote_submitted`.
- One phone number everywhere, enforced by a build check.

## 8. SEO and legitimate link building

- Unique title (50 to 60 characters) and description (140 to 160) on every page. Pattern: `{Service} {Suburb or Brisbane} | Top Tin Roofing`. One H1 per page, canonical tags, sitemap, robots, Open Graph images.
- **JSON-LD:** `RoofingContractor` (LocalBusiness) with name, phone, email, areaServed, openingHours, logo, `identifier` for ABN, `Service` on service pages, `FAQPage`, `BreadcrumbList`, `Article` on posts, `AggregateRating` and `Review` only from the real `reviews.json`.
- **Build-time SEO audit** like the Delta site: fails the build on missing title, description, H1, canonical or JSON-LD, duplicate titles, images without alt, a phone number other than the business number, forbidden wording, and body copy or links missing from the raw HTML.
- Internal links: every service links to its areas and 2 to 3 posts; every area links to all services and neighbours; every post links to the matching service and area. No orphan pages.
- `/docs/link-building-plan.md`: Google Business Profile, Bing Places, Apple Business Connect, Yellow Pages, True Local, Hotfrog, Yelp, Master Roofers or industry bodies the business truly qualifies for, Colorbond or supplier installer directories, local suburb groups. Include an exact **NAP sheet** (name, service area, phone, email, website, categories, descriptions at 50, 150 and 750 characters). No link farms, paid links or automated linking.

## 9. Blog and starting content

Blog with category filters, table of contents, author box, related posts, a call to action in the middle and at the end, RSS. Write **10 launch posts** (700 to 1,100 words, original, plain Australian English, practical). Never invent statistics. Suggested:
1. `how-much-does-a-roof-replacement-cost-in-brisbane` (explain the factors, honest worked example with labelled assumptions)
2. `signs-your-roof-needs-replacing`
3. `colorbond-vs-tile-roofing-in-queensland`
4. `choosing-a-colorbond-colour-for-queensland-heat`
5. `how-a-roof-replacement-works-step-by-step`
6. `roof-replacement-and-storm-season-in-brisbane`
7. `roof-replacement-and-insurance-claims` (general guidance, no legal advice)
8. `what-to-check-before-you-hire-a-roofer` (licence, QBCC, written quote, insurance)
9. `asbestos-roofs-what-homeowners-should-know` (link only to authoritative sources such as WorkSafe Queensland)
10. `roof-insulation-and-thermal-performance-basics`

## 10. Content rules, logo and placeholders

- **Voice:** direct, friendly, plain Australian English. Short sentences. Straight talk about cost and process. No hype, no slang, no exclamation marks, **no em dashes anywhere**. Avoid "solutions", "seamless", "world class", "cutting edge", "unbeatable".
- **Logo:** download from the live site and save into `/public/brand/`: `https://toptinroofing.com/wp-content/uploads/2024/09/Top-Tin-roofing-logo-long-1.png` (long logo), `https://toptinroofing.com/wp-content/uploads/2025/09/top-tin-logo-white-background-300x300.png` (square), and look for a larger original in the same uploads folders. Do not redraw or recolour it. If the owner can supply SVG or high resolution files, use those. Generate favicon, Apple touch icon and Open Graph logo from the square mark.
- **Photos:** reuse the real project and crew photos already on the current site (Projects page and the media library at `/wp-content/uploads/`). Create `/docs/photo-shotlist.md` for what to capture (finished roofs from the street, crew on a roof, before and after pairs, Colorbond colour samples, materials, the owner).
- **Placeholders:** `[PHOTO: ...]`, `[OWNER STORY]`, `[REAL REVIEW]`, clearly visible. List all in `/docs/content-todo.md`.
- **Reviews:** copy the real Google reviews from the current homepage and Projects page into `/content/reviews.json` word for word with the reviewer's name as shown, and a link to the Google profile. The owner supplies the profile link.

## 11. Build order and acceptance

1. Scaffold, tokens, fonts, `site.config.ts`, layout, header, footer, sticky mobile bar, redirects from the old URLs.
2. Homepage and the quote form with the lead API.
3. Service pages (two or three) and the Colorbond page.
4. Projects (real photos), reviews page.
5. Area template and the suburb pages.
6. About, How it works, Contact, Quote, Thank you, Privacy, Terms.
7. Blog system and 10 posts.
8. Structured data, sitemap, robots, Open Graph images, SEO audit script.
9. Analytics events, Lighthouse, accessibility and link checks, Australian English spell check.
10. `/docs`: `README.md`, `link-building-plan.md`, `content-todo.md`, `photo-shotlist.md`, `redirects.md`.

**Acceptance (verify and report):**
- Lighthouse mobile 95+ for home, one service page, one area page and one blog post.
- Phone visible without scrolling on every page and in the sticky mobile bar; every `tel:` link works; every page has a quote call to action above the fold and at the end.
- Quote form works everywhere, validates, handles photo uploads, redirects to `/thank-you`, and the lead reaches the configured destination.
- **QBCC licence and ABN in the footer of every page.**
- No forbidden claim appears (search for: "#1", "best", "leading", "unbeatable", "award", "guarantee", "price match", "beat", "since 20", "decades"), and every CONFIRM claim is off unless its flag is on.
- No em dashes (search for the character).
- Every page has a unique title, description and one H1; JSON-LD validates; sitemap lists every page; no orphan pages; no broken links; every old URL redirects.

## 12. Decisions: confirmed and open

Confirmed from the current site: phone 0480 095 902, email toptinroofing@gmail.com, Brisbane QLD, ABN 25 656 843 944, QBCC 15465551, Mon to Fri 9am to 5pm, services roof replacement and Colorbond installation.

**Open (build with the stated default and list each in `/docs/content-todo.md`):**
1. **Are "50+ projects", "20+ years combined experience" and "100+ 5-star reviews" current and provable?** Default: off.
2. **Price match or beat offer:** publish or not, and the exact terms. Default: not published.
3. **"No hidden fees" and "no upfront costs":** confirm they are accurate for how jobs are really billed. Default: soft wording ("a written quote with the price set out").
4. **Services list:** only roof replacement and Colorbond installation, or also metal roofing, roof repairs, restoration, gutters and fascia? Default: the two services plus metal roofing as a material option.
5. **Service area and the suburb list.** Default: Brisbane and Moreton Bay, 20 to 24 suburbs chosen by the owner.
6. **Warranty and insurance wording** (workmanship warranty, manufacturer warranty, QBCC home warranty insurance). Default: not mentioned.
7. **Google Business Profile link** for the reviews, and whether the reviewers have agreed to appear on the site.
8. **Commercial work:** is it offered? Default: homeowners first, "homes and businesses" as one line.

Internal note for the owner, not for the site: a QBCC licence number has to appear on all advertising in Queensland. Keep it in the footer and on the contact page.

Begin now. First, open the current Top Tin site and the Delta reference, summarise in 15 lines what you will keep, what you will replace and what you will reuse from the Delta structure, then start with step 1.
