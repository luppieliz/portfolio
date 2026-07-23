"use client";

import { useEffect, useRef, useState } from "react";
import { STATS, TRAITS } from "@/lib/projects";

export default function StatBars() {
  const ref = useRef<HTMLDivElement>(null);
  const [filled, setFilled] = useState(false);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    const rd = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduce(rd);
    const el = ref.current;
    if (!el) return;
    if ("IntersectionObserver" in window && !rd) {
      const obs = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setFilled(true);
            obs.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      obs.observe(el);
      return () => obs.disconnect();
    }
    setFilled(true);
  }, []);

  return (
    <div className="stats" id="stats" ref={ref}>
      {STATS.map((s, idx) => (
        <div className="stat" key={s.label}>
          <div className="row">
            <span>{s.label}</span>
            <span className="val">{s.value}</span>
          </div>
          <div className="bar">
            <i
              style={{
                width: filled ? `${s.value}%` : 0,
                transitionDelay: filled && !reduce ? `${idx * 90}ms` : "0ms",
              }}
            />
          </div>
        </div>
      ))}
      <div className="traits">
        <p>
          <b>strengths</b> {TRAITS.strengths}
        </p>
        <p className="weak">
          <b>weaknesses</b> {TRAITS.weaknesses}
        </p>
      </div>
    </div>
  );
}
