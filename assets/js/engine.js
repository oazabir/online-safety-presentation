/* ============================================================================
   engine.js - deck core
   Sections: 0 util · 1 registry · 2 slide list · 3 element renderers · 4 slide view
             5 steps & effects · 6 media · 7 stage fit · 8 transitions + morph
             9 navigation · 10 pointer extras (tilt / lightbox) · 11 public helpers
   Classic script (works from file://). Globals: Deck. Data: window.DECK_DATA
   ============================================================================ */
(function () {
'use strict';
var DATA = window.DECK_DATA, W = DATA.w, H = DATA.h;
var EASE = 'cubic-bezier(.65,0,.35,1)';
var Deck = window.Deck = { version: '1.0.0', W: W, H: H, slides: [], byKey: {}, cur: null, view: null, includeHidden: false,
  scale: 1, mode: 'main', listeners: {}, busy: false };

/* ---------------------------------------------------------------- 0. util */
function $(s, r) { return (r || document).querySelector(s); }
function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
function h(tag, cls, parent) { var e = document.createElement(tag); if (cls) e.className = cls; if (parent) parent.appendChild(e); return e; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
Deck.$ = $; Deck.$$ = $$; Deck.h = h; Deck.clamp = clamp;
Deck.reduced = function () { try { return matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) { return false; } };
Deck.on = function (ev, fn) { (Deck.listeners[ev] = Deck.listeners[ev] || []).push(fn); return Deck; };
Deck.emit = function (ev, a, b) { (Deck.listeners[ev] || []).forEach(function (f) { try { f(a, b); } catch (e) { console.error('Deck listener', ev, e); } }); };
function safe(fn, label) { try { return fn(); } catch (e) { console.error('[deck] ' + label + ':', e); } }

/* ---------------------------------------------------------------- 1. registry (extension API) */
var overrides = {}, inserts = [];
/** Deck.registerSlide(idOrOriginalIndex, spec) - override/augment an existing slide, or add handlers to an inserted one.
 *  spec: {render(el,ctx), enter(el,ctx), leave(el,ctx), steps:n, step(el,i,ctx), unstep(el,i,ctx), calm:bool, loop:'name'|[..]|false, keepBase:bool} */
Deck.registerSlide = function (id, spec) { id = String(id); overrides[id] = Object.assign(overrides[id] || {}, spec); return Deck; };
/** Deck.insertSlide({after:origIndexOrId, id:'x', title, section, notes, hidden, tr:{type,ms}, ...same handlers}) */
Deck.insertSlide = function (spec) { if (!spec || !spec.id || spec.after === undefined) throw new Error('insertSlide needs {id, after}'); inserts.push(spec); return Deck; };

/* ---------------------------------------------------------------- 2. slide list */
function buildList() {
  var list = DATA.slides.map(function (s) {
    var o = Object.assign({}, s); o.key = String(s.n); o.spec = overrides[o.key] || overrides[s.id] || null; return o;
  });
  var tail = {};
  inserts.forEach(function (sp) {
    var after = String(sp.after), anchor = tail[after] || after;
    var idx = list.findIndex(function (x) { return x.key === anchor; });
    if (idx < 0) { console.warn('insertSlide: unknown anchor', sp.after); idx = list.length - 1; }
    var prev = list[idx];
    var o = { n: null, orig: null, key: String(sp.id), id: String(sp.id), hidden: !!sp.hidden, section: sp.section || prev.section,
      tr: Object.assign({ type: 'fade', ms: 800 }, sp.tr || {}), notes: sp.notes || '', calm: !!sp.calm, loop: sp.loop || null,
      els: sp.els || [], steps: [], custom: true, title: sp.title || sp.id };
    o.spec = Object.assign({}, sp, overrides[o.key] || {});
    list.splice(idx + 1, 0, o); tail[after] = o.key;
  });
  list.forEach(function (s, i) { s.pos = i; s.label = s.orig ? String(s.orig) : '★'; Deck.byKey[s.key] = s; });
  Deck.slides = list;
}
Deck.order = function () { return Deck.slides.filter(function (s) { return !s.hidden; }); };
Deck.find = function (k) { return Deck.byKey[String(k)] || null; };
Deck.isCalm = function (s) { var sp = s.spec; return sp && sp.calm !== undefined ? !!sp.calm : !!s.calm; };

/* ---------------------------------------------------------------- 3. element renderers */
function pos(e) { return 'left:' + e.x + '%;top:' + e.y + '%;width:' + e.w + '%;height:' + e.h + '%;' + (e.rot ? 'rotate:' + e.rot + 'deg;' : ''); }
function css(el, o) { for (var k in o) el.style[k] = o[k]; }
function darkToLight(c) { return /^#0{3,6}$|^#(0|1|2)[0-9a-f]{5}$/i.test(c) ? '#F4F1EA' : c; }

function mkPic(e, opt) {
  var isInk = e.k === 'ink';
  var d = h('div', 'el ' + (isInk ? 'ink' + (e.onl ? ' onl' : '') : 'pic' + (e.card ? ' card' : '') + (e.bleed ? ' bleed' : '') + (e.cut ? ' cut' : '') +
    (e.inv ? ' inv' : '') + (e.gray ? ' gray' : '') + (e.geom ? ' ' + e.geom : '')));
  d.style.cssText = pos(e);
  var inn = h('div', 'in', d), img = new Image();
  img.src = e.src; img.alt = e.alt || ''; img.decoding = 'async'; img.draggable = false;
  if (e.crop) {
    var l = e.crop[0], t = e.crop[1], r = e.crop[2], b = e.crop[3];
    css(img, { position: 'absolute', width: (10000 / (100 - l - r)) + '%', height: (10000 / (100 - t - b)) + '%',
      left: (-100 * l / (100 - l - r)) + '%', top: (-100 * t / (100 - t - b)) + '%', maxWidth: 'none' });
  }
  if (e.flipH || e.flipV) img.style.transform = 'scale(' + (e.flipH ? -1 : 1) + ',' + (e.flipV ? -1 : 1) + ')';
  if (e.border) { inn.style.border = e.border[0] + 'px solid ' + darkToLight(e.border[1]); }
  inn.appendChild(img);
  if (e.card && e.w >= 6 && !opt.static) d.classList.add('zoomable', 'tilt');
  return d;
}

function mkText(e) {
  var d = h('div', 'el txt' + (e.title ? ' title' : '') + (e.k === 'shape' ? ' shape' : '') + (e.geom ? ' ' + e.geom : '') + (e.glass ? ' glass' : '') + (e.wrap === false ? ' nowrap' : ''));
  d.style.cssText = pos(e).replace(/height:[^;]+;/, 'min-height:' + e.h + '%;');
  var an = e.anchor === 'ctr' ? 'ctr' : e.anchor === 'b' ? 'b' : 'top'; d.classList.add(an);
  if (e.vert) d.classList.add(e.vert === 'vert270' ? 'vert-l' : 'vert-r');
  d.style.padding = e.ins[1] + 'px ' + e.ins[2] + 'px ' + e.ins[3] + 'px ' + e.ins[0] + 'px';
  if (e.fill && e.glass) {
    var ga = Math.max(.55, Math.min(1, e.fill[1] == null ? 1 : e.fill[1]));
    d.style.background = 'linear-gradient(rgba(255,255,255,.07),rgba(255,255,255,.07)),rgba(14,23,28,' + ga + ')';
  } else if (e.fill) {
    var c = e.fill[0], a = e.fill[1], m = /^#(..)(..)(..)$/.exec(c);
    d.style.background = m ? 'rgba(' + parseInt(m[1], 16) + ',' + parseInt(m[2], 16) + ',' + parseInt(m[3], 16) + ',' + a + ')' : c;
  }
  if (e.border) d.style.border = e.border[0] + 'px solid ' + darkToLight(e.border[1]);
  (e.paras || []).forEach(function (p) {
    var pe = h('p', '', d), mx = 0, first = null;
    if (p.bul && !p.empty) { pe.classList.add('bul'); pe.style.setProperty('--b', JSON.stringify(p.bul)); pe.style.setProperty('--lv', p.lv || 0); }
    if (p.al) pe.style.textAlign = p.al;
    if (p.lh) pe.style.lineHeight = (1.2 * p.lh).toFixed(3);
    if (p.bp !== undefined) { pe.dataset.bp = p.bp; }
    p.runs.forEach(function (r) {
      if (r.br) { pe.appendChild(document.createElement('br')); return; }
      var sp = r.href ? h('a') : h('span'); if (r.href) { sp.href = r.href; sp.target = '_blank'; sp.rel = 'noopener'; }
      sp.textContent = r.t;
      var fs = r.sz ? r.sz * (r.f === 'mono' ? 1 : 0.93) : 0; if (fs) { sp.style.fontSize = fs.toFixed(1) + 'px'; mx = Math.max(mx, fs); }
      if (!first) first = r;
      if (r.b) sp.style.fontWeight = 700; if (r.i) sp.style.fontStyle = 'italic';
      if (r.c) sp.style.color = r.c; if (r.f === 'mono') sp.classList.add('m'); else if (r.f === 'hand') sp.classList.add('hd'); else if (r.f === 'disp') sp.classList.add('dp');
      if (r.blur) { sp.style.filter = 'blur(' + (r.blur === true ? 4 : r.blur) + 'px)'; sp.style.userSelect = 'none'; sp.style.display = 'inline-block'; }
      if (r.base) { sp.style.verticalAlign = 'super'; sp.style.fontSize = (fs * .7).toFixed(1) + 'px'; }
      pe.appendChild(sp);
    });
    pe.style.fontSize = (mx || 34) + 'px';
    if (first && first.c) pe.style.color = first.c;
    if (p.empty && !pe.firstChild) pe.innerHTML = '&nbsp;';
  });
  return d;
}

function mkVideo(e, opt) {
  var bleed = e.w >= 88 && e.h >= 88;
  var d = h('div', 'el vid' + (bleed ? ' bleed' : '')); d.style.cssText = pos(e);
  var inn = h('div', 'in', d);
  if (opt.static) { if (e.poster) { var im = h('img', '', inn); im.src = e.poster; im.style.cssText = 'width:100%;height:100%;object-fit:cover'; } return d; }
  var v = document.createElement('video');
  v.playsInline = true; v.preload = 'metadata'; v.loop = !!e.loop; v.muted = !!e.mute; v.volume = clamp(e.vol == null ? .8 : e.vol, 0, 1);
  if (e.poster) v.poster = e.poster;
  v.src = e.src; inn.appendChild(v);
  var vc = h('div', 'vc', d); vc.setAttribute('data-noadvance', '');
  var pp = h('button', '', vc); pp.textContent = '⏯'; pp.title = 'Play / pause'; pp.dataset.act = 'pp';
  var mu = h('button', '', vc); mu.textContent = e.mute ? '🔇' : '🔊'; mu.title = 'Mute / unmute'; mu.dataset.act = 'mu';
  return d;
}

function mkOther(e, opt) {
  var d;
  if (e.k === 'embed') {
    d = h('div', 'el embed'); d.style.cssText = pos(e); var inn = h('div', 'in', d);
    if (e.poster) { var im = h('img', '', inn); im.src = e.poster; }
    var b = h('span', 'badge', inn); b.textContent = '▶  Online video — click to open'; d.setAttribute('data-noadvance', '');
    if (!opt.static) d.addEventListener('click', function (ev) { ev.stopPropagation(); window.open(e.url.replace('/embed/', '/watch?v=').replace(/\?feature.*$/, ''), '_blank', 'noopener'); });
  } else if (e.k === 'audio') {
    d = h('div', 'el audio'); d.style.cssText = pos(e); var i2 = h('div', 'in', d);
    var bt = h('button', '', i2); bt.textContent = '🔊'; d.setAttribute('data-noadvance', '');
    if (!opt.static) {
      var a = new Audio(e.src); a.volume = e.vol || .8; d.__audio = a;
      bt.addEventListener('click', function (ev) { ev.stopPropagation(); a.paused ? a.play() : a.pause(); });
    }
  } else if (e.k === 'line') {
    var wpx = e.w * W / 100, hpx = e.h * H / 100;
    d = h('div', 'el'); d.style.cssText = pos(e);
    var NS = 'http://www.w3.org/2000/svg', svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('class', 'svgline'); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 ' + Math.max(wpx, 1) + ' ' + Math.max(hpx, 1)); svg.setAttribute('preserveAspectRatio', 'none');
    var x1 = e.flipH ? wpx : 0, x2 = e.flipH ? 0 : wpx, y1 = e.flipV ? hpx : 0, y2 = e.flipV ? 0 : hpx;
    var ln = document.createElementNS(NS, 'line');
    [['x1', x1], ['y1', y1], ['x2', x2], ['y2', y2], ['stroke', e.color], ['stroke-width', Math.max(e.wpx, 3)], ['stroke-linecap', 'round']].forEach(function (kv) { ln.setAttribute(kv[0], kv[1]); });
    svg.appendChild(ln);
    if (e.arrow) {
      var ang = Math.atan2(y2 - y1, x2 - x1), L = 26, sp = 0.45, p = document.createElementNS(NS, 'polygon');
      p.setAttribute('points', [x2, y2, x2 - L * Math.cos(ang - sp), y2 - L * Math.sin(ang - sp), x2 - L * Math.cos(ang + sp), y2 - L * Math.sin(ang + sp)].join(','));
      p.setAttribute('fill', e.color); svg.appendChild(p);
    }
    d.appendChild(svg);
  }
  return d;
}

function mkEl(e, opt) {
  var d;
  switch (e.k) {
    case 'pic': case 'ink': d = mkPic(e, opt); break;
    case 'text': case 'shape': d = mkText(e); break;
    case 'video': d = mkVideo(e, opt); break;
    default: d = mkOther(e, opt);
  }
  if (!d) return null;
  d.dataset.id = e.id; if (e.mk) d.dataset.morph = e.mk; d.__d = e;
  if (e.hide0 && !opt.static) d.classList.add('pre');
  return d;
}

function mkChips(list) {
  var box = h('div', 'chips');
  list.slice(0, 3).forEach(function (u) {
    var a = h('a', 'chip', box); a.href = /^https?:/i.test(u) ? u : 'https://' + u; a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('data-noadvance', '');
    var b = h('b', '', a); b.textContent = 'source'; var s = h('span', '', a);
    s.textContent = u.replace(/^https?:\/\/(www\.)?/i, '');
  });
  return box;
}

/* ---------------------------------------------------------------- 4. slide view */
/** Build the DOM for one slide. opt.static -> no videos/loops/custom timers (thumbnails, presenter). */
function buildView(slide, opt) {
  opt = opt || {};
  var spec = slide.spec || {};
  var root = h('section', 'slide'); root.dataset.n = slide.key; root.dataset.sec = slide.section;
  var sc = h('div', 'sc', root), bg = h('div', 'bgf', sc), amb = h('div', 'amb', sc), els = h('div', 'els', sc);
  var view = { slide: slide, root: root, sc: sc, bg: bg, amb: amb, els: els, map: {}, timers: [], cleanups: [], k: 0, groups: [], entryAuto: [],
    cust: 0, opt: opt, t0: performance.now(), active: false, stopLoops: null, static: !!opt.static };
  var replaced = !!spec.render && !spec.keepBase;
  if (!replaced) {
    slide.els.forEach(function (e) {
      var d = mkEl(e, opt); if (d) { els.appendChild(d); view.map[e.id] = d; }
    });
    if (slide.chips) sc.appendChild(mkChips(slide.chips));
  }
  if (!opt.static) $$('p[data-bp]', els).forEach(function (p) { p.classList.add('bp-pre'); });
  var cu = h('div', 'custom', sc); view.custom = cu;
  var pb = h('div', 'pageback', root); view.pageback = pb;
  // steps
  if (!replaced) {
    var cur = null;
    slide.steps.forEach(function (st) {
      if (!st.auto) { cur = [st]; view.groups.push(cur); }
      else if (cur) cur.push(st); else view.entryAuto.push(st);
    });
  }
  view.cust = spec.steps | 0;
  view.total = view.groups.length + view.cust;
  view.ctx = mkCtx(view, opt);
  if (spec.render) safe(function () { spec.render(cu, view.ctx); }, 'render ' + slide.key);
  return view;
}
Deck.renderStatic = function (slide, container, k) {
  var v = buildView(slide, { static: true });
  setStepsInstant(v, k === undefined ? v.groups.length : Math.min(k, v.groups.length));
  container.appendChild(v.root); return v;
};

function mkCtx(view, opt) {
  var slide = view.slide;
  var c = { deck: Deck, slide: slide, view: view, el: view.custom, root: view.root, n: slide.n, id: slide.id, section: slide.section,
    static: !!opt.static, W: W, H: H, step: 0, steps: view.total, reduced: Deck.reduced() };
  c.onLeave = function (fn) { view.cleanups.push(fn); };
  c.timeout = function (fn, ms) { var t = setTimeout(function () { safe(fn, 'timeout'); }, ms); view.timers.push(t); return t; };
  c.interval = function (fn, ms) { var t = setInterval(function () { safe(fn, 'interval'); }, ms); view.cleanups.push(function () { clearInterval(t); }); return t; };
  c.tick = function (fn) {   // per-frame callback fn(dtMs, tMs); stops on leave
    var run = true, last = performance.now(), t0 = last;
    (function f(now) { if (!run) return; var dt = now - last; last = now; safe(function () { fn(dt, now - t0); }, 'tick'); requestAnimationFrame(f); })(last);
    view.cleanups.push(function () { run = false; });
  };
  c.q = function (s) { return $(s, view.root); }; c.qa = function (s) { return $$(s, view.root); };
  c.elapsed = function () { return performance.now() - view.t0; };
  c.html = function (htmlStr) { view.custom.innerHTML = htmlStr; return view.custom; };
  return c;
}

/* ---------------------------------------------------------------- 5. steps & effects */
function revealPara(el, pidx, fx, instant) {
  $$('p[data-bp="' + pidx + '"]', el).forEach(function (p) {
    p.classList.remove('bp-pre');
    if (!instant && fx) p.animate([{ clipPath: 'inset(0 100% 0 0)', opacity: .2 }, { clipPath: 'inset(0 0 0 0)', opacity: 1 }], { duration: Math.max(fx.d, 350), easing: 'ease-out', fill: 'backwards' });
  });
}
var CLIP = { l: 'inset(0 100% 0 0)', r: 'inset(0 0 0 100%)', t: 'inset(0 0 100% 0)', b: 'inset(100% 0 0 0)' };
var FLY = { l: '-160px 0px', r: '160px 0px', t: '0px -160px', b: '0px 160px' };
function animIn(el, fx) {
  var dur = Math.max(fx.d, 380), o = { duration: dur, easing: 'cubic-bezier(.22,.8,.3,1)', fill: 'backwards' }, fr = null;
  if (Deck.reduced()) { o.duration = 200; fr = [{ opacity: 0 }, { opacity: 1 }]; }
  else switch (fx.a) {
    case 'appear': return;
    case 'wipe': case 'ink': fr = [{ clipPath: CLIP[fx.dir || 'l'] }, { clipPath: 'inset(0 0 0 0)' }]; if (fx.a === 'ink') o.duration = Math.max(fx.d, 700); break;
    case 'zoom': fr = [{ opacity: 0, scale: '.6' }, { opacity: 1, scale: '1' }]; break;
    case 'fly': fr = [{ opacity: 0, translate: FLY[fx.dir || 'b'] }, { opacity: 1, translate: '0px 0px' }]; break;
    case 'circle': fr = [{ clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)' }]; o.duration = Math.max(fx.d, 700); break;
    case 'rise': fr = [{ opacity: 0, translate: '0px 40px' }, { opacity: 1, translate: '0px 0px' }]; break;
    default: fr = [{ opacity: 0 }, { opacity: 1 }];
  }
  var an = el.animate(fr, o);
  an.onfinish = function () { if (el.style) el.style.clipPath = ''; };
}
function fxApply(view, fx, instant) {
  fx.ids.forEach(function (id) {
    var el = view.map[id]; if (!el) return;
    if (fx.do === 'in') {
      if (fx.p !== undefined) { revealPara(el, fx.p, fx, instant); }
      else { el.classList.remove('pre'); if (!instant) animIn(el, fx); }
    } else if (fx.do === 'out') {
      if (instant || Deck.reduced()) el.classList.add('gone');
      else el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: Math.max(fx.d, 300), fill: 'forwards' }).onfinish = function () { el.classList.add('gone'); };
    } else if (fx.do === 'emph') {
      if (!instant && !Deck.reduced()) el.animate([{ scale: '1', filter: 'brightness(1)' }, { scale: '1.07', filter: 'brightness(1.35) drop-shadow(0 0 24px rgba(255,255,255,.65))' }, { scale: '1', filter: 'brightness(1)' }], { duration: 700, iterations: 2, easing: 'ease-in-out' });
    } else if (fx.do === 'play') {
      if (!instant) Media.play(el);
    }
  });
}
function runSteps(view, steps, instant) {
  steps.forEach(function (st) {
    st.fx.forEach(function (fx) {
      if (instant) fxApply(view, fx, true);
      else if (fx.t <= 0) fxApply(view, fx, false);
      else view.timers.push(setTimeout(function () { safe(function () { fxApply(view, fx, false); }, 'fx'); }, fx.t));
    });
  });
}
/** Show the slide in the state after k click-groups, no animation. */
function setStepsInstant(view, k) {
  $$('.el', view.root).forEach(function (el) { var d = el.__d; if (d && d.hide0) el.classList.add('pre'); el.classList.remove('gone'); });
  $$('p[data-bp]', view.root).forEach(function (p) { p.classList.add('bp-pre'); });
  runSteps(view, view.entryAuto, true);
  for (var i = 0; i < Math.min(k, view.groups.length); i++) runSteps(view, view.groups[i], true);
  view.k = k; view.ctx.step = k;
}

/* ---------------------------------------------------------------- 6. media */
var Media = Deck.Media = {
  play: function (el) {
    var v = $('video', el); if (v) {
      v.currentTime = 0;
      var p = v.play(); if (p && p.catch) p.catch(function () { v.muted = true; var b = $('[data-act=mu]', el); if (b) b.textContent = '🔇'; v.play().catch(function () {}); });
    }
    if (el.__audio) el.__audio.play().catch(function () {});
  },
  stopAll: function (view) {
    $$('video', view.root).forEach(function (v) { try { v.pause(); v.currentTime = 0; } catch (e) {} v.removeAttribute('src'); v.load(); });
    $$('.audio', view.root).forEach(function (a) { if (a.__audio) { a.__audio.pause(); a.__audio = null; } });
  }
};
document.addEventListener('click', function (ev) {
  var b = ev.target.closest && ev.target.closest('.vc button'); if (!b) return;
  ev.stopPropagation();
  var box = b.closest('.vid'), v = $('video', box);
  if (b.dataset.act === 'pp') { v.paused ? v.play() : v.pause(); }
  else { v.muted = !v.muted; b.textContent = v.muted ? '🔇' : '🔊'; }
}, true);

/* ---------------------------------------------------------------- activate / deactivate */
function activate(view, builtAll) {
  if (view.active) return; view.active = true; view.t0 = performance.now();
  var slide = view.slide, spec = slide.spec || {};
  if (builtAll) setStepsInstant(view, view.groups.length);
  // videos flagged autoplay (not driven by a step)
  $$('.vid', view.root).forEach(function (el) { var d = el.__d; if (d && d.auto && (!d.stepplay || builtAll)) Media.play(el); });
  $$('.audio', view.root).forEach(function (el) { Media.play(el); });
  if (!builtAll) runSteps(view, view.entryAuto, false);
  // groups that are auto-only with t offsets already handled; first click group waits for click
  view.stopLoops = window.Loops ? safe(function () { return window.Loops.start(view); }, 'loops') : null;
  if (spec.enter) safe(function () { spec.enter(view.custom, view.ctx); }, 'enter ' + slide.key);
  if (builtAll && view.cust && spec.step) { for (var i = 1; i <= view.cust; i++) safe(function () { spec.step(view.custom, i, view.ctx); }, 'step'); view.k = view.total; view.ctx.step = view.k; }
  Deck.emit('enter', slide, view);
  warm(slide);
}
function deactivate(view) {
  if (!view || view.deactivated) return; view.deactivated = true;
  var spec = view.slide.spec || {};
  view.timers.forEach(function (t) { clearTimeout(t); });
  if (view.stopLoops) safe(view.stopLoops, 'stopLoops');
  if (spec.leave) safe(function () { spec.leave(view.custom, view.ctx); }, 'leave');
  view.cleanups.forEach(function (f) { safe(f, 'cleanup'); });
  Media.stopAll(view);
  Deck.emit('leave', view.slide, view);
}
/** warm the cache for the next slide's images so transitions never show blank cards */
var warmed = {};
function warm(slide) {
  var o = Deck.order(), i = o.indexOf(slide); var nx = o[i + 1]; if (!nx) return;
  (nx.els || []).forEach(function (e) { if (e.src && /\.(png|jpe?g|webp|svg|gif)$/i.test(e.src) && !warmed[e.src]) { warmed[e.src] = 1; var im = new Image(); im.src = e.src; } });
}

/* ---------------------------------------------------------------- 7. stage fit */
var stage, viewport, zoomState = null;
function fit() {
  var vw = innerWidth, vh = (viewport && viewport.clientHeight) || innerHeight, s = Math.min(vw / W, vh / H);   // viewport may leave room for the topic bar
  Deck.scale = s; Deck.offX = (vw - W * s) / 2; Deck.offY = (vh - H * s) / 2;
  if (zoomState) return;
  stage.style.transform = 'translate(' + Deck.offX + 'px,' + Deck.offY + 'px) scale(' + s + ')';
  Deck.emit('fit', s);
}
Deck.setZoom = function (z) {   // z: null or {k, cx, cy} in viewport px (magnifier)
  zoomState = z;
  if (!z) { stage.classList.add('zoomed'); fit(); setTimeout(function () { stage.classList.remove('zoomed'); }, 400); return; }
  var s = Deck.scale * z.k;
  var tx = z.cx - (z.cx - Deck.offX) * z.k, ty = z.cy - (z.cy - Deck.offY) * z.k;
  stage.classList.add('zoomed');
  stage.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')';
};
Deck.stagePoint = function (cx, cy) { return { x: (cx - Deck.offX) / Deck.scale, y: (cy - Deck.offY) / Deck.scale }; };

/* ---------------------------------------------------------------- 8. transitions */
var trans = null;       // active transition {end()}
function kill(a) { try { a.cancel(); } catch (e) {} }
function geomOf(e) { return { cx: (e.x + e.w / 2) * W / 100, cy: (e.y + e.h / 2) * H / 100, w: Math.max(e.w * W / 100, 1), h: Math.max(e.h * H / 100, 1), r: e.rot || 0 }; }
function near(a, ref) { return ref + (((a - ref) % 360) + 540) % 360 - 180; }
function sigOf(e) {
  if (e.k === 'pic' || e.k === 'ink' || e.k === 'video') return 'm:' + e.src;
  if (e.k === 'text') return 't:' + (e.paras || []).map(function (p) { return p.runs.map(function (r) { return r.t || ''; }).join(''); }).join('\n').trim();
  return 's';
}
function framesFromTo(f, t, isText, toRest) {
  // element rendered with geometry f, animate so it ends as geometry t (toRest=false) or: element has geometry t, starts as f (toRest=true)
  var gf = geomOf(f), gt = geomOf(t);
  var base = toRest ? gt : gf, other = toRest ? gf : gt;
  var off = { translate: (other.cx - base.cx) + 'px ' + (other.cy - base.cy) + 'px', scale: isText ? '1 1' : (other.w / base.w) + ' ' + (other.h / base.h), rotate: near(other.r, base.r) + 'deg' };
  var rest = { translate: '0px 0px', scale: '1 1', rotate: base.r + 'deg' };
  return toRest ? [off, rest] : [rest, off];
}
function transitionMs(slide, T) { return T.type === 'morph' ? T.ms : clamp(T.ms || 800, 600, 1000); }

function imagesReady(view) {
  var imgs = $$('img', view.root).filter(function (i) { return !i.complete; });
  if (!imgs.length) return Promise.resolve();
  return Promise.race([Promise.all(imgs.map(function (i) { return i.decode ? i.decode().catch(function () {}) : Promise.resolve(); })), new Promise(function (r) { setTimeout(r, 600); })]);
}

/** run a transition between view A (leaving) and B (entering). dir=+1 forward, -1 back. T = transition spec in force. */
function runTransition(A, B, T, dir) {
  var ms = transitionMs(B.slide, T), type = T.type, anims = [], extra = [];
  if (Deck.reduced() || !A) { type = A ? 'fade' : 'none'; ms = 220; }
  if (type === 'morph' && !canMorph(A, B)) { type = 'xfade'; ms = 800; }
  stage.appendChild(B.root);
  var o = { duration: ms, easing: EASE, fill: 'forwards' };
  function an(el, fr, opts) { var a = el.animate(fr, Object.assign({}, o, opts || {})); anims.push(a); return a; }
  A.root.style.zIndex = 1; B.root.style.zIndex = 2;
  var cleanup = function () {};
  switch (type) {
    case 'none': ms = 0; break;
    case 'slide': case 'pageturn': case 'peel': {   // page flips retired: both now slide left (right on Back)
      var dx = dir > 0 ? 100 : -100;
      an(A.root, [{ transform: 'translateX(0)' }, { transform: 'translateX(' + (-dx) + '%)' }]);
      an(B.root, [{ transform: 'translateX(' + dx + '%)' }, { transform: 'translateX(0)' }]);
      break;
    }
    case 'fade': an(B.root, [{ opacity: 0 }, { opacity: 1 }]); break;
    case 'xfade':   // unmatched morph: true crossfade, old fades out while new fades in
      an(B.root, [{ opacity: 0 }, { opacity: 1 }], { easing: 'cubic-bezier(.4,0,.6,1)' });
      an(A.root, [{ opacity: 1 }, { opacity: 0 }], { easing: 'cubic-bezier(.4,0,.6,1)', delay: ms * .1, duration: ms * .9 });
      break;
    case 'circle': an(B.root, [{ clipPath: 'circle(0% at 50% 50%)' }, { clipPath: 'circle(75% at 50% 50%)' }]); break;
    case 'wipe': an(B.root, dir > 0 ? [{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0 0 0)' }] : [{ clipPath: 'inset(0 0 0 100%)' }, { clipPath: 'inset(0 0 0 0)' }]); break;
    case 'cover':
      if (dir > 0) { an(B.root, [{ transform: 'translateX(100%)' }, { transform: 'translateX(0)' }]); an(A.root, [{ transform: 'translateX(0)', filter: 'brightness(1)' }, { transform: 'translateX(-12%)', filter: 'brightness(.5)' }]); }
      else { A.root.style.zIndex = 3; B.root.style.zIndex = 1; an(A.root, [{ transform: 'translateX(0)' }, { transform: 'translateX(100%)' }]); an(B.root, [{ transform: 'translateX(-12%)', filter: 'brightness(.5)' }, { transform: 'translateX(0)', filter: 'brightness(1)' }]); }
      break;
    case 'pull':
      if (dir > 0) { A.root.style.zIndex = 3; B.root.style.zIndex = 1; an(A.root, [{ transform: 'translateX(0)' }, { transform: 'translateX(-100%)' }]); an(B.root, [{ transform: 'translateX(8%)', filter: 'brightness(.55)' }, { transform: 'translateX(0)', filter: 'brightness(1)' }]); }
      else { an(B.root, [{ transform: 'translateX(-100%)' }, { transform: 'translateX(0)' }]); }
      break;
    case 'morph': cleanup = morph(A, B, ms, T, anims) || cleanup; break;
  }
  var done = new Promise(function (res) {
    var ended = false;
    trans = { end: function () {
      if (ended) return; ended = true;
      anims.forEach(function (a) { try { a.finish(); } catch (e) {} });
      anims.forEach(kill);
      cleanup();
      [A, B].forEach(function (v) { v.root.style.zIndex = ''; v.root.style.transform = ''; v.root.style.clipPath = ''; v.root.style.filter = ''; v.root.style.opacity = ''; v.root.classList.remove('morphing'); v.pageback.style.transform = ''; });
      trans = null; res();
    } };
    if (!anims.length) { setTimeout(trans.end, 0); }
    else Promise.all(anims.map(function (a) { return a.finished.catch(function () {}); })).then(function () { if (trans) trans.end(); });
  });
  return { done: done, type: type };
}

/* ---- morph (FLIP between explicit morph keys) ---- */
function canMorph(A, B) {
  var ka = {}; $$('[data-morph]', A.root).forEach(function (e) { ka[e.dataset.morph] = 1; });
  return $$('[data-morph]', B.root).some(function (e) { return ka[e.dataset.morph]; });
}
function morph(A, B, ms, T, anims) {
  B.root.classList.add('morphing');
  var rise = T.rise || 28, sine = T.rise ? 'cubic-bezier(.45,.05,.55,.95)' : EASE;
  var base = { duration: ms, easing: sine, fill: 'backwards' };
  var aM = {}, bM = {};
  $$('[data-morph]', A.root).forEach(function (e) { aM[e.dataset.morph] = e; });
  $$('[data-morph]', B.root).forEach(function (e) { bM[e.dataset.morph] = e; });
  function add(el, fr, o) { var a = el.animate(fr, Object.assign({}, base, o || {})); anims.push(a); return a; }
  // background colour glide, content-less parts fade
  add(B.bg, [{ opacity: 0 }, { opacity: 0, offset: .72 }, { opacity: 1 }], { easing: 'linear' });
  add(B.amb, [{ opacity: 0 }, { opacity: 1 }], { delay: ms * .5, duration: ms * .5 });
  var ch = $('.chips', B.root); if (ch) add(ch, [{ opacity: 0 }, { opacity: 1 }], { delay: ms * .5, duration: ms * .5 });
  var chA = $('.chips', A.root); if (chA) chA.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms * .35, fill: 'forwards' });
  var inA = {};
  Object.keys(aM).forEach(function (k) {
    var a = aM[k], b = bM[k]; inA[k] = 1;
    if (!b || b.classList.contains('pre')) { fadeOutOld(a); return; }
    var da = a.__d, db = b.__d, isText = db.k === 'text';
    if (sigOf(da) === sigOf(db)) {
      a.style.visibility = 'hidden';
      add(b, framesFromTo(da, db, isText, true));
    } else {            // content changes: ghost (old) glides + fades out, new glides + fades in
      add(a, framesFromTo(da, db, isText, false).map(function (f, i) { return Object.assign({}, f, { opacity: i ? 0 : 1 }); }), { fill: 'forwards' });
      add(b, framesFromTo(da, db, isText, true).map(function (f, i) { return Object.assign({}, f, { opacity: i ? 1 : 0 }); }));
    }
  });
  $$('.el', A.root).forEach(function (a) { if (!a.dataset.morph || !bM[a.dataset.morph]) fadeOutOld(a); });
  $$('.el', B.root).forEach(function (b) {
    if ((b.dataset.morph && aM[b.dataset.morph]) || b.classList.contains('pre')) return;
    add(b, [{ opacity: 0, translate: '0px ' + rise + 'px' }, { opacity: 1, translate: '0px 0px' }], { delay: ms * .3, duration: ms * .7 });
  });
  function fadeOutOld(a) { var an = a.animate([{ opacity: 1 }, { opacity: 0 }], { duration: ms * .45, easing: 'ease-in', fill: 'forwards' }); anims.push(an); }
  return function () {};
}

/* ---------------------------------------------------------------- 9. navigation */
var pendingTarget = null;
/** Show a slide. opts: {dir: +1|-1, builtAll: bool, instant: bool, step: n} */
Deck.show = function (slide, opts) {
  opts = opts || {};
  if (!slide) return Promise.resolve();
  if (trans) trans.end();
  if (Deck.busy) { pendingTarget = [slide, opts]; return Promise.resolve(); }
  if (Deck.cur === slide && !opts.force) return Promise.resolve();
  Deck.busy = true;
  var A = Deck.view, from = Deck.cur;
  var dir = opts.dir || ((from && slide.pos < from.pos) ? -1 : 1);
  var B = buildView(slide, {});
  var builtAll = opts.builtAll !== undefined ? opts.builtAll : dir < 0;
  if (builtAll) setStepsInstant(B, B.groups.length);
  Deck.cur = slide; Deck.view = B;
  if (history.replaceState) { try { history.replaceState(null, '', '#/' + slide.key); } catch (e) {} }
  Deck.emit('show', slide, B);
  var go;
  if (!A || opts.instant) {
    stage.appendChild(B.root);
    if (A) { deactivate(A); A.root.remove(); }
    go = Promise.resolve();
    activate(B, builtAll);
    if (opts.step) { for (var i = 0; i < opts.step; i++) stepForward(true); }
    finish();
    return Promise.resolve();
  }
  deactivate(A);
  var T = dir > 0 ? slide.tr : from.tr, ref = dir > 0 ? A : B;
  // morph only if the two slides are consecutive originals
  if (T.type === 'morph') {
    var late = dir > 0 ? slide : from, early = dir > 0 ? from : slide;
    if (!(late.orig && early.orig && late.orig === early.orig + 1)) T = { type: 'xfade', ms: 800 };
  }
  // stage the incoming slide, wait for images, then animate
  stage.appendChild(B.root); B.root.style.visibility = 'hidden';
  return imagesReady(B).then(function () {
    B.root.style.visibility = '';
    var tr = runTransition(A, B, T, dir);
    // new slide's own loops start as soon as the turn is under way
    return tr.done;
  }).then(function () {
    A.root.remove(); activate(B, builtAll); finish();
  }, function (err) { console.error('[deck] transition failed', err); A.root.remove(); activate(B, builtAll); finish(); });
  function finish() { Deck.busy = false; Deck.emit('state'); if (pendingTarget) { var p = pendingTarget; pendingTarget = null; Deck.show(p[0], p[1]); } }
};
function stepForward(silent) {
  var v = Deck.view; if (!v || v.k >= v.total) return false;
  var k = v.k;
  if (k < v.groups.length) { runSteps(v, v.groups[k], false); }
  else { var i = k - v.groups.length + 1, sp = v.slide.spec || {}; if (sp.step) safe(function () { sp.step(v.custom, i, v.ctx); }, 'step'); }
  v.k = k + 1; v.ctx.step = v.k;
  if (!silent) { Deck.emit('step', v.k, v); Deck.emit('state'); }
  return true;
}
function stepBack() {
  var v = Deck.view; if (!v || v.k <= 0) return false;
  var k = v.k - 1;
  if (k < v.groups.length) { v.timers.forEach(clearTimeout); v.timers = []; setStepsInstant(v, k); }
  else { var i = k - v.groups.length + 1, sp = v.slide.spec || {}; if (sp.unstep) safe(function () { sp.unstep(v.custom, i, v.ctx); }, 'unstep'); }
  v.k = k; v.ctx.step = k; Deck.emit('step', k, v); Deck.emit('state'); return true;
}
Deck.next = function () {
  if (!Deck.cur || Deck.busy && !trans) return;
  if (trans) { trans.end(); }
  if (stepForward()) return;
  var o = Deck.order(), nx = o.filter(function (s) { return s.pos > Deck.cur.pos; })[0];
  if (nx) Deck.show(nx, { dir: 1, builtAll: false }); else Deck.toast && Deck.toast('End of deck');
};
Deck.prev = function () {
  if (!Deck.cur) return;
  if (trans) { trans.end(); }
  if (stepBack()) return;
  var o = Deck.order().filter(function (s) { return s.pos < Deck.cur.pos; }), pv = o[o.length - 1];
  if (pv) Deck.show(pv, { dir: -1, builtAll: true }); else Deck.toast && Deck.toast('First slide');
};
Deck.first = function () { var o = Deck.order(); Deck.show(o[0], { dir: -1, builtAll: false }); };
Deck.last = function () { var o = Deck.order(); Deck.show(o[o.length - 1], { dir: 1, builtAll: true }); };
Deck.goto = function (key, opts) {
  var s = typeof key === 'object' ? key : Deck.find(key); if (!s) { Deck.toast && Deck.toast('No slide ' + key); return; }
  if (trans) trans.end();
  Deck.show(s, Object.assign({ dir: (Deck.cur && s.pos < Deck.cur.pos) ? -1 : 1, builtAll: Deck.cur && s.pos < Deck.cur.pos }, opts || {}));
};
Deck.state = function () { return { key: Deck.cur && Deck.cur.key, step: Deck.view ? Deck.view.k : 0, includeHidden: Deck.includeHidden }; };
Deck.position = function () {   // {i, n} within active order
  var o = Deck.order(), i = o.indexOf(Deck.cur); if (i < 0) { i = o.filter(function (s) { return s.pos < Deck.cur.pos; }).length; }
  return { i: i + 1, n: o.length };
};

/* ---------------------------------------------------------------- 10. pointer extras */
var tiltEl = null, tiltRaf = 0, lastPT = null;
function onMove(ev) {
  lastPT = ev;
  if (tiltRaf) return;
  tiltRaf = requestAnimationFrame(function () {
    tiltRaf = 0; var t = lastPT && lastPT.target && lastPT.target.closest ? lastPT.target.closest('.pic.tilt') : null;
    if (tiltEl && tiltEl !== t) resetTilt(tiltEl);
    tiltEl = t; if (!t) return;
    var r = t.getBoundingClientRect(), x = (lastPT.clientX - r.left) / r.width - .5, y = (lastPT.clientY - r.top) / r.height - .5, inn = t.firstChild;
    inn.style.setProperty('--ry', (x * 9).toFixed(2) + 'deg'); inn.style.setProperty('--rx', (-y * 9).toFixed(2) + 'deg'); inn.style.setProperty('--sc', 1.025);
  });
}
function resetTilt(t) { var i = t.firstChild; if (i && i.style) { i.style.setProperty('--ry', '0deg'); i.style.setProperty('--rx', '0deg'); i.style.setProperty('--sc', 1); } }
var lb, lbimg;
Deck.lightbox = function (src) { lbimg.src = src; lb.classList.add('on'); };
Deck.closeLightbox = function () { lb.classList.remove('on'); lbimg.removeAttribute('src'); };
Deck.lightboxOpen = function () { return lb.classList.contains('on'); };

function onStageClick(ev) {
  if (Deck.clickHook && Deck.clickHook(ev)) return;
  if (Deck.lightboxOpen()) return;
  var t = ev.target;
  var z = t.closest && t.closest('.zoomable');
  if (z) { var im = $('img', z); if (im) { Deck.lightbox(im.currentSrc || im.src); return; } }
  if (t.closest && t.closest('a,button,input,select,textarea,video,[data-noadvance],.chip')) return;
  Deck.next();
}

/* ---------------------------------------------------------------- 11. start */
Deck.toast = null;     // set by ui.js
Deck.start = function () {
  stage = $('#stage'); viewport = $('#viewport'); lb = $('#lightbox'); lbimg = $('img', lb);
  var q = location.search + location.hash;
  Deck.mode = /presenter/.test(location.search) ? 'presenter' : 'main';
  buildList();
  fit(); addEventListener('resize', fit);
  stage.addEventListener('click', onStageClick);
  stage.addEventListener('pointermove', onMove);
  lb.addEventListener('click', Deck.closeLightbox);
  addEventListener('hashchange', function () { var m = /^#\/(.+)$/.exec(location.hash); if (m && Deck.cur && decodeURIComponent(m[1]) !== Deck.cur.key) Deck.goto(decodeURIComponent(m[1])); });
  Deck.emit('ready');
  if (Deck.mode === 'presenter') return;
  var m = /^#\/(.+)$/.exec(location.hash), s = m && Deck.find(decodeURIComponent(m[1]));
  if (!s) s = Deck.order()[0];
  var go = function () { Deck.show(s, { instant: true, dir: 1, builtAll: false }); };
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(go); else go();
};
})();
