import type { Metadata } from "next";
import Image from "next/image";
import { CustomerPromise } from "@/components/home/Promise";
import { FinalCta } from "@/components/home/FinalCta";
import { BeforeAfter } from "@/components/home/BeforeAfter";
import { Stats } from "@/components/home/Stats";
import { Mascot } from "@/components/mascot/Mascot";
import { PageHero } from "@/components/pages/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, story } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us",
  description: "Meet the dog-loving crew behind Paw N Scoop, a local pet waste removal company on a mission to give pet parents their yards back.",
  alternates: { canonical: "/about" },
};

const poses = ["waving", "scooper", "laptop"] as const;

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About Paw N Scoop" title={["Dog people,", "doing the dirty work."]} sub={story.body[0]} pose="celebrating" breadcrumb="About" />

      <Section theme="white" aria-labelledby="mission-title" className="py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="border-hard relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-hard-lg">
            <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width: 1024px) 45vw, 90vw" className="object-cover" />
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading id="mission-title" eyebrow="Our mission" title={["Clean yards.", "Happy homes."]} />
            {story.body.map((p) => (
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

      <Section theme="yellow" aria-labelledby="team-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading id="team-title" eyebrow="The pack" title="Meet the crew." sub="Placeholder team members. Swap in real names, roles and photos." className="mb-14" />
          <ul className="grid gap-6 md:grid-cols-3">
            {about.team.map((m, i) => (
              <Reveal as="li" key={i} delay={i * 0.1} className="border-hard flex flex-col items-center gap-4 rounded-[2rem] bg-white p-8 text-center text-ink shadow-hard">
                <div className="grid aspect-square w-40 place-items-center rounded-full border-hard bg-sun-100">
                  <Mascot pose={poses[i % poses.length]} className="h-32 w-auto" title={`Placeholder portrait for ${m.name}`} />
                </div>
                <h3 className="text-2xl font-extrabold">{m.name}</h3>
                <p className="font-semibold">{m.role}</p>
                <p className="text-sm text-charcoal">Dog parent to: {m.dog}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      <Stats />
      <BeforeAfter />
      <FinalCta />
    </>
  );
}
