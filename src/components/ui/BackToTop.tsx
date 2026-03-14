"use client";

import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

/**
 * Premium BackToTop Component
 * Designed with a 'top 0.1% designer' aesthetic.
 * Features:
 * - Magnetic attraction on hover
 * - High-precision scroll progress ring
 * - Ultra-minimalist blur-focused design
 * - Smooth cinematic entrance/exit
 */
export default function BackToTop() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  // Magnetic state for micro-animations
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  // Smooth spring for the scroll progress circle
  const progress = useSpring(scrollYProgress, {
    stiffness: 40,
    damping: 15,
    restDelta: 0.001
  });

  const handleScroll = useCallback(() => {
    // Reveal button after 500px of scrolling
    if (window.scrollY > 500) {
      if (!isVisible) setIsVisible(true);
    } else {
      if (isVisible) setIsVisible(false);
    }
  }, [isVisible]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Magnetic intensity - moves button slightly towards the cursor
    const distance = 0.3;
    setMagneticPos({
      x: (clientX - centerX) * distance,
      y: (clientY - centerY) * distance
    });
  };

  const onMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 40 }}
          transition={{ 
            duration: 0.8, 
            ease: [0.16, 1, 0.3, 1],
            opacity: { duration: 0.4 }
          }}
          className="fixed bottom-10 right-10 md:bottom-16 md:right-16 z-[9999]"
        >
          <motion.button
            ref={buttonRef}
            onClick={scrollToTop}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            animate={{ x: magneticPos.x, y: magneticPos.y }}
            transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.5 }}
            className="group relative w-16 h-16 flex items-center justify-center rounded-full pointer-events-auto"
            whileTap={{ scale: 0.95 }}
          >
            {/* Glass Background with subtle glow */}
            <div className="absolute inset-0 rounded-full bg-black/40 backdrop-blur-2xl border border-white/10 group-hover:bg-black/60 group-hover:border-white/20 transition-all duration-500 shadow-2xl" />
            
            {/* Inner Glow Shadow (hover) */}
            <motion.div 
               className="absolute inset-0 rounded-full bg-apple-blue/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" 
            />

            {/* Scroll Progress Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 p-1">
              <circle
                cx="50%"
                cy="50%"
                r="44%"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="50%"
                cy="50%"
                r="44%"
                fill="none"
                stroke="var(--apple-blue)"
                strokeWidth="1.5"
                style={{ 
                  pathLength: progress,
                  filter: "drop-shadow(0 0 4px var(--apple-blue))"
                }}
                strokeLinecap="round"
              />
            </svg>

            {/* Iconic Arrow with Micro-animation */}
            <motion.div
               animate={{ y: magneticPos.y * 0.2 }}
               className="relative z-10 flex flex-col items-center"
            >
              <ArrowUp 
                className="w-6 h-6 text-white/70 group-hover:text-white transition-colors duration-300" 
                strokeWidth={1.5} 
              />
              
              {/* Optional minimal label that reveals on hover */}
              <motion.span 
                className="absolute -top-12 text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 opacity-0 group-hover:opacity-100 group-hover:-translate-y-1 transition-all duration-500 pointer-events-none"
              >
                Top
              </motion.span>
            </motion.div>

            {/* Magnetic Outer Reach (Invisible hit area for mouse move) */}
            <div className="absolute inset-[-20px] rounded-full pointer-events-auto -z-10" />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
