import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Privacy() {
  return (
    <motion.div
      initial={{ x: "100%", boxShadow: "-30px 0 50px rgba(28, 25, 23, 0.15)" }}
      animate={{ x: 0, boxShadow: "0px 0 0px rgba(28, 25, 23, 0)" }}
      exit={{ x: "-30%", opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      // THE FIX: Changed to a fixed overlay (fixed top-0 left-0 w-full h-[100dvh]).
      // This forces the component to be exactly the size of the screen and scroll internally.
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
          Privacy Policy
        </h1>

        <div className="space-y-5 md:space-y-6 font-sans text-stone-600 leading-relaxed text-[15px] md:text-base">
          <p>
            Tawfiq is designed with your spiritual privacy at its core. We
            collect only what is necessary to provide you with a meaningful
            worship tracking experience.
          </p>
          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Data We Store
          </h2>
          <p>
            Your prayer records, Qaza counts, Quran reading progress, and dhikr
            counts are stored securely and are only accessible to you. We do not
            share your spiritual data with third parties.
          </p>
          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            AI Companion
          </h2>
          <p>
            Questions you ask the AI Companion are processed to provide
            responses grounded in established Islamic scholarship. Conversations
            are not used to train external models.
          </p>
          <h2 className="font-serif text-xl md:text-2xl text-stone-800 pt-3 md:pt-4">
            Your Control
          </h2>
          <p>
            You can export or delete your data at any time. Your spiritual
            journey is yours alone, and we respect your right to manage it.
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
