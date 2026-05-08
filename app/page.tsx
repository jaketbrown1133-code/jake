import Link from "next/link";
import LouverSlider from "@/components/LouverSlider";

const stats = [
  { value: "120MPH", label: "Wind Rating" },
  { value: "360°", label: "Louver Control" },
  { value: "3hr", label: "Installation" },
  { value: "7", label: "LED Modes" },
];

const features = [
  {
    icon: "⚡",
    title: "Silent Motors",
    desc: "Ultra-quiet tubular motors adjust louver angle via app, remote, or voice. Zero noise, instant response.",
  },
  {
    icon: "💡",
    title: "7-Color LED Lighting",
    desc: "Integrated RGB LED strips with 7 modes — from warm white to full color cycling. Mood on demand.",
  },
  {
    icon: "🔌",
    title: "Integrated Power",
    desc: "110V outlets and USB ports built into every column. Power your space, charge your devices.",
  },
  {
    icon: "🌧",
    title: "Rain Drainage System",
    desc: "Concealed gutters and channels route water through hollow columns. Zero puddles.",
  },
  {
    icon: "📱",
    title: "App Control",
    desc: "Control louvers, lighting, scheduling, and weather automation from your phone.",
  },
  {
    icon: "🏔",
    title: "All-Weather Rated",
    desc: "Marine-grade aluminum rated for 120MPH winds and 28lb/ft² snow load. Built for New York.",
  },
];

const steps = [
  {
    num: "01",
    title: "Design Consultation",
    desc: "We visit your space, take precise measurements, and build a 3D rendering of your custom pergola.",
  },
  {
    num: "02",
    title: "Custom Fabrication",
    desc: "Your pergola is engineered to spec — custom dimensions, color, and feature configuration.",
  },
  {
    num: "03",
    title: "Expert Installation",
    desc: "Our certified crew completes full installation in under 3 hours with zero structural damage.",
  },
  {
    num: "04",
    title: "Setup & Training",
    desc: "We configure your app, connect automation triggers, and walk you through every feature.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4 pt-24 pb-16"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(168,85,247,0.08) 0%, transparent 70%), #050608",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 max-w-5xl mx-auto animate-float-up">
          <div
            className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest"
            style={{
              background: "rgba(0,229,204,0.08)",
              border: "1px solid rgba(0,229,204,0.2)",
              color: "#00e5cc",
            }}
          >
            New York&apos;s Premium Motorized Pergola Company
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            <span className="text-white">Outdoor Living,</span>
            <br />
            <span className="led-text">Intelligently Designed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Motorized aluminum pergolas with app control, 7-color LED lighting, integrated power,
            and all-weather engineering — installed in your New York backyard in under 3 hours.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 rounded text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity shadow-lg"
            >
              Get a Free Quote
            </Link>
            <Link
              href="/technology"
              className="px-8 py-4 rounded text-sm font-semibold text-white hover:text-gray-300 transition-colors"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              Explore the Technology →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
          <span className="text-xs text-gray-500 uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 led-gradient-bg" />
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section
        style={{
          background: "rgba(255,255,255,0.02)",
          borderTop: "1px solid rgba(0,229,204,0.08)",
          borderBottom: "1px solid rgba(0,229,204,0.08)",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label }) => (
            <div key={label} className="flex flex-col items-center text-center">
              <span className="text-3xl sm:text-4xl font-black led-text">{value}</span>
              <span className="text-xs text-gray-500 uppercase tracking-widest mt-2">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#00e5cc" }}>
            Built Different
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Every Feature,{" "}
            <span className="led-text">Engineered.</span>
          </h2>
          <p className="mt-4 text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
            Not just a shade structure. A smart outdoor system built from marine-grade aluminum
            with technology baked in from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon, title, desc }) => (
            <div key={title} className="glow-card rounded-xl p-6" style={{ background: "#0d0e14" }}>
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl mb-5"
                style={{ background: "rgba(0,229,204,0.07)" }}
              >
                {icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Louver demo ── */}
      <section
        className="py-24 px-4"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#a855f7" }}>
            Interactive Demo
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            Louver Control,{" "}
            <span className="led-text">Your Way.</span>
          </h2>
          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            Drag the slider to see how the motorized louvers adjust in real time — from fully
            closed for rain protection to wide open for stargazing.
          </p>
        </div>
        <LouverSlider />
      </section>

      {/* ── How it works ── */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#3b82f6" }}>
            The Process
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mt-3">
            From Quote to{" "}
            <span className="led-text">Pergola.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map(({ num, title, desc }) => (
            <div key={num} className="glow-card rounded-xl p-8 flex gap-6" style={{ background: "#0d0e14" }}>
              <div className="text-3xl font-black flex-shrink-0 mt-0.5 led-text">{num}</div>
              <div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="relative py-28 px-4 text-center overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, rgba(168,85,247,0.1) 0%, transparent 70%), #080810",
          borderTop: "1px solid rgba(168,85,247,0.1)",
        }}
      >
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            Ready to Transform
            <br />
            <span className="led-text">Your Outdoor Space?</span>
          </h2>
          <p className="text-gray-500 mb-10 text-lg">
            Free consultations. No pressure. Just a conversation about your dream pergola.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-4 rounded text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity shadow-xl"
          >
            Request a Free Quote →
          </Link>
        </div>
      </section>
    </>
  );
}
