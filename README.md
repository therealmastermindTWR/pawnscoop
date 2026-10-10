# Paw N Scoop: Marketing Site

Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · GSAP + ScrollTrigger · Lenis

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes prerender statically)
npm run typecheck
```

## Where things live

| Path | What |
| --- | --- |
| `lib/content.ts` | **All copy & data** (services, FAQs, review highlights, areas, stats, contact info). Facts come from the Google Business Profile + pawnscoop.com |
| `lib/content.ts → site.bookingUrl` | Jobber request form. Every Free Quote / booking CTA opens it in a new tab |
| `lib/google-reviews.ts` | Optional live Google reviews (Places API). See "Live Google reviews" below |
| `lib/quote.ts` | Contact + referral form submit stubs (**TODO: wire to email/Jobber**) |
| `app/globals.css` | Brand tokens (`@theme`), section themes, utilities, mascot animations |
| `components/home/*` | Home page sections, in page order |
| `components/pages/*` | Inner-page building blocks (PageHero, ServicePageTemplate, forms) |
| `components/mascot/Mascot.tsx` | The royal schnauzer mascot (`public/mascot.webp`). Poses = idle animations: `waving`, `sniffing`, `scooper`, `laptop`, `celebrating` (confetti), `peeking` (top half) |
| `components/providers/*` | Lenis + GSAP sync, page transitions, color shifts, toasts |
| `components/layout/*` | Header, mobile menu, footer, preloader, cursor, progress bar |

### Live Google reviews
The Reviews section shows your Google rating, review count and a summary of what customers mention. To show the **actual review text**, pulled automatically from Google and refreshed daily:
1. In Google Cloud, enable **Places API (New)** and create an API key (restrict it to that API).
2. Add these env vars to your host (and `.env.local` for local dev):
   ```
   GOOGLE_PLACES_API_KEY=your-key
   GOOGLE_PLACE_ID=ChIJ...   # optional, looked up automatically if omitted
   ```
Google returns up to 5 reviews. The carousel shows each author's name and photo plus Google attribution, which Google's terms require.

### How the motion is wired
- **Lenis** runs on the GSAP ticker and calls `ScrollTrigger.update`. It is disabled for `prefers-reduced-motion`.
- **Section color shifts:** any `<Section theme="white|yellow|black">` registers with `ColorShift`, and `#main` transitions its background and text color as each section crosses mid-screen.
- **Route transitions:** `PageTransition` intercepts same-origin link clicks. A curtain covers the screen, the route changes, then the curtain lifts. Add `data-no-transition` to a link to opt out.
- **Custom cursor:** add `data-cursor="Label"` to any element to show a label pill (e.g. `"Book"`).
- Heavy scroll effects use `gsap.matchMedia("(prefers-reduced-motion: no-preference)")`.

## Checklist

**Done (from Google Business Profile / pawnscoop.com)**
- [x] Logo (`public/logo.webp`) and mascot (`public/mascot.webp`)
- [x] Phone (915) 666-7272, email pawnscoopep@gmail.com, address 8229 Broadway Dr, El Paso, TX 79915
- [x] Hours: every day 6:30am–6:30pm (Google). Note: pawnscoop.com says 7:30am, so make both match
- [x] Rating 5.0 · 24 Google reviews (`stats`). Update the count as reviews come in, or enable live reviews
- [x] Services: Residential (weekly/bi-weekly/monthly/one-time scooping), Lawn Care (`/lawn-care`), Turf Cleaning, Commercial
- [x] Guarantees: 100% satisfaction (24h), gate security + photo; first scoop free with recurring plans
- [x] Jobber booking form + Client Hub login
- [x] El Paso County service areas; `/deodorizing` redirects to `/turf-cleaning`
- [x] Slogan "Pawsome Yards N Splendid Scoops" (`site.tagline`): hero, before/after, footer, preloader, marquee, metadata
- [x] Before/after slider (`components/home/BeforeAfter.tsx`, photos in `public/images/before.jpg` / `after.jpg`). Swap photos via `beforeAfter` in content.ts

**Still to replace**
- [ ] `app/icon.svg`: favicon (square PNG of the pup's head works best)
- [ ] `public/images/story.svg`: real team/yard photo (jpg/webp)
- [ ] `about.team`: names, roles, photos
- [ ] Verify the neighborhoods listed per service area
- [ ] Starting prices for Lawn Care and Turf Cleaning (`services → priceNote`)
- [ ] Confirm the Commercial service page fits your business (pawnscoop.com doesn't mention commercial)
- [ ] `promo.code` (`FIRSTSCOOP`), `promo.referralCredit` (`$25`); countdown in `components/home/Promo.tsx`
- [ ] `site.social` links, `site.legalName`, `site.videoUrl`
- [ ] `lib/quote.ts → submitForm()`: contact & referral forms
