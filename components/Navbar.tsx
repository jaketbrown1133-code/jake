"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LEDBar from "./LEDBar";
import Logo from "./Logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/technology", label: "Technology" },
  { href: "/installation", label: "Installation" },
  { href: "/contact", label: "Get a Quote" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(13, 11, 8, 0.96)"
          : "rgba(13, 11, 8, 0.75)",
        backdropFilter: "blur(18px)",
        borderBottom: scrolled ? "1px solid rgba(240,160,48,0.12)" : "1px solid transparent",
      }}
    >
      <LEDBar />
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Logo />

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              const isQuote = label === "Get a Quote";
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={
                      isQuote
                        ? "ml-4 px-4 py-2 rounded text-sm font-semibold text-black led-gradient-bg transition-opacity hover:opacity-90"
                        : `px-4 py-2 text-sm font-medium rounded transition-colors ${
                            active
                              ? "text-white"
                              : "text-gray-400 hover:text-white"
                          }`
                    }
                    style={active && !isQuote ? { color: "#f0a030" } : {}}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
              {menuOpen ? (
                <>
                  <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6"  x2="19" y2="6"  stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden px-4 pb-4 pt-2 space-y-1"
          style={{ background: "rgba(13,11,8,0.98)", borderTop: "1px solid rgba(240,160,48,0.08)" }}
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                pathname === href ? "text-white" : "text-gray-400 hover:text-white"
              }`}
              style={pathname === href ? { color: "#f0a030" } : {}}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
