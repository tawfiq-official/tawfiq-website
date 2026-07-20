import React, { useState, useRef, useEffect } from "react";
import {
  motion,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";

const topics = [
  {
    title: "Salah",
    arabic: "الصلاة",
    sentence: "The five moments that shape a day into a life of remembrance.",
  },
  {
    title: "Wudu",
    arabic: "الوضوء",
    sentence: "Purification of the body, a quiet preparation of the heart.",
  },
  {
    title: "Adhan",
    arabic: "الأذان",
    sentence:
      "The call that has gathered hearts to prayer for fourteen centuries.",
  },
  {
    title: "Hadith",
    arabic: "الحديث",
    sentence:
      "The preserved words of the Prophet ﷺ, a living guide after the Book.",
  },
  {
    title: "Ramadan",
    arabic: "رمضان",
    sentence: "The month of restraint, revelation, and return.",
  },
  {
    title: "Zakat",
    arabic: "الزكاة",
    sentence: "A portion given, a wealth purified, a community held.",
  },
  {
    title: "Zakat Calculator",
    arabic: "حاسبة الزكاة",
    sentence: "Know what is due, with clarity and ease.",
  },
  {
    title: "Names of Allah",
    arabic: "أسماء الله الحسنى",
    sentence: "Ninety-nine doors of knowing the One who knows you.",
  },
  {
    title: "Islamic History",
    arabic: "التاريخ الإسلامي",
    sentence: "The story of a faith that shaped civilizations.",
  },
  {
    title: "Learn Arabic",
    arabic: "تعلم العربية",
    sentence: "The language of revelation, learned one word at a time.",
  },
];

// Individual Node on the Wheel
function WheelNode({
  topic,
  index,
  angle,
  wheelRotation,
  isActive,
  onMouseEnter,
  onMouseLeave,
  onClick,
}) {
  // Counter-rotate the text so it always remains perfectly upright
  const counterRotation = useTransform(wheelRotation, (r) => -(r + angle));

  return (
    <div
      className="absolute inset-0 pointer-events-none flex justify-center"
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {/* Positioned exactly on the circumference line */}
      <div className="absolute top-0 -translate-y-1/2 pointer-events-auto origin-center">
        <motion.button
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          style={{ rotate: counterRotation }}
          // Added touch-manipulation to prevent mobile double-tap zoom issues
          className="group relative flex flex-col items-center justify-center p-2 sm:p-4 cursor-pointer focus:outline-none touch-manipulation"
        >
          {/* Node Dot */}
          <div
            className={`w-1.5 h-1.5 sm:w-2.5 sm:h-2.5 rounded-full mb-2 sm:mb-3 transition-all duration-700 ${
              isActive
                ? "bg-[#C6A26B] scale-125 shadow-[0_0_12px_rgba(198,162,107,0.6)]"
                : "bg-stone-300 group-hover:bg-stone-400 group-hover:scale-110"
            }`}
          />
          {/* Node Title */}
          <span
            className={`font-serif tracking-wide transition-all duration-700 whitespace-nowrap ${
              isActive
                ? "text-base sm:text-xl text-[#C6A26B] font-medium"
                : "text-[11px] sm:text-base text-stone-400 group-hover:text-stone-700"
            }`}
          >
            {topic.title}
          </span>
        </motion.button>
      </div>
    </div>
  );
}

export default function Academy() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs to manage deliberate hovering and prevent chaotic spin loops
  const hoverTimer = useRef(null);
  const isSpinning = useRef(false);

  const N = topics.length;
  const anglePerItem = 360 / N;

  // Spring physics for the wheel's rotation (slightly tuned for responsive feeling)
  const wheelRotation = useSpring(0, { stiffness: 45, damping: 15, mass: 1.1 });

  useEffect(() => {
    // Negative direction so the active item moves to 0deg (Zenith)
    wheelRotation.set(-activeIndex * anglePerItem);
  }, [activeIndex, anglePerItem, wheelRotation]);

  const handleHoverEnter = (index) => {
    // Ignore hover if spinning, already active, or on a touch device (where hover acts weirdly)
    if (
      isSpinning.current ||
      index === activeIndex ||
      window.matchMedia("(hover: none)").matches
    )
      return;

    hoverTimer.current = setTimeout(() => {
      setActiveIndex(index);
      isSpinning.current = true;

      setTimeout(() => {
        isSpinning.current = false;
      }, 800);
    }, 120);
  };

  const handleHoverLeave = () => {
    clearTimeout(hoverTimer.current);
  };

  // Smart Click Handler: Solves mobile tap issues
  const handleNodeClick = (index) => {
    if (index === activeIndex) {
      // If already active, treat as a confirmation click (Open Module)
      alert(`Opening module: ${topics[index].title}`);
    } else {
      // If inactive, rotate the wheel to this item
      setActiveIndex(index);
      isSpinning.current = true;
      setTimeout(() => {
        isSpinning.current = false;
      }, 800);
    }
  };

  return (
    <section
      id="academy"
      className="relative min-h-[90vh] bg-[#F7F5F1] overflow-hidden flex flex-col items-center justify-center font-sans py-20 sm:py-24"
    >
      {/* Section Header */}
      <div className="absolute top-10 sm:top-16 text-center z-20">
        <p className="text-[10px] sm:text-[11px] font-sans tracking-[0.25em] uppercase text-stone-400 mb-4">
          03 — The Academy
        </p>
      </div>

      {/* Center Content Display */}
      {/* Reduced max-width on mobile to avoid overlapping the inner edge of the wheel */}
      <div className="absolute z-10 flex flex-col items-center justify-center w-full max-w-[240px] sm:max-w-md text-center pointer-events-none mt-8 sm:mt-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex flex-col items-center pointer-events-auto"
          >
            <span
              className="font-arabic text-4xl sm:text-6xl lg:text-7xl text-stone-300/80 mb-3 sm:mb-6 leading-none"
              dir="rtl"
            >
              {topics[activeIndex].arabic}
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl text-stone-900 tracking-tight leading-none mb-3 sm:mb-6">
              {topics[activeIndex].title}
            </h2>
            <p className="font-serif text-sm sm:text-lg italic font-light text-stone-600 leading-relaxed">
              {topics[activeIndex].sentence}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* 
        The Giant Rotating Wheel 
        Uses responsive viewport width (vw) on small screens to ensure it always fits perfectly.
      */}
      <motion.div
        className="relative flex items-center justify-center w-[90vw] h-[90vw] max-w-[360px] max-h-[360px] sm:max-w-none sm:max-h-none sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] rounded-full border border-stone-200/70 mt-12 sm:mt-24"
        style={{ rotate: wheelRotation }}
      >
        {/* Inner Astrolabe/Instrument Rings */}
        <div className="absolute inset-6 sm:inset-12 rounded-full border-[0.5px] border-stone-200/50" />
        <div className="absolute inset-12 sm:inset-24 rounded-full border border-stone-200/40 border-dashed" />

        {/* Populate the Nodes on the circumference */}
        {topics.map((topic, i) => (
          <WheelNode
            key={topic.title}
            topic={topic}
            index={i}
            angle={i * anglePerItem}
            wheelRotation={wheelRotation}
            isActive={i === activeIndex}
            onMouseEnter={() => handleHoverEnter(i)}
            onMouseLeave={handleHoverLeave}
            onClick={() => handleNodeClick(i)}
          />
        ))}
      </motion.div>

      {/* Bottom Contextual Hint */}
      <div className="absolute bottom-6 sm:bottom-12 text-center z-20">
        <p className="hidden sm:block text-[10px] sm:text-[11px] font-sans tracking-widest text-stone-400 uppercase">
          Hover to explore · Click to open
        </p>
        <p className="block sm:hidden text-[9px] font-sans tracking-widest text-stone-400 uppercase">
          Tap a topic to explore
        </p>
      </div>
    </section>
  );
}
