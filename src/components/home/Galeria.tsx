import { useState, useEffect } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GALERIA, type CategoriaGaleria, type ItemGaleria } from "@/data/galeria";
import { ImageIcon, X } from "lucide-react";

/* ────────────────────────────────────────────────────────────────
   Galería — "Momentos Azulejo"
   Fila de filtros + Grid de imágenes (placeholders).
   ──────────────────────────────────────────────────────────────── */

const CATEGORIAS: ("Todos" | CategoriaGaleria)[] = [
  "Todos",
  "Clases",
  "Exhibiciones",
  "Torneos",
  "Reconocimientos",
];

const getDesktopSpanClass = (index: number, length: number) => {
  if (length === 8) {
    if (index === 0) return "desktop-span-2x2";
    if (index === 5) return "desktop-span-2x1";
    return "desktop-span-1x1";
  }
  if (length === 2) {
    return "desktop-span-2x2";
  }
  return "desktop-span-1x1";
};

export function Galeria() {
  const [filtroActivo, setFiltroActivo] = useState<"Todos" | CategoriaGaleria>("Todos");
  const [itemActivo, setItemActivo] = useState<ItemGaleria | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setItemActivo(null);
    };
    if (itemActivo) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [itemActivo]);

  const itemsMostrados =
    filtroActivo === "Todos"
      ? GALERIA
      : GALERIA.filter((item) => item.categoria === filtroActivo);

  return (
    <section
      id="galeria"
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
        {/* ── Cabecera */}
        <Reveal>
          <Eyebrow number="04">Momentos Azulejo</Eyebrow>
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
            Galería.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "clamp(32px, 5vw, 48px)",
            }}
          >
            Torneos, exhibiciones y reconocimientos de nuestra comunidad.
          </p>
        </Reveal>

        {/* ── Filtros */}
        <Reveal delay={0.2}>
          <div
            style={{
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
              marginBottom: "clamp(32px, 5vw, 48px)",
            }}
          >
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setFiltroActivo(cat)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--font-size-small)",
                  padding: "8px 16px",
                  borderRadius: "var(--radius-pill)",
                  border: `1px solid ${
                    filtroActivo === cat ? "var(--color-accent)" : "var(--color-line)"
                  }`,
                  backgroundColor: filtroActivo === cat ? "rgba(70,194,207,0.12)" : "transparent",
                  color: filtroActivo === cat ? "var(--color-accent)" : "var(--color-text-muted)",
                  transition: "all var(--duration-sm) var(--ease-out)",
                  cursor: "pointer",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        {/* ── Grid de Galería */}
        <div className="galeria-grid">
          {itemsMostrados.map((item, index) => {
            const spanClass = getDesktopSpanClass(index, itemsMostrados.length);
            return (
              <div key={item.id} className={`galeria-cell ${spanClass}`}>
                <Reveal delay={index * 0.05} style={{ height: "100%" }}>
                  <div
                    className="galeria-item"
                    aria-label={`Imagen: ${item.titulo}`}
                    onClick={() => setItemActivo(item)}
                    style={{ position: "relative", width: "100%", height: "100%" }}
                  >
                    {item.imagenUrl && (
                      <img
                        src={item.imagenUrl}
                        alt={item.titulo}
                        loading="lazy"
                        decoding="async"
                        style={{
                          objectFit: "cover",
                          width: "100%",
                          height: "100%",
                          position: "absolute",
                          inset: 0,
                        }}
                      />
                    )}
                  {!item.imagenUrl && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ImageIcon size={28} color="var(--color-text-muted)" opacity={0.4} />
                    </div>
                  )}
                  {/* Overlay texto al fondo */}
                  <div className="galeria-overlay">
                    <span
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.6875rem",
                        fontWeight: 600,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--color-accent)",
                        marginBottom: "4px",
                        display: "block",
                      }}
                    >
                      {item.categoria}
                    </span>
                    <h4
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1.125rem",
                        fontWeight: 400,
                        color: "var(--color-surface-2)",
                      }}
                    >
                      {item.titulo}
                    </h4>
                  </div>
                </div>
              </Reveal>
            </div>
            );
          })}
        </div>
      </Container>

      {/* ── Lightbox Modal ── */}
      {itemActivo && (
        <div
          className="galeria-lightbox"
          onClick={() => setItemActivo(null)}
        >
          <div
            className="galeria-lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="galeria-lightbox-close"
              onClick={() => setItemActivo(null)}
              aria-label="Cerrar"
            >
              <X size={24} />
            </button>
            <div className="galeria-lightbox-image-container">
              {itemActivo.imagenUrl ? (
                <img
                  src={itemActivo.imagenUrl}
                  alt={itemActivo.titulo}
                  className="galeria-lightbox-image"
                />
              ) : (
                <div className="galeria-lightbox-placeholder">
                  <ImageIcon size={48} color="var(--color-text-muted)" opacity={0.4} />
                </div>
              )}
            </div>
            <div className="galeria-lightbox-text">
              <span
                style={{
                  fontSize: "var(--font-size-eyebrow)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--color-text-muted)",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                {itemActivo.categoria}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "var(--font-size-h3)",
                  fontWeight: 400,
                  color: "var(--color-text)",
                  marginBottom: "8px",
                }}
              >
                {itemActivo.titulo}
              </h3>
              <p
                style={{
                  fontSize: "var(--font-size-body)",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.6,
                }}
              >
                {itemActivo.descripcionCorta}
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .galeria-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-auto-rows: 200px;
          grid-auto-flow: row;
          gap: clamp(12px, 1.5vw, 20px);
        }
        


        .galeria-item {
          position: relative;
          background-color: var(--color-surface-2);
          border-radius: var(--radius-card);
          overflow: hidden;
          border: 1px solid var(--color-line);
          cursor: pointer;
          height: 100%;
        }

        @media (min-width: 1024px) {
          .desktop-span-2x2 {
            grid-column: span 2;
            grid-row: span 2;
          }
          .desktop-span-2x1 {
            grid-column: span 2;
            grid-row: span 1;
          }
          .desktop-span-1x1 {
            grid-column: span 1;
            grid-row: span 1;
          }
        }
        
        .galeria-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 24px;
          background: linear-gradient(to top, rgba(8,20,32,0.9) 0%, rgba(8,20,32,0) 100%);
        }

        @media (hover: hover) {
          .galeria-overlay {
            opacity: 0;
            transition: opacity var(--duration-sm) var(--ease-out);
          }
          .galeria-item:hover .galeria-overlay {
            opacity: 1;
          }
        }

        .galeria-lightbox {
          position: fixed;
          inset: 0;
          z-index: 100;
          background-color: rgba(8,20,32,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--container-padding);
        }

        .galeria-lightbox-content {
          position: relative;
          width: 100%;
          max-width: 900px;
          background-color: var(--color-surface-2);
          border-radius: var(--radius-card);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .galeria-lightbox-close {
          position: absolute;
          top: 16px;
          right: 16px;
          z-index: 10;
          background: transparent;
          border: none;
          color: var(--color-text-muted);
          cursor: pointer;
          padding: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .galeria-lightbox-image-container {
          width: 100%;
          max-height: 65vh;
          background-color: var(--color-surface);
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .galeria-lightbox-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .galeria-lightbox-placeholder {
          width: 100%;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .galeria-lightbox-text {
          padding: clamp(24px, 4vw, 32px);
        }

        @media (max-width: 1023px) {
          .galeria-grid {
            grid-template-columns: repeat(2, 1fr);
            grid-auto-rows: auto;
          }
          .galeria-cell {
            aspect-ratio: 4 / 3;
          }
        }
        @media (max-width: 767px) {
          .galeria-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
