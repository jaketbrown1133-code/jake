"use client";

const NAV = [
  { href: "#what-is",    label: "What Is It" },
  { href: "#experience", label: "Experience" },
  { href: "#features",   label: "Features" },
  { href: "#territory",  label: "Service Area" },
  { href: "#quote",      label: "Get a Quote" },
];

const SOCIAL = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M18 2h-3a4 4 0 00-4 4v3H8v4h3v8h4v-8h3l1-4h-4V6a1 1 0 011-1h3V2z" />
      </svg>
    ),
  },
  {
    name: "Houzz",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M12 2L4 7v4l8-5 8 5V7L12 2zm-8 9v10h5V14h6v7h5V11L12 6 4 11z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer style={{ background: "#111111", borderTop: "1px solid rgba(201,168,76,0.08)" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-14">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="mb-6">
              <div
                className="text-xl font-bold tracking-wide"
                style={{ color: "#f5f0e8", fontFamily: "var(--font-serif)", letterSpacing: "0.06em" }}
              >
                UNDERCOVER
              </div>
              <div
                className="text-xs font-light tracking-[0.35em] uppercase"
                style={{ color: "#c9a84c" }}
              >
                Outdoors
              </div>
            </div>

            <p
              className="text-sm leading-relaxed mb-6 max-w-xs"
              style={{ color: "rgba(245,240,232,0.45)", fontFamily: "var(--font-sans)" }}
            >
              Your outdoor space, reimagined. Hudson Valley&apos;s authorized StruXure dealer —
              designing, supplying, and installing motorized louvered pergolas across the region.
            </p>

            <div
              className="inline-flex items-center gap-2 px-3 py-2 text-xs"
              style={{ border: "1px solid rgba(201,168,76,0.2)", background: "rgba(201,168,76,0.04)", fontFamily: "var(--font-sans)" }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#c9a84c" }} />
              <span style={{ color: "#c9a84c" }}>Authorized StruXure Dealer</span>
              <span style={{ color: "rgba(245,240,232,0.3)" }}>— Hudson Valley, NY</span>
            </div>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {SOCIAL.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className="w-10 h-10 flex items-center justify-center transition-all"
                  style={{
                    border: "1px solid rgba(201,168,76,0.15)",
                    color: "rgba(245,240,232,0.4)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#c9a84c";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(201,168,76,0.15)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.4)";
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-sans)" }}
            >
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className="text-sm transition-colors"
                    style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sans)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.5)"; }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-semibold tracking-[0.25em] uppercase mb-6"
              style={{ color: "rgba(245,240,232,0.3)", fontFamily: "var(--font-sans)" }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li
                className="text-sm"
                style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sans)" }}
              >
                Hudson Valley, New York
              </li>
              <li>
                <a
                  href="tel:+18455550100"
                  className="text-sm transition-colors"
                  style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sans)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.5)"; }}
                >
                  (845) 555-0100
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@undercoveroutdoors.com"
                  className="text-sm transition-colors"
                  style={{ color: "rgba(245,240,232,0.5)", fontFamily: "var(--font-sans)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#c9a84c"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(245,240,232,0.5)"; }}
                >
                  info@undercoveroutdoors.com
                </a>
              </li>
            </ul>

            <div className="mt-8">
              <p
                className="text-xs leading-relaxed"
                style={{ color: "rgba(245,240,232,0.25)", fontFamily: "var(--font-sans)" }}
              >
                Serving Orange County, Ulster County,
                <br />Dutchess County, Rockland County,
                <br />and Westchester County, NY.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p
            className="text-xs"
            style={{ color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-sans)" }}
          >
            © 2026 Undercover Outdoors. All rights reserved.
          </p>
          <p
            className="text-xs"
            style={{ color: "rgba(245,240,232,0.2)", fontFamily: "var(--font-sans)" }}
          >
            StruXure® is a registered trademark of StruXure Outdoor Inc.
          </p>
        </div>
      </div>
    </footer>
  );
}
