"use client";

/**
 * HeroField — Premium spatial energy interaction system
 *
 * Architecture (3 independent depth layers):
 * 1. Static noise grain + ambient tinted haze (deep background)
 * 2. Slow-breathing ambient pulse (mid)
 * 3. Cursor-responsive multi-layer light field (foreground)
 *
 * All cursor tracking uses direct DOM manipulation → zero React re-renders
 * Spring physics handled by framer-motion useSpring for smoothness.
 */

import { useEffect, useRef, useState } from "react";
import { useSpring } from "framer-motion";

export default function HeroField() {
  const [mounted, setMounted] = useState(false);

  // Direct DOM refs for zero-rerender cursor response
  const primaryRef   = useRef<HTMLDivElement>(null);
  const secondaryRef  = useRef<HTMLDivElement>(null);
  const tertiaryRef   = useRef<HTMLDivElement>(null);
  const coronaRef     = useRef<HTMLDivElement>(null);
  const gridRef       = useRef<HTMLDivElement>(null);

  // Spring-smoothed cursor position (raw values, updated imperatively)
  const rawX = useRef(0);
  const rawY = useRef(0);
  const smoothX = useSpring(0, { stiffness: 55, damping: 18, mass: 1.2 });
  const smoothY = useSpring(0, { stiffness: 55, damping: 18, mass: 1.2 });
  // Faster spring for corona (tighter follow)
  const fastX = useSpring(0, { stiffness: 120, damping: 22, mass: 0.6 });
  const fastY = useSpring(0, { stiffness: 120, damping: 22, mass: 0.6 });

  useEffect(() => {
    setMounted(true);

    const handleMove = (e: MouseEvent) => {
      rawX.current = e.clientX;
      rawY.current = e.clientY;
      smoothX.set(e.clientX);
      smoothY.set(e.clientY);
      fastX.set(e.clientX);
      fastY.set(e.clientY);
    };

    // Drive DOM from spring values imperatively — avoids React render cycle
    const unsubSX = smoothX.on("change", (x) => {
      const y = smoothY.get();
      if (primaryRef.current)  primaryRef.current.style.transform  = `translate(${x - 500}px, ${y - 500}px)`;
      if (secondaryRef.current) secondaryRef.current.style.transform = `translate(${x - 350}px, ${y - 350}px)`;
      if (tertiaryRef.current)  tertiaryRef.current.style.transform  = `translate(${x - 200}px, ${y - 200}px)`;
      
      // Update grid spotlight mask
      if (gridRef.current) {
        gridRef.current.style.maskImage = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)`;
        gridRef.current.style.webkitMaskImage = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)`;
      }
    });

    const unsubSY = smoothY.on("change", (y) => {
      const x = smoothX.get();
      if (primaryRef.current)  primaryRef.current.style.transform  = `translate(${x - 500}px, ${y - 500}px)`;
      if (secondaryRef.current) secondaryRef.current.style.transform = `translate(${x - 350}px, ${y - 350}px)`;
      if (tertiaryRef.current)  tertiaryRef.current.style.transform  = `translate(${x - 200}px, ${y - 200}px)`;

      // Update grid spotlight mask
      if (gridRef.current) {
        gridRef.current.style.maskImage = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)`;
        gridRef.current.style.webkitMaskImage = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.1) 100%)`;
      }
    });

    const unsubFX = fastX.on("change", (x) => {
      if (coronaRef.current) coronaRef.current.style.transform = `translate(${x - 100}px, ${fastY.get() - 100}px)`;
    });
    const unsubFY = fastY.on("change", (y) => {
      if (coronaRef.current) coronaRef.current.style.transform = `translate(${fastX.get() - 100}px, ${y - 100}px)`;
    });

    window.addEventListener("mousemove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      unsubSX();
      unsubSY();
      unsubFX();
      unsubFY();
    };
  }, [smoothX, smoothY, fastX, fastY]);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-background transition-colors duration-500">

      {/* ── Layer 0: fine grain / film noise texture ─────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.032] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Layer 0.5: Systematic Grid Texture (Cursor Responsive) ───── */}
      <div
        ref={gridRef}
        className="absolute inset-0 opacity-[0.05] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--foreground) 1px, transparent 1px),
            linear-gradient(to bottom, var(--foreground) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(600px circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
          WebkitMaskImage: "radial-gradient(600px circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* ── Layer 1: deep static ambient tinted haze (always on) ─────── */}
      {/* Cool blue-tinted glow at top-center — gives spatial depth */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[700px] opacity-[0.07] dark:opacity-[0.12]"
        style={{
          background: "radial-gradient(ellipse at 50% 20%, #2997FF 0%, #0071E3 25%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Warm neutral center bloom — lifts the background */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] opacity-[0.04] dark:opacity-[0.06]"
        style={{
          background: "radial-gradient(ellipse, var(--foreground) 0%, transparent 65%)",
          filter: "blur(60px)",
        }}
      />

      {/* ── Layer 2: slow breathing pulse ────────────────────────────── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[900px] opacity-[0.03] dark:opacity-[0.04] animate-[breathe_8s_ease-in-out_infinite]"
        style={{
          background: "radial-gradient(ellipse, var(--foreground) 0%, transparent 60%)",
          filter: "blur(120px)",
        }}
      />

      {/* ── Layer 3: Cursor energy field (3 nested orbs) ─────────────── */}

      {/*  Outer atmosphere — very large, soft, slow */}
      <div
        ref={primaryRef}
        className="absolute top-0 left-0 w-[1000px] h-[1000px] rounded-full opacity-[0.12] dark:opacity-[0.08]"
        style={{
          background: "radial-gradient(circle, var(--foreground) 0%, transparent 55%)",
          filter: "blur(90px)",
          willChange: "transform",
        }}
      />

      {/* Mid energy ring — blue-tinted, medium */}
      <div
        ref={secondaryRef}
        className="absolute top-0 left-0 w-[700px] h-[700px] rounded-full opacity-[0.09] dark:opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, #2997FF 0%, #0071E3 30%, transparent 60%)",
          filter: "blur(60px)",
          willChange: "transform",
        }}
      />

      {/* Inner glow — tighter, slightly warmer */}
      <div
        ref={tertiaryRef}
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.14] dark:opacity-[0.1]"
        style={{
          background: "radial-gradient(circle, var(--foreground) 0%, rgba(255,255,255,0.4) 30%, transparent 65%)",
          filter: "blur(28px)",
          willChange: "transform",
        }}
      />

      {/* Corona — tight bright center, fast follow */}
      <div
        ref={coronaRef}
        className="absolute top-0 left-0 w-[200px] h-[200px] rounded-full opacity-[0.08] dark:opacity-[0.07]"
        style={{
          background: "radial-gradient(circle, rgba(255,255,255,0.9) 0%, transparent 70%)",
          filter: "blur(10px)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
