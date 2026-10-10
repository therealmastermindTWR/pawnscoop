"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Accordion({ items, className, defaultOpen = 0 }: { items: Item[]; className?: string; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const base = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const btnId = `${base}-b${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div
            key={item.q}
            className={cn(
              "border-hard overflow-hidden rounded-3xl text-ink transition-[box-shadow,background-color] duration-300",
              isOpen ? "bg-sun-100 shadow-hard" : "bg-white hover:shadow-hard-sm",
            )}
          >
            <h3 className="font-display text-lg leading-tight font-bold tracking-tight md:text-xl">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 rounded-3xl px-5 py-5 text-left md:px-7"
              >
                <span>{item.q}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 135 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full border-2 border-ink transition-colors",
                    isOpen ? "bg-ink text-sun" : "bg-sun text-ink",
                  )}
                >
                  <Plus className="size-5" aria-hidden />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="px-5 pb-6 text-base text-charcoal md:px-7 md:text-lg">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
