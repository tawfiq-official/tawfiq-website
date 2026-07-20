import React, { useState } from "react";
import { motion } from "framer-motion";
import ComingSoon from "./ComingSoon";

export default function Hero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false);

  return (
    <>
      <section className="relative min-h-[92svh] lg:min-h-screen bg-[#F7F5F1] overflow-hidden flex items-center">
        {/* Single source of natural light */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 15% 0%, rgba(253,247,237,1) 0%, rgba(247,245,241,0) 55%)",
          }}
        />

        {/* Hairline architectural lines */}
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

        <div
          className="
    relative
    max-w-[1400px]
    mx-auto
    w-full

    px-6
    sm:px-8
    lg:px-10

    pt-24
    pb-10

    sm:pt-28
    sm:pb-14

    lg:pt-24
    lg:pb-16
  "
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-9 lg:gap-5 items-center">
            {/* Left — Text Section */}
            <div className="lg:col-span-6 xl:col-span-5 order-1 lg:order-1 lg:pr-6 z-10">
              {/* Eyebrow text with the MOVING Tag */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.3 }}
                className="
flex
flex-wrap
items-center
gap-3
sm:gap-4
mb-6
"
              >
                <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase text-stone-400 mt-1">
                  Built for Muslims seeking consistency.
                </p>

                <div className="relative inline-flex overflow-hidden rounded-full p-[1px] border border-[#E7DDCF]">
                  {/* The continuously spinning gold light */}
                  <span className="absolute inset-[-1000%] animate-[spin_12s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,rgba(198,162,107,0.1)_0%,rgba(198,162,107,0.8)_50%,rgba(198,162,107,0.1)_100%)]" />

                  {/* The inner pill */}
                  <div className="relative inline-flex items-center gap-2 h-full w-full bg-[#FDFCFB] px-3 py-1.5 rounded-full">
                    {/* Tiny pulsing dot for extra aliveness */}
                    <span className="relative flex h-1.5 w-1.5 ml-0.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A26B] opacity-60"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#C6A26B]"></span>
                    </span>

                    <span className="text-[8px] sm:text-[9px] font-sans tracking-[0.15em] uppercase text-stone-500 font-medium mt-[1px] mr-1">
                      Currently Evolving
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1.2,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.15,
                }}
                className="font-serif text-[3.6rem]
sm:text-[4.5rem]
md:text-[5.5rem]
lg:text-[clamp(5rem,7vw,7.8rem)]leading-[0.92] tracking-[-0.03em] text-stone-900"
              >
                <span className="block">Become consistent.</span>
                <span className="block italic font-light text-stone-500">
                  Stay close
                </span>
                <span className="block italic font-light text-stone-500">
                  to Allah.
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                className="
mt-6
max-w-[34ch]
text-[15px]
sm:text-[16px]
lg:text-[17px]
font-sans
text-stone-500
leading-relaxed
"
              >
                Track every prayer, reduce your Qaza, read the Quran, learn
                Islam, and grow closer to Allah with one calm, beautiful
                companion.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, delay: 1 }}
                className=" flex flex-wrap items-center gap-8"
              >
                {/* Primary CTA */}
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
                    Start with Bismillah
                    <span className="absolute left-0 -bottom-1 h-[1.5px] w-0 bg-[#6B4F37] transition-all duration-500 group-hover:w-full" />
                  </span>
                  <span className="w-0 group-hover:w-5 h-px bg-stone-900 transition-all duration-500" />
                </a>

                {/* Watch Demo Button */}
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="group relative flex items-center h-12 pl-1 pr-6 rounded-full cursor-pointer transition-all duration-500 focus:outline-none"
                >
                  {/* Expanding Gold Background */}
                  <div className="absolute left-0 top-0 bottom-0 w-12 bg-[#C6A26B] rounded-full opacity-0 transition-all duration-500 ease-[0.22,1,0.36,1] group-hover:w-full group-hover:opacity-100" />

                  {/* Static Border */}
                  <div className="absolute left-1 top-1 w-10 h-10 border border-stone-300 rounded-full transition-all duration-500 group-hover:opacity-0 group-hover:scale-75" />

                  {/* Play Icon */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 text-stone-500 transition-colors duration-500 group-hover:text-[#FDFCFB]">
                    <svg
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="currentColor"
                      className="ml-0.5"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>

                  {/* Text */}
                  <span className="relative z-10 ml-2 font-sans text-[15px] tracking-wide text-stone-500 transition-colors duration-500 group-hover:text-[#FDFCFB]">
                    Watch Demo
                  </span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <ComingSoon isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  );
}
