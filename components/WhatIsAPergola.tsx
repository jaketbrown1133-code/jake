"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const cards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round">
        <rect x="4" y="14" width="24" height="4" rx="1" />
        <rect x="4" y="7"  width="24" height="4" rx="1" />
        <rect x="4" y="21" width="24" height="4" rx="1" />
        <path d="M28 10 L28 22" strokeWidth="0.5" strokeDasharray="2 2" />
        <path d="M4 10 L4 22"  strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>
    ),
    title: "Motorized Louvers",
    desc: "Open, close, or angle your roof with a tap. Full sun to full shade in seconds — from your phone, a remote, or your voice.",
    tag: "170° pivot range",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round">
        <path d="M16 4 L28 10 L28 22 L16 28 L4 22 L4 10 Z" />
        <path d="M16 4 L16 28" strokeDasharray="2 2" strokeWidth="0.8" />
        <path d="M4 16 L28 16" strokeDasharray="2 2" strokeWidth="0.8" />
        <circle cx="16" cy="16" r="3" />
      </svg>
    ),
    title: "All-Weather Protection",
    desc: "Built for Northeast winters. Rated for 165 mph winds and heavy snow loads. ICC certified — the only pergola brand to earn it.",
    tag: "ICC Certified",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" stroke="#c9a84c" strokeWidth="1.4" strokeLinecap="round">
        <rect x="8" y="6" width="10" height="16" rx="2" />
        <path d="M12 22 L12 26" />
        <path d="M14 5 Q18 8 18 12 Q18 16 22 18" />
        <circle cx="23" cy="19" r="2" />
        <path d="M18 10 Q22 12 22 16" strokeDasharray="1.5 2" />
      </svg>
    ),
    title: "Smart Home Integration",
    desc: "Control via app, voice command, or automatic weather sensors. Works with Alexa, Google Home, and SmartThings.",
    tag: "App + voice control",
  },
];

export default function WhatIsAPergola() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="what-is"
      ref={ref}
      className="py-28 px-6 lg:px-10"
      style={{ background: "#1a1a1a" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
            >
              What Is a Smart Pergola?
            </span>
          </div>
          <h2
            className="text-5xl lg:text-6xl leading-tight"
            style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            Not just shade.
            <br />
            An{" "}
            <span className="gold-text">outdoor system.</span>
          </h2>
          <p
            className="mt-6 text-lg leading-relaxed"
            style={{ color: "rgba(245,240,232,0.6)", fontFamily: "var(--font-sans)" }}
          >
            The Pergola X by StruXure is the only motorized louvered pergola that thinks
            for itself — and the only one certified by the ICC to handle everything the
            Northeast can throw at it.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 * i + 0.2 }}
              className="luxury-card rounded-none p-10 flex flex-col gap-7"
              style={{ borderLeft: "1px solid rgba(201,168,76,0.12)", borderTop: "none", borderRight: "none", borderBottom: "none", background: "#1e1e1e" }}
            >
              {/* Icon */}
              <div
                className="w-16 h-16 flex items-center justify-center"
                style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)" }}
              >
                {card.icon}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3
                  className="text-2xl mb-4"
                  style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 600 }}
                >
                  {card.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.58)", fontFamily: "var(--font-sans)" }}
                >
                  {card.desc}
                </p>
              </div>

              {/* Tag */}
              <div
                className="inline-flex items-center gap-2 self-start px-3 py-1"
                style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.05)" }}
              >
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c9a84c" }} />
                <span
                  className="text-xs tracking-wider"
                  style={{ color: "#c9a84c", fontFamily: "var(--font-sans)", letterSpacing: "0.1em" }}
                >
                  {card.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 flex items-center gap-4"
        >
          <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.12)" }} />
          <span
            className="text-xs tracking-[0.25em] uppercase whitespace-nowrap"
            style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-sans)" }}
          >
            Pergola X by StruXure — the only ICC-certified motorized louvered pergola
          </span>
          <div className="flex-1 h-px" style={{ background: "rgba(201,168,76,0.12)" }} />
        </motion.div>
      </div>
    </section>
  );
}
