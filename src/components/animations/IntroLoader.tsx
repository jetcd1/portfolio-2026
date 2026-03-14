"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIntro } from "@/components/providers/IntroProvider";
import { useRouter, usePathname } from "next/navigation";

export default function IntroLoader() {
  const { isIntroDone, setIsIntroDone } = useIntro();
  const [showIntro, setShowIntro] = useState(!isIntroDone);
  const [phase, setPhase] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If intro has already been seen this session, skip entirely
    if (isIntroDone) {
      setShowIntro(false);
      return;
    }

    // Force route to home if not already there, so Intro always reveals the Home Hero
    if (pathname !== "/") {
      router.replace("/");
    }

    // Force scroll to top on mount
    window.scrollTo(0, 0);

    // Media Art Animation Sequence
    // Phase 0: Burst & Geometric expansion (0-1.2s)
    const t1 = setTimeout(() => setPhase(1), 1200);
    
    // Phase 1: Typography Focus (1.2-3s)
    const t2 = setTimeout(() => setPhase(2), 3000);
    
    // Phase 2: Dissolve & Reveal Hero (3-4.5s)
    const t3 = setTimeout(() => {
      setShowIntro(false);
      setIsIntroDone(true);
    }, 4500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [isIntroDone, setIsIntroDone]);

  if (!showIntro) return null;

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
           className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
           initial={{ opacity: 1 }}
           exit={{ opacity: 0, filter: "blur(20px)" }}
           transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Background Ambient Noise */}
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
          />

          {/* Phase 0: Geometric Grid & Expanding Circles */}
          <AnimatePresence>
            {phase === 0 && (
              <motion.div 
                className="absolute inset-0 flex items-center justify-center pointer-events-none mix-blend-difference"
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute border border-foreground/30 rounded-full"
                    initial={{ width: 0, height: 0, opacity: 1 }}
                    animate={{ width: `${(i + 1) * 30}vw`, height: `${(i + 1) * 30}vw`, opacity: 0 }}
                    transition={{ duration: 1.5, delay: i * 0.1, ease: "easeOut" }}
                  />
                ))}
                
                {/* Horizontal / Vertical slicing lines */}
                <motion.div 
                  className="absolute w-full h-[1px] bg-foreground/40"
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, ease: "circOut" }}
                />
                <motion.div 
                  className="absolute h-full w-[1px] bg-foreground/40"
                  initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 0.8, ease: "circOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Phase 1 & 2: Dynamic Typography */}
          {phase >= 1 && (
            <motion.div 
              className="relative z-10 flex flex-col items-center justify-center w-full"
              initial={{ opacity: 0, scale: 0.8, filter: "blur(30px)" }}
              animate={phase === 1 
                ? { opacity: 1, scale: 1, filter: "blur(0px)", letterSpacing: "0.02em" } 
                : { 
                    opacity: 0, 
                    scale: 1.8, 
                    filter: "blur(100px) brightness(4) contrast(1.2)", 
                    letterSpacing: "1.5em",
                  }
              }
              transition={{ 
                duration: phase === 1 ? 1.2 : 2.5, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <div className="overflow-hidden mb-6 relative z-20">
                <motion.h1 
                  className="text-[12vw] md:text-[8vw] font-display font-semibold text-foreground tracking-[0.02em] leading-none mix-blend-difference"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                  style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
                >
                  CHAN <span className="font-light">JEON</span>
                </motion.h1>
              </div>

              <div className="overflow-hidden relative z-20">
                <motion.p 
                  className="text-sm md:text-xl text-muted/60 uppercase tracking-[0.6em] font-sans font-medium"
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                >
                  UI | UX Visual Designer
                </motion.p>
              </div>

              {/* Dynamic Shatter / Flash Ending Effect */}
              {phase === 2 && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[150vw] h-[150vh] pointer-events-none -z-10"
                >
                  {/* Central brilliant flash */}
                  <motion.div
                    className="absolute bg-foreground rounded-full blur-[80px] md:blur-[120px]"
                    initial={{ width: 0, height: 0, opacity: 0 }}
                    animate={{ width: "80vw", height: "80vw", opacity: [0, 1, 0] }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  />
                  {/* High-speed horizontal streaks */}
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={`streak-${i}`}
                      className="absolute h-[2px] bg-foreground/80 md:bg-foreground shadow-[0_0_20px_rgba(255,255,255,0.8)]"
                      style={{ top: `${45 + Math.random() * 10}%` }}
                      initial={{ width: 0, scaleX: 0, opacity: 1 }}
                      animate={{ width: "150vw", scaleX: 1, opacity: 0, x: i % 2 === 0 ? "50%" : "-50%" }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease: "circIn" }}
                    />
                  ))}
                  {/* Burst ring */}
                  <motion.div
                    className="absolute border-[2px] border-foreground/50 rounded-full"
                    initial={{ width: "10vw", height: "10vw", opacity: 1 }}
                    animate={{ width: "120vw", height: "120vw", opacity: 0, borderWidth: "10px" }}
                    transition={{ duration: 0.9, ease: "easeOut" }}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Skip Button - Minimalist */}
          <button 
            onClick={() => {
              setShowIntro(false);
              setIsIntroDone(true);
            }}
            className="absolute bottom-12 right-12 text-[10px] tracking-widest uppercase text-muted/40 hover:text-muted transition-colors opacity-0 animate-[fadeIn_0.5s_ease-in_forwards] z-[120]"
            style={{ animationDelay: '1s' }}
          >
            Skip Intro
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
