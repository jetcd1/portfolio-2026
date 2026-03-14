"use client";

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

interface TiltParallaxMediaProps {
  children: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  delayOffset?: number; // Used for staggered reveal
  noPadding?: boolean;  // Set true to skip the studio backdrop framing
}

export default function TiltParallaxMedia({ children, title, description, delayOffset = 0, noPadding = false }: TiltParallaxMediaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // --- Parallax Logic ---
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  // Slower, subtle movement applied to the entire block instead of just the image
  const yParallax = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  // --- 3D Hover Tilt Logic ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer spring config for a premium glass feel
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / rect.width);
    y.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={containerRef}
      className="w-full flex gap-10 md:gap-14 flex-col items-center justify-center font-sans perspective-1200"
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: delayOffset }}
      style={{ y: yParallax }}
    >
      {/* Title & Description Section */}
      {(title || description) && (
        <div className="max-w-4xl mx-auto text-center w-full px-4 flex flex-col gap-6">
          {title && <div className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight">{title}</div>}
          {description && <div className="text-lg md:text-xl text-muted leading-relaxed font-light">{description}</div>}
        </div>
      )}

      {/* The 3D Interactive Presentation Canvas */}
      <motion.div 
        className={`relative w-full rounded-[2rem] md:rounded-[3rem] transition-shadow duration-500 transform-gpu overflow-hidden
          ${noPadding 
            ? 'bg-transparent shadow-2xl border border-border/50' 
            : 'bg-gradient-to-b from-foreground/[0.03] to-foreground/[0.08] dark:from-white/[0.02] dark:to-white/[0.08] border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_rgba(0,0,0,0.5)] p-6 md:p-16 lg:p-24'
          }
        `}
        style={{ rotateX, rotateY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className={`w-full h-full relative z-10 ${noPadding ? '' : 'rounded-xl md:rounded-2xl overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-black/5 dark:border-white/10 ring-1 ring-black/5 dark:ring-white/10'}`}>
          {children}
        </div>
        
        {/* Subtle ambient lighting blend gradient on the canvas floor */}
        {!noPadding && (
           <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/5 dark:from-white/[0.02] to-transparent pointer-events-none" />
        )}
      </motion.div>
    </motion.div>
  );
}
