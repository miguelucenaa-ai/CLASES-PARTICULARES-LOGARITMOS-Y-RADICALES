import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid } from '../lib.mjs';
const r = String.raw;

const def = {
  id: 'pot-def', jump: 'Definición', h: 'Potencia de exponente racional', kind: 'intro',
  body: [
    p(r`Una potencia $a^{n}$ tiene una **base** $a$ y un **exponente** $n$. Según sea el exponente, significa una cosa u otra:`),
    table(['Tipo de exponente', 'Definición', 'Ejemplo'], [
      ['Natural', r`$a^{n}=a\cdot a\cdots a$ ($n$ veces)`, r`$2^{4}=2\cdot2\cdot2\cdot2=16$`],
      ['Cero', r`$a^{0}=1$ (con $a\neq0$)`, r`$7^{0}=1$`],
      ['Entero negativo', r`$a^{-n}=\dfrac{1}{a^{n}}$`, r`$2^{-3}=\dfrac{1}{2^{3}}=\dfrac18$`],
      ['Fraccionario', r`$a^{\frac{m}{n}}=\sqrt[n]{a^{m}}$`, r`$8^{\frac23}=\sqrt[3]{8^{2}}=\sqrt[3]{64}=4$`],
    ]),
    cards([
      { t: 'Exponente negativo', p: r`**No** hace el número negativo: le da la vuelta. $2^{-3}$ es $\frac18$, no $-8$.` },
      { t: 'Exponente fraccionario', p: r`El **denominador** es el índice de la raíz y el **numerador** es el exponente. Une potencias con radicales.` },
    ]),
    formula(r`a^{\frac{\hl{m}}{\hb{n}}}=\sqrt[\hb{n}]{a^{\hl{m}}}`, true),
    recipe('Receta: calcular $a^{m/n}$', [
      r`Calcula primero la **raíz** de índice $n$ (el denominador). Así trabajas con números pequeños.`,
      r`Eleva el resultado al **numerador** $m$.`,
      r`Si el exponente es **negativo**, haz todo eso y al final **da la vuelta** a la fracción.`,
    ]),
    grid([
      ex({ id: 'p-d1', example: true, tag: 'Ejemplo', q: r`27^{\frac{2}{3}}`, chk: ['27**(2/3)', '9'],
        steps: [
          { t: r`Denominador 3: raíz cúbica. Numerador 2: al cuadrado.`, m: r`27^{\frac{2}{3}}=\left(\sqrt[\hl{3}]{27}\right)^{\hb{2}}` },
          { t: r`Calculo la raíz: $27=3^3$.`, m: r`\left(\sqrt[3]{27}\right)^{2}=3^{2}` },
          { t: r`Elevo.`, m: r`3^2=9` },
        ], res: r`27^{\frac23}=9` }),
      ex({ id: 'p-d2', example: true, tag: 'Exponente negativo', q: r`16^{-\frac{3}{4}}`, chk: ['16**(-3/4)', '1/8'],
        steps: [
          { t: r`El exponente es negativo: le doy la vuelta a la base.`, why: r`$a^{-x}=\dfrac{1}{a^{x}}$.`, m: r`16^{-\frac34}=\dfrac{1}{16^{\frac34}}` },
          { t: r`$16^{3/4}$: raíz cuarta ($16=2^4$) y luego al cubo.`, m: r`16^{\frac34}=\left(\sqrt[4]{16}\right)^3=2^3=8` },
          { t: r`Sustituyo.`, m: r`\dfrac{1}{8}` },
        ], res: r`16^{-\frac34}=\dfrac18` }),
      ex({ id: 'p-d3', example: true, tag: 'Fracción elevada a negativo', q: r`\left(\dfrac{2}{3}\right)^{-3}`, chk: ['(Rational(2,3))**(-3)', 'Rational(27,8)'],
        steps: [
          { t: r`Exponente negativo en una fracción: **doy la vuelta** a la fracción y el exponente pasa a positivo.`, m: r`\left(\dfrac{2}{3}\right)^{-3}=\left(\dfrac{\hl{3}}{\hl{2}}\right)^{3}` },
          { t: r`Elevo numerador y denominador.`, m: r`\dfrac{3^3}{2^3}=\dfrac{27}{8}` },
        ], res: r`\dfrac{27}{8}` }),
    ]),
  ],
};

const prop = {
  id: 'pot-prop', jump: 'Propiedades', h: 'Propiedades de las potencias', kind: 'props',
  body: [
    props([
      { h: 'Producto, misma base', m: r`a^{m}\cdot a^{n}=a^{m+n}`, why: 'Misma base: se suman los exponentes.', ej: r`$2^{3}\cdot2^{4}=2^{7}$` },
      { h: 'Cociente, misma base', m: r`a^{m}:a^{n}=a^{m-n}`, why: 'Misma base: se restan los exponentes.', ej: r`$3^{5}:3^{2}=3^{3}$` },
      { h: 'Potencia de una potencia', m: r`\left(a^{m}\right)^{n}=a^{m\cdot n}`, why: 'Se multiplican los exponentes.', ej: r`$\left(2^{3}\right)^{2}=2^{6}$` },
      { h: 'Producto, mismo exponente', m: r`a^{m}\cdot b^{m}=(a\cdot b)^{m}`, why: 'Mismo exponente: se multiplican las bases.', ej: r`$2^{3}\cdot5^{3}=10^{3}$` },
      { h: 'Cociente, mismo exponente', m: r`a^{m}:b^{m}=(a:b)^{m}`, why: 'Mismo exponente: se dividen las bases.', ej: r`$6^{2}:3^{2}=2^{2}$` },
      { h: 'Potencia de una fracción', m: r`\left(\dfrac{a}{b}\right)^{-n}=\left(\dfrac{b}{a}\right)^{n}`, why: 'Si el exponente es negativo, se da la vuelta a la fracción.', ej: r`$\left(\dfrac23\right)^{-2}=\dfrac{9}{4}$` },
    ]),
    key(r`Para aplicar las propiedades de "misma base" a veces hay que **escribir las bases como potencias de un mismo número** (por ejemplo $4=2^2$, $8=2^3$, $9=3^2$).`, 'Truco:'),
    sub('Ejemplos paso a paso'),
    grid([
      ex({ id: 'p-p1', example: true, tag: 'Misma base', q: r`\dfrac{2^{3}\cdot2^{-5}}{2^{-1}}`, chk: ['(2**3*2**(-5))/2**(-1)', '1/2'],
        steps: [
          { t: r`Arriba, producto de la misma base: **sumo** exponentes.`, m: r`2^{3}\cdot2^{-5}=2^{3+(-5)}=2^{-2}` },
          { t: r`Ahora el cociente: **resto** exponentes. Cuidado con el signo: $-2-(-1)=-2+1$.`, m: r`\dfrac{2^{-2}}{2^{-1}}=2^{-2-(-1)}=2^{-1}` },
          { t: r`Exponente negativo: doy la vuelta.`, m: r`2^{-1}=\dfrac12` },
        ], res: r`\dfrac12` }),
      ex({ id: 'p-p2', example: true, tag: 'Pasar a una misma base', q: r`\dfrac{2^{5}\cdot4^{-2}}{8^{-1}}`, chk: ['(2**5*4**(-2))/8**(-1)', '16'],
        steps: [
          { t: r`Escribo $4$ y $8$ como potencias de $2$.`, m: r`4=2^{2}\qquad8=2^{3}` },
          { t: r`Sustituyo y uso la potencia de una potencia (multiplico exponentes).`, m: r`4^{-2}=\left(2^{2}\right)^{-2}=2^{-4}\qquad8^{-1}=\left(2^{3}\right)^{-1}=2^{-3}` },
          { t: r`Ahora todo es base 2: arriba sumo, y luego resto el de abajo.`, m: r`\dfrac{2^{5}\cdot2^{-4}}{2^{-3}}=\dfrac{2^{1}}{2^{-3}}=2^{1-(-3)}=2^{4}` },
          { t: r`Calculo.`, m: r`2^4=16` },
        ], res: r`16` }),
      ex({ id: 'p-p3', example: true, tag: 'Radicales como potencias', q: r`\sqrt{a}\cdot\sqrt[3]{a}`, chk: ['sqrt(a)*root(a,3)', 'root(a**5,6)'],
        steps: [
          { t: r`Convierto cada raíz en potencia: el índice pasa al denominador.`, m: r`\sqrt{a}=a^{\frac12}\qquad\sqrt[3]{a}=a^{\frac13}` },
          { t: r`Misma base: sumo los exponentes (fracciones, con denominador común 6).`, m: r`a^{\frac12}\cdot a^{\frac13}=a^{\frac12+\frac13}=a^{\frac36+\frac26}=a^{\frac56}` },
          { t: r`Vuelvo a radical.`, m: r`a^{\frac56}=\sqrt[6]{a^{5}}` },
        ], res: r`\sqrt[6]{a^{5}}` }),
      ex({ id: 'p-p4', example: true, tag: 'Radicales como potencias', q: r`\dfrac{\sqrt[4]{a^{3}}}{\sqrt{a}}`, chk: ['root(a**3,4)/sqrt(a)', 'root(a,4)'],
        steps: [
          { t: r`Paso a potencias.`, m: r`\sqrt[4]{a^{3}}=a^{\frac34}\qquad\sqrt{a}=a^{\frac12}` },
          { t: r`Misma base, cociente: resto exponentes.`, m: r`a^{\frac34-\frac12}=a^{\frac34-\frac24}=a^{\frac14}` },
          { t: r`Vuelvo a radical.`, m: r`a^{\frac14}=\sqrt[4]{a}` },
        ], res: r`\sqrt[4]{a}` }),
    ]),
  ],
};

const err = {
  id: 'pot-err', jump: 'Errores típicos', h: 'Errores típicos con potencias', kind: 'errors',
  body: [
    errs([
      { t: r`**El cuadrado de una suma NO es la suma de cuadrados.**`, m: r`(a+b)^{2}\neq a^{2}+b^{2}`, ok: r`$(a+b)^2=a^2+2ab+b^2$. Con números: $(2+3)^2=25$, pero $2^2+3^2=13$.` },
      { t: r`**Sumar potencias no suma exponentes.**`, m: r`2^{3}+2^{4}\neq2^{7}`, ok: r`Los exponentes se suman al **multiplicar**: $2^3\cdot2^4=2^7$. Aquí $8+16=24$.` },
      { t: r`**Exponente negativo no significa número negativo.**`, m: r`2^{-3}\neq-8`, ok: r`$2^{-3}=\dfrac{1}{2^3}=\dfrac18$.` },
      { t: r`**Cuidado con el signo y el paréntesis.**`, m: r`(-2)^{2}\neq-2^{2}`, ok: r`$(-2)^2=(-2)(-2)=4$, pero $-2^2=-(2\cdot2)=-4$.` },
      { t: r`**Bases distintas no se juntan sumando exponentes.**`, m: r`2^{3}\cdot3^{2}\neq6^{5}`, ok: r`Con bases y exponentes distintos no hay propiedad: $8\cdot9=72$.` },
      { t: r`**Potencia de potencia: se multiplica, no se eleva.**`, m: r`\left(2^{3}\right)^{2}\neq2^{9}`, ok: r`$\left(2^3\right)^2=2^{3\cdot2}=2^6$.` },
    ]),
  ],
};

const practica = {
  id: 'pot-prac', jump: 'Practica', h: 'Practica: potencias', kind: 'exercises',
  body: [
    p(r`Intenta cada uno **antes** de pulsar "Ver paso". Si te atascas, mira solo un paso y sigue tú.`, 'intro'),
    grid([
      ex({ id: 'p-q1', tag: 'Calcula', q: r`8^{\frac{4}{3}}`, chk: ['8**(4/3)', '16'],
        steps: [
          { t: r`Raíz cúbica de 8 y luego a la cuarta.`, m: r`8^{\frac43}=\left(\sqrt[3]{8}\right)^{4}=2^{4}` },
          { t: r`Elevo.`, m: r`2^4=16` },
        ], res: r`16` }),
      ex({ id: 'p-q2', tag: 'Calcula', q: r`4^{-\frac{3}{2}}`, chk: ['4**(-3/2)', '1/8'],
        steps: [
          { t: r`Doy la vuelta por el signo menos.`, m: r`4^{-\frac32}=\dfrac{1}{4^{\frac32}}` },
          { t: r`$4^{3/2}=(\sqrt{4})^3=2^3=8$.`, m: r`\dfrac{1}{8}` },
        ], res: r`\dfrac18` }),
      ex({ id: 'p-q3', tag: 'Calcula', q: r`9^{\frac{3}{2}}`, chk: ['9**(3/2)', '27'],
        steps: [
          { t: r`Raíz cuadrada de 9 y al cubo.`, m: r`9^{\frac32}=\left(\sqrt{9}\right)^{3}=3^{3}=27` },
        ], res: r`27` }),
      ex({ id: 'p-q4', tag: 'Calcula', q: r`\left(\dfrac12\right)^{-3}`, chk: ['(Rational(1,2))**(-3)', '8'],
        steps: [
          { t: r`Exponente negativo: doy la vuelta a la fracción.`, m: r`\left(\dfrac12\right)^{-3}=\left(\dfrac21\right)^{3}=2^3` },
          { t: r`Elevo.`, m: r`8` },
        ], res: r`8` }),
      ex({ id: 'p-q5', tag: 'Calcula', q: r`3^{-2}+3^{-1}`, chk: ['3**(-2)+3**(-1)', 'Rational(4,9)'],
        steps: [
          { t: r`Paso cada término a fracción.`, m: r`3^{-2}=\dfrac19\qquad3^{-1}=\dfrac13` },
          { t: r`Denominador común 9: $\frac13=\frac39$.`, m: r`\dfrac19+\dfrac39=\dfrac49` },
        ], res: r`\dfrac49` }),
      ex({ id: 'p-q6', tag: 'Calcula', q: r`\left(2^{-1}+3^{-1}\right)^{-1}`, chk: ['(2**(-1)+3**(-1))**(-1)', 'Rational(6,5)'],
        steps: [
          { t: r`Primero, dentro del paréntesis: paso a fracciones.`, m: r`2^{-1}+3^{-1}=\dfrac12+\dfrac13` },
          { t: r`Denominador común 6.`, m: r`\dfrac36+\dfrac26=\dfrac56` },
          { t: r`Ahora el exponente $-1$: doy la vuelta.`, m: r`\left(\dfrac56\right)^{-1}=\dfrac65` },
        ], res: r`\dfrac65` }),
      ex({ id: 'p-q7', tag: 'Simplifica', q: r`\dfrac{\left(5^{3}\right)^{2}}{5^{4}}`, chk: ['(5**3)**2/5**4', '25'],
        steps: [
          { t: r`Potencia de potencia: multiplico exponentes.`, m: r`\left(5^3\right)^2=5^6` },
          { t: r`Cociente de la misma base: resto exponentes.`, m: r`\dfrac{5^{6}}{5^{4}}=5^{2}=25` },
        ], res: r`25` }),
      ex({ id: 'p-q8', tag: 'Simplifica', q: r`\dfrac{9^{2}\cdot27^{-1}}{3^{-2}}`, chk: ['(9**2*27**(-1))/3**(-2)', '27'],
        steps: [
          { t: r`Todo a base 3: $9=3^2$, $27=3^3$.`, m: r`9^2=\left(3^2\right)^2=3^4\qquad27^{-1}=\left(3^3\right)^{-1}=3^{-3}` },
          { t: r`Arriba sumo: $4+(-3)=1$.`, m: r`\dfrac{3^{4}\cdot3^{-3}}{3^{-2}}=\dfrac{3^{1}}{3^{-2}}` },
          { t: r`Resto: $1-(-2)=3$.`, m: r`3^{3}=27` },
        ], res: r`27` }),
      ex({ id: 'p-q9', tag: 'Radicales ↔ potencias', q: r`\sqrt[3]{a^{2}}\cdot\sqrt{a}`, chk: ['root(a**2,3)*sqrt(a)', 'root(a**7,6)'],
        steps: [
          { t: r`A potencias.`, m: r`\sqrt[3]{a^2}=a^{\frac23}\qquad\sqrt{a}=a^{\frac12}` },
          { t: r`Sumo exponentes: $\frac23+\frac12=\frac46+\frac36$.`, m: r`a^{\frac23+\frac12}=a^{\frac76}` },
          { t: r`Vuelvo a radical.`, m: r`\sqrt[6]{a^{7}}=a\sqrt[6]{a}` },
        ], res: r`\sqrt[6]{a^{7}}=a\sqrt[6]{a}` }),
    ]),
  ],
};

export default {
  id: 'potencias', num: 9, cls: 'p9', tab: 'Potencias',
  title: '9. Potencias',
  lead: 'Definición, exponente negativo y fraccionario, y propiedades.',
  color: ['#3f6f0d', '#eaf5dc', '#c6e0a3'],
  sections: [def, prop, err, practica],
};
