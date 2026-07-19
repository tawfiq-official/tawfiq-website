import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DESIGN_W = 520;
const DESIGN_H = 700;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.6 },
});

const popIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { delay, duration: 0.6 },
});

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function StatCard({ label, value, buttonLabel }) {
  return (
    <motion.div
      {...popIn(1.5)}
      className="w-full bg-white border border-stone-100 p-6 rounded-3xl shadow-sm text-center"
    >
      <div className="text-[11px] uppercase tracking-widest font-bold text-stone-400 mb-3">
        {label}
      </div>
      <div className="text-[52px] leading-none font-serif text-stone-900 mb-6">
        {value}
      </div>
      <button className="w-full bg-[#22C55E]/15 hover:bg-[#22C55E]/25 transition-colors text-[#166534] text-[14px] font-bold py-3.5 rounded-xl flex justify-center items-center gap-2">
        <PlusIcon />
        {buttonLabel}
      </button>
    </motion.div>
  );
}

const FEATURES = [
  {
    title: "Salah Tracking",
    desc: "Log daily prayers to build consistency.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    ui: (
      <div className="w-full flex flex-col gap-2.5">
        {[
          { name: "Fajr", status: "Missed", missed: true },
          { name: "Dhuhr", status: "On Time", missed: false },
          { name: "Asr", status: "On Time", missed: false },
        ].map((row, i) => (
          <motion.div
            key={row.name}
            {...fadeUp(1.5 + i * 0.3)}
            className="flex justify-between items-center bg-white border border-stone-100 p-3.5 rounded-2xl shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-2.5 h-2.5 rounded-full ${row.missed ? "bg-red-400" : "bg-stone-300"}`}
              />
              <span className="font-medium text-[15px] text-stone-900">
                {row.name}
              </span>
            </div>
            <span
              className={`text-[11px] font-bold px-2.5 py-1 rounded-md border ${
                row.missed
                  ? "text-red-600 bg-red-50 border-red-100/50"
                  : "text-green-600 bg-green-50 border-green-100/50"
              }`}
            >
              {row.status}
            </span>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    title: "Qaza Prayers",
    desc: "Calculate and easily make up missed prayers.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    ui: <StatCard label="Total Owed" value={5000} buttonLabel="Full Day (5)" />,
  },
  {
    title: "Quran Reader",
    desc: "Read & listen with accurate translations.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    ui: (
      <motion.div
        {...popIn(1.5)}
        className="w-full bg-white border border-stone-100 p-5 rounded-3xl shadow-sm"
      >
        <div className="flex items-center justify-between mb-5">
          <div className="text-[17px] font-serif font-medium text-stone-900">
            Al-Fatihah
          </div>
          <div className="w-6 h-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
        <div className="w-full text-right mb-1">
          <div
            className="text-2xl font-serif text-stone-800 leading-relaxed mb-2"
            dir="rtl"
          >
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>
          <div className="text-[13px] text-stone-500 text-left leading-relaxed">
            In the name of Allah, the Entirely Merciful, the Especially
            Merciful.
          </div>
        </div>
      </motion.div>
    ),
  },
  {
    title: "Islamic Academy",
    desc: "Structured courses on Purity, Salah, Tajweed, and Etiquette.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
    ui: (
      <div className="w-full grid grid-cols-2 gap-3 px-1">
        {[
          { label: "Tajweed\nAcademy", bg: "#FAF5FF", fg: "#A855F7" },
          { label: "Mosque\nEtiquette", bg: "#ECFDF5", fg: "#10B981" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 + i * 0.2, type: "spring", damping: 15 }}
            className="flex flex-col items-center justify-center p-5 rounded-2xl border border-stone-100 bg-white shadow-sm aspect-square"
          >
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
              style={{ background: card.bg, color: card.fg }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="text-[11px] font-medium text-stone-600 text-center leading-tight whitespace-pre-line">
              {card.label}
            </div>
          </motion.div>
        ))}
      </div>
    ),
  },
  {
    title: "Sawm Tracker",
    desc: "Track missed Ramadan fasts and Sunnah fasting.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="26"
        height="26"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    ui: (
      <StatCard label="Missed Fasts" value={180} buttonLabel="Make Up (Qaza)" />
    ),
  },
];

export default function GlassOrb() {
  const [index, setIndex] = useState(0); // 0 = intro, 1..FEATURES.length = features
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  // The mobile fix: shrink the fixed 520x700 design to fit whatever width its
  // container actually has. Desktop is untouched — scale caps at 1.
  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(Math.min(1, entry.contentRect.width / DESIGN_W));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Cycle: intro (4s) -> each feature (9s) -> back to intro
  useEffect(() => {
    const duration = index === 0 ? 4000 : 9000;
    const t = setTimeout(
      () => setIndex((i) => (i + 1) % (FEATURES.length + 1)),
      duration,
    );
    return () => clearTimeout(t);
  }, [index]);

  const feature = index > 0 ? FEATURES[index - 1] : null;

  return (
    <div
      ref={wrapRef}
      className="relative w-full max-w-[520px] mx-auto"
      style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
    >
      <div
        className="absolute top-0 left-0 flex items-center justify-center"
        style={{
          width: DESIGN_W,
          height: DESIGN_H,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {/* Background Glow */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[450px] h-[450px] rounded-full blur-[120px]"
          style={{
            background:
              "radial-gradient(circle, rgba(198,162,107,.45) 0%, rgba(255,255,255,0) 70%)",
          }}
        />

        {/* SVG Background Rings */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 520 700"
        >
          <motion.circle
            cx="260"
            cy="350"
            r="200"
            fill="none"
            stroke="rgba(198,162,107,.18)"
            strokeWidth="1.4"
            strokeDasharray="10 8"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "260px 350px" }}
          />
          <circle
            cx="260"
            cy="350"
            r="230"
            fill="none"
            stroke="rgba(198,162,107,.10)"
            strokeWidth="1"
            strokeDasharray="3 8"
            strokeLinecap="round"
          />
          <circle
            cx="260"
            cy="350"
            r="160"
            fill="none"
            stroke="rgba(255,255,255,.12)"
            strokeWidth="1"
          />
          {[0, 72, 144, 216, 288].map((angle) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <circle
                key={angle}
                cx={260 + Math.cos(rad) * 200}
                cy={350 + Math.sin(rad) * 200}
                r="3"
                fill="#C6A26B"
                opacity=".75"
              />
            );
          })}
        </svg>

        {/* Center Phone Mockup */}
        <div className="relative z-20 flex items-center justify-center w-[320px] h-[660px] -translate-y-8">
          <div className="absolute -left-[5px] top-36 w-[5px] h-14 bg-[#CAA066] rounded-l-md shadow-inner" />
          <div className="absolute -left-[5px] top-56 w-[5px] h-14 bg-[#CAA066] rounded-l-md shadow-inner" />
          <div className="absolute -right-[5px] top-44 w-[5px] h-16 bg-[#CAA066] rounded-r-md shadow-inner" />

          <div className="absolute inset-0 rounded-[3.2rem] border-[8px] border-[#C49A5C] bg-stone-50 shadow-[0_50px_100px_rgba(198,162,107,0.35),0_0_0_1px_rgba(196,154,92,0.5)] ring-2 ring-inset ring-white/60" />

          <div className="absolute inset-[8px] rounded-[2.7rem] bg-[#FDFCFB] overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,.04)]">
            <div className="absolute top-0 inset-x-0 h-48 bg-gradient-to-b from-white/80 to-transparent pointer-events-none z-50" />

            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                {index === 0 ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-6"
                  >
                    <motion.div
                      {...fadeUp(0.3)}
                      className="mb-8 flex justify-center"
                    >
                      <svg
                        width="72"
                        height="72"
                        viewBox="0 0 22 22"
                        fill="none"
                        className="text-[#A66A2C]"
                      >
                        <path
                          d="M11 2C11 2 5 6 5 12C5 16 8 19 11 19C14 19 17 16 17 12C17 6 11 2 11 2Z"
                          stroke="currentColor"
                          strokeWidth="1.2"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M11 5V19M8 11L11 8L14 11"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.div>
                    <motion.h2
                      {...fadeUp(0.5)}
                      className="text-[34px] font-serif text-stone-900 tracking-tight leading-tight"
                    >
                      What is
                      <br />
                      <span className="italic text-[#A66A2C]">Tawfiq?</span>
                    </motion.h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full flex flex-col items-center pt-24 px-6 text-center bg-[#FDFCFB]"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
                      className="w-20 h-20 bg-[#F6F4EF] rounded-full flex items-center justify-center text-[#8C6D46] mb-6 shadow-sm"
                    >
                      {feature.icon}
                    </motion.div>

                    <motion.h3
                      {...fadeUp(0.7)}
                      className="text-[28px] font-serif text-stone-900 font-medium tracking-tight mb-4"
                    >
                      {feature.title}
                    </motion.h3>

                    <motion.p
                      {...fadeUp(1.0)}
                      className="text-[15px] text-stone-500 leading-relaxed max-w-[240px] mx-auto mb-10"
                    >
                      {feature.desc}
                    </motion.p>

                    <motion.div
                      {...fadeUp(1.3)}
                      className="w-full flex-1 flex items-start"
                    >
                      {feature.ui}
                    </motion.div>

                    <div className="absolute bottom-8 flex gap-2.5">
                      {FEATURES.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${idx === index - 1 ? "bg-[#C49A5C]" : "bg-stone-200"}`}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
