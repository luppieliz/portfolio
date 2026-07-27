"use client";

import { useEffect, useRef } from "react";

// Custom pixel cursor — fine-pointer devices only, disabled under
// prefers-reduced-motion. Modes: arrow (default), mag (work cards /
// work card / avatar), block (redacted cards).
export default function PixelCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cur = ref.current;
    if (!cur) return;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) {
      cur.style.display = "none";
      return;
    }
    document.body.classList.add("cursor-on");
    const move = (e: MouseEvent) => {
      cur.style.left = e.clientX + "px";
      cur.style.top = e.clientY + "px";
      const t = e.target as Element | null;
      if (t && t.closest && (t.closest(".card") || t.closest(".char-avatar")))
        cur.dataset.mode = "mag";
      else cur.dataset.mode = "arrow";
    };
    const leave = () => {
      cur.style.opacity = "0";
    };
    const enter = () => {
      cur.style.opacity = "1";
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      document.body.classList.remove("cursor-on");
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div id="pix-cursor" data-mode="arrow" aria-hidden="true" ref={ref}>
      <svg className="glyph g-arrow" viewBox="0 0 12 12">
        <path
          fill="#17150F"
          d="M1 0h1v1H1zM1 1h2v1H1zM1 2h3v1H1zM1 3h4v1H1zM1 4h5v1H1zM1 5h6v1H1zM1 6h7v1H1zM1 7h4v1H1zM1 8h2v1H1zM4 8h2v1H4zM5 9h2v1H5z"
        />
        <path fill="#FF5A48" d="M2 1h1v6H2z" />
      </svg>
      <svg className="glyph g-mag" viewBox="0 0 16 16">
        <path fill="none" stroke="#17150F" strokeWidth="2" d="M3 3h6v6H3z" />
        <path fill="#17150F" d="M9 9h2v2H9zM11 11h2v2h-2zM13 13h2v2h-2z" />
        <path fill="#DCE84B" d="M4 4h4v4H4z" opacity=".55" />
      </svg>
      <svg className="glyph g-block" viewBox="0 0 12 14">
        <path fill="#DCE84B" d="M1 0h8v13H1z" />
        <path fill="#26241E" d="M2 2h6v2H2zM2 5h6v2H2zM2 8h4v2H2z" />
      </svg>
    </div>
  );
}
