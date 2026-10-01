import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, figure } from '../lib.mjs';
import { numline } from '../svg.mjs';
const r = String.raw;

const def = {
  id: 'abs-def', jump: 'Qué es', h: 'Valor absoluto', kind: 'intro',
  body: [
    p(r`El **valor absoluto** de un número es **su distancia al cero** en la recta real. Se escribe $|a|$. Como una distancia nunca es negativa, el resultado **siempre es positivo o cero**.`),
    formula(r`|a|=\begin{cases}\ \ a & \text{si } a\ge0\\[2pt] -a & \text{si } a<0\end{cases}`, true),
    cards([
      { t: 'Si $a$ ya es positivo o cero', p: r`No cambia: $|5|=5$, $|0|=0$.` },
      { t: 'Si $a$ es negativo', p: r`Le cambias el signo: $|-5|=-(-5)=5$.` },
    ]),
    figure(numline({ from: -5, to: 5, segs: [{ a: -3, b: 0, ac: true, bc: true, c: 2, dy: -14 }, { a: 0, b: 3, ac: true, bc: true }], aria: '3 y -3 están a la misma distancia del 0' }), 'Tanto el $3$ como el $−3$ están a **3 unidades** del 0: $|3|=|-3|=3$.'),
    key(r`El valor absoluto de un número coincide con el de su opuesto: $|a|=|-a|$.`, 'Recuerda:'),
    sub('Distancia entre dos puntos'),
    p(r`La distancia entre $a$ y $b$ en la recta real es el valor absoluto de su diferencia (da igual el orden):`),
    formula(r`d(a,b)=|b-a|`, true),
    grid([
      ex({ id: 'abs-d1', example: true, tag: 'Ejemplo', task: r`Calcula la distancia entre $-2$ y $5$.`, chk: ['Abs(5-(-2))', '7'],
        steps: [
          { t: r`Aplico la fórmula $d(a,b)=|b-a|$ con $a=-2$ y $b=5$.`, m: r`d(-2,5)=|5-(-2)|` },
          { t: r`Cuidado con el doble signo: restar un negativo es sumar.`, m: r`|5+2|=|7|=7` },
        ], resTxt: r`La distancia es $7$ unidades.`,
        qfig: figure(numline({ from: -3, to: 6, segs: [{ a: -2, b: 5, ac: true, bc: true }], aria: 'Distancia entre -2 y 5' })) }),
    ]),
  ],
};

const prop = {
  id: 'abs-prop', jump: 'Propiedades', h: 'Propiedades del valor absoluto', kind: 'props',
  body: [
    props([
      { h: 'Siempre positivo', m: r`|a|\ge0,\quad\forall a\in\mathbb{R}`, why: 'Es una distancia: no puede ser negativa.', ej: r`$|-7|=7\ge0$` },
      { h: 'Del producto', m: r`|a\cdot b|=|a|\cdot|b|`, why: 'El valor absoluto de un producto es el producto de los valores absolutos.', ej: r`$|3|\cdot|-2|=3\cdot2=6$` },
      { h: 'Desigualdad triangular', m: r`|a+b|\le|a|+|b|`, why: 'La suma "se pierde" cuando los signos son distintos.', ej: r`$|3+(-5)|=2\le3+5=8$` },
    ]),
    sub('Ejemplos del colegio'),
    grid([
      ex({ id: 'abs-c1', example: true, tag: 'Ejemplo', q: r`|3|\,|-2|`, chk: ['Abs(3)*Abs(-2)', '6'],
        steps: [{ t: r`Calculo cada valor absoluto: $|3|=3$ y $|-2|=2$.`, m: r`3\cdot2` }], res: r`6` }),
      ex({ id: 'abs-c2', example: true, tag: 'Ejemplo', q: r`|2+(-3)|`, chk: ['Abs(2+(-3))', '1'],
        steps: [
          { t: r`**Primero** opero lo de dentro.`, why: r`El valor absoluto actúa como un paréntesis: se resuelve dentro y luego se aplica.`, m: r`2+(-3)=-1` },
          { t: r`Ahora el valor absoluto.`, m: r`|-1|=1` },
        ], res: r`1` }),
      ex({ id: 'abs-c3', example: true, tag: 'Ejemplo', q: r`\big|\,|-2|-|3|\,\big|`, chk: ['Abs(Abs(-2)-Abs(3))', '1'],
        steps: [
          { t: r`Empiezo por los valores absolutos de dentro.`, m: r`|-2|=2\qquad|3|=3` },
          { t: r`Resto dentro del valor absoluto grande.`, m: r`|\,2-3\,|=|-1|` },
          { t: r`Último valor absoluto.`, m: r`|-1|=1` },
        ], res: r`1` }),
      ex({ id: 'abs-c4', example: true, tag: 'Ejemplo', q: r`-\big|\,|-2|-|3|\,\big|`, chk: ['-Abs(Abs(-2)-Abs(3))', '-1'],
        steps: [
          { t: r`Igual que el anterior: lo de dentro del paréntesis vale $1$.`, m: r`\big|\,|-2|-|3|\,\big|=1` },
          { t: r`El signo **menos de fuera** no está dentro del valor absoluto: se queda.`, why: r`El valor absoluto solo convierte en positivo lo que tiene dentro.`, m: r`-\,1=-1` },
        ], res: r`-1` }),
    ]),
  ],
};

const quitar = {
  id: 'abs-quitar', jump: 'Desarrollar', h: 'Desarrollar expresiones con valor absoluto', kind: 'intro',
  body: [
    p(r`Desarrollar una expresión con valor absoluto es **escribirla sin barras**, usando casos: depende de si lo de dentro es positivo o negativo.`),
    recipe('Receta: quitar valores absolutos', [
      r`Iguala a **cero** lo que hay dentro de cada valor absoluto: son los **puntos críticos** (donde cambia el signo).`,
      r`Marca los puntos en la recta: quedan **tramos**.`,
      r`En cada tramo, decide el signo de lo de dentro: si es $\ge0$, queda **igual**; si es $<0$, se **cambia de signo** (lo pones entre paréntesis con un menos).`,
      r`Simplifica cada tramo.`,
    ]),
    grid([
      ex({
        id: 'abs-q1', example: true, tag: 'Ejemplo del colegio · 1 valor absoluto', q: r`x-|x+2|`, chk: ['x-Abs(x+2)', 'Piecewise((-2, x>=-2), (2*x+2, True))', 'any'],
        steps: [
          { t: r`Punto crítico: igualo lo de dentro a cero.`, m: r`x+2=0\ \Rightarrow\ x=-2`, fig: figure(numline({ from: -5, to: 3, pts: [{ x: -2, label: '−2', c: 2 }], aria: 'Punto crítico -2' })) },
          { t: r`**Tramo $x\ge-2$:** aquí $x+2\ge0$, así que $|x+2|=x+2$ (queda igual).`, m: r`x-(x+2)=x-x-2=-2` },
          { t: r`**Tramo $x<-2$:** aquí $x+2<0$, así que $|x+2|=-(x+2)$ (cambia de signo).`, m: r`x-\big(-(x+2)\big)=x+x+2=2x+2` },
          { t: r`Junto los dos casos.`, m: r`x-|x+2|=\begin{cases}-2 & \text{si } x\ge-2\\ 2x+2 & \text{si } x<-2\end{cases}` },
        ],
        resTxt: r`Vale $-2$ si $x\ge-2$ y vale $2x+2$ si $x<-2$.`,
      }),
      ex({
        id: 'abs-q2', example: true, tag: 'Ejemplo del colegio · 2 valores absolutos', q: r`|x+1|+|x-2|`, chk: ['Abs(x+1)+Abs(x-2)', 'Piecewise((-2*x+1, x<-1),(3, x<2),(2*x-1, True))', 'any'],
        steps: [
          { t: r`Puntos críticos: lo de dentro de cada valor absoluto igual a cero.`, m: [r`x+1=0\ \Rightarrow\ x=-1`, r`x-2=0\ \Rightarrow\ x=2`],
            fig: figure(numline({ from: -4, to: 5, pts: [{ x: -1, label: '−1', c: 2 }, { x: 2, label: '2', c: 2 }], aria: 'Puntos críticos -1 y 2' }), 'Los dos puntos dividen la recta en **tres tramos**.') },
          { t: r`**Tramo $x<-1$:** $x+1<0$ y $x-2<0$. Cambio el signo de los dos.`, m: r`-(x+1)-(x-2)=-x-1-x+2=-2x+1` },
          { t: r`**Tramo $-1\le x<2$:** $x+1\ge0$ (igual) y $x-2<0$ (cambia).`, m: r`(x+1)-(x-2)=x+1-x+2=3` },
          { t: r`**Tramo $x\ge2$:** los dos son $\ge0$: quedan igual.`, m: r`(x+1)+(x-2)=2x-1` },
          { t: r`Junto los tres casos.`, m: r`|x+1|+|x-2|=\begin{cases}-2x+1 & \text{si } x<-1\\ 3 & \text{si } -1\le x<2\\ 2x-1 & \text{si } x\ge2\end{cases}` },
        ],
        resTxt: r`Entre $-1$ y $2$ la suma vale siempre $3$ (¡es la distancia entre $-1$ y $2$!).`,
      }),
    ]),
    sub('Practica'),
    grid([
      ex({ id: 'abs-qp1', tag: 'Desarrolla', q: r`|x-3|+x`, chk: ['Abs(x-3)+x', 'Piecewise((2*x-3, x>=3),(3, True))', 'any'],
        steps: [
          { t: r`Punto crítico: $x-3=0\Rightarrow x=3$.`, m: r`x=3` },
          { t: r`**$x\ge3$:** $x-3\ge0$, queda igual.`, m: r`(x-3)+x=2x-3` },
          { t: r`**$x<3$:** $x-3<0$, cambia de signo.`, m: r`-(x-3)+x=-x+3+x=3` },
        ], resTxt: r`$\begin{cases}2x-3 & x\ge3\\ 3 & x<3\end{cases}$` }),
      ex({ id: 'abs-qp2', tag: 'Desarrolla', q: r`|2x+4|-x`, chk: ['Abs(2*x+4)-x', 'Piecewise((x+4, x>=-2),(-3*x-4, True))', 'any'],
        steps: [
          { t: r`Punto crítico: $2x+4=0\Rightarrow x=-2$.`, m: r`x=-2` },
          { t: r`**$x\ge-2$:** $2x+4\ge0$.`, m: r`(2x+4)-x=x+4` },
          { t: r`**$x<-2$:** $2x+4<0$, cambia de signo.`, m: r`-(2x+4)-x=-2x-4-x=-3x-4` },
        ], resTxt: r`$\begin{cases}x+4 & x\ge-2\\ -3x-4 & x<-2\end{cases}$` }),
      ex({ id: 'abs-qp3', tag: 'Desarrolla', q: r`|x|-|x-1|`, chk: ['Abs(x)-Abs(x-1)', 'Piecewise((-1, x<0),(2*x-1, x<1),(1, True))', 'any'],
        steps: [
          { t: r`Puntos críticos: $x=0$ y $x=1$. Tres tramos.`, m: r`x=0,\quad x=1` },
          { t: r`**$x<0$:** $x<0$ y $x-1<0$: cambian los dos.`, m: r`-x-\big(-(x-1)\big)=-x+x-1=-1` },
          { t: r`**$0\le x<1$:** $x\ge0$ (igual) y $x-1<0$ (cambia).`, m: r`x-\big(-(x-1)\big)=x+x-1=2x-1` },
          { t: r`**$x\ge1$:** los dos quedan igual.`, m: r`x-(x-1)=1` },
        ], resTxt: r`$\begin{cases}-1 & x<0\\ 2x-1 & 0\le x<1\\ 1 & x\ge1\end{cases}$` }),
    ]),
  ],
};

const ec = {
  id: 'abs-ec', jump: 'Ecuaciones', h: 'Ecuaciones e inecuaciones con valor absoluto', kind: 'intro',
  body: [
    p(r`Como $|x|$ es la **distancia de $x$ al 0**, las ecuaciones se leen como preguntas de distancia:`),
    table(['Ecuación', 'Se lee', 'Solución', 'Dibujo'], [
      [r`$|x|=k$`, 'distancia exactamente $k$', r`$x=k$ **o** $x=-k$`, 'dos puntos'],
      [r`$|x|<k$`, 'distancia **menor** que $k$', r`$-k<x<k$ (**entre**)`, 'un intervalo'],
      [r`$|x|>k$`, 'distancia **mayor** que $k$', r`$x<-k$ **o** $x>k$ (**fuera**)`, 'dos semirrectas'],
    ]),
    figure(numline({ from: -4, to: 4, segs: [{ a: -2, b: 2, ac: false, bc: false }], aria: '|x| < 2' }), r`$|x|<2$: todos los números **entre** $-2$ y $2$: $x\in(-2,\,2)$.`),
    figure(numline({ from: -4, to: 4, segs: [{ a: -Infinity, b: -2, bc: true }, { a: 2, b: Infinity, ac: true }], aria: '|x| >= 2' }), r`$|x|\ge2$: los números **fuera**, a 2 o más del 0: $x\in(-\infty,-2]\cup[2,+\infty)$.`),
    recipe('Receta: $|A|$ con $k>0$', [
      r`**$|A|=k$** → dos ecuaciones: $A=k$ **o** $A=-k$.`,
      r`**$|A|<k$** (o $\le$) → $-k<A<k$. Resuelve y obtendrás un **intervalo**.`,
      r`**$|A|>k$** (o $\ge$) → $A>k$ **o** $A<-k$. Obtendrás **dos semirrectas**.`,
    ]),
    grid([
      ex({ id: 'abs-e1', example: true, tag: 'Ejemplo del colegio', task: r`Resuelve $|x|=1$.`,
        steps: [{ t: r`Los números a distancia 1 del cero son dos: $1$ y $-1$.`, m: r`x=1\quad\text{o}\quad x=-1` }],
        resTxt: r`$x=-1$ o $x=1$.`, qfig: figure(numline({ from: -3, to: 3, pts: [{ x: -1, label: '−1' }, { x: 1, label: '1' }], aria: '|x| = 1' })) }),
      ex({ id: 'abs-e2', example: true, tag: 'Ejemplo del colegio', task: r`Resuelve $|x|<2$.`,
        steps: [
          { t: r`Distancia menor que 2: $x$ está **entre** $-2$ y $2$.`, m: r`-2<x<2` },
          { t: r`En notación de intervalo (extremos **abiertos**: no entran).`, m: r`x\in(-2,\,2)`, fig: figure(numline({ from: -4, to: 4, segs: [{ a: -2, b: 2, ac: false, bc: false }], aria: 'Intervalo abierto de -2 a 2' })) },
        ], resTxt: r`$x\in(-2,\,2)$.` }),
      ex({ id: 'abs-e3', example: true, tag: 'Ejemplo del colegio', task: r`Resuelve $|x|\ge2$.`,
        steps: [
          { t: r`Distancia **mayor o igual** que 2: $x\ge2$ **o** $x\le-2$.`, m: r`x\ge2\quad\text{o}\quad -x\ge2\Rightarrow x\le-2` },
          { t: r`Extremos **cerrados** (entran) y unión de dos semirrectas.`, m: r`x\in(-\infty,\,-2]\cup[2,\,+\infty)`, fig: figure(numline({ from: -4, to: 4, segs: [{ a: -Infinity, b: -2, bc: true }, { a: 2, b: Infinity, ac: true }], aria: '|x| >= 2' })) },
        ], resTxt: r`$x\in(-\infty,-2]\cup[2,+\infty)$.` }),
      ex({ id: 'abs-e4', example: true, tag: 'Con un desplazamiento', task: r`Resuelve $|x-3|=2$.`,
        steps: [
          { t: r`Lo de dentro puede valer $2$ o $-2$.`, m: r`x-3=2\quad\text{o}\quad x-3=-2` },
          { t: r`Despejo $x$ en cada caso (sumo 3).`, m: r`x=5\quad\text{o}\quad x=1` },
        ], resTxt: r`$x=1$ o $x=5$ (están a distancia 2 del 3).`, qfig: figure(numline({ from: -1, to: 7, pts: [{ x: 3, label: '3', c: 2 }, { x: 1, label: '1' }, { x: 5, label: '5' }], aria: '|x-3| = 2' })) }),
      ex({ id: 'abs-e5', example: true, tag: 'Con un desplazamiento', task: r`Resuelve $|2x-1|\ge3$.`,
        steps: [
          { t: r`"Mayor o igual": dos casos.`, m: r`2x-1\ge3\quad\text{o}\quad 2x-1\le-3` },
          { t: r`Resuelvo el primero: sumo 1 y divido entre 2.`, m: r`2x\ge4\ \Rightarrow\ x\ge2` },
          { t: r`Resuelvo el segundo.`, m: r`2x\le-2\ \Rightarrow\ x\le-1` },
          { t: r`Junto las dos soluciones.`, m: r`x\in(-\infty,\,-1]\cup[2,\,+\infty)`, fig: figure(numline({ from: -3, to: 4, segs: [{ a: -Infinity, b: -1, bc: true }, { a: 2, b: Infinity, ac: true }], aria: 'Solución' })) },
        ], resTxt: r`$x\in(-\infty,-1]\cup[2,+\infty)$.` }),
    ]),
    tip(r`Si $k<0$: $|A|<k$ **no tiene solución** (una distancia no puede ser negativa) y $|A|>k$ se cumple **siempre**.`),
  ],
};

const err = {
  id: 'abs-err', jump: 'Errores típicos', h: 'Errores típicos', kind: 'errors',
  body: [
    errs([
      { t: r`**Quitar las barras sin más.**`, m: r`|-5|\neq-5`, ok: r`$|-5|=5$. Si lo de dentro es negativo, el resultado cambia de signo.` },
      { t: r`**El valor absoluto de una suma NO es la suma.**`, m: r`|3+(-5)|\neq|3|+|-5|`, ok: r`$|3+(-5)|=|-2|=2$, pero $3+5=8$. Solo se cumple $\le$.` },
      { t: r`**El signo menos de fuera no entra.**`, m: r`-|-3|\neq3`, ok: r`$-|-3|=-3$: primero el valor absoluto ($3$) y luego el menos.` },
      { t: r`**En $|x|<2$ se olvida la mitad.**`, m: r`|x|<2\ \Rightarrow\ x<2`, ok: r`Son **dos** condiciones: $x<2$ **y** $x>-2$, es decir, $-2<x<2$.` },
      { t: r`**$|x|=-3$ no tiene solución.**`, ok: r`Una distancia nunca es negativa: no existe ningún $x$.` },
    ]),
  ],
};

export default {
  id: 'valor-absoluto', num: 4, cls: 'p4', tab: 'Valor absoluto', title: '4. Valor absoluto',
  lead: 'Distancia al cero, propiedades, desarrollar con casos y resolver ecuaciones.',
  color: ['#b8304d', '#fce9ed', '#f2bfca'],
  sections: [def, prop, quitar, ec, err],
};
