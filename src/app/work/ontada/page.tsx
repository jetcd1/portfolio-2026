"use client";

import BackToTop from "@/components/ui/BackToTop";
import ProjectNavigation from "@/components/ui/ProjectNavigation";
import { ExternalLink } from "lucide-react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

const media = "/works/Ontada/showcase";
const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 48 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-8%" }} transition={{ duration: .9, delay, ease }}>{children}</motion.div>;
}

function Label({ n, children, light = false }: { n: string; children: React.ReactNode; light?: boolean }) {
  return <div className={`mb-12 flex items-center gap-5 font-mono text-[10px] font-semibold uppercase tracking-[.22em] ${light ? "text-white/45" : "text-[#062d3e]/45"}`}><span className="text-[#ff624c]">{n}</span><span>{children}</span></div>;
}

function Frame({ src, alt, className = "", dark = false }: { src: string; alt: string; className?: string; dark?: boolean }) {
  return <motion.div whileHover={{ y: -6, scale: 1.006 }} transition={{ duration: .45, ease }} className={`group relative overflow-hidden rounded-[1.4rem] border shadow-[0_18px_60px_rgba(6,45,62,.06)] ${dark ? "border-white/10 bg-white/[.04]" : "border-[#062d3e]/10 bg-white"} ${className}`}><img src={src} alt={alt} loading="lazy" className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.018]" /><span className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/4 skew-x-[-18deg] bg-white/20 blur-xl transition-all duration-1000 group-hover:left-[120%]" /></motion.div>;
}

const principles = [
  { name: "Responsive", word: "In context", color: "#3c5c6e", note: "Meet clinicians where the work happens." },
  { name: "Human", word: "Personable", color: "#ff624c", note: "Make technical moments feel approachable." },
  { name: "Reliable", word: "Always on", color: "#f7c91e", note: "Create confidence through stable patterns." },
  { name: "Efficient", word: "In flow", color: "#0a9fc8", note: "Respect time. Remove unnecessary steps." },
];

function PrincipleVisual() {
  return <Reveal className="relative mt-24 overflow-hidden rounded-[2.2rem] border border-white/10 bg-[#092737] px-6 py-10 shadow-[0_50px_120px_rgba(0,0,0,.25)] md:px-10 md:py-12">
    <motion.div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#39c9ed]/15 blur-[90px]" animate={{ x: [0, 380, 0], opacity: [.35, .8, .35] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
    <div className="relative grid gap-3 md:grid-cols-2 lg:grid-cols-4">
      {principles.map((item, i) => <motion.article key={item.name} initial={{ opacity: 0, y: 35 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: i * .1, ease }} whileHover={{ y: -8 }} className="group relative min-h-[370px] overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[.045] p-7 backdrop-blur-sm">
        <div className="flex items-center justify-between"><span className="font-mono text-[10px] tracking-[.18em] text-white/40">0{i + 1}</span><motion.span className="h-3 w-3 rounded-full" style={{ backgroundColor: item.color }} animate={{ scale: [1, 1.45, 1], opacity: [.7, 1, .7] }} transition={{ duration: 2.8 + i * .4, repeat: Infinity }} /></div>
        <motion.div className="absolute left-1/2 top-[42%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ backgroundColor: item.color }} animate={{ scale: [1, 1.08, 1], borderRadius: ["50%", "42%", "50%"] }} transition={{ duration: 5 + i, repeat: Infinity, ease: "easeInOut" }} />
        <div className="absolute inset-x-7 bottom-7"><p className="text-xs font-medium uppercase tracking-[.14em] text-white/40">{item.word}</p><h3 className="mt-2 text-3xl font-semibold tracking-[-.04em]">{item.name}</h3><p className="mt-3 text-sm leading-relaxed text-white/48 transition-colors group-hover:text-white/72">{item.note}</p></div>
      </motion.article>)}
    </div>
  </Reveal>;
}

function Specimen({ title, note, src, alt, className = "" }: { title: string; note: string; src: string; alt: string; className?: string }) {
  return <motion.div whileHover={{ y: -7 }} transition={{ duration: .45, ease }} className={`group overflow-hidden rounded-[1.8rem] border border-[#062d3e]/10 bg-[#f7f9f8] shadow-[0_24px_70px_rgba(6,45,62,.07)] ${className}`}><div className="flex items-end justify-between gap-6 border-b border-[#062d3e]/8 px-6 py-5 md:px-8"><div><p className="font-mono text-[9px] uppercase tracking-[.2em] text-[#0a9fc8]">Foundation</p><h3 className="mt-2 text-xl font-semibold tracking-[-.025em]">{title}</h3></div><p className="hidden max-w-[220px] text-right text-xs leading-relaxed text-[#062d3e]/45 sm:block">{note}</p></div><div className="overflow-hidden bg-white p-6 md:p-10"><img src={src} alt={alt} loading="lazy" className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover:scale-[1.025]" /></div></motion.div>;
}

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .92]);

  return <section ref={ref} className="relative min-h-[1080px] overflow-hidden bg-[#061c27] px-5 pb-24 pt-40 text-white md:px-12">
    <motion.div style={{ y }} className="absolute inset-0">
      <div className="absolute -right-[20%] -top-[25%] h-[1050px] w-[1050px] rounded-full bg-[#08a7d8]/35 blur-[150px]" />
      <motion.div className="absolute -left-[10%] top-[36%] h-[700px] w-[700px] rounded-full bg-[#ff624c]/20 blur-[150px]" animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [.9, 1.15, .9] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }} />
      <div className="absolute inset-0 opacity-[.16] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:linear-gradient(to_bottom,black,transparent_75%)]" />
    </motion.div>
    <div className="relative z-10 mx-auto max-w-[1380px]">
      <Reveal><p className="font-mono text-[11px] font-semibold uppercase tracking-[.22em] text-white/50">McKesson · Ontada Design System · 2019—2022</p></Reveal>
      <Reveal delay={.08}><h1 className="mt-12 max-w-[1250px] text-[clamp(4.5rem,10.4vw,10rem)] font-semibold leading-[.86] tracking-[-.075em]">One system.<br /><span className="text-[#39c9ed]">Every clinical</span><br />moment.</h1></Reveal>
      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end">
        <Reveal delay={.16}><p className="max-w-2xl text-lg leading-relaxed text-white/62 md:text-xl">I built Ontada&apos;s first shared design language—turning dense, fragmented oncology workflows into a precise and scalable product foundation.</p></Reveal>
        <Reveal delay={.22} className="lg:text-right"><motion.a href="https://www.figma.com/design/2jPFJ6MDB3h4JOCMJEDpwv/Design-System-V2.9?node-id=35996-3&t=Z89KwT6OKU87loay-1" target="_blank" rel="noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: .98 }} className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-7 py-4 text-sm font-medium backdrop-blur-xl transition-colors hover:bg-white hover:text-[#061c27]">View Figma System <ExternalLink className="h-4 w-4" /></motion.a></Reveal>
      </div>
      <motion.div style={{ scale }} className="relative mt-24 origin-bottom overflow-hidden rounded-[2rem] border border-white/15 bg-[#d9f2ee] p-3 shadow-[0_50px_140px_rgba(0,0,0,.45)] md:p-6">
        <img src={`${media}/ods-full.png`} alt="Ontada design system responsive website across desktop, laptop, and mobile" className="w-full rounded-[1.25rem]" />
        <motion.div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/25 to-transparent" animate={{ x: ["-120%", "120%"] }} transition={{ duration: 4.5, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }} />
      </motion.div>
    </div>
  </section>;
}

export default function OntadaCaseStudy() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: .2 });
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return <main className="min-h-screen overflow-hidden bg-[#f4f7f6] text-[#062d3e] selection:bg-[#ff624c] selection:text-white">
    <motion.div className="fixed inset-x-0 top-0 z-[100] h-[3px] origin-left bg-[#39c9ed]" style={{ scaleX: progress }} />
    <Hero />

    <section className="px-5 py-28 md:px-12 md:py-44"><div className="mx-auto max-w-[1380px]">
      <Label n="01">The brief</Label>
      <div className="grid gap-14 lg:grid-cols-[1.15fr_.85fr] lg:gap-28"><Reveal><h2 className="text-5xl font-semibold leading-[.98] tracking-[-.06em] md:text-8xl">Complex care.<br /><span className="text-[#0a9fc8]">One clear language.</span></h2></Reveal><Reveal delay={.1}><p className="text-xl leading-relaxed text-[#062d3e]/62">Multiple oncology products were evolving without shared foundations. I initiated a system that aligned visual decisions, reusable components, and implementation guidance across teams.</p><div className="mt-12 divide-y divide-[#062d3e]/10 border-y border-[#062d3e]/10">{[["Role","Design System Lead"],["Scope","Foundation · Components · Patterns"],["Output","Library · Documentation · Governance"]].map(([k,v]) => <div key={k} className="grid grid-cols-[90px_1fr] py-5"><span className="font-mono text-[10px] uppercase tracking-wider text-[#062d3e]/40">{k}</span><strong className="text-sm font-medium">{v}</strong></div>)}</div></Reveal></div>
    </div></section>

    <section className="bg-[#062d3e] px-5 py-28 text-white md:px-12 md:py-44"><div className="mx-auto max-w-[1380px]"><Label n="02" light>Design principles</Label><div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end"><Reveal><h2 className="max-w-5xl text-[clamp(4.1rem,8vw,8rem)] font-semibold leading-[.9] tracking-[-.07em]">Four behaviors.<br /><span className="text-[#39c9ed]">One experience.</span></h2></Reveal><Reveal delay={.1}><p className="text-lg leading-relaxed text-white/52">The system translates four product values into practical interaction and visual decisions.</p></Reveal></div><PrincipleVisual /></div></section>

    <section className="bg-white px-5 py-28 md:px-12 md:py-44"><div className="mx-auto max-w-[1380px]"><Label n="03">Visual foundation</Label><div className="grid gap-8 lg:grid-cols-[.78fr_1.22fr] lg:items-end"><Reveal><h2 className="text-6xl font-semibold leading-[.94] tracking-[-.06em] md:text-8xl">Clarity,<br />coded into<br /><span className="text-[#ff624c]">every detail.</span></h2></Reveal><Reveal delay={.1}><p className="max-w-lg text-lg leading-relaxed text-[#062d3e]/55">Brand colors establish character. Semantic colors communicate status. Type and spacing make complex clinical information scannable.</p></Reveal></div><div className="mt-24 grid gap-8 md:grid-cols-2"><Reveal><Specimen title="Brand palette" note="Four colors express the core system principles." src={`${media}/major-color.svg`} alt="Ontada brand color palette" className="h-full" /></Reveal><Reveal delay={.08}><Specimen title="Semantic color" note="States for success, error, action, selection, and neutral UI." src={`${media}/functional-color.svg`} alt="Ontada semantic functional colors" className="h-full" /></Reveal></div><div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_.9fr]"><Reveal><Specimen title="Typography" note="Nunito creates a friendly, legible hierarchy." src={`${media}/type.svg`} alt="Nunito typography scale" /></Reveal><Reveal delay={.08}><Specimen title="8pt spatial system" note="A shared rhythm aligns components and layouts." src={`${media}/grid.svg`} alt="Eight point spacing grid" /></Reveal></div></div></section>

    <section className="bg-[#dff5f4] px-5 py-32 md:px-12 md:py-48"><div className="mx-auto max-w-[1380px]"><Label n="04">Expression</Label><div className="grid gap-12 lg:grid-cols-[1fr_430px] lg:items-end"><Reveal><h2 className="text-6xl font-semibold leading-[.94] tracking-[-.06em] md:text-8xl">Clinical,<br /><span className="text-[#0a9fc8]">never cold.</span></h2></Reveal><Reveal delay={.1}><p className="text-lg leading-relaxed text-[#062d3e]/58">Icons make actions recognizable at a glance. Illustrations add warmth to education and empty states while staying inside the same visual grammar.</p></Reveal></div><div className="mt-28 grid gap-8 md:grid-cols-2"><Reveal><Specimen title="Iconography" note="Recognizable at every size and density." src={`${media}/icons.svg`} alt="Ontada icon sizing and construction" /></Reveal><Reveal delay={.08}><Specimen title="Illustration" note="Light and dark expressions for educational moments." src={`${media}/illustration.svg`} alt="Ontada light and dark illustration system" /></Reveal></div></div></section>

    <section className="bg-[#061c27] px-5 py-28 text-white md:px-12 md:py-44"><div className="mx-auto max-w-[1380px]"><Label n="05" light>Components</Label><div className="grid gap-10 lg:grid-cols-[1fr_420px] lg:items-end"><Reveal><h2 className="max-w-5xl text-[clamp(4.2rem,8vw,8rem)] font-semibold leading-[.9] tracking-[-.07em]">Reliable parts.<br /><span className="text-[#39c9ed]">Clear states.</span></h2></Reveal><Reveal delay={.1}><p className="text-lg leading-relaxed text-white/52">Buttons, fields, alerts, filters, calendars, dialogs, and navigation share one consistent interaction language.</p></Reveal></div><Reveal className="mt-24"><Frame src={`${media}/components.png`} alt="Ontada components including buttons, alerts, fields, filters, calendar, dialog, and accordion" dark /></Reveal><div className="mt-32 grid gap-10 lg:grid-cols-[420px_1fr] lg:items-end"><Reveal><div><p className="font-mono text-[10px] uppercase tracking-[.2em] text-[#ff624c]">06 · Patterns</p><h2 className="mt-8 text-6xl font-semibold leading-[.94] tracking-[-.06em] md:text-8xl">From parts<br />to <span className="text-[#39c9ed]">workflow.</span></h2></div></Reveal><Reveal delay={.1}><p className="max-w-xl text-lg leading-relaxed text-white/52">Those components assemble into patient context, clinical navigation, data tables, filters, and expandable information patterns.</p></Reveal></div><Reveal className="mt-20"><Frame src={`${media}/patterns.png`} alt="Ontada clinical patterns including patient context, data tables, filters, and accordions" dark /></Reveal></div></section>

    <section className="bg-white px-5 py-28 md:px-12 md:py-44"><div className="mx-auto max-w-[1380px]"><Label n="06">Quality by default</Label><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-center"><Reveal><div><h2 className="text-6xl font-semibold leading-[.95] tracking-[-.06em] md:text-8xl">Access is<br /><span className="text-[#ff624c]">the standard.</span></h2><p className="mt-8 max-w-md text-lg leading-relaxed text-[#062d3e]/58">Contrast and state guidance were embedded in the foundation, so accessibility became a repeatable practice—not a final check.</p></div></Reveal><Reveal delay={.1}><Frame src={`${media}/accessibility.svg`} alt="Accessibility contrast guidance" /></Reveal></div><div className="mt-28 grid gap-5 md:grid-cols-2"><Reveal><Frame src={`${media}/layout.svg`} alt="Standard responsive layout" /></Reveal><Reveal delay={.08}><Frame src={`${media}/website.svg`} alt="Ontada design system documentation website" /></Reveal></div></div></section>

    <section className="bg-[#ff624c] px-5 py-28 text-white md:px-12 md:py-44"><div className="mx-auto max-w-[1380px]"><Label n="07" light>Scale & stewardship</Label><div className="grid gap-14 lg:grid-cols-[1fr_.72fr] lg:items-end"><Reveal><h2 className="text-[clamp(4.2rem,8.5vw,8.7rem)] font-semibold leading-[.91] tracking-[-.07em]">A living system,<br /><span className="text-[#062d3e]">not a handoff.</span></h2></Reveal><Reveal delay={.1}><p className="text-xl leading-relaxed text-white/78">Documentation, shared ownership, and library analytics turned the work into an evolving product teams could maintain together.</p></Reveal></div><Reveal className="mt-20 grid overflow-hidden rounded-[2rem] bg-[#242424] md:grid-cols-[1.2fr_.8fr]"><img src={`${media}/analytics.jpg`} alt="Figma library analytics" className="h-full min-h-[360px] w-full object-cover" /><div className="flex flex-col justify-between p-9 md:p-12"><span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/45">Library analytics</span><div><p className="text-5xl font-semibold tracking-[-.05em] text-white">431</p><p className="mt-2 text-white/55">library components tracked</p></div></div></Reveal></div></section>

    <section className="bg-[#f4f7f6] px-5 py-32 md:px-12 md:py-52"><div className="mx-auto max-w-[1380px] text-center"><Reveal><p className="font-mono text-[10px] font-semibold uppercase tracking-[.22em] text-[#ff624c]">The takeaway</p><h2 className="mx-auto mt-10 max-w-5xl text-6xl font-semibold leading-[.94] tracking-[-.065em] md:text-9xl">Designing order into complexity.</h2><p className="mx-auto mt-10 max-w-2xl text-xl leading-relaxed text-[#062d3e]/58">Ontada became a shared language for building clearer, more consistent healthcare products—across teams, tools, and clinical moments.</p></Reveal></div></section>

    <ProjectNavigation previousProject={{ title: "Orion Design System 2.0", company: "United Airlines", video: "/works/Orion/thumbnail.mp4", href: "/work/orion" }} nextProject={{ title: "Equilar App", company: "Equilar", video: "/works/equilarapp/thumbnail.mp4", href: "/work/equilar" }} />
    <BackToTop />
  </main>;
}
