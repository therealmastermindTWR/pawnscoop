"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { beforeAfter, site } from "@/lib/content";

/**
 * Before/after comparison slider. A transparent native range input covers the image, so
 * dragging (mouse or touch), clicking and arrow keys all work and it's screen-reader friendly.
 */
export function BeforeAfterSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(50);
  const touched = useRef(false);

  // One-time "peek" hint when the slider scrolls into view.
  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(50, [50, 18, 82, 50], {
      duration: 2.4,
      ease: "easeInOut",
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => controls.stop();
  }, [inView, reduce]);

  const { before, after } = beforeAfter;

  return (
    <div ref={ref} className="border-hard relative mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden rounded-[2rem] bg-ink shadow-hard-lg select-none">
      {/* after = base layer */}
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
      {/* before = clipped top layer (left side) */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
      </div>

      <span className="border-hard absolute top-4 left-4 rounded-full bg-ink px-3 py-1 font-display text-sm font-bold text-white" aria-hidden>
        Before
      </span>
      <span className="border-hard absolute top-4 right-4 rounded-full bg-sun px-3 py-1 font-display text-sm font-bold text-ink" aria-hidden>
        After
      </span>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={pos}
        onChange={(e) => {
          touched.current = true;
          setPos(Number(e.target.value));
        }}
        aria-label="Drag to compare the yard before and after a Paw N Scoop cleanup"
        aria-valuetext={`${Math.round(pos)}% before`}
        data-cursor="Drag"
        className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none opacity-0"
      />

      {/* divider + handle */}
      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-1 -translate-x-1/2 bg-white shadow-[0_0_0_2px_#111] peer-focus-visible:*:ring-4"
        style={{ left: `${pos}%` }}
        aria-hidden
      >
        <span className="border-hard absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-tangerine text-ink shadow-hard-sm ring-sun ring-offset-2 ring-offset-ink">
          <ChevronLeft className="size-5" strokeWidth={3} />
          <ChevronRight className="size-5" strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  return (
    <Section theme="black" aria-labelledby="ba-title" className="overflow-hidden py-24 md:py-36">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="flex flex-col items-start gap-7">
          <SectionHeading id="ba-title" eyebrow="Before & after" title={["See the", "scoop difference."]} sub={beforeAfter.caption} />
          <Reveal delay={0.2}>
            <p className="font-display text-2xl font-extrabold text-sun md:text-3xl">{site.tagline}</p>
          </Reveal>
          <Reveal delay={0.3}>
            <QuoteButton size="lg" magnetic>
              Get This Yard
            </QuoteButton>
          </Reveal>
        </div>
        <Reveal>
          <BeforeAfterSlider />
          <p className="mt-4 text-center text-sm text-white/70">← Drag to compare →</p>
        </Reveal>
      </div>
    </Section>
  );
}
