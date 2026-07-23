"use client";

import { useRef, useState } from "react";
import { CARDS, FILTERS, type Card, type Category } from "@/lib/projects";
import DeRezThumb from "@/components/DeRezThumb";
import ProjectOverlay from "@/components/ProjectOverlay";

export default function WorkGrid() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [active, setActive] = useState<Card | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  const shown =
    filter === "all" ? CARDS.length : CARDS.filter((c) => c.cat === filter).length;

  const open = (card: Card, el: HTMLElement) => {
    lastFocus.current = el;
    setActive(card);
  };
  const close = () => {
    setActive(null);
    const el = lastFocus.current;
    // setTimeout (not rAF — rAF pauses in hidden tabs) so focus lands after
    // React commits the unmount. The origin card may have been filtered away
    // while the overlay was open — fall back to the filter bar in that case.
    setTimeout(() => {
      if (el && el.offsetParent !== null) el.focus();
      else document.querySelector<HTMLElement>(".filters button")?.focus();
    }, 0);
  };

  return (
    <section className="work" id="work">
      <div className="work-head">
        <h2>The visible work</h2>
        <div className="filters" role="group" aria-label="filter work">
          {FILTERS.map((f) => {
            const cls = [
              f.key === "mystery" ? "mystery" : "",
              filter === f.key ? "on" : "",
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <button
                key={f.key}
                className={cls || undefined}
                aria-pressed={filter === f.key}
                onClick={() => setFilter(f.key)}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>
      <p className="sr-only" role="status">
        showing {shown} of {CARDS.length} projects
      </p>
      <div className="grid" id="grid">
        {CARDS.map((c) => {
          const cls = [
            "card",
            c.redacted ? "redacted" : "",
            filter !== "all" && c.cat !== filter ? "hide" : "",
          ]
            .filter(Boolean)
            .join(" ");
          return (
            <a
              key={c.id}
              className={cls}
              href={c.href}
              aria-haspopup={c.detail ? "dialog" : undefined}
              onClick={
                c.detail
                  ? (e) => {
                      // let modifier-clicks do their native new-tab thing
                      if (
                        e.metaKey ||
                        e.ctrlKey ||
                        e.shiftKey ||
                        e.altKey ||
                        e.button !== 0
                      )
                        return;
                      e.preventDefault();
                      open(c, e.currentTarget);
                    }
                  : undefined
              }
            >
              {c.redacted ? (
                <div className="thumb">
                  <div className="redline">
                    {c.redacted.glyphs}
                    <br />
                    <span className="bar">{c.redacted.bar}</span>
                    <br />
                    {c.redacted.bracket}
                  </div>
                </div>
              ) : (
                <DeRezThumb src={c.image!} alt={c.alt ?? c.name} />
              )}
              <div className="card-meta">
                <span className="cat">{c.catLabel}</span>
                <span className="name">{c.name}</span>
                <div className="sub">{c.sub}</div>
              </div>
            </a>
          );
        })}
      </div>
      <ProjectOverlay card={active} onClose={close} />
    </section>
  );
}
