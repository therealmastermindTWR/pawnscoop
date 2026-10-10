import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { site } from "@/lib/content";
import { Button } from "./Button";

type Props = {
  children?: ReactNode;
  variant?: "primary" | "dark" | "light" | "outline" | "sun";
  size?: "sm" | "md" | "lg";
  magnetic?: boolean;
  className?: string;
  icon?: ReactNode;
  onClick?: () => void;
};

/** Any "Free Quote" / booking CTA. Opens the Jobber request form (site.bookingUrl) in a new tab. */
export function QuoteButton({ children = "Get Free Quote", icon, ...rest }: Props) {
  return (
    <Button
      href={site.bookingUrl}
      target="_blank"
      rel="noopener noreferrer"
      cursorLabel="Book"
      icon={icon ?? <ArrowUpRight className="size-5" aria-hidden />}
      {...rest}
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </Button>
  );
}
