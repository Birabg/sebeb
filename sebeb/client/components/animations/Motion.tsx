"use client";

import { type ReactNode, forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";

type Props = HTMLMotionProps<"div"> & {
  children?: ReactNode;
};

const MotionDiv = forwardRef<HTMLDivElement, Props>(
  ({ children, ...rest }, ref) => {
    return (
      <motion.div ref={ref} {...rest}>
        {children}
      </motion.div>
    );
  }
);

MotionDiv.displayName = "MotionDiv";
export { MotionDiv };
