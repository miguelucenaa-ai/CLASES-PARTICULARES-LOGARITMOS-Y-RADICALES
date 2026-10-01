import { p, key, tip, formula, sub, recipe, table, cards, errs, ex, grid, figure } from '../lib.mjs';
import { numline, pitagoras, tales, encajados } from '../svg.mjs';
const r = String.raw;

const idea = {
  id: 'rec-idea', jump: 'La recta real', h: 'La recta real', kind: 'intro',
  body: [
    p(r`Los números reales se pueden dibujar como **puntos de una recta**. Para fijar la recta solo hacen falta dos puntos:`),
    cards([
      { t: 'Punto origen', p: r`Es el punto donde está el **0**.` },
      { t: 'Punto unidad', p: r`Es el punto donde está el **1**. La distancia de 0 a 1 es la unidad de medida.` },
    ]),
    figure(numline({ from: -4, to: 6, pts: [{ x: 0, label: 'origen', c: 1 }, { x: 1, label: 'unidad', c: 2 }], aria: 'Recta real con el origen en 0 y la unidad en 1' }), 'El origen (0) y el punto unidad (1) fijan toda la recta.'),
    key(r`A **cada punto** de la recta le corresponde **un único número real**, y a cada número real, **un único punto**. Por eso a ℝ se le llama "la recta real": no hay huecos.`, 'Lo importante:'),
  ],
};

const ent = {
  id: 'rec-ent', jump: 'Enteros', h: 'Representación de los números enteros', kind: 'intro',
  body: [
    p(r`Se lleva la distancia entre 0 y 1 **tantas veces como haga falta**: hacia la **derecha** si el número es positivo y hacia la **izquierda** si es negativo.`),
    figure(numline({ from: -4, to: 6, segs: [{ a: 0, b: 3, ac: true, bc: true }, { a: -3, b: 0, ac: true, bc: true, c: 2, dy: -14 }], aria: 'El 3 a la derecha y el -3 a la izquierda' }), 'Para el 3: tres unidades a la derecha. Para el −3: tres unidades a la izquierda.'),
  ],
};

const rac = {
  id: 'rec-rac', jump: 'Racionales (Tales)', h: 'Representación de los números racionales', kind: 'intro',
  body: [
    p(r`Las fracciones se representan **dividiendo un segmento en partes iguales**. Para dividir exactamente, se usa el **teorema de Tales**: unas rectas paralelas cortan a dos rectas en segmentos proporcionales.`),
    recipe('Receta: representar $\\dfrac{k}{n}$ con Tales', [
      r`Dibuja el segmento de **0 a 1** y, desde 0, una semirrecta cualquiera.`,
      r`Con el compás, marca en la semirrecta **$n$ trozos iguales**.`,
      r`Une la última marca (la $n$) con el punto **1**.`,
      r`Por la marca **$k$** traza una **paralela** a esa recta: donde corte al segmento está $\frac{k}{n}$.`,
    ]),
    grid([
      ex({
        id: 'rec-t1', example: true, tag: 'Ejemplo: representar 3/5', task: r`Representa $\dfrac{3}{5}$ en la recta real.`,
        steps: [
          { t: r`Dibujo el segmento de 0 a 1 y una semirrecta cualquiera desde el 0.`, fig: figure(tales(5, 3, 1)) },
          { t: r`En la semirrecta marco **5 trozos iguales** (el denominador).`, why: r`Da igual la longitud de cada trozo, mientras sean todos iguales.`, fig: figure(tales(5, 3, 2)) },
          { t: r`Uno la marca 5 con el punto 1.`, fig: figure(tales(5, 3, 3)) },
          { t: r`Por la marca 3 (el numerador) trazo una paralela. Donde corta a la recta real está $\frac35$.`, why: r`Por Tales, las paralelas reparten el segmento de 0 a 1 en 5 partes iguales; la tercera marca es $\frac35$.`, fig: figure(tales(5, 3, 4)) },
        ],
        resTxt: r`$\dfrac35=0{,}6$ está a $\frac35$ del camino entre 0 y 1.`,
      }),
    ]),
    sub('Fracciones mayores que 1 y negativas'),
    p(r`Si la fracción es impropia, **primero saca los enteros**: $\frac{12}{5}=2+\frac25$. Ya sabes que está entre el 2 y el 3, y solo queda dividir **ese** tramo en 5 partes y contar 2.`),
    grid([
      ex({
        id: 'rec-t2', example: true, tag: 'Ejemplo', task: r`Representa $\dfrac{12}{5}$.`, chk: ['Rational(12,5)', 'Rational(12,5)'],
        steps: [
          { t: r`Divido: $12\div5=2$ y sobran $2$. Así que $\dfrac{12}{5}=2+\dfrac25=2{,}4$.`, m: r`\dfrac{12}{5}=2+\dfrac{2}{5}` },
          { t: r`Está entre el $2$ y el $3$. Divido ese tramo en $5$ partes iguales (cada una mide $\frac15=0{,}2$) y cuento $2$ desde el $2$.`,
            fig: figure(numline({ from: 0, to: 4, ticks: [0, 1, 2, 3, 4].concat([2.2, 2.4, 2.6, 2.8]), labels: { 2.4: '', 2.2: '', 2.6: '', 2.8: '' }, pts: [{ x: 2.4, label: '12/5', c: 2 }], segs: [{ a: 2, b: 2.4, ac: true, bc: true }], aria: '12/5 entre el 2 y el 3' })) },
        ], resTxt: r`$\dfrac{12}{5}=2{,}4$, a dos quintos de camino entre 2 y 3.` }),
      ex({
        id: 'rec-t3', example: true, tag: 'Ejemplo', task: r`Representa $-\dfrac{3}{4}$.`,
        steps: [
          { t: r`Es negativo: está a la **izquierda** del 0. Como $\frac34<1$, está entre $-1$ y $0$.`, m: r`-\dfrac34=-0{,}75` },
          { t: r`Divido el tramo de $-1$ a $0$ en $4$ partes (cada una vale $\frac14$) y cuento $3$ **desde el 0 hacia la izquierda**.`,
            fig: figure(numline({ from: -2, to: 2, ticks: [-2, -1, 0, 1, 2, -0.75, -0.5, -0.25], labels: { '-0.75': '', '-0.5': '', '-0.25': '' }, pts: [{ x: -0.75, label: '−3/4', c: 2 }], segs: [{ a: -0.75, b: 0, ac: true, bc: true }], aria: 'Menos tres cuartos entre -1 y 0' })) },
        ], resTxt: r`$-\dfrac34$ está entre $-1$ y $0$, más cerca del $-1$.` }),
    ]),
  ],
};

const irr = {
  id: 'rec-irr', jump: 'Irracionales (Pitágoras)', h: 'Representación de los números irracionales', kind: 'intro',
  body: [
    p(r`Solo **algunos** irracionales se pueden dibujar exactamente con regla y compás: las **raíces cuadradas** de números naturales, usando el **teorema de Pitágoras**.`),
    formula(r`\text{hipotenusa}^{2}=\text{cateto}_1^{2}+\text{cateto}_2^{2}`, true),
    recipe('Receta: representar $\\sqrt{n}$', [
      r`Escribe $n$ como **suma de dos cuadrados**: $n=a^2+b^2$ (por ejemplo $5=2^2+1^2$).`,
      r`Dibuja un triángulo rectángulo con **catetos $a$ y $b$**, con un cateto apoyado sobre la recta real desde el 0.`,
      r`La **hipotenusa** mide $\sqrt{n}$. Con el compás (centro en 0) **baja** esa longitud sobre la recta.`,
    ]),
    grid([
      ex({
        id: 'rec-i1', example: true, tag: 'Ejemplo del colegio · √5', task: r`Representa $\sqrt{5}$ en la recta real.`,
        steps: [
          { t: r`Escribo 5 como suma de dos cuadrados.`, m: r`5=4+1=2^{2}+1^{2}`, why: r`Así los catetos miden $2$ y $1$.` },
          { t: r`Desde el 0 llevo 2 unidades sobre la recta y levanto una perpendicular de 1 unidad.`, fig: figure(pitagoras({ a: 2, b: 1, stage: 1 })) },
          { t: r`Uno el 0 con el extremo de la perpendicular: es la hipotenusa.`, why: r`Por Pitágoras mide $\sqrt{2^2+1^2}=\sqrt5$.`, fig: figure(pitagoras({ a: 2, b: 1, stage: 2 })) },
          { t: r`Con el compás en el 0 y abertura igual a la hipotenusa, la llevo sobre la recta.`, fig: figure(pitagoras({ a: 2, b: 1, stage: 3 })) },
          { t: r`El punto donde corta a la recta es $\sqrt5\approx2{,}236$.`, fig: figure(pitagoras({ a: 2, b: 1, stage: 4 })) },
        ],
        resTxt: r`$\sqrt{5}\approx2{,}236$ está entre el 2 y el 3.`,
      }),
      ex({
        id: 'rec-i2', example: true, tag: 'Ejemplo · √2', task: r`Representa $\sqrt{2}$.`,
        steps: [
          { t: r`$2=1+1=1^2+1^2$: catetos $1$ y $1$.`, m: r`2=1^{2}+1^{2}` },
          { t: r`Cateto de 1 sobre la recta y perpendicular de 1.`, fig: figure(pitagoras({ a: 1, b: 1, stage: 1 })) },
          { t: r`La hipotenusa mide $\sqrt{2}$: es la diagonal de un cuadrado de lado 1.`, fig: figure(pitagoras({ a: 1, b: 1, stage: 2 })) },
          { t: r`La bajo con el compás.`, fig: figure(pitagoras({ a: 1, b: 1, stage: 4 })) },
        ],
        resTxt: r`$\sqrt{2}\approx1{,}414$.`,
      }),
      ex({
        id: 'rec-i3', example: true, tag: 'Ejemplo · √8', task: r`Representa $\sqrt{8}$.`,
        steps: [
          { t: r`$8=4+4=2^2+2^2$: catetos $2$ y $2$.`, m: r`8=2^{2}+2^{2}` },
          { t: r`Cateto de 2 sobre la recta y perpendicular de 2; la hipotenusa mide $\sqrt{8}$.`, fig: figure(pitagoras({ a: 2, b: 2, stage: 2 })) },
          { t: r`La bajo a la recta con el compás.`, fig: figure(pitagoras({ a: 2, b: 2, stage: 4 })) },
        ],
        resTxt: r`$\sqrt{8}=2\sqrt2\approx2{,}828$.`,
      }),
      ex({
        id: 'rec-i4', example: true, tag: 'Ejemplo · √6', task: r`Representa $\sqrt{6}$. (¡6 no es suma de dos cuadrados enteros!)`,
        steps: [
          { t: r`$6=5+1$, y ya sabemos dibujar $\sqrt5$. Uso catetos $\sqrt5$ y $1$.`, why: r`Un cateto puede ser una raíz que ya hayas construido.`, m: r`6=\left(\sqrt5\right)^{2}+1^{2}` },
          { t: r`Sobre la recta llevo $\sqrt5\approx2{,}236$ (cateto) y levanto una perpendicular de 1.`, fig: figure(pitagoras({ a: Math.sqrt(5), b: 1, la: '√5', lb: '1', lh: '√6', stage: 1 })) },
          { t: r`La hipotenusa mide $\sqrt{6}$; la bajo a la recta con el compás.`, fig: figure(pitagoras({ a: Math.sqrt(5), b: 1, la: '√5', lb: '1', lh: '√6', stage: 4 })) },
        ],
        resTxt: r`$\sqrt{6}\approx2{,}449$.`,
      }),
    ]),
    tip(r`El PDF también habla del **teorema de la altura** (en un triángulo rectángulo, $h^2=m\cdot n$). Con él se construye $\sqrt{n}$ como la altura sobre la hipotenusa cuando esta se divide en $m=n$ y $1$. Con Pitágoras ya tienes lo que hace falta.`),
  ],
};

const enc = {
  id: 'rec-enc', jump: 'Otros irracionales', h: 'Irracionales que no se pueden dibujar exactos', kind: 'intro',
  body: [
    p(r`Otros irracionales, como $\sqrt[3]{2}=1{,}2599210499\ldots$, **no se pueden construir** con regla y compás. Pero sí se puede **acercarse tanto como quieras** con una sucesión de **intervalos encajados**: cada intervalo está dentro del anterior y es 10 veces más pequeño.`),
    figure(encajados(), 'Cada fila es una ampliación del intervalo anterior. El punto rojo siempre está dentro.'),
    table(['Intervalo', 'Longitud'], [
      [r`$[1,\ 2]$`, '1'], [r`$[1{,}2;\ 1{,}3]$`, '0,1'], [r`$[1{,}25;\ 1{,}26]$`, '0,01'], [r`$[1{,}259;\ 1{,}260]$`, '0,001'],
    ]),
    key(r`Toda sucesión de intervalos encajados determina **un único número real**.`, 'Idea clave:'),
  ],
};

const prac = {
  id: 'rec-prac', jump: 'Practica', h: 'Practica: ubica en la recta', kind: 'exercises',
  body: [
    p(r`Intenta dibujar cada número antes de abrir los pasos.`, 'intro'),
    grid([
      ex({ id: 'rec-q1', tag: 'Fracción', task: r`Representa $\dfrac74$.`, chk: ['Rational(7,4)', 'Rational(7,4)'],
        steps: [
          { t: r`$7\div4=1$ y sobran $3$: $\dfrac74=1+\dfrac34=1{,}75$. Está entre el $1$ y el $2$.`, m: r`\dfrac74=1+\dfrac34` },
          { t: r`Divido el tramo de 1 a 2 en 4 partes (cada una $\frac14$) y cuento 3 desde el 1.`, fig: figure(numline({ from: 0, to: 3, ticks: [0, 1, 2, 3, 1.25, 1.5, 1.75], labels: { 1.25: '', 1.5: '', 1.75: '' }, pts: [{ x: 1.75, label: '7/4', c: 2 }], segs: [{ a: 1, b: 1.75, ac: true, bc: true }], aria: '7/4' })) },
        ], resTxt: r`$\frac74=1{,}75$.` }),
      ex({ id: 'rec-q2', tag: 'Fracción negativa', task: r`Representa $-\dfrac53$.`,
        steps: [
          { t: r`$5\div3=1$ y sobran $2$: $-\dfrac53=-1-\dfrac23\approx-1{,}67$. Está entre $-2$ y $-1$.`, m: r`-\dfrac53=-\left(1+\dfrac23\right)` },
          { t: r`Divido el tramo de $-1$ a $-2$ en 3 partes (cada una $\frac13$) y cuento 2 desde el $-1$ hacia la izquierda.`, fig: figure(numline({ from: -3, to: 1, ticks: [-3, -2, -1, 0, 1, -4 / 3, -5 / 3], labels: { [-4 / 3]: '', [-5 / 3]: '' }, pts: [{ x: -5 / 3, label: '−5/3', c: 2 }], segs: [{ a: -5 / 3, b: -1, ac: true, bc: true }], aria: '-5/3' })) },
        ], resTxt: r`$-\frac53\approx-1{,}67$.` }),
      ex({ id: 'rec-q3', tag: 'Raíz', task: r`Representa $\sqrt{10}$.`,
        steps: [
          { t: r`$10=9+1=3^2+1^2$: catetos $3$ y $1$.`, m: r`10=3^2+1^2` },
          { t: r`Cateto de 3 sobre la recta, perpendicular de 1 y hipotenusa $\sqrt{10}$. La bajo con el compás.`, fig: figure(pitagoras({ a: 3, b: 1, stage: 4 })) },
        ], resTxt: r`$\sqrt{10}\approx3{,}162$.` }),
      ex({ id: 'rec-q4', tag: 'Raíz', task: r`Representa $\sqrt{13}$.`,
        steps: [
          { t: r`$13=9+4=3^2+2^2$: catetos $3$ y $2$.`, m: r`13=3^2+2^2` },
          { t: r`Cateto de 3 sobre la recta, perpendicular de 2 y hipotenusa $\sqrt{13}$. La bajo con el compás.`, fig: figure(pitagoras({ a: 3, b: 2, stage: 4 })) },
        ], resTxt: r`$\sqrt{13}\approx3{,}606$.` }),
      ex({ id: 'rec-q5', tag: '¿Entre qué enteros?', task: r`¿Entre qué dos enteros está $\sqrt{20}$?`, chk: ['sqrt(20)', '2*sqrt(5)'],
        steps: [
          { t: r`Busco los cuadrados perfectos más cercanos a $20$.`, m: r`16<20<25` },
          { t: r`Aplico la raíz cuadrada (conserva el orden).`, m: r`\sqrt{16}<\sqrt{20}<\sqrt{25}\ \Rightarrow\ 4<\sqrt{20}<5` },
        ], resTxt: r`$\sqrt{20}$ está entre el $4$ y el $5$ ($\approx4{,}47$).` }),
    ]),
  ],
};

export default {
  id: 'recta', num: 3, cls: 'p3', tab: 'La recta real', title: '3. La recta real. Representación gráfica',
  lead: 'Cómo colocar enteros, fracciones e irracionales en la recta.',
  color: ['#0b6b4f', '#e2f4ed', '#b2dccb'],
  sections: [idea, ent, rac, irr, enc, prac],
};
