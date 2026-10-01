import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, figure } from '../lib.mjs';
import { numline } from '../svg.mjs';
const r = String.raw;

const ord = {
  id: 'des-ord', jump: 'Orden en ℝ', h: 'Ordenación de números reales', kind: 'intro',
  body: [
    p(r`Dados dos números reales, siempre podemos decir cuál es mayor. La idea es sencilla: $a\le b$ significa que **la diferencia $b-a$ es positiva o cero**.`),
    formula(r`a\le b\iff b-a\ge0`, true),
    figure(numline({ from: -4, to: 5, pts: [{ x: -2, label: '−2', c: 2 }, { x: 3, label: '3' }], aria: '-2 está a la izquierda de 3' }), r`En la recta, **el mayor está siempre más a la derecha**: $-2<3$.`),
    sub('Tipos de desigualdades'),
    table(['Símbolo', 'Se lee', 'Significa'], [
      [r`$a\le b$`, 'menor o igual', r`$a$ es menor que $b$ **o** igual`],
      [r`$a<b$`, 'menor', r`$a\le b$ y además $a\neq b$`],
      [r`$a\ge b$`, 'mayor o igual', r`$b\le a$`],
      [r`$a>b$`, 'mayor', r`$b\le a$ y además $a\neq b$`],
    ]),
    sub('La relación ≤ es un orden total'),
    p(r`Esto quiere decir que cumple estas cuatro propiedades:`),
    props([
      { h: 'Reflexiva', m: r`a\le a`, why: 'Todo número es menor o igual que sí mismo.' },
      { h: 'Antisimétrica', m: r`a\le b\ \text{y}\ b\le a\ \Rightarrow\ a=b`, why: 'Si cada uno es menor o igual que el otro, son iguales.' },
      { h: 'Transitiva', m: r`a\le b\ \text{y}\ b\le c\ \Rightarrow\ a\le c`, why: 'Si $a$ llega antes que $b$ y $b$ antes que $c$, $a$ llega antes que $c$.' },
      { h: 'Total', m: r`a\le b\ \ \text{o}\ \ b\le a`, why: 'Dos números cualesquiera siempre se pueden comparar.' },
    ]),
    grid([
      ex({ id: 'des-o1', example: true, tag: 'Comparar por diferencia', task: r`¿Cuál es mayor, $\dfrac57$ o $\dfrac34$?`, chk: ['Rational(3,4)-Rational(5,7)', 'Rational(1,28)'],
        steps: [
          { t: r`Calculo la diferencia $\frac34-\frac57$ (denominador común 28).`, m: r`\dfrac34-\dfrac57=\dfrac{21}{28}-\dfrac{20}{28}=\dfrac{1}{28}` },
          { t: r`La diferencia es **positiva**: $\frac34-\frac57>0$, es decir, $\frac34>\frac57$.`, why: r`Por definición, $a\le b$ cuando $b-a\ge0$.` },
        ], resTxt: r`$\dfrac34>\dfrac57$.` }),
    ]),
  ],
};

const prop = {
  id: 'des-prop', jump: 'Operar con desigualdades', h: 'Propiedades del orden y las operaciones', kind: 'intro',
  body: [
    p(r`Podemos operar con una desigualdad, pero hay que tener cuidado con **una regla de oro**:`),
    cards([
      { t: 'Sumar o restar', m: r`a\le b\iff a\pm c\le b\pm c`, p: 'Se mantiene el sentido, sea $c$ como sea.' },
      { t: 'Multiplicar o dividir por un número **positivo**', m: r`a\le b,\ c>0\iff ac\le bc`, p: 'Se mantiene el sentido.' },
      { t: 'Multiplicar o dividir por un número **negativo**', m: r`a\le b,\ c<0\iff ac\ge bc`, p: '**Se invierte** el sentido de la desigualdad.' },
    ], 'three'),
    key(r`Al multiplicar o dividir por un **negativo**, el símbolo **se da la vuelta**: $\le$ pasa a $\ge$ y $<$ pasa a $>$.`, '¡Regla de oro!'),
    p(r`**Por qué:** $2<5$, pero si multiplicas por $-1$ queda $-2$ y $-5$, y ahora $-2>-5$. Los números se colocan "al revés" en la recta.`),
    figure(numline({ from: -6, to: 6, pts: [{ x: -5, label: '−5', c: 2 }, { x: -2, label: '−2', c: 2 }, { x: 2, label: '2' }, { x: 5, label: '5' }], aria: 'Al multiplicar por -1 se invierte el orden' }), r`$2<5$ (azul), pero al multiplicar por $-1$ el orden se invierte: $-5<-2$ (rojo), es decir, $-2>-5$.`),
    recipe('Receta: resolver una inecuación de primer grado', [
      r`**Sumando o restando**, deja la parte con $x$ sola en un lado.`,
      r`**Divide** entre el coeficiente de $x$. Si es **negativo**, ¡cambia el sentido!`,
      r`Escribe la solución como **intervalo** y dibújala.`,
    ]),
    grid([
      ex({ id: 'des-p1', example: true, tag: 'Ejemplo', task: r`Resuelve $2x+3<11$.`,
        steps: [
          { t: r`Resto 3 en los dos lados.`, m: r`2x<8` },
          { t: r`Divido entre $2$ (positivo): el sentido **no** cambia.`, m: r`x<4` },
          { t: r`Como intervalo, sin incluir el 4.`, m: r`x\in(-\infty,\,4)`, fig: figure(numline({ from: -2, to: 7, segs: [{ a: -Infinity, b: 4, bc: false }], aria: 'x menor que 4' })) },
        ], resTxt: r`$x\in(-\infty,4)$.` }),
      ex({ id: 'des-p2', example: true, tag: 'Ejemplo (negativo)', task: r`Resuelve $-3x\ge12$.`,
        steps: [
          { t: r`Divido entre $-3$, que es **negativo**: el sentido **se invierte** ($\ge$ pasa a $\le$).`, m: r`x\le\dfrac{12}{-3}=-4` },
          { t: r`Como intervalo, incluyendo el $-4$.`, m: r`x\in(-\infty,\,-4]`, fig: figure(numline({ from: -7, to: 2, segs: [{ a: -Infinity, b: -4, bc: true }], aria: 'x menor o igual que -4' })) },
        ], resTxt: r`$x\in(-\infty,-4]$.` }),
      ex({ id: 'des-p3', example: true, tag: 'Ejemplo (negativo)', task: r`Resuelve $5-2x>1$.`,
        steps: [
          { t: r`Resto 5 en los dos lados.`, m: r`-2x>1-5=-4` },
          { t: r`Divido entre $-2$ (negativo): **se invierte**.`, m: r`x<\dfrac{-4}{-2}=2` },
          { t: r`Intervalo.`, m: r`x\in(-\infty,\,2)`, fig: figure(numline({ from: -3, to: 5, segs: [{ a: -Infinity, b: 2, bc: false }], aria: 'x menor que 2' })) },
        ], resTxt: r`$x\in(-\infty,2)$.` }),
      ex({ id: 'des-p4', example: true, tag: 'Doble desigualdad', task: r`Resuelve $-1<2x+1\le5$.`,
        steps: [
          { t: r`Resto 1 en **las tres partes**.`, m: r`-2<2x\le4` },
          { t: r`Divido las tres partes entre $2$ (positivo).`, m: r`-1<x\le2` },
          { t: r`Intervalo: el $-1$ no entra y el $2$ sí.`, m: r`x\in(-1,\,2]`, fig: figure(numline({ from: -3, to: 4, segs: [{ a: -1, b: 2, ac: false, bc: true }], aria: 'Entre -1 y 2' })) },
        ], resTxt: r`$x\in(-1,2]$.` }),
    ]),
  ],
};

const ordej = {
  id: 'des-ordej', jump: 'Ordenar números', h: 'Ordenar números reales', kind: 'intro',
  body: [
    recipe('Receta: ordenar de menor a mayor', [
      r`**Fracciones:** pásalas a **decimales** (divide) o ponlas con **denominador común**.`,
      r`**Decimales periódicos:** escríbelos con varias cifras y compara cifra a cifra desde la izquierda.`,
      r`**Raíces:** pásalas a decimales con la calculadora, o ponlas con común índice.`,
      r`Escribe el resultado con el símbolo $<$ entre cada par.`,
    ]),
    grid([
      ex({ id: 'des-r1', example: true, tag: 'Fracciones', task: r`Ordena de menor a mayor: $\dfrac{11}{4},\ \dfrac{68}{25},\ \dfrac{14}{5},\ \dfrac{27}{10}$.`,
        steps: [
          { t: r`Las paso a decimales dividiendo.`, m: [r`\dfrac{11}{4}=2{,}75\qquad\dfrac{68}{25}=2{,}72`, r`\dfrac{14}{5}=2{,}8\qquad\dfrac{27}{10}=2{,}7`] },
          { t: r`Ordeno los decimales: $2{,}7<2{,}72<2{,}75<2{,}8$.`, m: r`2{,}7<2{,}72<2{,}75<2{,}8` },
          { t: r`Vuelvo a las fracciones.`, m: r`\dfrac{27}{10}<\dfrac{68}{25}<\dfrac{11}{4}<\dfrac{14}{5}` },
        ], res: r`\dfrac{27}{10}<\dfrac{68}{25}<\dfrac{11}{4}<\dfrac{14}{5}` }),
      ex({ id: 'des-r2', example: true, tag: 'Con raíces', task: r`Ordena: $\sqrt{2},\ \dfrac32,\ 1{,}4$.`,
        steps: [
          { t: r`Calculo $\sqrt{2}\approx1{,}41421\ldots$ y $\frac32=1{,}5$.`, m: r`\sqrt2\approx1{,}414\qquad\dfrac32=1{,}5` },
          { t: r`Ordeno: $1{,}4<1{,}414<1{,}5$.`, m: r`1{,}4<\sqrt2<\dfrac32` },
        ], res: r`1{,}4<\sqrt{2}<\dfrac32` }),
      ex({ id: 'des-r3', example: true, tag: 'Con periódicos', task: r`Ordena: $1{,}\overline{6},\ 1{,}6,\ 1{,}\overline{65}$.`,
        steps: [
          { t: r`Los escribo con varias cifras para compararlos.`, m: [r`1{,}\overline{6}=1{,}6666\ldots`, r`1{,}6=1{,}6000\ldots`, r`1{,}\overline{65}=1{,}656565\ldots`] },
          { t: r`Primera cifra decimal: las tres son 6. Segunda: $0$ en el $1{,}6$, $5$ en el $1{,}\overline{65}$ y $6$ en el $1{,}\overline{6}$.`, m: r`1{,}6<1{,}\overline{65}<1{,}\overline{6}` },
        ], res: r`1{,}6<1{,}\overline{65}<1{,}\overline{6}` }),
    ]),
  ],
};

const err = {
  id: 'des-err', jump: 'Errores típicos', h: 'Errores típicos', kind: 'errors',
  body: [
    errs([
      { t: r`**No invertir al multiplicar o dividir por un negativo.**`, m: r`-2x>6\ \Rightarrow\ x>-3\ \text{✗}`, ok: r`Divido entre $-2$ (negativo): $x<-3$.` },
      { t: r`**Elevar al cuadrado una desigualdad con negativos.**`, m: r`-3<2\ \Rightarrow\ 9<4\ \text{✗}`, ok: r`Elevar al cuadrado **no conserva** el orden si hay negativos: $9>4$.` },
      { t: r`**Invertir los dos lados cuando tienen signos distintos.**`, m: r`-2<5\ \Rightarrow\ \dfrac{1}{-2}>\dfrac15\ \text{✗}`, ok: r`Al pasar a inversos solo se invierte el orden si los dos números tienen el **mismo signo** (ambos positivos o ambos negativos). Aquí $-\frac12<\frac15$.` },
      { t: r`**Pasar $<$ a $\le$ sin pensarlo.**`, ok: r`$x<4$ **no** incluye el 4 (paréntesis) y $x\le4$ sí lo incluye (corchete).` },
    ]),
  ],
};

export default {
  id: 'desigualdades', num: 2, cls: 'p2', tab: 'Desigualdades', title: '2. Ordenación de números reales. Desigualdades',
  lead: 'Cómo comparar números y cómo se comportan las desigualdades al operar.',
  color: ['#6d3fd3', '#f0eafd', '#d6c8f4'],
  sections: [ord, prop, ordej, err],
};
