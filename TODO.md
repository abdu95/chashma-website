# TODO

### Quick

- [ ] Open Graph / Twitter Card meta tags + a share image (currently
      sharing the link on Telegram/WhatsApp/Twitter shows no preview image)
- [ ] Visible "sample report" label on the hero readout mockup — right
      now "this is an example" only exists in an `aria-label`, so sighted
      visitors have no indication the 87%/9-of-11 numbers are illustrative
- [ ] Skip-to-content link for keyboard/screen-reader users (competitor
      ishtopchi.uz has one, we don't)
- [ ] Security headers (CSP, X-Content-Type-Options, X-Frame-Options,
      Referrer-Policy, Permissions-Policy) — easy to add via Cloudflare,
      currently missing entirely
- [ ] Add a visible contact/support channel (email or Telegram handle) —
      right now there's no way to reach a human if the bot has a problem;
      both competitors (ishtopchi.uz, ishtop.uz) show phone/email/Telegram
      prominently

### Needs a decision or content from Abdumalik, not just code

- [ ] Resolve the Chashma (domain/brand) vs Accepted AI (on-page product
      name) mismatch — nothing on the page currently ties the two together
- [ ] Privacy policy / terms — needs actual data-handling practices
      described accurately before it can be written (competitors both have
      dedicated Privacy + Data Security pages)
- [ ] FAQ section — needs real Q&A content (can draft for review)
- [ ] Real product screenshots / proof beyond the founder's own anecdote —
      consider a live/dynamic stat instead of a static funnel chart if the
      bot's own usage data supports it (e.g. "N CVs analyzed this week"),
      similar to ishtopchi.uz's live scrolling job-listing feed
- [ ] Analytics — needs a tool choice and an account/ID. Both competitors
      run Google Analytics *and* Yandex Metrika (Yandex has real search/ad
      share in Uzbekistan, worth not skipping)
- [ ] Verify the site in Google Search Console (and consider Yandex
      Webmaster too) and request indexing for /ru/ and /uz/ directly —
      right now a Uzbek-language search still surfaces the English page
      because Google hasn't crawled the language variants yet since the
      domain's hosting just changed
- [ ] Social media presence (Telegram channel / Instagram) linked in the
      footer, if such accounts exist or are planned — both competitors
      show this, we currently have none
- [ ] Blog / articles section targeting long-tail, intent-matched SEO
      keywords ("rezyume tahlili", "CV tekshirish onlayn", "резюме под
      вакансию проверить") instead of chasing broad, listing-dominated
      terms like "ish topish" / "найти работу" — those are owned by
      mehnat.uz (the government labor exchange, osonish.uz) and
      well-funded job-board apps; a CV-analysis landing page won't
      realistically outrank listing sites for a pure job-search query.
      Idea borrowed from osonish.uz's "useful articles" section
      (interview tips, CV-writing guide) — same content angle, aimed at
      keywords people search when they actually want *this* product
