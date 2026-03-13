"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useCallback, useMemo } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  company?: string;
  image?: string;
  video?: string;
  href: string;
}

// ─────────────────────────────────────────────────────────────
// Word-masked flip title
// ─────────────────────────────────────────────────────────────
function FlipTitle({ title, isHovered }: { title: string; isHovered: boolean }) {
  const lines = useMemo(() => title.split("\n").map(l => l.split(" ")), [title]);
  let globalIdx = 0;

  return (
    <h3 className="text-4xl md:text-5xl font-display font-medium tracking-tight text-white leading-[1.18]">
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((word, wi) => {
            const idx = globalIdx++;
            return (
              <span
                key={wi}
                className="relative inline-block align-bottom mr-[0.28em] last:mr-0"
                style={{ height: "1.22em", clipPath: "inset(0 -10px 0 -10px)" }}
              >
                <span className="invisible font-semibold">{word}</span>
                <motion.span
                  className="absolute inset-0 flex items-center text-white"
                  animate={{ y: isHovered ? "-112%" : "0%" }}
                  transition={{
                    duration: 0.52,
                    ease: [0.76, 0, 0.24, 1],
                    delay: idx * 0.06,
                  }}
                >
                  {word}
                </motion.span>
                <motion.span
                  className="absolute inset-0 flex items-center text-white font-semibold"
                  animate={{ y: isHovered ? "0%" : "114%" }}
                  transition={{
                    duration: 0.52,
                    ease: [0.76, 0, 0.24, 1],
                    delay: idx * 0.06,
                  }}
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h3>
  );
}

// ─────────────────────────────────────────────────────────────
// Word-cascade description
// ─────────────────────────────────────────────────────────────
function CascadeDescription({ text, isHovered }: { text: string; isHovered: boolean }) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <p className="text-white text-sm md:text-base leading-relaxed drop-shadow-md">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0">
          <motion.span
            className="inline-block"
            animate={isHovered ? { y: "0%", opacity: 1 } : { y: "105%", opacity: 0 }}
            transition={{
              duration: 0.38,
              ease: [0.22, 1, 0.36, 1],
              delay: isHovered ? 0.18 + i * 0.022 : i * 0.008,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </p>
  );
}

export default function ProjectCard({
  title,
  description,
  company,
  image,
  video,
  href,
}: ProjectCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // ── Scroll Reveal Logic ────────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "center center", "center 40%", "end start"],
  });

  // Scale: enters slightly small (0.96), peaks at 1 in center, then shrinks slightly
  const scrollScale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.96, 1, 1, 0.96]);
  // Opacity: enters dim (0.4), full focus in center (1), dims as it leaves
  const scrollOpacity = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.4, 1, 1, 0.4]);
  
  const springScale = useSpring(scrollScale, { stiffness: 100, damping: 30 });
  const springOpacity = useSpring(scrollOpacity, { stiffness: 100, damping: 30 });

  // ── Cursor tracking ────────────────────────────────────────
  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);
  const smoothX = useSpring(cursorX, { stiffness: 150, damping: 24, mass: 0.5 });
  const smoothY = useSpring(cursorY, { stiffness: 150, damping: 24, mass: 0.5 });
  const prlxX = useSpring(cursorX, { stiffness: 80, damping: 20, mass: 0.6 });
  const prlxY = useSpring(cursorY, { stiffness: 80, damping: 20, mass: 0.6 });

  // 3-D tilt ±3°
  const rotateY = useTransform(smoothX, [0, 1], ["-3deg", "3deg"]);
  const rotateX = useTransform(smoothY, [0, 1], ["2deg", "-2deg"]);

  // Parallax depth stack
  const bgX = useTransform(prlxX, [0, 1], ["-2.5%", "2.5%"]);
  const bgY = useTransform(prlxY, [0, 1], ["-1.5%", "1.5%"]);
  const contentX = useTransform(prlxX, [0, 1], ["-4px", "4px"]);
  const contentY = useTransform(prlxY, [0, 1], ["-4px", "4px"]);
  const arrowX = useTransform(prlxX, [0, 1], ["-6px", "6px"]);
  const arrowY = useTransform(prlxY, [0, 1], ["-4px", "4px"]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width;
    const ny = (e.clientY - rect.top) / rect.height;
    cursorX.set(nx);
    cursorY.set(ny);
    if (spotlightRef.current) {
      spotlightRef.current.style.background = `radial-gradient(circle 54% at ${nx * 100}% ${ny * 100}%, rgba(255,255,255,0.065) 0%, transparent 58%)`;
    }
  }, [cursorX, cursorY]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    cursorX.set(0.5);
    cursorY.set(0.5);
    if (videoRef.current) videoRef.current.pause();
  }, [cursorX, cursorY]);

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full"
    >
      <motion.div
        style={{ 
          perspective: "1500px",
          scale: springScale,
          opacity: springOpacity
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          animate={{ scale: isHovered ? 1.012 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Link
            href={href}
            className="group block w-full relative h-[65vh] md:h-[75vh] min-h-[500px] max-h-[850px] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] cursor-none"
            data-hover="true"
          >
            {/* ── Media ─────────────────────────── */}
            <motion.div className="absolute inset-0" style={{ x: bgX, y: bgY, scale: 1.08 }}>
              {image && (
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
              )}
              {video && (
                <motion.video
                  ref={videoRef}
                  src={video}
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  animate={{
                    scale: isHovered ? 1.06 : 1,
                    filter: isHovered ? "brightness(1.05) saturate(1.15)" : "brightness(0.9) saturate(0.8)",
                  }}
                  transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </motion.div>

            {/* Spotlight */}
            <div
              ref={spotlightRef}
              className="absolute inset-0 pointer-events-none"
              style={{ opacity: isHovered ? 1 : 0, transition: "opacity 0.4s ease" }}
            />

            {/* Scrim */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)" }}
            />

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{ background: "rgba(0,0,0,0.22)" }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.5 }}
            />

            {/* Content */}
            <div className="absolute inset-x-0 bottom-0 p-10 md:p-16 flex justify-between items-end pointer-events-none">
              <motion.div className="max-w-[70%] pr-4" style={{ x: contentX, y: contentY }}>
                {company && (
                  <motion.span 
                    className="block text-[13px] font-semibold tracking-[0.12em] uppercase text-apple-blue mb-3"
                    animate={isHovered ? { opacity: 1, y: -2 } : { opacity: 0.9, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {company}
                  </motion.span>
                )}
                <FlipTitle title={title} isHovered={isHovered} />
                <motion.div
                  className="mt-4 mb-6 h-px bg-white/30 origin-left"
                  animate={{ scaleX: isHovered ? 1 : 0 }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isHovered ? 0.12 : 0 }}
                />
                <CascadeDescription text={description} isHovered={isHovered} />
                <motion.div
                  className="flex items-center gap-3 mt-6"
                  animate={{ clipPath: isHovered ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)" }}
                  initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: isHovered ? 0.38 : 0 }}
                >
                  <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-apple-blue font-bold">
                    View Project
                  </span>
                  <div className="h-px w-8 bg-apple-blue opacity-80" />
                </motion.div>
              </motion.div>

              <motion.div
                className="hidden sm:flex shrink-0 w-20 h-20 ml-4 rounded-full items-center justify-center overflow-hidden border"
                style={{ x: arrowX, y: arrowY, backdropFilter: "blur(10px)" }}
                animate={isHovered ? {
                  scale: 1.1,
                  backgroundColor: "rgba(255,255,255,1)",
                  borderColor: "rgba(255,255,255,1)",
                } : {
                  scale: 1,
                  backgroundColor: "rgba(255,255,255,0.07)",
                  borderColor: "rgba(255,255,255,0.2)"
                }}
                transition={{ type: "spring", stiffness: 310, damping: 22 }}
              >
                <motion.span
                  animate={isHovered ? { rotate: 0, color: "#000000" } : { rotate: 180, color: "#ffffff" }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <ArrowRight className="w-10 h-10" />
                </motion.span>
              </motion.div>
            </div>

            {/* Shadow & Sheen */}
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] md:rounded-[3rem] pointer-events-none"
              animate={{
                boxShadow: isHovered
                  ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 40px 100px rgba(0,0,0,0.6)"
                  : "inset 0 1px 0 rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.2)",
              }}
              transition={{ duration: 0.7 }}
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
