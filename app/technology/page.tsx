const techSections = [
  {
    id: "motors",
    label: "Motors",
    accent: "#00e5cc",
    title: "Silent Motorized Louvers",
    subtitle: "Precision control, zero noise",
    body: [
      "Every Pergola Tech Pros system uses industrial-grade tubular motors housed inside the main beam — completely invisible from the outside. The motors operate at under 45dB, quieter than a whispered conversation.",
      "Louver blades rotate a full 0–180° in seconds, controlled by our mobile app, included RF remote, or integrated smart home systems including Amazon Alexa, Google Home, and Apple HomeKit.",
      "Rain sensors can trigger automatic closure. Wind sensors pause operation above safe thresholds. The system defaults to a safe closed position in the event of power loss.",
    ],
    specs: [
      { label: "Noise Level", value: "< 45dB" },
      { label: "Rotation Range", value: "0°– 180°" },
      { label: "Motor Life", value: "50,000+ cycles" },
      { label: "Response Time", value: "< 2 seconds" },
    ],
  },
  {
    id: "power",
    label: "Integrated Power",
    accent: "#a855f7",
    title: "Power, Built In.",
    subtitle: "110V outlets and USB in every column",
    body: [
      "Each structural column features concealed 110V GFCI power outlets and dual USB-A/USB-C charging ports. The wiring runs entirely through the hollow aluminum extrusion — no visible conduit, no exposed cables.",
      "The system is designed for outdoor use with weather-rated covers and IP65-rated outlet assemblies. Power your speaker system, outdoor TV, refrigerator, or string lights without running extension cords across the yard.",
      "All electrical work is performed by our licensed electricians to New York Building Code standards.",
    ],
    specs: [
      { label: "Outlet Type", value: "110V GFCI" },
      { label: "USB Ports", value: "USB-A + USB-C" },
      { label: "Rating", value: "IP65 Weatherproof" },
      { label: "Code", value: "NY Building Code" },
    ],
  },
  {
    id: "led",
    label: "LED Lighting",
    accent: "#3b82f6",
    title: "7-Color LED System",
    subtitle: "Set the mood from your phone",
    body: [
      "Integrated RGB LED strips run the full perimeter of the main beam and can optionally be installed on the louver underside. Seven preset modes include warm white, cool daylight, red, green, blue, purple, and full color-cycling.",
      "Custom color mixing is available through the app. Set schedules to automatically transition from daytime white to evening warm amber at sunset. Pair with motion sensors to have the lights activate when you approach.",
      "All LEDs are IP67-rated waterproof and carry a 5-year warranty on the light strips.",
    ],
    specs: [
      { label: "Modes", value: "7 presets + custom" },
      { label: "Color Spectrum", value: "16M colors (RGB)" },
      { label: "Rating", value: "IP67 Waterproof" },
      { label: "Warranty", value: "5 years" },
    ],
  },
  {
    id: "app",
    label: "App Control",
    accent: "#00e5cc",
    title: "Smart App Control",
    subtitle: "Everything in your pocket",
    body: [
      "The Pergola Tech Pros app (iOS & Android) connects to your pergola over your home WiFi network. Control louver angle, LED lighting, schedules, and automation triggers from anywhere in the world.",
      "Automation examples: close louvers when rain is detected, open at 7AM on weekdays, dim lights to 30% after 10PM. Integrate with existing smart home routines via IFTTT, Amazon Alexa, or Google Home.",
      "The system stores the last-used configuration in non-volatile memory so your pergola restores to the correct state after power interruptions.",
    ],
    specs: [
      { label: "Platform", value: "iOS & Android" },
      { label: "Protocol", value: "WiFi + RF backup" },
      { label: "Integrations", value: "Alexa, Google, HomeKit" },
      { label: "Remote Access", value: "Yes — worldwide" },
    ],
  },
  {
    id: "weather",
    label: "All-Weather",
    accent: "#a855f7",
    title: "Built for Every Season",
    subtitle: "120MPH winds. 28lb/ft² snow. Full rain drainage.",
    body: [
      "The structural frame is engineered from 6061-T6 marine-grade aluminum alloy — the same material used in aerospace and marine applications. Each joint is reinforced with internal steel brackets and stainless hardware.",
      "The rain drainage system collects water at the louver channel and routes it through hollow columns into ground drains. No pooling. No overflow. The system handles 4 inches of rainfall per hour.",
      "All finishes are PVDF powder-coated (the same coating used on commercial building facades) for UV and corrosion resistance. 15-year structural warranty. 10-year finish warranty.",
    ],
    specs: [
      { label: "Wind Rating", value: "120 MPH" },
      { label: "Snow Load", value: "28 lb/ft²" },
      { label: "Alloy", value: "6061-T6 Aluminum" },
      { label: "Warranty", value: "15yr structural" },
    ],
  },
];

export default function TechnologyPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-32 pb-20 px-4 text-center"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(59,130,246,0.07) 0%, transparent 70%), #050608",
        }}
      >
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "#3b82f6" }}>
          Under the Hood
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold text-white mt-3 mb-4">
          The <span className="led-text">Technology</span>
        </h1>
        <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
          Every component has been engineered to deliver a seamless, luxury outdoor experience that lasts decades.
        </p>
      </section>

      {/* Quick nav */}
      <div
        className="sticky top-[67px] z-30 px-4 py-3"
        style={{
          background: "rgba(5,6,8,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2 justify-center">
          {techSections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors text-gray-500 hover:text-white"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-28">
        {techSections.map((s, idx) => (
          <section key={s.id} id={s.id} className="scroll-mt-32">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-start ${idx % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
              {/* Text */}
              <div className={idx % 2 === 1 ? "lg:order-2" : ""}>
                <div
                  className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ background: `${s.accent}15`, color: s.accent, border: `1px solid ${s.accent}30` }}
                >
                  {s.label}
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">{s.title}</h2>
                <p className="text-sm font-semibold mb-6" style={{ color: s.accent }}>{s.subtitle}</p>
                <div className="space-y-4">
                  {s.body.map((para, i) => (
                    <p key={i} className="text-sm text-gray-400 leading-relaxed">{para}</p>
                  ))}
                </div>
              </div>

              {/* Specs card */}
              <div className={idx % 2 === 1 ? "lg:order-1" : ""}>
                <div
                  className="rounded-xl p-6"
                  style={{
                    background: "#0d0e14",
                    border: `1px solid ${s.accent}20`,
                    boxShadow: `0 0 40px ${s.accent}08`,
                  }}
                >
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-600 mb-5">
                    Technical Specs
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {s.specs.map(({ label, value }) => (
                      <div key={label} className="space-y-1">
                        <p className="text-xs text-gray-600">{label}</p>
                        <p className="text-base font-bold" style={{ color: s.accent }}>{value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Visual accent */}
                  <div className="mt-6 h-px" style={{ background: `linear-gradient(90deg, ${s.accent}40, transparent)` }} />
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ background: s.accent, boxShadow: `0 0 6px ${s.accent}` }} />
                    <span className="text-xs text-gray-600">Certified for New York residential installation</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Materials callout */}
      <section
        className="py-20 px-4"
        style={{
          background: "rgba(255,255,255,0.015)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-12">
            Material <span className="led-text">Breakdown</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { material: "6061-T6 Aluminum", use: "Frame & Columns" },
              { material: "PVDF Powder Coat", use: "Exterior Finish" },
              { material: "316 Stainless Steel", use: "Hardware & Fasteners" },
              { material: "Marine-Grade Seals", use: "Water Ingress Protection" },
            ].map(({ material, use }) => (
              <div
                key={material}
                className="rounded-lg p-5 text-center"
                style={{ background: "#0d0e14", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <p className="text-sm font-bold text-white mb-1">{material}</p>
                <p className="text-xs text-gray-600">{use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Experience It?
        </h2>
        <p className="text-gray-500 mb-8 text-sm">See the technology in person during a free consultation.</p>
        <a
          href="/contact"
          className="inline-block px-8 py-4 rounded text-sm font-bold text-black led-gradient-bg hover:opacity-90 transition-opacity"
        >
          Book a Consultation →
        </a>
      </section>
    </>
  );
}
