"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";

type IntroCtx = { ready: boolean; markReady: () => void };
const IntroContext = createContext<IntroCtx>({ ready: true, markReady: () => {} });

/** Tracks whether the branded preloader has finished, so the hero can time its reveal. */
export function IntroProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  return <IntroContext.Provider value={{ ready, markReady }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
