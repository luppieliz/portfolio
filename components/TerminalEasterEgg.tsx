"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const LINES: { text: ReactNode; cls?: string }[] = [
  { text: "$ whoami", cls: "p" },
  { text: "guest. obviously." },
  { text: "$ whois elizabeth --professional", cls: "p" },
  { text: "ACCESS DENIED — this information is distributed by email only." },
  { text: "nice try, though. i respect the instinct to poke around." },
  {
    text: (
      <>
        →{" "}
        <a href="mailto:ensignpotato@gmail.com?subject=whoami">
          request clearance
        </a>
      </>
    ),
  },
];

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const openRef = useRef(false);
  openRef.current = open;
  const buf = useRef("");

  const openTerm = useCallback(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setShown(reduce ? LINES.length : 1);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // type the remaining lines one by one
  useEffect(() => {
    if (!open || shown >= LINES.length) return;
    const t = window.setTimeout(() => setShown((s) => s + 1), 420);
    return () => clearTimeout(t);
  }, [open, shown]);

  // global "whoami" listener + Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (openRef.current) {
        if (e.key === "Escape") close();
        return;
      }
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key.length === 1) buf.current = (buf.current + e.key.toLowerCase()).slice(-6);
      if (buf.current === "whoami") {
        buf.current = "";
        openTerm();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openTerm, close]);

  return (
    <div
      id="term"
      className={open ? "open" : undefined}
      role="dialog"
      aria-modal="true"
      aria-label="terminal"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="term-win">
        <div className="term-bar">
          <span>guest@elizabeth-portfolio</span>
          <button id="term-x" aria-label="close" onClick={close}>
            ✕
          </button>
        </div>
        <div className="term-body" id="term-body">
          {open &&
            LINES.slice(0, shown).map((l, i) => (
              <div key={i} className={l.cls}>
                {l.text}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
