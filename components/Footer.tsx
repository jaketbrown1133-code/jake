import Link from "next/link";
import Logo from "./Logo";
import LEDBar from "./LEDBar";

export default function Footer() {
  return (
    <footer style={{ background: "#0d0b08", borderTop: "1px solid rgba(240,160,48,0.08)" }}>
      <LEDBar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Logo size="md" />
            <p className="mt-4 text-sm text-gray-500 leading-relaxed max-w-xs">
              New York&apos;s premier motorized louvered pergola company. We bring smart outdoor living to your backyard.
            </p>
            <p className="mt-4 text-xs text-gray-600">
              Serving all of New York — Manhattan, Brooklyn, Queens, Long Island, Westchester, and beyond.
            </p>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/gallery", label: "Gallery" },
                { href: "/technology", label: "Technology" },
                { href: "/installation", label: "Installation" },
                { href: "/contact", label: "Get a Quote" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-gray-400 hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>New York, NY</li>
              <li>
                <a href="tel:+15551234567" className="hover:text-white transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li>
                <a href="mailto:info@pergolatechpros.com" className="hover:text-white transition-colors">
                  info@pergolatechpros.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <p>© {new Date().getFullYear()} Pergola Tech Pros. All rights reserved.</p>
          <p>Luxury motorized pergolas · New York</p>
        </div>
      </div>
    </footer>
  );
}
