// Figuras SVG (rectas numéricas, intervalos, construcciones geométricas, diagramas).
// Colores y estilos: clases .nl del CSS (siguen el color del apartado).
const minus = (s) => String(s).replace(/-/g, '−');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const f2 = (n) => Math.round(n * 100) / 100;

/* Recta numérica
   o = { from, to, ticks?: number[], labels?: {valor: texto} | false, w?, segs?: [{a,b,ac,bc,c}], pts?: [{x,label,open,c}], texts?: [{x,y,t,c}], aria }
   - a/b = ±Infinity para semirrectas. ac/bc: extremo cerrado (true) o abierto (false). c: 1 (color del apartado) o 2 (rojo)
   - labels: por defecto muestra el número de cada marca (en enteros). */
export function numline(o) {
  const W = o.w || 480, H = o.h || 96, pad = 30, y = o.y || 54;
  const { from, to } = o;
  const X = (v) => pad + ((v - from) / (to - from)) * (W - 2 * pad);
  const ticks = o.ticks || Array.from({ length: Math.floor(to - from) + 1 }, (_, i) => from + i);
  let g = '';
  // eje con flechas
  g += `<line class="ax" x1="${pad - 18}" y1="${y}" x2="${W - pad + 18}" y2="${y}"/>`;
  g += `<path class="ax-h" d="M${W - pad + 22},${y} l-9,-5 v10 z M${pad - 22},${y} l9,-5 v10 z" fill="var(--ink-2)"/>`;
  for (const t of ticks) {
    g += `<line class="tk" x1="${f2(X(t))}" y1="${y - 6}" x2="${f2(X(t))}" y2="${y + 6}"/>`;
    const lab = o.labels === false ? null : (o.labels && o.labels[t] != null ? o.labels[t] : (Number.isInteger(t) ? t : null));
    if (lab != null) g += `<text x="${f2(X(t))}" y="${y + 24}" text-anchor="middle">${esc(minus(lab))}</text>`;
  }
  for (const s of o.segs || []) {
    const c = s.c === 2 ? '2' : '';
    const xa = s.a === -Infinity ? pad - 14 : X(s.a);
    const xb = s.b === Infinity ? W - pad + 14 : X(s.b);
    const yy = s.dy ? y + s.dy : y;
    g += `<line class="seg${c}" x1="${f2(xa)}" y1="${yy}" x2="${f2(xb)}" y2="${yy}"/>`;
    if (s.a === -Infinity) g += `<path d="M${f2(xa - 2)},${yy} l11,-7 v14 z" fill="var(${s.c === 2 ? '--c3' : '--acc'})"/>`;
    if (s.b === Infinity) g += `<path d="M${f2(xb + 2)},${yy} l-11,-7 v14 z" fill="var(${s.c === 2 ? '--c3' : '--acc'})"/>`;
    if (s.a !== -Infinity) g += `<circle class="${s.ac ? 'pt' + c + '-c' : 'pt' + c + '-o'}" cx="${f2(xa)}" cy="${yy}" r="6.5"/>`;
    if (s.b !== Infinity) g += `<circle class="${s.bc ? 'pt' + c + '-c' : 'pt' + c + '-o'}" cx="${f2(xb)}" cy="${yy}" r="6.5"/>`;
  }
  for (const q of o.pts || []) {
    const c = q.c === 2 ? '2' : '';
    g += `<circle class="${q.open ? 'pt' + c + '-o' : 'pt' + c + '-c'}" cx="${f2(X(q.x))}" cy="${y}" r="6.5"/>`;
    if (q.label != null) g += `<text class="lbl-${c ? '2' : 'acc'}" x="${f2(X(q.x))}" y="${y - 16}" text-anchor="middle">${esc(minus(q.label))}</text>`;
  }
  for (const t of o.texts || []) g += `<text class="${t.c === 2 ? 'lbl-2' : 'lbl-acc'}" x="${f2(X(t.x))}" y="${t.y}" text-anchor="middle">${esc(minus(t.t))}</text>`;
  return `<svg class="nl" viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(o.aria || 'Recta numérica')}">${g}</svg>`;
}

/* Diagrama de conjuntos numéricos: N ⊂ Z ⊂ Q ⊂ R, con los irracionales aparte */
export function venn() {
  return `<svg class="nl venn" viewBox="0 0 660 330" role="img" aria-label="Diagrama de los conjuntos numéricos: naturales dentro de enteros dentro de racionales; irracionales aparte; todos dentro de los reales">
  <rect x="6" y="6" width="648" height="318" rx="26" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2.5"/>
  <text x="634" y="38" text-anchor="end" font-size="22" font-weight="800" fill="var(--acc)">ℝ  reales</text>
  <ellipse cx="215" cy="178" rx="196" ry="132" fill="#fff" stroke="var(--acc)" stroke-width="2.5"/>
  <text x="215" y="62" text-anchor="middle" font-size="17" font-weight="800" fill="var(--acc)">ℚ  racionales</text>
  <ellipse cx="215" cy="190" rx="132" ry="94" fill="var(--card-2)" stroke="var(--acc)" stroke-width="2.5"/>
  <text x="215" y="122" text-anchor="middle" font-size="17" font-weight="800" fill="var(--acc)">ℤ  enteros</text>
  <ellipse cx="215" cy="208" rx="70" ry="52" fill="var(--acc-soft)" stroke="var(--acc)" stroke-width="2.5"/>
  <text x="215" y="180" text-anchor="middle" font-size="17" font-weight="800" fill="var(--acc)">ℕ  naturales</text>
  <text x="188" y="212" font-size="17" font-weight="700">1</text><text x="214" y="232" font-size="17" font-weight="700">2</text><text x="240" y="212" font-size="17" font-weight="700">3</text>
  <text x="115" y="196" font-size="17">−3</text><text x="297" y="196" font-size="17">0</text><text x="125" y="238" font-size="17">−27</text><text x="298" y="236" font-size="17">−1</text>
  <text x="120" y="92" font-size="17">½</text><text x="34" y="178" font-size="17">−0,3</text><text x="318" y="108" font-size="17">7,5</text><text x="96" y="272" font-size="16">101/11</text>
  <ellipse cx="520" cy="190" rx="112" ry="100" fill="var(--c3-soft)" stroke="var(--c3)" stroke-width="2.5"/>
  <text x="520" y="124" text-anchor="middle" font-size="17" font-weight="800" fill="var(--c3)">𝕀  irracionales</text>
  <text x="470" y="176" font-size="22">√2</text><text x="540" y="204" font-size="22">π</text><text x="478" y="246" font-size="22">e</text><text x="560" y="152" font-size="18">1,0100100…</text>
</svg>`;
}

/* Construcción de una raíz con Pitágoras (regla y compás), por etapas:
   1 = eje y catetos, 2 = hipotenusa, 3 = arco con el compás, 4 = punto marcado en la recta.
   o = { a, b, la, lb, lh, stage }: catetos a (sobre el eje) y b (vertical); etiquetas la, lb, lh */
export function pitagoras(o) {
  const { a, b, stage } = o;
  const la = o.la ?? String(a), lb = o.lb ?? String(b), lh = o.lh ?? ('√' + (a * a + b * b));
  const W = 440, H = 230, pad = 30, y = 176;
  const h = Math.sqrt(a * a + b * b);
  const maxv = Math.ceil(h) + 1;
  const u = Math.min((W - 2 * pad) / maxv, 150);
  const X = (v) => pad + v * u;
  let g = `<line class="ax" x1="${pad - 16}" y1="${y}" x2="${f2(X(maxv) + 16)}" y2="${y}"/><path d="M${f2(X(maxv) + 20)},${y} l-9,-5 v10 z" fill="var(--ink-2)"/>`;
  for (let t = 0; t <= maxv; t++) g += `<line class="tk" x1="${f2(X(t))}" y1="${y - 6}" x2="${f2(X(t))}" y2="${y + 6}"/><text x="${f2(X(t))}" y="${y + 24}" text-anchor="middle">${t}</text>`;
  g += `<circle class="pt-c" cx="${f2(X(0))}" cy="${y}" r="5"/>`;
  if (stage >= 1) {
    g += `<line class="geo" x1="${f2(X(a))}" y1="${y}" x2="${f2(X(a))}" y2="${f2(y - b * u)}"/>`;
    g += `<path d="M${f2(X(a) - 12)},${y} v-12 h12" fill="none" stroke="var(--ink-2)" stroke-width="1.5"/>`;
    g += `<text class="lbl-acc" x="${f2(X(a) + 10)}" y="${f2(y - (b * u) / 2 + 5)}">${lb}</text>`;
    g += `<text class="lbl-acc" x="${f2(X(a / 2))}" y="${y - 10}" text-anchor="middle">${la}</text>`;
  }
  if (stage >= 2) {
    g += `<line class="geo2" x1="${f2(X(0))}" y1="${y}" x2="${f2(X(a))}" y2="${f2(y - b * u)}"/>`;
    g += `<text class="lbl-2" x="${f2(X(a / 2) - 8)}" y="${f2(y - (b * u) / 2 - 12)}" text-anchor="end">${lh}</text>`;
  }
  if (stage >= 3) {
    const ang = Math.atan2(b * u, a * u);
    const sx = X(0) + h * u * Math.cos(ang), sy = y - h * u * Math.sin(ang);
    g += `<path class="thin" d="M${f2(sx)},${f2(sy)} A${f2(h * u)},${f2(h * u)} 0 0 1 ${f2(X(h))},${y}"/>`;
  }
  if (stage >= 4) {
    g += `<circle class="pt2-c" cx="${f2(X(h))}" cy="${y}" r="7"/><text class="lbl-2" x="${f2(X(h))}" y="${y - 16}" text-anchor="middle" font-size="18">${lh}</text>`;
  }
  return `<svg class="nl" viewBox="0 0 ${W} ${H}" role="img" aria-label="Construcción de ${lh} con el teorema de Pitágoras">${g}</svg>`;
}

/* Teorema de Tales: dividir el segmento [0,1] en n partes iguales y marcar k/n. Etapas 1–4 */
export function tales(n, k, stage) {
  const W = 440, H = 240, x0 = 40, x1 = 340, y = 190;
  const ang = -Math.PI / 5, L = 250;
  const dx = Math.cos(ang), dy = Math.sin(ang);
  const P = (i) => [x0 + (L * i / n) * dx, y + (L * i / n) * dy];
  let g = `<line class="ax" x1="${x0 - 30}" y1="${y}" x2="${x1 + 40}" y2="${y}"/>`;
  g += `<line class="tk" x1="${x0}" y1="${y - 6}" x2="${x0}" y2="${y + 6}"/><text x="${x0}" y="${y + 24}" text-anchor="middle">0</text>`;
  g += `<line class="tk" x1="${x1}" y1="${y - 6}" x2="${x1}" y2="${y + 6}"/><text x="${x1}" y="${y + 24}" text-anchor="middle">1</text>`;
  if (stage >= 1) {
    const [ex, ey] = P(n);
    g += `<line class="geo" x1="${x0}" y1="${y}" x2="${f2(ex + 20 * dx)}" y2="${f2(ey + 20 * dy)}"/>`;
  }
  if (stage >= 2) {
    for (let i = 1; i <= n; i++) { const [px, py] = P(i); g += `<circle class="pt-c" cx="${f2(px)}" cy="${f2(py)}" r="4.5"/><text x="${f2(px - 12)}" y="${f2(py - 6)}" text-anchor="end" font-size="15">${i}</text>`; }
  }
  if (stage >= 3) {
    const [ex, ey] = P(n);
    g += `<line class="geo2" x1="${f2(ex)}" y1="${f2(ey)}" x2="${x1}" y2="${y}"/>`;
  }
  if (stage >= 4) {
    const [kx, ky] = P(k);
    const tx = x0 + (x1 - x0) * k / n;
    g += `<line class="thin" x1="${f2(kx)}" y1="${f2(ky)}" x2="${f2(tx)}" y2="${y}" stroke="var(--c3)"/>`;
    g += `<circle class="pt2-c" cx="${f2(tx)}" cy="${y}" r="7"/><text class="lbl-2" x="${f2(tx)}" y="${y - 14}" text-anchor="middle" font-size="18">${k}/${n}</text>`;
  }
  return `<svg class="nl" viewBox="0 0 ${W} ${H}" role="img" aria-label="Teorema de Tales para representar ${k}/${n}">${g}</svg>`;
}

/* Intervalos encajados para ∛2 ≈ 1,2599… (cada fila es un intervalo más pequeño) */
export function encajados() {
  const W = 480, H = 200, pad = 26;
  const rows = [[1, 2, '[1, 2]'], [1.2, 1.3, '[1,2; 1,3]'], [1.25, 1.26, '[1,25; 1,26]'], [1.259, 1.26, '[1,259; 1,260]']];
  const v = 1.2599210499;
  // cada fila se amplía alrededor del intervalo anterior
  let g = '';
  rows.forEach(([a, b, lab], i) => {
    const y = 28 + i * 44;
    g += `<line class="ax" x1="${pad}" y1="${y}" x2="${W - pad - 114}" y2="${y}"/>`;
    g += `<line class="seg" x1="${pad + 6}" y1="${y}" x2="${W - pad - 120}" y2="${y}"/>`;
    g += `<circle class="pt-c" cx="${pad + 6}" cy="${y}" r="5.5"/><circle class="pt-c" cx="${W - pad - 120}" cy="${y}" r="5.5"/>`;
    const px = pad + 6 + ((v - a) / (b - a)) * (W - 2 * pad - 126);
    g += `<circle class="pt2-c" cx="${f2(px)}" cy="${y}" r="6.5"/>`;
    g += `<text x="${W - pad - 104}" y="${y + 6}" font-size="15">${lab}</text>`;
  });
  return `<svg class="nl" viewBox="0 0 ${W} ${H}" role="img" aria-label="Intervalos encajados que aproximan la raíz cúbica de 2">${g}<text class="lbl-2" x="${pad}" y="${H - 8}" font-size="15">● ∛2 = 1,2599…</text></svg>`;
}

/* Recta de la portada: ℤ (azul), ℚ (verde azulado) e 𝕀 (rojo) sobre la recta real. Se dibuja sola al cargar. */
export function heroLine() {
  const W = 560, H = 128, y = 88, x0 = 46, u = 78;
  const X = (v) => x0 + (v + 2) * u;
  const pts = [
    { v: -1.5, t: '−3/2', k: 'q' }, { v: -1, t: '−1', k: 'z' }, { v: 0, t: '0', k: 'z' }, { v: 0.5, t: '1/2', k: 'q' },
    { v: Math.SQRT2, t: '√2', k: 'i' }, { v: 2, t: '2', k: 'z' }, { v: Math.E, t: 'e', k: 'i' }, { v: Math.PI, t: 'π', k: 'i' },
  ];
  let g = `<path class="hl-ax" pathLength="1" d="M18,${y} H${W - 14}"/><path class="hl-ax" pathLength="1" d="M${W - 14},${y} l-12,-7 M${W - 14},${y} l-12,7"/>`;
  for (let v = -2; v <= 4; v++) g += `<line class="hl-tk" x1="${f2(X(v))}" y1="${y - 8}" x2="${f2(X(v))}" y2="${y + 8}"/>`;
  pts.forEach((p, i) => {
    g += `<g class="hp hp-${p.k}" style="--i:${i}"><circle cx="${f2(X(p.v))}" cy="${y}" r="9"/><text x="${f2(X(p.v))}" y="${y - 22}">${p.t}</text></g>`;
  });
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="La recta real con números enteros, racionales e irracionales marcados">${g}</svg>`;
}
