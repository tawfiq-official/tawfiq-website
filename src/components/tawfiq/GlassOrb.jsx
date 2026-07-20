import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

const DESIGN_W = 520;
const DESIGN_H = 700;

/* Cycles 0..steps-1 on a fixed interval — drives each demo's story beats. */
function useCycle(steps, duration = 2000) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((s) => (s + 1) % steps), duration);
    return () => clearInterval(t);
  }, [steps, duration]);
  return step;
}

/* Animates a displayed integer toward `target` whenever it changes —
   this is what makes owed/streak counts visibly roll instead of jump. */
function useAnimatedNumber(target, duration = 600) {
  const [value, setValue] = useState(target);
  const fromRef = useRef(target);
  useEffect(() => {
    const from = fromRef.current;
    if (from === target) return;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (target - from) * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
      else fromRef.current = target;
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
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
function MinusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function Ripple({ color = "bg-white" }) {
  return (
    <motion.span
      className={`absolute inset-0 rounded-[inherit] ${color}`}
      initial={{ opacity: 0.45, scale: 0.5 }}
      animate={{ opacity: 0, scale: 1.8 }}
      transition={{ duration: 0.5 }}
    />
  );
}

/* ---------- 1. Salah Tracking — a window closes unmarked -> flips to Missed; a tap logs On Time ---------- */
const SALAH_FRAMES = [
  {
    name: "Dhuhr",
    time: "1:15 PM",
    left: "2h 15m left",
    status: null,
    qaza: 45,
    streak: 12,
    tap: null,
  },
  {
    name: "Dhuhr",
    time: "1:15 PM",
    left: "Window closed",
    status: "Missed",
    qaza: 46,
    streak: 12,
    tap: "Missed",
  },
  {
    name: "Fajr",
    time: "4:44 AM",
    left: "Tap to log",
    status: null,
    qaza: 46,
    streak: 12,
    tap: null,
  },
  {
    name: "Fajr",
    time: "4:44 AM",
    left: "Logged",
    status: "On Time",
    qaza: 46,
    streak: 13,
    tap: "On Time",
  },
];
function SalahDemo() {
  const step = useCycle(SALAH_FRAMES.length, 2200);
  const f = SALAH_FRAMES[step];
  const qaza = useAnimatedNumber(f.qaza);
  const streak = useAnimatedNumber(f.streak);

  return (
    <div className="w-full flex flex-col items-center gap-2.5">
      <AnimatePresence mode="wait">
        <motion.div
          key={f.name + f.left}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="w-full bg-white border border-stone-100 rounded-2xl p-3 shadow-sm"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold text-[13.5px] text-stone-900">
              {f.name} · {f.time}
            </span>
            <span className="text-[9.5px] font-medium text-stone-400 uppercase">
              {f.left}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {["On Time", "Late", "Missed"].map((opt) => {
              const active = opt === f.status;
              const activeStyle =
                opt === "Missed"
                  ? "bg-red-50 text-red-600 border-red-100"
                  : "bg-green-50 text-green-700 border-green-100";
              return (
                <div
                  key={opt}
                  className={`relative overflow-hidden text-[10px] font-bold uppercase tracking-wide text-center py-1.5 rounded-lg border ${active ? activeStyle : "bg-stone-50 text-stone-300 border-stone-100"}`}
                >
                  {opt}
                  {opt === f.tap && <Ripple key={step} />}
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="w-full flex gap-2">
        <div className="flex-1 bg-stone-50 rounded-xl py-2 text-center">
          <div className="text-[9px] uppercase tracking-wide text-stone-400 font-bold">
            Qaza total
          </div>
          <div className="text-[16px] font-bold text-stone-900 tabular-nums">
            {qaza}
          </div>
        </div>
        <div className="flex-1 bg-stone-50 rounded-xl py-2 text-center">
          <div className="text-[9px] uppercase tracking-wide text-stone-400 font-bold">
            Streak
          </div>
          <div className="text-[16px] font-bold text-stone-900 tabular-nums">
            {streak} 🔥
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Qaza Prayers — tapping the quick actions visibly moves the owed count and the forecast ---------- */
const QAZA_FRAMES = [
  { owed: 46, forecast: "2.7 yrs", tap: null },
  { owed: 46, forecast: "2.7 yrs", tap: "add" },
  { owed: 41, forecast: "2.4 yrs", tap: null },
  { owed: 41, forecast: "2.4 yrs", tap: "sub" },
  { owed: 46, forecast: "2.7 yrs", tap: null },
];
function QazaDemo() {
  const step = useCycle(QAZA_FRAMES.length, 2000);
  const f = QAZA_FRAMES[step];
  const owed = useAnimatedNumber(f.owed);

  return (
    <div className="w-full flex flex-col items-center gap-2.5">
      <div className="grid grid-cols-2 gap-2 w-full">
        <div className="relative overflow-hidden bg-[#166534] text-white text-[11px] font-bold uppercase tracking-wide rounded-xl py-2.5 flex items-center justify-center gap-1">
          <PlusIcon /> Full Day (5)
          {f.tap === "add" && <Ripple key={step} />}
        </div>
        <div className="relative overflow-hidden bg-red-50 text-red-500 text-[11px] font-bold uppercase tracking-wide rounded-xl py-2.5 flex items-center justify-center gap-1 border border-red-100">
          <MinusIcon /> Full Day (5)
          {f.tap === "sub" && <Ripple key={step} color="bg-red-200" />}
        </div>
      </div>

      <div className="w-full bg-white border border-stone-100 rounded-2xl p-3 shadow-sm text-center">
        <div className="text-[9.5px] uppercase tracking-wider font-bold text-stone-400 mb-1">
          Prayers owed
        </div>
        <div className="text-[34px] font-bold text-stone-900 leading-none mb-2 tabular-nums">
          {owed}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={f.forecast}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.3 }}
            className="text-[11px] text-stone-500"
          >
            Cleared in{" "}
            <span className="font-bold text-stone-900">{f.forecast}</span> at
            this pace
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- 3. Quran Reader — verses auto-advance, then it "remembers" where playback stopped ---------- */
const VERSES = [
  {
    ar: "بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ",
    en: "In the name of Allah, the Entirely Merciful, the Especially Merciful.",
    n: 1,
  },
  {
    ar: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
    en: "All praise is due to Allah, Lord of the worlds.",
    n: 2,
  },
  {
    ar: "الرَّحْمَنِ الرَّحِيمِ",
    en: "The Entirely Merciful, the Especially Merciful.",
    n: 3,
  },
];
function QuranDemo() {
  const step = useCycle(5, 1900);
  const verse = VERSES[Math.min(step, 2)];
  const closed = step === 3;
  const resumed = step === 4;

  return (
    <div className="w-full relative bg-white border border-stone-100 rounded-3xl p-4 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[14px] font-serif font-medium text-stone-900">
          Al-Fatihah
        </span>
        <span className="text-[10px] font-bold text-stone-400 uppercase">
          {verse.n} / 7
        </span>
      </div>
      <div className="flex gap-1.5 mb-3">
        <span className="text-[9.5px] font-semibold uppercase px-2 py-1 rounded-md bg-green-50 text-green-700 border border-green-100">
          Saheeh Int'l ▾
        </span>
        <span className="text-[9.5px] font-semibold uppercase px-2 py-1 rounded-md bg-stone-50 text-stone-500 border border-stone-100">
          Al-Sudais ▾
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={verse.n}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.35 }}
          className="text-right mb-2"
        >
          <div
            className="text-xl font-serif text-stone-800 leading-relaxed mb-1.5"
            dir="rtl"
          >
            {verse.ar}
          </div>
          <div className="text-[12px] text-stone-500 text-left leading-relaxed">
            {verse.en}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="flex items-center gap-2 bg-stone-50 rounded-xl px-3 py-2 mt-3">
        <motion.div
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.1, repeat: Infinity }}
          className="w-6 h-6 rounded-full bg-[#166534] flex items-center justify-center text-white"
        >
          <svg viewBox="0 0 24 24" width="10" height="10" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </motion.div>
        <span className="text-[10px] font-semibold text-stone-500 uppercase tracking-wide">
          Continuous play · verse {verse.n} of 7
        </span>
      </div>

      <AnimatePresence>
        {closed && (
          <motion.div
            key="closed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-stone-900/85 flex flex-col items-center justify-center gap-2"
          >
            <svg
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="white"
              strokeWidth="2"
            >
              <rect x="5" y="10" width="14" height="9" rx="2" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" />
            </svg>
            <span className="text-white text-[11px] font-semibold uppercase tracking-wide">
              App closed at verse 3
            </span>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {resumed && (
          <motion.div
            key="resumed"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute bottom-3 left-3 right-3 bg-amber-50 border border-amber-100 rounded-xl px-3 py-2 text-[10.5px] font-semibold text-amber-700 text-center"
          >
            Reopened — resumed right at verse 3
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- 4. Islamic Academy — finishing one course visibly unlocks the next ---------- */
const ACADEMY_STEPS = [
  { salahPct: 60, salahDone: false, tajweedUnlocked: false },
  { salahPct: 100, salahDone: false, tajweedUnlocked: false },
  { salahPct: 100, salahDone: true, tajweedUnlocked: true },
  { salahPct: 100, salahDone: true, tajweedUnlocked: true },
];
function AcademyDemo() {
  const step = useCycle(ACADEMY_STEPS.length, 2200);
  const s = ACADEMY_STEPS[step];
  const salahPct = useAnimatedNumber(s.salahPct);

  const courses = [
    { name: "Purity", blurb: "Wudu, ghusl, tayammum", state: "done" },
    {
      name: "Salah",
      blurb: "The 5 daily prayers",
      state: s.salahDone ? "done" : "progress",
      pct: salahPct,
    },
    {
      name: "Tajweed",
      blurb: "Correct pronunciation rules",
      state: s.tajweedUnlocked ? "unlocked" : "locked",
      badge: s.tajweedUnlocked,
    },
    { name: "Etiquette", blurb: "Mosque manners and conduct", state: "locked" },
  ];

  return (
    <div className="w-full flex flex-col gap-1.5">
      {courses.map((c) => (
        <div
          key={c.name}
          className="relative overflow-visible bg-white border border-stone-100 rounded-2xl px-3 py-2 shadow-sm flex items-center gap-2.5"
        >
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
              c.state === "done" || c.state === "unlocked"
                ? "bg-green-50 text-green-600"
                : c.state === "progress"
                  ? "bg-amber-50 text-amber-600"
                  : "bg-stone-100 text-stone-300"
            }`}
          >
            {c.state === "done" || c.state === "unlocked" ? (
              <motion.svg
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            ) : c.state === "locked" ? (
              <svg
                viewBox="0 0 24 24"
                width="12"
                height="12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
              >
                <rect x="5" y="10" width="14" height="9" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>
            ) : (
              <span className="text-[9.5px] font-bold tabular-nums">
                {c.pct}%
              </span>
            )}
          </div>
          <div className="flex-1 text-left">
            <div
              className={`text-[12.5px] font-semibold leading-tight ${c.state === "locked" ? "text-stone-300" : "text-stone-900"}`}
            >
              {c.name}
            </div>
            <div
              className={`text-[9.5px] leading-tight ${c.state === "locked" ? "text-stone-300" : "text-stone-400"}`}
            >
              {c.blurb}
            </div>
            {c.state === "progress" && (
              <div className="w-full h-1 bg-stone-100 rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full"
                  style={{ width: `${c.pct}%` }}
                />
              </div>
            )}
          </div>
          {c.name === "Tajweed" && c.badge && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-1.5 -right-1.5 bg-[#166534] text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded-full"
            >
              Unlocked
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ---------- 5. Sawm Tracker — a live countdown, and logging a fast visibly clears the debt ---------- */
const SAWM_STEPS = [
  { owed: 180, tap: null },
  { owed: 180, tap: "log" },
  { owed: 179, tap: null },
  { owed: 179, tap: null },
];
function SawmDemo() {
  const step = useCycle(SAWM_STEPS.length, 2200);
  const s = SAWM_STEPS[step];
  const owed = useAnimatedNumber(s.owed);
  const pct = ((180 - s.owed) / 180) * 100;

  const [secs, setSecs] = useState(50);
  useEffect(() => {
    const t = setInterval(() => setSecs((v) => (v - 1 + 60) % 60), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="bg-white border border-stone-100 rounded-2xl p-3 shadow-sm">
        <div className="text-[9.5px] uppercase tracking-wider font-bold text-stone-400 mb-2">
          Countdown to Ramadan
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            ["206", "Days"],
            ["07", "Hrs"],
            ["20", "Min"],
            [String(secs).padStart(2, "0"), "Sec"],
          ].map(([n, l]) => (
            <div key={l} className="bg-stone-50 rounded-lg py-2 text-center">
              <div className="text-[14px] font-bold text-stone-900 leading-none tabular-nums">
                {n}
              </div>
              <div className="text-[8px] text-stone-400 mt-1 uppercase">
                {l}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white border border-stone-100 rounded-2xl p-3 shadow-sm">
        <div className="flex justify-between items-baseline mb-1.5">
          <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wide">
            Missed fasts
          </span>
          <span className="text-[11px] font-bold text-stone-900 tabular-nums">
            {owed} owed
          </span>
        </div>
        <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-[#166534] rounded-full"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6 }}
          />
        </div>
        <div className="relative overflow-hidden bg-[#166534] text-white text-[11px] font-bold uppercase tracking-wide rounded-xl py-2 flex items-center justify-center gap-1">
          <MinusIcon /> Log a Fasted Day
          {s.tap === "log" && <Ripple key={step} />}
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  {
    title: "Salah Tracking",
    desc: "Watch what happens when a prayer's window closes — and what happens when you tap in time.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
    ui: <SalahDemo />,
  },
  {
    title: "Qaza Prayers",
    desc: "Tap the quick actions and watch your owed count and payoff time recalculate live.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
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
    ui: <QazaDemo />,
  },
  {
    title: "Quran Reader",
    desc: "Continuous play moves verse to verse on its own — and remembers exactly where you stopped.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
      </svg>
    ),
    ui: <QuranDemo />,
  },
  {
    title: "Islamic Academy",
    desc: "Finish a course and the next one unlocks automatically — always in the same order.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
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
    ui: <AcademyDemo />,
  },
  {
    title: "Sawm Tracker",
    desc: "A live countdown to Ramadan, plus a missed-fast count you clear one log at a time.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    ),
    ui: <SawmDemo />,
  },
];

export default function GlassOrb() {
  const [index, setIndex] = useState(0); // 0 = intro, 1..FEATURES.length = features
  const wrapRef = useRef(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) =>
      setScale(Math.min(1, entry.contentRect.width / DESIGN_W)),
    );
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const duration = index === 0 ? 4000 : 12000;
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
        <div className="relative z-20 flex items-center justify-center w-[320px] h-[660px]">
          <div className="absolute inset-0 rounded-[3.2rem] border-[8px] border-stone-800 bg-stone-50 shadow-[0_30px_70px_rgba(0,0,0,0.18)]" />
          <div className="absolute inset-[8px] rounded-[2.7rem] bg-[#FDFCFB] overflow-hidden">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-14 h-1.5 rounded-full bg-stone-200 z-50" />
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                {index === 0 ? (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex flex-col items-center justify-center text-center px-6"
                  >
                    <div className="mb-8 flex justify-center">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 22 22"
                        fill="none"
                        className="text-[#166534]"
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
                    </div>
                    <h2 className="text-[32px] font-serif text-stone-900 tracking-tight leading-tight">
                      What is
                      <br />
                      <span className="italic text-[#166534]">Tawfiq?</span>
                    </h2>
                  </motion.div>
                ) : (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0 w-full h-full flex flex-col items-center pt-10 px-5 text-center bg-[#FDFCFB] overflow-y-auto"
                  >
                    <div className="w-11 h-11 bg-[#F1F5F3] rounded-full flex items-center justify-center text-[#166534] mb-2.5 shrink-0">
                      {feature.icon}
                    </div>
                    <h3 className="text-[19px] font-serif text-stone-900 font-medium tracking-tight mb-1.5">
                      {feature.title}
                    </h3>
                    <p className="text-[12px] text-stone-500 leading-snug max-w-[260px] mx-auto mb-4">
                      {feature.desc}
                    </p>
                    <div className="w-full flex flex-col items-center pb-14">
                      {feature.ui}
                    </div>
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex gap-2.5 bg-[#FDFCFB]/90 px-3 py-1.5 rounded-full">
                      {FEATURES.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${idx === index - 1 ? "bg-[#166534]" : "bg-stone-200"}`}
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
