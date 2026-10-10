"use client";

import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import type { ReactNode } from "react";
import { Mascot, type MascotPose } from "@/components/mascot/Mascot";
import { useIntro } from "@/components/providers/IntroProvider";
import { PawIcon } from "@/components/ui/Icons";
import { Section } from "@/components/ui/Section";
import { SplitText } from "@/components/ui/SplitText";
import type { Theme } from "@/lib/content";

type Props = {
  eyebrow: string;
  title: string[];
  sub: string;
  pose?: MascotPose;
  theme?: Theme;
  breadcrumb: string;
  children?: ReactNode;
};

export function PageHero({ eyebrow, title, sub, pose = "waving", theme = "yellow", breadcrumb, children }: Props) {
  const { ready } = useIntro();
  const reduce = useReducedMotion();
  const fade = (delay: number) => ({
    initial: { opacity: 0, y: reduce ? 0 : 20 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay },
  });

  return (
    <Section theme={theme} aria-labelledby="page-title" className="overflow-hidden pt-10 pb-20 md:pt-16 md:pb-28">
      <div aria-hidden className="animate-blob pointer-events-none absolute -top-40 -right-40 aspect-square w-[min(80vw,640px)] bg-white/40" />
      <div className="container-x relative grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col items-start gap-6">
          <motion.nav {...fade(0)} aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-semibold">
              <li>
                <Link href="/" className="underline-offset-4 hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="opacity-75">
                {breadcrumb}
              </li>
            </ol>
          </motion.nav>
          <motion.p {...fade(0.05)} className="eyebrow inline-flex items-center gap-2 rounded-full border-2 border-current px-3 py-1.5">
            <PawIcon className="size-3.5" /> {eyebrow}
          </motion.p>
          <SplitText
            as="h1"
            id="page-title"
            lines={title}
            trigger="manual"
            play={ready}
            delay={0.1}
            className="text-[clamp(3rem,9vw,7.5rem)] leading-[0.88] font-extrabold tracking-[-0.05em]"
          />
          <motion.p {...fade(0.4)} className="text-muted max-w-2xl text-lg md:text-xl">
            {sub}
          </motion.p>
          {children && <motion.div {...fade(0.5)}>{children}</motion.div>}
        </div>
        <motion.div
          className="mx-auto w-full max-w-[22rem] lg:max-w-md"
          initial={{ opacity: 0, scale: reduce ? 1 : 0.8 }}
          animate={ready ? { opacity: 1, scale: 1 } : undefined}
          transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.3 }}
        >
          <Mascot pose={pose} className="h-auto w-full" />
        </motion.div>
      </div>
    </Section>
  );
}
