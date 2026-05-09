"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  IconAdjustmentsHorizontal,
  IconCertificate,
  IconBulb,
  IconFlame,
  IconLayoutSidebarRightCollapse,
  IconBrandAmazon,
  IconBolt,
  IconShieldCheck,
  IconCalendarTime,
  IconPalette,
} from "@tabler/icons-react";

const FEATURES = [
  {
    Icon: IconAdjustmentsHorizontal,
    title: "Motorized Adjustable Louvers",
    desc: "170° pivot range. Open, close, or angle to any position instantly — via app, remote, or voice.",
  },
  {
    Icon: IconCertificate,
    title: "ICC Certified",
    desc: "The only motorized louvered pergola brand to earn ICC structural certification. Built to code, nationwide.",
  },
  {
    Icon: IconBulb,
    title: "Integrated LED Lighting",
    desc: "Recessed LED strips built into every beam — color tunable, dimmable, and controllable from your phone.",
  },
  {
    Icon: IconFlame,
    title: "Built-in Heating & Fans",
    desc: "Optional infrared heaters and ceiling fans mount directly into the frame. No visible hardware.",
  },
  {
    Icon: IconLayoutSidebarRightCollapse,
    title: "Motorized Privacy Screens",
    desc: "Retractable screens on any side. Create a fully enclosed outdoor room in seconds.",
  },
  {
    Icon: IconBrandAmazon,
    title: "Smart App + Alexa Control",
    desc: "Native iOS/Android app. Works with Alexa, Google Home, and SmartThings for full voice and automation.",
  },
  {
    Icon: IconBolt,
    title: "Aircraft-Grade Aluminum",
    desc: "6061-T6 extruded aluminum frame. Engineered for 165 mph winds and 28 lb/ft² snow loads.",
  },
  {
    Icon: IconShieldCheck,
    title: "Lifetime Transferable Warranty",
    desc: "The frame is covered for life — and the warranty transfers to the next owner if you sell your home.",
  },
  {
    Icon: IconCalendarTime,
    title: "4–8 Week Custom Manufacturing",
    desc: "Every pergola is custom fabricated to your exact dimensions. Lead time is 4–8 weeks from deposit.",
  },
  {
    Icon: IconPalette,
    title: "6+ Colors + Woodgrain",
    desc: "Standard powder-coat colors plus realistic woodgrain finishes — no painting, no peeling, no maintenance.",
  },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="features"
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
          className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-end"
        >
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#c9a84c" }} />
              <span
                className="text-xs font-semibold tracking-[0.3em] uppercase"
                style={{ color: "#c9a84c", fontFamily: "var(--font-sans)" }}
              >
                Features & Technology
              </span>
            </div>
            <h2
              className="text-5xl lg:text-6xl leading-tight"
              style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", fontWeight: 700 }}
            >
              Every detail.
              <br />
              <span className="gold-text">Engineered in.</span>
            </h2>
          </div>
          <p
            className="text-base leading-relaxed"
            style={{ color: "rgba(245,240,232,0.55)", fontFamily: "var(--font-sans)" }}
          >
            StruXure didn&apos;t bolt technology onto a shade structure. They built a smart
            outdoor system from the ground up — and we install every one of them across
            the Hudson Valley.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-px"
          style={{ border: "1px solid rgba(201,168,76,0.1)", background: "rgba(201,168,76,0.1)" }}
        >
          {FEATURES.map(({ Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: Math.floor(i / 5) * 0.1 + (i % 5) * 0.06 }}
              className="group p-8 flex flex-col gap-5 transition-all duration-300"
              style={{ background: "#1a1a1a" }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#202020"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a1a1a"; }}
            >
              <div
                className="w-12 h-12 flex items-center justify-center"
                style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)" }}
              >
                <Icon size={22} stroke={1.4} style={{ color: "#c9a84c" }} />
              </div>

              <div>
                <h3
                  className="text-sm font-semibold mb-2 leading-snug"
                  style={{ color: "#f5f0e8", fontFamily: "var(--font-sans)", letterSpacing: "0.01em" }}
                >
                  {title}
                </h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "rgba(245,240,232,0.45)", fontFamily: "var(--font-sans)" }}
                >
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 p-8"
          style={{ border: "1px solid rgba(201,168,76,0.12)", background: "#1e1e1e" }}
        >
          <div>
            <p
              className="text-xl font-semibold mb-1"
              style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)" }}
            >
              Ready to spec your pergola?
            </p>
            <p className="text-sm" style={{ color: "rgba(245,240,232,0.45)", fontFamily: "var(--font-sans)" }}>
              We design, supply, and install — completely turnkey across the Hudson Valley.
            </p>
          </div>
          <button
            onClick={() => document.querySelector("#quote")?.scrollIntoView({ behavior: "smooth" })}
            className="btn-gold whitespace-nowrap"
          >
            Start Your Project
          </button>
        </motion.div>
      </div>
    </section>
  );
}
