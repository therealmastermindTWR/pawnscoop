"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { Mascot } from "@/components/mascot/Mascot";
import { useScrollLock } from "@/components/providers/SmoothScroll";
import { site } from "@/lib/content";

export function VideoLightbox({ open, onClose }: { open: boolean; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        e.preventDefault();
        closeRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 sm:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="How Paw N Scoop works video"
        >
          <div className="absolute inset-0 bg-ink/85 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.div
            initial={{ scale: 0.85, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="border-hard relative aspect-video w-full max-w-5xl overflow-hidden rounded-[1.75rem] bg-sun shadow-hard-lg"
          >
            {site.videoUrl ? (
              <iframe
                src={`${site.videoUrl}${site.videoUrl.includes("?") ? "&" : "?"}autoplay=1`}
                title="How Paw N Scoop works"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            ) : (
              // TODO: set `site.videoUrl` in lib/content.ts to an embeddable YouTube/Vimeo URL.
              <div className="flex size-full flex-col items-center justify-center gap-3 p-6 text-center text-ink">
                <Mascot pose="laptop" className="h-[45%] w-auto" />
                <p className="font-display text-2xl font-extrabold sm:text-4xl">Our explainer video is in the edit bay.</p>
                <p className="text-sm sm:text-base">Placeholder: add your video URL in lib/content.ts</p>
              </div>
            )}
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close video"
              className="border-hard absolute top-3 right-3 grid size-11 place-items-center rounded-full bg-white text-ink transition-transform hover:rotate-90"
            >
              <X className="size-5" aria-hidden />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
