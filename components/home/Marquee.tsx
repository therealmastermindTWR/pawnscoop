"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { useRef } from "react";
import { PawIcon } from "@/components/ui/Icons";
import { marqueeWords } from "@/lib/content";
import { cn } from "@/lib/utils";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Infinite marquee whose speed (and direction) reacts to scroll velocity. */
export function Marquee({ baseVelocity = -2.2, className, words = marqueeWords }: { baseVelocity?: number; className?: string; words?: string[] }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = -1;
    else if (vf > 0) direction.current = 1;
    moveBy += direction.current * moveBy * vf;
    baseX.set(baseX.get() + moveBy);
  });

  const group = (
    <span className="flex shrink-0 items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="px-6 sm:px-10">{w}</span>
          <PawIcon className="size-[0.55em] shrink-0 text-tangerine" />
        </span>
      ))}
    </span>
  );

  return (
    <div className={cn("relative overflow-hidden border-y-[3px] border-ink bg-ink py-5 text-sun sm:py-7", className)} aria-label={words.join(", ")} role="marquee">
      <motion.div
        aria-hidden
        className="flex w-max font-display text-[clamp(2.4rem,7vw,6rem)] leading-none font-extrabold tracking-tight whitespace-nowrap uppercase"
        style={{ x }}
      >
        {group}
        {group}
        {group}
        {group}
      </motion.div>
    </div>
  );
}
