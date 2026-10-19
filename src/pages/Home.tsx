import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Banderines } from "@/components/ui/Banderines";
import { NIVELES } from "@/data/niveles";
import { INSTRUCTORES } from "@/data/instructores";
import { GALERIA, type ItemGaleria } from "@/data/galeria";
import { WHATSAPP } from "@/lib/contacto";
import logo from "@/assets/images/logo-club.png";
import alberca from "@/assets/images/club-alberca-carriles.webp";
import heroImg from "@/assets/images/club-hero-2.webp";
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

gsap.registerPlugin(ScrollTrigger);

const FOTOS: Record<string, string> = { "valeria-montes": fValeria, "marcos-estrada": fMarcos, "elena-santillan": fElena };

const PILARES = [
  { img: pilar1, t: "Adaptación consciente", p: "Antes de nadar, enseñamos a respirar. Cada alumno aprende a regular su respiración y a flotar sin chalecos rígidos, para que el cuerpo confíe en el agua por sí mismo." },
  { img: pilar2, t: "Técnica corregida en tiempo real", p: "Grabamos las sesiones con cámara subacuática para revisar brazada, entrada de mano y patada de cada estilo, y corregir en el momento, no después de meses de repetir errores." },
  { img: pilar3, t: "Progreso visible para la familia", p: "Al salir del agua, el avance no se queda en la alberca: cada instructor registra lo trabajado en el Portal de Familias para que veas la evolución sesión a sesión." },
];

const SHOTS = [
  { img: alberca, t: "La alberca", p: "Techada, con carriles delimitados para trabajar por nivel.", w: 1320, h: 1087 },
  { img: banderines, t: "Ambiente de club", p: "Banderines, color y una casa que se siente propia.", w: 1062, h: 1335 },
  { img: gradas, t: "Gradas para familias", p: "Acompaña la clase completa desde el mezzanine, detrás del cristal.", w: 1320, h: 1602 },
  { img: calidad, t: "Agua bajo control", p: "Revisamos la calidad del agua de forma constante.", w: 1062, h: 1335 },
  { img: recepcion, t: "Recepción", p: "Inscripciones, pagos y dudas, en persona.", w: 1320, h: 1611 },
  { img: sala, t: "Sala de espera", p: "Un lugar cómodo antes y después de cada clase.", w: 1062, h: 1335 },
  { img: muro, t: "Agua templada", p: "Alberca templada todo el año.", w: 1062, h: 1335 },
  { img: fachada, t: "Te esperamos", p: "Encuéntranos por la fachada azul del club.", w: 1320, h: 1065 },
];

const MANI = "Antes de nadar, enseñamos a *respirar. En Club Azulejo cada alumno aprende a ^confiar en el agua a su ritmo, con instructores que corrigen en tiempo real y familias que ven el progreso clase a clase.";
const CINTA = ["Natación", "Técnica", "Seguridad", "Confianza", "Desde los 4 años", "Alto rendimiento"];
const AR = ["4/5", "1/1", "4/5.4", "4/4.6", "1/1.2", "4/5", "1/1", "4/4.8"];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [foto, setFoto] = useState<ItemGaleria | null>(null);
  const cols = [0, 1, 2].map((c) => GALERIA.filter((_, i) => i % 3 === c));

  useLayoutEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = matchMedia("(pointer: fine)").matches;
    const offs: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(t: EventTarget, ev: K | string, fn: (e: never) => void) => {
      t.addEventListener(ev, fn as EventListener); offs.push(() => t.removeEventListener(ev, fn as EventListener));
    };
    const mm = gsap.matchMedia();

    const mega = root.current!.querySelector<HTMLElement>(".mega")!;
    const fit = () => { mega.style.fontSize = ""; const fs = parseFloat(getComputedStyle(mega).fontSize); const par = mega.parentElement!, cs = getComputedStyle(par), avail = par.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight); mega.style.fontSize = Math.min(fs * (avail / mega.scrollWidth), 300) + "px"; };
    fit(); document.fonts?.ready.then(() => { fit(); ScrollTrigger.refresh(); });
    on(window, "resize", fit);
    const ctx = gsap.context(() => {
      if (reduce) { gsap.set(".intro", { display: "none" }); return; }

      /* Intro: logo + palabra, cortina que sube y entra el hero */
      const hero = gsap.timeline({ paused: true })
        .from(".mega .ch", { yPercent: 115, rotate: () => gsap.utils.random(-14, 14), stagger: 0.06, duration: 1.2, ease: "expo.out" })
        .from(".hero .flag", { yPercent: -160, opacity: 0, stagger: { each: 0.025, from: "center" }, duration: 1, ease: "back.out(2.2)" }, "<.1")
        .from(".hero .flags path", { opacity: 0, duration: 0.6 }, "<")
        .from(".hero-copy > *", { y: 40, opacity: 0, stagger: 0.08, duration: 0.9, ease: "power3.out" }, "-=.9")
        .from(".hero-media", { y: 120, opacity: 0, duration: 1.2, ease: "power3.out" }, "<.1");
      if (window.azCover) { gsap.set(".intro", { display: "none" }); hero.play(); } else gsap.timeline()
        .from(".intro img", { scale: 0, rotate: -220, duration: 0.9, ease: "back.out(1.7)" })
        .from(".intro .k span", { yPercent: 110, stagger: 0.05, duration: 0.6, ease: "power4.out" }, "-=.45")
        .to(".intro .k span", { yPercent: -110, stagger: 0.03, duration: 0.4, ease: "power3.in" }, "+=.35")
        .to(".intro img", { scale: 0.3, opacity: 0, duration: 0.4, ease: "power3.in" }, "<")
        .to(".intro", { clipPath: "inset(0 0 100% 0)", duration: 0.85, ease: "power4.inOut" }, "-=.1")
        .add(() => { hero.play(); }, "-=.55")
        .set(".intro", { display: "none" });

      /* Banderines: vaivén constante + viento con el scroll y el mouse */
      const loops: gsap.core.Tween[] = [];
      const flagsEls = gsap.utils.toArray<HTMLElement>(".flags");
      let target = 0, cur = 0, vel = 0, speed = 1;
      const gust = (v: number) => { target = gsap.utils.clamp(-22, 22, target + v); };
      const tickWind = () => {
        target *= 0.9; cur += (target - cur) * 0.12;
        if (Math.abs(cur) > 0.01 || target !== 0) flagsEls.forEach((f) => f.style.setProperty("--wind", cur.toFixed(2)));
        vel *= 0.92; const want = 1 + Math.min(4, Math.abs(vel));
        speed += (want - speed) * 0.1; loops.forEach((t) => t.timeScale(speed * dir));
      };
      let dir = 1;
      gsap.ticker.add(tickWind); offs.push(() => gsap.ticker.remove(tickWind));
      if (fine) on(window, "mousemove", (e: MouseEvent) => gust(e.movementX * 0.08));

      /* Hero en scroll */
      gsap.to(".mega", { yPercent: 35, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.fromTo(".hero-media", { clipPath: "inset(0% 8% 0% 8% round 28px)" }, { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "none", scrollTrigger: { trigger: ".hero-media", start: "top 85%", end: "top 15%", scrub: true } });
      gsap.fromTo(".hero-media img", { scale: 1.04 }, { scale: 1, ease: "none", scrollTrigger: { trigger: ".hero-media", start: "top bottom", end: "bottom top", scrub: true } });

      /* Cinta + cuerdas de carril, aceleran con la velocidad del scroll */
      loops.push(
        gsap.to(".mq-track", { xPercent: -50, duration: 32, repeat: -1, ease: "none" }),
        ...gsap.utils.toArray<HTMLElement>(".rope.run i").map((el, i) =>
          gsap.fromTo(el, { x: i % 2 ? -440 : 0 }, { x: i % 2 ? 0 : -440, duration: 7, repeat: -1, ease: "none" })));
      ScrollTrigger.create({ onUpdate: (s) => { const v = s.getVelocity(); gust(v / 900); vel = v / 400; dir = s.direction; } });

      /* Manifiesto palabra por palabra */
      gsap.to(".mani .w", { opacity: 1, stagger: 0.05, ease: "none", scrollTrigger: { trigger: ".mani", start: "top 78%", end: "bottom 55%", scrub: true } });
      gsap.fromTo(".mani-waves", { rotation: -30 }, { rotation: 60, ease: "none", scrollTrigger: { trigger: ".manifesto", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.from(".mani-foot div", { y: 40, opacity: 0, stagger: 0.1, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: ".mani-foot", start: "top 88%" } });

      /* Títulos */
      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) =>
        gsap.from(el, { y: 60, opacity: 0, duration: 1.1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 88%" } }));

      /* Método: tarjetas que se apilan */
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      cards.forEach((c, i) => {
        gsap.from(c.querySelector("img"), { scale: 1.3, ease: "none", scrollTrigger: { trigger: c, start: "top bottom", end: "top 20%", scrub: true } });
        if (i < cards.length - 1)
          gsap.to(c, { scale: 0.92, filter: "brightness(.7)", ease: "none", scrollTrigger: { trigger: cards[i + 1], start: "top 75%", end: "top 25%", scrub: true } });
      });

      /* Programas: el nadador recorre cada carril */
      gsap.utils.toArray<HTMLElement>(".lane-wrap").forEach((w) => {
        const sw = w.querySelector<HTMLElement>(".swimmer")!, rope = w.querySelector<HTMLElement>(".lane-rope")!;
        gsap.from(w.querySelector(".lane"), { y: 50, opacity: 0, duration: 0.9, ease: "power3.out", scrollTrigger: { trigger: w, start: "top 85%" } });
        gsap.fromTo(sw, { x: 0, rotation: 0 }, { x: () => rope.offsetWidth - sw.offsetWidth, rotation: 360, ease: "none", scrollTrigger: { trigger: w, start: "top 80%", end: "bottom 30%", scrub: 0.6, invalidateOnRefresh: true } });
      });

      /* Cifras */
      gsap.utils.toArray<HTMLElement>("[data-n]").forEach((b) => {
        const o = { v: 0 }, n = +b.dataset.n!, dec = +(b.dataset.d || 0), pre = b.dataset.p || "", suf = b.querySelector("sup")?.outerHTML || "";
        ScrollTrigger.create({ trigger: ".facts", start: "top 85%", once: true, onEnter: () => gsap.to(o, { v: n, duration: 1.6, ease: "power2.out", onUpdate: () => { b.innerHTML = pre + o.v.toFixed(dec) + suf; } }) });
      });

      /* Equipo */
      gsap.from(".coach", { y: 100, opacity: 0, rotate: (i) => [-2, 1.5, -1][i], stagger: 0.12, duration: 1, ease: "power3.out", scrollTrigger: { trigger: ".coaches", start: "top 82%" } });

      /* CTA */
      gsap.from(".cta h2", { scale: 0.65, ease: "none", scrollTrigger: { trigger: ".cta", start: "top bottom", end: "center center", scrub: true } });
      gsap.from(".cta .flag", { yPercent: -160, opacity: 0, stagger: { each: 0.02, from: "edges" }, duration: 0.9, ease: "back.out(2)", scrollTrigger: { trigger: ".cta", start: "top 75%" } });

      mm.add("(min-width: 901px)", () => {
        /* El club: riel horizontal anclado */
        const rail = document.querySelector<HTMLElement>(".rail")!;
        const dist = () => rail.scrollWidth - innerWidth;
        const tw = gsap.to(rail, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: ".club", start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true } });
        gsap.to(".rail-progress i", { scaleX: 1, ease: "none", scrollTrigger: { trigger: ".club", start: "top top", end: () => "+=" + dist(), scrub: true, invalidateOnRefresh: true } });
        gsap.utils.toArray<HTMLElement>(".shot").forEach((s) =>
          gsap.fromTo(s.querySelector("img"), { scale: 1.12 }, { scale: 1, ease: "none", scrollTrigger: { trigger: s, containerAnimation: tw, start: "left right", end: "center center", scrub: true } }));
        /* Galería en columnas con distinta velocidad */
        [-10, 8, -16].forEach((y, i) => gsap.to(`.gcol:nth-child(${i + 1})`, { yPercent: y, ease: "none", scrollTrigger: { trigger: ".gcols", start: "top bottom", end: "bottom top", scrub: true } }));
      });

      if (fine) {
        /* Cursor + botones magnéticos + tarjetas con inclinación */
        const cur = document.querySelector<HTMLElement>(".cursor")!;
        const cx = gsap.quickTo(cur, "x", { duration: 0.3, ease: "power3" }), cy = gsap.quickTo(cur, "y", { duration: 0.3, ease: "power3" });
        on(window, "mousemove", (e: MouseEvent) => { cx(e.clientX); cy(e.clientY); });
        on(document, "mouseover", (e: MouseEvent) => cur.classList.toggle("big", !!(e.target as HTMLElement).closest("a,button,.gitem")));
        gsap.utils.toArray<HTMLElement>(".btn").forEach((b) => {
          on(b, "mousemove", (e: MouseEvent) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.3, y: (e.clientY - r.top - r.height / 2) * 0.4, duration: 0.4, ease: "power3.out" }); });
          on(b, "mouseleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1,.4)" }));
        });
        gsap.utils.toArray<HTMLElement>(".coach").forEach((c) => {
          on(c, "mousemove", (e: MouseEvent) => { const r = c.getBoundingClientRect(); gsap.to(c, { rotateY: ((e.clientX - r.left) / r.width - 0.5) * 10, rotateX: -((e.clientY - r.top) / r.height - 0.5) * 8, duration: 0.5, ease: "power2.out" }); });
          on(c, "mouseleave", () => gsap.to(c, { rotateX: 0, rotateY: 0, duration: 0.9, ease: "elastic.out(1,.5)" }));
        });
        gsap.utils.toArray<HTMLElement>(".mega .ch").forEach((ch) =>
          on(ch, "mouseenter", () => gsap.fromTo(ch, { yPercent: 0 }, { yPercent: -12, duration: 0.22, yoyo: true, repeat: 1, ease: "power2.out" })));
      }
    }, root);

    const refresh = () => ScrollTrigger.refresh();
    on(window, "load", refresh);
    const t = setTimeout(refresh, 900);
    return () => { clearTimeout(t); offs.forEach((f) => f()); mm.revert(); ctx.revert(); };
  }, []);

  return (
    <div ref={root} className="az">
      <div className="intro" aria-hidden>
        <img src={logo} alt="" />
        <div className="k">{"CLUB AZULEJO".split("").map((c, i) => <span key={i}>{c === " " ? "\u00A0" : c}</span>)}</div>
      </div>
      <div className="cursor" aria-hidden />

      {/* HERO */}
      <header className="hero" id="inicio">
        <Banderines n={26} sag={58} />
        <div className="wrap hero-in">
          <span className="eyebrow hero-eye">Club</span>
          <h1 className="mega" aria-label="Club Azulejo">{"AZULEJO".split("").map((c, i) => <span key={i} className="ch" aria-hidden>{c}</span>)}</h1>
          <div className="hero-grid">
            <div className="hero-copy">
              <h2>Donde la técnica se convierte en <em>serenidad.</em></h2>
              <div className="btns">
                <Link className="btn rojo" to="/inscripcion">Inscríbete <span className="arr">→</span></Link>
                <a className="btn ghost" href="/#club">Conoce el club</a>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <img src={heroImg} alt="Muro con el logo de Club Azulejo, Escuela de Natación, frente a la alberca" fetchPriority="high" />
        </div>
      </header>

      {/* CINTA + CUERDAS */}
      <div className="lane-band" aria-hidden>
        <div className="rope run"><i /></div>
        <div className="mq"><div className="mq-track">{[0, 1].map((k) => CINTA.map((w) => <span key={k + w}>{w}<b /></span>))}</div></div>
        <div className="rope run"><i /></div>
      </div>

      {/* MANIFIESTO */}
      <section className="manifesto" id="nosotros">
        <svg className="mani-waves" viewBox="0 0 200 200" aria-hidden>
          <defs><clipPath id="mani-clip"><circle cx="100" cy="100" r="76.5" /></clipPath></defs>
          <circle cx="100" cy="100" r="80" />
          <g clipPath="url(#mani-clip)">{[62, 88, 114, 140].map((y) => <path key={y} d={`M10,${y} q15,-16 30,0 t30,0 t30,0 t30,0 t30,0 t30,0`} />)}</g>
        </svg>
        <div className="wrap">
          <span className="eyebrow">Nuestra filosofía</span>
          <p className="mani">{MANI.split(" ").map((w, i) => <span key={i}><span className={"w" + (w[0] === "*" ? " b" : w[0] === "^" ? " r" : "")}>{w.replace(/^[*^]/, "")}</span> </span>)}</p>
          <div className="mani-foot">
            <div><b>Confianza primero</b>Sin prisas ni flotadores rígidos: el alumno avanza cuando su cuerpo está listo.</div>
            <div><b>Grupos reducidos</b>Pocos alumnos por instructor para que cada brazada reciba atención.</div>
            <div><b>Familias informadas</b>Sabes qué se trabajó en cada clase y qué sigue.</div>
          </div>
        </div>
      </section>

      {/* MÉTODO */}
      <section className="metodo" id="metodo">
        <div className="wrap">
          <div className="metodo-head reveal">
            <div><span className="eyebrow">El método</span><h2 className="h2">Pedagogía sensorial<br />y <em>científica.</em></h2></div>
            <p className="lead">Tres pilares que convierten el miedo en curiosidad y la curiosidad en técnica.</p>
          </div>
          <div className="stack">
            {PILARES.map((p, i) => (
              <article key={i} className="stack-card" style={{ ["--i" as string]: i }}>
                <div className="txt"><span className="n">0{i + 1}</span><h3>{p.t}</h3><p>{p.p}</p></div>
                <figure><img src={p.img} alt={p.t} loading="lazy" /></figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EL CLUB */}
      <section className="club" id="club">
        <div className="wrap club-head reveal">
          <div><span className="eyebrow">El club</span><h2 className="h2 club-h2">Un espacio pensado para <em>el agua.</em></h2></div>
          <p className="lead">Instalaciones techadas, limpias y cuidadas, con espacios cómodos para que las familias acompañen cada clase.</p>
        </div>
        <div className="rail">
          {SHOTS.map((s, i) => (
            <figure key={i} className="shot" style={{ margin: 0 }}>
              <div className="ph"><img src={s.img} alt={s.t + " — Club Azulejo"} width={s.w} height={s.h} loading="eager" decoding="async" /></div>
              <figcaption className="cap"><span>0{i + 1}</span><div><b>{s.t}</b><p>{s.p}</p></div></figcaption>
            </figure>
          ))}
        </div>
        <div className="rail-progress"><i /></div>
      </section>

      {/* PROGRAMAS */}
      <section className="programas" id="programas">
        <div className="wrap">
          <div className="reveal"><span className="eyebrow">Programas</span><h2 className="h2">4 fases de<br />dominio acuático.</h2></div>
          <div className="lanes">
            {NIVELES.map((n) => (
              <div key={n.id} className="lane-wrap">
                <div className="lane-rope"><div className="rope"><i /></div><span className="swimmer"><img src={logo} alt="" /></span></div>
                <article className="lane">
                  <span className="num">{n.numero}</span>
                  <div><h3>{n.nombre}</h3><div className="meta"><span>{n.rangoEdad}</span><span>{n.sesiones}</span></div></div>
                  <div className="ratio">{n.ratio}<small>Alumnos por instructor</small></div>
                  <ul>{n.hitos.map((h) => <li key={h}>{h}</li>)}</ul>
                </article>
              </div>
            ))}
            <div className="rope"><i /></div>
          </div>
        </div>
      </section>

      {/* CIFRAS */}
      <div className="wrap">
        <div className="facts">
          <div className="fact"><b data-n="31.2" data-d="1">31.2<sup>°C</sup></b><span>Agua templada todo el año</span></div>
          <div className="fact"><b data-n="4" data-p="1:">1:4</b><span>Alumnos por instructor (promedio)</span></div>
          <div className="fact"><b data-n="4">4</b><span>Niveles de aprendizaje</span></div>
          <div className="fact"><b data-n="6">6<sup>días</sup></b><span>De clases a la semana</span></div>
        </div>
      </div>

      {/* EQUIPO */}
      <section className="equipo" id="equipo">
        <div className="wrap">
          <div className="reveal"><span className="eyebrow">El equipo</span><h2 className="h2">Maestros &amp;<br /><em>entrenadores.</em></h2>
            <p className="lead" style={{ marginTop: 20 }}>Un cuerpo técnico certificado que acompaña a cada alumno desde su primera inmersión hasta la competencia.</p></div>
          <div className="coaches">
            {INSTRUCTORES.map((c) => (
              <article key={c.id} className="coach">
                <div className="ph">
                  <img src={FOTOS[c.id]} alt={c.nombre} loading="lazy" />
                  <span className="tag">{c.especialidadBadge}</span>
                  <div className="certs"><b>Certificaciones</b><ul>{c.certificaciones.map((x) => <li key={x}>{x}</li>)}</ul></div>
                </div>
                <div className="bd"><h3>{c.nombre}</h3><div className="rol">{c.rol}</div><p>{c.bio}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section className="galeria" id="galeria">
        <div className="wrap">
          <div className="reveal"><span className="eyebrow">Galería</span><h2 className="h2">Momentos<br /><em>Azulejo.</em></h2></div>
          <div className="gcols">
            {cols.map((col, ci) => (
              <div key={ci} className="gcol">
                {col.map((g) => (
                  <button key={g.id} className="gitem" onClick={() => setFoto(g)} style={{ ["--ar" as string]: AR[GALERIA.indexOf(g)] }} aria-label={"Ver " + g.titulo}>
                    <img src={g.imagenUrl} alt={g.titulo} loading="lazy" />
                    <span className="ov"><small>{g.categoria}</small><b>{g.titulo}</b></span>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" id="contacto">
        <Banderines n={22} sag={50} />
        <div className="wrap">
          <span className="eyebrow">Inscripciones abiertas</span>
          <Link className="big" to="/inscripcion" aria-label="Inscríbete"><h2>AL AGUA</h2></Link>
          <p>Elige el nivel, aparta tu lugar y nosotros nos encargamos del resto. ¿Dudas? Escríbenos y te ayudamos a elegir el programa ideal.</p>
          <div className="btns">
            <Link className="btn blanco" to="/inscripcion">Inscribirme <span className="arr">→</span></Link>
            <a className="btn ghost" href={WHATSAPP} target="_blank" rel="noopener">Escríbenos por WhatsApp</a>
          </div>
        </div>
      </section>

      <a className="fab" href={WHATSAPP} target="_blank" rel="noopener" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.4-.3Z" /></svg>
      </a>

      {foto && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setFoto(null)}>
          <button className="btn ghost" onClick={() => setFoto(null)}>Cerrar ✕</button>
          <figure onClick={(e) => e.stopPropagation()}><img src={foto.imagenUrl} alt={foto.titulo} /><figcaption><b>{foto.titulo}</b>{foto.descripcionCorta}</figcaption></figure>
        </div>
      )}
    </div>
  );
}
