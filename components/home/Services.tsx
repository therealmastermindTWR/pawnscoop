"use client";

import { ArrowRight, Check } from "lucide-react";
import { useRef } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { Button } from "@/components/ui/Button";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { services, type Service } from "@/lib/content";
import { cn } from "@/lib/utils";

const panelStyles: Record<Service["theme"], { panel: string; blob: string; check: string; quote: "dark" | "primary"; more: "light" | "outline" }> = {
  yellow: { panel: "bg-sun text-ink", blob: "bg-white", check: "bg-ink text-sun", quote: "dark", more: "light" },
  black: { panel: "bg-ink text-white", blob: "bg-sun", check: "bg-sun text-ink", quote: "primary", more: "outline" },
  white: { panel: "bg-white text-ink", blob: "bg-sun-100", check: "bg-tangerine text-ink", quote: "dark", more: "light" },
};

function Panel({ s, i }: { s: Service; i: number }) {
  const st = panelStyles[s.theme];
  return (
    <article
      data-panel
      aria-labelledby={`svc-${s.slug}`}
      className={cn(
        "border-hard relative grid shrink-0 overflow-hidden rounded-[2.25rem] shadow-hard-lg",
        "max-lg:mb-8",
        "lg:h-[min(76vh,760px)] lg:w-[min(84vw,1180px)] lg:grid-cols-[1.15fr_1fr]",
        st.panel,
      )}    >
      <div className="relative z-10 flex flex-col gap-6 p-7 sm:p-10 lg:p-14">
        <div className="flex items-center gap-3">
          <span className="font-display text-sm font-bold tracking-[0.2em] uppercase opacity-70">0{i + 1} / 0{services.length}</span>
          <span className="h-[2px] w-10 bg-current opacity-30" />
          <span className="eyebrow">{s.name}</span>
        </div>
        <h3 id={`svc-${s.slug}`} className="text-[clamp(2.3rem,4.6vw,4.4rem)] font-extrabold">
          {s.headline}
        </h3>
        <p className="max-w-lg text-lg opacity-85">{s.intro}</p>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {s.bullets.map((b) => (
            <li key={b} className="flex items-start gap-3 font-medium">
              <span className={cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", st.check)}>
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <QuoteButton variant={st.quote} size="lg" magnetic>
            Free Quote
          </QuoteButton>
          <Button href={`/${s.slug}`} variant={st.more} size="lg" icon={<ArrowRight className="size-5" aria-hidden />}>
            Learn more<span className="sr-only"> about {s.name.toLowerCase()} service</span>
          </Button>
        </div>
      </div>

      <div className="relative hidden items-center justify-center p-10 sm:flex" aria-hidden>
        <div className={cn("animate-blob absolute aspect-square w-[85%]", st.blob)} />
        <Mascot pose={s.mascot} className="relative w-[78%] max-w-[420px]" />
        <span className="border-hard absolute top-10 right-10 rotate-6 rounded-full bg-tangerine px-4 py-2 font-display font-bold text-ink shadow-hard-sm">
          {s.priceNote}
        </span>
      </div>
    </article>
  );
}

/** Pinned section: vertical scroll drives a horizontal track of service panels (desktop). Stacks vertically on mobile. */
export function Services() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`(min-width: 1024px) and ${MOTION_OK}`, () => {
        const track = ref.current!.querySelector<HTMLElement>("[data-track]")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: "[data-pin]",
            start: "center center",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.8,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector(".mascot"),
            { rotate: -8, scale: 0.85 },
            { rotate: 0, scale: 1, ease: "none", scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left right", end: "center center", scrub: true } },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <Section theme="white" ref={ref} aria-labelledby="services-title" className="pt-24 pb-16 md:pt-36 lg:pb-0">
      <div className="container-x mb-12 flex flex-col justify-between gap-6 lg:mb-4 lg:flex-row lg:items-end">
        <SectionHeading id="services-title" eyebrow="Services" title={["Pick your", "yard patrol."]} />
        <p className="text-muted max-w-md text-lg lg:pb-3">
          Poop scooping, lawn care, turf cleaning and commercial pet areas. One crew for the whole yard. Scroll to explore →
        </p>
      </div>
      <div data-pin className="lg:flex lg:h-screen lg:items-center lg:overflow-hidden">
        <div data-track className="container-x flex flex-col lg:w-max lg:max-w-none lg:flex-row lg:gap-10 lg:pr-[8vw] lg:will-change-transform">
          {services.map((s, i) => (
            <Panel key={s.slug} s={s} i={i} />
          ))}
        </div>
      </div>
    </Section>
  );
}
