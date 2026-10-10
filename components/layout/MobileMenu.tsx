"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { useScrollLock } from "@/components/providers/SmoothScroll";
import Image from "next/image";
import { socialIcons } from "@/components/ui/Icons";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { nav, site } from "@/lib/content";

const links = [
  { label: "Home", href: "/" },
  ...nav.services,
  { label: "Locations", href: "/locations" },
  ...nav.main,
  { label: "Contact", href: "/contact" },
];

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduce = useReducedMotion();
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const firstPath = useRef(pathname);
  useScrollLock(open);

  // Close when the route changes.
  useEffect(() => {
    if (pathname !== firstPath.current) {
      firstPath.current = pathname;
      onClose();
    }
  }, [pathname, onClose]);

  // Focus management + Escape + focus trap.
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const t = setTimeout(() => panel?.querySelector<HTMLElement>("a,button")?.focus(), 50);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel) {
        const els = Array.from(panel.querySelectorAll<HTMLElement>("a,button"));
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      prev?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-ink text-white"
          data-lenis-prevent
          initial={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          animate={reduce ? { opacity: 1 } : { clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
          exit={reduce ? { opacity: 0 } : { clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="container-x flex h-20 shrink-0 items-center justify-between">
            <Image src="/logo.webp" alt="Paw N Scoop" width={1251} height={1100} sizes="72px" className="h-16 w-auto" />
            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="grid size-11 place-items-center rounded-full border-2 border-white/80 transition-colors hover:bg-sun hover:text-ink"
            >
              <X className="size-5" aria-hidden />
            </button>
          </div>

          <nav aria-label="Mobile" className="container-x flex-1 py-6">
            <ul className="flex flex-col">
              {links.map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: reduce ? 0 : 0.25 + i * 0.05 }}
                  >
                    <Link
                      href={l.href}
                      aria-current={pathname === l.href ? "page" : undefined}
                      className="group flex items-baseline gap-3 py-1.5 font-display text-[clamp(2rem,9vw,3.5rem)] leading-[1.05] font-extrabold tracking-tight text-white transition-colors hover:text-sun aria-[current=page]:text-sun"
                    >
                      <span className="w-8 font-sans text-sm font-semibold text-white/50 tabular-nums">0{i + 1}</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-2">{l.label}</span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            className="container-x flex shrink-0 flex-col gap-5 pt-4 pb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: reduce ? 0 : 0.6 }}
          >
            <QuoteButton size="lg" className="w-full" onClick={onClose}>
              Get Free Quote
            </QuoteButton>
            <div className="flex items-center justify-between">
              <a href={site.phoneHref} className="flex items-center gap-2 font-semibold hover:text-sun">
                <Phone className="size-4" aria-hidden /> {site.phone}
              </a>
              <div className="flex gap-2">
                {site.social.map((s) => {
                  const Icon = socialIcons[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="grid size-10 place-items-center rounded-full border-2 border-white/30 hover:border-sun hover:text-sun"
                    >
                      <Icon className="size-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
