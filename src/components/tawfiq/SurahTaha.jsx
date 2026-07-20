import React from "react";
import { motion } from "framer-motion";

// A pause — not a feature section.
// Surah Ash-Sharh 94:5–6. Generous whitespace, no cards, no buttons. Simple fade animations.

export default function SurahAshSharh() {
  return (
    <section className="relative bg-[#F7F5F1] py-40 md:py-56 overflow-hidden">
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Eyebrow Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#A6A6A6] mb-16 md:mb-20"
        >
          Surah Ash-Sharh · 94:5–6
        </motion.p>

        {/* Arabic Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
          className="font-arabic text-[clamp(2rem,6vw,4.25rem)] leading-[1.9] text-[#1a1a1a]"
          dir="rtl"
        >
          فَإِنَّ مَعَ الْعُسْرِ يُسْرًا . إِنَّ مَعَ الْعُسْرِ يُسْرًا
        </motion.p>

        {/* English Translation */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-xl md:text-2xl italic font-light text-[#8C8C8C] leading-relaxed mt-16 md:mt-20"
        >
          “Indeed, with hardship comes ease.”
        </motion.p>
      </div>
    </section>
  );
}
