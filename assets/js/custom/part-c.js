/* ============================================================================
   part-c.js - revision pass (loaded after part-a / part-b, before boot.js).
   Slide numbers in comments are the on-screen numbers before this revision;
   keys (#n) are the original slide numbers used by the engine.
   Sections: 0 helpers/css . 1 removals + data patches . 2 typewriter slides (#28, #57)
             3 game headlines (#39-#43) . 4 Lost Screen Memorial scroll (#45) . 5 single picture (#55)
             6 Meet Susan narrative (#58) . 7 auto-advance (#59) . 8 dimming (#56, #64) . 9 toggles (#71)
             10 website screenshots (#88, #92) . 11 Kahf Kids carousel (#97) . 12 chart line reveal (#106-109)
             13 closing video (#112) . 14 NEW WhatsApp privacy (after #96)
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;
var D = window.DECK_DATA, W = D.w || 1920, H = D.h || 1080;
var byN = {}; D.slides.forEach(function (s) { byN[s.n] = s; });
function elData(n, id) { var s = byN[n]; if (!s) return null; for (var i = 0; i < s.els.length; i++) if (s.els[i].id === id) return s.els[i]; return null; }
function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function hide(ctx, ids) { ids.forEach(function (id) { var e = ctx.view.map[id]; if (e) e.style.display = 'none'; }); }

/* ---------------------------------------------------------------- 0. css */
var CSS = [
/* no looping white light sweeps / reflections anywhere */
'.sweep,.sweep.strong,.pa-sweep,.pa-pan,.pb-shine,.dv-beam,.pb48-sweep{display:none!important}',
'.pa1-frame::after,.pbc-band::before{content:none!important;display:none!important}',

/* typewriter */
/* touch taps (slide #90) */
'.pc-tap{position:absolute;width:0;height:0;pointer-events:none;z-index:5}',
'.pc-tap i,.pc-tap b{position:absolute;left:0;top:0;border-radius:50%;transform:translate(-50%,-50%)}',
'.pc-tap i{width:74px;height:74px;background:rgba(255,255,255,.45);border:3px solid rgba(255,255,255,.9);box-shadow:0 0 30px rgba(255,255,255,.5);animation:pc-tap-dot 1.1s ease-out forwards}',
'.pc-tap b{width:74px;height:74px;border:4px solid rgba(255,255,255,.85);animation:pc-tap-ring 1.1s ease-out .12s forwards;opacity:0}',
'@keyframes pc-tap-dot{0%{transform:translate(-50%,-50%) scale(1.5);opacity:0}25%{transform:translate(-50%,-50%) scale(.82);opacity:1}55%{transform:translate(-50%,-50%) scale(1);opacity:1}100%{transform:translate(-50%,-50%) scale(1);opacity:0}}',
'@keyframes pc-tap-ring{0%{transform:translate(-50%,-50%) scale(.8);opacity:.9}100%{transform:translate(-50%,-50%) scale(2.6);opacity:0}}',
'.tw-c{visibility:hidden}.tw-c.on{visibility:visible}',
'.tw-c.cur{position:relative}',
'.tw-c.cur::after{content:"";position:absolute;left:100%;top:.06em;width:.5em;height:1.02em;margin-left:.04em;background:var(--cyan);animation:pc-blink 1s steps(1) infinite}',
'.tw-bar .tw-c.cur::after{width:.07em;margin-left:.05em;border-radius:2px}',
'@keyframes pc-blink{50%{opacity:0}}',

/* game headlines */
'.pc-hl{position:absolute;display:flex;flex-direction:column;align-items:flex-start;gap:16px}',
'.pc-hl.row{flex-direction:row;align-items:center;gap:34px}',
'.pc-kick{display:inline-flex;align-items:center;gap:12px;padding:11px 24px 11px 16px;border-radius:99px;font:800 25px/1 var(--f-body);letter-spacing:.24em;text-transform:uppercase;color:#ffe1e3;',
'  background:linear-gradient(90deg,rgba(255,59,78,.34),rgba(255,59,78,.10));box-shadow:inset 0 0 0 1.5px rgba(255,105,115,.8),0 0 34px rgba(255,59,78,.35),0 12px 30px -12px rgba(0,0,0,.8)}',
'.pc-kick svg{width:30px;height:30px;flex:none;animation:pc-warn 2.4s ease-in-out infinite}',
'@keyframes pc-warn{0%,100%{filter:drop-shadow(0 0 0 rgba(255,59,78,0))}50%{filter:drop-shadow(0 0 10px rgba(255,80,90,1))}}',
'.pc-name{position:relative;font:700 var(--fs,124px)/1 var(--f-display);letter-spacing:-.025em;white-space:nowrap;padding:0 .04em .1em 0}',
'.pc-name span{display:inline-block;background:var(--gg);background-size:var(--bw) 100%;background-position:var(--bx) 0;-webkit-background-clip:text;background-clip:text;color:transparent}',
'.pc-name::after{content:"";position:absolute;left:4px;right:0;bottom:-6px;height:9px;border-radius:9px;background:var(--gg);box-shadow:0 0 26px rgba(var(--gc),.7);transform-origin:0 50%}',
'.pc-hl .pc-name{filter:drop-shadow(0 8px 34px rgba(var(--gc),.45))}',
'.pc-hl.go .pc-kick{animation:pc-kin .8s cubic-bezier(.2,.9,.25,1) .1s both}',
'.pc-hl.go .pc-name span{animation:pc-lin .75s cubic-bezier(.2,.9,.25,1) var(--d) both}',
'.pc-hl.go .pc-name::after{animation:pc-ul .9s cubic-bezier(.65,0,.35,1) .75s both}',
'@keyframes pc-kin{from{opacity:0;transform:translateX(-60px)}to{opacity:1;transform:none}}',
'@keyframes pc-lin{from{opacity:0;transform:translateY(60px) rotate(6deg)}to{opacity:1;transform:none}}',
'@keyframes pc-ul{from{transform:scaleX(0)}to{transform:scaleX(1)}}',
'.pc-q{position:absolute;font:600 78px/1.1 var(--f-display);letter-spacing:-.015em;color:#F4F1EA;text-shadow:0 4px 30px rgba(0,0,0,.6)}',
'.pc-q .w{display:inline-block;white-space:pre}',
'.pc-q .rb{background:linear-gradient(100deg,#fff,#ff8a95 45%,#ff3b4e);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 4px 22px rgba(255,59,78,.5))}',
'.pc-q .ok{position:relative;color:var(--amber);text-shadow:0 0 34px rgba(255,176,32,.45)}',
'.pc-q svg{position:absolute;left:-2%;width:104%;bottom:-26px;height:34px;overflow:visible}',
'.pc-q svg path{stroke-dasharray:1000;stroke-dashoffset:1000}',
'.pc-q.go .w{animation:pc-lin .7s cubic-bezier(.2,.9,.25,1) var(--d) both}',
'.pc-q.go svg path{animation:pc-draw 1.1s cubic-bezier(.65,0,.35,1) 1.5s forwards}',
'.pc-q.static svg path{stroke-dashoffset:0}',
'@keyframes pc-draw{to{stroke-dashoffset:0}}',

/* Lost Screen Memorial */
'.pc-lsm{position:absolute;inset:0;overflow:hidden;background:#212121}',
'.pc-lsm img{position:absolute;left:192px;top:0;width:1536px;height:auto;display:block;will-change:transform}',
'.pc-lsm .top{position:absolute;left:0;right:0;top:0;height:210px;background:linear-gradient(180deg,rgba(18,18,18,.96) 0%,rgba(18,18,18,.82) 48%,rgba(18,18,18,0));pointer-events:none}',
'.pc-lsm .ttl{position:absolute;left:0;right:0;top:34px;text-align:center;font:italic 500 88px/1 var(--f-display);color:#fff;letter-spacing:-.01em;text-shadow:0 4px 30px rgba(0,0,0,.8)}',
'.pc-lsm .bot{position:absolute;left:0;right:0;bottom:0;height:90px;background:linear-gradient(0deg,rgba(18,18,18,.7),rgba(18,18,18,0));pointer-events:none}',

/* dimming */
'.slide[data-n="56"] .el[data-id=e1026] img{filter:brightness(.42) saturate(.85)}',
'.slide[data-n="57"] .el[data-id=e3] video{filter:brightness(.42) saturate(.8)}',
'.pc-scrim{position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,rgba(3,8,11,.82) 0%,rgba(3,8,11,.62) 45%,rgba(3,8,11,.12) 75%,rgba(3,8,11,0))}',
'.slide[data-n="58"] .el[data-id=e4] video{filter:brightness(.36) saturate(.7)}',
'.slide[data-n="64"] .el[data-id=e5] img,.slide[data-n="64"] .el[data-id=e4097] img{transition:filter 1.2s var(--ease)}',
'.slide.pc-dim[data-n="64"] .el[data-id=e5] img,.slide.pc-dim[data-n="64"] .el[data-id=e4097] img{filter:brightness(.32) saturate(.8)}',

/* #71 toggles: stacked beside the phone, leave when the screenshots arrive */
'.pb7-tog.pc-side{transition:background .4s,border-color .4s,transform .45s cubic-bezier(.4,0,.2,1),opacity .45s ease}',
'.pb7-tog.pc-side.pc-out{opacity:0;transform:translateX(-40px) scale(.96);pointer-events:none}',

/* website screenshots in a browser window */
'.pc-win{position:absolute;border-radius:22px;overflow:hidden;background:#1c2126;box-shadow:0 60px 140px -30px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.16),0 0 120px rgba(var(--wc),.28)}',
'.pc-win .bar{height:46px;display:flex;align-items:center;gap:10px;padding:0 20px;background:linear-gradient(180deg,#2a3036,#20262b);border-bottom:1px solid rgba(255,255,255,.07)}',
'.pc-win .bar i{width:14px;height:14px;border-radius:50%;background:#ff5f57}.pc-win .bar i:nth-child(2){background:#febc2e}.pc-win .bar i:nth-child(3){background:#28c840}',
'.pc-win .url{margin-left:22px;flex:1;max-width:560px;height:28px;border-radius:14px;background:rgba(255,255,255,.08);color:#c9d1d6;font:500 17px/28px var(--f-body);padding:0 16px;display:flex;gap:8px;align-items:center}',
'.pc-win .url b{color:#7ee2a8;font-weight:600}',
'.pc-win img{display:block;width:100%}',
'.pc-wglow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(var(--wc),.40),transparent);filter:blur(20px);pointer-events:none;animation:pc-breathe 6s ease-in-out infinite}',
'@keyframes pc-breathe{0%,100%{opacity:.6}50%{opacity:1}}',
'.pc-rise{animation:pc-rise 1.1s cubic-bezier(.2,.8,.25,1) .1s both}',
'@keyframes pc-rise{from{opacity:0;transform:translateY(60px) scale(.96)}to{opacity:1;transform:none}}',
'.pc-bob{animation:pc-bob 9s ease-in-out 1.2s infinite alternate}',
'@keyframes pc-bob{from{transform:translateY(0)}to{transform:translateY(-10px)}}',

/* Kahf Kids carousel */
'.pc-kk{position:absolute;inset:0;overflow:hidden;background:#f6f4fb}',
'.pc-kk .bg{position:absolute;left:0;top:0;width:1920px;height:1080px;display:block}',
'.pc-kk .scr{position:absolute;overflow:hidden;background:#fff}',
'.pc-kk .trk{position:absolute;left:0;top:0;height:100%;display:flex;will-change:transform}',
'.pc-kk .trk img{flex:none;height:100%;object-fit:cover;object-position:center top;display:block}',
'.pc-kk .cap{position:absolute;height:50px;transform:translateX(-50%);border-radius:999px;box-shadow:0 10px 26px rgba(33,28,55,.14);transition:opacity .45s ease,transform .45s ease}',
'.pc-kk .cap.out{opacity:0;transform:translate(-50%,-10px)}.pc-kk .cap.in0{opacity:0;transform:translate(-50%,10px)}',
'.pc-kk .dots{position:absolute;display:flex;align-items:center;transform:translate(-50%,-50%)}',
'.pc-kk .dots i{display:block;width:10.8px;height:10.8px;margin:0 4.2px;border-radius:99px;background:rgba(33,28,55,.18);transition:width .45s ease,background .45s ease}',
'.pc-kk .dots i.on{width:28.8px;background:#5A63D8}',

/* chart line reveal */
'.pc-lines{position:absolute;left:0;top:0;width:100%;height:100%;display:block;clip-path:inset(0 100% 0 0)}',
'.pc-lines.full{clip-path:none}',

/* closing video */
'.pc-close{position:absolute;inset:0;background:#0d3b2a;overflow:hidden}',
'.pc-close video,.pc-close img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',

/* Meet Susan */
'.p58{position:absolute;inset:0;font-family:var(--f-body);color:#F4F1EA}',
'.p58 .ttl{position:absolute;left:1060px;top:62px;font:700 66px/1 var(--f-mono);letter-spacing:-.01em}',
'.p58 .ttl q{quotes:"\\201C" "\\201D"}',
'.p58 .idc{position:absolute;left:1060px;top:160px;width:800px;border-radius:26px;background:rgba(10,16,20,.78);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12),0 30px 70px -30px rgba(0,0,0,.9);backdrop-filter:blur(8px);padding:16px 26px}',
'.p58 .row{position:relative;display:flex;align-items:center;gap:22px;padding:12px 0}',
'.p58 .row+.row{border-top:1px dashed rgba(255,255,255,.18)}',
'.p58 .av{flex:none;width:84px;height:84px;border-radius:50%;display:grid;place-items:center}',
'.p58 .av svg{width:56px;height:56px}',
'.p58 .av.fake{background:radial-gradient(circle at 35% 30%,#ffc3dc,#e0569a);box-shadow:0 0 0 4px rgba(255,140,190,.35)}',
'.p58 .av.real{background:radial-gradient(circle at 35% 30%,#5b6470,#1e252c);box-shadow:0 0 0 4px rgba(255,77,77,.55),0 0 30px rgba(255,77,77,.45)}',
'.p58 .lb{font:800 18px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;margin-bottom:8px}',
'.p58 .fake+div .lb{color:#ff9ccc}.p58 .real+div .lb{color:#ff6b6b}',
'.p58 .big{font:700 36px/1.1 var(--f-body)}.p58 .sm{font:500 24px/1.3 var(--f-body);color:#b9c4ca;margin-top:6px}',
'.p58 .real+div .big{color:#ff8080}',
'.p58 .stamp{position:absolute;right:-6px;top:-2px;padding:5px 16px;border:5px solid #ff4d4d;border-radius:12px;background:rgba(10,16,20,.55);font:900 40px/1 var(--f-body);letter-spacing:.12em;color:#ff4d4d;transform:rotate(-12deg);opacity:0;text-shadow:0 0 14px rgba(255,77,77,.5);box-shadow:0 0 22px rgba(255,77,77,.35),inset 0 0 14px rgba(255,77,77,.25)}',
'.p58 .tl{position:absolute;left:1060px;top:478px;width:800px}',
'.p58 .tl::before{content:"";position:absolute;left:31px;top:30px;bottom:40px;width:4px;border-radius:4px;background:linear-gradient(180deg,rgba(34,211,238,.7),rgba(255,176,32,.7) 60%,rgba(255,77,77,.9));transform-origin:50% 0;transform:scaleY(var(--tl,0));transition:transform 1.4s var(--ease)}',
'.p58 .bt{position:relative;display:flex;gap:22px;align-items:flex-start;min-height:132px;opacity:0;transform:translateX(40px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.8,.25,1)}',
'.p58 .bt.on{opacity:1;transform:none}',
'.p58 .ic{flex:none;width:66px;height:66px;border-radius:50%;display:grid;place-items:center;background:#0c1418;box-shadow:inset 0 0 0 3px var(--c),0 0 24px rgba(var(--cr),.45)}',
'.p58 .ic svg{width:34px;height:34px}',
'.p58 .bt p{margin:4px 0 0;font:500 30px/1.28 var(--f-body);color:#d9dfe2}',
'.p58 .bt p b{display:block;font-weight:800;font-size:34px;color:#fff;margin-bottom:2px}',
'.p58 .bt.warn p b{color:#ff6b6b}',
'.p58 .bt.warn .ic{animation:pc-pulse 1.6s ease-in-out infinite}',
'@keyframes pc-pulse{0%,100%{box-shadow:inset 0 0 0 3px var(--c),0 0 18px rgba(var(--cr),.4)}50%{box-shadow:inset 0 0 0 3px var(--c),0 0 46px rgba(var(--cr),.95)}}',
'.p58 .lnk{position:absolute;left:300px;top:690px;width:720px;height:330px;opacity:0;transition:opacity .9s ease}',
'.p58 .lnk.on{opacity:1}',
'.p58 .nd{position:absolute;top:40px;width:200px;text-align:center}',
'.p58 .nd .av{margin:0 auto 14px;width:116px;height:116px}.p58 .nd .av svg{width:74px;height:74px}',
'.p58 .nd b{display:block;font:800 32px/1.1 var(--f-body)}.p58 .nd span{display:block;margin-top:6px;font:500 23px/1.25 var(--f-body);color:#b9c4ca}',
'.p58 .wire{position:absolute;left:190px;top:96px;width:340px;height:6px;border-radius:6px;background:repeating-linear-gradient(90deg,rgba(255,255,255,.35) 0 10px,transparent 10px 20px)}',
'.p58 .msg{position:absolute;top:-17px;width:40px;height:40px;margin-left:-20px;border-radius:12px 12px 12px 4px;display:grid;place-items:center;animation:pc-msg var(--t) linear infinite;animation-delay:var(--d)}',
'.p58 .msg.l{background:#e0569a;box-shadow:0 0 18px rgba(255,120,180,.8)}.p58 .msg.r{background:#22a5c0;box-shadow:0 0 18px rgba(34,211,238,.8);animation-name:pc-msgr;border-radius:12px 12px 4px 12px}',
'.p58 .msg svg{width:24px;height:24px}',
'@keyframes pc-msg{0%{left:0;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:100%;opacity:0}}',
'@keyframes pc-msgr{0%{left:100%;opacity:0}12%{opacity:1}88%{opacity:1}100%{left:0;opacity:0}}',
'.p58 .lnk.hot .wire{background:repeating-linear-gradient(90deg,rgba(255,77,77,.8) 0 10px,transparent 10px 20px)}',
'.p58 .lnk.hot .msg{--t:1.4s!important}',
'.p58 .wl{position:absolute;left:190px;top:128px;width:340px;text-align:center;font:600 21px/1.3 var(--f-body);color:#b9c4ca;letter-spacing:.06em;text-transform:uppercase}',
'.p58 .fin{opacity:0;transition:opacity .6s}.p58 .fin.on{opacity:1}',

'@media (prefers-reduced-motion:reduce){.pc-hl *,.pc-q *,.p58 *{animation:none!important;transition:none!important}}'
].join('\n');
(function () { if (document.getElementById('part-c-css')) return; var st = document.createElement('style'); st.id = 'part-c-css'; st.textContent = CSS; document.head.appendChild(st); })();

/* direction of the last navigation: arriving with Back shows slides fully built, so skip intro animations */
var lastPos = null, cameBack = false;
Deck.on('show', function (s) { cameBack = lastPos !== null && s.pos < lastPos; lastPos = s.pos; });

/* per-slide event hooks for slides whose spec is owned by part-a/part-b (registerSlide would replace their handlers) */
var hooks = {};
function hook(n, o) { hooks[n] = Object.assign(hooks[n] || {}, o); }
Deck.on('show', function (s, v) { var k = hooks[s.key]; if (k && k.show) k.show(v); });
Deck.on('enter', function (s, v) { var k = hooks[s.key]; if (k && k.enter) k.enter(v); });
Deck.on('step', function (i, v) { var k = v && v.slide && hooks[v.slide.key]; if (k && k.step) k.step(v, i); });

/* ---- typewriter: wraps every character in a span (layout never shifts), reveals them in order ---- */
function twPrep(node) {
  if (node.__tw) return node.__tw;
  var chars = [], texts = [], w = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null), t;
  while ((t = w.nextNode())) texts.push(t);
  texts.forEach(function (tn) {
    if (!tn.data.length) return;
    var f = document.createDocumentFragment();
    Array.from(tn.data).forEach(function (ch) { var s = document.createElement('span'); s.className = 'tw-c'; s.textContent = ch; f.appendChild(s); chars.push(s); });
    tn.parentNode.replaceChild(f, tn);
  });
  node.__tw = chars; return chars;
}
function twSet(chars, n) { chars.forEach(function (c, i) { c.classList.toggle('on', i < n); c.classList.remove('cur'); }); if (n > 0 && chars[n - 1]) chars[n - 1].classList.add('cur'); }
/** reveal chars over ms; alive() false -> stop. Returns a cancel fn. */
function twRun(chars, ms, alive, done) {
  var t0 = 0, shown = 0, dead = false;
  function f(now) {
    if (dead || !alive()) return;
    if (!t0) t0 = now;
    var n = Math.min(chars.length, Math.floor((now - t0) / ms * chars.length) + 1);
    while (shown < n) { if (shown) chars[shown - 1].classList.remove('cur'); chars[shown].classList.add('on', 'cur'); shown++; }
    if (shown < chars.length) requestAnimationFrame(f); else if (done) done();
  }
  requestAnimationFrame(f);
  return function () { dead = true; };
}

/* ---------------------------------------------------------------- 1. removals + data patches */
// slide 4 (live counter), 9 (calculator) and 74 (closing night sky) are hidden in part-a / part-b; slide 67 here
if (byN[98]) byN[98].hidden = true;

/* slide #57: everything after the intro paragraph waits until its typewriter (1.9 s) has finished */
D.slides.forEach(function (s) {
  if (s.orig !== 57 || !s.steps || !s.steps[1]) return;
  s.steps[1].fx.forEach(function (f) { if (f.t >= 500) f.t += 1500; });
  s.els.forEach(function (e) {
    if (e.id !== 'e11' && e.id !== 'e12') return;
    e.w = 82; e.paras.forEach(function (p) { p.runs.forEach(function (r) { r.sz = 46; }); });
    if (e.id === 'e12') e.y = 60;
  });
});

/* slide #74 title */
D.slides.forEach(function (s) {
  if (s.orig !== 74) return;
  s.els.forEach(function (e) {
    (e.paras || []).forEach(function (p) {
      var t = p.runs.map(function (r) { return r.t || ''; }).join('');
      if (/less exciting/i.test(t)) p.runs = [Object.assign({}, p.runs[0], { t: 'Choose violence-free, gore-free games', sz: 62 })];
    });
  });
});

/* slide #55 title */
D.slides.forEach(function (s) {
  if (s.orig !== 55) return;
  s.els.forEach(function (e) {
    if (e.k !== 'text' || !e.paras) return;
    var txt = e.paras.map(function (p) { return p.runs.map(function (r) { return r.t || ''; }).join(''); }).join('');
    if (!/harmful for kids/i.test(txt)) return;
    var p = e.paras[0];
    p.runs = [Object.assign({}, p.runs[0], { t: 'A pandemic of online harm affecting children', sz: 72 })];
    e.paras = [p];
  });
});

/* kids in the room: blur sensitive words in slide #43's BBC quote */
D.slides.forEach(function (s) {
  if (s.orig !== 43) return;
  s.els.forEach(function (e) {
    if (e.k !== 'text' || !e.paras) return;
    e.paras.forEach(function (p) {
      var out = [];
      p.runs.forEach(function (r) {
        if (!r.t || r.blur || !/naked|bondage|strippers?|\bsex/i.test(r.t)) { out.push(r); return; }
        r.t.split(/(naked|bondage|strippers?|sex\w*)/i).forEach(function (part, i) {
          if (!part) return;
          var c = Object.assign({}, r, { t: part });
          if (i % 2) c.blur = /^(naked|sex)/i.test(part) ? 2.8 : true;
          out.push(c);
        });
      });
      p.runs = out;
    });
  });
});

// #55 (slide 41): only the heading and the UNSW picture, filling the free area
if (byN[55]) {
  var p55 = elData(55, 'e7');
  byN[55].els = byN[55].els.filter(function (e) { return e.id === 'e2' || e.id === 'e7'; });
  var top55 = 19, hp = (100 - top55 - 2) * H / 100, wp = hp * 2400 / 1594;
  p55.hide0 = false; p55.card = true; p55.h = (100 - top55 - 2); p55.y = top55; p55.w = wp / W * 100; p55.x = (100 - p55.w) / 2;
  byN[55].steps = [];
}
// #28 (slide 20): all text auto-types, no click builds
if (byN[28]) byN[28].steps = [];
// #57 (slide 43): "They exchanged..." + the next paragraph type out together over 5s; source line waits for them
if (byN[57]) byN[57].steps.forEach(function (st) {
  st.fx.forEach(function (fx) {
    if (fx.ids.indexOf('e11') >= 0 || fx.ids.indexOf('e12') >= 0) { fx.a = 'appear'; fx.t = 7504; }
    if (fx.ids.indexOf('e14') >= 0) fx.t = 7504 + 5000 + 400;
  });
});
// #58 (slide 44): new narrative builds replace the paragraph wipes
if (byN[58]) byN[58].steps = [{ auto: 1, fx: [{ ids: ['e4'], t: 0, d: 0, do: 'play' }] }];

/* ---------------------------------------------------------------- 2. typewriter slides */
/* #28 slide 20 - each paragraph types itself out, one after another, as soon as the slide opens */
Deck.registerSlide(28, {
  enter: function (el, ctx) {
    var box = ctx.view.map.e4; if (!box) return;
    box.classList.add('tw-bar');
    var ps = Array.prototype.slice.call(box.querySelectorAll('p'));
    ps.forEach(function (p) { p.classList.remove('bp-pre'); });
    if (cameBack || ctx.reduced) return;
    var segs = ps.map(function (p) { return twPrep(p); }).filter(function (c) { return c.length; });
    segs.forEach(function (c) { twSet(c, 0); });
    var alive = true; ctx.onLeave(function () { alive = false; });
    var i = 0;
    (function next() {
      if (!alive || i >= segs.length) return;
      var c = segs[i++], ms = Math.max(250, c.length / 70 * 1000);   // ~70 characters per second
      if (i > 1) segs[i - 2].forEach(function (x) { x.classList.remove('cur'); });
      twRun(c, ms, function () { return alive; }, function () { ctx.timeout(next, 320); });
    })();
  }
});

/* #57 slide 43 - starts on its own; dimmed video; the two story lines type out over 5 s */
hook(57, {
  show: function (v) {
    var vid = v.map.e3; if (vid && !vid.querySelector('.pc-scrim')) h('div', 'pc-scrim', vid.querySelector('.in'));
  },
  enter: function (v) {
    if (v.k === 0) v.timers.push(setTimeout(function () { if (Deck.view === v && v.k === 0) Deck.next(); }, 450));
  },
  step: function (v, k) {
    if (k !== 1) return;
    var intro = v.map.e5;                       // "In the UK, 15-year-old Kayleigh…" types out as the step opens
    if (intro) {
      var ic = twPrep(intro); twSet(ic, 0);
      twRun(ic, 1900, function () { return Deck.view === v && !v.deactivated && v.k >= 1; });
    }
    var a = v.map.e11, b = v.map.e12; if (!a || !b) return;
    var chars = twPrep(a).concat(twPrep(b)); twSet(chars, 0);
    v.timers.push(setTimeout(function () {
      twRun(chars, 5000, function () { return Deck.view === v && !v.deactivated && v.k >= 1; });
    }, 9004));
  }
});

/* ---------------------------------------------------------------- 3. game headlines (slides 29-33) */
var WARN = '<svg viewBox="0 0 32 32"><path d="M16 3 30 28H2z" fill="#ff3b4e" stroke="#ffd0d4" stroke-width="2" stroke-linejoin="round"/><rect x="14.4" y="11" width="3.2" height="9.5" rx="1.6" fill="#fff"/><circle cx="16" cy="24" r="1.9" fill="#fff"/></svg>';
var GAMES = {
  Fortnite: { gg: 'linear-gradient(100deg,#c592ff 0%,#7aa8ff 50%,#7ff0ff 100%)', gc: '130,150,255' },
  Roblox: { gg: 'linear-gradient(100deg,#ffffff 0%,#ff9aa3 45%,#ff3b4e 100%)', gc: '255,59,78' }
};
function headline(n, hideIds, game, o) {
  Deck.registerSlide(n, {
    keepBase: true,
    render: function (el, ctx) {
      hide(ctx, hideIds);
      var g = GAMES[game], letters = '';
      // one gradient spread across the whole word, even though each letter animates on its own
      game.split('').forEach(function (ch, i) {
        letters += '<span style="--d:' + (.35 + i * .06).toFixed(2) + 's;--bw:' + game.length * 100 + '%;--bx:' + (game.length > 1 ? i / (game.length - 1) * 100 : 0) + '%">' + ch + '</span>';
      });
      var hl = h('div', 'pc-hl' + (o.row ? ' row' : ''), el,
        (o.row ? '' : '<div class="pc-kick">' + WARN + 'Violent games</div>') +
        '<div class="pc-name" style="--fs:' + (o.fs || 124) + 'px">' + letters + '</div>' +
        (o.row ? '<div class="pc-kick">' + WARN + 'Violent games</div>' : ''));
      hl.style.left = o.x + 'px'; hl.style.top = o.y + 'px';
      hl.style.setProperty('--gg', g.gg); hl.style.setProperty('--gc', g.gc);
      if (!ctx.static && !cameBack) { void hl.offsetWidth; hl.classList.add('go'); }
    }
  });
}
headline(39, ['e4', 'e5'], 'Fortnite', { x: 255, y: 34, fs: 124 });
headline(40, ['e4', 'e5'], 'Roblox', { x: 1362, y: 360, fs: 150 });
headline(42, ['e4', 'e5'], 'Roblox', { x: 196, y: 66, fs: 120, row: true });
headline(43, ['e4', 'e5'], 'Roblox', { x: 196, y: 40, fs: 120 });
/* #41 slide 31 - the question */
Deck.registerSlide(41, {
  keepBase: true,
  render: function (el, ctx) {
    hide(ctx, ['e2']);
    var words = ['Do', 'you', 'think', 'your', 'kids', 'are', 'playing', '<span class="rb">Roblox</span>', 'with', '<span class="ok">other kids?<svg viewBox="0 0 300 34" preserveAspectRatio="none"><path d="M4 22 C70 8 150 30 296 12" fill="none" stroke="#FFB020" stroke-width="7" stroke-linecap="round"/></svg></span>'];
    var q = h('div', 'pc-q' + (ctx.static || cameBack ? ' static' : ''), el, words.map(function (w, i) {
      return '<span class="w" style="--d:' + (.1 + i * .07).toFixed(2) + 's">' + w + '</span>';
    }).join(' '));
    q.style.left = '175px'; q.style.top = '40px'; q.style.width = '1580px';
    if (!ctx.static && !cameBack) { void q.offsetWidth; q.classList.add('go'); }
  }
});

/* ---------------------------------------------------------------- 4. #45 slide 35 - Lost Screen Memorial scroll */
var LSM = { src: 'media/lostscreenmemorial.org_.png', w: 901, h: 6144, ms: 30000 };
Deck.registerSlide(45, {
  calm: true, loop: false,
  render: function (el, ctx) {
    var box = h('div', 'pc-lsm', el);
    var img = h('img', '', box); img.src = LSM.src; img.alt = 'The Lost Screen Memorial website'; img.decoding = 'async';
    h('div', 'top', box); h('div', 'bot', box);
    h('div', 'ttl', box, 'The Lost Screen Memorial');
    el.__lsm = img;
  },
  enter: function (el, ctx) {
    var img = el.__lsm; if (!img || ctx.reduced) return;
    var dist = LSM.h * (W * 0.8) / LSM.w - H;         // 80% of the slide width, keep aspect ratio
    var an = img.animate([{ transform: 'translate3d(0,0,0)' }, { transform: 'translate3d(0,' + (-dist) + 'px,0)' }],
      { duration: LSM.ms, delay: 900, easing: 'cubic-bezier(.42,0,.58,1)', fill: 'both' });
    ctx.onLeave(function () { try { an.cancel(); } catch (e) {} });
  }
});

/* ---------------------------------------------------------------- 5. #55 slide 41 - heading + picture only */
Deck.registerSlide(55, { keepBase: true, loop: 'embers', render: function () {}, enter: function () {} });

/* ---------------------------------------------------------------- 6. #58 slide 44 - Meet "Susan" */
var IC = {
  girl: '<svg viewBox="0 0 64 64"><circle cx="32" cy="24" r="12" fill="#fff"/><path d="M18 26c-2-14 7-20 14-20s16 6 14 20c-3-7-8-10-14-10s-11 3-14 10z" fill="#7a2b55"/><path d="M12 58c2-12 10-18 20-18s18 6 20 18z" fill="#fff"/></svg>',
  man: '<svg viewBox="0 0 64 64"><circle cx="32" cy="23" r="12" fill="#cfd6dc"/><path d="M21 19c1-8 6-11 11-11s10 3 11 11c-3-3-6-4-11-4s-8 1-11 4z" fill="#8a949c"/><path d="M10 58c2-13 11-19 22-19s20 6 22 19z" fill="#cfd6dc"/></svg>',
  chat: '<svg viewBox="0 0 34 34"><path d="M5 7h24a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H15l-7 6v-6H5a3 3 0 0 1-3-3V10a3 3 0 0 1 3-3z" fill="none" stroke="#22D3EE" stroke-width="2.6" stroke-linejoin="round"/></svg>',
  cam: '<svg viewBox="0 0 34 34"><rect x="3" y="9" width="28" height="19" rx="4" fill="none" stroke="#FFB020" stroke-width="2.6"/><path d="M12 9l2-4h6l2 4" fill="none" stroke="#FFB020" stroke-width="2.6" stroke-linejoin="round"/><circle cx="17" cy="18.5" r="5" fill="none" stroke="#FFB020" stroke-width="2.6"/></svg>',
  swap: '<svg viewBox="0 0 34 34" fill="none" stroke="#FF8A4C" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h22l-5-5M29 22H7l5 5"/></svg>',
  warn: '<svg viewBox="0 0 34 34"><path d="M17 4 31 29H3z" fill="none" stroke="#FF4D4D" stroke-width="2.8" stroke-linejoin="round"/><path d="M17 13v8" stroke="#FF4D4D" stroke-width="3" stroke-linecap="round"/><circle cx="17" cy="25" r="1.8" fill="#FF4D4D"/></svg>',
  msg: '<svg viewBox="0 0 24 24"><path d="M5 8h14M5 12h10M5 16h6" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/></svg>'
};
Deck.registerSlide(58, {
  keepBase: true, calm: true, steps: 1,
  render: function (el, ctx) {
    hide(ctx, ['e5', 'e6', 'e7']);
    var r = h('div', 'p58', el);
    r.innerHTML =
      '<div class="ttl">Meet <q>Susan</q></div>' +
      '<div class="idc">' +
        '<div class="row r1"><div class="av fake">' + IC.girl + '</div><div><div class="lb">What Alice sees</div><div class="big">Susan, 15-year-old girl</div><div class="sm">Friendly. Funny. &ldquo;Just like me.&rdquo;</div></div><div class="stamp">FAKE</div></div>' +
        '<div class="row r2"><div class="av real">' + IC.man + '</div><div><div class="lb">The truth</div><div class="big">A 42-year-old man</div><div class="sm">posing as a 15-year-old girl online</div></div></div>' +
      '</div>' +
      '<div class="tl">' +
        '<div class="bt" style="--c:#22D3EE;--cr:34,211,238"><div class="ic">' + IC.chat + '</div><p><b>Chats with Alice, 12</b>They become &ldquo;intimate friends&rdquo;.</p></div>' +
        '<div class="bt" style="--c:#FFB020;--cr:255,176,32"><div class="ic">' + IC.cam + '</div><p><b>Sends &ldquo;intimate&rdquo; pictures</b>taken from another girl.</p></div>' +
        '<div class="bt" style="--c:#FF8A4C;--cr:255,138,76"><div class="ic">' + IC.swap + '</div><p><b>Asks Alice to send some too</b>Alice did.</p></div>' +
        '<div class="bt warn" style="--c:#FF4D4D;--cr:255,77,77"><div class="ic">' + IC.warn + '</div><p><b>Now Susan starts grooming&hellip;</b>(Alice is receiving messages from Susan)</p></div>' +
      '</div>' +
      '<div class="lnk">' +
        '<div class="nd" style="left:0"><div class="av real">' + IC.man + '</div><b>&ldquo;Susan&rdquo;</b><span>says 15<br>really 42</span></div>' +
        '<div class="wire">' +
          '<div class="msg l" style="--t:3.2s;--d:0s">' + IC.msg + '</div><div class="msg l" style="--t:3.2s;--d:-1.6s">' + IC.msg + '</div>' +
          '<div class="msg r" style="--t:3.8s;--d:-.9s">' + IC.msg + '</div></div>' +
        '<div class="wl">messages every day</div>' +
        '<div class="nd" style="left:520px"><div class="av fake">' + IC.girl + '</div><b>Alice</b><span>12 years old</span></div>' +
      '</div>';
    var q = function (s) { return r.querySelector(s); };
    var parts = { r1: q('.r1'), r2: q('.r2'), stamp: q('.stamp'), tl: q('.tl'), bts: r.querySelectorAll('.bt'), lnk: q('.lnk'), ttl: q('.ttl'), idc: q('.idc') };
    el.__p58 = parts;
    if (ctx.static) set58(parts, 4, true);
  },
  enter: function (el, ctx) {
    var p = el.__p58; if (!p) return;
    var built = ctx.view.k >= 1 || cameBack || ctx.reduced;
    if (built) { set58(p, ctx.view.k >= 1 ? 4 : 3, true); return; }
    set58(p, -1, true);
    var tok = p.tok = (p.tok || 0) + 1;                    // a click (step) invalidates the remaining intro timers
    var t = function (ms, fn) { ctx.timeout(function () { if (p.tok === tok) fn(); }, ms); };
    var chars = twPrep(p.ttl); twSet(chars, 0); p.ttl.style.opacity = 1;
    var alive = true; ctx.onLeave(function () { alive = false; });
    t(150, function () { twRun(chars, 700, function () { return alive; }); });
    t(1000, function () { fadeIn(p.idc); p.r2.style.display = 'none'; });
    t(2600, function () {
      p.r2.style.display = ''; p.r2.animate([{ opacity: 0, transform: 'translateY(-14px)' }, { opacity: 1, transform: 'none' }], { duration: 650, easing: 'ease-out' });
    });
    t(3200, function () { p.stamp.animate([{ opacity: 0, transform: 'rotate(-12deg) scale(2.4)' }, { opacity: 1, transform: 'rotate(-12deg) scale(1)' }], { duration: 420, easing: 'cubic-bezier(.3,1.4,.5,1)', fill: 'forwards' }); });
    t(4300, function () { p.tl.style.setProperty('--tl', .25); p.bts[0].classList.add('on'); p.lnk.classList.add('on'); });
    t(6300, function () { p.tl.style.setProperty('--tl', .55); p.bts[1].classList.add('on'); });
    t(8300, function () { p.tl.style.setProperty('--tl', .8); p.bts[2].classList.add('on'); });
  },
  step: function (el, i, ctx) { var p = el.__p58; if (p) { p.tok = (p.tok || 0) + 1; set58(p, 4, false); } },
  unstep: function (el, i, ctx) { var p = el.__p58; if (p) { p.tok = (p.tok || 0) + 1; set58(p, 3, false); } }
});
function fadeIn(n) { n.style.opacity = 1; n.animate([{ opacity: 0, transform: 'translateY(24px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.2,.8,.25,1)' }); }
/** k: -1 nothing shown yet, 3 = everything before the click, 4 = final */
function set58(p, k, instant) {
  var on = k >= 3;
  p.ttl.style.opacity = k >= 0 || on ? 1 : 0;
  if (on && p.ttl.__tw) twSet(p.ttl.__tw, p.ttl.__tw.length);
  p.idc.style.opacity = on ? 1 : 0; p.r2.style.display = '';
  if (on) { p.stamp.getAnimations().forEach(function (a) { a.cancel(); }); p.stamp.style.opacity = 1; } else p.stamp.style.opacity = 0;
  p.lnk.classList.toggle('on', on); p.lnk.classList.toggle('hot', k >= 4);
  for (var i = 0; i < 4; i++) p.bts[i].classList.toggle('on', i < 3 ? on : k >= 4);
  p.tl.style.setProperty('--tl', k >= 4 ? 1 : on ? .8 : 0);
  if (instant) [p.tl].concat(Array.prototype.slice.call(p.bts)).forEach(function (n) { n.style.transition = 'none'; void n.offsetWidth; n.style.transition = ''; });
}

/* ---------------------------------------------------------------- 7. #59 slide 45 - move on when the chat ends */
hook(59, {
  enter: function (v) {
    if (cameBack || v.static) return;
    v.timers.push(setTimeout(function () { if (Deck.view === v && !v.deactivated) Deck.next(); }, 18600 + 3600));
  }
});

/* ---------------------------------------------------------------- 8. #64 slide 50 - dim the girl once the quotes start */
function dim64(v) { v.root.classList.toggle('pc-dim', v.k >= 1); }
hook(64, { show: function (v) { dim64(v); }, enter: dim64, step: function (v) { dim64(v); } });

/* ---------------------------------------------------------------- 9. #71 slide 53 - toggles beside the phone */
function tog71(v) {
  var t = v.root.querySelectorAll('.pb7-tog'); if (t.length < 2) return;
  var ph = elData(71, 'e6146'), x = (ph.x + ph.w) * W / 100 + 38, cy = (ph.y + ph.h / 2) * H / 100;
  [cy - 128, cy + 26].forEach(function (y, i) { var n = t[i]; n.classList.add('pc-side'); n.style.left = x + 'px'; n.style.top = Math.round(y) + 'px'; n.style.width = '520px'; });
  Array.prototype.forEach.call(t, function (n) { n.classList.toggle('pc-out', v.k >= 3); });
}
hook(71, { show: tog71, enter: tog71, step: function (v) { tog71(v); } });
/* #90 - two touch taps on the phone video: left 20% after 6 s, right 20% 2 s later */
function tap90(v) {
  var box = v.map.e3; if (!box || v.k !== 0 || v.static) return;
  function tap(fx) {
    if (Deck.view !== v || v.deactivated) return;
    var t = h('div', 'pc-tap', box); t.style.left = (fx * 100) + '%'; t.style.top = '50%';
    h('i', '', t); h('b', '', t);
    setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 1500);
  }
  v.timers.push(setTimeout(function () { tap(0.2); }, 6000));
  v.timers.push(setTimeout(function () { tap(0.8); }, 9000));
}
hook(90, { enter: tap90 });

/* #72 - the colour / sound chips are not shown on this slide */
function noTog72(v) { Array.prototype.forEach.call(v.root.querySelectorAll('.pb7-tog'), function (n) { n.style.display = 'none'; }); }
hook(72, { show: noTog72, enter: noTog72, step: noTog72 });

/* ---------------------------------------------------------------- 10. #88 slide 58 / #92 slide 61 - website screenshots */
function website(n, src, iw, ih, url, rgb) {
  Deck.registerSlide(n, {
    keepBase: false, loop: ['orbs'],
    render: function (el, ctx) {
      var maxW = 1660, maxH = 1000 - 46, w = Math.min(maxW, maxH * iw / ih), hh = w * ih / iw + 46;
      var x = (W - w) / 2, y = (H - hh) / 2;
      var gl = h('div', 'pc-wglow', el); gl.style.cssText = 'left:' + (x - 160) + 'px;top:' + (y - 120) + 'px;width:' + (w + 320) + 'px;height:' + (hh + 240) + 'px;--wc:' + rgb;
      var wrap = h('div', ctx.static ? '' : 'pc-rise', el); wrap.style.cssText = 'position:absolute;inset:0';
      var win = h('div', 'pc-win' + (ctx.static ? '' : ' pc-bob'), wrap,
        '<div class="bar"><i></i><i></i><i></i><div class="url"><b>&#128274;</b>' + url + '</div></div>');
      win.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;--wc:' + rgb;
      var im = h('img', '', win); im.src = src; im.alt = url + ' home page'; im.style.height = (w * ih / iw) + 'px';
    },
    enter: function () {}
  });
}
website(88, 'media/kahfguard-hero.webp', 1382, 829, 'kahfguard.com', '46,229,157');
website(92, 'media/kahfbrowser-hero.webp', 1491, 978, 'kahfbrowser.com', '168,85,247');

/* ---------------------------------------------------------------- 11. #97 slide 66 - kahfkids.com first view, live carousel */
var KK = { k: 1.2, n: 9, hold: 3600, slide: 650,              // site captured at 1600x900 css px (x1.2 = slide px)
  scr: { x: 988.08, y: 211.75, w: 264, h: 572, r: 36 }, capY: 812.75, capX: 1120, capH: 41.75, dotsY: 881.5,
  capW: [462, 364, 396, 464, 474, 482, 388, 434, 418] };       // caption image widths (2x)
Deck.registerSlide(97, {
  keepBase: false, loop: false,
  render: function (el, ctx) {
    var k = KK.k, box = h('div', 'pc-kk', el);
    var bg = h('img', 'bg', box); bg.src = 'media/kahfkids/hero-bg.webp'; bg.alt = 'kahfkids.com';
    var scr = h('div', 'scr', box);
    scr.style.cssText = 'left:' + KK.scr.x * k + 'px;top:' + KK.scr.y * k + 'px;width:' + KK.scr.w * k + 'px;height:' + KK.scr.h * k + 'px;border-radius:' + KK.scr.r * k + 'px';
    var trk = h('div', 'trk', scr), sw = KK.scr.w * k;
    for (var i = 0; i <= KK.n; i++) { var im = h('img', '', trk); im.src = 'media/kahfkids/slide-' + (i % KK.n + 1) + '.webp'; im.style.width = sw + 'px'; im.alt = ''; }
    var caps = [];
    for (var c = 0; c < 2; c++) { var ci = h('img', 'cap', box); ci.style.top = KK.capY * k + 'px'; ci.style.left = KK.capX * k + 'px'; caps.push(ci); }
    var dots = h('div', 'dots', box); dots.style.left = KK.capX * k + 'px'; dots.style.top = KK.dotsY * k + 'px';
    for (var d = 0; d < KK.n; d++) h('i', '', dots);
    el.__kk = { trk: trk, sw: sw, caps: caps, dots: dots.children, cur: 0, capOn: 0 };
    showKK(el.__kk, 0, true);
  },
  enter: function (el, ctx) {
    var s = el.__kk; if (!s || ctx.reduced) return;
    ctx.interval(function () {
      var nx = s.cur + 1;
      s.trk.style.transition = 'transform ' + KK.slide + 'ms cubic-bezier(.65,0,.35,1)';
      s.trk.style.transform = 'translate3d(' + (-nx * s.sw) + 'px,0,0)';
      showKK(s, nx % KK.n, false);
      s.cur = nx;
      if (nx === KK.n) ctx.timeout(function () { s.trk.style.transition = 'none'; s.trk.style.transform = 'translate3d(0,0,0)'; s.cur = 0; }, KK.slide + 30);
    }, KK.hold + KK.slide);
  }
});
function showKK(s, i, instant) {
  var a = s.caps[s.capOn], b = s.caps[1 - s.capOn], w = KK.capW[i] / 2 * KK.k;
  b.src = 'media/kahfkids/cap-' + (i + 1) + '.png'; b.style.width = w + 'px'; b.style.height = KK.capH * KK.k + 'px';
  if (instant) { a.className = 'cap out'; b.className = 'cap'; }
  else { b.className = 'cap in0'; void b.offsetWidth; a.className = 'cap out'; b.className = 'cap'; }
  s.capOn = 1 - s.capOn;
  Array.prototype.forEach.call(s.dots, function (d, j) { d.classList.toggle('on', j === i); });
}

/* ---------------------------------------------------------------- 12. charts (slides 69-72): instant chart, data lines draw themselves */
function lineChart(n, picId, name, extra) {
  Deck.registerSlide(n, {
    keepBase: true, loop: ['orbs'],
    render: function (el, ctx) {
      var p = ctx.view.map[picId], img = p && p.querySelector('img'); if (!img) return;
      img.src = 'media/charts/' + name + '-base.png';
      var ln = h('img', 'pc-lines' + (ctx.static ? ' full' : ''), p.querySelector('.in')); ln.src = 'media/charts/' + name + '-lines.png'; ln.alt = '';
      el.__ln = ln;
    },
    enter: function (el, ctx) {
      var ln = el.__ln; if (!ln) return;
      if (extra) extra(ctx);
      if (cameBack || ctx.reduced) { ln.classList.add('full'); return; }
      var an = ln.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: 3400, delay: 350, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' });
      ctx.onLeave(function () { try { an.cancel(); } catch (e) {} });
    }
  });
}
lineChart(106, 'e1026', 'image181');
lineChart(107, 'e5122', 'image182');
lineChart(108, 'e3074', 'image183');
lineChart(109, 'e3074', 'image183', function (ctx) {          // keep the social-app icons bobbing (was part-b's loop)
  ['e1028', 'e1030', 'e1032', 'e1034'].forEach(function (id, i) {
    var e = ctx.view.map[id]; if (!e) return;
    e.style.setProperty('--t', (6 + i * 1.7) + 's'); e.style.setProperty('--d', (-i * 2.3) + 's'); e.classList.add('pb-float');
  });
});

/* ---------------------------------------------------------------- 13. #112 closing slide - company.kahf.to hero recording (4K) */
Deck.registerSlide(112, {
  keepBase: false, loop: false, calm: true,
  render: function (el, ctx) {
    var box = h('div', 'pc-close', el);
    if (ctx.static) { var im = h('img', '', box); im.src = 'media/kahf-company-hero-poster.jpg'; im.alt = 'company.kahf.to'; return; }
    var v = h('video', '', box);
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.poster = 'media/kahf-company-hero-poster.jpg';
    v.src = 'media/kahf-company-hero-4k.mp4';
    el.__v = v;
  },
  enter: function (el, ctx) { var v = el.__v; if (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } }
});
/* ---------------------------------------------------------------- 14. NEW after #96 - "How to keep Susan away" (WhatsApp privacy) */
(function () {
  var S = 320 / 924;                                   // screenshot px -> card px (screenshots are 924 wide, cropped to 1560 tall)
  var CARDS = [
    { img: 'last-seen', lab: 'Last seen &amp; online', val: 'Nobody', rows: [[766, 906], [1192, 1330]] },
    { img: 'profile-picture', lab: 'Profile picture', val: 'My contacts', rows: [[484, 624]] },
    { img: 'status', lab: 'Status', val: 'Only share with&hellip;', rows: [[660, 838]] },
    { img: 'groups', lab: 'Groups', val: 'My contacts', rows: [[484, 624]] },
    { img: 'privacy', lab: 'Read receipts', val: 'Off', rows: [[955, 1092]], toggle: [698, 990, 150, 67] }
  ];
  var CSSW = [
    '.wa{position:absolute;inset:0;font-family:var(--f-body);color:#F4F1EA}',
    '.wa .ttl{position:absolute;left:0;right:0;top:46px;text-align:center;font:600 86px/1.05 var(--f-display);letter-spacing:-.015em}',
    '.wa .ttl em{font-style:italic;color:#ff6b6b;text-shadow:0 0 40px rgba(255,77,77,.45)}',
    '.wa .sub{position:absolute;left:0;right:0;top:160px;text-align:center}',
    '.wa .sub span{display:inline-flex;gap:12px;align-items:center;padding:9px 22px;border-radius:99px;font:600 25px/1 var(--f-body);color:#bff5d3;background:rgba(37,211,102,.12);box-shadow:inset 0 0 0 1.5px rgba(37,211,102,.5)}',
    '.wa .sub svg{width:28px;height:28px}',
    '.wa .card{position:absolute;top:246px;width:336px;transform-origin:50% 45%;transition:transform .9s cubic-bezier(.3,.9,.3,1),opacity .7s ease,filter .7s ease}',
    '.wa .ph{position:relative;padding:8px;border-radius:38px;background:linear-gradient(160deg,#2a3238,#0b0f12);box-shadow:0 40px 90px -30px rgba(0,0,0,.95),0 0 0 1px rgba(255,255,255,.14)}',
    '.wa .scr{position:relative;width:320px;height:' + Math.round(1560 * S) + 'px;border-radius:30px;overflow:hidden;background:#f2f2f2;-webkit-mask-image:linear-gradient(#000 86%,rgba(0,0,0,.25));mask-image:linear-gradient(#000 86%,rgba(0,0,0,.25))}',
    '.wa .scr img{display:block;width:100%}',
    '.wa .hi{position:absolute;left:' + (36 * S) + 'px;width:' + (852 * S) + 'px;border-radius:16px;box-shadow:0 0 0 3px #25D366,0 0 22px rgba(37,211,102,.75);opacity:0;animation:wa-hi 2.4s ease-in-out infinite}',
    '@keyframes wa-hi{0%,100%{box-shadow:0 0 0 3px #25D366,0 0 14px rgba(37,211,102,.5)}50%{box-shadow:0 0 0 3px #4be38a,0 0 30px rgba(37,211,102,.95)}}',
    '.wa .lab{margin-top:22px;text-align:center}',
    '.wa .lab small{display:block;font:700 19px/1.2 var(--f-body);letter-spacing:.14em;text-transform:uppercase;color:#9AA7AD}',
    '.wa .lab b{display:inline-block;margin-top:8px;font:800 34px/1.1 var(--f-body);color:#4be38a;text-shadow:0 0 24px rgba(37,211,102,.4)}',
    '.wa .lab .was{color:#9AA7AD;text-decoration:line-through;text-decoration-thickness:3px;text-decoration-color:#ff4d4d;margin-right:14px;font-weight:700}',
    '.wa .tg{position:absolute;border-radius:99px;background:#34C759;transition:background .35s ease}',
    '.wa .tg i{position:absolute;top:1.6px;bottom:1.6px;aspect-ratio:1;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.3);left:calc(100% - 1.6px);transform:translateX(-100%);transition:left .35s cubic-bezier(.3,1.3,.5,1),transform .35s cubic-bezier(.3,1.3,.5,1)}',
    '.wa .tg.off{background:#e3e3e6}.wa .tg.off i{left:1.6px;transform:none}',
    '.wa .fg{position:absolute;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:rgba(255,255,255,.55);box-shadow:0 0 0 3px rgba(20,20,20,.55),0 8px 20px rgba(0,0,0,.4);opacity:0;pointer-events:none}',
    '.wa .rp{position:absolute;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;border:3px solid rgba(37,211,102,.9);opacity:0;pointer-events:none}',
    '.wa.focus .card:not(.rr){opacity:.45;filter:saturate(.6)}',
    '.wa.focus .card.rr{transform:scale(1.2) translateX(-26px);z-index:3}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'part-c-wa-css'; st.textContent = CSSW; document.head.appendChild(st);
  var LOCK = '<svg viewBox="0 0 24 24" fill="#25D366"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.4.4 0 0 0 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.2c0-.1-.2-.2-.4-.3z"/></svg>';

  Deck.insertSlide({
    after: 96, id: 'wa-privacy', title: 'How to keep Susan away', section: 'protect', tr: { type: 'fade', ms: 800 }, loop: ['orbs'],
    notes: 'WhatsApp > Settings > Privacy. Last seen & online: Nobody. Profile picture: My contacts. Status: only share with the people you choose. Groups: My contacts (strangers cannot add your child to groups). Read receipts: Off, so a groomer cannot see when messages were read.',
    render: function (el, ctx) {
      var r = h('div', 'wa', el);
      h('div', 'ttl', r, 'How to keep <em>Susan</em> away');
      h('div', 'sub', r, '<span>' + LOCK + 'WhatsApp &rsaquo; Settings &rsaquo; Privacy</span>');
      var left = (W - (5 * 336 + 4 * 36)) / 2, cards = [];
      CARDS.forEach(function (c, i) {
        var card = h('div', 'card' + (c.toggle ? ' rr' : ''), r); card.style.left = (left + i * 372) + 'px';
        var ph = h('div', 'ph', card), scr = h('div', 'scr', ph);
        var im = h('img', '', scr); im.src = 'media/whatsapp/' + c.img + '.webp'; im.alt = 'WhatsApp privacy setting: ' + c.lab.replace('&amp;', '&');
        var his = c.rows.map(function (rw) { var hi = h('div', 'hi', scr); hi.style.top = (rw[0] * S) + 'px'; hi.style.height = ((rw[1] - rw[0]) * S) + 'px'; return hi; });
        var lab = h('div', 'lab', card, '<small>' + c.lab + '</small><b>' + (c.toggle ? '<span class="was">On</span>' : '') + c.val + '</b>');
        var o = { card: card, his: his, lab: lab };
        if (c.toggle) {
          var tg = h('div', 'tg', scr, '<i></i>'), t = c.toggle;
          tg.style.cssText = 'left:' + t[0] * S + 'px;top:' + t[1] * S + 'px;width:' + t[2] * S + 'px;height:' + t[3] * S + 'px';
          o.tg = tg; o.was = lab.querySelector('.was'); o.val = lab.querySelector('b');
          o.fg = h('div', 'fg', scr); o.rp = h('div', 'rp', scr);
          o.tx = (t[0] + t[2] / 2) * S; o.ty = (t[1] + t[3] / 2) * S;
          [o.fg, o.rp].forEach(function (n) { n.style.left = o.tx + 'px'; n.style.top = o.ty + 'px'; });
        }
        cards.push(o);
      });
      el.__wa = { r: r, cards: cards };
      if (ctx.static) waFinal(el.__wa);
      else { waStart(el.__wa); cards.forEach(function (o) { o.card.style.opacity = 0; }); }   // hidden until the transition has finished
    },
    enter: function (el, ctx) {
      var s = el.__wa; if (!s) return;
      if (cameBack || ctx.reduced) { waFinal(s); return; }
      var ease = 'cubic-bezier(.2,.8,.25,1)';
      s.cards.forEach(function (c, i) {
        c.card.style.opacity = '';
        c.card.animate([{ opacity: 0, transform: 'translateY(70px)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 250 + i * 300, easing: ease, fill: 'backwards' });
        ctx.timeout(function () { c.his.forEach(function (x) { x.style.opacity = 1; x.animate([{ opacity: 0, transform: 'scale(1.08)' }, { opacity: 1, transform: 'none' }], { duration: 450 }); }); }, 900 + i * 300);
      });
      var rr = s.cards[4];
      ctx.timeout(function () { s.r.classList.add('focus'); }, 3300);
      ctx.timeout(function () {                                     // a finger comes in from below and taps the switch
        rr.fg.animate([{ opacity: 0, transform: 'translate(70px,120px)' }, { opacity: 1, transform: 'translate(0,0)', offset: .7 }, { opacity: 1, transform: 'scale(.78)', offset: .85 }, { opacity: 1, transform: 'scale(1)' }],
          { duration: 1200, easing: 'ease-out', fill: 'forwards' });
      }, 4100);
      ctx.timeout(function () {
        rr.tg.classList.add('off');
        rr.rp.animate([{ opacity: .95, transform: 'scale(.6)' }, { opacity: 0, transform: 'scale(2.6)' }], { duration: 700, easing: 'ease-out' });
        rr.his.forEach(function (x) { x.style.opacity = 1; });
      }, 5100);
      ctx.timeout(function () {
        rr.was.style.display = ''; rr.was.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 });
        rr.val.lastChild.textContent = 'Off';
        rr.val.animate([{ transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 500, easing: 'cubic-bezier(.3,1.5,.5,1)' });
        rr.fg.animate([{ opacity: 1 }, { opacity: 0, transform: 'translate(40px,80px)' }], { duration: 600, fill: 'forwards' });
      }, 5500);
      ctx.timeout(function () { s.r.classList.remove('focus'); }, 7600);
    }
  });
  function waStart(s) {
    s.cards.forEach(function (c) { c.his.forEach(function (x) { x.style.opacity = 0; }); });
    var rr = s.cards[4]; rr.tg.classList.remove('off'); rr.was.style.display = 'none'; rr.val.lastChild.textContent = 'On';
  }
  function waFinal(s) {
    s.cards.forEach(function (c) { c.card.style.opacity = ''; c.his.forEach(function (x) { x.style.opacity = 1; }); });
    var rr = s.cards[4]; rr.tg.classList.add('off'); rr.was.style.display = ''; rr.val.lastChild.textContent = 'Off';
  }
})();
})();
