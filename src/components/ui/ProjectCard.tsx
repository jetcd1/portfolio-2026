"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState, useCallback, useMemo, MouseEvent } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  href: string;
}

// ─────────────────────────────────────────────────────────────
// Word-masked flip title
// Each word has TWO layers inside overflow:hidden —
// "rest" layer slides UP out, "hover" layer slides UP in.
// Creates a theatrical word-by-word roll effect.
// ─────────────────────────────────────────────────────────────
// Word-masked flip title — supports "\n" for forced line breaks
function FlipTitle({ title, isHovered }: { title: string; isHovered: boolean }) {
  // Split into lines first, then words
  const lines = useMemo(() => title.split("\n").map(l => l.split(" ")), [title]);
  let globalIdx = 0; // for stagger delay across all words

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
                {/* Spacer — font-semibold to reserve hover-layer width */}
                <span className="invisible font-semibold">{word}</span>

                {/* Rest layer — white, rolls up on hover */}
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

                {/* Hover layer — brighter, rolls in from below */}
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
// Each word clips in from right → left with stagger.
// clipPath wipe — not a generic opacity fade.
// ─────────────────────────────────────────────────────────────
function CascadeDescription({
  text,
  isHovered,
}: {
  text: string;
  isHovered: boolean;
}) {
  const words = useMemo(() => text.split(" "), [text]);

  return (
    <p className="text-white text-sm md:text-base leading-relaxed drop-shadow-md">
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.22em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            animate={
              isHovered
                ? { y: "0%", opacity: 1 }
                : { y: "105%", opacity: 0 }
            }
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
  image,
  video,
  href,
}: ProjectCardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

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

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const rect = wrapperRef.current?.getBoundingClientRect();
      if (!rect) return;
      const nx = (e.clientX - rect.left) / rect.width;
      const ny = (e.clientY - rect.top) / rect.height;
      cursorX.set(nx);
      cursorY.set(ny);
      // Spotlight: direct DOM — zero re-renders
      if (spotlightRef.current) {
        spotlightRef.current.style.background = `radial-gradient(circle 54% at ${nx * 100}% ${ny * 100}%, rgba(255,255,255,0.065) 0%, transparent 58%)`;
      }
    },
    [cursorX, cursorY]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    cursorX.set(0.5);
    cursorY.set(0.5);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }, [cursorX, cursorY]);

  return (
    <div
      ref={wrapperRef}
      style={{ perspective: "1500px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 3-D tilt plane */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={{ scale: isHovered ? 1.012 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href={href}
          className="group block w-full relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden rounded-[2rem] cursor-none"
          data-hover="true"
        >

          {/* ── Media — ALWAYS visible ─────────────────────────── */}
          <motion.div
            className="absolute inset-0"
            style={{ x: bgX, y: bgY, scale: 1.08 }}
          >
            {image && (
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${image})` }}
              />
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
                  filter: isHovered
                    ? "brightness(1.05) saturate(1.15)"
                    : "brightness(0.9) saturate(0.8)",
                }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
            )}
          </motion.div>

          {/* ── Cursor spotlight (zero re-renders) ─────────────── */}
          <div
            ref={spotlightRef}
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          />

          {/* ── Bottom-weighted gradient scrim ─────────────────── */}
          {/* Always present — darkens only the bottom third */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.18) 45%, transparent 72%)",
            }}
          />

          {/* ── Hover: mid-tone overlay fades in ───────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.22)" }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />

          {/* ── Content ──────────────────────────────────────────── */}
          <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex justify-between items-end pointer-events-none">

            {/* Left content block — parallax depth-2 */}
            <motion.div
              className="max-w-[62%] pr-4"
              style={{ x: contentX, y: contentY }}
            >
              {/* Flip-masked title */}
              <FlipTitle title={title} isHovered={isHovered} />

              {/* Underline — scale-x draws from left on hover */}
              <motion.div
                className="mt-3 mb-4 h-px bg-white/40 origin-left"
                animate={{ scaleX: isHovered ? 1 : 0 }}
                initial={{ scaleX: 0 }}
                transition={{
                  duration: 0.55,
                  ease: [0.16, 1, 0.3, 1],
                  delay: isHovered ? 0.12 : 0,
                }}
              />

              {/* Word-cascade description */}
              <CascadeDescription text={description} isHovered={isHovered} />

              {/* "View Project" — horizontal clipPath wipe from left */}
              <motion.div
                className="flex items-center gap-2.5 mt-4"
                animate={{
                  clipPath: isHovered
                    ? "inset(0% 0% 0% 0%)"
                    : "inset(0% 100% 0% 0%)",
                }}
                initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                  delay: isHovered ? 0.38 : 0,
                }}
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-apple-blue">
                  View Project
                </span>
                <div className="h-px w-6 bg-apple-blue opacity-80" />
              </motion.div>
            </motion.div>

            {/* Arrow button — LEFT at rest, RIGHT on hover (180° spring) */}
            <motion.div
              className="hidden sm:flex shrink-0 w-16 h-16 ml-4 rounded-full items-center justify-center overflow-hidden border"
              style={{
                x: arrowX,
                y: arrowY,
                backdropFilter: "blur(10px)",
              }}
              animate={
                isHovered
                  ? {
                      scale: 1.16,
                      backgroundColor: "rgba(255,255,255,1)",
                      borderColor: "rgba(255,255,255,1)",
                    }
                  : {
                      scale: 1,
                      backgroundColor: "rgba(255,255,255,0.07)",
                      borderColor: "rgba(255,255,255,0.28)",
                    }
              }
              transition={{ type: "spring", stiffness: 310, damping: 22 }}
            >
              <motion.span
                animate={
                  isHovered
                    ? { rotate: 0, color: "#000000" }
                    : { rotate: 180, color: "#ffffff" }
                }
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <ArrowRight className="w-8 h-8" />
              </motion.span>
            </motion.div>
          </div>

          {/* Border sheen on hover */}
          <motion.div
            className="absolute inset-0 rounded-[2rem] pointer-events-none"
            animate={{
              boxShadow: isHovered
                ? "inset 0 1px 0 rgba(255,255,255,0.18), 0 32px 80px rgba(0,0,0,0.55)"
                : "inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
            transition={{ duration: 0.5 }}
          />
        </Link>
      </motion.div>
    </div>
  );
}
