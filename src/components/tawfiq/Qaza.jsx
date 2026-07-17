import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  animate,
  useAnimation,
} from "framer-motion";

// --- Minimalist SVG Icons for Prayer Times ---
const FajrIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v6M8 4l2 2M16 4l-2 2M4 22h16M2 18h20M12 10a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4z" />
  </svg>
);
const DhuhrIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const AsrIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2v2M4.93 4.93l1.41 1.41M20 12h2M19.07 4.93l-1.41 1.41M15.9 14A4.5 4.5 0 0 0 7 15.3A4 4 0 0 0 7 23h9a5 5 0 0 0 5-5 4.5 4.5 0 0 0-5.1-4z" />
  </svg>
);
const MaghribIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 10a4 4 0 0 0-4 4h8a4 4 0 0 0-4-4zM2 18h20M4 22h16M12 2L12 8M17 4L15 6M7 4L9 6" />
  </svg>
);
const IshaIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const initialLedger = [
  {
    name: "Fajr",
    owed: 26,
    recovered_count: 32,
    last: "Yesterday",
    icon: <FajrIcon />,
  },
  {
    name: "Dhuhr",
    owed: 31,
    recovered_count: 29,
    last: "2 days ago",
    icon: <DhuhrIcon />,
  },
  {
    name: "Asr",
    owed: 18,
    recovered_count: 27,
    last: "6 hrs ago",
    icon: <AsrIcon />,
  },
  {
    name: "Maghrib",
    owed: 22,
    recovered_count: 28,
    last: "Today",
    icon: <MaghribIcon />,
  },
  {
    name: "Isha",
    owed: 35,
    recovered_count: 64,
    last: "Last night",
    icon: <IshaIcon />,
  },
];

const StartedValue = 312;
const ACCENT = "#C89A52"; // High contrast completed gold
const MUTED = "#DDD9D2"; // High contrast remaining grey

// Premium Number Animation Hook
function AnimatedNumber({ value }) {
  const nodeRef = useRef(null);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const currentVal = parseInt(node.textContent.replace(/,/g, "")) || 0;

    const controls = animate(currentVal, value, {
      duration: 0.6,
      ease: "easeOut",
      onUpdate(val) {
        node.textContent = Math.round(val).toLocaleString();
      },
    });

    return () => controls.stop();
  }, [value]);

  return <span ref={nodeRef}>{value.toLocaleString()}</span>;
}

export default function Qaza() {
  const [ledger, setLedger] = useState(initialLedger);
  const [hoveredRow, setHoveredRow] = useState(null);

  // Instantly updates specific prayer count AND global stats
  const adjust = (index, delta) => {
    setLedger((prev) =>
      prev.map((p, i) => {
        if (i === index) {
          const newOwed = Math.max(0, p.owed + delta);
          const diff = p.owed - newOwed; // Tracks true change to update recovery count
          return {
            ...p,
            owed: newOwed,
            recovered_count: p.recovered_count + diff,
            last: diff > 0 ? "Just now" : p.last,
          };
        }
        return p;
      }),
    );
  };

  const totalOwed = ledger.reduce((sum, p) => sum + p.owed, 0);
  const totalRecovered = StartedValue - totalOwed;
  const journeyPercentage = Math.round((1 - totalOwed / StartedValue) * 100);

  // Animation Controls
  const fillControls = useAnimation();
  const markerControls = useAnimation();
  const refCenterpiece = useRef(null);
  const isInViewCenter = useInView(refCenterpiece, {
    once: true,
    margin: "-100px 0px",
  });
  const [displayRecovered, setDisplayRecovered] = useState(0);

  useEffect(() => {
    if (isInViewCenter) {
      animate(0, totalRecovered, {
        duration: 1.0,
        ease: "easeOut",
        onUpdate: (latest) => setDisplayRecovered(Math.round(latest)),
      });

      fillControls.start({
        width: `${journeyPercentage}%`,
        transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
      });

      markerControls.start({
        left: `${journeyPercentage}%`,
        transition: { duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
      });
    }
  }, [
    isInViewCenter,
    totalRecovered,
    journeyPercentage,
    fillControls,
    markerControls,
  ]);

  return (
    <section
      id="qaza"
      className="relative bg-[#f9f7f2] py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-10">
        {/* Section Headline */}
        <div className="mb-24 md:pl-20 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.01em] text-[#1a1a1a]"
          >
            Every missed prayer.
            <br />
            <span className="italic font-light text-[#8a8a8a]">
              Always remembered.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-serif text-[15px] md:text-base text-[#666666] leading-[1.9] max-w-xl mt-10"
          >
            Every prayer is tracked individually, so you always know exactly
            what remains. No notebooks. No spreadsheets.
          </motion.p>
        </div>

        {/* The Journey Narrative Container */}
        <div className="flex">
          {/* Left Column: The Golden Thread */}
          <div className="relative w-12 md:w-20 flex-shrink-0">
            {/* Background Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1.5px] bg-[#e0e0e0] -translate-x-1/2" />

            {/* Animated Golden Thread */}
            <motion.div
              className="absolute left-1/2 top-0 w-[1.5px] -translate-x-1/2 origin-top"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              style={{ backgroundColor: ACCENT }}
            />
          </div>

          {/* Right Column: The Story */}
          <div className="flex-1 pb-20">
            {/* 1. Started Node */}
            <div className="relative mb-20 pt-2">
              <div
                className="absolute -left-6 md:-left-10 top-[14px] w-2 h-2 rounded-full -translate-x-1/2"
                style={{ backgroundColor: ACCENT }}
              />
              <p className="text-[10px] font-sans uppercase text-[#9d9d9d] tracking-widest">
                Started Journey
              </p>
              <p className="font-serif text-2xl text-[#8a8a8a]">
                {StartedValue}
              </p>
            </div>

            {/* 2. Hero Milestone (Dynamic) */}
            <div ref={refCenterpiece} className="relative mb-32">
              <div
                className="absolute -left-6 md:-left-10 top-[40px] w-4 h-4 bg-[#f9f7f2] border-[1.5px] rounded-full flex items-center justify-center -translate-x-1/2 z-10"
                style={{ borderColor: ACCENT }}
              >
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: ACCENT }}
                />
              </div>
              <div className="font-serif text-[6rem] md:text-[8rem] leading-none text-[#1a1a1a] tracking-tight">
                <AnimatedNumber value={totalRecovered} />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl text-[#1a1a1a] mt-2">
                Prayers
                <br />
                Returned to your ledger.
              </h3>
            </div>

            {/* 3. Road to Zero (Dynamic Progress) */}
            <div className="relative mb-32 pr-4 md:pr-10">
              <div
                className="absolute -left-6 md:-left-10 top-[4px] w-2 h-2 rounded-full -translate-x-1/2 z-10"
                style={{ backgroundColor: ACCENT }}
              />

              <div className="flex items-center justify-between text-[10px] font-sans tracking-[0.2em] uppercase text-[#9d9d9d] mb-4 px-[40px]">
                <span>Started</span>
                <span>Goal</span>
              </div>

              <div className="flex items-center gap-5">
                <span className="font-serif text-2xl text-[#bfbab3] tabular-nums">
                  {StartedValue}
                </span>

                <div
                  className="relative flex-1 h-[2px] rounded-full"
                  style={{ backgroundColor: MUTED }}
                >
                  {/* Fill Track */}
                  <motion.div
                    className="absolute left-0 top-0 h-full rounded-full origin-left"
                    animate={fillControls}
                    initial={{ width: 0 }}
                    style={{ backgroundColor: ACCENT }}
                  />

                  {/* Subdued Milestones (50, 100, etc.) */}
                  {[50, 100, 150, 200, 250, 300].map((m) => {
                    if (m >= StartedValue) return null;
                    const isPassed = totalRecovered >= m;
                    return (
                      <div
                        key={m}
                        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                        style={{ left: `${(m / StartedValue) * 100}%` }}
                      >
                        <div
                          className={`w-1 h-1 rounded-full transition-colors duration-500 ${isPassed ? "bg-[#C89A52]" : "bg-[#DDD9D2]"}`}
                        />
                      </div>
                    );
                  })}

                  {/* The "Today" Marker */}
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center z-10"
                    animate={markerControls}
                    initial={{ left: "0%" }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded-full ring-4 ring-[#f9f7f2] shadow-sm"
                      style={{ backgroundColor: ACCENT }}
                    />
                    <div
                      className="w-[1.5px] h-8 mt-1"
                      style={{ backgroundColor: ACCENT, opacity: 0.5 }}
                    />
                    <div className="mt-2 text-center whitespace-nowrap">
                      <span className="font-serif text-3xl text-[#1a1917] tabular-nums tracking-tight">
                        <AnimatedNumber value={totalOwed} />
                      </span>
                      <span
                        className="text-[11px] font-sans uppercase tracking-[0.15em] ml-2"
                        style={{ color: ACCENT }}
                      >
                        Remaining
                      </span>
                    </div>
                  </motion.div>
                </div>

                <span className="font-serif text-2xl text-[#bfbab3] tabular-nums">
                  0
                </span>
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="font-serif text-xl md:text-2xl italic text-[#8a8a8a] mt-24 text-center"
              >
                Recovered {totalRecovered} prayers since your journey began.
              </motion.p>
            </div>

            {/* 4. Narrative Connection */}
            <div className="relative mb-20">
              <p className="font-serif text-xl md:text-2xl italic text-[#666666] border-l-2 border-[#e0e0e0] pl-6 py-2 max-w-md">
                Every completed Qaza prayer moves your ledger closer to zero.
              </p>
            </div>

            {/* 5. The Ledger Rows */}
            <div className="relative">
              <div className="flex items-end justify-between pb-6 border-b border-[#e0e0e0]">
                <p className="text-[10px] uppercase font-sans tracking-widest text-[#9d9d9d]">
                  Qaza Ledger
                </p>
                <p className="text-[10px] uppercase font-sans tracking-widest text-[#9d9d9d] text-right">
                  Adjust count
                  <br />
                  <span className="text-[8px] opacity-70">Tap − to record</span>
                </p>
              </div>

              {ledger.map((entry, i) => (
                <div
                  key={entry.name}
                  onMouseEnter={() => setHoveredRow(i)}
                  onMouseLeave={() => setHoveredRow(null)}
                  className="group relative border-b border-[#e0e0e0]/60 py-6 transition-colors hover:bg-white/40"
                >
                  {/* Golden node linking row to thread on hover */}
                  <div
                    className="absolute -left-6 md:-left-10 top-[34px] w-2 h-2 transition-colors duration-300 rounded-full -translate-x-1/2 z-10"
                    style={{
                      backgroundColor: hoveredRow === i ? ACCENT : "#e0e0e0",
                    }}
                  />

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    {/* Visual Identity & Title */}
                    <div className="flex items-start gap-6">
                      <span className="text-[10px] text-[#bfbab3] mt-1.5 font-sans">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-[#bfbab3]">{entry.icon}</span>
                          <span className="font-serif text-2xl text-[#1a1917]">
                            {entry.name}
                          </span>
                        </div>
                        {/* Interactive Data Reveal */}
                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-300">
                          <div className="overflow-hidden">
                            <p className="text-[10px] font-sans uppercase tracking-widest text-[#8f8b85] mt-2 flex items-center gap-2">
                              <span>
                                Recovered:{" "}
                                <strong className="text-[#1a1917]">
                                  <AnimatedNumber
                                    value={entry.recovered_count}
                                  />
                                </strong>
                              </span>
                              <span className="w-1 h-1 bg-[#bfbab3] rounded-full" />
                              <span>
                                Last:{" "}
                                <strong className="text-[#1a1917]">
                                  {entry.last}
                                </strong>
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Highly Obvious UX Controls */}
                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pl-16 sm:pl-0">
                      <div className="flex flex-col items-start sm:items-end">
                        <span className="font-serif text-2xl text-[#1a1917] tabular-nums">
                          <AnimatedNumber value={entry.owed} />
                        </span>
                        <span
                          className="text-[10px] font-sans uppercase tracking-widest"
                          style={{ color: ACCENT }}
                        >
                          Remaining
                        </span>
                      </div>

                      <div className="flex items-center bg-white border border-[#e0e0e0] rounded-full shadow-sm p-1">
                        <button
                          onClick={() => adjust(i, -1)}
                          className="w-10 h-10 flex items-center justify-center text-[#8f8b85] hover:text-[#1a1917] hover:bg-stone-50 rounded-full transition-colors active:scale-95 text-xl font-light"
                          aria-label={`Record one ${entry.name}`}
                        >
                          −
                        </button>
                        <div className="w-px h-6 bg-[#e0e0e0] mx-1" />
                        <button
                          onClick={() => adjust(i, 1)}
                          className="w-10 h-10 flex items-center justify-center text-[#8f8b85] hover:text-[#1a1917] hover:bg-stone-50 rounded-full transition-colors active:scale-95 text-xl font-light"
                          aria-label={`Add one ${entry.name}`}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
