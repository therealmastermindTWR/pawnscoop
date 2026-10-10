"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from "motion/react";
import { Phone, Play } from "lucide-react";
import { useState, type PointerEvent } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { useIntro } from "@/components/providers/IntroProvider";
import { BoneIcon, PawIcon } from "@/components/ui/Icons";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { Stars } from "@/components/ui/Stars";
import { VideoLightbox } from "@/components/ui/VideoLightbox";
import { hero, site, stats } from "@/lib/content";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

// Decorative paws & bones: position (%), size (px), rotation, parallax depth.
const DECOR = [
  { t: "paw", x: 6, y: 18, s: 34, r: -20, d: 1.4 },
  { t: "bone", x: 44, y: 8, s: 46, r: 18, d: 0.8 },
  { t: "paw", x: 52, y: 86, s: 28, r: 30, d: 1.8 },
  { t: "bone", x: 3, y: 78, s: 52, r: -32, d: 1.1 },
  { t: "paw", x: 92, y: 12, s: 40, r: 12, d: 0.6 },
  { t: "paw", x: 88, y: 88, s: 30, r: -10, d: 1.6 },
  { t: "bone", x: 30, y: 94, s: 38, r: 8, d: 1.3 },
] as const;

function Decor({ item, mx, my, i }: { item: (typeof DECOR)[number]; mx: MotionValue<number>; my: MotionValue<number>; i: number }) {
  const x = useTransform(mx, (v) => v * -60 * item.d);
  const y = useTransform(my, (v) => v * -60 * item.d);
  const Icon = item.t === "paw" ? PawIcon : BoneIcon;
  return (
    <motion.div className="pointer-events-auto absolute" style={{ left: `${item.x}%`, top: `${item.y}%`, x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 + i * 0.08, type: "spring", stiffness: 260, damping: 14 }}
        whileHover={{ scale: 1.4, rotate: item.r + 40 }}
        style={{ rotate: item.r }}
        className={cn("animate-float", i % 2 ? "text-tangerine" : "text-sun-600")}
      >
        <Icon style={{ width: item.s, height: item.t === "bone" ? item.s / 2 : item.s, animationDelay: `${i * -0.7}s` }} />
      </motion.div>
    </motion.div>
  );
}

/** Primary hero CTA: opens the Jobber request form, with a call option alongside. */
function BookingCta() {
  return (
    <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">
      <QuoteButton size="lg" magnetic className="h-16 w-full px-8 text-xl shadow-hard sm:w-auto">
        Book My Free Quote
      </QuoteButton>
      <a
        href={site.phoneHref}
        className="group flex h-16 items-center justify-center gap-2 rounded-full border-[2.5px] border-ink bg-white px-6 font-display text-lg font-bold text-ink transition-colors hover:bg-sun"
      >
        <Phone className="size-5" aria-hidden />
        <span>
          or call <span className="underline decoration-tangerine decoration-[3px] underline-offset-4">{site.phone}</span>
        </span>
      </a>
    </div>
  );
}

export function Hero() {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  const [video, setVideo] = useState(false);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smx = useSpring(mx, { stiffness: 60, damping: 18 });
  const smy = useSpring(my, { stiffness: 60, damping: 18 });
  const mascotX = useTransform(smx, (v) => v * 36);
  const mascotY = useTransform(smy, (v) => v * 24);
  const mascotR = useTransform(smx, (v) => v * 4);
  const blobX = useTransform(smx, (v) => v * -24);
  const blobY = useTransform(smy, (v) => v * -24);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const show = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 24 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.8, ease: EASE, delay },
  });

  return (
    <Section theme="white" aria-labelledby="hero-title" className="overflow-hidden" onPointerMove={onMove}>
      {/* background blobs */}
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: blobX, y: blobY }}>
        <div className="animate-blob absolute -top-[10%] -right-[18%] aspect-square w-[min(110vw,860px)] bg-sun lg:-right-[6%]" />
        <div className="animate-blob absolute -bottom-[22%] -left-[14%] aspect-square w-[min(60vw,420px)] bg-sun-100 [animation-delay:-5s]" />
        <div className="animate-blob absolute top-[58%] right-[42%] hidden aspect-square w-40 bg-tangerine/25 [animation-delay:-9s] lg:block" />
      </motion.div>

      {/* cursor-reactive decor */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden md:block">
        {DECOR.map((d, i) => (
          <Decor key={i} item={d} mx={smx} my={smy} i={i} />
        ))}
      </div>

      <div className="container-x relative grid items-center gap-6 pt-8 pb-16 sm:pt-12 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-[1.1fr_1fr] lg:gap-4 lg:pt-6 lg:pb-20">
        <div className="relative z-10 flex flex-col items-start gap-7">
          <motion.div {...show(0.05)} className="border-hard flex items-center gap-3 rounded-full bg-white py-1.5 pr-4 pl-1.5 shadow-hard-sm">
            <span className="flex -space-x-2" aria-hidden>
              {["bg-sun", "bg-tangerine", "bg-ink"].map((c, i) => (
                <span key={i} className={cn("grid size-8 place-items-center rounded-full border-2 border-white", c)}>
                  <PawIcon className={cn("size-4", c === "bg-ink" ? "text-sun" : "text-ink")} />
                </span>
              ))}
            </span>
            <span className="flex flex-col leading-tight">
              <Stars rating={5} size="size-3.5" className="text-ink" />
              <span className="text-sm font-semibold text-ink">
                Rated <strong>{stats.rating.toFixed(1)}</strong> on Google · {stats.reviewCount} reviews
              </span>
            </span>
          </motion.div>

          <div className="relative">
            <SplitText
              as="h1"
              id="hero-title"
              mode="chars"
              trigger="manual"
              play={ready}
              delay={0.1}
              lines={hero.headlineLines}
              className="text-[clamp(3.7rem,15vw,8rem)] leading-[0.86] font-extrabold tracking-[-0.055em] text-ink lg:text-[clamp(5rem,8.4vw,9.5rem)]"
            />
            {/* hand-drawn underline under line 2 */}
            <svg aria-hidden viewBox="0 0 420 40" className="absolute -bottom-[0.06em] left-[0.04em] h-[0.18em] w-[min(66%,5.2em)] text-[clamp(3.7rem,15vw,8rem)] lg:text-[clamp(5rem,8.4vw,9.5rem)]" preserveAspectRatio="none">
              <motion.path
                d="M4 26 C 80 6, 160 34, 240 16 S 380 10, 416 22"
                fill="none"
                stroke="#FF9900"
                strokeWidth="9"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={ready ? { pathLength: 1 } : undefined}
                transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
              />
            </svg>
          </div>

          <motion.p {...show(0.5)} className="font-display text-xl font-extrabold tracking-tight text-ink md:text-2xl">
            <span className="marker">{site.tagline}</span>
          </motion.p>

          <motion.p {...show(0.6)} className="-mt-3 max-w-xl text-lg text-charcoal md:text-xl">
            {hero.sub}
          </motion.p>

          <motion.div {...show(0.7)} className="flex w-full flex-col items-start gap-4">
            <BookingCta />
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <button type="button" onClick={() => setVideo(true)} aria-haspopup="dialog" className="group flex items-center gap-3 font-display text-lg font-bold text-ink">
                <span className="relative grid size-12 place-items-center rounded-full border-[2.5px] border-ink bg-ink text-sun transition-transform group-hover:scale-110">
                  <span className="animate-pulse-ring absolute inset-0 rounded-full border-2 border-tangerine" aria-hidden />
                  <Play className="ml-0.5 size-5 fill-current" aria-hidden />
                </span>
                <span className="underline decoration-tangerine decoration-[3px] underline-offset-[6px] group-hover:decoration-ink">Watch how it works</span>
              </button>
              <span className="text-sm font-semibold text-charcoal">✓ No contracts &nbsp; ✓ First cleanup free</span>
            </div>
          </motion.div>
        </div>

        {/* mascot */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-[min(88vw,560px)] lg:max-w-none"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.8, rotate: reduce ? 0 : -6 }}
          animate={ready ? { opacity: 1, scale: 1, rotate: 0 } : undefined}
          transition={{ type: "spring", stiffness: 120, damping: 16, delay: 0.35 }}
        >
          <motion.div style={{ x: mascotX, y: mascotY, rotate: mascotR }} className="relative">
            <Mascot pose="waving" priority sizes="(min-width: 1024px) 36vw, 70vw" className="relative mx-auto block h-auto w-[72%]" />
            <motion.div
              className="border-hard absolute bottom-[6%] -left-[2%] rounded-2xl rounded-tr-none bg-white px-4 py-2.5 font-display text-base font-bold text-ink shadow-hard-sm sm:text-lg"
              initial={{ opacity: 0, scale: 0.5, rotate: -8 }}
              animate={ready ? { opacity: 1, scale: 1, rotate: -4 } : undefined}
              transition={{ type: "spring", stiffness: 300, damping: 14, delay: 1.2 }}
            >
              Woof! First scoop&apos;s free 🐾
            </motion.div>
            <motion.div
              className="border-hard absolute right-[2%] bottom-[12%] grid size-24 place-items-center rounded-full bg-tangerine text-center font-display leading-none font-extrabold text-ink shadow-hard-sm sm:size-28"
              initial={{ opacity: 0, scale: 0 }}
              animate={ready ? { opacity: 1, scale: 1, rotate: 10 } : undefined}
              transition={{ type: "spring", stiffness: 260, damping: 12, delay: 1.4 }}
            >
              <span>
                <span className="block text-xs tracking-widest uppercase">from</span>
                <span className="block text-3xl sm:text-4xl">{site.priceFrom}</span>
                <span className="block text-xs tracking-widest uppercase">/visit</span>
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <VideoLightbox open={video} onClose={() => setVideo(false)} />
    </Section>
  );
}
