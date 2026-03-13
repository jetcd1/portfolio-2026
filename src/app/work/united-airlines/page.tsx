"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ChallengeCards from "@/components/ui/ChallengeCards";
import DesignApproach from "@/components/ui/DesignApproach";

export default function GSEWorkDetail() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] selection:bg-apple-blue selection:text-white">
      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Ambient background light */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-apple-blue/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[13px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6">
              United Airlines — Internal Platform
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium text-white tracking-tight leading-[1.1] mb-8">
              Ground Service Equipment<br />
              <span className="text-white/60">Request Queue</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 font-light">
              Enterprise interface for managing airport equipment requests across stations.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 border-t border-white/10 pt-8 w-full max-w-3xl"
          >
            {[
              { label: "Role", value: "Product Designer" },
              { label: "Scope", value: "Interface Design, Systems" },
              { label: "Platform", value: "Enterprise Web" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center md:items-start">
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-medium mb-1">{item.label}</span>
                <span className="text-sm text-white/70 font-medium">{item.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="relative mt-20 w-full max-w-7xl mx-auto px-4 perspective-1000"
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)]">
            <video
              ref={heroVideoRef}
              src="/works/gse/hero.mp4"
              className="w-full h-auto object-cover opacity-90"
              loop
              muted
              playsInline
              autoPlay
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-white/20 pointer-events-none rounded-[2rem]" />
          </div>
        </motion.div>
      </section>

      {/* ─── Project Context ────────────────────────────────────────────── */}
      <section className="w-full py-32 md:py-48 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-apple-blue mb-6 block">Backstory</span>
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-8 leading-tight">
              A fragmented ecosystem<br />reimagined for scale.
            </h2>
            <div className="space-y-6 text-lg text-white/50 font-light leading-relaxed">
              <p>
                Airport operations teams manage large volumes of equipment requests across multiple stations. Existing workflows relied on fragmented tools and manual coordination.
              </p>
              <p>
                This project introduced a unified request queue integrated with the Orion Design System, streamlining communication between Airport Ops and GSE maintenance shops.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-3xl overflow-hidden shadow-2xl border border-white/5"
          >
            <img src="/works/gse/1.png" alt="Operational Environment" className="w-full h-auto" />
          </motion.div>
        </div>
      </section>

      {/* ─── Key Challenges ─────────────────────────────────────────────── */}
      <ChallengeCards />

      {/* ─── Design Approach ────────────────────────────────────────────── */}
      <DesignApproach />

      {/* ─── Interface Exploration ──────────────────────────────────────── */}
      <section className="w-full py-32 md:py-48 px-6 space-y-32 md:space-y-56">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-apple-blue mb-4 block">Process</span>
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Interface Exploration</h2>
          </motion.div>

          <div className="space-y-40">
            {/* Visual 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="group"
            >
              <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                <img src="/works/gse/5.png" alt="Exploration 1" className="w-full h-auto" />
              </div>
              <p className="mt-8 text-white/40 text-center font-light tracking-wide uppercase text-[10px]">
                Exploring table structures for high-density operational data.
              </p>
            </motion.div>

            {/* Visual 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="group"
            >
              <div className="rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl transition-transform duration-700 group-hover:scale-[1.01]">
                <img src="/works/gse/6.png" alt="Exploration 2" className="w-full h-auto" />
              </div>
              <p className="mt-8 text-white/40 text-center font-light tracking-wide uppercase text-[10px]">
                Testing request status interactions and prioritization logic.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Final Product ─────────────────────────────────────────────── */}
      <section className="w-full py-32 md:py-56 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24 text-center"
          >
            <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-apple-blue mb-4 block">Result</span>
            <h2 className="text-4xl md:text-6xl font-display font-medium text-white tracking-tight">Final Product</h2>
          </motion.div>

          {/* Cinematic Spaced Visuals */}
          <div className="flex flex-col gap-32 md:gap-64">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.2 }}
              className="relative aspect-video rounded-[3rem] overflow-hidden shadow-[0_60px_120px_rgba(0,0,0,0.6)] border border-white/10"
            >
              <img src="/works/gse/7.png" alt="Final UI 1" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
              >
                <img src="/works/gse/8.png" alt="Final UI 2" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="aspect-square rounded-[2rem] overflow-hidden shadow-2xl border border-white/5"
              >
                <img src="/works/gse/9.png" alt="Final UI 3" className="w-full h-full object-cover" />
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <video src="/works/gse/12.mp4" loop muted autoPlay playsInline className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── Impact ─────────────────────────────────────────────────────── */}
      <section className="w-full py-40 md:py-64 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-7xl font-display font-medium text-white mb-20 tracking-tight">Impact</h2>
            <div className="flex flex-col gap-12 items-center">
              {[
                "Improved visibility of equipment requests across airport operations teams.",
                "Standardized operational workflows using the Orion Design System.",
                "Reduced manual coordination between maintenance and operations teams."
              ].map((text, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: i * 0.2 }}
                  className="flex flex-col items-center max-w-2xl"
                >
                  <div className="h-px w-12 bg-apple-blue mb-8 opacity-40" />
                  <p className="text-xl md:text-3xl text-white font-light tracking-tight leading-snug">
                    {text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-32"
          >
            <Link 
              href="/#work" 
              className="inline-flex items-center gap-4 px-10 py-5 rounded-full bg-white text-black font-medium text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-2xl shadow-white/10"
            >
              Back to Projects
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
