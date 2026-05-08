"use client";

import { useState } from "react";

const filters = ["All", "Small", "Medium", "Large", "Modern", "Traditional"];

const projects = [
  {
    id: 1,
    title: "Brooklyn Rooftop Oasis",
    location: "Brooklyn, NY",
    size: "Large",
    style: "Modern",
    dims: "20×24 ft",
    color: "Matte Black",
    accent: "#00e5cc",
    gradient: "from-teal-900/30 to-black",
  },
  {
    id: 2,
    title: "Long Island Backyard",
    location: "Long Island, NY",
    size: "Medium",
    style: "Traditional",
    dims: "14×18 ft",
    color: "Sandstone White",
    accent: "#a855f7",
    gradient: "from-purple-900/30 to-black",
  },
  {
    id: 3,
    title: "Manhattan Penthouse",
    location: "Manhattan, NY",
    size: "Small",
    style: "Modern",
    dims: "10×12 ft",
    color: "Gunmetal Grey",
    accent: "#3b82f6",
    gradient: "from-blue-900/30 to-black",
  },
  {
    id: 4,
    title: "Westchester Estate",
    location: "Westchester, NY",
    size: "Large",
    style: "Traditional",
    dims: "22×28 ft",
    color: "Matte Black",
    accent: "#00e5cc",
    gradient: "from-teal-900/30 to-black",
  },
  {
    id: 5,
    title: "Queens Patio Upgrade",
    location: "Queens, NY",
    size: "Medium",
    style: "Modern",
    dims: "12×16 ft",
    color: "Sandstone White",
    accent: "#a855f7",
    gradient: "from-purple-900/30 to-black",
  },
  {
    id: 6,
    title: "Staten Island Pool Deck",
    location: "Staten Island, NY",
    size: "Large",
    style: "Modern",
    dims: "18×22 ft",
    color: "Gunmetal Grey",
    accent: "#3b82f6",
    gradient: "from-blue-900/30 to-black",
  },
  {
    id: 7,
    title: "Hamptons Beach House",
    location: "Hamptons, NY",
    size: "Large",
    style: "Traditional",
    dims: "24×30 ft",
    color: "Driftwood Beige",
    accent: "#00e5cc",
    gradient: "from-teal-900/30 to-black",
  },
  {
    id: 8,
    title: "Bronx Urban Retreat",
    location: "Bronx, NY",
    size: "Small",
    style: "Modern",
    dims: "10×14 ft",
    color: "Matte Black",
    accent: "#a855f7",
    gradient: "from-purple-900/30 to-black",
  },
  {
    id: 9,
    title: "Nassau County Villa",
    location: "Nassau County, NY",
    size: "Medium",
    style: "Traditional",
    dims: "16×20 ft",
    color: "Ivory White",
    accent: "#3b82f6",
    gradient: "from-blue-900/30 to-black",
  },
];

export default function GalleryPage() {
  const [active, setActive] = useState("All");

  const filtered = projects.filter(
    (p) =>
      active === "All" ||
      p.size === active ||
      p.style === active
  );

  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-16 px-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,229,204,0.06) 0%, transparent 70%), #050608",
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#00e5cc" }}>
          Our Work
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-3 mb-4">
          Project <span className="led-text">Gallery</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Every pergola is custom-built for the space. Browse our installed projects across New York and find your inspiration.
        </p>
      </section>

      {/* Filters */}
      <div className="sticky top-[67px] z-30 px-4 py-4" style={{ background: "rgba(5,6,8,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="max-w-6xl mx-auto flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
              style={{
                background: active === f ? "linear-gradient(90deg,#00e5cc,#a855f7,#3b82f6)" : "rgba(255,255,255,0.05)",
                color: active === f ? "#000" : "#888",
                border: active === f ? "none" : "1px solid rgba(255,255,255,0.08)",
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="glow-card rounded-xl overflow-hidden group"
              style={{ background: "#0d0e14" }}
            >
              {/* Placeholder image area */}
              <div
                className={`relative h-52 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
              >
                {/* Pergola illustration */}
                <svg viewBox="0 0 280 180" className="w-4/5 h-4/5 opacity-60 group-hover:opacity-80 transition-opacity">
                  <rect x="0" y="0" width="280" height="8" rx="3" fill={project.accent} opacity="0.6" />
                  {[20, 48, 76, 104, 132].map((y, i) => (
                    <rect key={i} x="10" y={y} width="260" height="14" rx="3" fill={project.accent} opacity={0.2 + i * 0.08} />
                  ))}
                  <rect x="0"   y="0" width="8" height="180" rx="3" fill="#1a1b26" />
                  <rect x="272" y="0" width="8" height="180" rx="3" fill="#1a1b26" />
                  <rect x="8"   y="0" width="2" height="180" fill={project.accent} opacity="0.4" />
                  <rect x="272" y="0" width="2" height="180" fill={project.accent} opacity="0.4" />
                </svg>

                {/* Overlay badges */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold uppercase"
                    style={{ background: "rgba(0,0,0,0.7)", color: project.accent, border: `1px solid ${project.accent}40` }}
                  >
                    {project.size}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-semibold uppercase"
                    style={{ background: "rgba(0,0,0,0.7)", color: "#888" }}
                  >
                    {project.style}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="text-base font-bold text-white mb-1">{project.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{project.location}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-gray-600">Size</span>
                    <p className="text-gray-300 font-medium">{project.dims}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Color</span>
                    <p className="text-gray-300 font-medium">{project.color}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600">No projects match this filter.</div>
        )}
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Love What You See?
        </h2>
        <p className="text-gray-500 mb-8 text-sm">Let&apos;s design something custom for your space.</p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 rounded text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity"
        >
          Get a Free Quote →
        </a>
      </section>
    </>
  );
}
