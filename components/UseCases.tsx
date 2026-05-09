"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const CASES = [
  {
    num: "01",
    title: "The Weekend Host",
    subtitle: "Dining & Entertaining",
    desc: "Host dinners, brunches, and celebrations year-round. Louvers close in seconds when weather turns — your guests never need to move inside. Integrated lighting sets the mood automatically at sunset.",
    grad: "linear-gradient(135deg, #1c1206 0%, #261a08 60%, #1a1408 100%)",
    accent: "#c9a84c",
  },
  {
    num: "02",
    title: "The Home Office Escape",
    subtitle: "Shaded Outdoor Workspace",
    desc: "Angle the louvers to eliminate screen glare while letting in fresh air. Integrated power keeps your devices charged. Work outside without the heat or exposure of a traditional patio.",
    grad: "linear-gradient(135deg, #0c1318 0%, #101c22 60%, #0a1016 100%)",
    accent: "#6bbfd4",
  },
  {
    num: "03",
    title: "The Pool Companion",
    subtitle: "Automated Poolside Shade",
    desc: "Rotate louvers to the exact angle that blocks afternoon sun from your loungers. Open fully by morning for breakfast. Salt-air resistant aluminum — built for proximity to pools and coastal air.",
    grad: "linear-gradient(135deg, #081420 0%, #0c1c2e 60%, #081018 100%)",
    accent: "#3b8fd4",
  },
  {
    num: "04",
    title: "The Restaurant Owner",
    subtitle: "Commercial Outdoor Seating",
    desc: "Expand your dining capacity with a covered patio that stays open in light rain. StruXure pergolas meet commercial building codes and are ICC certified — ready for restaurant and hospitality installs.",
    grad: "linear-gradient(135deg, #100c1a 0%, #18102a 60%, #100c1c 100%)",
    accent: "#9b6dd4",
  },
  {
    num: "05",
    title: "The Year-Round Sanctuary",
    subtitle: "All-Season Outdoor Living",
    desc: "Add motorized privacy screens, infrared heaters, and integrated fans. Sealed against wind, rain, and snow. In the Hudson Valley, that means 12 months of outdoor living — not just five.",
    grad: "linear-gradient(135deg, #0e1408 0%, #161e0c 60%, #0c1008 100%)",
    accent: "#6bc47a",
  },
];

export default function UseCases() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      style={{ background: "#161616" }}
      className="py-28"
    >
      <div className="px-6 lg:px-10 max-w-7xl mx-auto mb-14">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
            >
              Use Cases
            </span>
          </div>
          <h2
            className="text-5xl lg:text-6xl leading-tight"
            style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            One structure.
            <br />
            <span className="gold-text">Infinite possibilities.</span>
          </h2>
        </motion.div>
      </div>

      {/* Horizontal scroll container */}
      <div
        className="flex gap-5 overflow-x-auto no-scrollbar pb-8 px-6 lg:px-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {CASES.map((c, i) => (
          <motion.div
            key={c.num}
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: i * 0.12 }}
            className="relative flex-none overflow-hidden"
            style={{
              width: "clamp(280px, 38vw, 420px)",
              minHeight: 520,
              background: c.grad,
              border: "1px solid rgba(255,255,255,0.06)",
              scrollSnapAlign: "start",
            }}
          >
            {/* Ken Burns gradient layer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: c.grad,
                animation: "ken-burns 25s ease-in-out infinite alternate",
                transformOrigin: "center center",
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-10 flex flex-col justify-between h-full" style={{ minHeight: 520 }}>
              {/* Number */}
              <div
                className="text-7xl font-bold leading-none mb-8"
                style={{
                  color: c.accent,
                  fontFamily: "var(--font-serif)",
                  opacity: 0.25,
                }}
              >
                {c.num}
              </div>

              <div className="flex-1 flex flex-col justify-end">
                {/* Subtitle */}
                <div
                  className="text-xs tracking-[0.25em] uppercase mb-3"
                  style={{ color: c.accent, fontFamily: "var(--font-sans)" }}
                >
                  {c.subtitle}
                </div>

                {/* Title */}
                <h3
                  className="text-3xl mb-5"
                  style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 600 }}
                >
                  {c.title}
                </h3>

                {/* Divider */}
                <div className="w-8 h-px mb-5" style={{ background: c.accent, opacity: 0.5 }} />

                {/* Desc */}
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-sans)" }}
                >
                  {c.desc}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="px-6 lg:px-10 mt-6 flex items-center gap-3">
        <div className="flex gap-1">
          {CASES.map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all"
              style={{ width: i === 0 ? 16 : 6, height: 6, background: i === 0 ? "#c9a84c" : "rgba(201,168,76,0.25)" }}
            />
          ))}
        </div>
        <span
          className="text-[10px] tracking-wider ml-2"
          style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-sans)" }}
        >
          Scroll to explore
        </span>
      </div>
    </section>
  );
}
