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
| `lib/content.ts` | **All copy & data**: the 5 services (each with SEO title/description, H1, content, process, FAQs, Jobber pricing), FAQs, service areas, before/after photos, contact info |
| `lib/content.ts → site.bookingUrl` | Jobber request form. Every Free Quote CTA opens it in a new tab; customers pick one or more services there |
| `lib/google-reviews.ts` | Optional live Google reviews (Places API). See "Live Google reviews" below |
| `app/services/[slug]/page.tsx` | The five service landing pages (`/services/poop-scooping`, `/services/artificial-turf-cleaning`, `/services/lawn-care`, `/services/yard-cleanup`, `/services/disinfecting-deodorizing`) with Service, Breadcrumb and FAQ structured data |
| `next.config.ts` | Redirects: old URLs → new service pages, and `pawnscoop.com` → `www.pawnscoop.com` |
| `components/home/*` | Homepage sections, in page order |
| `components/pages/*` | Inner-page building blocks (PageHero, ServicePageTemplate, LocationsDirectory) |
| `components/mascot/Mascot.tsx` | The royal schnauzer mascot (`public/mascot.webp`) |

### Adding before & after photos
Put both photos in `public/images/` and add an entry to `transformations` in `lib/content.ts` with its category
(`Pet Waste Removal`, `Artificial Turf Cleaning`, `Lawn Care`, `Yard Cleanups` or `Outdoor Deodorizing`). The gallery and the matching
service page pick it up automatically; categories with no photos stay hidden. Only use genuine Paw N Scoop work photos.

### Adding service card photos
Set `image: { src, alt }` on a service in `lib/content.ts`. Until then the card shows an illustrated icon panel.

### Live Google reviews
The Reviews section shows your Google rating, review count and a summary of what customers mention. To show the **actual review text**, pulled automatically from Google and refreshed daily:
1. In Google Cloud, enable **Places API (New)** and create an API key (restrict it to that API).
2. Add these env vars to your host (and `.env.local` for local dev):
   ```
   GOOGLE_PLACES_API_KEY=your-key
   GOOGLE_PLACE_ID=ChIJ...   # optional, looked up automatically if omitted
   ```

## Owner checklist (search `CONFIRM:` in the code)

- [ ] Update Google Business Profile hours to 7:30am–6:30pm (the site already shows this)
- [ ] Free first scoop: is it new customers only?
- [ ] Recurring lawn care availability; deodorizing products/surfaces
- [ ] Service areas: confirm every listed community
- [ ] Real photos for turf cleaning, lawn care, yard cleanups and deodorizing (cards + before/after)
- [ ] Social profile URLs (`site.social`), legal business name (`site.legalName`), explainer video (`site.videoUrl`)
- [ ] Privacy Policy reviewed (`app/privacy/page.tsx`)
- [ ] Favicon from the logo (`app/icon.svg` is still a generic paw)
