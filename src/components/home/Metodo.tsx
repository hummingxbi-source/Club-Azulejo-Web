import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Divider } from "@/components/ui/Divider";
import { Reveal } from "@/components/ui/Reveal";
import metodoImg from "@/assets/images/metodo.webp";
import imgPilar01 from "@/assets/images/metodo-pilar-01-adaptacion.webp";
import imgPilar02 from "@/assets/images/metodo-pilar-02-biomecanica.webp";
import imgPilar03 from "@/assets/images/metodo-pilar-03-bitacora.webp";

/* ────────────────────────────────────────────────────────────────
   Metodo — sección "El Método" (Home)
   Layout: 2 cols desktop (panel izq. + contenido der.), apila móvil.
   ──────────────────────────────────────────────────────────────── */

const PILARES = [
  {
    num: "01",
    title: "Adaptación Consciente",
    body: "Antes de nadar, enseñamos a respirar. Cada alumno aprende a regular su respiración de forma consciente antes de la primera inmersión, sustituyendo el miedo por curiosidad. Practicamos la flotación horizontal sin chalecos rígidos ni flotadores artificiales, para que el cuerpo aprenda a confiar en el agua por sí mismo — la base de todo lo que viene después.",
    image: imgPilar01,
  },
  {
    num: "02",
    title: "Biomecánica FINA",
    body: "Grabamos cada sesión con cámaras subacuáticas HD para desglosar, cuadro a cuadro, el rolido escapular, la entrada de mano y la patada propulsiva de cada estilo. Nuestros instructores certificados FINA comparan el video con los lineamientos técnicos internacionales y ajustan la brazada en tiempo real, no después de meses de práctica repetida sin corrección.",
    image: imgPilar02,
  },
  {
    num: "03",
    title: "Bitácora Digital en Tiempo Real",
    body: "Al salir del agua, el progreso no se queda en la alberca. Cada instructor registra métricas de fatiga, repeticiones y el clip de video más relevante de la sesión directamente en el Portal de Familias, para que los padres vean —sesión a sesión— la evolución técnica real de su hijo, no solo una calificación genérica de fin de mes.",
    image: imgPilar03,
  },
] as const;

export function Metodo() {
  return (
    <section
      id="metodo"
      data-bg="light"
      style={{
        paddingBlock: "var(--spacing-section)",
        "--color-text": "#0B1B24",
        "--color-text-muted": "#5C6A72",
        "--color-line": "rgba(11,27,36,0.12)",
        "--color-surface": "rgba(11,27,36,0.04)",
        "--color-surface-2": "#FFFFFF",
      } as React.CSSProperties}
    >
      {/* ── Fila 1: imagen (bleed real) + intro. FUERA de <Container>. ── */}
      <div className="metodo-hero-row">
        <div className="metodo-panel-col">
          <div className="metodo-panel">
            <img
              src={metodoImg}
              alt="Método"
              loading="lazy"
              decoding="async"
              className="metodo-panel-image"
              style={{
                objectFit: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>

        <div className="metodo-content-col">
          <Reveal>
            <Eyebrow number="01">Pedagogía sensorial y científica</Eyebrow>
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
                marginBottom: "20px",
              }}
            >
              El Método Azulejo: la{" "}
              <span style={{ color: "var(--color-accent)" }}>calma</span> como
              catalizador del dominio técnico.
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "58ch",
                marginBottom: "16px",
              }}
            >
              Cada alumno avanza a su ritmo natural, sin miedos impuestos.
              Nuestro programa combina ciencia del movimiento con pedagogía
              sensorial para convertir el agua en un espacio de confianza.
            </p>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-muted)",
                lineHeight: 1.7,
                maxWidth: "58ch",
              }}
            >
              Enseñanza personalizada en agua templada con ratio 1:4,
              metodología propia y seguimiento continuo para cada alumno.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ── Fila 2: caption + pilares. DENTRO de <Container>, normal. ── */}
      <Container>
        <div style={{ marginTop: "clamp(40px, 6vw, 64px)" }}>
          <Reveal>
            <Eyebrow>Cómo trabajamos</Eyebrow>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
                fontWeight: 400,
                color: "var(--color-text)",
                marginTop: "12px",
                marginBottom: "clamp(40px, 6vw, 64px)",
              }}
            >
              Sesión a sesión, con evidencia.
            </h3>
          </Reveal>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(56px, 8vw, 96px)",
            }}
          >
            {PILARES.map(({ num, title, body, image }, i) => (
              <Reveal key={num}>
                <div
                  className={`metodo-pilar-row ${
                    i % 2 !== 0 ? "metodo-pilar-row-reverse" : ""
                  }`}
                >
                  <div className="metodo-pilar-image-col">
                    <img src={image} alt={title} className="metodo-pilar-image" loading="lazy" decoding="async" width={900} height={675} />
                  </div>
                  <div className="metodo-pilar-text-col">
                    <span
                      className="tabular"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
                        fontWeight: 400,
                        lineHeight: 1,
                        color: "var(--color-accent)",
                        letterSpacing: "-0.02em",
                        display: "block",
                        marginBottom: "16px",
                      }}
                    >
                      {num}
                    </span>
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        fontWeight: 400,
                        color: "var(--color-text)",
                        marginBottom: "16px",
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontSize: "var(--font-size-body)",
                        color: "var(--color-text-muted)",
                        lineHeight: 1.7,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>

      <style>{`
        .metodo-hero-row {
          display: flex;
          align-items: flex-start;
          width: 100%;
          max-width: 1700px;
          margin-inline: auto;
          gap: clamp(24px, 4vw, 64px);
          padding-right: max(var(--container-padding), calc((100vw - var(--container-max)) / 2));
        }
        .metodo-panel-col {
          flex: 1 1 42%;
          min-width: 0;
        }
        .metodo-content-col {
          flex: 1 1 55%;
          min-width: 0;
          padding-top: clamp(8px, 2vw, 24px);
        }
        .metodo-panel {
          position: relative;
          aspect-ratio: 4 / 5;
          border-radius: 0 var(--radius-card) var(--radius-card) 0;
          background-color: var(--color-surface);
          overflow: hidden;
        }
        .metodo-panel-image {
          position: absolute;
          inset: 0;
        }
        
        .metodo-pilar-row {
          display: grid;
          grid-template-columns: 5fr 7fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }
        .metodo-pilar-row-reverse {
          grid-template-columns: 7fr 5fr;
        }
        .metodo-pilar-row-reverse .metodo-pilar-image-col {
          order: 2;
        }
        .metodo-pilar-row-reverse .metodo-pilar-text-col {
          order: 1;
        }
        .metodo-pilar-image {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: var(--radius-card);
          border: 1px solid var(--color-line);
          display: block;
        }

        @media (max-width: 1023px) {
          .metodo-hero-row {
            flex-direction: column;
            padding-right: 0;
          }
          .metodo-panel-col {
            width: 100%;
          }
          .metodo-panel {
            aspect-ratio: 16 / 9;
            border-radius: var(--radius-card);
          }
          .metodo-content-col {
            padding-inline: var(--container-padding);
            padding-top: 24px;
          }
          
          .metodo-pilar-row, .metodo-pilar-row-reverse {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .metodo-pilar-row-reverse .metodo-pilar-image-col {
            order: 1;
          }
          .metodo-pilar-row-reverse .metodo-pilar-text-col {
            order: 2;
          }
        }
      `}</style>
    </section>
  );
}
