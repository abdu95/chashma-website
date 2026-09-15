# TODO

Tracking what's left from the site review. Done items are kept (checked)
so there's a record of what's already been addressed — don't re-open them
without a reason.

## Done

- [x] Fix low-contrast gray text (`--ink-3`) failing WCAG AA
- [x] Fix dead CTA buttons (`href="#"` with no JS fallback)
- [x] Per-language Telegram bot attribution (`start=chashma_en/ru/uz`)
- [x] Restore mobile nav CTA (was `display:none` below 860px)
- [x] Fix funnel bar rendering bug on narrow/mobile screens
- [x] Add `robots.txt`
- [x] Add `sitemap.xml`
- [x] Add `theme-color` meta tag
- [x] Add JSON-LD structured data (SoftwareApplication)
- [x] De-duplicate the 3 HTML files into `src/template.html` + per-locale
      content JSON, built via `npm run build`
- [x] Minor cleanup: inline styles → CSS classes, founder section heading
      hierarchy, cache-busted asset URLs, custom `404.html`
- [x] Favicon + apple-touch-icon
- [x] Move icon assets into `icons/`
- [x] Build-time verification (`src/build.js` fails loudly on missing
      content keys, dead `href="#"` links, unresolved placeholders, or
      structural drift between locale pages)
- [x] Git repo created and pushed (github.com/abdu95/chashma-website)

## Left to do

### Quick

- [ ] Open Graph / Twitter Card meta tags + a share image (currently
      sharing the link on Telegram/WhatsApp/Twitter shows no preview image)
- [ ] Visible "sample report" label on the hero readout mockup — right
      now "this is an example" only exists in an `aria-label`, so sighted
      visitors have no indication the 87%/9-of-11 numbers are illustrative

### Needs a decision or content from Abdumalik, not just code

- [ ] Resolve the Chashma (domain/brand) vs Accepted AI (on-page product
      name) mismatch — nothing on the page currently ties the two together
- [ ] Privacy policy / terms — needs actual data-handling practices
      described accurately before it can be written
- [ ] FAQ section — needs real Q&A content (can draft for review)
- [ ] Real product screenshots / proof beyond the founder's own anecdote
- [ ] Analytics (GA4 / Plausible / Meta Pixel, etc.) — needs a tool choice
      and an account/ID
