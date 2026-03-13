"use client";

import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { Instagram, Linkedin, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useIntro } from "@/components/providers/IntroProvider";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    if (href === "/#work" && pathname === "/") {
      e.preventDefault();
      const element = document.getElementById("work");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

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
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="relative text-xs md:text-sm font-medium px-4 py-2 uppercase tracking-[0.08em] group"
                  onMouseEnter={() => setHovered(link.name)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className={`relative z-10 transition-colors duration-200 ${hovered === link.name ? 'text-white' : 'text-white/60'}`}>
                    {link.name}
                  </span>
                  <AnimatePresence>
                    {hovered === link.name && (
                      <motion.div
                        layoutId="nav-glow"
                        className="absolute inset-0 bg-white/20 blur-xl rounded-full -z-10"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1.1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                </Link>
              ))}
            </div>
            
            {/* Desktop Icons */}
            <div className="hidden md:flex gap-5 items-center ml-4 border-l border-white/30 pl-8">
              {/* Instagram */}
              <div className="relative flex items-center">
                <motion.a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 hover:opacity-100 transition-opacity"
                  onMouseEnter={() => setHovered("instagram")}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ scale: 1.15 }}
                >
                  <Instagram size={18} className={hovered === "instagram" ? "opacity-100 text-white" : "opacity-60 text-white"} />
                </motion.a>
                <AnimatePresence>
                  {hovered === "instagram" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 whitespace-nowrap z-[60]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/90">
                        Instagram
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* LinkedIn */}
              <div className="relative flex items-center">
                <motion.a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-1 hover:opacity-100 transition-opacity"
                  onMouseEnter={() => setHovered("linkedin")}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ scale: 1.15 }}
                >
                  <Linkedin size={18} className={hovered === "linkedin" ? "opacity-100 text-white" : "opacity-60 text-white"} />
                </motion.a>
                <AnimatePresence>
                  {hovered === "linkedin" && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 whitespace-nowrap z-[60]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/90">
                        LinkedIn
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="relative flex items-center">
                <button
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  onMouseEnter={() => setHovered("theme")}
                  onMouseLeave={() => setHovered(null)}
                  className="ml-2 hover:opacity-100 transition-opacity relative p-1"
                  aria-label="Toggle theme"
                >
                  <motion.div whileHover={{ scale: 1.15 }} className={hovered === "theme" ? "opacity-100 text-white" : "opacity-60 text-white"}>
                    {mounted && theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {hovered === "theme" && mounted && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8, y: -10 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 whitespace-nowrap z-[60]"
                    >
                      <span className="text-[10px] uppercase tracking-[0.15em] font-medium text-white/90">
                        {theme === "dark" ? "Light Mode" : "Dark Mode"}
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
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
                      onClick={(e) => handleLinkClick(e, link.href)}
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
                    className="flex items-center gap-2 hover:text-background transition-colors group"
                  >
                    <div className="relative w-6 h-6 flex items-center justify-center">
                      {mounted && theme === "dark" ? <Sun size={24} /> : <Moon size={24} />}
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] font-medium opacity-60 group-hover:opacity-100 transition-opacity">
                      {theme === "dark" ? "Light" : "Dark"}
                    </span>
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
