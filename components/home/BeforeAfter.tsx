"use client";

import { animate, AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site, transformations, type Transformation, type TransformationCategory } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Before/after comparison slider. A transparent native range input covers the image, so
 * dragging (mouse or touch), clicking and arrow keys all work and it's screen-reader friendly.
 */
export function BeforeAfterSlider({ item, hint = true }: { item: Transformation; hint?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [pos, setPos] = useState(50);
  const touched = useRef(false);

  // One-time "peek" hint when the slider scrolls into view.
  useEffect(() => {
    if (!hint || !inView || reduce) return;
    const controls = animate(50, [50, 18, 82, 50], {
      duration: 2.4,
      ease: "easeInOut",
      onUpdate: (v) => {
        if (!touched.current) setPos(v);
      },
    });
    return () => controls.stop();
  }, [hint, inView, reduce]);

  return (
    <figure className="flex flex-col gap-3">
      <div ref={ref} className="border-hard relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-ink shadow-hard-lg select-none">
        {/* after = base layer */}
        <Image src={item.after.src} alt={item.after.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
        {/* before = clipped top layer (left side) */}
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={item.before.src} alt={item.before.alt} fill sizes="(min-width: 1024px) 40vw, 92vw" className="object-cover" />
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
          aria-label={`Compare before and after: ${item.title}`}
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
      <figcaption className="flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold">{item.title}</span>
        <span className="rounded-full bg-sun px-2.5 py-0.5 text-xs font-bold text-ink">{item.category}</span>
      </figcaption>
    </figure>
  );
}

type Props = {
  /** Only show transformations for this category (used on service pages). */
  category?: TransformationCategory;
  title?: string[];
};

/**
 * Before & After transformations gallery. Renders nothing if there are no real photos
 * for the requested category, so visitors never see empty placeholders.
 */
export function BeforeAfter({ category, title = ["See the", "Paw N Scoop difference."] }: Props) {
  const pool = useMemo(() => (category ? transformations.filter((t) => t.category === category) : transformations), [category]);
  const categories = useMemo(() => Array.from(new Set(pool.map((t) => t.category))), [pool]);
  const [active, setActive] = useState<TransformationCategory | "All">("All");
  if (!pool.length) return null;

  const shown = active === "All" ? pool : pool.filter((t) => t.category === active);
  const single = shown.length === 1;

  return (
    <Section theme="black" id="before-after" aria-labelledby="ba-title" className="overflow-hidden py-24 md:py-36">
      <div className="container-x">
        <div className={cn("grid items-center gap-12 lg:gap-20", single && "lg:grid-cols-[1fr_1.1fr]")}>
          <div className="flex flex-col items-start gap-7">
            <SectionHeading
              id="ba-title"
              eyebrow="Before & after"
              title={title}
              sub="Real yards we've cleaned in El Paso. Drag the slider to compare."
            />
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter transformations by service">
                {(["All", ...categories] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={active === c}
                    onClick={() => setActive(c)}
                    className={cn(
                      "rounded-full border-2 px-4 py-2 font-display text-sm font-bold transition-colors",
                      active === c ? "border-sun bg-sun text-ink" : "border-white/30 text-white hover:border-sun",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            )}
            <Reveal delay={0.2}>
              <p className="font-display text-2xl font-extrabold text-sun md:text-3xl">{site.tagline}</p>
            </Reveal>
            <Reveal delay={0.3}>
              <QuoteButton size="lg" magnetic>
                Get This Yard
              </QuoteButton>
            </Reveal>
          </div>

          <AnimatePresence mode="popLayout">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(single ? "mx-auto w-full max-w-xl" : "grid gap-6 sm:grid-cols-2 lg:col-span-full lg:grid-cols-3")}
            >
              {shown.map((t) => (
                <BeforeAfterSlider key={t.title} item={t} hint={single} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Section>
  );
}
