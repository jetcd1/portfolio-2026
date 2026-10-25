"use client";

import { useEffect, useRef } from "react";

export default function OpticalCursorField() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const field = fieldRef.current;
    const light = lightRef.current;
    if (!field || !light) return;

    const finePointer = window.matchMedia("(pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    let targetX = field.clientWidth * 0.62;
    let targetY = field.clientHeight * 0.46;
    let currentX = targetX;
    let currentY = targetY;
    let frame = 0;

    const render = () => {
      currentX += (targetX - currentX) * 0.11;
      currentY += (targetY - currentY) * 0.11;
      light.style.transform = `translate3d(${currentX - 320}px, ${currentY - 220}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      const rect = field.getBoundingClientRect();
      targetX = event.clientX - rect.left;
      targetY = event.clientY - rect.top;
      field.dataset.active = "true";
    };

    const leave = () => {
      field.dataset.active = "false";
    };

    field.addEventListener("pointermove", move, { passive: true });
    field.addEventListener("pointerleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      field.removeEventListener("pointermove", move);
      field.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={fieldRef}
      aria-hidden="true"
      data-active="false"
      className="optical-cursor-field absolute inset-0 overflow-hidden"
    >
      <div ref={lightRef} className="optical-cursor-light" />
    </div>
  );
}
