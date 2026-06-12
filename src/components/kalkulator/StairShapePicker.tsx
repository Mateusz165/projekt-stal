"use client";

import { STAIR_SHAPES, type StairShapeId } from "@/config/pricing";

/* ── SVG helpers ──────────────────────────────────────────────────────────── */

// 3 poziome linie stopni w pionowym biegu (ruch w górę/dół)
function HSteps({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={x} y1={y + (h * i) / 4}
          x2={x + w} y2={y + (h * i) / 4}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.55"
        />
      ))}
    </>
  );
}

// 3 pionowe linie stopni w poziomym biegu (ruch w lewo/prawo)
function VSteps({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return (
    <>
      {[1, 2, 3].map((i) => (
        <line
          key={i}
          x1={x + (w * i) / 4} y1={y}
          x2={x + (w * i) / 4} y2={y + h}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.55"
        />
      ))}
    </>
  );
}

// Strzałka kierunku „w górę" schodów
function UpArrow({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g stroke="white" strokeWidth="1.5" strokeLinecap="round"
       strokeLinejoin="round" strokeOpacity="0.75" fill="none">
      <line x1={cx} y1={cy + 5} x2={cx} y2={cy - 3} />
      <polyline points={`${cx - 4},${cy + 1} ${cx},${cy - 4} ${cx + 4},${cy + 1}`} />
    </g>
  );
}

/* ── Kształt 1: Proste jednobiegowe ──────────────────────────────────────── */
function StraightSVG() {
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="32" y="8" width="36" height="94" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={32} y={8} w={36} h={94} />
      <UpArrow cx={50} cy={18} />
    </svg>
  );
}

/* ── Kształt 2: Skręcające 90° ze spocznikiem (L + spocznik) ─────────────── */
function LLandingSVG() {
  // dolny bieg (pionowy, lewo): x=8 y=58 w=26 h=44
  // spocznik (pusty kwadrat):   x=8 y=32 w=26 h=26
  // górny bieg (poziomy, góra): x=34 y=8  w=58 h=28
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dolny bieg */}
      <rect x="8" y="58" width="26" height="44" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={8} y={58} w={26} h={44} />
      {/* Spocznik */}
      <rect x="8" y="32" width="26" height="26" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      {/* Górny bieg */}
      <rect x="34" y="8" width="58" height="28" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <VSteps x={34} y={8} w={58} h={28} />
      <UpArrow cx={21} cy={68} />
    </svg>
  );
}

/* ── Kształt 3: Zabiegowe skręcające 90° (L + kliny) ────────────────────── */
function LWinderSVG() {
  // dolny bieg:   x=8  y=58 w=26 h=44
  // górny bieg:   x=34 y=8  w=58 h=28
  // narożnik zabiegu: x=8..34, y=8..58 → wachlarz z punktu (34, 58)
  const cx = 34, cy = 58;
  const fanPts = [
    { x: 8, y: 44 }, { x: 8, y: 28 }, { x: 8, y: 14 },
    { x: 18, y: 8  }, { x: 34, y: 8  },
  ];
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Dolny bieg */}
      <rect x="8" y="58" width="26" height="44" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={8} y={58} w={26} h={44} />
      {/* Górny bieg */}
      <rect x="34" y="8" width="58" height="28" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <VSteps x={34} y={8} w={58} h={28} />
      {/* Obrys narożnika zabiegu */}
      <polyline points="8,58 8,8 34,8"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" fill="none" />
      {/* Wachlarz stopni klinowych */}
      {fanPts.map((p, i) => (
        <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      <UpArrow cx={21} cy={68} />
    </svg>
  );
}

/* ── Kształt 4: Zawracające 180° ze spocznikiem (U + 1 spocznik) ────────── */
function UOneLandingSVG() {
  // lewy bieg:  x=8  y=8  w=26 h=58
  // prawy bieg: x=66 y=8  w=26 h=58
  // spocznik (szeroki, pusty): x=8 y=66 w=84 h=32
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lewy bieg */}
      <rect x="8" y="8" width="26" height="58" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={8} y={8} w={26} h={58} />
      {/* Prawy bieg */}
      <rect x="66" y="8" width="26" height="58" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={66} y={8} w={26} h={58} />
      {/* Spocznik */}
      <rect x="8" y="66" width="84" height="32" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <UpArrow cx={21} cy={18} />
      <UpArrow cx={79} cy={18} />
    </svg>
  );
}

/* ── Kształt 5: Zawracające 180° z dwoma spocznikami U ──────────────────── */
function UTwoLandingsSVG() {
  // lewy bieg:        x=8  y=8  w=26 h=55
  // lewy spocznik:    x=8  y=63 w=26 h=24
  // prawy bieg:       x=66 y=8  w=26 h=55
  // prawy spocznik:   x=66 y=63 w=26 h=24
  // dolny łącznik:    x=34 y=70 w=32 h=10  (krótki bieg między spocznikami)
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lewy bieg */}
      <rect x="8" y="8" width="26" height="55" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={8} y={8} w={26} h={55} />
      {/* Lewy spocznik */}
      <rect x="8" y="63" width="26" height="24" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      {/* Prawy bieg */}
      <rect x="66" y="8" width="26" height="55" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={66} y={8} w={26} h={55} />
      {/* Prawy spocznik */}
      <rect x="66" y="63" width="26" height="24" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      {/* Krótki bieg łączący dwa spoczniki */}
      <rect x="34" y="69" width="32" height="12" rx="1"
        stroke="white" strokeWidth="1.5" strokeOpacity="0.6" />
      <line x1={34} y1={69 + 6} x2={66} y2={69 + 6}
        stroke="white" strokeWidth="1.5" strokeOpacity="0.4" />
      <UpArrow cx={21} cy={18} />
      <UpArrow cx={79} cy={18} />
    </svg>
  );
}

/* ── Kształt 6: Zawracające 180° zabiegowe (U + kliny) ──────────────────── */
function UWinderSVG() {
  // lewy bieg:  x=8  y=8  w=26 h=58
  // prawy bieg: x=66 y=8  w=26 h=58
  // obszar zabiegu (dół): polyline 8,66→8,102→92,102→92,66
  // lewy wachlarz z (34, 66): do lewej i dolnej krawędzi
  // prawy wachlarz z (66, 66): do prawej i dolnej krawędzi
  const lFan = [
    { x: 8, y: 66 }, { x: 8, y: 78 }, { x: 8, y: 90 },
    { x: 8, y: 102 }, { x: 20, y: 102 },
  ];
  const rFan = [
    { x: 92, y: 66 }, { x: 92, y: 78 }, { x: 92, y: 90 },
    { x: 92, y: 102 }, { x: 80, y: 102 },
  ];
  return (
    <svg viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* Lewy bieg */}
      <rect x="8" y="8" width="26" height="58" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={8} y={8} w={26} h={58} />
      {/* Prawy bieg */}
      <rect x="66" y="8" width="26" height="58" rx="1"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" />
      <HSteps x={66} y={8} w={26} h={58} />
      {/* Obrys obszaru zabiegu */}
      <polyline points="8,66 8,102 92,102 92,66"
        stroke="white" strokeWidth="2" strokeOpacity="0.9" fill="none" />
      {/* Lewy wachlarz z (34,66) */}
      {lFan.map((p, i) => (
        <line key={`l${i}`} x1={34} y1={66} x2={p.x} y2={p.y}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      {/* Prawy wachlarz z (66,66) */}
      {rFan.map((p, i) => (
        <line key={`r${i}`} x1={66} y1={66} x2={p.x} y2={p.y}
          stroke="white" strokeWidth="1.5" strokeOpacity="0.5" />
      ))}
      <UpArrow cx={21} cy={18} />
      <UpArrow cx={79} cy={18} />
    </svg>
  );
}

/* ── Mapa ikon ────────────────────────────────────────────────────────────── */
const SHAPE_SVGS: Record<StairShapeId, React.FC> = {
  straight:       StraightSVG,
  "l-landing":    LLandingSVG,
  "l-winder":     LWinderSVG,
  "u-landing":    UOneLandingSVG,
  "u-two-landings": UTwoLandingsSVG,
  "u-winder":     UWinderSVG,
};

/* ── Komponent pickera ────────────────────────────────────────────────────── */
interface Props {
  value: StairShapeId | null;
  onChange: (id: StairShapeId) => void;
}

export default function StairShapePicker({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {STAIR_SHAPES.map((shape) => {
        const SVGIcon = SHAPE_SVGS[shape.id];
        const active = value === shape.id;
        return (
          <button
            key={shape.id}
            type="button"
            onClick={() => onChange(shape.id)}
            className={`group flex flex-col items-center gap-2 rounded-xl border p-2.5 transition-all duration-200 ${
              active
                ? "border-amber-500 bg-amber-500/10 shadow-md shadow-amber-500/10"
                : "border-zinc-700 bg-zinc-800/60 hover:border-zinc-500 hover:bg-zinc-800"
            }`}
          >
            {/* Ikona SVG */}
            <div className="w-full aspect-square flex items-center justify-center rounded-lg bg-zinc-900 p-2">
              <SVGIcon />
            </div>
            {/* Etykieta */}
            <div className="text-center px-0.5">
              <p className={`text-[11px] font-bold leading-tight transition-colors ${
                active ? "text-amber-400" : "text-zinc-200"
              }`}>
                {shape.label}
              </p>
              <p className="text-[9px] text-zinc-500 mt-0.5 leading-tight">
                {shape.sublabel}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
