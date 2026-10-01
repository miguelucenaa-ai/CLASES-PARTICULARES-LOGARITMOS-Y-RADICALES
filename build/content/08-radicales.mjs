import { p, key, tip, formula, sub, recipe, table, cards, props, errs, ex, grid, legacy } from '../lib.mjs';
const r = String.raw;

/* ---------- Raíz enésima ---------- */
const def = {
  id: 'rad-def', jump: 'Qué es una raíz', h: 'La raíz enésima', kind: 'intro',
  body: [
    p(r`La **raíz enésima** de un número $a$ es el número $b$ que, elevado a $n$, da $a$. Es la operación contraria a elevar a una potencia.`),
    formula(r`\sqrt[\hb{n}]{\hl{a}}=b\iff b^{\hb{n}}=\hl{a}`, true),
    p(r`$\hb{n}$ es el **índice** (azul) y $\hl{a}$ es el **radicando** (rojo). Si no se escribe índice, es 2: $\sqrt{a}=\sqrt[2]{a}$.`, 'center muted'),
    p(r`Por ejemplo, $\sqrt[3]{8}=2$ porque $2^3=8$, y $\sqrt{49}=7$ porque $7^2=49$.`),
    sub('¿Cuántas raíces tiene un número?'),
    table(['Índice', 'Radicando', 'Raíces reales', 'Ejemplo'], [
      ['impar', 'cualquiera', '**una**', r`$\sqrt[3]{-8}=-2$ porque $(-2)^3=-8$`],
      ['par', 'positivo', '**dos** (una positiva y su opuesta)', r`$x^2=9$ tiene $x=3$ y $x=-3$`],
      ['par', 'negativo', '**ninguna**', r`$\sqrt{-4}$ no es un número real`],
      ['cualquiera', 'cero', 'una: el 0', r`$\sqrt[5]{0}=0$`],
    ]),
    tip(r`Al escribir $\sqrt{9}$ se entiende la raíz positiva, $3$. Las **dos** soluciones de $x^2=9$ son $3$ y $-3$, y por eso se escribe $x=\pm3$.`),
    key(r`Si $\sqrt[n]{a}$ no es exacta (no sale un número entero ni una fracción), es un número **irracional**: $\sqrt{2}$, $\sqrt[3]{5}$... En cambio $\sqrt{9}=3$ es racional.`, 'Para la clasificación:'),
    sub('Cómo calcular una raíz exacta'),
    recipe('Receta: raíz exacta', [
      r`Descompón el radicando en **factores primos** (divide entre 2, 3, 5... hasta llegar a 1).`,
      r`Agrupa los factores en grupos de $n$ (el índice).`,
      r`Cada grupo completo sale de la raíz como **un solo** factor.`,
    ]),
    grid([
      ex({
        id: 'r-d1', example: true, tag: 'Ejemplo', q: r`\sqrt[3]{216}`, chk: ['root(216,3)', '6'],
        steps: [
          { t: r`Descompongo 216 en factores primos.`, why: r`Dividimos entre 2 mientras se pueda y después entre 3.`, m: [r`216=2\cdot108=2\cdot2\cdot54=2\cdot2\cdot2\cdot27`, r`216=2^3\cdot3^3`] },
          { t: r`Sustituyo en la raíz.`, m: r`\sqrt[3]{216}=\sqrt[3]{\hl{2^3}\cdot\hb{3^3}}` },
          { t: r`El índice es 3, así que cada cubo sale como un solo factor.`, why: r`Porque $\sqrt[3]{2^3}=2$ y $\sqrt[3]{3^3}=3$.`, m: r`\sqrt[3]{2^3\cdot3^3}=\hl{2}\cdot\hb{3}` },
        ],
        res: r`\sqrt[3]{216}=6`,
      }),
      ex({
        id: 'r-d2', example: true, tag: 'Ejemplo', q: r`\sqrt{144}`, chk: ['sqrt(144)', '12'],
        steps: [
          { t: r`Descompongo 144.`, m: r`144=2^4\cdot3^2` },
          { t: r`Índice 2: agrupo de dos en dos. $2^4=(2^2)^2$ y $3^2$ ya es un cuadrado.`, m: r`\sqrt{144}=\sqrt{(\hl{2^2})^2\cdot\hb{3^2}}` },
          { t: r`Cada cuadrado sale como un factor.`, m: r`\hl{2^2}\cdot\hb{3}=4\cdot3=12` },
        ],
        res: r`\sqrt{144}=12`,
      }),
    ]),
  ],
};

/* ---------- Propiedades ---------- */
const prop = {
  id: 'rad-prop', jump: 'Propiedades', h: 'Propiedades y operaciones con radicales', kind: 'props',
  body: [
    p(r`Todas valen para radicales **del mismo índice** (menos la última, que sirve justo para conseguirlo).`),
    props([
      { h: 'Producto', m: r`\sqrt[n]{a}\cdot\sqrt[n]{b}=\sqrt[n]{a\cdot b}`, why: 'Mismo índice: se juntan los radicandos multiplicando.', ej: r`$\sqrt{3}\cdot\sqrt{12}=\sqrt{36}=6$` },
      { h: 'Cociente', m: r`\frac{\sqrt[n]{a}}{\sqrt[n]{b}}=\sqrt[n]{\frac{a}{b}}`, why: 'Mismo índice: se juntan los radicandos dividiendo.', ej: r`$\dfrac{\sqrt{50}}{\sqrt{2}}=\sqrt{25}=5$` },
      { h: 'Potencia de un radical', m: r`\left(\sqrt[n]{a^{p}}\right)^{m}=\sqrt[n]{a^{p\cdot m}}`, why: 'El exponente de fuera se multiplica con el de dentro.', ej: r`$\left(\sqrt[3]{2}\right)^2=\sqrt[3]{2^2}=\sqrt[3]{4}$` },
      { h: 'Raíz de un radical', m: r`\sqrt[m]{\sqrt[n]{a}}=\sqrt[m\cdot n]{a}`, why: 'Se multiplican los índices.', ej: r`$\sqrt{\sqrt[3]{5}}=\sqrt[6]{5}$` },
    ]),
    sub('Ejemplos paso a paso'),
    grid([
      ex({
        id: 'r-p1', example: true, tag: 'Producto', q: r`\sqrt{2}\cdot\sqrt{18}`, chk: ['sqrt(2)*sqrt(18)', '6'],
        steps: [
          { t: r`Los dos radicales tienen el mismo índice (2): los junto en uno.`, why: r`Propiedad del producto: $\sqrt[n]{a}\cdot\sqrt[n]{b}=\sqrt[n]{a\cdot b}$.`, m: r`\sqrt{2}\cdot\sqrt{18}=\sqrt{\hl{2\cdot18}}` },
          { t: r`Multiplico lo de dentro.`, m: r`\sqrt{36}` },
          { t: r`$36=6^2$, así que la raíz sale exacta.`, m: r`\sqrt{6^2}=6` },
        ],
        res: r`6`,
      }),
      ex({
        id: 'r-p2', example: true, tag: 'Cociente', q: r`\dfrac{\sqrt[3]{54}}{\sqrt[3]{2}}`, chk: ['root(54,3)/root(2,3)', '3'],
        steps: [
          { t: r`Mismo índice (3): junto los radicandos dividiendo.`, m: r`\dfrac{\sqrt[3]{54}}{\sqrt[3]{2}}=\sqrt[3]{\dfrac{54}{2}}` },
          { t: r`Divido.`, m: r`\sqrt[3]{27}` },
          { t: r`$27=3^3$.`, m: r`\sqrt[3]{3^3}=3` },
        ],
        res: r`3`,
      }),
      ex({
        id: 'r-p3', example: true, tag: 'Raíz de un radical', q: r`\sqrt{\sqrt[3]{64}}`, chk: ['sqrt(root(64,3))', '2'],
        steps: [
          { t: r`Una raíz dentro de otra: multiplico los índices.`, why: r`$2\cdot3=6$.`, m: r`\sqrt{\sqrt[3]{64}}=\sqrt[\hl{6}]{64}` },
          { t: r`Descompongo 64.`, m: r`64=2^6` },
          { t: r`El índice 6 "deshace" el exponente 6.`, m: r`\sqrt[6]{2^6}=2` },
        ],
        res: r`2`,
      }),
      ex({
        id: 'r-p4', example: true, tag: 'Potencia y simplificar', q: r`\left(\sqrt[4]{3}\right)^2`, chk: ['root(3,4)**2', 'sqrt(3)'],
        steps: [
          { t: r`Meto el exponente 2 dentro del radical.`, m: r`\left(\sqrt[4]{3}\right)^2=\sqrt[4]{3^2}=\sqrt[4]{9}` },
          { t: r`Índice y exponente tienen un factor común (2): divido los dos entre 2.`, why: r`Si divides índice y exponente por el mismo número, el radical vale lo mismo.`, m: r`\sqrt[4]{3^{2}}=\sqrt[\hl{4div2}]{3^{\hl{2div2}}}=\sqrt{3}` },
        ],
        res: r`\sqrt{3}`,
      }),
    ]),
  ],
};

/* ---------- Común índice ---------- */
const comun = {
  id: 'rad-comun', jump: 'Común índice', h: 'Reducir a común índice', kind: 'intro',
  body: [
    p(r`Si los radicales tienen **distinto índice** no se pueden multiplicar, dividir ni comparar directamente. Antes hay que ponerles el mismo índice.`),
    key(r`Si multiplicas (o divides) el índice **y** el exponente del radicando por el mismo número natural, el radical vale lo mismo.`, 'Propiedad que lo permite:'),
    formula(r`\sqrt[n]{a^{p}}=\sqrt[n\cdot k]{a^{p\cdot k}}`, true),
    recipe('Receta: común índice', [
      r`Calcula el **mínimo común múltiplo (mcm)** de los índices. Ese será el nuevo índice.`,
      r`Para cada radical, calcula $k=\text{mcm}\div\text{su índice}$.`,
      r`Eleva el radicando de ese radical a $k$ y pon el nuevo índice.`,
    ]),
    grid([
      ex({
        id: 'r-c1', example: true, tag: 'Multiplicar', q: r`\sqrt{2}\cdot\sqrt[3]{3}`, chk: ['sqrt(2)*root(3,3)', 'root(72,6)'],
        steps: [
          { t: r`Índices 2 y 3. Su mcm es 6: ese será el índice común.`, m: r`\text{mcm}(2,3)=6` },
          { t: r`Al primero le falta multiplicar por $6\div2=3$; al segundo, por $6\div3=2$.`, m: [r`\sqrt{2}=\sqrt[2]{2^1}=\sqrt[6]{2^{\hl{3}}}=\sqrt[6]{8}`, r`\sqrt[3]{3}=\sqrt[3]{3^1}=\sqrt[6]{3^{\hb{2}}}=\sqrt[6]{9}`] },
          { t: r`Ya tienen el mismo índice: junto los radicandos.`, m: r`\sqrt[6]{8}\cdot\sqrt[6]{9}=\sqrt[6]{72}` },
        ],
        res: r`\sqrt[6]{72}`,
      }),
      ex({
        id: 'r-c2', example: true, tag: 'Dividir', q: r`\dfrac{\sqrt[3]{4}}{\sqrt{2}}`, chk: ['root(4,3)/sqrt(2)', 'root(2,6)'],
        steps: [
          { t: r`$\text{mcm}(3,2)=6$.`, m: r`\text{mcm}(3,2)=6` },
          { t: r`Numerador: $k=6\div3=2$. Denominador: $k=6\div2=3$.`, m: [r`\sqrt[3]{4}=\sqrt[6]{4^{\hl{2}}}=\sqrt[6]{16}`, r`\sqrt{2}=\sqrt[6]{2^{\hb{3}}}=\sqrt[6]{8}`] },
          { t: r`Junto los radicandos dividiendo.`, m: r`\dfrac{\sqrt[6]{16}}{\sqrt[6]{8}}=\sqrt[6]{\dfrac{16}{8}}=\sqrt[6]{2}` },
        ],
        res: r`\sqrt[6]{2}`,
      }),
      ex({
        id: 'r-c3', example: true, tag: 'Comparar', task: r`¿Cuál es mayor, $\sqrt{3}$ o $\sqrt[3]{5}$?`,
        steps: [
          { t: r`Los pongo con el mismo índice: $\text{mcm}(2,3)=6$.`, m: [r`\sqrt{3}=\sqrt[6]{3^3}=\sqrt[6]{27}`, r`\sqrt[3]{5}=\sqrt[6]{5^2}=\sqrt[6]{25}`] },
          { t: r`Con el mismo índice, es mayor el que tiene mayor radicando: $27>25$.`, m: r`\sqrt[6]{27}>\sqrt[6]{25}` },
        ],
        resTxt: r`$\sqrt{3}>\sqrt[3]{5}$ (en decimales, $1{,}732>1{,}710$).`,
      }),
    ]),
  ],
};

/* ---------- Extraer e introducir factores ---------- */
const extraer = {
  id: 'rad-ext', jump: 'Extraer e introducir', h: 'Extracción e introducción de factores en un radical', kind: 'intro',
  body: [
    p(r`**Extraer** un factor es sacarlo de la raíz para que el radicando quede lo más pequeño posible. **Introducir** es lo contrario: meter un número dentro.`),
    formula(r`\sqrt[n]{a^{\,n\cdot p+k}}=a^{p}\cdot\sqrt[n]{a^{k}}`, true),
    recipe('Receta: extraer factores', [
      r`Descompón el radicando en **factores primos** (y las letras ya son factores).`,
      r`Para cada factor con exponente $m$: **divide $m$ entre el índice $n$**.`,
      r`El **cociente** es el exponente con el que el factor **sale**; el **resto** es el exponente con el que **se queda dentro**.`,
      r`Multiplica lo que ha salido y deja la raíz con lo que quedó dentro.`,
    ]),
    grid([
      ex({
        id: 'r-e1', example: true, tag: 'Ejemplo del colegio · pág. 11', q: r`\sqrt[3]{16\,a^{7}}`, chk: ['root(16*a**7,3)', '2*a**2*root(2*a,3)'],
        steps: [
          { t: r`Descompongo el 16 en factores primos.`, m: r`16=2^4\quad\Rightarrow\quad\sqrt[3]{2^4\,a^7}` },
          { t: r`El índice es 3. Divido cada exponente entre 3.`, why: r`El cociente es lo que sale; el resto es lo que se queda.`, m: [r`2^4:\ 4\div3=\hl{1}\ \text{resto}\ \hb{1}`, r`a^7:\ 7\div3=\hl{2}\ \text{resto}\ \hb{1}`] },
          { t: r`Reescribo separando "lo que sale" de "lo que se queda".`, m: r`\sqrt[3]{2^4\,a^7}=\sqrt[3]{\left(2^{3}\right)\cdot2\cdot\left(a^{2}\right)^{3}\cdot a}` },
          { t: r`Los cubos salen como un solo factor; $2$ y $a$ se quedan dentro.`, m: r`\hl{2\cdot a^{2}}\cdot\hb{\sqrt[3]{2a}}` },
        ],
        res: r`2a^{2}\,\sqrt[3]{2a}`,
      }),
      ex({
        id: 'r-e2', example: true, tag: 'Extraer', q: r`\sqrt{72}`, chk: ['sqrt(72)', '6*sqrt(2)'],
        steps: [
          { t: r`Descompongo 72.`, m: r`72=2^3\cdot3^2` },
          { t: r`Índice 2. Divido los exponentes entre 2.`, m: [r`2^3:\ 3\div2=\hl{1}\ \text{resto}\ \hb{1}`, r`3^2:\ 2\div2=\hl{1}\ \text{resto}\ 0`] },
          { t: r`Salen un $2$ y un $3$; dentro queda un $2$.`, m: r`\sqrt{2^3\cdot3^2}=\hl{2\cdot3}\cdot\hb{\sqrt{2}}=6\sqrt{2}` },
        ],
        res: r`6\sqrt{2}`,
      }),
      ex({
        id: 'r-e3', example: true, tag: 'Introducir', q: r`3\sqrt{2}`, chk: ['3*sqrt(2)', 'sqrt(18)'],
        steps: [
          { t: r`Para meter el 3 dentro, lo elevo al **índice** (2).`, why: r`Así la raíz lo deshace: $\sqrt{3^2}=3$.`, m: r`3=\sqrt{3^2}` },
          { t: r`Junto con el producto de radicales.`, m: r`3\sqrt{2}=\sqrt{3^2}\cdot\sqrt{2}=\sqrt{9\cdot2}=\sqrt{18}` },
        ],
        res: r`\sqrt{18}`,
      }),
      ex({
        id: 'r-e4', example: true, tag: 'Introducir', q: r`2\sqrt[3]{5}`, chk: ['2*root(5,3)', 'root(40,3)'],
        steps: [
          { t: r`El índice es 3: elevo el 2 al cubo.`, m: r`2=\sqrt[3]{2^3}=\sqrt[3]{8}` },
          { t: r`Multiplico los radicandos.`, m: r`2\sqrt[3]{5}=\sqrt[3]{8}\cdot\sqrt[3]{5}=\sqrt[3]{40}` },
        ],
        res: r`\sqrt[3]{40}`,
      }),
    ]),
    sub('Practica'),
    grid([
      ex({ id: 'r-ep1', tag: 'Extrae', q: r`\sqrt{50}`, chk: ['sqrt(50)', '5*sqrt(2)'],
        steps: [
          { t: r`Descompongo.`, m: r`50=2\cdot5^2` },
          { t: r`El $5^2$ sale como $5$; el $2$ se queda.`, m: r`\sqrt{2\cdot5^2}=5\sqrt{2}` },
        ], res: r`5\sqrt{2}` }),
      ex({ id: 'r-ep2', tag: 'Extrae', q: r`\sqrt{48}`, chk: ['sqrt(48)', '4*sqrt(3)'],
        steps: [
          { t: r`Descompongo.`, m: r`48=2^4\cdot3` },
          { t: r`$2^4=(2^2)^2$ sale como $2^2=4$; el $3$ se queda.`, m: r`\sqrt{2^4\cdot3}=2^2\sqrt{3}=4\sqrt{3}` },
        ], res: r`4\sqrt{3}` }),
      ex({ id: 'r-ep3', tag: 'Extrae', q: r`\sqrt[3]{54}`, chk: ['root(54,3)', '3*root(2,3)'],
        steps: [
          { t: r`Descompongo.`, m: r`54=2\cdot3^3` },
          { t: r`El $3^3$ sale como $3$; el $2$ se queda.`, m: r`\sqrt[3]{2\cdot3^3}=3\sqrt[3]{2}` },
        ], res: r`3\sqrt[3]{2}` }),
      ex({ id: 'r-ep4', tag: 'Extrae', q: r`\sqrt{12\,a^{3}}`, chk: ['sqrt(12*a**3)', '2*a*sqrt(3*a)'],
        steps: [
          { t: r`Descompongo y separo.`, m: r`12=2^2\cdot3\qquad a^3=a^2\cdot a` },
          { t: r`Salen $2$ y $a$; se quedan $3$ y $a$.`, m: r`\sqrt{2^2\cdot3\cdot a^2\cdot a}=2a\sqrt{3a}` },
        ], res: r`2a\sqrt{3a}` }),
      ex({ id: 'r-ep5', tag: 'Extrae', q: r`\sqrt[3]{24\,x^{5}}`, chk: ['root(24*x**5,3)', '2*x*root(3*x**2,3)'],
        steps: [
          { t: r`Descompongo y divido los exponentes entre 3.`, m: [r`24=2^3\cdot3`, r`x^5:\ 5\div3=1\ \text{resto}\ 2\ \Rightarrow\ x^5=x^3\cdot x^2`] },
          { t: r`Salen $2$ y $x$; se quedan $3$ y $x^2$.`, m: r`\sqrt[3]{2^3\cdot3\cdot x^3\cdot x^2}=2x\sqrt[3]{3x^2}` },
        ], res: r`2x\sqrt[3]{3x^{2}}` }),
      ex({ id: 'r-ep6', tag: 'Introduce', q: r`5\sqrt{3}`, chk: ['5*sqrt(3)', 'sqrt(75)'],
        steps: [
          { t: r`Elevo el 5 al índice (2) y lo meto.`, m: r`5\sqrt{3}=\sqrt{5^2\cdot3}=\sqrt{75}` },
        ], res: r`\sqrt{75}` }),
      ex({ id: 'r-ep7', tag: 'Introduce', q: r`2\sqrt[3]{3}`, chk: ['2*root(3,3)', 'root(24,3)'],
        steps: [
          { t: r`Índice 3: elevo el 2 al cubo y lo meto.`, m: r`2\sqrt[3]{3}=\sqrt[3]{2^3\cdot3}=\sqrt[3]{24}` },
        ], res: r`\sqrt[3]{24}` }),
      ex({ id: 'r-ep8', tag: 'Introduce', q: r`3\sqrt[4]{2}`, chk: ['3*root(2,4)', 'root(162,4)'],
        steps: [
          { t: r`Índice 4: elevo el 3 a la cuarta ($3^4=81$) y lo meto.`, m: r`3\sqrt[4]{2}=\sqrt[4]{3^4\cdot2}=\sqrt[4]{81\cdot2}=\sqrt[4]{162}` },
        ], res: r`\sqrt[4]{162}` }),
    ]),
  ],
};

/* ---------- Suma de radicales ---------- */
const suma = {
  id: 'rad-suma', jump: 'Suma de radicales', h: 'Suma de radicales', kind: 'intro',
  body: [
    p(r`Los radicales **solo se pueden sumar o restar si son semejantes**: mismo índice **y** mismo radicando. Entonces se suman los números de delante, igual que $3x+2x=5x$.`),
    cards([
      { t: 'Semejantes (se pueden sumar)', m: r`3\sqrt{5}+2\sqrt{5}=5\sqrt{5}` },
      { t: 'No semejantes (no se pueden)', m: r`\sqrt{2}+\sqrt{3}\ \text{se queda así}` },
    ]),
    recipe('Receta: suma de radicales', [
      r`**Extrae factores** de cada radical para dejarlos lo más simples posible.`,
      r`Mira cuáles quedan **semejantes** (mismo índice y mismo radicando).`,
      r`Suma o resta los **coeficientes** (los números de delante) y deja el radical igual.`,
    ]),
    grid([
      ex({
        id: 'r-s1', example: true, tag: 'Ejemplo del colegio · pág. 11', q: r`\sqrt[3]{3}+2\sqrt[3]{24}-\sqrt[3]{81}`, chk: ['root(3,3)+2*root(24,3)-root(81,3)', '2*root(3,3)'],
        steps: [
          { t: r`Descompongo los radicandos que lo necesitan.`, m: [r`24=2^3\cdot3`, r`81=3^4=3^3\cdot3`] },
          { t: r`Extraigo los cubos.`, m: [r`\sqrt[3]{24}=2\sqrt[3]{3}\ \Rightarrow\ 2\sqrt[3]{24}=\hl{4}\sqrt[3]{3}`, r`\sqrt[3]{81}=\hb{3}\sqrt[3]{3}`] },
          { t: r`Ahora todos son $\sqrt[3]{3}$: se pueden sumar.`, m: r`\sqrt[3]{3}+4\sqrt[3]{3}-3\sqrt[3]{3}` },
          { t: r`Sumo los coeficientes: $1+4-3=2$.`, m: r`(1+4-3)\sqrt[3]{3}=2\sqrt[3]{3}` },
        ],
        res: r`2\sqrt[3]{3}`,
      }),
      ex({
        id: 'r-s2', example: true, tag: 'Ejemplo', q: r`\sqrt{3}+2\sqrt{27}-\sqrt{12}`, chk: ['sqrt(3)+2*sqrt(27)-sqrt(12)', '5*sqrt(3)'],
        steps: [
          { t: r`Descompongo.`, m: [r`27=3^2\cdot3`, r`12=2^2\cdot3`] },
          { t: r`Extraigo los cuadrados.`, m: [r`2\sqrt{27}=2\cdot3\sqrt{3}=\hl{6}\sqrt{3}`, r`\sqrt{12}=\hb{2}\sqrt{3}`] },
          { t: r`Todos son $\sqrt{3}$: sumo los coeficientes $1+6-2=5$.`, m: r`\sqrt{3}+6\sqrt{3}-2\sqrt{3}=5\sqrt{3}` },
        ],
        res: r`5\sqrt{3}`,
      }),
      ex({
        id: 'r-s3', example: true, tag: 'Ejemplo', q: r`3\sqrt{50}-2\sqrt{8}+\sqrt{18}`, chk: ['3*sqrt(50)-2*sqrt(8)+sqrt(18)', '14*sqrt(2)'],
        steps: [
          { t: r`Extraigo factores de cada uno.`, m: [r`\sqrt{50}=5\sqrt{2}\ \Rightarrow\ 3\sqrt{50}=15\sqrt{2}`, r`\sqrt{8}=2\sqrt{2}\ \Rightarrow\ 2\sqrt{8}=4\sqrt{2}`, r`\sqrt{18}=3\sqrt{2}`] },
          { t: r`Sumo los coeficientes: $15-4+3=14$.`, m: r`15\sqrt{2}-4\sqrt{2}+3\sqrt{2}=14\sqrt{2}` },
        ],
        res: r`14\sqrt{2}`,
      }),
    ]),
    sub('Practica'),
    grid([
      ex({ id: 'r-sp1', tag: 'Suma', q: r`\sqrt{12}+\sqrt{75}-\sqrt{27}`, chk: ['sqrt(12)+sqrt(75)-sqrt(27)', '4*sqrt(3)'],
        steps: [
          { t: r`Extraigo factores.`, m: [r`\sqrt{12}=2\sqrt{3}`, r`\sqrt{75}=5\sqrt{3}`, r`\sqrt{27}=3\sqrt{3}`] },
          { t: r`Sumo coeficientes: $2+5-3=4$.`, m: r`2\sqrt{3}+5\sqrt{3}-3\sqrt{3}=4\sqrt{3}` },
        ], res: r`4\sqrt{3}` }),
      ex({ id: 'r-sp2', tag: 'Suma', q: r`2\sqrt{20}-\sqrt{45}+\sqrt{5}`, chk: ['2*sqrt(20)-sqrt(45)+sqrt(5)', '2*sqrt(5)'],
        steps: [
          { t: r`Extraigo factores.`, m: [r`\sqrt{20}=2\sqrt{5}\ \Rightarrow\ 2\sqrt{20}=4\sqrt{5}`, r`\sqrt{45}=3\sqrt{5}`] },
          { t: r`Sumo coeficientes: $4-3+1=2$.`, m: r`4\sqrt{5}-3\sqrt{5}+\sqrt{5}=2\sqrt{5}` },
        ], res: r`2\sqrt{5}` }),
      ex({ id: 'r-sp3', tag: 'Suma', q: r`\sqrt[3]{16}+\sqrt[3]{54}-\sqrt[3]{2}`, chk: ['root(16,3)+root(54,3)-root(2,3)', '4*root(2,3)'],
        steps: [
          { t: r`Extraigo cubos.`, m: [r`16=2^3\cdot2\ \Rightarrow\ \sqrt[3]{16}=2\sqrt[3]{2}`, r`54=3^3\cdot2\ \Rightarrow\ \sqrt[3]{54}=3\sqrt[3]{2}`] },
          { t: r`Sumo coeficientes: $2+3-1=4$.`, m: r`2\sqrt[3]{2}+3\sqrt[3]{2}-\sqrt[3]{2}=4\sqrt[3]{2}` },
        ], res: r`4\sqrt[3]{2}` }),
      ex({ id: 'r-sp4', tag: 'Suma (¡cuidado!)', q: r`\sqrt{8}+\sqrt{18}-\sqrt{50}`, chk: ['sqrt(8)+sqrt(18)-sqrt(50)', '0'],
        steps: [
          { t: r`Extraigo factores.`, m: [r`\sqrt{8}=2\sqrt{2}`, r`\sqrt{18}=3\sqrt{2}`, r`\sqrt{50}=5\sqrt{2}`] },
          { t: r`Sumo coeficientes: $2+3-5=0$.`, m: r`2\sqrt{2}+3\sqrt{2}-5\sqrt{2}=0\cdot\sqrt{2}=0` },
        ], res: r`0`, note: 'A veces todo se cancela. Si te sale 0, ¡puede estar bien!' }),
    ]),
  ],
};

/* ---------- Errores ---------- */
const err = {
  id: 'rad-err', jump: 'Errores típicos', h: 'Errores típicos con radicales', kind: 'errors',
  body: [
    errs([
      { t: r`**La raíz de una suma NO es la suma de raíces.**`, m: r`\sqrt{9+16}\neq\sqrt{9}+\sqrt{16}`, ok: r`$\sqrt{9+16}=\sqrt{25}=5$, pero $3+4=7$.` },
      { t: r`**Radicales distintos no se suman.**`, m: r`\sqrt{2}+\sqrt{3}\neq\sqrt{5}`, ok: r`Solo se suman los semejantes (mismo índice y mismo radicando). $1{,}41+1{,}73=3{,}15\neq2{,}24$.` },
      { t: r`**Con distinto índice no se juntan los radicandos.**`, m: r`\sqrt{2}\cdot\sqrt[3]{2}\neq\sqrt[5]{4}`, ok: r`Primero común índice: $\sqrt{2}\cdot\sqrt[3]{2}=\sqrt[6]{8}\cdot\sqrt[6]{4}=\sqrt[6]{32}$.` },
      { t: r`**$(\sqrt{a})^2$ no es $2a$.**`, m: r`(\sqrt{5})^2\neq10`, ok: r`$(\sqrt{5})^2=5$: la raíz y el cuadrado se anulan.` },
      { t: r`**Al extraer factores, no sale todo el exponente.**`, m: r`\sqrt{2^3}\neq2^3`, ok: r`$\sqrt{2^3}=\sqrt{2^2\cdot2}=2\sqrt{2}$ (exponente 3 entre índice 2: cociente 1, resto 1).` },
    ]),
  ],
};

/* ---------- Práctica combinada ---------- */
const comb = {
  id: 'rad-comb', jump: 'Opera y simplifica', h: 'Opera y simplifica', kind: 'exercises',
  body: [
    p(r`Mezcla de todo lo anterior. Antes de operar, **simplifica cada radical**: casi siempre ayuda.`, 'intro'),
    grid([
      ex({ id: 'r-o1', tag: 'Producto', q: r`\sqrt{12}\cdot\sqrt{6}`, chk: ['sqrt(12)*sqrt(6)', '6*sqrt(2)'],
        steps: [
          { t: r`Mismo índice: junto los radicandos.`, m: r`\sqrt{12}\cdot\sqrt{6}=\sqrt{72}` },
          { t: r`Extraigo: $72=2^3\cdot3^2$.`, m: r`\sqrt{72}=\sqrt{2^2\cdot3^2\cdot2}=6\sqrt{2}` },
        ], res: r`6\sqrt{2}` }),
      ex({ id: 'r-o2', tag: 'Suma de productos', q: r`(\sqrt{3}+\sqrt{2})(\sqrt{3}-\sqrt{2})`, chk: ['(sqrt(3)+sqrt(2))*(sqrt(3)-sqrt(2))', '1'],
        steps: [
          { t: r`Es una suma por diferencia: $(a+b)(a-b)=a^2-b^2$.`, m: r`(\sqrt{3})^2-(\sqrt{2})^2` },
          { t: r`$(\sqrt{a})^2=a$.`, m: r`3-2=1` },
        ], res: r`1` }),
      ex({ id: 'r-o3', tag: 'Cuadrado', q: r`(\sqrt{5}+2)^2`, chk: ['(sqrt(5)+2)**2', '9+4*sqrt(5)'],
        steps: [
          { t: r`Cuadrado de una suma: $(a+b)^2=a^2+2ab+b^2$.`, m: r`(\sqrt{5})^2+2\cdot\sqrt{5}\cdot2+2^2` },
          { t: r`Calculo cada término.`, m: r`5+4\sqrt{5}+4` },
          { t: r`Sumo los números sueltos.`, m: r`9+4\sqrt{5}` },
        ], res: r`9+4\sqrt{5}` }),
      ex({ id: 'r-o4', tag: 'Cociente', q: r`\dfrac{\sqrt{75}}{\sqrt{3}}`, chk: ['sqrt(75)/sqrt(3)', '5'],
        steps: [
          { t: r`Mismo índice: junto los radicandos dividiendo.`, m: r`\sqrt{\dfrac{75}{3}}=\sqrt{25}` },
          { t: r`$25=5^2$.`, m: r`5` },
        ], res: r`5` }),
      ex({ id: 'r-o5', tag: 'Distinto índice', q: r`\sqrt[3]{2}\cdot\sqrt{2}`, chk: ['root(2,3)*sqrt(2)', 'root(32,6)'],
        steps: [
          { t: r`mcm(3, 2) = 6.`, m: [r`\sqrt[3]{2}=\sqrt[6]{2^2}=\sqrt[6]{4}`, r`\sqrt{2}=\sqrt[6]{2^3}=\sqrt[6]{8}`] },
          { t: r`Junto los radicandos.`, m: r`\sqrt[6]{4}\cdot\sqrt[6]{8}=\sqrt[6]{32}` },
        ], res: r`\sqrt[6]{32}`, note: r`También se puede dejar como $2^{5/6}$, porque $32=2^5$.` }),
      ex({ id: 'r-o6', tag: 'Raíz de raíz', q: r`\sqrt[3]{\sqrt{729}}`, chk: ['root(sqrt(729),3)', '3'],
        steps: [
          { t: r`Multiplico los índices: $3\cdot2=6$.`, m: r`\sqrt[3]{\sqrt{729}}=\sqrt[6]{729}` },
          { t: r`$729=3^6$.`, m: r`\sqrt[6]{3^6}=3` },
        ], res: r`3` }),
    ]),
  ],
};

export default {
  id: 'radicales', num: 8, cls: 'p8', tab: 'Radicales',
  title: '8. Radicales',
  lead: 'Raíces, propiedades, extraer e introducir factores, suma y racionalización.',
  color: ['#2451c7', '#e9eefc', '#c4d1f4'],
  sections: [
    def, prop, comun, extraer, suma, err, comb,
    legacy('rac-idea', 'Racionalizar'),
    legacy('rac-c1', 'Caso 1'),
    legacy('rac-c2', 'Caso 2'),
    legacy('rac-c3', 'Caso 3'),
    legacy('rac-err', 'Errores (racionalizar)'),
    legacy('rac-col', 'Ejercicios del colegio'),
    legacy('rac-add', 'Más racionalización'),
  ],
};
