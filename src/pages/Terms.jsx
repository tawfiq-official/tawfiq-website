import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Terms() {
  return (
    <motion.div
      initial={{ x: "100%", boxShadow: "-30px 0 50px rgba(28, 25, 23, 0.15)" }}
      animate={{ x: 0, boxShadow: "0px 0 0px rgba(28, 25, 23, 0)" }}
      exit={{ x: "-30%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // Fixed overlay exactly like the Privacy page to prevent mobile scrolling bugs
      className="fixed top-0 left-0 w-full h-[100dvh] overflow-y-auto bg-[#F9F8F6] z-[100]"
    >
      <div className="max-w-2xl mx-auto px-6 pt-12 pb-24 md:py-24 lg:px-12 min-h-full">
        <Link
          to="/"
          className="font-serif text-xl text-stone-900 tracking-tight mb-8 md:mb-12 inline-block transition-opacity hover:opacity-70"
        >
          Tawfiq
        </Link>

        <h1 className="font-serif text-3xl md:text-4xl text-stone-900 mb-6 md:mb-8">
          Terms of Service
        </h1>

        <div className="space-y-5 md:space-y-6 font-sans text-stone-600 leading-relaxed text-[15px] md:text-base">
          <p>
            Tawfiq is a spiritual companion application designed to support
            Muslims in maintaining prayer consistency and spiritual growth. By
            using Tawfiq, you agree to the following terms.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Spiritual Guidance
          </h2>
          <p>
            The AI Companion provides responses grounded in established Islamic
            scholarship, but it is not a substitute for qualified religious
            scholars. For definitive rulings on matters of fiqh, please consult
            your local imam or a trusted scholar.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Acceptable Use
          </h2>
          <p>
            Tawfiq is a space for worship, reflection, and growth. Users are
            expected to engage with the platform and its AI Companion with
            respect and sincerity.
          </p>

          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Service Availability
          </h2>
          <p>
            We strive to maintain a reliable service but do not guarantee
            uninterrupted access. Feature availability may evolve as we continue
            to improve the Tawfiq experience.
          </p>
        </div>

        <Link
          to="/"
          className="inline-flex mt-12 md:mt-16 text-[13px] md:text-sm font-sans tracking-wide text-stone-500 hover:text-stone-900 transition-colors"
        >
          &larr; Return to Tawfiq
        </Link>
      </div>
    </motion.div>
  );
}
