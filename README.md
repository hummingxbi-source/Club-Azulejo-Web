# Club Azulejo — Escuela de Natación

Demo visual frontend (sin backend). Todos los datos son simulados.

## Stack

- **Vite** + **React 19** + **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** — animaciones
- **Recharts** — gráficas de analítica
- **Lucide React** — iconos
- **React Router DOM** — rutas SPA

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) (o [http://localhost:5174](http://localhost:5174)) en tu navegador.

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
├── app/          # App root y router
├── assets/       # imágenes, video, fuentes
├── components/   # componentes por dominio
├── data/         # datos mock (sin backend)
├── hooks/        # hooks reutilizables
├── lib/          # utilidades (formato, SEO)
├── pages/        # páginas por ruta
├── styles/       # tokens Tailwind y globals
└── types/        # tipos TypeScript
```
