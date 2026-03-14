"use client";

import TiltParallaxMedia from "@/components/animations/TiltParallaxMedia";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import BackToTop from "@/components/ui/BackToTop";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Tablet, BookOpen } from "lucide-react";

// Icons for the strategic pillars
// Senior Execution, Hands-on Designer terminology
const strategicPillars = [
  {
    icon: Layers,
    title: "Component Architecture",
    desc: "Building modular UI components aligned with Orion's atomic design structure."
  },
  {
    icon: Zap,
    title: "Design Tokens",
    desc: "Applying semantic design tokens to maintain visual consistency across products."
  },
  {
    icon: Tablet,
    title: "Figma Migration",
    desc: "Supporting the transition from Sketch to Figma to improve collaboration and developer handoff."
  },
  {
    icon: BookOpen,
    title: "Documentation",
    desc: "Leveraging centralized documentation to ensure consistent component usage and UI standards."
  }
];

const ProblemSection = () => (
  <section className="w-full flex flex-col items-center gap-20 md:gap-32 px-4">
    <div className="max-w-4xl w-full flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-apple-blue mb-6">Discovery</p>
        <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-12">
          Systems at Critical Mass
        </h2>
      </motion.div>
      
      <div className="flex flex-col gap-6 text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          United Airlines needed a major revamp of its existing employee-facing design system, called ORION.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          As the platform expanded, the original system struggled with inconsistent patterns and fragmented documentation, hindering development speed and visual harmony.
        </motion.p>
      </div>
    </div>

    <div className="w-full max-w-7xl px-2 md:px-0">
      <TiltParallaxMedia 
        title="Evolution of ORION" 
        description="Transforming legacy complexities into a refined, high-performance design ecosystem."
        noPadding={true}
      >
        <div className="w-full h-full relative">
          <video 
            src="/works/Orion/1.mp4" 
            className="w-full h-auto block" 
            loop 
            muted 
            playsInline 
            autoPlay
          />
        </div>
      </TiltParallaxMedia>
    </div>
  </section>
);

const StrategySection = () => {
  return (
    <div className="w-full relative py-20 md:py-32 overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-border bg-secondary/30 shadow-2xl group">
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(-45deg, var(--background), var(--secondary), var(--background))",
          backgroundSize: "400% 400%"
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full flex flex-col items-center">
        <motion.div
          className="text-center mb-16 md:mb-28"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h3 className="text-3xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-4">System Foundations</h3>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">Establishing scalable UI foundations for United's internal product ecosystem.</p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row justify-between w-full gap-16 md:gap-8 mt-4">
          <div className="hidden md:block absolute top-[11px] left-[12.5%] right-[12.5%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line 
                x1="0" y1="1" x2="100%" y2="1" 
                stroke="#007AFF" strokeWidth="2" strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {strategicPillars.map((pillar, i) => (
            <motion.div 
              key={i}
              className="relative z-10 flex flex-row md:flex-col items-start md:items-center flex-1 group cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-10%" }}
              whileHover={{ y: -10 }}
            >
              <div className="relative flex-shrink-0 flex items-center justify-center w-6 h-6 md:mb-10 md:w-auto md:h-auto mx-3 md:mx-auto">
                 <motion.div 
                    className="absolute inset-0 bg-apple-blue w-12 h-12 -left-3 -top-3 md:-left-4 md:-top-4 rounded-full opacity-0 blur-[15px] pointer-events-none" 
                    whileHover={{ opacity: 0.5, scale: 1.5 }}
                    transition={{ duration: 0.4 }}
                 />
                <motion.div 
                  className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-apple-blue ring-4 ring-background relative z-10 shadow-[0_0_10px_rgba(0,122,255,0.2)]"
                  whileHover={{ scale: 1.5, boxShadow: "0 0 25px rgba(0,122,255,0.8)" }}
                />
              </div>

              <div className="pl-6 md:pl-0 text-left md:text-center mt-[-4px] md:mt-0 flex flex-col items-start md:items-center max-w-[280px] mx-auto">
                <h4 className="text-xl md:text-[22px] font-display font-medium text-foreground group-hover:text-foreground transition-colors duration-500 mb-3 tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-[15px] md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500 leading-[1.6] tracking-[0.01em] font-light">
                  {pillar.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function OrionCaseStudy() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = [
    { id: 2, type: "image", src: "/works/Orion/2.png", title: "Brand Identity", description: "Creating the visual identity for the Orion design system." },
    { id: "2a", type: "image", src: "/works/Orion/2a.png" },
    { 
      id: 4, 
      type: "image", 
      src: "/works/Orion/4.png", 
      title: (
        <div className="flex flex-col items-center gap-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-apple-blue">Legacy System</span>
          <span>Why the Old System Didn’t Scale</span>
        </div>
      ), 
      description: "A monolithic Sketch library without tokens limited flexibility and adoption." 
    },
    { 
      id: 5, 
      type: "image", 
      src: "/works/Orion/5.png", 
      title: (
        <div className="flex flex-col items-center gap-4">
          <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-apple-blue">System Transformation</span>
          <span>Turning Point: Figma Migration</span>
        </div>
      ), 
      description: "Rebuilding the design system with variables and modular libraries." 
    },
    { id: 6, type: "image", src: "/works/Orion/6.png", title: "Documentation 2.0", description: (
       <div className="flex flex-col gap-2 mx-auto text-left md:text-center text-sm md:text-base max-w-2xl px-4">
        <p><strong className="text-foreground">Structured documentation site:</strong> Centralized source of truth for all components.</p>
        <p><strong className="text-foreground">Clear usage & states:</strong> Precise guides for designers and developers.</p>
      </div>
    )},
    { 
      id: 7, 
      type: "image", 
      src: "/works/Orion/7.png",
      title: "Scalable Design System Foundations",
      description: "A modular Orion architecture built with shared libraries, semantic variables, and reusable components to support products at enterprise scale."
    },
    { id: 8, type: "image", src: "/works/Orion/8.png" },
    { id: 9, type: "image", src: "/works/Orion/9.png" },
    { id: 10, type: "image", src: "/works/Orion/10.png" },
    { 
      id: 11, 
      type: "image", 
      src: "/works/Orion/11.png",
      title: "Design System in Production",
      description: "Orion components powering real operational tools across multiple internal products."
    },
    { id: 12, type: "image", src: "/works/Orion/12.png" },
    { id: 13, type: "image", src: "/works/Orion/13.png" },
    { id: 14, type: "image", src: "/works/Orion/14.png" },
    { 
      id: 15, 
      type: "image", 
      src: "/works/Orion/15.png",
      title: "BY THE NUMBERS",
      description: "Key metrics from the ORION design system transformation."
    },
  ];

  return (
    <main className="min-h-screen bg-background selection:bg-apple-blue selection:text-white">
      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={heroVideoRef}
            src="/works/Orion/hero.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            loop
            muted
            playsInline
            autoPlay
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-auto md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[13px] font-medium tracking-[0.2em] uppercase text-white/70 mb-6 font-mono">
              United Airlines — Orion Design System
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
              Orion Design<br />
              <span className="text-apple-blue italic md:not-italic">System 2.0</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12 font-medium drop-shadow-sm">
              Architecture for <span className="text-apple-blue font-semibold">enterprise products</span> at scale, bringing clarity, consistency, and visual harmony to tools used by thousands of employees daily.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/20 pt-10 mt-16 w-full max-w-4xl"
          >
            {[
              { label: "My Contribution", value: ["Design System", "UI/UX Design"] },
              { label: "Execution", value: ["Figma Migration", "Component Library"] },
              { label: "Tools", value: "Figma, React" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[12px] uppercase tracking-[0.15em] text-white/50 font-semibold mb-3">{item.label}</span>
                {Array.isArray(item.value) ? (
                  <div className="flex flex-col gap-1">
                    {item.value.map((v, j) => (
                      <span key={j} className="text-[16px] text-white/90 font-medium leading-[1.4]">{v}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[16px] text-white/90 font-medium leading-[1.4]">{item.value}</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Media Section */}
      <section className="w-full py-32 md:py-64 px-4 md:px-8 bg-background flex flex-col items-center gap-48 md:gap-64 overflow-visible">
        <div className="max-w-[1400px] w-full flex flex-col gap-32 md:gap-56">
          
          <ProblemSection />
          
          <StrategySection />

          {galleryItems.map((item, index) => (
            <TiltParallaxMedia 
              key={item.id} 
              title={item.title} 
              description={item.description}
              delayOffset={(index % 4) * 0.15}
              noPadding={item.type === "video"}
            >
              <img 
                src={item.src} 
                alt={typeof item.title === 'string' ? item.title : `Orion Design System Component ${item.id}`} 
                className="w-full h-auto block" 
                loading="lazy"
              />
            </TiltParallaxMedia>
          ))}

        </div>
      </section>

      {/* Apple-Style Minimalist Outcome Section */}
      <section className="w-full py-40 md:py-56 px-4 md:px-12 border-t border-border/30 bg-background/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-sm md:text-base font-medium text-apple-blue uppercase tracking-[0.2em] mb-4">
              Impact & Outcome
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-tight">
              Design at<br />Enterprise <span className="text-apple-blue">Speed</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3 flex flex-col gap-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-2xl md:text-4xl font-display text-foreground leading-snug tracking-tight font-medium">
              Transformed ORION into a high-performance system for the next generation of United employee products.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              By establishing <span className="text-apple-blue font-medium">Structured Foundations</span> and evolving the token system, we enabled faster, reusable page building across all airport and operations tools.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              The migration to Figma and the documentation rebuild provided a <span className="text-apple-blue font-medium">Single Source of Truth</span>, ensuring built-in consistency at scale and drastically reducing implementation debt for engineering teams.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Navigation */}
      <ProjectNavigation 
        nextProject={{
          title: "Ontada Design System",
          company: "McKesson",
          video: "/works/Ontada/thumbnail.mp4",
          href: "/work/ontada"
        }}
      />
      {/* Back to Top */}
      <BackToTop />
    </main>
  );
}
