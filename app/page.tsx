"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, PROJECTS, type Category } from "@/lib/projects";
import TileArt from "@/components/TileArt";

export default function Home() {
  const [filter, setFilter] = useState<Category | "all">("all");

  const shown = useMemo(
    () =>
      filter === "all"
        ? PROJECTS
        : PROJECTS.filter((p) => p.categories.includes(filter)),
    [filter]
  );

  return (
    <main className="shell">
      <header className="masthead">
        <p className="prompt">elizabeth@sg:~$ whoami</p>
        <h1>
          Security engineer with a <em>designer&rsquo;s</em> eye.
        </h1>
        <p className="intro">
          I&rsquo;m Elizabeth Lee — I secure systems for a living and design
          things because I can&rsquo;t help it. Interior architecture at Temasek
          Poly, computer science at SMU, now security automation &amp; detection
          engineering at NCS — and when I&rsquo;m off the clock, underwater
          with a macro lens or in a hide waiting on an owl. The work below
          spans all of it — scroll through, or filter to find what you came
          for.
        </p>
        <nav className="links" aria-label="Profiles">
          <a href="mailto:ensignpotato@gmail.com">email</a>
          <a
            href="https://sg.linkedin.com/in/lizabethlee"
            target="_blank"
            rel="noreferrer"
          >
            linkedin
          </a>
          <a
            href="https://www.behance.net/lizabethmarielee"
            target="_blank"
            rel="noreferrer"
          >
            behance
          </a>
          <a
            href="https://www.instagram.com/luppiesnaps/"
            target="_blank"
            rel="noreferrer"
          >
            photos
          </a>
          <a
            href="https://www.instagram.com/itslupiedoodles/"
            target="_blank"
            rel="noreferrer"
          >
            doodles
          </a>
        </nav>
      </header>

      <div className="filters" role="tablist" aria-label="Filter projects">
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            role="tab"
            aria-selected={filter === c.key}
            className={`chip${filter === c.key ? " active" : ""}`}
            onClick={() => setFilter(c.key)}
          >
            {c.label}
          </button>
        ))}
        <span className="count">
          {shown.length}/{PROJECTS.length}
        </span>
      </div>

      <section className="grid">
        {shown.map((p, i) => {
          const Tag = p.href ? "a" : "div";
          return (
            <Tag
              key={`${filter}-${p.id}`}
              className={`tile${p.tall ? " tall" : ""}`}
              style={{ animationDelay: `${Math.min(i * 40, 400)}ms` }}
              {...(p.href
                ? { href: p.href, target: "_blank", rel: "noreferrer" }
                : {})}
            >
              <span className="art">
                {p.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.image} alt={p.title} loading="lazy" />
                ) : (
                  <TileArt category={p.categories[0]} seed={p.id.length + i} />
                )}
              </span>
              <span className="caption">
                <span className="title">{p.title}</span>
                {p.note && <span className="note">{p.note}</span>}
              </span>
            </Tag>
          );
        })}
        {shown.length === 0 && (
          <p className="empty">nothing here yet — check back soon</p>
        )}
      </section>

      <footer className="footer">
        <p className="hail">
          Want the full corporate portfolio?{" "}
          <a href="mailto:ensignpotato@gmail.com">Drop me an email.</a>
        </p>
        <p className="fine">elizabeth lee · singapore · {new Date().getFullYear()}</p>
      </footer>
    </main>
  );
}
