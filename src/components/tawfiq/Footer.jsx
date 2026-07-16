import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const BismillahButton = ({
  className = "",
  iconSize = 18,
  textSize = "text-xl md:text-2xl",
}) => (
  <a
    href="https://tawfiq-official.github.io/Tawfiq/"
    target="_blank"
    rel="noopener noreferrer"
    className={`group inline-flex items-center gap-3 ${className}`}
  >
    <span className="w-0 group-hover:w-6 h-px bg-[#1B140F] transition-all duration-500" />

    <svg
      viewBox="0 0 24 24"
      width={iconSize}
      height={iconSize}
      fill="none"
      className="text-[#1B140F] transition-transform duration-500 group-hover:rotate-12"
    >
      <circle cx="12" cy="12" r="9.5" stroke="currentColor" strokeWidth="1.2" />

      <path d="M12 5 L14.5 12 L12 14.5 L9.5 12 Z" fill="currentColor" />

      <path
        d="M12 19 L14.5 12 L12 14.5 L9.5 12 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />

      <circle cx="12" cy="12" r="0.7" fill="currentColor" />
    </svg>

    <span className={`font-serif ${textSize} text-[#1B140F] tracking-tight`}>
      Begin with Bismillah
    </span>

    <span className="w-0 group-hover:w-6 h-px bg-[#1B140F] transition-all duration-500" />
  </a>
);

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#F5F2EF] pt-36 pb-16">
      <div className="absolute inset-0 pointer-events-none opacity-[0.025] bg-[radial-gradient(circle_at_center,#000_1px,transparent_1px)] bg-[length:24px_24px]" />

      <div className="relative max-w-7xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-serif italic font-light text-xl md:text-3xl text-[#786B63]"
        >
          Every prayer is a step home.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mt-16"
        >
          <p
            className="
    font-arabic
    text-[#64584F]
    text-4xl
    md:text-5xl
    mb-2
    tracking-wide
    translate-x-[2px]
  "
          >
            تَوْفِيق
          </p>

          <h2
            className="
            font-serif
            uppercase
            font-normal
            leading-[0.88]
            tracking-[-0.04em]
            text-[#1B140F]
            text-[clamp(6rem,18vw,12rem)]
            select-none
          "
          >
            TAWFIQ
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            delay: 0.15,
          }}
          className="mt-16"
        >
          <BismillahButton />
        </motion.div>

        <div className="mt-28 border-t border-stone-300/50 pt-8 flex flex-wrap justify-center gap-10 text-[11px] tracking-[0.18em] uppercase text-[#6E635B]">
          <Link
            to="/privacy"
            className="transition-all duration-300 hover:text-[#1B140F]"
          >
            Privacy
          </Link>

          <Link
            to="/terms"
            className="transition-all duration-300 hover:text-[#1B140F]"
          >
            Terms
          </Link>

          <a
            href="mailto:hello@tawfiq.app"
            className="transition-all duration-300 hover:text-[#1B140F]"
          >
            Support
          </a>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.22em] text-[#A79B92]">
          تَوْفِيق · Made with intention
        </p>
      </div>
    </footer>
  );
}
