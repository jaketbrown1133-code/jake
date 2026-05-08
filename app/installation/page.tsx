const steps = [
  {
    num: "01",
    icon: "📐",
    title: "Free Consultation & Design",
    accent: "#00e5cc",
    duration: "1–2 days",
    detail: [
      "A Pergola Tech Pros specialist visits your property to assess the space, discuss your vision, and take precise measurements.",
      "We provide a detailed 3D rendering of your custom pergola within 48 hours, along with a transparent, all-inclusive quote.",
      "No commitment required at this stage. We want you to love the design before any agreement.",
    ],
    deliverables: ["Site assessment report", "3D rendering", "Full quote"],
  },
  {
    num: "02",
    icon: "🏗",
    title: "Custom Fabrication",
    accent: "#a855f7",
    duration: "2–4 weeks",
    detail: [
      "Once approved, your pergola is fabricated to your exact specifications — custom dimensions, color, and feature set.",
      "We source all materials domestically and assemble each unit with precision CNC tooling for perfect tolerances.",
      "You receive real-time production updates and a confirmation call before we schedule installation.",
    ],
    deliverables: ["Custom color match", "Pre-wired columns", "Quality check certificate"],
  },
  {
    num: "03",
    icon: "⚡",
    title: "Professional Installation",
    accent: "#3b82f6",
    duration: "Under 3 hours",
    detail: [
      "Our certified installation crew arrives with all tools and hardware. Installation is completed in under 3 hours for standard sizes.",
      "All footings are anchored to your existing concrete, deck, or pavers — no new concrete pours required in most cases.",
      "Licensed electricians handle all power and control wiring in accordance with New York building codes.",
    ],
    deliverables: ["Structural anchoring", "Electrical wiring", "Waterproofing seals"],
  },
  {
    num: "04",
    icon: "📱",
    title: "App Setup & Training",
    accent: "#00e5cc",
    duration: "30 minutes",
    detail: [
      "We connect the system to your home WiFi, configure the app, and pair any smart home integrations you want.",
      "You receive a full walkthrough of every feature — louver control, LED modes, scheduling, and automation.",
      "All warranties are registered and you receive our 24/7 support contact for any questions.",
    ],
    deliverables: ["App configuration", "Smart home integration", "Warranty registration"],
  },
];

const faqs = [
  {
    q: "How long does installation take?",
    a: "Most standard-sized pergolas (up to 20×24 ft) are fully installed in under 3 hours. Larger custom sizes may require a full day. We give you a precise timeline before scheduling.",
  },
  {
    q: "Do I need a permit?",
    a: "Permit requirements vary by New York municipality. We handle all permit research and submissions on your behalf at no extra charge. Most residential installations fall below the permit threshold.",
  },
  {
    q: "What's the warranty?",
    a: "15-year structural warranty, 10-year PVDF finish warranty, 5-year warranty on LED strips and motorized components, and 2-year warranty on all electrical wiring and controls.",
  },
  {
    q: "Can it be attached to my house?",
    a: "Yes. Our freestanding and wall-mounted designs are both available. Wall-mounted attachments use through-bolt systems rated for 120MPH loads and carry the same warranty.",
  },
  {
    q: "What if I lose power?",
    a: "The louvers have a manual override crank that stores inside one of the columns. In most configurations, we also include a battery backup that holds the last position for 24 hours during outages.",
  },
  {
    q: "What areas of New York do you serve?",
    a: "We serve all five NYC boroughs plus Long Island (Nassau & Suffolk), Westchester, Rockland, and the Hamptons. Contact us for availability outside these areas.",
  },
  {
    q: "Can I expand my pergola later?",
    a: "Yes. Our modular system allows you to add sections, extend dimensions, or add a second structure. We keep your configuration on file for future expansions.",
  },
  {
    q: "Do you remove existing structures?",
    a: "We can remove and dispose of most existing pergola or patio cover structures as part of your project. This is quoted separately during the consultation.",
  },
];

const serviceAreas = [
  { name: "Manhattan", x: 46, y: 42 },
  { name: "Brooklyn", x: 50, y: 55 },
  { name: "Queens", x: 58, y: 46 },
  { name: "Bronx", x: 52, y: 32 },
  { name: "Staten Island", x: 38, y: 65 },
  { name: "Long Island", x: 72, y: 52 },
  { name: "Westchester", x: 54, y: 22 },
  { name: "Hamptons", x: 88, y: 58 },
];

export default function InstallationPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20 px-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(168,85,247,0.07) 0%, transparent 70%), #050608",
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#a855f7" }}>
          Our Process
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-3 mb-4">
          How We <span className="led-text">Install</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          From first call to first evening under your new pergola — we make the process effortless.
        </p>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-8">
        {steps.map(({ num, icon, title, accent, duration, detail, deliverables }) => (
          <div
            key={num}
            className="rounded-xl overflow-hidden"
            style={{ background: "#0d0e14", border: `1px solid ${accent}18` }}
          >
            {/* Step header */}
            <div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5"
              style={{ borderBottom: `1px solid ${accent}15` }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0"
                style={{ background: `${accent}12` }}
              >
                {icon}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="text-2xl font-black" style={{ color: accent }}>
                    {num}
                  </span>
                  <h2 className="text-xl font-bold text-white">{title}</h2>
                </div>
              </div>
              <div
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{ background: `${accent}12`, color: accent }}
              >
                {duration}
              </div>
            </div>

            {/* Step body */}
            <div className="px-6 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {detail.map((p, i) => (
                  <p key={i} className="text-sm text-gray-400 leading-relaxed">{p}</p>
                ))}
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-3">
                  You Receive
                </p>
                <ul className="space-y-2">
                  {deliverables.map((d) => (
                    <li key={d} className="flex items-center gap-2 text-sm text-gray-300">
                      <span style={{ color: accent }}>✓</span> {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Service area */}
      <section
        className="py-20 px-4"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
          borderBottom: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#00e5cc" }}>
              Service Area
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
              We Serve All of <span className="led-text">New York</span>
            </h2>
            <p className="mt-3 text-gray-500 text-sm">
              From Manhattan rooftops to Long Island backyards, Westchester estates to Hamptons beach houses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Map placeholder */}
            <div
              className="relative rounded-xl overflow-hidden"
              style={{
                background: "#0d0e14",
                border: "1px solid rgba(0,229,204,0.12)",
                height: 340,
              }}
            >
              <svg viewBox="0 0 100 80" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Simplified NY outline */}
                <path
                  d="M 15 15 L 35 10 L 60 8 L 85 12 L 92 22 L 90 40 L 92 58 L 78 70 L 60 72 L 40 70 L 25 65 L 20 55 L 10 50 L 8 38 L 12 26 Z"
                  fill="rgba(0,229,204,0.04)"
                  stroke="rgba(0,229,204,0.2)"
                  strokeWidth="0.5"
                />
                {/* Service area pins */}
                {serviceAreas.map(({ name, x, y }) => (
                  <g key={name}>
                    <circle cx={x} cy={y} r="1.8" fill="#00e5cc" opacity="0.8">
                      <animate attributeName="r" values="1.8;3;1.8" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={x} cy={y} r="1" fill="#00e5cc" />
                    <text x={x} y={y - 3} textAnchor="middle" fontSize="3" fill="rgba(255,255,255,0.7)" fontFamily="system-ui">
                      {name}
                    </text>
                  </g>
                ))}
              </svg>
              <div
                className="absolute bottom-3 left-3 right-3 text-center text-xs text-gray-600"
                style={{ background: "rgba(5,6,8,0.6)", borderRadius: 6, padding: "4px 8px" }}
              >
                Serving Greater New York Area
              </div>
            </div>

            {/* Area list */}
            <div className="grid grid-cols-2 gap-3">
              {[
                "Manhattan",
                "Brooklyn",
                "Queens",
                "The Bronx",
                "Staten Island",
                "Long Island",
                "Nassau County",
                "Suffolk County",
                "Westchester",
                "Rockland County",
                "The Hamptons",
                "And more →",
              ].map((area) => (
                <div
                  key={area}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-300"
                  style={{ background: "rgba(0,229,204,0.04)", border: "1px solid rgba(0,229,204,0.08)" }}
                >
                  <span style={{ color: "#00e5cc", fontSize: 10 }}>●</span>
                  {area}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#3b82f6" }}>
            FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
            Common <span className="led-text">Questions</span>
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map(({ q, a }) => (
            <div
              key={q}
              className="rounded-xl p-6"
              style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <h3 className="text-sm font-bold text-white mb-2">{q}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-20 px-4 text-center"
        style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
      >
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-500 mb-8 text-sm">Book your free consultation today.</p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 rounded text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity"
        >
          Request a Free Quote →
        </a>
      </section>
    </>
  );
}
