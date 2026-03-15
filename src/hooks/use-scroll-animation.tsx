import { useEffect, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Shared scroll-in animation wrapper that respects reduced-motion and mobile ergonomics.
type ScrollAnimationWrapperProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export const ScrollAnimationWrapper = ({ children, className = "", delay = 0 }: ScrollAnimationWrapperProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.matchMedia("(max-width: 640px)").matches : false,
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 640px)");
    const handleResize = () => setIsMobile(mediaQuery.matches);

    handleResize();
    mediaQuery.addEventListener("change", handleResize);

    return () => mediaQuery.removeEventListener("change", handleResize);
  }, []);

  // Softer translate on mobile and no movement when user prefers reduced motion.
  const yOffset = prefersReducedMotion ? 0 : isMobile ? 12 : 20;
  const transitionDuration = prefersReducedMotion ? 0.001 : 0.5;
  const transitionDelay = 0.1 + delay / 1000;

  return (
    <motion.div
      className={`will-change-transform ${className}`}
      initial={{ opacity: 0, y: yOffset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: transitionDuration, delay: transitionDelay }}
    >
      {children}
    </motion.div>
  );
};
