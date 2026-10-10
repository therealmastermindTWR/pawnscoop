"use client";

import { motion } from "motion/react";
import { Phone } from "lucide-react";
import { Mascot } from "@/components/mascot/Mascot";
import { BoneIcon, PawIcon } from "@/components/ui/Icons";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { finalCta, site } from "@/lib/content";

export function FinalCta({ title = finalCta.title, body = finalCta.body }: { title?: string; body?: string }) {
  return (
    <Section theme="yellow" aria-labelledby="cta-title" className="overflow-hidden py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <PawIcon className="absolute top-[12%] left-[6%] size-16 rotate-[-20deg] text-ink/10" />
        <BoneIcon className="absolute right-[8%] bottom-[14%] h-12 w-24 rotate-12 text-ink/10" />
        <PawIcon className="absolute right-[40%] bottom-[8%] size-10 rotate-12 text-ink/10" />
      </div>
      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div className="flex flex-col items-start gap-8">
          <SplitText as="h2" id="cta-title" lines={[title]} className="text-[clamp(3rem,9vw,8.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]" />
          <Reveal delay={0.2} className="max-w-xl text-xl font-medium md:text-2xl">
            {body}
          </Reveal>
          <Reveal delay={0.3} className="flex flex-wrap items-center gap-4">
            <QuoteButton variant="dark" size="lg" magnetic>
              Get My Free Quote
            </QuoteButton>
            <a href={site.phoneHref} className="flex items-center gap-2 font-display text-lg font-bold underline decoration-[3px] underline-offset-[6px] hover:decoration-tangerine">
              <Phone className="size-5" aria-hidden /> {site.phone}
            </a>
          </Reveal>
        </div>
        <motion.div
          className="relative mx-auto w-full max-w-md"
          initial={{ y: 80, rotate: 6, opacity: 0 }}
          whileInView={{ y: 0, rotate: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 100, damping: 14 }}
        >
          <div className="animate-blob absolute inset-[6%] bg-white" aria-hidden />
          <Mascot pose="laptop" className="relative h-auto w-full" />
        </motion.div>
      </div>
    </Section>
  );
}
