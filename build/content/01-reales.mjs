import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, figure } from '../lib.mjs';
import { venn } from '../svg.mjs';
const r = String.raw;

const conj = {
  id: 'rea-conj', jump: 'Conjuntos numéricos', h: 'Los conjuntos de números', kind: 'intro',
  body: [
    p(r`Los números se agrupan en **conjuntos**, cada uno dentro del siguiente. Conviene saber a cuál pertenece cada número.`),
    figure(venn(), r`$\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}$ y los irracionales $\mathbb{I}$ completan $\mathbb{R}$ (los racionales y los irracionales **no se solapan**).`),
    cards([
      { t: r`Naturales ℕ`, m: r`\mathbb{N}=\{1,2,3,\dots\}`, p: 'Se pueden sumar y multiplicar, pero no siempre restar o dividir.' },
      { t: r`Enteros ℤ`, m: r`\mathbb{Z}=\{\dots,-2,-1,0,1,2,\dots\}`, p: 'Se pueden sumar, multiplicar y restar, pero no siempre dividir.' },
      { t: r`Racionales ℚ`, m: r`\mathbb{Q}=\left\{\dfrac{m}{n}: m\in\mathbb{Z},\ n\in\mathbb{Z},\ n\neq0\right\}`, p: r`Las fracciones de enteros (los enteros también son fracciones: $3=\frac{3}{1}$).` },
      { t: r`Irracionales 𝕀`, p: r`Su expresión decimal es **ilimitada y no periódica**: $\sqrt2=1{,}41421356\ldots$, $\pi=3{,}14159\ldots$, $e=2{,}71828\ldots$` },
    ]),
    key(r`Los **reales** $\mathbb{R}$ son la unión de racionales e irracionales.`, 'Recuerda:'),
    formula(r`\mathbb{N}\subset\mathbb{Z}\subset\mathbb{Q}\subset\mathbb{R}\qquad\mathbb{I}\subset\mathbb{R}`, true),
    sub('¿A qué conjunto pertenece cada número?'),
    table(['Número', 'ℕ', 'ℤ', 'ℚ', '𝕀', 'ℝ'], [
      [r`$7$`, '✓', '✓', '✓', '', '✓'],
      [r`$-3$`, '', '✓', '✓', '', '✓'],
      [r`$0$`, '', '✓', '✓', '', '✓'],
      [r`$\sqrt{9}=3$`, '✓', '✓', '✓', '', '✓'],
      [r`$\dfrac52=2{,}5$`, '', '', '✓', '', '✓'],
      [r`$0{,}\overline{3}$`, '', '', '✓', '', '✓'],
      [r`$\sqrt{2}$`, '', '', '', '✓', '✓'],
      [r`$\pi$`, '', '', '', '✓', '✓'],
      [r`$\sqrt[3]{5}$`, '', '', '', '✓', '✓'],
    ]),
    recipe('Receta: clasificar un número', [
      r`**Simplifica** primero: $\sqrt{9}=3$, $\frac{12}{4}=3$...`,
      r`¿Es un **decimal exacto**, **periódico** o una **fracción**? Entonces es **racional** ℚ.`,
      r`¿Tiene **infinitas cifras sin repetir**, o es una **raíz no exacta**, o $\pi$, $e$...? Entonces es **irracional** 𝕀.`,
      r`Si es racional: ¿es un número **entero**? → ℤ. ¿Y además **positivo**? → ℕ.`,
    ]),
    tip(r`En este tema (como en tus apuntes) ℕ empieza en el 1, así que el **0 es entero pero no natural**.`),
  ],
};

const dec = {
  id: 'rea-dec', jump: 'Expresión decimal', h: 'Expresión decimal de un número racional', kind: 'intro',
  body: [
    p(r`Todo racional se puede escribir como decimal: basta **dividir el numerador entre el denominador**. El resultado puede ser de tres tipos:`),
    cards([
      { t: 'Decimal exacto', p: 'Tiene un número **finito** de cifras decimales.', m: r`\dfrac{121}{5}=24{,}2` },
      { t: 'Periódico puro', p: 'Las cifras que se repiten empiezan **justo después de la coma**.', m: r`\dfrac{101}{11}=9{,}\overline{18}` },
      { t: 'Periódico mixto', p: 'Entre la coma y el período hay cifras que **no** se repiten (anteperíodo).', m: r`\dfrac{359}{150}=2{,}39\overline{3}` },
    ], 'three'),
    table(['Número', 'Parte entera', 'Anteperíodo', 'Período'], [
      [r`$24{,}2$`, '24', '—', '—'],
      [r`$9{,}\overline{18}$`, '9', '— (no tiene)', '18'],
      [r`$2{,}39\overline{3}$`, '2', '39', '3'],
    ]),
    key(r`Una fracción **irreducible** da un decimal **exacto** si el denominador solo tiene los factores $2$ y $5$ (por ejemplo $\frac{7}{8}$, $\frac{3}{20}$). Si no, es **periódico**.`, 'Truco para saber el tipo sin dividir:'),
    grid([
      ex({ id: 'rea-d1', example: true, tag: 'Ejemplo', task: r`¿De qué tipo es el decimal de $\dfrac{5}{6}$?`, chk: ['Rational(5,6)', '0+Rational(8,10)+Rational(1,30)'],
        steps: [
          { t: r`Miro el denominador: $6=2\cdot3$. Tiene un 3, así que **no** será exacto.`, m: r`6=2\cdot3` },
          { t: r`Divido: $5\div6=0{,}8333\ldots$ El 8 no se repite y el 3 sí.`, m: r`\dfrac56=0{,}8\overline{3}` },
        ], resTxt: r`Periódico **mixto**: anteperíodo $8$, período $3$.` }),
      ex({ id: 'rea-d2', example: true, tag: 'Ejemplo', task: r`¿Y el de $\dfrac{3}{20}$?`, chk: ['Rational(3,20)', 'Rational(15,100)'],
        steps: [
          { t: r`$20=2^2\cdot5$: solo factores 2 y 5, así que es **exacto**.`, m: r`20=2^2\cdot5` },
          { t: r`Divido.`, m: r`\dfrac{3}{20}=0{,}15` },
        ], resTxt: r`Decimal **exacto**: $0{,}15$.` }),
    ]),
  ],
};

const gen = {
  id: 'rea-gen', jump: 'Fracción generatriz', h: 'Fracción generatriz', kind: 'intro',
  body: [
    p(r`La **fracción generatriz** es la fracción que da origen a un decimal. Todo decimal exacto o periódico tiene una, y por eso es un número racional.`),
    sub('Las reglas de tus apuntes (la forma rápida)'),
    cards([
      { t: 'Exacto', p: r`**Arriba:** el número sin coma. **Abajo:** un 1 y tantos ceros como cifras decimales.`, m: r`24{,}2=\dfrac{242}{10}=\dfrac{121}{5}` },
      { t: 'Periódico puro', p: r`**Arriba:** (el número hasta el final del primer período) menos (la parte entera). **Abajo:** tantos 9 como cifras tiene el período.`, m: r`9{,}\overline{18}=\dfrac{918-9}{99}=\dfrac{101}{11}` },
      { t: 'Periódico mixto', p: r`**Arriba:** (el número hasta el final del primer período) menos (el número hasta el final del anteperíodo). **Abajo:** tantos 9 como cifras del período, seguidos de tantos 0 como cifras del anteperíodo.`, m: r`2{,}39\overline{3}=\dfrac{2393-239}{900}=\dfrac{359}{150}` },
    ], 'three'),
    p(r`Con la regla lo haces en una línea. Los ejemplos de abajo te enseñan **por qué funciona** (multiplicar y restar), que te sirve si se te olvida la regla.`, 'muted'),
    sub('1. Decimal exacto'),
    recipe('Receta: decimal exacto', [
      r`**Numerador:** las cifras del número, **sin la coma**.`,
      r`**Denominador:** un $1$ seguido de **tantos ceros como cifras decimales**.`,
      r`**Simplifica** la fracción.`,
    ]),
    grid([
      ex({ id: 'rea-g1', example: true, tag: 'Ejemplo del colegio', q: r`24{,}2`, chk: ['Rational(242,10)', 'Rational(121,5)'],
        steps: [
          { t: r`Una cifra decimal: denominador $10$. Numerador: $242$.`, m: r`24{,}2=\dfrac{242}{10}` },
          { t: r`Simplifico entre 2.`, m: r`\dfrac{242}{10}=\dfrac{121}{5}` },
        ], res: r`\dfrac{121}{5}` }),
    ]),
    sub('2. Decimal periódico puro'),
    p(r`La idea es **multiplicar por una potencia de 10 para que la parte periódica se "mueva"** y al restar desaparezca.`),
    recipe('Receta: periódico puro', [
      r`Llama $N$ al número. Si el período tiene $m$ cifras, calcula $10^m\cdot N$.`,
      r`**Resta** $10^m N-N$: las cifras repetidas se cancelan.`,
      r`Despeja $N$. (Es "el número con período menos la parte entera, entre tantos nueves como cifras tiene el período".)`,
    ]),
    grid([
      ex({ id: 'rea-g2', example: true, tag: 'Ejemplo del colegio', q: r`9{,}\overline{18}`, chk: ['9+Rational(18,99)', 'Rational(101,11)'],
        steps: [
          { t: r`Llamo $N$ al número. El período ($18$) tiene 2 cifras: multiplico por $10^2=100$.`, m: [r`N=9{,}181818\ldots`, r`100N=918{,}181818\ldots`] },
          { t: r`Resto las dos igualdades: la parte periódica se cancela.`, why: r`Después de la coma queda $0{,}1818\ldots-0{,}1818\ldots=0$.`, m: r`100N-N=918{,}1818\ldots-9{,}1818\ldots=909` },
          { t: r`Despejo $N$: $99N=909$.`, m: r`N=\dfrac{909}{99}` },
          { t: r`Simplifico dividiendo entre 9.`, m: r`\dfrac{909}{99}=\dfrac{101}{11}` },
        ], res: r`\dfrac{101}{11}` }),
    ]),
    sub('3. Decimal periódico mixto'),
    recipe('Receta: periódico mixto', [
      r`Multiplica por $10$ elevado a (**cifras del anteperíodo + período**) para llevar **el primer período** a la izquierda de la coma.`,
      r`Multiplica por $10$ elevado a (**cifras del anteperíodo**) para dejar **justo antes** del período.`,
      r`**Resta** las dos: el período se cancela. Despeja $N$.`,
    ]),
    grid([
      ex({ id: 'rea-g3', example: true, tag: 'Ejemplo del colegio', q: r`2{,}39\overline{3}`, chk: ['2+Rational(39,100)+Rational(3,900)', 'Rational(359,150)'],
        steps: [
          { t: r`Anteperíodo: $39$ (2 cifras). Período: $3$ (1 cifra). Escribo el número alargado.`, m: r`N=2{,}39333\ldots` },
          { t: r`Multiplico por $10^{3}=1000$ (anteperíodo + período = 3 cifras): el primer 3 pasa a la izquierda de la coma.`, m: r`1000N=2393{,}333\ldots` },
          { t: r`Multiplico por $10^{2}=100$ (anteperíodo = 2 cifras): la coma queda justo antes del período.`, m: r`100N=239{,}333\ldots` },
          { t: r`Resto: los $0{,}333\ldots$ se cancelan.`, m: r`1000N-100N=2393-239=2154\ \Rightarrow\ 900N=2154` },
          { t: r`Despejo y simplifico (entre 6).`, m: r`N=\dfrac{2154}{900}=\dfrac{359}{150}` },
        ], res: r`\dfrac{359}{150}` }),
    ]),
    sub('Practica'),
    grid([
      ex({ id: 'rea-gp1', tag: 'Exacto', q: r`0{,}75`, chk: ['Rational(75,100)', 'Rational(3,4)'],
        steps: [{ t: r`Dos decimales: denominador $100$.`, m: r`\dfrac{75}{100}=\dfrac34` }], res: r`\dfrac34` }),
      ex({ id: 'rea-gp2', tag: 'Puro', q: r`3{,}\overline{6}`, chk: ['3+Rational(6,9)', 'Rational(11,3)'],
        steps: [
          { t: r`Período de 1 cifra: multiplico por 10 y resto.`, m: [r`N=3{,}666\ldots`, r`10N=36{,}666\ldots`] },
          { t: r`$10N-N=36-3$.`, m: r`9N=33\ \Rightarrow\ N=\dfrac{33}{9}=\dfrac{11}{3}` },
        ], res: r`\dfrac{11}{3}` }),
      ex({ id: 'rea-gp3', tag: 'Puro', q: r`0{,}\overline{27}`, chk: ['Rational(27,99)', 'Rational(3,11)'],
        steps: [
          { t: r`Período de 2 cifras: multiplico por 100.`, m: [r`N=0{,}2727\ldots`, r`100N=27{,}2727\ldots`] },
          { t: r`$100N-N=27-0$.`, m: r`99N=27\ \Rightarrow\ N=\dfrac{27}{99}=\dfrac{3}{11}` },
        ], res: r`\dfrac{3}{11}` }),
      ex({ id: 'rea-gp4', tag: 'Mixto', q: r`1{,}2\overline{3}`, chk: ['1+Rational(2,10)+Rational(3,90)', 'Rational(37,30)'],
        steps: [
          { t: r`Anteperíodo $2$ (1 cifra), período $3$ (1 cifra). Multiplico por $10^2$ y por $10^1$.`, m: [r`100N=123{,}333\ldots`, r`10N=12{,}333\ldots`] },
          { t: r`Resto: $123-12=111$.`, m: r`90N=111\ \Rightarrow\ N=\dfrac{111}{90}=\dfrac{37}{30}` },
        ], res: r`\dfrac{37}{30}` }),
      ex({ id: 'rea-gp5', tag: 'Mixto', q: r`5{,}0\overline{4}`, chk: ['5+Rational(4,90)', 'Rational(227,45)'],
        steps: [
          { t: r`Anteperíodo $0$ (1 cifra), período $4$ (1 cifra).`, m: [r`100N=504{,}444\ldots`, r`10N=50{,}444\ldots`] },
          { t: r`Resto: $504-50=454$.`, m: r`90N=454\ \Rightarrow\ N=\dfrac{454}{90}=\dfrac{227}{45}` },
        ], res: r`\dfrac{227}{45}` }),
      ex({ id: 'rea-gp6', tag: 'Sorpresa', q: r`0{,}\overline{9}`, chk: ['Rational(9,9)', '1'],
        steps: [
          { t: r`Período $9$: multiplico por 10 y resto.`, m: [r`N=0{,}999\ldots`, r`10N=9{,}999\ldots`] },
          { t: r`$10N-N=9$.`, m: r`9N=9\ \Rightarrow\ N=1` },
        ], res: r`1`, note: r`¡Sí! $0{,}\overline{9}$ y $1$ son **el mismo número**.` }),
    ]),
  ],
};

const prop = {
  id: 'rea-prop', jump: 'Propiedades', h: 'Propiedades de la suma y del producto', kind: 'props',
  body: [
    p(r`La suma y el producto de dos números reales es **siempre otro número real**. Y cumplen:`),
    props([
      { h: 'Suma: conmutativa', m: r`a+b=b+a`, why: 'El orden no importa.', ej: r`$3+5=5+3$` },
      { h: 'Suma: asociativa', m: r`a+(b+c)=(a+b)+c`, why: 'Da igual por dónde empieces.', ej: r`$2+(3+4)=(2+3)+4$` },
      { h: 'Suma: elemento neutro', m: r`a+0=a`, why: 'Sumar 0 no cambia nada.', ej: r`$7+0=7$` },
      { h: 'Suma: elemento opuesto', m: r`a+(-a)=0`, why: 'Cada número tiene un opuesto.', ej: r`$5+(-5)=0$` },
      { h: 'Producto: conmutativa', m: r`a\cdot b=b\cdot a`, why: 'El orden no importa.', ej: r`$3\cdot5=5\cdot3$` },
      { h: 'Producto: asociativa', m: r`a(bc)=(ab)c`, why: 'Da igual por dónde empieces.', ej: r`$2\cdot(3\cdot4)=(2\cdot3)\cdot4$` },
      { h: 'Producto: elemento neutro', m: r`1\cdot a=a`, why: 'Multiplicar por 1 no cambia nada.', ej: r`$1\cdot9=9$` },
      { h: 'Producto: elemento inverso', m: r`a\cdot\dfrac1a=1,\quad a\neq0`, why: 'Todo número salvo el 0 tiene inverso.', ej: r`$5\cdot\dfrac15=1$` },
      { h: 'Distributiva', m: r`a(b+c)=ab+ac`, why: 'El producto "reparte" sobre la suma.', ej: r`$3(2+4)=3\cdot2+3\cdot4=18$` },
    ]),
    tip(r`La distributiva funciona en los **dos sentidos**: multiplicar un paréntesis, o **sacar factor común**: $ab+ac=a(b+c)$.`),
  ],
};

const practica = {
  id: 'rea-prac', jump: 'Practica', h: 'Practica: clasifica y simplifica', kind: 'exercises',
  body: [
    p(r`Antes de clasificar, **simplifica**: muchas veces el número escondía otro más sencillo.`, 'intro'),
    grid([
      ex({ id: 'rea-c1', tag: 'Clasifica', q: r`\sqrt{49}`, chk: ['sqrt(49)', '7'],
        steps: [{ t: r`$49=7^2$, así que la raíz es exacta.`, m: r`\sqrt{49}=7` }],
        resTxt: r`Es el $7$: **natural**, y por tanto entero, racional y real.` }),
      ex({ id: 'rea-c2', tag: 'Clasifica', q: r`-\dfrac{12}{4}`, chk: ['-Rational(12,4)', '-3'],
        steps: [{ t: r`Simplifico la fracción.`, m: r`-\dfrac{12}{4}=-3` }],
        resTxt: r`Es el $-3$: **entero** (no natural), racional y real.` }),
      ex({ id: 'rea-c3', tag: 'Clasifica', q: r`\sqrt{2}\cdot\sqrt{8}`, chk: ['sqrt(2)*sqrt(8)', '4'],
        steps: [
          { t: r`Mismo índice: junto los radicandos.`, m: r`\sqrt{2}\cdot\sqrt{8}=\sqrt{16}` },
          { t: r`$16=4^2$.`, m: r`\sqrt{16}=4` },
        ], resTxt: r`Es el $4$: **natural**. Aunque $\sqrt2$ y $\sqrt8$ son irracionales, su producto no.` }),
      ex({ id: 'rea-c4', tag: 'Clasifica', q: r`0{,}1010010001\ldots`,
        steps: [{ t: r`Aparecen cada vez más ceros entre los unos: no hay ningún grupo de cifras que se repita.`, m: r`0{,}1\ 01\ 001\ 0001\ \ldots` }],
        resTxt: r`**Irracional** (decimal ilimitado y no periódico).` }),
      ex({ id: 'rea-c5', tag: 'Clasifica', q: r`\sqrt{3}+\sqrt{3}`, chk: ['sqrt(3)+sqrt(3)', '2*sqrt(3)'],
        steps: [{ t: r`Sumo radicales semejantes.`, m: r`\sqrt3+\sqrt3=2\sqrt3` }],
        resTxt: r`$2\sqrt{3}$ sigue siendo **irracional** (un racional por un irracional no nulo da irracional).` }),
    ]),
  ],
};

export default {
  id: 'reales', num: 1, cls: 'p1', tab: 'Números reales', title: '1. Números reales',
  lead: 'Conjuntos numéricos, expresión decimal, fracción generatriz y propiedades.',
  color: ['#0e6f8c', '#e3f3f8', '#b6dcea'],
  sections: [conj, dec, gen, prop, practica],
};
