"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { PawIcon } from "@/components/ui/Icons";
import { useIntro } from "@/components/providers/IntroProvider";

const STEPS = 8;

/**
 * Branded preloader: paw prints walk across the screen while a counter runs to 100%.
 * Shows once per session. An inline script in <head> adds `html.skip-preloader` on repeat
 * visits so the overlay never flashes.
 */
export function Preloader() {
  const { markReady } = useIntro();
  const reduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (document.documentElement.classList.contains("skip-preloader")) {
      setVisible(false);
      markReady();
      return;
    }
    const duration = reduce ? 400 : 1500;
    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
      else
        setTimeout(() => {
          try {
            sessionStorage.setItem("pns-intro", "1");
          } catch {}
          setVisible(false);
          markReady();
        }, 180);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [markReady, reduce]);

  return (
    <AnimatePresence onExitComplete={markReady}>
      {visible && (
        <motion.div
          data-preloader
          key="preloader"
          className="fixed inset-0 z-[300] flex flex-col justify-between overflow-hidden bg-sun p-6 text-ink sm:p-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          role="progressbar"
          aria-label="Loading Paw N Scoop"
          aria-valuenow={count}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <p className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
            Paw <span className="text-tangerine-600">N</span> Scoop
          </p>

          <div className="relative h-24 w-full" aria-hidden>
            {Array.from({ length: STEPS }).map((_, i) => {
              const shown = count / 100 > i / STEPS;
              return (
                <motion.span
                  key={i}
                  className="absolute"
                  style={{ left: `${(i / STEPS) * 92 + 2}%`, top: i % 2 ? "8%" : "52%" }}
                  initial={{ opacity: 0, scale: 0.3 }}
                  animate={shown ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.3 }}
                  transition={{ type: "spring", stiffness: 500, damping: 22 }}
                >
                  <PawIcon className="size-10 rotate-90 sm:size-14" />
                </motion.span>
              );
            })}
          </div>

          <div className="flex items-end justify-between">
            <p className="max-w-[16ch] font-display text-base leading-tight font-extrabold sm:text-xl">Pawsome Yards N Splendid Scoops</p>
            <p className="font-display text-[22vw] leading-[0.8] font-extrabold tracking-tighter tabular-nums sm:text-[14vw]">
              {count}
              <span className="text-[0.4em]">%</span>
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
