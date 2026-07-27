"use client";

import { useState } from "react";
import VoxelAvatar, {
  type Top,
  type Bottom,
  type Head,
  type Hair,
} from "@/components/VoxelAvatar";
import StatBars from "@/components/StatBars";

const TOPS: { k: Top; l: string }[] = [
  { k: "dora", l: "adventurer" },
  { k: "scuba", l: "scuba" },
  { k: "sport", l: "sporty" },
  { k: "techy", l: "techy" },
];
const BOTTOMS: { k: Bottom; l: string }[] = [
  { k: "skirt", l: "skirt" },
  { k: "shorts", l: "shorts" },
  { k: "pants", l: "pants" },
  { k: "fins", l: "fins" },
];
const HEADS: { k: Head; l: string }[] = [
  { k: "smiley", l: "smiley" },
  { k: "glasses", l: "glasses" },
  { k: "mask", l: "mask" },
];
const HAIRS: { k: Hair; l: string }[] = [
  { k: "brown", l: "brown" },
  { k: "red", l: "red" },
  { k: "blond", l: "blond" },
  { k: "purple", l: "purple" },
];

// game-creator style: ◄ part ► flicks through the options
function Selector<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { k: T; l: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const idx = Math.max(
    0,
    options.findIndex((o) => o.k === value)
  );
  const go = (dir: number) =>
    onChange(options[(idx + dir + options.length) % options.length].k);
  return (
    <div className="cust-select" role="group" aria-label={label}>
      <button
        className="cust-arrow"
        aria-label={`previous ${label}`}
        onClick={() => go(-1)}
      >
        ◄
      </button>
      <span className="cust-pick">
        <span className="cat">{label}</span>
        <span className="val" aria-live="polite">
          {options[idx].l}
        </span>
      </span>
      <button
        className="cust-arrow"
        aria-label={`next ${label}`}
        onClick={() => go(1)}
      >
        ►
      </button>
    </div>
  );
}

export default function CharacterSheet() {
  const [top, setTop] = useState<Top>("dora");
  const [bottom, setBottom] = useState<Bottom>("shorts");
  const [head, setHead] = useState<Head>("smiley");
  const [hair, setHair] = useState<Hair>("brown");

  return (
    <>
      <div className="char-head">
        <span>character select</span>
        <span>npc: false</span>
      </div>
      <div className="char-body">
        <div className="char-avatar">
          <VoxelAvatar top={top} bottom={bottom} head={head} hair={hair} />
          <span className="drag-hint" aria-hidden="true">
            ◄ drag to rotate ►
          </span>
        </div>
        <div className="avatar-customizer">
          <Selector label="hair" options={HAIRS} value={hair} onChange={setHair} />
          <Selector label="face" options={HEADS} value={head} onChange={setHead} />
          <Selector label="top" options={TOPS} value={top} onChange={setTop} />
          <Selector
            label="bottom"
            options={BOTTOMS}
            value={bottom}
            onChange={setBottom}
          />
        </div>
      </div>
      <StatBars />
    </>
  );
}
