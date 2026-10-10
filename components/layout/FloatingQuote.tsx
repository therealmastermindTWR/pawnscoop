"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { PawIcon } from "@/components/ui/Icons";
import { site } from "@/lib/content";

/** Mobile-only floating "Free Quote" button that appears after the hero. Opens the Jobber request form. */
export function FloatingQuote() {
  const { scrollY } = useScroll();
  const [show, setShow] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => setShow(y > 640));

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="border-hard fixed right-4 bottom-4 z-[80] flex h-14 items-center gap-2 rounded-full bg-tangerine pr-6 pl-2 font-display text-lg font-bold text-ink shadow-hard md:hidden"
          style={{ marginBottom: "env(safe-area-inset-bottom)" }}
        >
          <span className="grid size-10 place-items-center rounded-full bg-ink text-sun">
            <PawIcon className="size-5" />
          </span>
          Free Quote
          <span className="sr-only"> (opens in a new tab)</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
