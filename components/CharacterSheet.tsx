"use client";

import { useState } from "react";
import VoxelAvatar, {
  type Top,
  type Bottom,
  type Head,
  type Hair,
} from "@/components/VoxelAvatar";
import StatBars from "@/components/StatBars";

const TOPS: Top[] = ["dora", "scuba", "sport", "techy"];
const BOTTOMS: Bottom[] = ["skirt", "shorts", "pants", "fins"];
const HEADS: Head[] = ["smiley", "glasses", "mask"];
const HAIRS: Hair[] = ["brown", "red", "blond", "purple"];

// build prev/next cyclers for one part, type-safely
function cyclers<T extends string>(options: T[], value: T, set: (v: T) => void) {
  const i = Math.max(0, options.indexOf(value));
  return {
    prev: () => set(options[(i - 1 + options.length) % options.length]),
    next: () => set(options[(i + 1) % options.length]),
  };
}

export default function CharacterSheet() {
  const [top, setTop] = useState<Top>("dora");
  const [bottom, setBottom] = useState<Bottom>("shorts");
  const [head, setHead] = useState<Head>("smiley");
  const [hair, setHair] = useState<Hair>("brown");

  // head-to-toe order: one ◄/► pair per part, flanking the character
  const parts = [
    { label: "hair", ...cyclers(HAIRS, hair, setHair) },
    { label: "face", ...cyclers(HEADS, head, setHead) },
    { label: "top", ...cyclers(TOPS, top, setTop) },
    { label: "bottom", ...cyclers(BOTTOMS, bottom, setBottom) },
  ];

  return (
    <>
      <div className="char-head">
        <span>character select</span>
        <span>npc: false</span>
      </div>
      <div className="char-creator">
        <div className="arrow-col" aria-label="previous style">
          {parts.map((p) => (
            <button
              key={p.label}
              className="cust-arrow"
              aria-label={`previous ${p.label}`}
              onClick={p.prev}
            >
              ◄
            </button>
          ))}
        </div>
        <div className="char-avatar">
          <VoxelAvatar top={top} bottom={bottom} head={head} hair={hair} />
          <span className="drag-hint" aria-hidden="true">
            ◄ drag to rotate ►
          </span>
        </div>
        <div className="arrow-col" aria-label="next style">
          {parts.map((p) => (
            <button
              key={p.label}
              className="cust-arrow"
              aria-label={`next ${p.label}`}
              onClick={p.next}
            >
              ►
            </button>
          ))}
        </div>
      </div>
      <StatBars />
    </>
  );
}
