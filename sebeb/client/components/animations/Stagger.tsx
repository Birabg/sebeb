"use client";

import { type ReactNode } from "react";
import { motion, type Variants } from "motion/react";

export type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  viewport?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function StaggerContainer({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.15,
  viewport = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
  amount?: number | "some" | "all";
  viewport?: boolean;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView={viewport ? "visible" : undefined}
      animate={viewport ? undefined : "visible"}
      variants={containerVariants}
      transition={{ delay }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  index = 0,
  delay = 0,
  once = true,
  amount = 0.2,
  viewport = false,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={itemVariants}
      transition={{ delay: delay + index * 0.08 }}
      viewport={{ once, amount }}
    >
      {children}
    </motion.div>
  );
}
