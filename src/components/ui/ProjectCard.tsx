"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Badge from "./Badge";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  video?: string;
  href: string;
}

export default function ProjectCard({ title, description, tags, image, video, href }: ProjectCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <Link 
      href={href} 
      className="group block w-full relative h-[60vh] min-h-[400px] max-h-[600px] overflow-hidden rounded-[2rem] cursor-none" 
      data-hover="true"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="absolute inset-0 w-full h-full bg-border"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {video ? (
          <video
            ref={videoRef}
            src={video}
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700"
          />
        ) : (
          <div 
            className="w-full h-full bg-cover bg-center opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{ 
              backgroundImage: image ? `url(${image})` : undefined, 
              backgroundColor: image ? "transparent" : "var(--border)" 
            }}
          />
        )}
        
        {/* Dynamic Vignette / Glow on Hover */}
        <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-700 pointer-events-none" />
      </motion.div>
      
      <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 flex justify-between items-end bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none">
        <div className="max-w-2xl transform group-hover:-translate-y-2 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map(tag => <Badge key={tag}>{tag}</Badge>)}
          </div>
          <h3 className="text-4xl md:text-5xl font-display font-medium text-foreground tracking-tight group-hover:text-white transition-colors duration-500 mb-3 drop-shadow-md">
            {title}
          </h3>
          <p className="text-muted md:text-lg line-clamp-2 md:line-clamp-3 group-hover:text-white/90 transition-colors duration-500 drop-shadow-md">
            {description}
          </p>
        </div>
        
        <div className="hidden sm:flex shrink-0 w-16 h-16 ml-4 rounded-full border border-white/20 items-center justify-center bg-white/5 backdrop-blur-md group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-700 overflow-hidden transform group-hover:rotate-45 group-hover:scale-110 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <ArrowUpRight className="w-8 h-8" />
        </div>
      </div>
    </Link>
  );
}
