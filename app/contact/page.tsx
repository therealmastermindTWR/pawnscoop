import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { FaqSection } from "@/components/home/FaqSection";
import { PageHero } from "@/components/pages/PageHero";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Section } from "@/components/ui/Section";
import { faqs, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us & Free Quotes in El Paso, TX",
  description: `Call ${site.phone}, email us or request a free quote online. Paw N Scoop serves El Paso, TX and surrounding areas throughout El Paso County.`,
  alternates: { canonical: "/contact" },
};

const info = [
  { icon: Phone, label: "Call or text", value: site.phone, href: site.phoneHref },
  { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  {
    icon: MapPin,
    label: "Find us on Google",
    value: `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`,
    href: site.googleProfileUrl,
    external: true,
  },
  { icon: Clock, label: "Hours", value: site.hours.map((h) => `${h.days}: ${h.time}`).join(" · ") },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={["Let's talk", "(dog) business."]}
        sub="Questions about a service or ready for a quote? Call, text or email us, or request your free quote online in a couple of minutes."
        pose="waving"
        breadcrumb="Contact"
      >
        <QuoteButton variant="dark" size="lg" magnetic>
          Get My Free Quote
        </QuoteButton>
      </PageHero>
      <Section theme="white" aria-labelledby="contact-title" className="py-20 md:py-28">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <div className="flex flex-col gap-6">
            <h2 id="contact-title" className="text-4xl font-extrabold md:text-5xl">
              Get in touch
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {info.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="border-hard flex items-start gap-4 rounded-[1.5rem] bg-sun-100 p-5 text-ink">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-sun">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <span className="flex min-w-0 flex-col">
                    <span className="text-sm font-semibold text-charcoal">{label}</span>
                    {href ? (
                      <a
                        href={href}
                        {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                        className="font-display text-lg font-bold break-words hover:underline"
                      >
                        {value}
                        {external && <span className="sr-only"> (opens in a new tab)</span>}
                      </a>
                    ) : (
                      <span className="font-display text-lg font-bold">{value}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-hard flex flex-col items-start gap-5 rounded-[2rem] bg-ink p-8 text-white shadow-hard-lg md:p-10">
            <h2 className="text-3xl font-extrabold md:text-4xl">Ready for a cleaner yard?</h2>
            <p className="text-white/80">
              Our online request form lets you pick one or more services (poop scooping, turf cleaning, lawn care, yard cleanups or deodorizing) and send us
              your details in a couple of minutes.
            </p>
            <QuoteButton size="lg">Request a Free Quote</QuoteButton>
            <p className="text-sm text-white/60">Prefer to talk? Call {site.phone}.</p>
          </div>
        </div>
      </Section>
      <FaqSection items={faqs.slice(0, 6)} id="contact-faq-title" />
    </>
  );
}
