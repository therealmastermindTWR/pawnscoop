"use client";

import { motion } from "motion/react";
import { ArrowRight, Gift } from "lucide-react";
import { Mascot } from "@/components/mascot/Mascot";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { promo } from "@/lib/content";

export function Referral() {
  return (
    <Section theme="white" aria-labelledby="referral-title" className="py-20 md:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="border-hard relative grid items-center gap-6 overflow-hidden rounded-[2.25rem] bg-tangerine p-8 text-ink shadow-hard-lg sm:p-12 md:grid-cols-[1fr_auto] lg:p-16"
        >
          <div aria-hidden className="pointer-events-none absolute -top-24 -left-24 size-80 rounded-full bg-sun" />
          <div className="relative flex flex-col items-start gap-5">
            <p className="eyebrow inline-flex items-center gap-2 rounded-full bg-ink px-3 py-1.5 text-sun">
              <Gift className="size-4" aria-hidden /> Refer a friend
            </p>
            <h2 id="referral-title" className="max-w-2xl text-[clamp(2.4rem,6vw,5.2rem)] font-extrabold">
              <span className="marker !bg-[linear-gradient(transparent_12%,#fff_12%,#fff_88%,transparent_88%)]">{promo.referralCredit} off</span> for every friend you send our way.
            </h2>
            <p className="max-w-xl text-lg font-medium">Share the scoop. When they sign up, you both get {promo.referralCredit} credit. No limits, no fine print.</p>
            <Button href="/refer-a-friend" variant="dark" size="lg" magnetic icon={<ArrowRight className="size-5" aria-hidden />}>
              Start Referring
            </Button>
          </div>
          <motion.div
            className="relative mx-auto w-56 sm:w-72 lg:w-80"
            initial={{ rotate: -10, y: 40 }}
            whileInView={{ rotate: 0, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
          >
            <Mascot pose="waving" className="h-auto w-full" />
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
}
