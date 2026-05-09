"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "framer-motion";

/* ── Illustrated CSS scenes ── */
function BeforeScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #a8c4e0 0%, #c9dff0 40%, #d9e8f4 60%, #e8d4c0 80%, #d4b898 100%)" }} />
      {/* Clouds */}
      <div className="absolute" style={{ top: "10%", left: "15%", width: 80, height: 28, borderRadius: 50, background: "rgba(255,255,255,0.7)", filter: "blur(4px)" }} />
      <div className="absolute" style={{ top: "14%", left: "22%", width: 120, height: 22, borderRadius: 50, background: "rgba(255,255,255,0.6)", filter: "blur(3px)" }} />
      <div className="absolute" style={{ top: "8%", right: "20%", width: 90, height: 26, borderRadius: 50, background: "rgba(255,255,255,0.65)", filter: "blur(4px)" }} />
      {/* Ground/lawn */}
      <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: "35%", background: "linear-gradient(180deg, #8aaa74 0%, #7a9a64 100%)" }} />
      {/* Patio slab */}
      <div className="absolute" style={{ bottom: "28%", left: "15%", right: "15%", height: "22%", background: "linear-gradient(180deg, #c4b4a0 0%, #b8a898 100%)", borderTop: "2px solid #d4c4b0" }} />
      {/* Patio grid lines */}
      {[0.25, 0.5, 0.75].map(t => (
        <div key={t} className="absolute" style={{ bottom: "28%", left: `${15 + t * 70}%`, width: 1, height: "22%", background: "rgba(0,0,0,0.08)" }} />
      ))}
      {[0.33, 0.66].map(t => (
        <div key={t} className="absolute" style={{ bottom: `${28 + t * 22}%`, left: "15%", right: "15%", height: 1, background: "rgba(0,0,0,0.08)" }} />
      ))}
      {/* Simple outdoor furniture */}
      <div className="absolute" style={{ bottom: "46%", left: "38%", width: "24%", height: "6%", background: "#8a7060", borderRadius: 3 }} />
      <div className="absolute" style={{ bottom: "38%", left: "40%", width: "20%", height: "10%", background: "#7a6050", borderRadius: 4 }} />
      {/* Label */}
      <div className="absolute top-6 left-6 px-3 py-1.5" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
        <span className="text-xs tracking-widest uppercase" style={{ color: "#f5f0e8", fontFamily: "var(--font-sans)" }}>Before</span>
      </div>
    </div>
  );
}

function AfterScene() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky — evening/dusk */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #0d1018 0%, #1a1a2e 35%, #2a1a10 65%, #1a1208 100%)" }} />
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            top: `${Math.random() * 40}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() > 0.7 ? 2 : 1,
            height: Math.random() > 0.7 ? 2 : 1,
            background: "white",
            opacity: Math.random() * 0.6 + 0.3,
          }}
        />
      ))}
      {/* Ground */}
      <div className="absolute" style={{ bottom: 0, left: 0, right: 0, height: "32%", background: "linear-gradient(180deg, #1a1a10 0%, #0e0e08 100%)" }} />
      {/* Deck */}
      <div className="absolute" style={{ bottom: "25%", left: "5%", right: "5%", height: "20%", background: "linear-gradient(180deg, #282018 0%, #1e1810 100%)" }} />
      {/* Deck planks */}
      {[0.2, 0.4, 0.6, 0.8].map(t => (
        <div key={t} className="absolute" style={{ bottom: "25%", left: `${5 + t * 90}%`, width: 1, height: "20%", background: "rgba(201,168,76,0.06)" }} />
      ))}

      {/* Pergola posts */}
      {[15, 82].map(x => (
        <div key={x} className="absolute" style={{ bottom: "25%", left: `${x}%`, width: "2%", height: "52%", background: "#1e1c18", borderLeft: "1px solid rgba(201,168,76,0.1)" }} />
      ))}

      {/* Pergola top beams (closed louvers look) */}
      <div className="absolute" style={{ bottom: "74%", left: "15%", right: "18%", height: "3%", background: "#1e1c18", borderBottom: "1px solid rgba(201,168,76,0.12)" }} />
      {/* Louver strips */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            bottom: `${62 + i * 1.5}%`,
            left: "15%",
            right: "18%",
            height: "0.8%",
            background: `rgba(40,36,30,${0.9 - i * 0.02})`,
            borderBottom: "1px solid rgba(201,168,76,0.05)",
          }}
        />
      ))}

      {/* LED strip glow */}
      <div className="absolute" style={{ bottom: "74%", left: "15%", right: "18%", height: "1px", background: "rgba(201,168,76,0.6)", boxShadow: "0 0 12px 4px rgba(201,168,76,0.3)" }} />
      <div className="absolute" style={{ bottom: "62%", left: "15%", right: "18%", height: "1px", background: "rgba(201,168,76,0.4)", boxShadow: "0 0 8px 3px rgba(201,168,76,0.2)" }} />

      {/* String lights */}
      {[20, 36, 52, 68].map(x => (
        <div key={x} className="absolute" style={{ bottom: "70%", left: `${x}%` }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ffe080", boxShadow: "0 0 10px 5px rgba(255,220,80,0.5)" }} />
        </div>
      ))}

      {/* Furniture under pergola */}
      <div className="absolute" style={{ bottom: "34%", left: "32%", width: "36%", height: "5%", background: "#2a2018", borderRadius: 3 }} />
      {/* Chairs */}
      <div className="absolute" style={{ bottom: "26%", left: "30%", width: "14%", height: "10%", background: "#222018", borderRadius: 4, border: "1px solid rgba(201,168,76,0.1)" }} />
      <div className="absolute" style={{ bottom: "26%", right: "28%", width: "14%", height: "10%", background: "#222018", borderRadius: 4, border: "1px solid rgba(201,168,76,0.1)" }} />

      {/* Ambient floor glow */}
      <div className="absolute" style={{ bottom: "24%", left: "15%", right: "18%", height: "2%", background: "rgba(201,168,76,0.04)", filter: "blur(8px)" }} />

      {/* Label */}
      <div className="absolute top-6 right-6 px-3 py-1.5" style={{ background: "rgba(201,168,76,0.15)", border: "1px solid rgba(201,168,76,0.3)" }}>
        <span className="text-xs tracking-widest uppercase" style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}>After</span>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [split, setSplit] = useState(50);
  const dragging = useRef(false);

  const updateSplit = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = Math.min(Math.max(((clientX - rect.left) / rect.width) * 100, 5), 95);
    setSplit(pct);
  }, []);

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updateSplit(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    updateSplit(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMove = (e: MouseEvent) => { if (dragging.current) updateSplit(e.clientX); };
    const onUp = () => { dragging.current = false; };
    const onTouchMove = (e: TouchEvent) => { if (dragging.current) updateSplit(e.touches[0].clientX); };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onUp);
    };
  }, [updateSplit]);

  return (
    <section
      ref={ref}
      style={{ background: "#161616" }}
      className="py-28"
    >
      <div className="px-6 lg:px-10 max-w-7xl mx-auto mb-12">
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
              Before & After
            </span>
          </div>
          <h2
            className="text-5xl lg:text-6xl leading-tight"
            style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
          >
            The transformation
            <br />
            <span className="gold-text">is immediate.</span>
          </h2>
          <p
            className="mt-5 text-sm"
            style={{ color: "rgba(245,240,232,0.4)", fontFamily: "var(--font-sans)" }}
          >
            Drag the handle to compare — same space, before and after a StruXure installation.
          </p>
        </motion.div>
      </div>

      {/* Comparison slider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.9, delay: 0.3 }}
        ref={containerRef}
        className="relative overflow-hidden select-none"
        style={{ height: "clamp(380px, 55vw, 600px)", cursor: "ew-resize" }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        {/* After scene (full width base) */}
        <AfterScene />

        {/* Before scene (clipped on left) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - split}% 0 0)` }}
        >
          <BeforeScene />
        </div>

        {/* Handle */}
        <div
          className="absolute top-0 bottom-0 flex items-center justify-center"
          style={{
            left: `${split}%`,
            transform: "translateX(-50%)",
            width: 2,
            background: "rgba(201,168,76,0.8)",
            zIndex: 20,
            boxShadow: "0 0 20px rgba(201,168,76,0.3)",
          }}
        >
          {/* Handle circle */}
          <div
            className="absolute flex items-center justify-center"
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#c9a84c",
              boxShadow: "0 0 20px rgba(201,168,76,0.5)",
            }}
          >
            <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
              <path d="M5 7 L1 3 M5 7 L1 11" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M15 7 L19 3 M15 7 L19 11" stroke="#1a1a1a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
