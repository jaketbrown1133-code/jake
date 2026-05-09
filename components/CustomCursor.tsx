"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      animId = requestAnimationFrame(animate);
    };

    const onDown = () => ring.style.transform += " scale(0.75)";
    const onUp = () => {};

    const onEnterInteractive = () => {
      ring.style.width = "44px";
      ring.style.height = "44px";
      ring.style.borderColor = "#e8c96a";
    };
    const onLeaveInteractive = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "rgba(201,168,76,0.7)";
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    animId = requestAnimationFrame(animate);

    const interactives = document.querySelectorAll("a, button, input, textarea, select, [data-cursor]");
    interactives.forEach(el => {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    });

    const observer = new MutationObserver(() => {
      const all = document.querySelectorAll("a, button, input, textarea, select, [data-cursor]");
      all.forEach(el => {
        el.removeEventListener("mouseenter", onEnterInteractive);
        el.removeEventListener("mouseleave", onLeaveInteractive);
        el.addEventListener("mouseenter", onEnterInteractive);
        el.addEventListener("mouseleave", onLeaveInteractive);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: "#c9a84c",
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          border: "1px solid rgba(201,168,76,0.7)",
          top: 0,
          left: 0,
          willChange: "transform",
          transition: "width 0.2s, height 0.2s, border-color 0.2s",
        }}
      />
    </>
  );
}
