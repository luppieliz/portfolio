"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Card } from "@/lib/projects";
import { DIMS } from "@/lib/imageDims";

// jaeyyelle-style project view: title, brief summary, stacked photos,
// external link. Esc / backdrop / ✕ / browser-back close. Tab is trapped
// inside the dialog while open.
export default function ProjectOverlay({
  card,
  onClose,
}: {
  card: Card | null;
  onClose: () => void;
}) {
  const winRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Closing via UI pops the history entry we pushed on open, so the mobile
  // back gesture and the ✕ button take the same path.
  const requestClose = useCallback(() => {
    if (window.history.state?.__proj) window.history.back();
    else onCloseRef.current();
  }, []);

  useEffect(() => {
    if (!card) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    window.history.pushState({ __proj: card.id }, "");

    const onPop = () => onCloseRef.current();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // if the whoami terminal is stacked on top, let it take the Escape
        if (document.getElementById("term")?.classList.contains("open")) return;
        requestClose();
        return;
      }
      if (e.key === "Tab") {
        // trap focus inside the dialog
        const win = winRef.current;
        if (!win) return;
        const focusables = win.querySelectorAll<HTMLElement>(
          "button, a[href]"
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (!win.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("popstate", onPop);
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("popstate", onPop);
      document.removeEventListener("keydown", onKey);
      // closed by UI without popping (e.g. unmount edge): drop stale entry
      if (window.history.state?.__proj) window.history.back();
    };
  }, [card, requestClose]);

  if (!card || !card.detail) return null;

  return (
    <div
      id="proj"
      className="open"
      role="dialog"
      aria-modal="true"
      aria-label={card.name}
      onClick={(e) => {
        if (e.target === e.currentTarget) requestClose();
      }}
    >
      <div className="proj-win" ref={winRef}>
        <div className="proj-bar">
          <span>specimen file · {card.id}</span>
          <button ref={closeRef} aria-label="close" onClick={requestClose}>
            ✕
          </button>
        </div>
        <div className="proj-body">
          <span className="proj-cat">{card.catLabel}</span>
          <h3>{card.name}</h3>
          <p className="proj-sum">{card.detail.summary}</p>
          <div className="proj-gallery">
            {card.detail.gallery.map((g) => {
              const d = DIMS[g.src];
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={g.src}
                  src={g.src}
                  alt={g.alt}
                  loading="lazy"
                  width={d?.w}
                  height={d?.h}
                />
              );
            })}
          </div>
          <a
            className="proj-link"
            href={card.href}
            target="_blank"
            rel="noreferrer"
          >
            {card.detail.linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
