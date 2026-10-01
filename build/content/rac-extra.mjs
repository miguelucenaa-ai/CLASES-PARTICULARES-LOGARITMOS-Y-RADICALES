// Más ejercicios de racionalización (sustituye a los antiguos, que tenían resultados sin simplificar del todo y enunciados repetidos).
import { p, sub, ex, grid } from '../lib.mjs';
const r = String.raw;

// Caso 1: a / √n   (a, n, resultado simplificado, paso de simplificación opcional)
const caso1 = [
  [2, 3, r`\dfrac{2\sqrt3}{3}`, null, '2*sqrt(3)/3'],
  [4, 7, r`\dfrac{4\sqrt7}{7}`, null, '4*sqrt(7)/7'],
  [3, 6, r`\dfrac{\sqrt6}{2}`, r`\dfrac{3\sqrt6}{6}=\dfrac{\sqrt6}{2}`, 'sqrt(6)/2'],
  [6, 2, r`3\sqrt2`, r`\dfrac{6\sqrt2}{2}=3\sqrt2`, '3*sqrt(2)'],
  [5, 10, r`\dfrac{\sqrt{10}}{2}`, r`\dfrac{5\sqrt{10}}{10}=\dfrac{\sqrt{10}}{2}`, 'sqrt(10)/2'],
  [6, 5, r`\dfrac{6\sqrt5}{5}`, null, '6*sqrt(5)/5'],
  [9, 3, r`3\sqrt3`, r`\dfrac{9\sqrt3}{3}=3\sqrt3`, '3*sqrt(3)'],
  [7, 5, r`\dfrac{7\sqrt5}{5}`, null, '7*sqrt(5)/5'],
  [8, 6, r`\dfrac{4\sqrt6}{3}`, r`\dfrac{8\sqrt6}{6}=\dfrac{4\sqrt6}{3}`, '4*sqrt(6)/3'],
  [10, 15, r`\dfrac{2\sqrt{15}}{3}`, r`\dfrac{10\sqrt{15}}{15}=\dfrac{2\sqrt{15}}{3}`, '2*sqrt(15)/3'],
];

// Caso 3: a / (P ± Q)   (numerador tex, P, Q, signo, cálculo del denominador, resultado final, chk enunciado, chk resultado)
const caso3 = [
  [r`2`, r`\sqrt5`, r`\sqrt3`, '+', r`(\sqrt5)^2-(\sqrt3)^2=5-3=2`, r`\dfrac{2(\sqrt5-\sqrt3)}{2}=\sqrt5-\sqrt3`, '2/(sqrt(5)+sqrt(3))', 'sqrt(5)-sqrt(3)'],
  [r`3`, r`\sqrt5`, r`\sqrt2`, '-', r`(\sqrt5)^2-(\sqrt2)^2=5-2=3`, r`\dfrac{3(\sqrt5+\sqrt2)}{3}=\sqrt5+\sqrt2`, '3/(sqrt(5)-sqrt(2))', 'sqrt(5)+sqrt(2)'],
  [r`6`, r`\sqrt7`, r`1`, '+', r`(\sqrt7)^2-1^2=7-1=6`, r`\dfrac{6(\sqrt7-1)}{6}=\sqrt7-1`, '6/(sqrt(7)+1)', 'sqrt(7)-1'],
  [r`4`, r`\sqrt6`, r`\sqrt2`, '-', r`(\sqrt6)^2-(\sqrt2)^2=6-2=4`, r`\dfrac{4(\sqrt6+\sqrt2)}{4}=\sqrt6+\sqrt2`, '4/(sqrt(6)-sqrt(2))', 'sqrt(6)+sqrt(2)'],
  [r`5`, r`3`, r`\sqrt2`, '+', r`3^2-(\sqrt2)^2=9-2=7`, r`\dfrac{5(3-\sqrt2)}{7}`, '5/(3+sqrt(2))', '5*(3-sqrt(2))/7'],
  [r`1`, r`\sqrt5`, r`2`, '-', r`(\sqrt5)^2-2^2=5-4=1`, r`\dfrac{\sqrt5+2}{1}=\sqrt5+2`, '1/(sqrt(5)-2)', 'sqrt(5)+2'],
  [r`2`, r`\sqrt3`, r`\sqrt2`, '+', r`(\sqrt3)^2-(\sqrt2)^2=3-2=1`, r`\dfrac{2(\sqrt3-\sqrt2)}{1}=2\sqrt3-2\sqrt2`, '2/(sqrt(3)+sqrt(2))', '2*sqrt(3)-2*sqrt(2)'],
  [r`8`, r`\sqrt{10}`, r`\sqrt2`, '-', r`(\sqrt{10})^2-(\sqrt2)^2=10-2=8`, r`\dfrac{8(\sqrt{10}+\sqrt2)}{8}=\sqrt{10}+\sqrt2`, '8/(sqrt(10)-sqrt(2))', 'sqrt(10)+sqrt(2)'],
  [r`3`, r`2\sqrt3`, r`3`, '-', r`(2\sqrt3)^2-3^2=4\cdot3-9=3`, r`\dfrac{3(2\sqrt3+3)}{3}=2\sqrt3+3`, '3/(2*sqrt(3)-3)', '2*sqrt(3)+3'],
  [r`\sqrt3`, r`\sqrt3`, r`1`, '+', r`(\sqrt3)^2-1^2=3-1=2`, r`\dfrac{\sqrt3(\sqrt3-1)}{2}=\dfrac{3-\sqrt3}{2}`, 'sqrt(3)/(sqrt(3)+1)', '(3-sqrt(3))/2'],
];

const f = caso1.map(([a, n, res, simp, chk], i) => ex({
  id: 'ex-rf-' + (i + 1), tag: 'Fácil ' + (i + 1), q: String.raw`\dfrac{${a}}{\sqrt{${n}}}`, chk: [`${a}/sqrt(${n})`, chk],
  steps: [
    { t: String.raw`Multiplico numerador y denominador por la raíz de abajo, $\sqrt{${n}}$.`, m: String.raw`\dfrac{${a}}{\sqrt{${n}}}\cdot\dfrac{\sqrt{${n}}}{\sqrt{${n}}}=\dfrac{${a}\sqrt{${n}}}{\sqrt{${n}}\cdot\sqrt{${n}}}` },
    { t: String.raw`Abajo, la raíz al cuadrado se elimina: $\left(\sqrt{${n}}\right)^2=${n}$.`, m: String.raw`\dfrac{${a}\sqrt{${n}}}{${n}}` },
    ...(simp ? [{ t: 'Simplifico la fracción: numerador y denominador se pueden dividir entre el mismo número.', m: simp }] : []),
  ],
  res,
}));

const m = caso3.map(([a, P, Q, s, den, res, cq, cr], i) => {
  const conj = P + (s === '+' ? '-' : '+') + Q, orig = P + s + Q;
  const mult = String.raw`\dfrac{${a}}{${orig}}\cdot\dfrac{${conj}}{${conj}}`;
  return ex({
    id: 'ex-rd-' + (i + 11), tag: 'Medio ' + (i + 11), q: String.raw`\dfrac{${a}}{${orig}}`, chk: [cq, cr],
    steps: [
      { t: String.raw`Multiplico arriba y abajo por el conjugado $${conj}$ (cambio el signo del medio).`, m: mult },
      { t: 'Abajo, suma por diferencia: el cuadrado del primero menos el cuadrado del segundo.', m: den },
      { t: 'Escribo el resultado y simplifico lo que se pueda.', m: res },
    ],
    res: res.split('=').pop(),
  });
});

export const racExtra = {
  id: 'rac-add', jump: 'Más racionalización', h: 'Más ejercicios de racionalización', kind: 'exercises',
  body: [
    p(String.raw`Fíjate en el último paso: **siempre hay que simplificar** el resultado (si arriba y abajo hay un mismo número, se tacha; si abajo queda $1$, se quita).`, 'intro'),
    sub('Caso 1: una raíz cuadrada en el denominador'),
    grid(f),
    sub('Caso 3: el conjugado'),
    grid(m),
  ],
};
