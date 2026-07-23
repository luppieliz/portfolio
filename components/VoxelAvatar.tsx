"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const VW = 188;
const VH = 216;

/* flat-pixel fallback sprite — legend: k hair/ink · s skin · e eye ·
   c coral (blush/shoes) · t teal shirt · g camera body · a lens · . empty */
const PAL: Record<string, number> = {
  k: 0x17150f,
  s: 0xf0c08a,
  e: 0x17150f,
  c: 0xff5a48,
  t: 0x0e6e64,
  g: 0x3a362c,
  a: 0xdce84b,
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
  ".k.ssssssss.k.",
  ".ksttttttttsk.",
  ".kstttgggttsk.",
  ".kstttgagttsk.",
  "..stttttttts..",
  "..aaaaaaaaaa..",
  ".cccccccccccc.",
  "...ss....ss...",
  "...cc....cc...",
  "..ccc....ccc..",
];

export default function VoxelAvatar() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mode, setMode] = useState<"3d" | "2d">("3d");

  /* three.js voxel figure — geometry copied from the prototype */
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

    // reproduce the prototype's r128 colour/lighting pipeline
    THREE.ColorManagement.enabled = false;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    const LEGACY = Math.PI; // r155+ light-intensity migration factor

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(VW, VH); // sets CSS size too, so DPR can't inflate the element

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

    const mats = {
      hair: new THREE.MeshLambertMaterial({ color: 0x17150f }),
      skin: new THREE.MeshLambertMaterial({ color: 0xf0c08a }),
      eye: new THREE.MeshLambertMaterial({ color: 0x17150f }),
      coral: new THREE.MeshLambertMaterial({ color: 0xff5a48 }),
      teal: new THREE.MeshLambertMaterial({ color: 0x0e6e64 }),
      acid: new THREE.MeshLambertMaterial({ color: 0xdce84b }),
      camb: new THREE.MeshLambertMaterial({ color: 0x3a362c }),
    };
    const group = new THREE.Group();
    const eyeMeshes: THREE.Mesh[] = [];
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
    /* head + face */
    box(6, 6, 6, mats.skin, 0, 9.5, 0);
    box(6.7, 1.3, 6.7, mats.hair, 0, 12.5, 0); // crown
    box(6.7, 7.6, 1.6, mats.hair, 0, 9.2, -2.8); // back of hair
    box(6.4, 1.3, 0.8, mats.hair, 0, 11.9, 2.9); // fringe
    eyeMeshes.push(box(1, 1.15, 0.3, mats.eye, -1.4, 9.7, 3.05));
    eyeMeshes.push(box(1, 1.15, 0.3, mats.eye, 1.4, 9.7, 3.05));
    box(0.8, 0.6, 0.25, mats.coral, -2.35, 8.55, 3.05); // blush
    box(0.8, 0.6, 0.25, mats.coral, 2.35, 8.55, 3.05);
    box(1.1, 0.4, 0.25, mats.coral, 0, 8.05, 3.05); // smile
    /* long curly hair: side falls with stepped, wiggling curl cubes */
    [-1, 1].forEach((sd) => {
      box(1.5, 8.5, 2.4, mats.hair, sd * 3.55, 6.8, -0.4);
      for (let i = 0; i < 4; i++) {
        box(
          1.45,
          1.25,
          1.9,
          mats.hair,
          sd * (3.55 + (i % 2 ? 0.5 : -0.4)),
          2.25 - i * 1.15,
          -0.4 + (i % 2 ? 0.45 : -0.35)
        );
      }
    });
    for (let j = 0; j < 5; j++) {
      // wavy back hem
      box(1.35, 1.3, 1.5, mats.hair, -2.6 + j * 1.3, 5.15 + (j % 2 ? 0.55 : 0), -2.95);
    }
    /* neck + colourful banded dress */
    box(1.7, 1.2, 1.7, mats.skin, 0, 6.1, 0);
    box(4, 2.8, 2.6, mats.teal, 0, 4.2, 0); // bodice
    box(4.5, 1.1, 3, mats.acid, 0, 2.5, 0); // waistband
    box(5.2, 1.5, 3.5, mats.coral, 0, 1.2, 0); // skirt tier 1
    box(6.1, 1.5, 4.1, mats.teal, 0, -0.3, 0); // skirt tier 2
    box(7, 1.4, 4.7, mats.acid, 0, -1.75, 0); // hem
    /* arms + sleeves */
    [-1, 1].forEach((sd) => {
      box(1.6, 1.3, 1.8, mats.teal, sd * 2.9, 5.1, 0);
      box(1.2, 3.6, 1.4, mats.skin, sd * 2.9, 2.75, 0);
    });
    /* legs + shoes */
    [-1, 1].forEach((sd) => {
      box(1.4, 2.4, 1.6, mats.skin, sd * 1.15, -3.55, 0);
      box(1.7, 1, 2.3, mats.coral, sd * 1.15, -5.2, 0.25);
    });
    /* trusty camera */
    box(2, 1.4, 1, mats.camb, 0, 4.15, 1.85);
    box(0.75, 0.75, 0.6, mats.acid, 0, 4.15, 2.5);
    group.position.y = -3.7; // center the figure in frame
    scene.add(group);

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
      aria-label="rotatable pixel avatar of Elizabeth"
    />
  );
}
