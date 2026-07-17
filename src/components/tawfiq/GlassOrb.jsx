import {
  motion,
  useTime,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useState } from "react";

const labels = [
  { text: "Prayer", angle: 0 },
  { text: "Quran", angle: 72 },
  { text: "Qaza", angle: 144 },
  { text: "Dhikr", angle: 216 },
  { text: "Stories", angle: 288 },
];

export default function GlassOrb() {
  // Updated to 170 to match the new SVG orbit ring and glowing nodes perfectly
  const radius = 170;

  // Create a continuous time value and derive rotation
  // 70000ms = 70s. This ensures a full 360 degree rotation every 70 seconds.
  const time = useTime();
  const rotation = useTransform(time, (t) => (t / 1000) * (360 / 70));

  // State to track which label is currently highlighted
  const [highlighted, setHighlighted] = useState("Prayer");

  // Helper function to calculate the label closest to 12 o'clock (270°)
  const getHighlightedLabel = (rotationDeg) => {
    // Normalize rotation to 0-359 range
    const normalized = ((rotationDeg % 360) + 360) % 360;

    let closestLabel = labels[0].text;
    let smallestDistance = 999;

    labels.forEach((label) => {
      // Calculate the label's current absolute angle in CSS coordinates
      const currentAngle = (label.angle + normalized) % 360;

      // Calculate shortest distance to the top (270° in CSS coord system)
      const distance = Math.abs(((currentAngle - 270 + 540) % 360) - 180);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestLabel = label.text;
      }
    });

    return closestLabel;
  };

  // Listen to motion value changes to update react state
  useMotionValueEvent(rotation, "change", (latest) => {
    setHighlighted(getHighlightedLabel(latest));
  });

  return (
    <div className="relative flex items-center justify-center w-[520px] h-[520px]">
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.55, 0.35],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute w-[420px] h-[420px] rounded-full blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(198,162,107,.45) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* SVG Background Rings (Updated) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 520 520"
      >
        {/* Main Orbit Ring */}
        <motion.circle
          cx="260"
          cy="260"
          r="170"
          fill="none"
          stroke="rgba(198,162,107,.18)"
          strokeWidth="1.4"
          strokeDasharray="10 8"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            transformOrigin: "260px 260px",
          }}
        />

        {/* Outer Dashed Ring */}
        <circle
          cx="260"
          cy="260"
          r="196"
          fill="none"
          stroke="rgba(198,162,107,.10)"
          strokeWidth="1"
          strokeDasharray="3 8"
          strokeLinecap="round"
        />

        {/* Inner Ring */}
        <circle
          cx="260"
          cy="260"
          r="135"
          fill="none"
          stroke="rgba(255,255,255,.12)"
          strokeWidth="1"
        />

        {/* Glowing Nodes */}
        {[0, 72, 144, 216, 288].map((angle) => {
          const rad = (angle * Math.PI) / 180;

          return (
            <circle
              key={angle}
              cx={260 + Math.cos(rad) * 170}
              cy={260 + Math.sin(rad) * 170}
              r="2.5"
              fill="#C6A26B"
              opacity=".75"
            />
          );
        })}
      </svg>

      {/* Center Glass Orb */}
      <motion.div
        animate={{
          scale: [1, 1.03, 1],
          rotate: [-1, 1, -1],
        }}
        transition={{
          scale: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
        className="relative z-20 flex items-center justify-center w-60 h-60 rounded-full overflow-hidden border border-white/40 backdrop-blur-3xl shadow-[0_40px_80px_rgba(198,162,107,.18)]"
      >
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "linear-gradient(140deg, rgba(255,255,255,.45), rgba(255,255,255,.02) 45%, rgba(255,255,255,.08) 100%)",
          }}
        />
        <div className="absolute top-6 left-10 w-24 h-10 rounded-full blur-xl bg-white/40" />

        <div
          className="absolute inset-5 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,.35), transparent 75%)",
          }}
        />
        <div
          className="absolute top-14 left-16 w-5 h-5 rounded-full"
          style={{
            background: "rgba(255,255,255,.95)",
          }}
        />
        <div
          className="absolute top-20 right-10 w-14 h-14 rounded-full blur-xl"
          style={{
            background: "rgba(255,255,255,.30)",
          }}
        />
        <div
          className="absolute -top-2 left-10 w-32 h-16 rounded-full blur-2xl rotate-[-18deg]"
          style={{
            background: "rgba(255,255,255,.75)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-full h-1/2"
          style={{
            background:
              "linear-gradient(to top, rgba(188,148,92,.14), rgba(255,255,255,0))",
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(0,0,0,0) 45%, rgba(0,0,0,.05) 82%, rgba(0,0,0,.12) 100%)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `radial-gradient(circle at 35% 30%, rgba(255,255,255,.95) 0%, rgba(255,255,255,.72) 38%, rgba(250,247,243,.38) 72%, rgba(235,228,217,.20) 100%)`,
          }}
        />

        {/* Center Text */}
        <div className="relative z-10 text-center">
          <div className="text-4xl" style={{ color: "#B98A4B" }}>
            توفيق
          </div>
          <div
            className="mt-3 text-xs tracking-[0.45em] uppercase"
            style={{ color: "#6D6458" }}
          >
            Tawfiq
          </div>
        </div>
      </motion.div>

      {/* Orbiting Elements Wrapper mapped to useTransform time */}
      <motion.div
        style={{
          rotate: rotation,
        }}
        className="absolute inset-0 pointer-events-none"
      >
        {/* Orbiting Labels */}
        {labels.map((item) => {
          const rad = (item.angle * Math.PI) / 180;
          const x = Math.cos(rad) * radius;
          const y = Math.sin(rad) * radius;
          const isPrimary = item.text === highlighted;

          return (
            <div
              key={item.text}
              className="absolute"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                // Keeps item radially aligned, pushing outward slightly
                transform: `
                  translate(-50%, -50%)
                  rotate(${item.angle}deg)
                  translateX(42px)
                `,
              }}
            >
              <div className="flex items-center">
                {/* Orbital Dot */}
                <motion.div
                  animate={{
                    scale: isPrimary ? 1.6 : 1,
                    opacity: isPrimary ? 1 : 0.55,
                  }}
                  transition={{
                    duration: 0.4,
                  }}
                  className="rounded-full shrink-0"
                  style={{
                    width: 6,
                    height: 6,
                    background: isPrimary ? "#B88645" : "#DCC28F",
                    boxShadow: isPrimary
                      ? "0 0 16px rgba(184,134,69,.7)"
                      : "0 0 6px rgba(220,194,143,.35)",
                  }}
                />

                {/* Connecting Line pointing outward */}
                <div className="w-6 h-[1px] bg-[#C6A26B]/50 mx-2" />

                {/* Counter-rotating Text Wrapper to stay perfectly horizontal */}
                <motion.div
                  style={{
                    rotate: useTransform(rotation, (r) => -r - item.angle),
                  }}
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                    },
                  }}
                  className="pointer-events-auto cursor-default shrink-0"
                >
                  <motion.span
                    animate={{
                      scale: isPrimary ? 1.15 : 1,
                      opacity: isPrimary ? 1 : 0.65,
                      color: isPrimary ? "#A66A2C" : "#A89B88",
                    }}
                    transition={{
                      duration: 0.4,
                      ease: "easeOut",
                    }}
                    className={`uppercase tracking-[0.4em] ${
                      isPrimary
                        ? "font-semibold text-[12px]"
                        : "font-normal text-[11px]"
                    }`}
                  >
                    {item.text}
                  </motion.span>
                </motion.div>
              </div>
            </div>
          );
        })}

        {/* Orbiting Dust / Particles */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i * 20 * Math.PI) / 180;
          const r = 205;

          return (
            <motion.div
              key={`dust-${i}`}
              animate={{
                opacity: [0.2, 1, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                opacity: {
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                },
                scale: {
                  duration: 3 + i * 0.2,
                  repeat: Infinity,
                },
              }}
              className="absolute rounded-full"
              style={{
                width: 3,
                height: 3,
                background: "#D6B67D",
                left: `calc(50% + ${Math.cos(angle) * r}px)`,
                top: `calc(50% + ${Math.sin(angle) * r}px)`,
              }}
            />
          );
        })}
      </motion.div>
    </div>
  );
}
