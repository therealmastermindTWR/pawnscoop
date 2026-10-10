import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "dark" | "light" | "outline" | "sun";
type Size = "sm" | "md" | "lg";

type Common = {
  variant?: Variant;
  size?: Size;
  magnetic?: boolean;
  /** Label shown on the custom cursor while hovering (e.g. "Quote"). */
  cursorLabel?: string;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

type AsLink = Common & { href: string } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href">;
type AsButton = Common & { href?: undefined } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;
export type ButtonProps = AsLink | AsButton;

const variants: Record<Variant, { base: string; fill: string; hoverText?: string }> = {
  primary: { base: "bg-tangerine text-ink border-ink", fill: "bg-sun" },
  sun: { base: "bg-sun text-ink border-ink", fill: "bg-tangerine" },
  dark: { base: "bg-ink text-white border-ink", fill: "bg-tangerine", hoverText: "group-hover:text-ink" },
  light: { base: "bg-white text-ink border-ink", fill: "bg-sun" },
  outline: { base: "bg-transparent text-current border-current", fill: "bg-sun", hoverText: "group-hover:text-ink" },
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-sm",
  md: "h-12 px-6 text-base",
  lg: "h-14 px-7 text-lg",
};

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", magnetic, cursorLabel, icon, className, children, ...rest } = props;
  const v = variants[variant];
  const classes = cn(
    "group relative inline-flex select-none items-center justify-center gap-2 overflow-hidden rounded-full border-[2.5px] font-display font-bold tracking-tight whitespace-nowrap",
    "transition-[transform,box-shadow] duration-200 hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-hard-sm active:translate-x-0 active:translate-y-0 active:shadow-none",
    "disabled:pointer-events-none disabled:opacity-60",
    v.base,
    sizes[size],
    className,
  );
  const inner = (
    <>
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 translate-y-[101%] rounded-[inherit] transition-transform duration-500 ease-out-expo group-hover:translate-y-0",
          v.fill,
        )}
      />
      <span className={cn("relative z-10 flex items-center gap-2 transition-colors duration-300", v.hoverText)}>
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
    </>
  );

  let el: ReactNode;
  if (typeof rest.href === "string") {
    const { href, ...anchor } = rest as Omit<AsLink, keyof Common>;
    el = /^https?:\/\//.test(href) ? (
      <a href={href} className={classes} data-cursor={cursorLabel} {...anchor}>
        {inner}
      </a>
    ) : (
      <Link href={href} className={classes} data-cursor={cursorLabel} {...anchor}>
        {inner}
      </Link>
    );
  } else {
    const btn = rest as Omit<AsButton, keyof Common>;
    el = (
      <button type="button" className={classes} data-cursor={cursorLabel} {...btn}>
        {inner}
      </button>
    );
  }

  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}
