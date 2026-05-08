import Image from "next/image";

const reviews = [
  {
    name: "Sarah M.",
    location: "Brooklyn, NY",
    setup: "20×14 ft · Matte Black · Pool Deck",
    rating: 5,
    quote:
      "The neighbors genuinely asked if we built a rooftop bar. The LED lighting at night is unreal — seven different modes and we still can't pick a favorite. Install crew was done in under 3 hours.",
    avatar: "https://i.pravatar.cc/80?img=5",
    accentColor: "#00d4b0",
  },
  {
    name: "James K.",
    location: "Long Island, NY",
    setup: "24×18 ft · Sandstone White · Backyard",
    rating: 5,
    quote:
      "Three Thanksgiving dinners and counting. Rain, wind, cold — we haven't cancelled a single outdoor event since installation. The app control is genuinely impressive, even my in-laws figured it out.",
    avatar: "https://i.pravatar.cc/80?img=12",
    accentColor: "#f0a030",
  },
  {
    name: "Rachel & Tom D.",
    location: "Westchester, NY",
    setup: "16×20 ft · Gunmetal Grey · Patio",
    rating: 5,
    quote:
      "We got three quotes before going with Pergola Tech Pros. Night and day difference in quality. The motorized louvers are whisper-quiet and the integrated outlets power our outdoor TV setup perfectly.",
    avatar: "https://i.pravatar.cc/80?img=25",
    accentColor: "#9333ea",
  },
  {
    name: "Michael P.",
    location: "Manhattan (Penthouse), NY",
    setup: "12×10 ft · Matte Black · Rooftop",
    rating: 5,
    quote:
      "The only outdoor solution I found rated for NYC rooftop wind loads. It's survived two nasty winters without a scratch. The 120MPH rating is real — not marketing. Worth every dollar.",
    avatar: "https://i.pravatar.cc/80?img=33",
    accentColor: "#3b82f6",
  },
  {
    name: "Diane L.",
    location: "The Hamptons, NY",
    setup: "28×22 ft · Ivory White · Garden",
    rating: 5,
    quote:
      "Four beach summers. Still looks brand new. The PVDF finish holds up against salt air like nothing else we've tried. The rain drainage system is genius — water just disappears through the columns.",
    avatar: "https://i.pravatar.cc/80?img=47",
    accentColor: "#00d4b0",
  },
];

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} style={{ color: "#f0a030", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

// Mini SVG pergola thumbnail per review card
function MiniPergola({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 120 70" className="w-full h-full" aria-hidden>
      <defs>
        <linearGradient id={`mg-${color.slice(1)}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor={color} stopOpacity="0.7" />
          <stop offset="100%" stopColor="#9333ea" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      {/* Frame */}
      <rect x="5" y="5" width="110" height="6" rx="2" fill={`url(#mg-${color.slice(1)})`} />
      {/* Louvers */}
      {[16, 26, 36, 46, 56].map((y, i) => (
        <rect key={y} x="5" y={y} width="110" height="5" rx="1.5"
          fill={color} opacity={0.15 + i * 0.06} />
      ))}
      {/* Columns */}
      <rect x="5"   y="5" width="5" height="65" rx="2" fill="#2a2318" />
      <rect x="110" y="5" width="5" height="65" rx="2" fill="#2a2318" />
      {/* LED strip */}
      <rect x="10" y="5" width="100" height="1.5" rx="0.5" fill={color} opacity="0.9" />
      {/* Ground */}
      <rect x="0" y="62" width="120" height="8" rx="2" fill="#1a1510" opacity="0.5" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <section style={{ background: "var(--bg-cream)" }} className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "#9333ea" }}
          >
            Real Customers · Real Installs
          </span>
          <h2
            className="text-4xl sm:text-5xl font-extrabold mt-3"
            style={{ color: "var(--text-dark)" }}
          >
            What New Yorkers{" "}
            <span className="led-text">Are Saying</span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed max-w-lg mx-auto" style={{ color: "var(--text-dark-muted)" }}>
            Over 200 installations across New York. Here&apos;s what a few customers had to say.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <div
              key={r.name}
              className="light-card rounded-2xl p-6 flex flex-col gap-4"
              style={{ background: "#ffffff" }}
            >
              {/* Mini pergola thumbnail */}
              <div
                className="w-full h-20 rounded-xl overflow-hidden"
                style={{ background: "#0d0b08" }}
              >
                <MiniPergola color={r.accentColor} />
              </div>

              {/* Rating */}
              <Stars n={r.rating} />

              {/* Quote */}
              <p className="text-sm leading-relaxed flex-1" style={{ color: "#3a2e22" }}>
                &ldquo;{r.quote}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center gap-3 pt-2" style={{ borderTop: "1px solid #f0e9d8" }}>
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={r.avatar}
                    alt={r.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "#1a1208" }}>{r.name}</p>
                  <p className="text-xs" style={{ color: "#9a8a74" }}>{r.location}</p>
                  <p className="text-xs mt-0.5" style={{ color: r.accentColor, fontWeight: 500 }}>
                    {r.setup}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Aggregate rating */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full" style={{ background: "#fff", border: "1px solid #f0e9d8" }}>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => <span key={i} style={{ color: "#f0a030", fontSize: 16 }}>★</span>)}
            </div>
            <span className="text-sm font-bold" style={{ color: "#1a1208" }}>5.0</span>
            <span className="text-sm" style={{ color: "#9a8a74" }}>· 200+ installs across New York</span>
          </div>
        </div>
      </div>
    </section>
  );
}
