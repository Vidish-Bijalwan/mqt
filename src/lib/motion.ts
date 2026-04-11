import { Variants } from "framer-motion";

// Global premium easings
export const EASE_OUT_UP = [0.16, 1, 0.3, 1];
export const EASE_SMOOTH = [0.4, 0, 0.2, 1];

export const defaultTransition = {
  duration: 0.6,
  ease: EASE_OUT_UP,
};

export const slowTransition = {
  duration: 0.8,
  ease: EASE_OUT_UP,
};

// Fade up (Y translate)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: defaultTransition 
  },
};

export const fadeUpSmall: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: defaultTransition 
  },
};

// Fade In
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.4, ease: EASE_SMOOTH } 
  },
};

// Scale In
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: defaultTransition 
  },
};

// Staggered Container
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Staggered Item (Use inside staggerContainer)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, ease: EASE_OUT_UP } 
  },
};

// Hover Lift for cards
export const hoverLift = {
  rest: { y: 0, scale: 1, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)" },
  hover: { 
    y: -6, 
    scale: 1.01, 
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: EASE_OUT_UP }
  },
};
