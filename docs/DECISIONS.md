# Decisions confirmed by the owner (Jackson), 2026-10-19

These override the matching parts of docs/BRIEF.md.

1. **Colours: navy + Tin Yellow, not gold + black.** The real logo is navy and yellow, and the brief says to sample
   colours from the logo. Use the TopTin brand tokens:
   - Tin Navy `#0F162E` (primary dark, hero, header text), brand navy `#1D2B4F`
   - Tin Yellow `#F8BC26` (accent: buttons, key numbers, underlines), hover `#E9AC14`
   - Charcoal `#252525` (logo mark / print rules only)
   - Greys: 50 #F9FAFB, 100 #F2F4F7, 200 #E4E7EC, 300 #D0D5DD, 400 #98A2B3, 500 #667085, 600 #475467,
     700 #344054, 900 #101828; page background #F5F6F8
   Primary button = Tin Yellow background, navy text. Keep yellow sparing and confident.
2. **Build here**, in this standalone repo (`toptin-website`), separate from the TopTin System app.
   GitHub remote: `jaillet09-lab/toptin-website` (owner creates the empty repo; then add the remote and push).
3. **Main domain: https://toptinroofing.com** (canonical URLs, sitemap, Open Graph, JSON-LD all use .com).
   `toptinroofing.com.au` should 301 to the .com (configure at DNS/Vercel level later; document in docs/redirects.md).
4. **Brief's open questions (section 12): build with the stated safe defaults** (all CONFIRM claims off, no
   price-match, no warranty wording) and list each in docs/content-todo.md.
5. **Phone:** use only 0480 095 902 (+61480095902) as the brief says. Note for the owner: the current site also shows
   0480 095 902 (Ethan's mobile, used on TopTin proposals); confirm in content-todo whether it should appear anywhere.
6. **Logo files:** the real artwork is also available locally (higher quality than the WP thumbnails):
   - `../TopTin-System/public/brand/toptin-logo-transparent.png` (full colour, transparent, 1000x200)
   - `../TopTin-System/public/brand/toptin-logo-reversed.png` (for navy backgrounds)
   - `../TopTin-System/public/brand/toptin-mark-white.png` (stacked white logo, 500x500)
   - favicon/app icons already generated there (`app/icon.png`, `app/apple-icon.png`, `public/brand/icon-*.png`)
   Do not redraw or recolour the logo.
7. **Leads:** default lead destination email toptinroofing@gmail.com; `LEAD_WEBHOOK_URL` can later point at the
   TopTin System. Note: TopTin System's GHL sync must stay invisible to GHL users (read-only), so do not add
   anything inside GHL.

# Brand system adopted by the owner (Jackson), 2026-10-26

8. **Brand: Plain Sight (Option A of three).** Supersedes decisions 1 and the typography and colour notes in docs/BRIEF.md.
   Inter only (weights 400 to 600), Navy 700 #1D2B4F and Navy 900 #0F162E, Tin Yellow #F8BC26 used rarely, 8 px corners, no shadows,
   no gradients. Full spec in docs/BRAND.md and docs/brand-tokens.json. The Archivo display font, heavy 700 to 800 headlines, pill
   shapes and the photo-and-gradient hero are retired. Heroes are text on navy with the photo as its own block and a yellow rule.
   The logo option (three redesigns of ROOFING) is not chosen yet: keep the current logo files until it is.
9. **Who looks after a client:** Jackson answers every enquiry and follows up. Ethan inspects, gives the quote and, once accepted,
   takes over the job. Never promise one point of contact in copy.
