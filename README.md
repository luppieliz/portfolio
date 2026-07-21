# Elizabeth Lee — Portfolio

Single-page portfolio: masonry scroll of all work with filter chips
(All / Security / UX·UI / Interior / Graphic / Doodles), styled
"terminal meets atelier" — warm paper background, serif headline,
monospace `>` project labels, terminal-green accent. Mobile-first.

## Run

```bash
npm run dev   # http://localhost:3002
```

## Edit your work

Everything lives in [lib/projects.ts](lib/projects.ts):

- Add/remove/reorder projects in the `PROJECTS` array.
- `categories` — one or more of `security | uxui | interior | graphic | photo | doodles`
  (a project can appear under several filters, e.g. StopSCAM).
- `href` — where the tile links (Behance project page, Instagram, a write-up…).
- `tall: true` — taller tile, for masonry rhythm.

## Replace the generated tile art with real images

Real images live in `public/work/` — Behance covers plus Instagram pulls
(`wildlife-owl`, `uw-stiliger`, `doodle-a`; spares: `uw-bornella`,
`doodle-b`, `doodle-c`). Add a file there and set `image: "/work/name.jpg"`
on the project. The generated SVG art is used only when `image` is not set
(currently just the three security tiles).

The three security tiles (Detection Engineering, CVE Impact Graph, Security
Automation) are summaries of day-job work — rewrite their titles/notes to
whatever you can share publicly.

The contact email is set to ensignpotato@gmail.com in
[app/page.tsx](app/page.tsx) — change it if you want a different address
public.

## Deploy

Live at https://portfolio-navy-nu-57.vercel.app (Vercel project
`luppielizs-projects/portfolio`). Fully static, no env vars.

- Direct deploy: `vercel --prod`
- After connecting GitHub (see "Portfolio Maintenance Guide.docx" on the
  Desktop): `git push` auto-deploys.
