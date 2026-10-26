"use client";

import { useEffect, useRef } from "react";

export default function HeroBackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startPlayback = () => {
      video.play().catch(() => undefined);
    };

    startPlayback();
    window.addEventListener("pageshow", startPlayback);
    document.addEventListener("visibilitychange", startPlayback);

    return () => {
      window.removeEventListener("pageshow", startPlayback);
      document.removeEventListener("visibilitychange", startPlayback);
    };
  }, []);

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-black bg-cover bg-center"
      style={{ backgroundImage: "url('/videos/home-hero-poster.jpg')" }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        poster="/videos/home-hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="h-full w-full scale-[1.04] object-cover object-center"
      >
        <source src="/videos/home-hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_24%,rgba(0,0,0,0.08)_58%,rgba(0,0,0,0.52)_100%)]" />
      <div className="absolute inset-x-0 -bottom-px h-[64%] bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.18)_30%,rgba(0,0,0,0.72)_66%,#000_90%,#000_100%)]" />
    </div>
  );
}
