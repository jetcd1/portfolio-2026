"use client";

import { useIntro } from "@/components/providers/IntroProvider";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();
  const { isIntroDone } = useIntro();

  if (!isIntroDone) return null;

  return (
    <motion.footer 
      className="w-full py-8 mt-8 border-t border-white/5 flex flex-col items-center justify-center text-muted"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <p className="text-sm font-medium tracking-wide text-muted/80">Copyright © {year} CHAN JEON. All rights reserved.</p>
    </motion.footer>
  );
}
