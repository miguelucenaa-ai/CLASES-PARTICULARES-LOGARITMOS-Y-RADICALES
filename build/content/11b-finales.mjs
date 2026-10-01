import { p, key, tip, sub, ex, grid, figure } from '../lib.mjs';
const r = String.raw;

/* ---------- Potencias y radicales (10–13) ---------- */
export const pot = {
  id: 'fin-pot', jump: 'Potencias y radicales (10–13)', h: 'Ejercicios finales · Potencias y radicales', kind: 'exercises',
  body: [
    sub('10. Opera y simplifica'),
    grid([
      ex({ id: 'fin-10a', tag: 'Ejercicio 10(a)', q: r`\sqrt{2\sqrt{\dfrac{\sqrt{72}}{\sqrt{2}+\sqrt{8}}}}`, chk: ['sqrt(2*sqrt(sqrt(72)/(sqrt(2)+sqrt(8))))', 'root(8,4)'],
        steps: [
          { t: r`Empiezo por **dentro**. Extraigo factores de $\sqrt{72}$ y $\sqrt8$.`, m: [r`\sqrt{72}=\sqrt{36\cdot2}=6\sqrt2`, r`\sqrt{8}=\sqrt{4\cdot2}=2\sqrt2`] },
          { t: r`En el denominador: radicales semejantes, sumo coeficientes.`, m: r`\sqrt2+\sqrt8=\sqrt2+2\sqrt2=3\sqrt2` },
          { t: r`La fracción: se cancela el $\sqrt2$.`, m: r`\dfrac{6\sqrt2}{3\sqrt2}=2` },
          { t: r`Queda una raíz con un 2 dentro de otra raíz.`, m: r`\sqrt{2\sqrt{2}}` },
          { t: r`Introduzco el $2$ en la raíz interior: $2\sqrt2=\sqrt{4\cdot2}=\sqrt8$.`, m: r`\sqrt{2\sqrt2}=\sqrt{\sqrt8}` },
          { t: r`Raíz de raíz: multiplico los índices $2\cdot2=4$.`, m: r`\sqrt{\sqrt8}=\sqrt[4]{8}` },
        ], res: r`\sqrt[4]{8}\ (=2^{3/4}\approx1{,}682)` }),
      ex({ id: 'fin-10b', tag: 'Ejercicio 10(b)', q: r`\dfrac35\sqrt{\dfrac53}-\dfrac53\sqrt{\dfrac35}+\sqrt{15}`, chk: ['Rational(3,5)*sqrt(Rational(5,3))-Rational(5,3)*sqrt(Rational(3,5))+sqrt(15)', '13*sqrt(15)/15'],
        steps: [
          { t: r`Separo cada raíz de fracción y **racionalizo** (multiplico por la raíz del denominador).`, m: [r`\sqrt{\dfrac53}=\dfrac{\sqrt5}{\sqrt3}=\dfrac{\sqrt5\cdot\sqrt3}{\sqrt3\cdot\sqrt3}=\dfrac{\sqrt{15}}{3}`, r`\sqrt{\dfrac35}=\dfrac{\sqrt3}{\sqrt5}=\dfrac{\sqrt{15}}{5}`] },
          { t: r`Sustituyo y simplifico los números de delante.`, m: [r`\dfrac35\cdot\dfrac{\sqrt{15}}{3}=\dfrac{\sqrt{15}}{5}`, r`\dfrac53\cdot\dfrac{\sqrt{15}}{5}=\dfrac{\sqrt{15}}{3}`] },
          { t: r`Ahora todos llevan $\sqrt{15}$ (son semejantes). Saco factor común.`, m: r`\dfrac{\sqrt{15}}{5}-\dfrac{\sqrt{15}}{3}+\sqrt{15}=\sqrt{15}\left(\dfrac15-\dfrac13+1\right)` },
          { t: r`Calculo el paréntesis con denominador común 15.`, m: r`\dfrac{3}{15}-\dfrac{5}{15}+\dfrac{15}{15}=\dfrac{13}{15}` },
        ], res: r`\dfrac{13\sqrt{15}}{15}` }),
    ]),
    sub('11. Racionaliza'),
    grid([
      ex({ id: 'fin-11a', tag: 'Ejercicio 11(a)', q: r`\dfrac{a}{a\sqrt[6]{a^{8}}}`, chk: ['a/(a*root(a**8,6))', 'root(a**2,3)/a**2'],
        steps: [
          { t: r`Simplifico la $a$ de arriba con la de abajo.`, m: r`\dfrac{a}{a\sqrt[6]{a^8}}=\dfrac{1}{\sqrt[6]{a^8}}` },
          { t: r`Extraigo factores: $a^8=a^6\cdot a^2$.`, m: r`\sqrt[6]{a^8}=a\sqrt[6]{a^2}=a\sqrt[3]{a}` },
          { t: r`Abajo hay $\sqrt[3]{a}$: para que desaparezca, le falta elevar $a$ a $3-1=2$. Multiplico arriba y abajo por $\sqrt[3]{a^2}$.`, why: r`Así abajo queda $\sqrt[3]{a}\cdot\sqrt[3]{a^2}=\sqrt[3]{a^3}=a$.`, m: r`\dfrac{1}{a\sqrt[3]{a}}\cdot\dfrac{\sqrt[3]{a^2}}{\sqrt[3]{a^2}}=\dfrac{\sqrt[3]{a^2}}{a\cdot a}` },
        ], res: r`\dfrac{\sqrt[3]{a^2}}{a^2}` }),
      ex({ id: 'fin-11b', tag: 'Ejercicio 11(b)', q: r`\dfrac{2\sqrt6}{\sqrt3-\sqrt2}`, chk: ['2*sqrt(6)/(sqrt(3)-sqrt(2))', '6*sqrt(2)+4*sqrt(3)'],
        steps: [
          { t: r`Abajo hay un binomio con raíces: multiplico por el **conjugado** (cambio el signo del medio).`, m: r`\dfrac{2\sqrt6}{\sqrt3-\sqrt2}\cdot\dfrac{\sqrt3+\sqrt2}{\sqrt3+\sqrt2}` },
          { t: r`Abajo: suma por diferencia, $(\sqrt3)^2-(\sqrt2)^2=3-2=1$.`, m: r`(\sqrt3-\sqrt2)(\sqrt3+\sqrt2)=1` },
          { t: r`Arriba: reparto $2\sqrt6$.`, m: r`2\sqrt6\cdot\sqrt3+2\sqrt6\cdot\sqrt2=2\sqrt{18}+2\sqrt{12}` },
          { t: r`Extraigo factores: $\sqrt{18}=3\sqrt2$ y $\sqrt{12}=2\sqrt3$.`, m: r`2\cdot3\sqrt2+2\cdot2\sqrt3=6\sqrt2+4\sqrt3` },
        ], res: r`6\sqrt2+4\sqrt3` }),
      ex({ id: 'fin-11c', tag: 'Ejercicio 11(c)', q: r`\dfrac{2y}{3x\sqrt{y^{3}}}`, chk: ['2*y/(3*x*sqrt(y**3))', '2*sqrt(y)/(3*x*y)'],
        steps: [
          { t: r`Extraigo del radical: $y^3=y^2\cdot y$.`, m: r`\sqrt{y^3}=y\sqrt{y}` },
          { t: r`Sustituyo y simplifico la $y$.`, m: r`\dfrac{2y}{3x\cdot y\sqrt{y}}=\dfrac{2}{3x\sqrt{y}}` },
          { t: r`Racionalizo (caso 1): multiplico arriba y abajo por $\sqrt y$.`, m: r`\dfrac{2}{3x\sqrt y}\cdot\dfrac{\sqrt y}{\sqrt y}=\dfrac{2\sqrt y}{3x\cdot y}` },
        ], res: r`\dfrac{2\sqrt{y}}{3xy}` }),
      ex({ id: 'fin-11d', tag: 'Ejercicio 11(d)', q: r`\dfrac{x+\sqrt{y}}{x-\sqrt{y}}`, chk: ['(x+sqrt(y))/(x-sqrt(y))', '(x**2+2*x*sqrt(y)+y)/(x**2-y)'],
        steps: [
          { t: r`Multiplico arriba y abajo por el **conjugado** del denominador: $x+\sqrt y$.`, m: r`\dfrac{x+\sqrt y}{x-\sqrt y}\cdot\dfrac{x+\sqrt y}{x+\sqrt y}` },
          { t: r`Abajo: suma por diferencia.`, m: r`(x-\sqrt y)(x+\sqrt y)=x^2-y` },
          { t: r`Arriba: cuadrado de una suma, $(a+b)^2=a^2+2ab+b^2$.`, m: r`(x+\sqrt y)^2=x^2+2x\sqrt y+y` },
        ], res: r`\dfrac{x^2+2x\sqrt y+y}{x^2-y}` }),
    ]),
    sub('12. Simplifica'),
    grid([
      ex({ id: 'fin-12a', tag: 'Ejercicio 12(a)', q: r`\dfrac{3^{3+\sqrt9}\sqrt{2^2+5}}{2(-3)-5}`, chk: ['3**(3+sqrt(9))*sqrt(2**2+5)/(2*(-3)-5)', 'Rational(-2187,11)'],
        steps: [
          { t: r`Calculo lo que hay en el **exponente**: $\sqrt9=3$.`, m: r`3+\sqrt9=3+3=6\ \Rightarrow\ 3^{6}=729` },
          { t: r`El radical: $2^2+5=4+5=9$.`, m: r`\sqrt{2^2+5}=\sqrt9=3` },
          { t: r`El numerador.`, m: r`729\cdot3=2187` },
          { t: r`El denominador: $2\cdot(-3)=-6$ y luego $-6-5$.`, m: r`2(-3)-5=-6-5=-11` },
        ], res: r`-\dfrac{2187}{11}` }),
      ex({ id: 'fin-12b', tag: 'Ejercicio 12(b)', q: r`\sqrt{3\sqrt{3\sqrt{3}}}`, chk: ['sqrt(3*sqrt(3*sqrt(3)))', 'root(3**7,8)'],
        steps: [
          { t: r`Voy de dentro hacia fuera pasando a **potencias**. Raíz = exponente $\frac12$.`, m: r`\sqrt3=3^{1/2}` },
          { t: r`$3\cdot3^{1/2}=3^{3/2}$ y luego su raíz cuadrada.`, m: r`\sqrt{3\cdot3^{1/2}}=\left(3^{3/2}\right)^{1/2}=3^{3/4}` },
          { t: r`$3\cdot3^{3/4}=3^{7/4}$ y su raíz cuadrada.`, m: r`\sqrt{3\cdot3^{3/4}}=\left(3^{7/4}\right)^{1/2}=3^{7/8}` },
          { t: r`Vuelvo a radical.`, m: r`3^{7/8}=\sqrt[8]{3^7}=\sqrt[8]{2187}` },
        ], res: r`\sqrt[8]{3^{7}}` }),
      ex({ id: 'fin-12c', tag: 'Ejercicio 12(c)', q: r`\dfrac{\left(2-\frac32\right)^{-2}\left(4^3-4^2\right)^{-1}}{6^{-2}}`, chk: ['((2-Rational(3,2))**(-2)*(4**3-4**2)**(-1))/6**(-2)', '3'],
        steps: [
          { t: r`Calculo los paréntesis.`, m: [r`2-\dfrac32=\dfrac12`, r`4^3-4^2=64-16=48`] },
          { t: r`Aplico los exponentes negativos (doy la vuelta).`, m: [r`\left(\dfrac12\right)^{-2}=2^2=4`, r`48^{-1}=\dfrac{1}{48}`, r`6^{-2}=\dfrac{1}{36}`] },
          { t: r`Numerador.`, m: r`4\cdot\dfrac{1}{48}=\dfrac{1}{12}` },
          { t: r`Divido entre $\frac{1}{36}$: es multiplicar por $36$.`, m: r`\dfrac{1/12}{1/36}=\dfrac{36}{12}=3` },
        ], res: r`3` }),
      ex({ id: 'fin-12d', tag: 'Ejercicio 12(d)', q: r`\dfrac{\left(\frac32\right)^{-2}\left(\frac43\right)^{-3}}{2^{-4}\cdot3^{-3}}`, chk: ['((Rational(3,2))**(-2)*(Rational(4,3))**(-3))/(2**(-4)*3**(-3))', '81'],
        steps: [
          { t: r`Exponente negativo en una fracción: doy la vuelta a la fracción.`, m: [r`\left(\dfrac32\right)^{-2}=\left(\dfrac23\right)^{2}=\dfrac49`, r`\left(\dfrac43\right)^{-3}=\left(\dfrac34\right)^{3}=\dfrac{27}{64}`] },
          { t: r`Multiplico las dos y simplifico.`, m: r`\dfrac49\cdot\dfrac{27}{64}=\dfrac{108}{576}=\dfrac{3}{16}` },
          { t: r`Denominador: exponentes negativos.`, m: r`2^{-4}\cdot3^{-3}=\dfrac{1}{16}\cdot\dfrac{1}{27}=\dfrac{1}{432}` },
          { t: r`Divido: multiplico por la fracción dada la vuelta.`, m: r`\dfrac{3/16}{1/432}=\dfrac{3}{16}\cdot432=3\cdot27=81` },
        ], res: r`81` }),
      ex({ id: 'fin-12e', tag: 'Ejercicio 12(e)', q: r`\dfrac{\sqrt{x\sqrt{x}}}{\sqrt[3]{x}}`, chk: ['sqrt(x*sqrt(x))/root(x,3)', 'root(x**5,12)'],
        steps: [
          { t: r`Paso a **potencias** (raíz = exponente fraccionario).`, m: r`\sqrt{x\sqrt x}=\sqrt{x\cdot x^{1/2}}=\sqrt{x^{3/2}}=x^{3/4}` },
          { t: r`El denominador.`, m: r`\sqrt[3]{x}=x^{1/3}` },
          { t: r`Cociente de la misma base: resto exponentes (común denominador 12).`, m: r`x^{3/4-1/3}=x^{9/12-4/12}=x^{5/12}` },
          { t: r`Vuelvo a radical.`, m: r`x^{5/12}=\sqrt[12]{x^5}` },
        ], res: r`\sqrt[12]{x^{5}}` }),
      ex({ id: 'fin-12f', tag: 'Ejercicio 12(f)', q: r`\sqrt[3]{\sqrt{2}\,\sqrt[3]{4}}`, chk: ['root(sqrt(2)*root(4,3),3)', 'root(2**7,18)'],
        steps: [
          { t: r`Paso todo a potencias de 2: $4=2^2$.`, m: r`\sqrt2=2^{1/2}\qquad\sqrt[3]{4}=2^{2/3}` },
          { t: r`Multiplico (misma base: sumo exponentes, denominador común 6).`, m: r`2^{1/2}\cdot2^{2/3}=2^{3/6+4/6}=2^{7/6}` },
          { t: r`Raíz cúbica: exponente $\frac13$ (se multiplica).`, m: r`\left(2^{7/6}\right)^{1/3}=2^{7/18}` },
          { t: r`Vuelvo a radical.`, m: r`2^{7/18}=\sqrt[18]{2^7}=\sqrt[18]{128}` },
        ], res: r`\sqrt[18]{128}` }),
    ]),
    sub('13. Opera y simplifica'),
    grid([
      ex({ id: 'fin-13a', tag: 'Ejercicio 13(a)', q: r`\sqrt3+2\sqrt{27}-\sqrt{12}`, chk: ['sqrt(3)+2*sqrt(27)-sqrt(12)', '5*sqrt(3)'],
        steps: [
          { t: r`Extraigo factores.`, m: [r`\sqrt{27}=3\sqrt3\ \Rightarrow\ 2\sqrt{27}=6\sqrt3`, r`\sqrt{12}=2\sqrt3`] },
          { t: r`Sumo coeficientes: $1+6-2=5$.`, m: r`\sqrt3+6\sqrt3-2\sqrt3=5\sqrt3` },
        ], res: r`5\sqrt3` }),
      ex({ id: 'fin-13b', tag: 'Ejercicio 13(b)', q: r`\dfrac13\sqrt[4]{80}-\dfrac12\sqrt[4]{405}-\sqrt[4]{5}`, chk: ['Rational(1,3)*root(80,4)-Rational(1,2)*root(405,4)-root(5,4)', '-Rational(11,6)*root(5,4)'],
        steps: [
          { t: r`Descompongo: $80=2^4\cdot5$ y $405=3^4\cdot5$.`, m: [r`\sqrt[4]{80}=\sqrt[4]{2^4\cdot5}=2\sqrt[4]{5}`, r`\sqrt[4]{405}=\sqrt[4]{3^4\cdot5}=3\sqrt[4]{5}`] },
          { t: r`Sustituyo: ahora todos tienen $\sqrt[4]{5}$.`, m: r`\dfrac13\cdot2\sqrt[4]{5}-\dfrac12\cdot3\sqrt[4]{5}-\sqrt[4]{5}=\left(\dfrac23-\dfrac32-1\right)\sqrt[4]{5}` },
          { t: r`Calculo con denominador común 6.`, m: r`\dfrac46-\dfrac96-\dfrac66=-\dfrac{11}{6}` },
        ], res: r`-\dfrac{11}{6}\sqrt[4]{5}` }),
      ex({ id: 'fin-13c', tag: 'Ejercicio 13(c)', q: r`2\left(2-3\sqrt2\right)^2+\left(2-3\sqrt2\right)\left(2+3\sqrt2\right)`, chk: ['2*(2-3*sqrt(2))**2+(2-3*sqrt(2))*(2+3*sqrt(2))', '30-24*sqrt(2)'],
        steps: [
          { t: r`Primer sumando: cuadrado de una resta, $(a-b)^2=a^2-2ab+b^2$.`, m: r`(2-3\sqrt2)^2=4-12\sqrt2+9\cdot2=22-12\sqrt2` },
          { t: r`Lo multiplico por 2.`, m: r`2\left(22-12\sqrt2\right)=44-24\sqrt2` },
          { t: r`Segundo sumando: suma por diferencia, $(a-b)(a+b)=a^2-b^2$.`, m: r`(2-3\sqrt2)(2+3\sqrt2)=4-18=-14` },
          { t: r`Sumo los dos.`, m: r`44-24\sqrt2-14=30-24\sqrt2` },
        ], res: r`30-24\sqrt2` }),
      ex({ id: 'fin-13d', tag: 'Ejercicio 13(d)', q: r`\dfrac{\sqrt[4]{a^{3}b}\ \sqrt[6]{a^{4}b^{3}}}{\frac{1}{\sqrt b}}:\sqrt[6]{a}`, chk: ['(root(a**3*b,4)*root(a**4*b**3,6)/(1/sqrt(b)))/root(a,6)', '(a*b)**Rational(5,4)'],
        steps: [
          { t: r`Dividir entre $\frac{1}{\sqrt b}$ es **multiplicar** por $\sqrt b$. Y dividir entre $\sqrt[6]{a}$ es restar su exponente. Paso todo a potencias.`, m: r`a^{3/4}b^{1/4}\cdot a^{4/6}b^{3/6}\cdot b^{1/2}\cdot a^{-1/6}` },
          { t: r`**Exponentes de $a$:** $\frac34+\frac46-\frac16=\frac34+\frac12=\frac54$.`, m: r`a^{\frac34+\frac46-\frac16}=a^{5/4}` },
          { t: r`**Exponentes de $b$:** $\frac14+\frac36+\frac12=\frac14+\frac12+\frac12=\frac54$.`, m: r`b^{\frac14+\frac36+\frac12}=b^{5/4}` },
          { t: r`Junto y extraigo: $a^{5/4}=a\sqrt[4]{a}$.`, m: r`a^{5/4}b^{5/4}=(ab)^{5/4}=ab\sqrt[4]{ab}` },
        ], res: r`ab\sqrt[4]{ab}` }),
    ]),
  ],
};

/* ---------- Logaritmos (14–19) ---------- */
export const log = {
  id: 'fin-log', jump: 'Logaritmos (14–19)', h: 'Ejercicios finales · Logaritmos', kind: 'exercises',
  body: [
    key(r`$\log_a N=x\iff a^x=N$. Casi todos se resuelven escribiendo base y argumento como **potencias de la misma base**.`, 'Recuerda:'),
    sub('14. Aplicando la definición, calcula'),
    grid([
      ex({ id: 'fin-14a', tag: 'Ejercicio 14(a)', q: r`\log_2\dfrac{1}{16}`, chk: ['log(Rational(1,16),2)', '-4'],
        steps: [
          { t: r`Planteo la definición: $\log_2\frac1{16}=x\iff2^x=\frac1{16}$.`, m: r`2^x=\dfrac{1}{16}` },
          { t: r`Escribo $\frac1{16}$ como potencia de 2 (exponente negativo).`, m: r`\dfrac{1}{16}=\dfrac{1}{2^4}=2^{-4}` },
          { t: r`Igualo exponentes.`, m: r`2^x=2^{-4}\ \Rightarrow\ x=-4` },
        ], res: r`-4` }),
      ex({ id: 'fin-14b', tag: 'Ejercicio 14(b)', q: r`\log_{\frac13}\sqrt{27}`, chk: ['log(sqrt(27),Rational(1,3))', '-Rational(3,2)'],
        steps: [
          { t: r`Definición.`, m: r`\left(\dfrac13\right)^{x}=\sqrt{27}` },
          { t: r`Todo en base 3: $\frac13=3^{-1}$ y $\sqrt{27}=\sqrt{3^3}=3^{3/2}$.`, m: r`\left(3^{-1}\right)^{x}=3^{3/2}\ \Rightarrow\ 3^{-x}=3^{3/2}` },
          { t: r`Igualo exponentes.`, m: r`-x=\dfrac32\ \Rightarrow\ x=-\dfrac32` },
        ], res: r`-\dfrac32` }),
      ex({ id: 'fin-14c', tag: 'Ejercicio 14(c)', q: r`\log_{\sqrt2}\left(2\sqrt2\right)^3`, chk: ['log((2*sqrt(2))**3,sqrt(2))', '9'],
        steps: [
          { t: r`Todo en base 2: $\sqrt2=2^{1/2}$ y $2\sqrt2=2\cdot2^{1/2}=2^{3/2}$.`, m: [r`\sqrt2=2^{1/2}`, r`\left(2\sqrt2\right)^3=\left(2^{3/2}\right)^3=2^{9/2}`] },
          { t: r`Definición: $\left(2^{1/2}\right)^x=2^{9/2}$.`, m: r`2^{x/2}=2^{9/2}` },
          { t: r`Igualo exponentes.`, m: r`\dfrac x2=\dfrac92\ \Rightarrow\ x=9` },
        ], res: r`9` }),
      ex({ id: 'fin-14d', tag: 'Ejercicio 14(d)', q: r`\log\dfrac{1}{1000}`, chk: ['log(Rational(1,1000),10)', '-3'],
        steps: [
          { t: r`Sin base escrita es **base 10**: $10^x=\frac1{1000}$.`, m: r`10^x=\dfrac{1}{1000}=10^{-3}` },
          { t: r`Igualo exponentes.`, m: r`x=-3` },
        ], res: r`-3` }),
      ex({ id: 'fin-14e', tag: 'Ejercicio 14(e)', q: r`\log_{0{,}001}10\,000`, chk: ['log(10000,Rational(1,1000))', '-Rational(4,3)'],
        steps: [
          { t: r`Todo en base 10: $0{,}001=10^{-3}$ y $10\,000=10^4$.`, m: r`\left(10^{-3}\right)^x=10^4\ \Rightarrow\ 10^{-3x}=10^4` },
          { t: r`Igualo exponentes y despejo.`, m: r`-3x=4\ \Rightarrow\ x=-\dfrac43` },
        ], res: r`-\dfrac43` }),
      ex({ id: 'fin-14f', tag: 'Ejercicio 14(f)', q: r`\ln\left(\dfrac1e\right)^{-3}`, chk: ['log((1/E)**(-3))', '3'],
        steps: [
          { t: r`Simplifico el argumento: exponente negativo, doy la vuelta a la fracción.`, m: r`\left(\dfrac1e\right)^{-3}=e^{3}` },
          { t: r`$\ln e^3$: el logaritmo neperiano y la $e$ se anulan.`, m: r`\ln e^3=3` },
        ], res: r`3` }),
    ]),
    sub('15. Calcula, si es posible, el valor de x'),
    grid([
      ex({ id: 'fin-15a', tag: 'Ejercicio 15(a)', q: r`\log_x 8=-3`, chk: ['log(8,Rational(1,2))', '-3'],
        steps: [
          { t: r`Definición: $x^{-3}=8$.`, m: r`x^{-3}=8\ \Rightarrow\ \dfrac{1}{x^3}=8` },
          { t: r`Despejo: $x^3=\frac18$.`, m: r`x^3=\dfrac18=\left(\dfrac12\right)^3` },
          { t: r`Base positiva y distinta de 1: vale.`, m: r`x=\dfrac12` },
        ], res: r`x=\dfrac12` }),
      ex({ id: 'fin-15b', tag: 'Ejercicio 15(b)', q: r`\log_{-3}x=9`,
        steps: [
          { t: r`La **base** de un logaritmo tiene que ser positiva y distinta de 1. Aquí es $-3$.` },
        ], resTxt: r`**No es posible**: no existe un logaritmo con base negativa.` }),
      ex({ id: 'fin-15c', tag: 'Ejercicio 15(c)', q: r`\log_3(-81)=x`,
        steps: [
          { t: r`El **argumento** de un logaritmo tiene que ser positivo. Aquí es $-81$.`, why: r`$3^x$ siempre es positivo, nunca puede valer $-81$.` },
        ], resTxt: r`**No es posible**: no existe el logaritmo de un número negativo.` }),
      ex({ id: 'fin-15d', tag: 'Ejercicio 15(d)', q: r`\log_{\frac{1}{\sqrt2}}x=-2`, chk: ['log(2,1/sqrt(2))', '-2'],
        steps: [
          { t: r`Definición: $x=\left(\frac{1}{\sqrt2}\right)^{-2}$.`, m: r`x=\left(\dfrac{1}{\sqrt2}\right)^{-2}` },
          { t: r`Exponente negativo: doy la vuelta a la fracción.`, m: r`x=\left(\sqrt2\right)^{2}=2` },
        ], res: r`x=2` }),
      ex({ id: 'fin-15e', tag: 'Ejercicio 15(e)', q: r`\ln x=7`, chk: ['log(E**7)', '7'],
        steps: [
          { t: r`$\ln$ es el logaritmo en base $e$: $\ln x=7\iff e^7=x$.`, m: r`x=e^{7}` },
        ], res: r`x=e^{7}\approx1096{,}63` }),
    ]),
    sub('16. Con los datos log 2 = 0,301; log 3 = 0,477; log k = 0,778'),
    grid([
      ex({ id: 'fin-16a', tag: 'Ejercicio 16(a)', q: r`\log 50`,
        steps: [
          { t: r`Escribo $50=\frac{100}{2}$.`, m: r`\log50=\log\dfrac{100}{2}` },
          { t: r`Cociente → resta. Y $\log100=2$.`, m: r`=\log100-\log2=2-0{,}301` },
        ], res: r`1{,}699` }),
      ex({ id: 'fin-16b', tag: 'Ejercicio 16(b)', q: r`\log0{,}\overline3`,
        steps: [
          { t: r`$0{,}\overline3=\frac13$ (fracción generatriz).`, m: r`\log0{,}\overline3=\log\dfrac13` },
          { t: r`Cociente → resta, y $\log1=0$.`, m: r`=\log1-\log3=0-0{,}477` },
        ], res: r`-0{,}477` }),
      ex({ id: 'fin-16c', tag: 'Ejercicio 16(c)', q: r`\log\sqrt{12k}`,
        steps: [
          { t: r`Raíz → exponente $\frac12$ que baja delante.`, m: r`\log\sqrt{12k}=\dfrac12\log(12k)` },
          { t: r`Producto → suma. Descompongo $12=2^2\cdot3$.`, m: r`\dfrac12\left(2\log2+\log3+\log k\right)` },
          { t: r`Sustituyo los datos.`, m: r`\dfrac12\left(2\cdot0{,}301+0{,}477+0{,}778\right)=\dfrac12\cdot1{,}857` },
        ], res: r`0{,}9285` }),
      ex({ id: 'fin-16d', tag: 'Ejercicio 16(d)', q: r`\log_2\sqrt[3]{6k}`,
        steps: [
          { t: r`**Cambio de base** a base 10 (es la que conozco): $\log_2N=\dfrac{\log N}{\log2}$.`, m: r`\log_2\sqrt[3]{6k}=\dfrac{\log\sqrt[3]{6k}}{\log2}` },
          { t: r`Raíz cúbica → $\frac13$ delante. Y $6=2\cdot3$.`, m: r`\log\sqrt[3]{6k}=\dfrac13\left(\log2+\log3+\log k\right)=\dfrac13\left(0{,}301+0{,}477+0{,}778\right)=\dfrac{1{,}556}{3}` },
          { t: r`Divido entre $\log2=0{,}301$.`, m: r`\dfrac{1{,}556/3}{0{,}301}=\dfrac{1{,}556}{0{,}903}\approx1{,}723` },
        ], res: r`\approx1{,}723` }),
      ex({ id: 'fin-16e', tag: 'Ejercicio 16(e)', q: r`\log7{,}2`,
        steps: [
          { t: r`$7{,}2=\frac{72}{10}$ y $72=2^3\cdot3^2$.`, m: r`\log7{,}2=\log\dfrac{2^3\cdot3^2}{10}` },
          { t: r`Producto → suma, cociente → resta, potencia → baja el exponente.`, m: r`=3\log2+2\log3-\log10` },
          { t: r`Sustituyo ($\log10=1$).`, m: r`=3\cdot0{,}301+2\cdot0{,}477-1=0{,}903+0{,}954-1` },
        ], res: r`0{,}857` }),
    ]),
    sub('17. Calcula el valor de x'),
    grid([
      ex({ id: 'fin-17a', tag: 'Ejercicio 17(a)', q: r`0{,}025=0{,}5\,e^{x}`,
        steps: [
          { t: r`Aíslo la potencia: divido entre $0{,}5$.`, m: r`e^{x}=\dfrac{0{,}025}{0{,}5}=0{,}05` },
          { t: r`Tomo logaritmos neperianos (la $e$ y el $\ln$ se anulan).`, m: r`x=\ln0{,}05` },
          { t: r`Calculadora.`, m: r`x\approx-2{,}996` },
        ], res: r`x=\ln0{,}05\approx-2{,}996` }),
      ex({ id: 'fin-17b', tag: 'Ejercicio 17(b)', q: r`2500=2000\cdot1{,}05^{x}`,
        steps: [
          { t: r`Aíslo la potencia: divido entre $2000$.`, m: r`1{,}05^{x}=\dfrac{2500}{2000}=1{,}25` },
          { t: r`Tomo logaritmos: el exponente baja delante.`, m: r`x\cdot\log1{,}05=\log1{,}25` },
          { t: r`Despejo $x$.`, m: r`x=\dfrac{\log1{,}25}{\log1{,}05}=\dfrac{0{,}0969}{0{,}0212}\approx4{,}57` },
        ], res: r`x\approx4{,}57` }),
    ]),
    sub('18. Toma logaritmos decimales y desarrolla'),
    grid([
      ex({ id: 'fin-18a', tag: 'Ejercicio 18(a)', q: r`P=10\,x^{3}\,y\,z^{3}`, chk: ['log(10*x**3*y*z**3,10)', '1+3*log(x,10)+log(y,10)+3*log(z,10)'],
        steps: [
          { t: r`Tomo $\log$ en los dos lados.`, m: r`\log P=\log\left(10\,x^3\,y\,z^3\right)` },
          { t: r`Producto → suma de logaritmos.`, m: r`\log P=\log10+\log x^3+\log y+\log z^3` },
          { t: r`Potencia → el exponente baja. Y $\log10=1$.`, m: r`\log P=1+3\log x+\log y+3\log z` },
        ], res: r`\log P=1+3\log x+\log y+3\log z` }),
      ex({ id: 'fin-18b', tag: 'Ejercicio 18(b)', q: r`y=\dfrac{\sqrt[3]{x^{2}}}{a\,x}`, chk: ['log(root(x**2,3)/(a*x),10)', 'Rational(2,3)*log(x,10)-log(a,10)-log(x,10)'],
        steps: [
          { t: r`Tomo $\log$ y uso cociente → resta.`, m: r`\log y=\log\sqrt[3]{x^2}-\log(a\,x)` },
          { t: r`Raíz → $\frac23$ delante. Producto → suma (con el signo menos delante de todo).`, m: r`\log y=\dfrac23\log x-(\log a+\log x)` },
          { t: r`Quito el paréntesis y agrupo $\log x$: $\frac23-1=-\frac13$.`, m: r`\log y=-\dfrac13\log x-\log a` },
        ], res: r`\log y=-\dfrac13\log x-\log a` }),
      ex({ id: 'fin-18c', tag: 'Ejercicio 18(c)', q: r`x\,y=\dfrac{(m+2n)\,n^{2}}{m-2n}`, chk: ['log(((2*n+k)+2*n)*n**2/k,10)', 'log((2*n+k)+2*n,10)+2*log(n,10)-log(k,10)'],
        steps: [
          { t: r`Tomo $\log$ en los dos lados. A la izquierda, producto → suma.`, m: r`\log x+\log y=\log\dfrac{(m+2n)\,n^2}{m-2n}` },
          { t: r`A la derecha, cociente → resta.`, m: r`\log x+\log y=\log\left[(m+2n)\,n^2\right]-\log(m-2n)` },
          { t: r`Producto → suma, y la potencia baja.`, m: r`\log x+\log y=\log(m+2n)+2\log n-\log(m-2n)` },
        ], res: r`\log x+\log y=\log(m+2n)+2\log n-\log(m-2n)`, note: r`Ojo: $\log(m+2n)$ y $\log(m-2n)$ **no** se pueden desarrollar más (no hay propiedad para la suma).` }),
    ]),
    sub('19. Expresa el valor de E sin que aparezcan logaritmos'),
    grid([
      ex({ id: 'fin-19a', tag: 'Ejercicio 19(a)', q: r`\log E=3\log2-4\log x+3\log y-2\log z`, chk: ['10**(3*log(2,10)-4*log(x,10)+3*log(y,10)-2*log(z,10))', '8*y**3/(x**4*z**2)'],
        steps: [
          { t: r`Hago el camino **inverso**: los números de delante pasan a ser **exponentes**.`, m: r`\log E=\log2^3-\log x^4+\log y^3-\log z^2` },
          { t: r`Lo que **suma** va en el numerador y lo que **resta** en el denominador (una sola fracción).`, m: r`\log E=\log\dfrac{2^3\cdot y^3}{x^4\cdot z^2}` },
          { t: r`Si los logaritmos son iguales, los argumentos también.`, m: r`E=\dfrac{8\,y^3}{x^4\,z^2}` },
        ], res: r`E=\dfrac{8y^{3}}{x^{4}z^{2}}` }),
      ex({ id: 'fin-19b', tag: 'Ejercicio 19(b)', q: r`\ln E=3\ln(x+10)-\ln\dfrac{2x+20}{3}+\ln\dfrac32`, chk: ['exp(3*log(x+10)-log((2*x+20)/3)+log(Rational(3,2)))', '9*(x+10)**2/4'],
        steps: [
          { t: r`Los números de delante pasan a exponentes. El que **resta** va abajo; los que **suman** arriba.`, m: r`\ln E=\ln\dfrac{(x+10)^3\cdot\dfrac32}{\dfrac{2x+20}{3}}` },
          { t: r`Quito el logaritmo.`, m: r`E=\dfrac{(x+10)^3\cdot\frac32}{\frac{2x+20}{3}}=(x+10)^3\cdot\dfrac32\cdot\dfrac{3}{2x+20}=\dfrac{9\,(x+10)^3}{2(2x+20)}` },
          { t: r`Saco factor común abajo: $2x+20=2(x+10)$, y simplifico un $(x+10)$.`, m: r`E=\dfrac{9\,(x+10)^3}{4\,(x+10)}=\dfrac{9\,(x+10)^2}{4}` },
        ], res: r`E=\dfrac{9\,(x+10)^{2}}{4}` }),
    ]),
  ],
};
