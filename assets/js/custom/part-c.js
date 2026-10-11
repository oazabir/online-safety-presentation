/* ============================================================================
   part-c.js - revision pass (loaded after part-a / part-b, before boot.js).
   Slide numbers in comments are the on-screen numbers before this revision;
   keys (#n) are the original slide numbers used by the engine.
   Sections: 0 helpers/css . 1 removals + data patches . 2 typewriter slides (#28, #57)
             3 game headlines (#39-#43) . 4 Lost Screen Memorial scroll (#45) . 5 single picture (#55)
             6 Meet Susan narrative (#58) . 7 auto-advance (#59) . 8 dimming (#56, #64) . 9 toggles (#71)
             10 website screenshots (#88, #92) . 11 Kahf Kids hero (#97) . 12 chart line reveal (#106-109)
             13 closing video (#112) . 14 NEW WhatsApp privacy (after #97)
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
'.pc-lsm .bot{position:absolute;left:0;right:0;bottom:0;height:200px;background:linear-gradient(0deg,rgba(18,18,18,.96) 0%,rgba(18,18,18,.8) 45%,rgba(18,18,18,0));pointer-events:none}',
'.pc-lsm .url{position:absolute;left:0;right:0;bottom:44px;text-align:center;font:500 54px/1 var(--f-mono);color:#fff;letter-spacing:.01em;text-shadow:0 4px 30px rgba(0,0,0,.8)}',

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
/* #105 checklist page + QR */
'.pc-ck{position:absolute;inset:0}',
'.pc-ck .ck-qrp{position:absolute;left:1440px;top:0;width:440px;height:1080px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}',
'.pc-ck .ck-ttl{font:700 46px/1.05 var(--f-display);color:#F4F1EA;letter-spacing:-.01em;margin:0 0 10px}',
'.pc-ck .ck-ttl b{color:#F2C14E;font-weight:700}',
'.pc-ck .ck-scan{display:flex;align-items:center;gap:12px;font:700 22px/1 var(--f-body);letter-spacing:.14em;text-transform:uppercase;color:#9fe3bd;margin:0 0 30px}',
'.pc-ck .ck-scan svg{width:30px;height:30px}',
'.pc-ck .ck-qc{position:relative;width:380px;height:380px;padding:26px;box-sizing:border-box;border-radius:34px;background:#fff;box-shadow:0 0 0 6px rgba(242,193,78,.9),0 30px 70px -18px rgba(0,0,0,.8),0 0 90px rgba(242,193,78,.35)}',
'.pc-ck .ck-qc img{display:block;width:100%;height:100%;image-rendering:pixelated}',
'.pc-ck .ck-qc .ck-halo{position:absolute;inset:-6px;border-radius:38px;box-shadow:0 0 0 4px rgba(242,193,78,.8);opacity:0;pointer-events:none}',
'.pc-ck .ck-qc .ck-ln{position:absolute;left:18px;right:18px;top:26px;height:4px;border-radius:4px;background:#2EE59D;box-shadow:0 0 18px 4px rgba(46,229,157,.7);opacity:0;pointer-events:none}',
'.pc-ck .ck-link{margin-top:34px;padding:14px 30px;border-radius:999px;font:800 40px/1 var(--f-body);letter-spacing:-.01em;color:#0b2a1b;background:linear-gradient(180deg,#ffd978,#F2C14E);box-shadow:0 14px 34px -10px rgba(242,193,78,.6)}',
'.pc-ck .ck-hint{margin-top:18px;font:500 21px/1.35 var(--f-body);color:#b9c7bf}',
'.pc-ck.go .ck-qc .ck-halo{animation:pc-ck-halo 2.4s ease-out 1.2s infinite}',
'.pc-ck.go .ck-qc .ck-ln{animation:pc-ck-ln 2.4s ease-in-out 1.2s infinite}',
'.pc-ck.go .ck-qrp{animation:pc-ck-in .9s cubic-bezier(.3,1.4,.5,1) .5s both}',
'@keyframes pc-ck-halo{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.16)}}',
'@keyframes pc-ck-ln{0%{opacity:0;transform:translateY(0)}10%{opacity:1}50%{opacity:1;transform:translateY(322px)}60%,100%{opacity:0;transform:translateY(322px)}}',
'@keyframes pc-ck-in{from{opacity:0;transform:translateX(60px) scale(.9)}to{opacity:1;transform:none}}',
'@media (prefers-reduced-motion:reduce){.pc-ck.go .ck-qc .ck-halo,.pc-ck.go .ck-qc .ck-ln,.pc-ck.go .ck-qrp{animation:none}}',
'.pc-wglow{position:absolute;border-radius:50%;background:radial-gradient(closest-side,rgba(var(--wc),.40),transparent);filter:blur(20px);pointer-events:none;animation:pc-breathe 6s ease-in-out infinite}',
'@keyframes pc-breathe{0%,100%{opacity:.6}50%{opacity:1}}',
'.pc-rise{animation:pc-rise 1.1s cubic-bezier(.2,.8,.25,1) .1s both}',
'@keyframes pc-rise{from{opacity:0;transform:translateY(60px) scale(.96)}to{opacity:1;transform:none}}',
'.pc-bob{animation:pc-bob 9s ease-in-out 1.2s infinite alternate}',
'@keyframes pc-bob{from{transform:translateY(0)}to{transform:translateY(-10px)}}',

/* Kahf Kids hero (kahfkids.com, rebuilt in the site's own css px, scaled x1.4) */
"@font-face{font-family:'KK Nunito';src:url(assets/fonts/nunito-latin.woff2) format('woff2');font-weight:400 900;font-display:block}",
"@font-face{font-family:'KK Baloo';src:url(assets/fonts/baloo-da-2-latin.woff2) format('woff2');font-weight:500 800;font-display:block}",
'.pc-kk{position:absolute;inset:0;overflow:hidden;background:#f6f4ff;color:#211C37;font-family:"KK Nunito",system-ui,sans-serif}',
'.pc-kk .kk-stg{position:absolute;left:0;top:0;width:1371.43px;height:771.43px;transform:scale(1.4);transform-origin:0 0;display:flex;align-items:center}',
'.pc-kk .kk-hero{position:relative;box-sizing:border-box;width:1240px;margin:0 auto;padding:0 32px;display:grid;grid-template-columns:1.3fr .7fr;gap:40px;align-items:start}',
'.pc-kk .kk-blob{position:absolute;border-radius:50%;pointer-events:none}',
'.pc-kk .kk-art{grid-column:2;grid-row:1;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center}',
'.pc-kk .kk-frame{position:relative;width:100%;max-width:290px}',
'.pc-kk .kk-glow{position:absolute;inset:-4% 8%;background:radial-gradient(58% 52% at 50% 45%,rgba(90,99,216,.30),rgba(41,182,234,.14) 46%,transparent 72%);z-index:0;pointer-events:none}',
'.pc-kk .kk-scr{position:relative;z-index:1;overflow:hidden;aspect-ratio:1394/2756}',
'.pc-kk .kk-trk{position:absolute;inset:0;display:flex;height:100%;transition:transform .55s cubic-bezier(.4,0,.2,1)}',
'.pc-kk .kk-trk div{flex:0 0 100%;width:100%;height:100%}',
'.pc-kk .kk-trk img{width:100%;height:100%;object-fit:contain;display:block}',
'.pc-kk .kk-arw{position:absolute;top:50%;transform:translateY(-50%);width:40px;height:40px;border-radius:50%;border:1px solid rgba(33,28,55,.06);cursor:pointer;background:rgba(255,255,255,.85);backdrop-filter:blur(8px);box-shadow:0 10px 24px rgba(33,28,55,.16);color:#5A63D8;font:21px/1 "KK Nunito",sans-serif;display:flex;align-items:center;justify-content:center;z-index:6;padding:0}',
'.pc-kk .kk-dots{display:flex;justify-content:center;gap:7px;margin-top:15px}',
'.pc-kk .kk-dots button{width:24px;height:24px;margin:0 -7.5px;display:flex;align-items:center;justify-content:center;border:none;background:transparent;cursor:pointer;padding:0}',
'.pc-kk .kk-dots span{display:block;width:9px;height:9px;border-radius:999px;transition:.4s;background:rgba(33,28,55,.18)}',
'.pc-kk .kk-dots .kk-on span{width:26px;background:#5A63D8}',
'.pc-kk .kk-copy{grid-column:1;grid-row:1;position:relative;max-width:720px}',
'.pc-kk .kk-brand{display:flex;align-items:center;gap:14px;margin:0 0 20px}',
'.pc-kk .kk-brand img{width:58px;height:58px;border-radius:15px;background:#fff;box-shadow:0 8px 22px rgba(90,99,216,.22),0 0 0 1px rgba(33,28,55,.06);display:block}',
'.pc-kk .kk-brand b{display:block;font:700 30px/1 "KK Baloo",sans-serif;color:#211C37;letter-spacing:-.3px}',
'.pc-kk .kk-brand small{display:block;margin-top:5px;font-weight:700;font-size:12px;letter-spacing:.6px;text-transform:uppercase;color:#5A63D8}',
'.pc-kk h1{font:600 54px/1.04 "KK Baloo",sans-serif;letter-spacing:-1.2px;margin:0 0 18px;max-width:600px;color:#211C37}',
'.pc-kk h1 span{color:#EF4136}',
'.pc-kk .kk-sub{font-size:19px;line-height:1.5;color:#5b5470;font-weight:500;margin:0 0 26px;max-width:560px}',
'.pc-kk .kk-stats{display:grid;grid-template-columns:repeat(3,auto);justify-content:start;align-items:end;gap:20px 44px;margin:4px 0 30px}',
'.pc-kk .kk-stat{border-left:5px solid;padding-left:20px}',
'.pc-kk .kk-num{font:700 58px/.95 "KK Baloo",sans-serif;color:#211C37;letter-spacing:-1px}',
'.pc-kk .kk-lbl{font-weight:800;font-size:15px;letter-spacing:.6px;text-transform:uppercase;color:#6f6888;margin-top:8px}',
'.pc-kk .kk-stars{color:#FFB400;font-size:20px;letter-spacing:1px;margin-bottom:4px}',
'.pc-kk .kk-cta{display:flex;align-items:center;gap:10px}',
'.pc-kk .kk-cta a{text-decoration:none;display:inline-flex;align-items:center;gap:9px;background:#211C37;color:#fff;padding:11px 16px;border-radius:14px;white-space:nowrap;box-shadow:0 10px 24px rgba(33,28,55,.2)}',
'.pc-kk .kk-cta a>span{line-height:1.05;text-align:left}',
'.pc-kk .kk-cta small{display:block;font-size:10px;opacity:.75;font-weight:700}',
'.pc-kk .kk-cta b{font:500 18px "KK Baloo",sans-serif}',
'.pc-kk .kk-trial{margin-top:14px;color:#6a6385;font-weight:700;font-size:14.5px}',

/* chart line reveal */
'.pc-lines{position:absolute;left:0;top:0;width:100%;height:100%;display:block;clip-path:inset(0 100% 0 0)}',
'.pc-lines.full{clip-path:none}',

/* closing video */
'.pc-close{position:absolute;inset:0;background:#0d3b2a;overflow:hidden}',
'.pc-close video,.pc-close img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',
/* kahf.co call-out under the stats (clear of the moving phones): pops in, gold shine runs across the text, halo pulses */
'.pc-url{position:absolute;left:1152px;top:1004px;transform:translateY(-50%);transform-origin:left center;z-index:3}',
'.pc-url .pill{position:relative;display:flex;align-items:center;gap:18px;padding:12px 38px 12px 14px;border-radius:999px;background:linear-gradient(180deg,rgba(18,58,38,.92),rgba(9,38,24,.92));box-shadow:inset 0 0 0 2px rgba(242,193,78,.75),0 0 0 8px rgba(242,193,78,.10),0 24px 60px -12px rgba(0,0,0,.7),0 0 70px rgba(242,193,78,.28)}',
'.pc-url .ic{width:62px;height:62px;border-radius:50%;flex:none;display:grid;place-items:center;background:radial-gradient(circle at 35% 30%,#ffe7a3,#F2C14E 55%,#c9902a);box-shadow:0 6px 18px rgba(242,193,78,.45)}',
'.pc-url .ic svg{width:36px;height:36px}',
'.pc-url .t{font:800 66px/1 var(--f-body);letter-spacing:-.02em;background:linear-gradient(100deg,#F2C14E 0%,#F2C14E 38%,#fff6d8 50%,#F2C14E 62%,#F2C14E 100%);background-size:250% 100%;background-position:100% 0;-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 4px 14px rgba(0,0,0,.45))}',
'.pc-url .t i{font-style:normal;color:#fff;-webkit-text-fill-color:#F4F1EA}',
'.pc-url .halo{position:absolute;inset:-6px;border-radius:999px;box-shadow:0 0 0 3px rgba(242,193,78,.7);opacity:0;pointer-events:none}',
'.pc-url.go{animation:pc-url-in .9s cubic-bezier(.3,1.5,.5,1) both}',
'.pc-url.go .t{animation:pc-url-shine 3.6s ease-in-out 1s infinite}',
'.pc-url.go .halo{animation:pc-url-halo 2.4s ease-out 1.1s infinite}',
'.pc-url.go .ic{animation:pc-url-bob 2.4s ease-in-out 1.1s infinite}',
'@keyframes pc-url-in{from{opacity:0;transform:translateY(-50%) scale(.4)}to{opacity:1;transform:translateY(-50%) scale(1)}}',
'@keyframes pc-url-shine{0%{background-position:100% 0}55%,100%{background-position:0% 0}}',
'@keyframes pc-url-halo{0%{opacity:.9;transform:scale(1)}100%{opacity:0;transform:scale(1.18,1.6)}}',
'@keyframes pc-url-bob{0%,100%{transform:scale(1)}12%{transform:scale(1.12)}24%{transform:scale(1)}}',
'@media (prefers-reduced-motion:reduce){.pc-url.go,.pc-url.go .t,.pc-url.go .halo,.pc-url.go .ic{animation:none}}',

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

/* #51 "Don't drug your kids with device" */
'.pc51{position:absolute;left:930px;top:50%;width:900px;transform:translateY(-50%);color:#F4F1EA;text-shadow:0 4px 30px rgba(0,0,0,.6)}',
'.pc51 .ln{display:block;white-space:nowrap}',
'.pc51 .a{font:italic 500 112px/1 var(--f-display);color:#D2CFC7;letter-spacing:-.01em}',
'.pc51 .b{position:relative;display:inline-block;margin:-14px 0 -22px -8px;padding:0 .1em .16em .04em;font:800 160px/1.05 var(--f-display);letter-spacing:-.045em;text-shadow:none;background:linear-gradient(180deg,#ffb3ba 0%,#ff4d5e 45%,#e01a35 100%);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 8px 40px rgba(255,59,78,.55))}',
'.pc51 .halo{position:absolute;left:46%;top:52%;width:400px;height:400px;margin:-200px 0 0 -200px;border-radius:50%;background:radial-gradient(circle,rgba(255,59,78,.42) 0%,rgba(255,59,78,.12) 40%,rgba(255,59,78,0) 68%);pointer-events:none;opacity:0}',
'.pc51 .cap{position:absolute;left:410px;top:96px;width:110px;height:110px;transform:rotate(-32deg);filter:drop-shadow(0 10px 26px rgba(0,0,0,.6))}',
'.pc51 .c{font:600 112px/1.05 var(--f-display);letter-spacing:-.015em}',
'.pc51 .d{margin-top:18px;font:500 92px/1 var(--f-display);color:#D2CFC7;letter-spacing:-.01em}',
'.pc51 .scr{position:relative;display:inline-block;margin-left:14px;padding:10px 30px 18px;border-radius:22px;color:#fff;font-weight:700;background:linear-gradient(180deg,rgba(34,211,238,.20),rgba(34,211,238,.06));box-shadow:inset 0 0 0 4px rgba(34,211,238,.85),0 0 60px rgba(34,211,238,.45),inset 0 0 40px rgba(34,211,238,.25)}',
'.pc51 .scr::after{content:"";position:absolute;left:50%;bottom:-26px;width:90px;height:10px;margin-left:-45px;border-radius:6px;background:rgba(34,211,238,.75);box-shadow:0 0 20px rgba(34,211,238,.6)}',
'.pc51.go .a{animation:pc-kin .7s cubic-bezier(.2,.9,.25,1) .15s both}',
'.pc51.go .b{animation:pc51-slam .65s cubic-bezier(.2,1.25,.35,1) .65s both}',
'.pc51.go .halo{animation:pc51-ring 1.4s ease-out .8s both}',
'.pc51.go .cap{animation:pc51-pill .9s cubic-bezier(.3,1.4,.4,1) 1.15s both}',
'.pc51.go .c{animation:pc-lin .7s cubic-bezier(.2,.9,.25,1) 1.55s both}',
'.pc51.go .d{animation:pc-lin .7s cubic-bezier(.2,.9,.25,1) 1.85s both}',
'.pc51.go .scr{animation:pc51-on 1s steps(1) 2.4s both,pc51-glow 3.2s ease-in-out 3.4s infinite}',
'.pc51.static .halo{opacity:.7}',
'@keyframes pc51-slam{0%{opacity:0;transform:scale(1.9)}55%{opacity:1}100%{opacity:1;transform:scale(1)}}',
'@keyframes pc51-ring{0%{opacity:0;transform:scale(.3)}30%{opacity:1}100%{opacity:.7;transform:scale(1)}}',
'@keyframes pc51-pill{0%{opacity:0;transform:translate(120px,-260px) rotate(-200deg)}60%{opacity:1}100%{opacity:1;transform:rotate(-32deg)}}',
'@keyframes pc51-on{0%{box-shadow:inset 0 0 0 4px rgba(34,211,238,.15);background:transparent}20%{box-shadow:inset 0 0 0 4px rgba(34,211,238,.85),0 0 60px rgba(34,211,238,.45)}30%{box-shadow:inset 0 0 0 4px rgba(34,211,238,.2)}45%{box-shadow:inset 0 0 0 4px rgba(34,211,238,.85),0 0 60px rgba(34,211,238,.45),inset 0 0 40px rgba(34,211,238,.25);background:linear-gradient(180deg,rgba(34,211,238,.20),rgba(34,211,238,.06))}}',
'@keyframes pc51-glow{0%,100%{opacity:1}50%{opacity:.82}}',

'@media (prefers-reduced-motion:reduce){.pc-hl *,.pc-q *,.p58 *,.pc51 *{animation:none!important;transition:none!important}}'
].join('\n');
(function () { if (document.getElementById('part-c-css')) return; var st = document.createElement('style'); st.id = 'part-c-css'; st.textContent = CSS; document.head.appendChild(st); })();

/* direction of the last navigation: arriving with Back shows slides fully built, so skip intro animations */
var lastPos = null, cameBack = false;
Deck.on('show', function (s) { cameBack = lastPos !== null && s.pos < lastPos; lastPos = s.pos; });

/* per-slide event hooks for slides whose spec is owned by part-a/part-b (registerSlide would replace their handlers) */
var hooks = {};
function hook(n, o) { (hooks[n] = hooks[n] || []).push(o); }
function runHooks(key, name, a, b) { (hooks[key] || []).forEach(function (k) { if (k[name]) k[name](a, b); }); }
Deck.on('show', function (s, v) { runHooks(s.key, 'show', v); });
Deck.on('enter', function (s, v) { runHooks(s.key, 'enter', v); });
Deck.on('step', function (i, v) { if (v && v.slide) runHooks(v.slide.key, 'step', v, i); });

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
// every video in the deck plays at 10% volume (muted ones stay muted)
D.slides.forEach(function (s) { s.els.forEach(function (e) { if (e.k === 'video') e.vol = 0.1; }); });
/* #8: reveal the 5 equation lines faster so the 1752 count finishes within ~2 s of arriving (count timing in part-a) */
D.slides.forEach(function (s) {
  if (s.orig !== 8 || !s.steps[0]) return;
  s.steps[0].fx.forEach(function (f, i) { f.t = i * 180; f.d = 350; });
});

/* slide #57: one strictly sequential timeline (ms from the click). The intro types out over 0-1.9 s, then the
   messenger phone (section 2), on screen from the moment the slide appears and covering the girl's forehead and hair, plays: Luke typing "..." -> "Hey, how are you?" ->
   Kayleigh types her reply in the composer and sends it -> the two story lines type out while the chat floods -> source.
   The original "Luke:/Kayleigh:" text boxes and cursor blocks are dropped; the phone replaces them. */
var T57 = { luke: 2200, lukeMsg: 3400, kay: 4200, kayMs: 1100, send: 5600, story: 6500, storyMs: 5000 };
D.slides.forEach(function (s) {
  if (s.orig !== 57 || !s.steps || !s.steps[1]) return;
  var chatIds = ['e4', 'e6', 'e7', 'e8', 'e9', 'e10'];
  s.els = s.els.filter(function (e) { return chatIds.indexOf(e.id) < 0; });
  s.steps[1].fx = [
    { ids: ['e5'], t: 0, d: 500, do: 'in', a: 'wipe', dir: 'l' },
    { ids: ['e11'], t: T57.story, d: 1, do: 'in', a: 'appear' },
    { ids: ['e12'], t: T57.story, d: 1, do: 'in', a: 'appear' },
    { ids: ['e14'], t: T57.story + T57.storyMs + 400, d: 500, do: 'in', a: 'fly', dir: 'b' }
  ];
  s.els.forEach(function (e) {             // text column ends well left of the phone (x 1300), which covers the girl's forehead and hair
    if (e.id === 'e5') e.w = 41.5;
    if (e.id !== 'e11' && e.id !== 'e12') return;
    e.w = 41.5; e.paras.forEach(function (p) { p.runs.forEach(function (r) { r.sz = 40; }); });
    e.y = e.id === 'e11' ? 37 : 50;
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
// #58 (slide 44): new narrative builds replace the paragraph wipes
if (byN[58]) byN[58].steps = [{ auto: 1, fx: [{ ids: ['e4'], t: 0, d: 0, do: 'play' }] }];

/* ---------------------------------------------------------------- 2. typewriter slides */
/* #28 slide 20 - the three points pop out of the study page as speech bubbles, one by one, and type themselves out */
Deck.registerSlide(28, {
  enter: function (el, ctx) {
    var r = el.querySelector('.pa28'); if (!r) return;
    var cos = Array.prototype.slice.call(r.querySelectorAll('.co'));
    if (cameBack || ctx.reduced) { cos.forEach(function (c) { c.classList.add('on'); }); return; }
    var alive = true; ctx.onLeave(function () { alive = false; });
    var i = 0, prev = null;
    (function next() {
      if (!alive || i >= cos.length) return;
      var co = cos[i++], c = twPrep(co.querySelector('p')); twSet(c, 0); co.classList.add('tw-bar', 'on');
      if (prev) prev.forEach(function (x) { x.classList.remove('cur'); }); prev = c;
      ctx.timeout(function () {
        twRun(c, Math.max(250, c.length / 70 * 1000), function () { return alive; }, function () { ctx.timeout(next, 420); });
      }, 450);
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
      twRun(chars, T57.storyMs, function () { return Deck.view === v && !v.deactivated && v.k >= 1; });
    }, T57.story));
  }
});

/* #57 messenger phone: generic dark-mode chat app (no brand marks), always on screen over the girl's face on the right.
   The chat plays on the click step (T57), resets on Back to step 0, and is drawn finished in thumbnails / when arriving via Back. */
(function () {
  var css = [
    '.pc57{position:absolute;left:1300px;top:64px;width:450px;height:920px;border-radius:66px;background:#141418;padding:11px;z-index:4;pointer-events:none;',
    '  box-shadow:0 0 0 2px #3a3a42,0 40px 90px rgba(0,0,0,.65),0 0 140px rgba(10,124,255,.22)}',
    '.pc57 .scr{position:relative;width:100%;height:100%;border-radius:56px;background:#000;overflow:hidden;display:flex;flex-direction:column;font-family:var(--f-body);color:#fff}',
    '.pc57 .isl{position:absolute;left:50%;top:12px;width:118px;height:34px;margin-left:-59px;border-radius:20px;background:#000;box-shadow:0 0 0 1px #111;z-index:3}',
    '.pc57 .sb{height:58px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:6px 34px 0 42px;font-size:19px;font-weight:600}',
    '.pc57 .sb svg{height:15px;margin-left:6px;fill:#fff}',
    '.pc57 .hd{flex:none;display:flex;align-items:center;gap:12px;padding:8px 18px 14px 12px;border-bottom:1px solid rgba(255,255,255,.08)}',
    '.pc57 .hd .bk{width:26px;height:26px;stroke:#a970ff;fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
    '.pc57 .av{position:relative;flex:none;width:46px;height:46px;border-radius:50%;background:linear-gradient(140deg,#5b6b7d,#2c3440);display:flex;align-items:center;justify-content:center;font-weight:700;font-size:21px;color:#dfe6ee}',
    '.pc57 .av i{position:absolute;right:-1px;bottom:-1px;width:14px;height:14px;border-radius:50%;background:#31d158;box-shadow:0 0 0 3px #000}',
    '.pc57 .nm{flex:1;line-height:1.15}.pc57 .nm b{display:block;font-size:22px}.pc57 .nm span{font-size:15px;color:#9a9aa2}',
    '.pc57 .hd .ac{width:27px;height:27px;fill:#a970ff;margin-left:14px}',
    '.pc57 .msgs{position:relative;flex:1;min-height:0;display:flex;flex-direction:column;justify-content:flex-end;gap:7px;padding:16px 14px 12px;overflow:hidden}',
    '.pc57 .chip{position:absolute;left:50%;top:14px;transform:translateX(-50%);padding:6px 16px;border-radius:20px;background:rgba(40,40,46,.92);font-size:16px;font-weight:600;color:#c9c9d0;white-space:nowrap;opacity:0;transition:opacity .3s;z-index:2}',
    '.pc57 .chip.on{opacity:1}.pc57 .chip b{color:#fff;font-variant-numeric:tabular-nums}',
    '.pc57 .row{display:flex;align-items:flex-end;gap:8px;flex:none}',
    '.pc57 .row.out{justify-content:flex-end}',
    '.pc57 .row .mini{flex:none;width:30px;height:30px;border-radius:50%;background:linear-gradient(140deg,#5b6b7d,#2c3440);font-size:14px;font-weight:700;color:#dfe6ee;display:flex;align-items:center;justify-content:center}',
    '.pc57 .bb{max-width:76%;padding:12px 18px;border-radius:24px;font-size:25px;line-height:1.25;animation:pc57-pop .38s var(--ease) both}',
    '.pc57 .in .bb{background:#303036;border-bottom-left-radius:8px;transform-origin:0 100%}',
    '.pc57 .out .bb{background:linear-gradient(170deg,#9b3cfb,#0a7cff);border-bottom-right-radius:8px;transform-origin:100% 100%}',
    '.pc57 .bb.typ{display:flex;gap:6px;padding:17px 18px}',
    '.pc57 .bb.typ i{width:10px;height:10px;border-radius:50%;background:#9a9aa2;animation:pbdot 1.15s ease-in-out infinite}',
    '.pc57 .bb.typ i:nth-child(2){animation-delay:.18s}.pc57 .bb.typ i:nth-child(3){animation-delay:.36s}',
    '.pc57 .bb.fz{padding:13px 16px;display:flex;flex-direction:column;gap:7px;animation-duration:.22s}',
    '.pc57 .bb.fz s{display:block;height:11px;border-radius:6px;background:rgba(255,255,255,.34);filter:blur(1.5px)}',
    '.pc57 .cmp{flex:none;display:flex;align-items:center;gap:12px;padding:10px 16px 30px}',
    '.pc57 .cmp svg{flex:none;width:28px;height:28px;fill:#a970ff}',
    '.pc57 .fld{flex:1;min-height:46px;border-radius:24px;background:#242428;display:flex;align-items:center;padding:6px 18px;font-size:22px;overflow:hidden;white-space:nowrap}',
    '.pc57 .fld .ph{color:#8e8e96}.pc57 .fld.typing .ph{display:none}',
    '.pc57 .fld .tx:not(:empty)::after{content:"";display:inline-block;width:2px;height:24px;margin-left:2px;vertical-align:-4px;background:#a970ff;animation:pc-blink 1s steps(1) infinite}',
    '.pc57 .snd{opacity:.45;transition:opacity .2s,transform .2s}.pc57 .snd.on{opacity:1;transform:scale(1.12)}',
    '@keyframes pc57-pop{0%{opacity:0;transform:scale(.6)}100%{opacity:1;transform:none}}',
    '.pc57.static,.pc57.static *{transition:none!important;animation:none!important}',
    '@media (prefers-reduced-motion:reduce){.pc57,.pc57 *{transition:none!important;animation:none!important}}'
  ].join('\n');
  if (!document.getElementById('pc57-css')) { var st = document.createElement('style'); st.id = 'pc57-css'; st.textContent = css; document.head.appendChild(st); }

  var ICON = {
    sig: '<svg viewBox="0 0 34 20"><rect x="0" y="13" width="6" height="7" rx="1.5"/><rect x="9" y="9" width="6" height="11" rx="1.5"/><rect x="18" y="4.5" width="6" height="15.5" rx="1.5"/><rect x="27" y="0" width="6" height="20" rx="1.5"/></svg>',
    bat: '<svg viewBox="0 0 44 20"><rect x="1" y="1" width="37" height="18" rx="5" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2"/><rect x="4" y="4" width="22" height="12" rx="2.5"/><rect x="40" y="7" width="3" height="6" rx="1.5" fill-opacity=".5"/></svg>',
    back: '<svg class="bk" viewBox="0 0 24 24"><path d="M15 4 7 12l8 8"/></svg>',
    call: '<svg class="ac" viewBox="0 0 24 24"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z"/></svg>',
    video: '<svg class="ac" viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="3"/><path d="M17 10.5 22 7v10l-5-3.5z"/></svg>',
    plus: '<svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm1 11v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>',
    cam: '<svg viewBox="0 0 24 24"><path d="M9 4 7.2 6H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-3.2L15 4zm3 4.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9z"/></svg>',
    send: '<svg class="snd" viewBox="0 0 24 24"><path d="M3 20.5 22 12 3 3.5 3 10l13 2-13 2z"/></svg>'
  };
  var LUKE = 'Hey, how are you?', KAY = 'Fine – who are you?', FLOOD = 7, TOTAL = 2600;

  function build(el) {
    var p = h('div', 'pc57', el,
      '<div class="scr"><div class="isl"></div>' +
      '<div class="sb"><span>23:47</span><span>' + ICON.sig + ICON.bat + '</span></div>' +
      '<div class="hd">' + ICON.back + '<div class="av">L<i></i></div><div class="nm"><b>Luke</b><span>Active now</span></div>' + ICON.call + ICON.video + '</div>' +
      '<div class="msgs"><div class="chip"></div></div>' +
      '<div class="cmp">' + ICON.plus + ICON.cam + '<div class="fld"><span class="tx"></span><span class="ph">Aa</span></div>' + ICON.send + '</div></div>');
    var q = function (s) { return p.querySelector(s); };
    return { root: p, msgs: q('.msgs'), chip: q('.chip'), fld: q('.fld'), tx: q('.tx'), snd: q('.snd') };
  }
  function row(P, out, html, cls) {
    var r = h('div', 'row ' + (out ? 'out' : 'in'), P.msgs, (out ? '' : '<span class="mini">L</span>') + '<div class="bb ' + (cls || '') + '"></div>');
    var b = r.lastChild; if (html != null) b.textContent = html; return r;
  }
  function floodRow(P, i) {                  // text-less blurred bubble: volume, not content
    var rnd = Math.sin(i * 91.7) * 43758.5453, f = rnd - Math.floor(rnd), lines = f > .7 ? 2 : 1;
    var r = row(P, i % 3 !== 0, null, 'fz'), b = r.querySelector('.bb'), w = 120 + Math.round(f * 170);
    for (var l = 0; l < lines; l++) h('s', '', b).style.width = (l ? Math.round(w * .6) : w) + 'px';
  }
  function chip(P, n) { P.chip.innerHTML = '<b>' + n.toLocaleString('en-GB') + (n >= TOTAL ? '+' : '') + '</b> messages'; P.chip.classList.add('on'); }
  function clearMsgs(P) { Array.prototype.slice.call(P.msgs.querySelectorAll('.row')).forEach(function (r) { r.remove(); }); P.chip.classList.remove('on'); }
  function reset(P) {
    (P.tms || []).forEach(clearTimeout); P.tms = []; P.gen = (P.gen || 0) + 1;
    clearMsgs(P); P.tx.textContent = ''; P.fld.classList.remove('typing'); P.snd.classList.remove('on');
  }
  function final(P) {
    reset(P);
    row(P, false, LUKE); row(P, true, KAY);
    for (var i = 0; i < FLOOD; i++) floodRow(P, i);
    chip(P, TOTAL);
  }
  function play(P, alive) {
    reset(P);
    var gen = P.gen;
    function at(t, f) { P.tms.push(setTimeout(function () { if (P.gen === gen && alive()) f(); }, t)); }
    var typ;
    at(T57.luke, function () { typ = row(P, false, null, 'typ'); typ.querySelector('.bb').innerHTML = '<i></i><i></i><i></i>'; });
    at(T57.lukeMsg, function () { if (typ) typ.remove(); row(P, false, LUKE); });
    at(T57.kay, function () { P.fld.classList.add('typing'); P.snd.classList.add('on'); });
    Array.from(KAY).forEach(function (ch, i) { at(T57.kay + Math.round((i + 1) * T57.kayMs / KAY.length), function () { P.tx.textContent += ch; }); });
    at(T57.send, function () { P.tx.textContent = ''; P.fld.classList.remove('typing'); P.snd.classList.remove('on'); row(P, true, KAY); });
    // flood: bubbles arrive faster and faster while the counter runs up to 2,600 alongside "They exchanged…"
    var span = 2200, t = 0;
    for (var i = 0; i < FLOOD; i++) {
      t = Math.round(span * Math.pow((i + 1) / FLOOD, .8));
      (function (i, t) { at(T57.story + t, function () { floodRow(P, i); chip(P, Math.round(TOTAL * Math.pow((i + 1) / FLOOD, 2.2))); }); })(i, t);
    }
  }

  Deck.registerSlide(57, {
    keepBase: true,
    render: function (el, ctx) {
      var P = el.__p57 = build(el);
      if (ctx.static) { P.root.classList.add('static'); final(P); }
    }
  });
  hook(57, {
    enter: function (v) { var P = v.custom && v.custom.__p57; if (P && v.k >= 1) final(P); },   // arrived built (Back)
    step: function (v, k) {
      var P = v.custom && v.custom.__p57; if (!P) return;
      if (k >= 1) play(P, function () { return Deck.view === v && !v.deactivated && v.k >= 1; }); else reset(P);
    }
  });
})();

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
    h('div', 'bot', box);
    h('div', 'url', box, 'lostscreenmemorial.org');
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

/* #105 - the kahf.co/checklist page (tall screenshot, slowly scrolls inside a fixed browser frame) with a big QR code to scan */
Deck.registerSlide(105, {
  keepBase: false, loop: ['orbs'],
  render: function (el, ctx) {
    var r = h('div', 'pc-ck', el), w = 1322, vh = 914, x = 70, y = (H - (vh + 46)) / 2, ih = w * 2000 / 1586;   // frame size unchanged; page is 1586x2000
    var gl = h('div', 'pc-wglow', r); gl.style.cssText = 'left:' + (x - 140) + 'px;top:' + (y - 100) + 'px;width:' + (w + 280) + 'px;height:' + (H - 2 * y + 200) + 'px;--wc:46,229,157';
    var wrap = h('div', ctx.static ? '' : 'pc-rise', r); wrap.style.cssText = 'position:absolute;inset:0';
    var win = h('div', 'pc-win', wrap, '<div class="bar"><i></i><i></i><i></i><div class="url"><b>&#128274;</b>kahf.co/checklist</div></div>');
    win.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;--wc:46,229,157';
    var vp = h('div', '', win); vp.style.cssText = 'position:relative;height:' + vh + 'px;overflow:hidden';
    var im = h('img', '', vp); im.src = 'media/checklist/kahf-checklist.webp'; im.alt = 'kahf.co/checklist: Is your family safe online? checklist'; im.style.height = ih + 'px';
    el.__ckImg = im; el.__ckTravel = ih - vh;
    h('div', 'ck-qrp', r,
      '<div class="ck-ttl">Online Safety<br><b>Checklist</b></div>' +
      '<div class="ck-scan"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"><rect x="13" y="4" width="22" height="40" rx="5"/><path d="M21 38h6"/></svg>Scan with your phone</div>' +
      '<div class="ck-qc"><img src="media/checklist/qr-kahf-co-checklist.svg" alt="QR code: https://kahf.co/checklist"><span class="ck-halo"></span><span class="ck-ln"></span></div>' +
      '<div class="ck-link">kahf.co/checklist</div>' +
      '<div class="ck-hint">18 steps &middot; about 20 minutes</div>');
    el.__ck = r;
  },
  enter: function (el, ctx) {
    var r = el.__ck; if (!r || ctx.reduced) return;
    r.classList.remove('go'); void r.offsetWidth; r.classList.add('go');
    var d = -el.__ckTravel, top = 'translateY(0)', bot = 'translateY(' + d + 'px)';   // hold top 3s, scroll down 10s, hold 5s, back up 10s
    var an = el.__ckImg.animate([{ transform: top, offset: 0 }, { transform: top, offset: 3 / 28, easing: 'ease-in-out' }, { transform: bot, offset: 13 / 28 },
      { transform: bot, offset: 18 / 28, easing: 'ease-in-out' }, { transform: top, offset: 1 }], { duration: 28000, iterations: Infinity, easing: 'linear' });
    ctx.onLeave(function () { r.classList.remove('go'); try { an.cancel(); } catch (e) {} });
  }
});

/* ---------------------------------------------------------------- 11. #97 slide 66 - kahfkids.com hero section only (no promo bar / menu)
   Rebuilt from the live site's markup; phone carousel autoplays like the site: slide every 4.5 s (0.55 s ease),
   rewinding from the last image to the first. Arrows and dots work too. */
var KK = { imgs: ['hero-1-videos', 'hero-2-menu', 'hero-3-parental'], every: 4500 };
var KK_APPLE = '<svg viewBox="0 0 384 512" width="22" height="22" fill="#fff"><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C71.3 141.1 16 184.5 16 271.9c0 25.8 4.7 52.4 14.1 79.7 12.6 36.1 58 124.6 105.4 123.1 24.8-.6 42.3-17.6 74.6-17.6 31.3 0 47.5 17.6 74.6 17.6 47.8-.7 88.8-81.1 100.8-117.3-64.1-30.2-60.8-88.5-60.8-89.7zm-43.4-180.3c20.9-24.8 19-47.4 18.4-55.5-18.5 1.1-39.9 12.6-52.1 26.8-13.4 15.3-21.3 34.2-19.6 55.1 20 1.5 38.2-8.8 53.3-26.4z"/></svg>';
var KK_PLAY = '<svg viewBox="0 0 512 512" width="20" height="22"><path fill="#fff" d="M47 32C36 38 28 49 28 64v384c0 15 8 26 19 32l228-224L47 32zm274 220l52-51-189-109c-12-7-24-6-33-1l170 161zm0 8L151 421c9 5 21 6 33-1l189-109-52-51zm46-27l54-31c18-10 18-39 0-49l-54-31-57 56 57 56z"/></svg>';
var KK_AMAZON = '<svg viewBox="0 0 48 48" width="24" height="24" fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"><path d="M6 30c10 7 26 8 36 1" stroke="#FF9900" stroke-width="3.4"/><path d="M36 27l6 4-2 7" stroke="#FF9900" stroke-width="3.4"/><path d="M30 22V12.5c0-3.5-2.6-5.5-6.3-5.5-3.2 0-5.7 1.6-6.4 4.2M30 15.5c-8.5 0-13 2-13 6.2 0 3 2.2 4.6 5.1 4.6 4.1 0 7.9-3.2 7.9-7.6" stroke-width="3.4"/></svg>';
var KK_ATV = '<svg viewBox="0 0 48 48" width="24" height="24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="40" height="26" rx="4"/><path d="M17 41h14M24 34v7"/><path d="M16.5 27a7.5 7.5 0 0 1 15 0z" fill="#3DDC84" stroke="#3DDC84" stroke-width="1.5"/><path d="M18.5 17.5l2 3M29.5 17.5l-2 3" stroke="#3DDC84" stroke-width="2"/></svg>';
function kkStat(c, num, lbl, stars, to, k) {
  if (to) num = '<span class="kk-cnt" data-to="' + to + '" data-k="' + (k || '') + '">' + num + '</span>';
  return '<div class="kk-stat" style="border-color:' + c + '">' + (stars ? '<div class="kk-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>' : '') +
    '<div class="kk-num">' + num + '+</div><div class="kk-lbl">' + lbl + '</div></div>';
}
Deck.registerSlide(97, {
  keepBase: false, loop: false,
  render: function (el, ctx) {
    var box = h('div', 'pc-kk', el), stg = h('div', 'kk-stg', box), hero = h('div', 'kk-hero', stg);
    h('div', 'kk-blob', hero).style.cssText = 'top:-24px;left:-80px;width:320px;height:320px;background:radial-gradient(circle,rgba(41,182,234,.18),transparent 70%)';
    h('div', 'kk-blob', hero).style.cssText = 'bottom:-118px;right:10%;width:260px;height:260px;background:radial-gradient(circle,rgba(177,79,208,.16),transparent 70%)';
    var art = h('div', 'kk-art', hero), fr = h('div', 'kk-frame', art);
    h('div', 'kk-glow', fr);
    var trk = h('div', 'kk-trk', h('div', 'kk-scr', fr));
    KK.imgs.forEach(function (n) { var im = h('img', '', h('div', '', trk)); im.src = 'media/kahfkids/' + n + '.webp'; im.alt = ''; im.decoding = 'async'; });
    var prev = h('button', 'kk-arw', fr, '&lsaquo;'), next = h('button', 'kk-arw', fr, '&rsaquo;');
    prev.style.left = next.style.right = '-16px'; prev.setAttribute('aria-label', 'Previous image'); next.setAttribute('aria-label', 'Next image');
    var dots = h('div', 'kk-dots', art);
    KK.imgs.forEach(function (n, i) { h('button', '', dots, '<span></span>').setAttribute('aria-label', 'Go to slide ' + (i + 1)); });
    h('div', 'kk-copy', hero,
      '<div class="kk-brand"><img src="media/kahfkids/app-icon.png" alt="Kahf Kids logo"><span><b>Kahf Kids</b><small>Safe Entertainment and Parental Control app</small></span></div>' +
      '<h1>Safe and Islamic Content for Kids <span>with</span> <span>Parental Control</span></h1>' +
      '<p class="kk-sub">Screen-time limits, app blocking, and 40,000+ mufti-approved kids videos in one app. The safer and halal screen time Muslim families trust.</p>' +
      '<div class="kk-stats">' + kkStat('#29B6EA', '40,000', 'Safe Videos', 0, 40000) + kkStat('#FFB400', '4.5', 'Rating', true) + kkStat('#2BB673', '300K', 'Families Trust Us', 0, 300, 'K') + '</div>' +
      '<div class="kk-cta"><a>' + KK_APPLE + '<span><small>Download on the</small><b>App Store</b></span></a>' +
      '<a>' + KK_PLAY + '<span><small>GET IT ON</small><b>Google Play</b></span></a>' +
      '<a>' + KK_AMAZON + '<span><small>Available on</small><b>Amazon Fire TV</b></span></a>' +
      '<a>' + KK_ATV + '<span><small>GET IT ON</small><b>Android TV</b></span></a></div>' +
      '<div class="kk-trial">&#10003; 7-day free trial &middot; no card needed</div>');
    var s = el.__kk = { trk: trk, dots: dots.children, prev: prev, next: next, i: 0 };
    if (ctx.static) trk.style.transition = 'none';
    kkGo(s, 0);
  },
  enter: function (el, ctx) {
    var s = el.__kk; if (!s) return;
    var gen = 0;
    function arm() { var g = ++gen; if (!ctx.reduced) ctx.timeout(function () { if (g === gen) { kkGo(s, (s.i + 1) % KK.imgs.length); arm(); } }, KK.every); }
    function jump(i) { kkGo(s, (i + KK.imgs.length) % KK.imgs.length); arm(); }
    s.prev.onclick = function (e) { e.stopPropagation(); jump(s.i - 1); };
    s.next.onclick = function (e) { e.stopPropagation(); jump(s.i + 1); };
    Array.prototype.forEach.call(s.dots, function (d, i) { d.onclick = function (e) { e.stopPropagation(); jump(i); }; });
    ctx.onLeave(function () { gen++; });
    arm();
    kkCount(el, ctx);
  }
});
/* 40,000+ and 300K+ count up from 0 (ease-out) each time the slide is entered */
function kkCount(el, ctx) {
  var ns = el.querySelectorAll('.kk-cnt');
  function put(n, v) { n.textContent = (+n.dataset.to >= 1000 ? Math.round(v).toLocaleString('en-US') : Math.round(v)) + n.dataset.k; }
  Array.prototype.forEach.call(ns, function (n) { put(n, +n.dataset.to); n.parentNode.style.minWidth = n.parentNode.offsetWidth + 'px'; });
  if (ctx.reduced) return;
  Array.prototype.forEach.call(ns, function (n) { put(n, 0); });
  var done = false;
  ctx.tick(function (dt, t) {
    if (done) return;
    var p = Math.min(1, Math.max(0, (t - 500) / 1900)), e = 1 - Math.pow(1 - p, 3);
    Array.prototype.forEach.call(ns, function (n) { put(n, e * n.dataset.to); });
    done = p === 1;
  });
}
function kkGo(s, i) {
  s.i = i; s.trk.style.transform = 'translateX(' + (-100 * i) + '%)';
  Array.prototype.forEach.call(s.dots, function (d, j) { d.classList.toggle('kk-on', j === i); });
}

/* ---------------------------------------------------------------- 12. charts (slides 69-72): instant chart, data lines draw themselves */
var LINE_MS = 350 + 3400;                                       // delay + duration of the line reveal
function lineChart(n, picId, name, extra, prep) {
  Deck.registerSlide(n, {
    keepBase: true, loop: ['orbs'],
    render: function (el, ctx) {
      var p = ctx.view.map[picId], img = p && p.querySelector('img'); if (!img) return;
      img.src = 'media/charts/' + name + '-base.png';
      var ln = h('img', 'pc-lines' + (ctx.static ? ' full' : ''), p.querySelector('.in')); ln.src = 'media/charts/' + name + '-lines.png'; ln.alt = '';
      el.__ln = ln;
      if (prep) prep(el, ctx);
    },
    enter: function (el, ctx) {
      var ln = el.__ln; if (!ln) return;
      var instant = cameBack || ctx.reduced;
      if (extra) extra(ctx, instant);
      if (instant) { ln.classList.add('full'); return; }
      var an = ln.animate([{ clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)' }], { duration: 3400, delay: 350, easing: 'cubic-bezier(.45,.05,.55,.95)', fill: 'forwards' });
      ctx.onLeave(function () { try { an.cancel(); } catch (e) {} });
    }
  });
}
lineChart(106, 'e1026', 'image181');
lineChart(107, 'e5122', 'image182');
lineChart(108, 'e3074', 'image183');
/* #109 - the social-app icons stay hidden until the lines finish drawing, then pop in one after another and keep bobbing */
var SOC109 = ['e1028', 'e1030', 'e1032', 'e1034'];
function soc109(ctx) { return SOC109.map(function (id) { var e = ctx.view.map[id]; return e && (e.querySelector('.in') || e); }).filter(Boolean); }
lineChart(109, 'e3074', 'image183', function (ctx, instant) {
  SOC109.forEach(function (id, i) {                             // bob (was part-b's loop); the pop runs on the inner node so transforms don't clash
    var e = ctx.view.map[id]; if (!e) return;
    e.style.setProperty('--t', (6 + i * 1.7) + 's'); e.style.setProperty('--d', (-i * 2.3) + 's'); e.classList.add('pb-float');
  });
  var ins = soc109(ctx), anims = [];
  if (instant) { ins.forEach(function (n) { n.style.opacity = ''; }); return; }
  ins.forEach(function (n, i) {
    n.style.opacity = '0';
    ctx.timeout(function () {
      n.style.opacity = '';
      anims.push(n.animate([{ opacity: 0, transform: 'scale(.2)' }, { opacity: 1, transform: 'scale(1.18)', offset: .6 }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 560, easing: 'cubic-bezier(.3,1.4,.5,1)' }));
    }, LINE_MS + 150 + i * 260);
  });
  ctx.onLeave(function () { anims.forEach(function (a) { try { a.cancel(); } catch (e) {} }); ins.forEach(function (n) { n.style.opacity = ''; }); });
}, function (el, ctx) {
  SOC109.forEach(function (id) {                                // no dark card frame behind the icons, just the icons
    var e = ctx.view.map[id]; if (!e) return;
    e.classList.remove('card'); e.style.background = 'none'; e.style.boxShadow = 'none';
    var n = e.querySelector('.in'); if (n) { n.style.background = 'none'; n.style.boxShadow = 'none'; n.style.outline = 'none'; }
  });
  if (!ctx.static) soc109(ctx).forEach(function (n) { n.style.opacity = '0'; });
});

/* ---------------------------------------------------------------- 13. #112 closing slide - company.kahf.to hero recording (4K) */
Deck.registerSlide(112, {
  keepBase: false, loop: false, calm: true,
  render: function (el, ctx) {
    var box = h('div', 'pc-close', el);
    var u = h('div', 'pc-url', el, '<div class="pill"><span class="halo"></span><span class="ic"><svg viewBox="0 0 48 48" fill="none" stroke="#0b2a1b" stroke-width="3.6" stroke-linecap="round"><circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c6.5 6 6.5 30 0 36M24 6c-6.5 6-6.5 30 0 36"/></svg></span><span class="t">kahf<i>.</i>co</span></div>');
    el.__u = u;
    if (ctx.static) { var im = h('img', '', box); im.src = 'media/kahf-company-hero-poster.jpg'; im.alt = 'company.kahf.to'; return; }
    var v = h('video', '', box);
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.poster = 'media/kahf-company-hero-poster.jpg';
    v.src = 'media/kahf-company-hero-4k.mp4';
    el.__v = v;
  },
  enter: function (el, ctx) {
    var v = el.__v; if (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    var u = el.__u; if (!u || ctx.reduced) return;
    u.classList.remove('go'); u.style.opacity = '0';
    ctx.timeout(function () { u.style.opacity = ''; void u.offsetWidth; u.classList.add('go'); }, 1200);
    ctx.onLeave(function () { u.classList.remove('go'); u.style.opacity = ''; });
  }
});
/* ---------------------------------------------------------------- 13b. NEW directly after #97 (Kahf Kids) - a child's Google account (age 11, Qatar), then sign it in on the TV + shared computers
   Step 1 (left): create the child account (media/kid-google/create-account.webp), DOB -> 11 years old, location Qatar;
   [click] myaccount.google.com > Personal info: set the home address to Doha (personal-info.webp).
   [click] Step 2 (right): sign in on the TV and shared computers -> Search, YouTube feed and ads get clean. */
(function () {
  var CSSG = [
    '.gk{position:absolute;inset:0;font-family:var(--f-body);color:#F4F1EA}',
    '.gk .ttl{position:absolute;left:0;right:0;top:34px;text-align:center;font:600 80px/1.05 var(--f-display);letter-spacing:-.015em}',
    '.gk .ttl em{font-style:italic;color:var(--green);text-shadow:0 0 40px rgba(46,229,157,.4)}',
    '.gk .sub{position:absolute;left:0;right:0;top:134px;text-align:center;font:600 28px/1.2 var(--f-body);color:#9AA7AD}',
    '.gk .sub b{color:#F4F1EA;font-weight:700}',
    '.gk .pnl{position:absolute;top:200px;height:846px;border-radius:30px;background:linear-gradient(170deg,rgba(var(--rc),.10),rgba(10,18,22,.55) 40%);box-shadow:inset 0 0 0 1.5px rgba(var(--rc),.42),0 40px 90px -40px rgba(0,0,0,.95)}',
    '.gk .hd{position:absolute;left:30px;top:24px;right:30px;display:flex;align-items:center;gap:20px}',
    '.gk .hd .n{flex:none;width:62px;height:62px;border-radius:50%;display:grid;place-items:center;font:800 34px/1 var(--f-display);color:#071014;background:rgb(var(--rc));box-shadow:0 0 30px rgba(var(--rc),.6)}',
    '.gk .hd h3{margin:0;font:700 40px/1.1 var(--f-body)}',
    '.gk .hd h3 span{color:rgb(var(--rc))}',
    '.gk .shot{position:absolute;border-radius:22px;overflow:hidden;background:#fff;box-shadow:0 0 0 6px rgba(255,255,255,.07),0 30px 70px -26px rgba(0,0,0,.95)}',
    '.gk .shot img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}',
    '.gk .ring{position:absolute;border-radius:16px;box-shadow:0 0 0 5px var(--amber),0 0 30px rgba(255,176,32,.8);animation:gk-ring 2.2s ease-in-out infinite}',
    '@keyframes gk-ring{0%,100%{box-shadow:0 0 0 4px var(--amber),0 0 16px rgba(255,176,32,.5)}50%{box-shadow:0 0 0 6px #ffc94d,0 0 40px rgba(255,176,32,.95)}}',
    '.gk .fld{position:absolute;display:flex;align-items:center;gap:18px;padding:0 22px;height:76px;border-radius:18px;background:rgba(8,16,20,.8);box-shadow:inset 0 0 0 2px rgba(255,176,32,.6)}',
    '.gk .fld svg{flex:none;width:40px;height:40px}',
    '.gk .fld small{display:block;font:700 17px/1 var(--f-body);letter-spacing:.12em;text-transform:uppercase;color:#9AA7AD}',
    '.gk .fld b{display:block;margin-top:6px;font:800 30px/1 var(--f-body);color:var(--amber)}',
    '.gk .fld .qa{width:54px;height:22px;border-radius:3px;margin-left:auto;box-shadow:0 0 0 1px rgba(255,255,255,.3)}',
    '.gk .cap{position:absolute;font:600 25px/1.3 var(--f-body);color:#c9d2d6}',
    '.gk .cap b{color:#F4F1EA}',
    '.gk .cap .path{display:inline-block;margin-top:8px;padding:5px 14px;border-radius:99px;font:600 20px/1.2 var(--f-mono);color:#bfe9ff;background:rgba(34,211,238,.12);box-shadow:inset 0 0 0 1.5px rgba(34,211,238,.45)}',
    '.gk .dev{position:absolute;top:116px;width:280px;height:206px;border-radius:22px;background:rgba(8,16,20,.7);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.14);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px;text-align:center}',
    '.gk .dev svg{width:96px;height:96px}',
    '.gk .dev p{margin:0;font:700 26px/1.15 var(--f-body)}',
    '.gk .dev p small{display:block;margin-top:4px;font:600 19px/1.1 var(--f-body);color:#9AA7AD}',
    '.gk .dev .ok{position:absolute;top:-14px;right:-14px;width:44px;height:44px;border-radius:50%;display:grid;place-items:center;background:var(--green);color:#062014;font:900 26px/1 var(--f-body);box-shadow:0 0 22px rgba(46,229,157,.7)}',
    '.gk .then{position:absolute;left:30px;right:30px;top:352px;display:flex;align-items:center;gap:16px;font:700 21px/1 var(--f-body);letter-spacing:.14em;text-transform:uppercase;color:#9AA7AD}',
    '.gk .then:before,.gk .then:after{content:"";flex:1;height:2px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent)}',
    '.gk .out{position:absolute;left:30px;right:30px;height:128px;display:flex;align-items:center;gap:24px;padding:0 26px;border-radius:22px;background:linear-gradient(100deg,rgba(var(--oc),.16),rgba(var(--oc),.04));box-shadow:inset 0 0 0 1.5px rgba(var(--oc),.5)}',
    '.gk .out .ic{flex:none;width:76px;height:76px;border-radius:20px;display:grid;place-items:center;background:rgba(var(--oc),.18)}',
    '.gk .out .ic svg{width:46px;height:46px}',
    '.gk .out p{margin:0;font:600 25px/1.25 var(--f-body);color:#c9d2d6}',
    '.gk .out p b{display:block;font:800 31px/1.1 var(--f-body);color:#F4F1EA}',
    '.gk .out p b span{color:rgb(var(--oc))}',
    '.gk .url{position:absolute;display:inline-flex;align-items:center;gap:12px;height:46px;padding:0 20px;border-radius:99px;font:600 24px/1 var(--f-mono);color:#bfe9ff;text-decoration:none;background:rgba(34,211,238,.12);box-shadow:inset 0 0 0 1.5px rgba(34,211,238,.55)}',
    '.gk .url svg{width:24px;height:24px}',
    '.gk .bb,.gk .p2{opacity:0;transform:translateY(40px);transition:opacity .7s ease,transform .8s cubic-bezier(.2,.8,.25,1)}',
    '.gk.s1 .bb,.gk.s2 .p2{opacity:1;transform:none}',
    '.gk .p2 .out{opacity:0;transform:translateX(40px);transition:opacity .6s ease,transform .7s cubic-bezier(.2,.8,.25,1)}',
    '.gk.s2 .p2 .out{opacity:1;transform:none}',
    '.gk.s2 .p2 .o1{transition-delay:.5s}.gk.s2 .p2 .o2{transition-delay:.85s}.gk.s2 .p2 .o3{transition-delay:1.2s}',
    '.gk.static *{transition:none!important;animation:none!important}'
  ].join('\n');
  var st = document.createElement('style'); st.id = 'part-c-gk-css'; st.textContent = CSSG; document.head.appendChild(st);

  var SVG = function (vb, body, c) { return '<svg viewBox="' + vb + '" fill="none" stroke="' + c + '" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">' + body + '</svg>'; };
  var CAKE = SVG('0 0 48 48', '<path d="M8 40h32V26a4 4 0 0 0-4-4H12a4 4 0 0 0-4 4z"/><path d="M8 32c4 0 4-3 8-3s4 3 8 3 4-3 8-3 4 3 8 3"/><path d="M24 22v-8"/><path d="M24 6c2 2 2 4 0 5-2-1-2-3 0-5z" fill="#FFB020"/>', '#FFB020');
  var PIN = SVG('0 0 48 48', '<path d="M24 44s14-12.5 14-24a14 14 0 0 0-28 0c0 11.5 14 24 14 24z"/><circle cx="24" cy="20" r="5"/>', '#FFB020');
  var TV = SVG('0 0 96 96', '<rect x="8" y="14" width="80" height="52" rx="8"/><path d="M32 82h32M48 66v16"/><path d="M40 29v22l19-11z" fill="#FFB020"/>', '#FFB020');
  var PC = SVG('0 0 96 96', '<rect x="14" y="16" width="68" height="46" rx="6"/><path d="M6 76h84l-6-14H12z"/><path d="M40 70h16"/>', '#FFB020');
  var SEARCH = SVG('0 0 48 48', '<circle cx="21" cy="21" r="12"/><path d="M30 30l11 11"/>', 'rgb(76,141,246)');
  var YT = '<svg viewBox="0 0 48 48"><rect x="3" y="10" width="42" height="28" rx="9" fill="#FF3B4E"/><path d="M20 18v12l11-6z" fill="#fff"/></svg>';
  var AD = SVG('0 0 48 48', '<rect x="5" y="9" width="38" height="30" rx="6"/><path d="M13 31l5-14 5 14M15 26h6M29 17v14h3a6 6 0 0 0 0-14z"/>', 'rgb(46,229,157)');
  var zig = 'M0 0H22'; for (var k = 0; k < 9; k++) zig += 'L30 ' + ((k + .5) * 26 / 9).toFixed(2) + 'L22 ' + ((k + 1) * 26 / 9).toFixed(2);
  var GLOBE = SVG('0 0 48 48', '<circle cx="24" cy="24" r="19"/><path d="M5 24h38M24 5c6 6 6 32 0 38M24 5c-6 6-6 32 0 38"/>', '#7fe8f5');
  var QATAR = '<svg class="qa" viewBox="0 0 66 26" preserveAspectRatio="none"><rect width="66" height="26" fill="#8A1538"/><path d="' + zig + 'H0z" fill="#fff"/></svg>';

  /* Personal info screenshot is 916x1186, shown down to y 985 (end of "Other addresses"); the "Home address" row is y 488-657 */
  var PIW = 540, PIH = Math.round(PIW * 985 / 916), CAW = 384, CAH = Math.round(CAW * 1408 / 958);

  Deck.insertSlide({
    after: 97, id: 'kid-google', title: 'A child’s Google account', section: 'protect', tr: { type: 'fade', ms: 800 }, loop: ['orbs'], steps: 2,
    notes: 'Step 1: create a Google account for your child as a child account (Google asks "Create a Google Account... you will help manage this account until your child is 13"). Set the date of birth so the account is 11 years old, and set the location to Qatar. ' +
      '[click] To change the location later, open myaccount.google.com > Personal info while signed in as the child and set the home address to Doha. The date of birth can be changed from Family Link. ' +
      '[click] Step 2: sign in with this account on the TV (YouTube app) and on every shared computer at home. Google now treats whoever is watching as a child: Google Search results are sanitised, the YouTube feed becomes much cleaner, and the ads on YouTube and Google become far cleaner too. Pair it with "train YouTube what not to show" from the previous slide.',
    render: function (el, ctx) {
      var r = h('div', 'gk' + (ctx.static ? ' static s1 s2' : ''), el);
      h('div', 'ttl', r, 'A child&rsquo;s <em>Google account</em>');
      h('div', 'sub', r, 'Set it up once &mdash; then <b>Search</b>, <b>YouTube</b> and <b>ads</b> turn clean on every shared screen');

      /* ---- step 1: create */
      var p1 = h('div', 'pnl', r); p1.style.cssText = 'left:56px;width:1140px;--rc:34,211,238';
      h('div', 'hd', p1, '<div class="n">1</div><h3>Create a <span>child account</span></h3>');
      var a = h('div', 'shot', p1); a.style.cssText = 'left:30px;top:112px;width:' + CAW + 'px;height:' + Math.min(CAH, 480) + 'px';
      var ai = h('img', '', a); ai.src = 'media/kid-google/create-account.webp'; ai.alt = 'Google: Create a Google Account for your child'; ai.decoding = 'async';
      var f1 = h('div', 'fld', p1, CAKE + '<div><small>Date of birth</small><b>11 years old</b></div>'); f1.style.cssText = 'left:30px;top:620px;width:' + CAW + 'px';
      var f2 = h('div', 'fld', p1, PIN + '<div><small>Location</small><b>Qatar</b></div>' + QATAR); f2.style.cssText = 'left:30px;top:714px;width:' + CAW + 'px';

      var bx = 30 + CAW + 36;
      var url = h('a', 'url bb pe', p1, GLOBE + 'https://myaccount.google.com/');
      url.href = 'https://myaccount.google.com/'; url.target = '_blank'; url.rel = 'noopener'; url.setAttribute('data-noadvance', '');
      url.style.cssText = 'left:' + bx + 'px;top:112px';
      var b = h('div', 'shot bb', p1); b.style.cssText = 'left:' + bx + 'px;top:176px;width:' + PIW + 'px;height:' + PIH + 'px';
      var bi = h('img', '', b); bi.src = 'media/kid-google/personal-info.webp'; bi.alt = 'Google Account: Personal info with home address Doha'; bi.decoding = 'async';
      var ring = h('div', 'ring', b);
      ring.style.cssText = 'left:2%;width:96%;top:' + (488 / 985 * 100) + '%;height:' + (169 / 985 * 100) + '%';
      var cap = h('div', 'cap bb', p1, '<b>Change the location any time:</b><br>Personal info &rsaquo; Home address = <b>Doha</b>');
      cap.style.cssText = 'left:' + bx + 'px;top:' + (176 + PIH + 18) + 'px;width:' + PIW + 'px';

      /* ---- step 2: sign in everywhere */
      var p2 = h('div', 'pnl p2', r); p2.style.cssText = 'left:1222px;width:642px;--rc:255,176,32';
      h('div', 'hd', p2, '<div class="n">2</div><h3>Sign in <span>everywhere</span></h3>');
      var d1 = h('div', 'dev', p2, TV + '<p>TV<small>YouTube app</small></p><i class="ok">&#10003;</i>'); d1.style.left = '30px';
      var d2 = h('div', 'dev', p2, PC + '<p>Shared computers<small>Chrome &amp; Google</small></p><i class="ok">&#10003;</i>'); d2.style.left = '332px';
      h('div', 'then', p2, 'Google now sees a child');
      [
        { c: '76,141,246', ic: SEARCH, t: 'Google Search <span>sanitised</span>', s: 'safe results by default' },
        { c: '255,59,78', ic: YT, t: 'YouTube feed <span>cleaner</span>', s: 'age-appropriate recommendations' },
        { c: '46,229,157', ic: AD, t: 'Ads <span>much cleaner</span>', s: 'on YouTube and Google' }
      ].forEach(function (o, i) {
        var d = h('div', 'out o' + (i + 1), p2, '<div class="ic">' + o.ic + '</div><p><b>' + o.t + '</b>' + o.s + '</p>');
        d.style.cssText = 'top:' + (400 + i * 146) + 'px;--oc:' + o.c;
      });

      el.__gk = r;
      if (!ctx.static) { el.__gkIn = [p1.querySelector('.hd'), a, f1, f2]; el.__gkIn.forEach(function (n) { n.style.opacity = 0; }); }
    },
    enter: function (el, ctx) {
      var parts = el.__gkIn; if (!parts) return;
      parts.forEach(function (n) { n.style.opacity = ''; });
      if (cameBack || ctx.reduced) return;
      parts.forEach(function (n, i) {
        n.animate([{ opacity: 0, transform: 'translateY(40px)' }, { opacity: 1, transform: 'none' }],
          { duration: 750, delay: 250 + i * 300, easing: 'cubic-bezier(.2,.8,.25,1)', fill: 'backwards' });
      });
    },
    step: function (el, i) { var r = el.__gk; if (r) r.classList.add('s' + i); },
    unstep: function (el, i) { var r = el.__gk; if (r) r.classList.remove('s' + i); }
  });
})();
/* ---------------------------------------------------------------- 14. NEW after #97 - "How to keep Susan away" (WhatsApp privacy) */
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
    after: 97, id: 'wa-privacy', title: 'How to keep Susan away', section: 'protect', tr: { type: 'fade', ms: 800 }, loop: ['orbs'],
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

/* ---------------------------------------------------------------- 15. NEW "Where does your life go?" (after #4)
   Digital 2026 (DataReportal x GWI, data to Oct 2025): 18h 36m / week on social media + online video
   (internet users 16+, excludes streaming TV). Derived numbers are plain arithmetic: year = 52.14 weeks,
   waking day = 16 h. Lifetime = a 60-year life, nothing counted before 16, each GWI age band at its own
   rate (mean of female and male h/week x years in band, 16-59). All online media (33.5 h/week) uses the
   same age profile. */
(function () {
  var WK = 18.6, WEEKS = 365 / 7, LIFE = 60;
  var HY = WK * WEEKS;                                   // 970 h a year
  var BANDS = [[24 + 41 / 60, 9], [20.9, 10], [17 + 40 / 60, 10], [15 + 41.5 / 60, 10], [13 + 20 / 60, 5]];
  var LIFE_H = BANDS.reduce(function (t, b) { return t + b[0] * WEEKS * b[1]; }, 0);   // 43,350 h
  var FEED_Y = LIFE_H / (365 * 16);                      // 7.4 waking years
  var ONL_Y = FEED_Y * 33.5 / WK;                        // 13.4 waking years, all online media
  var TOT_Y = FEED_Y * (6 + 40 / 60) * 7 / WK;          // all screen use: 6h 40m/day internet time (slide #4, Digital 2024), same age profile: 18.6
  var PF = FEED_Y / LIFE, PO = ONL_Y / LIFE, PT = TOT_Y / LIFE;   // 12.4% , 22.3% , 31.1%
  var C = 2 * Math.PI * 100, NL = 22;                  // pie = r 100 circle with stroke 200; NL extrusion layers
  var START = 90 - PO * 180, START2 = 90 - PT * 180;    // keep the red slice centred at the front (6 o'clock)
  var css = [
    '.yr{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden}',
    '.yr *{box-sizing:border-box}',
    '.yr .rv{opacity:0}',
    '.yr.go .rv{animation:yr-rise .9s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '.yr.static .rv{opacity:1;animation:none}',
    '@keyframes yr-rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}',
    '.yr-glow{position:absolute;left:1130px;top:560px;width:1000px;height:1000px;margin:-500px 0 0 -500px;border-radius:50%;background:radial-gradient(circle,rgba(255,77,77,.22),transparent 62%);opacity:0;transition:opacity 2.4s ease;pointer-events:none}',
    '.yr.a1 .yr-glow{opacity:1}',
    '.yr-k{position:absolute;left:100px;top:62px;font:700 19px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:var(--amber)}',
    '.yr-t{position:absolute;left:96px;top:96px;font:600 86px/1 var(--f-display);letter-spacing:-.02em;white-space:nowrap}',
    '.yr-t em{font-style:italic;color:#ff8a7a}',
    /* left: the ladder */
    '.yr-l{position:absolute;left:100px;top:270px;width:700px}',
    '.yr-l .lab{font-size:27px;color:var(--muted);line-height:1.3}',
    '.yr-big{font:600 168px/1 var(--f-display);letter-spacing:-.03em;margin:6px 0 4px;white-space:nowrap;font-variant-numeric:tabular-nums;',
    '  background:linear-gradient(100deg,#ffd27a,#FFB020 45%,#FF7A1A);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 26px rgba(255,150,40,.35))}',
    '.yr-big small{font-size:.5em;letter-spacing:0}',
    '.yr-l .what{font-size:31px;font-weight:600;color:var(--ink)}',
    '.yr-rows{position:absolute;left:100px;top:600px;width:700px;display:flex;flex-direction:column;gap:14px}',
    '.yr-row{display:flex;align-items:baseline;gap:22px;padding-bottom:14px;border-bottom:1px solid rgba(255,255,255,.09)}',
    '.yr-row b{font:600 56px/1 var(--f-display);color:#fff;min-width:260px;font-variant-numeric:tabular-nums}',
    '.yr-row span{font-size:26px;color:var(--ink2,#cfd6da)}',
    '.yr-row span i{font-style:normal;color:var(--muted);font-size:20px;display:block;margin-top:4px}',
    /* right: the 3D life pie */
    '.yr-pie{position:absolute;left:880px;top:250px;width:956px;height:600px}',
    '.yr-pie .hd{font-size:24px;color:var(--muted);letter-spacing:.02em}',
    '.yr-pie .hd b{color:var(--ink);font-weight:600}',
    '.yr-shd{position:absolute;left:40px;top:500px;width:480px;height:120px;border-radius:50%;background:radial-gradient(ellipse,rgba(0,0,0,.75),transparent 70%)}',
    '.yr-stage{position:absolute;left:0;top:40px;width:560px;height:560px;perspective:1700px}',
    '.yr-3d{position:absolute;inset:0;transform-style:preserve-3d;transform:rotateX(54deg) rotateZ(-10deg)}',
    '.yr-3d svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible}',
    '.yr-3d circle{fill:none;stroke-width:200}',
    '.yr-3d .arc{stroke-dasharray:0 ' + C.toFixed(1) + ';transform:rotate(' + START.toFixed(2) + 'deg);transform-origin:250px 250px;transition:stroke-dasharray 1.8s cubic-bezier(.65,0,.35,1) .3s,transform 1.8s cubic-bezier(.65,0,.35,1)}',
    '.yr.a1 .yr-3d .arc{stroke-dasharray:' + (PO * C).toFixed(1) + ' ' + C.toFixed(1) + '}',
    '.yr.s1 .yr-3d .arc{stroke-dasharray:' + (PT * C).toFixed(1) + ' ' + C.toFixed(1) + ';transform:rotate(' + START2.toFixed(2) + 'deg);transition-delay:0s}',
    '.yr-sw .v1{display:none}.yr.s1 .yr-sw .v0{display:none}.yr.s1 .yr-sw .v1{display:inline-block;animation:yr-pop .7s cubic-bezier(.3,1.6,.5,1) both}',
    '.yr-sw span.v1{max-width:100%}',
    '@keyframes yr-pop{from{opacity:0;transform:scale(.7)}to{opacity:1;transform:none}}',
    '.yr-pct{position:absolute;left:316px;top:432px;transform:translate(-50%,-50%);font:700 58px/1 var(--f-display);color:#fff;text-shadow:0 2px 0 rgba(120,10,20,.8),0 6px 18px rgba(0,0,0,.55);opacity:0;transition:opacity .6s ease;pointer-events:none;white-space:nowrap}',
    '.yr.a1 .yr-pct{opacity:1;transition-delay:2.6s}.yr.s1 .yr-pct{transition-delay:0s}',
    '.yr-3d .pop{transition:transform .9s cubic-bezier(.3,1.4,.5,1) 2.1s}',
    '.yr.a1 .yr-3d .pop{transform:translate(0,34px)}',
    '.yr.a1 .yr-3d .top .arc{filter:drop-shadow(0 0 14px rgba(255,90,60,.7))}',
    '.yr-lg{position:absolute;left:600px;top:190px;width:356px;display:flex;flex-direction:column;gap:44px}',
    '.yr-lg>div{position:relative;padding-left:34px;opacity:0;transform:translateX(16px);transition:opacity .8s ease,transform .8s ease}',
    '.yr-lg>div:before{content:"";position:absolute;left:0;top:18px;width:20px;height:20px;border-radius:6px;background:var(--c)}',
    '.yr-lg b{display:block;font:600 64px/1 var(--f-display);color:var(--c2,#fff);white-space:nowrap}',
    '.yr-lg b small{font-size:.45em}',
    '.yr-lg .l1 b{font-size:96px;text-shadow:0 0 34px rgba(255,90,60,.5)}',
    '.yr-lg span{display:block;font-size:23px;line-height:1.3;color:var(--ink2,#cfd6da);margin-top:8px}',
    '.yr.a1 .yr-lg>div{opacity:1;transform:none}',
    '.yr.a1 .yr-lg .l1{transition-delay:1.6s}',
    '.yr-cap{position:absolute;left:880px;top:860px;width:956px;font:600 38px/1.2 var(--f-display);white-space:nowrap;opacity:0;transform:translateY(20px);transition:opacity .9s ease,transform .9s ease}',
    '.yr-cap em{font-style:normal;color:#ff6b6b}',
    '.yr.a1 .yr-cap{opacity:1;transform:none;transition-delay:3.4s}',
    /* step 2: the line */
    '.yr-end{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(4,6,8,.86);opacity:0;transition:opacity 1s ease;pointer-events:none;z-index:30;text-align:center}',
    '.yr.s2 .yr-end{opacity:1}',
    '.yr-end p{margin:0;font:600 104px/1.08 var(--f-display);letter-spacing:-.02em;transform:translateY(24px);transition:transform 1.2s cubic-bezier(.22,.8,.3,1)}',
    '.yr-end p em{color:#ff6b6b}',
    '.yr-end span{margin-top:34px;font-size:30px;color:var(--muted);opacity:0;transition:opacity 1s ease 1.1s}',
    '.yr.s2 .yr-end p{transform:none}.yr.s2 .yr-end span{opacity:1}',
    '.yr-src{position:absolute;right:84px;bottom:30px;font-size:16px;color:var(--muted);text-align:right;max-width:1040px;line-height:1.35;z-index:41}',
    '.yr.static *,.yr.static *::before{transition:none!important}',
    '@media (prefers-reduced-motion:reduce){.yr *{transition-duration:.01s!important;transition-delay:0s!important;animation:none!important}}'
  ].join('\n');
  (function () { if (document.getElementById('pc-yr-css')) return; var st = document.createElement('style'); st.id = 'pc-yr-css'; st.textContent = css; document.head.appendChild(st); })();

  function fmt(n, d) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }

  Deck.insertSlide({
    after: 4, id: 'year-gone', title: 'Where does your life go?', section: 'problem', tr: { type: 'fade', ms: 900 }, loop: false, steps: 2,
    notes: 'Newest data: DataReportal Digital 2026 Global Overview (GWI survey, data up to Oct 2025). The average internet user aged 16+ spends 18 hours 36 minutes every week just on social media and online video, not counting Netflix or TV streaming. ' +
      'That is 970 hours a year, 1 in 6 of your waking hours. ' +
      '[pie builds by itself] Now take a 60-year life, only the hours you are awake, and nothing before age 16. Adding up the real time online for each age group, even though people use less as they get older, comes to ' + fmt(ONL_Y, 1) + ' years: more than 1 in 5 of all your waking hours, spent online. ' +
      '[click] And if we add ALL internet use, the 6 hours 40 minutes a day from the previous slide, it grows to ' + fmt(TOT_Y, 1) + ' years: nearly 1 in 3 waking hours of your life on a screen. ' +
      '[click] This is not screen time. It is life time. ' +
      'Defending the numbers: 18.6 h x 52.14 weeks = 970 h a year. Lifetime: GWI hours/week by age band (mean of women and men) x 52.14 x years in band: 16-24 24.7h x 9, 25-34 20.9h x 10, 35-44 17.7h x 10, 45-54 15.7h x 10, 55-59 13.3h x 5 = ' + fmt(LIFE_H) + ' h; / (16 h x 365) = ' + fmt(FEED_Y, 1) + ' waking years = ' + fmt(PF * 100, 1) + '% of 60 x 365 x 16 waking hours. All online media (33.5 h/week, DataReportal) scaled by the same age profile = ' + fmt(ONL_Y, 1) + ' years (' + fmt(PO * 100, 1) + '%). All internet use 6h 40m/day (Digital 2024, slide 4) same way = ' + fmt(TOT_Y, 1) + ' years (' + fmt(PT * 100, 1) + '%).',
    render: function (el, ctx) {
      var r = document.createElement('div'); r.className = 'yr' + (ctx.static ? ' static a1' : ''); el.appendChild(r);
      var layers = '';
      for (var k = NL - 1; k >= 0; k--) {                   // bottom layer first; k = 0 is the lit top face
        var top = k === 0, rim = k === 1;
        layers += '<svg viewBox="0 0 500 500" class="' + (top ? 'top' : '') + '" style="transform:translateZ(' + (-k * 2.6).toFixed(1) + 'px)">' +
          (top ? '<defs><linearGradient id="yr-gc" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7fe8f5"/><stop offset="1" stop-color="#127c8f"/></linearGradient>' +
            '<linearGradient id="yr-gh" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb36b"/><stop offset=".55" stop-color="#ff5a3c"/><stop offset="1" stop-color="#c41d2c"/></linearGradient>' +
            '<radialGradient id="yr-gs" cx=".36" cy=".3" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>' : '') +
          '<circle cx="250" cy="250" r="100" stroke="' + (top ? 'url(#yr-gc)' : rim ? '#1a95a8' : '#0b4b57') + '"/>' +
          '<g class="pop"><circle class="arc" cx="250" cy="250" r="100" stroke="' + (top ? 'url(#yr-gh)' : rim ? '#d8452e' : '#7d1420') + '"/></g>' +
          (top ? '<circle cx="250" cy="250" r="200" fill="url(#yr-gs)" stroke="none" style="pointer-events:none"/>' : '') + '</svg>';
      }
      r.innerHTML =
        '<div class="yr-glow"></div>' +
        '<div class="yr-k rv" style="--d:.05s">Digital 2026 &middot; DataReportal &times; GWI &middot; newest global data</div>' +
        '<div class="yr-t rv" style="--d:.15s">Where does your <em>life</em> go?</div>' +
        '<div class="yr-l"><div class="lab rv" style="--d:.3s">Every week, the average internet user spends</div>' +
          '<div class="yr-big rv" style="--d:.4s"><span class="n">18</span><small>h</small> <span class="m">36</span><small>m</small></div>' +
          '<div class="what rv" style="--d:.5s">on social media &amp; online video alone</div></div>' +
        '<div class="yr-rows">' +
          '<div class="yr-row rv" style="--d:1.6s"><b>' + fmt(HY) + ' h</b><span>every year</span></div>' +
          '<div class="yr-row rv" style="--d:2.2s"><b>1 in 6</b><span>of all your waking hours<i>not counting Netflix or any TV streaming</i></span></div>' +
        '</div>' +
        '<div class="yr-pie rv" style="--d:.7s"><div class="hd">A <b>' + LIFE + '-year life</b>, waking hours only</div>' +
          '<div class="yr-shd"></div><div class="yr-stage"><div class="yr-3d">' + layers + '</div></div>' +
          '<div class="yr-pct yr-sw"><i class="v0" style="font-style:normal">' + Math.round(PO * 100) + '%</i><i class="v1" style="font-style:normal">' + Math.round(PT * 100) + '%</i></div>' +
          '<div class="yr-lg">' +
            '<div class="l1 yr-sw" style="--c:#ff6a3d;--c2:#ff7b5c"><b><i class="v0" style="font-style:normal">' + fmt(ONL_Y, 1) + '</i><i class="v1" style="font-style:normal">' + fmt(TOT_Y, 1) + '</i><small> years</small></b>' +
              '<span class="v0">of your waking life spent online</span><span class="v1">of your waking life on screens, counting all internet use</span></div>' +
'</div></div>' +
        '<div class="yr-cap yr-sw"><span class="v0">More than <em>1 in 5</em> waking hours of your life, spent online.</span><span class="v1">Nearly <em>1 in 3</em> waking hours of your life, on a screen.</span></div>' +
        '<div class="yr-end"><p>This isn&rsquo;t <em>screen</em> time.<br>It&rsquo;s <em>life</em> time.</p><span>And you never get it back.</span></div>' +
        '<div class="yr-src">GWI Q2 2025 survey of internet users 16+, via DataReportal Digital 2026 Global Overview (Oct 2025). Year = 52.14 weeks; waking day = 16 h. Lifetime: 60 years, nothing before 16, each age group at its own rate. Online (33.5 h/wk, Digital 2026) and all internet use (6h 40m/day, Digital 2024) use the same age profile.</div>';
      var box = document.createElement('div'); box.className = 'chips';
      var a2 = document.createElement('a'); a2.className = 'chip'; a2.href = 'https://datareportal.com/reports/digital-2026-global-overview-report'; a2.target = '_blank'; a2.rel = 'noopener'; a2.setAttribute('data-noadvance', '');
      a2.innerHTML = '<b>source</b><span>datareportal.com/reports/digital-2026-global-overview-report</span>'; box.appendChild(a2); r.appendChild(box);
      el.__yr = r;
      if (!ctx.static) { void r.offsetWidth; r.classList.add('go'); }
    },
    enter: function (el, ctx) {
      var r = el.__yr; if (!r) return;
      r.classList.add('a1');                                // the pie builds by itself
      if (ctx.reduced) return;
      var n = r.querySelector('.yr-big .n'), m = r.querySelector('.yr-big .m'), t0 = null, DUR = 1800, done = false;
      n.textContent = '0'; m.textContent = '00';
      ctx.tick(function () {
        if (done) return; var now = performance.now(); if (t0 === null) t0 = now;
        var p = Math.min(1, (now - t0) / DUR), e = 1 - Math.pow(1 - p, 3), tot = Math.round(e * (18 * 60 + 36));
        n.textContent = Math.floor(tot / 60); var mm = tot % 60; m.textContent = (mm < 10 ? '0' : '') + mm;
        done = p >= 1;
      });
    },
    step: function (el, i) { var r = el.__yr; if (r) r.classList.add('s' + i); },
    unstep: function (el, i) { var r = el.__yr; if (r) r.classList.remove('s' + i); }
  });
})();

/* ---------------------------------------------------------------- #51 - "Don't drug your kids with device" headline */
var PILL = '<svg viewBox="0 0 100 100"><defs><linearGradient id="pc51-pr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8a95"/><stop offset="1" stop-color="#c8102e"/></linearGradient></defs>' +
  '<rect x="10" y="34" width="80" height="32" rx="16" fill="#F4F1EA"/><path d="M26 34h24v32H26a16 16 0 0 1 0-32z" fill="url(#pc51-pr)"/>' +
  '<rect x="49" y="34" width="2.5" height="32" fill="rgba(0,0,0,.18)"/><rect x="18" y="39" width="58" height="6" rx="3" fill="#fff" opacity=".55"/></svg>';
Deck.registerSlide(51, {
  keepBase: true,
  render: function (el, ctx) {
    hide(ctx, ['e3']);
    var t = h('div', 'pc51' + (ctx.static || cameBack ? ' static' : ''), el,
      '<span class="ln a">Don’t</span>' +
      '<span class="ln"><span class="b"><span class="halo"></span>drug</span></span>' +
      '<span class="cap">' + PILL + '</span>' +
      '<span class="ln c">your kids</span>' +
      '<span class="ln d">with <span class="scr">device</span></span>');
    if (!ctx.static && !cameBack) { void t.offsetWidth; t.classList.add('go'); }
  }
});

/* ---------------------------------------------------------------- #110 - red brush-stroke cross over the child alone at night */
(function () {
  if (!document.getElementById('pc110-css')) {
    var st = document.createElement('style'); st.id = 'pc110-css';
    st.textContent = [
      '.pc110{position:absolute;inset:0;pointer-events:none}',
      '.pc110 .vig{position:absolute;inset:0;opacity:0;transition:opacity .6s ease-out;background:radial-gradient(ellipse 72% 70% at 50% 50%,transparent 55%,rgba(200,0,24,.30) 82%,rgba(120,0,14,.55))}',
      '.pc110 svg{position:absolute;inset:0;width:1920px;height:1080px;overflow:visible}',
      '.pc110 .mk{stroke-dasharray:1 1.2;stroke-dashoffset:1.1;transition:stroke-dashoffset .38s cubic-bezier(.6,0,.85,.55)}',
      '.pc110 .glow{opacity:0;transition:opacity .4s ease-out}',
      '.pc110 .drop{transform-box:fill-box;transform-origin:50% 50%;transform:scale(0);transition:transform .3s cubic-bezier(.2,1.6,.4,1)}',
      '.pc110 .shock{position:absolute;left:966px;top:540px;width:360px;height:360px;margin:-180px 0 0 -180px;border-radius:50%;border:10px solid rgba(255,60,75,.9);',
      '  box-shadow:0 0 40px rgba(255,30,50,.8),inset 0 0 40px rgba(255,30,50,.6);opacity:0;transform:scale(.15)}',
      '.pc110.a1 .mk1,.pc110.a2 .mk2{stroke-dashoffset:0}',
      '.pc110.i1 .d1,.pc110.i2 .d2{transform:scale(1)}',
      '.pc110.i2 .vig{opacity:1}',
      '.pc110.i2 .glow{opacity:.4}',
      '.pc110.i2.live .glow{animation:pc110-pulse 1.5s ease-in-out .5s infinite}',
      '.pc110.i2.live .vig{animation:pc110-vig 1.5s ease-in-out .5s infinite}',
      '.pc110.boom .shock{animation:pc110-ring .9s cubic-bezier(.15,.7,.3,1) both}',
      '.pc110.inst *{transition:none!important}',
      '@keyframes pc110-pulse{0%,100%{opacity:.4}50%{opacity:.15}}',
      '@keyframes pc110-vig{0%,100%{opacity:1}50%{opacity:.55}}',
      '@keyframes pc110-ring{0%{opacity:1;transform:scale(.15)}100%{opacity:0;transform:scale(3.2)}}',
      '@media (prefers-reduced-motion:reduce){.pc110 .glow,.pc110 .vig{animation:none!important}}'
    ].join('\n');
    document.head.appendChild(st);
  }
  var P1 = 'M590 172 C 800 380, 1100 640, 1358 908', P2 = 'M1368 166 C 1140 400, 860 680, 582 918';
  function stroke(k, d) {
    return '<mask id="pc110-m' + k + '" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080">' +
        '<path class="mk mk' + k + '" d="' + d + '" pathLength="1" fill="none" stroke="#fff" stroke-width="170" stroke-linecap="round"/></mask>' +
      '<g class="m' + k + '" mask="url(#pc110-m' + k + ')" fill="none" stroke-linecap="round">' +
        '<path d="' + d + '" stroke="rgba(0,0,0,.35)" stroke-width="70" transform="translate(6 10)" filter="url(#pc110-soft)"/>' +
        '<path class="glow" d="' + d + '" stroke="#ff3a50" stroke-width="100" filter="url(#pc110-blur)"/>' +
        '<g filter="url(#pc110-rough)" opacity=".92">' +
          '<path d="' + d + '" stroke="url(#pc110-g' + k + ')" stroke-width="58"/>' +
          '<path d="' + d + '" stroke="#a3172a" stroke-width="8" opacity=".35" transform="translate(10 -8)"/>' +
          '<path d="' + d + '" stroke="#ffc2c8" stroke-width="5" opacity=".3" transform="translate(-12 7)"/>' +
          '<path d="' + d + '" stroke="#ff8a96" stroke-width="4" opacity=".3" transform="translate(-3 -18)"/>' +
        '</g></g>';
  }
  function drops(cls, pts) {
    return pts.map(function (p) { return '<circle class="drop ' + cls + '" cx="' + p[0] + '" cy="' + p[1] + '" r="' + p[2] + '" fill="#e0102a" filter="url(#pc110-rough)"/>'; }).join('');
  }
  var SVG = '<svg viewBox="0 0 1920 1080"><defs>' +
      '<linearGradient id="pc110-g1" gradientUnits="userSpaceOnUse" x1="590" y1="172" x2="1358" y2="908"><stop offset="0" stop-color="#ff6b7a"/><stop offset=".55" stop-color="#ec2d45"/><stop offset="1" stop-color="#c41a33"/></linearGradient>' +
      '<linearGradient id="pc110-g2" gradientUnits="userSpaceOnUse" x1="1368" y1="166" x2="582" y2="918"><stop offset="0" stop-color="#ff6b7a"/><stop offset=".55" stop-color="#ec2d45"/><stop offset="1" stop-color="#c41a33"/></linearGradient>' +
      '<filter id="pc110-rough" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".032" numOctaves="2" seed="7"/><feDisplacementMap in="SourceGraphic" scale="9"/><feGaussianBlur stdDeviation="1.6"/></filter>' +
      '<filter id="pc110-blur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="22"/></filter>' +
      '<filter id="pc110-soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>' +
      '</defs>' + stroke(1, P1) + stroke(2, P2) +
      drops('d1', [[1398, 944, 13], [1420, 900, 7], [1330, 968, 9], [1446, 968, 5], [1380, 990, 4]]) +
      drops('d2', [[548, 954, 13], [526, 906, 7], [606, 976, 8], [508, 980, 5], [570, 1000, 4], [1000, 560, 6], [930, 500, 4]]) +
      '</svg>';
  var uid = 0;
  function setAll(r, on) { ['a1', 'i1', 'a2', 'i2'].forEach(function (c) { r.classList.toggle(c, on); }); }
  function shake(ctx, nodes, amp) {
    if (ctx.reduced) return;
    var k = [0, 1, -1, .7, -.5, .3, 0].map(function (f, i) { return { transform: 'translate(' + (f * amp) + 'px,' + ((i % 2 ? -.6 : .6) * f * amp) + 'px)' }; });
    nodes.forEach(function (n) { if (n) n.animate(k, { duration: 380, easing: 'ease-out' }); });
  }
  if (byN[110]) byN[110].steps = [];                    // the cross is now one custom build, not the two ink wipes
  Deck.registerSlide(110, {
    keepBase: true, steps: 1,
    render: function (el, ctx) {
      hide(ctx, ['e6', 'e7']);                             // the old amber ink strokes
      var u = 'pc110-' + (++uid) + '-';                    // unique svg ids: thumbnails + live slide coexist
      var r = h('div', 'pc110', el, '<div class="vig"></div>' + SVG.replace(/pc110-/g, u) + '<div class="shock"></div>');
      el.__r = r; el.__gen = 0;
      if (ctx.static) { r.classList.add('inst'); setAll(r, true); }
    },
    enter: function () {},
    step: function (el, i, ctx) {
      var r = el.__r; if (!r) return;
      var gen = ++el.__gen;
      if (ctx.reduced || cameBack) {                         // instant when landing on the built slide (Back)
        r.classList.add('inst'); setAll(r, true); if (!ctx.reduced) r.classList.add('live'); void r.offsetWidth; r.classList.remove('inst'); return;
      }
      r.classList.remove('inst');
      var nodes = [ctx.view.els, r], at = function (ms, fn) { ctx.timeout(function () { if (el.__gen === gen) fn(); }, ms); };
      r.classList.add('a1');
      at(380, function () { r.classList.add('i1'); shake(ctx, nodes, 9); });
      at(620, function () { r.classList.add('a2'); });
      at(1000, function () { r.classList.add('i2', 'live', 'boom'); shake(ctx, nodes, 18); });
    },
    unstep: function (el) {
      var r = el.__r; if (!r) return; el.__gen++;
      r.classList.add('inst'); setAll(r, false); r.classList.remove('live', 'boom'); void r.offsetWidth; r.classList.remove('inst');
    }
  });
})();

/* ---------------------------------------------------------------- 15. #96 YouTube - train what not to show
   the paragraph block becomes three numbered step cards + a monthly reminder; card 2 lights up when the
   base build reveals the "Not interested" menu on the screenshot */
(function () {
  var css = [
    '.pc96-t{position:absolute;left:170px;top:58px;margin:0;font:600 76px/1.05 var(--f-display);letter-spacing:-.02em;color:var(--ink);white-space:nowrap}',
    '.pc96-t .yt{display:inline-flex;align-items:center;gap:.16em;color:#FF4D4D;text-shadow:0 0 30px rgba(255,40,40,.35)}',
    '.pc96-t .yt svg{width:.9em;height:.64em;flex:none}',
    '.pc96-t .not{position:relative;font-style:italic;color:var(--amber)}',
    '.pc96-t .not svg{position:absolute;left:-2%;bottom:-.16em;width:104%;height:.3em;overflow:visible}',
    '.pc96{position:absolute;left:1100px;top:214px;width:720px;display:flex;flex-direction:column;gap:22px}',
    '.pc96 .cd{position:relative;display:flex;gap:28px;align-items:flex-start;padding:28px 34px 30px 30px;border-radius:26px;',
    '  background:linear-gradient(135deg,rgba(255,255,255,.075),rgba(255,255,255,.025));border:1.5px solid rgba(255,255,255,.12);',
    '  box-shadow:0 18px 50px rgba(0,0,0,.35);transition:border-color .5s,box-shadow .5s,transform .5s var(--ease)}',
    '.pc96 .n{flex:none;width:64px;height:64px;border-radius:50%;display:grid;place-items:center;font:700 34px/1 var(--f-display);',
    '  color:#0B0F12;background:var(--cyan);box-shadow:0 0 24px rgba(34,211,238,.45)}',
    '.pc96 .hd{font:600 42px/1.15 var(--f-body);color:var(--ink);letter-spacing:-.01em}',
    '.pc96 .sb{margin-top:10px;font:400 29px/1.35 var(--f-body);color:var(--ink2)}',
    '.pc96 .chip{display:inline-flex;align-items:center;gap:10px;padding:4px 18px 6px;border-radius:40px;background:rgba(255,255,255,.12);',
    '  border:1.5px solid rgba(255,255,255,.22);font:600 32px/1.2 var(--f-body);vertical-align:middle;color:var(--ink)}',
    '.pc96 .chip.dots{padding:4px 16px 6px;font-weight:800;letter-spacing:.04em}',
    '.pc96 .chip svg{width:30px;height:30px}',
    '.pc96 .ar{margin:0 10px;color:var(--muted)}',
    '.pc96 .cd.hot{border-color:rgba(255,77,77,.75);box-shadow:0 0 0 1px rgba(255,77,77,.35),0 0 46px rgba(255,77,77,.28),0 18px 50px rgba(0,0,0,.35);transform:translateX(-10px)}',
    '.pc96 .cd.hot .n{background:#FF4D4D;box-shadow:0 0 26px rgba(255,77,77,.6)}',
    '.pc96 .cd.hot .chip.ni{background:rgba(255,77,77,.2);border-color:rgba(255,77,77,.7)}',
    '.pc96 .rm{display:flex;gap:26px;align-items:center;margin-top:14px;padding:26px 34px 26px 30px;border-radius:26px;',
    '  background:linear-gradient(120deg,rgba(255,176,32,.2),rgba(255,176,32,.06));border:1.5px solid rgba(255,176,32,.5)}',
    '.pc96 .rm svg{flex:none;width:64px;height:64px}',
    '.pc96 .rm b{display:block;font:700 40px/1.15 var(--f-body);color:var(--amber)}',
    '.pc96 .rm span{display:block;margin-top:4px;font:400 29px/1.3 var(--f-body);color:var(--ink2)}',
    '.pc96 > *,.pc96-t{opacity:1}',
    '.pc96.pre > *,.pc96-t.pre{opacity:0}',
    '.pc96.go > *{animation:pc96-in .8s var(--ease) both;animation-delay:var(--d)}',
    '.pc96-t.go{animation:pc96-in .8s var(--ease) both}',
    '@keyframes pc96-in{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}'
  ].join('\n');
  if (!document.getElementById('pc96-css')) { var st = document.createElement('style'); st.id = 'pc96-css'; st.textContent = css; document.head.appendChild(st); }

  var PLAY = '<svg viewBox="0 0 90 64"><rect width="90" height="64" rx="16" fill="#FF2A2A"/><path d="M36 18v28l24-14z" fill="#fff"/></svg>';
  var BAN = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>';
  var CAL = '<svg viewBox="0 0 64 64" fill="none" stroke="#FFB020" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">' +
    '<rect x="8" y="12" width="48" height="44" rx="8"/><path d="M8 26h48M22 6v12M42 6v12"/><path d="M40 40a8 8 0 1 1-2.3-5.7M40 32v4h-4"/></svg>';

  function hot(el, on) { var c = el.__c2; if (c) c.classList.toggle('hot', !!on); }
  Deck.registerSlide(96, {
    keepBase: true,
    render: function (el, ctx) {
      hide(ctx, ['e2', 'e11']);
      var anim = !ctx.static && !ctx.reduced && !cameBack;
      var t = h('h2', 'pc96-t' + (anim ? ' pre' : ''), el,
        'Train <span class="yt">' + PLAY + 'YouTube</span> what <span class="not">not' +
        '<svg viewBox="0 0 100 12" preserveAspectRatio="none"><path d="M2 8 C30 2 70 12 98 4" fill="none" stroke="#FFB020" stroke-width="3.5" stroke-linecap="round"/></svg></span> to show');
      var p = h('div', 'pc96' + (anim ? ' pre' : ''), el,
        '<div class="cd" style="--d:.25s"><div class="n">1</div><div><div class="hd">Scroll through the feed</div>' +
          '<div class="sb">Spot anything you don’t want your child to see.</div></div></div>' +
        '<div class="cd" style="--d:.4s"><div class="n">2</div><div><div class="hd"><span class="chip dots">⋮</span><span class="ar">→</span>' +
          '<span class="chip ni">' + BAN + 'Not interested</span></div>' +
          '<div class="sb">Tap the three dots on that video and choose it.</div></div></div>' +
        '<div class="cd" style="--d:.55s"><div class="n">3</div><div><div class="hd">The AI learns</div>' +
          '<div class="sb">YouTube stops recommending that kind of content.</div></div></div>' +
        '<div class="rm" style="--d:.75s">' + CAL + '<div><b>Repeat once a month</b><span>to keep the AI on track.</span></div></div>');
      el.__c2 = p.children[1];
      if (anim) { el.__go = function () { t.classList.remove('pre'); p.classList.remove('pre'); t.classList.add('go'); p.classList.add('go'); }; }
      if (ctx.static) hot(el, true);
    },
    enter: function (el, ctx) {
      if (el.__go) { el.__go(); el.__go = null; }
      hot(el, ctx.view.k >= 1);
    }
  });
  // the base build (menu screenshot) is a base step, not a custom one: follow it via the deck's step event
  Deck.on('step', function (k, v) { if (v && v.slide && v.slide.orig === 96 && v.custom) hot(v.custom, k >= 1); });
})();
})();
