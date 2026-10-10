import type { Metadata } from "next";
import Link from "next/link";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/pages/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/ui/JsonLd";
import { Section } from "@/components/ui/Section";
import { faqs, serviceHref, services } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQs: Poop Scooping, Turf & Yard Care in El Paso",
  description:
    "Answers about poop scooping plans and pricing, artificial turf cleaning, lawn care, yard cleanups, deodorizing, scheduling and service areas in El Paso, TX.",
  alternates: { canonical: "/faq" },
};

const sections = [
  { id: "general", title: "General", items: faqs },
  ...services.map((s) => ({ id: s.slug, title: s.name, items: s.faqs, href: serviceHref(s.slug) })),
];

export default function FaqPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: sections.flatMap((s) => s.items).map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <PageHero
        eyebrow="Frequently asked"
        title={["All the scoop,", "none of the poop."]}
        sub="Can't find what you're looking for? Call, text or email us. A real human (who loves dogs) will get back to you."
        pose="sniffing"
        breadcrumb="FAQ"
      />
      <Section theme="white" aria-label="Questions by topic" className="py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {sections.map((s) => (
                <li key={s.id}>
                  <a href={`#faq-${s.id}`} className="border-hard inline-block rounded-full bg-white px-4 py-2 font-display font-bold text-ink transition-colors hover:bg-sun">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-16">
            {sections.map((s) => (
              <section key={s.id} id={`faq-${s.id}`} aria-labelledby={`faq-h-${s.id}`} className="scroll-mt-28">
                <div className="mb-6 flex flex-wrap items-baseline justify-between gap-3">
                  <h2 id={`faq-h-${s.id}`} className="text-4xl font-extrabold md:text-5xl">
                    {s.title}
                  </h2>
                  {"href" in s && s.href && (
                    <Link href={s.href} className="font-display font-bold underline decoration-tangerine decoration-[3px] underline-offset-[6px]">
                      About this service →
                    </Link>
                  )}
                </div>
                <Accordion items={s.items} defaultOpen={null} />
              </section>
            ))}
          </div>
        </div>
      </Section>
      <FinalCta title="Still curious? Get a quote." />
    </>
  );
}
