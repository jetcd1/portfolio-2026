"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Eye, Workflow, Users, SwatchBook } from "lucide-react";
import { useRef, MouseEvent } from "react";

const goals = [
  {
    icon: Eye,
    title: "Improve Visibility",
    description:
      "Provide clear and immediate visibility into each service request's status and progress.",
  },
  {
    icon: Workflow,
    title: "Simplify Workflow",
    description:
      "Streamline search, filtering, and equipment management for faster daily operations.",
  },
  {
    icon: Users,
    title: "Enhance Collaboration",
    description:
      "Enable quick, note-based communication between AO and GSE teams.",
  },
  {
    icon: SwatchBook,
    title: "Ensure Consistency",
    description:
      "Align all visuals and interactions with the Orion 2.0 design system for scalability and cohesion.",
  },
];

// Single card with subtle mouse-tilt on hover
function GoalCard({
  goal,
  index,
}: {
  goal: (typeof goals)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["4deg", "-4deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-4deg", "4deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const Icon = goal.icon;

  return (
    <motion.div
      ref={cardRef}
      className="relative group"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8%" }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: "easeOut" }}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        whileHover={{ y: -6 }}
        className={`
          relative h-full flex flex-col gap-5 p-7 rounded-2xl
          bg-white
          border border-white/80
          shadow-[0_2px_24px_rgba(0,0,0,0.06)]
          group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.14)]
          transition-shadow duration-400
        `}
      >
        {/* Subtle inner glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.7) 0%, transparent 65%)",
          }}
        />

        {/* Icon container */}
        <motion.div
          className="relative w-11 h-11 rounded-full flex items-center justify-center bg-neutral-100 border border-neutral-200/80 group-hover:bg-neutral-900 transition-colors duration-400 flex-shrink-0"
          whileHover={{ rotate: [0, -8, 8, 0] }}
          transition={{ duration: 0.45 }}
        >
          <Icon
            size={20}
            className="text-neutral-500 group-hover:text-white transition-colors duration-400"
            strokeWidth={1.6}
          />
        </motion.div>

        {/* Text */}
        <div className="flex flex-col gap-2 relative z-10">
          <h4 className="text-[17px] font-semibold text-neutral-900 tracking-tight leading-snug">
            {goal.title}
          </h4>
          <p className="text-[14px] text-neutral-500 leading-[1.65] font-normal">
            {goal.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function KeyGoalsSection() {
  return (
    <div className="w-full relative overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />

      {/* Very subtle ambient radial */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 px-8 sm:px-12 md:px-16 py-20 md:py-28 flex flex-col items-center">
        {/* Section label + title */}
        <motion.div
          className="text-center mb-14 md:mb-18"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        >
          <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-white/35 mb-4">
            Project Objectives
          </p>
          <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
            Key Goals
          </h3>
        </motion.div>

        {/* Cards grid */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
          {goals.map((goal, i) => (
            <GoalCard key={goal.title} goal={goal} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
