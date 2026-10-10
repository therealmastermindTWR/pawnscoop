import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PawIcon } from "./Icons";
import { Reveal } from "./Reveal";
import { SplitText } from "./SplitText";

type Props = {
  eyebrow?: string;
  title: string | string[];
  sub?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2";
  id?: string;
};

export function SectionHeading({ eyebrow, title, sub, align = "left", className, titleClassName, as = "h2", id }: Props) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <div className={cn("flex flex-col gap-5", align === "center" && "items-center text-center", className)}>
      {eyebrow && (
        <Reveal y={16}>
          <p className="eyebrow inline-flex items-center gap-2 rounded-full border-2 border-current px-3 py-1.5">
            <PawIcon className="size-3.5" /> {eyebrow}
          </p>
        </Reveal>
      )}
      <SplitText as={as} id={id} lines={lines} className={cn("text-[clamp(2.4rem,6.2vw,5.4rem)] font-extrabold", titleClassName)} />
      {sub && (
        <Reveal delay={0.2} y={20} className={cn("text-muted max-w-2xl text-lg md:text-xl", align === "center" && "mx-auto")}>
          {sub}
        </Reveal>
      )}
    </div>
  );
}
