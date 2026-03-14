"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";

interface ProjectNavigationProps {
  nextProject: {
    title: string;
    company: string;
    href: string;
    video?: string;
    image?: string;
  };
}

export default function ProjectNavigation({ nextProject }: ProjectNavigationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  // Scale and cinematic reveal effects
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.3, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  
  const springScale = useSpring(scale, { stiffness: 100, damping: 30, mass: 1 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 30, mass: 1 });
  const springY = useSpring(y, { stiffness: 100, damping: 30, mass: 1 });

  return (
    <section 
      ref={containerRef}
      className="relative w-full h-[80vh] md:h-screen overflow-hidden bg-black flex items-center justify-center cursor-none group"
    >
      <Link href={nextProject.href} className="absolute inset-0 z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Background Media with Parallax and Scale */}
        <motion.div 
          className="absolute inset-0 z-0 select-none pointer-events-none"
          style={{ 
            scale: springScale,
            opacity: springOpacity
          }}
        >
          {nextProject.video ? (
            <video 
              src={nextProject.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-1000"
            />
          ) : (
            <div 
              className="w-full h-full bg-cover bg-center brightness-[0.4] group-hover:brightness-[0.6] transition-all duration-1000"
              style={{ backgroundImage: `url(${nextProject.image})` }}
            />
          )}
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60" />
        </motion.div>

        {/* Content Overlay */}
        <motion.div 
          className="relative z-20 flex flex-col items-center text-center px-6"
          style={{ y: springY }}
        >
          <motion.span 
            className="text-apple-blue font-mono text-xs md:text-sm uppercase tracking-[0.3em] mb-6 block"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Up Next
          </motion.span>
          
          <h2 className="text-5xl md:text-8xl lg:text-[10rem] font-display font-medium text-white tracking-tighter leading-none mb-12 select-none">
            {nextProject.title.split('\n').map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </h2>

          <div className="flex items-center gap-6 overflow-hidden">
             <motion.div 
                className="flex items-center gap-4 group/btn"
                whileHover={{ gap: "24px" }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
             >
                <span className="text-xl md:text-3xl font-light text-white/50 group-hover:text-white transition-colors duration-500">
                  {nextProject.company}
                </span>
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:border-white transition-all duration-500">
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-white group-hover:text-black transition-colors duration-500" />
                </div>
             </motion.div>
          </div>
        </motion.div>

        {/* Custom Interaction Circle (Alternative to cursor if desired, but here as a visual hint) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none z-30"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {/* Magnetic-ish reveal or spotlight could go here */}
        </motion.div>
      </Link>
    </section>
  );
}
