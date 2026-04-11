import React, { useRef, useState } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface MagneticButtonProps {
  children: React.ReactElement;
  strength?: number;
}

export const MagneticButton = ({ children, strength = 20 }: MagneticButtonProps) => {
  const isTouchDevice = useMediaQuery("(max-width: 768px)");
  const ref = useRef<HTMLDivElement>(null);
  
  const [isHovered, setIsHovered] = useState(false);
  
  // Spring configurations for smooth magnetic return
  const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
  
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (scaled by strength)
    const distanceX = (clientX - centerX) / (width / 2);
    const distanceY = (clientY - centerY) / (height / 2);
    
    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) {
      setIsHovered(true);
    }
  };

  if (isTouchDevice) {
    return children;
  }

  // Instead of completely replacing the child, we clone it and wrap it in a motion.div
  // that controls the position, allowing any internal classes of the child button to remain intact.
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className="inline-block relative"
    >
      {children}
    </motion.div>
  );
};
