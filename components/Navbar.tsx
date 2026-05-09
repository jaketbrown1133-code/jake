"use client";

import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "#what-is", label: "What Is It" },
  { href: "#experience", label: "Experience" },
  { href: "#features", label: "Features" },
  { href: "#territory", label: "Service Area" },
  { href: "#quote", label: "Get a Quote" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(26,26,26,0.97)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(201,168,76,0.1)" : "1px solid transparent",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex flex-col leading-none"
            style={{ textDecoration: "none" }}
          >
            <span
              className="text-lg font-bold tracking-wide font-serif"
              style={{ color: "#f5f0e8", letterSpacing: "0.05em" }}
            >
              UNDERCOVER
            </span>
            <span
              className="text-xs font-light tracking-[0.3em] uppercase font-sans"
              style={{ color: "#c9a84c" }}
            >
              Outdoors
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const isQuote = label === "Get a Quote";
              return (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => handleNav(e, href)}
                    className={
                      isQuote
                        ? "btn-gold text-xs"
                        : "text-sm font-medium transition-colors duration-200"
                    }
                    style={
                      !isQuote
                        ? { color: "rgba(245,240,232,0.7)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }
                        : {}
                    }
                    onMouseEnter={!isQuote ? (e) => (e.currentTarget.style.color = "#c9a84c") : undefined}
                    onMouseLeave={!isQuote ? (e) => (e.currentTarget.style.color = "rgba(245,240,232,0.7)") : undefined}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            style={{ color: "var(--off-white)" }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              {menuOpen ? (
                <>
                  <line x1="4" y1="4" x2="20" y2="20" strokeLinecap="round" />
                  <line x1="20" y1="4" x2="4" y2="20" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="4" y1="7"  x2="20" y2="7"  strokeLinecap="round" />
                  <line x1="4" y1="12" x2="20" y2="12" strokeLinecap="round" />
                  <line x1="4" y1="17" x2="20" y2="17" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-6 pb-6 pt-2 space-y-1"
          style={{
            background: "rgba(26,26,26,0.98)",
            borderTop: "1px solid rgba(201,168,76,0.1)",
          }}
        >
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNav(e, href)}
              className="block py-3 text-sm font-medium transition-colors"
              style={{ color: "rgba(245,240,232,0.7)", fontFamily: "var(--font-sans)", letterSpacing: "0.04em" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,240,232,0.7)")}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
