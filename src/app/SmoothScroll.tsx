import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

declare global {
  interface Window { azLenis?: Lenis; azCover?: boolean }
}

gsap.registerPlugin(ScrollTrigger);

/** Lenis sincronizado con el ticker de GSAP para que ScrollTrigger y el scroll suave vayan al mismo cuadro. */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    const isFine = matchMedia("(pointer: fine)").matches;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFine || reduced) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenisRef.current = lenis;
    window.azLenis = lenis;
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      delete window.azLenis;
    };
  }, []);

  const first = useRef(true);
  useEffect(() => {
    const l = lenisRef.current;
    if (first.current) {
      /* Al recargar siempre arranca en la landing, sin #seccion en la URL */
      first.current = false;
      history.scrollRestoration = "manual";
      if (location.hash) history.replaceState(null, "", location.pathname);
      scrollTo(0, 0);
      return;
    }
    if (location.hash) {
      setTimeout(() => {
        if (l) l.scrollTo(location.hash, { offset: 0 });
        else document.querySelector(location.hash)?.scrollIntoView();
      }, 350);
    } else if (l) l.scrollTo(0, { immediate: true });
    else scrollTo(0, 0);
  }, [location.pathname, location.hash]);

  return <>{children}</>;
}
