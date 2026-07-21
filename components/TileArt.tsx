import type { Category } from "@/lib/projects";

// Generated placeholder art, one flavor per discipline. Swap any tile for a
// real image by setting `image` on the project in lib/projects.ts.
export default function TileArt({
  category,
  seed,
}: {
  category: Category;
  seed: number;
}) {
  switch (category) {
    case "security":
      return <SecurityArt seed={seed} />;
    case "interior":
      return <InteriorArt seed={seed} />;
    case "graphic":
      return <GraphicArt seed={seed} />;
    case "doodles":
      return <DoodleArt />;
    default:
      return <UxArt seed={seed} />;
  }
}

// deterministic pseudo-random so server and client render identically
function rand(seed: number) {
  let s = seed * 2654435761 + 1013904223;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

function SecurityArt({ seed }: { seed: number }) {
  const r = rand(seed);
  const rows = Array.from({ length: 7 }, (_, i) => ({
    y: 22 + i * 24,
    w: 40 + r() * 130,
    hot: r() > 0.68,
  }));
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="240" height="200" fill="#0e1f16" />
      {rows.map((row, i) => (
        <g key={i}>
          <text
            x="18"
            y={row.y + 4}
            fontFamily="monospace"
            fontSize="9"
            fill={row.hot ? "#43d98a" : "#2c5e44"}
          >
            {row.hot ? ">" : "·"}
          </text>
          <rect
            x="34"
            y={row.y - 4}
            width={row.w}
            height="8"
            rx="4"
            fill={row.hot ? "#43d98a" : "#1e4632"}
            opacity={row.hot ? 0.95 : 0.8}
          />
        </g>
      ))}
      <rect x="0" y="0" width="240" height="200" fill="url(#scan)" opacity="0.25" />
      <defs>
        <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#43d98a" stopOpacity="0.18" />
          <stop offset="0.4" stopColor="#0e1f16" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function UxArt({ seed }: { seed: number }) {
  const r = rand(seed);
  const hue = r() > 0.5;
  const bg = hue ? "#e8ecf5" : "#eef0e6";
  const block = hue ? "#8fa3c8" : "#a3b18a";
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="240" height="200" fill={bg} />
      <rect x="30" y="26" width="180" height="148" rx="10" fill="#ffffff" />
      <rect x="30" y="26" width="180" height="26" rx="10" fill={block} opacity="0.35" />
      <circle cx="46" cy="39" r="4" fill={block} />
      <rect x="44" y="66" width={70 + r() * 60} height="10" rx="5" fill={block} />
      <rect x="44" y="86" width="152" height="6" rx="3" fill={block} opacity="0.4" />
      <rect x="44" y="98" width={90 + r() * 60} height="6" rx="3" fill={block} opacity="0.4" />
      <rect x="44" y="118" width="66" height="40" rx="8" fill={block} opacity="0.55" />
      <rect x="120" y="118" width="66" height="40" rx="8" fill={block} opacity="0.3" />
    </svg>
  );
}

function InteriorArt({ seed }: { seed: number }) {
  const r = rand(seed);
  const doorX = 70 + r() * 40;
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="240" height="200" fill="#f0e6d6" />
      <g stroke="#8a6f4d" strokeWidth="2.5" fill="none">
        <rect x="34" y="30" width="172" height="140" />
        <line x1="34" y1="106" x2="128" y2="106" />
        <line x1="128" y1="106" x2="128" y2="170" />
        <path d={`M ${doorX} 30 A 26 26 0 0 1 ${doorX + 26} 56`} strokeWidth="1.5" />
        <line x1={doorX} y1="30" x2={doorX} y2="56" strokeWidth="1.5" />
      </g>
      <g fill="#c9a97a">
        <rect x="46" y="120" width="46" height="20" rx="3" />
        <rect x="150" y="44" width="40" height="24" rx="3" opacity="0.8" />
        <circle cx="170" cy="140" r="16" opacity="0.7" />
      </g>
      <g fill="#8a6f4d" fontFamily="monospace" fontSize="8">
        <text x="40" y="46">A-01</text>
      </g>
    </svg>
  );
}

function GraphicArt({ seed }: { seed: number }) {
  const r = rand(seed);
  const warm = r() > 0.5;
  const a = warm ? "#e2725b" : "#3f6db4";
  const b = warm ? "#f4b942" : "#e2725b";
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="240" height="200" fill="#f7f2e9" />
      <circle cx={80 + r() * 30} cy="90" r="54" fill={a} />
      <rect x="118" y="70" width="86" height="86" rx="6" fill={b} opacity="0.85" />
      <path d="M 40 168 Q 120 130 204 162" stroke="#1c1913" strokeWidth="3" fill="none" />
      <circle cx="180" cy="52" r="10" fill="#1c1913" />
    </svg>
  );
}

function DoodleArt() {
  return (
    <svg viewBox="0 0 240 200" preserveAspectRatio="xMidYMid slice" aria-hidden>
      <rect width="240" height="200" fill="#fdf8ef" />
      <g stroke="#1c1913" strokeWidth="2.5" fill="none" strokeLinecap="round">
        <path d="M 50 130 Q 60 90 90 96 Q 96 70 122 76 Q 148 60 158 88 Q 186 92 178 122 Q 196 140 168 148 L 70 148 Q 42 146 50 130 Z" />
        <circle cx="104" cy="112" r="3" fill="#1c1913" />
        <circle cx="136" cy="112" r="3" fill="#1c1913" />
        <path d="M 110 126 Q 120 134 130 126" />
        <path d="M 196 60 q 6 -14 12 0 q 14 2 2 10 q 2 14 -10 6 q -12 8 -10 -6 q -12 -8 6 -10 Z" strokeWidth="2" />
      </g>
      <path d="M 36 174 q 20 -10 40 0 q 20 10 40 0 q 20 -10 40 0 q 20 10 40 0" stroke="#e2725b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}
