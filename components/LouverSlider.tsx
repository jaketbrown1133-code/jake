"use client";

import { useState } from "react";

export default function LouverSlider() {
  const [angle, setAngle] = useState(45);

  // Map 0–100 to 0–80 degrees visual tilt
  const tilt = (angle / 100) * 80;
  // Opacity of sky/light showing through
  const openness = angle / 100;

  const louvers = Array.from({ length: 7 });

  const angleLabel =
    angle < 10 ? "Fully Closed" :
    angle < 35 ? "Partially Closed" :
    angle < 65 ? "Half Open" :
    angle < 90 ? "Mostly Open" : "Fully Open";

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Pergola SVG preview */}
      <div
        className="relative rounded-xl overflow-hidden mb-8"
        style={{
          background: "linear-gradient(180deg, #080810 0%, #0d0e18 100%)",
          border: "1px solid rgba(0,229,204,0.12)",
          minHeight: 260,
        }}
      >
        {/* Sky through louvers */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            opacity: openness * 0.35,
            background: "linear-gradient(180deg, rgba(0,229,204,0.15) 0%, rgba(59,130,246,0.1) 100%)",
          }}
        />

        {/* LED ambient glow */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 transition-opacity duration-500"
          style={{
            opacity: 0.6,
            background: `linear-gradient(180deg, transparent, rgba(168,85,247,${0.1 + (1 - openness) * 0.3}))`,
          }}
        />

        {/* Pergola frame */}
        <svg viewBox="0 0 600 280" className="w-full h-full" style={{ minHeight: 260 }}>
          {/* Top beam */}
          <rect x="20" y="30" width="560" height="12" rx="4" fill="#1a1b26" />
          <rect x="20" y="30" width="560" height="2" rx="1" fill="url(#beamGrad)" opacity="0.8" />

          {/* Bottom rail */}
          <rect x="20" y="250" width="560" height="10" rx="4" fill="#1a1b26" />

          {/* Left column */}
          <rect x="20" y="30" width="12" height="230" rx="4" fill="#1a1b26" />
          {/* LED strip on column */}
          <rect x="29" y="30" width="3" height="230" rx="1" fill="url(#colGrad)" opacity="0.7" />

          {/* Right column */}
          <rect x="568" y="30" width="12" height="230" rx="4" fill="#1a1b26" />
          <rect x="568" y="30" width="3" height="230" rx="1" fill="url(#colGrad)" opacity="0.7" />

          {/* Louver slats — perspective view */}
          {louvers.map((_, i) => {
            const y = 50 + i * 28;
            const slatH = Math.max(2, 22 * Math.cos((tilt * Math.PI) / 180));
            const opacity = 0.55 + i * 0.04;
            return (
              <g key={i}>
                <rect
                  x="32"
                  y={y}
                  width="536"
                  height={slatH}
                  rx="2"
                  fill="#1e2030"
                  opacity={opacity}
                  style={{ transition: "all 0.4s ease" }}
                />
                {/* LED underlight — visible when open */}
                <rect
                  x="32"
                  y={y + slatH - 1}
                  width="536"
                  height="1.5"
                  rx="0.5"
                  fill="url(#slatGrad)"
                  opacity={openness * 0.8 + 0.1}
                  style={{ transition: "all 0.4s ease" }}
                />
              </g>
            );
          })}

          {/* Angle indicator */}
          <text x="300" y="270" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)" fontFamily="system-ui">
            {angleLabel}
          </text>

          <defs>
            <linearGradient id="beamGrad" x1="0" y1="0" x2="560" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#00e5cc" />
              <stop offset="50%"  stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="colGrad" x1="0" y1="0" x2="0" y2="230" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#00e5cc" />
              <stop offset="50%"  stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <linearGradient id="slatGrad" x1="0" y1="0" x2="536" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%"   stopColor="#00e5cc" />
              <stop offset="50%"  stopColor="#a855f7" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Slider control */}
      <div className="px-2">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Louver Angle</span>
          <span className="text-sm font-semibold led-text">{angleLabel}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-gray-600">Closed</span>
          <input
            type="range"
            min={0}
            max={100}
            value={angle}
            onChange={(e) => setAngle(Number(e.target.value))}
            className="flex-1"
            aria-label="Louver angle"
          />
          <span className="text-xs text-gray-600">Open</span>
        </div>
        <p className="mt-4 text-center text-xs text-gray-600">
          Drag the slider to adjust louver angle · App &amp; remote controlled
        </p>
      </div>
    </div>
  );
}
