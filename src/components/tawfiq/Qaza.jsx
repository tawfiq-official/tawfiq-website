import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

// Qaza — Centered, hopeful, alive: stats, journey to zero, and the interactive ledger.

const initialLedger = [
  // Slightly adjusted initial values so total is consistent with journey now point (132)
  { name: "Fajr", owed: 26, unit: "dawn" },
  { name: "Dhuhr", owed: 31, unit: "noon" },
  { name: "Asr", owed: 18, unit: "afternoon" },
  { name: "Maghrib", owed: 22, unit: "sunset" },
  { name: "Isha", owed: 35, unit: "night" },
];

const journey = [
  { value: 312, label: "Started" }, // Renamed from "Last year" for signature countdown story
  { value: 231, label: "6 months" },
  { value: 167, label: "3 months" },
  { value: 132, label: "Now", highlight: true },
];

const ACCENT = "#C6A26B"; // Restored original warm gold accent

export default function Qaza() {
  const [ledger, setLedger] = useState(initialLedger);

  const adjust = (index, delta) => {
    setLedger((prev) =>
      prev.map((p, i) =>
        i === index ? { ...p, owed: Math.max(0, p.owed + delta) } : p,
      ),
    );
  };

  const totalOwed = ledger.reduce((sum, p) => sum + p.owed, 0);

  // Calculated percentage based on full journey story
  const overallPercentage = Math.round(
    (1 - totalOwed / journey[0].value) * 100,
  );

  // Signature Interaction: Orchestrate countdown/gliding glide on view.
  const statsControls = useAnimation();
  const fillControls = useAnimation();
  const refStats = useRef(null);
  const isInViewStats = useInView(refStats, {
    once: true,
    margin: "-100px 0px",
  });

  const [displayValue, setDisplayValue] = useState(journey[0].value); // Start number: 312
  const [displayPercentage, setDisplayPercentage] = useState(0);

  useEffect(() => {
    if (isInViewStats) {
      const sequence = async () => {
        // Step 1: Percentage counts 0->58% over 3s
        // (Managed with interval for integer counting in text)
        let intervalPercentage;
        setTimeout(() => {
          let count = 0;
          const target = overallPercentage;
          const stepTime = 3000 / target;
          intervalPercentage = setInterval(() => {
            if (count < target) {
              count++;
              setDisplayPercentage(count);
            } else {
              clearInterval(intervalPercentage);
            }
          }, stepTime);
        }, 0);

        // Step 2: Main value steps 312 -> 231 -> 167 -> 132 over 3s
        journey.forEach((point, i) => {
          if (i === 0) return; // already starting value
          setTimeout(() => {
            setDisplayValue(point.value);
          }, i * 1000); // 1s per step
        });

        // Step 3: Fill glides forward to target percentage width over 3s
        fillControls.start({
          width: `${overallPercentage}%`,
          transition: { duration: 3, ease: [0.22, 1, 0.36, 1] },
        });

        // Step 4: Final update for data integrity (after animations)
        setTimeout(() => {
          clearInterval(intervalPercentage);
          setDisplayValue(totalOwed);
          setDisplayPercentage(overallPercentage);
        }, 3200);
      };
      sequence();
    }
  }, [
    isInViewStats,
    overallPercentage,
    totalOwed,
    fillControls,
    statsControls,
  ]);

  return (
    <section
      id="qaza"
      className="relative bg-[#f9f7f2] py-32 md:py-44 overflow-hidden"
    >
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#9d9d9d] mb-10"
        >
          02 — Qaza
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.01em] text-[#1a1a1a]"
        >
          Missed prayers,
          <br />
          <span className="italic font-light text-[#8a8a8a]">
            made up one at a time.
          </span>
        </motion.h2>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif text-[15px] md:text-base text-[#666666] leading-[1.9] max-w-xl mx-auto mt-10"
        >
          Missed prayers accumulate — over months, years, a lifetime. Tawfiq
          counts them, tracks every repayment, and shows you the path to zero.
          Not as a deadline. As a homecoming.
        </motion.p>

        {/* Refactored Stats block to feature signature interaction */}
        <div ref={refStats}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInViewStats ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-12 md:gap-20 mt-16"
          >
            <div>
              <p className="font-serif text-5xl md:text-6xl text-[#1a1917] leading-none tabular-nums">
                {displayPercentage}%
              </p>
              <p className="text-[11px] font-sans tracking-[0.1em] text-[#8f8b85] mt-3 uppercase">
                Recovered
              </p>
            </div>
            <div className="w-px h-16 bg-[#e0e0e0]" />
            <div>
              <p className="font-serif text-5xl md:text-6xl text-[#1a1917] leading-none tabular-nums">
                {displayValue}
              </p>
              <p className="text-[11px] font-sans tracking-[0.1em] text-[#8f8b85] mt-3 uppercase">
                Prayers owed
              </p>
            </div>
            <div className="w-px h-16 bg-[#e0e0e0]" />
            <div>
              <p className="font-serif text-4xl md:text-5xl text-[#bfbab3] leading-none tabular-nums">
                1,847
              </p>
              <p className="text-[11px] font-sans tracking-[0.1em] text-[#8f8b85] mt-3 uppercase">
                Total completed
              </p>
            </div>
          </motion.div>

          {/* Progress bar controlled by glide logic */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInViewStats ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.1 }}
            className="mt-14"
          >
            <div className="flex items-center justify-between text-[11px] font-sans text-[#8a8a8a] mb-3">
              <span>Progress toward zero</span>
              <span>{totalOwed} remaining</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-[#e0e0e0] overflow-hidden">
              <motion.div
                animate={fillControls}
                initial={{ width: 0 }}
                className="h-full rounded-full"
                style={{ backgroundColor: ACCENT }}
              />
            </div>
          </motion.div>
        </div>

        {/* Your Journey points visualization remain the same (gliding logic happens in focal stats now) */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mt-20"
        >
          <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#9d9d9d] mb-10">
            Journey Record
          </p>
          <div className="flex items-end justify-between max-w-lg mx-auto relative px-6">
            {/* The progress track bar visualization from hero orb */}
            <div className="absolute top-[31px] left-9 right-9 h-[1px] bg-[#e0e0e0] z-0" />

            {journey.map((j, i) => (
              <motion.div
                key={j.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative z-10 flex flex-col items-center flex-1"
              >
                {/* Node orb/mark controlled with gliding logic previously; static now with emphasis */}
                <div
                  className={`w-3 h-3 rounded-full border-[1.5px] border-[#bfbab3] mb-4 transition-all duration-700 ${
                    j.highlight
                      ? "bg-[#1a1917] border-[#1a1917] scale-110"
                      : "bg-[#f9f7f2]"
                  }`}
                />
                <p
                  className={`font-serif text-2xl tabular-nums leading-none ${
                    j.highlight ? "text-[#1a1917]" : "text-[#bfbab3]"
                  }`}
                >
                  {j.value}
                </p>
                <p
                  className={`text-[10px] font-sans tracking-[0.1em] mt-2.5 transition-colors duration-500 ${
                    j.highlight ? "text-[#1a1917]" : "text-[#bfbab3]"
                  }`}
                >
                  {j.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Renamed section header to 'YOUR JOURNEY' */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mt-20 text-left LedgerContainer"
        >
          <div className="flex items-end justify-between pb-4 border-b border-[#e0e0e0]">
            <p className="text-[11px] font-sans tracking-[0.25em] uppercase text-[#9d9d9d]">
              YOUR JOURNEY
            </p>
            <p className="text-[12px] font-sans" style={{ color: ACCENT }}>
              Total owed {totalOwed}
            </p>
          </div>

          <div className="divide-y divide-[#e0e0e0]">
            {ledger.map((entry, i) => (
              <motion.div
                key={entry.name}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex items-center justify-between py-5"
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[10px] font-sans text-[#bfbab3] w-5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <p className="font-serif text-lg text-[#1a1917]">
                      {entry.name}
                    </p>
                    <p className="text-[10px] font-sans italic text-[#8f8b85] mt-0.5">
                      prayers of {entry.unit}
                    </p>
                  </div>
                </div>
                {/* Updated Controls: ○ controls with gold hover fill */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => adjust(i, -1)}
                    className="w-9 h-9 rounded-full bg-[#e8e4db]/40 backdrop-blur-sm border border-[#bfbab3]/40 text-[#bfbab3] hover:bg-[#d98e4a] hover:text-white transition-all duration-300 flex items-center justify-center"
                    aria-label={`Decrease ${entry.name}`}
                  >
                    ○
                  </button>
                  <span className="font-serif text-xl text-[#1a1917] w-10 text-center tabular-nums">
                    {entry.owed}
                  </span>
                  <button
                    onClick={() => adjust(i, 1)}
                    className="w-9 h-9 rounded-full bg-[#e8e4db]/40 backdrop-blur-sm border border-[#bfbab3]/40 text-[#bfbab3] hover:bg-[#d98e4a] hover:text-white transition-all duration-300 flex items-center justify-center"
                    aria-label={`Increase ${entry.name}`}
                  >
                    ○
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-[11px] font-sans text-[#8f8b85] mt-8 leading-relaxed LedgerLegend">
            Adjust freely. Your journey remembers. Each repayment brings you
            closer to zero — not as a deadline, but as a homecoming.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
