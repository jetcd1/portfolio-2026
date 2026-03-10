"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const exhibits = [
  { id: "fluid", name: "Fluid Node Network" },
  { id: "glitch", name: "Digital Glitch Text" },
  { id: "waves", name: "Generative Sine Waves" },
  { id: "kinetic", name: "Kinetic Text Ring" },
  { id: "audio", name: "Pseudo Audio Visualizer" },
  { id: "fractal", name: "Reactive Fractal Tree" },
  { id: "typography", name: "Reactive Typography" },
  { id: "clock", name: "Global Sync Clock" },
  { id: "thermo", name: "Planetary Thermometer" },
  { id: "bubbles", name: "Quantum Bubbles" },
  { id: "earth", name: "Orbital Matrix" },
];

export default function AIPlayground() {
  const [activeId, setActiveId] = useState(exhibits[0].id);

  return (
    <div className="flex flex-col md:flex-row min-h-screen pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto w-full gap-8">
      {/* Left Sidebar */}
      <aside className="w-full md:w-1/4 flex flex-col gap-2 relative z-10 md:sticky md:top-32 md:h-[calc(100vh-10rem)]">
        <h1 className="text-3xl font-display font-medium tracking-tight mb-2">AI Playground</h1>
        <p className="text-muted text-sm mb-6">Exploring visual media algorithms and interaction design.</p>
        <div className="flex flex-col gap-1 overflow-y-auto pr-2 pb-12 custom-scroll">
          {exhibits.map((ex) => (
            <button
              key={ex.id}
              onClick={() => setActiveId(ex.id)}
              className={`text-left px-4 py-3 rounded-lg transition-all duration-300 uppercase tracking-widest text-xs font-semibold shrink-0 ${
                activeId === ex.id 
                  ? "bg-foreground text-background" 
                  : "hover:bg-foreground/10 text-muted hover:text-foreground"
              }`}
            >
              {ex.name}
            </button>
          ))}
        </div>
      </aside>

      {/* Right Canvas Area */}
      <main className="w-full md:w-3/4 bg-foreground/[0.02] rounded-3xl border border-border/50 overflow-hidden relative min-h-[60vh] md:min-h-[75vh] flex items-center justify-center p-8 z-10 backdrop-blur-3xl shadow-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, filter: "blur(10px)", scale: 0.95 }}
            animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex items-center justify-center"
          >
            {activeId === "fluid" && <FluidNodeExhibit />}
            {activeId === "glitch" && <GlitchExhibit />}
            {activeId === "waves" && <WavesExhibit />}
            {activeId === "kinetic" && <KineticExhibit />}
            {activeId === "audio" && <AudioVisualizerExhibit />}
            {activeId === "fractal" && <FractalExhibit />}
            {activeId === "typography" && <TypographyExhibit />}
            {activeId === "clock" && <ClockExhibit />}
            {activeId === "thermo" && <ThermoExhibit />}
            {activeId === "bubbles" && <BubblesExhibit />}
            {activeId === "earth" && <EarthExhibit />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

// --- Exhibits implementations --- //

function TypographyExhibit() {
  const [weight, setWeight] = useState(400);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = e.clientX / window.innerWidth;
      setWeight(100 + normalizedX * 800);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="text-center w-full">
      <h2 
        className="text-[12vw] md:text-[8vw] font-display transition-all duration-75 ease-out text-foreground leading-none tracking-tighter"
        style={{ fontWeight: weight }}
      >
        BREATHE
      </h2>
      <p className="text-muted mt-4 uppercase tracking-[0.5em] text-xs">Move mouse horizontally</p>
    </div>
  );
}

function ClockExhibit() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="text-[15vw] md:text-[10vw] font-display font-light text-foreground tracking-tighter leading-none flex gap-4">
        <span>{time.getHours().toString().padStart(2, '0')}</span>
        <span className="animate-pulse">:</span>
        <span>{time.getMinutes().toString().padStart(2, '0')}</span>
      </div>
      <div className="flex gap-8 mt-8 text-muted uppercase tracking-widest text-sm font-medium">
        <span>{time.getSeconds().toString().padStart(2, '0')} SEC</span>
        <span>NY / LON / SEO</span>
      </div>
    </div>
  );
}

function ThermoExhibit() {
  const [temp, setTemp] = useState(15.4);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTemp(prev => prev + (Math.random() - 0.5) * 0.1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const heightPercent = Math.min(Math.max((temp / 40) * 100, 0), 100);

  return (
    <div className="flex flex-col items-center gap-12 w-full max-w-sm">
      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-foreground"
          animate={{ width: `${heightPercent}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
      </div>
      <div className="text-center">
        <h2 className="text-8xl font-display font-light text-foreground tracking-tighter">
          {temp.toFixed(2)}°C
        </h2>
        <p className="text-muted mt-4 uppercase tracking-[0.3em] text-xs">Global Average Anomaly</p>
      </div>
    </div>
  );
}

function BubblesExhibit() {
  const bubbles = Array.from({ length: 15 });
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden min-h-[400px]">
      {bubbles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-foreground/30 mix-blend-difference"
          initial={{
            width: Math.random() * 100 + 20,
            height: Math.random() * 100 + 20,
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
          }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: (Math.random() - 0.5) * 400,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
      <p className="absolute bottom-0 text-muted uppercase tracking-[0.5em] text-xs z-10 pointer-events-none">Quantum Fluctuations</p>
    </div>
  );
}

function EarthExhibit() {
  return (
    <div className="flex flex-col items-center justify-center relative w-full h-full">
      <motion.div 
        className="w-[300px] h-[300px] rounded-full border border-foreground/20 relative flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="absolute w-full h-[1px] bg-foreground/20" />
        <div className="absolute h-full w-[1px] bg-foreground/20" />
        <div className="absolute w-[80%] h-[80%] rounded-full border border-foreground/10" />
        <div className="absolute w-[60%] h-[60%] rounded-full border border-foreground/5" />
        
        {/* Orbital nodes */}
        <motion.div className="absolute w-3 h-3 bg-foreground rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        <motion.div className="absolute w-2 h-2 bg-muted rounded-full bottom-1/4 right-0 translate-x-1/2 translate-y-1/2" />
      </motion.div>
      <p className="absolute bottom-0 text-muted uppercase tracking-[0.3em] text-xs">Orbital Matrix Active</p>
    </div>
  );
}

// --- New Complex Exhibits --- //

function FluidNodeExhibit() {
  const [nodes, setNodes] = useState(Array.from({ length: 12 }, () => ({ x: 0, y: 0 })));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = document.querySelector('main')?.getBoundingClientRect();
      if (!rect) return;
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setNodes(prev => prev.map((node, i) => {
        const targetX = x + Math.cos(i * 30) * Math.min(x / 5, 200);
        const targetY = y + Math.sin(i * 30) * Math.min(y / 5, 200);
        return {
          x: node.x + (targetX - node.x) * 0.1 * (i / 12 + 0.1),
          y: node.y + (targetY - node.y) * 0.1 * (i / 12 + 0.1)
        };
      }));
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* SVG Canvas for lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {nodes.map((node, i) => {
          if (i === 0) return null;
          const prev = nodes[i - 1];
          return (
            <line
              key={`line-${i}`}
              x1={prev.x} y1={prev.y}
              x2={node.x} y2={node.y}
              stroke="var(--foreground)"
              strokeWidth="1"
              strokeOpacity="0.2"
            />
          );
        })}
      </svg>
      {nodes.map((node, i) => (
        <div
          key={`node-${i}`}
          className="absolute w-2 h-2 rounded-full bg-foreground -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
          style={{ left: node.x, top: node.y }}
        />
      ))}
      <p className="absolute bottom-0 w-full text-center text-muted uppercase tracking-[0.3em] text-xs z-10 pointer-events-none">Fluid Node Interpolation</p>
    </div>
  );
}

function GlitchExhibit() {
  const [glitchText, setGlitchText] = useState("SYSTEM ERROR");
  const chars = "!<>-_\\\\/[]{}—=+*^?#________";
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setGlitchText(Array.from({ length: 12 }, () => chars[Math.floor(Math.random() * chars.length)]).join(''));
      } else {
        setGlitchText("STRUCTURING COMPLEXITY");
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full relative">
      <motion.h2 
        className="text-[10vw] md:text-[6vw] font-display font-black text-foreground tracking-tighter mix-blend-difference"
        animate={{ x: [0, -5, 5, -2, 2, 0], y: [0, 2, -2, 1, -1, 0] }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "reverse" }}
      >
        {glitchText}
      </motion.h2>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-2 bg-foreground/50 mix-blend-overlay" />
      <p className="mt-8 text-muted uppercase tracking-[0.5em] text-xs">Digital Disruption</p>
    </div>
  );
}

function WavesExhibit() {
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    let animationFrameId: number;
    const animate = () => {
      setOffset(prev => prev + 0.1);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden">
      <svg width="100%" height="300" viewBox="0 0 1000 300" className="opacity-60">
        {[0, 1, 2, 3, 4].map(layer => {
          const points = Array.from({ length: 100 }, (_, i) => {
            const x = i * 10;
            const y = 150 + Math.sin((x / 50) + offset + (layer * 0.5)) * (20 + layer * 15);
            return `${x},${y}`;
          }).join(' ');
          
          return (
            <polyline 
              key={layer} 
              points={points} 
              fill="none" 
              stroke="var(--foreground)" 
              strokeWidth="1" 
              strokeOpacity={1 - layer * 0.15} 
            />
          );
        })}
      </svg>
      <p className="absolute bottom-0 text-muted uppercase tracking-[0.3em] text-xs pointer-events-none">Interfering Sine Waves</p>
    </div>
  );
}

function KineticExhibit() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full relative" style={{ perspective: "1000px" }}>
      <motion.div 
        className="text-6xl md:text-8xl font-display font-medium text-foreground tracking-tighter whitespace-nowrap"
        animate={{ rotateX: [0, 360], rotateY: [0, 360] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        O V I X A
      </motion.div>
      <p className="absolute bottom-0 text-muted uppercase tracking-[0.4em] text-xs pointer-events-none">3D Kinetic Typography</p>
    </div>
  );
}

function AudioVisualizerExhibit() {
  const [bars, setBars] = useState(Array.from({ length: 30 }, () => 10));
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const normalizedX = e.clientX / window.innerWidth;
      const normalizedY = e.clientY / window.innerHeight;
      
      setBars(prev => prev.map((_, i) => {
        const base = 20 + Math.abs(Math.sin(i * 0.5 + normalizedX * 10)) * 100;
        return base * (1 - normalizedY * 0.5); // height varies based on mouse
      }));
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col items-center justify-end w-full h-[300px] gap-1 px-4 mb-12">
      <div className="flex items-end justify-center w-full h-full gap-[2px] md:gap-1">
        {bars.map((height, i) => (
          <motion.div
            key={i}
            className="w-full bg-foreground max-w-[12px] rounded-t-sm"
            animate={{ height: `${height}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          />
        ))}
      </div>
      <p className="mt-8 text-muted uppercase tracking-[0.3em] text-xs">Pseudo Frequency Visualizer</p>
    </div>
  );
}

function FractalExhibit() {
  const [depth, setDepth] = useState(5);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDepth(prev => prev >= 7 ? 2 : prev + 1);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full mt-24">
      <motion.div 
        className="w-1 h-32 bg-foreground origin-bottom relative"
        initial={{ rotate: 0 }}
        animate={{ rotate: [ -5, 5, -5 ] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <Branch level={depth} angle={30} />
        <Branch level={depth} angle={-30} />
      </motion.div>
      <p className="absolute bottom-0 mb-4 text-muted uppercase tracking-[0.3em] text-xs pointer-events-none">Recursive Fractal Tree</p>
    </div>
  );
}

function Branch({ level, angle }: { level: number, angle: number }) {
  if (level <= 0) return null;
  return (
    <motion.div 
      className="absolute top-0 left-0 w-[1px] h-16 bg-foreground origin-bottom"
      style={{ rotate: `${angle}deg`, y: "-100%" }}
      initial={{ scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Branch level={level - 1} angle={angle * 0.8} />
      <Branch level={level - 1} angle={-angle * 0.8} />
    </motion.div>
  );
}
