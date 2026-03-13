"use client";

import { motion, useAnimationControls } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

// Import all 15 images from src/about (all PNG now)
import img1 from "@/about/1.png";
import img2 from "@/about/2.png";
import img3 from "@/about/3.png";
import img4 from "@/about/4.png";
import img5 from "@/about/5.png";
import img6 from "@/about/6.png";
import img7 from "@/about/7.png";
import img8 from "@/about/8.png";
import img9 from "@/about/9.png";
import img10 from "@/about/10.png";
import img11 from "@/about/11.png";
import img12 from "@/about/12.png";
import img13 from "@/about/13.png";
import img14 from "@/about/14.png";
import img15 from "@/about/15.png";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

export default function PhotoStrip() {
  const [isPaused, setIsPaused] = useState(false);
  const controls = useAnimationControls();
  const [totalWidth, setTotalWidth] = useState(0);
  const firstSetRef = useRef<HTMLDivElement>(null);

  // Triple the images to ensure no gaps during drag or slow scroll
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    // Measure actual width of the first 15 images after they render
    const updateWidth = () => {
      if (firstSetRef.current) {
        setTotalWidth(firstSetRef.current.scrollWidth);
      }
    };

    // Use a small timeout to ensure layout has settled
    const timeoutId = setTimeout(updateWidth, 500);
    window.addEventListener("resize", updateWidth);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  useEffect(() => {
    if (totalWidth > 0 && !isPaused) {
      controls.start({
        x: [0, -totalWidth],
        transition: {
          duration: 40, 
          ease: "linear",
          repeat: Infinity,
        },
      });
    } else {
      controls.stop();
    }
  }, [isPaused, controls, totalWidth]);

  return (
    <div className="w-full py-8 md:py-12 overflow-hidden bg-background relative z-10">
      <div className="max-w-5xl mx-auto px-4 md:px-8 mb-6 md:mb-8">
        <h3 className="text-xs uppercase tracking-widest text-apple-blue font-bold">
          Life outside the screen
        </h3>
      </div>
      
      <div 
        className="flex cursor-grab active:cursor-grabbing overflow-visible"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={controls}
          className="flex gap-4 px-4"
          drag="x"
          dragConstraints={{ left: -totalWidth * 2, right: 0 }}
          style={{ width: "max-content" }}
        >
          {/* First set (used for measurement) */}
          <div ref={firstSetRef} className="flex gap-4">
            {images.map((src, index) => (
              <PhotoItem key={`set1-${index}`} src={src} index={index} />
            ))}
          </div>
          
          {/* Duplicated sets for infinite loop */}
          {images.map((src, index) => (
            <PhotoItem key={`set2-${index}`} src={src} index={index} />
          ))}
          {images.map((src, index) => (
            <PhotoItem key={`set3-${index}`} src={src} index={index} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function PhotoItem({ src, index }: { src: any; index: number }) {
  return (
    <motion.div
      className="relative h-[280px] md:h-[350px] flex-shrink-0 overflow-hidden rounded-lg bg-black/20"
      style={{ 
        width: "auto",
        aspectRatio: `${src.width} / ${src.height}` 
      }}
      whileHover={{ 
        scale: 1.04,
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
        zIndex: 10
      }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <Image
        src={src}
        alt={`Life moment ${index + 1}`}
        fill
        className="object-cover transition-transform duration-500 hover:scale-105"
        sizes="(max-width: 768px) 400px, 600px"
        priority={index < 5}
      />
    </motion.div>
  );
}
