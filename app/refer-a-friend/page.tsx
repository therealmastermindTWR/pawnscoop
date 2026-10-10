import type { Metadata } from "next";
import { Gift, Phone } from "lucide-react";
import { FinalCta } from "@/components/home/FinalCta";
import { HowItWorks } from "@/components/home/HowItWorks";
import { PageHero } from "@/components/pages/PageHero";
import { ShareLink } from "@/components/pages/ShareLink";
import { PawIcon } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { referral, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Refer a Friend & Earn Rewards",
  description:
    "Refer friends to Paw N Scoop in El Paso and earn rewards: $25 off for your first referral, bigger rewards at 3, 5, 7 and 10, and free scoops for life at 25.",
  alternates: { canonical: "/refer-a-friend" },
};

export default function ReferPage() {
  return (
    <>
      <PageHero eyebrow="Refer a friend" title={["Refer friends.", "Earn rewards."]} sub={referral.intro} pose="celebrating" breadcrumb="Refer a Friend">
        <ShareLink />
      </PageHero>

      <Section theme="white" aria-labelledby="rewards-title" className="py-24 md:py-32">
        <div className="container-x">
          <SectionHeading id="rewards-title" eyebrow="Rewards" title={["The more you refer,", "the more you save."]} className="mb-12" />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {referral.tiers.map((t, i) => {
              const top = i === referral.tiers.length - 1;
              return (
                <Reveal
                  as="li"
                  key={t.count}
                  delay={i * 0.06}
                  className={cn("border-hard flex items-center gap-5 rounded-[1.75rem] p-6 shadow-hard", top ? "bg-ink text-white" : i % 2 ? "bg-sun-100 text-ink" : "bg-sun text-ink")}
                >
                  <span className={cn("border-hard grid size-20 shrink-0 place-items-center rounded-full font-display leading-none font-extrabold", top ? "bg-sun text-ink" : "bg-white text-ink")}>
                    <span className="text-center">
                      <span className="block text-3xl">{t.count}</span>
                      <span className="block text-[0.65rem] tracking-widest uppercase">{t.count === 1 ? "referral" : "referrals"}</span>
                    </span>
                  </span>
                  <span className="font-display text-2xl leading-tight font-extrabold">{t.reward}</span>
                </Reveal>
              );
            })}
          </ol>
          <Reveal className="border-hard mt-6 flex items-start gap-3 rounded-[1.5rem] bg-tangerine-100 p-5 text-ink">
            <Gift className="mt-0.5 size-6 shrink-0" aria-hidden />
            <p className="text-lg font-semibold">{referral.between}</p>
          </Reveal>
        </div>
      </Section>

      <HowItWorks steps={referral.steps} title={["How referrals", "work."]} sub="Three easy steps from sharing to saving." />

      <Section theme="black" aria-labelledby="rules-title" className="py-24 md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="flex flex-col items-start gap-6">
            <SectionHeading id="rules-title" eyebrow="The fine print" title={["Referral", "rules"]} />
            <p className="text-white/75">
              Want to tell us about a referral ahead of time? Call or text{" "}
              <a href={site.phoneHref} className="font-bold text-sun underline underline-offset-4">
                {site.phone}
              </a>{" "}
              or email{" "}
              <a href={`mailto:${site.email}`} className="font-bold break-all text-sun underline underline-offset-4">
                {site.email}
              </a>
              .
            </p>
            <a href={site.phoneHref} className="border-hard inline-flex h-12 items-center gap-2 rounded-full bg-sun px-6 font-display font-bold text-ink">
              <Phone className="size-5" aria-hidden /> Tell us about a referral
            </a>
          </div>
          <ul className="flex flex-col gap-4">
            {referral.rules.map((r) => (
              <li key={r} className="flex items-start gap-3 rounded-[1.25rem] border-2 border-white/15 bg-ink-800 p-5 text-white">
                <PawIcon className="mt-1 size-5 shrink-0 text-sun" />
                <span className="text-lg">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FinalCta title="Know someone who needs a clean yard?" body="Send them our way. They can request a free quote online in a couple of minutes, and just mention your name." />
    </>
  );
}
