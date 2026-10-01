import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, figure } from '../lib.mjs';
const r = String.raw;

const apr = {
  id: 'apr-def', jump: 'Aproximar', h: 'Aproximaciones', kind: 'intro',
  body: [
    p(r`Muchos racionales y **todos los irracionales** tienen infinitas cifras decimales, y no se puede operar con infinitas cifras. La solución es **aproximar**: sustituir el número por otro racional con un número **finito** de cifras.`),
    cards([
      { t: 'Por defecto', p: r`El número aproximado es **menor** que el real.` },
      { t: 'Por exceso', p: r`El número aproximado es **mayor** que el real.` },
    ]),
    sub('Dos formas de aproximar'),
    cards([
      { t: 'Truncamiento', p: r`Se **cortan** todas las cifras a partir de un lugar, sin mirar las que se quitan. Siempre es una aproximación **por defecto** (en positivos).` },
      { t: 'Redondeo', p: r`Se mira la **primera cifra que se quita**: si es **menor que 5**, el número queda igual (por defecto); si es **5 o más**, se **suma 1** a la última cifra que se queda (por exceso).` },
    ]),
    p(r`**Ejemplo del colegio:** aproximaciones de $\sqrt{3}=1{,}73205\ldots$ hasta las milésimas:`),
    table(['', 'Unidad', 'Décima', 'Centésima', 'Milésima'], [
      ['**Por defecto**', '1', r`$1{,}7$`, r`$1{,}73$`, r`$1{,}732$`],
      ['**Por exceso**', '2', r`$1{,}8$`, r`$1{,}74$`, r`$1{,}733$`],
    ]),
    recipe('Receta: redondear', [
      r`**Marca** hasta qué cifra te quedas (por ejemplo, "a las centésimas" = 2 decimales).`,
      r`Mira **la cifra siguiente**.`,
      r`Si es **0–4**: deja la última cifra como está. Si es **5–9**: súmale 1.`,
      r`Quita todo lo que sobra.`,
    ]),
    grid([
      ex({ id: 'apr-1', example: true, tag: 'Ejemplo', task: r`Redondea $\pi=3{,}14159265\ldots$ a las **centésimas** y a las **milésimas**.`,
        steps: [
          { t: r`**Centésimas** (2 decimales): me quedo con $3{,}14$. La siguiente cifra es $1$ (menor que 5): no cambia.`, m: r`3{,}14|159\ldots\ \Rightarrow\ 3{,}14` },
          { t: r`**Milésimas** (3 decimales): me quedo con $3{,}141$. La siguiente es $5$ (≥ 5): sumo 1 a la última.`, m: r`3{,}141|59\ldots\ \Rightarrow\ 3{,}142` },
        ], resTxt: r`$3{,}14$ (por defecto) y $3{,}142$ (por exceso).` }),
      ex({ id: 'apr-2', example: true, tag: 'Con arrastre', task: r`Redondea $4{,}997$ a las **décimas**.`,
        steps: [
          { t: r`Me quedo con $4{,}9$. La siguiente cifra es $9$ (≥ 5): sumo 1 a la última.`, m: r`4{,}9+0{,}1=5{,}0` },
        ], resTxt: r`$5{,}0$ (¡el 9 se "lleva" al 4!).` }),
    ]),
    sub('Practica'),
    grid([
      ex({ id: 'apr-p1', tag: 'Redondea', task: r`$2{,}71828\ldots$ a las décimas y a las centésimas.`,
        steps: [
          { t: r`Décimas: $2{,}7|1\ldots$, la siguiente es 1.`, m: r`2{,}7` },
          { t: r`Centésimas: $2{,}71|8\ldots$, la siguiente es 8: sumo 1.`, m: r`2{,}72` },
        ], resTxt: r`$2{,}7$ y $2{,}72$.` }),
      ex({ id: 'apr-p2', tag: 'Redondea', task: r`$0{,}04761$ a las centésimas.`,
        steps: [
          { t: r`Me quedo con $0{,}04$. La siguiente cifra es $7$: sumo 1.`, m: r`0{,}04+0{,}01=0{,}05` },
        ], resTxt: r`$0{,}05$.` }),
      ex({ id: 'apr-p3', tag: 'Trunca y redondea', task: r`$\sqrt{7}=2{,}6457513\ldots$ por **truncamiento** y por **redondeo** a las centésimas.`,
        steps: [
          { t: r`Truncar: corto en 2 decimales sin mirar más.`, m: r`2{,}64\ (\text{por defecto})` },
          { t: r`Redondear: tras el $4$ viene un $5$: sumo 1.`, m: r`2{,}65\ (\text{por exceso})` },
        ], resTxt: r`Truncamiento: $2{,}64$. Redondeo: $2{,}65$.` }),
    ]),
  ],
};

const err = {
  id: 'apr-err', jump: 'Error absoluto y relativo', h: 'Errores absoluto y relativo de una aproximación', kind: 'intro',
  body: [
    p(r`Al aproximar se comete un **error**. Se mide de dos formas:`),
    cards([
      { t: 'Error absoluto $E_a$', m: r`E_a=\left|\text{valor real}-\text{aproximación}\right|`, p: 'Cuánto te has equivocado, en las mismas unidades.' },
      { t: 'Error relativo $E_r$', m: r`E_r=\dfrac{E_a}{|\text{valor real}|}`, p: 'Cuánto te has equivocado **en proporción** al tamaño del número (se suele dar en %).' },
    ]),
    key(r`El error relativo dice **cómo de buena es la medida**: equivocarse $1$ cm midiendo $1$ m es mucho peor que equivocarse $1$ cm midiendo $100$ m.`, 'Para qué sirve el relativo:'),
    recipe('Receta: errores', [
      r`**Resta** el valor real y la aproximación y quédate con el **valor absoluto** (sin signo).`,
      r`Eso es el **error absoluto**.`,
      r`**Divídelo** entre el valor real: es el **error relativo**. Multiplica por 100 para tener el %.`,
    ]),
    grid([
      ex({ id: 'apr-e1', example: true, tag: 'Ejemplo del colegio', task: r`Error absoluto al aproximar $\sqrt{3}$ por $1{,}732$.`,
        steps: [
          { t: r`Resto el valor real y la aproximación. $\sqrt3=1{,}7320508\ldots$`, m: r`E_a=\left|\sqrt{3}-1{,}732\right|=\left|1{,}7320508\ldots-1{,}732\right|` },
          { t: r`Calculo la diferencia.`, m: r`E_a=0{,}0000508\ldots` },
        ], resTxt: r`$E_a\approx0{,}0000508$ (muy pequeño: es una buena aproximación).` }),
      ex({ id: 'apr-e2', example: true, tag: 'Error relativo', task: r`Se mide un objeto de $12{,}3$ cm y se anota $12$ cm. Calcula $E_a$ y $E_r$.`, chk: ['Abs(Rational(123,10)-12)/Rational(123,10)', 'Rational(1,41)'],
        steps: [
          { t: r`**Error absoluto:** resta con valor absoluto.`, m: r`E_a=|12{,}3-12|=0{,}3\ \text{cm}` },
          { t: r`**Error relativo:** divido entre el valor real.`, m: r`E_r=\dfrac{0{,}3}{12{,}3}=\dfrac{1}{41}\approx0{,}0244` },
          { t: r`Lo paso a porcentaje: $0{,}0244\cdot100$.`, m: r`E_r\approx2{,}44\,\%` },
        ], resTxt: r`$E_a=0{,}3$ cm y $E_r\approx2{,}44\,\%$.` }),
      ex({ id: 'apr-e3', example: true, tag: 'Comparar calidad', task: r`Se mide mal $1$ cm en una cuerda de $1$ m y en una de $100$ m. ¿En cuál es peor el error?`, chk: ['Rational(1,100)', 'Rational(1,100)'],
        steps: [
          { t: r`El error absoluto es el mismo: $1$ cm $=0{,}01$ m.`, m: r`E_a=0{,}01\ \text{m en ambos}` },
          { t: r`Error relativo en la cuerda de $1$ m.`, m: r`\dfrac{0{,}01}{1}=0{,}01=1\,\%` },
          { t: r`Error relativo en la de $100$ m.`, m: r`\dfrac{0{,}01}{100}=0{,}0001=0{,}01\,\%` },
        ], resTxt: r`Es **peor en la cuerda de 1 m** ($1\,\%$ frente a $0{,}01\,\%$).` }),
      ex({ id: 'apr-e4', example: true, tag: 'Con π', task: r`Calcula el error absoluto y relativo de aproximar $\pi$ por $\dfrac{22}{7}$.`,
        steps: [
          { t: r`$\frac{22}{7}=3{,}142857\ldots$ y $\pi=3{,}141592\ldots$`, m: r`E_a=\left|\pi-\dfrac{22}{7}\right|=|3{,}141592\ldots-3{,}142857\ldots|` },
          { t: r`Resto.`, m: r`E_a\approx0{,}00126` },
          { t: r`Divido entre $\pi$.`, m: r`E_r=\dfrac{0{,}00126}{3{,}14159}\approx0{,}0004=0{,}04\,\%` },
        ], resTxt: r`$E_a\approx0{,}00126$ y $E_r\approx0{,}04\,\%$.` }),
    ]),
    tip(r`**Cota de error al redondear:** si redondeas a la milésima, el error es **menor o igual que $0{,}0005$** (media unidad de la última cifra). Si truncas, el error es **menor que $0{,}001$** (una unidad entera de esa cifra).`),
  ],
};

const errs_ = {
  id: 'apr-errs', jump: 'Errores típicos', h: 'Errores típicos', kind: 'errors',
  body: [
    errs([
      { t: r`**Redondear mirando varias cifras de golpe.**`, m: r`2{,}3449\to2{,}35\ \text{✗}`, ok: r`A las centésimas solo mira **la siguiente cifra** (4): $2{,}34$.` },
      { t: r`**Olvidar el valor absoluto del error.**`, ok: r`El error absoluto **nunca** es negativo: $E_a=|\text{real}-\text{aprox.}|$.` },
      { t: r`**Confundir error absoluto y relativo.**`, ok: r`El absoluto lleva unidades (cm, m...). El relativo **no** lleva unidades y suele ir en %.` },
    ]),
  ],
};

export default {
  id: 'aproximaciones', num: 6, cls: 'p6', tab: 'Aproximaciones', title: '6. Aproximaciones y errores',
  lead: 'Redondeo, truncamiento, defecto y exceso, y errores absoluto y relativo.',
  color: ['#8a5a00', '#fbf0d9', '#ecd49a'],
  sections: [apr, err, errs_],
};
