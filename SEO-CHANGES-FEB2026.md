# PastorBot Website — SEO Changes (Feb 2026)

Context doc for the pastorbot-website session. Based on a full GSC audit of `sc-domain:pastorbot.app` (Nov 2025 – Feb 2026). Full strategy details in `C:\pastorbot\docs\architecture\seo-strategy.md`.

## Current State (the problem)

- **16 clicks in 3 months** from 536 impressions (2.99% CTR)
- **Only 2 pages indexed**: homepage + payment-success
- **Sitemap: 0 of 2 URLs indexed** (stale lastmod from 2023, contains `/404` entry)
- **No GA4** — zero analytics tracking
- **Title tag is keyword-free**: `"PastorBot - Biblical Scholarship for Everyone"` — none of the terms people search for ("discord", "bible bot", "bible study")
- **Payment-success page ranking at position 3.9** with 9 impressions — wasting crawl budget
- **Mobile ranks page 1** (position 7.69) but desktop is page 2 (17.02) — mobile is already working, desktop needs content

## Changes Needed (in priority order)

---

### 1. Create GA4 Property (Manual — MCP is read-only)

The GA4 MCP tools can only read reports, not create properties. Do this manually:

1. Go to https://analytics.google.com
2. Admin > Create Property
   - Property name: `PastorBot Website`
   - Reporting time zone: US Eastern
   - Currency: USD
3. Set up Web data stream:
   - URL: `https://pastorbot.app`
   - Stream name: `PastorBot Web`
4. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
5. Add the gtag.js snippet to `index.html` (see code change below)

**After creating, set up these events:**
- Custom event: `add_to_server` — fire when "Add to Discord" button is clicked
- Custom event: `join_support` — fire when "Join Support Server" is clicked
- Mark `add_to_server` as a conversion in GA4 > Admin > Events

#### Code change in `index.html`

Add this inside `<head>`, after the existing meta tags (around line 12):

```html
<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with the actual Measurement ID from step 4.

#### Optional: Track "Add to Discord" clicks

In `src/pages/Home.tsx`, update `handleGetStarted()`:

```tsx
const handleGetStarted = () => {
  // Track conversion event
  if (typeof gtag === 'function') {
    gtag('event', 'add_to_server', { event_category: 'conversion' });
  }
  redirectToDiscordAuth(true);
};
```

Add a type declaration for gtag if using TypeScript — add to `src/vite-env.d.ts`:

```ts
declare function gtag(...args: any[]): void;
```

---

### 2. Fix Title Tag and Meta Description

**Why:** Current title "PastorBot - Biblical Scholarship for Everyone" contains zero search terms. People search for "bible bot discord", "discord bible bot", "christian bot discord". The title needs these keywords.

#### File: `index.html`

**Line 40** — Change title:
```html
<!-- OLD -->
<title>PastorBot - Biblical Scholarship for Everyone</title>

<!-- NEW -->
<title>PastorBot — AI Bible Study Bot for Discord | Daily Verses, Voice & Pastor Chat</title>
```

**Line 15** — Update meta description:
```html
<!-- OLD -->
<meta name="description" content="PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI." />

<!-- NEW -->
<meta name="description" content="Add PastorBot to your Discord server for daily lectionary Bible studies, voice-guided lessons, AI pastoral conversations, and weekly group studies. Free to start." />
```

**Lines 25-26** — Update Open Graph:
```html
<meta property="og:title" content="PastorBot — AI Bible Study Bot for Discord | Daily Verses, Voice & Pastor Chat" />
<meta property="og:description" content="Add PastorBot to your Discord server for daily lectionary Bible studies, voice-guided lessons, AI pastoral conversations, and weekly group studies. Free to start." />
```

**Lines 32-33** — Update Twitter:
```html
<meta name="twitter:title" content="PastorBot — AI Bible Study Bot for Discord | Daily Verses, Voice & Pastor Chat" />
<meta name="twitter:description" content="Add PastorBot to your Discord server for daily lectionary Bible studies, voice-guided lessons, AI pastoral conversations, and weekly group studies. Free to start." />
```

#### File: `src/utils/SEO.tsx`

**Line 17** — Update default title:
```tsx
// OLD
title = 'PastorBot - Biblical Scholarship for Everyone',

// NEW
title = 'PastorBot — AI Bible Study Bot for Discord | Daily Verses, Voice & Pastor Chat',
```

**Line 18** — Update default description:
```tsx
// OLD
description = 'PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI. Ask any question about Christianity and receive scholarly insights.',

// NEW
description = 'Add PastorBot to your Discord server for daily lectionary Bible studies, voice-guided lessons, AI pastoral conversations, and weekly group studies. Free to start.',
```

**Line 25** — Update title check:
```tsx
// OLD
const fullTitle = title === 'PastorBot - Biblical Scholarship for Everyone'

// NEW
const fullTitle = title === 'PastorBot — AI Bible Study Bot for Discord | Daily Verses, Voice & Pastor Chat'
```

#### File: `src/utils/seo-data.ts`

**Line 8** — Update default title:
```ts
// OLD
defaultTitle: 'The AI-Powered Biblical Assistant for Discord',

// NEW
defaultTitle: 'PastorBot — AI Bible Study Bot for Discord | Daily Verses, Voice & Pastor Chat',
```

**Line 9** — Update description:
```ts
// OLD
description: 'PastorBot brings seminary-level biblical understanding directly to your Discord community through the power of AI. Ask any question about Christianity and receive scholarly insights.',

// NEW
description: 'Add PastorBot to your Discord server for daily lectionary Bible studies, voice-guided lessons, AI pastoral conversations, and weekly group studies. Free to start.',
```

---

### 3. Noindex Payment-Success Page

**Why:** payment-success is indexed at position 3.9 with 9 impressions. It's a post-checkout page with zero value.

The `robots.txt` already disallows `/payment-success/` but Google indexed it anyway (robots.txt is advisory). Need a hard `noindex` meta tag.

#### File: `src/pages/PaymentSuccess.tsx`

Add the SEO component with noindex. Import SEO at top:
```tsx
import SEO from '../utils/SEO';
```

Add inside the return, before the first `<div>`:
```tsx
<SEO
  title="Payment Success"
  description="Your PastorBot payment was successful."
  noindex={true}
  path="/payment-success"
/>
```

The `SEO` component already supports `noindex` prop (renders `<meta name="robots" content="noindex,follow" />`).

Also do the same for `PaymentCancelled.tsx`, `StripeSuccess.tsx`, `BotSuccess.tsx`, `Cancel.tsx` — any transactional page that shouldn't be indexed.

---

### 4. Rebuild Sitemap

**Why:** Current sitemap has `lastmod: 2023-11-20` (2+ years stale), contains a `/404` page, and 0 of 2 URLs are indexed per GSC.

#### File: `public/sitemap.xml`

Replace entire file with:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://pastorbot.app/</loc>
    <lastmod>2026-02-08</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

Key changes:
- Removed `/404` entry (no SEO value)
- Updated `lastmod` to today's date
- Added trailing slash to homepage URL for consistency
- Only includes indexable pages (add feature pages here as they're created)

After deploying, **resubmit sitemap in Google Search Console**:
1. Go to https://search.google.com/search-console
2. Select `sc-domain:pastorbot.app`
3. Sitemaps > Enter `https://pastorbot.app/sitemap.xml` > Submit

---

### 5. Fix robots.txt Path Matching

**Why:** robots.txt has `/payment-success/` with trailing slash but the actual route is `/payment-success` (no trailing slash). Google may not match the disallow rule.

#### File: `public/robots.txt`

Replace with:
```
User-agent: *
Allow: /

# Transactional pages — not for indexing
Disallow: /payment-success
Disallow: /payment-cancelled
Disallow: /success/
Disallow: /cancel

# Legal pages
Disallow: /privacy-policy
Disallow: /terms-of-service

# Sitemap
Sitemap: https://pastorbot.app/sitemap.xml
```

Changes: removed trailing slashes from `/payment-success/` and `/payment-cancelled/` to match actual routes.

---

### 6. Fix Google Search Console Verification

**Why:** `index.html` line 12 still has `REPLACE_WITH_YOUR_ACTUAL_VERIFICATION_CODE`. If GSC verification is done via DNS (which it likely is since the site is `sc-domain:pastorbot.app`), this meta tag is harmless but sloppy. Either:
- Replace with actual verification code if one exists
- Or remove the meta tag entirely if verification is via DNS

---

## Verification After Deploy

After deploying all changes:

1. **Check title in browser tab** — should show "PastorBot — AI Bible Study Bot for Discord | ..."
2. **View source** — confirm GA4 gtag snippet is present, confirm noindex on payment-success
3. **Google Search Console:**
   - Resubmit sitemap
   - Use URL Inspection tool on `https://pastorbot.app/` — request re-indexing
   - Use URL Inspection on `https://pastorbot.app/payment-success` — confirm noindex is detected
4. **GA4:** Go to https://analytics.google.com > Realtime > Visit pastorbot.app — confirm you see yourself
5. **Social preview:** Test OG tags at https://www.opengraph.xyz/url/https://pastorbot.app

## Files Changed Summary

| File | Change |
|------|--------|
| `index.html` | Add GA4 tag, update title/meta/OG/Twitter tags, fix GSC verification |
| `src/utils/SEO.tsx` | Update default title and description |
| `src/utils/seo-data.ts` | Update defaultTitle and description |
| `src/pages/PaymentSuccess.tsx` | Add `<SEO noindex />` |
| `src/pages/PaymentCancelled.tsx` | Add `<SEO noindex />` |
| `src/pages/StripeSuccess.tsx` | Add `<SEO noindex />` |
| `src/pages/BotSuccess.tsx` | Add `<SEO noindex />` |
| `src/pages/Cancel.tsx` | Add `<SEO noindex />` |
| `public/sitemap.xml` | Remove /404, update lastmod |
| `public/robots.txt` | Fix path matching (trailing slashes) |
| `src/vite-env.d.ts` | Add gtag type declaration (optional) |
