"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import Link from "next/link";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline" | "link";
  onClick?: () => void;
  className?: string;
  href?: string;
}

export default function Button({ children, variant = "primary", onClick, className = "", href }: ButtonProps) {
  const baseClasses = "relative inline-flex items-center justify-center font-medium overflow-hidden rounded-full transition-colors duration-300";
  
  const variants = {
    primary: "bg-foreground text-background hover:bg-accent px-6 py-3",
    secondary: "bg-white/10 text-foreground hover:bg-white/20 backdrop-blur-md px-6 py-3",
    outline: "border border-border text-foreground hover:border-accent hover:text-accent px-6 py-3",
    link: "text-foreground hover:text-accent px-0 py-0"
  };

  const Content = (
    <motion.span
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileTap={{ scale: variant !== "link" ? 0.95 : 1 }}
      data-hover="true"
      onClick={onClick}
    >
      {children}
    </motion.span>
  );

  if (href) {
    return <Link href={href}>{Content}</Link>;
  }

  return <button>{Content}</button>;
}
