"use client";

import { motion } from "motion/react";
import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { PawIcon } from "@/components/ui/Icons";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { locations } from "@/lib/content";
import { cn } from "@/lib/utils";

export function ServiceMap({ active, onPin, className }: { active: string | null; onPin?: (slug: string | null) => void; className?: string }) {
  return (
    <div className={cn("border-hard relative aspect-square overflow-hidden rounded-[2rem] bg-sun-100 shadow-hard-lg", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
        {/* stylized El Paso County: NM line on top, Rio Grande along the southwest edge */}
        <path
          d="M10 8 L 94 8 L 94 90 C 86 88, 78 84, 70 80 C 60 74, 52 68, 45 62 C 38 57, 32 54, 29 50 C 25 44, 23 36, 21 28 C 19 20, 15 13, 10 8 Z"
          fill="#FFFFFF"
          stroke="#111"
          strokeWidth="0.9"
          strokeLinejoin="round"
        />
        {/* Rio Grande */}
        <path
          d="M8 6 C 15 13, 19 20, 21 28 C 23 36, 25 44, 29 50 C 32 54, 38 57, 45 62 C 52 68, 60 74, 70 80 C 78 84, 86 88, 96 92"
          fill="none"
          stroke="#FFCC24"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Franklin Mountains */}
        <path d="M36 9 L 40 16 L 38 22 L 43 30 L 40 36 L 42 44 L 37 40 L 35 30 L 37 22 L 34 15 Z" fill="#FFE89A" stroke="#111" strokeWidth="0.7" strokeLinejoin="round" />
        {/* I-10 */}
        <path d="M14 12 C 24 30, 30 46, 44 54 S 70 66, 94 72" fill="none" stroke="#111" strokeOpacity="0.25" strokeWidth="0.7" strokeDasharray="1.6 1.4" />
        <text x="90" y="14" textAnchor="end" fontSize="3" fontWeight="700" fill="#111" opacity="0.45" letterSpacing="0.3">NEW MEXICO</text>
        <text x="20" y="66" textAnchor="middle" fontSize="3" fontWeight="700" fill="#111" opacity="0.45" letterSpacing="0.3">MEXICO</text>
      </svg>
      {locations.map((l) => {
        const on = active === l.slug;
        return (
          <button
            key={l.slug}
            type="button"
            onMouseEnter={() => onPin?.(l.slug)}
            onMouseLeave={() => onPin?.(null)}
            onFocus={() => onPin?.(l.slug)}
            onBlur={() => onPin?.(null)}
            aria-label={`${l.city} service area`}
            className="absolute -translate-x-1/2 -translate-y-full"
            style={{ left: `${l.pin.x}%`, top: `${l.pin.y}%` }}
          >
            <span className="absolute bottom-0 left-1/2 size-6 -translate-x-1/2 translate-y-1/2" aria-hidden>
              <span className="animate-pulse-ring absolute inset-0 rounded-full bg-tangerine" />
            </span>
            <motion.span
              animate={{ scale: on ? 1.25 : 1, y: on ? -6 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
              className={cn(
                "relative flex flex-col items-center",
              )}
            >
              <span className={cn("border-hard grid size-10 place-items-center rounded-full rounded-br-none rotate-45 shadow-hard-sm transition-colors", on ? "bg-tangerine" : "bg-sun")}>
                <PawIcon className="size-5 -rotate-45 text-ink" />
              </span>
              <span
                className={cn(
                  "border-hard absolute top-full mt-2 rounded-full bg-ink px-3 py-1 text-xs font-bold whitespace-nowrap text-white transition-opacity",
                  on ? "opacity-100" : "opacity-0",
                )}
              >
                {l.city}
              </span>
            </motion.span>
          </button>
        );
      })}
      <p className="border-hard absolute bottom-4 left-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink">El Paso County, TX</p>
    </div>
  );
}

export function Locations() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section theme="yellow" aria-labelledby="loc-title" className="py-24 md:py-36">
      <div className="container-x">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 lg:flex-row lg:items-end">
          <SectionHeading id="loc-title" eyebrow="Service areas" title={["Scooping across", "the neighborhood."]} />
          <Link href="/locations" className="group flex items-center gap-2 font-display text-lg font-bold underline decoration-[3px] underline-offset-[6px] lg:pb-4">
            View all locations <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden />
          </Link>
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.25fr_1fr]">
          <motion.ul
            className="grid gap-4 sm:grid-cols-2"
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {locations.map((l) => {
              const on = active === l.slug;
              return (
                <motion.li key={l.slug} variants={staggerChild}>
                  <Link
                    href={`/locations#${l.slug}`}
                    onMouseEnter={() => setActive(l.slug)}
                    onMouseLeave={() => setActive(null)}
                    onFocus={() => setActive(l.slug)}
                    onBlur={() => setActive(null)}
                    className={cn(
                      "border-hard group flex flex-col rounded-[1.75rem] p-6 text-ink transition-all duration-300",
                      on ? "-translate-y-1 bg-ink text-white shadow-hard" : "bg-white shadow-hard-sm",
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-2xl font-extrabold md:text-3xl">{l.city}</h3>
                        <p className={cn("mt-1 flex items-center gap-1.5 text-sm font-semibold", on ? "text-sun" : "text-charcoal")}>
                          <MapPin className="size-4" aria-hidden /> {l.region}
                        </p>
                      </div>
                      <span className={cn("grid size-10 shrink-0 place-items-center rounded-full border-2 transition-all", on ? "rotate-45 border-sun bg-sun text-ink" : "border-ink")}>
                        <ArrowUpRight className="size-5" aria-hidden />
                      </span>
                    </div>
                    <div className={cn("grid transition-[grid-template-rows] duration-500 ease-out-expo", on ? "grid-rows-[1fr]" : "grid-rows-[1fr] md:grid-rows-[0fr]")}>
                      <div className="overflow-hidden">
                        <div className="flex flex-col gap-3 pt-5">
                          <div className="flex flex-wrap gap-1.5">
                            {l.neighborhoods.map((n) => (
                              <span key={n} className="rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-current/25">
                                {n}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>

          <div className="lg:sticky lg:top-28">
            <ServiceMap active={active} onPin={setActive} />
          </div>
        </div>
      </div>
    </Section>
  );
}
