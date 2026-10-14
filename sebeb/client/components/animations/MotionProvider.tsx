"use client";

import { type ReactNode } from "react";
import { useReducedMotion } from "motion/react";

export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function usePrefersReducedMotion() {
  return useReducedMotion();
}
