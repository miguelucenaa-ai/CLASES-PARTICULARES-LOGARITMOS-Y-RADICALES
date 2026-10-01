import random
import re

def ex_block(idx, tag, q_math, steps_html, res_math, ex_id):
    return f"""
<div class="ex" id="{ex_id}"><span class="ex-tag">{tag}</span><div class="ex-q"><div class="fit"><div class="fw"><math display="block" class="tml-display" style="display:block math;">{q_math}</math></div></div></div><ol class="ex-steps" aria-live="polite">{steps_html}</ol><div class="ex-res" hidden><span class="ex-res-t">Resultado</span><div class="fit"><div class="fw"><math display="block" class="tml-display" style="display:block math;">{res_math}</math></div></div></div><div class="ex-ctl"><button type="button" class="b-next">Ver paso 1 de {steps_html.count('<li hidden>')}</button><button type="button" class="b-all">Ver solución completa</button></div></div>
"""

def step_html(desc, math_content):
    if math_content:
        return f"""<li hidden><p>{desc}</p><div class="m"><div class="fit"><div class="fw"><math display="block" class="tml-display" style="display:block math;">{math_content}</math></div></div></div></li>"""
    else:
        return f"""<li hidden><p>{desc}</p></li>"""

def gen_rac_facil(i):
    # Caso 1 simple: a / sqrt(b)
    a = random.randint(1, 10)
    b = random.choice([2, 3, 5, 6, 7, 10, 11, 13])
    q = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>{a}</mn><msqrt><mn>{b}</mn></msqrt></mfrac></mstyle>"

    steps = ""
    steps += step_html(f"Multiplicamos numerador y denominador por <math><msqrt><mn>{b}</mn></msqrt></math>:",
                       f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><msqrt><mn>{b}</mn></msqrt></mrow><mrow><msqrt><mn>{b}</mn></msqrt><mo>⋅</mo><msqrt><mn>{b}</mn></msqrt></mrow></mfrac></mstyle>")

    steps += step_html(f"Abajo, la raíz al cuadrado da <math><mn>{b}</mn></math>:",
                       f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><msqrt><mn>{b}</mn></msqrt></mrow><mn>{b}</mn></mfrac></mstyle>")

    res = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><msqrt><mn>{b}</mn></msqrt></mrow><mn>{b}</mn></mfrac></mstyle>"

    # Intenta simplificar si se puede (aunque es poco probable con a,b aleatorios, lo forzamos a veces)
    if a % b == 0:
        val = a // b
        res = f"<mn>{val}</mn><msqrt><mn>{b}</mn></msqrt>" if val > 1 else f"<msqrt><mn>{b}</mn></msqrt>"
        steps += step_html(f"Simplificamos la fracción dividiendo entre <math><mn>{b}</mn></math>:", f"<mo>=</mo>{res}")

    return ex_block(i, f"Fácil {i}", q, steps, res, f"ex-rf-{i}")

def gen_rac_medio(i):
    # Mezcla de Caso 2 y Caso 3 sencillos
    tipo = random.randint(1, 2)
    if tipo == 1:
        # Caso 2: a / root(n, b^k)
        n = random.choice([3, 4, 5])
        k = random.randint(1, n-1)
        a = random.randint(2, 9)
        base = random.choice([2, 3, 5])

        q = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>{a}</mn><mroot><msup><mn>{base}</mn><mn>{k}</mn></msup><mn>{n}</mn></mroot></mfrac></mstyle>"
        faltan = n - k
        mul = f"<mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot>"

        steps = ""
        steps += step_html(f"Al radicando le faltan {faltan} para el índice {n}. Multiplicamos por <math>{mul}</math>:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot></mrow><mrow><mroot><msup><mn>{base}</mn><mn>{k}</mn></msup><mn>{n}</mn></mroot><mo>⋅</mo><mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot></mrow></mfrac></mstyle>")
        steps += step_html(f"Abajo sumamos los exponentes del radicando (<math>{k}+{faltan}={n}</math>), eliminando la raíz:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot></mrow><mn>{base}</mn></mfrac></mstyle>")
        res = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot></mrow><mn>{base}</mn></mfrac></mstyle>"
        if a % base == 0:
            val = a // base
            res = f"<mn>{val}</mn><mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot>" if val > 1 else f"<mroot><msup><mn>{base}</mn><mn>{faltan}</mn></msup><mn>{n}</mn></mroot>"
            steps += step_html("Simplificamos:", f"<mo>=</mo>{res}")

        return ex_block(i, f"Medio {i}", q, steps, res, f"ex-rm-{i}")
    else:
        # Caso 3 simple: a / (sqrt(b) +- c) o a / (sqrt(b) +- sqrt(c))
        b = random.choice([3, 5, 7, 11])
        c = random.choice([2, 3, 5])
        while b == c: c = random.choice([2, 3, 5])
        a = random.randint(2, 6)
        signo = random.choice(["+", "-"])
        csigno = "-" if signo == "+" else "+"

        q = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>{a}</mn><mrow><msqrt><mn>{b}</mn></msqrt><mo>{signo}</mo><msqrt><mn>{c}</mn></msqrt></mrow></mfrac></mstyle>"
        conj = f"<msqrt><mn>{b}</mn></msqrt><mo>{csigno}</mo><msqrt><mn>{c}</mn></msqrt>"

        steps = ""
        steps += step_html(f"Multiplicamos numerador y denominador por el conjugado, <math><mrow>{conj}</mrow></math>:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mrow><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><msqrt><mn>{b}</mn></msqrt><mo>{signo}</mo><msqrt><mn>{c}</mn></msqrt><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow></mfrac></mstyle>")

        diff = b - c
        steps += step_html(f"Abajo, suma por diferencia es diferencia de cuadrados: <math><mrow><mn>{b}</mn><mo>-</mo><mn>{c}</mn><mo>=</mo><mn>{diff}</mn></mrow></math>:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mn>{diff}</mn></mfrac></mstyle>")

        res = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mn>{diff}</mn></mfrac></mstyle>"
        if diff < 0:
            res = f"<mo>-</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mn>{-diff}</mn></mfrac></mstyle>"
            steps += step_html("Pasamos el signo negativo delante de la fracción:", f"<mo>=</mo>{res}")
            diff_abs = -diff
        else:
            diff_abs = diff

        if a % diff_abs == 0:
            val = a // diff_abs
            pref = f"<mo>-</mo><mn>{val}</mn>" if diff < 0 else f"<mn>{val}</mn>"
            if val == 1: pref = "<mo>-</mo>" if diff < 0 else ""
            res = f"{pref}<mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow>"
            steps += step_html("Simplificamos los números enteros fuera del paréntesis:", f"<mo>=</mo>{res}")

        return ex_block(i, f"Medio {i}", q, steps, res, f"ex-rm-{i}")

def gen_rac_dificil(i):
    # Caso 3 compuesto: (a sqrt(b) +- c) / (d sqrt(e) +- f sqrt(g))
    # Para simplificar generaremos a / (d sqrt(e) +- f sqrt(g)) o (sqrt(x)+sqrt(y))/(sqrt(x)-sqrt(y))
    tipo = random.randint(1, 2)
    if tipo == 1:
        x = random.choice([2, 3, 5, 6, 7])
        y = random.choice([2, 3, 5, 6, 7])
        while x == y: y = random.choice([2, 3, 5, 6, 7])
        signo = random.choice(["+", "-"])
        csigno = "-" if signo == "+" else "+"

        q = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><msqrt><mn>{x}</mn></msqrt><mo>{signo}</mo><msqrt><mn>{y}</mn></msqrt></mrow><mrow><msqrt><mn>{x}</mn></msqrt><mo>{csigno}</mo><msqrt><mn>{y}</mn></msqrt></mrow></mfrac></mstyle>"
        conj = f"<msqrt><mn>{x}</mn></msqrt><mo>{signo}</mo><msqrt><mn>{y}</mn></msqrt>"

        steps = ""
        steps += step_html(f"El conjugado del denominador es <math><mrow>{conj}</mrow></math>. Lo multiplicamos arriba y abajo, formando un cuadrado en el numerador:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><msup><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mn>2</mn></msup><mrow><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><msqrt><mn>{x}</mn></msqrt><mo>{csigno}</mo><msqrt><mn>{y}</mn></msqrt><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow></mfrac></mstyle>")

        diff = x - y
        sum_xy = x + y
        prod_xy = x * y
        num_expand = f"<mn>{sum_xy}</mn><mo>{signo}</mo><mn>2</mn><msqrt><mn>{prod_xy}</mn></msqrt>"

        steps += step_html(f"Abajo, diferencia de cuadrados (<math><mn>{x}</mn><mo>-</mo><mn>{y}</mn><mo>=</mo><mn>{diff}</mn></math>). Arriba, desarrollamos el binomio al cuadrado:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{x}</mn><mo>{signo}</mo><mn>2</mn><msqrt><mn>{prod_xy}</mn></msqrt><mo>+</mo><mn>{y}</mn></mrow><mn>{diff}</mn></mfrac></mstyle><mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow>{num_expand}</mrow><mn>{diff}</mn></mfrac></mstyle>")

        res = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow>{num_expand}</mrow><mn>{diff}</mn></mfrac></mstyle>"
        if diff < 0:
            res = f"<mo>-</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow>{num_expand}</mrow><mn>{-diff}</mn></mfrac></mstyle>"
            steps += step_html("Pasamos el signo del denominador delante:", f"<mo>=</mo>{res}")

        return ex_block(i, f"Difícil {i}", q, steps, res, f"ex-rd-{i}")
    else:
        # a / (b sqrt(c) - d)
        a = random.randint(2, 6)
        b = random.randint(2, 4)
        c = random.choice([2, 3, 5])
        d = random.randint(2, 5)

        q = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>{a}</mn><mrow><mn>{b}</mn><msqrt><mn>{c}</mn></msqrt><mo>-</mo><mn>{d}</mn></mrow></mfrac></mstyle>"
        conj = f"<mn>{b}</mn><msqrt><mn>{c}</mn></msqrt><mo>+</mo><mn>{d}</mn>"

        steps = ""
        steps += step_html(f"Multiplicamos por el conjugado <math><mrow>{conj}</mrow></math>:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mrow><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><mn>{b}</mn><msqrt><mn>{c}</mn></msqrt><mo>-</mo><mn>{d}</mn><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow></mfrac></mstyle>")

        sq1 = (b**2) * c
        sq2 = d**2
        diff = sq1 - sq2
        steps += step_html(f"Abajo, diferencia de cuadrados: <math><mrow><msup><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><mn>{b}</mn><msqrt><mn>{c}</mn></msqrt><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mn>2</mn></msup><mo>-</mo><msup><mn>{d}</mn><mn>2</mn></msup><mo>=</mo><mn>{sq1}</mn><mo>-</mo><mn>{sq2}</mn><mo>=</mo><mn>{diff}</mn></mrow></math>:",
                           f"<mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mn>{diff}</mn></mfrac></mstyle>")

        res = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow><mn>{a}</mn><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mn>{diff}</mn></mfrac></mstyle>"

        import math
        gcd = math.gcd(a, abs(diff))
        if gcd > 1:
            val_a = a // gcd
            val_d = abs(diff) // gcd
            num_a = f"<mn>{val_a}</mn>" if val_a > 1 else ""
            res = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mrow>{num_a}<mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow></mrow><mn>{val_d}</mn></mfrac></mstyle>"
            if diff < 0:
                res = f"<mo>-</mo>{res}"
            if val_d == 1:
                res = f"{num_a}<mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo>{conj}<mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow>"
                if diff < 0: res = f"<mo>-</mo>{res}"
            steps += step_html(f"Simplificamos la fracción dividiendo entre {gcd}:", f"<mo>=</mo>{res}")

        return ex_block(i, f"Difícil {i}", q, steps, res, f"ex-rd-{i}")

# ------ Logaritmos ------

def gen_log_facil(i):
    # Por definicion: log_b(b^x)
    base = random.choice([2, 3, 5, 10])
    exp = random.choice([-2, -1, 2, 3, 4])
    arg = base**abs(exp)
    if exp < 0:
        arg_math = f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>1</mn><mn>{arg}</mn></mfrac></mstyle>"
    else:
        arg_math = f"<mn>{arg}</mn>"

    b_math = "" if base == 10 else f"<msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace>"
    if base == 10: b_math = "<mrow><mi>log</mi><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace></mrow>"

    q = f"{b_math}{arg_math}"

    steps = ""
    steps += step_html(f"Aplicamos la definición, buscando el exponente al que hay que elevar <math><mn>{base}</mn></math> para que dé el argumento:",
                       f"<msup><mn>{base}</mn><mi>x</mi></mi></msup><mo>=</mo>{arg_math}")

    if exp < 0:
        steps += step_html("Exponente negativo implica una fracción:", f"<msup><mn>{base}</mn><mi>x</mi></mi></msup><mo>=</mo><msup><mn>{base}</mn><mrow><mo form=\"prefix\" stretchy=\"false\" lspace=\"0em\" rspace=\"0em\">-</mo><mn>{abs(exp)}</mn></mrow></msup>")
    else:
        steps += step_html(f"Expresamos como potencia de <math><mn>{base}</mn></math>:", f"<msup><mn>{base}</mn><mi>x</mi></mi></msup><mo>=</mo><msup><mn>{base}</mn><mn>{exp}</mn></msup>")

    res = f"<mo form=\"prefix\" stretchy=\"false\">-</mo><mn>{abs(exp)}</mn>" if exp < 0 else f"<mn>{exp}</mn>"
    steps += step_html("Igualamos los exponentes:", f"<mi>x</mi><mo>=</mo>{res}")

    return ex_block(i, f"Fácil {i}", q, steps, res, f"ex-lf-{i}")

def gen_log_medio(i):
    # Ecuacion exponencial o logaritmica sencilla
    tipo = random.randint(1, 2)
    if tipo == 1:
        base = random.choice([2, 3, 5])
        ans = random.randint(2, 5)
        offset = random.randint(1, 3)
        sign = random.choice(["+", "-"])
        res_pot = base**(ans + offset if sign == "-" else ans - offset)

        q = f"<msup><mn>{base}</mn><mrow><mi>x</mi><mo>{sign}</mo><mn>{offset}</mn></mrow></msup><mo>=</mo><mn>{res_pot}</mn>"
        steps = ""
        steps += step_html(f"Escribimos <math><mn>{res_pot}</mn></math> como potencia de <math><mn>{base}</mn></math>:",
                           f"<msup><mn>{base}</mn><mrow><mi>x</mi><mo>{sign}</mo><mn>{offset}</mn></mrow></msup><mo>=</mo><msup><mn>{base}</mn><mn>{ans if sign=='-' else ans-offset if ans>offset else ans}</mn></msup>") # simplifies math
        # just recalculate cleanly
        true_exp = random.randint(2, 5)
        res_pot = base**true_exp
        q = f"<msup><mn>{base}</mn><mrow><mi>x</mi><mo>{sign}</mo><mn>{offset}</mn></mrow></msup><mo>=</mo><mn>{res_pot}</mn>"
        steps = ""
        steps += step_html(f"Escribimos <math><mn>{res_pot}</mn></math> como potencia de base <math><mn>{base}</mn></math>:",
                           f"<msup><mn>{base}</mn><mrow><mi>x</mi><mo>{sign}</mo><mn>{offset}</mn></mrow></msup><mo>=</mo><msup><mn>{base}</mn><mn>{true_exp}</mn></msup>")
        steps += step_html("Las bases son iguales, así que igualamos los exponentes:",
                           f"<mi>x</mi><mo>{sign}</mo><mn>{offset}</mn><mo>=</mo><mn>{true_exp}</mn>")

        ans = true_exp + offset if sign == "-" else true_exp - offset
        res = f"<mn>{ans}</mn>" if ans >= 0 else f"<mo>-</mo><mn>{abs(ans)}</mn>"
        steps += step_html("Despejamos <math><mi>x</mi></math>:", f"<mi>x</mi><mo>=</mo>{res}")

        return ex_block(i, f"Medio {i}", q, steps, f"<mi>x</mi><mo>=</mo>{res}", f"ex-lm-{i}")
    else:
        # Propiedades: log_b(x) + log_b(y)
        base = random.choice([2, 3, 5])
        a = random.choice([2, 3, 4, 5])
        b = (base**random.randint(2,4)) // a if (base**random.randint(2,4)) % a == 0 else base
        a = base * 2
        b = (base**3) // 2

        q = f"<msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><mn>{a}</mn><mo>+</mo><msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><mn>{b}</mn>"
        steps = ""
        steps += step_html("La suma de logaritmos con la misma base se convierte en el logaritmo del producto:",
                           f"<mo>=</mo><msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><mn>{a}</mn><mo>⋅</mo><mn>{b}</mn><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow>")
        steps += step_html("Multiplicamos:",
                           f"<mo>=</mo><msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><mn>{a*b}</mn>")
        import math
        res_val = round(math.log(a*b, base))
        res = f"<mn>{res_val}</mn>"
        steps += step_html(f"Como <math><msup><mn>{base}</mn><mn>{res_val}</mn></msup><mo>=</mo><mn>{a*b}</mn></math>:", f"<mo>=</mo>{res}")

        return ex_block(i, f"Medio {i}", q, steps, res, f"ex-lm-{i}")

def gen_log_dificil(i):
    # Ecuaciones logaritmicas o expresiones con raices
    tipo = random.randint(1, 2)
    if tipo == 1:
        # log_b(x) - log_b(x-a) = c
        base = 2
        c = random.choice([1, 2])
        # x / (x-a) = 2^c  => x = 2^c * x - 2^c * a => x(1 - 2^c) = -2^c * a
        # Para que de entero, x = 2^c * a / (2^c - 1)
        a = (2**c - 1) * random.randint(1, 3)

        q = f"<msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><mi>x</mi><mo>-</mo><msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><mi>x</mi><mo>-</mo><mn>{a}</mn><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mo>=</mo><mn>{c}</mn>"
        steps = ""
        steps += step_html("Resta de logaritmos se convierte en el logaritmo del cociente:",
                           f"<msub><mi>log</mi><mn>{base}</mn></msub><mo>\u2061</mo><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mi>x</mi><mrow><mi>x</mi><mo>-</mo><mn>{a}</mn></mrow></mfrac></mstyle><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mo>=</mo><mn>{c}</mn>")
        steps += step_html("Aplicamos la definición de logaritmo para quitarlo:",
                           f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mi>x</mi><mrow><mi>x</mi><mo>-</mo><mn>{a}</mn></mrow></mfrac></mstyle><mo>=</mo><msup><mn>{base}</mn><mn>{c}</mn></msup><mo>=</mo><mn>{base**c}</mn>")

        ans = (base**c * a) // (base**c - 1)
        steps += step_html("Resolvemos la ecuación lineal multiplicando en cruz y despejando <math><mi>x</mi></math>:", f"<mi>x</mi><mo>=</mo><mn>{ans}</mn>")
        return ex_block(i, f"Difícil {i}", q, steps, f"<mi>x</mi><mo>=</mo><mn>{ans}</mn>", f"ex-ld-{i}")
    else:
        # log base rara: log_sqrt(b) (b^k / c)
        base = random.choice([2, 3])
        q = f"<msub><mi>log</mi><msqrt><mn>{base}</mn></msqrt></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><msup><mn>{base}</mn><mn>4</mn></msup><mroot><mn>{base}</mn><mn>3</mn></mroot></mfrac></mstyle>"
        steps = ""
        steps += step_html(f"Escribimos base y argumento como potencias fraccionarias de <math><mn>{base}</mn></math>:",
                           f"<msub><mi>log</mi><msup><mn>{base}</mn><mfrac><mn scriptlevel=\"2\" style=\"math-depth:2;\">1</mn><mn scriptlevel=\"2\" style=\"math-depth:2;\">2</mn></mfrac></msup></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><msup><mn>{base}</mn><mn>4</mn></msup><msup><mn>{base}</mn><mfrac><mn scriptlevel=\"2\" style=\"math-depth:2;\">1</mn><mn scriptlevel=\"2\" style=\"math-depth:2;\">3</mn></mfrac></msup></mfrac></mstyle>")
        steps += step_html(f"Restamos los exponentes del cociente: <math><mn>4</mn><mo>-</mo><mfrac><mn>1</mn><mn>3</mn></mfrac><mo>=</mo><mfrac><mn>11</mn><mn>3</mn></mfrac></math>:",
                           f"<msub><mi>log</mi><msup><mn>{base}</mn><mfrac><mn scriptlevel=\"2\" style=\"math-depth:2;\">1</mn><mn scriptlevel=\"2\" style=\"math-depth:2;\">2</mn></mfrac></msup></msub><mo>\u2061</mo><mspace width=\"0.1667em\"></mspace><msup><mn>{base}</mn><mfrac><mn>11</mn><mn>3</mn></mfrac></msup></mfrac>")
        steps += step_html("Por definición, buscamos un exponente <math><mi>x</mi></math> tal que <math><msup><mrow><mo fence=\"true\" form=\"prefix\" stretchy=\"true\">(</mo><msup><mn>{base}</mn><mfrac><mn>1</mn><mn>2</mn></mfrac></msup><mo fence=\"true\" form=\"postfix\" stretchy=\"true\">)</mo></mrow><mi>x</mi></msup><mo>=</mo><msup><mn>{base}</mn><mfrac><mn>11</mn><mn>3</mn></mfrac></msup></math>. Esto es, <math><mfrac><mi>x</mi><mn>2</mn></mfrac><mo>=</mo><mfrac><mn>11</mn><mn>3</mn></mfrac></math>:",
                           f"<mi>x</mi><mo>=</mo><mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>22</mn><mn>3</mn></mfrac></mstyle>")
        return ex_block(i, f"Difícil {i}", q, steps, f"<mstyle displaystyle=\"true\" scriptlevel=\"0\"><mfrac><mn>22</mn><mn>3</mn></mfrac></mstyle>", f"ex-ld-{i}")


# Generate HTML content
rac_facil = "".join(gen_rac_facil(i) for i in range(1, 6))
rac_medio = "".join(gen_rac_medio(i) for i in range(1, 26))
rac_dificil = "".join(gen_rac_dificil(i) for i in range(1, 21))

log_facil = "".join(gen_log_facil(i) for i in range(1, 6))
log_medio = "".join(gen_log_medio(i) for i in range(1, 26))
log_dificil = "".join(gen_log_dificil(i) for i in range(1, 21))


rac_block = f"""</section><section class="blk blk-exercises" id="rac-add"><h2>Más ejercicios por dificultad (Nuevos 50)</h2>
<h3 class="sub">Nivel Fácil (5 ejercicios)</h3><div class="grid">{rac_facil}</div>
<h3 class="sub">Nivel Medio (25 ejercicios)</h3><div class="grid">{rac_medio}</div>
<h3 class="sub">Nivel Difícil (20 ejercicios)</h3><div class="grid">{rac_dificil}</div>
</section></div><div class="panel log"
"""

log_block = f"""</section><section class="blk blk-exercises" id="log-add"><h2>Más ejercicios por dificultad (Nuevos 50)</h2>
<h3 class="sub">Nivel Fácil (5 ejercicios)</h3><div class="grid">{log_facil}</div>
<h3 class="sub">Nivel Medio (25 ejercicios)</h3><div class="grid">{log_medio}</div>
<h3 class="sub">Nivel Difícil (20 ejercicios)</h3><div class="grid">{log_dificil}</div>
</section></div></main><footer
"""

# Insert into file
with open("Racionalización y logaritmos.html", "r") as f:
    content = f.read()

content = re.sub(r'</section><section class="blk blk-exercises" id="rac-add"><h2>Más ejercicios por dificultad</h2>[\s\S]*?</section></div><div class="panel log"', rac_block, content)
content = re.sub(r'</section><section class="blk blk-exercises" id="log-add"><h2>Más ejercicios por dificultad</h2>[\s\S]*?</section></div></main><footer', log_block, content)

with open("Racionalización y logaritmos.html", "w") as f:
    f.write(content)
