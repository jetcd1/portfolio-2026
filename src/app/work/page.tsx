"use client";

import { motion } from "framer-motion";
import ProjectCard from "@/components/ui/ProjectCard";

export default function Work() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-20"
      >
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-6">Selected Work</h1>
        <p className="text-xl text-muted max-w-2xl">
          A selection of projects focusing on high-density data, operational systems, and design systems.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.1 }}
           className="md:mt-24"
        >
          <ProjectCard 
            title="United Airlines Setup & Release"
            description="Led UX/UI execution for large-scale internal operational tools."
            tags={["Aviation", "Internal Tools"]}
            video="/works/gse/thumbnail.mp4"
            href="/work/united-airlines"
          />
        </motion.div>
        
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ProjectCard 
            title="Ontada iKnowMed G2"
            description="Contributed to ONC-certified oncology EHR product design."
            tags={["Healthcare", "EHR"]}
            href="/work/ontada"
          />
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8, delay: 0.3 }}
           className="md:col-span-2"
        >
          <ProjectCard 
            title="Equilar Dashboards"
            description="Designed executive benchmarking tools and data-heavy business dashboards, focusing on visualizing complex information clearly."
            tags={["Data Visualization", "B2B SaaS"]}
            href="/work/equilar"
          />
        </motion.div>
      </div>
    </main>
  );
}
