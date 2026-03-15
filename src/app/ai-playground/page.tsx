"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Globe, Cpu, Radio, Sparkles, Wind, Layers, ArrowRight, Activity, Command, Boxes, Share2, Compass, PenTool, Repeat, Target, MousePointerClick, Keyboard, Type, CircleDashed, Clock } from "lucide-react";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Stars, Html, Text, Float } from "@react-three/drei";
import gsap from "gsap";

// --- Types --- //
type ExhibitId = 
  | "core_collapse" | "elastic_field" | "keyboard_wave" | "kinetic_type" | "balloon_metaball" | "chronos_sphere"
  | "cosmic" | "kinetic" | "physics" | "particles" | "vortex" 
  | "attraction" | "neural" | "optical" | "symmetry" | "quantum"
  | "glitch" | "waves" | "fluid" | "fractal";

const exhibits = [
  { id: "core_collapse", name: "Core Collapse", icon: Target, color: "#fff" },
  { id: "elastic_field", name: "Elastic UI Field", icon: MousePointerClick, color: "#fff" },
  { id: "keyboard_wave", name: "Keyboard Waveform", icon: Keyboard, color: "#fff" },
  { id: "kinetic_type", name: "Kinetic Typography", icon: Type, color: "#fff" },
  { id: "balloon_metaball", name: "Balloon Metaballs", icon: CircleDashed, color: "#fff" },
  { id: "chronos_sphere", name: "Chronos-Sphere", icon: Clock, color: "#fff" },
  { id: "cosmic", name: "Cosmic Hyperspace", icon: Sparkles, color: "#9333ea" },
  { id: "attraction", name: "Attraction Grid", icon: Boxes, color: "#06b6d4" },
  { id: "neural", name: "Neural Drift", icon: Share2, color: "#10b981" },
  { id: "optical", name: "Optical Flow", icon: PenTool, color: "#f59e0b" },
  { id: "symmetry", name: "Symmetry Lab", icon: Compass, color: "#3b82f6" },
  { id: "quantum", name: "Quantum Field", icon: Activity, color: "#8b5cf6" },
  { id: "quantum", name: "Quantum Field", icon: Activity, color: "#8b5cf6" },
  { id: "physics", name: "Falling Physics", icon: Layers, color: "#f59e0b" },
  { id: "particles", name: "Neon Particle Flow", icon: Zap, color: "#10b981" },
  { id: "fluid", name: "Bio-Organic Fluid", icon: Globe, color: "#06b6d4" },
  { id: "glitch", name: "Digital Disruption", icon: Cpu, color: "#ef4444" },
  { id: "waves", name: "Generative Sine", icon: Radio, color: "#ec4899" },
  { id: "fractal", name: "Recursive Growth", icon: Command, color: "#8b5cf6" },
];

export default function AIPlayground() {
  const [activeId, setActiveId] = useState<ExhibitId>("core_collapse");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleExhibitChange = (id: ExhibitId) => {
    if (id === activeId) return;
    setIsTransitioning(true);
    setActiveId(id);
    setTimeout(() => setIsTransitioning(false), 1200);
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden font-display selection:bg-white selection:text-black">
      {/* ─── Global Background Engine ────────────────────────────────────── */}
      <div className="fixed inset-0 z-0">
        <CosmicEngine isWarping={isTransitioning} activeExhibit={activeId} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeId}
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, delay: isTransitioning ? 0 : 0.4 }}
          className="fixed inset-0 z-10 pointer-events-none"
        >
          <div className="w-full h-full flex items-center justify-center pointer-events-auto">
             {activeId === "core_collapse" && <CoreCollapseExhibit />}
             {activeId === "elastic_field" && <ElasticFieldExhibit />}
             {activeId === "keyboard_wave" && <KeyboardWaveformExhibit />}
             {activeId === "kinetic_type" && <KineticTypographyExhibit />}
             {activeId === "balloon_metaball" && <BalloonMetaballExhibit />}
             {activeId === "chronos_sphere" && <ChronosSphereExhibit />}
             {activeId === "attraction" && <AttractionGridExhibit />}
             {activeId === "neural" && <NeuralDriftExhibit />}
             {activeId === "optical" && <OpticalFlowExhibit />}
             {activeId === "symmetry" && <SymmetryExhibit />}
             {activeId === "quantum" && <QuantumFieldExhibit />}
             {activeId === "physics" && <PhysicsExhibit />}
             {activeId === "particles" && <ParticleExhibit />}
             {activeId === "fluid" && <FluidExhibit />}
             {activeId === "glitch" && <GlitchExhibit />}
             {activeId === "waves" && <WavesExhibit />}
             {activeId === "fractal" && <FractalExhibit />}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ─── Premium Sidebar ────────────────────────────────────────────── */}
      <nav className="fixed left-0 top-0 bottom-0 z-50 flex flex-col justify-center pl-4 md:pl-8 pr-12 pointer-events-none">
        <div className="flex flex-col gap-0.5 md:gap-1 pointer-events-auto max-h-[85vh] overflow-y-auto no-scrollbar py-20 pr-4" ref={scrollRef}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-6 pl-2"
          >
            <h1 className="text-white text-[10px] font-bold uppercase tracking-[0.4em] opacity-30 mb-1">Experimental</h1>
            <h2 className="text-white text-2xl md:text-3xl font-bold tracking-tighter">AI LAB</h2>
          </motion.div>

          {exhibits.map((ex, i) => {
            const isActive = activeId === ex.id;
            return (
              <button
                key={ex.id}
                onClick={() => handleExhibitChange(ex.id as ExhibitId)}
                className="group relative flex items-center gap-4 py-1 md:py-1.5 transition-all duration-300 text-left"
              >
                {/* Magnetic Hover Indicator */}
                <motion.div 
                   whileHover={{ x: 4 }}
                   className="flex items-center gap-4"
                >
                  <motion.div 
                    initial={false}
                    animate={{ 
                      height: isActive ? "32px" : "16px",
                      opacity: isActive ? 1 : 0,
                    }}
                    whileHover={{ opacity: isActive ? 1 : 0.4, height: isActive ? "32px" : "24px" }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className={`w-[4px] rounded-full ${isActive ? "bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" : "bg-white/40"}`} 
                  />
                  
                  <div className="flex flex-col overflow-hidden py-1">
                    <motion.span 
                      initial={false}
                      className={`leading-none flex flex-wrap transition-all duration-300 ${
                        isActive 
                          ? "text-[1.9vh] md:text-[2.4vh] lg:text-[3.1vh] text-white font-bold tracking-tight" 
                          : "text-[1.6vh] md:text-[2.0vh] lg:text-[2.5vh] font-medium tracking-tight"
                      }`}
                    >
                      {(isActive ? ex.name.toUpperCase() : ex.name).split("").map((char, index) => (
                        <span key={index} className="relative inline-block overflow-hidden min-w-[0.25em]">
                          {/* Measuring span */}
                          <span className="invisible">{char === " " ? "\u00A0" : char}</span>
                          
                          {/* Idle / Active visible text */}
                          <motion.span
                            className={`absolute inset-0 flex items-center ${
                              isActive 
                                ? "text-white" 
                                : "text-transparent bg-clip-text bg-gradient-to-b from-neutral-200 to-neutral-500 group-hover:from-white group-hover:to-white"
                            }`}
                            initial={false}
                            animate={{ y: "0%", rotate: 0, skewX: 0 }}
                            whileHover={{ y: "-110%", rotate: -5, skewX: -10 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.33, 1, 0.68, 1], // Custom Apple-style ease
                              delay: index * 0.012,
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
  
                          {/* Hover sliding text - Premium Spring Reveal */}
                          <motion.span
                            className="absolute inset-0 flex items-center text-white font-bold"
                            initial={{ y: "110%", rotate: 5, skewX: 10 }}
                            whileHover={{ y: "0%", rotate: 0, skewX: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 25,
                              delay: index * 0.012,
                            }}
                          >
                            {char === " " ? "\u00A0" : char}
                          </motion.span>
                        </span>
                      ))}
                    </motion.span>
                    
                    {/* Hover & Active Underline - Dash Swipe Interaction */}
                    <div className="relative h-[2px] w-full mt-1 overflow-hidden">
                      {/* Base Track */}
                      <div className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${isActive ? 'bg-white/20' : 'bg-transparent group-hover:bg-white/10'}`} />
                      
                      {/* Animated Swipe Line - Solid White */}
                      <motion.div 
                        initial={false}
                        animate={{ 
                          x: isActive ? "0%" : "-101%",
                          opacity: isActive ? 1 : 0
                        }}
                        whileHover={{ 
                          x: "0%", 
                          opacity: 1 
                        }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 200, 
                          damping: 30,
                          delay: isActive ? 0.1 : 0
                        }}
                        className="absolute inset-0 h-full w-full bg-white origin-left"
                      />
                    </div>
                  </div>
                </motion.div>
                
                {/* Ultra-Premium Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="menu-blob"
                    className="absolute -inset-x-6 -inset-y-1 bg-white/[0.04] backdrop-blur-md rounded-2xl -z-10 border-l-[3px] border-white/30"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

// ─── Background Engine ────────────────────────────────────────────── //

function CosmicEngine({ isWarping, activeExhibit }: { isWarping: boolean; activeExhibit: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [isUserWarping, setIsUserWarping] = useState(false);
  const [displaySpeed, setDisplaySpeed] = useState(0.3);
  
  const stars = useMemo(() => Array.from({ length: 400 }, () => ({
    x: Math.random() * 2000 - 1000,
    y: Math.random() * 2000 - 1000,
    z: Math.random() * 2000,
    px: 0, py: 0,
    color: `hsla(${Math.random() * 60 + 200}, 100%, 80%, ${Math.random() * 0.4 + 0.4})`
  })), []);

  const speed = useRef(0.3);
  const currentTargetSpeed = isWarping ? 80 : (isUserWarping ? 120 : 0.3);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const resize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };
    window.addEventListener("resize", resize);
    resize();

    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Acceleration logic
      speed.current += (currentTargetSpeed - speed.current) * 0.05;
      setDisplaySpeed(speed.current);

      const boostFactor = (speed.current - 0.3) / 120; // 0 to ~1
      
      ctx.fillStyle = `rgba(0, 0, 0, ${0.15 + boostFactor * 0.25})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      stars.forEach(s => {
        s.z -= speed.current;
        if (s.z <= 0) { 
          s.z = 2000; 
          s.x = Math.random() * 2000 - 1000; 
          s.y = Math.random() * 2000 - 1000; 
          s.px = 0; s.py = 0; 
        }
        
        const x = (s.x / s.z) * cx + cx;
        const y = (s.y / s.z) * cy + cy;

        if (s.px !== 0) {
          ctx.beginPath();
          const opacity = Math.min(1, (1 - s.z / 2000) * (0.3 + boostFactor * 0.7));
          ctx.strokeStyle = `hsla(${200 + boostFactor * 100}, 100%, 90%, ${opacity})`;
          ctx.lineWidth = (1 - s.z / 2000) * (1.5 + boostFactor * 8);
          ctx.lineCap = "round";
          ctx.moveTo(s.px, s.py);
          ctx.lineTo(x, y);
          ctx.stroke();
        }
        s.px = x;
        s.py = y;
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    const handleDown = () => { if (activeExhibit === "cosmic") setIsUserWarping(true); };
    const handleUp = () => setIsUserWarping(false);

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchstart", handleDown);
    window.addEventListener("touchend", handleUp);

    animate();
    return () => { 
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchstart", handleDown);
      window.removeEventListener("touchend", handleUp);
      if (requestRef.current) cancelAnimationFrame(requestRef.current); 
    };
  }, [isWarping, stars, currentTargetSpeed, activeExhibit]);

  return (
    <div className="relative w-full h-full cursor-pointer overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Velocity HUD */}
      {activeExhibit === "cosmic" && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <motion.div 
            animate={{ 
              scale: isUserWarping ? 1.05 : 1,
              opacity: displaySpeed > 1 ? 1 : 0.3
            }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.8em] text-cyan-400/60 font-bold mb-2">Hyperspace Velocity</span>
              <div className="flex items-baseline gap-2">
                <span className="text-white text-7xl md:text-9xl font-black tracking-tighter tabular-nums drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">
                  {Math.floor(displaySpeed * 43.2).toLocaleString()}
                </span>
                <span className="text-cyan-400 font-bold text-xl md:text-2xl">LY/S</span>
              </div>
              <div className="w-64 h-1 bg-white/5 mt-4 rounded-full overflow-hidden relative border border-white/10">
                <motion.div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-white shadow-[0_0_15px_rgba(6,182,212,0.5)]"
                  style={{ width: `${Math.min(100, (displaySpeed / 120) * 100)}%` }}
                />
              </div>
            </div>
            
            <motion.p 
              animate={{ opacity: isUserWarping ? [0.4, 1, 0.4] : 0.5 }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-white/20 text-[10px] uppercase tracking-[0.5em] mt-8 font-bold"
            >
              {isUserWarping ? "Propulsion Active - Maximum Burn" : "Hold Click to Accelerate"}
            </motion.p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ─── New Advanced Exhibits ─────────────────────────────────────────── //

function VortexExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    canvas.width = window.innerWidth; canvas.height = window.innerHeight;
    const particles = Array.from({ length: 4000 }, () => ({
      r: Math.random() * 800, a: Math.random() * Math.PI * 2,
      s: Math.random() * 0.01 + 0.005, size: Math.random() * 1.5,
      c: `hsla(${Math.random() * 40 + 300}, 100%, 60%, ${Math.random() * 0.5 + 0.2})`
    }));
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.15)"; ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2 + (mouse.current.x - canvas.width / 2) * 0.2;
      const cy = canvas.height / 2 + (mouse.current.y - canvas.height / 2) * 0.2;
      particles.forEach(p => {
        p.a += p.s; const x = cx + Math.cos(p.a) * p.r; const y = cy + Math.sin(p.a) * p.r;
        ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
        if (Math.random() > 0.99) ctx.shadowBlur = 10, ctx.shadowColor = p.c; else ctx.shadowBlur = 0;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMove); animate();
    return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full mix-blend-screen" />;
}

function AttractionGridExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -1000, y: -1000 });
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };
    window.addEventListener("resize", resize); resize();
    const cols = Math.ceil(canvas.width / 40); const rows = Math.ceil(canvas.height / 40);
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      for(let i=0; i<cols; i++) {
        for(let j=0; j<rows; j++) {
          const ix = i * 40; const iy = j * 40;
          const dx = mouse.current.x - ix; const dy = mouse.current.y - iy;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const f = Math.max(0, (250 - dist) / 250);
          const ox = ix - dx * f * 0.8; const oy = iy - dy * f * 0.8;
          ctx.fillStyle = `hsla(${200 + f * 100}, 100%, 70%, ${0.1 + f * 0.9})`;
          ctx.beginPath(); ctx.arc(ox, oy, 1.5 + f * 4, 0, Math.PI*2); ctx.fill();
          if (f > 0.4) { ctx.strokeStyle = `hsla(200, 100%, 70%, ${f * 0.3})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(ix, iy); ctx.lineTo(ox, oy); ctx.stroke(); }
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMove); animate();
    return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function NeuralDriftExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    resize(); function resize() { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } }
    const nodes = Array.from({ length: 120 }, () => ({
      x: Math.random() * (canvas?.width || 1000), y: Math.random() * (canvas?.height || 1000),
      vx: (Math.random() - 0.5) * 1, vy: (Math.random() - 0.5) * 1,
      r: Math.random() * 2 + 1
    }));
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if(n.x<0||n.x>canvas.width) n.vx*=-1; if(n.y<0||n.y>canvas.height) n.vy*=-1;
        nodes.forEach(m => {
          const dx = n.x - m.x; const dy = n.y - m.y; const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 150) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${1 - dist/150})`; ctx.lineWidth = 0.5;
            ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
          }
        });
        const mdx = mouse.current.x - n.x; const mdy = mouse.current.y - n.y;
        if(Math.sqrt(mdx*mdx+mdy*mdy) < 200) { n.vx += mdx*0.001; n.vy += mdy*0.001; }
        ctx.fillStyle = "#10b981"; ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2); ctx.fill();
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMove); animate();
    return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function OpticalFlowExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trails = useRef<any[]>([]);
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.05)"; ctx.fillRect(0,0,canvas.width, canvas.height);
      trails.current.forEach((t, i) => {
        t.life -= 0.01; t.x += t.vx; t.y += t.vy; t.rot += t.vr;
        ctx.save(); ctx.translate(t.x, t.y); ctx.rotate(t.rot);
        ctx.strokeStyle = `hsla(${t.h}, 100%, 70%, ${t.life})`; ctx.lineWidth = 2;
        ctx.strokeRect(-t.s/2, -t.h/2, t.s, t.s); ctx.restore();
        if(t.life <= 0) trails.current.splice(i, 1);
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleMove = (e: MouseEvent) => {
      if(Math.random() > 0.5) trails.current.push({
        x: e.clientX, y: e.clientY, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4,
        rot: 0, vr: (Math.random()-0.5)*0.1, s: Math.random()*40+10, h: Math.random()*60+20, life: 1
      });
    };
    window.addEventListener("mousemove", handleMove); animate();
    return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function SymmetryExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    const handleMove = (e: MouseEvent) => {
      if (!canvas || !ctx) return; // Added null check for ctx here
      const cx = canvas.width/2; const cy = canvas.height/2;
      const x = e.clientX - cx; const y = e.clientY - cy;
      ctx.strokeStyle = `hsla(${Date.now()%360}, 80%, 60%, 0.4)`; ctx.lineWidth = 2;
      for(let i=0; i<8; i++) {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate((i * Math.PI*2)/8);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x+10, y+10); ctx.stroke(); ctx.restore();
      }
    };
    ctx.fillStyle = "black"; ctx.fillRect(0,0,canvas.width, canvas.height);
    const animate = () => { 
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.02)"; ctx.fillRect(0,0,canvas.width, canvas.height); 
      requestRef.current = requestAnimationFrame(animate); 
    };
    window.addEventListener("mousemove", handleMove); animate();
    return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full mix-blend-screen" />;
}

function QuantumFieldExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      for(let x=20; x<canvas.width; x+=40) {
        for(let y=20; y<canvas.height; y+=40) {
          const angle = Math.atan2(mouse.current.y - y, mouse.current.x - x);
          ctx.save(); ctx.translate(x, y); ctx.rotate(angle);
          ctx.strokeStyle = `hsla(${280 + angle * 50}, 100%, 70%, 0.3)`; ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(-10, 0); ctx.lineTo(10, 0); ctx.stroke(); ctx.restore();
        }
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleMove = (e: MouseEvent) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMove); animate();
    return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// ─── Previous Exhibits (Enhanced) ──────────────────────────────────── //

function PhysicsExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return; const ctx = canvas.getContext("2d"); if(!ctx) return;
    if (canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    const cards: any[] = []; const g = 0.5;
    const create = (x: number, y: number) => ({ x, y, w: 80, h: 110, vx: (Math.random()-0.5)*15, vy: (Math.random()-0.5)*15, r: Math.random()*Math.PI*2, vr: (Math.random()-0.5)*0.2, c: `hsla(${Math.random()*360}, 80%, 60%, 0.8)` });
    const handleDown = (e: MouseEvent) => { for(let i=0; i<5; i++) cards.push(create(e.clientX, e.clientY)); };
    window.addEventListener("mousedown", handleDown);
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0,0,canvas.width, canvas.height);
      cards.forEach((c, i) => {
        c.vy += g; c.x += c.vx; c.y += c.vy; c.r += c.vr;
        if(c.y+c.h>canvas.height) { c.y=canvas.height-c.h; c.vy*=-0.6; } if(c.x<0||c.x+c.w>canvas.width) c.vx*=-1;
        ctx.save(); ctx.translate(c.x+c.w/2, c.y+c.h/2); ctx.rotate(c.r); ctx.fillStyle=c.c; ctx.shadowBlur=20; ctx.shadowColor=c.c; ctx.fillRect(-c.w/2, -c.h/2, c.w, c.h); ctx.strokeStyle="white"; ctx.lineWidth=1; ctx.strokeRect(-c.w/2, -c.h/2, c.w, c.h); ctx.restore();
      });
      if(cards.length>40) cards.shift(); 
      requestRef.current = requestAnimationFrame(animate);
    };
    animate(); return () => { window.removeEventListener("mousedown", handleDown); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <div className="relative w-full h-full"><canvas ref={canvasRef} className="w-full h-full" /><div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/20 uppercase tracking-[0.5em] text-[8px] font-bold">Touch Grid To Interact</div></div>;
}

function ParticleExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null); const mouse = useRef({ x: 0, y: 0 });
  const requestRef = useRef<number | null>(null);
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return; const ctx = canvas.getContext("2d"); if(!ctx) return;
    if(canvas) { canvas.width=window.innerWidth; canvas.height=window.innerHeight; }
    const p = Array.from({ length: 1000 }, () => ({ 
      x: Math.random() * (canvas?.width || 1000), 
      y: Math.random() * (canvas?.height || 1000), 
      vx: 0, vy: 0, s: Math.random()*2+1, 
      c: `hsla(${Math.random()*360}, 100%, 70%, 1)` 
    }));
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle="rgba(0,0,0,0.1)"; ctx.fillRect(0,0,canvas.width, canvas.height);
      p.forEach(part => {
        const dx=mouse.current.x-part.x; const dy=mouse.current.y-part.y; const dist=Math.sqrt(dx*dx+dy*dy); const f=Math.max(0, (200-dist)/200);
        part.vx+=dx*f*0.01; part.vy+=dy*f*0.01; part.vx*=0.95; part.vy*=0.95; part.x+=part.vx; part.y+=part.vy;
        ctx.fillStyle=part.c; ctx.shadowBlur=10; ctx.shadowColor=part.c; ctx.beginPath(); ctx.arc(part.x, part.y, part.s, 0, Math.PI*2); ctx.fill();
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    const handleMove = (e: MouseEvent) => { mouse.current={ x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", handleMove); animate(); return () => { window.removeEventListener("mousemove", handleMove); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);
  return <canvas ref={canvasRef} className="w-full h-full" />;
}

function FluidExhibit() {
  return (
    <div className="flex items-center justify-center">
      <motion.div animate={{ rotate: 360, scale: [1, 1.3, 1] }} transition={{ duration: 15, repeat: Infinity }} className="w-[35vw] h-[35vw] rounded-full bg-gradient-to-tr from-fuchsia-600 via-violet-600 to-indigo-600 blur-[120px] opacity-30 mix-blend-screen" />
      <div className="absolute text-center"><h2 className="text-white text-[12vw] font-black tracking-tighter mix-blend-difference">VITAL</h2><p className="text-white/20 uppercase tracking-[1em] text-[8px]">Spectral Fluid Dynamics</p></div>
    </div>
  );
}

function GlitchExhibit() {
  const [t, setT] = useState("AI_CONCORD");
  useEffect(() => { const i=setInterval(() => { const c="01"; setT(Array.from({length:12}, ()=>c[Math.floor(Math.random()*c.length)]).join("")); setTimeout(()=>setT("CORRUPTION"), 80); }, 3000); return ()=>clearInterval(i); }, []);
  return <div className="flex flex-col items-center"><h2 className="text-white text-[10vw] font-black tracking-tighter animate-pulse mix-blend-difference">{t}</h2><div className="w-full h-[2px] bg-red-500/40 mt-6 relative overflow-hidden"><motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 0.2, repeat: Infinity }} className="absolute inset-0 bg-red-500" /></div></div>;
}

function WavesExhibit() {
  return (
    <svg className="w-full h-full max-h-[50vh] opacity-60" viewBox="0 0 1000 400">
      {[...Array(20)].map((_, i) => (
        <motion.path key={i} fill="none" stroke={`hsl(${200 + i*5}, 100%, 70%)`} strokeWidth="1" animate={{ d: [ `M0 ${200+i*2} Q 250 ${50+i*15} 500 200 T 1000 ${200-i*2}`, `M0 ${200-i*2} Q 250 ${350-i*15} 500 200 T 1000 ${200+i*2}`, `M0 ${200+i*2} Q 250 ${50+i*15} 500 200 T 1000 ${200-i*2}` ] }} transition={{ duration: 4+i*0.1, repeat: Infinity, ease: "linear" }} />
      ))}
    </svg>
  );
}

function FractalExhibit() {
  return (
    <div className="flex flex-col items-center gap-16">
      <div className="relative w-48 h-48 border border-white/10 rounded-full flex items-center justify-center">
        {[...Array(12)].map((_, i) => (
          <motion.div key={i} className="absolute border border-white/30" style={{ width: i*20+20, height: i*20+20 }} animate={{ rotate: [0, 180, 360], borderRadius: ["0%", "50%", "0%"], scale: [1, 1.2, 1] }} transition={{ duration: 3+i*0.5, repeat: Infinity }} />
        ))}
      </div>
      <span className="text-white/20 uppercase tracking-[1em] text-[7px] font-bold">Generative Architecture</span>
    </div>
  );
}

// ─── Premium Exhibits ─────────────────────────────────────────────────── //

function CoreCollapseExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [phase, setPhase] = useState<"vortex" | "collapsing" | "grid">("vortex");
  const phaseRef = useRef(phase);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };
    window.addEventListener("resize", resize); resize();

    const numParticles = 6000;
    const gridSize = Math.ceil(Math.pow(numParticles, 1/3));
    const spacing = 35;
    
    const particles = Array.from({ length: numParticles }, (_, i) => {
      const gx = (i % gridSize) - gridSize/2;
      const gy = (Math.floor(i / gridSize) % gridSize) - gridSize/2;
      const gz = (Math.floor(i / Math.pow(gridSize, 2))) - gridSize/2;
      
      return {
        vr: Math.random() * 1000 + 50, // vortex radius
        va: Math.random() * Math.PI * 2, // vortex angle
        vs: Math.random() * 0.02 + 0.005, // vortex speed
        gx: gx * spacing, gy: gy * spacing, gz: gz * spacing,
        size: Math.random() * 1.5 + 0.5,
        color: `hsla(${Math.random() * 60 + 280}, 100%, 60%, ${Math.random() * 0.5 + 0.3})`,
        gridColor: `hsla(${180 + (gx/gridSize)*60 + (gy/gridSize)*60}, 100%, 70%, 0.6)`
      };
    });

    let time = 0;
    let collapseProgress = 0;
    let gridProgress = 0;

    const animate = () => {
      if (!canvas || !ctx) return;
      const currentPhase = phaseRef.current;
      
      // Motion blur trail length depends on phase
      ctx.fillStyle = currentPhase === "collapsing" ? "rgba(0,0,0,0.4)" : "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      time += 0.005;

      if (currentPhase === "collapsing") {
        collapseProgress += (1 - collapseProgress) * 0.08;
      } else if (currentPhase === "vortex") {
        collapseProgress *= 0.9;
        gridProgress *= 0.9;
      }

      if (currentPhase === "grid") {
        gridProgress += (1 - gridProgress) * 0.05;
      }

      const rotY = time * 2;
      const rotX = time * 1.5;
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      particles.forEach(p => {
        // Vortex Position
        p.va += p.vs * (1 + collapseProgress * 20); 
        const currentR = p.vr * (1 - Math.pow(collapseProgress, 3)); 
        const vx = cx + Math.cos(p.va) * currentR;
        const vy = cy + Math.sin(p.va) * currentR;

        // Grid Position
        const x1 = p.gx * cosY - p.gz * sinY;
        const z1 = p.gz * cosY + p.gx * sinY;
        const y2 = p.gy * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.gy * sinX;
        
        const fov = 1000;
        const zScale = Math.max(0.1, fov / (fov + z2 + 800));
        const gx = cx + x1 * zScale;
        const gy = cy + y2 * zScale;

        // Interpolate
        let drawX = vx;
        let drawY = vy;
        let drawSize = p.size;
        let drawColor = p.color;

        if (currentPhase === "grid" || gridProgress > 0) {
          // Lerp from center (collapse point) to grid
          drawX = vx + (gx - vx) * gridProgress;
          drawY = vy + (gy - vy) * gridProgress;
          drawSize = p.size * (1 - gridProgress) + (p.size * zScale * 2.5) * gridProgress;
          drawColor = gridProgress > 0.5 ? p.gridColor : p.color;
        }

        ctx.beginPath();
        ctx.arc(drawX, drawY, drawSize, 0, Math.PI * 2);
        ctx.fillStyle = drawColor;
        ctx.fill();
      });

      // Draw Singularity Energy when collapsed
      if (collapseProgress > 0.9 && currentPhase === "collapsing") {
        const pulse = Math.sin(time * 50) * 10;
        ctx.beginPath();
        ctx.arc(cx, cy, 20 + pulse, 0, Math.PI * 2);
        ctx.fillStyle = "white";
        ctx.shadowBlur = 50;
        ctx.shadowColor = "magenta";
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener("resize", resize); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const handleClick = () => {
    if (phase === "vortex") {
      setPhase("collapsing");
      setTimeout(() => setPhase("grid"), 800);
    } else if (phase === "grid") {
      setPhase("vortex");
    }
  };

  return (
    <div className={`relative w-full h-full cursor-crosshair transition-all duration-300 ${phase === "collapsing" ? "invert saturate-200" : ""}`} onClick={handleClick}>
      <canvas ref={canvasRef} className="w-full h-full mix-blend-screen" />
      <div className="absolute inset-x-0 bottom-16 text-center pointer-events-none">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          key={phase}
          className="inline-flex flex-col items-center"
        >
          <span className="text-white text-xs md:text-sm font-bold tracking-[0.4em] uppercase mb-2">
            {phase === "vortex" ? "Core Collapse Sequence" : phase === "collapsing" ? "System Singularity Reached" : "Geometric Reconstitution Active"}
          </span>
          <span className="text-white/40 text-[9px] uppercase tracking-[0.2em]">
            {phase === "vortex" ? "Click to initiate singularity" : phase === "collapsing" ? "Reformatting..." : "Click to reset to chaos state"}
          </span>
        </motion.div>
      </div>
    </div>
  );
}

function ElasticFieldExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [buttons, setButtons] = useState<{ x: number, y: number, actions: string[] } | null>(null);
  const mouse = useRef({ x: 0, y: 0, isDown: false, startX: 0, startY: 0, dragDist: 0 });
  const [effectState, setEffectState] = useState<"normal" | "exploded" | "frozen">("normal");
  const effectRef = useRef(effectState);

  useEffect(() => { effectRef.current = effectState; }, [effectState]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };
    window.addEventListener("resize", resize); resize();

    const cols = 50;
    const rows = 30;
    const spacingX = canvas.width / cols;
    const spacingY = canvas.height / rows;

    const particles = Array.from({ length: cols * rows }, (_, i) => {
      const basex = (i % cols) * spacingX;
      const basey = Math.floor(i / cols) * spacingY;
      return {
        x: basex, y: basey,
        basex, basey,
        vx: 0, vy: 0,
        size: Math.random() * 1.5 + 0.5,
      };
    });

    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = mouse.current.x;
      const my = mouse.current.y;
      const isDrag = mouse.current.isDown;
      const effect = effectRef.current;

      particles.forEach(p => {
        let tx = p.basex;
        let ty = p.basey;

        if (effect === "frozen") {
          // Do nothing, freeze in place
        } else if (effect === "exploded") {
          const dx = p.x - canvas.width/2;
          const dy = p.y - canvas.height/2;
          const dist = Math.sqrt(dx*dx+dy*dy) || 1;
          tx = p.basex + (dx/dist) * 1000;
          ty = p.basey + (dy/dist) * 1000;
        } else {
          if (isDrag && !buttons) {
            const dx = mx - p.basex;
            const dy = my - p.basey;
            const dist = Math.sqrt(dx*dx+dy*dy);
            if (dist < 400) {
              const pull = Math.pow((400 - dist) / 400, 2);
              tx = p.basex + dx * pull * 0.95;
              ty = p.basey + dy * pull * 0.95;
            }
          }
        }

        const ax = (tx - p.x) * 0.15;
        const ay = (ty - p.y) * 0.15;
        
        p.vx = (p.vx + ax) * (effect==="frozen" ? 0.99 : 0.75);
        p.vy = (p.vy + ay) * (effect==="frozen" ? 0.99 : 0.75);
        
        p.x += p.vx;
        p.y += p.vy;

        const stretchDist = Math.sqrt(Math.pow(p.x - p.basex, 2) + Math.pow(p.y - p.basey, 2));
        const hue = 180 + stretchDist * 0.5;

        ctx.fillStyle = `hsla(${hue}, 100%, 70%, ${0.4 + stretchDist*0.01})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size + stretchDist*0.005, 0, Math.PI * 2);
        ctx.fill();
        
        if (stretchDist > 15 && effect !== "exploded") {
           ctx.strokeStyle = `hsla(${hue}, 100%, 70%, ${Math.min(0.5, stretchDist*0.002)})`;
           ctx.lineWidth = 0.5;
           ctx.beginPath();
           ctx.moveTo(p.basex, p.basey);
           ctx.lineTo(p.x, p.y);
           ctx.stroke();
        }
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener("resize", resize); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [buttons]);

  const handlePointerDown = (e: React.PointerEvent) => {
    mouse.current.isDown = true;
    mouse.current.startX = e.clientX;
    mouse.current.startY = e.clientY;
    setButtons(null);
    setEffectState("normal");
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
    if (mouse.current.isDown) {
      const dx = mouse.current.x - mouse.current.startX;
      const dy = mouse.current.y - mouse.current.startY;
      mouse.current.dragDist = Math.sqrt(dx*dx+dy*dy);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    mouse.current.isDown = false;
    if (mouse.current.dragDist > 100) {
      setButtons({ x: e.clientX, y: e.clientY, actions: ["EXPLODE", "FREEZE", "REEL", "RESET"] });
    }
    mouse.current.dragDist = 0;
  };

  return (
    <div 
      className="relative w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <div className="absolute inset-x-0 bottom-16 text-center pointer-events-none">
        <span className="text-white text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-2 block">
          Elastic UI Field
        </span>
        <span className="text-white/40 text-[9px] uppercase tracking-[0.2em]">
          Click & Drag to stretch field. Release to spawn UI.
        </span>
      </div>

      <AnimatePresence>
        {buttons && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.9, filter: "blur(5px)" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="absolute flex flex-col gap-2 p-4 rounded-3xl bg-white/5 border border-white/20 backdrop-blur-xl shadow-2xl z-50 pointer-events-auto"
            style={{ left: Math.min(buttons.x, window.innerWidth - 180), top: Math.min(buttons.y, window.innerHeight - 250) }}
          >
            {buttons.actions.map((action, i) => (
              <motion.button
                key={action}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="px-6 py-3 min-w-[140px] text-white text-xs font-bold tracking-[0.2em] rounded-xl bg-white/5 hover:bg-white/20 border border-white/10 hover:border-white/40 transition-all text-left group"
                onClick={(e) => {
                  e.stopPropagation();
                  setButtons(null);
                  if (action === "EXPLODE") setEffectState("exploded");
                  if (action === "FREEZE") setEffectState("frozen");
                  if (action === "REEL") setEffectState("normal");
                  if (action === "RESET") setEffectState("normal");
                  
                  if (action !== "FREEZE" && action !== "EXPLODE") {
                    setTimeout(() => setEffectState("normal"), 100);
                  }
                }}
              >
                <div className="flex items-center justify-between pointer-events-none">
                   <span>{action}</span>
                   <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-10px] group-hover:translate-x-0" />
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function KeyboardWaveformExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const [typedString, setTypedString] = useState("");
  const typeSpeedRef = useRef(0);
  const particlesRef = useRef<any[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };
    window.addEventListener("resize", resize); resize();

    // Helper offscreen canvas to get pixel data of text
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d")!;
    textCanvas.width = window.innerWidth; textCanvas.height = window.innerHeight;

    const spawnTextParticles = (char: string) => {
      textCtx.clearRect(0,0, textCanvas.width, textCanvas.height);
      const fontSize = Math.min(400, window.innerWidth * 0.4);
      textCtx.font = `bold ${fontSize}px sans-serif`;
      textCtx.fillStyle = "white";
      textCtx.textAlign = "center";
      textCtx.textBaseline = "middle";
      textCtx.fillText(char, textCanvas.width/2, textCanvas.height/2);

      const imgData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height).data;
      const newParticles = [];

      for (let y = 0; y < textCanvas.height; y += 8) {
        for (let x = 0; x < textCanvas.width; x += 8) {
          const i = (y * textCanvas.width + x) * 4;
          if (imgData[i + 3] > 128) {
             newParticles.push({
               x: x + (Math.random()-0.5)*10,
               y: y + (Math.random()-0.5)*10,
               vx: (Math.random()-0.5)*20,
               vy: (Math.random()-0.5)*20,
               life: 1,
               hue: Math.random() * 60 + 260
             });
          }
        }
      }
      particlesRef.current.push(...newParticles);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.length === 1 && e.key.match(/[a-zA-Z0-9]/)) {
         setTypedString(s => s.length > 15 ? s.slice(1) + e.key : s + e.key);
         spawnTextParticles(e.key.toUpperCase());
         typeSpeedRef.current += 15;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    let time = 0;
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      time += 0.05;
      typeSpeedRef.current *= 0.95; 
      
      const speedParam = typeSpeedRef.current;

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= 0.008;
        
        const waveY = Math.sin(p.x * 0.005 + time) * (50 + Math.min(speedParam * 3, 300));
        const targetY = canvas.height/2 + waveY;
        
        p.vx += (Math.cos(p.y * 0.01 + time) - 0.5) * (1 + speedParam * 0.02);
        p.vy += (targetY - p.y) * Math.max(0.01, p.life * 0.05); 
        
        p.vx *= 0.92;
        p.vy *= 0.92;
        
        p.x += p.vx;
        p.y += p.vy;

        ctx.fillStyle = `hsla(${p.hue - speedParam * 2}, 100%, 70%, ${p.life})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, Math.max(0.1, p.life * 3 + (speedParam * 0.02)), 0, Math.PI * 2);
        ctx.fill();

        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      if (particles.length < 50) {
         ctx.beginPath();
         for(let x=0; x<canvas.width; x+=10) {
           const y = canvas.height/2 + Math.sin(x*0.005 + time) * 50 + Math.sin(x*0.01 - time*1.5) * 30;
           if(x===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
         }
         ctx.strokeStyle = "rgba(255,255,255,0.05)";
         ctx.lineWidth = 1;
         ctx.stroke();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener("keydown", handleKeyDown); window.removeEventListener("resize", resize); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full mix-blend-screen" />
      <div className="absolute top-1/4 w-full text-center pointer-events-none opacity-20">
        <h2 className="text-white text-[15vw] font-black tracking-tighter mix-blend-overlay">
          {typedString}
        </h2>
      </div>
      <div className="absolute inset-x-0 bottom-16 text-center pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 1, 0.3] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-2 block"
        >
          {typeSpeedRef.current > 50 ? "Waveform Override Active" : "Keyboard Waveform"}
        </motion.div>
        <span className="text-white/40 text-[9px] uppercase tracking-[0.2em]">
          Type characters (A-Z) to generate physical manifestations
        </span>
      </div>
    </div>
  );
}

function KineticTypographyExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2, vx: 0, vy: 0 });

  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext("2d"); if (!ctx) return;
    const resize = () => { if(canvas) { canvas.width = window.innerWidth; canvas.height = window.innerHeight; } };
    window.addEventListener("resize", resize); resize();

    // Configuration
    const text = "AI LAB";
    const fontSize = Math.max(40, window.innerWidth / 20);
    const spacingX = fontSize * 3.5;
    const spacingY = fontSize * 1.5;
    
    // Grid Generation
    const cols = Math.ceil(canvas.width / spacingX) + 2;
    const rows = Math.ceil(canvas.height / spacingY) + 2;
    
    const grid: any[] = [];
    for(let i=0; i<rows; i++) {
      for(let j=0; j<cols; j++) {
        grid.push({
          x: j * spacingX - spacingX,
          y: i * spacingY - spacingY,
          baseX: j * spacingX - spacingX,
          baseY: i * spacingY - spacingY,
          skewX: 0,
          skewY: 0,
          scale: 1
        });
      }
    }

    const animate = () => {
      if (!canvas || !ctx) return;
      
      // Motion Blur trail
      ctx.fillStyle = "rgba(0,0,0,0.15)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      // Mouse velocity damping
      mouse.current.vx *= 0.9;
      mouse.current.vy *= 0.9;

      const vMag = Math.sqrt(mouse.current.vx**2 + mouse.current.vy**2);
      const isChromatic = vMag > 50; // Threshold for RGB split

      grid.forEach(cell => {
         // Distance to mouse
         const dx = mouse.current.x - cell.baseX;
         const dy = mouse.current.y - cell.baseY;
         const dist = Math.sqrt(dx*dx + dy*dy) || 1;
         
         // Proximity influence
         const influence = Math.max(0, 1 - dist / 500); 

         // Target skew & scale based on velocity + influence
         const targetSkewX = (mouse.current.vx * 0.005) * influence;
         const targetSkewY = (mouse.current.vy * 0.005) * influence;
         const targetScale = 1 + (vMag * 0.005) * influence;

         // Lerp to target for smooth animation (Spring/Lerp)
         cell.skewX += (targetSkewX - cell.skewX) * 0.1;
         cell.skewY += (targetSkewY - cell.skewY) * 0.1;
         cell.scale += (targetScale - cell.scale) * 0.1;

         // Variable weight approximation (draw thicker for high scale)
         const customFont = `${cell.scale > 1.2 ? "900" : "800"} ${fontSize}px sans-serif`;
         ctx.font = customFont;

         ctx.save();
         // Transform matrix: scaleX, skewY, skewX, scaleY, translateX, translateY
         ctx.translate(cell.baseX, cell.baseY);
         ctx.transform(cell.scale, cell.skewY, cell.skewX, cell.scale, 0, 0);

         if (isChromatic && influence > 0.1) {
            // Chromatic Aberration Layers
            const splitOffset = vMag * 0.1 * influence; // Distance of RGB split
            
            ctx.globalCompositeOperation = "screen";

            // Red
            ctx.fillStyle = "rgba(255, 0, 0, 0.8)";
            ctx.fillText(text, -splitOffset, -splitOffset);

            // Green
            ctx.fillStyle = "rgba(0, 255, 0, 0.8)";
            ctx.fillText(text, 0, 0);

            // Blue
            ctx.fillStyle = "rgba(0, 0, 255, 0.8)";
            ctx.fillText(text, splitOffset, splitOffset);
         } else {
            // Standard White
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + influence * 0.9})`;
            ctx.fillText(text, 0, 0);
         }

         ctx.restore();
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => { window.removeEventListener("resize", resize); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    mouse.current.vx = e.clientX - mouse.current.x;
    mouse.current.vy = e.clientY - mouse.current.y;
    mouse.current.x = e.clientX;
    mouse.current.y = e.clientY;
  };

  return (
    <div 
      className="relative w-full h-full cursor-crosshair overflow-hidden"
      onPointerMove={handlePointerMove}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <div className="absolute inset-x-0 bottom-16 text-center pointer-events-none">
        <span className="text-white text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-2 block">
          Kinetic Typography
        </span>
        <span className="text-white/40 text-[9px] uppercase tracking-[0.2em]">
          Move pointer rapidly to trigger velocity shear & chromatic aberration
        </span>
      </div>
    </div>
  );
}

function BalloonMetaballExhibit() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clickTimeRef = useRef(0.0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0.0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    // ----- Shader Sources ----- //
    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    // Raymarching Metaball Fragment Shader
    const fsSource = `
      precision highp float;
      
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_click_time;

      // Polynomial smooth min for metaball surface tension
      float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
      }

      float sdSphere(vec3 p, float s) {
        return length(p) - s;
      }

      // Hash for pseudo-random noise
      float hash(float n) {
        return fract(sin(n) * 43758.5453123);
      }

      // 3D Noise for organic movement
      float noise(vec3 x) {
        vec3 p = floor(x);
        vec3 f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        float n = p.x + p.y * 57.0 + 113.0 * p.z;
        return mix(mix(mix(hash(n + 0.0), hash(n + 1.0), f.x),
                       mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y),
                   mix(mix(hash(n + 113.0), hash(n + 114.0), f.x),
                       mix(hash(n + 170.0), hash(n + 171.0), f.x), f.y), f.z);
      }

      // SDF Map: Calculates the combined distance connecting the spheres
      vec2 map(vec3 p) {
        // Distances
        float d = 100.0;
        
        // Mouse coordinates mapping to 3D space
        vec2 m = (u_mouse * 2.0 - 1.0) * vec2(u_resolution.x/u_resolution.y, 1.0);
        vec3 mousePos = vec3(m.x * 3.0, -m.y * 3.0, 0.0);
        
        // Explosion offset factor
        float expT = max(0.0, 1.0 - (u_time - u_click_time)*1.5);

        // Core central sphere that chases mouse
        float core = sdSphere(p - mousePos, 0.6 + expT*0.5);
        d = core;

        // Density color tracker
        float heat = 0.0;

        // Generate multiple orbiting metaballs
        for(int i = 0; i < 7; i++) {
           float fi = float(i);
           
           // Organic floating offset
           float t = u_time * (0.5 + fi * 0.1);
           vec3 organicOffset = vec3(
             sin(t + fi*1.2) * 1.5,
             cos(t*1.1 + fi*2.3) * 1.5,
             sin(t*0.8 + fi*0.5) * 1.0
           );

           // Exploding scatter vector
           vec3 scatter = vec3(
              sin(fi*34.2)*4.0,
              cos(fi*12.1)*4.0,
              sin(fi*78.9)*4.0
           );

           vec3 pos = mix(organicOffset, scatter, expT);
           
           // Pull orbiter towards mouse slightly
           pos = mix(pos, mousePos, 0.2);
           
           float sphere = sdSphere(p - pos, 0.4 + sin(fi)*0.1);
           
           // Smoothly union the spheres
           float prevD = d;
           d = smin(d, sphere, 1.2);
           
           // Calculate 'heat' (density) for coloring based on how close spheres are merging
           heat += exp(-5.0 * distance(p, mix(pos, mousePos, 0.5)));
        }

        return vec2(d, heat);
      }

      // Normal calculation by sampling gradients
      vec3 calcNormal(vec3 p) {
        const float eps = 0.001;
        const vec2 h = vec2(eps, 0);
        return normalize(vec3(
          map(p + h.xyy).x - map(p - h.xyy).x,
          map(p + h.yxy).x - map(p - h.yxy).x,
          map(p + h.yyx).x - map(p - h.yyx).x
        ));
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 p = uv * 2.0 - 1.0;
        p.x *= u_resolution.x / u_resolution.y;

        // Ray setup
        vec3 ro = vec3(0.0, 0.0, 5.0); // camera origin
        vec3 rd = normalize(vec3(p, -2.0)); // ray direction

        // Raymarching loop
        float t = 0.0;
        float heat = 0.0;
        for(int i = 0; i < 64; i++) {
           vec3 pos = ro + rd * t;
           vec2 res = map(pos);
           if(res.x < 0.001 || t > 20.0) {
              heat = res.y;
              break;
           }
           t += res.x;
        }

        // Base color (Deep dark space)
        vec3 col = vec3(0.02, 0.02, 0.04);

        if(t < 20.0) {
           // Hit surface
           vec3 pos = ro + rd * t;
           vec3 nor = calcNormal(pos);
           
           // Lighting Setup
           vec3 lightDir = normalize(vec3(1.0, 1.0, 2.0));
           float dif = clamp(dot(nor, lightDir), 0.0, 1.0);
           
           // Fresnel / Rim Lighting (The glass/neon edge effect)
           float fre = pow(clamp(1.0 - dot(nor, -rd), 0.0, 1.0), 3.0);
           
           // Fake Refraction / Background sample (simplistic)
           vec3 ref = reflect(rd, nor);
           float fakeEnv = smoothstep(-0.2, 0.2, ref.y) * 0.5 + 0.5;
           
           // Base metaball color - reactive to fusion heat
           vec3 baseCol = mix(vec3(0.1, 0.3, 0.8), vec3(1.0, 0.1, 0.6), clamp(heat * 0.5, 0.0, 1.0));
           
           // Click flash
           float flash = max(0.0, 1.0 - (u_time - u_click_time)*3.0);
           baseCol = mix(baseCol, vec3(1.0), flash);

           // Combine lighting
           col = baseCol * (dif * 0.8 + 0.2); // Diffuse
           col += vec3(0.5, 0.8, 1.0) * fre * 2.0; // Glowing Rim
           col += vec3(1.0) * pow(clamp(dot(ref, lightDir), 0.0, 1.0), 32.0); // Specular Highlight
           col += fakeEnv * 0.2 * baseCol; // Environment Reflection
        } else {
           // Background Subtle Grid / Particles (Optics)
           float n = noise(vec3(p * 10.0, u_time * 0.5));
           col += vec3(n * 0.05);
        }

        // Vignette
        col *= 1.0 - 0.5 * length(uv - 0.5);
        
        // Tonemapping & Gamma
        col = col / (1.0 + col);
        col = pow(col, vec3(1.0/2.2));

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Shader Compilation Helper
    const loadShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if(!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader failed to compile: ", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = loadShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program failed to link: ", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Provide a full screen quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([-1.0,  1.0,  1.0,  1.0, -1.0, -1.0,  1.0, -1.0]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    
    const positionAttributeLocation = gl.getAttribLocation(program, "aVertexPosition");
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniforms setup
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");
    const clickTimeLocation = gl.getUniformLocation(program, "u_click_time");
    
    // Set u_click_time far in the past initially
    gl.uniform1f(clickTimeLocation, -999.0);

    const resize = () => {
      const displayWidth  = window.innerWidth;
      const displayHeight = window.innerHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width  = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      }
    };
    window.addEventListener("resize", resize); resize();

    // Render loop
    const render = (now: number) => {
      timeRef.current = now * 0.001; // seconds
      
      // Interpolate mouse smoothly in javascript before sending to shader
      gl.uniform2f(mouseLocation, mouseRef.current.x, mouseRef.current.y);
      gl.uniform1f(timeLocation, timeRef.current);
      
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
       window.removeEventListener("resize", resize);
       cancelAnimationFrame(rafRef.current);
       gl.deleteProgram(program);
    };
  }, []);

  const handlePointerMove = (e: React.PointerEvent) => {
    // Normalize coordinates 0.0 to 1.0 for the shader
    mouseRef.current.x = e.clientX / window.innerWidth;
    mouseRef.current.y = e.clientY / window.innerHeight;
  };

  const handlePointerDown = () => {
     const canvas = canvasRef.current;
     if(!canvas) return;
     const gl = canvas.getContext("webgl");
     if(!gl) return;
     // The entire program isn't tracked in state, so we just blindly grab the current bound program
     const program = gl.getParameter(gl.CURRENT_PROGRAM);
     if(program) {
       const uClickTime = gl.getUniformLocation(program, "u_click_time");
       gl.uniform1f(uClickTime, timeRef.current);
     }
  };

  return (
    <div 
      className="relative w-full h-full cursor-crosshair overflow-hidden"
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
    >
      <canvas ref={canvasRef} className="w-full h-full" />
      
      <div className="absolute inset-x-0 bottom-16 text-center pointer-events-none">
        <span className="text-white text-[10px] md:text-sm font-bold tracking-[0.4em] uppercase mb-2 block">
          Metaball Fusion
        </span>
        <span className="text-white/40 text-[9px] uppercase tracking-[0.2em] block">
          GLSL Raymarching • Smooth Min (smin) Surface Tension
        </span>
        <span className="text-white/20 text-[8px] uppercase tracking-[0.2em] mt-1 block">
          Move pointer to attract • Click to detonate
        </span>
      </div>
    </div>
  );
}

// --- Chronos-Sphere Components --- //

const CITIES = [
  { name: "Seoul", lat: 37.5665, lon: 126.9780, tz: 9 },
  { name: "New York", lat: 40.7128, lon: -74.0060, tz: -5 },
  { name: "London", lat: 51.5074, lon: -0.1278, tz: 0 },
  { name: "Tokyo", lat: 35.6762, lon: 139.6503, tz: 9 },
  { name: "Paris", lat: 48.8566, lon: 2.3522, tz: 1 },
  { name: "Sydney", lat: -33.8688, lon: 151.2093, tz: 11 },
  { name: "Dubai", lat: 25.2048, lon: 55.2708, tz: 4 },
  { name: "San Francisco", lat: 37.7749, lon: -122.4194, tz: -8 },
];

function ChronosGlobe({ timeOffset, viewMode }: { timeOffset: number, viewMode: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const shaderArgs = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uTimeOffset: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      void main() {
        vUv = uv;
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform float uTimeOffset;
      varying vec2 vUv;
      varying vec3 vNormal;

      void main() {
        // Simple day/night based on horizontal UV and time offset
        float dayNight = sin(vUv.x * 6.28318 + uTime * 0.1 + uTimeOffset * 0.05);
        vec3 dayColor = vec3(0.9, 0.7, 0.3);
        vec3 nightColor = vec3(0.1, 0.2, 0.5);
        
        vec3 color = mix(nightColor, dayColor, smoothstep(-0.2, 0.2, dayNight));
        
        // Add glassy feel with rim lighting
        float rim = 1.0 - max(dot(vNormal, vec3(0,0,1)), 0.0);
        color += pow(rim, 3.0) * 0.5;
        
        gl_FragColor = vec4(color, 0.6);
      }
    `,
    transparent: true,
  }), []);

  useFrame((state) => {
    if (meshRef.current) {
      const { uniforms } = meshRef.current.material as THREE.ShaderMaterial;
      uniforms.uTime.value = state.clock.getElapsedTime();
      uniforms.uTimeOffset.value = timeOffset;
      
      if (viewMode === 'GLOBE') {
        meshRef.current.rotation.y += 0.001;
      }
    }
  });

  useEffect(() => {
    if (!meshRef.current) return;
    if (viewMode === 'GLOBE') {
      gsap.to(meshRef.current.scale, { x: 1, y: 1, z: 1, duration: 1.5, ease: "expo.out" });
      gsap.to(meshRef.current.rotation, { x: 0, z: 0, duration: 1.5, ease: "expo.out" });
    } else {
      gsap.to(meshRef.current.scale, { x: 0, y: 0, z: 0, duration: 1, ease: "expo.in" });
    }
  }, [viewMode]);

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
}

function CityPillars({ timeOffset, viewMode }: { timeOffset: number, viewMode: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  const getPos = (lat: number, lon: number, mode: string) => {
    if (mode === 'GLOBE') {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return [
        2.1 * Math.sin(phi) * Math.cos(theta),
        2.1 * Math.cos(phi),
        2.1 * Math.sin(phi) * Math.sin(theta)
      ];
    } else if (mode === 'FLAT') {
      return [
        (lon / 180) * 5,
        (lat / 90) * 3,
        0
      ];
    } else { // CYLINDER
      const theta = (lon + 180) * (Math.PI / 180);
      return [
        3 * Math.cos(theta),
        (lat / 90) * 4,
        3 * Math.sin(theta)
      ];
    }
  };

  return (
    <group>
      {CITIES.map((city) => {
        const pos = getPos(city.lat, city.lon, viewMode);
        const cityTime = new Date();
        cityTime.setHours(cityTime.getHours() + city.tz + (timeOffset / 15));
        const seconds = cityTime.getSeconds();
        const height = 0.2 + (seconds / 60) * 1.5;

        return (
          <group key={city.name} position={pos as [number, number, number]}>
            <mesh 
              onPointerOver={() => setHovered(city.name)} 
              onPointerOut={() => setHovered(null)}
              position={[0, height / 2, 0]}
            >
              <cylinderGeometry args={[0.02, 0.02, height, 8]} />
              <meshStandardMaterial color="#00f2ff" emissive="#00f2ff" emissiveIntensity={2} transparent opacity={0.8} />
            </mesh>
            
            {hovered === city.name && (
              <Html distanceFactor={10}>
                <div className="bg-black/80 backdrop-blur-md border border-white/20 p-3 rounded-lg text-white whitespace-nowrap pointer-events-none">
                  <div className="text-[10px] uppercase tracking-widest opacity-50">{city.name}</div>
                  <div className="text-sm font-mono font-bold">
                    {cityTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              </Html>
            )}
            
            <Text
              position={[0, height + 0.1, 0]}
              fontSize={0.05}
              color="white"
              anchorX="center"
              anchorY="middle"
            >
              {city.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}

function ChronosSphereExhibit() {
  const [timeOffset, setTimeOffset] = useState(0);
  const [viewMode, setViewMode] = useState<'GLOBE' | 'FLAT' | 'CYLINDER'>('GLOBE');

  return (
    <div className="relative w-full h-full bg-[#050510] overflow-hidden">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <ChronosGlobe timeOffset={timeOffset} viewMode={viewMode} />
        <CityPillars timeOffset={timeOffset} viewMode={viewMode} />
        
        <OrbitControls enableDamping dampingFactor={0.05} rotateSpeed={0.5} minDistance={3} maxDistance={20} />
      </Canvas>

      {/* Mode Selector - Moved down to avoid nav overlap */}
      <div className="absolute top-32 right-8 z-50 flex flex-col gap-2">
        {['GLOBE', 'FLAT', 'CYLINDER'].map((mode) => (
          <button
            key={mode}
            onClick={() => setViewMode(mode as any)}
            className={`px-4 py-2 rounded-full border text-[10px] tracking-[0.2em] font-bold uppercase transition-all
              ${viewMode === mode 
                ? 'bg-white text-black border-white' 
                : 'bg-black/20 text-white/40 border-white/10 hover:border-white/40 hover:text-white'
              }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Time-Travel Slider */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl z-50">
        <div className="flex flex-col gap-4 bg-black/40 backdrop-blur-xl border border-white/10 p-6 rounded-3xl">
          <div className="flex justify-between items-center text-[10px] tracking-[0.3em] font-bold uppercase text-white/60">
            <span>Past</span>
            <span className="text-cyan-400">Chronos Chronology</span>
            <span>Future</span>
          </div>
          <input 
            type="range" 
            min="-1440" 
            max="1440" 
            value={timeOffset} 
            onChange={(e) => setTimeOffset(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="text-center text-[9px] text-white/20 uppercase tracking-widest">
            Drag to manipulate global timeline • {Math.floor(Math.abs(timeOffset)/60)}h {Math.abs(timeOffset)%60}m {timeOffset > 0 ? 'Ahead' : 'Behind'}
          </div>
        </div>
      </div>

      {/* HUD overlays */}
      <div className="absolute top-8 left-8 z-50 pointer-events-none">
        <div className="flex flex-col gap-1">
          <span className="text-white text-xl font-black tracking-tighter uppercase italic">Chronos-Sphere</span>
          <span className="text-cyan-400/60 text-[10px] font-mono tracking-widest">DEEP TIME DATA VISUALIZATION</span>
        </div>
      </div>
    </div>
  );
}

