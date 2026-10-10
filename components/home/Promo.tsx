"use client";

import { motion, useReducedMotion } from "motion/react";
import { Copy, PartyPopper } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { useToast } from "@/components/providers/ToastProvider";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import { promo, site } from "@/lib/content";

/** Offer deadline: end of the current month (always "live"). Swap for a fixed date if needed. */
function getDeadline() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);
}

function useCountdown() {
  const [left, setLeft] = useState<number | null>(null);
  useEffect(() => {
    const end = getDeadline().getTime();
    const tick = () => setLeft(Math.max(0, end - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left === null) return null;
  const s = Math.floor(left / 1000);
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}

function Countdown() {
  const t = useCountdown();
  const units = [
    { k: "days", label: "Days" },
    { k: "hours", label: "Hrs" },
    { k: "minutes", label: "Min" },
    { k: "seconds", label: "Sec" },
  ] as const;
  return (
    <div className="flex gap-2 sm:gap-3" role="timer" aria-label="Time left to claim this offer">
      {units.map((u) => (
        <div key={u.k} className="border-hard flex w-[4.4rem] flex-col items-center rounded-2xl bg-white py-2.5 text-ink shadow-hard-sm sm:w-20">
          <span className="relative h-9 overflow-hidden font-display text-3xl leading-9 font-extrabold tabular-nums sm:text-4xl">
            <motion.span key={t ? t[u.k] : "x"} initial={{ y: "-60%", opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.25, ease: "easeOut" }} className="block">
              {t ? String(t[u.k]).padStart(2, "0") : "--"}
            </motion.span>
          </span>
          <span className="text-xs font-bold tracking-widest uppercase">{u.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Promo() {
  const toast = useToast();
  const reduce = useReducedMotion();
  const btnRef = useRef<HTMLAnchorElement>(null);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(promo.code);
      toast(`Copied "${promo.code}" to clipboard!`);
    } catch {
      toast(`Your code: ${promo.code}`);
    }
  };

  // The link itself opens the Jobber form in a new tab; confetti celebrates on this page.
  const celebrate = async () => {
    if (reduce || !btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    const confetti = (await import("canvas-confetti")).default;
    const origin = { x: (r.left + r.width / 2) / window.innerWidth, y: (r.top + r.height / 2) / window.innerHeight };
    const colors = ["#FFCC24", "#FF9900", "#111111", "#FFFFFF"];
    confetti({ particleCount: 90, spread: 75, startVelocity: 42, origin, colors, zIndex: 999, scalar: 1.1 });
    confetti({ particleCount: 40, spread: 120, startVelocity: 25, origin, colors, zIndex: 999, shapes: ["circle"] });
  };

  return (
    <Section theme="white" id="promo" aria-labelledby="promo-title" className="py-24 md:py-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 60, rotate: -1.5 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-16 grid lg:grid-cols-[1.6fr_1fr]"
        >
          {/* main ticket */}
          <div className="border-hard relative rounded-[2.25rem] bg-sun p-7 pt-16 text-ink shadow-hard-lg sm:p-10 lg:rounded-r-none lg:border-r-0 lg:p-14">
            <Mascot pose="celebrating" className="absolute -top-28 right-4 h-40 w-auto sm:-top-36 sm:h-52 lg:right-10" />
            <p className="eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sun">
              <PartyPopper className="size-4" aria-hidden /> Limited-time offer
            </p>
            <SplitText as="h2" id="promo-title" lines={["Claim your", "FREE cleanup."]} className="text-[clamp(2.6rem,7vw,6rem)] font-extrabold text-ink" />
            <p className="mt-5 max-w-xl text-lg text-charcoal md:text-xl">{promo.body}</p>
            <div className="mt-8 flex flex-col gap-3">
              <p className="text-sm font-bold tracking-widest uppercase">Offer ends in</p>
              <Countdown />
            </div>
            <a
              ref={btnRef}
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={celebrate}
              data-cursor="Book"
              className="group border-hard relative mt-9 inline-flex min-h-16 items-center gap-3 overflow-hidden rounded-full bg-ink px-6 py-3 text-center font-display text-lg font-bold text-white shadow-hard-sm transition-transform hover:-translate-y-0.5 active:scale-95 sm:px-8 sm:text-xl"
            >
              <span aria-hidden className="absolute inset-0 translate-y-full rounded-full bg-tangerine transition-transform duration-500 ease-out-expo group-hover:translate-y-0" />
              <span className="relative transition-colors group-hover:text-ink">Claim My Free Cleanup 🎉</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>

          {/* tear-off coupon */}
          <div className="border-hard relative -mt-[2.5px] flex flex-col items-center justify-center gap-4 rounded-[2.25rem] bg-tangerine p-8 text-center text-ink shadow-hard-lg lg:mt-0 lg:-ml-[2.5px] lg:rounded-l-none lg:border-l-[3px] lg:border-dashed lg:border-l-ink">
            {/* notches */}
            <span className="absolute -top-[2px] left-1/2 hidden size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-hard bg-white max-lg:block" aria-hidden />
            <span className="absolute -top-5 -left-5 hidden size-10 rounded-full border-hard bg-white lg:block" aria-hidden />
            <span className="absolute -bottom-5 -left-5 hidden size-10 rounded-full border-hard bg-white lg:block" aria-hidden />
            <p className="eyebrow">Add this code when you book</p>
            <button
              type="button"
              onClick={copy}
              className="group flex flex-col items-center gap-3 rounded-3xl border-[3px] border-dashed border-ink bg-white px-6 py-5 transition-transform hover:-rotate-2 hover:scale-105"
              aria-label={`Copy promo code ${promo.code}`}
            >
              <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none font-extrabold tracking-wider">{promo.code}</span>
              <span className="flex items-center gap-2 text-sm font-bold">
                <Copy className="size-4" aria-hidden /> Click to copy
              </span>
            </button>
            <p className="max-w-[26ch] text-sm font-semibold">Paste it in the notes of your request form. Valid with any recurring plan. New customers only.</p>
          </div>
        </motion.div>
      </div>
    </Section>
  );
}
