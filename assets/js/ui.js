/* ============================================================================
   ui.js - presenter tools: keyboard, progress, overview, presenter window, laser,
   spotlight, magnifier, blackout, fullscreen, help, swipe, idle cursor
   ============================================================================ */
(function () {
'use strict';
var $ = Deck.$, $$ = Deck.$$, h = Deck.h;
var toastEl, toastT, counter, counterT, prog;

/* ---------------------------------------------------------------- toast */
Deck.toast = function (msg, ms) {
  toastEl = toastEl || $('#toast'); toastEl.textContent = msg; toastEl.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(function () { toastEl.classList.remove('show'); }, ms || 1600);
};

/* ---------------------------------------------------------------- progress + counter */
function updateHud() {
  if (!Deck.cur) return;
  var p = Deck.position(); prog = prog || $('#progress i'); counter = counter || $('#counter');
  prog.style.width = (100 * p.i / p.n) + '%';
  counter.textContent = p.i + ' / ' + p.n + (Deck.cur.hidden ? '  ·  hidden' : '');
}
function flashCounter() {
  counter = counter || $('#counter'); counter.classList.add('show');
  clearTimeout(counterT); counterT = setTimeout(function () { counter.classList.remove('show'); }, 2300);
}

/* ---------------------------------------------------------------- idle cursor + mouse feed */
var idleT, mouse = { x: innerWidth / 2, y: innerHeight / 2 };
addEventListener('mousemove', function (e) {
  mouse.x = e.clientX; mouse.y = e.clientY;
  document.body.classList.remove('hide-cursor'); flashCounter();
  clearTimeout(idleT);
  idleT = setTimeout(function () { if (!Laser.on) document.body.classList.add('hide-cursor'); }, 3200);
  if (Spot.on) Spot.move(e);
  if (Mag.zoomed) Mag.pan(e);
});

/* ---------------------------------------------------------------- blackout / fullscreen */
function toggleBlack() { $('#blackout').classList.toggle('on'); }
function toggleFS() {
  if (document.fullscreenElement) document.exitFullscreen(); else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(function () {});
}

/* ---------------------------------------------------------------- laser pointer */
var Laser = { on: false, pts: [], raf: 0 };
Laser.toggle = function () {
  Laser.on = !Laser.on; var cv = $('#laser'); cv.classList.toggle('on', Laser.on);
  document.body.classList.toggle('hide-cursor', Laser.on); Deck.toast(Laser.on ? 'Laser pointer ON (L to stop)' : 'Laser off');
  if (Laser.on) { cv.width = innerWidth; cv.height = innerHeight; Laser.pts = []; loop(); } else cancelAnimationFrame(Laser.raf);
  function loop() {
    var g = cv.getContext('2d'); g.clearRect(0, 0, cv.width, cv.height);
    Laser.pts.push({ x: mouse.x, y: mouse.y, t: performance.now() });
    var now = performance.now(); Laser.pts = Laser.pts.filter(function (p) { return now - p.t < 520; });
    g.lineCap = 'round';
    for (var i = 1; i < Laser.pts.length; i++) {
      var a = Laser.pts[i - 1], b = Laser.pts[i], k = 1 - (now - b.t) / 520;
      g.strokeStyle = 'rgba(255,60,80,' + (.55 * k).toFixed(3) + ')'; g.lineWidth = 3 + 7 * k;
      g.beginPath(); g.moveTo(a.x, a.y); g.lineTo(b.x, b.y); g.stroke();
    }
    var gr = g.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 30);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(.18, 'rgba(255,70,90,1)'); gr.addColorStop(1, 'rgba(255,40,70,0)');
    g.fillStyle = gr; g.beginPath(); g.arc(mouse.x, mouse.y, 30, 0, 6.283); g.fill();
    Laser.raf = requestAnimationFrame(loop);
  }
};
addEventListener('resize', function () { if (Laser.on) { var cv = $('#laser'); cv.width = innerWidth; cv.height = innerHeight; } });

/* ---------------------------------------------------------------- spotlight (wheel = size) */
var Spot = { on: false, r: 230 };
Spot.toggle = function () {
  Spot.on = !Spot.on; var s = $('#spot'); s.classList.toggle('on', Spot.on);
  if (Spot.on) { Spot.move({ clientX: mouse.x, clientY: mouse.y }); Deck.toast('Spotlight ON — scroll to resize'); } else Deck.toast('Spotlight off');
};
Spot.move = function (e) { var s = $('#spot'); s.style.setProperty('--mx', e.clientX + 'px'); s.style.setProperty('--my', e.clientY + 'px'); s.style.setProperty('--r', Spot.r + 'px'); };
addEventListener('wheel', function (e) {
  if (!Spot.on) return; e.preventDefault();
  Spot.r = Deck.clamp(Spot.r * (e.deltaY < 0 ? 1.08 : .92), 80, 900); Spot.move(e);
}, { passive: false });

/* ---------------------------------------------------------------- magnifier: Z, then click to zoom, click to restore */
var Mag = { on: false, zoomed: false, k: 2.4 };
Mag.toggle = function () {
  Mag.on = !Mag.on; if (!Mag.on && Mag.zoomed) Mag.reset();
  Deck.toast(Mag.on ? 'Magnifier: click to zoom, click again to return' : 'Magnifier off');
};
Mag.reset = function () { Mag.zoomed = false; Deck.setZoom(null); };
Mag.pan = function (e) { Deck.setZoom({ k: Mag.k, cx: e.clientX, cy: e.clientY }); };
Deck.clickHook = function (ev) {
  if (!Mag.on) return false;
  if (Mag.zoomed) Mag.reset(); else { Mag.zoomed = true; Mag.pan(ev); }
  return true;
};

/* ---------------------------------------------------------------- help */
var HELP = [['Next / build', '→  Space  PgDn  click'], ['Previous', '←  PgUp  Shift+Space'], ['First / last', 'Home / End'],
  ['Jump to slide', 'type number + Enter'], ['Overview grid', 'O  or  Esc'], ['Presenter window', 'P'],
  ['Fullscreen', 'F'], ['Blackout', 'B'], ['Laser pointer', 'L'], ['Spotlight (wheel = size)', 'S'], ['Magnifier (click)', 'Z'],
  ['Topic bar on/off', 'T'], ['Zoom picture', 'click a picture'], ['Video controls', 'hover the video'], ['This help', '?']];
function toggleHelp() {
  var he = $('#help'), box = $('.box', he);
  if (!box.firstChild) {
    var t = h('h2', '', box); t.textContent = 'Keyboard shortcuts'; var g = h('div', 'g', box);
    HELP.forEach(function (r) { var d = h('div', 'r', g); d.innerHTML = '<span>' + r[0] + '</span><span>' + r[1].split(/  /).map(function (k) { return '<kbd>' + k.trim() + '</kbd>'; }).join('') + '</span>'; });
  }
  he.classList.toggle('on');
}

/* ---------------------------------------------------------------- overview */
var Ov = { on: false, sel: 0, io: null, thumbs: [] };
Ov.toggle = function () { Ov.on ? Ov.close() : Ov.open(); };
Ov.open = function () {
  var el = $('#overview'); el.innerHTML = ''; Ov.thumbs = [];
  var secNames = { problem: 'The problem · the numbers', why: 'Why it is addictive', treat: 'How to treat', grooming: 'Drugs, grooming & suicide', protect: 'Practical protection', evidence: 'Evidence & close' };
  var last = null, grid = null;
  Deck.slides.forEach(function (s, i) {
    if (s.section !== last) { last = s.section; var hh = h('h3', '', el); hh.textContent = secNames[s.section]; grid = h('div', '', el); grid.id = i ? '' : 'ovgrid'; grid.style.cssText = 'display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:16px'; }
    var t = h('div', 'thumb' + (s.hidden ? ' hid' : '') + (s === Deck.cur ? ' cur' : ''), grid); t.dataset.i = i;
    var tn = h('span', 'tn', t); tn.textContent = s.hidden ? 'hidden' : String(Deck.number(s));
    if (s.hidden) { var ey = h('span', 'eye', t); ey.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"><path d="M3 3l18 18M10.6 6.1A10 10 0 0 1 12 6c6 0 9.5 6 9.5 6a17 17 0 0 1-3.1 3.8M6.6 6.7C3.9 8.5 2.5 12 2.5 12s3.5 6 9.5 6a9 9 0 0 0 4-.9"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>'; }
    t.addEventListener('click', function () { Ov.close(); Deck.goto(s); });
    Ov.thumbs.push({ el: t, slide: s, rendered: false });
  });
  el.classList.add('on'); Ov.on = true; Loops && Loops.setPaused && Loops.setPaused(true);
  Ov.sel = Deck.slides.indexOf(Deck.cur);
  Ov.io = new IntersectionObserver(function (es) {
    es.forEach(function (en) {
      var th = Ov.thumbs[+en.target.dataset.i];
      if (en.isIntersecting && !th.rendered) { renderThumb(th); }
      else if (!en.isIntersecting && th.rendered) { th.el.querySelector('.tin') && th.el.querySelector('.tin').remove(); th.rendered = false; }
    });
  }, { root: el, rootMargin: '500px' });
  Ov.thumbs.forEach(function (th) { Ov.io.observe(th.el); });
  Ov.mark(Ov.sel, true);
};
function renderThumb(th) {
  var tin = h('div', 'tin'); th.el.insertBefore(tin, th.el.firstChild);
  try { Deck.renderStatic(th.slide, tin); } catch (e) { tin.textContent = 'slide ' + th.slide.key; }
  tin.style.transform = 'scale(' + (th.el.clientWidth / 1920) + ')'; th.rendered = true;
}
Ov.mark = function (i, scroll) {
  Ov.sel = Deck.clamp(i, 0, Ov.thumbs.length - 1);
  Ov.thumbs.forEach(function (t, k) { t.el.style.outlineColor = k === Ov.sel ? '#22D3EE' : ''; });
  if (scroll !== false) Ov.thumbs[Ov.sel].el.scrollIntoView({ block: 'center' });
};
Ov.close = function () {
  var el = $('#overview'); el.classList.remove('on'); Ov.on = false; if (Ov.io) Ov.io.disconnect(); el.innerHTML = ''; Ov.thumbs = [];
  Loops && Loops.setPaused && Loops.setPaused(false);
};
function ovCols() { var g = Ov.thumbs[0].el.parentNode, w = Ov.thumbs[0].el.offsetWidth + 16; return Math.max(1, Math.floor(g.clientWidth / w)); }

/* ---------------------------------------------------------------- presenter window + sync */
var Sync = { id: Math.random().toString(36).slice(2), seen: {}, bc: null, win: null };
try { Sync.bc = new BroadcastChannel('kahf-deck'); Sync.bc.onmessage = function (e) { recv(e.data); }; } catch (e) { Sync.bc = null; }
addEventListener('message', function (e) { if (e.data && e.data.deck) recv(e.data); });
function send(msg) {
  msg.deck = 1; msg.mid = Sync.id + ':' + Date.now() + ':' + Math.random();
  try { if (Sync.bc) Sync.bc.postMessage(msg); } catch (e) {}
  var w = Deck.mode === 'presenter' ? window.opener : Sync.win;
  try { if (w && !w.closed) w.postMessage(msg, '*'); } catch (e) {}
}
function recv(m) {
  if (!m || !m.mid || Sync.seen[m.mid]) return; Sync.seen[m.mid] = 1;
  if (Deck.mode === 'presenter') { if (m.type === 'state') Pres.update(m); return; }
  if (m.type === 'cmd') {
    switch (m.cmd) {
      case 'next': Deck.next(); break; case 'prev': Deck.prev(); break; case 'first': Deck.first(); break; case 'last': Deck.last(); break;
      case 'goto': Deck.goto(m.key); break; case 'gotoNumber': Deck.gotoNumber(m.key); break;
    }
  } else if (m.type === 'hello') pushState();
}
function pushState() {
  if (Deck.mode === 'presenter' || !Deck.cur) return;
  var s = Deck.state(); s.type = 'state'; s.total = Deck.view ? Deck.view.total : 0; send(s);
}
Deck.on('state', pushState); Deck.on('show', function () { updateHud(); flashCounter(); });
Deck.on('step', function () { flashCounter(); });
function openPresenter() {
  if (Sync.win && !Sync.win.closed) { Sync.win.focus(); return; }
  var base = location.href.split('#')[0].split('?')[0];
  Sync.win = window.open(base + '?presenter', 'kahf-presenter', 'width=1360,height=820');
  if (!Sync.win) Deck.toast('Pop-up blocked - allow pop-ups for the presenter view', 3000); else Deck.toast('Presenter view opened');
}

var Pres = {};
Pres.init = function () {
  document.body.classList.add('presenter'); document.title = 'Presenter — ' + document.title;
  var pv = $('#pv');
  pv.innerHTML = '<div><div class="lbl">Current</div><div class="box" id="pc"></div><div class="lbl" id="pst" style="margin-top:8px"></div></div>' +
    '<div><div class="lbl">Next</div><div class="box" id="pn"></div></div><div class="notes" id="pnotes"></div>' +
    '<div class="bar"><button id="pp">← Prev</button><button id="pxn">Next →</button><b id="ptm">00:00</b><span id="pcl"></span><span id="ppos" style="flex:1;text-align:right"></span>' +
    '<button id="prs">Reset timer</button></div>';
  Pres.t0 = Date.now();
  $('#pp').onclick = function () { send({ type: 'cmd', cmd: 'prev' }); };
  $('#pxn').onclick = function () { send({ type: 'cmd', cmd: 'next' }); };
  $('#prs').onclick = function () { Pres.t0 = Date.now(); };
  setInterval(function () {
    var s = Math.floor((Date.now() - Pres.t0) / 1000), m = Math.floor(s / 60);
    $('#ptm').textContent = String(m).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
    $('#pcl').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }, 500);
  send({ type: 'hello' });
  setTimeout(function () { if (!Pres.got) send({ type: 'hello' }); }, 800);
};
Pres.update = function (m) {
  Pres.got = true; 
  var s = Deck.find(m.key); if (!s) return;
  var o = Deck.order(), nx = o.filter(function (x) { return x.pos > s.pos; })[0];
  var key = m.key + ':' + m.step;
  if (Pres.key !== key) {
    Pres.key = key;
    fillBox($('#pc'), s, m.step); fillBox($('#pn'), (m.step < m.total ? s : nx), m.step < m.total ? m.step + 1 : 0);
    $('#pnotes').textContent = s.notes || '(no speaker notes for this slide)';
    $('#pst').textContent = m.total ? 'Build step ' + m.step + ' / ' + m.total : 'No builds on this slide';
    $('#ppos').textContent = 'Slide ' + (s.hidden ? 'hidden' : (o.indexOf(s) + 1) + ' of ' + o.length);
  }
};
function fillBox(box, slide, step) {
  box.innerHTML = ''; if (!slide) { box.textContent = 'End'; return; }
  var tin = h('div', 'tin', box);
  try { Deck.renderStatic(slide, tin, step); } catch (e) { tin.textContent = 'slide ' + slide.key; }
  tin.style.transform = 'scale(' + (box.clientWidth / 1920) + ')';
}
addEventListener('resize', function () { if (Deck.mode === 'presenter') { Pres.key = null; } });

/* ---------------------------------------------------------------- keyboard */
var numBuf = '', numT;
addEventListener('keydown', function (ev) {
  var t = ev.target; if (t && (/^(input|textarea|select)$/i.test(t.tagName) || t.isContentEditable)) return;
  if (ev.ctrlKey || ev.metaKey || ev.altKey) return;
  if (Deck.keyHook && Deck.keyHook(ev)) return;
  var k = ev.key, K = k.length === 1 ? k.toLowerCase() : k;
  var pres = Deck.mode === 'presenter';
  var act = function (cmd, fn) { ev.preventDefault(); pres ? send({ type: 'cmd', cmd: cmd }) : fn(); };
  if (Deck.lightboxOpen()) { if (K === 'Escape' || K === ' ' || K === 'Enter') { Deck.closeLightbox(); ev.preventDefault(); } return; }
  if ($('#help').classList.contains('on')) { if (K === 'Escape' || K === '?' || K === '/') { toggleHelp(); ev.preventDefault(); } return; }
  if ($('#blackout').classList.contains('on')) { if (K !== 'Shift') { toggleBlack(); ev.preventDefault(); } return; }
  if (Ov.on) {
    var c = ovCols();
    if (K === 'Escape' || K === 'o') Ov.close();
    else if (K === 'ArrowRight') Ov.mark(Ov.sel + 1); else if (K === 'ArrowLeft') Ov.mark(Ov.sel - 1);
    else if (K === 'ArrowDown') Ov.mark(Ov.sel + c); else if (K === 'ArrowUp') Ov.mark(Ov.sel - c);
    else if (K === 'Enter') { var s = Ov.thumbs[Ov.sel].slide; Ov.close(); Deck.goto(s); }
    else return;
    ev.preventDefault(); return;
  }
  if (/^[0-9]$/.test(k)) { numBuf += k; Deck.toast('Go to slide: ' + numBuf, 2400); clearTimeout(numT); numT = setTimeout(function () { numBuf = ''; }, 3000); return; }
  if (K === 'Enter' && numBuf) { var n = numBuf; numBuf = ''; ev.preventDefault(); if (pres) send({ type: 'cmd', cmd: 'gotoNumber', key: n }); else Deck.gotoNumber(n); return; }
  if (K === 'Escape') { if (numBuf) { numBuf = ''; return; } if (Mag.zoomed) { Mag.reset(); return; } if (Mag.on) { Mag.toggle(); return; } if (!pres) Ov.toggle(); return; }
  switch (K) {
    case 'ArrowRight': case 'PageDown': case 'ArrowDown': act('next', Deck.next); break;
    case ' ': ev.shiftKey ? act('prev', Deck.prev) : act('next', Deck.next); break;
    case 'ArrowLeft': case 'PageUp': case 'ArrowUp': case 'Backspace': act('prev', Deck.prev); break;
    case 'Home': act('first', Deck.first); break; case 'End': act('last', Deck.last); break;
    case 'o': if (!pres) { ev.preventDefault(); Ov.toggle(); } break;
    case 'p': if (!pres) { ev.preventDefault(); openPresenter(); } break;
    case 'f': if (!pres) toggleFS(); break;
    case 'b': if (!pres) toggleBlack(); break;
    case 'l': if (!pres) Laser.toggle(); break;
    case 's': if (!pres) Spot.toggle(); break;
    case 'z': if (!pres) Mag.toggle(); break;
    case '?': case '/': toggleHelp(); break;
  }
});

/* ---------------------------------------------------------------- swipe */
var tx = null;
addEventListener('touchstart', function (e) { tx = e.changedTouches[0].clientX; }, { passive: true });
addEventListener('touchend', function (e) {
  if (tx === null || Deck.mode === 'presenter') return; var dx = e.changedTouches[0].clientX - tx; tx = null;
  if (Math.abs(dx) > 60) { dx < 0 ? Deck.next() : Deck.prev(); }
}, { passive: true });

Deck.on('ready', function () { if (Deck.mode === 'presenter') Pres.init(); });
Deck.Sync = { send: send }; Deck.UI = { overview: Ov, laser: Laser, spot: Spot, mag: Mag };
})();
