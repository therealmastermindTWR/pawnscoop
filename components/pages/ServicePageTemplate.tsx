import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Marquee } from "@/components/home/Marquee";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs, marqueeWords, services, type Service } from "@/lib/content";
import { PageHero } from "./PageHero";

export function ServicePageTemplate({ service }: { service: Service }) {
  const others = services.filter((s) => s.slug !== service.slug);
  const related = faqs.filter((f) => f.category !== "Account").slice(0, 5);

  return (
    <>
      <PageHero eyebrow={`${service.name} service`} title={[service.headline]} sub={service.intro} pose={service.mascot} breadcrumb={service.name}>
        <div className="flex flex-wrap items-center gap-4">
          <QuoteButton variant="dark" size="lg" magnetic>
            Get Free Quote
          </QuoteButton>
          <span className="border-hard rounded-full bg-white px-4 py-2 font-display font-bold text-ink">{service.priceNote}</span>
        </div>
      </PageHero>

      <Marquee words={[service.name, ...marqueeWords]} baseVelocity={-1.6} />

      <Section theme="white" aria-labelledby="included-title" className="py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col gap-8">
            <SectionHeading id="included-title" eyebrow="What's included" title={["Everything,", "handled."]} />
            <ul className="flex flex-col gap-4">
              {service.bullets.map((b, i) => (
                <Reveal as="li" key={b} delay={i * 0.06} className="flex items-start gap-3 text-lg font-medium">
                  <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-sun text-ink">
                    <Check className="size-4" strokeWidth={3} aria-hidden />
                  </span>
                  {b}
                </Reveal>
              ))}
            </ul>
          </div>
          <ul className="grid gap-5 sm:grid-cols-2">
            {service.features.map((f, i) => (
              <Reveal
                as="li"
                key={f.title}
                delay={i * 0.08}
                className={`border-hard flex h-full flex-col gap-3 rounded-[1.75rem] p-7 text-ink shadow-hard ${i % 3 === 0 ? "bg-sun" : i % 3 === 1 ? "bg-white" : "bg-sun-100"}`}
              >
                <span className="font-display text-5xl font-extrabold text-ink/20">0{i + 1}</span>
                <h3 className="text-2xl font-extrabold">{f.title}</h3>
                <p className="text-charcoal">{f.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <BeforeAfter />

      <HowItWorks />

      <Section theme="black" aria-labelledby="svc-faq-title" className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col items-start gap-6">
            <SectionHeading id="svc-faq-title" eyebrow="Good questions" title={["Before you", "ask…"]} />
            <Link href="/faq" className="group flex items-center gap-2 font-display text-lg font-bold underline decoration-sun decoration-[3px] underline-offset-[6px]">
              All FAQs <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </div>
          <Accordion items={related} />
        </div>
      </Section>

      <ReviewsSection />

      <Section theme="white" aria-labelledby="other-title" className="pb-24 md:pb-32">
        <div className="container-x">
          <h2 id="other-title" className="mb-8 text-4xl font-extrabold md:text-5xl">
            Explore other services
          </h2>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="border-hard group flex items-center justify-between gap-6 rounded-[1.75rem] bg-white p-7 text-ink shadow-hard-sm transition-all hover:-translate-y-1 hover:bg-sun hover:shadow-hard"
              >
                <span>
                  <span className="block font-display text-3xl font-extrabold">{s.name}</span>
                  <span className="text-charcoal">{s.short}</span>
                </span>
                <span className="grid size-12 shrink-0 place-items-center rounded-full border-2 border-ink transition-transform group-hover:-rotate-45">
                  <ArrowRight className="size-5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
