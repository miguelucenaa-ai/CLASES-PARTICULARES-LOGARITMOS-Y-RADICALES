import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, figure } from '../lib.mjs';
const r = String.raw;

const def = {
  id: 'not-def', jump: 'Qué es', h: 'Notación científica', kind: 'intro',
  body: [
    p(r`Para trabajar con números **muy grandes o muy pequeños** (distancias en el espacio, tamaño de los átomos...) se usa la **notación científica**: un número con **una sola cifra entera distinta de cero**, multiplicado por una **potencia de 10**.`),
    formula(r`\hl{a}\cdot10^{\hb{n}}\qquad\text{con }1\le|\hl{a}|<10\text{ y }\hb{n}\text{ entero}`, true),
    p(r`$\hl{a}$ (rojo) tiene **una cifra entera** (de 1 a 9) y el resto son decimales. $\hb{n}$ (azul) es el **exponente**.`, 'center muted'),
    cards([
      { t: 'Número grande → exponente positivo', m: r`150\,000\,000\ \text{km}=1{,}5\cdot10^{8}\ \text{km}` },
      { t: 'Número pequeño → exponente negativo', m: r`0{,}00000091=9{,}1\cdot10^{-7}` },
    ]),
    p(r`**Ejemplos del colegio:** la distancia media del Sol a la Tierra es $150\,000\,000\ \text{km}=1{,}5\cdot10^{8}\ \text{km}=1{,}5\cdot10^{11}\ \text{m}$. La masa del electrón es $9{,}1\cdot10^{-31}\ \text{kg}=9{,}1\cdot10^{-28}\ \text{g}$.`),
    recipe('Receta: pasar a notación científica', [
      r`**Mueve la coma** hasta dejar **una sola cifra entera distinta de cero**.`,
      r`**Cuenta** cuántos lugares has movido la coma: ese es el valor del exponente.`,
      r`Si el número era **grande** (moviste la coma a la izquierda), el exponente es **positivo**. Si era **pequeño** (a la derecha), **negativo**.`,
      r`Escribe $a\cdot10^{n}$.`,
    ]),
    grid([
      ex({ id: 'not-1', example: true, tag: 'Número grande', q: r`72\,000`, chk: ['72000', 'Rational(72,10)*10**4'],
        steps: [
          { t: r`La coma está al final: $72\,000{,}$. La muevo **hacia la izquierda** hasta dejar una cifra entera: $7{,}2000$.`, m: r`72000{,}\ \to\ 7{,}2000` },
          { t: r`He movido la coma **4 lugares** a la izquierda: exponente $+4$.`, m: r`72\,000=7{,}2\cdot10^{4}` },
        ], res: r`7{,}2\cdot10^{4}` }),
      ex({ id: 'not-2', example: true, tag: 'Número pequeño', q: r`0{,}00045`, chk: ['Rational(45,100000)', '45*10**(-1)/10**4'],
        steps: [
          { t: r`Muevo la coma **hacia la derecha** hasta dejar una cifra entera distinta de cero: $4{,}5$.`, m: r`0{,}00045\ \to\ 4{,}5` },
          { t: r`He movido la coma **4 lugares** a la derecha: exponente $-4$.`, m: r`0{,}00045=4{,}5\cdot10^{-4}` },
        ], res: r`4{,}5\cdot10^{-4}` }),
      ex({ id: 'not-3', example: true, tag: 'Al revés', q: r`3{,}4\cdot10^{5}`, chk: ['Rational(34,10)*10**5', '340000'],
        steps: [
          { t: r`Exponente $+5$: muevo la coma **5 lugares a la derecha** (añado ceros).`, m: r`3{,}4\cdot10^{5}=340\,000` },
        ], res: r`340\,000` }),
      ex({ id: 'not-4', example: true, tag: 'Al revés', q: r`6{,}1\cdot10^{-3}`, chk: ['Rational(61,10)*10**(-3)', 'Rational(61,10000)'],
        steps: [
          { t: r`Exponente $-3$: muevo la coma **3 lugares a la izquierda** (añado ceros).`, m: r`6{,}1\cdot10^{-3}=0{,}0061` },
        ], res: r`0{,}0061` }),
      ex({ id: 'not-5', example: true, tag: 'Normalizar', q: r`25\cdot10^{3}`, chk: ['25*10**3', 'Rational(25,10)*10**4'],
        steps: [
          { t: r`$25$ tiene **dos** cifras enteras: no está en notación científica.`, m: r`25=2{,}5\cdot10` },
          { t: r`Junto las potencias de 10 ($10\cdot10^3=10^4$).`, m: r`25\cdot10^{3}=2{,}5\cdot10\cdot10^{3}=2{,}5\cdot10^{4}` },
        ], res: r`2{,}5\cdot10^{4}` }),
      ex({ id: 'not-6', example: true, tag: 'Normalizar', q: r`0{,}3\cdot10^{-2}`, chk: ['Rational(3,10)*10**(-2)', '3*10**(-3)'],
        steps: [
          { t: r`$0{,}3$ no tiene cifra entera: $0{,}3=3\cdot10^{-1}$.`, m: r`0{,}3=3\cdot10^{-1}` },
          { t: r`Junto: se **suman** los exponentes $-1+(-2)=-3$.`, m: r`0{,}3\cdot10^{-2}=3\cdot10^{-1}\cdot10^{-2}=3\cdot10^{-3}` },
        ], res: r`3\cdot10^{-3}` }),
    ]),
  ],
};

const op = {
  id: 'not-op', jump: 'Operaciones', h: 'Operar con notación científica', kind: 'intro',
  body: [
    p(r`Se opera con las **potencias de 10** igual que con cualquier potencia, y con los números de delante normalmente.`),
    props([
      { h: 'Producto', m: r`(a\cdot10^{m})(b\cdot10^{n})=(a\cdot b)\cdot10^{m+n}`, why: 'Multiplicas los números y **sumas** los exponentes.' },
      { h: 'Cociente', m: r`\dfrac{a\cdot10^{m}}{b\cdot10^{n}}=\dfrac{a}{b}\cdot10^{m-n}`, why: 'Divides los números y **restas** los exponentes.' },
      { h: 'Suma y resta', m: r`a\cdot10^{m}+b\cdot10^{m}=(a+b)\cdot10^{m}`, why: 'Primero hay que tener **el mismo exponente**; luego se suman los números y el exponente se queda.' },
    ], 'three'),
    tip(r`Al final, **revisa** que el resultado esté en notación científica (una cifra entera entre 1 y 9). Si no, ajústalo.`),
    grid([
      ex({ id: 'not-o1', example: true, tag: 'Producto', q: r`(3\cdot10^{5})\cdot(2\cdot10^{-3})`, chk: ['3*10**5*2*10**(-3)', '6*10**2'],
        steps: [
          { t: r`Multiplico los números y sumo los exponentes: $5+(-3)=2$.`, m: r`(3\cdot2)\cdot10^{5+(-3)}` },
          { t: r`Calculo.`, m: r`6\cdot10^{2}` },
        ], res: r`6\cdot10^{2}` }),
      ex({ id: 'not-o2', example: true, tag: 'Producto (hay que ajustar)', q: r`(8\cdot10^{4})\cdot(5\cdot10^{3})`, chk: ['8*10**4*5*10**3', '4*10**8'],
        steps: [
          { t: r`Multiplico los números y sumo los exponentes.`, m: r`(8\cdot5)\cdot10^{4+3}=40\cdot10^{7}` },
          { t: r`$40$ tiene dos cifras enteras: $40=4\cdot10$.`, m: r`40\cdot10^{7}=4\cdot10\cdot10^{7}=4\cdot10^{8}` },
        ], res: r`4\cdot10^{8}` }),
      ex({ id: 'not-o3', example: true, tag: 'Cociente', q: r`\dfrac{4{,}5\cdot10^{6}}{1{,}5\cdot10^{-2}}`, chk: ['(Rational(45,10)*10**6)/(Rational(15,10)*10**(-2))', '3*10**8'],
        steps: [
          { t: r`Divido los números y **resto** los exponentes: $6-(-2)=8$.`, m: r`\dfrac{4{,}5}{1{,}5}\cdot10^{6-(-2)}` },
          { t: r`Calculo.`, m: r`3\cdot10^{8}` },
        ], res: r`3\cdot10^{8}` }),
      ex({ id: 'not-o4', example: true, tag: 'Suma', q: r`2{,}5\cdot10^{4}+3\cdot10^{3}`, chk: ['Rational(25,10)*10**4+3*10**3', 'Rational(28,10)*10**4'],
        steps: [
          { t: r`Para sumar necesito el **mismo exponente**. Paso el segundo a $10^4$: $3\cdot10^3=0{,}3\cdot10^4$.`, m: r`3\cdot10^{3}=0{,}3\cdot10^{4}` },
          { t: r`Ahora sumo los números y dejo el exponente.`, m: r`2{,}5\cdot10^{4}+0{,}3\cdot10^{4}=(2{,}5+0{,}3)\cdot10^{4}=2{,}8\cdot10^{4}` },
        ], res: r`2{,}8\cdot10^{4}` }),
    ]),
    sub('Un problema'),
    grid([
      ex({ id: 'not-pr1', example: true, tag: 'Problema', task: r`La luz viaja a $3\cdot10^{8}$ m/s y el Sol está a $1{,}5\cdot10^{11}$ m. ¿Cuánto tarda la luz del Sol en llegar a la Tierra?`, chk: ['(Rational(15,10)*10**11)/(3*10**8)', '500'],
        steps: [
          { t: r`$\text{tiempo}=\dfrac{\text{distancia}}{\text{velocidad}}$.`, m: r`t=\dfrac{1{,}5\cdot10^{11}}{3\cdot10^{8}}` },
          { t: r`Divido los números y resto los exponentes.`, m: r`t=0{,}5\cdot10^{11-8}=0{,}5\cdot10^{3}` },
          { t: r`Normalizo: $0{,}5=5\cdot10^{-1}$.`, m: r`t=5\cdot10^{2}\ \text{s}=500\ \text{s}` },
          { t: r`En minutos: $500\div60$.`, m: r`\approx8{,}3\ \text{minutos}` },
        ], resTxt: r`$t=5\cdot10^{2}$ s $\approx 8{,}3$ minutos.` }),
    ]),
    sub('Practica'),
    grid([
      ex({ id: 'not-pp1', tag: 'Pasa a notación científica', q: r`530\,000\,000`, chk: ['530000000', 'Rational(53,10)*10**8'],
        steps: [{ t: r`Muevo la coma 8 lugares a la izquierda: $5{,}3$.`, m: r`530\,000\,000=5{,}3\cdot10^{8}` }], res: r`5{,}3\cdot10^{8}` }),
      ex({ id: 'not-pp2', tag: 'Pasa a notación científica', q: r`0{,}0000032`, chk: ['Rational(32,10000000)', 'Rational(32,10)*10**(-6)'],
        steps: [{ t: r`Muevo la coma 6 lugares a la derecha: $3{,}2$.`, m: r`0{,}0000032=3{,}2\cdot10^{-6}` }], res: r`3{,}2\cdot10^{-6}` }),
      ex({ id: 'not-pp3', tag: 'Opera', q: r`(2{,}4\cdot10^{-3})\cdot(5\cdot10^{6})`, chk: ['Rational(24,10)*10**(-3)*5*10**6', '12*10**3'],
        steps: [
          { t: r`Multiplico números y sumo exponentes.`, m: r`(2{,}4\cdot5)\cdot10^{-3+6}=12\cdot10^{3}` },
          { t: r`Normalizo: $12=1{,}2\cdot10$.`, m: r`12\cdot10^{3}=1{,}2\cdot10^{4}` },
        ], res: r`1{,}2\cdot10^{4}` }),
      ex({ id: 'not-pp4', tag: 'Opera', q: r`\dfrac{9\cdot10^{-2}}{3\cdot10^{-5}}`, chk: ['(9*10**(-2))/(3*10**(-5))', '3*10**3'],
        steps: [
          { t: r`Divido y resto exponentes: $-2-(-5)=3$.`, m: r`\dfrac{9}{3}\cdot10^{-2-(-5)}=3\cdot10^{3}` },
        ], res: r`3\cdot10^{3}` }),
      ex({ id: 'not-pp5', tag: 'Problema', task: r`Un átomo mide $1\cdot10^{-10}$ m. ¿Cuántos átomos en fila caben en 1 mm ($=10^{-3}$ m)?`, chk: ['10**(-3)/10**(-10)', '10**7'],
        steps: [
          { t: r`Divido la longitud total entre el tamaño de un átomo.`, m: r`\dfrac{10^{-3}}{10^{-10}}=10^{-3-(-10)}=10^{7}` },
        ], resTxt: r`Caben $10^{7}$ átomos, es decir, **diez millones**.` }),
    ]),
  ],
};

const err = {
  id: 'not-err', jump: 'Errores típicos', h: 'Errores típicos', kind: 'errors',
  body: [
    errs([
      { t: r`**No normalizar el resultado.**`, m: r`12\cdot10^{5}\ \text{✗}`, ok: r`El número de delante debe estar **entre 1 y 10**: $12\cdot10^5=1{,}2\cdot10^{6}$.` },
      { t: r`**Signo del exponente al revés.**`, m: r`0{,}0007=7\cdot10^{4}\ \text{✗}`, ok: r`Número **pequeño** → exponente **negativo**: $0{,}0007=7\cdot10^{-4}$.` },
      { t: r`**Sumar los exponentes al sumar números.**`, m: r`3\cdot10^{4}+2\cdot10^{3}=5\cdot10^{7}\ \text{✗}`, ok: r`Para sumar hay que igualar exponentes: $30\,000+2\,000=32\,000=3{,}2\cdot10^{4}$.` },
      { t: r`**Contar mal los lugares de la coma.**`, ok: r`Comprueba al final: ¿$a\cdot10^n$ vuelve a darme el número de partida?` },
    ]),
  ],
};

export default {
  id: 'notacion', num: 7, cls: 'p7', tab: 'Notación científica', title: '7. Notación científica',
  lead: 'Escribir y operar con números muy grandes o muy pequeños.',
  color: ['#a1308f', '#f9e7f6', '#e8c0e1'],
  sections: [def, op, err],
};
