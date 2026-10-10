import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { Mascot } from "@/components/mascot/Mascot";
import { socialIcons } from "@/components/ui/Icons";
import { Logo } from "@/components/ui/Logo";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { locations, nav, site } from "@/lib/content";
import { FooterWordmark } from "./FooterWordmark";

type FooterLink = { label: string; href: string; external?: boolean };

const columns: { title: string; links: FooterLink[] }[] = [
  { title: "Services", links: [...nav.services.map(({ label, href }) => ({ label, href })), { label: "Commercial", href: nav.commercial.href }, { label: "All Services", href: "/services" }] },
  {
    title: "Service Areas",
    links: [...locations.slice(0, 6).map((l) => ({ label: l.city, href: `/locations#${l.slug}` })), { label: "All Service Areas", href: "/locations" }],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Refer a Friend", href: "/refer-a-friend" },
      { label: "Review Us on Google", href: site.googleReviewUrl, external: true },
      { label: "Client Login", href: site.clientLoginUrl, external: true },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden bg-ink text-white" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="container-x pt-20 md:pt-28">
        <div className="flex flex-col items-start justify-between gap-8 border-b-2 border-white/15 pb-14 md:flex-row md:items-end">
          <div className="flex items-end gap-5">
            <span className="relative hidden shrink-0 sm:block">
              <span className="absolute inset-x-1 top-6 bottom-0 rounded-full bg-sun" aria-hidden />
              <Mascot pose="waving" className="relative h-36 w-auto" aria-hidden />
            </span>
            <p className="max-w-xl font-display text-[clamp(2rem,4.5vw,3.75rem)] leading-[0.95] font-extrabold tracking-tight">
              Ready for a yard you actually <span className="text-sun">want</span> to walk in?
            </p>
          </div>
          <QuoteButton size="lg" magnetic>
            Get My Free Quote
          </QuoteButton>
        </div>

        <div className="grid gap-12 py-14 md:grid-cols-2 lg:grid-cols-[1.6fr_repeat(3,1fr)]">
          <div className="flex flex-col gap-5">
            <Logo className="h-28 self-start" sizes="140px" />
            <p className="font-display text-xl leading-tight font-extrabold text-white">{site.tagline}</p>
            <p className="max-w-sm text-white/75">{site.blurb}</p>
            <ul className="flex flex-col gap-3 text-white/85">
              <li>
                <a href={site.phoneHref} className="flex items-center gap-3 hover:text-sun">
                  <Phone className="size-4 text-sun" aria-hidden /> {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-3 break-all hover:text-sun">
                  <Mail className="size-4 shrink-0 text-sun" aria-hidden /> {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-sun" aria-hidden />
                <address className="not-italic">
                  {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
                  <br />
                  <span className="text-white/60">Serving {site.serviceArea}</span>
                </address>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-1 size-4 shrink-0 text-sun" aria-hidden />
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="text-white/60">{h.days}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            </ul>
            {site.social.length > 0 && (
              <div className="flex gap-2 pt-2">
                {site.social.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Paw N Scoop on ${s.label}`}
                      className="grid size-11 place-items-center rounded-full border-2 border-white/25 transition-all hover:-translate-y-1 hover:border-sun hover:bg-sun hover:text-ink"
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="eyebrow mb-5 text-sun">{col.title}</p>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    {l.external ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="group inline-flex items-center gap-2 text-white/85 transition-colors hover:text-sun">
                        <span className="h-[2px] w-0 bg-sun transition-all duration-300 group-hover:w-3" aria-hidden />
                        {l.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      <Link href={l.href} className="group inline-flex items-center gap-2 text-white/85 transition-colors hover:text-sun">
                        <span className="h-[2px] w-0 bg-sun transition-all duration-300 group-hover:w-3" aria-hidden />
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <FooterWordmark />

      {/* extra bottom padding on mobile so the floating Free Quote button never covers these links */}
      <div className="container-x flex flex-col gap-3 border-t-2 border-white/15 pt-6 pb-24 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between md:pb-6">
        <p>
          © {year} {site.legalName}. All rights reserved.
        </p>
        <nav aria-label="Legal" className="flex gap-5">
          <Link href="/privacy" className="hover:text-sun">
            Privacy Policy
          </Link>
          <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" className="hover:text-sun">
            Request a Quote<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
