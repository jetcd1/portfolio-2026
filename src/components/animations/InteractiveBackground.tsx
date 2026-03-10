"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function InteractiveBackground() {
  const [mounted, setMounted] = useState(false);
  const springConfig = { damping: 25, stiffness: 120, mass: 1 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX - 300); // Center the 600px orb
      cursorY.set(e.clientY - 300);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background transition-colors duration-500">
      {/* Dynamic Mouse Follower Orb */}
      <motion.div
        className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 dark:opacity-20 mix-blend-normal dark:mix-blend-screen"
        style={{
          x: cursorX,
          y: cursorY,
          background: "radial-gradient(circle, var(--foreground) 0%, transparent 60%)",
        }}
      />
      {/* Noise overlay for Apple-like texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]" 
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />
    </div>
  );
}
