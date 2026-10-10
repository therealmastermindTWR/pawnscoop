import type { ComponentPropsWithRef } from "react";
import type { Theme } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = ComponentPropsWithRef<"section"> & { theme: Theme };

/** A page section that participates in the scroll-driven color shifts (see ColorShift). */
export function Section({ theme, className, children, ...rest }: Props) {
  return (
    <section data-theme={theme} className={cn(`theme-${theme} relative`, className)} {...rest}>
      {children}
    </section>
  );
}
