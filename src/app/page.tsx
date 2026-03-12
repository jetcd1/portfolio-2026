"use client";

import { motion, Variants } from "framer-motion";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import InteractiveBackground from "@/components/animations/InteractiveBackground";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const getStaggerContainer = (skipDelay: boolean): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: skipDelay ? 0.1 : 3.6
    }
  }
});

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-start pb-24 relative">
      <InteractiveBackground />
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex text-center flex-col items-center justify-center p-8 overflow-visible">
        
        <motion.div
          variants={getStaggerContainer(false)}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl w-full flex flex-col items-center"
        >
          <motion.h1 variants={fadeUp} className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tighter mb-8 max-w-5xl text-foreground !leading-[1.1]">
            Structuring <span className="text-apple-blue">Complexity.</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-muted text-lg md:text-2xl max-w-3xl mb-12">
            I am a UI | UX Visual Designer building scalable, high-density interfaces for complex systems in data, healthcare, and aviation domains.
          </motion.p>
          
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
            <Button href="#work">View Projects</Button>
            <Button variant="secondary" href="/about">About Me</Button>
          </motion.div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4.5, duration: 1 }}
        >
          <span className="text-[10px] tracking-widest uppercase font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-foreground/20 relative overflow-hidden mt-2">
            <motion.div 
              className="absolute top-0 left-0 w-full h-1/2 bg-foreground"
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Selected Work Section */}
      <section id="work" className="w-full max-w-7xl px-4 md:px-8 py-24 md:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div>
            <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-4 text-foreground">Selected Work</h2>
            <p className="text-muted text-lg md:text-xl max-w-xl">
              <span className="text-apple-blue font-medium">11 years</span> of experience designing for data-heavy business dashboards and complex operational tools.
            </p>
          </div>
          <Button variant="outline" href="/work">View All Works</Button>
        </motion.div>

        <div className="flex flex-col gap-16 md:gap-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title={"Ground Service Equipment\nRequest Queue"}
              description="Internal tool for United Airlines — Airport Ops and GSE teams track, manage, and resolve equipment repair requests across stations in real time."
              tags={["Aviation", "Internal Tools", "Design System"]}
              video="/works/gse/thumbnail.mp4"
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
              title="Ontada iKnowMed G2"
              description="Contributed to ONC-certified oncology EHR product design while helping build scalable design system foundations for internal enterprise platforms."
              tags={["Healthcare", "EHR", "Design System"]}
              href="/work/ontada"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="Equilar Data Dashboards"
              description="Designed executive benchmarking tools and data-heavy business dashboards, focusing on visualizing complex information clearly."
              tags={["Data Visualization", "B2B SaaS", "Dashboards"]}
              href="/work/equilar"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="Financial Analytics OS"
              description="Architected the design system and core interface for a high-frequency trading analytics platform."
              tags={["FinTech", "Analytics", "System Design"]}
              href="#"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="AI Workflow Automation"
              description="Designed an intuitive node-based editor for enterprise teams to build complex AI pipelines without code."
              tags={["Artificial Intelligence", "B2B", "Editor"]}
              href="#"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="Cloud Infrastructure Manager"
              description="Redesigned the core control plane for a major cloud provider, improving resource allocation efficiency by 40%."
              tags={["Cloud", "Infrastructure", "Enterprise"]}
              href="#"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="Supply Chain Logistics Hub"
              description="Created a predictive global supply chain overview dashboard for real-time tracking and exception management."
              tags={["Logistics", "Global", "Dashboard"]}
              href="#"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="Healthcare Data Interoperability"
              description="Built a scalable standard for mapping disparate healthcare data sources into a unified clinical view."
              tags={["Healthcare", "Data Integration", "Platform"]}
              href="#"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <ProjectCard 
              title="Identity & Access Gateway"
              description="Developed a zero-trust enterprise architecture administration panel for managing over 1M+ internal permissions."
              tags={["Security", "Identity", "Admin Control"]}
              href="#"
            />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
