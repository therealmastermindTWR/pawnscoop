"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Phone } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { locations, nav, site } from "@/lib/content";
import { cn } from "@/lib/utils";
import { MobileMenu } from "./MobileMenu";

type DropItem = { label: string; href: string; blurb?: string };

function Dropdown({ label, items, footer }: { label: string; items: DropItem[]; footer?: DropItem }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const pathname = usePathname();
  const id = `dd-${label.toLowerCase().replace(/\s+/g, "-")}`;

  useEffect(() => setOpen(false), [pathname]);

  return (
    <li
      ref={ref}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          ref.current?.querySelector("button")?.focus();
        }
      }}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-full px-3.5 py-2 font-semibold transition-colors hover:bg-sun"
      >
        {label}
        <ChevronDown className={cn("size-4 transition-transform duration-300", open && "rotate-180")} aria-hidden />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id={id}
            initial={{ opacity: 0, y: 10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute top-full left-0 origin-top-left pt-3"
          >
            <ul className="border-hard w-72 rounded-3xl bg-white p-2 shadow-hard">
              {items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="group flex flex-col rounded-2xl px-4 py-3 transition-colors hover:bg-sun-100 focus-visible:bg-sun-100">
                    <span className="font-display text-lg font-bold tracking-tight">{item.label}</span>
                    {item.blurb && <span className="text-sm text-charcoal">{item.blurb}</span>}
                  </Link>
                </li>
              ))}
              {footer && (
                <li className="mt-1 border-t-2 border-dashed border-ink/15 pt-1">
                  <Link href={footer.href} className="flex items-center justify-between rounded-2xl px-4 py-3 font-semibold text-ink hover:bg-sun">
                    {footer.label} <span aria-hidden>→</span>
                  </Link>
                </li>
              )}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    if (Math.abs(y - prev) < 4) return;
    setHidden(y > prev && y > 280);
  });

  const locationItems = locations.slice(0, 6).map((l) => ({ label: l.city, href: `/locations#${l.slug}` }));

  return (
    <>
      <motion.header
        className="sticky top-0 z-[60]"
        animate={{ y: hidden && !menuOpen ? "-120%" : "0%" }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={cn("transition-[padding] duration-500 ease-out-expo", scrolled ? "px-2 pt-2 sm:px-4 sm:pt-3" : "px-0 pt-0")}>
          <div
            className={cn(
              "mx-auto flex items-center justify-between gap-4 transition-all duration-500 ease-out-expo",
              scrolled
                ? "border-hard h-16 max-w-[1400px] rounded-full bg-white/80 px-3 pl-5 text-ink shadow-hard-sm backdrop-blur-xl backdrop-saturate-150"
                : "h-20 max-w-[1440px] border-[2.5px] border-transparent bg-white px-4 text-ink sm:px-6 lg:px-10",
            )}
          >
            <Logo priority className={cn("transition-[height] duration-500", scrolled ? "h-12" : "h-16")} />

            <nav aria-label="Main" className="hidden lg:block">
              <ul className="flex items-center gap-0.5 text-[15px]">
                <Dropdown label="Services" items={[...nav.services, nav.commercial]} footer={{ label: "All services", href: "/services" }} />
                <Dropdown label="Service Areas" items={locationItems} footer={{ label: "All service areas", href: "/locations" }} />
                {nav.main.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="rounded-full px-3.5 py-2 font-semibold transition-colors hover:bg-sun">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <a href={site.phoneHref} className="hidden items-center gap-2 rounded-full px-3 py-2 font-semibold hover:bg-sun xl:flex">
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
              <div className="hidden sm:block">
                <QuoteButton size={scrolled ? "sm" : "md"} className="animate-glow" magnetic>
                  Free Quote
                </QuoteButton>
              </div>
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className="border-hard grid size-11 place-items-center rounded-full bg-sun lg:hidden"
              >
                <span className="flex w-5 flex-col gap-1.5" aria-hidden>
                  <span className="h-[2.5px] w-full rounded bg-ink" />
                  <span className="h-[2.5px] w-3/4 rounded bg-ink" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>
      <MobileMenu open={menuOpen} onClose={closeMenu} />
    </>
  );
}
