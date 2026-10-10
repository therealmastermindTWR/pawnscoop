"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { PawIcon } from "@/components/ui/Icons";
import { ScrollTrigger } from "@/lib/gsap";
import { useLenis } from "./SmoothScroll";

type Phase = "idle" | "cover" | "reveal";
const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * Curtain-wipe route transitions. Same-origin <a> clicks are intercepted (capture phase, so
 * next/link sees defaultPrevented and stands down), the yellow/orange curtain covers the
 * screen, we navigate, and the curtain lifts once the new route has rendered.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const reduce = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const pending = useRef<string | null>(null);
  const navigating = useRef(false);
  const lastPath = useRef(pathname);

  /** Jump (no animation) to the top of the new page, or to the #hash target if the link had one. */
  const settle = useCallback(() => {
    const hash = window.location.hash;
    const target = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
    const y = target ? Math.max(0, target.getBoundingClientRect().top + window.scrollY - 110) : 0;
    lenis?.scrollTo(y, { immediate: true, force: true });
    window.scrollTo(0, y);
  }, [lenis]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a");
      if (!a || !a.href || a.target === "_blank" || a.hasAttribute("download") || "noTransition" in a.dataset) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      e.preventDefault();
      const href = url.pathname + url.search + url.hash;
      if (reduce) {
        router.push(href);
        return;
      }
      pending.current = href;
      navigating.current = true;
      // Freeze scrolling for the whole transition so leftover wheel/trackpad momentum
      // can't scroll the new page away from the top.
      lenis?.stop();
      router.prefetch(url.pathname);
      setPhase("cover");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, reduce, lenis]);

  // New route rendered → jump to the top (or #hash) and lift the curtain.
  // Back/forward navigation is left alone so the browser can restore the previous position.
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (!navigating.current) return;
    settle();
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
      settle();
    });
    setPhase((p) => (p === "cover" ? "reveal" : p));
  }, [pathname, settle]);

  const onCovered = () => {
    if (phase === "cover" && pending.current) {
      router.push(pending.current, { scroll: false });
      pending.current = null;
      // Safety net: never leave the curtain (or a frozen page) up if navigation stalls.
      window.setTimeout(() => setPhase((p) => (p === "cover" ? "reveal" : p)), 8000);
    }
  };

  const onRevealed = () => {
    settle();
    navigating.current = false;
    lenis?.start();
    setPhase("idle");
  };

  return (
    <>
      {children}
      <AnimatePresence>
        {phase !== "idle" && (
          <div className="pointer-events-auto fixed inset-0 z-[200]" aria-hidden key="curtain">
            <motion.div
              className="absolute inset-0 bg-sun"
              initial={{ y: "100%" }}
              animate={{ y: phase === "cover" ? "0%" : "-100%" }}
              transition={{ duration: 0.55, ease: EASE, delay: phase === "reveal" ? 0.12 : 0 }}
            />
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-tangerine"
              initial={{ y: "100%" }}
              animate={{ y: phase === "cover" ? "0%" : "-100%" }}
              transition={{ duration: 0.55, ease: EASE, delay: phase === "cover" ? 0.1 : 0 }}
              onAnimationComplete={() => (phase === "cover" ? onCovered() : onRevealed())}
            >
              <motion.div
                initial={{ scale: 0.4, rotate: -30, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.25 }}
              >
                <PawIcon className="size-20 text-ink" />
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
