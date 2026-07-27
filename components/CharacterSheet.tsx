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

function Row<T extends string>({
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
  return (
    <div className="cust-row" role="group" aria-label={label}>
      <span className="cust-label">{label}</span>
      {options.map((o) => (
        <button
          key={o.k}
          className={value === o.k ? "on" : undefined}
          aria-pressed={value === o.k}
          onClick={() => onChange(o.k)}
        >
          {o.l}
        </button>
      ))}
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
        <StatBars />
      </div>
      <div className="avatar-customizer">
        <Row label="top" options={TOPS} value={top} onChange={setTop} />
        <Row label="bottom" options={BOTTOMS} value={bottom} onChange={setBottom} />
        <Row label="head" options={HEADS} value={head} onChange={setHead} />
        <Row label="hair" options={HAIRS} value={hair} onChange={setHair} />
      </div>
    </>
  );
}
