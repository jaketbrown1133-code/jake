"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const TESTIMONIALS = [
  {
    stars: 5,
    quote: "We had a screened porch for years but it felt dated and dark. The StruXure pergola Undercover Outdoors installed changed everything — we open the louvers for morning light, close them during afternoon heat, and then light up the LEDs for evening gatherings. We live out there now. Worth every penny.",
    name: "Sarah M.",
    location: "Rhinebeck, NY",
    detail: "Residential · Backyard dining pergola · Dutchess County",
  },
  {
    stars: 5,
    quote: "As a restaurant owner, I needed outdoor seating that looked premium and stayed open in unpredictable weather. Undercover Outdoors delivered a commercial installation that met code, looked beautiful, and has let us serve guests through rain that would have shut us down before. Our outdoor revenue is up 40% year over year.",
    name: "Marco D.",
    location: "Kingston, NY",
    detail: "Commercial · Restaurant patio · Ulster County",
  },
  {
    stars: 5,
    quote: "The installation crew was professional, respectful of our property, and finished in one day. The product itself is exceptional — the aluminum finish looks architectural, not like a backyard product. Our StruXure pergola has genuinely increased our home's market value. The lifetime transferable warranty sealed the deal.",
    name: "Jennifer & Tom R.",
    location: "Warwick, NY",
    detail: "Residential · Pool-adjacent shade structure · Orange County",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="#c9a84c">
          <path d="M7 1 L8.6 5.4 L13 5.9 L9.7 9 L10.7 13.2 L7 11 L3.3 13.2 L4.3 9 L1 5.9 L5.4 5.4 Z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const go = (next: number) => {
    setDir(next > active ? 1 : -1);
    setActive(next);
  };

  const prev = () => go((active - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const next = () => go((active + 1) % TESTIMONIALS.length);

  return (
    <section
      ref={ref}
      style={{ background: "#1a1a1a" }}
      className="py-28 px-6 lg:px-10"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col lg:flex-row lg:items-end justify-between gap-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
              >
                Client Stories
              </span>
            </div>
            <h2
              className="text-5xl lg:text-6xl leading-tight"
              style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
            >
              Heard from the
              <br />
              <span className="gold-text">Hudson Valley.</span>
            </h2>
          </div>

          {/* Nav buttons */}
          <div className="flex gap-3">
            <button
              onClick={prev}
              className="w-12 h-12 flex items-center justify-center transition-all"
              style={{ border: "1px solid rgba(201,168,76,0.25)", background: "transparent", color: "#c9a84c" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M10 3 L5 8 L10 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={next}
              className="w-12 h-12 flex items-center justify-center transition-all"
              style={{ border: "1px solid rgba(201,168,76,0.25)", background: "transparent", color: "#c9a84c" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(201,168,76,0.08)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
                <path d="M6 3 L11 8 L6 13" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative overflow-hidden"
          style={{ minHeight: 340 }}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              className="p-10 lg:p-14"
              style={{
                background: "#1e1e1e",
                border: "1px solid rgba(201,168,76,0.12)",
              }}
            >
              <Stars count={TESTIMONIALS[active].stars} />

              <blockquote
                className="mt-8 text-xl lg:text-2xl leading-relaxed"
                style={{
                  color: "#f5f0e8",
                  fontFamily: "var(--font-serif)",
                  fontWeight: 400,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{TESTIMONIALS[active].quote}&rdquo;
              </blockquote>

              <div className="mt-10 flex items-center gap-4">
                {/* Avatar initials */}
                <div
                  className="w-12 h-12 flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.1)", border: "1px solid rgba(201,168,76,0.2)" }}
                >
                  <span
                    className="text-sm font-bold"
                    style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
                  >
                    {TESTIMONIALS[active].name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>

                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: "#f5f0e8", fontFamily: "var(--font-sans)" }}
                  >
                    {TESTIMONIALS[active].name}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
                  >
                    {TESTIMONIALS[active].location}
                  </p>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-sans)" }}
                  >
                    {TESTIMONIALS[active].detail}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className="rounded-full transition-all"
              style={{
                width: i === active ? 20 : 8,
                height: 8,
                background: i === active ? "#c9a84c" : "rgba(201,168,76,0.25)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
