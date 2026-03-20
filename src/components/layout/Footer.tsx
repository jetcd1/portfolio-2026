"use client";

import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full py-12 border-t border-white/5 flex flex-col items-center justify-center">
      <p className="text-sm font-medium tracking-wide text-[#86868b]">
        Copyright © {year} CHAN JEON. All rights reserved.
      </p>
    </footer>
  );
}
