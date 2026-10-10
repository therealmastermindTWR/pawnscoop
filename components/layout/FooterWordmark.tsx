"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * Giant outlined "PAW N SCOOP" that fills with yellow as the footer scrolls into view,
 * plus an orange wipe on hover.
 */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          "[data-fill]",
          { clipPath: "inset(0 100% 0 0)" },
          {
            clipPath: "inset(0 0% 0 0)",
            ease: "none",
            scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom bottom", scrub: 0.6 },
          },
        );
      });
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set("[data-fill]", { clipPath: "inset(0 0% 0 0)" });
      });
    },
    { scope: ref },
  );

  const word = "PAW N SCOOP";
  const cls = "block text-center font-display text-[13.4vw] leading-[0.85] font-extrabold tracking-[-0.04em] whitespace-nowrap select-none";

  return (
    <div ref={ref} className="group relative overflow-hidden pt-4 pb-6" aria-hidden>
      <span className={`${cls} text-outline text-sun/70`} style={{ WebkitTextStrokeWidth: "clamp(1px, 0.18vw, 3px)" }}>
        {word}
      </span>
      <span data-fill className={`${cls} absolute inset-x-0 top-4 text-sun`} style={{ clipPath: "inset(0 100% 0 0)" }}>
        {word}
      </span>
      <span
        className={`${cls} absolute inset-x-0 top-4 text-tangerine transition-[clip-path] duration-700 ease-out-expo [clip-path:inset(0_100%_0_0)] group-hover:[clip-path:inset(0_0%_0_0)]`}
      >
        {word}
      </span>
    </div>
  );
}
