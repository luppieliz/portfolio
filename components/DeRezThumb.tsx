"use client";

import { useEffect, useRef, useState } from "react";

// Pixelated-by-default thumbnail: the image is drawn onto a ~26-column
// canvas (no smoothing) that sits on top and de-rezzes away on hover/focus.
export default function DeRezThumb({ src, alt }: { src: string; alt: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const cvRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    const cv = cvRef.current;
    if (!img || !cv) return;
    const build = () => {
      try {
        const cols = 26;
        const rows =
          Math.round(cols * (img.naturalHeight / img.naturalWidth)) || 20;
        cv.width = cols;
        cv.height = rows;
        const ctx = cv.getContext("2d");
        if (!ctx) return;
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(img, 0, 0, cols, rows);
        setReady(true);
      } catch {
        /* tainted or failed — skip effect gracefully */
      }
    };
    if (img.complete && img.naturalWidth) build();
    else img.addEventListener("load", build);
    return () => img.removeEventListener("load", build);
  }, [src]);

  return (
    <div className="thumb">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setFailed(true)}
      />
      {!failed && <canvas ref={cvRef} className={ready ? "ready" : ""} />}
    </div>
  );
}
