import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Check } from "lucide-react";

// Quran — the reading experience itself, not a feature list.
// Real, continuous recitation that plays. Tajweed highlighting, translation,
// resume reading, and reading progress — all communicated through the interface.

// Tajweed markup: madd (prolongation) in amber, ghunnah (nasalization) in emerald.
const Tajweed = ({ segments }) => (
  <>
    {segments.map((s, i) => (
      <span
        key={i}
        className={
          s.type === "madd"
            ? "text-amber-700"
            : s.type === "ghunnah"
              ? "text-emerald-700"
              : ""
        }
      >
        {s.text}
      </span>
    ))}
  </>
);

const ayahs = [
  {
    n: 1,
    segments: [
      { text: "بِسْمِ " },
      { type: "madd", text: "ٱللَّهِ" },
      { text: " " },
      { type: "madd", text: "ٱلرَّحْمَٰنِ" },
      { text: " " },
      { type: "madd", text: "ٱلرَّحِيمِ" },
    ],
    translation:
      "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/1.mp3",
  },
  {
    n: 2,
    segments: [
      { text: "ٱلْحَمْدُ " },
      { type: "madd", text: "لِلَّهِ" },
      { text: " رَبِّ " },
      { type: "madd", text: "ٱلْعَٰلَمِينَ" },
    ],
    translation: "[All] praise is [due] to Allah, Lord of the worlds.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/2.mp3",
  },
  {
    n: 3,
    segments: [
      { type: "madd", text: "ٱلرَّحْمَٰنِ" },
      { text: " " },
      { type: "madd", text: "ٱلرَّحِيمِ" },
    ],
    translation: "The Entirely Merciful, the Especially Merciful.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/3.mp3",
  },
  {
    n: 4,
    segments: [
      { type: "madd", text: "مَٰلِكِ" },
      { text: " يَوْمِ " },
      { type: "ghunnah", text: "ٱلدِّينِ" },
    ],
    translation: "Sovereign of the Day of Recompense.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/4.mp3",
  },
  {
    n: 5,
    segments: [{ text: "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ" }],
    translation: "It is You we worship and You we ask for help.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/5.mp3",
  },
  {
    n: 6,
    segments: [
      { text: "ٱهْدِنَا " },
      { type: "madd", text: "ٱلصِّرَٰطَ" },
      { text: " " },
      { type: "madd", text: "ٱلْمُسْتَقِيمَ" },
    ],
    translation: "Guide us to the straight path.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/6.mp3",
  },
  {
    n: 7,
    segments: [
      { type: "madd", text: "صِرَٰطَ" },
      { text: " " },
      { type: "ghunnah", text: "ٱلَّذِينَ" },
      { text: " أَنْعَمْتَ عَلَيْهِمْ غَيْرِ ٱلْمَغْضُوبِ عَلَيْهِمْ وَلَا " },
      { type: "madd", text: "ٱلضَّآلِّينَ" },
    ],
    translation:
      "The path of those upon whom You have bestowed favor, not of those who have evoked anger or of those who are astray.",
    audio: "https://cdn.islamic.network/quran/audio/128/ar.alafasy/7.mp3",
  },
];

// Waveform component only animates when `isPlaying` is true.
const Waveform = ({ isPlaying }) => (
  <div className="flex items-end gap-[2px] h-3">
    {[...Array(16)].map((_, i) => (
      <motion.div
        key={i}
        className="w-[1.5px] bg-[#C6A26B] rounded-full origin-bottom"
        animate={{
          height: isPlaying
            ? [
                `${Math.random() * 40 + 20}%`,
                `${Math.random() * 60 + 40}%`,
                "30%",
              ]
            : "20%", // Stop animation when not playing
        }}
        transition={{
          duration: 0.8 + Math.random() * 0.5,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
      />
    ))}
  </div>
);

// Circular progress indicator to match overall percentage.
const CircularProgress = ({ percentage }) => {
  const radius = 9;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-8 h-8">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className="rotate-[-90deg]"
      >
        <circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#E7E5E4"
          strokeWidth="1.5"
        />
        <motion.circle
          cx="12"
          cy="12"
          r={radius}
          fill="none"
          stroke="#C6A26B"
          strokeWidth="1.5"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          strokeLinecap="round"
        />
      </svg>
      <span className="absolute text-[8px] font-sans text-stone-500 font-medium tabular-nums">
        {Math.round(percentage)}%
      </span>
    </div>
  );
};

export default function Quran() {
  const [current, setCurrent] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // Progress within current Ayah
  const [started, setStarted] = useState(false);
  const [showTranslation, setShowTranslation] = useState(true);
  const [isComplete, setIsComplete] = useState(false); // New state to handle full completion
  const audioRef = useRef(null);

  // Corrected calculation to hit 100% when fully complete.
  const overallPercentage = isComplete
    ? 100
    : Math.min(((current - 1 + progress) / ayahs.length) * 100, 100);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying && !isComplete) {
      audio.src = ayahs[current - 1].audio;
      audio.play().catch(() => {});
    } else if (!audio.paused) {
      audio.pause();
    }
  }, [isPlaying, current, isComplete]);

  // Corrected audio logic to properly halt waveform on complete.
  const handleEnded = () => {
    if (current < ayahs.length) {
      setProgress(0);
      setCurrent((c) => c + 1); // isPlaying stays true → next ayah plays
    } else {
      // Logic for total Surah completion:
      setIsPlaying(false); // This stops the waveform animation
      setIsComplete(true); // This triggers the completion screen
      setStarted(false);
      setProgress(1); // Set current verse progress to full
    }
  };

  const handleTime = () => {
    const a = audioRef.current;
    if (a && a.duration) setProgress(a.currentTime / a.duration);
  };

  const toggle = () => {
    if (isComplete) {
      // If complete, restart from the beginning.
      setIsComplete(false);
      setCurrent(1);
      setProgress(0);
      setStarted(true);
      setIsPlaying(true);
    } else if (!isPlaying) {
      setStarted(true);
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  };

  const resumeLabel = started && !isPlaying && current > 1 && !isComplete;

  return (
    <section
      id="quran"
      className="relative bg-[#F7F5F1] py-24 md:py-32 overflow-hidden selection:bg-[#C6A26B] selection:text-white"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 20%, rgba(253,247,237,0.6) 0%, transparent 60%)",
        }}
      />

      {/* 1. Header (Matches Qaza Layout and Size) */}
      <div className="relative max-w-4xl mx-auto px-6 md:px-10 mb-24 md:mb-32 mt-12 md:mt-16">
        <div className="md:pl-20 text-left">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="font-serif text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-[-0.01em] text-stone-900"
          >
            Read the way
            <br />
            <span className="italic font-light text-stone-500">
              it was meant to be read.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mt-10 md:mt-12 max-w-xl pl-5 border-l-[1.5px] border-stone-200"
          >
            <p className="font-serif text-[1.1rem] md:text-[1.2rem] text-stone-900 leading-[1.6]">
              Experience the living Mushaf.
            </p>
            <p className="font-serif text-[15px] text-stone-500 mt-2 leading-[1.6]">
              Read, listen, and reflect at your own pace. Tawfiq remembers where
              you left off, highlights Tajweed as you recite, and keeps every
              session connected to your journey.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* The living Mushaf experience wrapper */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotateX: 6 }}
          whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto MushafWrapper"
          style={{ transformPerspective: 1200 }}
        >
          <div className="relative bg-[#FAFAFA] rounded border border-stone-200/50 shadow-[0_40px_100px_-40px_rgba(28,25,23,0.15)] overflow-hidden">
            {/* Reading progress — a thin line at the top */}
            <div className="absolute top-0 left-0 h-[2px] w-full bg-stone-100 z-10">
              <motion.div
                className="h-full bg-[#C6A26B]"
                animate={{ width: `${overallPercentage}%` }}
                transition={{ duration: 0.4, ease: "linear" }}
              />
            </div>

            <div className="p-10 sm:p-16">
              {/* Surah header */}
              <div className="flex items-baseline justify-between mb-16 pb-6 border-b border-stone-200/60">
                <div>
                  <h3 className="font-serif text-2xl text-stone-900">
                    Surah Al-Fatiha
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] font-sans text-stone-400 uppercase tracking-widest">
                    <p>Alafasy</p>
                    <span className="w-1 h-1 bg-stone-300 rounded-full" />
                    <p className="tabular-nums">
                      {isComplete
                        ? "00:00"
                        : `Ayah ${current} of ${ayahs.length}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {/* Tajweed legend */}
                  <div className="hidden sm:flex items-center gap-3 text-[10px] font-sans text-stone-400">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-700" />
                      Madd
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-700" />
                      Ghunnah
                    </span>
                  </div>
                  {/* Waveform and circular progress */}
                  <div className="flex items-center gap-6">
                    <Waveform isPlaying={isPlaying} />
                    <CircularProgress percentage={overallPercentage} />
                  </div>
                </div>
              </div>

              {/* Content rendering with proper state transitions */}
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  /* Reading Interface */
                  <motion.div
                    key="reading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, filter: "blur(4px)" }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Arabic with tajweed highlighting */}
                    <div dir="rtl" className="space-y-6">
                      {ayahs.map((a) => {
                        const active = a.n === current && isPlaying;
                        const visible =
                          Math.abs(a.n - current) <= 1 || isComplete;

                        if (!visible) return null;

                        return (
                          <div
                            key={a.n}
                            className={`rounded-xl px-4 py-3 -mx-4 transition-all duration-700 ${
                              active ? "bg-amber-50/70" : "bg-transparent"
                            }`}
                          >
                            <p
                              className={`font-arabic leading-[2.1] transition-all duration-500 ${
                                active
                                  ? "text-stone-900 text-[clamp(1.6rem,4vw,2.4rem)]"
                                  : "text-stone-700 text-[clamp(1.4rem,3.5vw,2rem)]"
                              }`}
                            >
                              <Tajweed segments={a.segments} />
                              <span className="inline-flex items-center justify-center w-7 h-7 mx-1 align-middle rounded-full border border-stone-300 text-[11px] font-sans text-stone-400 not-italic">
                                {a.n}
                              </span>
                            </p>
                            {showTranslation && (
                              <p
                                className={`font-serif italic font-light mt-2 transition-all duration-500 text-left ${
                                  active
                                    ? "text-stone-700 text-base"
                                    : "text-stone-400 text-sm"
                                }`}
                                dir="ltr"
                              >
                                {a.translation}
                              </p>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Resume reading indicator */}
                    {resumeLabel && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-10 text-center text-[11px] font-sans tracking-[0.15em] uppercase text-amber-700/70"
                      >
                        Continue from Ayah {current}
                      </motion.p>
                    )}
                  </motion.div>
                ) : (
                  /* Completion State UI */
                  <motion.div
                    key="complete"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    className="flex flex-col items-center justify-center py-16"
                  >
                    {/* Ring micro-interaction */}
                    <div className="relative flex items-center justify-center w-16 h-16 mb-6">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
                        transition={{ duration: 2.5, ease: "easeOut" }}
                        className="absolute inset-0 rounded-full border border-[#C6A26B]"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 100,
                          damping: 20,
                          delay: 0.4,
                        }}
                        className="w-10 h-10 rounded-full bg-stone-50 flex items-center justify-center border border-stone-200 text-[#C6A26B]"
                      >
                        <Check size={18} />
                      </motion.div>
                    </div>

                    <h4 className="font-serif text-xl text-stone-900 mb-2">
                      Surah Complete
                    </h4>
                    <p className="text-[11px] font-sans tracking-widest uppercase text-stone-400 mb-10">
                      Alhamdulillah
                    </p>

                    <button
                      onClick={toggle}
                      className="text-[11px] font-sans text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest border-b border-stone-300 pb-1"
                    >
                      Read Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Control bar — a calm premium audio experience */}
            <div className="flex items-center justify-between gap-4 px-10 sm:px-16 py-6 border-t border-stone-200/60 bg-stone-50/40">
              <button
                onClick={toggle}
                className="group relative inline-flex items-center gap-3 transition-colors duration-300"
              >
                {/* Breathe interaction */}
                {isPlaying && !isComplete && (
                  <motion.span
                    className="absolute -inset-2 rounded-full border border-amber-600/20"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                )}
                <div
                  className="w-11 h-11 rounded-full bg-stone-900 flex items-center justify-center text-stone-50 transition-all duration-300 hover:bg-stone-800 active:scale-95 group-hover:scale-105"
                  aria-label={
                    isComplete
                      ? "Restart recitation"
                      : isPlaying
                        ? "Pause recitation"
                        : "Play recitation"
                  }
                >
                  {isPlaying ? (
                    <Pause size={16} strokeWidth={2} />
                  ) : (
                    <Play size={16} strokeWidth={2} className="ml-0.5" />
                  )}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="font-serif text-lg text-stone-900">
                    {isComplete
                      ? "Alhamdulillah"
                      : isPlaying
                        ? "Pause"
                        : "Listen"}
                  </p>
                  <p className="text-[10px] font-sans text-stone-400 mt-0.5 uppercase tracking-wide">
                    {isComplete
                      ? "Surah Complete"
                      : isPlaying
                        ? `Ayah ${current}`
                        : resumeLabel
                          ? "Continue"
                          : "Begin"}
                  </p>
                </div>
              </button>

              <div className="flex items-center gap-6">
                <button
                  onClick={() => setShowTranslation((s) => !s)}
                  className="text-[11px] font-sans text-stone-400 hover:text-stone-900 transition-colors"
                >
                  {showTranslation ? "Hide Translation" : "Show Translation"}
                </button>
                <div className="text-[11px] font-sans tracking-[0.12em] uppercase px-3 py-1.5 rounded-full border border-stone-200 text-stone-400">
                  Tawfiq
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <audio
        ref={audioRef}
        onEnded={handleEnded}
        onTimeUpdate={handleTime}
        preload="none"
      />
    </section>
  );
}
