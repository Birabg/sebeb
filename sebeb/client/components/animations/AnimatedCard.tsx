"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

export default function AnimatedCard({
  children,
  className,
  lift = 4,
  scale = 1.01,
}: {
  children: ReactNode;
  className?: string;
  lift?: number;
  scale?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) {
    return <div className={className}>{children}</div>;
  }
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -lift,
        scale,
        transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] },
      }}
      whileTap={{ scale: 0.995 }}
    >
      {children}
    </motion.div>
  );
}
