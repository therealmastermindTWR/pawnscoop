import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/pages/PageHero";
import { Accordion } from "@/components/ui/Accordion";
import { Section } from "@/components/ui/Section";
import { faqs, type Faq } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers to common questions about Paw N Scoop pet waste removal: pricing, safety, contracts, scheduling, disposal and more.",
  alternates: { canonical: "/faq" },
};

const categories: Faq["category"][] = ["Pricing", "Service", "Safety", "Account"];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="Frequently asked"
        title={["All the scoop,", "none of the poop."]}
        sub="Can't find what you're looking for? Call, text or email us. A real human (who loves dogs) will get back to you fast."
        pose="sniffing"
        breadcrumb="FAQ"
      />
      <Section theme="white" aria-label="Questions by topic" className="py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
          <nav aria-label="FAQ topics" className="lg:sticky lg:top-28 lg:self-start">
            <ul className="flex flex-wrap gap-2 lg:flex-col">
              {categories.map((c) => (
                <li key={c}>
                  <a href={`#faq-${c.toLowerCase()}`} className="border-hard inline-block rounded-full bg-white px-4 py-2 font-display font-bold text-ink transition-colors hover:bg-sun">
                    {c}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-16">
            {categories.map((c) => (
              <section key={c} id={`faq-${c.toLowerCase()}`} aria-labelledby={`faq-h-${c}`} className="scroll-mt-28">
                <h2 id={`faq-h-${c}`} className="mb-6 text-4xl font-extrabold md:text-5xl">
                  {c}
                </h2>
                <Accordion items={faqs.filter((f) => f.category === c)} defaultOpen={null} />
              </section>
            ))}
          </div>
        </div>
      </Section>
      <FinalCta title="Still curious? Get a quote." />
    </>
  );
}
