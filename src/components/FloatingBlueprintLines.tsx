import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// Decorative blueprint overlay that drifts subtly and follows scroll for depth.
type FloatingBlueprintLinesProps = {
  className?: string;
  opacity?: number;
};

const FloatingBlueprintLines = ({ className = "", opacity = 0.08 }: FloatingBlueprintLinesProps) => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
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

  // Gentle parallax; dialed down on mobile and removed entirely if user prefers reduced motion.
  const yParallax = useTransform(scrollY, [0, 800], [0, prefersReducedMotion ? 0 : isMobile ? 12 : 24]);
  const driftAnimation = prefersReducedMotion
    ? {}
    : {
        animate: { y: [0, -10, 0] },
        transition: { duration: 8, repeat: Infinity, ease: [0.42, 0, 0.58, 1] as any },
      };

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ y: yParallax, opacity: isMobile ? opacity * 0.7 : opacity }}
      {...driftAnimation}
    >
      {/* Simple blueprint-style grid and curves for subtle engineering texture */}
      <svg width="100%" height="100%" preserveAspectRatio="xMidYMid slice">
        <defs>
          <pattern id="grid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M 120 0 L 0 0 0 120" fill="none" stroke="rgba(109, 178, 255, 0.2)" strokeWidth="1" />
            <path d="M 60 0 L 60 120 M 0 60 L 120 60" fill="none" stroke="rgba(109, 178, 255, 0.15)" strokeWidth="0.75" />
          </pattern>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="100%" stopColor="rgba(10,26,47,0.05)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        <path
          d="M 10 200 Q 240 80 520 180 T 1200 220"
          fill="none"
          stroke="rgba(80, 160, 255, 0.25)"
          strokeWidth="1.2"
        />
        <path
          d="M 80 320 Q 360 260 640 320 T 1240 320"
          fill="none"
          stroke="rgba(80, 160, 255, 0.18)"
          strokeWidth="1"
        />
        <rect width="100%" height="100%" fill="url(#fade)" />
      </svg>
    </motion.div>
  );
};

export default FloatingBlueprintLines;
