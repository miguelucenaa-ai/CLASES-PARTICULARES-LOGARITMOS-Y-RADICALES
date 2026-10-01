"""Auditoría estructural del HTML generado (sólo librería estándar).
Uso:  python build/audit.py [ruta/al/index.html]
Comprueba: ids duplicados, enlaces internos, etiquetas sin cerrar, contadores de pasos, resultados vacíos,
ejercicios repetidos, restos de marcas (**, $, \\, @@), botones sin nombre y figuras sin descripción."""
import re, sys, os, html
from html.parser import HTMLParser
from collections import Counter, defaultdict

here = os.path.dirname(os.path.abspath(__file__))
path = sys.argv[1] if len(sys.argv) > 1 else os.path.join(here, '..', 'index.html')
s = open(path, encoding='utf8').read()
problems = []
def bad(kind, msg):
    problems.append((kind, msg))

# 1) etiquetas bien anidadas -------------------------------------------------
VOID = {'meta', 'link', 'br', 'hr', 'img', 'input', 'path', 'circle', 'line', 'rect', 'ellipse', 'polygon', 'mspace', 'use', 'source'}
class P(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.stack = []; self.ids = []; self.errors = []; self.attrs = []
    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if 'id' in d: self.ids.append(d['id'])
        self.attrs.append((tag, d))
        if tag not in VOID: self.stack.append((tag, self.getpos()))
    def handle_startendtag(self, tag, attrs):
        d = dict(attrs)
        if 'id' in d: self.ids.append(d['id'])
        self.attrs.append((tag, d))
    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack:
            self.errors.append(f'cierre sin apertura </{tag}> en {self.getpos()}'); return
        if self.stack[-1][0] == tag:
            self.stack.pop(); return
        # buscar hacia atrás
        for k in range(len(self.stack) - 1, -1, -1):
            if self.stack[k][0] == tag:
                self.errors.append(f'<{self.stack[-1][0]}> sin cerrar antes de </{tag}> en {self.getpos()}')
                del self.stack[k:]; return
        self.errors.append(f'cierre sin apertura </{tag}> en {self.getpos()}')
p = P(); p.feed(s)
for e in p.errors[:20]: bad('estructura', e)
if p.stack: bad('estructura', f'sin cerrar al final: {[t for t,_ in p.stack[-5:]]}')

# 2) ids duplicados y enlaces ------------------------------------------------
dup = [k for k, v in Counter(p.ids).items() if v > 1]
for d in dup: bad('id duplicado', d)
ids = set(p.ids)
for tag, d in p.attrs:
    for a in ('aria-controls', 'aria-labelledby'):
        if a in d and d[a] not in ids: bad('enlace roto', f'{a}={d[a]}')
    if 'data-jump' in d and d['data-jump'] not in ids: bad('enlace roto', 'data-jump=' + d['data-jump'])
    for a in ('data-tab', 'data-pop'):
        if a in d and ('panel-' + d[a]) not in ids: bad('enlace roto', f'{a}={d[a]} sin panel')

# 3) botones sin nombre, figuras sin descripción -------------------------------
for m in re.finditer(r'<button\b([^>]*)>(.*?)</button>', s, re.S):
    attrs, inner = m.group(1), re.sub(r'<[^>]+>', '', m.group(2)).strip()
    if not inner and 'aria-label' not in attrs and 'title=' not in attrs: bad('accesibilidad', 'botón sin nombre: ' + attrs[:80])
for m in re.finditer(r'<svg\b([^>]*)>', s):
    if 'aria-label' not in m.group(1) and 'aria-hidden' not in m.group(1): bad('accesibilidad', 'svg sin aria-label: ' + m.group(1)[:80])

# 4) ejercicios: pasos, resultados, repetidos ------------------------------------
blocks = re.split(r'(?=<div class="ex(?: example| check| hard| mastered)*" id=")', s)
qs = defaultdict(list); nex = 0
for b in blocks:
    m = re.match(r'<div class="ex(?: example| check| hard| mastered)*" id="([^"]+)"', b)
    if not m: continue
    nex += 1; exid = m.group(1)
    j = b.find('<div class="ex-ctl">'); body = b[:j]; ctl = b[j:j + 400]
    steps = body.count('<li hidden>')
    mm = re.search(r'Ver paso 1 de (\d+)', ctl)
    if mm and int(mm.group(1)) != steps: bad('pasos', f'{exid}: botón dice {mm.group(1)} y hay {steps}')
    if steps == 0: bad('pasos', f'{exid}: sin pasos')
    res = re.search(r'<div class="ex-res" hidden>(.*?)$', body, re.S)
    if not res or not re.sub(r'<[^>]+>|Resultado', '', res.group(1)).strip(): bad('resultado', f'{exid}: resultado vacío')
    q = re.search(r'<div class="ex-q">(.*?)</div></div></div><ol', body, re.S)
    if q and 'example' not in b[:60]:
        qs[re.sub(r'\s+', '', q.group(1))].append(exid)
for k, v in qs.items():
    # los ejercicios del PDF aparecen a propósito en su apartado (ex-c…) y en «Ejercicios finales» (fin-…)
    if len(v) == 2 and any(i.startswith('fin-') for i in v) and any(i.startswith('ex-c') for i in v): continue
    if len(v) > 1: bad('repetido', 'mismo enunciado en ' + ', '.join(v))

# 5) restos de marcas y erratas de texto ----------------------------------------
body = s[s.find('<main>'):s.find('</main>')]
txt = re.sub(r'<math.*?</math>', '⟦m⟧', body, flags=re.S)
txt = re.sub(r'<script.*?</script>|<style.*?</style>', ' ', txt, flags=re.S)
txt = html.unescape(re.sub(r'<[^>]+>', '\n', txt))
lines = [l.strip() for l in txt.split('\n') if l.strip()]
PAT = {r'\*\*': 'negrita sin cerrar', r'\$': 'símbolo $ suelto', r'\\[a-zA-Z]': 'comando LaTeX visible', '@@': 'marcador interno',
       r'undefined|NaN|\[object': 'valor sin definir', r'\b(\w{2,})\s+\1\b': 'palabra repetida', r' [,.;:] ': 'espacio antes de signo',
       r'Siguiente paso|\(Nuevos\)': 'texto antiguo'}
for pat, name in PAT.items():
    for l in lines:
        mm = re.search(pat, l, re.I if pat.startswith(r'\b') else 0)
        if mm and not (name == 'palabra repetida' and mm.group(1).lower() in ('que', 'y', 'a', 'o', 'e', 'x', 'm', 'n', 'la')):
            bad('texto', f'{name}: «{l[:90]}»')

kinds = Counter(k for k, _ in problems)
print(f'{nex} ejercicios · {len(p.ids)} ids · {len(lines)} líneas de texto')
if not problems: print('SIN PROBLEMAS')
else:
    print('PROBLEMAS:', dict(kinds))
    for k, m in problems[:80]: print(f' - [{k}] {m}')
sys.exit(1 if problems else 0)
