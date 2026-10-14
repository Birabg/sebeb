"use client";

import { type HTMLAttributes, type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export type MotionProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  viewport?: boolean;
};

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  once = true,
  amount = 0.3,
  viewport = true,
}: MotionProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={viewport ? "visible" : undefined}
      animate={viewport ? undefined : "visible"}
      variants={fadeUpVariants}
      transition={{ delay, duration }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function Fade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  once = true,
  amount = 0.3,
  viewport = true,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={viewport ? "visible" : undefined}
      animate={viewport ? undefined : "visible"}
      variants={fadeVariants}
      transition={{ delay, duration }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

const scaleFadeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function ScaleFade({
  children,
  className,
  delay = 0,
  duration = 0.4,
  once = true,
  amount = 0.25,
  viewport = true,
}: MotionProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={viewport ? "visible" : undefined}
      animate={viewport ? undefined : "visible"}
      variants={scaleFadeVariants}
      transition={{ delay, duration }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
