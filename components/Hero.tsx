"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(ellipse 80% 60% at 60% 30%, rgba(201,168,76,0.08) 0%, rgba(201,168,76,0.03) 40%, transparent 70%), #100e0b",
      }}
    />
  ),
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const scrollToSection = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Three.js background — lazy loaded */}
      <HeroScene />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(16,14,11,0.75) 0%, rgba(16,14,11,0.35) 60%, transparent 100%), " +
            "linear-gradient(to top, rgba(16,14,11,0.8) 0%, transparent 40%)",
        }}
      />

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 w-full pt-24 pb-16"
      >
        <div className="max-w-2xl">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex items-center gap-3 mb-8"
          >
            <div
              className="w-8 h-px"
              style={{ background: "#c9a84c" }}
            />
            <span
              className="text-xs font-semibold tracking-[0.3em] uppercase"
              style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
            >
              Authorized StruXure Dealer · Hudson Valley, NY
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="text-6xl sm:text-7xl lg:text-8xl leading-[0.95] mb-8"
            style={{
              fontFamily: "var(--font-serif)",
              color: "#f5f0e8",
              textShadow: "0 2px 40px rgba(0,0,0,0.6)",
              fontWeight: 700,
            }}
          >
            Your outdoor
            <br />
            space,{" "}
            <em
              className="not-italic"
              style={{ color: "#c9a84c" }}
            >
              reimagined.
            </em>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg leading-relaxed mb-10 max-w-lg"
            style={{
              color: "rgba(245,240,232,0.72)",
              fontFamily: "var(--font-sans)",
              textShadow: "0 1px 12px rgba(0,0,0,0.5)",
            }}
          >
            The Pergola X by StruXure — motorized louvered pergolas engineered for
            all-season living. ICC certified, aircraft-grade aluminum, lifetime warranty.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => scrollToSection("#quote")}
              className="btn-gold"
            >
              Get a Free Quote
            </button>
            <button
              onClick={() => scrollToSection("#experience")}
              className="btn-ghost"
            >
              See It in Action
            </button>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-wrap gap-6 mt-12"
          >
            {[
              "ICC Certified",
              "165 mph Wind Rated",
              "Lifetime Warranty",
              "4–8 Week Lead Time",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <circle cx="7" cy="7" r="6" stroke="#c9a84c" strokeWidth="1" />
                  <path d="M4 7l2 2 4-4" stroke="#c9a84c" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span
                  className="text-xs tracking-wider"
                  style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-sans)", letterSpacing: "0.06em" }}
                >
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
        style={{ animation: "scroll-pulse 2s ease-in-out infinite" }}
      >
        <span
          className="text-[10px] tracking-[0.35em] uppercase"
          style={{ color: "rgba(201,168,76,0.5)", fontFamily: "var(--font-sans)" }}
        >
          Scroll
        </span>
        <svg width="1" height="40" viewBox="0 0 1 40">
          <line x1="0.5" y1="0" x2="0.5" y2="40" stroke="rgba(201,168,76,0.4)" strokeWidth="1" />
        </svg>
      </div>
    </section>
  );
}
