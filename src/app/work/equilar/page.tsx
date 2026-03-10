"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function EquilarCaseStudy() {
  return (
    <main className="min-h-screen pt-32 pb-24">
      <section className="px-4 md:px-8 max-w-5xl mx-auto mb-20 md:mb-32">
        <Link href="/work" className="inline-flex items-center gap-2 text-muted hover:text-accent transition-colors mb-12">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Work</span>
        </Link>
        
        <motion.div
           initial={{ opacity: 0, y: 40 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <div className="flex flex-wrap gap-2 mb-6">
            <Badge>Data Visualization</Badge>
            <Badge>B2B SaaS</Badge>
            <Badge>Dashboards</Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-medium tracking-tight mb-8">
            Equilar Dashboards
          </h1>
          
          <p className="text-2xl text-muted max-w-3xl leading-relaxed">
            Executive benchmarking tools and data-heavy business dashboards for complex B2B needs.
          </p>
        </motion.div>
      </section>

      <motion.section 
        className="w-full h-[60vh] md:h-[80vh] bg-white/5 border-y border-white/10 mb-20 md:mb-32 relative overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="absolute inset-0 flex items-center justify-center text-muted font-display tracking-widest uppercase">
          [Hero Image / Video Placeholder]
        </div>
      </motion.section>

      <section className="px-4 md:px-8 max-w-3xl mx-auto space-y-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-display font-medium mb-6">Data translates to Action</h2>
          <p className="text-lg text-muted leading-relaxed">
            Equilar is a B2B platform dealing with massive amounts of executive compensation and corporate governance data. My role focused on distilling dense spreadsheets into highly visual, scannable, and actionable dashboard interfaces for executives.
          </p>
        </motion.div>
      </section>
      
      <section className="px-4 md:px-8 max-w-5xl mx-auto mt-32 text-center">
        <p className="text-muted mb-6 uppercase tracking-widest text-sm font-bold">Next Project</p>
        <h2 className="text-5xl md:text-7xl font-display font-medium hover:text-accent transition-colors mb-12">
          <Link href="/work/united-airlines">United Airlines</Link>
        </h2>
        <Button href="/work" variant="outline">View All Work</Button>
      </section>
    </main>
  );
}
