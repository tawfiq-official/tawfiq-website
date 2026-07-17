import { motion } from "framer-motion";

export default function MashrabiyaPattern() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: [0, -8, 0],
        rotate: [0, 360],
      }}
      transition={{
        opacity: { duration: 1.2 },
        scale: { duration: 1.2 },
        y: {
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        },
        rotate: {
          duration: 90,
          repeat: Infinity,
          ease: "linear",
        },
      }}
      className="relative flex items-center justify-center w-[520px] h-[520px]"
    >
      {/* Background Glow */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.18, 0.28, 0.18],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 rounded-full blur-[110px]"
        style={{
          background:
            "radial-gradient(circle, rgba(214,193,169,.45) 0%, rgba(247,245,241,0) 72%)",
        }}
      />

      {/* Shadow */}
      <motion.div
        animate={{
          scale: [1, 0.9, 1],
          opacity: [0.12, 0.08, 0.12],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 w-[70%] h-10 bg-stone-900 blur-3xl rounded-full"
      />

      {/* SVG starts here */}
      <svg
        viewBox="0 0 600 600"
        className="relative z-10 w-full h-full"
        fill="none"
      >
        {/* Outer Circle */}
        <circle
          cx="300"
          cy="300"
          r="250"
          stroke="#B8742A"
          strokeWidth="1.4"
          opacity="0.18"
        />

        {/* Second Ring */}
        <circle
          cx="300"
          cy="300"
          r="220"
          stroke="#B8742A"
          strokeWidth="1"
          opacity="0.25"
        />

        {/* Decorative Ring */}
        <circle
          cx="300"
          cy="300"
          r="190"
          stroke="#B8742A"
          strokeWidth="0.8"
          opacity="0.15"
        />

        {/* 24 Outer Dots */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 24;
          const x = 300 + Math.cos(angle) * 250;
          const y = 300 + Math.sin(angle) * 250;

          return (
            <circle
              key={`dot-${i}`}
              cx={x}
              cy={y}
              r="3"
              fill="#B8742A"
              opacity="0.35"
            />
          );
        })}

        {/* 12 Connecting Lines */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x1 = 300 + Math.cos(angle) * 190;
          const y1 = 300 + Math.sin(angle) * 190;
          const x2 = 300 + Math.cos(angle) * 250;
          const y2 = 300 + Math.sin(angle) * 250;

          return (
            <line
              key={`conn-line-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#B8742A"
              strokeWidth="1"
              opacity="0.18"
            />
          );
        })}

        {/* 12 Main Star Points */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 12;
          const x = 300 + Math.cos(angle) * 150;
          const y = 300 + Math.sin(angle) * 150;

          return (
            <line
              key={`star-${i}`}
              x1="300"
              y1="300"
              x2={x}
              y2={y}
              stroke="#B8742A"
              strokeWidth="1.3"
              opacity="0.35"
            />
          );
        })}

        {/* 12 Inner Diamonds */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a1 = (i * Math.PI * 2) / 12;
          const a2 = ((i + 1) * Math.PI * 2) / 12;

          const p1 = [300 + Math.cos(a1) * 110, 300 + Math.sin(a1) * 110];
          const p2 = [
            300 + Math.cos((a1 + a2) / 2) * 145,
            300 + Math.sin((a1 + a2) / 2) * 145,
          ];
          const p3 = [300 + Math.cos(a2) * 110, 300 + Math.sin(a2) * 110];
          const p4 = [
            300 + Math.cos((a1 + a2) / 2) * 90,
            300 + Math.sin((a1 + a2) / 2) * 90,
          ];

          return (
            <polygon
              key={`diamond-${i}`}
              points={`
                ${p1[0]},${p1[1]}
                ${p2[0]},${p2[1]}
                ${p3[0]},${p3[1]}
                ${p4[0]},${p4[1]}
              `}
              stroke="#B8742A"
              strokeWidth="1"
              fill="none"
              opacity="0.25"
            />
          );
        })}

        {/* Inner Circle */}
        <circle
          cx="300"
          cy="300"
          r="80"
          stroke="#B8742A"
          strokeWidth="1.2"
          opacity="0.35"
        />

        {/* 24 Petal Rosette */}
        {Array.from({ length: 24 }).map((_, i) => {
          const angle = (i * Math.PI * 2) / 24;
          const x = 300 + Math.cos(angle) * 65;
          const y = 300 + Math.sin(angle) * 65;

          return (
            <ellipse
              key={`petal-${i}`}
              cx={x}
              cy={y}
              rx="18"
              ry="8"
              transform={`rotate(${(angle * 180) / Math.PI} ${x} ${y})`}
              stroke="#B8742A"
              strokeWidth="0.9"
              fill="none"
              opacity="0.32"
            />
          );
        })}

        {/* Center Medallion */}
        <circle
          cx="300"
          cy="300"
          r="48"
          fill="#F7F5F1"
          stroke="#B8742A"
          strokeWidth="1.3"
        />

        <circle
          cx="300"
          cy="300"
          r="36"
          fill="none"
          stroke="#B8742A"
          strokeWidth="0.8"
          opacity="0.3"
        />

        {/* Center Text */}
        <text
          x="300"
          y="296"
          textAnchor="middle"
          fontSize="26"
          fill="#6B4F37"
          fontFamily="serif"
        >
          توفيق
        </text>

        <text
          x="300"
          y="323"
          textAnchor="middle"
          fontSize="8"
          letterSpacing="5"
          fill="#A8A29E"
          style={{ textTransform: "uppercase" }}
        >
          TAWFIQ
        </text>

        {/* Tiny Stars */}
        {[
          [300, 35],
          [565, 300],
          [300, 565],
          [35, 300],
        ].map(([x, y], i) => (
          <g
            key={`tiny-star-${i}`}
            transform={`translate(${x} ${y})`}
            opacity="0.45"
          >
            <line
              x1="-6"
              y1="0"
              x2="6"
              y2="0"
              stroke="#B8742A"
              strokeWidth="1"
            />
            <line
              x1="0"
              y1="-6"
              x2="0"
              y2="6"
              stroke="#B8742A"
              strokeWidth="1"
            />
          </g>
        ))}
      </svg>
    </motion.div>
  );
}
