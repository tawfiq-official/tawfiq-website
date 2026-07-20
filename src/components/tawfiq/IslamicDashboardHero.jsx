import React from "react";

export default function IslamicDashboardHero() {
  return (
    <div className="relative w-full h-screen bg-slate-950 overflow-hidden flex items-center justify-center font-sans">
      {/* 1. Custom Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 7s ease-in-out 3s infinite; }
      `}</style>

      {/* 2. Makkah Background (Blurred & Darkened for readability) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0 opacity-30 mix-blend-luminosity scale-105"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      {/* Gradient overlay to make text pop */}
      <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-900/80 to-slate-900/40 z-0" />

      {/* 3. Main Container for Floating Elements */}
      <div className="relative z-10 w-full max-w-5xl h-full flex items-center justify-center">
        {/* --- CENTRAL PHONE MOCKUP --- */}
        <div className="animate-float relative w-72 sm:w-80 rounded-[2.5rem] bg-slate-900/70 backdrop-blur-2xl border border-white/10 p-6 shadow-2xl shadow-emerald-900/20">
          {/* Phone Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl"></div>

          <div className="mt-6 flex flex-col gap-6">
            <div className="text-center mt-2">
              <h2 className="text-white font-semibold text-lg tracking-wide">
                Daily Prayers
              </h2>
              <p className="text-slate-400 text-xs mt-1">Mon, 20 July</p>
            </div>

            <div className="flex flex-col gap-3">
              {/* Fajr - Checked */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-white font-medium">Fajr</span>
                <svg
                  className="w-6 h-6 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Dhuhr - Checked */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5">
                <span className="text-white font-medium">Dhuhr</span>
                <svg
                  className="w-6 h-6 text-emerald-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>

              {/* Asr - Pending (Highlighted) */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                <span className="text-emerald-300 font-medium">Asr</span>
                <svg
                  className="w-6 h-6 text-emerald-400/50"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="9" strokeWidth={2} />
                </svg>
              </div>
            </div>

            {/* Qaza Section */}
            <div className="pt-5 border-t border-white/10 mt-2">
              <div className="flex items-center justify-between bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
                <span className="text-slate-300 text-sm font-medium">
                  Qaza Left
                </span>
                <span className="text-amber-400 font-bold text-lg">127</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- FLOATING WIDGETS --- */}

        {/* 1. AI Companion (Bottom Left) */}
        <div className="animate-float-delayed absolute bottom-[15%] left-[5%] md:left-[10%] lg:left-[15%] max-w-[220px] p-4 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-900/20">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1.5 bg-indigo-500/20 rounded-lg">
              <svg
                className="w-4 h-4 text-indigo-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <span className="text-indigo-300 text-[10px] font-bold uppercase tracking-widest">
              AI Companion
            </span>
          </div>
          <p className="text-white text-sm font-medium leading-relaxed">
            "You haven't prayed <span className="text-emerald-400">Asr</span>{" "}
            yet. Time is almost up."
          </p>
        </div>

        {/* 2. Prayer Streak (Top Left) */}
        <div className="animate-float-slow absolute top-[20%] left-[5%] md:left-[15%] lg:left-[22%] p-4 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-4">
          <div className="p-2.5 bg-orange-500/20 rounded-xl text-orange-400">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-0.5">
              Prayer Streak
            </p>
            <p className="text-white font-bold text-xl">42 Days</p>
          </div>
        </div>

        {/* 3. Quran Today (Top Right) */}
        <div className="animate-float absolute top-[30%] right-[5%] md:right-[15%] lg:right-[20%] p-4 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-xl flex items-center gap-4">
          <div className="p-2.5 bg-sky-500/20 rounded-xl text-sky-400">
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
          </div>
          <div>
            <p className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider mb-0.5">
              Quran Today
            </p>
            <p className="text-white font-bold text-xl">3 Pages</p>
          </div>
        </div>

        {/* 4. Weekly Analytics (Bottom Right) */}
        <div className="animate-float-slow absolute bottom-[25%] right-[5%] md:right-[12%] lg:right-[25%] p-5 rounded-2xl bg-slate-800/80 backdrop-blur-xl border border-white/10 shadow-xl min-w-[160px]">
          <div className="flex items-end justify-between gap-4 mb-3">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
              This Week
            </span>
            <span className="text-emerald-400 font-bold text-2xl leading-none">
              84%
            </span>
          </div>
          {/* Progress Bar */}
          <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"
              style={{ width: "84%" }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
