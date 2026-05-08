// Isometric 3/4 perspective view of a motorized louvered pergola.
// World space: 10 wide (x), 14 deep (y), 7 tall (z). Scale=18px per unit.
// Isometric: right=+x, far=+y, up=+z.

const S  = 18;       // px per world unit
const COS = 0.866;   // cos(30°)
const SIN = 0.5;     // sin(30°)
const OX  = 300;     // SVG origin x
const OY  = 440;     // SVG origin y

function iso(x: number, y: number, z: number) {
  return {
    x: OX + x * COS * S - y * COS * S,
    y: OY - x * SIN * S - y * SIN * S - z * S,
  };
}

function pt(p: { x: number; y: number }) {
  return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
}

const LOUVER_YS = [0, 1.5, 3, 4.5, 6, 7.5, 9, 10.5, 12, 13.5];

export default function PergolaDiagram({ className }: { className?: string }) {
  // Corner base/top coords
  const FLb = iso(0, 0, 0);   const FLt = iso(0, 0, 7);
  const FRb = iso(10, 0, 0);  const FRt = iso(10, 0, 7);
  const BLb = iso(0, 14, 0);  const BLt = iso(0, 14, 7);
  const BRb = iso(10, 14, 0); const BRt = iso(10, 14, 7);

  return (
    <svg
      viewBox="10 60 660 420"
      className={className}
      aria-label="3D isometric view of a motorized louvered pergola"
    >
      <defs>
        {/* LED gradient along louver length */}
        <linearGradient id="pdLed" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#00d4b0" />
          <stop offset="40%"  stopColor="#f0a030" />
          <stop offset="70%"  stopColor="#9333ea" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Ground deck gradient */}
        <linearGradient id="pdGround" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="#1e1710" />
          <stop offset="100%" stopColor="#12100a" />
        </linearGradient>

        {/* Column face gradient */}
        <linearGradient id="pdCol" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#1e1a14" />
          <stop offset="100%" stopColor="#2a2318" />
        </linearGradient>

        {/* Frame top-face gradient */}
        <linearGradient id="pdFrameTop" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%"   stopColor="#2e2820" />
          <stop offset="100%" stopColor="#1a1510" />
        </linearGradient>

        {/* Glow filter for LED */}
        <filter id="pdGlow" x="-20%" y="-200%" width="140%" height="500%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft glow for ambient */}
        <filter id="pdSoftGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="18" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Ambient underglow ── */}
      <ellipse
        cx={(FLb.x + FRb.x + BLb.x + BRb.x) / 4}
        cy={(FLb.y + FRb.y + BLb.y + BRb.y) / 4 - 30}
        rx="180" ry="60"
        fill="#f0a030" opacity="0.06" filter="url(#pdSoftGlow)"
      />

      {/* ── Ground / deck ── */}
      <polygon
        points={`${pt(FLb)} ${pt(FRb)} ${pt(BRb)} ${pt(BLb)}`}
        fill="url(#pdGround)"
      />
      {/* Deck plank lines */}
      {[2, 4, 6, 8, 10, 12].map((d) => {
        const l = iso(0, d, 0);
        const r = iso(10, d, 0);
        return (
          <line
            key={d}
            x1={l.x} y1={l.y} x2={r.x} y2={r.y}
            stroke="rgba(255,255,255,0.04)" strokeWidth="0.8"
          />
        );
      })}

      {/* ── Back columns (draw first — behind everything) ── */}
      {/* Back-right column */}
      <polygon
        points={`${pt(BRb)} ${pt(iso(10.5,14,0))} ${pt(iso(10.5,14,7))} ${pt(BRt)}`}
        fill="#18140f" opacity="0.7"
      />
      <polygon
        points={`${pt(BRb)} ${pt(BRt)} ${pt(iso(10,13.5,7))} ${pt(iso(10,13.5,0))}`}
        fill="#201c16" opacity="0.7"
      />
      {/* Back-left column */}
      <polygon
        points={`${pt(iso(0,13.5,0))} ${pt(iso(0,13.5,7))} ${pt(BLt)} ${pt(BLb)}`}
        fill="#201c16" opacity="0.5"
      />

      {/* ── Back beams (top frame, rear sides) ── */}
      {/* Back beam top face */}
      <polygon
        points={`${pt(BLt)} ${pt(BRt)} ${pt(iso(10,13.2,7.5))} ${pt(iso(0,13.2,7.5))}`}
        fill="url(#pdFrameTop)" opacity="0.8"
      />
      {/* Left side beam top face */}
      <polygon
        points={`${pt(FLt)} ${pt(BLt)} ${pt(iso(0,14,7.5))} ${pt(iso(0,0,7.5))}`}
        fill="#1e1a14" opacity="0.6"
      />
      {/* Right side beam top face */}
      <polygon
        points={`${pt(FRt)} ${pt(BRt)} ${pt(iso(10,14,7.5))} ${pt(iso(10,0,7.5))}`}
        fill="#201c16" opacity="0.8"
      />

      {/* ── Louver slats ── */}
      {LOUVER_YS.map((yp, i) => {
        const tl = iso(0, yp, 7.3);
        const tr = iso(10, yp, 7.3);
        const bl = iso(0, yp + 0.25, 7.0);
        const br = iso(10, yp + 0.25, 7.0);
        const ledL = iso(0.5, yp + 0.3, 6.95);
        const ledR = iso(9.5, yp + 0.3, 6.95);
        const opacity = 0.55 + i * 0.04;
        return (
          <g key={yp}>
            {/* LED underglow strip */}
            <line
              x1={ledL.x} y1={ledL.y} x2={ledR.x} y2={ledR.y}
              stroke="url(#pdLed)" strokeWidth="5"
              filter="url(#pdGlow)" opacity="0.75"
            />
            {/* Slat bottom face */}
            <polygon
              points={`${pt(bl)} ${pt(br)} ${pt(tr)} ${pt(tl)}`}
              fill="#1c1812" opacity={opacity}
            />
            {/* Slat top highlight edge */}
            <line
              x1={tl.x} y1={tl.y} x2={tr.x} y2={tr.y}
              stroke="#2e2820" strokeWidth="2"
            />
          </g>
        );
      })}

      {/* ── Front frame beam ── */}
      {/* Front beam top face */}
      <polygon
        points={`${pt(FLt)} ${pt(FRt)} ${pt(iso(10,0,7.5))} ${pt(iso(0,0,7.5))}`}
        fill="url(#pdFrameTop)"
      />
      {/* Front beam front face */}
      <polygon
        points={`${pt(FLt)} ${pt(FRt)} ${pt(iso(10,0,6.5))} ${pt(iso(0,0,6.5))}`}
        fill="#1a1610"
      />
      {/* Front beam LED strip */}
      <line
        x1={iso(0.5, 0, 7.5).x}  y1={iso(0.5, 0, 7.5).y}
        x2={iso(9.5, 0, 7.5).x}  y2={iso(9.5, 0, 7.5).y}
        stroke="url(#pdLed)" strokeWidth="3" filter="url(#pdGlow)" opacity="0.9"
      />

      {/* ── Front columns ── */}
      {/* Front-left column — front face */}
      <polygon
        points={`${pt(FLb)} ${pt(iso(0.6,0,0))} ${pt(iso(0.6,0,7))} ${pt(FLt)}`}
        fill="url(#pdCol)"
      />
      {/* Front-left column — side face */}
      <polygon
        points={`${pt(iso(0.6,0,0))} ${pt(iso(0.6,0.6,0))} ${pt(iso(0.6,0.6,7))} ${pt(iso(0.6,0,7))}`}
        fill="#12100a"
      />
      {/* LED strip on front-left column */}
      <line
        x1={iso(0.62, 0, 1).x} y1={iso(0.62, 0, 1).y}
        x2={iso(0.62, 0, 6.5).x} y2={iso(0.62, 0, 6.5).y}
        stroke="url(#pdLed)" strokeWidth="2" filter="url(#pdGlow)" opacity="0.7"
      />
      {/* Power outlet indicator */}
      <rect
        x={iso(0.62, 0, 2.5).x - 4} y={iso(0.62, 0, 2.5).y - 3}
        width="8" height="6" rx="1"
        fill="none" stroke="rgba(240,160,48,0.5)" strokeWidth="0.8"
      />

      {/* Front-right column — front face */}
      <polygon
        points={`${pt(iso(9.4,0,0))} ${pt(FRb)} ${pt(FRt)} ${pt(iso(9.4,0,7))}`}
        fill="url(#pdCol)"
      />
      {/* Front-right column — side face */}
      <polygon
        points={`${pt(FRb)} ${pt(iso(10,0.6,0))} ${pt(iso(10,0.6,7))} ${pt(FRt)}`}
        fill="#12100a"
      />
      {/* LED strip on front-right column */}
      <line
        x1={iso(9.38, 0, 1).x} y1={iso(9.38, 0, 1).y}
        x2={iso(9.38, 0, 6.5).x} y2={iso(9.38, 0, 6.5).y}
        stroke="url(#pdLed)" strokeWidth="2" filter="url(#pdGlow)" opacity="0.7"
      />

      {/* ── Furniture silhouette ── */}
      {(() => {
        const center = iso(5, 7, 0);
        const chairOffset = 2.5 * S * COS;
        return (
          <g opacity="0.55">
            {/* Table */}
            <ellipse cx={center.x} cy={center.y} rx="28" ry="12" fill="#0d0a06" />
            <ellipse cx={center.x} cy={center.y} rx="26" ry="10" fill="#1a1510" />
            {/* Table leg */}
            <line x1={center.x} y1={center.y + 4} x2={center.x} y2={center.y + 20}
              stroke="#0d0a06" strokeWidth="4" />
            {/* Chairs */}
            {[
              { dx: -chairOffset, dy: -10 },
              { dx: chairOffset,  dy:  10 },
              { dx: -chairOffset * 0.5, dy: -20 },
              { dx:  chairOffset * 0.5, dy:  20 },
            ].map(({ dx, dy }, i) => (
              <g key={i}>
                <ellipse
                  cx={center.x + dx} cy={center.y + dy}
                  rx="12" ry="5" fill="#0f0c08"
                />
                <rect
                  x={center.x + dx - 8} y={center.y + dy - 12}
                  width="16" height="10" rx="2" fill="#0f0c08"
                />
              </g>
            ))}
          </g>
        );
      })()}

      {/* ── Feature callout dots ── */}
      {[
        { pos: iso(5, 0, 7.6), label: "LED Strip",      color: "#f0a030" },
        { pos: iso(0.62, 0, 2.5), label: "Power Outlet", color: "#00d4b0" },
        { pos: iso(5, 6, 7.2), label: "Silent Motor",   color: "#9333ea" },
      ].map(({ pos, label, color }) => (
        <g key={label}>
          <circle cx={pos.x} cy={pos.y} r="4" fill={color} opacity="0.9">
            <animate attributeName="r" values="4;6;4" dur="2.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.9;0.5;0.9" dur="2.5s" repeatCount="indefinite" />
          </circle>
          <circle cx={pos.x} cy={pos.y} r="2.5" fill={color} />
          <text
            x={pos.x + 8} y={pos.y + 4}
            fontSize="9" fill="rgba(240,232,216,0.75)"
            fontFamily="system-ui" fontWeight="600"
          >
            {label}
          </text>
        </g>
      ))}
    </svg>
  );
}
