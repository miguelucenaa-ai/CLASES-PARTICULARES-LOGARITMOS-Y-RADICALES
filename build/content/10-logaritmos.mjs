import { legacy, ex } from '../lib.mjs';
const r = String.raw;

// "Por definición" (Fácil 1–20): los antiguos tenían enunciados repetidos (log₂4 tres veces, log 100 tres veces...).
// Se regeneran con 20 distintos; el resto de la sección (nivel medio y difícil) se conserva.
const facil = [
  [2, 8, 3], [3, 9, 2], [5, 25, 2], [2, 32, 5], [10, 1000, 3], [7, 49, 2], [4, 16, 2], [6, 36, 2], [2, 1, 0], [9, 9, 1],
  [10, 100000, 5], [3, 243, 5], [2, 64, 6], [11, 121, 2], [5, 125, 3], [8, 64, 2], [2, 16, 4], [7, 7, 1], [13, 1, 0], [5, 625, 4],
];
const facilHTML = facil.map(([a, N, x], i) => {
  const potencia = N === 1 ? r`1=${a}^{0}` : (N === a ? r`${a}=${a}^{1}` : r`${N}=${a}^{${x}}`);
  const motivo = N === 1 ? r`Todo número (distinto de 0) elevado a $0$ vale $1$.` : (N === a ? r`Un número elevado a $1$ es él mismo.` : r`Busco el exponente: $${a}^{${x}}=${N}$.`);
  return ex({
    id: 'ex-lf-' + (i + 1), tag: 'Fácil ' + (i + 1), q: r`\log_{${a}}${N}`, chk: [`log(${N},${a})`, String(x)],
    steps: [
      { t: r`Aplico la definición: el logaritmo en base $${a}$ de $${N}$ es el exponente $x$ al que hay que elevar $${a}$ para obtener $${N}$.`, m: r`\log_{${a}}${N}=x\iff ${a}^{x}=${N}` },
      { t: r`Escribo $${N}$ como una potencia de $${a}$.`, why: motivo, m: potencia },
      { t: r`Las bases son iguales, así que los exponentes también.`, m: r`${a}^{x}=${a}^{${x}}\ \Rightarrow\ x=${x}` },
    ],
    res: String(x),
  });
}).join('');

function endOfDiv(h, start) {
  let depth = 0;
  const re = /<div\b|<\/div>/g; re.lastIndex = start;
  let m;
  while ((m = re.exec(h))) {
    depth += m[0] === '<div' ? 1 : -1;
    if (depth === 0) return m.index + m[0].length;
  }
  throw new Error('div sin cerrar');
}

const add = legacy('log-add', 'Más ejercicios');
{
  const a = add.raw.indexOf('<div class="ex" id="ex-lf-1"');
  const b = add.raw.indexOf('<h3 class="sub">Nivel Medio</h3>');
  if (a < 0 || b < 0) throw new Error('estructura de log-add distinta de la esperada');
  const cierre = add.raw.lastIndexOf('</div>', b); // cierra el <div class="grid"> de "Por definición"
  add.raw = add.raw.slice(0, a) + facilHTML + add.raw.slice(cierre);
  add.raw = add.raw.replace('Más ejercicios (Nuevos)', 'Más ejercicios');
}

export default {
  id: 'logaritmos', num: 10, cls: 'p10', tab: 'Logaritmos',
  title: '10. Logaritmos',
  lead: 'Definición, propiedades, cambio de base, ecuaciones y aplicaciones.',
  color: ['#9a4f07', '#fdf1e2', '#efd0a8'],
  sections: [
    legacy('log-idea', 'La idea'),
    legacy('log-prop', 'Propiedades'),
    legacy('log-err', 'Lo que NO se puede'),
    legacy('log-def', 'Por definición'),
    legacy('log-x', 'Halla x'),
    legacy('log-prop-ej', 'Reduce'),
    legacy('log-datos', 'Con datos'),
    legacy('log-desarr', 'Desarrollar'),
    legacy('log-ec', 'Ecuaciones'),
    legacy('log-apl', 'Aplicaciones'),
    add,
  ],
};
