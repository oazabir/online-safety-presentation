/* ============================================================================
   part-b.js - custom, animated and interactive slides for the second part of the deck.
   Self-contained: CSS is injected below.
   Sections: 0 helpers/css . 1 data patches . 2 section divider (drugs-grooming-suicide) . 3 knife-vs-phone evidence
             4 chat slides (kayleigh-haywood, susan) . 5 tech-free / slow phones . 6 boring-devices phone
             7 framed light pictures (kahf-kids-app, closing) . 8 charts . 9 small loops
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;
var D = window.DECK_DATA, W = D.w || 1920, H = D.h || 1080, NS = 'http://www.w3.org/2000/svg';

/* ---------------------------------------------------------------- 0. helpers + css */
var CSS = [
/* ---- shared ---- */
'.pb-abs{position:absolute;pointer-events:none}',
'.pb-hide{display:none!important}',
'.pb-ring{position:absolute;inset:-10px;border-radius:22px;border:2px solid rgba(var(--g1),.7);pointer-events:none;animation:pbring 3.4s ease-out infinite}',
'@keyframes pbring{0%{transform:scale(.97);opacity:.9}100%{transform:scale(1.14);opacity:0}}',
'.pb-shine{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit}',
'.pb-shine::before{content:"";position:absolute;top:-10%;bottom:-10%;left:0;width:40%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.17),transparent);transform:translateX(-140%) skewX(-12deg);animation:pbshine 8.5s ease-in-out infinite;animation-delay:var(--d,0s)}',
'@keyframes pbshine{0%,45%{transform:translateX(-140%) skewX(-12deg)}85%,100%{transform:translateX(330%) skewX(-12deg)}}',
'.pb-glowtxt{animation:pbglowtxt 4.2s ease-in-out infinite}',
'@keyframes pbglowtxt{0%,100%{text-shadow:0 0 0 rgba(var(--g1),0)}50%{text-shadow:0 0 36px rgba(var(--g1),.75),0 0 4px rgba(var(--g1),.5)}}',
'.pb-redglow{animation:pbredglow 3.6s ease-in-out infinite}',
'@keyframes pbredglow{0%,100%{text-shadow:0 0 0 rgba(255,77,77,0)}50%{text-shadow:0 0 34px rgba(255,77,77,.8)}}',
'.pb-float{animation:pbfloat var(--t,7s) ease-in-out infinite alternate;animation-delay:var(--d,0s);will-change:transform}',
'@keyframes pbfloat{from{transform:translate3d(0,-8px,0) rotate(-.4deg)}to{transform:translate3d(0,10px,0) rotate(.5deg)}}',
'.pb-breathe{animation:pbbreathe 5s ease-in-out infinite}',
'@keyframes pbbreathe{0%,100%{opacity:.55}50%{opacity:1}}',

/* ---- 54 dark divider ---- */
'.pb54-breath{position:absolute;inset:0;background:radial-gradient(1100px 620px at 50% 50%,rgba(150,24,52,.30),rgba(90,14,20,.16) 55%,transparent 75%);pointer-events:none;animation:pb54b 9s ease-in-out infinite}',
'@keyframes pb54b{0%,100%{opacity:.35;transform:scale(.96)}50%{opacity:1;transform:scale(1.04)}}',
'.pb54-line{position:absolute;left:50%;height:2px;width:0;transform:translateX(-50%);background:linear-gradient(90deg,transparent,rgba(255,120,140,.8),transparent);pointer-events:none;animation:pb54l 8s ease-in-out infinite}',
'@keyframes pb54l{0%{width:0;opacity:0}30%{opacity:1}55%{width:760px;opacity:.9}100%{width:760px;opacity:0}}',
'.pb54-vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,transparent 45%,rgba(2,6,9,.65) 100%)}',

/* ---- 55 evidence ---- */
'.pb55-vs{position:absolute;left:50%;top:' + (0.37 * H) + 'px;width:130px;height:130px;margin:-65px 0 0 -65px;border-radius:50%;display:grid;place-items:center;',
' font:700 44px/1 var(--f-display);letter-spacing:.02em;color:#fff;background:radial-gradient(circle at 35% 30%,rgba(255,77,77,.85),rgba(120,12,40,.95));box-shadow:0 0 0 2px rgba(255,255,255,.2),0 0 50px rgba(255,77,77,.55);opacity:0;pointer-events:none}',
'.pb55-vs.on{animation:pb55in .7s cubic-bezier(.2,1.3,.4,1) forwards,pb55pulse 3.2s ease-in-out .8s infinite}',
'@keyframes pb55in{from{opacity:0;transform:scale(.3) rotate(-30deg)}to{opacity:1;transform:scale(1) rotate(0)}}',
'@keyframes pb55pulse{0%,100%{box-shadow:0 0 0 2px rgba(255,255,255,.2),0 0 40px rgba(255,77,77,.45)}50%{box-shadow:0 0 0 2px rgba(255,255,255,.3),0 0 80px rgba(255,77,77,.85)}}',
'.pb55-scrim{position:absolute;inset:0;background:rgba(3,8,11,.74);opacity:0;transition:opacity .6s var(--ease);pointer-events:none}',
'.p55-ev .pb55-scrim{opacity:1}',
'.pb55 .els .el[data-id=e1026],.pb55 .els .el[data-id=e1028],.pb55-vs{transition:opacity .6s var(--ease)}',
'.p55-ev .els .el[data-id=e1026],.p55-ev .els .el[data-id=e1028],.p55-ev .pb55-vs{opacity:0!important}',
'.pb55 .els .el[data-id=e3],.pb55 .els .el[data-id=e4]{z-index:23;background:rgba(14,23,28,.86);border:1px solid rgba(255,255,255,.16);border-radius:20px;padding:12px 22px!important;box-shadow:0 18px 44px -18px rgba(0,0,0,.85)}',
'.pb55 .els .el[data-id=e2]{z-index:22}.pb55 .els .el[data-id=e7]{z-index:20}.pb55 .els .el[data-id=e12290]{z-index:21}',
'.pb55 .els .el[data-id=e7] .in{box-shadow:0 40px 100px -20px rgba(0,0,0,.95),0 0 80px rgba(255,77,77,.25)}',

/* ---- typing caret (56, 58): the original cursor block, parked after the last glyph ---- */
'.pb-cur{background:var(--cyan)!important;border-radius:2px;padding:0!important;visibility:hidden;pointer-events:none}',
'.pb-cur.on{visibility:visible;animation:pbcur 1s steps(1) infinite}',
'@keyframes pbcur{50%{opacity:0}}',

/* ---- 60 presence ---- */
'.pb60-pres{position:absolute;top:14px;display:flex;align-items:center;gap:10px;height:46px;padding:0 20px;border-radius:24px;background:rgba(14,23,28,.80);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);font:600 22px var(--f-body);color:#F4F1EA;z-index:40;pointer-events:none}',
'.pb60-pres .d{width:12px;height:12px;border-radius:50%;background:#2EE59D;box-shadow:0 0 0 0 rgba(46,229,157,.7);animation:pb60d 2.4s ease-out infinite}',
'.pb60-pres .o{font-weight:500;font-size:19px;color:#9fe8b8}',
'@keyframes pb60d{0%{box-shadow:0 0 0 0 rgba(46,229,157,.75)}70%,100%{box-shadow:0 0 0 14px rgba(46,229,157,0)}}',
/* ---- typing indicator ---- */
'.pb-typing{position:absolute;display:flex;gap:7px;align-items:center;padding:0 22px;height:58px;border-radius:30px;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.28);z-index:30;pointer-events:none;animation:pbtin .3s ease-out both}',
'.pb-typing.g{background:#d9f7a8}',
'.pb-typing i{display:block;width:13px;height:13px;border-radius:50%;background:#8a8f98;animation:pbdot 1.15s ease-in-out infinite}',
'.pb-typing i:nth-child(2){animation-delay:.18s}.pb-typing i:nth-child(3){animation-delay:.36s}',
'@keyframes pbdot{0%,60%,100%{transform:translateY(0);opacity:.45}30%{transform:translateY(-8px);opacity:1}}',
'@keyframes pbtin{from{opacity:0;transform:translateY(8px) scale(.85)}to{opacity:1;transform:none}}',
'.pb-typing.dark{background:rgba(255,255,255,.14);box-shadow:inset 0 0 0 1px rgba(255,255,255,.22);backdrop-filter:blur(6px)}',
'.pb-typing.dark i{background:#51D0FF}',

/* ---- 66 tech free ---- */
'.pb66-badge{position:absolute;width:170px;height:170px;margin:-85px 0 0 -85px;pointer-events:none}',
'.pb66-badge::before,.pb66-badge::after{content:"";position:absolute;inset:6px;border-radius:50%;border:3px solid rgba(255,77,77,.8);animation:pb66r 3.4s ease-out infinite}',
'.pb66-badge::after{animation-delay:1.7s}',
'@keyframes pb66r{0%{transform:scale(1);opacity:.85}100%{transform:scale(1.7);opacity:0}}',
'.pb66-badge svg{position:absolute;inset:0;width:100%;height:100%;filter:drop-shadow(0 0 18px rgba(255,77,77,.75));animation:pb66g 3.4s ease-in-out infinite}',
'@keyframes pb66g{0%,100%{filter:drop-shadow(0 0 10px rgba(255,77,77,.5))}50%{filter:drop-shadow(0 0 28px rgba(255,77,77,1))}}',
'.pb66-slash{stroke-dasharray:150;animation:pb66s 6.8s ease-in-out infinite}',
'@keyframes pb66s{0%{stroke-dashoffset:150}16%,88%{stroke-dashoffset:0}100%{stroke-dashoffset:-150}}',

/* ---- 70 slow phones ---- */
'.pb70-lcd{position:absolute;left:25%;top:18%;width:62%;height:34%;border-radius:10px 10px 22px 22px;overflow:hidden;background:#9db56a;box-shadow:inset 0 0 12px rgba(30,45,10,.65);pointer-events:none}',
'.pb70-lcd canvas{width:100%;height:100%;display:block;image-rendering:pixelated}',
'.pb70-spin{position:absolute;left:67.5%;top:42%;width:150px;height:150px;margin:-75px 0 0 -75px;pointer-events:none;transform:rotate(-13deg) skewX(6deg)}',
'.pb70-spin svg{width:100%;height:100%;animation:pb70rot 1.15s linear infinite;filter:drop-shadow(0 0 12px rgba(120,220,255,.9))}',
'@keyframes pb70rot{to{transform:rotate(360deg)}}',
'.pb70-load{position:absolute;left:67.5%;top:60%;transform:translateX(-50%) rotate(-13deg);font:600 25px var(--f-body);color:#d7f2ff;letter-spacing:.06em;text-shadow:0 0 12px rgba(120,220,255,.8);pointer-events:none;white-space:nowrap}',
'.pb70-load b{display:inline-block;animation:pbdot 1.4s infinite}.pb70-load b:nth-child(2){animation-delay:.2s}.pb70-load b:nth-child(3){animation-delay:.4s}',

/* ---- 71/72 boring phone ---- */
'.pb7-tog{position:absolute;display:flex;align-items:center;gap:20px;height:102px;padding:0 26px 0 22px;border-radius:60px;cursor:pointer;user-select:none;',
' background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.2);color:var(--ink);font:700 34px/1.05 var(--f-body);box-shadow:0 18px 40px -16px rgba(0,0,0,.8);transition:background .4s,border-color .4s,transform .2s}',
'.pb7-tog:hover{transform:translateY(-2px);background:rgba(255,255,255,.12)}.pb7-tog:active{transform:scale(.97)}',
'.pb7-tog.on{border-color:rgba(255,176,32,.85);background:rgba(255,176,32,.12)}',
'.pb7-ico{flex:none;width:58px;height:58px;display:grid;place-items:center}.pb7-ico svg{width:56px;height:56px}',
'.pb7-lbl{flex:1;white-space:nowrap}.pb7-lbl small{display:block;font:500 20px var(--f-body);color:var(--muted);margin-top:4px;letter-spacing:.02em}',
'.pb7-sw{flex:none;position:relative;width:96px;height:52px;border-radius:30px;background:rgba(255,255,255,.2);transition:background .35s}',
'.pb7-sw::after{content:"";position:absolute;left:5px;top:5px;width:42px;height:42px;border-radius:50%;background:#fff;box-shadow:0 3px 8px rgba(0,0,0,.5);transition:transform .35s cubic-bezier(.3,1.4,.5,1)}',
'.pb7-tog.on .pb7-sw{background:var(--amber)}.pb7-tog.on .pb7-sw::after{transform:translateX(44px)}',
'.pb7-wave{transition:opacity .3s}.pb7-x{opacity:0;transition:opacity .3s}.pb7-tog.on .pb7-wave{opacity:0}.pb7-tog.on .pb7-x{opacity:1}',
'.pb7-sun{transition:opacity .3s}.pb7-moon{opacity:0;transition:opacity .3s}.pb7-tog.on .pb7-sun{opacity:0}.pb7-tog.on .pb7-moon{opacity:1}',
'.pb7-img{transition:filter .9s var(--ease)!important}',
'.pb7-img.bw{filter:grayscale(1) contrast(1.06) brightness(.96)!important}',
'.pb7-tag{position:absolute;padding:10px 24px;border-radius:40px;font:700 28px var(--f-body);letter-spacing:.04em;transition:opacity .5s,transform .5s;pointer-events:none;white-space:nowrap}',
'.pb7-hot{color:#ffd9a0;background:rgba(255,77,77,.22);border:1.5px solid rgba(255,120,130,.7)}',
'.pb7-calm{color:#cfe9d8;background:rgba(46,229,157,.14);border:1.5px solid rgba(46,229,157,.6)}',
'.pb7-badge{position:absolute;width:56px;height:56px;border-radius:50%;background:#ff3b4e;color:#fff;font:800 28px/56px var(--f-body);text-align:center;box-shadow:0 0 22px rgba(255,59,78,.9);pointer-events:none;transition:opacity .5s,transform .5s;animation:pb7bump .9s ease-in-out infinite}',
'@keyframes pb7bump{0%,100%{transform:translateY(0) scale(1)}40%{transform:translateY(-12px) scale(1.12)}}',
'.pb7-buzz{position:absolute;border-radius:40px;pointer-events:none;border:3px solid rgba(255,120,140,.7);animation:pb7buzz 2.2s ease-out infinite;transition:opacity .5s}',
'@keyframes pb7buzz{0%{transform:scale(.96);opacity:.8}100%{transform:scale(1.12);opacity:0}}',
'.pb7-off .pb7-badge,.pb7-off .pb7-buzz{opacity:0!important}',
'.pb7-wiggle{animation:pb7wig 2.6s ease-in-out infinite}',
'@keyframes pb7wig{0%,70%,100%{transform:rotate(0)}74%{transform:rotate(-1.6deg)}78%{transform:rotate(1.6deg)}82%{transform:rotate(-1.2deg)}86%{transform:rotate(1deg)}90%{transform:rotate(0)}}',

/* ---- framed pictures ---- */
'.pb-back{position:absolute;inset:-6%;pointer-events:none;background-size:cover;background-position:center;filter:blur(46px) saturate(1.2) brightness(.5);transform:scale(1.15)}',
'.pb-backshade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 50%,rgba(3,8,11,.05),rgba(3,8,11,.72) 85%)}',
'.pb-cardglow{position:absolute;pointer-events:none;border-radius:34px;background:radial-gradient(closest-side,rgba(var(--g1),.55),transparent);filter:blur(30px);animation:pbbreathe 6s ease-in-out infinite}',
'.pb-framed .els .el.pic.card .in{border-radius:20px;box-shadow:0 50px 120px -20px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.28),0 0 90px rgba(var(--g1),.35)}',
'.pb-frame112 .els{transform:scale(.9);transform-origin:50% 50%}',

/* ---- charts ---- */
'.pbc-band{position:absolute;pointer-events:none;overflow:hidden;opacity:0;transition:opacity .5s;background:rgba(255,77,77,.10)}',
'.pbc-band.on{opacity:1}',
'.pbc-band::before{content:"";position:absolute;left:-10%;right:-10%;height:34%;top:0;background:linear-gradient(180deg,transparent,rgba(255,255,255,.55),transparent);mix-blend-mode:soft-light;animation:pbcsweep 3.8s ease-in-out infinite}',
'@keyframes pbcsweep{0%{transform:translateY(-110%)}100%{transform:translateY(330%)}}',
'.pbc-band::after{content:"";position:absolute;inset:0;border:2px solid rgba(255,77,77,.65);border-radius:3px;animation:pbbreathe 2.8s ease-in-out infinite;box-shadow:0 0 30px rgba(255,77,77,.55),inset 0 0 30px rgba(255,77,77,.25)}',
'.pbc-lbl{position:absolute;padding:6px 16px;border-radius:30px;font:700 26px var(--f-body);color:#fff;background:rgba(220,38,66,.92);white-space:nowrap;transform:translateX(-50%);pointer-events:none;opacity:0;transition:opacity .5s .3s;box-shadow:0 8px 20px rgba(0,0,0,.4)}',
'.pbc-lbl.on{opacity:1}',
'.pbc-scan{position:absolute;top:0;bottom:0;width:6px;background:linear-gradient(180deg,transparent,rgba(255,200,90,.95),transparent);box-shadow:0 0 40px 10px rgba(255,190,70,.6);pointer-events:none;opacity:0}',

'@media (prefers-reduced-motion:reduce){.pb54-breath,.pb54-line,.pb-ring,.pb-shine::before,.pb-float,.pb7-buzz,.pb7-badge,.pb7-wiggle,.pb66-badge::before,.pb66-badge::after,.pb70-spin svg,.pbc-band::before{animation:none!important}}'
].join('\n');

(function injectCss() {
  if (document.getElementById('part-b-css')) return;
  var st = document.createElement('style'); st.id = 'part-b-css'; st.textContent = CSS; document.head.appendChild(st);
})();

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function svgEl(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function rng(seed) { var s = (seed * 2654435761) >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
var byId = {}; D.slides.forEach(function (s) { byId[s.id] = s; });
function elData(n, id) { var s = byId[n]; if (!s) return null; for (var i = 0; i < s.els.length; i++) if (s.els[i].id === id) return s.els[i]; return null; }
function px(n, id) { var e = elData(n, id); return { x: e.x * W / 100, y: e.y * H / 100, w: e.w * W / 100, h: e.h * H / 100 }; }
function E(ctx, id) { return ctx.view.map[id] || null; }

/* spec registry: several features per slide are composed into one registerSlide call */
var reg = {};
function add(n, o) { (reg[n] = reg[n] || []).push(o); }
function compose(list) {
  var out = {};
  ['render', 'enter', 'leave'].forEach(function (k) {
    var fs = list.map(function (o) { return o[k]; }).filter(Boolean);
    if (fs.length) out[k] = function (el, ctx) { fs.forEach(function (f) { f(el, ctx); }); };
  });
  list.forEach(function (o) {
    if (o.keepBase !== undefined) out.keepBase = o.keepBase;
    if (o.steps) { out.steps = o.steps; out.step = o.step; out.unstep = o.unstep; }
    if (o.calm !== undefined) out.calm = o.calm;
    if (o.loop !== undefined) out.loop = o.loop;
  });
  if (out.render && out.keepBase === undefined) out.keepBase = true;
  return out;
}

/* little reusable pieces */
function addRing(node) { var r = h('div', 'pb-ring'); node.appendChild(r); return function () { r.remove(); }; }
function addShine(node, delay) { var inn = node.querySelector('.in') || node; var s = h('div', 'pb-shine', inn); if (delay) s.style.setProperty('--d', delay + 's'); return function () { s.remove(); }; }
function cls(node, c) { node.classList.add(c); return function () { node.classList.remove(c); }; }
/** per-slide extra loops: opts {shine:[ids], ring:[ids], glow:[ids], red:[ids], float:[ids]} */
function loops(n, o) {
  add(n, { enter: function (el, ctx) {
    var undo = [];
    (o.shine || []).forEach(function (id, i) { var e = E(ctx, id); if (e) undo.push(addShine(e, i * 1.6)); });
    (o.ring || []).forEach(function (id) { var e = E(ctx, id); if (e) undo.push(addRing(e)); });
    (o.glow || []).forEach(function (id) { var e = E(ctx, id); if (e) undo.push(cls(e, 'pb-glowtxt')); });
    (o.red || []).forEach(function (id) { var e = E(ctx, id); if (e) undo.push(cls(e, 'pb-redglow')); });
    (o.float || []).forEach(function (id, i) { var e = E(ctx, id); if (e) { e.style.setProperty('--t', (6 + i * 1.7) + 's'); e.style.setProperty('--d', (-i * 2.3) + 's'); undo.push(cls(e, 'pb-float')); } });
    ctx.onLeave(function () { undo.forEach(function (f) { f(); }); });
  } });
}

/* ---------------------------------------------------------------- 1. data patches (re-layout) */
(function patch() {
  // 55: title moves to the top and stays visible; evidence = knife vs phone, stats under each, UNSW card on click 2
  var s55 = byId['knife-vs-phone'];
  if (s55) {
    var t = elData('knife-vs-phone', 'e2'); t.x = 5; t.y = 2.4; t.w = 90; t.h = 15.5; t.anchor = 'ctr'; t.paras.forEach(function (p) { p.al = 'center'; });
    var k = elData('knife-vs-phone', 'e1026'); k.x = 25 - k.w / 2; k.y = 20;
    var ph = elData('knife-vs-phone', 'e1028'); ph.w *= 1.2; ph.h *= 1.2; ph.x = 75 - ph.w / 2; ph.y = 17.5;
    // stats are two cards in their own band under the pictures (never under the UNSW picture)
    var a = elData('knife-vs-phone', 'e3'); a.x = 6; a.y = 70; a.w = 38; a.h = 21.5; a.anchor = 'ctr';
    var b = elData('knife-vs-phone', 'e4'); b.x = 52; b.y = 70; b.w = 34; b.h = 21.5; b.anchor = 'ctr';
    [a, b].forEach(function (e) { e.paras.forEach(function (p) { p.al = 'center'; p.runs.forEach(function (r) { r.sz = 42; }); }); });
    // UNSW card: sits above the stat band (y 19% .. 68%)
    var u = elData('knife-vs-phone', 'e7'); u.w = 800 / W * 100; u.x = (100 - u.w) / 2; u.y = 19; u.h = u.w * W / 100 * (1594 / 2400) / H * 100;
    var q = elData('knife-vs-phone', 'e12290'); q.x = 89; q.y = 79; q.w = 9; q.h = 9 * W / H;
  }
  // 97: light full-bleed picture becomes a framed card
  var p97 = elData('kahf-kids-app', 'e12');
  if (p97) { p97.bleed = false; p97.card = true; p97.x = 10; p97.y = 10; p97.w = 80; p97.h = 80; }
  var p112 = elData('closing', 'e3');
  if (p112) { p112.bleed = false; p112.card = true; }
})();

/* ---------------------------------------------------------------- 2. dividers */
/* 54 - Child Grooming & Suicide (dark, restrained). Title element + morph key untouched. */
add('drugs-grooming-suicide', {
  keepBase: true, loop: false,
  render: function (el, ctx) {
    h('div', 'pb54-breath', el); h('div', 'pb54-vig', el);
    var t = px('drugs-grooming-suicide', 'e2'), l = h('div', 'pb54-line', el); l.style.top = Math.round(t.y + t.h * .5 + 92) + 'px';
  }
});

/* ---------------------------------------------------------------- 3. slide 55 */
add('knife-vs-phone', {
  keepBase: true, loop: 'embers',
  render: function (el, ctx) {
    ctx.root.classList.add('pb55');
    h('div', 'pb55-scrim', el);
    var vs = h('div', 'pb55-vs', el, 'VS');
    if (ctx.static) vs.classList.add('on');
    ctx.root.querySelector('.els').insertBefore(el.querySelector('.pb55-scrim'), null);
  },
  enter: function (el, ctx) {
    var vs = el.querySelector('.pb55-vs'), root = ctx.root, ev = false;
    ctx.timeout(function () { vs.classList.add('on'); }, 500);
    ['e1026', 'e1028'].forEach(function (id, i) { var e = E(ctx, id); if (e) { e.style.setProperty('--t', (5 + i * 1.5) + 's'); e.classList.add('bob'); } });
    var e7 = E(ctx, 'e7');
    function poll() { var on = !!e7 && !e7.classList.contains('pre'); if (on !== ev) { ev = on; root.classList.toggle('p55-ev', on); } }
    poll(); ctx.interval(poll, 80);
    ctx.onLeave(function () { vs.classList.remove('on'); ['e1026', 'e1028'].forEach(function (id) { var e = E(ctx, id); if (e) e.classList.remove('bob'); }); });
  }
});

/* ---------------------------------------------------------------- 4. chat slides */
function typingPill(parent, g, dark) { var d = h('div', 'pb-typing' + (g ? ' g' : '') + (dark ? ' dark' : ''), parent, '<i></i><i></i><i></i>'); return d; }
/** schedule typing indicators for chat bubbles. items: [t(ms of reveal), graphicId, textId] */
function chatTyping(n, items) {
  add(n, { enter: function (el, ctx) {
    var live = [];
    function hidden(id) { var x = E(ctx, id); return !!x && x.classList.contains('pre'); }
    function drop(p) { if (p.pill) { p.pill.remove(); p.pill = null; } }
    items.forEach(function (it) {
      var T = it[0], gid = it[1], tid = it[2], d = elData(n, gid), start = T - 1500;
      if (start < 250) return;
      var green = /image100/.test(d.src), g = px(n, gid), rec = { tid: tid, gid: gid, pill: null };
      live.push(rec);
      // 'pre' removal and pill removal happen in the same tick (MutationObserver = microtask, before paint)
      var tx0 = E(ctx, tid);
      if (tx0 && window.MutationObserver) {
        var mo = new MutationObserver(function () { if (!tx0.classList.contains('pre')) drop(rec); });
        mo.observe(tx0, { attributes: true, attributeFilter: ['class'] });
        ctx.onLeave(function () { mo.disconnect(); });
      }
      ctx.timeout(function () {
        if (!hidden(tid) && !hidden(gid)) return;      // bubble already on screen (e.g. arrived via Back): no indicator
        var pill = rec.pill = typingPill(el, green);
        var left = green ? g.x + g.w - 118 : g.x + 6; pill.style.left = Math.max(10, left) + 'px'; pill.style.top = (g.y + 4) + 'px';
      }, start);
      ctx.timeout(function () {
        drop(rec);
        var a = E(ctx, gid), b = E(ctx, tid);
        [a, b].forEach(function (x) {
          if (!x || !x.animate) return;
          x.style.transformOrigin = green ? '100% 100%' : '0% 100%';
          var an = x.animate([{ scale: '.9' }, { scale: '1.025', offset: .6 }, { scale: '1' }], { duration: 420, easing: 'ease-out' });
          an.onfinish = an.oncancel = function () { x.style.transformOrigin = ''; };
        });
      }, T + 10);
    });
    // watchdog: an indicator never outlives the moment its bubble text is visible
    ctx.interval(function () { live.forEach(function (r) { if (r.pill && !hidden(r.tid)) drop(r); }); }, 60);
    ctx.onLeave(function () { live.forEach(drop); });
  } });
}
chatTyping('susan-tricked', [[5100, 'e17', 'e19'], [8200, 'e12', 'e21'], [11300, 'e22', 'e23'], [14400, 'e26', 'e25'], [17500, 'e27', 'e28'], [18600, 'e29', 'e30']]);
chatTyping('susan-blackmailed', [[4100, 'e6', 'e8'], [6200, 'e11', 'e13']]);
add('susan-tricked', { loop: 'orbs' });
add('susan-blackmailed', { loop: 'orbs' });
add('susan-blackmailed', {
  keepBase: true,
  render: function (el, ctx) {
    var b = h('div', 'pb60-pres', el, '<span class="n">Susan</span><span class="d"></span><span class="o">online</span>');
    b.style.left = '1478px'; b.style.top = '40px';  // beside the phone, clear of the chat text
  }
});

/* 57: the chat now lives in a messenger-style phone built by part-c (#57) */

/* ---------------------------------------------------------------- 5. tech free zones (66) and slow phones (70) */
function noDeviceSVG() {
  var s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 170 170');
  s.innerHTML = '<circle cx="85" cy="85" r="76" fill="rgba(12,8,8,.8)" stroke="#FF4D4D" stroke-width="9"/>' +
    '<rect x="58" y="36" width="54" height="98" rx="11" fill="none" stroke="#fff" stroke-width="7"/><circle cx="85" cy="120" r="4.5" fill="#fff"/><rect x="72" y="44" width="26" height="4" rx="2" fill="#fff"/>' +
    '<path class="pb66-slash" d="M38 132 L132 38" stroke="#FF4D4D" stroke-width="10" stroke-linecap="round" fill="none"/>';
  return s;
}
add('tech-free-zones', {
  keepBase: true,
  render: function (el, ctx) {
    [['e12290', -2], ['e12292', -2]].forEach(function (pr) {
      var g = px('tech-free-zones', pr[0]), b = h('div', 'pb66-badge', el);
      b.style.left = (g.x + g.w - 6) + 'px'; b.style.top = (g.y + 8) + 'px'; b.appendChild(noDeviceSVG());
    });
  },
  loop: 'orbs'
});
loops('tech-free-zones', { float: ['e12290', 'e12292'] });

add('slow-phones', {
  keepBase: true, loop: 'orbs',
  render: function (el, ctx) {
    var nk = null, tb = null;
    // overlays live inside the pictures so they bob together with them (added on enter, picture nodes exist after build)
    el.__pb70 = true;
  },
  enter: function (el, ctx) {
    var nk = E(ctx, 'e21506'), tb = E(ctx, 'e21508'), undo = [];
    if (nk) {
      nk.style.setProperty('--t', '4.6s'); nk.classList.add('bob'); undo.push(function () { nk.classList.remove('bob'); });
      var lcd = h('div', 'pb70-lcd', nk), cv = h('canvas', '', lcd); cv.width = 14; cv.height = 23; var g = cv.getContext('2d');
      undo.push(function () { lcd.remove(); });
      // little Snake game: the snake walks a loop path
      var path = [], i, ry = [2, 6, 10, 14, 18];
      ry.forEach(function (yy, ri) {
        if (ri % 2 === 0) { for (i = 1; i <= 12; i++) path.push([i, yy]); if (ri < 4) for (i = 1; i <= 3; i++) path.push([12, yy + i]); }
        else { for (i = 12; i >= 1; i--) path.push([i, yy]); for (i = 1; i <= 3; i++) path.push([1, yy + i]); }
      });
      path.push([13, 18]); for (i = 17; i >= 1; i--) path.push([13, i]); path.push([12, 1]); for (i = 11; i >= 0; i--) path.push([i, 1]); path.push([0, 2]);
      var step = 0, last = 0, LEN = 9;
      ctx.tick(function (dt, t) {
        if (t - last < 120) return; last = t; step = (step + 1) % path.length;
        g.fillStyle = '#9db56a'; g.fillRect(0, 0, 14, 23);
        g.fillStyle = '#2b3a14';
        for (var s = 0; s < LEN; s++) { var c = path[(step - s + path.length) % path.length]; g.fillRect(c[0], c[1], 1, 1); }
        if ((t / 340 | 0) % 2) g.fillRect(6, 12, 1, 1); g.fillRect(0, 22, 14, 1);
      });
    }
    if (tb) {
      tb.style.setProperty('--t', '7s'); tb.style.setProperty('--d', '-2.4s'); tb.classList.add('bob'); undo.push(function () { tb.classList.remove('bob'); });
      var sp = h('div', 'pb70-spin', tb, '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="38" fill="none" stroke="rgba(160,220,255,.22)" stroke-width="9"/><path d="M50 12 A38 38 0 0 1 88 50" fill="none" stroke="#9fe3ff" stroke-width="9" stroke-linecap="round"/></svg>');
      var ld = h('div', 'pb70-load', tb, 'Loading<b>.</b><b>.</b><b>.</b>');
      undo.push(function () { sp.remove(); ld.remove(); });
    }
    ctx.onLeave(function () { undo.forEach(function (f) { f(); }); });
  }
});

/* ---------------------------------------------------------------- 6. boring phone (71, 72) */
var ICON = {
  sun: '<svg viewBox="0 0 56 56" fill="none" stroke-linecap="round"><g class="pb7-sun" stroke="#ffcf6b" stroke-width="3.6"><circle cx="28" cy="28" r="9" fill="#ffcf6b"/><path d="M28 8v6M28 42v6M8 28h6M42 28h6M14 14l4 4M38 38l4 4M14 42l4-4M38 18l4-4"/></g><g class="pb7-moon"><circle cx="28" cy="28" r="17" stroke="#DAD7CD" stroke-width="3.4" fill="#4A4A44"/><path d="M28 11a17 17 0 0 0 0 34z" fill="#DAD7CD"/></g></svg>',
  snd: '<svg viewBox="0 0 56 56" fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="M8 21h9l12-10v34L17 35H8z" fill="#fff" stroke="#fff" stroke-width="3"/><g class="pb7-wave" stroke="#51D0FF" stroke-width="3.6"><path d="M36 20a11 11 0 0 1 0 16"/><path d="M42 13a20 20 0 0 1 0 30"/></g><g class="pb7-x" stroke="#FF4D4D" stroke-width="4.4"><path d="M37 20l14 16M51 20L37 36"/></g></svg>'
};
function makeToggle(parent, x, y, w, icon, title, sub, onClick) {
  var t = h('div', 'pb7-tog pe', parent, '<div class="pb7-ico">' + icon + '</div><div class="pb7-lbl"><span class="pb7-ttl">' + title + '</span><small>' + sub + '</small></div><div class="pb7-sw"></div>');
  t.style.left = x + 'px'; t.style.top = y + 'px'; t.style.width = w + 'px'; t.setAttribute('data-noadvance', ''); t.setAttribute('role', 'switch'); t.tabIndex = 0;
  t.addEventListener('click', function (ev) { ev.stopPropagation(); onClick(); });
  t.addEventListener('keydown', function (ev) { if (ev.key === ' ' || ev.key === 'Enter') { ev.preventDefault(); ev.stopPropagation(); onClick(); } });
  return t;
}
function phoneMock(n, opts) {
  add(n, {
    keepBase: true, loop: 'orbs',
    render: function (el, ctx) {
      var ph = px(n, 'e6146'), view = ctx.view;
      var gray = view.map.e3; if (gray) gray.classList.add('pb-hide'); var tx = view.map.e4; if (tx) tx.classList.add('pb-hide');
      var tag = null;
      var st = { bw: !!opts.bw, mute: !!opts.mute };
      var box = h('div', '', el); box.style.cssText = 'position:absolute;inset:0';
      var hot = h('div', 'pb7-buzz', box); hot.style.cssText = 'left:' + (ph.x - 8) + 'px;top:' + (ph.y - 8) + 'px;width:' + (ph.w + 16) + 'px;height:' + (ph.h + 16) + 'px';
      var bd = h('div', 'pb7-badge', box, '3'); bd.style.left = (ph.x + ph.w - 40) + 'px'; bd.style.top = (ph.y - 28) + 'px';
      var bd2 = h('div', 'pb7-badge', box, '!'); bd2.style.left = (ph.x - 24) + 'px'; bd2.style.top = (ph.y + 180) + 'px'; bd2.style.animationDelay = '.35s';
      tag = h('div', 'pb7-tag', box); tag.style.left = (ph.x + ph.w / 2) + 'px'; tag.style.top = (ph.y + ph.h + 4) + 'px'; tag.style.transform = 'translateX(-50%)';
      tag.style.top = Math.min(ph.y + ph.h + 4, H - 66) + 'px';
      var tBW = makeToggle(box, 1010, 24, 440, ICON.sun, 'Colour', 'Colour &harr; Black &amp; White', function () { set({ bw: !st.bw }); });
      var tSN = makeToggle(box, 1470, 24, 410, ICON.snd, 'Sound on', 'Sound on &harr; off', function () { set({ mute: !st.mute }); });
      function set(p, instant) {
        if ('bw' in p) st.bw = p.bw; if ('mute' in p) st.mute = p.mute;
        var img = view.map.e6146 && view.map.e6146.querySelector('img');
        if (img) { img.classList.add('pb7-img'); img.classList.toggle('bw', st.bw); }
        tBW.classList.toggle('on', st.bw); tBW.querySelector('.pb7-ttl').textContent = st.bw ? 'Black & White' : 'Colour'; tSN.querySelector('.pb7-ttl').textContent = st.mute ? 'Sound off' : 'Sound on'; tSN.classList.toggle('on', st.mute);
        tBW.setAttribute('aria-checked', st.bw); tSN.setAttribute('aria-checked', st.mute);
        var off = st.bw && st.mute; box.classList.toggle('pb7-off', st.bw || st.mute ? (st.bw && st.mute) : false);
        bd.style.opacity = st.mute ? 0 : 1; bd2.style.opacity = st.mute ? 0 : (st.bw ? .5 : 1); hot.style.opacity = st.mute ? 0 : 1;
        tag.className = 'pb7-tag ' + (off ? 'pb7-calm' : 'pb7-hot');
        tag.textContent = off ? 'Boring. Good.' : (st.bw ? 'Still tempting...' : (st.mute ? 'Still tempting...' : 'Designed to hook'));
        if (view.map.e6146) view.map.e6146.classList.toggle('pb7-wiggle', !st.mute && !ctx.static && !ctx.reduced);
      }
      view.__pb7 = { set: set, st: st, setByStep: function (k) { set({ bw: k >= 1, mute: k >= 2 }); } };
      set({});
      if (ctx.static) set({ bw: true, mute: true });
    },
    enter: function (el, ctx) {
      var p = ctx.view.__pb7; if (!p) return;
      p.setByStep(ctx.step);
      if (n === 72) p.set({ bw: true, mute: true });
      ctx.onLeave(function () { var e = ctx.view.map.e6146; if (e) e.classList.remove('pb7-wiggle'); });
    }
  });
}
phoneMock('boring-devices-color', { bw: false, mute: false });
phoneMock('boring-devices-bw', { bw: true, mute: true });
Deck.on('step', function (k, view) { if (view && view.slide && view.slide.id === 'boring-devices-color' && view.__pb7) view.__pb7.setByStep(k); });
loops('boring-devices-bw', { shine: ['e5', 'e6'] });
loops('boring-devices-color', { shine: ['e14', 'e15'] });

/* ---------------------------------------------------------------- 7. framed light pictures */
function framed(n, picId, mod) {
  add(n, {
    keepBase: true, loop: false,
    render: function (el, ctx) {
      var d = elData(n, picId), sc = ctx.view.sc, els = ctx.view.els;
      ctx.root.classList.add('pb-framed'); if (mod) ctx.root.classList.add(mod);
      var back = h('div', 'pb-back'); back.style.backgroundImage = 'url("' + d.src + '")';
      var shade = h('div', 'pb-backshade');
      sc.insertBefore(shade, els); sc.insertBefore(back, shade);
      var g = px(n, picId);
      if (!mod) { var cg = h('div', 'pb-cardglow'); cg.style.cssText = 'left:' + (g.x - 40) + 'px;top:' + (g.y - 40) + 'px;width:' + (g.w + 80) + 'px;height:' + (g.h + 80) + 'px'; sc.insertBefore(cg, els); }
      else { var cg2 = h('div', 'pb-cardglow'); cg2.style.cssText = 'left:' + (W * .05 - 30) + 'px;top:' + (H * .05 - 30) + 'px;width:' + (W * .9 + 60) + 'px;height:' + (H * .9 + 60) + 'px'; sc.insertBefore(cg2, els); }
    },
    enter: function (el, ctx) {
      var e = E(ctx, picId), img = e && e.querySelector('img'), undo = [];
      if (e) undo.push(addShine(e, 0.5));
      if (img && n !== 112) { img.classList.add('kb'); img.style.setProperty('--t', '40s'); undo.push(function () { img.classList.remove('kb'); }); }
      ctx.onLeave(function () { undo.forEach(function (f) { f(); }); });
    }
  });
}
framed('kahf-kids-app', 'e12'); framed('closing', 'e3', 'pb-frame112');
loops('closing', { ring: ['e6'], float: ['e2'] });

/* ---------------------------------------------------------------- 8. charts 106-109 */
function chart(n, picId, bandId, label) {
  add(n, {
    keepBase: true, loop: ['orbs'],
    render: function (el, ctx) {
      var band = px(n, bandId), pic = px(n, picId);
      var b = h('div', 'pbc-band', el); b.style.cssText = 'left:' + band.x + 'px;top:' + band.y + 'px;width:' + band.w + 'px;height:' + band.h + 'px';
      var l = h('div', 'pbc-lbl', el, label); l.style.left = (band.x + band.w / 2) + 'px'; l.style.top = (band.y - 26) + 'px';
      var sc = h('div', 'pbc-scan', el); sc.style.top = pic.y + 'px'; sc.style.height = pic.h + 'px';
      el.__chart = { b: b, l: l, sc: sc, pic: pic };
            var img = ctx.view.map[picId] && ctx.view.map[picId].querySelector('img');
      if (img && !ctx.static) img.style.clipPath = 'inset(0 100% 0 0)';
      if (ctx.static) { b.classList.add('on'); l.classList.add('on'); }
    },
    enter: function (el, ctx) {
      var c = el.__chart, img = E(ctx, picId) && E(ctx, picId).querySelector('img');
      var shown = ctx.step >= 1;
      function bandOn(v) { c.b.classList.toggle('on', v); c.l.classList.toggle('on', v); }
      if (img) {
        if (shown || ctx.reduced) { img.style.clipPath = ''; bandOn(shown); }
        else {
          var dur = 1900, an = img.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: dur, easing: 'cubic-bezier(.5,.1,.3,1)', fill: 'forwards' });
          img.style.clipPath = '';
          c.sc.animate([{ left: c.pic.x + 'px', opacity: 1 }, { left: (c.pic.x + c.pic.w) + 'px', opacity: 1, offset: .96 }, { left: (c.pic.x + c.pic.w) + 'px', opacity: 0 }], { duration: dur, easing: 'cubic-bezier(.5,.1,.3,1)', fill: 'forwards' });
          an.onfinish = function () { try { an.cancel(); } catch (e) {} };
        }
      }
      ctx.interval(function () { var on = ctx.view.k >= 1; if (c.b.classList.contains('on') !== on) bandOn(on); }, 90);
    }
  });
}
chart('depression-chart', 'e1026', 'e4', 'Smartphone era');
chart('self-harm-chart', 'e5122', 'e4', 'Smartphone era');
chart('suicide-rate-chart', 'e3074', 'e4', 'Smartphone era');
chart('suicide-rate-social-apps', 'e3074', 'e4', 'Smartphone era');
loops('suicide-rate-social-apps', { float: ['e1028', 'e1030', 'e1032', 'e1034'] });

/* ---------------------------------------------------------------- 9. light motion on other slides (calm slides 51, 57, 58, 74, 90, 93 are left alone) */
loops('child-is-victim', { shine: ['e3'] });
loops('not-born-addict', { shine: ['e3'], glow: ['e7'] });
loops('photo-spot-the-risk', { shine: ['e7'] });
loops('photo-how-about-now', { shine: ['e3'] });
loops('never-alone', { shine: ['e7'] });
loops('night-contact-abuse', { red: ['e10'] });
add('night-contact-abuse', { loop: ['kenburns2', 'sparks', 'beam', 'scan', 'caret'] });
loops('top-10-games', { shine: ['e9218'], red: ['e2'] });
loops('protection-threats', { shine: ['e4'] });
loops('kahfguard-website', { shine: ['e7'], glow: ['e4'] });
loops('choose-browser', { shine: ['e3'], glow: ['e4'] });
loops('kahf-browser-hero', { shine: ['e3'] });
loops('browser-comparison', { shine: ['e3'], glow: ['e4'] });
loops('youtube-hide-content', { shine: ['e3', 'e5', 'e21506'] });
loops('youtube-train', { shine: ['e4'], glow: ['e2'] });
loops('safety-checklist', { ring: ['e20482'], shine: ['e2'] });
loops('remember-this', { glow: ['e6'] });
loops('child-grooming', { red: ['e3'] });
/* the original cursor block sat on top of the first letter: park it after the last typed glyph and blink it */
function parkCaret(n, textId, curId, delay, extra) {
  add(n, {
    render: function (el, ctx) { var c = ctx.view.map[curId]; if (c) c.classList.add('pb-cur'); },
    enter: function (el, ctx) {
      var t = E(ctx, textId), c = E(ctx, curId); if (!t || !c) return;
      var sp = t.querySelector('span'), tn = sp && sp.firstChild; if (!tn) return;
      var r = document.createRange(); r.selectNodeContents(sp);
      var rects = r.getClientRects(), q = rects[rects.length - 1], tb = t.getBoundingClientRect(); if (!q || !t.offsetWidth) return;
      var k = tb.width / t.offsetWidth, fs = parseFloat(getComputedStyle(sp).fontSize) || 80;
      var w = Math.round(fs * .52), hh = Math.round(fs * 1.02);
      c.style.left = (t.offsetLeft + (q.right - tb.left) / k + fs * .08) + 'px';
      c.style.top = (t.offsetTop + (q.top - tb.top) / k + ((q.height / k) - hh) / 2) + 'px';
      c.style.width = w + 'px'; c.style.height = hh + 'px'; c.style.minHeight = '0';
      ctx.timeout(function () { c.classList.add('on'); }, delay);
      ctx.onLeave(function () { c.classList.remove('on'); });
    }
  });
}
parkCaret('child-grooming', 'e3', 'e4', 900);
add('child-grooming', { loop: ['scan', 'embers'] });  // the parked original cursor is the caret here
parkCaret('meet-susan', 'e5', 'e7', 900);

/* ---------------------------------------------------------------- register */
Object.keys(reg).forEach(function (n) { Deck.registerSlide(n, compose(reg[n])); });
})();
