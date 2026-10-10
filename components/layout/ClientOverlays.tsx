"use client";

import dynamic from "next/dynamic";

const CustomCursor = dynamic(() => import("./CustomCursor"), { ssr: false });

/** Client-only, non-critical overlays loaded after hydration. */
export function ClientOverlays() {
  return <CustomCursor />;
}
