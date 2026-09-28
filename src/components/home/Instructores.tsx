import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Card } from "@/components/ui/Card";
import { Reveal } from "@/components/ui/Reveal";
import { Divider } from "@/components/ui/Divider";
import { Button } from "@/components/ui/Button";
import { INSTRUCTORES, type InstructorData } from "@/data/instructores";
import fotoValeria from "@/assets/images/instructor-valeria-montes.webp";
import fotoMarcos from "@/assets/images/instructor-marcos-estrada.webp";
import fotoElena from "@/assets/images/instructor-elena-santillan.webp";

const FOTOS: Record<string, string> = {
  "valeria-montes": fotoValeria,
  "marcos-estrada": fotoMarcos,
  "elena-santillan": fotoElena,
};

/* ────────────────────────────────────────────────────────────────
   Instructores — "Cuerpo Técnico Colegiado"
   Layout: grid 3 columnas desktop, 1 columna móvil.
   Diseño esqueleto — se refinará en sesión posterior.
   ──────────────────────────────────────────────────────────────── */

function InstructorCard({ instructor }: { instructor: InstructorData }) {
  return (
    <Card style={{ padding: 0, display: "flex", flexDirection: "column", height: "100%" }}>
      {/* ── Bloque de foto (placeholder) ───────────────────────── */}
      <div style={{ position: "relative" }}>
        <img
          src={FOTOS[instructor.id]}
          alt={`Foto de ${instructor.nombre}`}
          loading="lazy"
          decoding="async"
          width={800}
          height={1000}
          style={{
            aspectRatio: "4 / 5",
            objectFit: "cover",
            objectPosition: "center top",
            width: "100%",
            height: "100%",
            display: "block",
            borderRadius: "var(--radius-card) var(--radius-card) 0 0",
          }}
        />
        {/* Badge de especialidad superpuesto */}
        <span
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            display: "inline-block",
            backgroundColor: "rgba(8, 20, 32, 0.72)",
            backdropFilter: "blur(4px)",
            border: "none",
            borderRadius: "var(--radius-pill)",
            padding: "4px 12px",
            fontFamily: "var(--font-body)",
            fontSize: "0.6875rem",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#EDEFEA",
          }}
        >
          {instructor.especialidadBadge}
        </span>
      </div>

      {/* ── Contenido textual ──────────────────────────────────── */}
      <div
        style={{
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
          gap: "12px",
        }}
      >
        {/* Nombre */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2vw, 1.5rem)",
              fontWeight: 400,
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              color: "var(--color-text)",
              marginBottom: "4px",
            }}
          >
            {instructor.nombre}
          </h3>
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-muted)",
              lineHeight: 1.4,
            }}
          >
            {instructor.rol}
          </p>
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "var(--font-size-small)",
            color: "var(--color-text-muted)",
            lineHeight: 1.65,
            minHeight: "calc(1.65em * 4)",
          }}
        >
          {instructor.bio}
        </p>

        {/* Meta row */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "4px", marginTop: "8px" }}>
          <span
            style={{
              fontSize: "var(--font-size-eyebrow)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
              fontWeight: 600,
            }}
          >
            {instructor.statLabel}
          </span>
          <span
            className="tabular"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
              color: "var(--color-text)",
              fontWeight: 400,
              lineHeight: 1.1,
            }}
          >
            {instructor.statValue}
          </span>
        </div>

        <Divider />

        {/* Certificaciones */}
        <div style={{ flex: 1, marginTop: "auto" }}>
          <div
            style={{
              fontSize: "var(--font-size-eyebrow)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--color-text-muted)",
              marginBottom: "8px",
            }}
          >
            Certificaciones
          </div>
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text)",
              lineHeight: 1.6,
            }}
          >
            {instructor.certificaciones.join(" · ")}
          </p>
        </div>

      </div>
    </Card>
  );
}

/* ── Sección completa ────────────────────────────────────────────── */
export function Instructores() {
  return (
    <section
      id="instructores"
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
      <Container>
        {/* ── Cabecera */}
        <Reveal>
          <Eyebrow number="03">Maestros &amp; Entrenadores</Eyebrow>
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
            Cuerpo Técnico Colegiado.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <p
            style={{
              fontSize: "var(--font-size-body)",
              color: "var(--color-text-muted)",
              lineHeight: 1.7,
              maxWidth: "52ch",
              marginBottom: "clamp(40px, 6vw, 64px)",
            }}
          >
            Especialistas con certificación FINA, Cruz Roja Mexicana en
            Salvamento Acuático y formación en psicología infantil.
          </p>
        </Reveal>

        {/* ── Grid de instructores */}
        <div className="instructores-grid">
          {INSTRUCTORES.map((inst) => (
            <Reveal key={inst.id} style={{ height: "100%" }}>
              <InstructorCard instructor={inst} />
            </Reveal>
          ))}
        </div>
      </Container>

      <style>{`
        .instructores-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(16px, 2.5vw, 28px);
          align-items: stretch;
        }
        @media (max-width: 1023px) {
          .instructores-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 639px) {
          .instructores-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
