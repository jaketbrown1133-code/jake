import Link from "next/link";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const textSize = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <Link href="/" className="flex items-center gap-2 group select-none">
      {/* Mini louver icon */}
      <svg
        width={size === "lg" ? 36 : 28}
        height={size === "lg" ? 24 : 19}
        viewBox="0 0 36 24"
        fill="none"
        className="flex-shrink-0"
      >
        {/* Pergola frame */}
        <rect x="0" y="0" width="36" height="2" rx="1" fill="url(#logoGrad)" />
        {/* Louver slats — shown at a slight angle */}
        <rect x="2" y="5"  width="32" height="3" rx="1" fill="url(#logoGrad)" opacity="0.9" />
        <rect x="2" y="11" width="32" height="3" rx="1" fill="url(#logoGrad)" opacity="0.75" />
        <rect x="2" y="17" width="32" height="3" rx="1" fill="url(#logoGrad)" opacity="0.6" />
        {/* Side columns */}
        <rect x="0"  y="0" width="2" height="24" rx="1" fill="#333344" />
        <rect x="34" y="0" width="2" height="24" rx="1" fill="#333344" />
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#00e5cc" />
            <stop offset="50%"  stopColor="#a855f7" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>

      <span className={`font-bold tracking-tight ${textSize}`}>
        <span className="text-white">Pergola </span>
        <span className="led-text">Tech</span>
        <span className="text-white"> Pros</span>
      </span>
    </Link>
  );
}
