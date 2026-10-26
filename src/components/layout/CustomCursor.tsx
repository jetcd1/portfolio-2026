"use client";

import { useEffect, useRef } from "react";

/** Direct DOM updates keep the pointer responsive without React re-renders. */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none), (pointer: coarse)").matches) return;
    const dot = dotRef.current;
    const reticle = reticleRef.current;
    if (!dot || !reticle) return;

    let frame = 0;
    let targetX = -40;
    let targetY = -40;
    let reticleX = -40;
    let reticleY = -40;
    let angle = 0;
    let interactive = false;
    let pressed = false;
    const render = () => {
      reticleX += (targetX - reticleX) * 0.24;
      reticleY += (targetY - reticleY) * 0.24;
      angle += (((targetX - reticleX) * 0.35) - angle) * 0.12;
      const scale = pressed ? 0.78 : interactive ? 1.34 : 1;
      reticle.style.transform = `translate3d(${reticleX - 18}px, ${reticleY - 18}px, 0) rotate(${Math.max(-9, Math.min(9, angle))}deg) scale(${scale})`;
      frame = requestAnimationFrame(render);
    };
    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0) rotate(45deg)`;
      dot.style.opacity = "1";
      reticle.style.opacity = "1";
    };
    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      interactive = Boolean(target.closest("a, button, input, textarea, select, [data-hover]"));
      reticle.dataset.interactive = interactive ? "true" : "false";
    };
    const onPointerDown = () => { pressed = true; };
    const onPointerUp = () => { pressed = false; };
    const onLeave = () => {
      dot.style.opacity = "0";
      reticle.style.opacity = "0";
    };

    frame = requestAnimationFrame(render);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerover", onPointerOver, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      <div ref={reticleRef} className="designer-cursor-reticle" />
      <div ref={dotRef} className="designer-cursor-core" />
    </>
  );
}
