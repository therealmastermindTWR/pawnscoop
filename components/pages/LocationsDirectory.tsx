"use client";

import { ArrowRight, MapPin } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ServiceMap } from "@/components/home/Locations";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { locations, serviceHref, services, site } from "@/lib/content";
import { cn } from "@/lib/utils";

export function LocationsDirectory() {
  const [active, setActive] = useState<string | null>(null);
  return (
    <Section theme="white" aria-labelledby="areas-title" className="py-20 md:py-28">
      <div className="container-x grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
        <div className="flex flex-col gap-8 lg:sticky lg:top-28">
          <ServiceMap active={active} onPin={setActive} />
          <div className="border-hard rounded-[1.75rem] bg-sun-100 p-6 text-ink">
            <h2 className="text-2xl font-extrabold">Every service, every area</h2>
            <p className="mt-2 text-charcoal">All five Paw N Scoop services are available throughout our service area:</p>
            <ul className="mt-4 flex flex-col gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link href={serviceHref(s.slug)} className="group flex items-center gap-3 font-semibold hover:underline">
                    <span className="grid size-8 place-items-center rounded-xl bg-sun">
                      <ServiceIcon name={s.icon} className="size-4" />
                    </span>
                    {s.name}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <h2 id="areas-title" className="text-4xl font-extrabold md:text-5xl">
            Communities we serve
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {locations.map((l, i) => (
              <Reveal
                as="li"
                key={l.slug}
                delay={i * 0.04}
                className={cn(
                  "border-hard scroll-mt-28 rounded-[1.5rem] p-5 text-ink transition-all",
                  active === l.slug ? "bg-sun shadow-hard" : "bg-white shadow-hard-sm",
                )}
              >
                <div id={l.slug} onMouseEnter={() => setActive(l.slug)} onMouseLeave={() => setActive(null)} className="flex flex-col gap-3">
                  <h3 className="text-2xl font-extrabold">{l.city}</h3>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-charcoal">
                    <MapPin className="size-4" aria-hidden /> El Paso County, {l.region}
                  </span>
                  <div className="pt-1">
                    <QuoteButton size="sm" variant="dark">
                      Get a Quote
                    </QuoteButton>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
          <p className="border-hard rounded-[1.5rem] bg-white p-5 text-charcoal">
            Don&apos;t see your community? We serve {site.serviceArea}. Request a quote or call{" "}
            <a href={site.phoneHref} className="font-bold text-ink underline decoration-tangerine decoration-2 underline-offset-4">
              {site.phone}
            </a>{" "}
            and we&apos;ll let you know if we can reach you.
          </p>
        </div>
      </div>
    </Section>
  );
}
