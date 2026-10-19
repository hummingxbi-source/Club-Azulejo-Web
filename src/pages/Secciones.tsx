/* Páginas de sección — Club Azulejo. Contenido SIMULADO para demo (precios, horarios y textos por confirmar con el club). */
import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Banderines } from "@/components/ui/Banderines";
import { NIVELES } from "@/data/niveles";
import { INSTRUCTORES } from "@/data/instructores";
import { GALERIA } from "@/data/galeria";
import { WHATSAPP } from "@/lib/contacto";
import logo from "@/assets/images/logo-club.png";
import heroImg from "@/assets/images/club-hero-2.webp";
import alberca from "@/assets/images/club-alberca-carriles.webp";
import banderines from "@/assets/images/club-banderines.webp";
import gradas from "@/assets/images/club-gradas.webp";
import calidad from "@/assets/images/club-calidad-agua.webp";
import recepcion from "@/assets/images/club-recepcion.webp";
import sala from "@/assets/images/club-sala.webp";
import fachada from "@/assets/images/club-fachada.webp";
import muro from "@/assets/images/club-muro.webp";
import pilar1 from "@/assets/images/metodo-pilar-01-adaptacion.webp";
import pilar2 from "@/assets/images/metodo-pilar-02-biomecanica.webp";
import pilar3 from "@/assets/images/metodo-pilar-03-bitacora.webp";
import fValeria from "@/assets/images/instructor-valeria-montes.webp";
import fMarcos from "@/assets/images/instructor-marcos-estrada.webp";
import fElena from "@/assets/images/instructor-elena-santillan.webp";

gsap.registerPlugin(ScrollTrigger, Flip);

/* ── efectos comunes de página ── */
export function usePageFx(extra?: (root: HTMLElement) => void) {
  const root = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const el = root.current!;
    const word = el.querySelector<HTMLElement>(".ph-word");
    const fit = () => {
      if (!word) return;
      word.style.fontSize = "";
      const par = word.parentElement!, cs = getComputedStyle(par);
      const avail = par.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      word.style.fontSize = Math.min(parseFloat(getComputedStyle(word).fontSize) * (avail / word.scrollWidth), 260) + "px";
    };
    fit(); addEventListener("resize", fit);
    document.fonts?.ready.then(() => { fit(); ScrollTrigger.refresh(); });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.timeline({ delay: 0.15 })
        .from(".ph-word span", { yPercent: 115, rotate: () => gsap.utils.random(-12, 12), stagger: 0.05, duration: 1.1, ease: "expo.out" })
        .from(".ph-hero .flag", { yPercent: -160, opacity: 0, stagger: { each: 0.02, from: "center" }, duration: 0.9, ease: "back.out(2)" }, "<")
        .from(".ph-hero .lead, .ph-hero .eyebrow", { y: 30, opacity: 0, stagger: 0.08, duration: 0.8, ease: "power3.out" }, "-=.8")
        .from(".ph-img", { clipPath: "inset(100% 0 0 0 round 28px)", duration: 1.3, ease: "power4.inOut" }, "-=.9");
      gsap.to(".ph-img img", { yPercent: 12, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".ph-img", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".ph-word", { yPercent: 40, opacity: 0.2, ease: "none", scrollTrigger: { trigger: ".ph-hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((r) =>
        gsap.from(r, { y: 60, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: r, start: "top 88%" } }));
      gsap.utils.toArray<HTMLElement>(".rise").forEach((r) => {
        gsap.fromTo(r, { clipPath: "inset(18% 10% 18% 10% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 24px)", ease: "none", scrollTrigger: { trigger: r, start: "top 90%", end: "top 35%", scrub: true } });
        const img = r.querySelector("img");
        if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, ease: "none", scrollTrigger: { trigger: r, start: "top bottom", end: "bottom top", scrub: true } });
      });
      gsap.utils.toArray<HTMLElement>(".stagger").forEach((g) =>
        gsap.from(g.children, { y: 70, opacity: 0, rotate: (i) => (i % 2 ? 1.5 : -1.5), stagger: 0.1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: g, start: "top 85%" } }));
      extra?.(el);
    }, el);
    const t = setTimeout(() => ScrollTrigger.refresh(), 700);
    return () => { clearTimeout(t); removeEventListener("resize", fit); ctx.revert(); };
  }, []);
  return root;
}

export function PageHero({ word, eyebrow, lead, img }: { word: string; eyebrow: string; lead: string; img?: string }) {
  return (
    <header className="ph-hero">
      <Banderines n={24} sag={48} />
      <div className="wrap">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className="ph-word" aria-label={word}>{word.split("").map((c, i) => <span key={i} aria-hidden>{c === " " ? " " : c}</span>)}</h1>
        <p className="lead">{lead}</p>
      </div>
      {img && <div className="ph-img"><img src={img} alt="" /></div>}
    </header>
  );
}

function Cta({ titulo = "AL AGUA", texto }: { titulo?: string; texto: string }) {
  return (
    <section className="cta">
      <Banderines n={22} sag={50} />
      <div className="wrap">
        <span className="eyebrow">Inscripciones abiertas</span>
        <Link className="big" to="/inscripcion"><h2>{titulo}</h2></Link>
        <p>{texto}</p>
        <div className="btns">
          <Link className="btn blanco" to="/inscripcion">Inscribirme <span className="arr">→</span></Link>
          <a className="btn ghost" href={WHATSAPP} target="_blank" rel="noopener">Escríbenos por WhatsApp</a>
        </div>
      </div>
    </section>
  );
}

const Head = ({ eb, children, lead }: { eb: string; children: ReactNode; lead?: string }) => (
  <div className="pg-head reveal"><div><span className="eyebrow">{eb}</span><h2 className="h2">{children}</h2></div>{lead && <p className="lead">{lead}</p>}</div>
);

/* ═════════ MÉTODO ═════════ */
const PILARES = [
  { img: pilar1, t: "Adaptación consciente", p: "Antes de nadar, enseñamos a respirar. Burbujas, apneas cortas y flotación sin chalecos rígidos: el cuerpo aprende a confiar en el agua por sí mismo.", pts: ["Respiración guiada", "Flotación dorsal y ventral", "Cero flotadores rígidos"] },
  { img: pilar2, t: "Técnica corregida al momento", p: "Grabamos fragmentos de la clase con cámara subacuática y el instructor corrige brazada, patada y respiración en ese mismo momento.", pts: ["Video subacuático", "Un estilo por sesión", "Corrección individual"] },
  { img: pilar3, t: "Progreso visible para la familia", p: "Cada clase queda registrada en el Portal de Familias: lo que se trabajó, cómo le fue y cuál es el siguiente objetivo.", pts: ["Bitácora por clase", "Clips de avance", "Evaluación mensual"] },
];
const CLASE = [
  ["0′", "Bienvenida y calentamiento", "Movilidad fuera del agua y entrada segura por escalera."],
  ["5′", "Respiración y flotación", "Burbujas, apneas cortas y flotación sin apoyo."],
  ["15′", "Técnica del día", "Un estilo por sesión, corregido dentro del agua y en video."],
  ["35′", "Juego dirigido", "Retos por equipos que refuerzan lo aprendido."],
  ["45′", "Cierre y bitácora", "Estiramiento y registro del avance en el portal."],
];
const SEGURIDAD = ["Salvavidas certificado en cada turno", "Máximo 4 alumnos por instructor", "Calidad del agua revisada varias veces al día", "Acceso controlado y gradas separadas para familias", "Protocolo de emergencia y botiquín a la vista"];

export function MetodoPage() {
  const root = usePageFx(() => {
    gsap.fromTo(".tl-line i", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: ".tl", start: "top 70%", end: "bottom 60%", scrub: true } });
    gsap.utils.toArray<HTMLElement>(".tl-item").forEach((it) =>
      gsap.from(it, { x: 60, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: it, start: "top 80%" } }));
  });
  return (
    <div ref={root} className="az pg">
      <PageHero word="MÉTODO" eyebrow="Cómo enseñamos" lead="Pedagogía sensorial y científica: primero confianza, después técnica, siempre con seguridad." img={alberca} />
      <section className="pg-sec">
        <div className="wrap">
          <Head eb="Los 3 pilares">Del miedo a la <em>técnica.</em></Head>
          {PILARES.map((p, i) => (
            <article key={i} className={"feat" + (i % 2 ? " rev" : "")}>
              <figure className="rise"><img src={p.img} alt={p.t} loading="lazy" /></figure>
              <div className="reveal"><span className="feat-n">0{i + 1}</span><h3>{p.t}</h3><p>{p.p}</p><ul className="pts">{p.pts.map((x) => <li key={x}>{x}</li>)}</ul></div>
            </article>
          ))}
        </div>
      </section>
      <section className="pg-sec azul">
        <div className="wrap">
          <Head eb="Una clase de 50 minutos" lead="Así se vive una sesión típica en Club Azulejo, sin importar el nivel.">Cada minuto <em className="w">cuenta.</em></Head>
          <div className="tl">
            <div className="tl-line"><i /></div>
            {CLASE.map(([t, h, p]) => <div key={t} className="tl-item"><span>{t}</span><div><b>{h}</b><p>{p}</p></div></div>)}
          </div>
        </div>
      </section>
      <section className="pg-sec blanco">
        <div className="wrap split">
          <Head eb="Seguridad">Tranquilidad <em>dentro y fuera</em> del agua.</Head>
          <ul className="checks stagger">{SEGURIDAD.map((s) => <li key={s}>{s}</li>)}</ul>
        </div>
      </section>
      <Cta texto="Agenda una clase y vive el método desde la primera brazada." />
    </div>
  );
}

/* ═════════ EL CLUB ═════════ */
const FOTOS_CLUB = [
  { img: alberca, t: "La alberca" }, { img: banderines, t: "Ambiente de club" }, { img: gradas, t: "Gradas para familias" }, { img: calidad, t: "Agua bajo control" },
  { img: recepcion, t: "Recepción" }, { img: sala, t: "Sala de espera" }, { img: muro, t: "Agua templada" }, { img: fachada, t: "Fachada" },
];
const AMENIDADES = [
  ["Alberca techada", "Climatizada y protegida del clima los 365 días."],
  ["Carriles por nivel", "Cada grupo trabaja en su espacio, sin interrupciones."],
  ["Gradas para familias", "Mira la clase completa desde el mezzanine, detrás del cristal."],
  ["Vestidores y regaderas", "Limpios, separados y con agua caliente."],
  ["Recepción y sala", "Atención en persona y espera cómoda."],
  ["Agua cuidada", "Revisión constante de pH, cloro y temperatura."],
];

export function ClubPage() {
  const root = usePageFx(() => {
    gsap.utils.toArray<HTMLElement>(".bento figure").forEach((f) =>
      gsap.fromTo(f.querySelector("img"), { yPercent: -10 }, { yPercent: 10, ease: "none", scrollTrigger: { trigger: f, start: "top bottom", end: "bottom top", scrub: true } }));
    gsap.from(".bento figure", { y: 120, opacity: 0, stagger: 0.08, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: ".bento", start: "top 80%" } });
  });
  return (
    <div ref={root} className="az pg">
      <PageHero word="EL CLUB" eyebrow="Instalaciones" lead="Un espacio techado, limpio y cuidado, pensado para aprender a nadar con calma." img={heroImg} />
      <section className="pg-sec">
        <div className="wrap">
          <Head eb="Recorrido" lead="Conoce cada rincón antes de tu primera clase.">Bienvenido a <em>casa.</em></Head>
          <div className="bento">{FOTOS_CLUB.map((f, i) => <figure key={i}><img src={f.img} alt={f.t} loading="lazy" /><figcaption>{f.t}</figcaption></figure>)}</div>
        </div>
      </section>
      <section className="pg-sec blanco">
        <div className="wrap">
          <Head eb="Amenidades">Todo lo que <em>necesitas.</em></Head>
          <div className="amen stagger">{AMENIDADES.map(([t, p], i) => <div key={t}><span>0{i + 1}</span><b>{t}</b><p>{p}</p></div>)}</div>
        </div>
      </section>
      <section className="pg-sec">
        <div className="wrap split">
          <Head eb="Visítanos" lead="Pasa a conocernos: te mostramos la alberca y resolvemos tus dudas.">Horarios del <em>club.</em></Head>
          <div className="horario reveal">
            {[["Lunes a viernes", "6:00 – 20:00"], ["Sábado", "7:00 – 14:00"], ["Domingo", "Cerrado"]].map(([d, h]) => <div key={d}><span>{d}</span><b>{h}</b></div>)}
            <p>Dirección por confirmar · Estacionamiento cercano</p>
          </div>
        </div>
      </section>
      <Cta texto="Ven a conocer la alberca y aparta tu lugar." />
    </div>
  );
}

/* ═════════ PROGRAMAS ═════════ */
export const EXTRA: Record<string, { precio: string; dur: string; freq: string; desc: string }> = {
  acuaticos: { precio: "$1,190", dur: "45 min", freq: "2 veces por semana", desc: "Primer contacto con el agua: juego, confianza y flotación autónoma." },
  exploradores: { precio: "$1,290", dur: "50 min", freq: "2 o 3 veces por semana", desc: "Crol y dorso completos con respiración correcta." },
  navegantes: { precio: "$1,390", dur: "50 min", freq: "3 veces por semana", desc: "Los 4 estilos, salidas, virajes y primeras marcas de tiempo." },
  elite: { precio: "$1,690", dur: "75 min", freq: "4 a 5 veces por semana", desc: "Entrenamiento para competencia con plan de temporada." },
};
const OTROS = [
  ["Adultos", "18+ años", "$1,250 / mes", "Aprende desde cero o perfecciona tu técnica en horarios de mañana y noche."],
  ["Clases privadas", "Todas las edades", "$450 / clase", "Uno a uno con instructor, ideal para miedo al agua o metas específicas."],
  ["Curso de verano", "4–14 años", "$2,900 / 3 semanas", "Natación diaria, juegos acuáticos y convivencia."],
];
const FAQ = [
  ["¿Necesito saber nadar para inscribirme?", "No. Hacemos una evaluación gratuita y te ubicamos en el nivel ideal."],
  ["¿Qué debo llevar?", "Traje de baño, gorra, goggles, sandalias y toalla."],
  ["¿Puedo ver la clase?", "Sí, desde las gradas para familias en el mezzanine."],
  ["¿Hay inscripción anual?", "Sí, $500 que incluye evaluación inicial y acceso al Portal de Familias."],
];

export function ProgramasPage() {
  const [faq, setFaq] = useState(-1);
  const root = usePageFx(() => {
    gsap.utils.toArray<HTMLElement>(".prog").forEach((p) => {
      gsap.from(p.querySelector(".prog-num"), { xPercent: -40, opacity: 0, ease: "none", scrollTrigger: { trigger: p, start: "top 90%", end: "top 40%", scrub: true } });
      gsap.fromTo(p.querySelector(".swimmer"), { x: 0 }, { x: () => p.offsetWidth - 40, rotation: 360, ease: "none", scrollTrigger: { trigger: p, start: "top 85%", end: "bottom 30%", scrub: 0.6, invalidateOnRefresh: true } });
    });
  });
  return (
    <div ref={root} className="az pg">
      <PageHero word="PROGRAMAS" eyebrow="4 fases de dominio acuático" lead="Un camino claro desde el primer chapuzón hasta la competencia, con grupos reducidos en cada etapa." />
      <section className="pg-sec azul">
        <div className="wrap">
          {NIVELES.map((n) => {
            const x = EXTRA[n.id];
            return (
              <article key={n.id} className="prog">
                <div className="lane-rope"><div className="rope"><i /></div><span className="swimmer"><img src={logo} alt="" /></span></div>
                <div className="prog-grid">
                  <span className="prog-num">{n.numero}</span>
                  <div><h3>{n.nombre}</h3><p>{x?.desc}</p><div className="meta"><span>{n.rangoEdad}</span><span>{n.sesiones}</span><span>{x?.dur}</span></div></div>
                  <ul>{n.hitos.map((h) => <li key={h}>{h}</li>)}</ul>
                  <div className="price"><b>{x?.precio}</b><small>/ mes · {x?.freq}</small><span>Ratio {n.ratio}</span></div>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <section className="pg-sec">
        <div className="wrap">
          <Head eb="Más programas">Para toda la <em>familia.</em></Head>
          <div className="otros stagger">{OTROS.map(([t, e, p, d]) => <div key={t}><span>{e}</span><h3>{t}</h3><p>{d}</p><b>{p}</b></div>)}</div>
        </div>
      </section>
      <section className="pg-sec blanco">
        <div className="wrap split">
          <Head eb="Preguntas frecuentes">Resolvemos tus <em>dudas.</em></Head>
          <div className="faq reveal">{FAQ.map(([q, a], i) => (
            <div key={i} className={"faq-i" + (faq === i ? " on" : "")}>
              <button onClick={() => setFaq(faq === i ? -1 : i)} aria-expanded={faq === i}>{q}<span>+</span></button>
              <div className="faq-a"><p>{a}</p></div>
            </div>))}
          </div>
        </div>
      </section>
      <Cta texto="La evaluación inicial es gratis: te decimos el nivel ideal en una sola clase." />
    </div>
  );
}

/* ═════════ EQUIPO ═════════ */
const FOTOS: Record<string, string> = { "valeria-montes": fValeria, "marcos-estrada": fMarcos, "elena-santillan": fElena };
const FRASES: Record<string, string> = {
  "valeria-montes": "Un niño que confía en el agua aprende el doble de rápido.",
  "marcos-estrada": "La técnica se corrige en el momento, no después de mil repeticiones.",
  "elena-santillan": "Nadar bien es nadar seguro. Lo demás llega solo.",
};
const VALORES = [["Paciencia", "Cada alumno avanza a su ritmo, sin presión."], ["Técnica", "Formación continua y certificaciones vigentes."], ["Seguridad", "Primeros auxilios y salvamento acuático al día."]];

export function EquipoPage() {
  const root = usePageFx();
  return (
    <div ref={root} className="az pg">
      <PageHero word="EQUIPO" eyebrow="Maestros & entrenadores" lead="Un cuerpo técnico certificado que acompaña a cada alumno desde su primera inmersión hasta la competencia." />
      <section className="pg-sec">
        <div className="wrap">
          {INSTRUCTORES.map((c, i) => (
            <article key={c.id} className={"feat prof" + (i % 2 ? " rev" : "")}>
              <figure className="rise"><img src={FOTOS[c.id]} alt={c.nombre} loading="lazy" /></figure>
              <div className="reveal">
                <span className="tag-b">{c.especialidadBadge}</span>
                <h3>{c.nombre}</h3><div className="rol">{c.rol}</div>
                <blockquote>“{FRASES[c.id]}”</blockquote>
                <p>{c.bio}</p>
                <ul className="pts">{c.certificaciones.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="pg-sec blanco">
        <div className="wrap">
          <Head eb="Lo que nos mueve">Nuestros <em>valores.</em></Head>
          <div className="amen stagger">{VALORES.map(([t, p], i) => <div key={t}><span>0{i + 1}</span><b>{t}</b><p>{p}</p></div>)}</div>
        </div>
      </section>
      <Cta titulo="ÚNETE" texto="¿Eres instructor certificado? Escríbenos y forma parte del equipo Azulejo." />
    </div>
  );
}

/* ═════════ GALERÍA (filtros con GSAP Flip) ═════════ */
const ITEMS = [
  ...GALERIA.map((g) => ({ id: g.id, cat: g.categoria as string, t: g.titulo, d: g.descripcionCorta, img: g.imagenUrl })),
  ...FOTOS_CLUB.map((f, i) => ({ id: "club-" + i, cat: "Instalaciones", t: f.t, d: "Club Azulejo", img: f.img })),
];
const CATS = ["Todo", "Instalaciones", "Clases", "Torneos", "Exhibiciones", "Reconocimientos"];

export function GaleriaPage() {
  const [cat, setCat] = useState("Todo");
  const [foto, setFoto] = useState<(typeof ITEMS)[number] | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const root = usePageFx(() => {
    gsap.from(".gal-grid .gal-it", { y: 100, opacity: 0, stagger: 0.05, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".gal-grid", start: "top 85%" } });
  });
  const filtrar = (c: string) => {
    if (c === cat) return;
    const items = grid.current!.querySelectorAll(".gal-it");
    const state = Flip.getState(items);
    items.forEach((it) => ((it as HTMLElement).style.display = c === "Todo" || (it as HTMLElement).dataset.cat === c ? "" : "none"));
    Flip.from(state, { duration: 0.7, ease: "power3.inOut", absolute: true, scale: true, onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.6 }), onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.8, duration: 0.4 }), onComplete: () => ScrollTrigger.refresh() });
    setCat(c);
  };
  return (
    <div ref={root} className="az pg">
      <PageHero word="GALERÍA" eyebrow="Momentos Azulejo" lead="Clases, torneos, exhibiciones y el día a día en nuestra alberca." />
      <section className="pg-sec">
        <div className="wrap">
          <div className="filtros reveal">{CATS.map((c) => <button key={c} className={c === cat ? "on" : ""} onClick={() => filtrar(c)}>{c}</button>)}</div>
          <div ref={grid} className="gal-grid">
            {ITEMS.map((g, i) => (
              <button key={g.id} className={"gal-it gitem" + (i % 5 === 0 ? " big" : "")} data-cat={g.cat} onClick={() => setFoto(g)} aria-label={"Ver " + g.t}>
                <img src={g.img} alt={g.t} loading="lazy" />
                <span className="ov"><small>{g.cat}</small><b>{g.t}</b></span>
              </button>
            ))}
          </div>
        </div>
      </section>
      <Cta titulo="TU TURNO" texto="El próximo momento Azulejo puede ser el tuyo." />
      {foto && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setFoto(null)}>
          <button className="btn ghost" onClick={() => setFoto(null)}>Cerrar ✕</button>
          <figure onClick={(e) => e.stopPropagation()}><img src={foto.img} alt={foto.t} /><figcaption><b>{foto.t}</b>{foto.d}</figcaption></figure>
        </div>
      )}
    </div>
  );
}
