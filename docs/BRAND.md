# Top Tin brand: Plain Sight

Chosen 26 October 2026 (Option A of three). Every client-facing thing Top Tin makes follows this: website, estimates, quotes, emails, forms, booklets, letters, signs. The same file sits in both repos: `toptin-website/docs/BRAND.md` and `TopTin-System/docs/BRAND.md`. Keep them identical.

Design canvas with the options, mockups and voice guide: https://claude.ai/artifact/WYAVpq3fV8bhGACLU3gipi

## The idea

One typeface family. Large, calm headlines. Space does the work. Hierarchy comes from size and spacing, not weight or decoration. Navy and white, with yellow used rarely so it keeps its meaning.

## Logo

Use the current logo files until a logo option is chosen from the canvas (Logo 1, 2 or 3). White version on navy, full colour on white. Never recolour, stretch, outline or shadow it. Clear space is the height of the letter T. Minimum width 120 px on screen, 30 mm in print.

## Colour

| Name | Hex | Use |
|---|---|---|
| Navy 700 | `#1D2B4F` | Header bands, buttons, headings on white |
| Navy 900 | `#0F162E` | Website hero and footer, large dark areas |
| Tin Yellow | `#F8BC26` | Rules, the primary button, one key mark per page |
| Yellow ink | `#8A6100` | Yellow-family text on white (5.5:1) |
| Yellow wash | `#FFF6DB` | Callouts, with a `#FDE4A0` border |
| Ink | `#101828` | Headlines and key figures |
| Slate 700 | `#344054` | Body text |
| Slate 600 | `#475467` | Lead paragraphs, secondary text |
| Slate 500 | `#667085` | Captions and labels (5.0:1) |
| Line | `#E4E7EC` | Hairlines and borders |
| Wash | `#F5F6F8` | Page and section ground |
| Mist | `#C9D3E6` | Body text on navy |
| Navy 300 | `#9AA7C7` | Labels on navy |

Proportion on any page: about 72% white and wash, 18% navy, 8% ink text, 2% yellow. If yellow appears more than a handful of times on one page it stops meaning anything.

Not in the system any more: bright blue `#2F5BB7`, sky blue `#9DB6E8`, brand navy `#2B3D6B`, and weight 700 to 800 headlines.

Every pair above passes WCAG AA (4.5:1). White on Navy 700 is 13.9:1. Navy 700 on Tin Yellow is 8.1:1.

## Typography

Inter, variable, with the optical size axis switched on. Free, prints well. Weights 400, 500 and 600 only, never 700 or above. Sentence case everywhere. Capitals only for the small overline label. Figures are tabular so prices line up. Fallback where Inter is missing (Word, some email clients): Arial.

| Style | Documents (A4) | Web | Notes |
|---|---|---|---|
| Display | 44/48, 600, -3.5% | 64/68, 600, -3.5% | Covers and the website hero only |
| Title | 36/42, 600, -3% | 44/50, 600, -3% | The document or page title |
| Heading | 20/26, 600, -1.5% | 30/36, 600, -2% | Section headings |
| Subheading | 15/22, 600 | 20/26, 600, -1.5% | |
| Body | 14/22, 400 | 17/28, 400 | Smallest allowed body in a document is 14 px |
| Small | 12/18, 400 | 14/22, 400 | Nothing is ever set below 12 px |
| Overline | 12/16, 600, +12%, capitals | 13/18, 600, +12%, capitals | Yellow ink on white |

## Layout and spacing

A 4 px scale: 4, 8, 12, 16, 24, 32, 48, 64, 96. Everything snaps to it.

- **A4 document:** 794 × 1123 px. Margins 56 px. Header band 96 px of Navy 700 with the white logo on the left and the document type and reference on the right, then a 3 px yellow rule. Footer 12/16 with a hairline above. Twelve columns, 24 px gutter. 24 to 32 px between sections.
- **Website:** content width 1160 px, 40 px side padding. Sections 64 to 96 px apart.
- **Corner radius:** 8 px for buttons, cards and photos.
- **Rules:** 1 px Line, 1.5 px strong, 3 px yellow.
- **No shadows. No gradients.**

## Components

- **Primary button:** Tin Yellow, Navy 700 text, 600 weight, 8 px radius, 48 to 52 px tall. One per screen.
- **Secondary button:** 1.5 px Navy 700 outline. On dark, a 1.5 px white outline.
- **Price:** ex GST in Slate 500 above, the inc GST figure large in Ink with a 3 px yellow underline.
- **Callout:** Yellow wash with a Yellow line border.
- **Step:** a 1.5 px Ink rule on top, the number in Yellow ink, a heading, one line of body.
- **List:** a 6 px yellow square marker, hairline between rows.

## Voice

Say it plainly. Say who does what. Stand behind it. Full guide on the canvas, "Voice and wording".

- Plain, specific, accountable, calm, local. Sentences average 15 words, never over 25.
- Documents say "we". A message from a named person may say "I".
- Australian English. Dates as 25 October 2026. Money as $24,860 then "inc GST" or "ex GST" in lower case. Units with a space: 183 m², 0.48 mm.
- No exclamation marks. "And", not "&". No dashes inside a sentence.
- Never: best, leading, premium, unbeatable, cheap, bargain, solutions, state-of-the-art, "guarantee" outside the written warranty.
- Three document names: Estimate, Quote, Contract.
- Who looks after a client: Jackson answers every enquiry and follows up. Ethan inspects, gives the quote and, once the client accepts, takes over the job. Say who owns each step. Never promise one point of contact.

## Where it is implemented

- Website: `app/globals.css` holds the tokens and the shared classes. `app/layout.tsx` loads Inter.
- System documents: `lib/brand.ts` holds the tokens. `components/estimate/EstimateDocument.tsx`, `components/quote/ClientQuoteV2.tsx`, the legacy quote at `app/q/[id]/ClientQuotePage.tsx`, the booklet at `app/profile/page.tsx`, and the email HTML in `app/api/quotes/[id]/sign` and `accept`.
- Tokens as data: `docs/brand-tokens.json` in both repos.
