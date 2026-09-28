import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { NIVELES, type NivelPrograma } from "@/data/niveles";

/* ────────────────────────────────────────────────────────────────
   Programas — "4 fases de dominio acuático"
   Diseño: riel de carriles editorial.

   Desktop: línea horizontal continua atraviesa la sección;
            4 marcadores (paradas) con contenido debajo.
   Móvil:   línea vertical a la izquierda; niveles apilados
            verticalmente con scroll normal de página.
   ──────────────────────────────────────────────────────────────── */

function NivelBloque({
  nivel,
  index,
}: {
  nivel: NivelPrograma;
  index: number;
}) {
  const isActual = nivel.estado === "actual";

  return (
    <Reveal delay={index * 0.1} style={{ height: "100%" }}>
      {/* Wrapper que se convierte en columna desktop / fila mobile */}
      <div
        className={`riel-bloque ${isActual ? "riel-bloque--actual" : ""}`}
        aria-label={`Nivel ${nivel.numero}: ${nivel.nombre}`}
      >
        {/* ── Parada en el riel ─────────────────────────────────────
            Desktop: flota sobre la línea horizontal (posición absoluta
            gestionada por el padre).
            Móvil: cabeza de la línea vertical izquierda.
        ──────────────────────────────────────────────────────────── */}
        <div className="riel-parada" aria-hidden="true">
          {/* Número de nivel */}
          <span
            className="tabular riel-num"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(0.9rem, 1.2vw, 1.1rem)",
              fontWeight: isActual ? 600 : 400,
              letterSpacing: "-0.01em",
              color: isActual ? "var(--color-accent)" : "var(--color-text-muted)",
              lineHeight: 1,
            }}
          >
            {nivel.numero}
          </span>
        </div>

        {/* ── Contenido del nivel ────────────────────────────────── */}
        <div className="riel-contenido">
          {/* Nombre */}
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.375rem, 2vw, 1.75rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "6px",
            }}
          >
            {nivel.nombre}
          </h3>

          {/* Rango de edad */}
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-muted)",
              marginBottom: "16px",
            }}
          >
            {nivel.rangoEdad}
          </p>

          {/* Ratio + sesiones en fila tabular */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "baseline",
              marginBottom: "20px",
              paddingBottom: "16px",
              borderBottom: "1px solid var(--color-line)",
            }}
          >
            <span
              className="tabular"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-small)",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {nivel.ratio}
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
              }}
            >
              ratio
            </span>
            <span
              style={{
                width: "1px",
                height: "12px",
                backgroundColor: "var(--color-line)",
                alignSelf: "center",
              }}
            />
            <span
              className="tabular"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--font-size-small)",
                fontWeight: 700,
                color: "var(--color-text)",
              }}
            >
              {nivel.sesiones}
            </span>
          </div>

          {/* Hitos en prosa */}
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-muted)",
              lineHeight: 1.65,
              marginBottom: "24px",
            }}
          >
            {nivel.hitos.join(", ").replace(/,([^,]*)$/, " y$1")}.
          </p>
        </div>
      </div>
    </Reveal>
  );
}

/* ── Sección completa ────────────────────────────────────────────── */
export function Programas() {
  return (
    <section
      id="programas"
      data-bg="light-alt"
      style={{
        paddingBlock: "var(--spacing-section)",
        "--color-text": "#0B1B24",
        "--color-text-muted": "#5C6A72",
        "--color-line": "rgba(11,27,36,0.12)",
        "--color-surface": "rgba(11,27,36,0.04)",
        "--color-surface-2": "#FFFFFF",
      } as React.CSSProperties}
    >
      <Container>
        {/* ── Cabecera ─────────────────────────────────────────────── */}
        <Reveal>
          <Eyebrow number="02">Trayectoria pedagógica</Eyebrow>
        </Reveal>

        <Reveal delay={0.08}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "var(--font-size-h2)",
              fontWeight: 400,
              lineHeight: 1.08,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginTop: "16px",
              marginBottom: "16px",
            }}
          >
            4 fases de dominio acuático.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "clamp(48px, 7vw, 80px)",
            }}
          >
            Cada nivel tiene hitos biomecánicos concretos antes de avanzar de
            carril, garantizando solidez de por vida.
          </p>
        </Reveal>

        {/* ── Riel ─────────────────────────────────────────────────────
            Desktop: contenedor con línea horizontal pseudo-elemento
                     + 4 columnas.
            Móvil:   flex-col con línea vertical a la izquierda.
        ─────────────────────────────────────────────────────────────── */}
        <div
          className="riel-root"
          role="list"
          aria-label="Niveles de la trayectoria pedagógica"
        >
          {/* Línea horizontal del riel (desktop) / vertical (móvil) */}
          <div className="riel-linea" aria-hidden="true" />

          {NIVELES.map((nivel, i) => (
            <div key={nivel.id} role="listitem">
              <NivelBloque nivel={nivel} index={i} />
            </div>
          ))}
        </div>
      </Container>

      {/* ── Scoped styles ────────────────────────────────────────────── */}
      <style>{`
        /* ───────────────────────────────────────────────
           DESKTOP ≥ 1024px — riel horizontal
        ─────────────────────────────────────────────── */
        .riel-root {
          position: relative;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          /* La línea se dibuja como pseudo del riel-linea */
          gap: 0 clamp(20px, 3vw, 40px);
        }

        /* Línea horizontal continua */
        .riel-linea {
          position: absolute;
          /* Alineada con el centro del punto marcador (~12px desde arriba del bloque) */
          top: 9px;
          left: 0;
          right: 0;
          height: 1px;
          background-color: var(--color-line);
          /* Ocultar en móvil — se reemplaza por línea vertical */
        }

        /* ── Bloque de cada nivel */
        .riel-bloque {
          display: flex;
          flex-direction: column;
          padding-top: 0;
        }

        /* ── Parada (marcador sobre la línea) */
        .riel-parada {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 24px;
          position: relative;
          /* z-index para tapar la línea detrás del dot */
          z-index: 1;
        }

        /* Punto marcador — contorno por defecto */
        .riel-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: 1.5px solid var(--color-text-muted);
          background-color: var(--bg-current, var(--color-canvas));
          flex-shrink: 0;
          transition: border-color var(--duration-md) var(--ease-out);
        }
        /* Marcador "actual" — relleno accent */
        .riel-dot--actual {
          background-color: var(--color-accent);
          border-color: var(--color-accent);
          box-shadow: 0 0 0 3px rgba(70,194,207,0.18);
        }

        /* Número junto al punto */
        .riel-num {
          /* visible junto al dot */
        }

        /* ── Contenido debajo de la parada */
        .riel-contenido {
          /* fluye naturalmente debajo del .riel-parada */
        }

        /* ── Separador vertical entre bloques en desktop */
        .riel-root > div:not(:first-child) .riel-contenido {
          /* bordes derecho en cada bloque excepto el último */
        }
        .riel-root > div:not(:last-child) {
          border-right: 1px solid var(--color-line);
          padding-right: clamp(20px, 3vw, 40px);
        }
        .riel-root > div:not(:first-child) {
          padding-left: 0; /* el gap del grid ya separa */
        }

        /* ───────────────────────────────────────────────
           MÓVIL / TABLET < 1024px — riel vertical
        ─────────────────────────────────────────────── */
        @media (max-width: 1023px) {
          .riel-root {
            display: flex;
            flex-direction: column;
            gap: 0;
            /* Dejar espacio para la línea vertical a la izquierda */
            padding-left: 28px;
            position: relative;
          }

          /* Línea vertical izquierda */
          .riel-linea {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 4px;          /* centrada con el dot */
            width: 1px;
            height: auto;
            background-color: var(--color-line);
          }

          /* El bloque ahora es fila: [parada izq] + [contenido der] */
          .riel-bloque {
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 0 20px;
            padding-bottom: 40px;
          }

          /* Parada — columna izquierda, el dot se alinea en la línea */
          .riel-parada {
            flex-direction: column;
            align-items: center;
            gap: 6px;
            margin-bottom: 0;
            padding-top: 2px;
            margin-left: -28px; /* saca el dot al borde de la línea */
          }

          /* Separador vertical entre bloques */
          .riel-root > div:not(:last-child) {
            border-right: none;
            padding-right: 0;
          }
        }

        @media (max-width: 767px) {
          .riel-root {
            padding-left: 24px;
          }
          .riel-parada {
            margin-left: -24px;
          }
          .riel-bloque {
            gap: 0 16px;
            padding-bottom: 36px;
          }
        }
      `}</style>
    </section>
  );
}
