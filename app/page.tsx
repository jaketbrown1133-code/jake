import Link from "next/link";
import LouverSlider from "@/components/LouverSlider";
import PergolaDiagram from "@/components/PergolaDiagram";
import Reviews from "@/components/Reviews";

/* ─────────── Data ─────────── */
const stats = [
  { value: "120MPH", label: "Wind Rating", icon: "🌪" },
  { value: "360°",   label: "Louver Control", icon: "⚙" },
  { value: "3hr",    label: "Avg. Installation", icon: "⚡" },
  { value: "7",      label: "LED Modes", icon: "💡" },
];

const features = [
  { icon: "⚡", title: "Silent Motors",        desc: "Ultra-quiet tubular motors adjust louver angle via app, remote, or voice. Under 45dB." },
  { icon: "💡", title: "7-Color LED Lighting", desc: "RGB LED strips with 7 modes — warm white to full color cycling. Mood on demand." },
  { icon: "🔌", title: "Integrated Power",     desc: "110V GFCI outlets and USB-A/C ports inside every column. No extension cords, ever." },
  { icon: "🌧", title: "Rain Drainage",        desc: "Concealed gutters route water through hollow columns. Zero pooling, zero overflow." },
  { icon: "📱", title: "App Control",          desc: "Louvers, lights, schedules, and automation from your phone — anywhere in the world." },
  { icon: "🏔", title: "All-Weather Rated",    desc: "6061-T6 aluminum rated for 120MPH winds and 28lb/ft² snow. Built for New York." },
];

const steps = [
  { num: "01", title: "Design Consultation", desc: "We visit your space, measure, and deliver a 3D rendering within 48 hours. No commitment." },
  { num: "02", title: "Custom Fabrication",  desc: "Your pergola is built to exact spec — dimensions, color, and feature set. 2–4 week lead time." },
  { num: "03", title: "Expert Installation", desc: "Certified crew installs in under 3 hours. Licensed electricians handle all wiring." },
  { num: "04", title: "Setup & Training",    desc: "App configured, smart home integrated, and full walkthrough of every feature." },
];

const useCases = [
  {
    title: "Outdoor Dining",
    sub:   "Rain or Shine",
    desc:  "Host dinners, brunches, and celebrations year-round. Louvers close in seconds when weather turns — your guests never need to move inside.",
    icon:  "🍽",
    accentColor: "#f0a030",
    bg:    "linear-gradient(135deg, #2a1e0a 0%, #1a1208 100%)",
    border: "rgba(240,160,48,0.2)",
  },
  {
    title: "Evening Entertaining",
    sub:   "Set the Mood",
    desc:  "Seven LED modes transform your space from sunset cocktails to late-night ambiance. Sync with music, set schedules, or change the vibe mid-party.",
    icon:  "🎉",
    accentColor: "#9333ea",
    bg:    "linear-gradient(135deg, #1a0e2a 0%, #120a1e 100%)",
    border: "rgba(147,51,234,0.2)",
  },
  {
    title: "Year-Round Retreat",
    sub:   "Every Season",
    desc:  "120MPH wind-rated. 28lb snow load. Full rain drainage. New York winters don't stand a chance. Open for stargazing in summer, sealed tight in a storm.",
    icon:  "🏡",
    accentColor: "#00d4b0",
    bg:    "linear-gradient(135deg, #0a1e1a 0%, #081412 100%)",
    border: "rgba(0,212,176,0.2)",
  },
  {
    title: "Poolside Luxury",
    sub:   "Shade on Demand",
    desc:  "Rotate louvers to the exact angle that blocks the afternoon sun from your lounge chairs. Open fully by morning. Salt-air resistant finish included.",
    icon:  "🏊",
    accentColor: "#3b82f6",
    bg:    "linear-gradient(135deg, #0a1020 0%, #080c18 100%)",
    border: "rgba(59,130,246,0.2)",
  },
];

/* ─────────── Components ─────────── */
function StatBar() {
  return (
    <section style={{ background: "rgba(255,255,255,0.03)", borderTop: "1px solid rgba(240,160,48,0.1)", borderBottom: "1px solid rgba(240,160,48,0.1)" }}>
      <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ value, label, icon }) => (
          <div key={label} className="flex flex-col items-center text-center gap-1">
            <span className="text-2xl mb-1">{icon}</span>
            <span className="text-3xl sm:text-4xl font-black led-text">{value}</span>
            <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────── Page ─────────── */
export default function HomePage() {
  return (
    <>
      {/* ══════════════════════════════════════════
          HERO — split layout: text + 3D diagram
      ══════════════════════════════════════════ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 60% 40%, rgba(147,51,234,0.12) 0%, rgba(240,160,48,0.05) 50%, transparent 80%), #0d0b08",
        }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,160,48,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(240,160,48,0.04) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Large ambient orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            right: "5%",
            top: "15%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(240,160,48,0.08) 0%, rgba(147,51,234,0.06) 40%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* ── Left: Text ── */}
            <div className="animate-float-up">
              <div
                className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
                style={{ background: "rgba(240,160,48,0.1)", border: "1px solid rgba(240,160,48,0.25)", color: "#f0a030" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                New York&apos;s #1 Motorized Pergola Company
              </div>

              <h1 className="text-5xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6" style={{ color: "var(--text-warm)" }}>
                Your Backyard,{" "}
                <br className="hidden sm:block" />
                <span className="led-text">Reimagined.</span>
              </h1>

              <p className="text-lg text-gray-400 max-w-lg mb-8 leading-relaxed">
                Motorized aluminum pergolas with app control, 7-color LED lighting, integrated power outlets, and all-weather engineering — installed in under 3 hours anywhere in New York.
              </p>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-4 mb-10 text-xs" style={{ color: "var(--text-muted)" }}>
                {["200+ NY installs", "15-yr warranty", "Free consultation", "3-hr installation"].map((s) => (
                  <span key={s} className="flex items-center gap-1.5">
                    <span style={{ color: "#f0a030" }}>✓</span> {s}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="inline-block px-8 py-4 rounded-lg text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity shadow-xl"
                >
                  Get a Free Quote
                </Link>
                <Link
                  href="/gallery"
                  className="inline-block px-8 py-4 rounded-lg text-sm font-semibold transition-colors hover:text-white"
                  style={{ border: "1px solid rgba(255,255,255,0.12)", color: "var(--text-muted)" }}
                >
                  View Gallery →
                </Link>
              </div>
            </div>

            {/* ── Right: 3D Diagram ── */}
            <div className="relative animate-fade-in hidden lg:block">
              {/* Glassy card background */}
              <div
                className="rounded-2xl overflow-hidden p-4"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(240,160,48,0.12)",
                  backdropFilter: "blur(8px)",
                }}
              >
                <PergolaDiagram className="w-full" />
              </div>
              {/* Floating label */}
              <div
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-semibold"
                style={{ background: "#17130e", border: "1px solid rgba(240,160,48,0.2)", color: "#f0a030", whiteSpace: "nowrap" }}
              >
                6061-T6 Aluminum · Motorized · LED-Lit
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs uppercase tracking-widest" style={{ color: "var(--text-muted)" }}>Scroll</span>
          <div className="w-px h-8 led-gradient-bg" />
        </div>
      </section>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <StatBar />

      {/* ══════════════════════════════════════
          USE CASES — light cream section
      ══════════════════════════════════════ */}
      <section style={{ background: "var(--bg-cream)" }} className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f0a030" }}>
              What You Can Do With It
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold mt-3" style={{ color: "var(--text-dark)" }}>
              Your Space,{" "}
              <span className="led-text">Elevated.</span>
            </h2>
            <p className="mt-4 text-sm max-w-lg mx-auto leading-relaxed" style={{ color: "var(--text-dark-muted)" }}>
              One pergola. Endless configurations. Here&apos;s how New Yorkers are using theirs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {useCases.map(({ title, sub, desc, icon, accentColor, bg, border }) => (
              <div
                key={title}
                className="rounded-2xl p-7 transition-all duration-300 hover:scale-[1.02]"
                style={{ background: bg, border: `1px solid ${border}` }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                    style={{ background: `${accentColor}15` }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-2">
                      <h3 className="text-xl font-bold" style={{ color: "var(--text-warm)" }}>{title}</h3>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${accentColor}18`, color: accentColor }}>
                        {sub}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "rgba(240,232,216,0.6)" }}>{desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES GRID — dark
      ══════════════════════════════════════ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#00d4b0" }}>
            Built Different
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3" style={{ color: "var(--text-warm)" }}>
            Every Feature,{" "}
            <span className="led-text">Engineered.</span>
          </h2>
          <p className="mt-4 text-sm max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Not just a shade structure. A smart outdoor system built from marine-grade aluminum with technology baked in from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon, title, desc }) => (
            <div
              key={title}
              className="glow-card rounded-xl p-6"
              style={{ background: "var(--bg-card)" }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-5"
                style={{ background: "rgba(240,160,48,0.08)" }}
              >
                {icon}
              </div>
              <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-warm)" }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          3D DETAIL — full width diagram
      ══════════════════════════════════════ */}
      <section
        className="py-20 px-4"
        style={{ background: "var(--bg-section-alt)", borderTop: "1px solid rgba(240,160,48,0.06)", borderBottom: "1px solid rgba(240,160,48,0.06)" }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#f0a030" }}>
              3D Structure View
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold mt-3" style={{ color: "var(--text-warm)" }}>
              Every Detail, <span className="led-text">Engineered.</span>
            </h2>
          </div>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ background: "#0d0b08", border: "1px solid rgba(240,160,48,0.1)" }}
          >
            <PergolaDiagram className="w-full max-h-[480px]" />
          </div>
          {/* Callout legend */}
          <div className="mt-6 flex flex-wrap gap-6 justify-center">
            {[
              { color: "#f0a030", label: "Integrated LED Strip" },
              { color: "#00d4b0", label: "110V Column Outlet" },
              { color: "#9333ea", label: "Silent Motor Housing" },
            ].map(({ color, label }) => (
              <div key={label} className="flex items-center gap-2 text-xs" style={{ color: "var(--text-muted)" }}>
                <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          LOUVER DEMO
      ══════════════════════════════════════ */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#9333ea" }}>
            Interactive Demo
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3" style={{ color: "var(--text-warm)" }}>
            Louver Control,{" "}
            <span className="led-text">Your Way.</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
            Drag the slider to see how the motorized louvers adjust in real time — from fully closed for rain protection to wide open for stargazing.
          </p>
        </div>
        <LouverSlider />
      </section>

      {/* ══════════════════════════════════════
          REVIEWS — light cream section
      ══════════════════════════════════════ */}
      <Reviews />

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#3b82f6" }}>
            The Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mt-3" style={{ color: "var(--text-warm)" }}>
            From Quote to <span className="led-text">Pergola.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {steps.map(({ num, title, desc }) => (
            <div
              key={num}
              className="glow-card rounded-xl p-8 flex gap-6"
              style={{ background: "var(--bg-card)" }}
            >
              <div className="text-3xl font-black flex-shrink-0 mt-0.5 led-text">{num}</div>
              <div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-warm)" }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA — dramatic warm finish
      ══════════════════════════════════════ */}
      <section
        className="relative py-28 px-4 text-center overflow-hidden"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(240,160,48,0.1) 0%, rgba(147,51,234,0.08) 50%, transparent 80%), var(--bg-section-alt)",
          borderTop: "1px solid rgba(240,160,48,0.1)",
        }}
      >
        {/* Decorative grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(rgba(240,160,48,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(240,160,48,0.05) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div
            className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{ background: "rgba(240,160,48,0.1)", border: "1px solid rgba(240,160,48,0.25)", color: "#f0a030" }}
          >
            Free Consultation · No Obligation
          </div>
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-6" style={{ color: "var(--text-warm)" }}>
            Ready to Transform
            <br />
            <span className="led-text">Your Outdoor Space?</span>
          </h2>
          <p className="text-lg mb-10" style={{ color: "var(--text-muted)" }}>
            We visit your property, design your pergola in 3D, and provide a full quote — all for free. Most installs are done within 2 weeks of signing.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 rounded-lg text-base font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity shadow-2xl"
          >
            Request a Free Quote →
          </Link>
          <p className="mt-5 text-xs" style={{ color: "var(--text-muted)" }}>
            Serving all of New York · 200+ installations · 15-year warranty
          </p>
        </div>
      </section>
    </>
  );
}
