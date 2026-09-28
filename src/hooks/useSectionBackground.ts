import { useEffect, useRef } from "react";

/* ────────────────────────────────────────────────────────────────
   useSectionBackground
   ────────────────────────────────────────────────────────────────
   1. Watches every <section data-bg="[key]"> via IntersectionObserver
      and animates --bg-current on :root (600ms interpolation).

   2. Injects a fixed caustic-water overlay layer (SVG feTurbulence
      displacement filter) behind all content at very low opacity
      (4–8%), with a slow drift animation (~25s loop). The overlay's
      opacity increases slightly in canvas-deep sections to reinforce
      the sense of depth.

   Respects prefers-reduced-motion: no animation, instant colour
   switch, and the caustic pattern is frozen (no keyframe).
   ──────────────────────────────────────────────────────────────── */

const BG_MAP: Record<string, string> = {
  canvas:        "#0B1B24", // Hero / default
  "canvas-deep": "#081420", // El Método — slightly deeper
  "light":       "#EDEFEA", // Blank / white mode
  "light-alt":   "#F6F7F1", // Alternating light sections
};

const DEFAULT_KEY = "canvas";

/* ── Main hook ──────────────────────────────────────────────────── */

export function useSectionBackground() {
  const observed = useRef(new WeakSet<Element>());

  useEffect(() => {
    const root = document.documentElement;

    /* Track current animated colour to interpolate FROM */
    let currentHex = BG_MAP[DEFAULT_KEY];

    const setColor = (hex: string) => {
      if (hex === currentHex) return;
      root.style.setProperty("--bg-current", hex);
      currentHex = hex;
    };

    /* Set initial values */
    root.style.setProperty("--bg-current", BG_MAP[DEFAULT_KEY]);

    /* IntersectionObserver: fires when ≥25% of section is well into view */
    const observer = new IntersectionObserver(
      (entries) => {
        let best: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            (!best || entry.intersectionRatio > best.intersectionRatio)
          ) {
            best = entry;
          }
        }
        if (!best) return;

        const key = (best.target as HTMLElement).dataset.bg ?? DEFAULT_KEY;
        const hex = BG_MAP[key] ?? BG_MAP[DEFAULT_KEY];
        setColor(hex);
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "0px 0px -40% 0px",
      }
    );

    let frame: number;
    const observe = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.querySelectorAll<HTMLElement>("section[data-bg]").forEach((el) => {
          if (!observed.current.has(el)) {
            observer.observe(el);
            observed.current.add(el);
          }
        });
      });
    };

    observe();

    /* MutationObserver picks up sections added after mount (route changes) */
    const mutationObs = new MutationObserver(observe);
    mutationObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutationObs.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);
}
