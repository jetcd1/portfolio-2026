"use client";

import { motion } from "framer-motion";

const approaches = [
  {
    title: "Information hierarchy",
    description: "Designing layouts that allow operations teams to scan dense request data quickly and identify blockers at a glance."
  },
  {
    title: "Queue interaction model",
    description: "Developing interaction patterns that support continuous monitoring, prioritization, and resolution of maintenance tasks."
  },
  {
    title: "Design system integration",
    description: "Aligning with United Airlines' Orion Design System to ensure scalability and visual consistency across all internal tools."
  }
];

export default function DesignApproach() {
  return (
    <section className="w-full py-32 px-6 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-apple-blue mb-4 block">Philosophy</span>
          <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Design Approach</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-x-12 mt-4">
          {approaches.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-apple-blue mb-10" />
              <h3 className="text-xl md:text-2xl font-medium text-white mb-5 tracking-tight">
                {item.title}
              </h3>
              <p className="text-white/50 leading-relaxed font-light max-w-sm">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
