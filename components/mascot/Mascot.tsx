import Image from "next/image";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The official Paw N Scoop mascot: the royal black schnauzer puppy (/public/mascot.webp,
 * transparent, 993×1258). Each "pose" is the same artwork with its own idle animation
 * (see .mascot-* in globals.css; all disabled under prefers-reduced-motion).
 *
 * Sizing: pass width/height utilities in `className` (e.g. "h-40" or "w-full"). The wrapper
 * keeps the artwork's aspect ratio, so setting one dimension is enough.
 */

export type MascotPose = "waving" | "sniffing" | "scooper" | "laptop" | "celebrating" | "peeking";

const W = 993;
const H = 1258;
const PEEK = 0.5; // "peeking" shows the top half (crown, face, raised paw)

const motionByPose: Record<MascotPose, string> = {
  waving: "mascot-sway",
  celebrating: "mascot-hop",
  sniffing: "mascot-tilt",
  scooper: "mascot-float",
  laptop: "mascot-float",
  peeking: "mascot-tilt",
};

type Props = {
  pose?: MascotPose;
  title?: string;
  className?: string;
  /** Eager-load (use for the hero / above-the-fold placements). */
  priority?: boolean;
  sizes?: string;
  animated?: boolean;
  "aria-hidden"?: boolean;
  style?: CSSProperties;
};

const CONFETTI = [
  { l: "4%", t: "12%", c: "bg-tangerine", r: 20 },
  { l: "88%", t: "8%", c: "bg-sun", r: -30 },
  { l: "2%", t: "48%", c: "bg-sun", r: 45 },
  { l: "92%", t: "42%", c: "bg-tangerine", r: 10 },
  { l: "18%", t: "-2%", c: "bg-white", r: 60 },
  { l: "74%", t: "-4%", c: "bg-tangerine", r: -15 },
];

export function Mascot({ pose = "waving", title, className, priority, sizes = "(min-width: 1024px) 40vw, 80vw", animated = true, style, ...rest }: Props) {
  const hidden = rest["aria-hidden"];
  const label = title ?? "Paw N Scoop's royal schnauzer mascot";
  const peek = pose === "peeking";

  return (
    <span
      className={cn("mascot", className)}
      style={{ aspectRatio: `${W} / ${peek ? Math.round(H * PEEK) : H}`, ...style }}
      role={hidden ? undefined : "img"}
      aria-label={hidden ? undefined : label}
      aria-hidden={hidden}
    >
      <span className={cn("absolute inset-0 block", animated && motionByPose[pose])}>
        <Image
          src="/mascot.webp"
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className={cn("pointer-events-none select-none", peek ? "object-cover object-top" : "object-contain")}
          draggable={false}
        />
      </span>
      {pose === "celebrating" &&
        CONFETTI.map((p, i) => (
          <span
            key={i}
            aria-hidden
            className={cn("mascot-confetti absolute h-[3%] w-[6%] rounded-sm border-2 border-ink", p.c)}
            style={{ left: p.l, top: p.t, rotate: `${p.r}deg`, animationDelay: `${i * -0.4}s` }}
          />
        ))}
    </span>
  );
}
