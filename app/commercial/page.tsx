import type { Metadata } from "next";
import { Building2, House, Store } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { PageHero } from "@/components/pages/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commercial, locations, site } from "@/lib/content";

export const metadata: Metadata = {
  title: commercial.seo.title,
  description: commercial.seo.description,
  alternates: { canonical: "/commercial" },
};

const audienceIcons = [Building2, House, Store];

export default function CommercialPage() {
  const url = `${site.url}/commercial`;
  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": `${url}#service`,
            name: "Commercial yard care & pet waste removal",
            serviceType: "Commercial outdoor cleaning and yard care",
            description: commercial.seo.description,
            url,
            provider: { "@id": `${site.url}/#business` },
            audience: { "@type": "BusinessAudience", audienceType: "Apartment communities, HOAs and businesses" },
            areaServed: [
              { "@type": "AdministrativeArea", name: "El Paso County, TX" },
              ...locations.map((l) => ({ "@type": "Place", name: `${l.city}, ${l.region}` })),
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: commercial.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />
      <PageHero
        eyebrow="Commercial"
        title={[commercial.h1]}
        sub={commercial.intro}
        pose="waving"
        breadcrumb="Commercial"
        titleClassName="text-[clamp(2.6rem,7vw,5.75rem)]"
      >
        <QuoteButton variant="dark" size="lg" magnetic>
          Get a Commercial Quote
        </QuoteButton>
      </PageHero>

      <Section theme="white" aria-labelledby="who-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading id="who-title" eyebrow="Who we serve" title={["Clean shared spaces", "for every property."]} className="mb-12" />
          <ul className="grid gap-5 md:grid-cols-3">
            {commercial.audiences.map((a, i) => {
              const Icon = audienceIcons[i % audienceIcons.length];
              return (
                <Reveal as="li" key={a.title} delay={i * 0.08} className="border-hard flex h-full flex-col gap-4 rounded-[1.75rem] bg-sun-100 p-7 text-ink shadow-hard">
                  <span className="border-hard grid size-14 place-items-center rounded-2xl bg-sun">
                    <Icon className="size-7" strokeWidth={2.2} aria-hidden />
                  </span>
                  <h3 className="text-2xl font-extrabold md:text-3xl">{a.title}</h3>
                  <p className="text-charcoal">{a.body}</p>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Section>

      <Section theme="yellow" aria-labelledby="commercial-services-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading
            id="commercial-services-title"
            eyebrow="Services for commercial properties"
            title={["All five services,", "built for bigger spaces."]}
            sub="Combine as many as your property needs in a single quote request."
            className="mb-12"
          />
          <ServicesGrid />
        </div>
      </Section>

      <HowItWorks steps={commercial.process} title={["How commercial", "service works."]} sub="A simple process from quote to clean, tailored to your property." />

      <Section theme="black" aria-labelledby="commercial-faq-title" className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="commercial-faq-title" eyebrow="FAQ" title={["Commercial", "questions"]} titleClassName="text-[clamp(2.2rem,5vw,4rem)]" />
          <Accordion items={commercial.faqs} />
        </div>
      </Section>

      <FinalCta title="Let's talk about your property." body="Request a free commercial quote online or give us a call." />
    </>
  );
}
