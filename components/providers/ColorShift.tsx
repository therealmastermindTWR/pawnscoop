"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * Section-based color shifts: every <section data-theme="white|yellow|black"> inside #main
 * becomes a ScrollTrigger. As a section crosses the middle of the viewport, #main's
 * background + text color transition to that section's theme.
 */
export function ColorShift() {
  const pathname = usePathname();

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;
    const sections = Array.from(main.querySelectorAll<HTMLElement>("[data-theme]"));
    if (!sections.length) return;

    const html = document.documentElement;
    html.classList.add("colorshift");
    main.dataset.pageTheme = sections[0].dataset.theme;

    const triggers = sections.map((section) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 50%",
        end: "bottom 50%",
        onToggle: (self) => {
          if (self.isActive) main.dataset.pageTheme = section.dataset.theme;
        },
      }),
    );

    return () => {
      triggers.forEach((t) => t.kill());
      html.classList.remove("colorshift");
    };
  }, [pathname]);

  return null;
}
