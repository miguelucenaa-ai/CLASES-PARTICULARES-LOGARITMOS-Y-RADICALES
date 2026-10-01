
(function () {
  'use strict';
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.lang = 'es';

  /* Fórmulas largas: si la versión en una línea no cabe, se usa la partida */
  function fit(root) {
    $$('.fit', root).forEach(function (f) {
      if (!f.offsetParent) return;
      var w = f.querySelector('.fw'), n = f.querySelector('.fn');
      if (!n) return;
      f.classList.remove('split');
      if (w.scrollWidth > w.clientWidth + 1) f.classList.add('split');
    });
  }

  /* Pestañas */
  var tabs = $$('.tab'), ids = tabs.map(function (t) { return t.dataset.tab; });
  function show(id, toTop) {
    if (ids.indexOf(id) < 0) id = ids[0];
    tabs.forEach(function (t) { var on = t.dataset.tab === id; t.setAttribute('aria-selected', on ? 'true' : 'false'); t.tabIndex = on ? 0 : -1; });
    $$('.panel').forEach(function (p) { p.hidden = p.id !== 'panel-' + id; });
    $$('.jump').forEach(function (j) { j.hidden = j.dataset.for !== id; });
    document.body.dataset.tab = id;
    var cur = tabs[ids.indexOf(id)];
    if (cur && cur.scrollIntoView) { try { cur.scrollIntoView({ block: 'nearest', inline: 'center' }); } catch (e) { /* navegador antiguo */ } }
    store.set('t1-tab', id);
    try { history.replaceState(null, '', '#' + id); } catch (e) { /* marco sin historial */ }
    if (toTop) window.scrollTo(0, 0);
    fit(document.getElementById('panel-' + id));
  }
  tabs.forEach(function (t) { t.addEventListener('click', function () { show(t.dataset.tab, true); }); });
  document.querySelector('.tabs').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var i = ids.indexOf(document.body.dataset.tab), n = (i + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length;
    show(ids[n], false); tabs[n].focus();
  });
  $$('.jump button').forEach(function (b) {
    b.addEventListener('click', function () {
      var el = document.getElementById(b.dataset.jump);
      if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    });
  });

  /* Ejemplos y ejercicios: pasos que se van mostrando */
  $$('.ex').forEach(function (ex) {
    var steps = $$('.ex-steps > li', ex), n = steps.length;
    var res = ex.querySelector('.ex-res'), note = ex.querySelector('.ex-note');
    var next = ex.querySelector('.b-next'), all = ex.querySelector('.b-all');
    var shown = 0;
    var prev = document.createElement('button');
    prev.type = 'button'; prev.className = 'b-prev'; prev.textContent = '← Atrás';
    next.parentNode.insertBefore(prev, next);
    function paint() {
      var done = shown >= n;
      steps.forEach(function (li, i) { li.hidden = i >= shown; li.classList.toggle('cur', !done && i === shown - 1 && n > 1); });
      ex.classList.toggle('going', shown > 0 && !done);
      prev.hidden = shown === 0;
      res.hidden = !done; if (note) note.hidden = !done;
      ex.classList.toggle('done', done);
      next.textContent = done ? 'Ocultar' : (n === 1 ? 'Ver la solución' : 'Ver paso ' + (shown + 1) + ' de ' + n);
      next.setAttribute('aria-expanded', shown > 0 ? 'true' : 'false');
      all.hidden = done || n === 1 || shown === n - 1;
      fit(ex);
    }
    prev.addEventListener('click', function () {
      if (shown > 0) { shown--; paint(); }
    });
    next.addEventListener('click', function () {
      if (shown >= n) shown = 0;
      else { steps[shown].classList.add('in'); shown++; }
      paint();
    });
    all.addEventListener('click', function () {
      steps.forEach(function (li) { li.classList.add('in'); });
      shown = n; paint(); next.focus();
    });
    paint();
  });

  var rt;
  window.addEventListener('resize', function () {
    clearTimeout(rt);
    rt = setTimeout(function () { fit(document.getElementById('panel-' + document.body.dataset.tab)); }, 120);
  });

  var legacy = { racionalizacion: 'radicales' };
  var h = location.hash.slice(1); if (legacy[h]) h = legacy[h];
  show(ids.indexOf(h) >= 0 ? h : (store.get('t1-tab') || ids[0]), false);
  window.addEventListener('hashchange', function () { var k = location.hash.slice(1); if (ids.indexOf(k) >= 0) show(k, false); });
  /* cuando llegan las fuentes web cambian los anchos: se vuelve a medir */
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit(document.getElementById('panel-' + document.body.dataset.tab)); });
})();

