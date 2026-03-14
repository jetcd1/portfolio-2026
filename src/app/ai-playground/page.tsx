"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Globe, Cpu, Radio, Sparkles, Wind, Layers, ArrowRight, Activity, Command, Boxes, Share2, Compass, PenTool, Repeat } from "lucide-react";

// --- Types --- //
type ExhibitId = 
  | "cosmic" | "kinetic" | "physics" | "particles" | "vortex" 
  | "attraction" | "neural" | "optical" | "symmetry" | "quantum"
  | "glitch" | "waves" | "fluid" | "fractal";

const exhibits = [
  { id: "vortex", name: "Neon Vortex", icon: Repeat, color: "#ec4899" },
  { id: "cosmic", name: "Cosmic Hyperspace", icon: Sparkles, color: "#9333ea" },
  { id: "attraction", name: "Attraction Grid", icon: Boxes, color: "#06b6d4" },
  { id: "neural", name: "Neural Drift", icon: Share2, color: "#10b981" },
  { id: "optical", name: "Optical Flow", icon: PenTool, color: "#f59e0b" },
  { id: "symmetry", name: "Symmetry Lab", icon: Compass, color: "#3b82f6" },
  { id: "quantum", name: "Quantum Field", icon: Activity, color: "#8b5cf6" },
  { id: "kinetic", name: "Kinetic Chronograph", icon: Activity, color: "#3b82f6" },
  { id: "physics", name: "Falling Physics", icon: Layers, color: "#f59e0b" },
  { id: "particles", name: "Neon Particle Flow", icon: Zap, color: "#10b981" },
  { id: "fluid", name: "Bio-Organic Fluid", icon: Globe, color: "#06b6d4" },
  { id: "glitch", name: "Digital Disruption", icon: Cpu, color: "#ef4444" },
  { id: "waves", name: "Generative Sine", icon: Radio, color: "#ec4899" },
  { id: "fractal", name: "Recursive Growth", icon: Command, color: "#8b5cf6" },
];

export default function AIPlayground() {
  const [activeId, setActiveId] = useState<ExhibitId>("vortex");
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
             {activeId === "vortex" && <VortexExhibit />}
             {activeId === "attraction" && <AttractionGridExhibit />}
             {activeId === "neural" && <NeuralDriftExhibit />}
             {activeId === "optical" && <OpticalFlowExhibit />}
             {activeId === "symmetry" && <SymmetryExhibit />}
             {activeId === "quantum" && <QuantumFieldExhibit />}
             {activeId === "kinetic" && <KineticExhibit />}
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
        <div className="flex flex-col gap-1 md:gap-2 pointer-events-auto max-h-[85vh] overflow-y-auto no-scrollbar py-20 pr-4" ref={scrollRef}>
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
                className="group relative flex items-center gap-4 py-2 transition-all duration-700 text-left"
              >
                <div 
                  className={`w-[4px] h-4 md:h-8 transition-all duration-1000 rounded-full ${
                    isActive 
                      ? "bg-white opacity-100 shadow-[0_0_25px_white]" 
                      : "bg-white/5 group-hover:bg-white/30 opacity-0 group-hover:opacity-100"
                  }`} 
                />
                <div className="flex flex-col">
                  <span 
                    className={`text-[2.2vh] md:text-[2.8vh] lg:text-[3.8vh] font-bold tracking-tighter leading-none transition-all duration-700 flex flex-wrap ${
                      isActive 
                        ? "text-white translate-x-3 italic" 
                        : "text-white/10 group-hover:text-white/40 hover:translate-x-1"
                    }`}
                  >
                    {isActive ? (
                      ex.name.split("").map((char, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.03 }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </motion.span>
                      ))
                    ) : (
                      ex.name
                    )}
                  </span>
                  {isActive && (
                     <motion.div 
                       initial={{ width: 0, opacity: 0 }}
                       animate={{ width: "100%", opacity: 1 }}
                       className="h-[2px] bg-gradient-to-r from-white/60 to-transparent mt-1 ml-3"
                     />
                  )}
                </div>
                
                {/* Ultra-Premium Indicator */}
                {isActive && (
                  <motion.div 
                    layoutId="menu-blob"
                    className="absolute -inset-x-8 -inset-y-2 bg-white/[0.03] backdrop-blur-md rounded-2xl -z-10 border-l border-white/20"
                    transition={{ type: "spring", bounce: 0.1, duration: 1 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* HUD Info */}
      <div className="fixed bottom-12 right-12 z-50 text-right pointer-events-none hidden md:block">
        <div className="flex flex-col gap-1">
          <span className="text-white/20 text-[9px] uppercase tracking-[0.5em] font-bold">System Status</span>
          <span className="text-white/60 text-[11px] font-mono flex items-center justify-end gap-3 uppercase tracking-widest">
            {isTransitioning ? "Engaging Hyperspace" : "Orbital Observation" }
            <span className={`w-1.5 h-1.5 rounded-full ${isTransitioning ? "bg-red-500 animate-ping" : "bg-cyan-500/50 shadow-[0_0_10px_#06b6d4]"}`} />
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Background Engine ────────────────────────────────────────────── //

function CosmicEngine({ isWarping, activeExhibit }: { isWarping: boolean; activeExhibit: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number | null>(null);
  const stars = useMemo(() => Array.from({ length: 300 }, () => ({
    x: Math.random() * 2000 - 1000,
    y: Math.random() * 2000 - 1000,
    z: Math.random() * 2000,
    px: 0, py: 0,
    color: `hsla(${Math.random() * 360}, 70%, 80%, ${Math.random() * 0.5 + 0.3})`
  })), []);
  const speed = useRef(0.3);
  const targetSpeed = isWarping ? 60 : 0.3;

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
      speed.current += (targetSpeed - speed.current) * 0.04;
      ctx.fillStyle = `rgba(0, 0, 0, ${isWarping ? 0.3 : 0.15})`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2; const cy = canvas.height / 2;
      stars.forEach(s => {
        s.z -= speed.current;
        if (s.z <= 0) { s.z = 2000; s.x = Math.random() * 2000 - 1000; s.y = Math.random() * 2000 - 1000; s.px = 0; s.py = 0; }
        const x = (s.x / s.z) * cx + cx; const y = (s.y / s.z) * cy + cy;
        if (s.px !== 0) {
          ctx.beginPath(); ctx.strokeStyle = isWarping ? s.color : "rgba(255,255,255,0.2)";
          ctx.lineWidth = (1 - s.z / 2000) * (isWarping ? 4 : 1.5);
          ctx.lineCap = "round"; ctx.moveTo(s.px, s.py); ctx.lineTo(x, y); ctx.stroke();
        }
        s.px = x; s.py = y;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("resize", resize); if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isWarping, stars, targetSpeed]);
  return <canvas ref={canvasRef} className="w-full h-full" />;
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

function KineticExhibit() {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 10); return () => clearInterval(timer); }, []);
  const f = (n: number) => n.toString().padStart(2, "0");
  return (
    <div className="flex flex-col items-center">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-[10vw] font-black tracking-tighter flex items-center leading-none text-white mix-blend-difference">
        <div className="flex flex-col items-center"><span>{f(time.getHours())}</span><span className="text-[8px] uppercase tracking-[1em] opacity-30 mt-2">Hours</span></div>
        <span className="mx-2 opacity-20 animate-pulse">:</span>
        <div className="flex flex-col items-center"><span>{f(time.getMinutes())}</span><span className="text-[8px] uppercase tracking-[1em] opacity-30 mt-2">Min</span></div>
        <span className="mx-2 opacity-20">:</span>
        <div className="flex flex-col items-center text-cyan-500"><span>{f(time.getSeconds())}</span><span className="text-[8px] uppercase tracking-[1em] opacity-30 mt-2">Sec</span></div>
      </motion.div>
    </div>
  );
}

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
