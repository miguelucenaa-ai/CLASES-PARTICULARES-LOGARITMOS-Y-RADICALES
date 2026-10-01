import { p, key, tip, sub, ex, grid, figure } from '../lib.mjs';
import { numline, pitagoras } from '../svg.mjs';
const r = String.raw;

/* ---------- Números reales (1–6) ---------- */
export const reales = {
  id: 'fin-reales', jump: 'Números reales (1–6)', h: 'Ejercicios finales · Números reales', kind: 'exercises',
  body: [
    p(r`Los ejercicios del final del tema, **uno por uno y resueltos paso a paso**. Intenta cada uno antes de mirar. Los números van como en tu PDF.`, 'intro'),
    sub('1. Clasifica los siguientes números'),
    grid([
      ex({ id: 'fin-1a', tag: 'Ejercicio 1(a)', q: r`12{,}12131415\ldots`,
        steps: [
          { t: r`Miro las cifras decimales: $12\ 13\ 14\ 15\ldots$ van **aumentando de uno en uno**.`, m: r`12{,}\,12\ 13\ 14\ 15\ \ldots` },
          { t: r`No hay un grupo de cifras que se repita: **no es periódico**, y tiene infinitas cifras.` },
        ], resTxt: r`**Irracional** (y por tanto real).` }),
      ex({ id: 'fin-1b', tag: 'Ejercicio 1(b)', q: r`12{,}121212\ldots`,
        steps: [
          { t: r`Se repite el grupo $12$ **desde el principio** de los decimales.`, m: r`12{,}\overline{12}` },
        ], resTxt: r`**Racional**: decimal periódico **puro** (período $12$).` }),
      ex({ id: 'fin-1c', tag: 'Ejercicio 1(c)', q: r`12{,}00121212\ldots`,
        steps: [
          { t: r`Primero aparece $00$ (que **no** se repite) y luego se repite $12$.`, m: r`12{,}00\overline{12}` },
        ], resTxt: r`**Racional**: decimal periódico **mixto** (anteperíodo $00$, período $12$).` }),
      ex({ id: 'fin-1d', tag: 'Ejercicio 1(d)', q: r`1{,}123123`,
        steps: [
          { t: r`Tiene un número **finito** de cifras (no hay puntos suspensivos ni arco de período).`, m: r`1{,}123123=\dfrac{1\,123\,123}{1\,000\,000}` },
        ], resTxt: r`**Racional**: decimal **exacto**.`, note: r`Si en tu cuaderno tuviera un arco sobre $123$, sería $1{,}\overline{123}$, un periódico puro (también racional).` }),
    ]),
    sub('2. Realiza las operaciones y expresa el resultado en forma de fracción'),
    grid([
      ex({ id: 'fin-2a', tag: 'Ejercicio 2(a)', q: r`\dfrac{15}{1+\dfrac{1}{1+\dfrac{1}{2}}}`, chk: ['15/(1+1/(1+Rational(1,2)))', '9'],
        steps: [
          { t: r`Empiezo por **lo más profundo** de la fracción: $1+\frac12$.`, m: r`1+\dfrac12=\dfrac32` },
          { t: r`Sigo hacia fuera: $\dfrac{1}{3/2}$ es dar la vuelta a la fracción.`, m: r`\dfrac{1}{\frac32}=\dfrac23` },
          { t: r`Sumo 1.`, m: r`1+\dfrac23=\dfrac53` },
          { t: r`Ahora $15$ dividido entre $\frac53$: multiplico por la fracción dada la vuelta.`, m: r`\dfrac{15}{\frac53}=15\cdot\dfrac35=\dfrac{45}{5}=9` },
        ], res: r`9` }),
      ex({ id: 'fin-2b', tag: 'Ejercicio 2(b)', q: r`\dfrac{2{,}0\overline{3}-1{,}75}{0{,}827}`, chk: ['(2+Rational(3,90)-Rational(175,100))/Rational(827,1000)', 'Rational(850,2481)'],
        steps: [
          { t: r`Paso cada decimal a **fracción**. Primero el periódico mixto: $N=2{,}0333\ldots$`, m: [r`N=2{,}0333\ldots`, r`100N=203{,}333\ldots\qquad10N=20{,}333\ldots`, r`90N=203-20=183\ \Rightarrow\ N=\dfrac{183}{90}=\dfrac{61}{30}`] },
          { t: r`Los exactos: $1{,}75$ y $0{,}827$.`, m: [r`1{,}75=\dfrac{175}{100}=\dfrac{7}{4}`, r`0{,}827=\dfrac{827}{1000}`] },
          { t: r`Resto el numerador (denominador común 60).`, m: r`\dfrac{61}{30}-\dfrac74=\dfrac{122}{60}-\dfrac{105}{60}=\dfrac{17}{60}` },
          { t: r`Divido: multiplico por la fracción dada la vuelta.`, m: r`\dfrac{17/60}{827/1000}=\dfrac{17}{60}\cdot\dfrac{1000}{827}=\dfrac{17\,000}{49\,620}` },
          { t: r`Simplifico entre $20$ ($827$ es primo, no se puede más).`, m: r`\dfrac{17\,000}{49\,620}=\dfrac{850}{2481}` },
        ], res: r`\dfrac{850}{2481}`, note: r`Está resuelto tal como aparece en el PDF, con $0{,}827$ exacto. Si tu profesor quería que $827$ fuera el período, avísame y lo cambio.` }),
    ]),
    sub('3. Ordena de menor a mayor'),
    grid([
      ex({ id: 'fin-3a', tag: 'Ejercicio 3(a)', task: r`$\dfrac{11}{4},\ \dfrac{68}{25},\ \dfrac{14}{5},\ \dfrac{27}{10}$`,
        steps: [
          { t: r`Las paso a decimales dividiendo.`, m: [r`\dfrac{11}{4}=2{,}75\qquad\dfrac{68}{25}=2{,}72`, r`\dfrac{14}{5}=2{,}8\qquad\dfrac{27}{10}=2{,}7`] },
          { t: r`Ordeno los decimales.`, m: r`2{,}7<2{,}72<2{,}75<2{,}8` },
        ], res: r`\dfrac{27}{10}<\dfrac{68}{25}<\dfrac{11}{4}<\dfrac{14}{5}` }),
      ex({ id: 'fin-3b', tag: 'Ejercicio 3(b)', task: r`$1{,}23,\ 1{,}2\overline{3}$ y $1{,}\overline{23}$`,
        steps: [
          { t: r`Los escribo con varias cifras.`, m: [r`1{,}23=1{,}2300\ldots`, r`1{,}2\overline{3}=1{,}2333\ldots`, r`1{,}\overline{23}=1{,}2323\ldots`] },
          { t: r`Comparo cifra a cifra: las dos primeras decimales coinciden ($2$ y $3$). En la **tercera**: $0$, $3$ y $2$. Y en el $1{,}\overline{23}$ la tercera es $2$ (menor que 3).`, m: r`1{,}23<1{,}\overline{23}<1{,}2\overline{3}` },
        ], res: r`1{,}23<1{,}\overline{23}<1{,}2\overline{3}`, note: r`En el PDF el tercer número aparece escrito igual que el primero (seguramente le falta el arco de período). Aquí lo he tomado como $1{,}\overline{23}$.` }),
    ]),
    sub('4. Demostración con el inverso'),
    grid([
      ex({ id: 'fin-4', tag: 'Ejercicio 4', task: r`Sean $a$ y $b$ negativos con $a\le b$. Demuestra que $\dfrac1a\ge\dfrac1b$. ¿Qué pasa si $a<0$ y $b>0$?`,
        steps: [
          { t: r`Parto de la hipótesis.`, m: r`a\le b<0` },
          { t: r`El producto de dos negativos es **positivo**: $a\cdot b>0$, y su inverso $\frac{1}{ab}$ también.`, m: r`ab>0\ \Rightarrow\ \dfrac{1}{ab}>0` },
          { t: r`Multiplico los dos lados por $\frac{1}{ab}$ (positivo): el sentido **no cambia**.`, m: r`a\cdot\dfrac{1}{ab}\le b\cdot\dfrac{1}{ab}` },
          { t: r`Simplifico.`, m: r`\dfrac1b\le\dfrac1a` },
          { t: r`Es decir: $\dfrac1a\ge\dfrac1b$. ✔️` },
          { t: r`**Si $a<0<b$:** $\frac1a$ es negativo y $\frac1b$ es positivo, así que $\frac1a<0<\frac1b$. Aquí el orden **no se invierte**.`, m: r`a<0<b\ \Rightarrow\ \dfrac1a<\dfrac1b`, why: r`Ejemplo: $a=-2$, $b=3$: $\frac1a=-\frac12<\frac13=\frac1b$.` },
        ], resTxt: r`Con ambos negativos: $\frac1a\ge\frac1b$. Con signos distintos: $\frac1a<\frac1b$.` }),
    ]),
    sub('5. Demostración con un cuadrado'),
    grid([
      ex({ id: 'fin-5', tag: 'Ejercicio 5', task: r`Con $xy>0$, demuestra que $\dfrac{x}{y}+\dfrac{y}{x}\ge2$ usando el desarrollo de $(x-y)^2$.`,
        steps: [
          { t: r`Un cuadrado **nunca** es negativo.`, m: r`(x-y)^2\ge0` },
          { t: r`Lo desarrollo (cuadrado de una resta).`, m: r`x^2-2xy+y^2\ge0` },
          { t: r`Paso $2xy$ al otro lado (sumo $2xy$ a los dos lados).`, m: r`x^2+y^2\ge2xy` },
          { t: r`Como $xy>0$, puedo **dividir entre $xy$** sin cambiar el sentido.`, m: r`\dfrac{x^2}{xy}+\dfrac{y^2}{xy}\ge\dfrac{2xy}{xy}` },
          { t: r`Simplifico cada fracción.`, m: r`\dfrac{x}{y}+\dfrac{y}{x}\ge2` },
        ], resTxt: r`Queda demostrado. ✔️ (La igualdad se da solo cuando $x=y$.)` }),
    ]),
    sub('6. Representa en la recta real'),
    grid([
      ex({ id: 'fin-6a', tag: 'Ejercicio 6(a)', task: r`$\dfrac{12}{5}$`,
        steps: [
          { t: r`$12\div5=2$ y sobran $2$: $\dfrac{12}{5}=2+\dfrac25=2{,}4$. Está entre el $2$ y el $3$.` },
          { t: r`Divido el tramo de 2 a 3 en 5 partes (cada una $\frac15=0{,}2$) y cuento 2 desde el 2.`, fig: figure(numline({ from: 0, to: 4, ticks: [0, 1, 2, 3, 4, 2.2, 2.4, 2.6, 2.8], labels: { 2.2: '', 2.4: '', 2.6: '', 2.8: '' }, pts: [{ x: 2.4, label: '12/5', c: 2 }], segs: [{ a: 2, b: 2.4, ac: true, bc: true }], aria: '12/5' })) },
        ], resTxt: r`$\frac{12}{5}$ está en $2{,}4$.` }),
      ex({ id: 'fin-6b', tag: 'Ejercicio 6(b)', task: r`$-\dfrac{3}{4}$`,
        steps: [
          { t: r`Es negativo: a la izquierda del $0$, entre $-1$ y $0$.` },
          { t: r`Divido el tramo de $-1$ a $0$ en 4 partes y cuento 3 desde el 0 hacia la izquierda.`, fig: figure(numline({ from: -2, to: 2, ticks: [-2, -1, 0, 1, 2, -0.75, -0.5, -0.25], labels: { '-0.75': '', '-0.5': '', '-0.25': '' }, pts: [{ x: -0.75, label: '−3/4', c: 2 }], segs: [{ a: -0.75, b: 0, ac: true, bc: true }], aria: '-3/4' })) },
        ], resTxt: r`$-\frac34=-0{,}75$.` }),
      ex({ id: 'fin-6c', tag: 'Ejercicio 6(c)', task: r`$\sqrt{6}$`,
        steps: [
          { t: r`$6=5+1$. Uso catetos $\sqrt5$ y $1$ (la $\sqrt5$ ya sabemos dibujarla: catetos 2 y 1).`, m: r`6=\left(\sqrt5\right)^2+1^2` },
          { t: r`Cateto de $\sqrt5$ sobre la recta, perpendicular de 1, hipotenusa $\sqrt6$ y la bajo con el compás.`, fig: figure(pitagoras({ a: Math.sqrt(5), b: 1, la: '√5', lb: '1', lh: '√6', stage: 4 })) },
        ], resTxt: r`$\sqrt6\approx2{,}449$.` }),
      ex({ id: 'fin-6d', tag: 'Ejercicio 6(d)', task: r`$\sqrt{8}$`,
        steps: [
          { t: r`$8=4+4=2^2+2^2$: catetos $2$ y $2$.`, m: r`8=2^2+2^2` },
          { t: r`Cateto 2 sobre la recta, perpendicular 2, hipotenusa $\sqrt8$ y la bajo con el compás.`, fig: figure(pitagoras({ a: 2, b: 2, stage: 4 })) },
        ], resTxt: r`$\sqrt8=2\sqrt2\approx2{,}828$.` }),
    ]),
  ],
};

/* ---------- Valor absoluto e intervalos (7–9) ---------- */
export const abs = {
  id: 'fin-abs', jump: 'Valor absoluto e intervalos (7–9)', h: 'Ejercicios finales · Valor absoluto e intervalos', kind: 'exercises',
  body: [
    sub('7. Desarrolla las siguientes expresiones'),
    grid([
      ex({ id: 'fin-7a', tag: 'Ejercicio 7(a)', q: r`|2x-3|+2x`, chk: ['Abs(2*x-3)+2*x', 'Piecewise((4*x-3, x>=Rational(3,2)),(3, True))', 'any'],
        steps: [
          { t: r`Punto crítico: $2x-3=0$.`, m: r`x=\dfrac32`, fig: figure(numline({ from: -2, to: 5, pts: [{ x: 1.5, label: '3/2', c: 2 }], aria: 'Punto crítico 3/2' })) },
          { t: r`**Si $x\ge\frac32$:** $2x-3\ge0$, queda igual.`, m: r`(2x-3)+2x=4x-3` },
          { t: r`**Si $x<\frac32$:** $2x-3<0$, cambia de signo.`, m: r`-(2x-3)+2x=-2x+3+2x=3` },
        ], resTxt: r`$\begin{cases}4x-3 & \text{si } x\ge\frac32\\ 3 & \text{si } x<\frac32\end{cases}$` }),
      ex({ id: 'fin-7b', tag: 'Ejercicio 7(b)', q: r`x+|x|+|2x|`, chk: ['x+Abs(x)+Abs(2*x)', 'Piecewise((4*x, x>=0),(-2*x, True))', 'any'],
        steps: [
          { t: r`Los dos valores absolutos se anulan en el mismo punto: $x=0$ y $2x=0$.`, m: r`x=0` },
          { t: r`**Si $x\ge0$:** $|x|=x$ y $|2x|=2x$.`, m: r`x+x+2x=4x` },
          { t: r`**Si $x<0$:** $|x|=-x$ y $|2x|=-2x$.`, m: r`x+(-x)+(-2x)=-2x` },
        ], resTxt: r`$\begin{cases}4x & \text{si } x\ge0\\ -2x & \text{si } x<0\end{cases}$` }),
    ]),
    sub('8. Operaciones con intervalos'),
    grid([
      ex({ id: 'fin-8', tag: 'Ejercicio 8', task: r`Con $A=(-2,+\infty)$, $B=(-2,0]$ y $C=[0,4)$, calcula $A\cup B\cup C$, $A\cap B\cap C$ y $A\cap(B\cup C)$.`,
        steps: [
          { t: r`Dibujo los tres conjuntos, uno debajo de otro.`, fig: figure(numline({ from: -3, to: 6, h: 168, y: 140, segs: [{ a: -2, b: Infinity, ac: false, dy: -90 }, { a: -2, b: 0, ac: false, bc: true, c: 2, dy: -62 }, { a: 0, b: 4, ac: true, bc: false, dy: -34 }], texts: [{ x: -2.7, y: 56, t: 'A' }, { x: -2.7, y: 84, t: 'B', c: 2 }, { x: -2.7, y: 112, t: 'C' }], aria: 'A, B y C' })) },
          { t: r`**$A\cup B\cup C$:** $A$ ya contiene a $B$ y a $C$ (todo lo de $B$ y $C$ es mayor que $-2$).`, m: r`A\cup B\cup C=(-2,\,+\infty)` },
          { t: r`**$A\cap B\cap C$:** $B\cap C$: $B$ llega hasta $0$ (incluido) y $C$ empieza en $0$ (incluido): solo comparten el $0$. Y el $0$ está en $A$.`, m: r`A\cap B\cap C=\{0\}` },
          { t: r`**$A\cap(B\cup C)$:** primero la unión: $(-2,0]\cup[0,4)$ forma un solo intervalo.`, m: r`B\cup C=(-2,\,4)` },
          { t: r`Lo corto con $A$: $(-2,4)$ ya está dentro de $A$.`, m: r`A\cap(B\cup C)=(-2,\,4)` },
        ], res: r`(-2,+\infty),\quad\{0\},\quad(-2,4)`, note: r`En el PDF el tercero está escrito $A\cap B\cup C$. Si se lee como $(A\cap B)\cup C$ sale lo mismo: $(-2,0]\cup[0,4)=(-2,4)$.` }),
    ]),
    sub('9. Expresa con un intervalo y representa'),
    grid([
      ex({ id: 'fin-9a', tag: 'Ejercicio 9(a)', q: r`\left|x-\dfrac12\right|<\dfrac14`,
        steps: [
          { t: r`$|A|<k\Rightarrow-k<A<k$.`, m: r`-\dfrac14<x-\dfrac12<\dfrac14` },
          { t: r`Sumo $\frac12$ a las tres partes (con denominador 4: $\frac12=\frac24$).`, m: r`-\dfrac14+\dfrac24<x<\dfrac14+\dfrac24\ \Rightarrow\ \dfrac14<x<\dfrac34` },
          { t: r`Intervalo abierto: es el entorno $E\left(\frac12,\frac14\right)$.`, m: r`x\in\left(\dfrac14,\ \dfrac34\right)`, fig: figure(numline({ from: 0, to: 1, ticks: [0, 0.25, 0.5, 0.75, 1], labels: { 0: '0', 0.25: '1/4', 0.5: '1/2', 0.75: '3/4', 1: '1' }, segs: [{ a: 0.25, b: 0.75, ac: false, bc: false }], aria: 'Entre 1/4 y 3/4' })) },
        ], resTxt: r`$\left(\frac14,\frac34\right)$` }),
      ex({ id: 'fin-9b', tag: 'Ejercicio 9(b)', q: r`|x|<\dfrac13`,
        steps: [
          { t: r`$|x|<k\Rightarrow-k<x<k$.`, m: r`-\dfrac13<x<\dfrac13` },
          { t: r`Intervalo abierto, centrado en 0.`, m: r`x\in\left(-\dfrac13,\ \dfrac13\right)`, fig: figure(numline({ from: -1, to: 1, ticks: [-1, -0.5, 0, 0.5, 1, -1 / 3, 1 / 3], labels: { '-1': '−1', '-0.5': '', 0: '0', 0.5: '', 1: '1', [-1 / 3]: '−1/3', [1 / 3]: '1/3' }, segs: [{ a: -1 / 3, b: 1 / 3, ac: false, bc: false }], aria: 'Entre -1/3 y 1/3' })) },
        ], resTxt: r`$\left(-\frac13,\frac13\right)$` }),
    ]),
  ],
};
