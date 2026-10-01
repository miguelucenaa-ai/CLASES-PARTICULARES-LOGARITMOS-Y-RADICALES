"""Comprueba con SymPy que el resultado de cada ejercicio (campo chk) vale lo mismo que el enunciado.
Uso:  python build/verify.py      (necesita:  pip install sympy)
chk = [enunciado, resultado]  como expresiones de Python/SymPy. Si hay variables se prueban valores positivos al azar.
"""
import json, os, random, sys
from sympy import *

here = os.path.dirname(os.path.abspath(__file__))
data = json.load(open(os.path.join(here, 'checks.json'), encoding='utf8'))
ns = {k: v for k, v in globals().items() if not k.startswith('_')}
ns.update(dict(ln=log, rt=lambda x, n: real_root(x, n) if x < 0 else x ** Rational(1, n)))
bad = 0
for d in data:
    a, b = d['chk'][0], d['chk'][1]
    anyv = len(d['chk']) > 2
    try:
        A, B = sympify(a, locals=ns, rational=True), sympify(b, locals=ns, rational=True)
        syms = sorted((A.free_symbols | B.free_symbols), key=str)
        ok = True
        trials = 1 if not syms else 6
        for _ in range(trials):
            sub = {s: (Rational(random.randint(-40, 40), random.randint(1, 7)) if anyv else Rational(random.randint(2, 40), random.randint(1, 7))) for s in syms}
            diff = N((A - B).subs(sub), 40)
            if diff.has(nan, zoo, oo, -oo):
                continue  # valores que anulan un denominador: se descartan
            if abs(diff) > 1e-25:
                ok = False
                break
        if not ok:
            bad += 1
            print('MAL ', d['id'], a, '=?=', b, N(A.subs(sub), 12), N(B.subs(sub), 12))
    except Exception as e:
        bad += 1
        print('ERR ', d['id'], a, b, repr(e)[:120])
print(f'{len(data)} comprobados, {bad} con problemas')
sys.exit(1 if bad else 0)
