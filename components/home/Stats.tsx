"use client";

import { motion } from "motion/react";
import { CountUp } from "@/components/ui/CountUp";
import { PawIcon } from "@/components/ui/Icons";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { stats } from "@/lib/content";

export function Stats() {
  return (
    <Section theme="yellow" aria-label="Paw N Scoop by the numbers" className="py-20 md:py-28">
      <motion.ul
        className="container-x grid gap-10 md:grid-cols-3 md:gap-0"
        variants={staggerParent}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {stats.counters.map((c, i) => (
          <motion.li key={c.label} variants={staggerChild} className="flex flex-col items-center gap-2 text-center md:border-l-[3px] md:border-dashed md:border-current/30 md:first:border-l-0">
            <PawIcon className="size-8 text-tangerine-600" style={{ rotate: `${i * 20 - 20}deg` }} />
            <CountUp value={c.value} suffix={c.suffix} className="font-display text-[clamp(3.5rem,8vw,7rem)] leading-none font-extrabold tracking-tighter" />
            <p className="font-display text-xl font-bold md:text-2xl">{c.label}</p>
          </motion.li>
        ))}
      </motion.ul>
    </Section>
  );
}
