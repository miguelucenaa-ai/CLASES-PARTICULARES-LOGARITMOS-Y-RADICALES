// Genera "Racionalización y logaritmos.html" (y index.html, para GitHub Pages) a partir de build/*.
// Uso:  node build/build.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { buildPanel, checks } from './lib.mjs';
import { heroLine } from './svg.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const read = (f) => fs.readFileSync(path.join(here, f), 'utf8');

const EXAM = '2026-10-05'; // lunes 5 de octubre de 2026

// Orden = el mismo que el PDF del Tema 1. Cada módulo exporta { id, num, tab, title, color:[fuerte, suave, línea], sections }
const order = [
  '01-reales', '02-desigualdades', '03-recta', '04-valor-absoluto', '05-intervalos', '06-aproximaciones',
  '07-notacion', '08-radicales', '09-potencias', '10-logaritmos', '11-finales',
];

const list = [];
for (const f of order) {
  const file = path.join(here, 'content', f + '.mjs');
  if (!fs.existsSync(file)) continue;
  list.push((await import(pathToFileURL(file).href)).default);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const nodesHTML = list.map(P => `<li><button type="button" role="tab" class="nv" id="tab-${P.id}" aria-controls="panel-${P.id}" data-tab="${P.id}" data-num="${P.num}" data-title="${esc(P.tab)}" data-hue="${P.color[0]}" style="--hue:${P.color[0]}"><span class="nv-n">${P.num}</span><span class="nv-t">${esc(P.tab)}</span><i class="nv-p"></i></button></li>`).join('');
const popHTML = list.map(P => `<li><button type="button" class="nv" data-pop="${P.id}" data-hue="${P.color[0]}" style="--hue:${P.color[0]}"><span class="nv-n">${P.num}</span><span class="nv-t">${esc(P.tab)}</span><span class="pop-c"></span></button></li>`).join('');
const jumpHTML = list.map(P => `<nav class="jump" data-for="${P.id}" aria-label="Secciones de ${esc(P.tab)}" hidden>${P.sections.map(s => `<button type="button" data-jump="${s.id}">${s.jump}</button>`).join('')}</nav>`).join('');
const panelsHTML = list.map((P, i) => buildPanel(P, list[i - 1], list[i + 1])).join('\n');

const I = {
  moon: '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5a8.5 8.5 0 1 0 10.7 10.7z"/></svg>',
  sun: '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></svg>',
  left: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  right: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  down: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 9l7 7 7-7"/></svg>',
  x: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
};

const tokens = `
:root{
  --f-body:'Atkinson Hyperlegible Next','Atkinson Hyperlegible','Segoe UI',system-ui,-apple-system,sans-serif;
  --f-head:'Bricolage Grotesque','Avenir Next','Segoe UI',system-ui,sans-serif;
  --f-hand:'Caveat','Segoe Print','Bradley Hand','Chalkboard SE',cursive;
  --lift:0%;
  --paper:#f2f6fa; --grid:rgba(40,90,170,.095);
  --card:#ffffff; --card-2:#f6f9fc; --line:#dde6ef; --line-2:#bfcedd;
  --ink:#0e1a33; --ink-2:#425068; --ink-3:#6b7893;
  --hi:#ffe45e; --hi-soft:#fff7c4; --hi-mark:#ffe45e;
  --red:#d12e45; --blue:#1d4ed8; --teal:#0b8789; --violet:#6d3fd3; --orange:#b45309; --ok:#12803f;
  --c3:var(--red);
  --on-acc:#fff; --on-h:#fff; --on-k:#fff;
  color-scheme:light;
}
:root[data-mode="dark"]{
  --lift:50%;
  --paper:#0c1a1e; --grid:rgba(190,230,225,.055);
  --card:#13252a; --card-2:#172d33; --line:#25424a; --line-2:#36565f;
  --ink:#ebf4f1; --ink-2:#b5c8c4; --ink-3:#86a09b;
  --hi:#f2d349; --hi-soft:rgba(242,211,73,.13); --hi-mark:rgba(242,211,73,.38);
  --red:#ff7c8d; --blue:#8fb2ff; --teal:#5fd6d0; --violet:#b9a0ff; --orange:#ffb360; --ok:#6fd59a;
  --on-acc:#0b1417; --on-h:#0b1417; --on-k:#0b1417;
  color-scheme:dark;
}
`;

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#f2f6fa">
<meta name="color-scheme" content="light">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Números reales">
<meta name="description" content="Tema 1 de Matemáticas I (1.º Bachillerato): números reales, intervalos, valor absoluto, radicales, potencias y logaritmos, paso a paso.">
<title>Números reales · Tema 1 · Matemáticas I</title>
<script>try{document.documentElement.dataset.mode=localStorage.getItem('t1-mode')==='dark'?'dark':'light'}catch(e){document.documentElement.dataset.mode='light'}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Caveat:wght@600&display=swap">
<style>
${tokens}
${read('style.css')}
.panel{--acc:color-mix(in srgb, var(--hue), #fff var(--lift))}
.nv, .pr-item{--h:color-mix(in srgb, var(--hue), #fff var(--lift))}
.pg{--k:color-mix(in srgb, var(--hue), #fff var(--lift))}
.bar{--cur:color-mix(in srgb, var(--hue-cur, #2451c7), #fff var(--lift))}
.key b:first-child{background:linear-gradient(transparent 55%, var(--hi-mark) 55%)}
.hero h1 .mk::before{background:var(--hi-mark)}
.l-z{--k:var(--blue)} .l-q{--k:var(--teal)} .l-i{--k:var(--red)}
</style></head>
<body>
<div class="page">
<header class="hero">
  <div class="hero-top">
    <span class="eyebrow"><i></i>Matemáticas I · 1.º Bachillerato · Tema 1</span>
    <button type="button" class="icon-btn" id="btn-mode" aria-label="Cambiar entre modo claro y modo pizarra" title="Modo claro / pizarra">${I.moon}${I.sun}</button>
  </div>
  <h1>Números <span class="mk">reales</span></h1>
  <p class="lede">Todo el tema, en el mismo orden que tus apuntes. Cada ejercicio se resuelve paso a paso: piensa el siguiente antes de pulsar «Ver paso».</p>
  <div class="hero-meta">
    <span class="chip" id="chip-exam" data-date="${EXAM}"><span class="dot"></span><span id="chip-exam-t">Examen · lunes 5 de octubre</span></span>
    <button type="button" class="chip" id="chip-prog" aria-haspopup="dialog"><span class="bar-mini"><i></i></span><span id="chip-prog-t">Mi progreso</span></button>
  </div>
  <nav class="toc" aria-label="Apartados del tema">
    <div class="toc-title">Apartados del tema</div>
    <ol class="toc-list" role="tablist">${nodesHTML}</ol>
  </nav>
  <div class="hero-line">${heroLine()}<div class="legend"><span class="l-z">enteros ℤ</span><span class="l-q">racionales ℚ</span><span class="l-i">irracionales 𝕀</span></div></div>
</header>
<div id="top-sentinel"></div>
<div class="bar">
  <div class="nv-sub">
    <button type="button" class="nv-arrow" id="nv-prev" aria-label="Apartado anterior">${I.left}</button>
    <button type="button" class="nv-title" id="nv-title" aria-haspopup="true" aria-expanded="false" aria-label="Ver todos los apartados"><b></b><span></span>${I.down}</button>
    <button type="button" class="nv-jump" aria-haspopup="true" aria-expanded="false"><span>Saltar a</span>${I.down}</button>
    <button type="button" class="nv-arrow" id="nv-next" aria-label="Apartado siguiente">${I.right}</button>
  </div>
  <div class="pop pop-apartados" hidden><ol class="pop-list">${popHTML}</ol></div>
  <div class="pop jump-pop" hidden>${jumpHTML}</div>
</div>
<main>
${panelsHTML}
</main>
<footer class="foot">Basado en el Tema 1 (Números reales) de Matemáticas I del colegio · Las fórmulas funcionan sin conexión.</footer>
</div>
<div class="sheet" id="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-h" hidden>
  <div class="sheet-bg"></div>
  <div class="sheet-card">
    <button type="button" class="icon-btn sheet-x" aria-label="Cerrar">${I.x}</button>
    <h2 id="sheet-h">Tu progreso</h2>
    <p class="sheet-sub" id="pr-total"></p>
    <ul class="pr-list" id="pr-list"></ul>
    <div class="sheet-foot"><span class="muted small">Se guarda solo en este dispositivo.</span><button type="button" class="link-btn" id="pr-reset">Borrar progreso</button></div>
  </div>
</div>
<script>
${read('app.js')}
</script>
</body></html>
`;

fs.writeFileSync(path.join(here, 'checks.json'), JSON.stringify(checks, null, 1), 'utf8');
const out = path.join(root, 'Racionalización y logaritmos.html');
fs.writeFileSync(out, html, 'utf8');
fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8'); // para GitHub Pages
console.log('OK', out, (html.length / 1024).toFixed(0) + ' KB', list.length + ' apartados');
