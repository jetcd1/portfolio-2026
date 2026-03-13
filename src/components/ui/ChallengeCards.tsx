"use client";

import { motion } from "framer-motion";

const challenges = [
  {
    number: "01",
    title: "High-volume operational data",
    description: "Designing for density while maintaining legibility for airport teams managing hundreds of daily requests."
  },
  {
    number: "02",
    title: "Real-time task prioritization",
    description: "Creating visual systems that immediately signal urgency and status changes across the global equipment queue."
  },
  {
    number: "03",
    title: "Cross-team coordination",
    description: "Standardizing workflows between fragmented Airport Ops and GSE maintenance shops into a unified interactive platform."
  }
];

export default function ChallengeCards() {
  return (
    <section className="w-full py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-apple-blue mb-4 block">Problem Space</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Key Challenges</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {challenges.map((challenge, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="relative group p-10 rounded-[2rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.05] transition-colors duration-500 overflow-hidden"
            >
              <span className="text-4xl font-display font-medium text-white/10 mb-8 block transition-colors group-hover:text-apple-blue/20">
                {challenge.number}
              </span>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-4 tracking-tight leading-snug">
                {challenge.title}
              </h3>
              <p className="text-white/40 leading-relaxed font-light">
                {challenge.description}
              </p>
              
              {/* Subtle glass effect highlight */}
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
