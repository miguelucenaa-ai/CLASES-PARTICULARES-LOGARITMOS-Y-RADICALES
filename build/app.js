(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* sin almacenamiento */ } }
  };
  var root = document.documentElement;
  var reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.lang = 'es';

  /* ---------- Modo claro (por defecto) / pizarra (si lo activas) ---------- */
  var themeMeta = $('meta[name="theme-color"]');
  function applyMode(m) {
    root.dataset.mode = m;
    if (themeMeta) themeMeta.setAttribute('content', m === 'dark' ? '#0c1a1e' : '#f2f6fa');
  }
  applyMode(store.get('t1-mode') === 'dark' ? 'dark' : 'light');
  $('#btn-mode').addEventListener('click', function () {
    var m = root.dataset.mode === 'dark' ? 'light' : 'dark';
    applyMode(m); store.set('t1-mode', m);
  });

  /* ---------- Fórmulas largas: si la versión en una línea no cabe, se usa la partida ---------- */
  function fit(rootEl) {
    $$('.fit', rootEl).forEach(function (f) {
      if (!f.offsetParent) return;
      var w = f.querySelector('.fw'), n = f.querySelector('.fn');
      if (!n) return;
      f.classList.remove('split');
      if (w.scrollWidth > w.clientWidth + 1) f.classList.add('split');
    });
    /* fórmulas dentro de una frase que no caben: se envuelven para que se desplacen en su caja */
    $$('p math, li math, td math', rootEl).forEach(function (m) {
      if (m.classList.contains('tml-display') || m.closest('.fw, .fn, .im-long')) return;
      var host = m.parentElement; if (!host || !host.offsetParent) return;
      var a = m.getBoundingClientRect(), b = host.getBoundingClientRect();
      if (a.right > b.right + 1 || a.width > b.width + 1) {
        var w = document.createElement('span'); w.className = 'im-long';
        m.parentNode.insertBefore(w, m); w.appendChild(m);
      }
    });
  }

  /* ---------- Progreso (ejercicios marcados como "Lo tengo") ---------- */
  var done = {};
  try { (JSON.parse(store.get('t1-done') || '[]') || []).forEach(function (id) { done[id] = true; }); } catch (e) { done = {}; }
  function saveDone() { store.set('t1-done', JSON.stringify(Object.keys(done))); }

  /* ---------- Apartados ---------- */
  var nodes = $$('.toc .nv'), ids = nodes.map(function (n) { return n.dataset.tab; });
  var popItems = $$('.pop-list .nv');
  var bar = $('.bar');
  var btnPrev = $('#nv-prev'), btnNext = $('#nv-next'), title = $('#nv-title');
  var popApt = $('.pop-apartados'), popJump = $('.jump-pop'), btnJump = $('.nv-jump');
  var cur = 0;

  function closePops() {
    popApt.hidden = true; popJump.hidden = true;
    title.setAttribute('aria-expanded', 'false'); btnJump.setAttribute('aria-expanded', 'false');
  }
  function show(id, toTop) {
    var i = ids.indexOf(id); if (i < 0) { i = 0; id = ids[0]; }
    cur = i;
    nodes.forEach(function (n, k) { var on = k === i; n.setAttribute('aria-selected', on ? 'true' : 'false'); n.tabIndex = on ? 0 : -1; });
    popItems.forEach(function (n, k) { n.setAttribute('aria-selected', k === i ? 'true' : 'false'); });
    $$('.panel').forEach(function (p) { p.hidden = p.id !== 'panel-' + id; });
    $$('.jump').forEach(function (j) { j.hidden = j.dataset.for !== id; });
    var n = nodes[i];
    bar.style.setProperty('--hue-cur', n.dataset.hue);
    $('b', title).textContent = n.dataset.num;
    $('span', title).textContent = n.dataset.title;
    btnPrev.disabled = i === 0; btnNext.disabled = i === ids.length - 1;
    root.dataset.tab = id;
    store.set('t1-tab', id);
    try { history.replaceState(null, '', '#' + id); } catch (e) { /* marco sin historial */ }
    closePops();
    if (toTop) {
      var s = $('#top-sentinel');
      window.scrollTo({ top: s ? s.getBoundingClientRect().top + window.pageYOffset - 2 : 0, behavior: reduced ? 'auto' : 'smooth' });
    }
    fit($('#panel-' + id));
  }
  nodes.forEach(function (n) { n.addEventListener('click', function () { show(n.dataset.tab, true); }); });
  popItems.forEach(function (n) { n.addEventListener('click', function () { show(n.dataset.pop, true); }); });
  $('.toc-list').addEventListener('keydown', function (e) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    var k = Math.max(0, Math.min(ids.length - 1, cur + (e.key === 'ArrowRight' ? 1 : -1)));
    show(ids[k], false); nodes[k].focus(); e.preventDefault();
  });
  btnPrev.addEventListener('click', function () { if (cur > 0) show(ids[cur - 1], true); });
  btnNext.addEventListener('click', function () { if (cur < ids.length - 1) show(ids[cur + 1], true); });
  document.addEventListener('click', function (e) {
    var g = e.target.closest && e.target.closest('[data-go]');
    if (!g) return;
    var k = cur + (g.dataset.go === 'next' ? 1 : -1);
    if (k >= 0 && k < ids.length) show(ids[k], true);
  });

  /* Menús desplegables de la barra: todos los apartados / saltar a una sección */
  function togglePop(pop, btn, other, otherBtn) {
    var open = pop.hidden;
    other.hidden = true; otherBtn.setAttribute('aria-expanded', 'false');
    pop.hidden = !open; btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  title.addEventListener('click', function (e) { e.stopPropagation(); togglePop(popApt, title, popJump, btnJump); });
  btnJump.addEventListener('click', function (e) { e.stopPropagation(); togglePop(popJump, btnJump, popApt, title); });
  popJump.addEventListener('click', function (e) {
    var b = e.target.closest('button[data-jump]'); if (!b) return;
    var el = document.getElementById(b.dataset.jump);
    closePops();
    if (el) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
  });
  document.addEventListener('click', function (e) { if ((!popApt.hidden || !popJump.hidden) && !bar.contains(e.target)) closePops(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') { closePops(); closeSheet(); return; }
    /* el panel de progreso mantiene el foco dentro mientras está abierto */
    if (e.key === 'Tab' && sheet && !sheet.hidden) {
      var f = $$('button', sheet).filter(function (b) { return b.offsetParent !== null; });
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
      else if (!sheet.contains(document.activeElement)) { first.focus(); e.preventDefault(); }
    }
  });

  /* ---------- Ejemplos y ejercicios: pasos que se van mostrando ---------- */
  var exs = $$('.ex');
  exs.forEach(function (ex) {
    var steps = $$('.ex-steps > li', ex), n = steps.length;
    var res = ex.querySelector('.ex-res'), note = ex.querySelector('.ex-note');
    var next = ex.querySelector('.b-next'), all = ex.querySelector('.b-all'), ctl = ex.querySelector('.ex-ctl');
    var shown = 0;
    var prev = document.createElement('button');
    prev.type = 'button'; prev.className = 'b-prev'; prev.textContent = '← Atrás';
    ctl.insertBefore(prev, next);
    var track = !ex.classList.contains('example') && ex.id;
    var mark = null;
    if (track) {
      mark = document.createElement('button');
      mark.type = 'button'; mark.className = 'b-done'; mark.textContent = 'Lo tengo';
      mark.setAttribute('aria-pressed', done[ex.id] ? 'true' : 'false');
      ctl.appendChild(mark);
      ex.classList.toggle('mastered', !!done[ex.id]);
      mark.addEventListener('click', function () {
        if (done[ex.id]) delete done[ex.id]; else done[ex.id] = true;
        saveDone();
        ex.classList.toggle('mastered', !!done[ex.id]);
        mark.setAttribute('aria-pressed', done[ex.id] ? 'true' : 'false');
        refresh();
      });
    }
    /* Modo "intentarlo primero": en los ejercicios (no en los ejemplos) se avisa, y la etiqueta que
       nombra el método ("Racionaliza", "Factor común"...) no se ve hasta pedir el primer paso. */
    var tryHint = null;
    if (!ex.classList.contains('example')) {
      tryHint = document.createElement('p');
      tryHint.className = 'try-hint';
      tryHint.textContent = 'Inténtalo tú primero. Si te atascas, pide solo un paso.';
      ctl.parentNode.insertBefore(tryHint, ctl);
      var tg = ex.querySelector('.ex-tag');
      if (tg && !/^(Fácil|Medio|Difícil|Ejercicio|Pág|\d)/.test(tg.textContent.trim())) tg.classList.add('ex-hint');
    }
    function paint() {
      var fin = shown >= n;
      ex.dataset.step = shown;
      if (tryHint) tryHint.hidden = shown > 0;
      steps.forEach(function (li, i) { li.hidden = i >= shown; li.classList.toggle('cur', !fin && i === shown - 1 && n > 1); });
      ex.classList.toggle('going', shown > 0 && !fin);
      prev.hidden = shown === 0;
      res.hidden = !fin; if (note) note.hidden = !fin;
      ex.classList.toggle('done', fin);
      next.textContent = fin ? 'Ocultar' : (n === 1 ? 'Ver la solución' : 'Ver paso ' + (shown + 1) + ' de ' + n);
      next.setAttribute('aria-expanded', shown > 0 ? 'true' : 'false');
      /* "Ver solución completa" solo aparece cuando ya has pedido al menos un paso */
      all.hidden = fin || n === 1 || shown === 0 || shown === n - 1;
      fit(ex);
    }
    prev.addEventListener('click', function () { if (shown > 0) { shown--; paint(); } });
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

  /* ---------- Panel de progreso ---------- */
  var sheet = $('#sheet'), prList = $('#pr-list');
  function counts(panelId) {
    var p = $('#panel-' + panelId), t = 0, d = 0;
    $$('.ex:not(.example)', p).forEach(function (e) { t++; if (done[e.id]) d++; });
    return { t: t, d: d };
  }
  function refresh() {
    var T = 0, D = 0;
    nodes.forEach(function (n, k) {
      var c = counts(n.dataset.tab); T += c.t; D += c.d;
      n.style.setProperty('--p', c.t ? Math.round(100 * c.d / c.t) : 0);
      n.setAttribute('aria-label', n.dataset.num + '. ' + n.dataset.title + (c.t ? ' · ' + c.d + ' de ' + c.t + ' ejercicios' : ''));
      var pc = $('.pop-c', popItems[k]); if (pc) pc.textContent = c.t ? c.d + '/' + c.t : '';
    });
    var chip = $('#chip-prog');
    chip.style.setProperty('--pp', (T ? Math.round(100 * D / T) : 0) + '%');
    $('#chip-prog-t').innerHTML = '<b>' + D + '</b> de ' + T + ' ejercicios';
    if (!sheet.hidden) buildSheet(T, D);
  }
  function buildSheet(T, D) {
    $('#pr-total').textContent = D + ' de ' + T + ' ejercicios marcados como «Lo tengo»';
    prList.innerHTML = '';
    nodes.forEach(function (n) {
      var c = counts(n.dataset.tab);
      var li = document.createElement('li');
      li.innerHTML = '<button type="button" class="pr-item" style="--hue:' + n.dataset.hue + '"><span class="n">' + n.dataset.num + '</span><span class="t">' + n.dataset.title + '<small style="--p:' + (c.t ? 100 * c.d / c.t : 0) + '%"><i></i></small></span><span class="c">' + c.d + '/' + c.t + '</span></button>';
      li.firstChild.addEventListener('click', function () { closeSheet(); show(n.dataset.tab, true); });
      prList.appendChild(li);
    });
  }
  function openSheet() { sheet.hidden = false; refresh(); $('.sheet-x', sheet).focus(); document.body.style.overflow = 'hidden'; }
  function closeSheet() { if (sheet.hidden) return; sheet.hidden = true; document.body.style.overflow = ''; $('#chip-prog').focus(); }
  $('#chip-prog').addEventListener('click', openSheet);
  $('.sheet-x', sheet).addEventListener('click', closeSheet);
  $('.sheet-bg', sheet).addEventListener('click', closeSheet);
  $('#pr-reset').addEventListener('click', function () {
    if (!confirm('¿Borrar todos los ejercicios marcados como «Lo tengo»?')) return;
    done = {}; saveDone();
    exs.forEach(function (ex) { ex.classList.remove('mastered'); var b = ex.querySelector('.b-done'); if (b) b.setAttribute('aria-pressed', 'false'); });
    refresh();
  });

  /* ---------- Cuenta atrás del examen ---------- */
  (function () {
    var el = $('#chip-exam'); if (!el) return;
    var p = (el.dataset.date || '').split('-'); if (p.length < 3) { el.hidden = true; return; }
    var exam = new Date(+p[0], +p[1] - 1, +p[2]), now = new Date();
    var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    var d = Math.round((exam - today) / 86400000);
    var t = $('#chip-exam-t');
    if (d > 1) t.innerHTML = 'Examen en <b>' + d + '</b> días';
    else if (d === 1) t.innerHTML = 'Examen <b>mañana</b>';
    else if (d === 0) t.innerHTML = '<b>El examen es hoy.</b> ¡Tú puedes!';
    else el.hidden = true;
  })();

  /* ---------- Arranque ---------- */
  var rt;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { fit($('#panel-' + ids[cur])); }, 120); });
  var legacy = { racionalizacion: 'radicales' };
  var h = location.hash.slice(1); if (legacy[h]) h = legacy[h];
  refresh();
  show(ids.indexOf(h) >= 0 ? h : (store.get('t1-tab') || ids[0]), false);
  window.addEventListener('hashchange', function () { var k = location.hash.slice(1); if (legacy[k]) k = legacy[k]; if (ids.indexOf(k) >= 0 && k !== ids[cur]) show(k, false); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { fit($('#panel-' + ids[cur])); });
})();
