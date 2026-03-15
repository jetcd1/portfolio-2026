"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Search, Share2, BarChart3, Apple, Monitor, Database, Users, CheckCircle2 } from "lucide-react";

import TiltParallaxMedia from "@/components/animations/TiltParallaxMedia";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import BackToTop from "@/components/ui/BackToTop";

// --- Custom Section: My Role ---
function MyRoleSection() {
  const roles = [
    { title: "Product UI / Visual Design", desc: "Establishing a premium, high-density visual language." },
    { title: "Interaction Design", desc: "Crafting fluid transitions and complex data interactions." },
    { title: "Design System", desc: "Building a scalable component ecosystem for consistency." },
    { title: "Data Visualization", desc: "Translating complex board data into actionable insights." }
  ];

  return (
    <section className="w-full py-32 px-6 bg-black/20 overflow-hidden relative border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3"
          >
            <h3 className="text-apple-blue font-mono text-[11px] uppercase tracking-[0.3em] mb-4">My Role</h3>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              Leading the <br />Experience Design
            </h2>
          </motion.div>
          
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
            {roles.map((role, i) => (
              <motion.div 
                key={role.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="group"
              >
                <div className="h-[2px] w-8 bg-apple-blue/30 group-hover:w-full transition-all duration-700 ease-out mb-6" />
                <h4 className="text-xl font-display font-medium text-white mb-2">{role.title}</h4>
                <p className="text-white/40 text-sm leading-relaxed font-light">{role.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Scroll Entrance Wrapper
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.98 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}

// --- Custom Section 5: Search, Connect, Benchmark Interaction ---
function PillarInteraction() {
  const pillars = [
    {
      icon: <Search className="w-12 h-12 text-blue-400" />,
      title: "Search",
      description: "Search the BoardEdge database of more than 185,000 public company board members and executives for candidates who meet various experiential and demographic criteria.",
      accent: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Share2 className="w-12 h-12 text-pink-400" />,
      title: "Connect",
      description: "Identify qualified candidates by viewing the myriad ways in which your board of directors is linked to other individuals, boards and companies, including historical professional connections.",
      accent: "from-pink-500/20 to-purple-500/20"
    },
    {
      icon: <BarChart3 className="w-12 h-12 text-emerald-400" />,
      title: "Benchmark",
      description: "Use the same data points as institutional investors to evaluate board composition, including age, tenure, gender, share ownership and industry experience.",
      accent: "from-emerald-500/20 to-teal-500/20"
    }
  ];

  return (
    <div className="w-full py-24 px-8 bg-white/5 rounded-3xl border border-white/10 overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-pink-500/5 opacity-50 blur-3xl -z-10" />
      
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-apple-blue font-mono text-xs uppercase tracking-[0.3em] mb-4 block">Core Principles</span>
          <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">The Premier Board Recruitment Solution</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
          {pillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -10 }}
              className="group relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`} />
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="mb-6 p-4 rounded-full bg-white/5 group-hover:bg-white/10 transition-colors duration-500">
                  {pillar.icon}
                </div>
                <h4 className="text-2xl font-display font-medium text-white mb-4">{pillar.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed font-light line-clamp-4 group-hover:line-clamp-none transition-all duration-500">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Lightbox Component
function Lightbox({ src, isOpen, onClose }: { src: string; isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
        >
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            src={src}
            alt="Fullscreen preview"
            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          />
          <button 
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
            onClick={onClose}
          >
            <span className="text-sm uppercase tracking-widest">Close</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BoardedgeCaseStudy() {
  const containerRef = useRef<HTMLElement>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main ref={containerRef} className="min-h-screen bg-background selection:bg-apple-blue selection:text-white pb-0">
      
      <Lightbox src={lightboxImg || ""} isOpen={!!lightboxImg} onClose={() => setLightboxImg(null)} />

      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-6 overflow-hidden">
        {/* Full-screen Background Image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/works/boardedge/hero.png"
            alt="Boardedge Hero Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60 brightness-75"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black pointer-events-none" />
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[13px] font-medium tracking-[0.2em] uppercase text-apple-blue mb-6 font-mono">
              Equilar — Board Recruiting
            </span>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.05] mb-10 drop-shadow-lg">
              Board<span className="text-apple-blue italic md:not-italic">edge</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed mb-6 font-medium drop-shadow-sm">
              <span className="text-apple-blue font-semibold">Boardedge</span> is a premier platform for shareholder engagement and board recruiting. Improving <span className="text-apple-blue font-semibold">board governance</span> creates stronger businesses and a better world.
            </p>
          </motion.div>

          {/* Metadata Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/20 pt-10 mt-16 w-full max-w-4xl"
          >
            {[
              { label: "Scope", value: ["Product UI, UX", "Design System"] },
              { label: "Tools", value: ["Photoshop, Illustrator", "Sketch, After Effects"] },
              { label: "Timeline", value: "Mar 2015 — Mar 2019" }
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

      {/* ─── My Role Section ─────────────────────────────── */}
      <MyRoleSection />

      {/* ─── Case Study Media Section ─────────────────────────────────── */}
      <section className="w-full py-32 md:py-64 px-4 md:px-8 bg-background flex flex-col items-center gap-48 md:gap-80 overflow-visible">
        <div className="max-w-[1400px] w-full flex flex-col gap-40 md:gap-72">
          
          <ScrollReveal>
            <TiltParallaxMedia 
              title="Product Dashboard"
              description="Establishing the visual language for a data-dense executive recruiting platform."
            >
              <div onClick={() => setLightboxImg("/works/boardedge/4.png")} className="cursor-zoom-in">
                <img src="/works/boardedge/4.png" alt="Boardedge Dashboard" className="w-full h-auto" />
              </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia>
              <PillarInteraction />
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia title="UI System Details">
               <div className="flex flex-col gap-24">
                 <div onClick={() => setLightboxImg("/works/boardedge/6.png")} className="cursor-zoom-in">
                   <img src="/works/boardedge/6.png" alt="Data Vis" className="w-full h-auto" />
                 </div>
                 <div onClick={() => setLightboxImg("/works/boardedge/6a.png")} className="cursor-zoom-in">
                   <img src="/works/boardedge/6a.png" alt="UI Detail A" className="w-full h-auto" />
                 </div>
                 <div onClick={() => setLightboxImg("/works/boardedge/6b.png")} className="cursor-zoom-in">
                   <img src="/works/boardedge/6b.png" alt="UI Detail B" className="w-full h-auto" />
                 </div>
               </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia title="Personal Profile">
              <div onClick={() => setLightboxImg("/works/boardedge/7.png")} className="cursor-zoom-in">
                <img src="/works/boardedge/7.png" alt="Advanced Search" className="w-full h-auto" />
              </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia title="Company Profiles">
              <div onClick={() => setLightboxImg("/works/boardedge/8.png")} className="cursor-zoom-in">
                <img src="/works/boardedge/8.png" alt="Company Profile" className="w-full h-auto" />
              </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia 
              title="Product Environment"
              description="A data-driven platform designed to help executives explore corporate relationships, analyze networks, and identify strategic business opportunities."
            >
              <div onClick={() => setLightboxImg("/works/boardedge/9.png")} className="cursor-zoom-in">
                <img src="/works/boardedge/9.png" alt="Mobile UI" className="w-full h-auto" />
              </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia 
              title="Board Research Reports"
              description="Generate detailed board analysis reports and export insights in downloadable PDF format."
            >
               <div onClick={() => setLightboxImg("/works/boardedge/10.png")} className="cursor-zoom-in">
                  <img src="/works/boardedge/10.png" alt="Marketing 1" className="w-full h-auto" />
               </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia>
               <div onClick={() => setLightboxImg("/works/boardedge/11.png")} className="cursor-zoom-in">
                 <img src="/works/boardedge/11.png" alt="Marketing 2" className="w-full h-auto" />
               </div>
            </TiltParallaxMedia>
          </ScrollReveal>

          <ScrollReveal>
            <TiltParallaxMedia>
               <div onClick={() => setLightboxImg("/works/boardedge/12.gif")} className="cursor-zoom-in">
                 <img src="/works/boardedge/12.gif" alt="Prototype A" className="w-full h-auto rounded-xl" />
               </div>
            </TiltParallaxMedia>
          </ScrollReveal>

        </div>
      </section>

      {/* ─── Apple-Style Outcome Section ─────────────────── */}
      <section className="w-full py-40 md:py-56 px-4 md:px-12 border-t border-border/30 bg-background/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-sm md:text-base font-medium text-apple-blue uppercase tracking-[0.2em] mb-4">
              Product Impact
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-tight">
              Optimizing <br /><span className="text-apple-blue">Insight</span>
            </h2>
          </motion.div>
          
          <motion.div 
            className="md:w-2/3 flex flex-col gap-10"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <p className="text-2xl md:text-4xl font-display text-foreground leading-snug tracking-tight font-medium">
              Redesigned the BoardEdge experience to transform complex governance data into clear, actionable insights.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              The platform enables institutional investors and board members to explore executive networks, benchmark board composition, and identify potential board recruitment opportunities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Global Navigation ───────────────────────────────────────── */}
      <ProjectNavigation 
        previousProject={{
          title: "Equilar App",
          company: "Equilar",
          video: "/works/equilarapp/thumbnail.mp4",
          href: "/work/equilar"
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
