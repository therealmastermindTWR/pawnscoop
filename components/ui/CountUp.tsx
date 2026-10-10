"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { formatNumber } from "@/lib/utils";

type Props = { value: number; suffix?: string; prefix?: string; duration?: number; className?: string };

export function CountUp({ value, suffix = "", prefix = "", duration = 2.2, className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: reduce ? 0 : duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{`${prefix}${formatNumber(value)}${suffix}`}</span>
      <span aria-hidden className="tabular-nums">
        {prefix}
        {formatNumber(n)}
        {suffix}
      </span>
    </span>
  );
}
