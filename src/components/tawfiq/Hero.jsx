import React from "react";
import { motion } from "framer-motion";
import GlassOrb from "./GlassOrb";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-[#F7F5F1] overflow-hidden flex items-center">
      {/* Single source of natural light — top left, like morning sun through a window */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(253,247,237,1) 0%, rgba(247,245,241,0) 55%)",
        }}
      />
      {/* Hairline architectural lines — only vertical, very faint */}
      <div className="absolute inset-0 flex justify-center pointer-events-none opacity-[0.035]">
        <div className="w-full max-w-[1400px] grid grid-cols-6 h-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="border-r border-stone-900 h-full last:border-r-0"
            />
          ))}
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-2 items-center">
          {/* Left — Text Section (order-1 on both mobile and desktop) */}
          <div className="lg:col-span-7 order-1 lg:order-1 lg:pr-6">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.3 }}
              className="text-[11px] font-sans tracking-[0.25em] uppercase text-stone-400 mb-8"
            >
              بِسْمِ اللَّهِ — Built for consistency
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.15,
              }}
              className="font-serif text-[clamp(3.2rem,8.5vw,7.8rem)] leading-[0.95] tracking-[-0.03em] text-stone-900"
            >
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
                className="font-serif text-[clamp(3.2rem,8.5vw,7.8rem)] leading-[0.92] tracking-[-0.03em] text-stone-900"
              >
                Become
                <br />
                consistent.
                <br />
                <span className="block mt-5 text-stone-500 font-light">
                  Stay close
                </span>
                <span className="italic font-light text-stone-500">
                  to Allah.
                </span>
              </motion.h1>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 0.7 }}
              className="mt-8 max-w-lg text-[16px] md:text-[17px] font-sans text-stone-500 leading-relaxed"
            >
              Track Qaza, strengthen your Salah, read the Quran, and return to
              Allah through calm, intentional daily worship.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, delay: 1 }}
              className="mt-14 flex items-center"
            >
              <a
                href="https://tawfiq-official.github.io/Tawfiq/"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 py-2 transition-all duration-500"
              >
                <span className="w-0 group-hover:w-5 h-px bg-stone-900 transition-all duration-500" />

                <svg
                  viewBox="0 0 24 24"
                  width="17"
                  height="17"
                  fill="none"
                  className="text-stone-900 transition-all duration-500 group-hover:translate-x-1 group-hover:text-[#6B4F37]"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9.5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M12 5 L14.5 12 L12 14.5 L9.5 12 Z"
                    fill="currentColor"
                  />
                  <path
                    d="M12 19 L14.5 12 L12 14.5 L9.5 12 Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="0.7" fill="currentColor" />
                </svg>

                <span className="relative font-serif text-[20px] md:text-[22px] font-medium tracking-tight text-stone-900 transition-colors duration-500 group-hover:text-[#6B4F37]">
                  Begin with Bismillah
                  <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-[#6B4F37] transition-all duration-500 group-hover:w-full" />
                </span>

                <span className="w-0 group-hover:w-5 h-px bg-stone-900 transition-all duration-500" />
              </a>
            </motion.div>
          </div>

          {/* Right — Glass Orb Section (order-2 on both mobile and desktop) */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{
              opacity: 1,
              y: [0, -6, 0],
              rotate: [-0.6, 0.6, -0.6],
            }}
            transition={{
              opacity: {
                duration: 1.4,
                delay: 0.4,
              },
              y: {
                delay: 1.8,
                duration: 6,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
            className="lg:col-span-5 order-2 lg:order-2 flex justify-center lg:-ml-8"
          >
            {/* 
              Responsive Wrapper for the Orb 
              Since GlassOrb is fixed at 520px, we scale it down on mobile/tablet 
              to fit perfectly without horizontal scrolling.
            */}
            <div className="flex justify-center items-center w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] lg:w-[520px] lg:h-[520px] scale-[0.65] sm:scale-75 lg:scale-100 origin-center">
              <GlassOrb />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue (Currently commented out in your design) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      ></motion.div>
    </section>
  );
}
