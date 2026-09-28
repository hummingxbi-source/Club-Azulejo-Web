/* ────────────────────────────────────────────────────────────────
   galeria.ts — Datos ilustrativos de la galería "Momentos Azulejo".
   NOTA: Estos datos son de ejemplo para la demo visual con el cliente.
   ──────────────────────────────────────────────────────────────── */

export type CategoriaGaleria =
  | "Torneos"
  | "Exhibiciones"
  | "Reconocimientos"
  | "Clases";

import imgCopaAzulejoInvierno from "@/assets/images/galeria-01-copa-azulejo-invierno.webp";
import imgEstimulacionTemprana from "@/assets/images/galeria-02-estimulacion-temprana.webp";
import imgNadoSincronizado from "@/assets/images/galeria-03-nado-sincronizado.webp";
import imgCertificacionFina from "@/assets/images/galeria-04-certificacion-fina.webp";
import imgBiomecanicaAvanzada from "@/assets/images/galeria-05-biomecanica-avanzada.webp";
import imgInterclubesRegional from "@/assets/images/galeria-06-interclubes-regional.webp";
import imgMedallistasEstatales from "@/assets/images/galeria-07-medallistas-estatales.webp";
import imgClaseAbiertaFamilias from "@/assets/images/galeria-08-clase-abierta-familias.webp";

export interface ItemGaleria {
  id: string;
  categoria: CategoriaGaleria;
  titulo: string;
  descripcionCorta: string;
  imagenUrl: string; // vacío por ahora — pendiente fotografía real
}

/* Datos ilustrativos */
export const GALERIA: ItemGaleria[] = [
  {
    id: "gal-1",
    categoria: "Torneos",
    titulo: "Copa Azulejo Invierno",
    descripcionCorta: "Competencia interna de velocidad y estilos.",
    imagenUrl: imgCopaAzulejoInvierno,
  },
  {
    id: "gal-2",
    categoria: "Clases",
    titulo: "Estimulación temprana",
    descripcionCorta: "Niveles iniciales desarrollando confianza acuática.",
    imagenUrl: imgEstimulacionTemprana,
  },
  {
    id: "gal-3",
    categoria: "Exhibiciones",
    titulo: "Muestra de nado sincronizado",
    descripcionCorta: "Presentación del equipo Élite Azulejo.",
    imagenUrl: imgNadoSincronizado,
  },
  {
    id: "gal-4",
    categoria: "Reconocimientos",
    titulo: "Certificación FINA 2026",
    descripcionCorta: "Renovación de nuestro cuerpo técnico colegiado.",
    imagenUrl: imgCertificacionFina,
  },
  {
    id: "gal-5",
    categoria: "Clases",
    titulo: "Biomecánica avanzada",
    descripcionCorta: "Análisis de virajes y salidas en nivel 03.",
    imagenUrl: imgBiomecanicaAvanzada,
  },
  {
    id: "gal-6",
    categoria: "Torneos",
    titulo: "Interclubes Regional",
    descripcionCorta: "Participación destacada de nuestros alumnos federados.",
    imagenUrl: imgInterclubesRegional,
  },
  {
    id: "gal-7",
    categoria: "Reconocimientos",
    titulo: "Medallistas Estatales",
    descripcionCorta: "Alumnos de nivel 04 alcanzan el podio regional.",
    imagenUrl: imgMedallistasEstatales,
  },
  {
    id: "gal-8",
    categoria: "Exhibiciones",
    titulo: "Clase abierta a familias",
    descripcionCorta: "Demostración de progreso de niveles 01 y 02.",
    imagenUrl: imgClaseAbiertaFamilias,
  },
];
