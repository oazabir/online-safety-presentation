/* ============================================================================
   loops.js - ambient looping animation library + automatic per-slide assignment
   Each loop: fn(view, o) -> optional cleanup. Layers live in view.amb (behind content) or are
   appended to view.sc (above content). Only the active slide is ever running a loop (engine
   stops loops at leave). Override per slide with `loop: 'name' | ['a','b'] | false` (data or registerSlide).
   Loops: glow, beam, sparks, kenburns2, orbs, particles, embers, kenburns, float, pulse, shimmer, scan, stars, aurora, grid, underline, caret, calm
   ============================================================================ */
(function () {
'use strict';
var Loops = window.Loops = { lib: {}, names: [] };
var SEC = { problem: ['34,211,238', '255,176,32'], why: ['255,122,26', '255,77,77'], treat: ['255,176,32', '255,122,26'],
  grooming: ['150,24,38', '90,14,20'], protect: ['46,229,157', '34,211,238'], evidence: ['255,176,32', '244,241,234'] };
function rng(seed) { var s = (seed * 2654435761) >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function div(cls, parent, style) { var d = document.createElement('div'); d.className = cls; if (style) d.style.cssText = style; (parent || null) && parent.appendChild(d); return d; }
function seedOf(view) { return (view.slide.n || (view.slide.pos + 1) * 7) + 11; }
function colors(view) { return SEC[view.slide.section] || SEC.problem; }
function picks(view, sel) { return Array.prototype.slice.call(view.root.querySelectorAll(sel)); }
function fmax(el) { var m = 0; Array.prototype.forEach.call(el.querySelectorAll('span,a'), function (s) { m = Math.max(m, parseFloat(s.style.fontSize) || 0); }); return m; }

var L = Loops.lib;
/* glow orbs drifting slowly */
L.orbs = function (view, o) {
  var r = rng(seedOf(view)), c = colors(view), n = (o && o.n) || 3;
  for (var i = 0; i < n; i++) {
    var ob = div('orb' + ((o && o.strong) ? ' strong' : ''), view.amb, '--c:' + c[i % 2] + ';--x:' + Math.round(200 + r() * 1500) + 'px;--y:' + Math.round(100 + r() * 880) + 'px;--sz:' + Math.round(800 + r() * 700) + 'px;--dx:' + Math.round((r() - .5) * 420) + 'px;--dy:' + Math.round((r() - .5) * 300) + 'px;--t:' + Math.round(30 + r() * 24) + 's;animation-delay:' + (-r() * 20).toFixed(1) + 's');
  }
};
/* clearly visible variants (used where the default ambience is too quiet): bright orbs, a light beam over the content, warm sparks, stronger Ken Burns */
L.glow = function (view) { L.orbs(view, { n: 3, strong: true }); };
L.beam = function (view) { var d = div('sweep strong', view.sc); d.style.animationDelay = (-(seedOf(view) % 3)) + 's'; return function () { d.remove(); }; };
L.sparks = function (view) {
  var r = rng(seedOf(view) + 9), made = [];
  for (var i = 0; i < 26; i++) {
    var sz = 3 + r() * 6;
    made.push(div('pt spark', view.sc, '--c:255,184,96;--x:' + Math.round(r() * 1920) + 'px;--s:' + sz.toFixed(1) + 'px;--o:' + (.55 + r() * .4).toFixed(2) + ';--t:' + Math.round(13 + r() * 12) + 's;--d:' + (-r() * 24).toFixed(1) + 's;--dx:' + Math.round((r() - .5) * 200) + 'px'));
  }
  return function () { made.forEach(function (m) { m.remove(); }); };
};
L.kenburns2 = function (view) {
  var best = null, area = 0;
  picks(view, '.el.pic:not(.cut)').forEach(function (p) { var d = p.__d; var a = d.w * d.h * (d.bleed ? 2 : 1); if (a > area) { area = a; best = p; } });
  if (!best) return;
  var img = best.querySelector('img'), r = rng(seedOf(view));
  img.classList.add('kb'); img.style.setProperty('--t', '20s'); img.style.setProperty('--ks', '1.2');
  img.style.setProperty('--kx', ((r() > .5 ? 1 : -1) * 3.5).toFixed(1) + '%'); img.style.setProperty('--ky', ((r() > .5 ? 1 : -1) * 2.5).toFixed(1) + '%');
  return function () { img.classList.remove('kb'); };
};
/* rising dust / bokeh */
function dust(view, n, col, opts) {
  var r = rng(seedOf(view) + 3); opts = opts || {};
  for (var i = 0; i < n; i++) {
    var s = (opts.min || 2) + r() * (opts.max || 6);
    div('pt', view.amb, '--c:' + col + ';--x:' + Math.round(r() * 1920) + 'px;--s:' + s.toFixed(1) + 'px;--o:' + (.18 + r() * (opts.o || .4)).toFixed(2) + ';--t:' + Math.round((opts.t || 16) + r() * 20) + 's;--d:' + (-r() * 30).toFixed(1) + 's;--dx:' + Math.round((r() - .5) * 220) + 'px');
  }
}
L.particles = function (view) { var c = colors(view); dust(view, 30, c[0], {}); dust(view, 8, c[1], { min: 4, max: 9, o: .25, t: 24 }); };
L.embers = function (view) { var c = colors(view); dust(view, 12, c[0], { min: 2, max: 4, o: .35, t: 26 }); view.amb.classList.add('dim'); };
/* slow Ken Burns on the biggest photo */
L.kenburns = function (view, o) {
  var best = null, area = 0;
  picks(view, '.el.pic:not(.cut)').forEach(function (p) { var d = p.__d; var a = d.w * d.h * (d.bleed ? 2 : 1); if (a > area) { area = a; best = p; } });
  if (!best || area < 600) { L.orbs(view); return; }
  var img = best.querySelector('img'), r = rng(seedOf(view));
  img.classList.add('kb'); img.style.setProperty('--t', Math.round(30 + r() * 14) + 's');
  img.style.setProperty('--kx', ((r() - .5) * 3).toFixed(1) + '%'); img.style.setProperty('--ky', ((r() - .5) * 2.5).toFixed(1) + '%');
  return function () { img.classList.remove('kb'); };
};
/* screenshot cards bob gently */
L.float = function (view) {
  var r = rng(seedOf(view)), cards = picks(view, '.el.pic.card').filter(function (e) { return !e.__d.bleed; }).slice(0, 8);
  if (!cards.length) { L.shimmer(view); return; }
  cards.forEach(function (e) { e.classList.add('bob'); e.style.setProperty('--t', (6 + r() * 5).toFixed(1) + 's'); e.style.setProperty('--d', (-r() * 6).toFixed(1) + 's'); });
  return function () { cards.forEach(function (e) { e.classList.remove('bob'); }); };
};
/* pulsing glow on big numbers / key text */
L.pulse = function (view) {
  var els = picks(view, '.el.txt').filter(function (e) { return fmax(e) >= 56 && /\d/.test(e.textContent); });
  if (!els.length) els = picks(view, '.el.txt').filter(function (e) { return fmax(e) >= 80; }).slice(0, 2);
  if (!els.length) { L.shimmer(view); return; }
  els.forEach(function (e) { e.classList.add('pulse-n'); });
  return function () { els.forEach(function (e) { e.classList.remove('pulse-n'); }); };
};
/* diagonal light sweep */
L.shimmer = function (view) { var d = div('sweep', view.amb); d.style.animationDelay = (-(seedOf(view) % 5)) + 's'; };
/* scanlines for screens/chats (above content, very faint) */
L.scan = function (view) { var d = div('scan', view.sc); d.style.opacity = '.6'; return function () { d.remove(); }; };
/* starfield: now provided globally by sky.js (one canvas behind the whole stage), so this per-slide loop adds nothing */
L.stars = function (view) { };
/* slow aurora bands */
L.aurora = function (view) {
  var r = rng(seedOf(view)), c = colors(view);
  for (var i = 0; i < 3; i++) div('aur', view.amb, '--c:' + c[i % 2] + ';--x:' + Math.round(500 + i * 450 + r() * 200) + 'px;--y:' + Math.round(200 + i * 330 + r() * 120) + 'px;--t:' + Math.round(26 + r() * 20) + 's;--r0:' + Math.round(-14 + r() * 8) + 'deg;--r1:' + Math.round(4 + r() * 12) + 'deg;animation-delay:' + (-r() * 15).toFixed(1) + 's');
};
/* receding tech grid */
L.grid = function (view) { div('grid3d', view.amb); L.orbs(view, { n: 2 }); };
/* animated underline sweep beneath the title */
L.underline = function (view) {
  var t = picks(view, '.el.txt.title')[0] || picks(view, '.el.txt').filter(function (e) { return fmax(e) >= 70; })[0];
  if (!t) { L.shimmer(view); return; }
  var ps = t.querySelectorAll('p'), p = ps[ps.length - 1];
  var bar = div('ulbar', t); bar.style.left = (p.offsetLeft + 6) + 'px'; bar.style.top = (p.offsetTop + p.offsetHeight + 6) + 'px';
  return function () { bar.remove(); };
};
/* blinking terminal caret after mono text */
L.caret = function (view) {
  var m = picks(view, '.el.txt').filter(function (e) { return e.querySelector('.m'); }).sort(function (a, b) { return b.textContent.length - a.textContent.length; })[0];
  if (!m) return;
  // absolutely positioned after the last glyph (measured), so it can never wrap onto its own line or cover text
  var sps = m.querySelectorAll('span.m'), sp = sps[sps.length - 1], c = document.createElement('span'); c.className = 'caret';
  if (!sp || !m.offsetWidth) return;
  var r = document.createRange(); r.selectNodeContents(sp);
  var rects = r.getClientRects(), q = rects[rects.length - 1], tb = m.getBoundingClientRect(); if (!q) return;
  var k = tb.width / m.offsetWidth, fs = parseFloat(getComputedStyle(sp).fontSize) || 40, hh = Math.round(fs * 1.02);
  c.style.cssText = 'position:absolute;margin:0;left:' + ((q.right - tb.left) / k + fs * .08) + 'px;top:' + ((q.top - tb.top) / k + (q.height / k - hh) / 2) + 'px;width:' + Math.round(fs * .52) + 'px;height:' + hh + 'px';
  m.appendChild(c);
  return function () { c.remove(); };
};
/* video slides: only a very slow, dim glow */
L.calm = function (view) {
  var c = colors(view); view.amb.classList.add('dim');
  div('orb', view.amb, '--c:' + c[0] + ';--x:420px;--y:300px;--sz:1100px;--dx:120px;--dy:60px;--t:90s');
};
Loops.names = Object.keys(L);

/* ---- automatic assignment (by section + content, rotated by slide number for variety) ---- */
Loops.assign = function (slide, view) {
  var sp = slide.spec || {}, ov = sp.loop !== undefined ? sp.loop : slide.loop;
  if (ov === false) return [];
  if (ov) return Array.isArray(ov) ? ov : [ov];
  if (Deck.isCalm(slide)) return ['calm'];
  var els = slide.els || [], n = slide.n || (slide.pos + 3);
  var cards = els.filter(function (e) { return e.card && !e.bleed; }).length;
  var bleed = els.some(function (e) { return e.bleed && e.k === 'pic'; });
  var bigNum = els.some(function (e) { return e.k === 'text' && /\d/.test(e.paras.map(function (p) { return p.runs.map(function (r) { return r.t || ''; }).join(''); }).join('')) && e.paras.some(function (p) { return p.runs.some(function (r) { return r.sz >= 56; }); }); });
  var title = els.some(function (e) { return e.title || (e.k === 'text' && e.paras.some(function (p) { return p.runs.some(function (r) { return r.sz >= 70; }); })); });
  var mono = els.some(function (e) { return e.k === 'text' && e.paras.some(function (p) { return p.runs.some(function (r) { return r.f === 'mono'; }); }); });
  var rot = function (arr) { return arr[n % arr.length]; };
  switch (slide.section) {
    case 'problem':
      if (bleed) return ['kenburns', 'orbs'];
      if (bigNum) return ['orbs', 'pulse'];
      if (cards >= 2) return ['orbs', rot(['float', 'shimmer', 'float'])];
      return ['orbs', rot(['underline', 'shimmer', 'kenburns'])];
    case 'why':
      if (bleed) return ['kenburns', 'particles'];
      if (cards >= 2) return ['particles', 'float'];
      return ['particles', rot(['pulse', 'underline', 'shimmer', 'kenburns'])];
    case 'treat':
      return bleed ? ['kenburns', 'particles'] : ['orbs', 'particles', title ? 'underline' : 'float'];
    case 'grooming':
      if (mono) return ['scan', 'caret', 'embers'];
      if (bleed) return ['kenburns', 'embers'];
      return ['embers', rot(['scan', 'shimmer'])];
    case 'protect':
      if (n >= 87 && n <= 94) return ['grid', rot(['float', 'shimmer'])];
      if (cards >= 2) return ['aurora', 'float'];
      return ['aurora', rot(['shimmer', 'underline', 'float', 'kenburns'])];
    default:  // evidence & close
      if (bleed) return ['kenburns', 'stars'];
      return ['stars', rot(['underline', 'pulse', 'float', 'shimmer'])];
  }
};

Loops.start = function (view) {
  var names = Loops.assign(view.slide, view), cleanups = [];
  view.loopNames = names;
  names.forEach(function (nm) {
    var f = L[nm]; if (!f) { console.warn('unknown loop', nm); return; }
    try { var c = f(view); if (typeof c === 'function') cleanups.push(c); } catch (e) { console.error('loop ' + nm, e); }
  });
  var vis = function () { view.root.classList.toggle('paused', document.hidden || !!Loops.paused); };
  document.addEventListener('visibilitychange', vis); vis();
  return function () {
    document.removeEventListener('visibilitychange', vis);
    cleanups.forEach(function (c) { try { c(); } catch (e) {} });
    Array.prototype.forEach.call(view.amb.children, function (ch) { ch.remove(); });
  };
};
Loops.setPaused = function (p) { Loops.paused = p; if (Deck.view) Deck.view.root.classList.toggle('paused', p || document.hidden); };
})();
