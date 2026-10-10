"use client";

import { motion, useInView } from "motion/react";
import { Star } from "lucide-react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

/** Five stars that fill left-to-right when scrolled into view. */
export function Stars({ rating = 5, className, size = "size-5" }: { rating?: number; className?: string; size?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.8 });
  return (
    <div ref={ref} className={cn("flex gap-0.5", className)} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i));
        return (
          <span key={i} className={cn("relative inline-block", size)}>
            <Star className={cn("absolute inset-0 opacity-30", size)} strokeWidth={2} aria-hidden />
            <motion.span
              className="absolute inset-0 overflow-hidden"
              initial={{ width: "0%" }}
              animate={inView ? { width: `${fill * 100}%` } : undefined}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.12, ease: "easeOut" }}
            >
              <Star className={cn("fill-tangerine text-ink", size)} strokeWidth={2} aria-hidden />
            </motion.span>
          </span>
        );
      })}
    </div>
  );
}
