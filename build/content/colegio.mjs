// Los 26 ejercicios del final del tema (PDF), colocados en el apartado al que corresponden.
// Los que mezclan varios apartados grandes (12a, 21 y 22) van a la pestaña «Ejercicios finales».
// Los ejercicios 11 y 14–20 ya estaban resueltos en sus apartados (Radicales y Logaritmos), así que no se repiten.
import { p, sub, grid, registry } from '../lib.mjs';
import './11a-finales.mjs';
import './11b-finales.mjs';
import './11c-finales.mjs';

const pick = (ids) => grid(ids.map((i) => {
  if (!registry[i]) throw new Error('ejercicio no encontrado: ' + i);
  return registry[i];
}));
const group = (title, ids) => [sub(title), pick(ids)];
const sec = (id, intro, ...groups) => ({
  id: id + '-col', jump: 'Final del tema (PDF)', h: 'Ejercicios del final del tema', kind: 'exercises',
  body: [p(intro, 'intro'), ...groups.flat()],
});
const base = 'Los ejercicios de tu PDF que corresponden a este apartado, con su número original. ';

export const colegio = {
  reales: sec('rea', base + 'Resueltos paso a paso.',
    group('1. Clasifica los siguientes números', ['fin-1a', 'fin-1b', 'fin-1c', 'fin-1d']),
    group('2. Realiza las operaciones y expresa el resultado en forma de fracción', ['fin-2a', 'fin-2b']),
    group('25. ¿Verdadero o falso? Explica por qué', ['fin-25a', 'fin-25b', 'fin-25c', 'fin-25d'])),

  desigualdades: sec('des', base + 'Resueltos paso a paso.',
    group('3. Ordena de menor a mayor', ['fin-3a', 'fin-3b']),
    group('4. Demostración con el inverso', ['fin-4']),
    group('5. Demostración con un cuadrado', ['fin-5'])),

  recta: sec('rec', base + 'Resueltos paso a paso.',
    group('6. Representa en la recta real', ['fin-6a', 'fin-6b', 'fin-6c', 'fin-6d'])),

  'valor-absoluto': sec('abs', base + 'Resueltos paso a paso.',
    group('7. Desarrolla las siguientes expresiones', ['fin-7a', 'fin-7b'])),

  intervalos: sec('int', base + 'Resueltos paso a paso.',
    group('8. Operaciones con intervalos', ['fin-8']),
    group('9. Expresa con un intervalo y representa', ['fin-9a', 'fin-9b'])),

  aproximaciones: sec('apr', base + 'Son problemas de geometría en los que hay que **aproximar** el resultado.',
    group('23. Cuadrado de área 10,5 cm²', ['fin-23']),
    group('24. Triángulo equilátero de lado 10 cm', ['fin-24'])),

  radicales: sec('rad', base + 'El ejercicio 11 (racionalizar) está más arriba, en «Ejercicios del colegio».',
    group('10. Opera y simplifica', ['fin-10a', 'fin-10b']),
    group('12. Simplifica (los de raíces)', ['fin-12b', 'fin-12e', 'fin-12f']),
    group('13. Opera y simplifica', ['fin-13a', 'fin-13b', 'fin-13c', 'fin-13d'])),

  potencias: sec('pot', base + 'Los que mezclan potencias con otros apartados están en la pestaña «Ejercicios finales».',
    group('12. Simplifica (los de potencias)', ['fin-12c', 'fin-12d'])),

  logaritmos: sec('log', base + 'Los ejercicios 14 a 20 del PDF ya están resueltos arriba: por definición (14), calcula $x$ (15), con datos (16), ecuaciones (17 y 20) y desarrollar (18 y 19).',
    group('26. ¿Verdadero o falso? Explica por qué', ['fin-26a', 'fin-26b', 'fin-26c', 'fin-26d'])),
};

// Pestaña «Ejercicios finales»: solo los que mezclan varios apartados grandes
export const mezclados = [
  {
    id: 'fin-mezcla', jump: 'Potencias y radicales (12)', h: 'Mezclan potencias y radicales', kind: 'exercises',
    body: [p('Ejercicio del PDF que necesita **potencias y radicales** a la vez.', 'intro'), ...group('12. Simplifica', ['fin-12a'])],
  },
  {
    id: 'fin-sint', jump: 'Síntesis (21 y 22)', h: 'Síntesis: logaritmos, radicales, potencias y clasificación', kind: 'exercises',
    body: [
      p('Mezclan **logaritmos, radicales y potencias**, y en el 21 además hay que **clasificar** el número resultante. Son los más difíciles del tema: ¡déjalos para cuando domines todo lo demás!', 'intro'),
      ...group('21. Clasifica los siguientes números reales', ['fin-21a', 'fin-21b', 'fin-21c', 'fin-21d']),
      ...group('22. Calcula el valor de', ['fin-22a', 'fin-22b', 'fin-22c', 'fin-22d']),
    ],
  },
];
