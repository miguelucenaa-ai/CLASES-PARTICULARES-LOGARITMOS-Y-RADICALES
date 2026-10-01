// Mini-DSL para generar el HTML del apunte. Las fórmulas se escriben en LaTeX entre $...$
// y se convierten a MathML (funciona sin conexión, también en Safari / iPad / iPhone).
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const temml = require('temml');

// Colores para resaltar lo que cambia en cada paso: \hl (rojo), \hb (azul), \hg (verde), \ho (naranja)
// Se usan clases CSS (en vez de colores fijos) para que también funcionen en el modo pizarra.
const macros = {
  '\\hl': '\\class{hl}{#1}',
  '\\hb': '\\class{hb}{#1}',
  '\\hg': '\\class{hg}{#1}',
  '\\ho': '\\class{ho}{#1}',
};

export function mathml(tex, display = false) {
  return temml.renderToString(tex, { displayMode: display, throwOnError: true, macros: { ...macros }, strict: false, trust: (ctx) => ctx.command === '\\class' });
}

// texto con $mates$ y **negrita** y __cursiva__
export function tx(s) {
  if (s == null) return '';
  const store = [];
  let t = String(s).replace(/\$([^$]+)\$/g, (_, m) => { const h = mathml(m, false); store.push(m.length >= 24 ? `<span class="im-long">${h}</span>` : h); return '@@M' + (store.length - 1) + '@@'; });
  t = t.replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/__(.+?)__/g, '<i>$1</i>');
  return t.replace(/@@M(\d+)@@/g, (_, i) => store[+i]);
}

const fit = (tex) => `<div class="fit"><div class="fw">${mathml(tex, true)}</div></div>`;
export const fitHTML = fit;

// Una o varias líneas de fórmula (array = una debajo de otra)
export function lines(m) {
  const arr = Array.isArray(m) ? m : [m];
  return arr.map(fit).join('');
}

export const p = (s, cls = '') => `<p${cls ? ` class="${cls}"` : ''}>${tx(s)}</p>`;
export const key = (s, title) => `<div class="key">${title ? `<b>${tx(title)}</b> ` : ''}${tx(s)}</div>`;
export const tip = (s) => `<div class="tipline">${tx(s)}</div>`;
export const formula = (tex, big = false) => `<div class="formula${big ? ' big' : ''}"><div class="m">${fit(tex)}</div></div>`;
export const sub = (s) => `<h3 class="sub">${tx(s)}</h3>`;

// Receta: pasos numerados cortos
export function recipe(title, steps) {
  return `<div class="recipe"><span class="rc-t">${tx(title)}</span><ol>${steps.map(s => `<li>${tx(s)}</li>`).join('')}</ol></div>`;
}

// Tabla simple: head = [..], rows = [[..],[..]] con $..$
export function table(head, rows) {
  return `<div class="tbl"><table><thead><tr>${head.map(h => `<th>${tx(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${tx(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}

// Tarjetas pequeñas en rejilla
export function cards(items, cls = 'two') {
  return `<div class="${cls}">${items.map(it => `<div class="mini-card">${it.t ? `<span class="mc-t">${tx(it.t)}</span>` : ''}${it.m ? `<div class="m">${lines(it.m)}</div>` : ''}${it.p ? p(it.p) : ''}${it.html || ''}</div>`).join('')}</div>`;
}

// Propiedades (cada una con fórmula, "en palabras" y ejemplo)
export function props(items, cls = '') {
  return `<div class="props${cls ? ' ' + cls : ''}">${items.map(it => `<div class="prop"><h3>${tx(it.h)}</h3>${it.m ? `<div class="formula"><div class="m">${lines(it.m)}</div></div>` : ''}${it.why ? p(it.why, 'why') : ''}${it.ej ? `<div class="tipline"><b>Ejemplo:</b> ${tx(it.ej)}</div>` : ''}</div>`).join('')}</div>`;
}

// Errores típicos
export function errs(items) {
  return `<ul class="errs">${items.map(it => `<li>${tx(it.t)}${it.m ? `<div class="m">${lines(it.m)}</div>` : ''}${it.ok ? `<div class="okline">${tx(it.ok)}</div>` : ''}</li>`).join('')}</ul>`;
}

// Figura SVG (ya preparada) con pie
export const figure = (svg, cap) => `<figure class="fig">${svg}${cap ? `<figcaption>${tx(cap)}</figcaption>` : ''}</figure>`;

/* Ejemplo / ejercicio paso a paso.
   o = { id, tag, task, q (tex), steps:[{t, why, m, hl}], res (tex) | resTxt, note, example, check }
   - t   : qué hago (texto con $..$)
   - why : por qué lo hago (texto)
   - m   : fórmula o lista de fórmulas (la última es el resultado del paso)
   - fig : svg opcional que se muestra en ese paso
*/
export const checks = [];
export function ex(o) {
  const n = o.steps.length;
  if (o.chk) checks.push({ id: o.id, chk: o.chk });
  const steps = o.steps.map(s => `<li hidden><p>${tx(s.t)}</p>${s.why ? `<p class="st-why">${tx(s.why)}</p>` : ''}${s.m ? `<div class="m">${lines(s.m)}</div>` : ''}${s.fig ? s.fig : ''}</li>`).join('');
  const res = o.res ? fit(o.res) : (o.resTxt ? `<p class="res-txt">${tx(o.resTxt)}</p>` : '');
  const cls = ['ex', o.example ? 'example' : '', o.check ? 'check' : '', o.hard ? 'hard' : ''].filter(Boolean).join(' ');
  return `<div class="${cls}" id="${o.id}">${o.tag || o.hard ? `<span class="ex-head">${o.tag ? `<span class="ex-tag">${tx(o.tag)}</span>` : ''}${o.hard ? '<span class="ex-lvl">Difícil</span>' : ''}</span>` : ''}${o.task ? `<p class="ex-task">${tx(o.task)}</p>` : ''}${o.q ? `<div class="ex-q">${fit(o.q)}</div>` : ''}${o.qfig ? o.qfig : ''}<ol class="ex-steps" aria-live="polite">${steps}</ol><div class="ex-res" hidden><span class="ex-res-t">Resultado</span>${res}</div>${o.note ? `<p class="ex-note" hidden>${tx(o.note)}</p>` : ''}<div class="ex-ctl"><button type="button" class="b-next">Ver paso 1 de ${n}</button><button type="button" class="b-all">Ver solución completa</button></div></div>`;
}

export const grid = (exs, one = false) => `<div class="grid${one ? ' one' : ''}">${exs.join('')}</div>`;

// Sección (tarjeta blanca). o = { id, jump, h, kind, body: [html...] }
export function section(o) {
  return `<section class="blk blk-${o.kind || 'intro'}" id="${o.id}"><h2>${tx(o.h)}</h2>${o.body.join('\n')}</section>`;
}

// Una pestaña = un apartado del PDF. Las secciones nuevas (o) o ya hechas ({raw, id, jump}).
export function buildPanel(P, prev, next) {
  const secs = P.sections.map(s => (s.raw ? s.raw : section(s)));
  const nm = (Q) => Q.title.replace(/^\d+\.\s*/, '');
  const pager = `<nav class="pager" aria-label="Cambiar de apartado">${prev ? `<button type="button" class="pg pg-prev" data-go="prev" style="--hue:${prev.color[0]}"><small>← Anterior</small><strong><i>${prev.num}</i> ${nm(prev)}</strong></button>` : ''}${next ? `<button type="button" class="pg pg-next${prev ? '' : ' pg-only'}" data-go="next" style="--hue:${next.color[0]}"><small>Siguiente →</small><strong><i>${next.num}</i> ${nm(next)}</strong></button>` : ''}</nav>`;
  return `<div class="panel ${P.cls}" role="tabpanel" id="panel-${P.id}" aria-labelledby="tab-${P.id}" style="--hue:${P.color[0]}" hidden><div class="panel-head"><span class="panel-num">${P.num}</span><div><h2 class="panel-title">${P.title.replace(/^\d+\.\s*/, "")}</h2>${P.lead ? `<p class="panel-lead">${tx(P.lead)}</p>` : ''}</div></div>${secs.join('\n')}${pager}</div>`;
}

// Secciones ya hechas (extraídas del HTML anterior)
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const _here = path.dirname(fileURLToPath(import.meta.url));
export const legacy = (id, jump) => ({ id, jump, raw: fs.readFileSync(path.join(_here, 'legacy', id + '.html'), 'utf8') });
