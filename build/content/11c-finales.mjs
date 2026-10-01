import { p, key, tip, sub, ex, grid, figure, errs } from '../lib.mjs';
const r = String.raw;

// Cuadrado con círculo inscrito y circunscrito
const squareSvg = `<svg class="nl sq" viewBox="0 0 300 300" role="img" aria-label="Cuadrado con su círculo inscrito (toca los lados) y su círculo circunscrito (pasa por los vértices)">
  <circle cx="150" cy="150" r="113" fill="none" stroke="var(--c3)" stroke-width="3"/>
  <rect x="70" y="70" width="160" height="160" fill="var(--acc-soft)" stroke="var(--ink-2)" stroke-width="2.5"/>
  <circle cx="150" cy="150" r="80" fill="none" stroke="var(--acc)" stroke-width="3"/>
  <line x1="150" y1="150" x2="230" y2="150" stroke="var(--acc)" stroke-width="2.5"/>
  <line x1="150" y1="150" x2="230" y2="230" stroke="var(--c3)" stroke-width="2.5"/>
  <text class="lbl-acc" x="186" y="143" text-anchor="middle">r</text>
  <text class="lbl-2" x="205" y="205" text-anchor="middle">R</text>
</svg>`;

// Triángulo equilátero de lado 10 y su altura
const triSvg = `<svg class="nl sq" viewBox="0 0 320 250" role="img" aria-label="Triángulo equilátero de lado 10 con su altura">
  <polygon points="40,210 280,210 160,2" fill="var(--acc-soft)" stroke="var(--ink-2)" stroke-width="2.5" transform="translate(0,16)"/>
  <line x1="160" y1="18" x2="160" y2="226" stroke="var(--c3)" stroke-width="2.5" stroke-dasharray="6 5"/>
  <path d="M160,226 v-14 h14" fill="none" stroke="var(--ink-2)" stroke-width="1.5"/>
  <text x="160" y="246" text-anchor="middle">10</text>
  <text class="lbl-acc" x="86" y="106" text-anchor="middle">10</text>
  <text class="lbl-2" x="204" y="130" text-anchor="start">h</text>
  <text x="160" y="212" text-anchor="end" font-size="14" dx="-8">5</text>
</svg>`;

export const sint = {
  id: 'fin-sint', jump: 'Síntesis (20–24)', h: 'Ejercicios finales · Síntesis', kind: 'exercises',
  body: [
    sub('20. Calcula x'),
    grid([
      ex({ id: 'fin-20', tag: 'Ejercicio 20', q: r`\log_{\sqrt3}x+\log_{\sqrt3}x^{2}=9`, chk: ['log(3*sqrt(3),sqrt(3))+log((3*sqrt(3))**2,sqrt(3))', '9'],
        steps: [
          { t: r`Los dos logaritmos tienen la misma base: **suma → producto**.`, m: r`\log_{\sqrt3}\left(x\cdot x^2\right)=9\ \Rightarrow\ \log_{\sqrt3}x^3=9` },
          { t: r`Potencia → el exponente baja delante.`, m: r`3\log_{\sqrt3}x=9` },
          { t: r`Despejo el logaritmo.`, m: r`\log_{\sqrt3}x=3` },
          { t: r`Definición: $x=\left(\sqrt3\right)^3$.`, m: r`x=\left(\sqrt3\right)^3=\sqrt3\cdot\sqrt3\cdot\sqrt3=3\sqrt3` },
        ], res: r`x=3\sqrt3\approx5{,}196`, note: r`Comprobación: $x>0$, así que los logaritmos existen. ✔️` }),
    ]),
    sub('21. Clasifica los siguientes números reales'),
    grid([
      ex({ id: 'fin-21a', tag: 'Ejercicio 21(a)', q: r`\sqrt{5^{-\log_5 10}}-\dfrac{\sqrt{10}}{10}`, chk: ['sqrt(5**(-log(10,5)))-sqrt(10)/10', '0'],
        steps: [
          { t: r`Propiedad: $a^{\log_a N}=N$. Con el signo menos, el resultado se invierte.`, m: r`5^{-\log_5 10}=\left(5^{\log_5 10}\right)^{-1}=10^{-1}=\dfrac1{10}` },
          { t: r`La raíz de $\frac1{10}$, racionalizando.`, m: r`\sqrt{\dfrac{1}{10}}=\dfrac{1}{\sqrt{10}}=\dfrac{\sqrt{10}}{10}` },
          { t: r`Resto.`, m: r`\dfrac{\sqrt{10}}{10}-\dfrac{\sqrt{10}}{10}=0` },
        ], resTxt: r`Vale $0$: **entero** (no natural), racional y real.` }),
      ex({ id: 'fin-21b', tag: 'Ejercicio 21(b)', q: r`\dfrac{\left(1+\sqrt5\right)^3}{8}-\dfrac{3+\sqrt5}{\sqrt5-1}`, chk: ['(1+sqrt(5))**3/8-(3+sqrt(5))/(sqrt(5)-1)', '0'],
        steps: [
          { t: r`Primer término: desarrollo el cubo, $(a+b)^3=a^3+3a^2b+3ab^2+b^3$.`, m: r`(1+\sqrt5)^3=1+3\sqrt5+3\cdot5+5\sqrt5=16+8\sqrt5` },
          { t: r`Divido entre 8.`, m: r`\dfrac{16+8\sqrt5}{8}=2+\sqrt5` },
          { t: r`Segundo término: racionalizo con el conjugado $\sqrt5+1$.`, m: r`\dfrac{(3+\sqrt5)(\sqrt5+1)}{(\sqrt5-1)(\sqrt5+1)}=\dfrac{3\sqrt5+3+5+\sqrt5}{5-1}=\dfrac{8+4\sqrt5}{4}=2+\sqrt5` },
          { t: r`Resto.`, m: r`(2+\sqrt5)-(2+\sqrt5)=0` },
        ], resTxt: r`Vale $0$: **entero**, racional y real.` }),
      ex({ id: 'fin-21c', tag: 'Ejercicio 21(c)', q: r`\dfrac{1-\left(\frac32\right)^{-\log_2 8}}{\left(3^2+2\left(\frac13\right)^{-2}\right)^{-1}}`, chk: ['(1-(Rational(3,2))**(-log(8,2)))/((3**2+2*(Rational(1,3))**(-2))**(-1))', '19'],
        steps: [
          { t: r`$\log_2 8=3$ (porque $2^3=8$).`, m: r`\log_28=3` },
          { t: r`Numerador: exponente $-3$ → doy la vuelta a la fracción.`, m: r`1-\left(\dfrac32\right)^{-3}=1-\left(\dfrac23\right)^{3}=1-\dfrac{8}{27}=\dfrac{19}{27}` },
          { t: r`Denominador: $\left(\frac13\right)^{-2}=3^2=9$.`, m: r`3^2+2\cdot9=9+18=27` },
          { t: r`Y el exponente $-1$ del paréntesis.`, m: r`27^{-1}=\dfrac1{27}` },
          { t: r`Divido: multiplico por $27$.`, m: r`\dfrac{19/27}{1/27}=19` },
        ], resTxt: r`Vale $19$: **natural** (y entero, racional y real).` }),
      ex({ id: 'fin-21d', tag: 'Ejercicio 21(d)', q: r`\sqrt{2\sqrt{2\sqrt{\log_2\dfrac{0{,}16}{10^{-2}}}}}`, chk: ['sqrt(2*sqrt(2*sqrt(log(Rational(16,100)/10**(-2),2))))', '2'],
        steps: [
          { t: r`Lo más profundo: $\dfrac{0{,}16}{10^{-2}}=0{,}16\cdot100=16$.`, m: r`\log_2\dfrac{0{,}16}{10^{-2}}=\log_216=4` },
          { t: r`Raíz de 4.`, m: r`\sqrt{4}=2` },
          { t: r`Siguiente raíz: $\sqrt{2\cdot2}=\sqrt4$.`, m: r`\sqrt{2\cdot2}=2` },
          { t: r`Y la última igual.`, m: r`\sqrt{2\cdot2}=2` },
        ], resTxt: r`Vale $2$: **natural** (y entero, racional y real).` }),
    ]),
    sub('22. Calcula el valor de'),
    grid([
      ex({ id: 'fin-22a', tag: 'Ejercicio 22(a)', q: r`\log_{\frac12}\sqrt{\dfrac{16\sqrt5}{\sqrt{125}+\sqrt{45}}}`, chk: ['log(sqrt(16*sqrt(5)/(sqrt(125)+sqrt(45))),Rational(1,2))', '-Rational(1,2)'],
        steps: [
          { t: r`Extraigo factores en el denominador.`, m: r`\sqrt{125}=5\sqrt5\qquad\sqrt{45}=3\sqrt5` },
          { t: r`Los sumo (semejantes).`, m: r`\sqrt{125}+\sqrt{45}=8\sqrt5` },
          { t: r`La fracción: se cancela $\sqrt5$.`, m: r`\dfrac{16\sqrt5}{8\sqrt5}=2` },
          { t: r`Queda $\log_{1/2}\sqrt2$. Definición: $\left(\frac12\right)^x=\sqrt2$.`, m: r`\left(2^{-1}\right)^x=2^{1/2}\ \Rightarrow\ 2^{-x}=2^{1/2}` },
          { t: r`Igualo exponentes.`, m: r`-x=\dfrac12\ \Rightarrow\ x=-\dfrac12` },
        ], res: r`-\dfrac12` }),
      ex({ id: 'fin-22b', tag: 'Ejercicio 22(b)', q: r`-\log_2\left(\log_2\sqrt{\sqrt{2}}\right)`, chk: ['-log(log(sqrt(sqrt(2)),2),2)', '2'],
        steps: [
          { t: r`Lo más profundo: raíz de raíz → multiplico índices.`, m: r`\sqrt{\sqrt2}=\sqrt[4]{2}=2^{1/4}` },
          { t: r`$\log_2 2^{1/4}=\dfrac14$.`, m: r`\log_2\sqrt{\sqrt2}=\dfrac14` },
          { t: r`Ahora $\log_2\dfrac14$: $\dfrac14=2^{-2}$.`, m: r`\log_2\dfrac14=-2` },
          { t: r`El signo menos de fuera.`, m: r`-(-2)=2` },
        ], res: r`2` }),
      ex({ id: 'fin-22c', tag: 'Ejercicio 22(c)', q: r`\sqrt[3]{\left(2+\sqrt2\right)^{-\log_3\frac1{27}}}`, chk: ['root((2+sqrt(2))**(-log(Rational(1,27),3)),3)', '2+sqrt(2)'],
        steps: [
          { t: r`El exponente: $\log_3\frac{1}{27}=-3$ (porque $3^{-3}=\frac1{27}$).`, m: r`-\log_3\dfrac1{27}=-(-3)=3` },
          { t: r`Sustituyo.`, m: r`\sqrt[3]{\left(2+\sqrt2\right)^{3}}` },
          { t: r`La raíz cúbica y el cubo se anulan.`, m: r`2+\sqrt2` },
        ], res: r`2+\sqrt2` }),
      ex({ id: 'fin-22d', tag: 'Ejercicio 22(d)', q: r`\sqrt[6]{\dfrac{\log2+\log4+\log8}{\log2}}`, chk: ['root((log(2)+log(4)+log(8))/log(2),6)', 'root(6,6)'],
        steps: [
          { t: r`Escribo $4=2^2$ y $8=2^3$ y bajo los exponentes.`, m: r`\log4=2\log2\qquad\log8=3\log2` },
          { t: r`Numerador: saco factor común $\log2$.`, m: r`\log2+2\log2+3\log2=6\log2` },
          { t: r`Simplifico $\log2$.`, m: r`\dfrac{6\log2}{\log2}=6` },
        ], res: r`\sqrt[6]{6}` }),
    ]),
    sub('23. Cuadrado de área 10,5 cm²'),
    grid([
      ex({ id: 'fin-23', tag: 'Ejercicio 23', task: r`El área de un cuadrado es $10{,}5$ cm². Calcula las áreas de sus círculos **inscrito** y **circunscrito**, redondeando con dos decimales.`,
        qfig: figure(squareSvg, r`Inscrito (azul): toca los lados, radio $r$. Circunscrito (rojo): pasa por los vértices, radio $R$.`),
        steps: [
          { t: r`Sea $l$ el lado: el área del cuadrado es $l^2=10{,}5$.`, m: r`l^2=10{,}5` },
          { t: r`**Círculo inscrito:** su radio es **la mitad del lado**, $r=\frac l2$.`, m: r`r^2=\dfrac{l^2}{4}=\dfrac{10{,}5}{4}=2{,}625` },
          { t: r`Su área es $\pi r^2$.`, m: r`A_{\text{ins}}=\pi\cdot2{,}625=8{,}2467\ldots\approx8{,}25\ \text{cm}^2` },
          { t: r`**Círculo circunscrito:** su radio es **la mitad de la diagonal**. La diagonal es $d=l\sqrt2$ (Pitágoras).`, m: r`R=\dfrac{d}{2}=\dfrac{l\sqrt2}{2}\ \Rightarrow\ R^2=\dfrac{2l^2}{4}=\dfrac{l^2}{2}=5{,}25` },
          { t: r`Su área.`, m: r`A_{\text{circ}}=\pi\cdot5{,}25=16{,}4934\ldots\approx16{,}49\ \text{cm}^2` },
        ], resTxt: r`Inscrito: $\approx8{,}25$ cm². Circunscrito: $\approx16{,}49$ cm². (El circunscrito tiene **el doble** de área: $R^2=2r^2$.)` }),
    ]),
    sub('24. Triángulo equilátero de lado 10 cm'),
    grid([
      ex({ id: 'fin-24', tag: 'Ejercicio 24', task: r`Calcula el área de un triángulo equilátero de lado $10$ cm con un error menor que una milésima.`,
        qfig: figure(triSvg, r`La altura $h$ divide el triángulo en dos triángulos rectángulos de hipotenusa $10$ y cateto $5$.`),
        chk: ['Rational(1,2)*10*sqrt(10**2-5**2)', '25*sqrt(3)'],
        steps: [
          { t: r`La altura cae en el punto medio de la base: el triángulo rectángulo tiene hipotenusa $10$ y cateto $5$. Por Pitágoras:`, m: r`h=\sqrt{10^2-5^2}=\sqrt{75}=5\sqrt3` },
          { t: r`Área $=\frac{\text{base}\cdot\text{altura}}{2}$.`, m: r`A=\dfrac{10\cdot5\sqrt3}{2}=25\sqrt3\ \text{cm}^2` },
          { t: r`Aproximo: $\sqrt3=1{,}7320508\ldots$`, m: r`A=25\cdot1{,}7320508\ldots=43{,}30127\ldots` },
          { t: r`Para tener error menor que $0{,}001$ me basta con **tres decimales**. Truncando: $43{,}301$.`, why: r`Error: $|43{,}30127\ldots-43{,}301|=0{,}00027\ldots<0{,}001$.`, m: r`A\approx43{,}301\ \text{cm}^2` },
        ], resTxt: r`$A=25\sqrt3\approx43{,}301$ cm² (error $<0{,}001$).` }),
    ]),
  ],
};

export const teo = {
  id: 'fin-teo', jump: 'Cuestiones teóricas (25–26)', h: 'Ejercicios finales · Cuestiones teóricas', kind: 'exercises',
  body: [
    sub('25. ¿Verdadero o falso? Explica por qué'),
    grid([
      ex({ id: 'fin-25a', tag: 'Ejercicio 25(a)', task: r`Hay números irracionales que son enteros.`,
        steps: [{ t: r`Un entero se escribe como fracción ($3=\frac31$), así que es **racional**. Y los racionales y los irracionales **no se solapan**.` }],
        resTxt: r`**Falso.** Ningún entero es irracional.` }),
      ex({ id: 'fin-25b', tag: 'Ejercicio 25(b)', task: r`Todo número irracional es real.`,
        steps: [{ t: r`Los reales son la **unión** de racionales e irracionales: $\mathbb R=\mathbb Q\cup\mathbb I$.` }],
        resTxt: r`**Verdadero.** Por definición, $\mathbb I\subset\mathbb R$.` }),
      ex({ id: 'fin-25c', tag: 'Ejercicio 25(c)', task: r`Todos los números decimales son racionales.`,
        steps: [{ t: r`Solo lo son los decimales **exactos** y los **periódicos**. Hay decimales con infinitas cifras que no se repiten, como $\pi=3{,}14159\ldots$ o $0{,}1010010001\ldots$` }],
        resTxt: r`**Falso.** Los decimales ilimitados y no periódicos son irracionales.` }),
      ex({ id: 'fin-25d', tag: 'Ejercicio 25(d)', task: r`Entre dos números racionales hay infinitos números irracionales.`,
        steps: [{ t: r`Entre cualesquiera dos números, por cercanos que sean, siempre cabe un irracional. Por ejemplo, entre $1$ y $2$ están $\sqrt2\approx1{,}41$, $\sqrt3\approx1{,}73$ o $1+\frac{\sqrt2}{10}\approx1{,}14$, y se pueden fabricar tantos más como se quiera.`, why: r`Si $a<b$ son racionales, los números $a+\dfrac{b-a}{\sqrt2\,n}$ (con $n=2,3,4,\ldots$) son irracionales y están entre $a$ y $b$: infinitos.` }],
        resTxt: r`**Verdadero.**` }),
    ]),
    sub('26. ¿Cuáles de estas igualdades son verdaderas? Explica por qué'),
    grid([
      ex({ id: 'fin-26a', tag: 'Ejercicio 26(a)', q: r`\log m+\log n=\log(m+n)`,
        steps: [
          { t: r`La propiedad dice que la **suma** de logaritmos es el logaritmo del **producto**.`, m: r`\log m+\log n=\log(m\cdot n)` },
          { t: r`Contraejemplo: $m=n=10$.`, m: r`\log10+\log10=2\qquad\log(10+10)=\log20=1{,}30\ldots` },
        ], resTxt: r`**Falsa.**` }),
      ex({ id: 'fin-26b', tag: 'Ejercicio 26(b)', q: r`\log m-\log n=\dfrac{\log m}{\log n}`,
        steps: [
          { t: r`La propiedad dice que la **resta** de logaritmos es el logaritmo del **cociente** (no el cociente de los logaritmos).`, m: r`\log m-\log n=\log\dfrac{m}{n}` },
          { t: r`Contraejemplo: $m=100$, $n=10$.`, m: r`\log100-\log10=2-1=1\qquad\dfrac{\log100}{\log10}=\dfrac21=2` },
        ], resTxt: r`**Falsa.**` }),
      ex({ id: 'fin-26c', tag: 'Ejercicio 26(c)', q: r`\log m^2=\log m+\log m`,
        steps: [
          { t: r`Potencia: el exponente baja delante.`, m: r`\log m^2=2\log m` },
          { t: r`Y $2\log m$ es justo $\log m+\log m$.`, m: r`2\log m=\log m+\log m` },
        ], resTxt: r`**Verdadera** (para $m>0$).` }),
      ex({ id: 'fin-26d', tag: 'Ejercicio 26(d)', q: r`\log\left(m^2-n^2\right)=\log(m+n)+\log(m-n)`,
        steps: [
          { t: r`Suma por diferencia: $m^2-n^2=(m+n)(m-n)$.`, m: r`\log\left(m^2-n^2\right)=\log\left[(m+n)(m-n)\right]` },
          { t: r`Producto → suma de logaritmos.`, m: r`=\log(m+n)+\log(m-n)` },
        ], resTxt: r`**Verdadera**, siempre que $m>n>0$ (para que todos los argumentos sean positivos).` }),
    ]),
  ],
};
