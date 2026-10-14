"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export function Reveal({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.3,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
