"use client";

import { AnimatePresence, motion } from "motion/react";
import { Sparkles, UserRound, X } from "lucide-react";
import { useState } from "react";
import { site } from "@/lib/content";

/** Dismissible promo bar. Dismissal persists (localStorage); an inline head script hides it before paint. */
export function AnnouncementBar() {
  const [open, setOpen] = useState(true);

  const dismiss = () => {
    setOpen(false);
    try {
      localStorage.setItem("pns-announce-dismissed", "1");
    } catch {}
  };

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          data-announcement
          className="relative z-[61] overflow-hidden bg-ink text-white"
          exit={{ height: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="container-x flex h-10 items-center justify-between gap-3 text-sm">
            <span className="hidden w-28 sm:block" aria-hidden />
            <a
              href={site.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Book"
              className="group flex min-w-0 items-center gap-2 font-semibold"
            >
              <Sparkles className="size-4 shrink-0 text-sun" aria-hidden />
              <span className="truncate">
                Claim your <span className="text-sun underline decoration-2 underline-offset-4 group-hover:text-tangerine">FREE first cleanup!</span>
              </span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <div className="flex shrink-0 items-center gap-3">
              <a href={site.clientLoginUrl} className="flex items-center gap-1.5 font-semibold text-white/90 hover:text-sun">
                <UserRound className="size-4" aria-hidden />
                <span className="hidden sm:inline">Client Login</span>
                <span className="sm:hidden">Login</span>
              </a>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss announcement"
                className="grid size-7 place-items-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="size-4" aria-hidden />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
