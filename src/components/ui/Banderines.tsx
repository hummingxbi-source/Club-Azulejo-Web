/** Hilera de banderines como los de la alberca del club: cuelgan de una cuerda en curva. */
const COLORS: [string, string][] = [
  ["var(--az-blanco)", "var(--az-rojo)"],
  ["var(--az-azul)", "transparent"],
  ["var(--az-blanco)", "var(--az-azul)"],
  ["var(--az-rojo)", "transparent"],
];

export function Banderines({ n = 24, sag = 56, className = "" }: { n?: number; sag?: number; className?: string }) {
  const flags = Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const y = (1 - t) ** 2 * 6 + 2 * (1 - t) * t * (6 + sag) + t * t * 6;
    const r = (k: number) => ((Math.sin(i * 12.9898 + k) * 43758.5453) % 1 + 1) % 1;
    return { x: t * 100, y, c: COLORS[i % 4], t: 1.6 + r(1) * 1.2, a: 4 + r(2) * 5, dl: -r(3) * 2, k: 0.6 + r(4) * 0.7 };
  });
  return (
    <div className={"flags " + className} style={{ ["--n" as string]: n }} aria-hidden>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d={`M0,6 Q50,${6 + sag} 100,6`} />
      </svg>
      {flags.map((f, i) => (
        <span key={i} className="flag" style={{ left: f.x + "%", top: f.y + "%", ["--k" as string]: f.k.toFixed(2) }}>
          <i style={{ ["--c" as string]: f.c[0], ["--d" as string]: f.c[1], ["--t" as string]: f.t.toFixed(2) + "s", ["--a" as string]: f.a.toFixed(1), ["--dl" as string]: f.dl.toFixed(2) + "s" }} />
        </span>
      ))}
    </div>
  );
}
