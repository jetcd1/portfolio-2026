"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Instagram, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIntro } from "@/components/providers/IntroProvider";

const links = [
  { name: "AI Playground", href: "/ai-playground" },
  { name: "Work", href: "/#work" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isIntroDone } = useIntro();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      clipPath: "circle(0% at calc(100% - 3rem) 3rem)",
      transition: { duration: 0.6, ease: "circIn" }
    },
    open: {
      opacity: 1,
      clipPath: "circle(150% at calc(100% - 3rem) 3rem)",
      transition: { duration: 0.8, ease: "circOut" }
    }
  };

  const navLinkVariants: Variants = {
    closed: { y: 40, opacity: 0 },
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1 + 0.3, duration: 0.6, ease: "backOut" }
    })
  };

  if (!isIntroDone) return null;

  return (
    <>
      <motion.header 
        className="fixed top-0 left-0 right-0 z-50 w-full mix-blend-difference"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <nav className="flex items-center justify-between w-full px-4 md:px-8 py-4 md:py-6 text-white pointer-events-auto">
          <Link href="/" onClick={() => setIsOpen(false)} className="font-display text-lg md:text-xl font-bold tracking-tight hover:opacity-70 transition-opacity z-50">
            Chan Jeon
          </Link>
          
          <div className="flex gap-4 md:gap-8 items-center z-50">
            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-6 items-center">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-xs md:text-sm font-medium hover:opacity-70 transition-opacity py-1 uppercase tracking-wider"
                  onMouseEnter={() => setHovered(link.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {link.name}
                  {hovered === link.name && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-1 h-px bg-white"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </Link>
              ))}
            </div>
            
            {/* Desktop Icons */}
            <div className="hidden md:flex gap-5 items-center ml-4 border-l border-white/30 pl-8">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Instagram size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">
                <Linkedin size={18} />
              </a>
              
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-2 hover:opacity-70 transition-opacity"
                aria-label="Toggle theme"
              >
                {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-[5px] z-50 text-white"
              aria-label="Toggle mobile menu"
            >
              <motion.div 
                className="w-6 h-[2px] bg-white origin-center"
                animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-6 h-[2px] bg-white"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div 
                className="w-6 h-[2px] bg-white origin-center"
                animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Fullscreen Mobile Menu Overlay (Rendered outside mix-blend-difference) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={{
              closed: { opacity: 0, transition: { duration: 0.6 } },
              open: { opacity: 1, transition: { duration: 0.4 } }
            }}
            className="fixed inset-0 z-40 bg-foreground text-background flex flex-col items-center justify-center pointer-events-auto"
          >
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute inset-0 bg-foreground"
            >
              {/* Noise overlay */}
              <div 
                className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
              />
              
              <div className="flex flex-col items-center justify-center h-full w-full gap-8">
                {links.map((link, i) => (
                  <motion.div key={link.name} custom={i} variants={navLinkVariants} className="overflow-hidden">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="text-4xl sm:text-5xl font-display font-medium uppercase tracking-tight hover:italic transition-all"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}

                <motion.div 
                  custom={links.length} 
                  variants={navLinkVariants}
                  className="flex gap-8 mt-12 items-center text-background/70"
                >
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                    <Instagram size={24} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                    <Linkedin size={24} />
                  </a>
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="hover:text-background transition-colors"
                  >
                    {mounted && theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
