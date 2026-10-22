"use client";

import { useEffect, useRef } from "react";

/** Direct DOM updates keep the pointer responsive without React re-renders. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let frame = 0;
    let x = -40;
    let y = -40;
    const render = () => {
      dot.style.transform = `translate3d(${x - 4}px, ${y - 4}px, 0)`;
      ring.style.transform = `translate3d(${x - 16}px, ${y - 16}px, 0)`;
      frame = 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const interactive = Boolean(target.closest("a, button, [data-hover]"));
      dot.style.opacity = interactive ? "0" : "1";
      ring.style.width = interactive ? "48px" : "32px";
      ring.style.height = interactive ? "48px" : "32px";
      ring.style.margin = interactive ? "-8px 0 0 -8px" : "0";
      ring.style.backgroundColor = interactive ? "rgba(209, 242, 121, 0.16)" : "transparent";
    };
    const onLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-[999] opacity-0 will-change-transform transition-opacity duration-100 max-[1024px]:hidden" />
      <div ref={ringRef} className="fixed top-0 left-0 w-8 h-8 border border-accent rounded-full pointer-events-none z-[999] opacity-0 will-change-transform transition-[width,height,margin,background-color,opacity] duration-100 max-[1024px]:hidden" />
    </>
  );
}
