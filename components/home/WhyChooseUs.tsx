"use client";

import { motion } from "motion/react";
import { BadgeCheck, CalendarClock, Camera, FileText, Users, type LucideIcon } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Stars } from "@/components/ui/Stars";
import { PawIcon } from "@/components/ui/Icons";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Mascot } from "@/components/mascot/Mascot";
import { features, stats } from "@/lib/content";
import { cn } from "@/lib/utils";

type IconType = React.ComponentType<{ className?: string; strokeWidth?: number; "aria-hidden"?: boolean }>;
const PawGlyph: IconType = ({ className }) => <PawIcon className={className} />;
const icons: Record<string, IconType | LucideIcon> = {
  users: Users,
  paw: PawGlyph,
  calendar: CalendarClock,
  badge: BadgeCheck,
  file: FileText,
  camera: Camera,

};

const hoverAnims = [
  { rotate: [0, -12, 12, 0], scale: 1.15 },
  { rotate: 20, scale: 1.25 },
  { y: [0, -6, 0, -3, 0] },
  { rotate: [0, 8, -8, 0], scale: 1.1 },
  { scale: [1, 0.8, 1.2, 1] },
  { x: [0, 4, -4, 0], rotate: -8 },
];

export function WhyChooseUs() {
  return (
    <Section theme="yellow" aria-labelledby="why-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="why-title"
          eyebrow="Why us"
          title={["Why choose", "Paw N Scoop?"]}
          sub="A local crew that shows up, communicates and takes care of your whole yard."
          className="mb-14 md:mb-20"
        />

        <motion.ul
          className="grid auto-rows-[minmax(13rem,auto)] gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {/* big stat tile */}
          <motion.li
            variants={staggerChild}
            className="border-hard relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-8 text-ink sm:col-span-2 lg:row-span-2 md:p-10"
          >
            <p className="eyebrow">Rated on Google</p>
            <div className="relative z-10">
              <p className="font-display text-[clamp(3.8rem,9vw,8rem)] leading-[0.85] font-extrabold tracking-tighter">
                {stats.rating.toFixed(1)}
                <span className="text-[0.5em]">★</span>
              </p>
              <Stars rating={stats.rating} size="size-7" className="mt-3" />
              <p className="mt-3 font-display text-2xl font-bold md:text-3xl">
                <CountUp value={stats.reviewCount} /> five-star reviews
              </p>
            </div>
            <Mascot pose="scooper" className="absolute -right-4 -bottom-4 h-[70%] max-sm:hidden" aria-hidden />
          </motion.li>

          {features.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <motion.li
                key={f.title}
                variants={staggerChild}
                whileHover="hover"
                className={cn(
                  "group relative flex flex-col gap-4 overflow-hidden rounded-[2rem] border-2 border-white/15 bg-ink-800 p-7 text-white transition-colors duration-300 hover:border-sun hover:bg-ink-700",
                  i === 0 && "lg:col-span-2",
                  i === 5 && "lg:col-span-2",
                )}
              >
                <motion.span
                  className="grid size-14 place-items-center rounded-2xl bg-sun text-ink transition-colors group-hover:bg-tangerine"
                  variants={{ hover: { ...hoverAnims[i], transition: { duration: 0.6 } } }}
                >
                  <Icon className="size-7" strokeWidth={2.2} aria-hidden />
                </motion.span>
                <h3 className="mt-auto text-2xl font-extrabold md:text-3xl">{f.title}</h3>
                <p className="text-white/75">{f.body}</p>
                <span aria-hidden className="absolute -right-10 -bottom-10 size-32 rounded-full bg-sun/10 transition-transform duration-500 group-hover:scale-[2.2]" />
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </Section>
  );
}
