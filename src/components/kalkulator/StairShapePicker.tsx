"use client";

export type StairShapeId =
  | "straight"
  | "l-winder"
  | "u-winder"
  | "l-landing"
  | "u-two-landings";

export const STAIR_SHAPES: {
  id: StairShapeId;
  label: string;
  sublabel: string;
  multiplier: number;
}[] = [
  { id: "straight",       label: "Proste",                    sublabel: "Jeden bieg",              multiplier: 1.0  },
  { id: "l-winder",       label: "Zabiegowe 90°",             sublabel: "Kształt L, stopnie klinowe", multiplier: 1.15 },
  { id: "u-winder",       label: "Zabiegowe 180°",            sublabel: "Kształt U, stopnie klinowe", multiplier: 1.2  },
  { id: "l-landing",      label: "Z jednym podestem",         sublabel: "Spocznik na zakręcie",    multiplier: 1.1  },
  { id: "u-two-landings", label: "Z dwoma podestami",         sublabel: "Kształt U, dwa spoczniki", multiplier: 1.25 },
];

/* ── SVG helpers ─────────────────────────────────────────── */

function Steps({
  x1, y1, x2, y2, count = 6,
}: {
  x1: number; y1: number; x2: number; y2: number; count?: number;
}) {
  const lines = [];
  for (let i = 1; i < count; i++) {
    const t = i / count;
    lines.push(
      <line
        key={i}
        x1={x1 + (x2 - x1) * t}
        y1={y1 + (y2 - y1) * t}
        x2={x1 + (x2 - x1) * t}
        y2={y1 + (y2 - y1) * t}
        stroke="none"
      />,
    );
  }
  return <>{lines}</>;
}

function HSteps({ x, y, w, h, n = 6 }: { x: number; y: number; w: number; h: number; n?: number }) {
  return (
    <>
      {Array.from({ length: n - 1 }, (_, i) => {
        const ry = y + ((i + 1) * h) / n;
        return <line key={i} x1={x} y1={ry} x2={x + w} y2={ry} stroke="white" strokeWidth="1" strokeOpacity="0.45" />;
      })}
    </>
  );
}

function VSteps({ x, y, w, h, n = 6 }: { x: number; y: number; w: number; h: number; n?: number }) {
  return (
    <>
      {Array.from({ length: n - 1 }, (_, i) => {
        const rx = x + ((i + 1) * w) / n;
        return <line key={i} x1={rx} y1={y} x2={rx} y2={y + h} stroke="white" strokeWidth="1" strokeOpacity="0.45" />;
      })}
    </>
  );
}

function Arrow({ x, y, dir }: { x: number; y: number; dir: "up" | "right" }) {
  if (dir === "up") {
    return (
      <g stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.85">
        <line x1={x} y1={y + 5} x2={x} y2={y - 5} />
        <polyline points={`${x - 3},${y - 1} ${x},${y - 6} ${x + 3},${y - 1}`} fill="none" />
      </g>
    );
  }
  return (
    <g stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.85">
      <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
      <polyline points={`${x + 1},${y - 3} ${x + 6},${y} ${x + 1},${y + 3}`} fill="none" />
    </g>
  );
}

/* ── Shape 1: Proste ─────────────────────────────────────── */
function StraightSVG() {
  return (
    <svg viewBox="0 0 80 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="22" y="12" width="36" height="86" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={22} y={12} w={36} h={86} n={8} />
      <Arrow x={40} y={16} dir="up" />
    </svg>
  );
}

/* ── Shape 2: Zabiegowe 90° (L, winders) ─────────────────── */
function LWinderSVG() {
  // Lower flight (vertical, left column): x=8 y=50 w=30 h=52
  // Upper flight (horizontal, top row):  x=38 y=8  w=54 h=30
  // Winder corner fills 8..38 x 8..50 — fan lines from inner corner (38,50)
  const cx = 38, cy = 50;
  const wAngles = [0.15, 0.35, 0.55, 0.75, 0.90];
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lower flight */}
      <rect x="8" y="50" width="30" height="52" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={8} y={50} w={30} h={52} n={6} />
      {/* Upper flight */}
      <rect x="38" y="8" width="54" height="30" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <VSteps x={38} y={8} w={54} h={30} n={6} />
      {/* Winder corner outline */}
      <polyline
        points={`8,50 8,8 38,8 38,50`}
        stroke="white" strokeWidth="1.6" strokeOpacity="0.9"
        fill="none"
      />
      {/* Winder fan lines from inner corner */}
      {wAngles.map((t, i) => {
        const ex = 8 + (38 - 8) * (1 - t);
        const ey = 8 + (50 - 8) * t;
        return (
          <line key={i} x1={cx} y1={cy} x2={ex} y2={ey}
            stroke="white" strokeWidth="1" strokeOpacity="0.45" />
        );
      })}
      <Arrow x={23} y={55} dir="up" />
      <Arrow x={88} y={23} dir="right" />
    </svg>
  );
}

/* ── Shape 3: Zabiegowe 180° (U, winders) ────────────────── */
function UWinderSVG() {
  // Left flight (up):  x=8  y=8  w=28 h=60
  // Right flight (up): x=64 y=8  w=28 h=60
  // Bottom winder:     x=8  y=68 w=84 h=30  — fan from two inner corners
  const lcx = 36, lcy = 68;
  const rcx = 64, rcy = 68;
  const wAngles = [0.25, 0.5, 0.75];
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Left flight */}
      <rect x="8" y="8" width="28" height="60" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={8} y={8} w={28} h={60} n={7} />
      {/* Right flight */}
      <rect x="64" y="8" width="28" height="60" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={64} y={8} w={28} h={60} n={7} />
      {/* Winder area outline */}
      <polyline
        points={`8,68 8,98 92,98 92,68`}
        stroke="white" strokeWidth="1.6" strokeOpacity="0.9" fill="none"
      />
      {/* Fan from left inner corner */}
      {wAngles.map((t, i) => (
        <line key={`l${i}`}
          x1={lcx} y1={lcy}
          x2={8 + (36 - 8) * (1 - t)} y2={68 + 30 * t}
          stroke="white" strokeWidth="1" strokeOpacity="0.4"
        />
      ))}
      {/* Fan from right inner corner */}
      {wAngles.map((t, i) => (
        <line key={`r${i}`}
          x1={rcx} y1={rcy}
          x2={64 + (92 - 64) * t} y2={68 + 30 * t}
          stroke="white" strokeWidth="1" strokeOpacity="0.4"
        />
      ))}
      <Arrow x={22} y={13} dir="up" />
      <Arrow x={78} y={13} dir="up" />
    </svg>
  );
}

/* ── Shape 4: Z jednym podestem (L) ─────────────────────── */
function OneLandingSVG() {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lower flight (vertical) */}
      <rect x="8" y="58" width="30" height="44" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={8} y={58} w={30} h={44} n={6} />
      {/* Landing */}
      <rect x="8" y="32" width="56" height="26" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      {/* Upper flight (horizontal) */}
      <rect x="64" y="8" width="28" height="50" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={64} y={8} w={28} h={50} n={6} />
      <Arrow x={23} y={63} dir="up" />
      <Arrow x={78} y={13} dir="up" />
    </svg>
  );
}

/* ── Shape 5: Z dwoma podestami U ────────────────────────── */
function TwoLandingsSVG() {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Left flight (up) */}
      <rect x="8" y="62" width="26" height="40" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={8} y={62} w={26} h={40} n={5} />
      {/* Left landing */}
      <rect x="8" y="38" width="58" height="24" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      {/* Top flight (horizontal) */}
      <rect x="66" y="8" width="26" height="54" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={66} y={8} w={26} h={54} n={5} />
      {/* Right landing */}
      <rect x="34" y="62" width="32" height="24" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      {/* Bottom right flight (going back down) */}
      <rect x="34" y="86" width="32" height="16" rx="1" stroke="white" strokeWidth="1.6" strokeOpacity="0.9" />
      <HSteps x={34} y={86} w={32} h={16} n={3} />
      <Arrow x={21} y={67} dir="up" />
      <Arrow x={79} y={13} dir="up" />
    </svg>
  );
}

export const SHAPE_SVGS: Record<StairShapeId, React.FC> = {
  "straight":       StraightSVG,
  "l-winder":       LWinderSVG,
  "u-winder":       UWinderSVG,
  "l-landing":      OneLandingSVG,
  "u-two-landings": TwoLandingsSVG,
};

/* ── Picker component ────────────────────────────────────── */
interface Props {
  value: StairShapeId | null;
  onChange: (id: StairShapeId) => void;
}

export default function StairShapePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
      {STAIR_SHAPES.map((shape) => {
        const SVGIcon = SHAPE_SVGS[shape.id];
        const active = value === shape.id;
        return (
          <button
            key={shape.id}
            type="button"
            onClick={() => onChange(shape.id)}
            className={`group flex flex-col items-center gap-3 rounded-xl border p-3 transition-all duration-200 text-left ${
              active
                ? "border-amber-500 bg-amber-500/10"
                : "border-zinc-700 bg-zinc-800 hover:border-zinc-500"
            }`}
          >
            {/* SVG icon */}
            <div
              className={`w-full aspect-[4/5] flex items-center justify-center rounded-lg p-2 transition-colors ${
                active ? "bg-zinc-900" : "bg-zinc-900 group-hover:bg-zinc-850"
              }`}
            >
              <SVGIcon />
            </div>
            {/* Labels */}
            <div className="text-center">
              <p
                className={`text-xs font-bold leading-tight transition-colors ${
                  active ? "text-amber-400" : "text-zinc-200"
                }`}
              >
                {shape.label}
              </p>
              <p className="text-[10px] text-zinc-500 mt-0.5 leading-tight">
                {shape.sublabel}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
