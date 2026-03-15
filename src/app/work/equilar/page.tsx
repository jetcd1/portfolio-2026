"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import TiltParallaxMedia from "@/components/animations/TiltParallaxMedia";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import BackToTop from "@/components/ui/BackToTop";

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
    <main ref={containerRef} className="min-h-screen bg-background selection:bg-apple-blue selection:text-white pb-0 pt-[120px] md:pt-[160px]">
      
      {/* Global Back Link */}
      <motion.div style={{ opacity: headerOpacity }} className="fixed top-8 left-4 md:top-12 md:left-10 z-[100]">
        <Link href="/work" className="inline-flex items-center gap-2 group px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-border/50 hover:bg-foreground hover:text-background transition-all duration-500 shadow-sm">
          <ArrowLeft className="w-4 h-4 text-muted-foreground group-hover:text-background transition-colors" />
          <span className="text-xs font-medium tracking-widest uppercase text-muted-foreground group-hover:text-background transition-colors">All Work</span>
        </Link>
      </motion.div>

      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-6 overflow-hidden">
        {/* Full-screen Background Image (1.png instead of video for this specific work) */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/works/equilarapp/1.png"
            alt="Equilar Hero Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
          />
          {/* Cinematic Overlay */}
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
              Equilar — Board Intelligence
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
              Equilar <span className="text-apple-blue italic md:not-italic">App</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-12 font-medium drop-shadow-sm">
              Equilar is the leading provider of board intelligence solutions. The Equilar app helps you with business development and be prepared for your most important business meetings. Search over 300K profiles of executives and board members (who are typically not on LinkedIn), identify “who knows who” and navigate boardroom connections to tap new business opportunities.
            </p>
          </motion.div>

          {/* Metadata Grid (Consistent with other works) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/20 pt-10 mt-16 w-full max-w-4xl"
          >
            {[
              { label: "Scope", value: ["Branding, Mobile UI", "UX, Design System"] },
              { label: "Tools", value: ["Illustrator, Sketch", "After Effects"] },
              { label: "Timeline", value: "Mar 2016 — Oct 2017" }
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

      {/* ─── Case Study Media Section ─────────────────────────────────── */}
      <section className="w-full py-32 md:py-64 px-4 md:px-8 bg-background flex flex-col items-center gap-48 md:gap-64 overflow-visible">
        <div className="max-w-[1400px] w-full flex flex-col gap-32 md:gap-56">
          
          <TiltParallaxMedia 
            title="Connections Interaction" 
            description="Developing a dynamic visual language to represent complex boardroom networks."
          >
            <ConnectionsInteraction />
          </TiltParallaxMedia>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <TiltParallaxMedia 
              title="Brand Identity System" 
              description="Color, typography, and visual language established for product consistency."
            >
              <img src="/works/equilarapp/3.png" alt="Brand Identity" className="w-full h-auto" />
            </TiltParallaxMedia>
            
            <TiltParallaxMedia 
              title="Logo Design Exploration" 
              description="Developing a geometric identity symbolizing connection, structure, and executive networks."
              delayOffset={0.2}
            >
              <div className="mt-0 md:mt-24">
                <img src="/works/equilarapp/4.png" alt="Logo Exploration" className="w-full h-auto" />
              </div>
            </TiltParallaxMedia>
          </div>

          <TiltParallaxMedia 
            title="Icon System" 
            description="A unified icon library designed to support fast scanning and clarity across data-dense enterprise interfaces."
          >
            <img src="/works/equilarapp/4a.png" alt="Icon System" className="w-full h-auto max-w-4xl mx-auto" />
          </TiltParallaxMedia>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <TiltParallaxMedia 
              title="Ideation & Exploration" 
              description="Whiteboard sessions and quick sketches used to shape early product concepts."
            >
              <img src="/works/equilarapp/5.png" alt="Ideation" className="w-full h-auto" />
            </TiltParallaxMedia>
            
            <TiltParallaxMedia 
              title="Primary User Profile" 
              description="Mapping motivations, environments, and pain points of executive decision-makers."
              delayOffset={0.2}
            >
              <div className="mt-0 md:mt-24">
                <img src="/works/equilarapp/6.png" alt="User Profile" className="w-full h-auto" />
              </div>
            </TiltParallaxMedia>
          </div>

          <TiltParallaxMedia 
            title={(
              <div className="flex flex-col items-center gap-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-apple-blue">Structure</span>
                <span>Information Architecture</span>
              </div>
            )}
          >
            <img src="/works/equilarapp/7.png" alt="Information Architecture" className="w-full h-auto" />
          </TiltParallaxMedia>

          <TiltParallaxMedia 
            title={(
              <div className="flex flex-col items-center gap-4">
                <span className="text-[11px] font-mono uppercase tracking-[0.22em] text-apple-blue">Ideation</span>
                <span>Wireframes and Flows</span>
              </div>
            )}
          >
            <img src="/works/equilarapp/8.png" alt="Wireframes" className="w-full h-auto" />
          </TiltParallaxMedia>

          <TiltParallaxMedia noPadding={true}>
            <img src="/works/equilarapp/9.png" alt="Flow Detail" className="w-full h-auto" />
          </TiltParallaxMedia>

          <TiltParallaxMedia 
            title="Final Mockups" 
            description="Polished interface designs crafted for high-performance enterprise use."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <img src="/works/equilarapp/10.png" alt="Final Mockup 1" className="w-full h-auto" />
              <img src="/works/equilarapp/11.png" alt="Final Mockup 2" className="w-full h-auto" />
            </div>
          </TiltParallaxMedia>

          <TiltParallaxMedia noPadding={true}>
            <img src="/works/equilarapp/12.png" alt="Product Detail 1" className="w-full h-auto" />
          </TiltParallaxMedia>

          <TiltParallaxMedia noPadding={true}>
            <img src="/works/equilarapp/13.png" alt="Product Detail 2" className="w-full h-auto" />
          </TiltParallaxMedia>

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
