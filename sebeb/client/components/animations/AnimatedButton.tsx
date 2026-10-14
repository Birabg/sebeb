"use client";

import { type ReactNode, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { useReducedMotion } from "motion/react";

type Props = HTMLMotionProps<"button"> & {
  children: ReactNode;
  className?: string;
  scale?: number;
  shadow?: boolean;
};

const AnimatedButton = forwardRef<HTMLButtonElement, Props>(
  ({ children, className, scale = 1.02, shadow = true, ...rest }, ref) => {
    const reduce = useReducedMotion();
    if (reduce) {
      return (
        <button ref={ref} className={className} {...(rest as any)}>
          {children}
        </button>
      );
    }
    return (
      <motion.button
        ref={ref}
        className={className}
        whileHover={{
          scale,
          boxShadow: shadow ? "0 10px 30px -12px rgba(0, 0, 0, 0.3)" : undefined,
          y: -2,
        }}
        whileTap={{ scale: 0.98, y: 0 }}
        transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        {...rest}
      >
        {children}
      </motion.button>
    );
  }
);

AnimatedButton.displayName = "AnimatedButton";
export default AnimatedButton;
