import { ArrowRight, Check, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Accordion } from "@/components/ui/Accordion";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { locations, promo, site, type Service } from "@/lib/content";
import { PageHero } from "./PageHero";

const benefitColors = ["bg-white", "bg-sun-100", "bg-white", "bg-tangerine-100"];

export function ServicePageTemplate({ service }: { service: Service }) {
  const lower = service.name.toLowerCase();

  return (
    <>
      <PageHero
        eyebrow={service.name}
        title={[service.h1]}
        sub={service.intro}
        pose={service.mascot}
        breadcrumb={service.name}
        parent={{ label: "Services", href: "/services" }}
        titleClassName="text-[clamp(2.6rem,7vw,5.75rem)]"
      >
        <div className="flex flex-wrap items-center gap-4">
          <QuoteButton variant="dark" size="lg" magnetic>
            Get My Free Quote
          </QuoteButton>
          <a href={site.phoneHref} className="flex items-center gap-2 font-display text-lg font-bold underline decoration-[3px] underline-offset-[6px] hover:decoration-tangerine">
            <Phone className="size-5" aria-hidden /> {site.phone}
          </a>
        </div>
      </PageHero>

      {/* What it is + what's included */}
      <Section theme="white" aria-labelledby="overview-title" className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div className="flex flex-col gap-6">
            <SectionHeading id="overview-title" eyebrow="The service" title={`What is ${lower}?`} titleClassName="text-[clamp(2.2rem,5vw,4rem)]" />
            {service.overview.map((p) => (
              <Reveal key={p} className="text-muted text-lg md:text-xl">
                {p}
              </Reveal>
            ))}

            {service.pricing && (
              <Reveal className="mt-4 flex flex-col gap-4">
                <h3 className="text-2xl font-extrabold md:text-3xl">Plans &amp; pricing</h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.pricing.map((p) => (
                    <li key={p.name} className="border-hard flex flex-col gap-1 rounded-[1.25rem] bg-sun-100 p-5 text-ink">
                      <span className="flex items-baseline justify-between gap-3">
                        <span className="font-display text-lg font-extrabold">{p.name}</span>
                        <span className="font-display text-xl font-extrabold whitespace-nowrap">{p.price}</span>
                      </span>
                      <span className="text-sm text-charcoal">{p.detail}</span>
                    </li>
                  ))}
                </ul>
                {service.slug === "poop-scooping" && <p className="text-sm text-charcoal">{promo.eligibility}</p>}
              </Reveal>
            )}
          </div>

          <Reveal className="border-hard self-start rounded-[2rem] bg-sun p-7 text-ink shadow-hard md:p-9">
            <div className="mb-5 flex items-center gap-3">
              <span className="border-hard grid size-12 place-items-center rounded-2xl bg-white">
                <ServiceIcon name={service.icon} className="size-6" strokeWidth={2.2} />
              </span>
              <h2 className="text-2xl font-extrabold md:text-3xl">What&apos;s included</h2>
            </div>
            <ul className="flex flex-col gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex items-start gap-3 text-lg font-medium">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-ink text-sun">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <QuoteButton variant="dark" size="md">
                Request {service.name}
              </QuoteButton>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Benefits */}
      <Section theme="yellow" aria-labelledby="benefits-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            id="benefits-title"
            eyebrow="Benefits"
            title={`Why El Paso homeowners choose our ${lower}`}
            titleClassName="text-[clamp(2.2rem,5vw,4rem)]"
            className="mb-12 max-w-4xl"
          />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {service.benefits.map((b, i) => (
              <Reveal as="li" key={b.title} delay={i * 0.08} className={`border-hard flex h-full flex-col gap-3 rounded-[1.75rem] p-7 text-ink shadow-hard ${benefitColors[i % benefitColors.length]}`}>
                <span className="font-display text-4xl font-extrabold text-ink/20">0{i + 1}</span>
                <h3 className="text-2xl font-extrabold">{b.title}</h3>
                <p className="text-charcoal">{b.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <HowItWorks steps={service.process} title={["How our", `${lower} works.`]} sub={`From your free quote to a cleaner yard: here's what to expect from Paw N Scoop's ${lower} service.`} />

      {/* Renders only when real before/after photos exist for this service */}
      <BeforeAfter category={service.galleryCategory} title={["Real results,", "real El Paso yards."]} />

      {/* Service FAQs */}
      <Section theme="black" aria-labelledby="svc-faq-title" className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col items-start gap-6">
            <SectionHeading id="svc-faq-title" eyebrow="FAQ" title={`${service.name} questions`} titleClassName="text-[clamp(2.2rem,5vw,4rem)]" />
            <Link href="/faq" className="group flex items-center gap-2 font-display text-lg font-bold underline decoration-sun decoration-[3px] underline-offset-[6px]">
              All FAQs <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <Accordion items={service.faqs} />
        </div>
      </Section>

      {/* Areas served */}
      <Section theme="white" aria-labelledby="svc-areas-title" className="py-24 md:py-32">
        <div className="container-x flex flex-col gap-8">
          <SectionHeading
            id="svc-areas-title"
            eyebrow="Areas served"
            title={`${service.name} across El Paso County`}
            sub={`We provide ${lower} in El Paso, TX and surrounding areas throughout El Paso County.`}
            titleClassName="text-[clamp(2.2rem,5vw,4rem)]"
          />
          <ul className="flex flex-wrap gap-3">
            {locations.map((l) => (
              <li key={l.slug}>
                <Link
                  href={`/locations#${l.slug}`}
                  className="border-hard flex items-center gap-2 rounded-full bg-white px-4 py-2 font-semibold text-ink transition-colors hover:bg-sun"
                >
                  <MapPin className="size-4" aria-hidden /> {l.city}
                </Link>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-4">
            <QuoteButton size="lg" magnetic>
              Get My Free Quote
            </QuoteButton>
            <Link href="/locations" className="font-display text-lg font-bold underline decoration-tangerine decoration-[3px] underline-offset-[6px]">
              See all service areas
            </Link>
          </div>
        </div>
      </Section>

      <ReviewsSection />

      {/* Other services */}
      <Section theme="white" aria-labelledby="other-title" className="pb-24 md:pb-32">
        <div className="container-x">
          <h2 id="other-title" className="mb-8 text-4xl font-extrabold md:text-5xl">
            More ways we can help
          </h2>
          <ServicesGrid exclude={service.slug} />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
