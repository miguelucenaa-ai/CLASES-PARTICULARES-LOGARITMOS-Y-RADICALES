// Genera "Racionalización y logaritmos.html" a partir de build/*.
// Uso:  node build/build.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { buildPanel, checks } from './lib.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, '..');
const read = (f) => fs.readFileSync(path.join(here, f), 'utf8');

// Orden = el mismo que el PDF del Tema 1. Cada módulo exporta { id, num, tab, title, color:[fuerte, suave, línea], sections }
const order = [
  '01-reales', '02-desigualdades', '03-recta', '04-valor-absoluto', '05-intervalos', '06-aproximaciones',
  '07-notacion', '08-radicales', '09-potencias', '10-logaritmos', '11-finales',
];

const panels = [];
for (const f of order) {
  const file = path.join(here, 'content', f + '.mjs');
  if (!fs.existsSync(file)) continue; // se va añadiendo bloque a bloque
  const mod = await import(pathToFileURL(file).href);
  panels.push(mod.default);
}

const tabsHTML = panels.map(P => `<button type="button" role="tab" class="tab" id="tab-${P.id}" aria-controls="panel-${P.id}" data-tab="${P.id}" style="--tc:${P.color[0]}"><span class="tn">${P.num}</span><span class="tl">${P.tab}</span></button>`).join('');
const jumpHTML = panels.map(P => `<nav class="jump" data-for="${P.id}" aria-label="Apartados de ${P.tab}" hidden>${P.sections.map(s => `<button type="button" data-jump="${s.id}">${s.jump}</button>`).join('')}</nav>`).join('');
const panelsHTML = panels.map(buildPanel).join('\n');
const accCSS = panels.map(P => `.panel.${P.cls}{--acc:${P.color[0]}; --acc-soft:${P.color[1]}; --acc-line:${P.color[2]}}`).join('\n');

const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#e6f9f5">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="Números reales">
<title>Tema 1 · Números reales · Matemáticas I</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Next:wght@400;600;700;800&family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&display=swap">
<style>
${read('base.css')}
${accCSS}
${read('extra.css')}
</style></head>
<body>
<div class="page"><header class="top"><span class="eyebrow">Matemáticas I · Tema 1</span><h1>Números reales</h1><p class="sub">Todo el tema, apartado por apartado y en el mismo orden que tus apuntes del colegio. Ejemplos que se resuelven paso a paso, recetas para saber qué hacer y ejercicios para practicar.</p></header>
<div class="bar"><div class="tabs" role="tablist" aria-label="Apartados del tema">${tabsHTML}</div>${jumpHTML}</div>
<main>
${panelsHTML}
</main>
<footer class="foot">Basado en el Tema 1 (Números reales) de Matemáticas I del colegio. Las fórmulas funcionan sin conexión.</footer></div>
<script>
${read('app.js')}
</script>
</body></html>
`;

fs.writeFileSync(path.join(here, 'checks.json'), JSON.stringify(checks, null, 1), 'utf8');
const out = path.join(root, 'Racionalización y logaritmos.html');
fs.writeFileSync(out, html, 'utf8');
fs.writeFileSync(path.join(root, 'index.html'), html, 'utf8'); // para GitHub Pages
console.log('OK', out, (html.length / 1024).toFixed(0) + ' KB', panels.length + ' apartados');
