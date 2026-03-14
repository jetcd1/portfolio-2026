"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Work() {
  return (
    <main className="min-h-screen pt-[140px] pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-5 mb-[72px]"
      >
        <span className="block text-[13px] font-medium tracking-[0.12em] uppercase opacity-60 mb-5">
          Work
        </span>
        <h1 className="text-4xl md:text-[48px] font-display font-medium leading-[1.2] max-w-[720px]">
          Designing complex operational tools and data-heavy interfaces.
        </h1>
      </motion.div>

      <div className="flex flex-col gap-32 md:gap-48 mt-24">
        {/* GSE Project */}
        <ProjectCard 
          company="United Airlines"
          title="Ground Service Equipment Request Queue"
          description="Internal operations platform for airport teams to manage equipment requests across stations."
          tags={["Aviation", "Internal Tools"]}
          video="/works/gse/thumbnail.mp4"
          href="/work/united-airlines"
        />

        {/* Orion Project */}
        <ProjectCard 
          company="United Airlines"
          title="Orion Design System 2.0"
          description="Design system architecture for enterprise products at scale."
          tags={["Design System", "Aviation"]}
          video="/works/Orion/thumbnail.mp4"
          image="/works/Orion/2.png" 
          href="/work/orion"
        />

        {/* Ontada Project */}
        <ProjectCard 
          company="McKesson"
          title="Ontada Design System"
          description="Initiated and established a comprehensive design system from scratch, scaling it across McKesson's internal product ecosystem."
          tags={["Design System", "Healthcare", "Figma"]}
          video="/works/Ontada/thumbnail.mp4"
          href="/work/ontada"
        />
      </div>
    </main>
  );
}
