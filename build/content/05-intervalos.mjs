import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, figure } from '../lib.mjs';
import { numline } from '../svg.mjs';
const r = String.raw;
const small = (o) => numline({ w: 420, h: 84, y: 48, ...o });

const inter = {
  id: 'int-int', jump: 'Intervalos', h: 'Intervalos', kind: 'intro',
  body: [
    p(r`Un **intervalo** es el conjunto de **todos los números reales comprendidos entre dos números** $a$ y $b$. Según entren o no los extremos, hay cuatro tipos:`),
    key(r`**Corchete** $[\ ]$ = el extremo **entra** (punto relleno ●). **Paréntesis** $(\ )$ = el extremo **no entra** (punto vacío ○).`, 'Cómo se lee:'),
    cards([
      { t: 'Cerrado', m: r`[a,b]=\{x\in\mathbb{R}: a\le x\le b\}`, html: small({ from: 0, to: 8, ticks: [2, 6], labels: { 2: 'a', 6: 'b' }, segs: [{ a: 2, b: 6, ac: true, bc: true }], aria: 'Intervalo cerrado' }) },
      { t: 'Abierto', m: r`(a,b)=\{x\in\mathbb{R}: a< x< b\}`, html: small({ from: 0, to: 8, ticks: [2, 6], labels: { 2: 'a', 6: 'b' }, segs: [{ a: 2, b: 6, ac: false, bc: false }], aria: 'Intervalo abierto' }) },
      { t: 'Abierto por la derecha', m: r`[a,b)=\{x\in\mathbb{R}: a\le x< b\}`, html: small({ from: 0, to: 8, ticks: [2, 6], labels: { 2: 'a', 6: 'b' }, segs: [{ a: 2, b: 6, ac: true, bc: false }], aria: 'Cerrado en a, abierto en b' }) },
      { t: 'Abierto por la izquierda', m: r`(a,b]=\{x\in\mathbb{R}: a< x\le b\}`, html: small({ from: 0, to: 8, ticks: [2, 6], labels: { 2: 'a', 6: 'b' }, segs: [{ a: 2, b: 6, ac: false, bc: true }], aria: 'Abierto en a, cerrado en b' }) },
    ]),
    sub('Ejemplos con números'),
    cards([
      { m: r`[2,6]=\{x:2\le x\le6\}`, html: small({ from: 0, to: 8, ticks: [2, 6], segs: [{ a: 2, b: 6, ac: true, bc: true }], aria: '[2,6]' }) },
      { m: r`(2,6)=\{x:2< x<6\}`, html: small({ from: 0, to: 8, ticks: [2, 6], segs: [{ a: 2, b: 6, ac: false, bc: false }], aria: '(2,6)' }) },
      { m: r`[2,6)=\{x:2\le x<6\}`, html: small({ from: 0, to: 8, ticks: [2, 6], segs: [{ a: 2, b: 6, ac: true, bc: false }], aria: '[2,6)' }) },
      { m: r`(2,6]=\{x:2< x\le6\}`, html: small({ from: 0, to: 8, ticks: [2, 6], segs: [{ a: 2, b: 6, ac: false, bc: true }], aria: '(2,6]' }) },
    ]),
    tip(r`Truco: **desigualdad con $\le$ o $\ge$ → corchete**; **con $<$ o $>$ → paréntesis**.`),
  ],
};

const sem = {
  id: 'int-sem', jump: 'Semirrectas', h: 'Semirrectas', kind: 'intro',
  body: [
    p(r`Una **semirrecta** está determinada por **un solo número** y contiene a todos los mayores o a todos los menores que él. El símbolo $\infty$ **siempre lleva paréntesis**, porque nunca se llega a él.`),
    cards([
      { m: r`[a,+\infty)=\{x: x\ge a\}`, html: small({ from: 0, to: 8, ticks: [3], labels: { 3: 'a' }, segs: [{ a: 3, b: Infinity, ac: true }], aria: 'x mayor o igual que a' }) },
      { m: r`(a,+\infty)=\{x: x> a\}`, html: small({ from: 0, to: 8, ticks: [3], labels: { 3: 'a' }, segs: [{ a: 3, b: Infinity, ac: false }], aria: 'x mayor que a' }) },
      { m: r`(-\infty,b]=\{x: x\le b\}`, html: small({ from: 0, to: 8, ticks: [5], labels: { 5: 'b' }, segs: [{ a: -Infinity, b: 5, bc: true }], aria: 'x menor o igual que b' }) },
      { m: r`(-\infty,b)=\{x: x< b\}`, html: small({ from: 0, to: 8, ticks: [5], labels: { 5: 'b' }, segs: [{ a: -Infinity, b: 5, bc: false }], aria: 'x menor que b' }) },
    ]),
    sub('Ejemplos con números'),
    cards([
      { m: r`[2,+\infty)=\{x: x\ge2\}`, html: small({ from: 0, to: 8, ticks: [2], segs: [{ a: 2, b: Infinity, ac: true }], aria: '[2,+inf)' }) },
      { m: r`(2,+\infty)=\{x: x>2\}`, html: small({ from: 0, to: 8, ticks: [2], segs: [{ a: 2, b: Infinity, ac: false }], aria: '(2,+inf)' }) },
      { m: r`(-\infty,6]=\{x: x\le6\}`, html: small({ from: 0, to: 8, ticks: [6], segs: [{ a: -Infinity, b: 6, bc: true }], aria: '(-inf,6]' }) },
      { m: r`(-\infty,6)=\{x: x<6\}`, html: small({ from: 0, to: 8, ticks: [6], segs: [{ a: -Infinity, b: 6, bc: false }], aria: '(-inf,6)' }) },
    ]),
    p(r`Todos los reales son la semirrecta doble: $\mathbb{R}=(-\infty,+\infty)$.`, 'center muted'),
  ],
};

const ent = {
  id: 'int-ent', jump: 'Entornos', h: 'Entornos de un punto', kind: 'intro',
  body: [
    p(r`El **entorno** de un punto $a$ con **radio** $r>0$ es el intervalo **abierto** de centro $a$ que llega $r$ unidades a cada lado:`),
    formula(r`E(a,r)=(a-r,\ a+r)`, true),
    p(r`El **entorno reducido** es lo mismo pero **sin el propio punto $a$**:`),
    formula(r`E^{*}(a,r)=(a-r,\ a+r)-\{a\}`, true),
    key(r`$E(a,r)$ es lo mismo que $|x-a|<r$: los puntos que están a **menos de $r$** de $a$.`, 'Relación con el valor absoluto:'),
    grid([
      ex({ id: 'int-e1', example: true, tag: 'Ejemplo del colegio', task: r`Calcula $E(2,6)$ y $E^{*}(2,6)$.`,
        steps: [
          { t: r`Centro $a=2$, radio $r=6$. Calculo los extremos.`, m: r`a-r=2-6=-4\qquad a+r=2+6=8` },
          { t: r`El entorno es el intervalo **abierto** entre ellos.`, m: r`E(2,6)=(-4,\,8)`, fig: figure(numline({ from: -6, to: 10, ticks: [-4, 2, 8], segs: [{ a: -4, b: 8, ac: false, bc: false }], aria: 'E(2,6)' })) },
          { t: r`En el reducido **quito el centro**: queda un "agujero" en el 2.`, m: r`E^{*}(2,6)=(-4,\,8)-\{2\}=(-4,\,2)\cup(2,\,8)`, fig: figure(numline({ from: -6, to: 10, ticks: [-4, 2, 8], segs: [{ a: -4, b: 2, ac: false, bc: false }, { a: 2, b: 8, ac: false, bc: false }], aria: 'E*(2,6)' })) },
        ], resTxt: r`$E(2,6)=(-4,8)$ y $E^{*}(2,6)=(-4,8)-\{2\}$.` }),
      ex({ id: 'int-e2', example: true, tag: 'Al revés', task: r`Escribe el intervalo $(1,5)$ como un entorno.`,
        steps: [
          { t: r`El **centro** es el punto medio de los extremos.`, m: r`a=\dfrac{1+5}{2}=3` },
          { t: r`El **radio** es la distancia del centro a un extremo (o la mitad de la longitud).`, m: r`r=\dfrac{5-1}{2}=2` },
          { t: r`Compruebo: $3-2=1$ y $3+2=5$.`, m: r`(1,5)=E(3,\,2)` },
        ], resTxt: r`$(1,5)=E(3,2)$, que equivale a $|x-3|<2$.` }),
    ]),
  ],
};

const op = {
  id: 'int-op', jump: 'Unión e intersección', h: 'Unión e intersección de conjuntos', kind: 'intro',
  body: [
    p(r`Con los intervalos se pueden hacer dos operaciones, y se ven muy bien **dibujándolos uno encima de otro**:`),
    cards([
      { t: 'Intersección ∩', p: r`Lo que está en **todos** a la vez (la parte donde **se superponen**). Se lee "**y**".` },
      { t: 'Unión ∪', p: r`Lo que está en **al menos uno**. Se lee "**o**".` },
    ]),
    recipe('Receta: unión e intersección', [
      r`Dibuja **cada conjunto en su propia recta**, una debajo de otra, con las mismas marcas.`,
      r`**Intersección:** colorea solo donde estén **todos** coloreados a la vez.`,
      r`**Unión:** colorea donde **alguno** esté coloreado.`,
      r`Fíjate en los **extremos**: ¿entran (corchete) o no (paréntesis)? Un extremo entra en la intersección solo si entra en todos.`,
    ]),
    sub('Ejemplos rápidos'),
    grid([
      ex({ id: 'int-o1', example: true, tag: 'Ejemplo', task: r`Sean $A=[1,5]$ y $B=(3,8)$. Calcula $A\cap B$ y $A\cup B$.`,
        steps: [
          { t: r`Los dibujo uno encima de otro.`, fig: figure(numline({ from: 0, to: 9, h: 130, y: 100, segs: [{ a: 1, b: 5, ac: true, bc: true, dy: -44 }, { a: 3, b: 8, ac: false, bc: false, c: 2, dy: -22 }], texts: [{ x: 0.3, y: 62, t: 'A' }, { x: 0.3, y: 84, t: 'B', c: 2 }], aria: 'A y B' })) },
          { t: r`**Intersección:** donde se superponen. Empieza en 3 (el 3 **no** entra, porque $B$ es abierto ahí) y acaba en 5 (el 5 **sí** entra: está en $A$ por el corchete y en $B$ porque $3<5<8$).`, m: r`A\cap B=(3,\,5]` },
          { t: r`**Unión:** empieza en 1 (entra por $A$) y acaba en 8 (no entra, solo estaría en $B$).`, m: r`A\cup B=[1,\,8)` },
        ], resTxt: r`$A\cap B=(3,5]$ y $A\cup B=[1,8)$.` }),
      ex({ id: 'int-o2', example: true, tag: 'Ejemplo', task: r`Calcula $(-\infty,2)\cap[0,5]$.`,
        steps: [
          { t: r`Dibujo los dos. El primero llega hasta 2 (sin incluirlo); el segundo va de 0 a 5.`, fig: figure(numline({ from: -3, to: 7, h: 130, y: 100, segs: [{ a: -Infinity, b: 2, bc: false, dy: -44 }, { a: 0, b: 5, ac: true, bc: true, c: 2, dy: -22 }], texts: [{ x: -2.6, y: 62, t: '1.º' }, { x: -2.6, y: 84, t: '2.º', c: 2 }], aria: 'Dos conjuntos' })) },
          { t: r`Se superponen entre 0 y 2. El 0 entra (está en los dos) y el 2 no entra (el primero no lo incluye).`, m: r`[0,\,2)` },
        ], resTxt: r`$(-\infty,2)\cap[0,5]=[0,2)$.` }),
    ]),
    sub('Ejemplo con tres conjuntos (ejercicio del colegio)'),
    grid([
      ex({ id: 'int-o3', example: true, tag: 'Ejercicio 8 del colegio', task: r`Sean $A=(-2,+\infty)$, $B=(-2,0]$ y $C=[0,4)$. Calcula $A\cup B\cup C$, $A\cap B\cap C$ y $A\cap(B\cup C)$.`,
        steps: [
          { t: r`Dibujo los tres conjuntos, uno debajo de otro.`, fig: figure(numline({ from: -3, to: 6, h: 168, y: 140, segs: [{ a: -2, b: Infinity, ac: false, dy: -90 }, { a: -2, b: 0, ac: false, bc: true, c: 2, dy: -62 }, { a: 0, b: 4, ac: true, bc: false, dy: -34 }], texts: [{ x: -2.7, y: 56, t: 'A' }, { x: -2.7, y: 84, t: 'B', c: 2 }, { x: -2.7, y: 112, t: 'C' }], aria: 'A, B y C' })) },
          { t: r`**$A\cup B\cup C$:** $A$ ya contiene a $B$ y a $C$ (todo lo que está en $B$ o $C$ es mayor que $-2$). La unión es $A$.`, m: r`A\cup B\cup C=(-2,\,+\infty)` },
          { t: r`**$A\cap B\cap C$:** primero $B\cap C$: $B$ llega hasta 0 (incluido) y $C$ empieza en 0 (incluido). Solo comparten el 0.`, m: r`B\cap C=\{0\}` },
          { t: r`Y el 0 sí está en $A$ (porque $0>-2$).`, m: r`A\cap B\cap C=\{0\}` },
          { t: r`**$A\cap(B\cup C)$:** primero la unión. $B$ cubre de $-2$ a 0 (con el 0) y $C$ de 0 a 4 (sin el 4): juntos forman un intervalo continuo.`, m: r`B\cup C=(-2,\,0]\cup[0,\,4)=(-2,\,4)` },
          { t: r`Intersecto con $A=(-2,+\infty)$: $(-2,4)$ está dentro de $A$.`, m: r`A\cap(B\cup C)=(-2,\,4)` },
        ], res: r`A\cup B\cup C=(-2,+\infty),\quad A\cap B\cap C=\{0\},\quad A\cap(B\cup C)=(-2,4)`, note: r`En el PDF el tercero está escrito $A\cap B\cup C$. Si se lee como $(A\cap B)\cup C$ sale lo mismo: $(-2,0]\cup[0,4)=(-2,4)$.` }),
    ]),
  ],
};

const trad = {
  id: 'int-trad', jump: 'Traducir', h: 'Pasar de desigualdad a intervalo', kind: 'exercises',
  body: [
    p(r`Practica el paso entre las **tres formas** de escribir lo mismo: desigualdad, intervalo y dibujo.`, 'intro'),
    table(['Desigualdad', 'Intervalo', 'En palabras'], [
      [r`$x\ge3$`, r`$[3,+\infty)$`, 'desde el 3 (incluido) hacia la derecha'],
      [r`$x<-2$`, r`$(-\infty,-2)$`, 'a la izquierda del $-2$ (sin incluirlo)'],
      [r`$-1<x\le4$`, r`$(-1,4]$`, 'entre $-1$ (no entra) y 4 (entra)'],
      [r`$|x|\le3$`, r`$[-3,3]$`, 'a distancia 3 o menos del 0'],
      [r`$|x-1|<2$`, r`$(-1,3)$`, 'a distancia menor que 2 del 1 = $E(1,2)$'],
    ]),
    grid([
      ex({ id: 'int-t1', tag: 'Intervalo', task: r`Escribe $-3\le x<2$ como intervalo y represéntalo.`,
        steps: [
          { t: r`El $-3$ entra ($\le$): corchete. El $2$ no entra ($<$): paréntesis.`, m: r`[-3,\,2)`, fig: figure(numline({ from: -5, to: 4, segs: [{ a: -3, b: 2, ac: true, bc: false }], aria: '[-3,2)' })) },
        ], resTxt: r`$[-3,\,2)$` }),
      ex({ id: 'int-t2', tag: 'Intervalo', task: r`Escribe $|x-1|<2$ como intervalo.`,
        steps: [
          { t: r`$|A|<k\ \Rightarrow\ -k<A<k$.`, m: r`-2<x-1<2` },
          { t: r`Sumo 1 a las tres partes.`, m: r`-1<x<3` },
          { t: r`Intervalo abierto.`, m: r`x\in(-1,\,3)`, fig: figure(numline({ from: -3, to: 5, segs: [{ a: -1, b: 3, ac: false, bc: false }], aria: '(-1,3)' })) },
        ], resTxt: r`$(-1,3)$, que es el entorno $E(1,2)$.` }),
      ex({ id: 'int-t3', tag: 'Dos condiciones', task: r`¿Qué es $x<3$ **y** $x\ge-1$?`,
        steps: [
          { t: r`"Y" significa intersección: tienen que cumplirse las dos a la vez.`, m: r`(-\infty,\,3)\cap[-1,\,+\infty)=[-1,\,3)`, fig: figure(numline({ from: -3, to: 5, segs: [{ a: -1, b: 3, ac: true, bc: false }], aria: '[-1,3)' })) },
        ], resTxt: r`$[-1,\,3)$` }),
      ex({ id: 'int-t4', tag: 'Dos condiciones', task: r`¿Qué es $x<-1$ **o** $x>2$?`,
        steps: [
          { t: r`"O" significa unión: basta con cumplir una. Los dos conjuntos no se tocan.`, m: r`(-\infty,\,-1)\cup(2,\,+\infty)`, fig: figure(numline({ from: -4, to: 5, segs: [{ a: -Infinity, b: -1, bc: false }, { a: 2, b: Infinity, ac: false }], aria: 'Dos semirrectas' })) },
        ], resTxt: r`$(-\infty,-1)\cup(2,+\infty)$` }),
    ]),
  ],
};

const err = {
  id: 'int-err', jump: 'Errores típicos', h: 'Errores típicos', kind: 'errors',
  body: [
    errs([
      { t: r`**Poner corchete en el infinito.**`, m: r`[2,+\infty]\ \text{✗}`, ok: r`$\infty$ no es un número: siempre paréntesis. Es $[2,+\infty)$.` },
      { t: r`**Escribir los extremos al revés.**`, m: r`[6,2]\ \text{✗}`, ok: r`Siempre primero el **menor**: $[2,6]$.` },
      { t: r`**Confundir $\cup$ con $\cap$.**`, ok: r`"$x<-1$ **o** $x>2$" es **unión**. "$x<3$ **y** $x\ge-1$" es **intersección**.` },
      { t: r`**Escribir una intersección vacía como un intervalo.**`, m: r`x<-1\ \text{y}\ x>2`, ok: r`Ningún número cumple las dos a la vez: la solución es el **conjunto vacío** $\emptyset$.` },
      { t: r`**El $<$ con corchete.**`, m: r`x<5\ \Rightarrow\ (-\infty,5]\ \text{✗}`, ok: r`$<$ no incluye el 5: $(-\infty,5)$.` },
    ]),
  ],
};

export default {
  id: 'intervalos', num: 5, cls: 'p5', tab: 'Intervalos', title: '5. Intervalos, semirrectas y entornos',
  lead: 'Cómo escribir y dibujar conjuntos de números, y operar con ellos.',
  color: ['#3b4fc4', '#e9ecfc', '#c6cdf3'],
  sections: [inter, sem, ent, op, trad, err],
};
