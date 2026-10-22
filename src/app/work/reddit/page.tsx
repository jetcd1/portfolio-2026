"use client";

import TiltParallaxMedia from "@/components/animations/TiltParallaxMedia";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import BackToTop from "@/components/ui/BackToTop";
import AmbientLight from "@/components/animations/AmbientLight";
import { useEffect } from "react";
import { motion } from "framer-motion";

/* ─── Problem Section ─────────────────────────────────────────────── */
const ProblemSection = () => (
  <section className="w-full flex flex-col items-center gap-20 md:gap-32 px-4">
    <div className="max-w-4xl w-full flex flex-col items-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-[11px] font-mono uppercase tracking-[0.22em] text-[#FF4500] mb-6">Problem</p>
        <h2 className="text-4xl md:text-6xl font-display font-medium text-foreground tracking-tight mb-12">
          Fragmented Ad Creation
        </h2>
      </motion.div>

      <div className="flex flex-col gap-6 text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Reddit&apos;s advertising platform lacked a cohesive design language, resulting in inconsistent UI patterns across ad creation flows and campaign management tools.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          As the Ads org scaled rapidly, teams were building components in isolation — creating duplicated effort, visual inconsistency, and a degraded advertiser experience.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          A unified Ads Design System was needed to align cross-functional teams, accelerate development velocity, and establish a scalable foundation for Reddit&apos;s growing advertiser ecosystem.
        </motion.p>
      </div>
    </div>
  </section>
);

/* ─── Design Process Section ──────────────────────────────────────── */
const DesignProcessSection = () => {
  const steps = [
    { title: "Audit", desc: "Conducted a full UI audit across the Ads platform, identifying patterns, inconsistencies, and component redundancies." },
    { title: "Align", desc: "Collaborated with engineering and product to define token architecture, component scope, and contribution guidelines." },
    { title: "Build", desc: "Designed and documented a scalable component library in Figma, establishing foundational primitives to complex ad modules." },
    { title: "Scale", desc: "Rolled out the system across Ads teams, enabling faster iteration and a consistent advertiser experience at scale." },
  ];

  return (
    <div className="w-full relative py-20 md:py-32 overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-border bg-secondary/30 shadow-2xl group">
      <motion.div
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          background: "linear-gradient(-45deg, var(--background), var(--secondary), var(--background))",
          backgroundSize: "400% 400%",
        }}
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-12 w-full flex flex-col items-center">
        <motion.div
          className="text-center mb-16 md:mb-28"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h3 className="text-3xl md:text-5xl font-display font-medium text-foreground tracking-tight mb-4">Design Process</h3>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-light tracking-wide">
            From system audit to enterprise delivery — building a design foundation that scales with Reddit Ads.
          </p>
        </motion.div>

        <div className="relative flex flex-col md:flex-row justify-between w-full gap-16 md:gap-8 mt-4">
          {/* Dashed Line Desktop */}
          <div className="hidden md:block absolute top-[11px] left-[12.5%] right-[12.5%] h-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="0" y1="1" x2="100%" y2="1"
                stroke="#FF4500" strokeWidth="2" strokeDasharray="6 8"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.3 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Dashed Line Mobile */}
          <div className="block md:hidden absolute left-[23px] top-[24px] bottom-[24px] w-[2px] z-0 pointer-events-none">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <motion.line
                x1="1" y1="0" x2="1" y2="100%"
                stroke="#FF4500" strokeWidth="2" strokeDasharray="6 8"
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
              <div className="relative flex-shrink-0 flex items-center justify-center w-6 h-6 md:mb-10 md:w-auto md:h-auto mx-3 md:mx-auto">
                <div className="absolute inset-0 bg-[#FF4500] w-12 h-12 -left-3 -top-3 md:-left-4 md:-top-4 rounded-full opacity-0 group-hover:opacity-40 blur-[15px] transition-all duration-500 pointer-events-none" />
                <div className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-[#FF4500] ring-4 ring-background group-hover:scale-[1.3] transition-transform duration-500 relative z-10 shadow-[0_0_10px_rgba(255,69,0,0.2)] md:group-hover:shadow-[0_0_20px_rgba(255,69,0,0.8)]" />
              </div>
              <div className="pl-6 md:pl-0 text-left md:text-center mt-[-4px] md:mt-0 flex flex-col items-start md:items-center max-w-[280px] mx-auto">
                <h4 className="text-xl md:text-[22px] font-display font-medium text-foreground group-hover:text-foreground transition-colors duration-500 mb-3 tracking-tight">
                  {step.title}
                </h4>
                <p className="text-[15px] md:text-base text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500 leading-[1.6] tracking-[0.01em] font-light">
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

/* ─── Media Content ───────────────────────────────────────────────── */
const redditMediaContent = [
  { id: 1, type: "custom-problem" },
  { id: 2, type: "custom-process" },
  // TODO: 이미지/영상 파일을 /public/works/reddit/ 폴더에 추가한 후 아래 항목들의 주석을 해제하세요
  // { id: 3, type: "image", src: "/works/reddit/1.png", title: "Component Architecture" },
  // { id: 4, type: "image", src: "/works/reddit/2.png", title: "Token System" },
  // { id: 5, type: "image", src: "/works/reddit/3.png", title: "Ad Creation Flow" },
  // { id: 6, type: "video", src: "/works/reddit/4.mp4", title: "Interactive Components" },
];

/* ─── Page ────────────────────────────────────────────────────────── */
export default function RedditWorkDetail() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen bg-background selection:bg-[#FF4500] selection:text-white">
      {/* ─── Hero Section ──────────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-32 pb-32 px-6 overflow-hidden">
        <AmbientLight variant="detail" warm />
        {/* Gradient Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF4500]/20 via-background to-background pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center text-center mt-auto md:mt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-[13px] font-medium tracking-[0.2em] uppercase text-white/70 mb-6 font-mono">
              Reddit — Ads Design System
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-9xl font-display font-medium text-white tracking-tight leading-[1.05] mb-8 drop-shadow-sm">
              Reddit Ads<br />
              <span className="text-[#FF4500] italic md:not-italic">Design System</span>
            </h1>
            <p className="text-lg md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-12 font-medium drop-shadow-sm">
              A unified design system for <span className="text-[#FF4500] font-semibold">Reddit&apos;s advertising platform</span> — establishing scalable foundations to{" "}
              <span className="text-[#FF4500] font-semibold whitespace-nowrap">accelerate, align, and elevate</span> the advertiser experience.
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
              { label: "Role", value: "Product Design" },
              { label: "Scope", value: ["Design System", "Figma"] },
              { label: "Platform", value: "Web App" },
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

      {/* ─── Case Study Media Section ──────────────────────────────────── */}
      <section className="w-full py-32 md:py-64 px-4 md:px-8 bg-background flex flex-col items-center gap-48 md:gap-64 overflow-visible">
        <div className="max-w-[1400px] w-full flex flex-col gap-32 md:gap-56">
          {redditMediaContent.map((item, index) => {
            if (item.type === "custom-problem") return <ProblemSection key={item.id} />;
            if (item.type === "custom-process") return <DesignProcessSection key={item.id} />;

            return (
              <TiltParallaxMedia
                key={item.id}
                title={(item as { title?: string }).title}
                delayOffset={(index % 4) * 0.15}
                noPadding={item.type === "video"}
              >
                {item.type === "image" ? (
                  <img
                    src={(item as unknown as { src: string }).src}
                    alt={(item as unknown as { title?: string }).title || `Reddit Ads Render ${item.id}`}
                    className="w-full h-auto block"
                    loading="lazy"
                  />
                ) : (
                  <video
                    src={(item as unknown as { src: string }).src}
                    className="w-full h-auto block"
                    loop
                    muted
                    playsInline
                    autoPlay
                  />
                )}
              </TiltParallaxMedia>
            );
          })}
        </div>
      </section>

      {/* ─── Outcome Section ───────────────────────────────────────────── */}
      <section className="w-full py-40 md:py-56 px-4 md:px-12 border-t border-border/30 bg-background/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-16 md:gap-32 items-start">
          <motion.div
            className="md:w-1/3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h3 className="text-sm md:text-base font-medium text-[#FF4500] uppercase tracking-[0.2em] mb-4">
              Impact
            </h3>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium text-foreground tracking-tight leading-tight">
              Scalable by<br />
              <span className="text-[#FF4500]">Design</span>
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
              Delivered a cohesive design system that unified{" "}
              <span className="text-[#FF4500]">Reddit Ads</span> across the entire advertiser platform.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              By establishing a shared token architecture, component library, and contribution model, cross-functional teams could move faster while maintaining visual consistency — transforming a fragmented ecosystem into a{" "}
              <span className="text-[#FF4500] font-medium">scalable design foundation</span>.
            </p>
            <p className="text-xl md:text-2xl text-muted leading-relaxed font-light">
              The system reduced design-to-development handoff friction, standardized ad creation workflows, and set a precedent for systematic thinking across the broader Reddit product organization.
            </p>
          </motion.div>
        </div>
      </section>

      <ProjectNavigation
        previousProject={{
          title: "Boardedge",
          company: "Equilar",
          video: "/works/boardedge/thumbnail.gif",
          href: "/work/boardedge",
        }}
        nextProject={{
          title: "Ground Service Equipment Request Queue",
          company: "United Airlines",
          video: "/works/gse/thumbnail.mp4",
          href: "/work/united-airlines",
        }}
      />
      <BackToTop />
    </main>
  );
}
