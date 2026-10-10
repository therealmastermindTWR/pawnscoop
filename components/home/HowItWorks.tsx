"use client";

import { CalendarCheck, ClipboardList, Shovel, Sun, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { PawIcon } from "@/components/ui/Icons";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { steps } from "@/lib/content";
import { cn } from "@/lib/utils";

const icons: LucideIcon[] = [ClipboardList, CalendarCheck, Shovel, Sun];

/**
 * Timeline whose connecting path is built from the real positions of the step nodes
 * (so it never distorts), drawn on scroll, with a paw that travels along it.
 */
export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trackRef = useRef<SVGPathElement>(null);
  const drawRef = useRef<SVGPathElement>(null);
  const pawRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const wrap = wrapRef.current!;
      const svg = svgRef.current!;
      const track = trackRef.current!;
      const draw = drawRef.current!;
      const paw = pawRef.current!;
      const nodes = Array.from(wrap.querySelectorAll<HTMLElement>("[data-node]"));
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let len = 0;
      let stops: number[] = [];

      const build = () => {
        const box = wrap.getBoundingClientRect();
        const pts = nodes.map((n) => {
          const r = n.getBoundingClientRect();
          return { x: r.left + r.width / 2 - box.left, y: r.top + r.height / 2 - box.top };
        });
        const swing = Math.min(120, box.width * 0.12, pts[0].x * 0.8);
        let d = `M ${pts[0].x} 0 L ${pts[0].x} ${pts[0].y}`;
        for (let i = 1; i < pts.length; i++) {
          const a = pts[i - 1];
          const b = pts[i];
          const dir = i % 2 ? 1 : -1;
          const dy = (b.y - a.y) / 3;
          d += ` C ${a.x + swing * dir} ${a.y + dy}, ${b.x + swing * dir} ${b.y - dy}, ${b.x} ${b.y}`;
        }
        const last = pts[pts.length - 1];
        d += ` L ${last.x} ${box.height}`;
        svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
        track.setAttribute("d", d);
        draw.setAttribute("d", d);
        len = draw.getTotalLength();
        draw.style.strokeDasharray = `${len}`;
        stops = pts.map((p) => p.y / box.height);
      };

      const render = (p: number) => {
        draw.style.strokeDashoffset = `${len * (1 - p)}`;
        const at = Math.max(0.5, len * p);
        const pt = draw.getPointAtLength(at);
        const ahead = draw.getPointAtLength(Math.min(len, at + 2));
        const angle = (Math.atan2(ahead.y - pt.y, ahead.x - pt.x) * 180) / Math.PI + 90;
        paw.style.transform = `translate(${pt.x}px, ${pt.y}px) translate(-50%, -50%) rotate(${angle}deg)`;
        nodes.forEach((n, i) => n.classList.toggle("is-active", p >= stops[i] - 0.02));
      };

      build();
      if (reduce) {
        render(1);
        paw.style.opacity = "0";
        return;
      }
      render(0);

      const st = ScrollTrigger.create({
        trigger: wrap,
        start: "top 65%",
        end: "bottom 65%",
        scrub: 0.6,
        onUpdate: (self) => render(self.progress),
        onRefresh: (self) => {
          build();
          render(self.progress);
        },
      });

      const ro = new ResizeObserver(() => ScrollTrigger.refresh());
      ro.observe(wrap);
      return () => {
        ro.disconnect();
        st.kill();
      };
    },
    { scope: ref },
  );

  return (
    <Section theme="white" ref={ref} id="how-it-works" aria-labelledby="how-title" className="py-24 md:py-36">
      <div className="container-x">
        <SectionHeading
          id="how-title"
          align="center"
          eyebrow="How it works"
          title={["Four steps to a", "poop-free yard."]}
          sub="Getting started is easier than teaching your dog to sit. (Okay, much easier.)"
          className="mb-16 md:mb-24"
        />

        <div ref={wrapRef} className="relative mx-auto max-w-5xl">
          <svg ref={svgRef} aria-hidden className="pointer-events-none absolute inset-0 size-full overflow-visible">
            <path ref={trackRef} fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="4" strokeDasharray="2 12" strokeLinecap="round" />
            <path ref={drawRef} fill="none" stroke="#FF9900" strokeWidth="6" strokeLinecap="round" />
          </svg>
          <div ref={pawRef} aria-hidden className="pointer-events-none absolute top-0 left-0 z-20 will-change-transform">
            <span className="border-hard grid size-12 place-items-center rounded-full bg-sun shadow-hard-sm">
              <PawIcon className="size-6 text-ink" />
            </span>
          </div>

          <ol className="relative flex flex-col gap-14 md:gap-24">
            {steps.map((s, i) => {
              const Icon = icons[i];
              const right = i % 2 === 1;
              return (
                <li key={s.title} className="relative grid grid-cols-[3.5rem_1fr] items-center gap-5 md:grid-cols-[1fr_6rem_1fr] md:gap-8">
                  <div
                    data-node
                    className={cn(
                      "group/node border-hard relative z-10 grid size-14 place-items-center rounded-full bg-white font-display text-xl font-extrabold text-ink transition-colors duration-300 md:col-start-2 md:size-20 md:text-2xl",
                      "[&.is-active]:bg-tangerine",
                    )}
                  >
                    {i + 1}
                  </div>
                  <Reveal
                    y={30}
                    className={cn("md:row-start-1", right ? "md:col-start-3" : "md:col-start-1 md:text-right")}
                  >
                    <div
                      className={cn(
                        "border-hard inline-flex w-full max-w-md flex-col gap-3 rounded-[1.75rem] bg-white p-6 text-left text-ink shadow-hard md:p-8",
                        !right && "md:ml-auto",
                      )}
                    >
                      <span className="grid size-12 place-items-center rounded-2xl bg-sun">
                        <Icon className="size-6" strokeWidth={2.2} aria-hidden />
                      </span>
                      <h3 className="text-2xl font-extrabold md:text-3xl">{s.title}</h3>
                      <p className="text-charcoal">{s.body}</p>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal className="mt-16 flex justify-center md:mt-24">
          <QuoteButton size="lg" magnetic>
            Start with step one
          </QuoteButton>
        </Reveal>
      </div>
    </Section>
  );
}
