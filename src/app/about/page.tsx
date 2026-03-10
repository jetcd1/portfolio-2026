"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mb-16"
      >
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tight mb-8">About</h1>
        
        <div className="grid md:grid-cols-[2fr_1fr] gap-16 mt-16 md:mt-24">
          <div className="space-y-8 text-lg font-medium text-muted">
            <p className="text-lg md:text-xl text-muted mb-6">
              I’m Chan Jeon, a UI | UX Visual Designer building scalable, high-density interfaces for complex systems.
            </p>
            <p>
              I translate business and technical constraints into clear, structured, build-ready UI — working closely with PMs and engineers to deliver consistent and technically grounded solutions.
            </p>
            <p>
              Over the past decade, I’ve designed enterprise platforms across data, healthcare, and aviation domains. Most recently, I spent about three years at United Airlines working on internal operational tools, focusing on visual UI and contributing to the Orion design system. Before that, I worked at McKesson on complex oncology EHR products, and earlier in my career at Equilar designing enterprise dashboards and data tools.
            </p>
            <p>
              Today, I continue exploring AI-assisted workflows and system-driven product experimentation through <span className="text-foreground">OVIXA Labs</span>.
            </p>
          </div>
          
          <div className="space-y-12 pl-0 md:pl-8 md:border-l border-white/10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted font-bold mb-6">Areas of Focus</h3>
              <ul className="space-y-3 font-medium text-foreground/80">
                <li>Design Systems</li>
                <li>Complex Data Interfaces</li>
                <li>B2B SaaS / Internal Tools</li>
                <li>Micro-interactions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-muted font-bold mb-6">Connect</h3>
              <ul className="space-y-4 font-medium text-foreground">
                <li><a href="#" className="hover:text-accent transition-colors block">LinkedIn ↗</a></li>
                <li><a href="#" className="hover:text-accent transition-colors block">Dribbble ↗</a></li>
                <li><a href="mailto:hello@example.com" className="hover:text-accent transition-colors block">Email Me ↗</a></li>
              </ul>
            </div>

            <div className="pt-8">
              <Button variant="secondary" href="/resume.pdf" className="w-full">
                Download Resume
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
