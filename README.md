# Tema 1 · Números reales (Matemáticas I)

Apuntes interactivos de todo el Tema 1, en el mismo orden que el PDF del colegio:

1. Números reales · 2. Desigualdades · 3. La recta real · 4. Valor absoluto · 5. Intervalos · 6. Aproximaciones y errores · 7. Notación científica · 8. Radicales (con racionalización) · 9. Potencias · 10. Logaritmos · 11. Ejercicios finales (los 26, resueltos).

El archivo que se abre en el móvil / iPad / ordenador es **`Racionalización y logaritmos.html`** (funciona sin conexión).

## Cómo se genera

El HTML se genera con Node a partir de `build/`. **No se edita a mano.**

```bash
npm install          # una vez (instala temml, que convierte LaTeX a MathML)
node build/build.mjs # genera el HTML
```

- `build/content/NN-*.mjs`: el contenido de cada apartado (fórmulas en LaTeX entre `$...$`).
- `build/lib.mjs`: ejemplos paso a paso, recetas, tablas, errores típicos...
- `build/svg.mjs`: dibujos (recta numérica, Pitágoras, Tales, intervalos).
- `build/legacy/`: secciones anteriores (racionalización y logaritmos) ya hechas.
- `build/base.css`, `build/extra.css`, `build/app.js`: estilo y comportamiento.

## Comprobación matemática

Cada resultado lleva un campo `chk: [enunciado, resultado]` que se comprueba con SymPy:

```bash
python -m venv venv && venv/Scripts/pip install sympy   # una vez
venv/Scripts/python build/verify.py
```

## Auditoría

```bash
python build/audit.py     # estructura, enlaces, ids, pasos, repetidos, accesibilidad
```
