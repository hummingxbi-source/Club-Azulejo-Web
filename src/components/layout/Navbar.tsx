import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import logo from "@/assets/images/logo-club.png";

export const NAV_LINKS: [string, string][] = [
  ["metodo", "Método"], ["club", "El club"], ["programas", "Programas"], ["equipo", "Equipo"], ["galeria", "Galería"],
];

const WORDS: Record<string, string> = {
  inicio: "CLUB AZULEJO", metodo: "MÉTODO", club: "EL CLUB", programas: "PROGRAMAS", equipo: "EQUIPO",
  galeria: "GALERÍA", contacto: "CONTACTO", inscripcion: "INSCRIPCIÓN",
};

export function Navbar() {
  const navigate = useNavigate();
  const curtain = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const [open, setOpen] = useState(false);
  const nav = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY, el = nav.current;
      if (!el) return;
      el.classList.toggle("solid", y > 40);
      el.classList.toggle("hide", y > last && y > 500 && !open);
      last = y;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open || !menu.current) return;
    window.azLenis?.stop();
    const ctx = gsap.context(() => {
      gsap.fromTo(menu.current, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.8, ease: "power4.inOut" });
      gsap.from("a", { yPercent: 80, opacity: 0, stagger: 0.06, delay: 0.25, duration: 0.6, ease: "power3.out" });
    }, menu);
    return () => { ctx.revert(); window.azLenis?.start(); };
  }, [open]);

  /* Cortina negra con el nombre de la sección (como Soka) */
  const pathRef = useRef(pathname);
  pathRef.current = pathname;
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a");
      const href = a?.getAttribute("href");
      if (!a || !href || e.metaKey || e.ctrlKey || e.shiftKey || a.target === "_blank") return;
      const m = href.match(/^\/?(#([\w-]+))?$|^\/(inscripcion)$/);
      if (!m) return;
      e.preventDefault();
      if (busy.current) return;
      setOpen(false);
      const id = m[2] || (m[3] ? "" : "inicio"), route = m[3] ? "/inscripcion" : "/";
      const key = m[3] || id;
      const k = curtain.current!.querySelector<HTMLElement>(".k")!;
      k.innerHTML = (WORDS[key] || "CLUB AZULEJO").split("").map((c) => `<span>${c === " " ? "&nbsp;" : c}</span>`).join("");
      const jump = () => {
        const l = window.azLenis;
        if (id === "inicio" || !id) { l ? l.scrollTo(0, { immediate: true, force: true }) : scrollTo(0, 0); return; }
        ScrollTrigger.refresh();
        const el = document.getElementById(id);
        if (!el) return;
        const box = el.parentElement?.classList.contains("pin-spacer") ? el.parentElement : el;
        const y = box.getBoundingClientRect().top + scrollY;
        l ? l.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y);
      };
      if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
        if (route !== pathRef.current) navigate(route + (id && id !== "inicio" ? "#" + id : "")); else jump();
        return;
      }
      busy.current = true;
      const spans = k.querySelectorAll("span");
      const isHome = key === "inicio", img = curtain.current!.querySelector("img");
      curtain.current!.classList.toggle("logo", isHome);
      gsap.timeline()
        .set(curtain.current, { display: "grid", clipPath: "inset(100% 0 0 0)" })
        .to(curtain.current, { clipPath: "inset(0% 0 0 0)", duration: 0.6, ease: "power4.inOut" })
        .fromTo(img, { scale: 0, rotate: -220, opacity: 1 }, { scale: isHome ? 1 : 0, rotate: 0, duration: 0.9, ease: "back.out(1.7)" }, "-=.15")
        .fromTo(spans, { yPercent: 110 }, { yPercent: 0, stagger: 0.04, duration: 0.5, ease: "power4.out" }, isHome ? "-=.45" : "<")
        .add(() => {
          if (route !== pathRef.current) { window.azCover = true; navigate(route); }
        })
        .add(() => { jump(); window.azCover = false; }, "+=.35")
        .to(spans, { yPercent: -110, stagger: 0.03, duration: 0.4, ease: "power3.in" }, "+=.1")
        .to(img, { scale: 0.3, opacity: 0, duration: 0.4, ease: "power3.in" }, "<")
        .to(curtain.current, { clipPath: "inset(0 0 100% 0)", duration: 0.7, ease: "power4.inOut" }, "-=.1")
        .set(curtain.current, { display: "none" })
        .add(() => { busy.current = false; });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [navigate]);

  return (
    <>
      <nav ref={nav} className="az-nav" aria-label="Principal">
        <div className="wrap">
          <Link to="/" className="brand" aria-label="Club Azulejo, inicio">
            <img src={logo} alt="" width={40} height={40} />
            <span>Club Azulejo<small>Escuela de natación</small></span>
          </Link>
          <div className="links">
            {NAV_LINKS.map(([id, t]) => <Link key={id} to={"/#" + id}>{t}</Link>)}
          </div>
          <div className="right">
            <Link to="/inscripcion" className="btn rojo">Inscríbete <span className="arr">→</span></Link>
            <button className="burger" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen(!open)}>
              {open ? "✕" : <span />}
            </button>
          </div>
        </div>
      </nav>
      <div ref={curtain} className="curtain" aria-hidden><div><img src={logo} alt="" /><div className="k" /></div></div>
      {open && (
        <div ref={menu} className="mmenu" role="dialog" aria-modal="true">
          {NAV_LINKS.map(([id, t]) => <Link key={id} to={"/#" + id}>{t}</Link>)}
          <Link to="/inscripcion" className="btn blanco">Inscríbete →</Link>
        </div>
      )}
    </>
  );
}
