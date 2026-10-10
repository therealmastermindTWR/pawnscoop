"use client";

import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";
import { PawIcon } from "@/components/ui/Icons";

const INTERACTIVE = "a, button, [role='button'], label, select, summary, [data-cursor]";

/**
 * Paw-shaped cursor: scales up over links/buttons and morphs into a "Quote" pill over
 * elements with data-cursor. Only mounts on fine pointers; skipped for reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 900, damping: 50, mass: 0.3 });
  const sy = useSpring(y, { stiffness: 900, damping: 50, mass: 0.3 });

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches || rm.matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null;
      const interactive = t?.closest?.(INTERACTIVE);
      setHovering(!!interactive);
      setLabel(t?.closest?.("[data-cursor]")?.getAttribute("data-cursor") || null);
    };
    const leave = () => setVisible(false);

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-custom-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[500]"
      style={{ x: sx, y: sy, opacity: visible ? 1 : 0 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        {label ? (
          <motion.div
            key="label"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className="border-hard flex origin-top-left translate-x-3 translate-y-4 items-center gap-1.5 rounded-full bg-ink px-4 py-2 font-display text-sm font-bold whitespace-nowrap text-sun shadow-hard-sm"
          >
            <PawIcon className="size-4" /> {label}
          </motion.div>
        ) : (
          <motion.div
            key="paw"
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: hovering ? 1.7 : 1, opacity: 1, rotate: hovering ? -18 : 0 }}
            exit={{ scale: 0.3, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 26 }}
            className="-translate-x-1/2 -translate-y-1/2"
          >
            <PawIcon className="size-6 text-tangerine drop-shadow-[0_0_0.5px_#111]" stroke="#111" strokeWidth={4} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
