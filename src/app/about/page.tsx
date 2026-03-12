"use client";

import { motion } from "framer-motion";

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
              I'm Chan Jeon, a UI | UX Visual Designer building scalable, high-density interfaces for complex systems.
            </p>
            <p>
              I translate business and technical constraints into clear, structured, build-ready UI — working closely with PMs and engineers to deliver consistent and technically grounded solutions.
            </p>
            <p>
              Over the past decade, I've designed enterprise platforms across data, healthcare, and aviation domains. Most recently, I spent about three years at United Airlines working on internal operational tools, focusing on visual UI and contributing to the Orion design system. Before that, I worked at McKesson on complex oncology EHR products, and earlier in my career at Equilar designing enterprise dashboards and data tools.
            </p>
            <p>
              Today, I continue exploring AI-assisted workflows and system-driven product experimentation through{" "}
              {/* Creative OVIXA Labs link — no generic SaaS styling */}
              <a
                href="https://ovixa.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-1.5 text-apple-blue font-semibold"
              >
                {/* Animated underline that draws in from left */}
                <span className="relative">
                  OVIXA Labs
                  <span
                    className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-apple-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />
                </span>
                {/* Small ↗ that lifts on hover */}
                <span className="inline-block text-apple-blue/60 text-[0.75em] leading-none translate-y-[-0.15em] transition-transform duration-300 ease-out group-hover:-translate-y-[0.35em] group-hover:translate-x-[0.15em] group-hover:text-apple-blue select-none">
                  ↗
                </span>
              </a>
              .
            </p>
          </div>
          
          <div className="space-y-12 pl-0 md:pl-8 md:border-l border-white/10">
            <div>
              <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold mb-6">Areas of Focus</h3>
              <ul className="space-y-3 font-medium text-foreground/80">
                <li>Design Systems</li>
                <li>Complex Data Interfaces</li>
                <li>B2B SaaS / Internal Tools</li>
                <li>Micro-interactions</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold mb-6">Connect</h3>
              <ul className="space-y-4 font-medium text-foreground">
                <li><a href="#" className="hover:text-accent transition-colors block">LinkedIn ↗</a></li>
                <li><a href="#" className="hover:text-accent transition-colors block">Dribbble ↗</a></li>
                <li><a href="mailto:hello@example.com" className="hover:text-accent transition-colors block">Email Me ↗</a></li>
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
