import type { Metadata } from "next";
import Image from "next/image";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { FinalCta } from "@/components/home/FinalCta";
import { CustomerPromise } from "@/components/home/Promise";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Stats } from "@/components/home/Stats";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, transformations } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us: Locally Owned Yard Care in El Paso, TX",
  description:
    "Paw N Scoop is a locally owned El Paso outdoor cleaning and yard care company offering poop scooping, turf cleaning, lawn care, yard cleanups and deodorizing.",
  alternates: { canonical: "/about" },
};

const photo = transformations[0]?.after;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Paw N Scoop" title={["Locally owned.", "El Paso proud."]} sub={about.intro} pose="celebrating" breadcrumb="About" />

      <Section theme="white" aria-labelledby="mission-title" className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          {photo && (
            <Reveal className="border-hard relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-hard-lg">
              <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
            </Reveal>
          )}
          <div className="flex flex-col gap-6">
            <SectionHeading id="mission-title" eyebrow="Our mission" title={["Cleaner yards.", "Happier homes."]} />
            {about.body.map((p) => (
              <Reveal key={p} className="text-muted text-lg md:text-xl">
                {p}
              </Reveal>
            ))}
          </div>
        </div>
      </Section>

      <Section theme="black" aria-labelledby="values-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading id="values-title" eyebrow="What we stand for" title={["Values we", "won't scoop on."]} className="mb-14" />
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {about.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 0.08} className="flex flex-col gap-3 rounded-[1.75rem] border-2 border-white/15 bg-ink-800 p-7">
                <span className="font-display text-5xl font-extrabold text-sun">0{i + 1}</span>
                <h3 className="text-2xl font-extrabold text-white">{v.title}</h3>
                <p className="text-white/75">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <CustomerPromise />

      <Section theme="white" aria-labelledby="about-services-title" className="pb-24 md:pb-32">
        <div className="container-x">
          <h2 id="about-services-title" className="mb-10 text-4xl font-extrabold md:text-6xl">
            What we do
          </h2>
          <ServicesGrid />
        </div>
      </Section>

      <Stats />
      <BeforeAfter />
      <FinalCta />
    </>
  );
}
