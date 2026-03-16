"use client";

import { motion, Variants, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import ProjectCard from "@/components/ui/ProjectCard";
import InteractiveBackground from "@/components/animations/InteractiveBackground";
import { useRef, useState, useCallback, MouseEvent, useEffect } from "react";
import { useIntro } from "@/components/providers/IntroProvider";

/* ─── Entrance animation variants ──────────────────────────────────── */
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};
const getStaggerContainer = (skipDelay: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: skipDelay ? 0.1 : 3.6 },
  },
});

/* ─── Magnetic button ───────────────────────────────────────────────── */
function MagneticButton({
  href,
  children,
  variant = "primary",
  delay = 0,
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  delay?: number;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.5 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.35);
    y.set((e.clientY - cy) * 0.35);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0); y.set(0); setHovered(false);
  }, [x, y]);

  const isHash = href.startsWith("#");
  const isPrimary = variant === "primary";

  const buttonContent = (
    <motion.a
      ref={ref}
      href={href}
      className={`
        relative inline-flex items-center justify-center px-7 py-3.5 rounded-full
        font-medium text-sm tracking-wide overflow-hidden
        transition-colors duration-300 cursor-none
        ${isPrimary
          ? "bg-foreground text-background"
          : "bg-transparent text-foreground border border-foreground/20"
        }
      `}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: "spring", stiffness: 400, damping: 28 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      data-hover="true"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Light sweep on hover */}
      <motion.span
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          background: isPrimary
            ? "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0) 100%)"
            : "linear-gradient(105deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.07) 50%, rgba(255,255,255,0) 100%)",
          backgroundSize: "200% 100%",
        }}
        animate={{
          backgroundPosition: hovered ? "200% center" : "-100% center",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      />
      {children}
    </motion.a>
  );

  if (isHash) {
    return buttonContent;
  }

  return (
    <Link href={href} passHref legacyBehavior>
      {buttonContent}
    </Link>
  );
}

/* ─── Refined scroll indicator ─────────────────────────────────────── */
function ScrollCue() {
  return (
    <motion.div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 4.5, duration: 1.2, ease: "easeOut" }}
    >
      {/* Sleek Vertical Line Indicator */}
      <div className="relative w-px h-24 overflow-hidden bg-foreground/5">
        <motion.div
          className="absolute top-0 left-0 w-full bg-apple-blue"
          style={{ height: "30%" }}
          animate={{
            top: ["-30%", "100%"]
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
            repeatDelay: 0.5
          }}
        />
      </div>
    </motion.div>
  );
}

/* ─── Hero cursor-responsive title ─────────────────────────────────── */
function HeroTitle() {
  const { isIntroDone } = useIntro();
  const heroRef = useRef<HTMLDivElement>(null);
  const cx = useMotionValue(0.5);
  const cy = useMotionValue(0.5);
  const scx = useSpring(cx, { stiffness: 40, damping: 18, mass: 1.5 });
  const scy = useSpring(cy, { stiffness: 40, damping: 18, mass: 1.5 });

  const complexX = useTransform(scx, [0, 1], ["-6px", "6px"]);
  const complexY = useTransform(scy, [0, 1], ["-3px", "3px"]);
  const structX  = useTransform(scx, [0, 1], ["-2px", "2px"]);
  const structY  = useTransform(scy, [0, 1], ["-1px", "1px"]);

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    cx.set((e.clientX - rect.left) / rect.width);
    cy.set((e.clientY - rect.top) / rect.height);
  }, [cx, cy]);

  // Entrance base delay logic: 0.4s if already intro done (refresh), otherwise wait for intro (3.8s)
  const baseDelay = isIntroDone ? 0.4 : 3.8;

  return (
    <div ref={heroRef} onMouseMove={onMove} className="w-full flex flex-col items-center">
      <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-display font-medium tracking-tighter mb-8 max-w-6xl text-foreground !leading-[1] text-center select-none overflow-visible pb-4">
        <div className="inline-block relative overflow-hidden h-full py-2">
          <motion.span 
            className="inline-block relative" 
            style={{ x: structX, y: structY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: baseDelay }}
          >
            Structuring{" "}
            {/* Light Sweep - Part 1 */}
            <motion.div
              className="absolute inset-0 z-10 w-full h-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatDelay: 6,
                delay: baseDelay + 2.5
              }}
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              }}
            />
          </motion.span>
        </div>
        <div className="inline-block relative overflow-hidden h-full py-2">
          <motion.span
            className="inline-block text-apple-blue relative"
            style={{ x: complexX, y: complexY }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: baseDelay + 0.15 }}
          >
            Complexity.
            
            {/* Light Sweep - Part 2 (Sequential) */}
            <motion.div
              className="absolute inset-0 z-10 w-full h-full"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
                repeat: Infinity,
                repeatDelay: 6,
                delay: baseDelay + 2.8 // Delay relative to Structuring sweep
              }}
              style={{
                background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
              }}
            />
          </motion.span>
        </div>
      </h1>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────── */
export default function Home() {
  const { isIntroDone } = useIntro();

  return (
    <main className="flex flex-col items-center justify-start pb-24 relative">
      <InteractiveBackground />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex text-center flex-col items-center justify-center p-8 overflow-visible">

        <motion.div
          key={isIntroDone ? "ready" : "intro"}
          variants={getStaggerContainer(isIntroDone)}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl w-full flex flex-col items-center"
        >
          {/* Cursor-parallax title */}
          <HeroTitle />

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1.2, 
              ease: [0.16, 1, 0.3, 1], 
              delay: (isIntroDone ? 0.4 : 3.8) + 0.5 
            }}
            className="text-muted text-lg md:text-2xl max-w-2xl font-light tracking-tight opacity-70 !leading-[1.6]"
          >
            Designing clarity<br className="hidden md:block" /> for complex systems.
          </motion.p>
        </motion.div>

        {/* Refined scroll cue */}
        <ScrollCue />
      </section>

      {/* ── Selected Work ─────────────────────────────────────────── */}
      <section id="work" className="w-full max-w-7xl px-4 md:px-8 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-5xl md:text-8xl font-display font-semibold tracking-[-0.04em] mb-6 text-foreground leading-[0.9]">Selected Work</h2>
            <p className="text-muted text-xl md:text-2xl max-w-2xl font-light opacity-80 leading-relaxed">
              <span className="text-apple-blue font-medium">11 years</span> of experience crafting high-density, scalable interfaces for enterprise operations.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              company="United Airlines"
              title="Ground Service Equipment Request Queue"
              description="Internal operations platform for airport teams to manage equipment requests across stations."
              tags={["Aviation", "Internal Tools", "Design System"]}
              video="/works/gse/thumbnail.mp4"
              image="/works/gse/1.png"
              href="/work/united-airlines"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              company="United Airlines"
              title="Orion Design System 2.0"
              description="Design system architecture for enterprise products at scale, bringing clarity and consistency to tools used by thousands."
              tags={["Design System", "Aviation", "Figma"]}
              video="/works/Orion/thumbnail.mp4"
              image="/works/Orion/2.png"
              href="/work/orion"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              company="McKesson"
              title="Ontada Design System"
              description="Initiated and established a comprehensive design system from scratch, scaling it across McKesson's internal product ecosystem."
              tags={["Design System", "Healthcare", "Figma"]}
              video="/works/Ontada/thumbnail.mp4"
              image="/works/Ontada/Cover - Ontada.png"
              href="/work/ontada"
            />
          </motion.div>

          {/* Equilar Project */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              company="Equilar"
              title="Equilar App"
              description="Board intelligence solutions and executive boardroom connections."
              tags={["Mobile UI", "UX", "Branding"]}
              video="/works/equilarapp/thumbnail.mp4"
              image="/works/equilarapp/1.png"
              href="/work/equilar"
            />
          </motion.div>

          {/* Boardedge Project */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              company="Equilar"
              title="Boardedge"
              description="A platform for shareholder engagement and board recruiting, improving corporate governance."
              tags={["Product UI", "UX", "Design System"]}
              video="/works/boardedge/thumbnail.gif"
              href="/work/boardedge"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
