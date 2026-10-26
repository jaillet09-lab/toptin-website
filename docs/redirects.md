# Redirects

Every URL in the old WordPress sitemap (71 URLs, listed in `research/old-urls.txt`) redirects permanently (301) to
its closest new page. The rules live in `data/redirects.ts` and are loaded by `next.config.ts`.
Checked on 19 October 2026: all 71 old URLs land on a live page.

| Old URL | New URL |
|---|---|
| `/contact-us` | `/contact` |
| `/roof-replacement` | `/services/roof-replacement` |
| `/colorbond-roof-installation` | `/services/colorbond-roof-installation` |
| `/privacy-policy`, `/terms-conditions` | `/privacy`, `/terms` |
| `/roof-before-after` | `/projects` |
| `/about`, `/projects` | same path |
| `/roof-replacement-{suburb}-qld`, `/colorbond-roof-installation-{suburb}-qld`, `/metal-roof-repair-{suburb}-qld` | `/areas/{suburb}` when the suburb has a new page, otherwise `/areas` |
| `/{city}-brisbane-qld` service pages | the matching service page |
| Old blog posts at the site root | the closest new guide (insurance, asbestos, leaks, metal vs tile, roof colour and heat, condensation), otherwise `/blog` |

On 26 October 2026 Search Console showed 19 more old URLs that were not in the old sitemap and returned 404: the
same suburb pages under `/service-areas/` (and a trashed `/service-areas__trashed/` copy), `/metal-roof-repair`, and
old posts on insurance, condensation, roof colours, parapets, whirlybirds, roof bedding and gutter holes. They now
redirect the same way: suburb pages to `/areas/{suburb}` or `/areas`, `/metal-roof-repair` to the roof replacement
service, and each post to its closest new guide or `/blog`.

Some old suburb pages were for places that are not in the Brisbane area (for example Abermain) or misspelt
("badgen"). They redirect to `/areas`.

## Domains

- Main domain: **https://toptinroofing.com** (canonical URLs, sitemap and schema all use it).
- `toptinroofing.com.au` and `www.` variants should 301 to `https://toptinroofing.com`. Set this up in Vercel
  (Settings → Domains: add each domain and choose "Redirect to toptinroofing.com") once the domains point to Vercel.
