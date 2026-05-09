"use client";

import dynamic from "next/dynamic";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

const InteractiveScene = dynamic(() => import("@/components/three/InteractiveScene"), {
  ssr: false,
  loading: () => (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{ background: "#0c0a08" }}
    >
      <div
        className="text-xs tracking-[0.25em] uppercase"
        style={{ color: "rgba(201,168,76,0.5)", fontFamily: "var(--font-sans)" }}
      >
        Loading 3D scene…
      </div>
    </div>
  ),
});

type SceneMode = "morning" | "afternoon" | "evening";

const MODES: { key: SceneMode; label: string; desc: string }[] = [
  { key: "morning", label: "Morning Coffee", desc: "Golden hour, soft warmth" },
  { key: "afternoon", label: "Afternoon Entertaining", desc: "Crisp overhead light" },
  { key: "evening", label: "Evening Ambiance", desc: "String lights, warm glow" },
];

const SPECS = [
  ["Product", "Pergola X"],
  ["Brand", "StruXure"],
  ["Frame", "Aircraft-grade aluminum"],
  ["Certified", "ICC structural"],
  ["Warranty", "Lifetime, transferable"],
  ["Louver pivot", "170°"],
];

export default function ImmersiveExperience() {
  const [louverAngle, setLouverAngle] = useState(0.3);
  const [mode, setMode] = useState<SceneMode>("afternoon");

  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-28 px-6 lg:px-10"
      style={{ background: "#111111" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
            >
              Interactive 3D Experience
            </span>
          </div>
          <h2
            className="text-5xl lg:text-6xl leading-tight"
            style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            Control every angle.
            <br />
            <span className="gold-text">From every device.</span>
          </h2>
          <p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-sans)" }}
          >
            Drag to rotate the camera. Use the slider to open or close the louvers.
            Switch between three real-world scenes to see how your pergola transforms throughout the day.
          </p>
        </motion.div>

        {/* Main layout: canvas + controls */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-6"
        >
          {/* Canvas */}
          <div
            className="relative rounded-none overflow-hidden"
            style={{
              height: 520,
              border: "1px solid rgba(201,168,76,0.15)",
              background: "#0c0a08",
            }}
          >
            <InteractiveScene louverAngle={louverAngle} mode={mode} />

            {/* Drag hint */}
            <div
              className="absolute bottom-4 left-4 flex items-center gap-2"
              style={{ pointerEvents: "none" }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="rgba(201,168,76,0.6)" strokeWidth="1.2">
                <circle cx="8" cy="8" r="6" />
                <path d="M5 8 L11 8M8 5 L8 11" />
              </svg>
              <span
                className="text-[10px] tracking-wider"
                style={{ color: "rgba(201,168,76,0.5)", fontFamily: "var(--font-sans)" }}
              >
                Drag to rotate · Scroll to zoom
              </span>
            </div>
          </div>

          {/* Controls panel */}
          <div className="flex flex-col gap-6">
            {/* Louver slider */}
            <div
              className="p-6"
              style={{ border: "1px solid rgba(201,168,76,0.12)", background: "#181818" }}
            >
              <div className="flex justify-between items-center mb-4">
                <span
                  className="text-xs font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "#f5f0e8", fontFamily: "var(--font-sans)" }}
                >
                  Louver Opening
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
                >
                  {Math.round(louverAngle * 100)}%
                </span>
              </div>

              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(louverAngle * 100)}
                onChange={(e) => setLouverAngle(Number(e.target.value) / 100)}
              />

              <div className="flex justify-between mt-2">
                <span className="text-[10px]" style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-sans)" }}>Closed</span>
                <span className="text-[10px]" style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-sans)" }}>Fully Open</span>
              </div>
            </div>

            {/* Scene mode */}
            <div
              className="p-6"
              style={{ border: "1px solid rgba(201,168,76,0.12)", background: "#181818" }}
            >
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
                style={{ color: "#f5f0e8", fontFamily: "var(--font-sans)" }}
              >
                Scene
              </span>
              <div className="flex flex-col gap-2">
                {MODES.map(({ key, label, desc }) => (
                  <button
                    key={key}
                    onClick={() => setMode(key)}
                    className="flex items-center gap-3 p-3 text-left transition-all"
                    style={{
                      border: `1px solid ${mode === key ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.1)"}`,
                      background: mode === key ? "rgba(201,168,76,0.08)" : "transparent",
                    }}
                  >
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ background: mode === key ? "#c9a84c" : "rgba(201,168,76,0.3)" }}
                    />
                    <div>
                      <div
                        className="text-xs font-semibold"
                        style={{ color: mode === key ? "#c9a84c" : "rgba(245,240,232,0.7)", fontFamily: "var(--font-sans)" }}
                      >
                        {label}
                      </div>
                      <div
                        className="text-[10px] mt-0.5"
                        style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-sans)" }}
                      >
                        {desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Specs */}
            <div
              className="p-6 flex-1"
              style={{ border: "1px solid rgba(201,168,76,0.12)", background: "#181818" }}
            >
              <span
                className="text-xs font-semibold tracking-[0.2em] uppercase block mb-4"
                style={{ color: "#f5f0e8", fontFamily: "var(--font-sans)" }}
              >
                Specifications
              </span>
              <dl className="space-y-2">
                {SPECS.map(([label, val]) => (
                  <div key={label} className="flex justify-between items-center">
                    <dt
                      className="text-[10px] tracking-wider"
                      style={{ color: "rgba(245,240,232,0.35)", fontFamily: "var(--font-sans)", textTransform: "uppercase" }}
                    >
                      {label}
                    </dt>
                    <dd
                      className="text-xs font-medium"
                      style={{ color: "rgba(245,240,232,0.75)", fontFamily: "var(--font-sans)" }}
                    >
                      {val}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
