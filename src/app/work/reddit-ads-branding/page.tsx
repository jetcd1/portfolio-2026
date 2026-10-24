"use client";

import AmbientLight from "@/components/animations/AmbientLight";
import BackToTop from "@/components/ui/BackToTop";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;
const base = "/images/reddit-ads-branding/curated";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.8, delay, ease }} className={className}>{children}</motion.div>;
}

function SectionIntro({ number, eyebrow, title, children }: { number: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return (
    <Reveal className="grid gap-8 md:grid-cols-[1fr_1.35fr] md:gap-20 mb-14 md:mb-20">
      <div>
        <span className="block text-[11px] font-mono font-bold tracking-[0.24em] text-apple-red mb-5">{number}</span>
        <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{eyebrow}</p>
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-medium tracking-[-0.045em] leading-[0.95]">{title}</h2>
      </div>
      <div className="md:pt-12 text-lg md:text-[22px] leading-[1.65] text-muted-foreground font-light">{children}</div>
    </Reveal>
  );
}

function ArtFrame({ src, alt, dark = false, cropBottom = false, className = "" }: { src: string; alt: string; dark?: boolean; cropBottom?: boolean; className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.figure initial={{ opacity: 0, scale: 0.985 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: 0.9, ease }} whileHover={reduceMotion ? undefined : { y: -8 }} className={`group relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] border border-white/10 ${dark ? "bg-black" : "bg-[#f4f2ef]"} ${className}`}>
      <motion.img src={src} alt={alt} className={`block w-full h-auto ${cropBottom ? "-mb-[1.8%]" : ""}`} whileHover={reduceMotion ? undefined : { scale: 1.018 }} transition={{ duration: 0.8, ease }} />
      <div className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/[0.08] pointer-events-none" />
    </motion.figure>
  );
}

function Film({ src, label }: { src: string; label: string }) {
  return (
    <Reveal className="relative overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-black border border-white/10">
      <video className="w-full h-auto block scale-[1.025]" autoPlay loop muted playsInline preload="metadata" aria-label={label}>
        <source src={src} type="video/mp4" />
      </video>
    </Reveal>
  );
}

const concepts = [
  { number: "01", title: "Continuous Loop", image: `${base}/06-continuous-loop.png`, summary: "A single rounded form loops around a shared center — distinct voices held together by one common goal.", color: "from-[#9d4368] via-[#c493c6] to-[#f0cfd0]" },
  { number: "02", title: "Interlocking Loop", image: `${base}/07-interlocking-loop.png`, summary: "Three rounded loops express the exchange of ideas, feedback, and expertise across a multidisciplinary team.", color: "from-[#83ceaa] via-[#d8efc5] to-[#e8f1c8]" },
  { number: "03", title: "Interwoven", image: `${base}/08-interwoven.png`, summary: "Four specialties keep their own identity while forming a balanced system around a common purpose.", color: "from-[#ffc24d] via-[#efd8c7] to-[#d7c1b4]" },
];

export default function RedditAdsBrandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-apple-red selection:text-white">
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 md:px-8 pt-32 pb-20">
        <div className="absolute inset-0">
          <img src="/works/reddit-branding/cover.svg" alt="" className="reddit-hero-backdrop w-full h-full object-cover opacity-45 scale-[1.08]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-background" />
        </div>
        <AmbientLight variant="detail" warm />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(0,0,0,.48)_100%)] z-[2]" />
        <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease }} className="text-[11px] md:text-xs font-mono tracking-[0.25em] uppercase text-[#ff8b70] mb-7">Reddit · Visual Identity &amp; Branding</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 34 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease }} className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-display font-medium tracking-[-0.055em] leading-[0.9] text-white">Reddit Ads Design<br /><span className="text-[#ff5c3b]">Branding</span></motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.9, delay: 0.25 }} className="max-w-2xl mx-auto mt-9 text-lg md:text-2xl text-white/72 font-light leading-relaxed">A shared visual language for a multidisciplinary team — distinct expertise, connected by one common purpose.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }} className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-14 pt-9 border-t border-white/20 max-w-4xl mx-auto">
            {[["Role", "Visual Design"], ["Discipline", "Brand Identity"], ["Scope", "System & Motion"], ["Team", "Reddit Ads"]].map(([label, value]) => <div key={label}><span className="block text-[10px] tracking-[0.2em] uppercase text-white/45 mb-2">{label}</span><span className="text-sm md:text-base text-white/90">{value}</span></div>)}
          </motion.div>
        </div>
      </section>

      <section className="px-4 md:px-8 py-24 md:py-40 border-t border-border/30"><div className="max-w-[1440px] mx-auto">
        <SectionIntro number="02" eyebrow="Idea / background" title="One team. Many disciplines."><p>The Ads team brings together specialists across strategy, design, research, writing, production, and operations.</p><p className="mt-5">The opportunity was to create a shared visual language that turns distinct expertise into clearer collaboration, stronger ideas, and more consistent outcomes.</p></SectionIntro>
        <ArtFrame src={`${base}/02-idea-background.png`} alt="Four principles: distinct expertise, shared language, alignment, and collaboration" />
      </div></section>

      <section className="px-4 md:px-8 py-24 md:py-40 bg-[#080808] border-t border-white/10"><div className="max-w-[1440px] mx-auto">
        <SectionIntro number="03" eyebrow="Moodboard / collage" title="Finding the human connection."><p>We researched imagery, colors, textures, and visual references around collaboration, communication, shared tools, and human connection.</p><p className="mt-5">The result paired warm, tactile imagery with luminous color fields — diverse perspectives unified through one visual atmosphere.</p></SectionIntro>
        <ArtFrame src={`${base}/03-brand-research.png`} alt="Reddit Ads Design visual research moodboard" dark />
      </div></section>

      <section className="px-4 md:px-8 py-24 md:py-40"><div className="max-w-[1440px] mx-auto">
        <SectionIntro number="04–05" eyebrow="From pencil to pixels" title="Searching for a shared gesture."><p>Loose analog studies tested loops, nodes, knots, arcs, and rings as symbols of specialties moving toward a shared direction.</p><p className="mt-5">Digitizing the strongest gestures made it possible to tune weight, rhythm, proportion, and recognition before choosing the final directions.</p></SectionIntro>
        <div className="grid md:grid-cols-2 gap-5 md:gap-8 items-start"><ArtFrame src={`${base}/04-pencil-sketches.png`} alt="Pencil sketches exploring looping symbols" /><ArtFrame src={`${base}/05-digital-sketches-white.png`} alt="Digital logo explorations" className="md:mt-24" /></div>
      </div></section>

      <section className="px-4 md:px-8 py-24 md:py-40 bg-[#080808] border-y border-white/10 overflow-hidden"><div className="max-w-[1440px] mx-auto">
        <SectionIntro number="06–08" eyebrow="Identity directions" title="Three ways to come together."><p>Each direction turns collaboration into a different kind of loop: continuous, interlocking, or interwoven.</p><p className="mt-5">Hover over each system to see the artwork come forward.</p></SectionIntro>
        <div className="space-y-20 md:space-y-32">{concepts.map((concept, index) => (
          <Reveal key={concept.number} className={`grid lg:grid-cols-[0.72fr_1.55fr] gap-8 lg:gap-16 items-center ${index % 2 ? "lg:grid-cols-[1.55fr_.72fr]" : ""}`}>
            <div className={index % 2 ? "lg:order-2" : ""}><span className={`inline-flex w-12 h-12 items-center justify-center rounded-full bg-gradient-to-br ${concept.color} text-black text-xs font-mono font-bold mb-7`}>{concept.number}</span><h3 className="text-4xl md:text-6xl font-display tracking-[-0.045em] leading-none mb-6">{concept.title}</h3><p className="text-lg md:text-xl text-white/55 font-light leading-relaxed">{concept.summary}</p></div>
            <ArtFrame src={concept.image} alt={`${concept.title} identity direction`} cropBottom className={index % 2 ? "lg:order-1" : ""} />
          </Reveal>
        ))}</div>
      </div></section>

      <section className="px-4 md:px-8 py-24 md:py-40"><div className="max-w-[1440px] mx-auto">
        <SectionIntro number="09" eyebrow="Brand language" title="An identity with continuity and life."><p>Motion lets the emblem be drawn, looped, gathered, and reformed — showing individual contributions becoming one shared system.</p><p className="mt-5">The behavior extends naturally into entrances, transitions, background gestures, and moments of emphasis.</p></SectionIntro>
        <Film src="/videos/reddit-ads-branding/brand-language.mp4" label="Reddit Ads Design brand language animation" />
      </div></section>

      <section className="px-4 md:px-8 py-24 md:py-40 bg-[#ece9e4] text-black"><div className="max-w-[1440px] mx-auto">
        <SectionIntro number="09" eyebrow="Identity in practice" title="A flexible system, not just a logo."><p className="text-black/60">The emblem becomes a repeatable graphic language across objects, presentations, events, internal communications, and team touchpoints.</p><p className="mt-5 text-black/60">It can act as an animated mark, pattern, frame, icon, or quiet background texture while staying unmistakably connected.</p></SectionIntro>
        <ArtFrame src={`${base}/09-brand-application.png`} alt="Reddit Ads Design identity applied to apparel, stationery, and merchandise" />
        <div className="mt-6 md:mt-10"><Film src="/videos/reddit-ads-branding/brand-application.mp4" label="Reddit Ads Design brand application animation" /></div>
      </div></section>

      <ProjectNavigation previousProject={{ title: "Ads Design System", company: "Reddit", image: "/works/reddit/ads-design-system-thumbnail.jpg", href: "/work/reddit" }} nextProject={{ title: "Ground Service Equipment Request Queue", company: "United Airlines", video: "/works/gse/thumbnail.mp4", href: "/work/united-airlines" }} />
      <BackToTop />
    </main>
  );
}
