"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef, type ElementType } from "react";
import { cn } from "@/lib/utils";

type Props = {
  /** Each entry renders on its own line. */
  lines: string[];
  as?: ElementType;
  className?: string;
  lineClassName?: (i: number) => string | undefined;
  mode?: "words" | "chars";
  delay?: number;
  stagger?: number;
  /** "inView" animates when scrolled into view; "manual" animates when `play` is true. */
  trigger?: "inView" | "manual";
  play?: boolean;
  id?: string;
};

/**
 * Split-text reveal: words (or letters) slide up from behind a mask.
 * Screen readers get the plain sentence; the animated spans are aria-hidden.
 */
export function SplitText({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  mode = "words",
  delay = 0,
  stagger,
  trigger = "inView",
  play,
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const active = trigger === "manual" ? !!play : inView;
  const step = stagger ?? (mode === "chars" ? 0.03 : 0.07);
  let index = 0;

  return (
    <Tag ref={ref} id={id} className={className}>
      <span className="sr-only">{lines.join(" ")}</span>
      <span aria-hidden className="block">
        {lines.map((line, li) => (
          <span key={li} className={cn("block", lineClassName?.(li))}>
            {line.split(" ").map((word, wi, arr) => (
              <span key={wi} className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom whitespace-nowrap">
                {(mode === "chars" ? Array.from(word) : [word]).map((piece, pi) => {
                  const i = index++;
                  return (
                    <motion.span
                      key={pi}
                      className="inline-block will-change-transform"
                      initial={reduce ? { opacity: 0 } : { y: "115%", rotate: mode === "chars" ? 10 : 4 }}
                      animate={active ? (reduce ? { opacity: 1 } : { y: "0%", rotate: 0 }) : undefined}
                      transition={{ duration: reduce ? 0.4 : 0.9, ease: [0.16, 1, 0.3, 1], delay: delay + i * step }}
                    >
                      {piece}
                    </motion.span>
                  );
                })}
                {wi < arr.length - 1 && <span className="inline-block">&nbsp;</span>}
              </span>
            ))}
          </span>
        ))}
      </span>
    </Tag>
  );
}
