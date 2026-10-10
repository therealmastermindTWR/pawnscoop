import type { Metadata } from "next";
import Link from "next/link";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { PageHero } from "@/components/pages/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Section } from "@/components/ui/Section";
import { serviceHref, services, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Outdoor Cleaning & Yard Care Services in El Paso, TX",
  description:
    "Five outdoor services in El Paso, TX: dog poop scooping, artificial turf cleaning, lawn care, yard cleanups, and disinfecting & deodorizing.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Paw N Scoop services",
          itemListElement: services.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.name, url: `${site.url}${serviceHref(s.slug)}` })),
        }}
      />
      <PageHero
        eyebrow="Our services"
        title={["Complete yard care,", "one local crew."]}
        sub="From dog poop scooping and artificial turf cleaning to lawn care, yard cleanups and deodorizing, Paw N Scoop keeps El Paso yards clean, fresh and ready to enjoy."
        pose="waving"
        breadcrumb="Services"
      >
        <QuoteButton variant="dark" size="lg" magnetic>
          Get My Free Quote
        </QuoteButton>
      </PageHero>

      <Section theme="white" aria-labelledby="all-services-title" className="py-24 md:py-32">
        <div className="container-x">
          <h2 id="all-services-title" className="mb-4 text-4xl font-extrabold md:text-6xl">
            Choose a service
          </h2>
          <p className="text-muted mb-12 max-w-2xl text-lg md:text-xl">
            Need more than one? Select as many services as you like in a single quote request. Managing an apartment community, HOA or business?{" "}
            <Link href="/commercial" className="font-bold text-ink underline decoration-tangerine decoration-2 underline-offset-4">
              See commercial services
            </Link>
            .
          </p>
          <ServicesGrid />
        </div>
      </Section>

      <WhyChooseUs />
      <BeforeAfter />
      <HowItWorks />
      <FinalCta />
    </>
  );
}
