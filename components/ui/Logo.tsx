import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * Official Paw N Scoop logo (/public/logo.webp, transparent background, 1251×1100).
 * The untouched original upload is kept at /public/logo-original.webp.
 */
export function Logo({ className, priority, sizes = "96px" }: { className?: string; priority?: boolean; sizes?: string }) {
  return (
    <Link href="/" aria-label="Paw N Scoop home" className={cn("inline-flex shrink-0 items-center", className)}>
      <Image src="/logo.webp" alt="Paw N Scoop" width={1251} height={1100} sizes={sizes} priority={priority} className="h-full w-auto" />
    </Link>
  );
}
