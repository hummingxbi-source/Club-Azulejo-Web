/* ────────────────────────────────────────────────────────────────
   instructores.ts — Datos ilustrativos del cuerpo técnico.
   NOTA: Estos datos son de ejemplo para la demo visual con el cliente.
   Los valores reales serán confirmados por coordinación académica.
   ──────────────────────────────────────────────────────────────── */

export interface InstructorData {
  id: string;
  nombre: string;
  rol: string;
  especialidadBadge: string; // e.g. "Niveles 01 & 02"
  bio: string;               // 1-2 líneas
  certificaciones: string[];
  statLabel: string;
  statValue: string;
  fotoUrl: string;           // vacío por ahora — pendiente fotografía real
}

/* Datos ilustrativos — no reflejan registros operativos reales */
export const INSTRUCTORES: InstructorData[] = [
  {
    id: "valeria-montes",
    nombre: "Valeria Montes",
    rol: "Directora de Estimulación Temprana",
    especialidadBadge: "Niveles 01 & 02",
    bio: "Licenciada en Educación Física con maestría en neurodesarrollo psicomotriz acuático, 8 años de experiencia en atelier de natación.",
    certificaciones: [
      "Cruz Roja Mexicana — Salvamento Acuático",
      "Certificación ASCA Level 2",
      "Psicomotricidad Acuática Infantil (Universidad de León)",
    ],
    statLabel: "Ratio actual",
    statValue: "3 alumnos / sesión",
    fotoUrl: "instructor-valeria-montes.webp",
  },
  {
    id: "marcos-estrada",
    nombre: "Prof. Marcos Estrada",
    rol: "Jefe de Biomecánica & Alto Rendimiento",
    especialidadBadge: "Perfeccionamiento FINA",
    bio: "Ex-seleccionado nacional de natación, especialista en optimización de hidrodinámica de crol y mariposa con análisis de video subacuático.",
    certificaciones: [
      "Entrenador Federado FMN — Nivel III",
      "Certificación FINA Coaches Education Programme",
      "Especialidad en Biomecánica Deportiva (UNAM)",
    ],
    statLabel: "Retención HummingX",
    statValue: "98.2% histórico",
    fotoUrl: "instructor-marcos-estrada.webp",
  },
  {
    id: "elena-santillan",
    nombre: "Elena Santillán",
    rol: "Especialista en Estilo & Seguridad",
    especialidadBadge: "Técnica & Resistencia",
    bio: "Certificada ASCA Level 3, con enfoque en construcción de autoconfianza acuática, virajes limpios y planificación de resistencia aeróbica.",
    certificaciones: [
      "ASCA Level 3 — American Swimming Coaches Association",
      "Cruz Roja Mexicana — Primeros Auxilios Pediátricos",
      "Seguridad Acuática Infantil (IMSS)",
    ],
    statLabel: "Asistencia media",
    statValue: "96% alumnos",
    fotoUrl: "instructor-elena-santillan.webp",
  },
];
