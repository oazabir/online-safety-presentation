/* ============================================================================
   part-a.js - custom, animated & interactive slides for the first part of the deck
   Self-contained: injects <style id="part-a-css">, uses only Deck/ctx helpers.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck) return;


/* ---------------------------------------------------------------- css */
var CSS = [
'.pa9-books p,.pa9-books span{white-space:nowrap}.pa9-books span{font-size:84px!important;background:rgba(5,10,13,.9);padding:.02em .28em .06em;border-radius:.42em;box-shadow:0 10px 30px rgba(0,0,0,.65),0 0 0 2px rgba(255,214,90,.55);text-shadow:0 2px 10px rgba(0,0,0,.9),0 0 22px rgba(255,214,90,.45);-webkit-box-decoration-break:clone;box-decoration-break:clone}',
'.pa{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden}',
'.pa *{box-sizing:border-box}',
'.pa .rv{opacity:0}',
'.pa.go .rv{animation:pa-rise .95s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
'.pa.static .rv{opacity:1;animation:none}',
'@keyframes pa-rise{from{opacity:0;transform:translateY(36px)}to{opacity:1;transform:none}}',
'@keyframes pa-fade{from{opacity:0}to{opacity:1}}',
'@keyframes pa-float{from{transform:translate3d(0,-8px,0) rotate(var(--r0,0deg))}to{transform:translate3d(0,10px,0) rotate(var(--r1,0deg))}}',
'@keyframes pa-breathe{from{opacity:.55;transform:scale(1)}to{opacity:1;transform:scale(1.07)}}',
'@keyframes pa-ring{0%{transform:scale(.2);opacity:.9}100%{transform:scale(1.5);opacity:0}}',
'@keyframes pa-up{0%{transform:translate3d(0,0,0);opacity:0}10%{opacity:1}90%{opacity:1}100%{transform:translate3d(var(--dx,0px),-1180px,0);opacity:0}}',
'.pa-p{position:absolute;bottom:-20px;border-radius:50%;left:var(--x);width:var(--s);height:var(--s);background:rgba(var(--c),var(--o,.6));',
'  box-shadow:0 0 calc(var(--s)*3) rgba(var(--c),.7);animation:pa-up var(--t,22s) linear infinite;animation-delay:var(--d,0s);will-change:transform}',
/* sweeps & flickers on base elements */
'.pa-hs{position:relative;overflow:hidden}',
'.pa-sweep{position:absolute;top:-10%;bottom:-10%;left:0;width:34%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.22),transparent);',
'  transform:translateX(-130%) skewX(-18deg);animation:pa-sw 7s ease-in-out infinite;animation-delay:var(--d,1.5s);pointer-events:none;mix-blend-mode:screen}',
'@keyframes pa-sw{0%{transform:translateX(-130%) skewX(-18deg)}35%,100%{transform:translateX(420%) skewX(-18deg)}}',
'.pa-pan{position:absolute;top:0;bottom:0;width:33.4%;background:radial-gradient(circle at 50% 50%,rgba(255,255,255,.18),transparent 70%);opacity:0;animation:pa-pan 9s ease-in-out infinite;animation-delay:var(--d);pointer-events:none;mix-blend-mode:screen}',
'@keyframes pa-pan{0%,30%,100%{opacity:0}12%{opacity:1}}',
'@keyframes pa-flick{0%,100%{opacity:1}6%{opacity:.82}9%{opacity:1}52%{opacity:.9}55%{opacity:1}57%{opacity:.7}60%{opacity:1}}',
'.pa-flick{animation:pa-flick 5s steps(1,end) infinite}',
'.pa-redglow{position:absolute;left:50%;top:50%;width:1300px;height:1300px;margin:-650px 0 0 -650px;border-radius:50%;background:radial-gradient(circle,rgba(255,40,60,.34),transparent 62%);animation:pa-breathe 3.4s ease-in-out infinite alternate;pointer-events:none}',
'.pa-numpulse{animation:pa-np 2.6s ease-in-out infinite}',
'@keyframes pa-np{0%,100%{filter:brightness(1)}50%{filter:brightness(1.35) drop-shadow(0 0 22px rgba(255,200,60,.8))}}',

/* ---- slide 1: family scrapbook cover */
'@font-face{font-family:"Cover Baloo";src:url(assets/fonts/baloo-da-2-latin.woff2) format("woff2");font-weight:500 800;font-display:block}',
'@font-face{font-family:"Cover Nunito";src:url(assets/fonts/nunito-latin.woff2) format("woff2");font-weight:400 900;font-display:block}',
'.pa1{--cover-accent:#a7e0cc;--cover-peach:#ffb19c;--cover-yellow:#f8cf73;font-family:"Cover Nunito",var(--f-body)}',
'.pa1-top{position:absolute;left:108px;right:108px;top:80px;display:flex;justify-content:space-between;align-items:center}',
'.pa1-kicker{display:inline-block;padding:9px 25px 11px;background:var(--cover-yellow);color:#28332b;border-radius:8px 14px 6px 12px;transform:translateY(145px) rotate(-3deg);font-size:28px;font-weight:800;box-shadow:5px 6px 0 rgba(248,207,115,.12)}',
'.pa1-brand{font:800 38px "Cover Nunito",var(--f-body);color:var(--cover-accent);transform:rotate(3deg)}',
'.pa1-title{position:absolute;left:101px;top:353px;margin:0;width:820px;font:700 108px/1.03 "Cover Baloo",var(--f-display);letter-spacing:-.025em;color:#fff4de}',
'.pa1-title span{display:block}.pa1-title .pa1-cure{color:var(--cover-peach);transform:rotate(-2deg);transform-origin:0 50%}.pa1-title .pa1-accent{color:var(--cover-accent)}',
'.pa1-underline{position:absolute;left:99px;top:683px;width:730px;height:40px;color:var(--cover-accent);transform:rotate(-1deg)}',
'.pa1-photo{position:absolute;left:956px;top:237px;width:850px;margin:0}',
'.pa1-paper{position:relative;padding:22px 22px 24px;background:#fff4de;transform:rotate(3deg);border-radius:3px 7px 4px 6px;box-shadow:13px 20px 0 rgba(167,224,204,.13),0 24px 55px rgba(0,8,12,.4)}',
'.pa1-tape{position:absolute;top:-22px;left:288px;width:225px;height:57px;z-index:2;background:repeating-linear-gradient(90deg,rgba(255,255,255,.15) 0 2px,transparent 2px 13px),#a7d8c5;opacity:.94;transform:rotate(-9deg);clip-path:polygon(2% 0,98% 3%,100% 18%,98% 29%,100% 42%,98% 57%,100% 71%,98% 85%,99% 100%,1% 96%,2% 80%,0 63%,2% 48%,0 34%,2% 19%)}',
'.pa1-frame{width:806px;height:440px;overflow:hidden;background:#d0c7ac}',
'.pa1-frame img{width:100%;height:100%;object-fit:cover;display:block}',
'.pa1-photo figcaption{width:50%;text-align:left;text-wrap:balance;margin-top:20px;font:800 29px/1.23 "Cover Nunito",var(--f-body);color:#33423c}',
'.pa1-arrow{position:absolute;left:345px;top:419px;width:240px;height:174px;overflow:visible;color:#cf644e;pointer-events:none}',
'.pa1-photo-note{position:absolute;left:52px;top:-125px;font:500 italic 35px var(--f-display);color:var(--cover-yellow);transform:rotate(-6deg)}',
'.pa1-footer{position:absolute;left:110px;right:100px;top:905px;display:grid;grid-template-columns:560px 660px 1fr;gap:30px;align-items:center}',
'.pa1-who{position:relative;padding-left:25px;border-left:5px solid var(--cover-yellow);transform:rotate(-1deg)}',
'.pa1-who .n{font:700 48px/1 "Cover Baloo",var(--f-display);color:#fff4de}',
'.pa1-who .r{margin-top:8px;font-size:25px;font-weight:700;color:var(--cover-accent)}',
'.pa1-experience,.pa1-education{margin:0;font:600 25px/1.4 "Cover Nunito",var(--f-body);color:#ced9d2}',
'.pa1-education{padding-left:23px;border-left:2px dashed #61776e}',
'.pa1.static .rv,.pa1.reduced .rv{opacity:1;animation:none}.pa1.reduced *{animation:none!important;transition:none!important}',
'@keyframes pa-grad{to{background-position:-220% 0}}',

/* ---- buttons */
'.pa-btn{font:600 24px var(--f-body);color:var(--ink);background:var(--glass);border:1px solid var(--glass-b);border-radius:99px;padding:10px 24px;cursor:pointer;transition:background .2s,transform .2s}',
'.pa-btn:hover{background:rgba(255,255,255,.16);transform:translateY(-2px)}',

/* ---- slide 24 checklist */
'.sg-row{position:absolute;left:840px;width:1010px;height:140px;display:flex;align-items:center;gap:26px;padding:0 30px 0 24px;border-radius:24px;border:0;background:var(--glass);color:var(--ink);text-align:left;cursor:pointer;',
'  box-shadow:inset 0 0 0 1px var(--glass-b);font-family:var(--f-body);transition:background .3s,box-shadow .3s,transform .3s}',
'.sg-row:hover{background:rgba(255,255,255,.12);transform:translateX(6px)}',
'.sg-box{flex:none;width:68px;height:68px;border-radius:20px;border:4px solid rgba(255,255,255,.4);display:grid;place-items:center;transition:all .3s}',
'.sg-box svg{width:44px;height:44px;stroke:#fff;stroke-width:6;fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:50;stroke-dashoffset:50;transition:stroke-dashoffset .4s .05s}',
'.sg-t{font-size:30px;line-height:1.2;color:var(--ink2)}.sg-t b{color:#fff;font-weight:700;display:block;font-size:38px;margin-bottom:4px}',
'.sg-row.on{background:linear-gradient(90deg,rgba(255,77,77,.28),rgba(255,77,77,.08));box-shadow:inset 0 0 0 2px rgba(255,77,77,.7),0 0 36px rgba(255,77,77,.25)}',
'.sg-row.on .sg-box{background:var(--red);border-color:var(--red);box-shadow:0 0 24px rgba(255,77,77,.7)}',
'.sg-row.on .sg-box svg{stroke-dashoffset:0}',
'.sg-meter{position:absolute;left:1130px;top:62px;width:720px}',
'.sg-mh{display:flex;justify-content:space-between;align-items:baseline;font-size:28px;letter-spacing:.14em;text-transform:uppercase;font-weight:700;color:var(--ink2)}',
'.sg-mh b{letter-spacing:.02em;text-transform:none;font-size:38px;color:#fff;transition:color .3s}',
'.sg-track{position:relative;margin-top:10px;height:36px;border-radius:40px;overflow:hidden;background:linear-gradient(90deg,#22D3EE,#2EE59D 28%,#FFB020 56%,#FF4D4D);box-shadow:0 0 0 2px rgba(255,255,255,.18)}',
'.sg-cover{position:absolute;inset:0;background:#0A1418;transition:transform .7s cubic-bezier(.22,.8,.3,1)}',
'.sg-seg{position:absolute;top:0;bottom:0;width:3px;background:rgba(8,16,20,.8)}',
'.sg-meter.max .sg-track{animation:pa-shake .5s 2,pa-np 1.2s ease-in-out infinite;box-shadow:0 0 40px rgba(255,77,77,.8),0 0 0 2px rgba(255,77,77,.9)}',
'@keyframes pa-shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
'.sg-clear{position:absolute;left:840px;top:972px}',

/* ---- slide 27 split */
'.sp-side{position:absolute;inset:0}',
'.sp-L{clip-path:polygon(0 0,1120px 0,800px 1080px,0 1080px);background:radial-gradient(900px 800px at 25% 55%,#0B3B45,#05161C 70%)}',
'.sp-R{clip-path:polygon(1120px 0,1920px 0,1920px 1080px,800px 1080px);background:radial-gradient(900px 800px at 78% 55%,#5b1020,#1c0912 70%)}',
'.sp-ring{position:absolute;width:900px;height:900px;margin:-450px 0 0 -450px;border-radius:50%;border:3px solid rgba(var(--c),.7);animation:pa-ring 6s linear infinite;animation-delay:var(--d)}',
'.sp-h{position:absolute;font-family:var(--f-display);font-weight:700;line-height:.98;letter-spacing:-.02em}',
'.sp-h small{display:block;font:700 34px var(--f-body);letter-spacing:.3em;text-transform:uppercase;margin-bottom:18px}',
'.sp-L .sp-h{left:90px;top:360px;font-size:150px;color:#fff;text-shadow:0 0 60px rgba(34,211,238,.7)}',
'.sp-L .sp-h small{color:var(--cyan)}',
'.sp-R .sp-h{right:80px;top:360px;font-size:150px;text-align:right;color:#fff;text-shadow:0 0 60px rgba(255,77,77,.7)}',
'.sp-R .sp-h small{color:var(--red)}',
'.sp-seam{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none}',
'.sp-vs{position:absolute;left:960px;top:540px;width:190px;height:190px;margin:-95px 0 0 -95px;border-radius:50%;display:grid;place-items:center;font:italic 600 92px var(--f-display);color:#fff;',
'  background:radial-gradient(circle at 35% 30%,#fff3,#05080B 70%);box-shadow:0 0 0 3px rgba(255,255,255,.8),0 0 80px 10px rgba(255,255,255,.35)}',
'@keyframes pa-slamL{from{transform:translateX(-220px);opacity:0}to{transform:none;opacity:1}}',
'@keyframes pa-slamR{from{transform:translateX(220px);opacity:0}to{transform:none;opacity:1}}',
'@keyframes pa-pop{0%{transform:scale(0);opacity:0}70%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}',
'.pa.go .sp-L .sp-h{animation:pa-slamL .9s cubic-bezier(.2,.9,.2,1) .15s both}',
'.pa.go .sp-R .sp-h{animation:pa-slamR .9s cubic-bezier(.2,.9,.2,1) .15s both}',
'.pa.go .sp-vs{animation:pa-pop .7s cubic-bezier(.2,.9,.2,1) .85s both}',
'@keyframes pa-spark{from{transform:translate(1120px,-40px)}to{transform:translate(800px,1090px)}}',
'.sp-spark{position:absolute;left:-16px;top:-16px;width:32px;height:32px;border-radius:50%;background:#fff;box-shadow:0 0 30px 14px rgba(255,255,255,.8);animation:pa-spark 3.4s ease-in-out infinite alternate}',
'@keyframes pa-beat{0%,100%{transform:scale(1)}14%{transform:scale(1.07)}28%{transform:scale(1)}42%{transform:scale(1.045)}}',
'.sp-R .sp-h{animation-name:pa-slamR}',
'.pa.go .sp-R .sp-hh{display:block;animation:pa-beat 2.2s ease-in-out 1.2s infinite}',
'.pa.go .sp-L .sp-hh{display:block;animation:pa-np 3s ease-in-out 1.2s infinite}',

/* ---- slide 28 chart */
'.dp-card{position:absolute;left:1010px;top:40px;width:870px;height:610px;transform:scale(.8);transform-origin:0 0;border-radius:26px;background:linear-gradient(160deg,rgba(255,255,255,.085),rgba(255,255,255,.03));box-shadow:inset 0 0 0 1px var(--glass-b),var(--shadow)}',
'.dp-card svg{position:absolute;left:0;top:0;width:870px;height:610px;overflow:visible}',
/* #28: research paper on the left, the slide's three points as callouts coming out of it */
'.pa28 .co-t{position:absolute;left:80px;top:44px;font:700 64px/1 var(--f-body);color:var(--ink);letter-spacing:-.01em}',
'.pa28 .co{position:absolute;width:880px;padding:20px 32px;border-radius:28px;background:linear-gradient(180deg,#fbf8f1,#e9e4d8);color:#141a1e;font:500 27px/1.32 var(--f-body);',
'  box-shadow:0 26px 60px -18px rgba(0,0,0,.85),0 0 0 1px rgba(255,255,255,.6);opacity:0;transform:scale(.4) translateX(-40px);transform-origin:0 70%;transition:opacity .35s ease,transform .55s cubic-bezier(.3,1.5,.5,1);z-index:6}',
'.pa28 .co:before{content:"";position:absolute;left:-34px;top:62%;width:0;height:0;border-style:solid;border-width:20px 44px 20px 0;border-color:transparent #ece7dc transparent transparent;transform:translateY(-50%) rotate(14deg)}',
'.pa28 .co.on{opacity:1;transform:none}',
'.pa28 .co b{font-weight:800;color:#c2410c}',
'.pa28 .co .tw-c.cur::after{background:#c2410c}',
'.pa28.static .co{opacity:1;transform:none;transition:none}',
'.dp-clip rect{animation:pa-reveal 10s linear infinite}',
'@keyframes pa-reveal{0%{width:0}74%,100%{width:810px}}',
'.dp-now{animation:pa-now 10s linear infinite}',
'@keyframes pa-now{0%{transform:translateX(0);opacity:1}74%{transform:translateX(810px);opacity:1}80%,100%{transform:translateX(810px);opacity:0}}',
'.dp-ill{position:absolute;left:0;right:0;bottom:16px;text-align:center;font-size:23px;letter-spacing:.06em;color:var(--muted);text-transform:uppercase}',

/* ---- dividers */
'.dv-beam{position:absolute;top:-20%;bottom:-20%;left:0;width:26%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.28),transparent);transform:translateX(-150%) skewX(-18deg);animation:pa-sw2 6.5s ease-in-out infinite;mix-blend-mode:overlay;pointer-events:none}',
'@keyframes pa-sw2{0%{transform:translateX(-150%) skewX(-18deg)}40%,100%{transform:translateX(480%) skewX(-18deg)}}',
'.dv-bar{position:absolute;left:0;bottom:0;height:20px;width:100%;transform-origin:0 50%;animation:pa-bar 5.5s cubic-bezier(.65,0,.35,1) infinite;background:linear-gradient(90deg,var(--c1),var(--c2));box-shadow:0 0 40px var(--c1)}',
'@keyframes pa-bar{0%{transform:scaleX(0)}45%,80%{transform:scaleX(1);opacity:1}100%{transform:scaleX(1);opacity:0}}',
'.dv-vig{position:absolute;inset:0;background:radial-gradient(ellipse at 30% 25%,transparent 35%,rgba(0,0,0,.55));animation:pa-breathe 4s ease-in-out infinite alternate;pointer-events:none}',
'.dv-glow{position:absolute;border-radius:30px;mix-blend-mode:screen;animation:pa-breathe 2.8s ease-in-out infinite alternate;pointer-events:none}',

/* ---- slide 38 */
'.q-q{position:absolute;right:30px;top:-120px;font:700 1250px/1 var(--f-display);color:transparent;-webkit-text-stroke:5px rgba(255,122,26,.40);animation:pa-float 12s ease-in-out infinite alternate;--r0:-4deg;--r1:4deg;filter:drop-shadow(0 0 40px rgba(255,122,26,.5))}',
'.q-t{position:absolute;left:130px;top:300px;width:1180px;font-family:var(--f-display);font-weight:700;font-size:132px;line-height:1.04;letter-spacing:-.02em}',
'.q-t span{display:inline-block;margin-right:.24em}',
'.q-t .hl{background:linear-gradient(100deg,#FF7A1A,#FF4D4D,#FF7A1A);background-size:240% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:pa-grad 6s linear infinite}',
'.pa.go .q-t span{animation:pa-rise .9s cubic-bezier(.22,.8,.3,1) var(--d) both}',
'.q-t span{opacity:0}.pa.static .q-t span{opacity:1}',
'.q-bars{position:absolute;left:130px;bottom:90px;display:flex;gap:18px;align-items:flex-end;height:210px}',
'.q-bars i{width:46px;height:100%;border-radius:12px 12px 4px 4px;background:linear-gradient(0deg,#FF7A1A,#FF4D4D);transform-origin:50% 100%;animation:pa-eq var(--t) ease-in-out infinite alternate;animation-delay:var(--d);opacity:.8}',
'@keyframes pa-eq{from{transform:scaleY(.18)}to{transform:scaleY(var(--h))}}',
'.q-line{position:absolute;left:134px;top:262px;width:240px;height:8px;border-radius:8px;background:linear-gradient(90deg,#FF7A1A,#FF4D4D);transform-origin:0 50%;animation:pa-bar 5s cubic-bezier(.65,0,.35,1) infinite}',

'@media (prefers-reduced-motion:reduce){.pa *{animation-duration:.01s!important;animation-iteration-count:1!important;animation-delay:0s!important}}'
].join('\n');
var st = document.getElementById('part-a-css');
if (!st) { st = document.createElement('style'); st.id = 'part-a-css'; document.head.appendChild(st); }
st.textContent = CSS;

/* ---------------------------------------------------------------- helpers */
function rng(seed) { var s = (seed * 2654435761) >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
function ease(x) { return 1 - Math.pow(1 - x, 3); }
function smooth(a, b, x) { x = Math.max(0, Math.min(1, (x - a) / (b - a))); return x * x * (3 - 2 * x); }
function mk(parent, html) { var d = document.createElement('div'); d.innerHTML = html; var n = d.firstElementChild; parent.appendChild(n); return n; }
function root(el, cls, ctx) { var r = document.createElement('div'); r.className = 'pa ' + cls + (ctx.static ? ' static' : ''); el.appendChild(r); return r; }
function go(r, ctx) { if (!ctx.static) { void r.offsetWidth; r.classList.add('go'); } }
function particles(host, n, seed, cols, o) {
  o = o || {}; var r = rng(seed);
  for (var i = 0; i < n; i++) {
    var d = document.createElement('div'); d.className = 'pa-p';
    d.style.cssText = '--c:' + cols[i % cols.length] + ';--x:' + Math.round(r() * 1920) + 'px;--s:' + (2 + r() * (o.max || 6)).toFixed(1) + 'px;--o:' + (.25 + r() * .5).toFixed(2) +
      ';--t:' + Math.round((o.t || 16) + r() * 18) + 's;--d:' + (-r() * 30).toFixed(1) + 's;--dx:' + Math.round((r() - .5) * 240) + 'px';
    host.appendChild(d);
  }
}
/** run fn(p 0..1) over ms, after delay; auto-cancelled on leave */
function anim(ctx, ms, fn, delay) {
  var id = 0, t0 = 0, dead = false, to;
  function f(now) { if (dead) return; if (!t0) t0 = now; var p = Math.min(1, (now - t0) / ms); fn(p); if (p < 1) id = requestAnimationFrame(f); }
  to = setTimeout(function () { id = requestAnimationFrame(f); }, delay || 0);
  ctx.onLeave(function () { dead = true; clearTimeout(to); cancelAnimationFrame(id); });
}
function addSweep(ctx, id, delay) {
  var host = ctx.view.map[id]; if (!host || ctx.static) return;
  var t = host.querySelector('.in') || host; t.classList.add('pa-hs');
  var s = document.createElement('div'); s.className = 'pa-sweep'; if (delay) s.style.setProperty('--d', delay + 's'); t.appendChild(s);
}
/** count a number inside a base text element up from 0 once it becomes visible */
function countOnShow(ctx, id, has, o) {
  o = o || {};
  var host = ctx.view.map[id]; if (!host || ctx.static) return;
  var span = null;
  Array.prototype.forEach.call(host.querySelectorAll('span'), function (s) { if (!span && s.textContent.indexOf(has) >= 0) span = s; });
  if (!span) return;
  var orig = span.textContent, target = parseFloat(has.replace(/,/g, '')), comma = has.indexOf(',') >= 0, started = false;
  var para = span.closest('p');
  function setv(v) { var s = Math.round(v).toString(); if (comma) s = s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); span.textContent = orig.replace(has, s); }
  setv(0);
  function visible() { return !host.classList.contains('pre') && !(para && para.classList.contains('bp-pre')); }
  function begin() {
    if (started) return; started = true;
    anim(ctx, o.dur || 1900, function (p) { setv(p >= 1 ? target : target * ease(p)); if (p >= 1 && o.pulse) span.classList.add('pa-numpulse'); }, o.delay || 0);
  }
  ctx.onLeave(function () { span.textContent = orig; });
  if (visible()) begin(); else ctx.interval(function () { if (visible()) begin(); }, 120);
}
function chipsFor(r, list) {
  var box = mk(r, '<div class="chips"></div>');
  list.forEach(function (u) {
    box.appendChild(Deck.sourceChip(u));
  });
}

/* ================================================================ SLIDE 1 - opener */
Deck.registerSlide('title', {
  loop: false,
  render: function (el, ctx) {
    var r = root(el, 'pa1' + (ctx.reduced ? ' reduced' : ''), ctx);
    r.innerHTML =
      '<div class="pa1-top"><span class="pa1-kicker">A little less scrolling. A lot more family.</span><span class="pa1-brand">Kahf.co</span></div>' +
      '<h1 class="pa1-title rv" style="--d:.1s"><span>Device Addiction</span> <span class="pa1-cure">Cure &amp; Latest</span> <span class="pa1-accent">Online Threats</span></h1>' +
      '<svg class="pa1-underline" viewBox="0 0 730 40" aria-hidden="true"><path d="M8 14 Q178 37 375 14 T718 16 M92 30 Q329 40 598 27" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round"/></svg>' +
      '<figure class="pa1-photo rv" style="--d:.2s"><span class="pa1-photo-note">Together… but miles apart?</span><div class="pa1-paper"><i class="pa1-tape" aria-hidden="true"></i><div class="pa1-frame"><img src="media/image3.webp" alt="A family sitting together, each looking at a screen"></div><figcaption>Let\'s discuss how not to make our families look like this</figcaption><svg class="pa1-arrow" viewBox="0 0 240 174" aria-hidden="true"><path d="M12 139 C64 171 151 160 154 117 C156 81 101 82 111 115 C122 149 216 114 188 20" fill="none" stroke="#fff4de" stroke-width="13" stroke-linecap="round"/><path d="M12 139 C64 171 151 160 154 117 C156 81 101 82 111 115 C122 149 216 114 188 20" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round"/><path d="M167 39 Q183 28 187 12 Q197 30 211 38 L190 32Z" fill="currentColor" stroke="#fff4de" stroke-width="3" stroke-linejoin="round"/></svg></div></figure>' +
      '<div class="pa1-footer rv" style="--d:.35s"><div class="pa1-who"><div class="n">Omar AL Zabir</div><div class="r">Co-Founder CTO of Kahf.co</div></div>' +
      '<p class="pa1-experience">Ex-Engineering Manager, Child Safety<br>Messenger &amp; Instagram</p>' +
      '<p class="pa1-education">M.Sc. from Oxford<br>MA Islamic Studies</p></div>';
    go(r, ctx);
  }
});

/* ================================================================ SLIDES 8, 9, 10 - numbers count up */
Deck.registerSlide('gallup-teen-hours', { keepBase: true, render: function (el, ctx) { addSweep(ctx, 'e5', 1.5); } });
Deck.registerSlide('hours-per-year', {
  keepBase: true,
  render: function (el, ctx) { addSweep(ctx, 'e5', 1); },
  enter: function (el, ctx) { countOnShow(ctx, 'e2', '1752', { dur: 1000, delay: 0, pulse: false }); }
});
Deck.registerSlide('what-in-1700-hours', {
  keepBase: true,
  render: function (el, ctx) { var t = ctx.view.map.e16; if (t) t.classList.add('pa9-books'); },
  enter: function (el, ctx) { countOnShow(ctx, 'e16', '200', { dur: 1800, pulse: true }); }
});
Deck.registerSlide('hours-tiles', {
  keepBase: true, loop: ['glow', 'pulse', 'beam'],
  enter: function (el, ctx) {
    [['e5', '1200'], ['e6', '1000'], ['e8', '800'], ['e10', '1500'], ['e11', '1000']].forEach(function (a, i) {
      countOnShow(ctx, a[0], a[1], { dur: 1600, delay: 300 + i * 160 });
    });
  }
});

/* ================================================================ SLIDE 21 / 23 - mood */
Deck.registerSlide('mood-swings', {
  keepBase: true,
  render: function (el, ctx) {
    if (ctx.static) return;
    var r = root(el, 'pa21', ctx); r.style.pointerEvents = 'none';
    r.innerHTML = '<div class="dv-glow" style="left:60px;top:300px;width:1000px;height:520px;background:radial-gradient(ellipse,rgba(255,60,50,.28),transparent 70%)"></div><div class="dv-beam" style="--d:0s"></div>';
  }
});
Deck.registerSlide('teen-tantrums', {
  keepBase: true,
  render: function (el, ctx) {
    if (ctx.static) return;
    var r = root(el, 'pa23', ctx); r.style.pointerEvents = 'none';
    r.innerHTML = '<div class="pa-redglow"></div>';
    var h = ctx.view.map.e9218; if (h) h.classList.add('pa-flick');
  }
});

/* ================================================================ SLIDE 24 - clickable signs checklist */
Deck.registerSlide('signs-of-addiction', {
  keepBase: true,
  render: function (el, ctx) {
    var base = ctx.view.map.e4; if (base) base.style.display = 'none';
    var T = [['Withdrawal symptoms', 'Irritability, anxiety, or restlessness when unable to use devices'],
             ['Preoccupation', 'Constant thoughts about device use when not engaged with screens'],
             ['Tolerance', 'Needing increasing amounts of screen time to achieve satisfaction'],
             ['Functional impairment', 'Decline in academic performance, social relationships, or physical health'],
             ['Continued use despite problems', 'Persisting with excessive screen time despite awareness of negative impacts']];
    var r = root(el, 'pa24', ctx);
    var rows = T.map(function (t, i) {
      return '<button class="sg-row pe" data-i="' + i + '" style="top:' + (206 + i * 150) + 'px"><span class="sg-box"><svg viewBox="0 0 48 48"><path d="M10 25l9 9 19-21"/></svg></span><span class="sg-t"><b>' + t[0] + '</b>' + t[1] + '</span></button>';
    }).join('');
    r.innerHTML = rows +
      '<div class="sg-meter pe" id="sgm"><div class="sg-mh"><span>Risk meter &nbsp;<span class="sg-n" style="color:#fff">0/5</span></span><b class="sg-lv">Tick what you see</b></div><div class="sg-track"><div class="sg-cover"></div>' +
      '<i class="sg-seg" style="left:20%"></i><i class="sg-seg" style="left:40%"></i><i class="sg-seg" style="left:60%"></i><i class="sg-seg" style="left:80%"></i></div>' +
      '</div>' +
      '<button class="pa-btn sg-clear" style="display:none">Clear all</button>';
    r.style.pointerEvents = 'none';
    var cover = r.querySelector('.sg-cover'), lv = r.querySelector('.sg-lv'), nn = r.querySelector('.sg-n'), meter = r.querySelector('#sgm'), clear = r.querySelector('.sg-clear');
    var LV = ['Tick what you see', 'Early warning', 'Early warning', 'Serious concern', 'Serious concern', 'Act now'], COL = ['#fff', '#22D3EE', '#2EE59D', '#FFB020', '#FF8A4C', '#FF4D4D'];
    function upd() {
      var n = r.querySelectorAll('.sg-row.on').length;
      cover.style.transform = 'translateX(' + (n * 20) + '%)'; lv.textContent = LV[n]; lv.style.color = COL[n];
      nn.textContent = n + '/5'; meter.classList.toggle('max', n === 5); clear.style.display = n ? '' : 'none';
    }
    r.addEventListener('click', function (e) {
      var b = e.target.closest('.sg-row'), c = e.target.closest('.sg-clear');
      if (b) { e.stopPropagation(); b.classList.toggle('on'); upd(); }
      else if (c) { e.stopPropagation(); r.querySelectorAll('.sg-row.on').forEach(function (x) { x.classList.remove('on'); }); upd(); }
    });
    clear.classList.add('pe'); clear.style.pointerEvents = 'auto';
    Array.prototype.forEach.call(r.querySelectorAll('.sg-row'), function (x) { x.style.pointerEvents = 'auto'; });
    upd();
  }
});

/* ================================================================ SLIDE 27 - split screen */
Deck.registerSlide('device-vs-drug-addiction', {
  loop: false,
  render: function (el, ctx) {
    var r = root(el, 'pa27', ctx);
    function rings(cx, cy, c) { var s = ''; for (var i = 0; i < 4; i++) s += '<div class="sp-ring" style="left:' + cx + 'px;top:' + cy + 'px;--c:' + c + ';--d:' + (-i * 1.5) + 's"></div>'; return s; }
    r.innerHTML =
      '<div class="sp-side sp-L">' + rings(430, 250, '34,211,238') + '<div class="sp-pts"></div><div class="sp-h"><small>Screens</small><span class="sp-hh">Device<br>addiction</span></div></div>' +
      '<div class="sp-side sp-R">' + rings(1500, 830, '255,77,77') + '<div class="sp-pts2"></div><div class="sp-h"><small>Substances</small><span class="sp-hh">Drug<br>Addiction</span></div></div>' +
      '<div class="sp-seam"><svg width="1920" height="1080"><line x1="1120" y1="0" x2="800" y2="1080" stroke="#fff" stroke-width="5" opacity=".9"/><line x1="1120" y1="0" x2="800" y2="1080" stroke="#fff" stroke-width="22" opacity=".18"/></svg><div class="sp-spark"></div></div>' +
      '<div class="sp-vs">vs</div>';
    if (!ctx.static) {
      particles(r.querySelector('.sp-pts'), 22, 27, ['34,211,238', '255,255,255'], { t: 14 });
      particles(r.querySelector('.sp-pts2'), 22, 28, ['255,77,77', '255,170,120'], { t: 14 });
    }
    go(r, ctx);
  }
});

/* ================================================================ SLIDE 28 - dopamine pathways + schematic chart */
(function () {
  var W = 810, X0 = 30;
  function spike(x, amp, rise, decay, base, hh) {
    var top = base - amp * hh;
    return 'L' + (x - rise).toFixed(1) + ',' + base + ' C' + (x - rise * .35).toFixed(1) + ',' + base + ' ' + (x - rise * .3).toFixed(1) + ',' + top.toFixed(1) + ' ' + x + ',' + top.toFixed(1) +
      ' C' + (x + decay * .25).toFixed(1) + ',' + top.toFixed(1) + ' ' + (x + decay * .3).toFixed(1) + ',' + base + ' ' + (x + decay) + ',' + base + ' ';
  }
  function lane(base, hh, spikes, end) {
    var d = 'M' + X0 + ',' + base + ' ';
    spikes.forEach(function (s) { d += spike(X0 + s[0] * W, s[1], s[2], s[3], base, hh); });
    return d + 'L' + (X0 + W) + ',' + (end == null ? base : end);
  }
  // the three points pop out of the study page as speech bubbles (tail on the paper's right edge)
  var CO = [
    { x: 940, y: 548, t: 'Both device use and substance use activate the <b>dopamine reward system</b> in the brain, especially the nucleus accumbens and ventral tegmental area.' },
    { x: 990, y: 718, t: 'When you get a like, a message, or reach a game milestone, <b>your brain releases dopamine</b>, reinforcing the behavior.' },
    { x: 940, y: 850, t: 'This is the same reward loop involved in addictions to substances like <b>nicotine or cocaine</b>.' }
  ];
  function callouts() {
    var h = '<div class="co-t">Dopamine Pathways</div>';
    CO.forEach(function (c, i) { h += '<div class="co" data-i="' + i + '" style="left:' + c.x + 'px;top:' + c.y + 'px"><p style="margin:0">' + c.t + '</p></div>'; });
    return h;
  }
  Deck.registerSlide('dopamine-pathways', {
    keepBase: true,
    render: function (el, ctx) {
      var m = ctx.view.map, pic = m.e5, qr = m.e10242;
      // #28 layout: the study page large on the left, the three points come out of it as callouts (typed by part-c)
      if (m.e4) m.e4.style.display = 'none';
      if (pic) { pic.style.left = '80px'; pic.style.top = '150px'; pic.style.width = '830px'; pic.style.height = '778px'; }
      if (qr) { qr.style.left = '1722px'; qr.style.top = '186px'; qr.style.width = '170px'; qr.style.height = '170px'; }
      var A = lane(250, 138, [[.1, 1, 22, 40], [.28, .95, 22, 40], [.46, 1, 22, 40], [.64, .95, 22, 40], [.82, 1, 22, 40]], 250);
      var B = lane(530, 150, [[.12, .45, 30, 90], [.3, 1.0, 40, 200]], 516);
      var uid = 'dpc' + Math.floor(Math.random() * 1e6);
      var r = root(el, 'pa28', ctx); r.style.pointerEvents = 'none';
      r.innerHTML = '<div class="dp-card">' +
        '<svg viewBox="0 0 870 610"><defs><clipPath id="' + uid + '" class="dp-clip"><rect x="' + X0 + '" y="-40" width="' + (ctx.static ? W : 0) + '" height="700" ' + (ctx.static ? 'style="animation:none"' : '') + '/></clipPath>' +
        '<linearGradient id="' + uid + 'a" x1="0" x2="1"><stop offset="0" stop-color="#22D3EE"/><stop offset="1" stop-color="#2EE59D"/></linearGradient>' +
        '<linearGradient id="' + uid + 'b" x1="0" x2="1"><stop offset="0" stop-color="#FF8A4C"/><stop offset="1" stop-color="#FF4D4D"/></linearGradient></defs>' +
        '<text x="30" y="48" fill="#F4F1EA" font-size="29" font-weight="700" font-family="Inter,sans-serif">A like, a message or a game milestone</text>' +
        '<text x="30" y="318" fill="#F4F1EA" font-size="29" font-weight="700" font-family="Inter,sans-serif">A substance (nicotine, cocaine)</text>' +
        '<line x1="' + X0 + '" y1="250" x2="' + (X0 + W) + '" y2="250" stroke="rgba(255,255,255,.2)" stroke-dasharray="6 8" stroke-width="2"/>' +
        '<line x1="' + X0 + '" y1="530" x2="' + (X0 + W) + '" y2="530" stroke="rgba(255,255,255,.2)" stroke-dasharray="6 8" stroke-width="2"/>' +
        '<text x="' + (X0 + W) + '" y="272" text-anchor="end" fill="#9AA7AD" font-size="20" font-family="Inter,sans-serif">baseline</text>' +
        '<text x="' + (X0 + W) + '" y="554" text-anchor="end" fill="#9AA7AD" font-size="20" font-family="Inter,sans-serif">baseline</text>' +
        '<text x="30" y="82" fill="#9AA7AD" font-size="22" font-family="Inter,sans-serif">dopamine release  &#8593;   (small, repeated hits)</text>' +
        '<text x="30" y="352" fill="#9AA7AD" font-size="22" font-family="Inter,sans-serif">dopamine release  &#8593;   (one big hit)</text>' +
        '<g clip-path="url(#' + uid + ')">' +
          '<path d="' + A + '" fill="none" stroke="url(#' + uid + 'a)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 10px rgba(34,211,238,.8))"/>' +
          '<path d="' + B + '" fill="none" stroke="url(#' + uid + 'b)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 10px rgba(255,77,77,.8))"/></g>' +
        '<g class="dp-now" style="' + (ctx.static ? 'display:none' : '') + '"><line x1="' + X0 + '" y1="95" x2="' + X0 + '" y2="570" stroke="#fff" stroke-width="3" opacity=".7"/><circle cx="' + X0 + '" cy="95" r="7" fill="#fff"/></g>' +
        '<text x="30" y="590" fill="#9AA7AD" font-size="21" font-family="Inter,sans-serif">time &#8594;</text></svg>' +
        '<div class="dp-ill" style="left:130px;text-align:right;right:24px">Illustrative schematic, not measured data</div></div>' + callouts();
    }
  });
})();

/* ================================================================ SLIDES 31 / 36 - bold animated dividers */
function divider(spec) {
  return {
    keepBase: true,
    render: function (el, ctx) {
      if (ctx.static) return;
      var r = root(el, 'pa-dv', ctx); r.style.pointerEvents = 'none';
      r.style.setProperty('--c1', spec.c1); r.style.setProperty('--c2', spec.c2);
      r.innerHTML = '<div class="dv-vig"></div><div class="dv-glow" style="' + spec.glow + '"></div><div class="dv-beam"></div><div class="dv-bar"></div>';
    }
  };
}
Deck.registerSlide('why-addictive', divider({ c1: '#FF4D4D', c2: '#FFB020', glow: 'left:70px;top:40px;width:1220px;height:420px;background:radial-gradient(ellipse,rgba(255,70,60,.30),transparent 70%)' }));
Deck.registerSlide('games-made-addictive', divider({ c1: '#FF4D4D', c2: '#FFB020', glow: 'left:70px;top:40px;width:1220px;height:420px;background:radial-gradient(ellipse,rgba(255,60,60,.30),transparent 70%)' }));

/* ================================================================ SLIDE 38 - Which games are most popular nowadays? */
Deck.registerSlide('popular-games', {
  loop: false,
  render: function (el, ctx) {
    var r = root(el, 'pa38', ctx);
    var words = ['Which', 'games', 'are', 'most', 'popular', 'nowadays?'], t = '';
    words.forEach(function (w, i) { t += '<span' + (w === 'popular' ? ' class="hl"' : '') + ' style="--d:' + (.25 + i * .14).toFixed(2) + 's">' + w + '</span>'; });
    var bars = '', rr = rng(38);
    for (var i = 0; i < 16; i++) bars += '<i style="--h:' + (.35 + rr() * .65).toFixed(2) + ';--t:' + (1.6 + rr() * 2.2).toFixed(1) + 's;--d:' + (-rr() * 3).toFixed(1) + 's"></i>';
    r.innerHTML = '<div class="q-q">?</div><div class="q-line"></div><div class="q-t">' + t + '</div><div class="q-bars">' + bars + '</div><div class="q-pts"></div>';
    if (!ctx.static) particles(r.querySelector('.q-pts'), 26, 38, ['255,122,26', '255,77,77'], { t: 15 });
    go(r, ctx);
  }
});

})();
