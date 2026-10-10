"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { stats, story } from "@/lib/content";

export function Story() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: "[data-story-media]", start: "top 85%", end: "center 45%", scrub: 0.8 },
        });
        tl.fromTo("[data-story-clip]", { clipPath: "inset(18% 22% 18% 22% round 48px)" }, { clipPath: "inset(0% 0% 0% 0% round 32px)", ease: "none" }, 0).fromTo(
          "[data-story-img]",
          { scale: 1.35 },
          { scale: 1, ease: "none" },
          0,
        );
      });
    },
    { scope: ref },
  );

  return (
    <Section theme="yellow" ref={ref} aria-labelledby="story-title" className="overflow-hidden py-24 md:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div data-story-media className="relative order-2 mx-auto w-full max-w-xl pt-24 lg:order-1">
          {/* mascot peeking over the top edge */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-[calc(6rem+22px)] justify-end overflow-hidden pr-8" aria-hidden>
            <motion.div
              initial={{ y: "100%" }}
              whileInView={{ y: "4%" }}
              viewport={{ once: false, amount: 0.9 }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: 0.3 }}
              className="self-end"
            >
              <Mascot pose="peeking" className="h-32 w-auto" title="" aria-hidden />
            </motion.div>
          </div>

          <div data-story-clip className="border-hard relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-white shadow-hard-lg">
            <div data-story-img className="absolute inset-0">
              <Image src={story.image.src} alt={story.image.alt} fill sizes="(min-width: 1024px) 40vw, 90vw" className="object-cover" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -12 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.4 }}
            className="border-hard absolute -bottom-6 -left-2 z-10 rounded-3xl bg-ink px-6 py-4 text-white shadow-hard-sm sm:-left-6"
          >
            <p className="font-display text-4xl font-extrabold text-sun">{stats.rating.toFixed(1)} ★</p>
            <p className="text-sm font-semibold">{stats.reviewCount} Google reviews</p>
          </motion.div>
        </div>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading id="story-title" eyebrow={story.eyebrow} title={story.title} />
          <div className="flex flex-col gap-5">
            {story.body.map((p, i) => (
              <Reveal key={i} delay={0.1 * i} className="text-lg md:text-xl">
                {p}
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3}>
            <Button href="/about" variant="dark" size="lg" magnetic icon={<ArrowRight className="size-5" aria-hidden />}>
              Learn More About Us
            </Button>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
