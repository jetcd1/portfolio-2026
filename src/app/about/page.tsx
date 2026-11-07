"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";

import PhotoStrip from "@/components/ui/PhotoStrip";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
} as any;

export default function About() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium tracking-tight mb-8">About</h1>
          
          <div className="grid md:grid-cols-[2fr_1fr] gap-16 mt-16 md:mt-24">
            <div className="space-y-12 text-lg font-medium text-muted">
              <motion.div {...fadeInUp} className="space-y-8">
                <p className="mb-6 text-2xl font-medium leading-[1.45] tracking-[-0.025em] text-foreground md:text-3xl">
                  I'm Chan Jeon, a UI-focused product designer with <span className="font-semibold text-[#b99cff]">12+ years</span> of experience crafting <span className="text-foreground">clear, scalable digital products</span> and <span className="text-foreground">design systems.</span>
                </p>
                <p className="text-lg leading-relaxed text-foreground/60 md:text-xl">
                  I turn product, business, and technical constraints into <span className="font-semibold text-foreground/95">polished, build-ready UI</span> — partnering closely with <span className="text-foreground/85">PMs and engineers</span> to create cohesive experiences that work at scale.
                </p>
                <p className="text-base leading-[1.85] text-foreground/55 md:text-lg">
                  Most recently, I designed for <span className="font-semibold text-[#ff5c3b]">Reddit's Ads platform</span>, strengthening product UI, design system foundations, and the visual language across advertiser experiences. Previously, I spent nearly three years at <span className="font-semibold text-[#62a8ff]">United Airlines</span> designing internal operational tools and contributing to the Orion design system. Before that, I worked at <span className="font-semibold text-[#63d4cc]">McKesson</span> on oncology EHR products and at <span className="font-semibold text-[#b99cff]">Equilar</span> on executive intelligence platforms, dashboards, and data tools.
                </p>
              </motion.div>

              {/* ── Experience Snapshot ─────────────────────────────────── */}
              <motion.div 
                {...fadeInUp}
                className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] space-y-6"
              >
                <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold">Experience Snapshot</h3>
                <ul className="space-y-4 text-foreground/90 font-medium">
                  <li className="flex items-start gap-3">
                    <span className="text-apple-blue mt-1">•</span>
                    <span>12+ years in product, UI, and visual design</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-apple-blue mt-1">•</span>
                    <span>Digital products across advertising, aviation, healthcare, and data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-apple-blue mt-1">•</span>
                    <span>Design systems and production-ready UI scaled across teams</span>
                  </li>
                </ul>
              </motion.div>

              <motion.p {...fadeInUp}>
                Today, I continue exploring AI-assisted workflows and system-driven product experimentation through{" "}
                <a
                  href="https://ovixa.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 text-apple-red font-semibold"
                >
                  <span className="relative">
                    OVIXA Labs
                    <span
                      className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-apple-red transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </span>
                  <span className="inline-block text-apple-red/60 text-[0.75em] leading-none translate-y-[-0.15em] transition-transform duration-300 ease-out group-hover:-translate-y-[0.35em] group-hover:translate-x-[0.15em] group-hover:text-apple-red select-none">
                    ↗
                  </span>
                </a>
                , where I prototype and launch small experimental tools such as{" "}
                <a
                  href="https://linkroot.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 text-apple-red font-semibold"
                >
                  <span className="relative">
                    LinkRoot
                    <span
                      className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-apple-red transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </span>
                  <span className="inline-block text-apple-red/60 text-[0.75em] leading-none translate-y-[-0.15em] transition-transform duration-300 ease-out group-hover:-translate-y-[0.35em] group-hover:translate-x-[0.15em] group-hover:text-apple-red select-none">
                    ↗
                  </span>
                </a>
                {" "}and{" "}
                <a
                  href="https://safesignup.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative inline-flex items-center gap-1.5 text-apple-red font-semibold"
                >
                  <span className="relative">
                    SafeSignup
                    <span
                      className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-apple-red transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                    />
                  </span>
                  <span className="inline-block text-apple-red/60 text-[0.75em] leading-none translate-y-[-0.15em] transition-transform duration-300 ease-out group-hover:-translate-y-[0.35em] group-hover:translate-x-[0.15em] group-hover:text-apple-red select-none">
                    ↗
                  </span>
                </a>
                .
              </motion.p>
            </div>
            
            <div className="space-y-12 pl-0 md:pl-8 md:border-l border-white/10">
              <div>
                <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold mb-6">Core Expertise</h3>
                <ul className="space-y-3 font-medium text-foreground/80">
                  <li>Design Systems</li>
                  <li>High-Density Data Interfaces</li>
                  <li>Enterprise SaaS Interfaces</li>
                  <li>Data Visualization</li>
                  <li>Mobile & Responsive Product UI</li>
                  <li>Interaction & Micro-interactions</li>
                  <li>Production-Ready UI Craft</li>
                  <li>Accessible UI Design</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold mb-6">EXPLORING AI</h3>
                <ul className="space-y-3 font-medium text-foreground/80">
                  <li>AI-assisted design workflows</li>
                  <li>Emerging AI design tools</li>
                  <li>Generative AI in product design</li>
                </ul>
              </div>

              <div className="space-y-1 text-sm font-medium text-muted">
                <p>Based in Irvine, CA</p>
                <p>Open to remote roles</p>
              </div>
              
              <div>
                <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold mb-6">Connect</h3>
                <div className="flex items-center gap-4">
                  <a 
                    href="mailto:chanhodesign@gmail.com" 
                    className="w-12 h-12 rounded-full border border-foreground/10 flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/30 transition-all duration-300 group"
                    aria-label="Email Me"
                    data-hover="true"
                  >
                    <Mail size={20} className="transition-transform duration-300 group-hover:scale-110" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Life outside the screen (Photo Strip) ────────────────── */}
      <motion.div 
        {...fadeInUp}
        className="mt-20 md:mt-24"
      >
        <PhotoStrip />
      </motion.div>

      <div className="max-w-5xl mx-auto px-4 md:px-8">
        {/* ── Design Principles ─────────────────────────────────────── */}
        <motion.div 
          {...fadeInUp}
          className="mt-16 md:mt-24"
        >
          <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold mb-12">Design Principles</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                title: "Structure before styling",
                description: "Complex systems need structure before visual polish."
              },
              {
                title: "Clarity in high-density interfaces",
                description: "Enterprise tools require hierarchy, clarity, and readable data flows."
              },
              {
                title: "Design for real products",
                description: "Interfaces must survive engineering constraints and real data."
              },
              {
                title: "Systems over screens",
                description: "Strong systems scale better than individual screens."
              }
            ].map((principle, i) => (
              <div key={i} className="space-y-3">
                <h4 className="text-xl md:text-2xl font-medium text-foreground tracking-tight">
                  {principle.title}
                </h4>
                <p className="text-muted leading-relaxed max-w-md">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
