"use client";

import type { ReactNode } from "react";
import { IntroProvider } from "./IntroProvider";
import { PageTransition } from "./PageTransition";
import { SmoothScroll } from "./SmoothScroll";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <IntroProvider>
        <ToastProvider>
          <PageTransition>{children}</PageTransition>
        </ToastProvider>
      </IntroProvider>
    </SmoothScroll>
  );
}
