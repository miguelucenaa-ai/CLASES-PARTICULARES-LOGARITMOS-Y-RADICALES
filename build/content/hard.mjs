// Ejercicios de nivel difícil (tipo examen), por apartado. build.mjs los añade al final de cada pestaña.
import { p, key, tip, sub, ex, grid, figure } from '../lib.mjs';
import { numline } from '../svg.mjs';
const r = String.raw;
const H = (o) => ex({ ...o, hard: true });
const sec = (id, intro, items) => ({
  id: id + '-hard', jump: 'Nivel difícil', h: 'Nivel difícil: tipo examen', kind: 'hard',
  body: [p(intro, 'intro'), grid(items)],
});

/* ---------- 1. Números reales ---------- */
const reales = sec('rea', r`Aquí hay que **simplificar antes de clasificar**: casi siempre el número escondía otro mucho más sencillo.`, [
  H({ id: 'hd-re1', tag: 'Clasifica', q: r`\left(1+\sqrt3\right)^2-2\sqrt3`, chk: ['(1+sqrt(3))**2-2*sqrt(3)', '4'],
    steps: [
      { t: r`Desarrollo el cuadrado de una suma, $(a+b)^2=a^2+2ab+b^2$.`, m: r`(1+\sqrt3)^2=1+2\sqrt3+3` },
      { t: r`Resto $2\sqrt3$: los términos con $\sqrt3$ se cancelan.`, m: r`1+2\sqrt3+3-2\sqrt3=4` },
    ], resTxt: r`Vale $4$: **natural** (y entero, racional y real), aunque había un irracional dentro.` }),
  H({ id: 'hd-re2', tag: 'Clasifica', q: r`\sqrt{7-4\sqrt3}`, chk: ['sqrt(7-4*sqrt(3))', '2-sqrt(3)'],
    steps: [
      { t: r`Busco si $7-4\sqrt3$ es el cuadrado de algo como $a-b\sqrt3$: $(a-b\sqrt3)^2=a^2+3b^2-2ab\sqrt3$. Necesito $2ab=4$ y $a^2+3b^2=7$.`, m: r`a=2,\ b=1\ \Rightarrow\ 4+3=7\ \checkmark` },
      { t: r`Compruebo.`, m: r`(2-\sqrt3)^2=4-4\sqrt3+3=7-4\sqrt3` },
      { t: r`La raíz de un cuadrado es el valor absoluto. Como $2>\sqrt3$, $2-\sqrt3$ es positivo.`, m: r`\sqrt{7-4\sqrt3}=\left|2-\sqrt3\right|=2-\sqrt3` },
    ], resTxt: r`Vale $2-\sqrt3\approx0{,}268$: **irracional**.` }),
  H({ id: 'hd-re3', tag: 'Clasifica', q: r`0{,}\overline{3}+0{,}\overline{6}`, chk: ['Rational(3,9)+Rational(6,9)', '1'],
    steps: [
      { t: r`Paso cada periódico a fracción (período de 1 cifra: entre 9).`, m: r`0{,}\overline3=\dfrac39=\dfrac13\qquad0{,}\overline6=\dfrac69=\dfrac23` },
      { t: r`Sumo.`, m: r`\dfrac13+\dfrac23=1` },
    ], resTxt: r`Vale $1$: **natural**. (Por eso $0{,}999\ldots=1$.)` }),
  H({ id: 'hd-re4', tag: 'Clasifica', q: r`\dfrac{\sqrt8+\sqrt2}{\sqrt2}`, chk: ['(sqrt(8)+sqrt(2))/sqrt(2)', '3'],
    steps: [
      { t: r`Extraigo factores: $\sqrt8=2\sqrt2$.`, m: r`\dfrac{2\sqrt2+\sqrt2}{\sqrt2}=\dfrac{3\sqrt2}{\sqrt2}` },
      { t: r`Simplifico $\sqrt2$.`, m: r`3` },
    ], resTxt: r`Vale $3$: **natural**.` }),
  H({ id: 'hd-re5', tag: 'Clasifica', q: r`\sqrt2\cdot\sqrt3\cdot\sqrt6`, chk: ['sqrt(2)*sqrt(3)*sqrt(6)', '6'],
    steps: [
      { t: r`Mismo índice: junto los radicandos.`, m: r`\sqrt{2\cdot3\cdot6}=\sqrt{36}` },
      { t: r`$36=6^2$.`, m: r`\sqrt{36}=6` },
    ], resTxt: r`Vale $6$: **natural**.` }),
  H({ id: 'hd-re6', tag: 'Opera con decimales', q: r`1{,}\overline{3}\cdot0{,}\overline{6}`, chk: ['(1+Rational(1,3))*Rational(2,3)', 'Rational(8,9)'],
    steps: [
      { t: r`Fracciones generatrices.`, m: r`1{,}\overline3=1+\dfrac13=\dfrac43\qquad0{,}\overline6=\dfrac23` },
      { t: r`Multiplico.`, m: r`\dfrac43\cdot\dfrac23=\dfrac89` },
    ], resTxt: r`$\dfrac89=0{,}\overline{8}$: **racional** (periódico puro).` }),
]);

/* ---------- 2. Desigualdades ---------- */
const desig = sec('des', r`Inecuaciones con fracciones, sistemas y demostraciones. Mismo método de siempre, pero con más pasos.`, [
  H({ id: 'hd-de1', tag: 'Con fracciones', q: r`\dfrac{2(x-1)}{3}-\dfrac{x+2}{2}\le1`,
    steps: [
      { t: r`Multiplico todo por el mcm de los denominadores, $6$ (positivo: el sentido no cambia).`, m: r`4(x-1)-3(x+2)\le6` },
      { t: r`Quito los paréntesis.`, m: r`4x-4-3x-6\le6` },
      { t: r`Agrupo.`, m: r`x-10\le6\ \Rightarrow\ x\le16` },
      { t: r`Intervalo.`, m: r`x\in(-\infty,\,16]`, fig: figure(numline({ from: 10, to: 20, segs: [{ a: -Infinity, b: 16, bc: true }], aria: 'x menor o igual que 16' })) },
    ], resTxt: r`$x\in(-\infty,16]$` }),
  H({ id: 'hd-de2', tag: 'Sistema', task: r`Resuelve a la vez $x+3>2x-1$ y $5x-2\ge3$.`,
    steps: [
      { t: r`**Primera:** paso las $x$ a un lado. Divido entre $-1$ (negativo): **se invierte**.`, m: r`x-2x>-1-3\ \Rightarrow\ -x>-4\ \Rightarrow\ x<4` },
      { t: r`**Segunda:**`, m: r`5x\ge5\ \Rightarrow\ x\ge1` },
      { t: r`Tienen que cumplirse **las dos**: intersección de $(-\infty,4)$ y $[1,+\infty)$.`, m: r`[1,\,4)`,
        fig: figure(numline({ from: -1, to: 6, h: 140, y: 112, segs: [{ a: -Infinity, b: 4, bc: false, dy: -48 }, { a: 1, b: Infinity, ac: true, c: 2, dy: -24 }], texts: [{ x: -0.7, y: 70, t: '1.ª' }, { x: -0.7, y: 94, t: '2.ª', c: 2 }], aria: 'Intersección' })) },
    ], resTxt: r`$x\in[1,4)$` }),
  H({ id: 'hd-de3', tag: 'Dividir por negativo', q: r`\dfrac{x-1}{-2}<3`,
    steps: [
      { t: r`Multiplico por $-2$ (negativo): **se invierte** el sentido.`, m: r`x-1>-6` },
      { t: r`Sumo 1.`, m: r`x>-5` },
    ], resTxt: r`$x\in(-5,+\infty)$` }),
  H({ id: 'hd-de4', tag: 'Demostración', task: r`Demuestra que, para $a,b\ge0$: $\dfrac{a+b}{2}\ge\sqrt{ab}$.`,
    steps: [
      { t: r`Un cuadrado nunca es negativo.`, m: r`\left(\sqrt a-\sqrt b\right)^2\ge0` },
      { t: r`Lo desarrollo: $(\sqrt a)^2=a$, $(\sqrt b)^2=b$ y $\sqrt a\sqrt b=\sqrt{ab}$.`, m: r`a-2\sqrt{ab}+b\ge0` },
      { t: r`Paso $2\sqrt{ab}$ al otro lado.`, m: r`a+b\ge2\sqrt{ab}` },
      { t: r`Divido entre $2$ (positivo).`, m: r`\dfrac{a+b}{2}\ge\sqrt{ab}` },
    ], resTxt: r`Demostrado. ✔️ (La media aritmética es siempre mayor o igual que la geométrica.)` }),
]);

/* ---------- 4. Valor absoluto ---------- */
const abs = sec('abs', r`Ecuaciones con **dos** valores absolutos y sistemas de condiciones de distancia.`, [
  H({ id: 'hd-av1', tag: 'Ecuación', q: r`|x-2|+|x+1|=5`,
    steps: [
      { t: r`Puntos críticos: $x=2$ y $x=-1$. Tres tramos.`, m: r`x=-1,\quad x=2`, fig: figure(numline({ from: -4, to: 5, pts: [{ x: -1, label: '−1', c: 2 }, { x: 2, label: '2', c: 2 }], aria: 'Puntos críticos' })) },
      { t: r`**Tramo $x<-1$:** los dos cambian de signo.`, m: r`-(x-2)-(x+1)=5\ \Rightarrow\ -2x+1=5\ \Rightarrow\ x=-2` },
      { t: r`$x=-2$ **sí** cumple $x<-1$: es solución.` },
      { t: r`**Tramo $-1\le x<2$:** $x+1\ge0$ (igual) y $x-2<0$ (cambia).`, m: r`-(x-2)+(x+1)=5\ \Rightarrow\ 3=5` },
      { t: r`Es imposible: **no hay solución** en este tramo.` },
      { t: r`**Tramo $x\ge2$:** los dos quedan igual.`, m: r`(x-2)+(x+1)=5\ \Rightarrow\ 2x-1=5\ \Rightarrow\ x=3` },
      { t: r`$x=3$ cumple $x\ge2$: es solución.` },
    ], resTxt: r`$x=-2$ y $x=3$. (Compruebo: $|{-4}|+|{-1}|=5$ y $|1|+|4|=5$.)` }),
  H({ id: 'hd-av2', tag: 'Sistema', task: r`Resuelve a la vez $|x+1|<3$ y $|x-1|>1$.`,
    steps: [
      { t: r`**Primera:** $-3<x+1<3$. Resto 1 en las tres partes.`, m: r`-4<x<2\ \Rightarrow\ (-4,\,2)` },
      { t: r`**Segunda:** "mayor que" son dos casos.`, m: r`x-1>1\ \text{o}\ x-1<-1\ \Rightarrow\ x>2\ \text{o}\ x<0` },
      { t: r`Intersecto: lo que está a la vez en $(-4,2)$ y en $(-\infty,0)\cup(2,+\infty)$.`, m: r`(-4,\,0)`,
        fig: figure(numline({ from: -5, to: 4, h: 140, y: 112, segs: [{ a: -4, b: 2, ac: false, bc: false, dy: -48 }, { a: -Infinity, b: 0, bc: false, c: 2, dy: -24 }, { a: 2, b: Infinity, ac: false, c: 2, dy: -24 }], aria: 'Intersección' })) },
    ], resTxt: r`$x\in(-4,0)$` }),
  H({ id: 'hd-av3', tag: 'Distancias', task: r`Halla los $x$ que están a **menos de 3** unidades del $2$ y a **más de 1** unidad del $3$.`,
    steps: [
      { t: r`"A menos de 3 del 2" es $|x-2|<3$.`, m: r`-3<x-2<3\ \Rightarrow\ (-1,\,5)` },
      { t: r`"A más de 1 del 3" es $|x-3|>1$.`, m: r`x-3>1\ \text{o}\ x-3<-1\ \Rightarrow\ x>4\ \text{o}\ x<2` },
      { t: r`Intersecto $(-1,5)$ con $(-\infty,2)\cup(4,+\infty)$.`, m: r`(-1,\,2)\cup(4,\,5)`,
        fig: figure(numline({ from: -2, to: 6, h: 140, y: 112, segs: [{ a: -1, b: 5, ac: false, bc: false, dy: -48 }, { a: -Infinity, b: 2, bc: false, c: 2, dy: -24 }, { a: 4, b: Infinity, ac: false, c: 2, dy: -24 }], aria: 'Intersección' })) },
    ], resTxt: r`$x\in(-1,2)\cup(4,5)$` }),
  H({ id: 'hd-av4', tag: 'Con otra condición', task: r`Resuelve $|x-3|\ge2$ y además $x<10$.`,
    steps: [
      { t: r`$|x-3|\ge2$: dos casos.`, m: r`x-3\ge2\ \text{o}\ x-3\le-2\ \Rightarrow\ x\ge5\ \text{o}\ x\le1` },
      { t: r`Y $x<10$. Intersecto $(-\infty,1]\cup[5,+\infty)$ con $(-\infty,10)$.`, m: r`(-\infty,\,1]\cup[5,\,10)` },
    ], resTxt: r`$x\in(-\infty,1]\cup[5,10)$` }),
  H({ id: 'hd-av5', tag: 'Desarrolla', q: r`|x-1|-|x+2|+x`, chk: ['Abs(x-1)-Abs(x+2)+x', 'Piecewise((x+3, x<-2),(-x-1, x<1),(x-3, True))', 'any'],
    steps: [
      { t: r`Puntos críticos: $x=1$ y $x=-2$.`, m: r`x=-2,\quad x=1` },
      { t: r`**$x<-2$:** los dos valores absolutos cambian de signo.`, m: r`-(x-1)+(x+2)+x=-x+1+x+2+x=x+3` },
      { t: r`**$-2\le x<1$:** $x-1<0$ (cambia) y $x+2\ge0$ (igual).`, m: r`-(x-1)-(x+2)+x=-x+1-x-2+x=-x-1` },
      { t: r`**$x\ge1$:** los dos quedan igual.`, m: r`(x-1)-(x+2)+x=x-3` },
    ], resTxt: r`$\begin{cases}x+3 & x<-2\\ -x-1 & -2\le x<1\\ x-3 & x\ge1\end{cases}$` }),
]);

/* ---------- 5. Intervalos ---------- */
const interv = sec('int', r`Operaciones con varios conjuntos a la vez: **dibújalos siempre uno debajo de otro**.`, [
  H({ id: 'hd-in1', tag: 'Operaciones', task: r`Sean $A=[-3,2)$, $B=(-1,5]$ y $C=(-\infty,0]$. Calcula $A\cap B$, $A\cup B$, $(A\cup B)\cap C$ y $A\cap(B\cup C)$.`,
    steps: [
      { t: r`Los dibujo.`, fig: figure(numline({ from: -4, to: 6, h: 168, y: 140, segs: [{ a: -3, b: 2, ac: true, bc: false, dy: -90 }, { a: -1, b: 5, ac: false, bc: true, c: 2, dy: -62 }, { a: -Infinity, b: 0, bc: true, dy: -34 }], texts: [{ x: -3.7, y: 56, t: 'A' }, { x: -3.7, y: 84, t: 'B', c: 2 }, { x: -3.7, y: 112, t: 'C' }], aria: 'A, B y C' })) },
      { t: r`**$A\cap B$:** de $-1$ (no entra) a $2$ (no entra).`, m: r`A\cap B=(-1,\,2)` },
      { t: r`**$A\cup B$:** de $-3$ (entra por $A$) a $5$ (entra por $B$). Se solapan, así que es un solo intervalo.`, m: r`A\cup B=[-3,\,5]` },
      { t: r`**$(A\cup B)\cap C$:** de $[-3,5]$ me quedo con lo que está hasta el $0$ (incluido).`, m: r`[-3,\,0]` },
      { t: r`**$A\cap(B\cup C)$:** primero $B\cup C=(-\infty,0]\cup(-1,5]=(-\infty,5]$. Con $A$ queda todo $A$.`, m: r`A\cap(B\cup C)=A=[-3,\,2)` },
    ], resTxt: r`$(-1,2)$, $[-3,5]$, $[-3,0]$ y $[-3,2)$, por este orden.` }),
  H({ id: 'hd-in2', tag: 'Entorno', task: r`Escribe $|x+4|<2$ como intervalo y como entorno.`,
    steps: [
      { t: r`$-2<x+4<2$. Resto 4 en las tres partes.`, m: r`-6<x<-2` },
      { t: r`Centro: punto medio. Radio: mitad de la longitud.`, m: r`a=\dfrac{-6+(-2)}{2}=-4\qquad r=\dfrac{-2-(-6)}{2}=2` },
    ], resTxt: r`$(-6,-2)=E(-4,\,2)$` }),
]);

/* ---------- 6. Aproximaciones ---------- */
const aprox = sec('apr', r`Errores y cotas en situaciones reales.`, [
  H({ id: 'hd-ap1', tag: 'Errores', task: r`Se aproxima $\dfrac13$ por $0{,}33$. Calcula el error absoluto y el relativo.`, chk: ['Abs(Rational(1,3)-Rational(33,100))/Rational(1,3)', 'Rational(1,100)'],
    steps: [
      { t: r`**Error absoluto.**`, m: r`E_a=\left|\dfrac13-0{,}33\right|=\left|\dfrac{100}{300}-\dfrac{99}{300}\right|=\dfrac{1}{300}\approx0{,}0033` },
      { t: r`**Error relativo:** divido entre el valor real.`, m: r`E_r=\dfrac{1/300}{1/3}=\dfrac{3}{300}=\dfrac1{100}=0{,}01` },
    ], resTxt: r`$E_a\approx0{,}0033$ y $E_r=0{,}01=1\,\%$.` }),
  H({ id: 'hd-ap2', tag: 'Cota de error', task: r`Calcula el área de un círculo de radio $\sqrt5$ cm con un error menor que una centésima.`, chk: ['pi*sqrt(5)**2', '5*pi'],
    steps: [
      { t: r`$A=\pi r^2$. Con $r=\sqrt5$, el cuadrado cancela la raíz.`, m: r`A=\pi\left(\sqrt5\right)^2=5\pi` },
      { t: r`Aproximo con la calculadora.`, m: r`5\pi=15{,}70796\ldots` },
      { t: r`Redondeando a las centésimas el error es como mucho media centésima ($0{,}005<0{,}01$).`, m: r`A\approx15{,}71\ \text{cm}^2` },
    ], resTxt: r`$A=5\pi\approx15{,}71$ cm².` }),
  H({ id: 'hd-ap3', tag: 'Intervalo de valores', task: r`El lado de un cuadrado se mide como $5{,}2$ cm con un error máximo de $0{,}05$ cm. ¿Entre qué valores está su área?`,
    steps: [
      { t: r`El lado real está en $[5{,}2-0{,}05,\ 5{,}2+0{,}05]$.`, m: r`l\in[5{,}15,\ 5{,}25]` },
      { t: r`El área es $l^2$ y crece con $l$: calculo los dos extremos.`, m: r`5{,}15^2=26{,}5225\qquad5{,}25^2=27{,}5625` },
    ], resTxt: r`El área está entre $26{,}52$ y $27{,}56$ cm² (la medida directa $5{,}2^2=27{,}04$ está en medio).` }),
]);

/* ---------- 7. Notación científica ---------- */
const nota = sec('not', r`Operaciones combinadas y problemas con datos reales.`, [
  H({ id: 'hd-no1', tag: 'Opera', q: r`\dfrac{\left(3{,}2\cdot10^{-4}\right)\left(5\cdot10^{7}\right)}{8\cdot10^{2}}`, chk: ['(Rational(32,10)*10**(-4)*5*10**7)/(8*10**2)', '20'],
    steps: [
      { t: r`Arriba: multiplico números y sumo exponentes.`, m: r`(3{,}2\cdot5)\cdot10^{-4+7}=16\cdot10^{3}` },
      { t: r`Divido: números entre números y exponentes se restan.`, m: r`\dfrac{16\cdot10^3}{8\cdot10^2}=2\cdot10^{3-2}=2\cdot10^{1}` },
    ], res: r`2\cdot10^{1}=20` }),
  H({ id: 'hd-no2', tag: 'Suma y resta', q: r`4{,}5\cdot10^{-3}+2\cdot10^{-4}-1{,}5\cdot10^{-5}`, chk: ['Rational(45,10)*10**(-3)+2*10**(-4)-Rational(15,10)*10**(-5)', 'Rational(4685,1000)*10**(-3)'],
    steps: [
      { t: r`Los pongo todos con el mismo exponente, el más pequeño: $10^{-5}$.`, m: [r`4{,}5\cdot10^{-3}=450\cdot10^{-5}`, r`2\cdot10^{-4}=20\cdot10^{-5}`] },
      { t: r`Sumo y resto los números.`, m: r`(450+20-1{,}5)\cdot10^{-5}=468{,}5\cdot10^{-5}` },
      { t: r`Normalizo: $468{,}5=4{,}685\cdot10^2$.`, m: r`4{,}685\cdot10^{2}\cdot10^{-5}=4{,}685\cdot10^{-3}` },
    ], res: r`4{,}685\cdot10^{-3}` }),
  H({ id: 'hd-no3', tag: 'Problema', task: r`La luz tarda $1{,}28$ s en llegar de la Luna a la Tierra y viaja a $3\cdot10^{8}$ m/s. ¿A qué distancia está la Luna?`, chk: ['3*10**8*Rational(128,100)', 'Rational(384,100)*10**8'],
    steps: [
      { t: r`$\text{distancia}=\text{velocidad}\cdot\text{tiempo}$.`, m: r`d=3\cdot10^8\cdot1{,}28` },
      { t: r`Multiplico los números: $3\cdot1{,}28=3{,}84$.`, m: r`d=3{,}84\cdot10^{8}\ \text{m}` },
    ], resTxt: r`$3{,}84\cdot10^{8}$ m, es decir, unos $384\,000$ km.` }),
  H({ id: 'hd-no4', tag: 'Problema', task: r`Un virus mide $1{,}2\cdot10^{-7}$ m. ¿Cuántos caben en fila en $1$ cm ($=10^{-2}$ m)?`, chk: ['10**(-2)/(Rational(12,10)*10**(-7))', 'Rational(5,6)*10**5'],
    steps: [
      { t: r`Divido la longitud total entre el tamaño de un virus.`, m: r`\dfrac{10^{-2}}{1{,}2\cdot10^{-7}}=\dfrac{1}{1{,}2}\cdot10^{-2-(-7)}` },
      { t: r`$\dfrac1{1{,}2}\approx0{,}83$ y $10^5$. Normalizo: $0{,}83=8{,}3\cdot10^{-1}$.`, m: r`0{,}83\cdot10^{5}=8{,}3\cdot10^{4}` },
    ], resTxt: r`Unos $8{,}3\cdot10^{4}$ virus, es decir, unos **83 000**.` }),
]);

/* ---------- 8. Radicales ---------- */
const radic = sec('rad', r`Operaciones combinadas con radicales: **simplifica cada radical primero** y **racionaliza** cuando haya raíces abajo.`, [
  H({ id: 'hd-ra1', tag: 'Simplifica', q: r`\sqrt{\dfrac{\sqrt{50}}{\sqrt2+\sqrt8}}`, chk: ['sqrt(sqrt(50)/(sqrt(2)+sqrt(8)))', 'sqrt(15)/3'],
    steps: [
      { t: r`Extraigo factores.`, m: r`\sqrt{50}=5\sqrt2\qquad\sqrt8=2\sqrt2` },
      { t: r`Denominador: suma de semejantes.`, m: r`\sqrt2+2\sqrt2=3\sqrt2` },
      { t: r`La fracción de dentro: se cancela $\sqrt2$.`, m: r`\dfrac{5\sqrt2}{3\sqrt2}=\dfrac53` },
      { t: r`Raíz de una fracción y racionalizo (multiplico por $\sqrt3$).`, m: r`\sqrt{\dfrac53}=\dfrac{\sqrt5}{\sqrt3}=\dfrac{\sqrt5\cdot\sqrt3}{3}=\dfrac{\sqrt{15}}{3}` },
    ], res: r`\dfrac{\sqrt{15}}{3}` }),
  H({ id: 'hd-ra2', tag: 'Simplifica', q: r`\dfrac{\sqrt[3]{54}+\sqrt[3]{16}}{\sqrt[3]{2}}`, chk: ['(root(54,3)+root(16,3))/root(2,3)', '5'],
    steps: [
      { t: r`Extraigo cubos: $54=3^3\cdot2$ y $16=2^3\cdot2$.`, m: r`\sqrt[3]{54}=3\sqrt[3]{2}\qquad\sqrt[3]{16}=2\sqrt[3]{2}` },
      { t: r`Sumo semejantes y simplifico.`, m: r`\dfrac{3\sqrt[3]2+2\sqrt[3]2}{\sqrt[3]2}=\dfrac{5\sqrt[3]2}{\sqrt[3]2}=5` },
    ], res: r`5` }),
  H({ id: 'hd-ra3', tag: 'Radicales ↔ potencias', q: r`\sqrt{3\sqrt[3]{9}}`, chk: ['sqrt(3*root(9,3))', 'root(3**5,6)'],
    steps: [
      { t: r`Todo a potencias de 3: $9=3^2$.`, m: r`\sqrt[3]9=3^{2/3}` },
      { t: r`Multiplico dentro (sumo exponentes): $1+\frac23=\frac53$.`, m: r`3\cdot3^{2/3}=3^{5/3}` },
      { t: r`La raíz cuadrada multiplica el exponente por $\frac12$.`, m: r`\left(3^{5/3}\right)^{1/2}=3^{5/6}` },
      { t: r`Vuelvo a radical.`, m: r`3^{5/6}=\sqrt[6]{3^5}=\sqrt[6]{243}` },
    ], res: r`\sqrt[6]{243}` }),
  H({ id: 'hd-ra4', tag: 'Racionaliza', q: r`\dfrac{4}{\sqrt7-\sqrt3}`, chk: ['4/(sqrt(7)-sqrt(3))', 'sqrt(7)+sqrt(3)'],
    steps: [
      { t: r`Multiplico por el conjugado.`, m: r`\dfrac{4}{\sqrt7-\sqrt3}\cdot\dfrac{\sqrt7+\sqrt3}{\sqrt7+\sqrt3}` },
      { t: r`Abajo: suma por diferencia, $7-3=4$.`, m: r`\dfrac{4(\sqrt7+\sqrt3)}{4}` },
      { t: r`Simplifico el 4.`, m: r`\sqrt7+\sqrt3` },
    ], res: r`\sqrt7+\sqrt3` }),
  H({ id: 'hd-ra5', tag: 'Racionaliza y resta', q: r`\dfrac{\sqrt2+1}{\sqrt2-1}-\dfrac{\sqrt2-1}{\sqrt2+1}`, chk: ['(sqrt(2)+1)/(sqrt(2)-1)-(sqrt(2)-1)/(sqrt(2)+1)', '4*sqrt(2)'],
    steps: [
      { t: r`Primera fracción: multiplico por el conjugado $\sqrt2+1$. Abajo: $2-1=1$.`, m: r`\dfrac{(\sqrt2+1)^2}{2-1}=2+2\sqrt2+1=3+2\sqrt2` },
      { t: r`Segunda: conjugado $\sqrt2-1$. Abajo: $2-1=1$.`, m: r`\dfrac{(\sqrt2-1)^2}{2-1}=2-2\sqrt2+1=3-2\sqrt2` },
      { t: r`Resto.`, m: r`(3+2\sqrt2)-(3-2\sqrt2)=4\sqrt2` },
    ], res: r`4\sqrt2` }),
  H({ id: 'hd-ra6', tag: 'Racionaliza y suma', q: r`\dfrac{1}{\sqrt3+\sqrt2}+\dfrac{1}{\sqrt3-\sqrt2}`, chk: ['1/(sqrt(3)+sqrt(2))+1/(sqrt(3)-sqrt(2))', '2*sqrt(3)'],
    steps: [
      { t: r`Cada una con su conjugado; abajo siempre sale $3-2=1$.`, m: [r`\dfrac{1}{\sqrt3+\sqrt2}=\dfrac{\sqrt3-\sqrt2}{3-2}=\sqrt3-\sqrt2`, r`\dfrac{1}{\sqrt3-\sqrt2}=\dfrac{\sqrt3+\sqrt2}{3-2}=\sqrt3+\sqrt2`] },
      { t: r`Sumo: los $\sqrt2$ se cancelan.`, m: r`(\sqrt3-\sqrt2)+(\sqrt3+\sqrt2)=2\sqrt3` },
    ], res: r`2\sqrt3` }),
  H({ id: 'hd-ra7', tag: 'Suma con fracción', q: r`\sqrt{18}+\sqrt{\dfrac92}-\sqrt{32}`, chk: ['sqrt(18)+sqrt(Rational(9,2))-sqrt(32)', 'sqrt(2)/2'],
    steps: [
      { t: r`Extraigo factores y racionalizo la raíz de la fracción.`, m: [r`\sqrt{18}=3\sqrt2\qquad\sqrt{32}=4\sqrt2`, r`\sqrt{\dfrac92}=\dfrac{3}{\sqrt2}=\dfrac{3\sqrt2}{2}`] },
      { t: r`Todo en $\sqrt2$: saco factor común.`, m: r`3\sqrt2+\dfrac32\sqrt2-4\sqrt2=\left(3+\dfrac32-4\right)\sqrt2` },
      { t: r`Calculo el paréntesis.`, m: r`\dfrac12\sqrt2` },
    ], res: r`\dfrac{\sqrt2}{2}` }),
  H({ id: 'hd-ra8', tag: 'Identidad con cúbicas', q: r`\left(\sqrt[3]{2}+1\right)\left(\sqrt[3]{4}-\sqrt[3]{2}+1\right)`, chk: ['(root(2,3)+1)*(root(4,3)-root(2,3)+1)', '3'],
    steps: [
      { t: r`Llamo $a=\sqrt[3]2$. Entonces $\sqrt[3]4=a^2$ y $a^3=2$.`, m: r`(a+1)(a^2-a+1)` },
      { t: r`Es la suma de cubos: $(a+1)(a^2-a+1)=a^3+1$.`, m: r`a^3+1=2+1` },
    ], res: r`3` }),
]);

/* ---------- 9. Potencias ---------- */
const pot = sec('pot', r`Potencias combinadas y ecuaciones exponenciales sencillas. Pasa todo a **una misma base** cuando puedas.`, [
  H({ id: 'hd-po1', tag: 'Combinada', q: r`\dfrac{\left(2^{-1}\cdot3\right)^{2}\cdot6^{-1}}{\left(3^{2}\right)^{-1}\cdot2^{-3}}`, chk: ['((2**(-1)*3)**2*6**(-1))/((3**2)**(-1)*2**(-3))', '27'],
    steps: [
      { t: r`Numerador: el paréntesis primero.`, m: r`2^{-1}\cdot3=\dfrac32\ \Rightarrow\ \left(\dfrac32\right)^2=\dfrac94` },
      { t: r`Por $6^{-1}=\frac16$.`, m: r`\dfrac94\cdot\dfrac16=\dfrac{9}{24}=\dfrac38` },
      { t: r`Denominador: potencia de una potencia y exponentes negativos.`, m: r`\left(3^2\right)^{-1}\cdot2^{-3}=\dfrac19\cdot\dfrac18=\dfrac1{72}` },
      { t: r`Divido: multiplico por $72$.`, m: r`\dfrac38\cdot72=27` },
    ], res: r`27` }),
  H({ id: 'hd-po2', tag: 'Exponentes fraccionarios', q: r`\dfrac{8^{2/3}\cdot27^{-1/3}}{16^{-1/4}}`, chk: ['(8**(2/3)*27**(-1/3))/16**(-1/4)', 'Rational(8,3)'],
    steps: [
      { t: r`Calculo cada potencia (raíz primero).`, m: [r`8^{2/3}=\left(\sqrt[3]8\right)^2=4`, r`27^{-1/3}=\dfrac{1}{\sqrt[3]{27}}=\dfrac13`, r`16^{-1/4}=\dfrac{1}{\sqrt[4]{16}}=\dfrac12`] },
      { t: r`Sustituyo.`, m: r`\dfrac{4\cdot\frac13}{\frac12}=\dfrac{4/3}{1/2}=\dfrac43\cdot2` },
    ], res: r`\dfrac83` }),
  H({ id: 'hd-po3', tag: 'Con letras', q: r`\dfrac{a^{3}\sqrt{a}}{\sqrt[3]{a^{2}}}`, chk: ['a**3*sqrt(a)/root(a**2,3)', 'a**2*root(a**5,6)'],
    steps: [
      { t: r`Paso todo a potencias de $a$.`, m: r`\dfrac{a^3\cdot a^{1/2}}{a^{2/3}}` },
      { t: r`Sumo arriba y resto el de abajo (denominador común 6).`, m: r`a^{3+\frac12-\frac23}=a^{\frac{18}{6}+\frac36-\frac46}=a^{17/6}` },
      { t: r`Extraigo: $\frac{17}{6}=2+\frac56$.`, m: r`a^{17/6}=a^2\cdot a^{5/6}=a^2\sqrt[6]{a^5}` },
    ], res: r`a^2\sqrt[6]{a^5}` }),
  H({ id: 'hd-po4', tag: 'Con letras', q: r`\left(\dfrac{x^{-2}y^{3}}{x^{4}y^{-1}}\right)^{-\frac12}`, chk: ['((x**(-2)*y**3)/(x**4*y**(-1)))**(-Rational(1,2))', 'x**3/y**2'],
    steps: [
      { t: r`Dentro, cociente de la misma base: resto exponentes.`, m: r`x^{-2-4}\cdot y^{3-(-1)}=x^{-6}y^{4}` },
      { t: r`Elevo a $-\frac12$: multiplico los exponentes.`, m: r`\left(x^{-6}y^{4}\right)^{-1/2}=x^{(-6)(-1/2)}\,y^{4\cdot(-1/2)}=x^{3}y^{-2}` },
      { t: r`El exponente negativo pasa abajo.`, m: r`\dfrac{x^3}{y^2}` },
    ], res: r`\dfrac{x^{3}}{y^{2}}` }),
  H({ id: 'hd-po5', tag: 'Factor común', q: r`\dfrac{2^{n+2}-2^{n}}{2^{n+1}}`, chk: ['(2**(n+2)-2**n)/2**(n+1)', 'Rational(3,2)'],
    steps: [
      { t: r`Separo las potencias: $2^{n+2}=2^n\cdot2^2$ y $2^{n+1}=2^n\cdot2$.`, m: r`\dfrac{2^n\cdot4-2^n}{2^n\cdot2}` },
      { t: r`Saco factor común $2^n$ arriba.`, m: r`\dfrac{2^n(4-1)}{2^n\cdot2}` },
      { t: r`Simplifico $2^n$.`, m: r`\dfrac32` },
    ], res: r`\dfrac32`, note: r`No depende de $n$.` }),
  H({ id: 'hd-po6', tag: 'Ecuación exponencial', task: r`Resuelve $3^{x+1}+3^{x}=36$.`,
    steps: [
      { t: r`$3^{x+1}=3^x\cdot3$. Saco factor común $3^x$.`, m: r`3^x\cdot3+3^x=3^x(3+1)=4\cdot3^x` },
      { t: r`Igualo a 36 y despejo.`, m: r`4\cdot3^x=36\ \Rightarrow\ 3^x=9` },
      { t: r`$9=3^2$: igualo exponentes.`, m: r`3^x=3^2\ \Rightarrow\ x=2` },
    ], resTxt: r`$x=2$. (Compruebo: $3^3+3^2=27+9=36$ ✔️)` }),
]);

/* ---------- 10. Logaritmos ---------- */
const logs = sec('log', r`Del estilo de los ejercicios 14–22 de tu PDF: **todo a una misma base**, propiedades de los logaritmos y mucho cuidado con el dominio.`, [
  H({ id: 'hd-lo1', tag: 'Definición', q: r`\log_3\sqrt{\dfrac{27}{\sqrt[3]{9}}}`, chk: ['log(sqrt(27/root(9,3)),3)', 'Rational(7,6)'],
    steps: [
      { t: r`Todo en base 3.`, m: r`27=3^3\qquad\sqrt[3]9=3^{2/3}` },
      { t: r`Cociente: resto exponentes.`, m: r`\dfrac{3^3}{3^{2/3}}=3^{3-\frac23}=3^{7/3}` },
      { t: r`La raíz cuadrada multiplica el exponente por $\frac12$.`, m: r`\sqrt{3^{7/3}}=3^{7/6}` },
      { t: r`$\log_3 3^{7/6}=\dfrac76$.`, m: r`\log_3 3^{7/6}=\dfrac76` },
    ], res: r`\dfrac76` }),
  H({ id: 'hd-lo2', tag: 'Varias bases', q: r`\log_28+\log_3\dfrac19-\log_{\frac12}4`, chk: ['log(8,2)+log(Rational(1,9),3)-log(4,Rational(1,2))', '3'],
    steps: [
      { t: r`Calculo cada uno con la definición.`, m: [r`\log_28=3\ \ (2^3=8)`, r`\log_3\dfrac19=-2\ \ (3^{-2}=\tfrac19)`, r`\log_{1/2}4=-2\ \ \left(\left(\tfrac12\right)^{-2}=4\right)`] },
      { t: r`Sustituyo. Cuidado con el signo de la resta.`, m: r`3+(-2)-(-2)=3-2+2` },
    ], res: r`3` }),
  H({ id: 'hd-lo3', tag: 'Propiedades', q: r`\dfrac{\log8+\log125}{\log2+\log5}`, chk: ['(log(8)+log(125))/(log(2)+log(5))', '3'],
    steps: [
      { t: r`$8=2^3$ y $125=5^3$: el exponente baja delante.`, m: r`\log8=3\log2\qquad\log125=3\log5` },
      { t: r`Saco factor común 3 arriba.`, m: r`\dfrac{3\log2+3\log5}{\log2+\log5}=\dfrac{3(\log2+\log5)}{\log2+\log5}` },
      { t: r`Simplifico.`, m: r`3` },
    ], res: r`3` }),
  H({ id: 'hd-lo4', tag: 'Propiedad a^(log)', q: r`5^{\,1+\log_5 7}`, chk: ['5**(1+log(7,5))', '35'],
    steps: [
      { t: r`Separo la potencia: $a^{m+n}=a^m\cdot a^n$.`, m: r`5^{1+\log_57}=5^1\cdot5^{\log_57}` },
      { t: r`Propiedad: $a^{\log_a N}=N$ (elevar $a$ al exponente que da $N$).`, m: r`5^{\log_57}=7` },
    ], res: r`5\cdot7=35` }),
  H({ id: 'hd-lo5', tag: 'Ecuación', task: r`Resuelve $\log_2(x+1)+\log_2(x-1)=3$.`,
    steps: [
      { t: r`Suma de logaritmos con la misma base: logaritmo del **producto**.`, m: r`\log_2\big[(x+1)(x-1)\big]=3` },
      { t: r`Producto notable (suma por diferencia).`, m: r`\log_2(x^2-1)=3` },
      { t: r`Definición: $x^2-1=2^3$.`, m: r`x^2-1=8\ \Rightarrow\ x^2=9\ \Rightarrow\ x=\pm3` },
      { t: r`**Compruebo el dominio:** los argumentos tienen que ser positivos: $x+1>0$ y $x-1>0$, es decir, $x>1$.`, why: r`Por eso $x=-3$ no vale.` },
    ], resTxt: r`**Solución: $x=3$.** (Con $x=3$: $\log_24+\log_22=2+1=3$ ✔️)` }),
  H({ id: 'hd-lo6', tag: 'Ecuación', task: r`Resuelve $2\log x-\log(x-2)=\log 8$.`,
    steps: [
      { t: r`El 2 delante pasa a exponente. Resta → cociente.`, m: r`\log\dfrac{x^2}{x-2}=\log8` },
      { t: r`Si los logaritmos son iguales, los argumentos también.`, m: r`\dfrac{x^2}{x-2}=8\ \Rightarrow\ x^2=8x-16` },
      { t: r`Paso todo a un lado: es un cuadrado perfecto.`, m: r`x^2-8x+16=0\ \Rightarrow\ (x-4)^2=0\ \Rightarrow\ x=4` },
      { t: r`Dominio: $x>0$ y $x-2>0$. Con $x=4$ vale.`, m: r`2\log4-\log2=\log16-\log2=\log8\ \checkmark` },
    ], resTxt: r`**Solución: $x=4$.**` }),
  H({ id: 'hd-lo7', tag: 'Con datos literales', task: r`Si $\log_23=a$, expresa en función de $a$: $\log_218$ y $\log_2\sqrt{12}$.`, chk: ['log(sqrt(12),2)', '1+log(3,2)/2'],
    steps: [
      { t: r`$18=2\cdot3^2$.`, m: r`\log_218=\log_22+2\log_23=1+2a` },
      { t: r`$12=2^2\cdot3$ y la raíz baja $\frac12$.`, m: r`\log_2\sqrt{12}=\dfrac12\left(2\log_22+\log_23\right)=\dfrac12(2+a)` },
      { t: r`Reparto.`, m: r`\dfrac12(2+a)=1+\dfrac a2` },
    ], resTxt: r`$\log_218=1+2a$ y $\log_2\sqrt{12}=1+\dfrac a2$.` }),
  H({ id: 'hd-lo8', tag: 'Ecuación exponencial', task: r`Resuelve $2^{x+1}=5^{x}$.`, chk: ['2**(log(2)/(log(5)-log(2))+1)', '5**(log(2)/(log(5)-log(2)))'],
    steps: [
      { t: r`Las bases son distintas: tomo logaritmos (el exponente baja).`, m: r`(x+1)\log2=x\log5` },
      { t: r`Reparto y agrupo las $x$.`, m: r`x\log2+\log2=x\log5\ \Rightarrow\ \log2=x(\log5-\log2)` },
      { t: r`Despejo $x$.`, m: r`x=\dfrac{\log2}{\log5-\log2}=\dfrac{0{,}3010}{0{,}3979}` },
    ], resTxt: r`$x\approx0{,}756$` }),
  H({ id: 'hd-lo9', tag: 'Demostración', task: r`Demuestra que $\log_ab\cdot\log_ba=1$.`, chk: ['log(b,a)*log(a,b)', '1'],
    steps: [
      { t: r`Cambio de base a una base cualquiera, por ejemplo la neperiana.`, m: r`\log_ab=\dfrac{\ln b}{\ln a}\qquad\log_ba=\dfrac{\ln a}{\ln b}` },
      { t: r`Multiplico: se cancelan.`, m: r`\dfrac{\ln b}{\ln a}\cdot\dfrac{\ln a}{\ln b}=1` },
    ], resTxt: r`Demostrado. ✔️` }),
  H({ id: 'hd-lo10', tag: 'Clasifica', q: r`\log_232-\sqrt{25}`, chk: ['log(32,2)-sqrt(25)', '0'],
    steps: [
      { t: r`$\log_232=5$ (porque $2^5=32$) y $\sqrt{25}=5$.`, m: r`5-5=0` },
    ], resTxt: r`Vale $0$: **entero** (no natural), racional y real.` }),
  H({ id: 'hd-lo11', tag: 'Clasifica', q: r`\sqrt{\log_381}`, chk: ['sqrt(log(81,3))', '2'],
    steps: [
      { t: r`$\log_381=4$ (porque $3^4=81$).`, m: r`\sqrt{\log_381}=\sqrt4` },
      { t: r`Raíz.`, m: r`\sqrt4=2` },
    ], resTxt: r`Vale $2$: **natural**.` }),
]);

export const hard = {
  reales, desigualdades: desig, 'valor-absoluto': abs, intervalos: interv, aproximaciones: aprox,
  notacion: nota, radicales: radic, potencias: pot, logaritmos: logs,
};
