"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { ServiceMap } from "@/components/home/Locations";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { locations } from "@/lib/content";
import { cn } from "@/lib/utils";

export function LocationsDirectory() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Section theme="white" aria-label="Service area directory" className="py-20 md:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="lg:sticky lg:top-28">
          <ServiceMap active={active} onPin={setActive} />
        </div>
        <ul className="flex flex-col gap-5">
          {locations.map((l, i) => (
            <Reveal
              as="li"
              key={l.slug}
              delay={i * 0.05}
              className={cn(
                "border-hard scroll-mt-28 rounded-[1.75rem] p-7 text-ink transition-all",
                active === l.slug ? "bg-sun shadow-hard" : "bg-white shadow-hard-sm",
              )}
            >
              <div id={l.slug} onMouseEnter={() => setActive(l.slug)} onMouseLeave={() => setActive(null)} className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-3xl font-extrabold md:text-4xl">{l.city}</h2>
                  <span className="flex items-center gap-1.5 text-sm font-semibold">
                    <MapPin className="size-4" aria-hidden /> El Paso County, {l.region}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {l.neighborhoods.map((n) => (
                    <span key={n} className="rounded-full border-2 border-ink px-3 py-1 text-sm font-semibold">
                      {n}
                    </span>
                  ))}
                </div>
                <div>
                  <QuoteButton size="sm" variant="dark">
                    Quote in {l.city}
                  </QuoteButton>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
