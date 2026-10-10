"use client";

import { animate, motion, useAnimationFrame, useMotionValue, useReducedMotion } from "motion/react";
import { ArrowUpRight, CalendarCheck, ChevronLeft, ChevronRight, Clock, Heart, MessageSquareText, Quote, Tag, Trophy, type LucideIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import { reviewHighlights } from "@/lib/content";
import type { GoogleReview } from "@/lib/google-reviews";
import { cn } from "@/lib/utils";

const cardColors = ["bg-white", "bg-sun-100", "bg-white", "bg-tangerine-100"];
const highlightIcons: Record<string, LucideIcon> = { clock: Clock, message: MessageSquareText, heart: Heart, tag: Tag, calendar: CalendarCheck, trophy: Trophy };

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden>
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}

function ReviewCard({ r, i, hidden }: { r: GoogleReview; i: number; hidden?: boolean }) {
  return (
    <figure
      aria-hidden={hidden}
      className={cn(
        "border-hard relative flex w-[min(84vw,400px)] shrink-0 flex-col gap-5 rounded-[1.75rem] p-7 text-ink shadow-hard select-none",
        cardColors[i % cardColors.length],
      )}
    >
      <div className="flex items-center justify-between">
        <Stars rating={r.rating} />
        <GoogleG className="size-6" />
      </div>
      <Quote className="absolute right-6 bottom-6 size-14 text-ink/10" aria-hidden />
      <blockquote className="line-clamp-6 font-display text-lg leading-snug font-semibold tracking-tight">&ldquo;{r.text}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center gap-3">
        {r.photo ? (
          <Image src={r.photo} alt="" width={44} height={44} className="size-11 rounded-full border-2 border-ink" referrerPolicy="no-referrer" />
        ) : (
          <span className="grid size-11 place-items-center rounded-full border-2 border-ink bg-sun font-display font-extrabold">{r.author[0]}</span>
        )}
        <span className="flex flex-col leading-tight">
          {r.authorUrl ? (
            <a href={r.authorUrl} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" tabIndex={hidden ? -1 : undefined}>
              {r.author}
            </a>
          ) : (
            <span className="font-bold">{r.author}</span>
          )}
          <span className="text-sm text-charcoal">{r.when} on Google</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Auto-scrolling, draggable, infinitely looping carousel of live Google reviews. */
function LiveCarousel({ reviews }: { reviews: GoogleReview[] }) {
  const reduce = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const [paused, setPaused] = useState(false);
  const drag = useRef<{ startX: number; startVal: number } | null>(null);
  const half = useRef(0);

  useEffect(() => {
    const measure = () => {
      const kids = trackRef.current?.children;
      if (kids && kids.length > reviews.length) {
        half.current = (kids[reviews.length] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [reviews.length]);

  const wrapX = (v: number) => {
    const h = half.current || 1;
    return ((((v % h) + h) % h) - h) % h;
  };

  useAnimationFrame((_, delta) => {
    if (reduce || paused || drag.current) return;
    x.set(wrapX(x.get() - (delta / 1000) * 45));
  });

  const onDown = (e: PointerEvent<HTMLDivElement>) => {
    drag.current = { startX: e.clientX, startVal: x.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current) x.set(wrapX(drag.current.startVal + e.clientX - drag.current.startX));
  };
  const onUp = () => {
    drag.current = null;
  };

  const step = (dir: 1 | -1) => {
    const card = trackRef.current?.firstElementChild as HTMLElement | null;
    const w = (card?.offsetWidth ?? 400) + 24;
    const from = x.get();
    setPaused(true);
    animate(from, from - dir * w, { type: "spring", stiffness: 200, damping: 28, onUpdate: (v) => x.set(wrapX(v)) });
  };

  return (
    <>
      <div className="container-x mb-6 hidden justify-end gap-2 sm:flex">
        <button type="button" onClick={() => step(-1)} aria-label="Previous reviews" className="border-hard grid size-12 place-items-center rounded-full bg-white text-ink hover:bg-sun">
          <ChevronLeft className="size-5" aria-hidden />
        </button>
        <button type="button" onClick={() => step(1)} aria-label="Next reviews" className="border-hard grid size-12 place-items-center rounded-full bg-white text-ink hover:bg-sun">
          <ChevronRight className="size-5" aria-hidden />
        </button>
      </div>
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer reviews from Google"
        className="cursor-grab touch-pan-y active:cursor-grabbing"
        onPointerEnter={(e) => e.pointerType === "mouse" && setPaused(true)}
        onPointerLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <motion.div ref={trackRef} style={{ x }} className="flex w-max gap-6 py-4 pl-4 sm:pl-6 lg:pl-10">
          {reviews.map((r, i) => (
            <ReviewCard key={`a-${i}`} r={r} i={i} />
          ))}
          {reviews.map((r, i) => (
            <ReviewCard key={`b-${i}`} r={r} i={i} hidden />
          ))}
        </motion.div>
      </div>
    </>
  );
}

/** Fallback when live reviews aren't configured: what customers say, summarized. */
function Highlights() {
  return (
    <motion.ul
      className="container-x grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {reviewHighlights.map((h, i) => {
        const Icon = highlightIcons[h.icon] ?? Heart;
        return (
          <motion.li
            key={h.title}
            variants={staggerChild}
            className={cn("border-hard flex flex-col gap-3 rounded-[1.75rem] p-7 text-ink shadow-hard", cardColors[i % cardColors.length])}
          >
            <div className="flex items-center justify-between">
              <span className="grid size-12 place-items-center rounded-2xl bg-sun">
                <Icon className="size-6" strokeWidth={2.2} aria-hidden />
              </span>
              <Stars rating={5} size="size-4" />
            </div>
            <h3 className="text-2xl font-extrabold">{h.title}</h3>
            <p className="text-charcoal">{h.body}</p>
          </motion.li>
        );
      })}
    </motion.ul>
  );
}

export function Reviews({ live, rating, count, googleUrl }: { live: GoogleReview[]; rating: number; count: number; googleUrl: string }) {
  const hasLive = live.length > 0;
  return (
    <Section theme="white" id="reviews" aria-labelledby="reviews-title" className="overflow-hidden py-24 md:py-36">
      <div className="container-x mb-12 flex flex-col justify-between gap-8 md:mb-14 lg:flex-row lg:items-end">
        <SectionHeading
          id="reviews-title"
          eyebrow="Google reviews"
          title={["Tails are wagging,", "owners are raving."]}
          sub={hasLive ? undefined : "Here's what El Paso pet parents mention most in their reviews."}
        />
        <Reveal className="flex flex-wrap items-center gap-4">
          <a
            href={googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="border-hard group flex items-center gap-4 rounded-[1.5rem] bg-sun px-5 py-4 text-ink shadow-hard transition-transform hover:-translate-y-1"
          >
            <GoogleG className="size-9 shrink-0" />
            <span className="font-display text-5xl leading-none font-extrabold">{rating.toFixed(1)}</span>
            <span className="flex flex-col gap-1">
              <Stars rating={rating} />
              <span className="flex items-center gap-1 text-sm font-semibold">
                {count} reviews on Google <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
              </span>
            </span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </Reveal>
      </div>

      {hasLive ? <LiveCarousel reviews={live} /> : <Highlights />}

      <Reveal className="container-x mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={googleUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-display text-lg font-bold underline decoration-tangerine decoration-[3px] underline-offset-[6px] hover:decoration-ink"
        >
          Read all {count} reviews on Google<span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Reveal>
    </Section>
  );
}
