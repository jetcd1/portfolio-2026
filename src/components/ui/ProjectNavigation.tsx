"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { useRef } from "react";

interface ProjectData {
  title: string;
  company: string;
  href: string;
  video?: string;
  image?: string;
}

interface ProjectNavigationProps {
  previousProject?: ProjectData;
  nextProject?: ProjectData;
}

export default function ProjectNavigation({ previousProject, nextProject }: ProjectNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  const springScale = useSpring(scale, { stiffness: 100, damping: 30, mass: 1 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30, mass: 1 });
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 1 });

  const renderProject = (project: ProjectData, type: "prev" | "next") => (
    <Link 
      href={project.href} 
      className={`relative flex-1 h-full w-full flex flex-col items-center justify-center group overflow-hidden ${type === "prev" ? "border-b md:border-b-0 md:border-r border-white/10" : ""}`}
    >
      <motion.div 
        className="absolute inset-0 z-0 select-none pointer-events-none"
        style={{ scale: springScale, opacity: springOpacity }}
      >
        {project.video ? (
          project.video.toLowerCase().endsWith('.gif') ? (
            <motion.img 
              src={project.video}
              alt={project.title}
              className="w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.6] transition-all duration-1000 group-hover:scale-105"
            />
          ) : (
            <video 
              src={project.video}
              autoPlay loop muted playsInline
              className="w-full h-full object-cover brightness-[0.3] group-hover:brightness-[0.6] transition-all duration-1000 group-hover:scale-105"
            />
          )
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center brightness-[0.3] group-hover:brightness-[0.6] transition-all duration-1000 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.image})` }}
          />
        )}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-1000" />
      </motion.div>

      <motion.div 
        className="relative z-20 flex flex-col items-center text-center px-6 mix-blend-difference"
        style={{ y: springY }}
      >
        <span className="text-white/60 font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-4 md:mb-6 block transition-colors duration-500 group-hover:text-apple-blue">
          {type === "prev" ? "Previous Project" : "Next Project"}
        </span>
        
        <h2 className="text-4xl md:text-6xl lg:text-8xl font-display font-medium text-white tracking-tighter leading-none mb-8 md:mb-12 select-none group-hover:scale-105 transition-transform duration-700">
          {project.title.split('\n').map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </h2>

        <div className="flex items-center gap-4 group/btn">
          {type === "prev" && (
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
              <ArrowLeft className="w-5 h-5 md:w-7 md:h-7 text-white group-hover:text-black transition-colors duration-500" />
            </div>
          )}
          <span className="text-lg md:text-2xl font-light text-white/50 group-hover:text-white transition-colors duration-500">
            {project.company}
          </span>
          {type === "next" && (
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
              <ArrowRight className="w-5 h-5 md:w-7 md:h-7 text-white group-hover:text-black transition-colors duration-500" />
            </div>
          )}
        </div>
      </motion.div>
    </Link>
  );

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[100vh] md:h-[80vh] overflow-hidden bg-black flex flex-col md:flex-row cursor-pointer"
    >
      {previousProject && renderProject(previousProject, "prev")}
      {nextProject && renderProject(nextProject, "next")}
    </section>
  );
}
