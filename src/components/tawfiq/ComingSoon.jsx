import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ComingSoon({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Frosted Glass Backdrop */}
          <div
            className="absolute inset-0 bg-[#F7F5F1]/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-white border border-stone-200 rounded-[2.5rem] shadow-[0_20px_80px_rgba(198,162,107,0.15)] p-10 md:p-14 text-center overflow-hidden"
          >
            {/* Decorative Top Glow */}
            <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-[#C6A26B]/10 to-transparent pointer-events-none" />

            {/* Video / Play Icon */}
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15,
              }}
              className="mx-auto w-20 h-20 bg-[#FDFCFB] border border-stone-100 rounded-full flex items-center justify-center text-[#A66A2C] shadow-sm mb-8"
            >
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </motion.div>

            {/* Typography matches the Hero section */}
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-serif text-3xl md:text-4xl text-stone-900 tracking-tight mb-4"
            >
              Demo <span className="italic text-[#A66A2C]">Coming Soon</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-[15px] font-sans text-stone-500 leading-relaxed mb-10 max-w-sm mx-auto"
            >
              We are currently polishing the interactive demo of Tawfiq to give
              you the most beautiful experience. Please check back shortly.
            </motion.p>

            {/* Elegant Back Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              onClick={onClose}
              className="group inline-flex items-center gap-3 text-[14px] text-stone-900 transition-all duration-300"
            >
              <span className="w-6 h-[1px] bg-stone-300 transition-all duration-500 group-hover:bg-[#C6A26B] group-hover:w-8" />
              <span className="font-medium tracking-wide group-hover:text-[#A66A2C] transition-colors duration-300">
                Return to site
              </span>
              <span className="w-6 h-[1px] bg-stone-300 transition-all duration-500 group-hover:bg-[#C6A26B] group-hover:w-8" />
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
