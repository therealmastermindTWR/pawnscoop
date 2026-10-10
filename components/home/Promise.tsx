"use client";

import { motion } from "motion/react";
import { BadgeCheck, CalendarCheck, ShieldCheck, type LucideIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { promises } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = { calendar: CalendarCheck, badge: BadgeCheck, shield: ShieldCheck };
const styles = [
  { card: "bg-sun text-ink", icon: "bg-white text-ink", num: "text-ink/15" },
  { card: "bg-white text-ink", icon: "bg-tangerine text-ink", num: "text-ink/10" },
  { card: "bg-ink text-white", icon: "bg-sun text-ink", num: "text-white/15" },
];
const iconHover = [{ rotate: [0, -14, 10, -6, 0], scale: 1.15 }, { scale: [1, 1.3, 1.1], rotate: 12 }, { y: [0, -8, 0], scale: 1.15 }];

export function CustomerPromise() {
  return (
    <Section theme="white" aria-labelledby="promise-title" className="py-24 md:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 lg:flex-row lg:items-end">
          <SectionHeading
            id="promise-title"
            eyebrow="Our promise"
            title={["The scoop on", "how we do it."]}
          />
          <p className="text-muted max-w-md text-lg lg:pb-3">
            Three things we&apos;ll never compromise on, no matter how big the yard or how prolific the pup.
          </p>
        </div>

        <motion.ul
          className="grid gap-6 md:grid-cols-3 md:gap-8"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
        >
          {promises.map((p, i) => {
            const Icon = icons[p.icon];
            const s = styles[i];
            return (
              <motion.li key={p.title} variants={staggerChild} className="h-full">
                <TiltCard className={cn("border-hard rounded-[2rem] shadow-hard", s.card)}>
                  <motion.div initial="rest" whileHover="hover" animate="rest" className="relative flex h-full min-h-[22rem] flex-col gap-6 overflow-hidden p-7 md:p-9">
                    <span className={cn("absolute -top-6 right-4 font-display text-[9rem] leading-none font-extrabold", s.num)} aria-hidden>
                      0{i + 1}
                    </span>
                    <motion.span
                      className={cn("border-hard grid size-16 place-items-center rounded-2xl", s.icon)}
                      variants={{ rest: { rotate: 0, scale: 1, y: 0 }, hover: { ...iconHover[i], transition: { duration: 0.6 } } }}
                      style={{ translateZ: 40 }}
                    >
                      <Icon className="size-8" strokeWidth={2.2} aria-hidden />
                    </motion.span>
                    <div className="mt-auto flex flex-col gap-3" style={{ transform: "translateZ(30px)" }}>
                      <h3 className="text-3xl font-extrabold md:text-4xl">{p.title}</h3>
                      <p className="text-base opacity-85 md:text-lg">{p.body}</p>
                    </div>
                  </motion.div>
                </TiltCard>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}
