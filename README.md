# Elizabeth Lee — Portfolio

Everything is def vibe coded and AI will def replace my job 0.0
what's crazy is that this was built in a few hours.

"Pixel naturalist" design: paper/ink/coral/teal/acid palette, Fraunces
display type, IBM Plex Mono body, Silkscreen micro-labels. Voxel avatar
(three.js) with stat bars, pixelated work thumbnails that de-rez on
hover, a "???" mystery filter with redacted cards, and a `whoami`
terminal easter egg. The reference prototype lives at
[design/pixel-naturalist.html](design/pixel-naturalist.html) — the page
is a faithful port of it.

## Run

```bash
npm run dev   # http://localhost:3002
```

## Edit your work

Everything lives in [lib/projects.ts](lib/projects.ts):

- `CARDS` — the work grid, in display order. Each card: `cat` (one of
  `ux | graphic | photo | interior | doodles | mystery`), `catLabel`
  (the small teal label), `name`, `sub`, `href`, `image` (a file under
  `public/work/`). Cards with `redacted` instead of `image` render the
  dark redacted style.
- `FILTERS` — the filter buttons.
- `STATS` — the character-sheet stat bars.

Intro copy and links: [app/page.tsx](app/page.tsx). Palette and all
styling: [app/globals.css](app/globals.css). The voxel figure's
geometry: [components/VoxelAvatar.tsx](components/VoxelAvatar.tsx)
(box dimensions/positions are commented by body part).

## Images

Project images live in `public/work/`. Thumbnails are pixelated by
canvas at ~26 columns and sharpen on hover — any reasonably sized
image works; square or 4:3 crops look best.

## Deploy

Live at https://portfolio-navy-nu-57.vercel.app (Vercel project
`luppielizs-projects/portfolio`). Fully static, no env vars.

- Direct deploy: `vercel --prod`
- After connecting GitHub (see "Portfolio Maintenance Guide.docx" on the
  Desktop): `git push` auto-deploys.
