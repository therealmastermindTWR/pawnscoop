"use client";

import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { PawIcon } from "@/components/ui/Icons";
import { staggerChild, staggerParent } from "@/components/ui/Reveal";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { serviceHref, services, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";

const panelColors = ["bg-sun", "bg-ink", "bg-tangerine", "bg-sun-100", "bg-ink"];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const dark = panelColors[i % panelColors.length] === "bg-ink";
  return (
    <motion.li variants={staggerChild} className="h-full">
      <Link
        href={serviceHref(s.slug)}
        className="border-hard group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink shadow-hard-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-hard"
      >
        <div className={cn("relative aspect-[4/3] overflow-hidden border-b-[2.5px] border-ink", panelColors[i % panelColors.length])}>
          {s.image ? (
            <Image
              src={s.image.src}
              alt={s.image.alt}
              fill
              sizes="(min-width: 1280px) 20vw, (min-width: 768px) 33vw, 90vw"
              className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
            />
          ) : (
            // Illustrated panel until a real project photo is added (services[].image in lib/content.ts)
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden>
              <PawIcon className={cn("absolute -right-4 -bottom-6 size-32 rotate-[-18deg]", dark ? "text-white/10" : "text-ink/10")} />
              <PawIcon className={cn("absolute top-4 left-5 size-10 rotate-12", dark ? "text-white/10" : "text-ink/10")} />
              <span
                className={cn(
                  "border-hard grid size-24 place-items-center rounded-[1.75rem] shadow-hard-sm transition-transform duration-500 ease-spring group-hover:scale-110 group-hover:-rotate-6",
                  dark ? "bg-sun text-ink" : "bg-white text-ink",
                )}
              >
                <ServiceIcon name={s.icon} className="size-11" strokeWidth={2} />
              </span>
            </div>
          )}
          <span className="border-hard absolute top-3 left-3 grid size-11 place-items-center rounded-2xl bg-white text-ink">
            <ServiceIcon name={s.icon} className="size-5" strokeWidth={2.2} />
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-6">
          <h3 className="text-2xl font-extrabold">{s.name}</h3>
          <p className="text-charcoal">{s.summary}</p>
          <span className="mt-auto inline-flex items-center gap-2 pt-2 font-display font-bold">
            <span className="underline decoration-tangerine decoration-[3px] underline-offset-[6px] group-hover:decoration-ink">Learn More</span>
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
            <span className="sr-only"> about {s.name.toLowerCase()}</span>
          </span>
        </div>
      </Link>
    </motion.li>
  );
}

/** The five services as cards. `exclude` hides one (e.g. on that service's own page). */
export function ServicesGrid({ exclude, className }: { exclude?: string; className?: string }) {
  const list = services.filter((s) => s.slug !== exclude);
  return (
    <motion.ul
      className={cn("grid gap-5 sm:grid-cols-2", list.length >= 5 ? "lg:grid-cols-3 xl:grid-cols-5" : "lg:grid-cols-4", className)}
      variants={staggerParent}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
    >
      {list.map((s) => (
        <ServiceCard key={s.slug} s={s} i={services.indexOf(s)} />
      ))}
    </motion.ul>
  );
}
