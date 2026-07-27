"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VW = 188;
const VH = 216;

export type Top = "dora" | "scuba" | "sport" | "techy";
export type Bottom = "skirt" | "shorts" | "pants" | "fins";
export type Head = "smiley" | "glasses" | "mask";
export type Hair = "brown" | "red" | "blond" | "purple";

export type Outfit = { top: Top; bottom: Bottom; head: Head; hair: Hair };

/* flat-pixel fallback sprite (no-WebGL only) — a neutral explorer. */
const PAL: Record<string, number> = {
  k: 0x3a2416,
  s: 0xf0c08a,
  e: 0x17150f,
  c: 0xff5a48,
  o: 0xf0862c,
  a: 0xdce84b,
  w: 0xfaf6ee,
  p: 0x8b6fb0,
};
const FACE_OPEN = "kkssessssesskk";
const ROWS = [
  "..kkkkkkkkkk..",
  ".kkkkkkkkkkkk.",
  ".kkkkkkkkkkkk.",
  "kkkssssssssskk",
  FACE_OPEN,
  "kksssssssssskk",
  "kkscsssssscskk",
  ".kssssssssssk.",
  "..k.ssssss.k..",
  "..ppccccccpp..",
  "..cccccccccc..",
  ".sccccccccccs.",
  ".s.oooooooo.s.",
  "...oooooooo...",
  "...ss....ss...",
  "...aa....aa...",
  "...ww....ww...",
  "..www....www..",
];

export default function VoxelAvatar({
  top = "dora",
  bottom = "shorts",
  head = "smiley",
  hair = "brown",
}: Partial<Outfit>) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"3d" | "2d">("3d");

  // latest outfit for the builder to read
  const outfitRef = useRef<Outfit>({ top, bottom, head, hair });
  outfitRef.current = { top, bottom, head, hair };
  const rebuildRef = useRef<null | (() => void)>(null);

  /* three.js voxel figure, assembled from swappable parts */
  useEffect(() => {
    if (mode !== "3d") return;
    const cv3 = canvasRef.current;
    if (!cv3) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: cv3,
        alpha: true,
        antialias: true,
      });
    } catch {
      setMode("2d");
      return;
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    THREE.ColorManagement.enabled = false;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const LEGACY = Math.PI;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(VW, VH);

    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(28, VW / VH, 0.1, 200);
    cam.position.set(0, 0, 46);
    scene.add(new THREE.AmbientLight(0xffffff, 0.78 * LEGACY));
    const sun = new THREE.DirectionalLight(0xfff6df, 0.55 * LEGACY);
    sun.position.set(6, 9, 12);
    scene.add(sun);
    const rim = new THREE.DirectionalLight(0x0e6e64, 0.25 * LEGACY);
    rim.position.set(-7, -3, -9);
    scene.add(rim);

    const lam = (color: number, opts?: THREE.MeshLambertMaterialParameters) =>
      new THREE.MeshLambertMaterial({ color, ...opts });
    const mats = {
      skin: lam(0xf0c08a),
      eye: lam(0x17150f),
      brown: lam(0x3a2416),
      red: lam(0xa83a2f),
      blond: lam(0xe6c46a),
      purple: lam(0x9a5cc6),
      coral: lam(0xff5a48),
      orange: lam(0xf0862c),
      acid: lam(0xdce84b),
      teal: lam(0x0e6e64),
      white: lam(0xfaf6ee),
      black: lam(0x26262c),
      denim: lam(0x3b5c86),
      pack: lam(0x8b6fb0),
      packDark: lam(0x6f57a0),
      lens: lam(0xbfe6e0, { transparent: true, opacity: 0.55 }),
    };

    const group = new THREE.Group();
    const eyeMeshes: THREE.Mesh[] = [];
    scene.add(group);

    function box(
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number
    ) {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      m.position.set(x, y, z);
      group.add(m);
      return m;
    }
    const pair = (
      fn: (sd: number) => void
    ) => [-1, 1].forEach((sd) => fn(sd));

    /* ---- hair ---- */
    function hairBase(
      mat: THREE.Material,
      opts: { long: boolean; bangs: boolean }
    ) {
      box(6.7, 1.3, 6.7, mat, 0, 12.5, 0); // crown
      if (opts.long) box(6.7, 7.6, 1.6, mat, 0, 9.2, -2.8);
      else box(6.7, 5.6, 1.7, mat, 0, 9.2, -2.75);
      if (opts.bangs) box(6.3, 1.7, 1.0, mat, 0, 11.7, 2.85);
      else box(6.4, 1.0, 0.8, mat, 0, 12.05, 2.9);
      pair((sd) => {
        if (opts.long) box(1.4, 7.6, 2.6, mat, sd * 3.5, 6.4, -0.3);
        else box(1.3, 5.6, 4.4, mat, sd * 3.35, 8.9, -0.2);
      });
    }
    function buildHair(h: Hair) {
      if (h === "red") hairBase(mats.red, { long: true, bangs: false });
      else if (h === "blond") hairBase(mats.blond, { long: true, bangs: true });
      else if (h === "purple") hairBase(mats.purple, { long: false, bangs: false });
      else hairBase(mats.brown, { long: false, bangs: true });
    }

    /* ---- head / face ---- */
    function eyes() {
      eyeMeshes.push(box(1, 1.15, 0.3, mats.eye, -1.4, 9.7, 3.05));
      eyeMeshes.push(box(1, 1.15, 0.3, mats.eye, 1.4, 9.7, 3.05));
    }
    function blush() {
      box(0.8, 0.6, 0.25, mats.coral, -2.35, 8.55, 3.05);
      box(0.8, 0.6, 0.25, mats.coral, 2.35, 8.55, 3.05);
    }
    function buildHead(hd: Head) {
      if (hd === "mask") {
        blush();
        box(5.0, 2.6, 0.5, mats.black, 0, 9.6, 3.0); // mask skirt
        box(4.2, 1.9, 0.3, mats.lens, 0, 9.6, 3.32); // lens
        box(6.4, 0.8, 0.4, mats.black, 0, 9.9, -0.2); // strap
        box(0.55, 3.6, 0.55, mats.acid, 2.7, 10.6, 1.4); // snorkel
        box(0.75, 0.5, 0.95, mats.acid, 2.7, 12.4, 1.4); // snorkel top
        box(1.5, 0.5, 0.25, mats.black, 0, 7.9, 3.05); // mouthpiece
        return;
      }
      eyes();
      blush();
      if (hd === "glasses") {
        box(1.1, 0.45, 0.25, mats.coral, 0, 8.05, 3.05); // smile
        pair((sd) => box(1.8, 1.5, 0.14, mats.lens, sd * 1.45, 9.65, 3.16));
        box(0.9, 0.22, 0.2, mats.eye, 0, 9.7, 3.2); // bridge
        pair((sd) => box(0.25, 0.22, 2.6, mats.eye, sd * 2.55, 9.8, 1.9)); // temples
      } else {
        box(1.7, 0.5, 0.25, mats.coral, 0, 7.95, 3.05); // big smile
      }
    }

    /* ---- tops ---- */
    function bareArms() {
      pair((sd) => box(1.2, 3.8, 1.4, mats.skin, sd * 2.95, 2.9, 0));
    }
    function buildTop(t: Top) {
      if (t === "scuba") {
        box(4.3, 3.5, 2.8, mats.black, 0, 4.2, 0);
        box(4.4, 0.6, 2.9, mats.teal, 0, 5.0, 0); // chest stripe
        pair((sd) => box(1.5, 4.4, 1.6, mats.black, sd * 2.95, 3.0, 0)); // long sleeves
        box(1.4, 1.4, 0.8, mats.acid, 0, 4.6, 1.5); // gauge
      } else if (t === "sport") {
        box(4.0, 3.1, 2.6, mats.acid, 0, 4.3, 0); // tank
        box(4.1, 0.6, 2.7, mats.coral, 0, 3.5, 0); // waist stripe
        pair((sd) => box(0.7, 1.5, 2.2, mats.acid, sd * 1.4, 5.5, 0)); // straps
      } else if (t === "techy") {
        box(4.2, 3.3, 2.7, mats.teal, 0, 4.25, 0);
        box(2.2, 0.6, 0.5, mats.white, 0, 5.75, 1.35); // collar
        box(0.7, 2.4, 0.3, mats.coral, 0, 4.5, 1.5); // tie
        pair((sd) => box(1.7, 1.3, 1.9, mats.teal, sd * 2.95, 5.2, 0)); // sleeves
        box(1.2, 0.9, 0.3, mats.white, 1.1, 3.5, 1.5); // pocket
      } else {
        // dora adventurer
        box(4.2, 3.2, 2.7, mats.coral, 0, 4.3, 0); // tee
        pair((sd) => box(1.7, 1.3, 1.9, mats.coral, sd * 2.95, 5.2, 0)); // sleeves
        box(4.4, 3.4, 1.5, mats.pack, 0, 3.8, -2.0); // backpack
        box(2.6, 1.9, 0.4, mats.packDark, 0, 3.4, -2.85); // pocket
        pair((sd) => box(0.6, 3.4, 0.5, mats.pack, sd * 1.5, 4.4, 1.45)); // straps
      }
    }

    /* ---- bottoms ---- */
    const shoes = (mat: THREE.Material) =>
      pair((sd) => box(1.75, 1, 2.3, mat, sd * 1.15, -5.35, 0.3));
    const socks = () =>
      pair((sd) => box(1.6, 0.9, 1.7, mats.acid, sd * 1.15, -4.55, 0.05));
    function buildBottom(b: Bottom) {
      if (b === "skirt") {
        box(5.4, 1.6, 3.4, mats.coral, 0, 1.4, 0);
        box(6.2, 1.2, 3.9, mats.teal, 0, 0.3, 0); // hem
        pair((sd) => box(1.4, 3.4, 1.6, mats.skin, sd * 1.15, -2.5, 0)); // legs
        socks();
        shoes(mats.white);
      } else if (b === "pants") {
        box(4.4, 1.7, 2.9, mats.denim, 0, 2.3, 0); // waist
        pair((sd) => box(1.7, 5.8, 1.7, mats.denim, sd * 1.15, -1.9, 0)); // legs
        shoes(mats.white);
      } else if (b === "fins") {
        pair((sd) => box(1.5, 5.0, 1.6, mats.skin, sd * 1.15, -1.75, 0)); // legs
        pair((sd) => box(1.6, 0.7, 1.6, mats.black, sd * 1.15, -4.6, 0.05)); // straps
        pair((sd) => box(1.9, 0.8, 4.8, mats.black, sd * 1.15, -5.15, 1.7)); // fins
      } else {
        // shorts
        box(4.4, 1.9, 2.9, mats.orange, 0, 2.15, 0);
        pair((sd) => box(1.5, 5.0, 1.6, mats.skin, sd * 1.15, -1.75, 0)); // legs
        socks();
        shoes(mats.white);
      }
    }

    function buildFigure() {
      for (let i = group.children.length - 1; i >= 0; i--) {
        const c = group.children[i] as THREE.Mesh;
        group.remove(c);
        c.geometry.dispose();
      }
      eyeMeshes.length = 0;
      const sel = outfitRef.current;
      box(6, 6, 6, mats.skin, 0, 9.5, 0); // head
      box(1.7, 1.2, 1.7, mats.skin, 0, 6.1, 0); // neck
      bareArms();
      buildHair(sel.hair);
      buildHead(sel.head);
      buildTop(sel.top);
      buildBottom(sel.bottom);
      group.position.y = -3.7;
    }
    rebuildRef.current = buildFigure;
    buildFigure();

    /* drag to rotate + gentle idle spin */
    let dragging = false;
    let px = 0;
    let py = 0;
    let targY = 0;
    let targX = 0;
    let idle = true;
    let idleTimer: number | undefined;
    const wake = () => {
      idle = false;
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => {
        idle = true;
      }, 2600);
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      wake();
      cv3.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      targY += (e.clientX - px) * 0.012;
      targX += (e.clientY - py) * 0.008;
      targX = Math.max(-0.55, Math.min(0.55, targX));
      px = e.clientX;
      py = e.clientY;
      wake();
    };
    const onUp = () => {
      dragging = false;
    };
    cv3.addEventListener("pointerdown", onDown);
    cv3.addEventListener("pointermove", onMove);
    cv3.addEventListener("pointerup", onUp);
    cv3.addEventListener("pointercancel", onUp);
    cv3.addEventListener("pointerleave", onUp);

    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (idle && !reduce) targY += 0.006;
      group.rotation.y += (targY - group.rotation.y) * 0.12;
      group.rotation.x += (targX - group.rotation.x) * 0.12;
      renderer.render(scene, cam);
    };
    loop();

    /* blink */
    let blinkInterval: number | undefined;
    let blinkTimeout: number | undefined;
    if (!reduce) {
      blinkInterval = window.setInterval(() => {
        eyeMeshes.forEach((m) => {
          m.material = mats.skin;
        });
        blinkTimeout = window.setTimeout(() => {
          eyeMeshes.forEach((m) => {
            m.material = mats.eye;
          });
        }, 140);
      }, 3400);
    }

    return () => {
      rebuildRef.current = null;
      cancelAnimationFrame(raf);
      window.clearTimeout(idleTimer);
      window.clearInterval(blinkInterval);
      window.clearTimeout(blinkTimeout);
      cv3.removeEventListener("pointerdown", onDown);
      cv3.removeEventListener("pointermove", onMove);
      cv3.removeEventListener("pointerup", onUp);
      cv3.removeEventListener("pointercancel", onUp);
      cv3.removeEventListener("pointerleave", onUp);
      group.traverse((o) => {
        if (o instanceof THREE.Mesh) o.geometry.dispose();
      });
      Object.values(mats).forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, [mode]);

  /* rebuild the figure when the outfit changes (no context teardown) */
  useEffect(() => {
    rebuildRef.current?.();
  }, [top, bottom, head, hair]);

  /* no WebGL: draw flat pixels */
  useEffect(() => {
    if (mode !== "2d") return;
    const cv = canvasRef.current;
    const ctx2 = cv?.getContext("2d");
    if (!cv || !ctx2) return;
    const P2 = 12;
    const ox = (cv.width - ROWS[0].length * P2) / 2;
    const oy = (cv.height - ROWS.length * P2) / 2;
    ROWS.forEach((r, y) => {
      for (let x = 0; x < r.length; x++) {
        if (r[x] === ".") continue;
        ctx2.fillStyle = "#" + PAL[r[x]].toString(16).padStart(6, "0");
        ctx2.fillRect(ox + x * P2, oy + y * P2, P2, P2);
      }
    });
  }, [mode]);

  return (
    <canvas
      key={mode}
      ref={canvasRef}
      id="avatar3d"
      width={VW}
      height={VH}
      aria-label="rotatable customisable pixel avatar of Elizabeth"
    />
  );
}
