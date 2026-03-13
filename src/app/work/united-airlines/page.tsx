"use client";

import TiltParallaxMedia from "@/components/animations/TiltParallaxMedia";
import KeyGoalsSection from "@/components/ui/KeyGoalsSection";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// The ordered list of contents for the GSE Case Study
const gseMediaContent = [
  { id: 1, type: "image", src: "/works/gse/1.png" },
  { id: 2, type: "custom-key-goals" },
  { 
    id: 3, 
    type: "video", 
    src: "/works/gse/3.mp4", 
    title: "User Groups",
    cropBottomRight: true, // Flag to apply scale-crop
    trimEnd: 5.5, // Loops the video early at 5.5 seconds
    description: (
      <div className="flex flex-col gap-2 mx-auto text-left md:text-center text-sm md:text-base max-w-2xl px-4">
        <p><strong className="text-foreground">Airport Ops (AO):</strong> submits requests for broken or malfunctioning equipment.</p>
        <p><strong className="text-foreground">GSE Shops:</strong> reviews requests, performs repairs, and updates the status.</p>
        <p className="mt-2 italic">The app helps both groups track service progress across multiple stations in a unified interface.</p>
      </div>
    )
  },
  { id: 4, type: "custom-process" },
  { id: 5, type: "image", src: "/works/gse/5.png" },
  { id: 6, type: "image", src: "/works/gse/6.png" },
  { id: 7, type: "image", src: "/works/gse/7.png", title: "최종목업" },
  { id: 8, type: "image", src: "/works/gse/8.png" },
  { id: 9, type: "image", src: "/works/gse/9.png" },
  { id: 10, type: "image", src: "/works/gse/10.jpeg" },
  { id: 11, type: "image", src: "/works/gse/11.jpeg" },
  { id: 12, type: "video", src: "/works/gse/12.mp4" },
];

const DesignProcessSection = () => {
  const steps = [
    { title: "Define", desc: "Identify key constraints, gather requirements, and align with Airport Ops and GSE teams." },
    { title: "Ideate", desc: "Map interaction flows, create structural blueprints, and draft low-fidelity wireframes." },
    { title: "Design", desc: "Craft high-fidelity UI, applying the Orion 2.0 Design System for pixel-perfect scale." },
    { title: "Refinement", desc: "Validate with stakeholders, conduct QA, and finalize precise specs for dev hand-off." }
  ];

  return (
    <div className="w-full relative py-20 md:py-32 overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-2xl group bg-black">
      {/* Animated Subtle Ambient Background */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(-45deg, #050505, #111111, #080808)",
          backgroundSize: "400% 400%"
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full flex flex-col items-center">
        {/* Title */}
        <motion.div
          className="text-center mb-16 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight mb-4">Design Process</h3>
          <p className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">From initial alignment to enterprise delivery, ensuring every component operates seamlessly at scale.</p>
        </motion.div>

        {/* The 4 Steps Container */}
        <div className="relative flex flex-col md:flex-row justify-between w-full gap-16 md:gap-8 mt-4">
          
          {/* Dashed SVG Line for Desktop */}
          {/* left:12.5% right:12.5% perfectly snaps to the center of 4 equally divided flex-1 child columns */}
          <div className="hidden md:block absolute top-[11px] left-[12.5%] right-[12.5%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line 
                x1="0" y1="1" x2="100%" y2="1" 
                stroke="#FABB04" strokeWidth="2" strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Dashed SVG Line for Mobile (Vertical) */}
          <div className="block md:hidden absolute left-[23px] top-[24px] bottom-[24px] w-[2px] z-0 pointer-events-none">
             <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line 
                x1="1" y1="0" x2="1" y2="100%" 
                stroke="#FABB04" strokeWidth="2" strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {steps.map((step, i) => (
            <motion.div 
              key={i}
              className="relative z-10 flex flex-row md:flex-col items-start md:items-center flex-1 group cursor-default"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20%" }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
            >
              {/* Node Dot Container - Aligned precisely */}
              <div className="relative flex-shrink-0 flex items-center justify-center w-6 h-6 md:mb-10 md:w-auto md:h-auto mx-3 md:mx-auto">
                 {/* Glow Background */}
                 <div className="absolute inset-0 bg-[#FABB04] w-12 h-12 -left-3 -top-3 md:-left-4 md:-top-4 rounded-full opacity-0 group-hover:opacity-40 blur-[15px] transition-all duration-500 pointer-events-none" />
                 {/* The Dot */}
                 <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#FABB04] ring-4 ring-black group-hover:scale-[1.3] transition-transform duration-500 relative z-10 shadow-[0_0_10px_rgba(250,187,4,0.2)] md:group-hover:shadow-[0_0_20px_rgba(250,187,4,0.8)]" />
              </div>

              {/* Text Typography (Apple-Style Hierarchy) - Centered under dot */}
              <div className="pl-6 md:pl-0 text-left md:text-center mt-[-4px] md:mt-0 flex flex-col items-start md:items-center max-w-[280px] mx-auto">
                <h4 className="text-xl md:text-[22px] font-display font-medium text-white/80 group-hover:text-white transition-colors duration-500 mb-3 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-[15px] md:text-base text-white/40 group-hover:text-white/80 transition-colors duration-500 leading-[1.6] tracking-[0.01em] font-light">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function GSEWorkDetail() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure the video plays immediately on mount
    if (heroVideoRef.current) {
      heroVideoRef.current.play().catch(() => {});
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-black selection:bg-apple-blue selection:text-white">
      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-6 overflow-hidden">
        {/* Full-screen Background Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            ref={heroVideoRef}
            src="/works/gse/hero.mp4"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
            loop
            muted
            playsInline
            autoPlay
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
            <span className="block text-[13px] font-medium tracking-[0.2em] uppercase text-white/40 mb-6 font-mono">
              United Airlines — Internal Platform
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.05] mb-8">
              Ground Service Equipment<br />
              <span className="text-apple-blue italic md:not-italic">Request Queue</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
              Enterprise interface for <span className="text-apple-blue/90 font-medium">United Airlines</span> for managing airport equipment requests to <span className="text-apple-blue/90 font-medium whitespace-nowrap">track, manage, and resolve</span> repair requests in real time.
            </p>
          </motion.div>

          {/* Metadata Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 border-t border-white/10 pt-10 mt-16 w-full max-w-4xl"
          >
            {[
              { label: "Role", value: "Product Design" },
              { label: "Scope", value: ["Interface Design", "Design Systems"] },
              { label: "Platform", value: "Enterprise Web App" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-[12px] uppercase tracking-[0.15em] text-white/40 font-semibold mb-3">{item.label}</span>
                {Array.isArray(item.value) ? (
                  <div className="flex flex-col gap-1">
                    {item.value.map((v, j) => (
                      <span key={j} className="text-[16px] text-white/80 font-medium leading-[1.4]">{v}</span>
                    ))}
                  </div>
                ) : (
                  <span className="text-[16px] text-white/80 font-medium leading-[1.4]">{item.value}</span>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Study Media Section */}
      <section className="w-full py-24 md:py-40 px-4 md:px-8 bg-background flex flex-col items-center gap-32 md:gap-48 overflow-visible">
        <div className="max-w-[1400px] w-full flex flex-col gap-24 md:gap-40">
          
          {gseMediaContent.map((item, index) => {
            if (item.type === "custom-process") {
              return <DesignProcessSection key={item.id} />;
            }
            if (item.type === "custom-key-goals") {
              return <KeyGoalsSection key={item.id} />;
            }
            
            return (
              <TiltParallaxMedia 
                key={item.id} 
                title={item.title} 
                description={item.description}
                delayOffset={(index % 4) * 0.15} // Slight cascade delay block rhythm
                noPadding={item.type === "video"} // Videos get full bleed, images get the studio padded backdrop
              >
                {item.type === "image" ? (
                  <img 
                    src={item.src} 
                    alt={item.title || `GSE Render ${item.id}`} 
                    className="w-full h-auto block" // "object-cover" was what cropped the edges when container was constrained! 
                    loading="lazy"
                  />
                ) : (
                  <div className={`w-full h-full relative ${item.cropBottomRight ? 'scale-[1.08] origin-top-left' : ''}`}>
                    <video 
                      src={item.src} 
                      className="w-full h-auto block" 
                      loop 
                      muted 
                      playsInline 
                      autoPlay
                      onTimeUpdate={(e) => {
                        const video = e.target as HTMLVideoElement;
                        if (item.trimEnd && video.currentTime >= item.trimEnd) {
                          video.currentTime = 0;
                          video.play().catch(() => {});
                        }
                      }}
                    />
                  </div>
                )}
              </TiltParallaxMedia>
            );
          })}

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
              Business Outcome
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-tight">
              Enterprise<br />Scale & <span className="text-apple-blue">Quality</span>
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
              Delivered a robust, scalable interface seamlessly integrated with United Airlines' <span className="text-apple-blue">Orion 2.0 Design System</span>.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              By deeply engaging with cross-functional stakeholders and standardizing complex data logic, I crafted an intuitive tracking queue that empowered <span className="text-apple-blue font-medium">Airport Ops and GSE Teams</span> to monitor, prioritize, and resolve maintenance requests in real-time.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              This execution minimized downtime and streamlined ground operations across high-traffic enterprise environments, showcasing an ability to translate complex business requirements into elegant, component-driven products tailored for monumental corporate scale.
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
