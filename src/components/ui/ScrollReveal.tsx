import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { fadeUpSmall } from "@/lib/motion";

interface ScrollRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variants?: Variants;
  delay?: number;
  once?: boolean;
}

export const ScrollReveal = ({ 
  children, 
  variants = fadeUpSmall, 
  delay = 0,
  once = true,
  className,
  ...props 
}: ScrollRevealProps) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-100px" }}
      transition={{ delay }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
