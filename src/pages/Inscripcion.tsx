/* Inscripción en línea — flujo por pasos con GSAP. SIMULACIÓN: no envía datos a ningún servidor. */
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { NIVELES } from "@/data/niveles";
import { WHATSAPP } from "@/lib/contacto";
import { Banderines } from "@/components/ui/Banderines";
import { PageHero, usePageFx, EXTRA } from "@/pages/Secciones";
import logo from "@/assets/images/logo-club.png";

type Prog = { id: string; num: string; nombre: string; edad: string; precio: string; detalle: string };
const PROGS: Prog[] = [
  ...NIVELES.map((n) => ({ id: n.id, num: n.numero, nombre: n.nombre, edad: n.rangoEdad, precio: EXTRA[n.id]?.precio + " / mes", detalle: EXTRA[n.id]?.freq || "" })),
  { id: "adultos", num: "A", nombre: "Adultos", edad: "18+ años", precio: "$1,250 / mes", detalle: "2 o 3 veces por semana" },
  { id: "privadas", num: "P", nombre: "Clases privadas", edad: "Todas las edades", precio: "$450 / clase", detalle: "Horario a convenir" },
];
const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const HORAS: Record<string, string[]> = { Mañana: ["7:00", "8:00", "9:00", "10:00"], Tarde: ["16:00", "17:00", "18:00"], Noche: ["19:00"] };
const EXP = ["Nunca ha nadado", "Flota con ayuda", "Nada un poco", "Nada con técnica"];
const PASOS = ["Programa", "Alumno", "Horario", "Contacto", "Confirmar"];

export default function Inscripcion() {
  const root = usePageFx();
  const panel = useRef<HTMLDivElement>(null);
  const [paso, setPaso] = useState(0);
  const [enviado, setEnviado] = useState(false);
  const [f, setF] = useState({ prog: "", alumno: "", edad: "", exp: "", dias: [] as string[], turno: "Tarde", hora: "", tutor: "", tel: "", email: "", acepto: false });
  const set = (k: keyof typeof f, v: unknown) => setF((o) => ({ ...o, [k]: v }));
  const prog = PROGS.find((p) => p.id === f.prog);
  const folio = useMemo(() => "AZ-" + Math.floor(1000 + Math.random() * 9000), [enviado]);

  const ok = [
    !!f.prog,
    f.alumno.trim().length > 2 && +f.edad > 0 && !!f.exp,
    f.dias.length > 0 && !!f.hora,
    f.tutor.trim().length > 2 && f.tel.replace(/\D/g, "").length >= 10 && /\S+@\S+\.\S+/.test(f.email),
    f.acepto,
  ][paso];

  useLayoutEffect(() => {
    if (!panel.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.from(panel.current!.children, { x: 60, opacity: 0, stagger: 0.06, duration: 0.6, ease: "power3.out" });
      gsap.to(".ins-prog i", { scaleX: (paso + (enviado ? 1 : 0)) / (PASOS.length - 1 || 1), duration: 0.8, ease: "power3.inOut" });
      if (enviado) gsap.from(".ins-ok .flag", { yPercent: -160, opacity: 0, stagger: { each: 0.03, from: "center" }, duration: 1, ease: "back.out(2.2)" });
    }, root);
    return () => ctx.revert();
  }, [paso, enviado]);

  const ir = (n: number) => { setPaso(n); window.azLenis?.scrollTo(".ins", { offset: -90 }); };
  const msg = `Hola, acabo de inscribirme en línea (folio ${folio}).\nPrograma: ${prog?.nombre}\nAlumno: ${f.alumno}, ${f.edad} años\nHorario: ${f.dias.join(", ")} a las ${f.hora}\nTutor: ${f.tutor} · ${f.tel}`;

  return (
    <div ref={root} className="az pg">
      <PageHero word="INSCRIPCIÓN" eyebrow="Aparta tu lugar" lead="En 5 pasos reservas tu lugar. La evaluación inicial es gratis y te confirmamos por WhatsApp." />
      <section className="pg-sec ins">
        <div className="wrap ins-grid">
          <aside className="ins-side">
            <div className="ins-card">
              <img src={logo} alt="" />
              <span className="eyebrow">Tu inscripción</span>
              <dl>
                <dt>Programa</dt><dd>{prog ? `${prog.nombre} · ${prog.edad}` : "—"}</dd>
                <dt>Alumno</dt><dd>{f.alumno ? `${f.alumno}${f.edad ? `, ${f.edad} años` : ""}` : "—"}</dd>
                <dt>Horario</dt><dd>{f.dias.length ? `${f.dias.join(" · ")}${f.hora ? ` · ${f.hora}` : ""}` : "—"}</dd>
                <dt>Contacto</dt><dd>{f.tutor || "—"}</dd>
              </dl>
              <div className="ins-total"><span>Mensualidad</span><b>{prog?.precio || "—"}</b><small>+ inscripción anual $500 · evaluación inicial gratis</small></div>
            </div>
          </aside>

          <div className="ins-main">
            <div className="ins-steps">
              <div className="ins-prog"><i /></div>
              {PASOS.map((p, i) => (
                <button key={p} className={i === paso && !enviado ? "on" : i < paso || enviado ? "done" : ""} disabled={enviado || i > paso} onClick={() => ir(i)}>
                  <span>{i < paso || enviado ? "✓" : i + 1}</span>{p}
                </button>
              ))}
            </div>

            {enviado ? (
              <div ref={panel} className="ins-panel ins-ok">
                <Banderines n={18} sag={44} />
                <h3>¡Bienvenido<br />al agua!</h3>
                <p>Recibimos la solicitud de <b>{f.alumno}</b> para <b>{prog?.nombre}</b>. Tu folio es <b className="folio">{folio}</b>.</p>
                <ol><li>Te escribimos por WhatsApp en menos de 24 h para confirmar.</li><li>Agendamos la evaluación gratuita en la alberca.</li><li>Pagas en recepción y empiezas a nadar.</li></ol>
                <div className="btns">
                  <a className="btn rojo" href={WHATSAPP.split("?")[0] + "?text=" + encodeURIComponent(msg)} target="_blank" rel="noopener">Confirmar por WhatsApp <span className="arr">→</span></a>
                  <Link className="btn ghost" to="/">Volver al inicio</Link>
                </div>
              </div>
            ) : (
              <div ref={panel} className="ins-panel" key={paso}>
                {paso === 0 && (<>
                  <h3>Elige el programa</h3>
                  <div className="ins-opts">
                    {PROGS.map((p) => (
                      <button key={p.id} className={"opt" + (f.prog === p.id ? " on" : "")} onClick={() => set("prog", p.id)}>
                        <span className="opt-n">{p.num}</span><b>{p.nombre}</b><small>{p.edad} · {p.detalle}</small><em>{p.precio}</em>
                      </button>
                    ))}
                  </div>
                </>)}
                {paso === 1 && (<>
                  <h3>Datos del alumno</h3>
                  <div className="ins-fields">
                    <label>Nombre completo<input value={f.alumno} onChange={(e) => set("alumno", e.target.value)} placeholder="Ej. Mateo Ramírez" /></label>
                    <label>Edad<input type="number" min={1} max={99} value={f.edad} onChange={(e) => set("edad", e.target.value)} placeholder="Años" /></label>
                  </div>
                  <p className="ins-lbl">¿Qué tanto nada hoy?</p>
                  <div className="chips">{EXP.map((x) => <button key={x} className={f.exp === x ? "on" : ""} onClick={() => set("exp", x)}>{x}</button>)}</div>
                </>)}
                {paso === 2 && (<>
                  <h3>Elige tu horario</h3>
                  <p className="ins-lbl">Días</p>
                  <div className="chips">{DIAS.map((d) => <button key={d} className={f.dias.includes(d) ? "on" : ""} onClick={() => set("dias", f.dias.includes(d) ? f.dias.filter((x) => x !== d) : [...f.dias, d])}>{d}</button>)}</div>
                  <p className="ins-lbl">Turno</p>
                  <div className="chips">{Object.keys(HORAS).map((t) => <button key={t} className={f.turno === t ? "on" : ""} onClick={() => { set("turno", t); set("hora", ""); }}>{t}</button>)}</div>
                  <p className="ins-lbl">Hora</p>
                  <div className="chips big">{HORAS[f.turno].map((h) => <button key={h} className={f.hora === h ? "on" : ""} onClick={() => set("hora", h)}>{h}</button>)}</div>
                  <p className="ins-note">Lugares sujetos a disponibilidad; te confirmamos al validar tu inscripción.</p>
                </>)}
                {paso === 3 && (<>
                  <h3>Datos de contacto</h3>
                  <div className="ins-fields">
                    <label className="full">Nombre del padre, madre o tutor<input value={f.tutor} onChange={(e) => set("tutor", e.target.value)} placeholder="Nombre completo" /></label>
                    <label>WhatsApp<input type="tel" value={f.tel} onChange={(e) => set("tel", e.target.value)} placeholder="55 1234 5678" /></label>
                    <label>Correo<input type="email" value={f.email} onChange={(e) => set("email", e.target.value)} placeholder="correo@ejemplo.com" /></label>
                  </div>
                </>)}
                {paso === 4 && (<>
                  <h3>Revisa y confirma</h3>
                  <div className="ins-review">
                    {[["Programa", `${prog?.nombre} · ${prog?.precio}`], ["Alumno", `${f.alumno}, ${f.edad} años · ${f.exp}`], ["Horario", `${f.dias.join(", ")} · ${f.hora}`], ["Contacto", `${f.tutor} · ${f.tel} · ${f.email}`]].map(([k, v], i) => (
                      <div key={k}><span>{k}</span><b>{v}</b><button onClick={() => ir(i)}>Editar</button></div>
                    ))}
                  </div>
                  <label className="ins-check"><input type="checkbox" checked={f.acepto} onChange={(e) => set("acepto", e.target.checked)} />Acepto el reglamento del club y el aviso de privacidad.</label>
                </>)}
                <div className="ins-nav">
                  {paso > 0 && <button className="btn ghost" onClick={() => ir(paso - 1)}>← Atrás</button>}
                  <button className="btn rojo" disabled={!ok} onClick={() => (paso < 4 ? ir(paso + 1) : setEnviado(true))}>
                    {paso < 4 ? "Continuar" : "Enviar inscripción"} <span className="arr">→</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
