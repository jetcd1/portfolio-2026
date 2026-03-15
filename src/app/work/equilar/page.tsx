"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProjectNavigation from "@/components/ui/ProjectNavigation";
import BackToTop from "@/components/ui/BackToTop";

// Reusable component for media with parallax offset and tilt
function ParallaxImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  return (
    <motion.div ref={ref} style={{ y: springY }} className={`relative w-full overflow-hidden rounded-lg md:rounded-2xl ${className}`}>
      <img src={src} alt={alt} className="w-full h-auto block" loading="lazy" />
    </motion.div>
  );
}

// Custom Section 2: Boardroom Connections Interaction (Code-driven instead of 2.png)
function ConnectionsInteraction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const profiles = [
    { name: "Sarah Jenkins", role: "CEO, TechFlow", initials: "SJ", color: "bg-blue-500" },
    { name: "David Chen", role: "Board Member, Apex", initials: "DC", color: "bg-purple-500" },
    { name: "Elena Rodriguez", role: "Partner, Venturi Cap", initials: "ER", color: "bg-emerald-500" },
    { name: "Marcus Thorne", role: "EVP Strategy", initials: "MT", color: "bg-orange-500" },
  ];

  return (
    <div ref={containerRef} className="w-full py-24 flex flex-col items-center justify-center bg-white/5 rounded-3xl border border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-50 blur-3xl" />
      
      <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col md:flex-row items-center gap-16 justify-center">
        {/* Central Node */}
        <motion.div 
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
          className="relative w-32 h-32 rounded-full border-2 border-white/20 bg-black/50 backdrop-blur-md flex items-center justify-center z-20"
        >
          <div className="w-24 h-24 rounded-full bg-apple-blue/20 flex flex-col items-center justify-center">
             <span className="text-apple-blue font-bold text-2xl">You</span>
          </div>
          
          {/* Connecting Lines */}
          <svg className="absolute w-[400px] h-[400px] pointer-events-none -z-10" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
             <motion.circle cx="200" cy="200" r="120" stroke="rgba(255,255,255,0.1)" strokeWidth="1" fill="none" />
             <motion.circle cx="200" cy="200" r="180" stroke="rgba(255,255,255,0.05)" strokeWidth="1" fill="none" strokeDasharray="4 4"/>
             {profiles.map((_, i) => (
                <motion.line 
                  key={`line-${i}`}
                  x1="200" y1="200"
                  x2={200 + Math.cos((i * Math.PI) / 2 + Math.PI/4) * 120}
                  y2={200 + Math.sin((i * Math.PI) / 2 + Math.PI/4) * 120}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="2"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.2 }}
                />
             ))}
          </svg>
        </motion.div>

        {/* Orbiting Profile Cards */}
        <div className="grid grid-cols-2 gap-6 relative z-20">
          {profiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, x: 20, y: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 + index * 0.15 }}
              className="bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex items-center gap-4 hover:bg-white/10 hover:border-white/30 transition-all cursor-default"
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${profile.color}`}>
                {profile.initials}
              </div>
              <div>
                <p className="text-white text-sm font-medium">{profile.name}</p>
                <p className="text-white/50 text-xs">{profile.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="mt-16 text-center max-w-xl px-4"
      >
        <h4 className="text-white font-display text-2xl md:text-3xl mb-4 font-medium tracking-tight">Mapping the Boardroom</h4>
        <p className="text-white/60 text-sm md:text-base leading-relaxed">
          Search over 300K profiles and visually map "who knows who" to uncover hidden pathways and secure your most important business meetings.
        </p>
      </motion.div>
    </div>
  );
}

export default function EquilarCaseStudy() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const headerOpacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  return (
    <main ref={containerRef} className="min-h-screen bg-background selection:bg-apple-blue selection:text-white pb-0">
      
      {/* ─── Hero Section ────────────────────────────────────────────── */}
      <section className="relative w-full h-screen min-h-[800px] flex items-end justify-center pb-24 px-4 overflow-hidden bg-black">
        {/* Video Background */}
        <div className="absolute inset-0 z-0 select-none">
          <video 
            src="/works/equilarapp/hero.mp4" 
            autoPlay loop muted playsInline 
            className="w-full h-full object-cover brightness-[0.6] md:brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-background" />
        </div>

        {/* Global Back Link */}
        <motion.div style={{ opacity: headerOpacity }} className="absolute top-8 left-4 md:top-12 md:left-10 z-50">
          <Link href="/work" className="inline-flex items-center gap-2 group px-4 py-2 rounded-full bg-black/20 backdrop-blur-md border border-white/10 hover:bg-white hover:text-black transition-all duration-500">
            <ArrowLeft className="w-4 h-4 text-white/70 group-hover:text-black transition-colors" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/70 group-hover:text-black transition-colors">All Work</span>
          </Link>
        </motion.div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-6xl flex flex-col md:flex-row justify-between items-end gap-12">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }}>
              <motion.h1 
                className="text-5xl md:text-7xl lg:text-[7rem] font-display font-medium text-white tracking-tighter leading-none mb-6 drop-shadow-2xl"
              >
                Equilar App
              </motion.h1>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.8 }}
              className="text-white/80 text-lg md:text-2xl font-light leading-relaxed max-w-2xl drop-shadow-md"
            >
              Equilar is the leading provider of board intelligence solutions. The Equilar app helps you with business development and prepares you for your most important business meetings.
            </motion.p>
          </div>
        </div>
      </section>

      {/* ─── Role & Context ─────────────────────────────────────────── */}
      <section className="w-full py-24 md:py-32 px-4 md:px-8 border-b border-border/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-16 md:gap-24">
          <motion.div 
            className="md:w-1/3 flex flex-col gap-12"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
          >
            <div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-3">Role</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Senior Product Designer (Hands-on)<br />
                End-to-end UX/UI, Prototyping, and Visual Design
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-3">Timeline & Toolkit</h3>
              <p className="text-foreground text-sm leading-relaxed">
                Mar 2016 — Oct 2017<br />
                Illustrator, Sketch, After Effects
              </p>
            </div>
            <div>
              <h3 className="text-xs font-bold text-muted uppercase tracking-[0.2em] mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {["BRANDING", "MOBILE UI", "UX", "DESIGN SYSTEM"].map(tag => (
                  <span key={tag} className="text-[10px] tracking-widest uppercase px-3 py-1.5 border border-border/50 rounded-full text-foreground/70 bg-foreground/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-2xl md:text-4xl font-display font-medium text-foreground leading-tight tracking-tight mb-8">
              Navigating Boardroom Connections with Clarity
            </h2>
            <div className="text-muted text-base md:text-lg font-light leading-relaxed flex flex-col gap-6">
              <p>
                As a hands-on Senior Designer, I led the mobile UX and UI design for the Equilar App from the ground up. My goal was to distill a massive database of over 300,000 executive profiles into an intuitive, high-performance mobile experience that executives could use on the go.
              </p>
              <p>
                The challenge lay in designing powerful search and network-mapping interactions that felt effortless, helping users instantly identify "who knows who" to tap into new business opportunities seamlessly.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── Gallery Showcases ──────────────────────────────────────── */}
      <section className="w-full py-24 md:py-40 px-4 md:px-8 bg-background flex flex-col items-center gap-24 md:gap-40">
        <div className="max-w-[1200px] w-full flex flex-col gap-24 md:gap-40">
          
          {/* Section 1: The Foundation */}
          <div className="flex flex-col gap-8">
            <ParallaxImage src="/works/equilarapp/1.png" alt="Equilar UI Setup" />
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-2xl mx-auto mt-4">
              <h3 className="text-xl font-display font-medium mb-2">Establishing the Core Experience</h3>
              <p className="text-muted font-light text-sm">Translating complex data grids into digestable, premium mobile interfaces.</p>
            </motion.div>
            <ParallaxImage src="/works/equilarapp/1a.png" alt="Equilar Wireframes & Flows" className="mt-12" />
          </div>

          {/* Section 2: Custom Coded Interaction (Replacing 2.png) */}
          <ConnectionsInteraction />

          {/* Sections 3 through 6: Feature Deep Dives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-6">
              <ParallaxImage src="/works/equilarapp/3.png" alt="Equilar UI Feature 3" />
              <div className="px-2">
                <h4 className="font-display font-medium mb-1">Executive Profiles</h4>
                <p className="text-muted text-xs font-light">Comprehensive data structured for quick scanning.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-0 md:mt-24">
              <ParallaxImage src="/works/equilarapp/4.png" alt="Equilar UI Feature 4" />
              <div className="px-2">
                <h4 className="font-display font-medium mb-1">Network Synergy</h4>
                <p className="text-muted text-xs font-light">Visual indicators for shared board history.</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center w-full">
            <ParallaxImage src="/works/equilarapp/4a.png" alt="Equilar Interface detail" className="max-w-4xl" />
          </div>

          {/* Sections 5 & 6 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <div className="flex flex-col gap-6">
              <ParallaxImage src="/works/equilarapp/5.png" alt="Equilar Connections" />
              <div className="px-2">
                <h4 className="font-display font-medium mb-1">Radar View</h4>
                <p className="text-muted text-xs font-light">Mapping corporate influence radii.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 mt-0 md:mt-24">
              <ParallaxImage src="/works/equilarapp/6.png" alt="Equilar Data Visualization" />
              <div className="px-2">
                <h4 className="font-display font-medium mb-1">Advanced Filters</h4>
                <p className="text-muted text-xs font-light">Drill down by industry, cap, and tenure.</p>
              </div>
            </div>
          </div>

          {/* Large Scale Screens 7 - 9 */}
          <div className="flex flex-col gap-16">
            <ParallaxImage src="/works/equilarapp/7.png" alt="Equilar Flow 1" />
            <ParallaxImage src="/works/equilarapp/8.png" alt="Equilar Flow 2" />
            <ParallaxImage src="/works/equilarapp/9.png" alt="Equilar Flow 3" />
          </div>

          {/* Final Details 10 - 13 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
            <ParallaxImage src="/works/equilarapp/10.png" alt="Equilar Asset 1" />
            <ParallaxImage src="/works/equilarapp/11.png" alt="Equilar Asset 2" />
            <ParallaxImage src="/works/equilarapp/12.png" alt="Equilar Asset 3" className="md:col-span-2" />
            <ParallaxImage src="/works/equilarapp/13.png" alt="Equilar Asset 4" className="md:col-span-2" />
          </div>

        </div>
      </section>

      {/* ─── Apple-Style Minimalist Outcome Section ─────────────────── */}
      <section className="w-full py-40 md:py-56 px-4 md:px-12 border-t border-border/30 bg-background/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-sm md:text-base font-medium text-apple-blue uppercase tracking-[0.2em] mb-4">
              Business Outcome
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-tight">
              Actionable<br />Intelligence at <span className="text-apple-blue">Scale</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3 flex flex-col gap-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-2xl md:text-4xl font-display text-foreground leading-snug tracking-tight font-medium">
              Transformed an overwhelming dataset into a powerful, executive-ready networking tool.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              By designing a clean, modern interface and implementing intuitive interaction patterns, the Equilar app significantly reduced the time it took executives to uncover strategic boardroom connections.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              This hands-on design execution brought clarity to complex relationship data, establishing a new standard for mobile business development tools within the organization.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Global Navigation ───────────────────────────────────────── */}
      <ProjectNavigation 
        previousProject={{
          title: "Ontada Design System",
          company: "McKesson",
          video: "/works/Ontada/thumbnail.mp4",
          href: "/work/ontada"
        }}
        nextProject={{
          title: "Ground Service Equipment Request Queue",
          company: "United Airlines",
          video: "/works/gse/thumbnail.mp4",
          href: "/work/united-airlines"
        }}
      />
      
      {/* Back to Top */}
      <BackToTop />
    </main>
  );
}
