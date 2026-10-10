import type { Metadata } from "next";
import { FinalCta } from "@/components/home/FinalCta";
import { PageHero } from "@/components/pages/PageHero";
import { SimpleForm } from "@/components/pages/SimpleForm";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { referral } from "@/lib/content";

export const metadata: Metadata = {
  title: "Refer a Friend",
  description: referral.body,
  alternates: { canonical: "/refer-a-friend" },
};

export default function ReferPage() {
  return (
    <>
      <PageHero eyebrow="Refer a friend" title={[referral.title]} sub={referral.body} pose="celebrating" breadcrumb="Refer a Friend" />

      <Section theme="black" aria-labelledby="ref-how" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading id="ref-how" eyebrow="How it works" title="Three steps to free scoops." className="mb-14" />
          <ol className="grid gap-5 md:grid-cols-3">
            {referral.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.1} className="flex flex-col gap-3 rounded-[1.75rem] border-2 border-white/15 bg-ink-800 p-8">
                <span className="grid size-14 place-items-center rounded-full bg-sun font-display text-2xl font-extrabold text-ink">{i + 1}</span>
                <h3 className="text-3xl font-extrabold text-white">{s.title}</h3>
                <p className="text-white/75">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section theme="yellow" aria-labelledby="ref-form" className="py-24 md:py-32">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading id="ref-form" eyebrow="Send a referral" title={["Know a pup", "parent?"]} sub="Drop their details and we'll reach out with a friendly (never pushy) intro, plus their free first cleanup." />
          <SimpleForm
            kind="referral"
            submitLabel="Send referral"
            success="Referral sent! Thanks for spreading the scoop."
            fields={[
              { name: "yourName", label: "Your name", required: true, autoComplete: "name", half: true },
              { name: "yourEmail", label: "Your email", type: "email", required: true, autoComplete: "email", half: true },
              { name: "friendName", label: "Friend's name", required: true, half: true },
              { name: "friendContact", label: "Friend's email or phone", required: true, half: true },
              { name: "note", label: "Anything we should know?", type: "textarea" },
            ]}
          />
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
