"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const COUNTIES = [
  {
    id: "ulster",
    name: "Ulster County",
    cx: 145, cy: 135,
    path: "M 60,40 L 240,40 L 250,80 L 235,170 L 200,200 L 130,210 L 60,200 L 40,160 L 50,80 Z",
  },
  {
    id: "dutchess",
    name: "Dutchess County",
    cx: 355, cy: 135,
    path: "M 255,40 L 440,50 L 450,90 L 445,200 L 400,220 L 310,225 L 250,200 L 240,140 L 250,80 Z",
  },
  {
    id: "orange",
    name: "Orange County",
    cx: 130, cy: 295,
    path: "M 40,215 L 200,215 L 240,250 L 240,360 L 190,390 L 80,390 L 30,340 L 25,280 Z",
  },
  {
    id: "rockland",
    name: "Rockland County",
    cx: 285, cy: 330,
    path: "M 245,260 L 320,255 L 330,310 L 315,375 L 245,370 L 240,360 L 240,255 Z",
  },
  {
    id: "westchester",
    name: "Westchester County",
    cx: 395, cy: 310,
    path: "M 325,230 L 450,235 L 455,390 L 380,400 L 315,380 L 315,260 Z",
  },
];

const PULSE_POSITIONS = COUNTIES.map(c => ({ id: c.id, cx: c.cx, cy: c.cy }));

export default function TerritoryMap() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="territory"
      ref={ref}
      className="py-28 px-6 lg:px-10"
      style={{ background: "#111111" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
              >
                Service Area
              </span>
            </div>
            <h2
              className="text-5xl lg:text-6xl leading-tight mb-6"
              style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
            >
              Rooted in the
              <br />
              <span className="gold-text">Hudson Valley.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-10"
              style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-sans)" }}
            >
              We are Hudson Valley&apos;s authorized StruXure dealer — the only installer in
              the region certified to spec, supply, and install every model in the StruXure
              lineup. We serve five counties, from the Hudson River to the Connecticut border.
            </p>

            {/* County list */}
            <div className="space-y-3">
              {COUNTIES.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="flex items-center gap-4 py-3"
                  style={{ borderBottom: "1px solid rgba(201,168,76,0.08)" }}
                >
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: "#c9a84c" }}
                  />
                  <span
                    className="text-sm font-medium"
                    style={{ color: "rgba(245,240,232,0.75)", fontFamily: "var(--font-sans)" }}
                  >
                    {c.name}
                  </span>
                  <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.06)" }} />
                  <span
                    className="text-xs"
                    style={{ color: "rgba(201,168,76,0.5)", fontFamily: "var(--font-sans)" }}
                  >
                    NY
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-10 p-5 inline-flex items-start gap-4"
              style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)" }}
            >
              <div className="w-10 h-10 flex-shrink-0 flex items-center justify-center" style={{ border: "1px solid rgba(201,168,76,0.3)" }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#c9a84c" strokeWidth="1.3">
                  <path d="M10 2 L12.4 7.6 L18.5 8.1 L14 12.1 L15.5 18 L10 14.8 L4.5 18 L6 12.1 L1.5 8.1 L7.6 7.6 Z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}>
                  Authorized StruXure Dealer
                </p>
                <p className="text-xs mt-1" style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-sans)" }}>
                  Hudson Valley, New York — licensed & insured
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: SVG map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="relative"
          >
            <div
              className="relative"
              style={{ border: "1px solid rgba(201,168,76,0.1)", background: "#161616", padding: "2rem" }}
            >
              <svg
                viewBox="0 0 500 440"
                className="w-full"
                style={{ maxHeight: 400 }}
              >
                {/* County fills */}
                {COUNTIES.map((c, i) => (
                  <motion.path
                    key={c.id}
                    d={c.path}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
                    fill="rgba(201,168,76,0.06)"
                    stroke="rgba(201,168,76,0.3)"
                    strokeWidth={1}
                  />
                ))}

                {/* Hudson River */}
                <path
                  d="M 245,30 Q 248,100 250,160 Q 252,240 248,320 Q 246,370 250,430"
                  fill="none"
                  stroke="rgba(100,140,200,0.25)"
                  strokeWidth={6}
                  strokeLinecap="round"
                />

                {/* Pulse dots */}
                {PULSE_POSITIONS.map((p, i) => (
                  <g key={p.id}>
                    {/* Outer pulse ring */}
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={10}
                      fill="none"
                      stroke="rgba(201,168,76,0.5)"
                      strokeWidth={1}
                      style={{
                        transformOrigin: `${p.cx}px ${p.cy}px`,
                        animation: `pulse-ring 2s ease-out ${i * 0.3}s infinite`,
                      }}
                    />
                    {/* Inner dot */}
                    <circle
                      cx={p.cx}
                      cy={p.cy}
                      r={4}
                      fill="#c9a84c"
                    />
                  </g>
                ))}

                {/* County labels */}
                {COUNTIES.map((c) => (
                  <text
                    key={`${c.id}-label`}
                    x={c.cx}
                    y={c.cy + 22}
                    textAnchor="middle"
                    fontSize={9}
                    fill="rgba(245,240,232,0.4)"
                    fontFamily="var(--font-sans)"
                    letterSpacing={1}
                    textDecoration="none"
                  >
                    {c.name.toUpperCase()}
                  </text>
                ))}

                {/* Hudson River label */}
                <text
                  x={258}
                  y={230}
                  fontSize={8}
                  fill="rgba(100,140,200,0.4)"
                  fontFamily="var(--font-sans)"
                  transform="rotate(-90, 258, 230)"
                >
                  HUDSON RIVER
                </text>
              </svg>

              {/* Corner accent */}
              <div
                className="absolute top-4 right-4 text-right"
              >
                <div
                  className="text-[10px] tracking-[0.2em] uppercase"
                  style={{ color: "rgba(201,168,76,0.5)", fontFamily: "var(--font-sans)" }}
                >
                  Service Territory
                </div>
                <div
                  className="text-xs font-semibold mt-0.5"
                  style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-sans)" }}
                >
                  Hudson Valley, NY
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-ring {
          0%   { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(2.4); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
