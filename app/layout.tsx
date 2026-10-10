import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ClientOverlays } from "@/components/layout/ClientOverlays";
import { FloatingQuote } from "@/components/layout/FloatingQuote";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Preloader } from "@/components/layout/Preloader";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { ColorShift } from "@/components/providers/ColorShift";
import { Providers } from "@/components/providers/Providers";
import { JsonLd } from "@/components/ui/JsonLd";
import { locations, serviceHref, services, site } from "@/lib/content";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["wdth", "opsz"],
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Yard Cleaning, Turf Care & Poop Scooping El Paso`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  // Canonical URLs are set per page (a layout-level canonical would leak to every child page).
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: `${site.name} | ${site.tagline}`, description: site.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FFCC24",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${site.url}/#business`,
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  image: `${site.url}/opengraph-image`,
  logo: `${site.url}/logo.webp`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    ...(site.address.street && { streetAddress: site.address.street }),
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    ...(site.address.postalCode && { postalCode: site.address.postalCode }),
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  areaServed: [
    { "@type": "AdministrativeArea", name: "El Paso County, TX" },
    ...locations.map((l) => ({ "@type": "Place", name: `${l.city}, ${l.region}` })),
  ],
  // Owner-confirmed hours: every day 7:30 AM – 6:30 PM
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:30",
      closes: "18:30",
    },
  ],
  hasMap: site.googleProfileUrl,
  sameAs: [site.googleProfileUrl, ...site.social.map((s) => s.href)],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Outdoor cleaning & yard care services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", "@id": `${site.url}${serviceHref(s.slug)}#service`, name: s.name, url: `${site.url}${serviceHref(s.slug)}` },
    })),
  },
};

// Runs before paint: skips the preloader on repeat visits and hides a dismissed announcement bar.
const bootScript = `try{var d=document.documentElement;d.classList.add('js');if(sessionStorage.getItem('pns-intro'))d.classList.add('skip-preloader');if(localStorage.getItem('pns-announce-dismissed'))d.classList.add('hide-announce')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <noscript>
          <style>{`[data-preloader]{display:none!important}`}</style>
        </noscript>
        <JsonLd data={jsonLd} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[999] rounded-full bg-ink px-5 py-3 font-semibold text-sun focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Providers>
          <Preloader />
          <ScrollProgress />
          <AnnouncementBar />
          <Header />
          <main id="main" data-page-theme="white" tabIndex={-1} className="outline-none">
            {children}
          </main>
          <Footer />
          <FloatingQuote />
          <ColorShift />
          <ClientOverlays />
        </Providers>
      </body>
    </html>
  );
}
