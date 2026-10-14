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
/* #92 kahfbrowser.com headline rotator (site css px, scaled by the slide) */
'.pc-hlvp{position:relative;overflow:hidden}',
'.pc-hl{position:absolute;left:0;top:0;transform-origin:0 0;pointer-events:none}',
'.pc-hl .row{position:absolute;left:0;width:100%;display:flex;justify-content:center;align-items:flex-start}',
'.pc-hl .row>img{display:block;flex:none;height:100%;width:auto}',
'.pc-hl .rot{position:relative;flex:none;height:100%;overflow:hidden;transition:width .55s cubic-bezier(.5,.15,.1,1)}',
'.pc-hl .rot .w{position:absolute;left:0;top:0;height:100%;width:auto;max-width:none;opacity:0;transform:translateY(-100%);transition:transform .55s cubic-bezier(.5,.15,.1,1),opacity .45s}',
'.pc-hl .rot .w.on{opacity:1;transform:none}',
'.pc-hl .rot .w.out{opacity:0;transform:translateY(100%)}',

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
/* @kahfsafe social handle, shown with the kahf.co badge: overlapping Instagram / X / Facebook discs + handle; pops in just after the badge */
'.pc-soc{position:absolute;top:1004px;transform:translateY(-50%);z-index:3}',
'.pc-soc .pill{display:flex;align-items:center;gap:18px;padding:10px 32px 10px 12px;border-radius:999px;background:linear-gradient(180deg,rgba(16,26,32,.86),rgba(8,14,18,.86));box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.16),0 24px 60px -12px rgba(0,0,0,.7);backdrop-filter:blur(8px)}',
'.pc-soc .ics{display:flex}',
'.pc-soc .s{width:58px;height:58px;border-radius:50%;flex:none;display:grid;place-items:center;box-shadow:0 0 0 4px #0d151a,0 6px 16px rgba(0,0,0,.45)}',
'.pc-soc .s+.s{margin-left:-12px}',
'.pc-soc .s svg{width:30px;height:30px}',
'.pc-soc .ig{background:radial-gradient(circle at 30% 107%,#fdf497 0%,#fdf497 5%,#fd5949 45%,#d6249f 60%,#285AEB 90%)}',
'.pc-soc .x{background:#000;box-shadow:0 0 0 4px #0d151a,inset 0 0 0 1.5px rgba(255,255,255,.28),0 6px 16px rgba(0,0,0,.45)}',
'.pc-soc .fb{background:#1877F2}',
'.pc-soc .t{font:800 44px/1 var(--f-body);letter-spacing:-.015em;color:#F4F1EA}',
'.pc-soc .t i{font-style:normal;color:#F2C14E}',
'.pc-soc.go{animation:pc-soc-in .8s cubic-bezier(.3,1.4,.5,1) .3s both}',
'.pc-soc.go .s{animation:pc-soc-ic .6s cubic-bezier(.3,1.6,.5,1) both}',
'.pc-soc.go .ig{animation-delay:.55s}.pc-soc.go .x{animation-delay:.67s}.pc-soc.go .fb{animation-delay:.79s}',
'@keyframes pc-soc-in{from{opacity:0;transform:translateY(-50%) translateY(24px)}to{opacity:1;transform:translateY(-50%)}}',
'@keyframes pc-soc-ic{from{opacity:0;transform:scale(.2) rotate(-40deg)}to{opacity:1;transform:none}}',
'@media (prefers-reduced-motion:reduce){.pc-soc.go,.pc-soc.go .s{animation:none}}',

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
D.slides.forEach(function (s) { if (s.orig === 4 || s.orig === 2) s.hidden = true; });
// slide 4 (live counter), 9 (calculator) and 74 (closing night sky) are hidden in part-a / part-b; slide 67 here
if (byN[98]) byN[98].hidden = true;
if (byN[48]) byN[48].hidden = true;   // "How to treat device addiction?" title: the treat-intro chapter slide replaces it
/* topic structure (matches TOPICS in topic-bar.js):
   - 54 divider is retitled "Drugs, Grooming and Suicide"
   - 45 (Lost Screen Memorial) is moved to sit right after 55, inside that topic
   - 66-105 all belong to "Practical Protection" (the section drives overview headings + accent colours),
     except 71-74, which move to the end of "How to Treat It" */
if (byN[54]) {
  var t54 = elData(54, 'e2');             // longer title: slightly smaller + wider box so it stays on one line
  t54.paras[0].runs = [{ t: 'Drugs, Grooming and Suicide', sz: 108, c: '#F4F1EA' }];
  t54.w = 80;
}
(function () {
  var from = D.slides.indexOf(byN[45]), to = D.slides.indexOf(byN[55]);
  if (from < 0 || to < 0) return;
  var s = D.slides.splice(from, 1)[0];
  D.slides.splice(D.slides.indexOf(byN[55]) + 1, 0, s);
  s.section = 'grooming';
})();
D.slides.forEach(function (s) { if (s.orig >= 66 && s.orig <= 105) s.section = 'protect'; });
// 71-74 (make devices boring, top 10 games, violence-free games) close "How to Treat It": moved to right after 51
(function () {
  var at = D.slides.indexOf(byN[51]);
  [71, 72, 73, 74].forEach(function (n, i) {
    var s = byN[n]; if (!s || at < 0) return;
    D.slides.splice(D.slides.indexOf(s), 1);
    D.slides.splice(D.slides.indexOf(byN[51]) + 1 + i, 0, s);
    s.section = 'treat';
  });
})();
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

/* #92 (on-screen 61) kahfbrowser.com hero. media/kahfbrowser/hero-base.webp is the live hero with the headline removed;
   the headline is rebuilt from cut-outs of the site's own glyphs (hl-*.webp, 3x) laid out in the site's css px (1491 wide)
   and driven by the site's word rotator: calmer -> safer -> decent every 2.6 s, outgoing word drops out while the next
   slides in from above, rotator width + line centring ease over .55s (same curve as the site). */
(function () {
  var IW = 1491, IH = 868.1875, ROW_Y = 100, RH = 72.21875, P = 6;
  var LEFT = { w: 285.453, ml: -P, mr: -P };               // "Switch to a" incl. 6px bearing pad each side
  var GAP1 = 10.375, GAP2 = 4.36, WEB = { w: 118.984, mr: -P };
  var WORDS = [{ k: 'calmer', w: 175 }, { k: 'safer', w: 132 }, { k: 'decent', w: 175 }];
  Deck.registerSlide(92, {
    keepBase: false, loop: ['orbs'],
    render: function (el, ctx) {
      var maxW = 1660, maxH = 1000 - 46, w = Math.min(maxW, maxH * IW / IH), ih = w * IH / IW, hh = ih + 46;
      var x = (W - w) / 2, y = (H - hh) / 2, rgb = '46,186,76';
      var gl = h('div', 'pc-wglow', el); gl.style.cssText = 'left:' + (x - 160) + 'px;top:' + (y - 120) + 'px;width:' + (w + 320) + 'px;height:' + (hh + 240) + 'px;--wc:' + rgb;
      var wrap = h('div', ctx.static ? '' : 'pc-rise', el); wrap.style.cssText = 'position:absolute;inset:0';
      var win = h('div', 'pc-win' + (ctx.static ? '' : ' pc-bob'), wrap,
        '<div class="bar"><i></i><i></i><i></i><div class="url"><b>&#128274;</b>kahfbrowser.com</div></div>');
      win.style.cssText = 'left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;--wc:' + rgb;
      var vp = h('div', 'pc-hlvp', win); vp.style.height = ih + 'px';
      var im = h('img', '', vp); im.src = 'media/kahfbrowser/hero-base.webp'; im.alt = 'kahfbrowser.com home page: Switch to a calmer web'; im.style.height = ih + 'px';
      var hl = h('div', 'pc-hl', vp); hl.style.cssText = 'width:' + IW + 'px;height:' + IH + 'px;transform:scale(' + (w / IW) + ')';
      var row = h('div', 'row', hl); row.style.cssText = 'top:' + ROW_Y + 'px;height:' + RH + 'px';
      var l = h('img', '', row); l.src = 'media/kahfbrowser/hl-left.webp'; l.alt = '';
      l.style.cssText = 'width:' + LEFT.w + 'px;margin:0 ' + LEFT.mr + 'px 0 ' + LEFT.ml + 'px';
      var rot = h('div', 'rot', row); rot.style.cssText = 'width:' + WORDS[0].w + 'px;margin-left:' + GAP1 + 'px';
      var ws = WORDS.map(function (d, i) {
        var n = h('img', 'w' + (i ? '' : ' on'), rot); n.src = 'media/kahfbrowser/hl-' + d.k + '.webp'; n.alt = ''; n.style.width = d.w + 'px'; return n;
      });
      var web = h('img', '', row); web.src = 'media/kahfbrowser/hl-web.webp'; web.alt = '';
      web.style.cssText = 'width:' + WEB.w + 'px;margin:0 ' + WEB.mr + 'px 0 ' + GAP2 + 'px';
      el.__hl = { rot: rot, ws: ws };
    },
    enter: function (el, ctx) {
      var s = el.__hl; if (!s || ctx.static || ctx.reduced) return;
      var i = 0;
      s.ws.forEach(function (n, j) { n.classList.toggle('on', j === 0); n.classList.remove('out'); });
      s.rot.style.width = WORDS[0].w + 'px';
      ctx.interval(function () {
        var c = s.ws[i], n = s.ws[(i + 1) % WORDS.length];
        c.classList.remove('on'); c.classList.add('out');
        n.classList.remove('out'); n.classList.add('on');
        ctx.timeout(function () { c.classList.remove('out'); }, 650);
        i = (i + 1) % WORDS.length; s.rot.style.width = WORDS[i].w + 'px';
      }, 2600);
    }
  });
})();

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
/* 40,000+ and 300K+ count up from 0 in four steps each time the slide is entered */
function kkCount(el, ctx) {
  var ns = el.querySelectorAll('.kk-cnt');
  function put(n, v) { n.textContent = (+n.dataset.to >= 1000 ? Math.round(v).toLocaleString('en-US') : Math.round(v)) + n.dataset.k; }
  Array.prototype.forEach.call(ns, function (n) { put(n, +n.dataset.to); n.parentNode.style.minWidth = n.parentNode.offsetWidth + 'px'; });
  if (ctx.reduced) return;
  Array.prototype.forEach.call(ns, function (n) { put(n, 0); });
  var done = false;
  ctx.tick(function (dt, t) {
    if (done) return;
    var p = Math.min(1, Math.max(0, (t - 500) / 1900)), e = Math.ceil(p * 4) / 4;   // 4 jumps: 25% → 50% → 75% → 100%
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
    el.__u = [kahfUrl(el), kahfSocial(el)];
    el.__u[1].style.left = '106px';                          /* under the stats, on the hero text column */
    if (ctx.static) { var im = h('img', '', box); im.src = 'media/kahf-company-hero-poster.jpg'; im.alt = 'company.kahf.to'; return; }
    var v = h('video', '', box);
    v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'auto'; v.poster = 'media/kahf-company-hero-poster.jpg';
    v.src = 'media/kahf-company-hero-4k.mp4';
    el.__v = v;
  },
  enter: function (el, ctx) {
    var v = el.__v; if (v) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
    kahfUrlEnter(el.__u, ctx);
  }
});
/* the animated kahf.co badge (.pc-url) and @kahfsafe social handle (.pc-soc): built in render, popped in 1.2 s after entering
   (also used by the At-Tahrim 66:6 slide). kahfUrlEnter takes one node or a list. */
function kahfUrl(parent) {
  return h('div', 'pc-url', parent, '<div class="pill"><span class="halo"></span><span class="ic"><svg viewBox="0 0 48 48" fill="none" stroke="#0b2a1b" stroke-width="3.6" stroke-linecap="round"><circle cx="24" cy="24" r="18"/><path d="M6 24h36M24 6c6.5 6 6.5 30 0 36M24 6c-6.5 6-6.5 30 0 36"/></svg></span><span class="t">kahf<i>.</i>co</span></div>');
}
function kahfSocial(parent) {
  return h('div', 'pc-soc', parent, '<div class="pill"><span class="ics">' +
    '<span class="s ig" title="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.1"><rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2"/><circle cx="12" cy="12" r="4.1"/><circle cx="17.4" cy="6.6" r="1.1" fill="#fff" stroke="none"/></svg></span>' +
    '<span class="s x" title="X"><svg viewBox="0 0 24 24" fill="#fff"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.3L5.3 21H2.2l7.2-8.3L1.8 3h6.3l4.4 5.8L17.8 3zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5z"/></svg></span>' +
    '<span class="s fb" title="Facebook"><svg viewBox="0 0 24 24" fill="#fff"><path d="M13.6 21.5v-8.2h2.8l.4-3.3h-3.2V7.9c0-.9.3-1.6 1.6-1.6h1.7V3.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.3V10H7.5v3.3h2.8v8.2h3.3z"/></svg></span>' +
    '</span><span class="t"><i>@</i>kahfsafe</span></div>');
}
function kahfUrlEnter(u, ctx) {
  var us = [].concat(u).filter(Boolean);
  if (!us.length || ctx.reduced) return;
  us.forEach(function (n) { n.classList.remove('go'); n.style.opacity = '0'; });
  ctx.timeout(function () { us.forEach(function (n) { n.style.opacity = ''; void n.offsetWidth; n.classList.add('go'); }); }, 1200);
  ctx.onLeave(function () { us.forEach(function (n) { n.classList.remove('go'); n.style.opacity = ''; }); });
}
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
   waking day = 16 h. Lifetime = a 60-year life, counted from age 10 (GWI does not survey under-16s, so
   ages 10-15 are ASSUMED at the 16-24 rate), each GWI age band at its own rate (mean of female and male
   h/week x years in band, 10-59). All online media (33.5 h/week) uses the same age profile. */
(function () {
  var WK = 18.6, WEEKS = 365 / 7, LIFE = 60;
  var HY = WK * WEEKS;                                   // 970 h a year
  var BANDS = [[24 + 41 / 60, 6], [24 + 41 / 60, 9], [20.9, 10], [17 + 40 / 60, 10], [15 + 41.5 / 60, 10], [13 + 20 / 60, 5]];   // ages 10-15 (assumed at the 16-24 rate), 16-24, 25-34, 35-44, 45-54, 55-59
  var LIFE_H = BANDS.reduce(function (t, b) { return t + b[0] * WEEKS * b[1]; }, 0);   // 51,072 h
  var FEED_Y = LIFE_H / (365 * 16);                      // 8.7 waking years
  var ONL_Y = FEED_Y * 33.5 / WK;                        // 15.8 waking years, all online media
  var TOT_Y = FEED_Y * (6 + 40 / 60) * 7 / WK;          // all screen use: 6h 40m/day internet time (slide #4, Digital 2024), same age profile: 18.6
  var PF = FEED_Y / LIFE, PO = ONL_Y / LIFE, PT = TOT_Y / LIFE;   // 14.6% , 26.2% , 36.5%
  var css = [
    '.yr{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse at 76% 48%,rgba(83,32,25,.19),transparent 55%)}',
    '.yr *{box-sizing:border-box}',
    '.yr .rv{opacity:0}.yr.go .rv{animation:yr-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}.yr.static .rv{opacity:1;animation:none}',
    '@keyframes yr-rise{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}',
    '.yr-k{position:absolute;left:104px;top:67px;font:700 22px/1 var(--f-body);letter-spacing:.14em;text-transform:uppercase;color:#eac583}',
    '.yr-t{position:absolute;left:98px;top:117px;margin:0;font:600 91px/1.08 var(--f-display);letter-spacing:-.035em;white-space:nowrap}.yr-t em{color:#ff9c89}',
    '.yr-l{position:absolute;left:104px;top:304px;width:700px}.yr-l .lab{font-size:23px;letter-spacing:.075em;text-transform:uppercase;color:#bac7c6;font-weight:600}',
    '.yr-big{font:600 157px/1.05 var(--f-display);letter-spacing:-.035em;margin:20px 0 3px;white-space:nowrap;font-variant-numeric:tabular-nums;color:#f4ce8f}.yr-big small{font-size:.46em;letter-spacing:0}',
    '.yr-l .what{font-size:35px;font-weight:500;color:var(--ink)}.yr-l .who{font-size:21px;color:#adb9b8;margin-top:12px}',
    '.yr-rows{position:absolute;left:108px;top:614px;width:615px;display:flex;gap:44px}.yr-row{flex:1;border-top:1px solid #52605b;padding-top:19px}.yr-row b{display:block;font:600 61px/1 var(--f-display);font-variant-numeric:tabular-nums;color:var(--ink)}.yr-row span{display:block;margin-top:12px;font-size:24px;color:#bdc9c5;line-height:1.35}',
    '.yr-lifetime{position:absolute;left:900px;top:300px;width:916px;padding-left:62px;border-left:1px solid #44544d;opacity:0;transform:translateX(90px);transition:opacity .7s ease,transform 1s cubic-bezier(.16,.9,.24,1)}',
    '.yr.r1 .yr-lifetime,.yr.static .yr-lifetime,.yr.reduced .yr-lifetime{opacity:1;transform:none}',
    '.yr-lifetime::before{content:"";position:absolute;left:-1px;top:0;bottom:0;width:2px;background:linear-gradient(#ff9c89,#ff6a55 60%,transparent);transform:scaleY(0);transform-origin:top;opacity:.9}',
    '.yr.r1 .yr-lifetime::before{animation:yr-line 1.3s cubic-bezier(.5,0,.2,1) .1s both}',
    '.yr.static .yr-lifetime::before,.yr.reduced .yr-lifetime::before{animation:none;transform:none;opacity:.35}',
    '@keyframes yr-line{0%{transform:scaleY(0);opacity:.95}70%{transform:scaleY(1);opacity:.95}100%{transform:scaleY(1);opacity:.35}}',
    '.yr-lifetime .hd{font-size:23px;letter-spacing:.065em;text-transform:uppercase;color:#bac7c6;font-weight:600}',
    '.yr-years{margin:13px 0 0;font:600 164px/.98 var(--f-display);letter-spacing:-.045em;color:#ff927d;font-variant-numeric:tabular-nums;white-space:nowrap;transform-origin:0 60%}.yr-years small{font:500 61px/1 var(--f-display);letter-spacing:-.025em;margin-left:18px}',
    '.yr-years i{font-style:normal}.yr-description{font-size:30px;margin:5px 0 0;color:var(--ink)}.yr-model{font-size:20px;color:#b8c7c1;margin-top:12px}',
    /* staged reveal of the right-hand panel: header, years slam, caption lines, pie, slice pull-out */
    '.yr-lifetime .st{opacity:0}',
    '.yr.r1 .yr-lifetime .st{animation:yr-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '.yr.r1 .yr-lifetime .yr-years{animation:yr-slam 1.05s cubic-bezier(.2,.85,.25,1) .5s both}',
    '@keyframes yr-slam{0%{opacity:0;transform:scale(2.6) translateX(40px);filter:blur(26px);text-shadow:0 0 0 rgba(255,120,90,0)}38%{opacity:1;filter:blur(0)}58%{transform:scale(.93);text-shadow:0 0 70px rgba(255,120,90,.95)}78%{transform:scale(1.035)}100%{opacity:1;transform:none;filter:none;text-shadow:0 0 0 rgba(255,120,90,0)}}',
    '.yr.static .yr-lifetime .st,.yr.reduced .yr-lifetime .st,.yr.static .yr-lifetime .yr-years,.yr.reduced .yr-lifetime .yr-years{opacity:1;animation:none}',
    '.yr-pie{position:relative;width:800px;height:337px;margin-top:4px}.yr-pie svg{position:absolute;inset:0;width:100%;height:100%;overflow:visible;transition:opacity .8s ease,transform .9s cubic-bezier(.22,.8,.3,1)}',
    '.yr-pie .pie0{opacity:1}.yr-pie .pie1{opacity:0;transform:translateY(8px)}.yr.s1 .yr-pie .pie0{opacity:0;transform:translateY(-8px)}.yr.s1 .yr-pie .pie1{opacity:1;transform:none}',
    '.yr-pie .pie-body{opacity:0;transform-origin:400px 200px}',
    '.yr.p1 .yr-pie .pie-body{animation:yr-pie-grow 1.35s cubic-bezier(.22,.8,.3,1) both}',
    '@keyframes yr-pie-grow{0%{opacity:0;transform:translateY(54px) scale(.1,.015)}22%{opacity:1}62%{transform:translateY(-8px) scale(1.08,1.12)}82%{transform:translateY(2px) scale(.985)}100%{opacity:1;transform:none}}',
    '.yr-pie .pie-slice{transform-origin:400px 147px}',
    '.yr.a1 .yr-pie .pie-slice{animation:yr-pop 1.25s cubic-bezier(.2,.8,.3,1) both}',
    '@keyframes yr-pop{0%{transform:translateY(0) scale(1)}34%{transform:translateY(-10px) scale(1.02)}62%{transform:translateY(52px) scale(1.045)}82%{transform:translateY(40px) scale(1.01)}100%{transform:translateY(44px) scale(1)}}',
    '.yr-pie .pie-halo{opacity:0}.yr.a1 .yr-pie .pie-halo{animation:yr-halo 1.6s ease-out .1s both}',
    '@keyframes yr-halo{0%{opacity:0;transform:scale(.6)}40%{opacity:1}100%{opacity:.85;transform:scale(1)}}',
    '.yr-pie .pie-halo,.yr-pie .pie-ring{transform-origin:400px 220px}',
    '.yr-pie .pie-ring{opacity:0}.yr.a1 .yr-pie .pie-ring{animation:yr-ring 1.2s cubic-bezier(.1,.7,.3,1) both}',
    '@keyframes yr-ring{0%{opacity:.95;transform:scale(.5)}100%{opacity:0;transform:scale(1.55)}}',
    '.yr-pie .pie-percent,.yr-pie .pie-label{opacity:0}.yr.a1 .yr-pie .pie-percent,.yr.a1 .yr-pie .pie-label{animation:yr-fade .5s ease .3s both}',
    '@keyframes yr-fade{from{opacity:0}to{opacity:1}}',
    '.yr-pie .pie-percent{font:600 61px/1 var(--f-display);fill:#fff3e5;paint-order:stroke;stroke:#9b352d;stroke-width:1px;font-variant-numeric:tabular-nums}.yr-pie .pie-label{font:600 18px var(--f-body);letter-spacing:.13em;fill:#ffe1d3}',
    '.yr .yr-cap{opacity:0;transform:translateY(18px);transition:opacity .7s ease,transform .8s cubic-bezier(.22,.8,.3,1)}.yr.c1 .yr-cap,.yr.static .yr-cap,.yr.reduced .yr-cap{opacity:1;transform:none}',
    /* click 2/3 while the show is still running: jump every staged animation to its end state */
    '.yr.fin .yr-lifetime .st,.yr.fin .yr-lifetime .yr-years,.yr.fin .yr-pie .pie-body,.yr.fin .yr-pie .pie-slice,.yr.fin .yr-pie .pie-halo,.yr.fin .yr-pie .pie-ring,.yr.fin .yr-pie .pie-percent,.yr.fin .yr-pie .pie-label,.yr.fin .yr-lifetime::before{animation-duration:.01s!important;animation-delay:0s!important}',
    '.yr.fin .yr-cap{transition-duration:.01s!important}',
    '.yr.static .yr-pie .pie-body,.yr.reduced .yr-pie .pie-body{opacity:1;animation:none}',
    '.yr.static .yr-pie .pie-slice,.yr.reduced .yr-pie .pie-slice{animation:none;transform:translateY(44px)}',
    '.yr.static .yr-pie .pie-halo,.yr.reduced .yr-pie .pie-halo{animation:none;opacity:.85}.yr.static .yr-pie .pie-ring,.yr.reduced .yr-pie .pie-ring{animation:none;opacity:0}',
    '.yr.static .yr-pie .pie-percent,.yr.static .yr-pie .pie-label,.yr.reduced .yr-pie .pie-percent,.yr.reduced .yr-pie .pie-label{animation:none;opacity:1}',
    '.yr.reduced.a1 .yr-pie .pie-slice{transform:translateY(44px)}',
    '.yr-cap{margin-top:0;font:500 38px/1.18 var(--f-display);color:var(--ink)}.yr-cap em{font-style:normal;color:#ff9c89}',
    '.yr-sw .v1{display:none}.yr.s1 .yr-sw .v0{display:none}.yr.s1 .yr-sw .v1{display:inline-block}',
    '.yr-src{position:absolute;right:84px;bottom:28px;font-size:16px;color:#a5b3af;text-align:right;max-width:1130px;line-height:1.35;z-index:41}',
    '.yr.static *,.yr.static *::before,.yr.static *::after{transition:none!important}',
    '.yr.reduced .rv{opacity:1;animation:none}.yr.reduced *,.yr.reduced *::after{transition:none!important;animation:none!important}',
    '@media (prefers-reduced-motion:reduce){.yr *,.yr *::after{transition:none!important;animation:none!important}}',
  ].join('\n');
  (function () { if (document.getElementById('pc-yr-css')) return; var st = document.createElement('style'); st.id = 'pc-yr-css'; st.textContent = css; document.head.appendChild(st); })();

  function inN(p) { return Math.ceil(1 / p); }   // 26% -> 4 ("more than 1 in 4"), 37% -> 3
  function fmt(n, d) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }

  // Elliptical sectors with a solid extruded rim; both states use the exact modelled fraction.
  var pieSerial = 0;
  // clock-wipe wedge (from 12 o'clock, clockwise), k = 0..1; used as the pie's mask
  function sweepPath(k) {
    var R = 420;
    if (k <= 0) return '';
    if (k >= .9999) return 'M' + (-R) + ' 0A' + R + ' ' + R + ' 0 1 1 ' + R + ' 0A' + R + ' ' + R + ' 0 1 1 ' + (-R) + ' 0Z';
    var a = k * 2 * Math.PI - Math.PI / 2;
    return 'M0 0L0 ' + (-R) + 'A' + R + ' ' + R + ' 0 ' + (k > .5 ? 1 : 0) + ' 1 ' + (R * Math.cos(a)).toFixed(2) + ' ' + (R * Math.sin(a)).toFixed(2) + 'Z';
  }
  function lifePie(fraction, state, instant) {
    var uid = 'yr-pie-' + (++pieSerial), cx = 400, cy = 147, rx = 307, ry = 121;
    var half = Math.PI * fraction, start = Math.PI / 2 - half, end = Math.PI / 2 + half;
    function point(a) { return (cx + rx * Math.cos(a)).toFixed(3) + ' ' + (cy + ry * Math.sin(a)).toFixed(3); }
    var wedge = 'M' + cx + ' ' + cy + ' L' + point(start) + ' A' + rx + ' ' + ry + ' 0 0 1 ' + point(end) + ' Z';
    var rest = 'M' + cx + ' ' + cy + ' L' + point(end) + ' A' + rx + ' ' + ry + ' 0 1 1 ' + point(start) + ' Z';
    var defs = '<defs>' +
      '<linearGradient id="' + uid + '-blue" x1="0" y1="0" x2=".8" y2="1"><stop stop-color="#a2f1ed"/><stop offset=".38" stop-color="#50c4cc"/><stop offset="1" stop-color="#147b8b"/></linearGradient>' +
      '<linearGradient id="' + uid + '-red" x1="0" y1="0" x2=".6" y2="1"><stop stop-color="#ffc18d"/><stop offset=".32" stop-color="#ff795c"/><stop offset="1" stop-color="#d63f40"/></linearGradient>' +
      '<linearGradient id="' + uid + '-rim" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#104a56"/><stop offset=".5" stop-color="#236a72"/><stop offset="1" stop-color="#092f3a"/></linearGradient>' +
      '<linearGradient id="' + uid + '-cut" x1="0" y1="0" x2="1" y2="0"><stop stop-color="#8b272e"/><stop offset=".5" stop-color="#bd4540"/><stop offset="1" stop-color="#722331"/></linearGradient>' +
      '<radialGradient id="' + uid + '-shadow"><stop stop-color="#000" stop-opacity=".65"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>' +
      '<radialGradient id="' + uid + '-halo"><stop stop-color="#ff6a4d" stop-opacity=".62"/><stop offset=".6" stop-color="#ff5a45" stop-opacity=".2"/><stop offset="1" stop-color="#ff5a45" stop-opacity="0"/></radialGradient></defs>';
    function solid(path, top, side) {
      var out = '';
      for (var depth = 35; depth > 0; depth--) out += '<path d="' + path + '" transform="translate(0 ' + depth + ')" fill="url(#' + uid + '-' + side + ')"/>';
      return out + '<path d="' + path + '" fill="url(#' + uid + '-' + top + ')" stroke="#fff" stroke-opacity=".2" stroke-width="1.2"/>';
    }
    var pct = Math.round(fraction * 100);
    // blue pie + red wedge sit inside one sweep-masked body (radial clock-wipe); the red wedge is the part that pulls out
    return '<svg class="pie' + state + '" viewBox="0 0 800 360" focusable="false">' + defs +
      '<mask id="' + uid + '-m" maskUnits="userSpaceOnUse" x="-100" y="-120" width="1000" height="620"><g transform="translate(400 147) scale(1 .7)">' +
        '<path class="yr-wipe" fill="#fff" d="' + sweepPath(instant ? 1 : 0) + '"/></g></mask>' +
      '<g class="pie-body">' +
        '<ellipse cx="400" cy="284" rx="365" ry="73" fill="url(#' + uid + '-shadow)"/>' +
        '<ellipse class="pie-halo" cx="400" cy="262" rx="300" ry="104" fill="url(#' + uid + '-halo)"/>' +
        '<g mask="url(#' + uid + '-m)">' + solid(rest, 'blue', 'rim') + '<g class="pie-slice">' + solid(wedge, 'red', 'cut') +
        '<text class="pie-percent" data-v="' + pct + '" x="400" y="236" text-anchor="middle">' + pct + '%</text>' +
        '<text class="pie-label" x="400" y="262" text-anchor="middle">ONLINE</text></g></g>' +
        '<ellipse class="pie-ring" cx="400" cy="220" rx="330" ry="130" fill="none" stroke="#ff8a70" stroke-width="3"/>' +
      '</g></svg>';
  }

  // ---- staged reveal helpers (timers/intervals tracked on the slide element so Back / skip-ahead can cancel)
  var T_PIE = 2500, T_POP = 4350, T_CAP = 5350;
  function yrClear(el) {
    (el.__yrT || []).forEach(clearTimeout); (el.__yrI || []).forEach(clearInterval); el.__yrT = []; el.__yrI = [];
  }
  function yrSweep(r, k) {   // CSS animations do not run inside <mask>, so the clock-wipe is set from script
    var d = sweepPath(k);
    [].forEach.call(r.querySelectorAll('.yr-wipe'), function (c) { c.setAttribute('d', d); });
  }
  function yrSetNums(r, years) {
    var v0 = r.querySelector('.yr-years .v0'); if (v0) v0.textContent = fmt(years, 1);
    [].forEach.call(r.querySelectorAll('.pie-percent'), function (t) { t.textContent = t.getAttribute('data-v') + '%'; });
  }
  function yrReset(el, r) { yrClear(el); yrSetNums(r, ONL_Y); yrSweep(r, 0); }
  function yrFinish(el, r) {
    yrClear(el); yrSetNums(r, ONL_Y); yrSweep(r, 1);
    r.classList.add('fin', 'r1', 'p1', 'a1', 'c1');
  }
  function countUp(el, ctx, ms, fn, inOut) {
    var t0 = performance.now(), id = ctx.interval(function () {
      var p = Math.min(1, (performance.now() - t0) / ms);
      fn(inOut ? (p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2) : 1 - Math.pow(1 - p, 3));   // ease-in-out / ease-out cubic
      if (p >= 1) clearInterval(id);
    }, 33);
    el.__yrI.push(id);
  }
  function yrShow(el, r, ctx) {
    yrClear(el);
    var v0 = r.querySelector('.yr-years .v0'), pcts = [].slice.call(r.querySelectorAll('.pie-percent'));
    v0.textContent = fmt(0, 1);
    r.classList.add('r1');
    // the number slams in at 0.5 s; let it count up while it lands
    el.__yrT.push(ctx.timeout(function () { countUp(el, ctx, 1500, function (k) { v0.textContent = fmt(ONL_Y * k, 1); }); }, 500));
    el.__yrT.push(ctx.timeout(function () { r.classList.add('p1'); countUp(el, ctx, 1500, function (k) { yrSweep(r, k); }, true); }, T_PIE + 120));
    el.__yrT.push(ctx.timeout(function () {
      r.classList.add('a1');
      pcts.forEach(function (t) { t.textContent = '0%'; });
      countUp(el, ctx, 1100, function (k) { pcts.forEach(function (t) { t.textContent = Math.round(t.getAttribute('data-v') * k) + '%'; }); });
    }, T_POP));
    el.__yrT.push(ctx.timeout(function () { r.classList.add('c1'); }, T_CAP));
  }

  Deck.insertSlide({
    after: 4, id: 'year-gone', title: 'Where does your life go?', section: 'problem', tr: { type: 'slide', ms: 1000 }, loop: false, steps: 2,
    notes: 'Newest data: DataReportal Digital 2026 Global Overview (GWI survey, data up to Oct 2025). The average internet user aged 16+ spends 18 hours 36 minutes every week just on social media and online video, not counting Netflix or TV streaming. ' +
      'That is 970 hours a year, 1 in 6 of your waking hours. ' +
      '[click: the 60-year view comes in big: the years number slams in, the pie grows, then the online slice pulls away] Now take a 60-year life, only the hours you are awake, counting from age 10, because children are online long before they turn 16. Adding up the real time online for each age group, even though people use less as they get older, comes to ' + fmt(ONL_Y, 1) + ' years: more than 1 in ' + inN(PO) + ' of all your waking hours, spent online. ' +
      '[click] And if we add ALL internet use, the 6 hours 40 minutes a day from Digital 2024, it grows to ' + fmt(TOT_Y, 1) + ' years: more than 1 in ' + inN(PT) + ' waking hours of your life on a screen. ' +
      'Defending the numbers: 18.6 h x 52.14 weeks = 970 h a year. Lifetime: GWI hours/week by age band (mean of women and men) x 52.14 x years in band: 10-15 24.7h x 6 (ASSUMPTION: GWI does not survey under-16s, so ages 10-15 are set at the 16-24 rate), 16-24 24.7h x 9, 25-34 20.9h x 10, 35-44 17.7h x 10, 45-54 15.7h x 10, 55-59 13.3h x 5 = ' + fmt(LIFE_H) + ' h; / (16 h x 365) = ' + fmt(FEED_Y, 1) + ' waking years = ' + fmt(PF * 100, 1) + '% of 60 x 365 x 16 waking hours (kids\' longer sleep not adjusted for). All online media (33.5 h/week, DataReportal) scaled by the same age profile = ' + fmt(ONL_Y, 1) + ' years (' + fmt(PO * 100, 1) + '%). All internet use 6h 40m/day (Digital 2024, slide 4) same way = ' + fmt(TOT_Y, 1) + ' years (' + fmt(PT * 100, 1) + '%).',
    render: function (el, ctx) {
      var r = document.createElement('div'); r.className = 'yr' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''); el.appendChild(r);
      r.innerHTML =
        '<div class="yr-k rv" style="--d:.05s">The cost of “just one more”</div>' +
        '<h1 class="yr-t rv" style="--d:.15s">A little scrolling. <em>A lot of life.</em></h1>' +
        '<div class="yr-l"><div class="lab rv" style="--d:.3s">Social media + online video</div>' +
          '<div class="yr-big rv" style="--d:.4s"><span class="n">18</span><small>h</small> <span class="m">36</span><small>m</small></div>' +
          '<div class="what rv" style="--d:.5s">every single week.</div><div class="who rv" style="--d:.5s">Average internet user, aged 16+</div></div>' +
        '<div class="yr-rows rv" style="--d:.7s"><div class="yr-row"><b>' + fmt(HY) + ' h</b><span>every year</span></div><div class="yr-row"><b>1 in 6</b><span>of your waking hours</span></div></div>' +
        '<div class="yr-lifetime"><div class="hd st" style="--d:.15s">Zoom out to a 60-year life</div>' +
          '<div class="yr-years yr-sw"><i class="v0">' + fmt(ONL_Y, 1) + '</i><i class="v1">' + fmt(TOT_Y, 1) + '</i><small>years</small></div>' +
          '<div class="yr-description st" style="--d:1.95s">of waking life spent online.</div>' +
          '<div class="yr-model yr-sw st" style="--d:2.15s"><span class="v0">All online media · modelled estimate</span><span class="v1">All internet use · modelled estimate</span></div>' +
          '<div class="yr-pie" aria-hidden="true">' + lifePie(PO, 0, ctx.static || ctx.reduced) + lifePie(PT, 1, ctx.static || ctx.reduced) + '</div>' +
          '<div class="yr-cap yr-sw"><span class="v0">More than <em>1 in ' + inN(PO) + '</em> waking hours.</span><span class="v1">More than <em>1 in ' + inN(PT) + '</em> waking hours.</span></div></div>' +
        '<div class="yr-src">GWI Q2 2025, via DataReportal Digital 2026. Model: 60-year life; 16 waking h/day; counted from age 10 (ages 10–15 assumed at the 16–24 rate, as GWI does not survey under-16s); age-specific usage. All online media: 33.5 h/week (2026). All internet use: 6h 40m/day (2024), same age profile.</div>';
      var box = document.createElement('div'); box.className = 'chips';
      var a2 = document.createElement('a'); a2.className = 'chip'; a2.href = 'https://datareportal.com/reports/digital-2026-global-overview-report'; a2.target = '_blank'; a2.rel = 'noopener'; a2.setAttribute('data-noadvance', '');
      a2.innerHTML = '<b>source</b><span>datareportal.com/reports/digital-2026-global-overview-report</span>'; box.appendChild(a2); r.appendChild(box);
      el.__yr = r;
      if (!ctx.static) { void r.offsetWidth; r.classList.add('go'); }
    },
    enter: function (el, ctx) {
      var r = el.__yr; if (!r) return;
      if (ctx.reduced) return;
      var n = r.querySelector('.yr-big .n'), m = r.querySelector('.yr-big .m'), DUR = 1800, JUMPS = 5, TOTAL = 18 * 60 + 36;
      n.textContent = '0'; m.textContent = '00';
      for (var i = 1; i <= JUMPS; i++) {
        (function (jump) {
          ctx.timeout(function () {
            var tot = Math.round(TOTAL * jump / JUMPS), mm = tot % 60;
            n.textContent = Math.floor(tot / 60); m.textContent = (mm < 10 ? '0' : '') + mm;
          }, DUR * jump / JUMPS);
        })(i);
      }
    },
    // click 1 stages the right-hand life view: panel in (r1) + years slam & count-up, pie grows with a radial
    // sweep (p1), the online slice pulls out with a shockwave and the % counts up (a1), caption lands (c1).
    // Click 2 swaps to all internet use (s1) and first jumps any unfinished build to its end state (fin).
    step: function (el, i, ctx) {
      var r = el.__yr; if (!r) return;
      if (i === 1) {
        if (ctx && ctx.timeout && ctx.interval && !ctx.reduced && !ctx.static) yrShow(el, r, ctx);
        else { yrFinish(el, r); }
      } else { yrFinish(el, r); r.classList.add('s' + (i - 1)); }
    },
    unstep: function (el, i) {
      var r = el.__yr; if (!r) return;
      if (i === 1) { yrReset(el, r); r.classList.remove('r1', 'p1', 'a1', 'c1', 'fin'); }
      else r.classList.remove('s' + (i - 1));
    }
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

/* ---------------------------------------------------------------- 16. #87 four major threats
   replaces the Kahf Browser poster with a 2x2 grid of threat cards, one per click */
(function () {
  var css = [
    '.pc87-k{position:absolute;left:0;right:0;top:70px;text-align:center;font:800 26px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--muted)}',
    '.pc87-t{position:absolute;left:0;right:0;top:112px;margin:0;text-align:center;font:600 92px/1.05 var(--f-display);letter-spacing:-.025em;color:var(--ink)}',
    '.pc87-t em{font-style:italic;color:var(--red);text-shadow:0 0 40px rgba(255,77,77,.4)}',
    '.pc87{position:absolute;left:150px;top:290px;width:1620px;display:grid;grid-template-columns:1fr 1fr;gap:36px}',
    '.pc87 .cd{position:relative;display:flex;gap:36px;align-items:center;height:330px;box-sizing:border-box;padding:0 48px 0 44px;border-radius:30px;overflow:hidden;',
    '  background:linear-gradient(140deg,rgba(var(--c),.16),rgba(255,255,255,.025) 60%);border:1.5px solid rgba(var(--c),.45);',
    '  box-shadow:0 0 50px rgba(var(--c),.12),0 22px 60px rgba(0,0,0,.4);transition:opacity .7s var(--ease),transform .7s var(--ease)}',
    '.pc87 .cd.off{opacity:0;transform:translateY(40px) scale(.97)}',
    '.pc87 .ic{flex:none;width:150px;height:150px;border-radius:36px;display:grid;place-items:center;background:rgba(var(--c),.16);',
    '  box-shadow:inset 0 0 0 2px rgba(var(--c),.55),0 0 40px rgba(var(--c),.3)}',
    '.pc87 .ic svg{width:88px;height:88px;color:rgb(var(--c));filter:drop-shadow(0 0 12px rgba(var(--c),.6))}',
    '.pc87 .no{position:absolute;right:34px;top:22px;font:700 120px/1 var(--f-display);color:rgba(var(--c),.13)}',
    '.pc87 .hd{font:600 52px/1.08 var(--f-display);letter-spacing:-.015em;color:var(--ink)}',
    '.pc87 .sb{margin-top:14px;font:400 30px/1.35 var(--f-body);color:var(--ink2)}',
    '.pc87-t.pre{opacity:0}.pc87-k.pre{opacity:0}',
    '.pc87-t.go,.pc87-k.go{animation:pc96-in .8s var(--ease) both}',
    '.pc87.inst .cd{transition:none}'
  ].join('\n');
  if (!document.getElementById('pc87-css')) { var st = document.createElement('style'); st.id = 'pc87-css'; st.textContent = css; document.head.appendChild(st); }

  var S = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
  var CARDS = [
    { c: '255,77,77', hd: 'Harmful websites', sb: 'Adult, gambling, violent and scam sites are one search away.',
      ic: S + '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/><path d="M5.6 5.6l12.8 12.8" stroke-width="2.6"/></svg>' },
    { c: '190,120,255', hd: 'Haram images &amp; videos', sb: 'In the browser: image search, ads and autoplay previews slip through.',
      ic: S + '<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="1.8"/><path d="M21 16l-5-5-9 9"/><path d="M2 2l20 20" stroke-width="2.6"/></svg>' },
    { c: '255,176,32', hd: 'Excessive time on social media', sb: 'Endless feeds engineered to keep kids scrolling for hours.',
      ic: S + '<path d="M6 3h12M6 21h12"/><path d="M7 3v3a5 5 0 0 0 10 0V3M7 21v-3a5 5 0 0 1 10 0v3"/><path d="M10 18.5h4"/></svg>' },
    { c: '255,42,42', hd: 'Harmful videos on YouTube', sb: 'The algorithm keeps serving the next, more extreme video.',
      ic: '<svg viewBox="0 0 90 64"><rect x="2" y="2" width="86" height="60" rx="16" fill="none" stroke="currentColor" stroke-width="5"/><path d="M36 18v28l24-14z" fill="currentColor"/></svg>' }
  ];

  function show(el, k) { var c = el.__cards; if (c) c.forEach(function (n, i) { n.classList.toggle('off', i >= k); }); }
  if (byN[87]) {
    byN[87].steps = [];
    byN[87].notes = 'Before we look at the protections, here are the four big threats we need to guard against: ' +
      'harmful websites, haram images and videos in the browser, excessive time on social media, and harmful videos on YouTube. ' +
      'The next few slides tackle each one.';
  }
  Deck.registerSlide(87, {
    title: 'Four major threats', steps: 4,
    render: function (el, ctx) {
      var anim = !ctx.static && !ctx.reduced && !cameBack;
      var k = h('div', 'pc87-k' + (anim ? ' pre' : ''), el, 'What we need to protect against');
      var t = h('h2', 'pc87-t' + (anim ? ' pre' : ''), el, 'Four <em>major</em> threats');
      var g = h('div', 'pc87 inst', el, CARDS.map(function (c, i) {
        return '<div class="cd off" style="--c:' + c.c + '"><div class="no">' + (i + 1) + '</div><div class="ic">' + c.ic + '</div>' +
          '<div><div class="hd">' + c.hd + '</div><div class="sb">' + c.sb + '</div></div></div>';
      }).join(''));
      el.__cards = [].slice.call(g.children);
      if (ctx.static) show(el, 4);
      void g.offsetWidth; g.classList.remove('inst');
      if (anim) el.__go = function () { [k, t].forEach(function (n) { n.classList.remove('pre'); n.classList.add('go'); }); };
    },
    enter: function (el) { if (el.__go) { el.__go(); el.__go = null; } },
    step: function (el, i) { show(el, i); },
    unstep: function (el, i) { show(el, i - 1); }
  });
})();

/* ---------------------------------------------------------------- 17. NEW built-in parental controls (after #87)
   Google Family Link / Microsoft Family Safety / Apple Screen Time, one column each with a real settings screenshot.
   Each click spotlights one of the three website-blocking features across all three apps. */
(function () {
  var css = [
    '.pcfl-k{position:absolute;left:0;right:0;top:52px;text-align:center;font:800 24px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--muted)}',
    '.pcfl-t{position:absolute;left:0;right:0;top:90px;margin:0;text-align:center;font:600 80px/1.05 var(--f-display);letter-spacing:-.025em;color:var(--ink)}',
    '.pcfl-t em{font-style:italic;color:var(--cyan);text-shadow:0 0 40px rgba(34,211,238,.4)}',
    '.pcfl-fs{position:absolute;left:0;right:0;top:204px;display:flex;justify-content:center;gap:22px}',
    '.pcfl-f{display:flex;align-items:center;gap:14px;padding:12px 28px 12px 14px;border-radius:999px;font:600 28px/1 var(--f-body);color:var(--ink);',
    '  background:rgba(var(--c),.10);border:1.5px solid rgba(var(--c),.4);transition:opacity .5s var(--ease),box-shadow .5s var(--ease),background .5s var(--ease),transform .5s var(--ease)}',
    '.pcfl-n{flex:none;display:grid;place-items:center;width:42px;height:42px;border-radius:50%;font:800 23px/1 var(--f-body);color:#05080B;background:rgb(var(--c))}',
    '.pcfl.act .pcfl-f{opacity:.38}',
    '.pcfl.act .pcfl-f.on{opacity:1;background:rgba(var(--c),.22);box-shadow:0 0 40px rgba(var(--c),.45);transform:scale(1.05)}',
    '.pcfl-g{position:absolute;left:110px;top:290px;width:1700px;display:grid;grid-template-columns:repeat(3,1fr);gap:34px}',
    '.pcfl-cd{position:relative;box-sizing:border-box;height:760px;padding:22px 24px 18px;border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.02) 55%);',
    '  border:1.5px solid rgba(255,255,255,.12);box-shadow:0 22px 60px rgba(0,0,0,.45)}',
    '.pcfl-hd{display:flex;align-items:center;gap:16px;height:62px}',
    '.pcfl-lg{flex:none;width:56px;height:56px;border-radius:15px;display:grid;place-items:center;background:#fff}',
    '.pcfl-lg svg{width:34px;height:34px}',
    '.pcfl-nm{font:700 31px/1.1 var(--f-body);color:var(--ink);letter-spacing:-.01em}',
    '.pcfl-pl{margin-top:5px;font:500 19px/1 var(--f-body);color:var(--muted);letter-spacing:.04em}',
    '.pcfl-st{position:relative;height:430px;margin:14px 0 12px}',
    '.pcfl-sh{position:absolute;top:50%;left:50%;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 18px 44px rgba(0,0,0,.55);',
    '  transform:translate(-50%,-50%);transition:transform .7s var(--ease),opacity .7s var(--ease),z-index 0s .35s}',
    '.pcfl-sh img{display:block;width:100%;height:100%}',
    '.pcfl-sh.ph{border-radius:22px;background:#f2f2f7}',
    '.pcfl-sh.bk{transform:translate(calc(-50% + var(--dx)),-50%) scale(.9);opacity:.55;z-index:1}',
    '.pcfl-sh.fr{transform:translate(calc(-50% + var(--dx)),-50%);opacity:1;z-index:2}',
    '.pcfl-hl{position:absolute;border-radius:10px;border:3px solid rgb(var(--c));box-shadow:0 0 0 2000px rgba(5,8,11,.42),0 0 26px rgba(var(--c),.8),inset 0 0 18px rgba(var(--c),.35);',
    '  opacity:0;transition:opacity .5s var(--ease)}',
    '.pcfl-hl.on{opacity:1;animation:pcfl-pulse 1.8s ease-in-out .5s infinite}',
    '@keyframes pcfl-pulse{50%{box-shadow:0 0 0 2000px rgba(5,8,11,.42),0 0 44px rgba(var(--c),1),inset 0 0 22px rgba(var(--c),.5)}}',
    '.pcfl-rw{display:flex;align-items:center;gap:14px;min-height:68px;padding:4px 14px;border-radius:14px;font:600 23px/1.2 var(--f-body);color:var(--ink2);',
    '  transition:opacity .5s var(--ease),background .5s var(--ease),color .5s var(--ease)}',
    '.pcfl-rw .pcfl-n{width:34px;height:34px;font-size:19px}',
    '.pcfl.act .pcfl-rw{opacity:.32}',
    '.pcfl.act .pcfl-rw.on{opacity:1;color:var(--ink);background:rgba(var(--c),.16);box-shadow:inset 0 0 0 1.5px rgba(var(--c),.55)}',
    '.pcfl .pre{opacity:0}',
    '.pcfl .go{animation:pcfl-in .8s var(--ease) both}',
    '@keyframes pcfl-in{from{opacity:0;transform:translateY(34px)}to{opacity:1;transform:none}}',
    '.pcfl.inst *{transition:none!important}',
    '@media (prefers-reduced-motion:reduce){.pcfl-hl.on{animation:none}}'
  ].join('\n');
  if (!document.getElementById('pcfl-css')) { var st = document.createElement('style'); st.id = 'pcfl-css'; st.textContent = css; document.head.appendChild(st); }

  var FEAT = [
    { c: '255,77,77', t: 'Auto-block adult sites' },
    { c: '255,176,32', t: 'Block specific sites' },
    { c: '46,229,157', t: 'Allow only approved sites' }
  ];
  // hl: [left, top, width, height] in % of the screenshot, one per feature (null = not on this screenshot)
  var APPS = [
    { nm: 'Google Family Link', pl: 'Android · Chromebook · Chrome',
      lg: '<svg viewBox="0 0 24 24"><circle cx="7" cy="7" r="4.2" fill="#4285F4"/><circle cx="17" cy="7" r="4.2" fill="#EA4335"/><circle cx="7" cy="17" r="4.2" fill="#34A853"/><circle cx="17" cy="17" r="4.2" fill="#FBBC04"/></svg>',
      rows: ['Try to block explicit sites', 'Manage sites &rarr; Blocked sites', 'Only allow approved sites'],
      shots: [{ src: 'media/parental/familylink-chrome.webp', w: 287, h: 430, dx: 0, fs: [1, 2, 3],
        hl: [[2.5, 12.3, 94, 13.6], [2.5, 88.4, 94, 8.4], [2.5, 30.3, 94, 12.6]] }] },
    { nm: 'Microsoft Family Safety', pl: 'Windows · Xbox · Edge',
      lg: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="9.5" height="9.5" fill="#F25022"/><rect x="12.5" y="2" width="9.5" height="9.5" fill="#7FBA00"/><rect x="2" y="12.5" width="9.5" height="9.5" fill="#00A4EF"/><rect x="12.5" y="12.5" width="9.5" height="9.5" fill="#FFB900"/></svg>',
      rows: ['Filter inappropriate websites and searches', 'Blocked sites &rarr; Add a website', 'Only use allowed websites'],
      shots: [{ src: 'media/parental/ms-family-filters.webp', w: 500, h: 227, dx: 0, fs: [1, 2, 3],
        hl: [[2, 25.5, 96, 23.5], [2, 81, 96, 19], [2, 56, 96, 20]] }] },
    { nm: 'Apple Screen Time', pl: 'iPhone · iPad · Mac',
      lg: '<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="6" fill="#5E5CE6"/><path d="M8 5.5h8M8 18.5h8M9 5.5v2.2a3 3 0 0 0 6 0V5.5M9 18.5v-2.2a3 3 0 0 1 6 0v2.2" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round"/></svg>',
      rows: ['Limit Adult Websites', 'Apps &amp; Websites &rarr; Blocked', 'Approved Websites Only'],
      shots: [
        { src: 'media/parental/ios-blocked.webp', w: 297, h: 430, dx: 90, fs: [2], ph: true,
          hl: [null, [50.2, 63.6, 35.6, 6.8], null] },
        { src: 'media/parental/ios-web-filtering.webp', w: 297, h: 430, dx: -90, fs: [1, 3], ph: true, def: true,
          hl: [[14.3, 35.2, 71.4, 7.2], null, [14.3, 28.5, 71.4, 7.2]] }] }
  ];

  function set(el, k) {
    var r = el.__pcfl; if (!r) return;
    r.classList.toggle('act', k > 0);
    [].forEach.call(r.querySelectorAll('[data-k]'), function (n) { n.classList.toggle('on', +n.getAttribute('data-k') === k); });
    [].forEach.call(r.querySelectorAll('.pcfl-st'), function (stg) {
      var shots = [].slice.call(stg.querySelectorAll('.pcfl-sh')); if (shots.length < 2) return;
      var front = shots.filter(function (s) { return k > 0 && s.getAttribute('data-fs').indexOf(k) >= 0; })[0] ||
        shots.filter(function (s) { return s.hasAttribute('data-def'); })[0];
      shots.forEach(function (s) { s.classList.toggle('fr', s === front); s.classList.toggle('bk', s !== front); });
    });
  }

  Deck.insertSlide({
    after: 87, id: 'parental-controls', title: 'Built-in parental controls', section: 'protect',
    tr: { type: 'fade', ms: 800 }, steps: 3,
    notes: 'Before you buy anything, use what is already free on your child\'s device. Google Family Link for Android and Chromebook, ' +
      'Microsoft Family Safety for Windows and Xbox, and Apple Screen Time for iPhone, iPad and Mac. All three can block harmful websites in three ways. ' +
      '[click] One: automatically block adult sites. Family Link: Try to block explicit sites. Microsoft: Filter inappropriate websites and searches, which also forces SafeSearch on Bing. Apple: Limit Adult Websites. ' +
      '[click] Two: block specific sites you add yourself. Family Link: Manage sites, Blocked sites. Microsoft: Blocked sites, add a website. Apple: Apps and Websites, Blocked. ' +
      '[click] Three, the strictest: allow only the sites you approve, everything else is blocked. Best for young children. ' +
      'Caveat: Family Link filters only Chrome, Microsoft only Edge (it blocks other browsers), Apple covers Safari and most apps. No filter is perfect, which is why we need more layers.',
    render: function (el, ctx) {
      var anim = !ctx.static && !ctx.reduced && !cameBack;
      var r = h('div', 'pcfl inst', el);
      var pre = anim ? ' pre' : '';
      h('div', 'pcfl-k' + pre, r, 'Free &middot; already on your child&rsquo;s device');
      h('h2', 'pcfl-t' + pre, r, 'Built-in <em>parental controls</em>');
      h('div', 'pcfl-fs' + pre, r, FEAT.map(function (f, i) {
        return '<div class="pcfl-f" data-k="' + (i + 1) + '" style="--c:' + f.c + '"><span class="pcfl-n">' + (i + 1) + '</span>' + f.t + '</div>';
      }).join(''));
      h('div', 'pcfl-g', r, APPS.map(function (a) {
        var shots = a.shots.map(function (s) {
          var hl = s.hl.map(function (b, i) {
            return b ? '<div class="pcfl-hl" data-k="' + (i + 1) + '" style="--c:' + FEAT[i].c + ';left:' + b[0] + '%;top:' + b[1] + '%;width:' + b[2] + '%;height:' + b[3] + '%"></div>' : '';
          }).join('');
          return '<div class="pcfl-sh' + (s.ph ? ' ph' : '') + (a.shots.length > 1 ? (s.def ? ' fr' : ' bk') : '') + '" data-fs="' + s.fs.join(',') + '"' + (s.def ? ' data-def' : '') +
            ' style="width:' + s.w + 'px;height:' + s.h + 'px;--dx:' + s.dx + 'px"><img src="' + s.src + '" alt="' + a.nm + ' settings" draggable="false">' + hl + '</div>';
        }).join('');
        var rows = a.rows.map(function (t, i) {
          return '<div class="pcfl-rw" data-k="' + (i + 1) + '" style="--c:' + FEAT[i].c + '"><span class="pcfl-n">' + (i + 1) + '</span><span>' + t + '</span></div>';
        }).join('');
        return '<div class="pcfl-cd' + pre + '"><div class="pcfl-hd"><div class="pcfl-lg">' + a.lg + '</div><div><div class="pcfl-nm">' + a.nm + '</div>' +
          '<div class="pcfl-pl">' + a.pl + '</div></div></div><div class="pcfl-st">' + shots + '</div>' + rows + '</div>';
      }).join(''));
      el.__pcfl = r;
      void r.offsetWidth; r.classList.remove('inst');
      if (anim) el.__go = function () {
        [].forEach.call(r.querySelectorAll('.pre'), function (n, i) {
          n.style.animationDelay = (i < 3 ? i * 0.08 : 0.3 + (i - 3) * 0.14) + 's'; n.classList.remove('pre'); n.classList.add('go');
        });
      };
    },
    enter: function (el) { if (el.__go) { el.__go(); el.__go = null; } },
    step: function (el, i) { set(el, i); },
    unstep: function (el, i) { set(el, i - 1); }
  });
})();

/* ---------------------------------------------------------------- 18. NEW gaps in built-in controls (after parental-controls, before #88 Kahf Guard)
   left: "allow only approved sites" drowns parents in requests + how kids bypass the controls;
   right: built-in tools vs Kahf Guard. Clicks: bypasses, built-in column, Kahf Guard column. */
(function () {
  var css = [
    '.pcgp-k{position:absolute;left:0;right:0;top:52px;text-align:center;font:800 24px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--muted)}',
    '.pcgp-t{position:absolute;left:0;right:0;top:90px;margin:0;text-align:center;font:600 80px/1.05 var(--f-display);letter-spacing:-.025em;color:var(--ink)}',
    '.pcgp-t em{font-style:italic;color:var(--red);text-shadow:0 0 40px rgba(255,77,77,.4)}',
    /* left panel */
    '.pcgp-l{position:absolute;left:90px;top:236px;width:680px;height:800px}',
    '.pcgp-q{font:600 40px/1.1 var(--f-display);color:var(--ink)}',
    '.pcgp-q small{display:block;margin-top:8px;font:500 24px/1.2 var(--f-body);color:var(--muted)}',
    '.pcgp-ph{position:relative;margin-top:18px;height:330px;padding:16px;box-sizing:border-box;border-radius:26px;overflow:hidden;',
    '  background:linear-gradient(170deg,rgba(255,255,255,.08),rgba(255,255,255,.02));border:1.5px solid rgba(255,255,255,.12)}',
    '.pcgp-ph::after{content:"";position:absolute;left:0;right:0;bottom:0;height:80px;background:linear-gradient(transparent,rgba(10,20,24,.95));pointer-events:none}',
    '.pcgp-bd{position:absolute;right:16px;top:14px;z-index:2;min-width:44px;height:44px;padding:0 12px;box-sizing:border-box;border-radius:22px;display:grid;place-items:center;',
    '  font:800 24px/1 var(--f-body);color:#fff;background:var(--red);box-shadow:0 0 24px rgba(255,77,77,.6)}',
    '.pcgp-ns{display:flex;flex-direction:column;gap:10px}',
    '.pcgp-n{display:flex;align-items:center;gap:16px;width:560px;padding:12px 16px;box-sizing:border-box;border-radius:16px;background:rgba(244,241,234,.95);color:#1b1f22;',
    '  box-shadow:0 8px 20px rgba(0,0,0,.35);transition:opacity .45s var(--ease),transform .45s var(--ease),margin .45s var(--ease)}',
    '.pcgp-n.off{opacity:0;transform:translateY(-30px) scale(.96);margin-top:-82px}',
    '.pcgp-n i{flex:none;width:44px;height:44px;border-radius:12px;display:grid;place-items:center;background:#1a73e8;color:#fff;font:800 22px/1 var(--f-body);font-style:normal}',
    '.pcgp-n b{display:block;font:700 21px/1.2 var(--f-body)}',
    '.pcgp-n span{display:block;margin-top:3px;font:500 18px/1.2 var(--f-body);color:#5f6368}',
    '.pcgp-n em{margin-left:auto;font:700 18px/1 var(--f-body);font-style:normal;color:#1a73e8;white-space:nowrap}',
    '.pcgp-c{margin-top:16px;font:500 25px/1.35 var(--f-body);color:var(--ink2)}',
    '.pcgp-c b{color:var(--red)}',
    '.pcgp-by{margin-top:26px;transition:opacity .6s var(--ease),transform .6s var(--ease)}',
    '.pcgp-by.off{opacity:0;transform:translateY(24px)}',
    '.pcgp-by h4{margin:0 0 12px;font:800 22px/1 var(--f-body);letter-spacing:.18em;text-transform:uppercase;color:var(--amber)}',
    '.pcgp-by div{display:flex;align-items:center;gap:14px;margin-top:10px;font:600 25px/1.2 var(--f-body);color:var(--ink)}',
    '.pcgp-by div i{flex:none;width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:rgba(255,176,32,.16);',
    '  box-shadow:inset 0 0 0 2px rgba(255,176,32,.6);color:var(--amber);font:800 20px/1 var(--f-body);font-style:normal}',
    /* comparison table */
    '.pcgp-tb{position:absolute;left:820px;top:236px;width:1010px;display:grid;grid-template-columns:230px 1fr 1fr;column-gap:14px}',
    '.pcgp-tb>div{box-sizing:border-box;transition:opacity .6s var(--ease),transform .6s var(--ease)}',
    '.pcgp-tb .off{opacity:0;transform:translateX(30px)}',
    '.pcgp-h{display:flex;align-items:flex-end;height:78px;padding:0 18px 14px;font:800 21px/1.15 var(--f-body);letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}',
    '.pcgp-h.nat{color:var(--red);border-radius:20px 20px 0 0;background:rgba(255,77,77,.10)}',
    '.pcgp-h.kg{color:var(--green);border-radius:20px 20px 0 0;background:rgba(46,229,157,.12)}',
    '.pcgp-h small{display:block;margin-top:6px;font:600 17px/1 var(--f-body);letter-spacing:.04em;text-transform:none;opacity:.8}',
    '.pcgp-r{display:flex;align-items:center;height:106px;padding:0 18px;border-top:1px solid rgba(255,255,255,.10);font:700 25px/1.2 var(--f-body);color:var(--ink)}',
    '.pcgp-v{display:flex;align-items:center;gap:14px;height:106px;padding:0 18px;border-top:1px solid rgba(255,255,255,.10);font:500 23px/1.25 var(--f-body);color:var(--ink2)}',
    '.pcgp-v.nat{background:rgba(255,77,77,.10)}',
    '.pcgp-v.kg{background:rgba(46,229,157,.12);color:var(--ink)}',
    '.pcgp-v.last{border-radius:0 0 20px 20px}',
    '.pcgp-v svg{flex:none;width:34px;height:34px}',
    '.pcgp-v.nat svg{color:var(--red)}.pcgp-v.kg svg{color:var(--green)}',
    '.pcgp .pre{opacity:0}',
    '.pcgp .go{animation:pcgp-in .8s var(--ease) both}',
    '@keyframes pcgp-in{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}',
    '.pcgp.inst *{transition:none!important}'
  ].join('\n');
  if (!document.getElementById('pcgp-css')) { var st = document.createElement('style'); st.id = 'pcgp-css'; st.textContent = css; document.head.appendChild(st); }

  var NO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><circle cx="12" cy="12" r="10" stroke-width="1.8"/><path d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>';
  var OK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" stroke-width="1.8"/><path d="M7.5 12.5l3 3 6-6.5"/></svg>';
  var REQ = [   // newest first once all are in; they arrive in reverse order
    ['classroom.google.com', 'Homework due tonight', 'now'],
    ['quran.com', 'Tafsir for Islamic studies', '4m'],
    ['scratch.mit.edu', 'Coding club project', '11m'],
    ['docs.google.com', 'Group assignment', '18m'],
    ['wikipedia.org', 'Science project', '26m'],
    ['khanacademy.org', 'Maths practice', '35m']
  ];
  var ROWS = [
    ['How it blocks', 'Only their own browser restrictions', 'DNS-level: every app &amp; browser'],
    ['Cross-platform', 'Fragmented: each works on its own devices', 'Android, iOS, Windows, Mac &amp; routers'],
    ['Harmful content', 'Don&rsquo;t block drugs, alcohol, gambling, anti-Islamic or pro-LGBT', 'Blocks drugs, alcohol, gambling, anti-Islamic &amp; pro-LGBT content'],
    ['Social media', 'All or nothing: block or time the whole app', 'Blocks just Shorts &amp; Reels'],
    ['Ads &amp; trackers', 'Minimal to none: needs browser extensions', 'Built-in system-wide filter'],
    ['Tampering', 'Mid-to-high: re-install the app or shift the clock', 'Low risk: forced cooldown &amp; DNS lock']
  ];

  function stage(el, k) {
    var r = el.__pcgp; if (!r) return;
    r.querySelector('.pcgp-by').classList.toggle('off', k < 1);
    [].forEach.call(r.querySelectorAll('.pcgp-tb [data-s]'), function (n) { n.classList.toggle('off', k < +n.getAttribute('data-s')); });
  }
  function shown(r, m) {
    var ns = r.querySelectorAll('.pcgp-n');   // DOM order is newest first; show the last m
    [].forEach.call(ns, function (n, i) { n.classList.toggle('off', i < ns.length - m); });
    r.querySelector('.pcgp-bd').textContent = m;
  }

  Deck.insertSlide({
    after: 'parental-controls', id: 'parental-gaps', title: 'Built-in controls have gaps', section: 'protect',
    tr: { type: 'fade', ms: 800 }, steps: 3,
    notes: 'So why not just switch on "only allow approved sites" and be done? Because it is impractical. Every homework link, every school video, every login page, quran.com, Wikipedia, Google Docs, has to be approved by a parent first. ' +
      'The requests never stop, and parents give up and switch it back off. ' +
      '[click] And children find the holes fast: they open links inside other apps or another browser, change the clock or time zone to escape downtime, or delete and re-download an app to reset its limit. ' +
      '[click] Compare what the built-in tools can actually do. They only apply their own browser restrictions, each one only on its own company\'s devices, they do not block drugs, alcohol, gambling, anti-Islamic or pro-LGBT content, social media is all or nothing, almost no ad or tracker blocking, and they are easy to tamper with. ' +
      '[click] Kahf Guard works at the DNS level, so it covers every app and every browser, on Android, iOS, Windows, Mac and even your home router. It blocks drugs, alcohol, gambling, anti-Islamic and pro-LGBT content, it can block just Shorts and Reels instead of the whole app, filters ads and trackers system-wide, and has a forced cooldown and DNS lock so children cannot simply switch it off.',
    render: function (el, ctx) {
      var anim = !ctx.static && !ctx.reduced && !cameBack, pre = anim ? ' pre' : '';
      var r = h('div', 'pcgp inst', el);
      h('div', 'pcgp-k' + pre, r, 'The catch');
      h('h2', 'pcgp-t' + pre, r, 'Built-in controls have <em>gaps</em>');
      var notes = REQ.map(function (q) {
        return '<div class="pcgp-n"><i>?</i><div><b>Can Ayaan visit ' + q[0] + '?</b><span>' + q[1] + '</span></div><em>' + q[2] + '</em></div>';
      }).join('');
      h('div', 'pcgp-l' + pre, r,
        '<div class="pcgp-q">&ldquo;Only allow approved sites&rdquo;<small>Sounds safe. In practice, every school site needs your approval:</small></div>' +
        '<div class="pcgp-ph"><div class="pcgp-bd">0</div><div class="pcgp-ns">' + notes + '</div></div>' +
        '<div class="pcgp-c">Every homework link, video &amp; login waits for a parent. <b>Parents give up and switch it off.</b></div>' +
        '<div class="pcgp-by off"><h4>Kids bypass it in minutes</h4>' +
          '<div><i>1</i>Open links inside other apps or another browser</div>' +
          '<div><i>2</i>Shift the clock or time zone to escape limits</div>' +
          '<div><i>3</i>Delete &amp; re-download the app to reset it</div></div>');
      var cells = '<div class="pcgp-h" data-s="2"></div><div class="pcgp-h nat" data-s="2"><div>Built-in tools<small>Apple / Google / Microsoft</small></div></div>' +
        '<div class="pcgp-h kg" data-s="3"><div>Kahf Guard<small>kahfguard.com</small></div></div>';
      ROWS.forEach(function (row, i) {
        var last = i === ROWS.length - 1 ? ' last' : '';
        cells += '<div class="pcgp-r" data-s="2">' + row[0] + '</div>' +
          '<div class="pcgp-v nat' + last + '" data-s="2">' + NO + '<span>' + row[1] + '</span></div>' +
          '<div class="pcgp-v kg' + last + '" data-s="3">' + OK + '<span>' + row[2] + '</span></div>';
      });
      var tb = h('div', 'pcgp-tb', r, cells);
      [].forEach.call(tb.children, function (n, i) { n.style.transitionDelay = (Math.floor(i / 3) * 0.07) + 's'; });
      el.__pcgp = r;
      stage(el, ctx.static ? 3 : 0);
      shown(r, anim ? 0 : REQ.length);
      void r.offsetWidth; r.classList.remove('inst');
      if (anim) el.__go = function (c) {
        [].forEach.call(r.querySelectorAll('.pre'), function (n, i) { n.style.animationDelay = (i * 0.1) + 's'; n.classList.remove('pre'); n.classList.add('go'); });
        var m = 0;
        (function next() { if (m >= REQ.length) return; shown(r, ++m); c.timeout(next, m < 3 ? 900 : 650); })();
      };
    },
    enter: function (el, ctx) { if (el.__go) { var g = el.__go; el.__go = null; ctx.timeout(function () { g(ctx); }, 700); } },
    step: function (el, i) { stage(el, i); },
    unstep: function (el, i) { stage(el, i - 1); }
  });
})();

/* ---------------------------------------------------------------- 17. #91 / #94 browser comparison tables
   replace the light screenshot tables with a native dark comparison; click spotlights the winner + scores */
(function () {
  var css = [
    '.pc91-k{position:absolute;left:0;right:0;top:62px;text-align:center;font:800 24px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--muted)}',
    '.pc91-t{position:absolute;left:0;right:0;top:100px;margin:0;text-align:center;font:600 88px/1.05 var(--f-display);letter-spacing:-.025em;color:var(--ink)}',
    '.pc91-t em{font-style:italic;color:var(--cyan);text-shadow:0 0 40px rgba(77,208,255,.35)}',
    '.pc91{position:absolute;border-radius:30px;',
    '  background:linear-gradient(160deg,rgba(255,255,255,.06),rgba(255,255,255,.02));border:1.5px solid rgba(255,255,255,.1);box-shadow:0 30px 80px rgba(0,0,0,.45)}',
    '.pc91-g{position:relative;display:grid}',
    '.pc91-g>div{display:flex;align-items:center;justify-content:center;transition:opacity .6s var(--ease)}',
    '.pc91 .p91hd{height:var(--hh);flex-direction:column;gap:12px;font:600 26px/1 var(--f-body);color:var(--ink)}',
    '.pc91 .p91hd.p91lb{justify-content:flex-end;align-items:flex-start;padding:0 0 22px 44px;font:700 20px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:var(--muted)}',
    '.pc91 .p91lg{width:66px;height:66px;border-radius:20px;background-color:#F3F4F6;background-repeat:no-repeat;',
    '  box-shadow:0 8px 24px rgba(0,0,0,.35)}',
    '.pc91 .p91ft{height:var(--rh);justify-content:flex-start!important;padding-left:44px;font:500 31px/1.1 var(--f-body);color:var(--ink2);border-top:1px solid rgba(255,255,255,.07)}',
    '.pc91 .p91cl{height:var(--rh);border-top:1px solid rgba(255,255,255,.07)}',
    '.pc91 .p91cl svg{width:46px;height:46px}',
    '.pc91 .p91sc{height:84px;border-top:1.5px solid rgba(255,255,255,.14);font:700 34px/1 var(--f-display);color:var(--muted)}',
    '.pc91 .p91sc.p91lb{justify-content:flex-start!important;padding-left:44px;font:600 26px/1 var(--f-body);letter-spacing:.04em;color:var(--ink2)}',
    '.pc91 .p91sc small{font:500 20px/1 var(--f-body);margin-left:4px;opacity:.7}',
    '.pc91 .p91sc[data-c="0"]{color:var(--green);text-shadow:0 0 24px rgba(46,229,157,.5)}',
    '.pc91 .p91sc{opacity:0}.pc91.hl .p91sc{opacity:1}',
    '.pc91 .p91cl svg{transition:opacity .6s var(--ease)}',
    '.pc91.hl .pc91-g>[data-c]:not([data-c="0"]):not(.p91cl),.pc91.hl .p91cl:not([data-c="0"]) svg{opacity:.32}',
    '.pc91-bar{position:absolute;left:var(--fc);top:-14px;bottom:-14px;width:var(--cw);border-radius:26px;pointer-events:none;',
    '  background:linear-gradient(180deg,rgba(46,229,157,.16),rgba(46,229,157,.05));border:2px solid rgba(46,229,157,.7);',
    '  box-shadow:0 0 60px rgba(46,229,157,.3),inset 0 0 40px rgba(46,229,157,.08);opacity:0;transform:scale(.96);transition:opacity .7s var(--ease),transform .7s var(--ease)}',
    '.pc91-pill{position:absolute;left:calc(var(--fc) + var(--cw) / 2);top:-34px;transform:translate(-50%,10px);white-space:nowrap;padding:9px 20px;border-radius:99px;',
    '  background:var(--green);color:#06221A;font:800 18px/1 var(--f-body);letter-spacing:.14em;text-transform:uppercase;box-shadow:0 0 30px rgba(46,229,157,.55);',
    '  opacity:0;transition:opacity .6s var(--ease) .15s,transform .6s var(--ease) .15s}',
    '.pc91.hl .pc91-bar{opacity:1;transform:none}.pc91.hl .pc91-pill{opacity:1;transform:translate(-50%,0)}',
    '.pc91-lgd{position:absolute;left:0;right:0;display:flex;justify-content:center;gap:44px;font:500 22px/1 var(--f-body);color:var(--muted)}',
    '.pc91-lgd span{display:flex;align-items:center;gap:10px}.pc91-lgd svg{width:26px;height:26px}',
    '.pc91 .p91rw.pre,.pc91-t.pre,.pc91-k.pre{opacity:0}',
    '.pc91 .p91rw.go,.pc91-t.go,.pc91-k.go{animation:pc96-in .7s var(--ease) both}',
    '.pc91.inst *{transition:none!important}'
  ].join('\n');
  if (!document.getElementById('pc91-css')) { var st = document.createElement('style'); st.id = 'pc91-css'; st.textContent = css; document.head.appendChild(st); }

  var GLYPH = {
    y: '<svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="21" fill="rgba(46,229,157,.16)" stroke="#2EE59D" stroke-width="2.5"/><path d="M14 23.5l6 6 12-13" fill="none" stroke="#2EE59D" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    p: '<svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="21" fill="rgba(255,176,32,.14)" stroke="#FFB020" stroke-width="2.5"/><path d="M15 23h16" stroke="#FFB020" stroke-width="4" stroke-linecap="round"/></svg>',
    n: '<svg viewBox="0 0 46 46"><circle cx="23" cy="23" r="21" fill="rgba(255,77,77,.12)" stroke="#FF4D4D" stroke-width="2.5"/><path d="M16 16l14 14M30 16L16 30" stroke="#FF4D4D" stroke-width="4" stroke-linecap="round"/></svg>'
  };
  // logos are cropped from the original screenshot tables: [name, centre x, centre y] in the source image
  var SRC158 = { src: 'media/image158.png', w: 2080, span: 100 }, SRC162 = { src: 'media/image162.png', w: 1946, span: 84 };
  function logo(src, cx, cy) {
    var k = 66 / src.span;
    return 'background-image:url(' + src.src + ');background-size:' + Math.round(src.w * k) + 'px auto;background-position:' +
      -Math.round((cx - src.span / 2) * k) + 'px ' + -Math.round((cy - src.span / 2) * k) + 'px';
  }

  function stage(el, k) { var r = el.__pc91; if (r) r.classList.toggle('hl', k >= 1); }

  /* cfg: {orig, title, kicker, head, lead, pill, score, legend, notes, L, FC, CW, TOP, HH, RH, cols:[[name, style]], rows:[[label, 'ynp..']]} */
  function browserTable(cfg) {
    var n = cfg.cols.length, SH = 84;
    if (byN[cfg.orig]) { byN[cfg.orig].steps = []; byN[cfg.orig].notes = cfg.notes; }
    Deck.registerSlide(cfg.orig, {
      title: cfg.title, steps: 1,
      render: function (el, ctx) {
        var anim = !ctx.static && !ctx.reduced && !cameBack, pre = anim ? ' pre' : '';
        h('div', 'pc91-k' + pre, el, cfg.kicker);
        h('h2', 'pc91-t' + pre, el, cfg.head);
        var r = h('div', 'pc91 inst', el);
        r.style.cssText = 'left:' + cfg.L + 'px;top:' + cfg.TOP + 'px;width:' + (cfg.FC + n * cfg.CW) + 'px;' +
          '--fc:' + cfg.FC + 'px;--cw:' + cfg.CW + 'px;--hh:' + cfg.HH + 'px;--rh:' + cfg.RH + 'px';
        h('div', 'pc91-bar', r);
        h('div', 'pc91-pill', r, cfg.pill);
        var s = '<div class="p91hd p91lb">' + cfg.lead + '</div>' + cfg.cols.map(function (b, c) {
          return '<div class="p91hd" data-c="' + c + '"><div class="p91lg" style="' + b[1] + '"></div>' + b[0] + '</div>';
        }).join('');
        var score = cfg.cols.map(function () { return 0; });
        cfg.rows.forEach(function (row) {
          s += '<div class="p91ft p91rw' + pre + '">' + row[0] + '</div>';
          row[1].split('').forEach(function (v, c) {
            if (v === 'y') score[c]++;
            s += '<div class="p91cl p91rw' + pre + '" data-c="' + c + '">' + GLYPH[v] + '</div>';
          });
        });
        s += '<div class="p91sc p91lb">' + cfg.score + '</div>' + score.map(function (v, c) {
          return '<div class="p91sc" data-c="' + c + '">' + v + '<small>/ ' + cfg.rows.length + '</small></div>';
        }).join('');
        var g = h('div', 'pc91-g', r, s);
        g.style.gridTemplateColumns = cfg.FC + 'px repeat(' + n + ',' + cfg.CW + 'px)';
        var lg = h('div', 'pc91-lgd', el, cfg.legend.map(function (k) {
          return '<span>' + GLYPH[k] + { y: 'Blocked', p: 'Partial', n: 'Not blocked' }[k] + '</span>';
        }).join(''));
        lg.style.top = (cfg.TOP + cfg.HH + cfg.rows.length * cfg.RH + SH + 30) + 'px';
        el.__pc91 = r;
        stage(el, ctx.static ? 1 : 0);
        void r.offsetWidth; r.classList.remove('inst');
        if (anim) el.__go = function () {
          var hd = el.querySelectorAll('.pc91-k.pre,.pc91-t.pre');
          [].forEach.call(hd, function (e, i) { e.style.animationDelay = (i * 0.1) + 's'; e.classList.remove('pre'); e.classList.add('go'); });
          [].forEach.call(r.querySelectorAll('.p91rw.pre'), function (e, i) {
            e.style.animationDelay = (0.25 + Math.floor(i / (n + 1)) * 0.09 + (i % (n + 1)) * 0.025) + 's'; e.classList.remove('pre'); e.classList.add('go');
          });
        };
      },
      enter: function (el, ctx) { if (el.__go) { var g = el.__go; el.__go = null; ctx.timeout(g, 500); } },
      step: function (el, i) { stage(el, i); },
      unstep: function (el, i) { stage(el, i - 1); }
    });
  }

  browserTable({
    orig: 91, title: 'Choose the right browser', kicker: 'Built-in protection, no extensions',
    head: 'Choose the right <em>browser</em>', lead: 'Built-in features', pill: 'Our pick', score: 'Fully protected', legend: ['y', 'p', 'n'],
    L: 140, FC: 600, CW: 180, TOP: 238, HH: 132, RH: 76,
    cols: [['Brave', 1017], ['Chrome', 1206], ['DDG', 1397], ['Edge', 1587], ['Firefox', 1777], ['Safari', 1967]].map(function (b) { return [b[0], logo(SRC158, b[1], 60)]; }),
    rows: [
      ['Invasive ads blocked', 'ypynnn'],
      ['Cross-site trackers blocked', 'ynyppn'],
      ['Cookies blocked', 'ynypyy'],
      ['Fingerprinting blocked', 'ynpnpp'],
      ['Malware &amp; phishing protection', 'yynyyy'],
      ['Bounce-tracking protection', 'ynnnpn'],
      ['Tor mode (anonymous routing)', 'ynnnnn']
    ],
    notes: 'Not all browsers protect your family equally. Here is what each one blocks out of the box, with no extensions: ' +
      'invasive ads, cross-site trackers, cookies, fingerprinting, malware and phishing, bounce tracking, and anonymous Tor routing. ' +
      'Chrome, the most popular browser, blocks almost nothing by default. ' +
      '[click] Brave is the only one that ticks every box, so it is the browser we recommend installing on your children\'s devices.'
  });

  browserTable({
    orig: 94, title: 'Kahf Browser vs other browsers', kicker: 'Built for family safety',
    head: '<em>Kahf</em> Browser vs other browsers', lead: 'Family features', pill: 'Built for families', score: 'Family-safe', legend: ['y', 'n'],
    L: 140, FC: 640, CW: 200, TOP: 250, HH: 140, RH: 92,
    cols: [['Kahf', logo(SRC162, 758, 98)]].concat([['Chrome', 1206], ['Edge', 1587], ['Firefox', 1777], ['Safari', 1967]].map(function (b) { return [b[0], logo(SRC158, b[1], 60)]; })),
    rows: [
      ['Hides inappropriate images', 'ynnnn'],
      ['Safe Search', 'ynnnn'],
      ['Safe YouTube', 'ynnnn'],
      ['Ads &amp; trackers blocked', 'ynnnn'],
      ['Blocks harmful sites', 'ynnnn']
    ],
    notes: 'Privacy browsers like Brave stop ads and trackers, but none of the mainstream browsers protect children from what they actually see. ' +
      'Kahf Browser does: it hides inappropriate images, forces Safe Search and a safe YouTube, blocks ads and trackers, and blocks harmful sites. ' +
      '[click] Five out of five, against zero for Chrome, Edge, Firefox and Safari.'
  });
})();

/* ---------------------------------------------------------------- 17. NEW just before the closing slide (#112) - Surah At-Tahrim 66:6
   The whole verse in Arabic sits on top; each click reveals one English phrase and lights up its Arabic phrase.
   Embers and ash drift up from a flickering fire bed that builds with "a Fire" and "fuelled by people and stones". kahf.co badge pops in bottom-right once the full translation is shown (same animation as #112). */
(function () {
  var CSST = [
    /* bundled Quran font (relative to index.html, since this <style> lives in the document) */
    '@font-face{font-family:"Deck Uthmanic Hafs";src:url(assets/fonts/kfgqpc-uthmanic-script-hafs.otf) format("opentype");font-display:block}',
    '.tq{position:absolute;inset:0;font-family:var(--f-body);color:#F4F1EA;overflow:hidden}',
    '.tq .glow{position:absolute;left:-10%;right:-10%;bottom:-40%;height:80%;background:radial-gradient(50% 50% at 50% 50%,rgba(255,110,40,.30),rgba(255,59,78,.10) 45%,rgba(255,59,78,0) 70%);opacity:0;transition:opacity 1.6s ease;pointer-events:none}',
    '.tq.k2 .glow{opacity:1}',
    /* fire bed: a hotter, flickering layer under the soft glow; faint from "a Fire", full from "fuelled by" */
    '.tq .flame{position:absolute;left:-6%;right:-6%;bottom:-22%;height:66%;background:linear-gradient(0deg,rgba(255,96,32,.4),rgba(220,50,20,.14) 30%,rgba(220,50,20,0) 52%),radial-gradient(72% 58% at 50% 78%,rgba(255,150,50,.55),rgba(255,80,30,.32) 35%,rgba(200,30,20,.12) 60%,rgba(200,30,20,0) 75%);transform-origin:50% 100%;opacity:0;transition:opacity 1.6s ease;pointer-events:none}',
    '.tq.k1 .flame{opacity:.35}.tq.k2 .flame{opacity:1}',
    '.tq .flame{animation:tq-flame 2.6s ease-in-out infinite alternate}',
    '@keyframes tq-flame{0%{transform:scale(1,1)}23%{transform:scale(1.02,1.07)}41%{transform:scale(.99,.97)}68%{transform:scale(1.03,1.1)}100%{transform:scale(1,1.02)}}',
    '.tq .fx{position:absolute;left:0;top:0;width:1920px;height:1080px;pointer-events:none}',
    '.tq .kick{position:absolute;left:0;right:0;top:64px;text-align:center;font:700 24px/1 var(--f-body);letter-spacing:.24em;text-transform:uppercase;color:var(--amber)}',
    '.tq .kick span{color:#9AA7AD;font-weight:600}',
    '.tq .ar{position:absolute;left:150px;right:150px;top:118px;text-align:center;direction:rtl;font:400 66px/1.85 "Deck Uthmanic Hafs","KFGQPC Uthmanic Script HAFS","Amiri Quran","Geeza Pro",serif;color:#e9e4d6}',
    '.tq .ar .br{color:var(--amber);opacity:.7}',
    '.tq .ar .seg{opacity:.5;transition:opacity .9s ease,color .9s ease,text-shadow .9s ease}',
    '.tq .ar .seg.past{opacity:.85}',
    '.tq .ar .seg.cur{opacity:1;color:#ffe9b8;text-shadow:0 0 34px rgba(242,193,78,.55)}',
    '.tq .rule{position:absolute;left:50%;top:478px;width:520px;height:2px;margin-left:-260px;background:linear-gradient(90deg,rgba(242,193,78,0),rgba(242,193,78,.7),rgba(242,193,78,0))}',
    '.tq .en{position:absolute;left:190px;right:190px;top:530px;text-align:center}',
    '.tq .ln{margin:0 0 30px;font:italic 500 54px/1.24 var(--f-display);letter-spacing:-.005em;text-shadow:0 4px 30px rgba(2,6,9,.85);opacity:0;transform:translateY(26px);transition:opacity .9s ease,transform .9s var(--ease),color .9s ease}',
    '.tq .ln.on{opacity:1;transform:none}',
    '.tq .ln.past{opacity:.55}',
    '.tq .ln em{font-style:italic;color:var(--amber)}',
    '.tq .ln.l2 em{color:#ff8a5c}',
    '.tq .ln.l3{font-size:48px}',
    '.tq .pc-url{left:auto;right:56px;top:1000px;transform-origin:right center}',
    '.tq .pc-soc{left:56px;top:1000px}',
    '.tq.static .ln,.tq.static .ar .seg,.tq.static .flame{transition:none;animation:none}',
    '@media (prefers-reduced-motion:reduce){.tq .ln,.tq .glow,.tq .flame,.tq .ar .seg{transition:none;animation:none}}'
  ];

  /* rising embers and drifting ash on a canvas behind the text. Heat (0..1) follows the build: a little smoke
     before the verse is read, more with "a Fire", full with "fuelled by people and stones". */
  var HEAT = [.25, .55, 1, 1];
  function sprite(core, mid) {
    var c = document.createElement('canvas'); c.width = c.height = 64;
    var g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, core); gr.addColorStop(.18, mid); gr.addColorStop(.45, mid.replace(/[\d.]+\)$/, '.25)')); gr.addColorStop(1, 'rgba(0,0,0,0)');
    g.fillStyle = gr; g.fillRect(0, 0, 64, 64); return c;
  }
  function fire(r) {
    var cv = h('canvas', 'fx', r); cv.width = 1920; cv.height = 1080;
    var g = cv.getContext('2d'), E = [], A = [], heat = 0, t = 0, owe = 0, oweA = 0;
    var SPR = [sprite('rgba(255,250,220,1)', 'rgba(255,200,90,.9)'), sprite('rgba(255,220,150,1)', 'rgba(255,130,40,.85)'), sprite('rgba(255,170,110,1)', 'rgba(230,60,20,.8)')];
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function ember() {
      E.push({ x: rnd(-80, 2000), y: rnd(1085, 1140), vy: rnd(70, 230), s: rnd(5, 17) * (Math.random() < .12 ? 1.8 : 1),
        life: 0, max: rnd(3.5, 8), ph: rnd(0, 6.3), f: rnd(.6, 2.2), sw: rnd(12, 55), fl: rnd(6, 16) });
    }
    function ash() {
      A.push({ x: rnd(-80, 2000), y: rnd(1085, 1160), vx: rnd(-14, 14), vy: rnd(18, 70), s: rnd(2.5, 7.5), q: rnd(.35, .8),
        rot: rnd(0, 6.3), vr: rnd(-2, 2), life: 0, max: rnd(9, 16), ph: rnd(0, 6.3), a: rnd(.22, .55), hot: Math.random() < .3 });
    }
    function update(dt) {
      t += dt;
      heat += ((r.__heat || 0) - heat) * Math.min(1, dt * 1.2);
      var wind = Math.sin(t * .17) * 22 + Math.sin(t * .43 + 1) * 10;
      owe += dt * heat * 120; while (owe >= 1 && E.length < 420) { ember(); owe--; }
      oweA += dt * heat * 30; while (oweA >= 1 && A.length < 160) { ash(); oweA--; }
      E = E.filter(function (p) {
        p.life += dt; p.y -= p.vy * dt; p.vy *= 1 - dt * .08;
        p.x += (wind + Math.sin(t * p.f + p.ph) * p.sw) * dt;
        return p.life < p.max && p.y > -40;
      });
      A = A.filter(function (p) {
        p.life += dt; p.y -= p.vy * dt; p.x += (p.vx + wind * 1.4 + Math.sin(t * .7 + p.ph) * 18) * dt; p.rot += p.vr * dt;
        return p.life < p.max && p.y > -40;
      });
    }
    function draw() {
      g.clearRect(0, 0, 1920, 1080);
      g.globalCompositeOperation = 'source-over';
      A.forEach(function (p) {
        var k = p.life / p.max, a = p.a * Math.min(1, p.life * 1.5) * (1 - k * k);
        g.save(); g.translate(p.x, p.y); g.rotate(p.rot); g.scale(1, p.q * (.6 + .4 * Math.abs(Math.sin(t * 1.3 + p.ph))));
        g.fillStyle = p.hot && k < .5 ? 'rgba(255,120,60,' + a + ')' : 'rgba(160,150,146,' + a + ')';
        g.fillRect(-p.s, -p.s * .6, p.s * 2, p.s * 1.2); g.restore();
      });
      g.globalCompositeOperation = 'lighter';
      E.forEach(function (p) {
        var k = p.life / p.max, fl = .65 + .35 * Math.sin(t * p.fl + p.ph * 3);
        var a = Math.min(1, p.life * 3) * (1 - k) * fl, s = p.s * (1 - k * .55);
        if (a <= 0) return;
        g.globalAlpha = a; g.drawImage(SPR[k < .25 ? 0 : k < .6 ? 1 : 2], p.x - s, p.y - s, s * 2, s * 2);
      });
      g.globalAlpha = 1;
    }
    r.__fire = {
      warm: function (sec) { heat = r.__heat || 0; for (var i = 0; i < sec * 30; i++) update(1 / 30); draw(); },
      frame: function (ms) { update(Math.min(ms, 50) / 1000); draw(); }
    };
  }
  var st = document.createElement('style'); st.id = 'part-c-tahrim-css'; st.textContent = CSST.join('\n'); document.head.appendChild(st);

  /* KFGQPC Hafs (Madinah mushaf) Uthmani text, as encoded for the KFGQPC Uthmanic Script HAFS font */
  var AR = [
    'يَٰٓأَيُّهَا ٱلَّذِينَ ءَامَنُواْ قُوٓاْ أَنفُسَكُمۡ وَأَهۡلِيكُمۡ نَارٗا',
    'وَقُودُهَا ٱلنَّاسُ وَٱلۡحِجَارَةُ',
    'عَلَيۡهَا مَلَٰٓئِكَةٌ غِلَاظٞ شِدَادٞ لَّا يَعۡصُونَ ٱللَّهَ مَآ أَمَرَهُمۡ وَيَفۡعَلُونَ مَا يُؤۡمَرُونَ'
  ];
  var EN = [
    'Believers, guard <em>yourselves and your families</em> against a Fire',
    'fuelled by <em>people and stones</em>,',
    'over which stand angels, <em>stern and strong</em>; angels who never disobey God&rsquo;s commands to them, but do as they are ordered.'
  ];

  /* k = number of English phrases shown (0..3); the newest one is "current" */
  function show(r, k) {
    var segs = r.__segs, lns = r.__lns;
    for (var i = 0; i < 3; i++) {
      segs[i].classList.toggle('cur', i === k - 1);
      segs[i].classList.toggle('past', i < k - 1);
      lns[i].classList.toggle('on', i < k);
      lns[i].classList.toggle('past', i < k - 1);
    }
    r.classList.toggle('k1', k >= 1);
    r.classList.toggle('k2', k >= 2);
    r.__heat = HEAT[k];
  }
  /* kahf.co badge + @kahfsafe: hidden until the full translation is on screen, then pop in (same animation as #112) */
  function badge(el, ctx, on) {
    var us = el.__u, tok = el.__ub = (el.__ub || 0) + 1;
    us.forEach(function (n) { n.classList.remove('go'); n.style.opacity = '0'; });
    if (!on) return;
    if (ctx.reduced) { us.forEach(function (n) { n.style.opacity = ''; }); return; }
    ctx.timeout(function () {
      if (el.__ub !== tok) return;
      us.forEach(function (n) { n.style.opacity = ''; void n.offsetWidth; n.classList.add('go'); });
    }, 1000);
  }

  Deck.insertSlide({
    after: 110, id: 'tahrim-66-6', title: 'Guard yourselves and your families', section: 'evidence',
    tr: { type: 'slide', ms: 900 }, loop: false, calm: true, steps: 3,
    notes: 'Surah At-Tahrim 66:6. The whole verse in Arabic is on screen; recite it first. ' +
      '[click] "Believers, guard yourselves and your families against a Fire" ' +
      '[click] "fuelled by people and stones," ' +
      '[click] "over which stand angels, stern and strong; angels who never disobey God’s commands to them, but do as they are ordered." ' +
      'Protecting our families is not optional; it is a command. (Translation: M.A.S. Abdel Haleem.)',
    render: function (el, ctx) {
      var r = h('div', 'tq' + (ctx.static ? ' static' : ''), el);
      h('div', 'glow', r);
      h('div', 'flame', r);
      fire(r);
      h('div', 'kick', r, 'Surah At-Tahrim <span>&middot; 66:6</span>');
      var ar = h('div', 'ar', r); ar.lang = 'ar';
      r.__segs = AR.map(function (t, i) { var s = h('span', 'seg', ar, t); ar.appendChild(document.createTextNode(' ')); return s; });
      h('span', 'br', ar, '٦');
      h('div', 'rule', r);
      var en = h('div', 'en', r);
      r.__lns = EN.map(function (t, i) { return h('p', 'ln l' + (i + 1), en, t); });
      el.__tq = r;
      el.__u = [kahfUrl(r), kahfSocial(r)];
      if (!ctx.static) el.__u.forEach(function (n) { n.style.opacity = '0'; });
      show(r, ctx.static ? 3 : 0);
      if (ctx.static) r.__fire.warm(8);
    },
    enter: function (el, ctx) {
      var fx = el.__tq.__fire;
      fx.warm(ctx.reduced ? 8 : 3);
      if (!ctx.static && !ctx.reduced) ctx.tick(function (dt) { fx.frame(dt); });
    },
    step: function (el, i, ctx) { show(el.__tq, i); if (i === 3) badge(el, ctx, true); },
    unstep: function (el, i, ctx) { show(el.__tq, i - 1); if (i === 3) badge(el, ctx, false); }
  });
})();
/* ---------------------------------------------------------------- 18. #9 (on-screen 6) "What can you accomplish in 1700 hours?"
   Rebuilt: the old bitmap arrow is replaced by an SVG arc arrow that draws itself from the "200+ books"
   badge to the pile; chart, photo and speech bubble get consistent card styling and a staged entrance. */
(function () {
  var css = [
    '.s9{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse 760px 640px at 1330px 560px,rgba(255,196,84,.17),transparent 70%),radial-gradient(ellipse 620px 520px at 330px 760px,rgba(52,190,205,.12),transparent 70%)}',
    '.s9 *{box-sizing:border-box}',
    '.s9 .rv{opacity:0}.s9.go .rv{animation:s9-rise .85s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '@keyframes s9-rise{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:none}}',
    '.s9-k{position:absolute;left:104px;top:92px;font:700 24px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#eac583}',
    '.s9-t{position:absolute;left:98px;top:138px;width:760px;margin:0;font:600 90px/1.05 var(--f-display);letter-spacing:-.035em}.s9-t em{font-style:italic;color:#ffd25e;white-space:nowrap}',
    '.s9-chart{position:absolute;left:104px;top:478px;width:580px;height:485px;transform:rotate(-1.6deg);border-radius:24px;overflow:hidden;box-shadow:0 30px 70px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.14)}',
    '.s9-chart img{display:block;width:100%;height:100%;object-fit:fill}',
    '.s9.go .s9-chart.rv{animation-name:s9-card}@keyframes s9-card{from{opacity:0;transform:translate(-60px,26px) rotate(-5deg)}to{opacity:1;transform:rotate(-1.6deg)}}',
    '.s9-photo{position:absolute;left:900px;top:56px;width:920px;height:920px;border-radius:34px;overflow:hidden;box-shadow:0 36px 90px rgba(0,0,0,.62),0 0 0 2px rgba(255,214,120,.38),0 0 120px rgba(255,190,70,.2)}',
    '.s9-photo img{display:block;width:100%;height:100%;object-fit:cover}',
    '.s9.go .s9-photo.rv{animation-name:s9-photo}@keyframes s9-photo{from{opacity:0;transform:scale(.94) translateX(50px)}to{opacity:1;transform:none}}',
    '.s9-badge{position:absolute;left:236px;top:826px;height:166px;padding:0 54px 0 46px;display:flex;align-items:baseline;gap:20px;border-radius:30px;background:linear-gradient(160deg,rgba(24,28,32,.96),rgba(6,10,13,.96));box-shadow:0 22px 54px rgba(0,0,0,.65),0 0 0 3px rgba(255,205,92,.85),0 0 60px rgba(255,190,70,.35);padding-top:8px}',
    '.s9-badge .n{font:700 128px/1.12 var(--f-display);letter-spacing:-.04em;font-variant-numeric:tabular-nums;background:linear-gradient(180deg,#fff4a6,#ffc447 75%,#ff9f45);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 0 22px rgba(255,200,80,.45))}',
    '.s9-badge .u{font:600 58px/1 var(--f-display);color:var(--ink);letter-spacing:-.01em}',
    '.s9.go .s9-badge.rv{animation-name:s9-pop;animation-timing-function:cubic-bezier(.2,1.4,.4,1)}@keyframes s9-pop{from{opacity:0;transform:scale(.55) translateY(20px)}to{opacity:1;transform:none}}',
    '.s9-arrow{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;pointer-events:none}',
    '.s9-arrow .shaft{stroke-dasharray:1;stroke-dashoffset:1}.s9.go .s9-arrow .shaft{animation:s9-draw 1s cubic-bezier(.5,0,.25,1) 2.05s both}',
    '@keyframes s9-draw{to{stroke-dashoffset:0}}',
    '.s9-arrow .head{opacity:0;transform-box:fill-box;transform-origin:0% 50%}.s9.go .s9-arrow .head{animation:s9-head .45s cubic-bezier(.2,1.5,.4,1) 2.95s both}',
    '@keyframes s9-head{from{opacity:0;transform:scale(.2)}to{opacity:1;transform:none}}',
    '.s9-bubble{position:absolute;left:944px;top:78px;width:560px;padding:30px 38px 32px;border-radius:36px;background:#fff;color:#0f1519;font:600 37px/1.28 var(--f-body);letter-spacing:-.01em;box-shadow:0 22px 50px rgba(0,0,0,.5);transform-origin:100% 70%}',
    '.s9-bubble::after{content:"";position:absolute;right:-34px;top:86px;width:56px;height:46px;background:#fff;clip-path:polygon(0 0,100% 62%,0 100%)}',
    '.s9-bubble em{font-style:normal;color:#0f7f86}',
    '.s9.go .s9-bubble.rv{animation-name:s9-bub;animation-timing-function:cubic-bezier(.2,1.4,.4,1)}@keyframes s9-bub{from{opacity:0;transform:scale(.5) rotate(-3deg)}to{opacity:1;transform:none}}',
    '.s9.static .rv,.s9.reduced .rv{opacity:1;animation:none!important;transform:none}.s9.static .s9-chart,.s9.reduced .s9-chart{transform:rotate(-1.6deg)}',
    '.s9.static .s9-arrow .shaft,.s9.reduced .s9-arrow .shaft{animation:none;stroke-dashoffset:0}.s9.static .s9-arrow .head,.s9.reduced .s9-arrow .head{animation:none;opacity:1}',
    '@media (prefers-reduced-motion:reduce){.s9 .rv{opacity:1;animation:none!important}.s9 .s9-arrow .shaft{animation:none;stroke-dashoffset:0}.s9 .s9-arrow .head{animation:none;opacity:1}}'
  ].join('\n');
  (function () { if (document.getElementById('pc-s9-css')) return; var st = document.createElement('style'); st.id = 'pc-s9-css'; st.textContent = css; document.head.appendChild(st); })();

  Deck.registerSlide(9, {
    keepBase: false,
    render: function (el, ctx) {
      var r = h('div', 's9' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el,
        '<div class="s9-k rv" style="--d:.05s">Swap the scroll for the shelf</div>' +
        '<h1 class="s9-t rv" style="--d:.15s">What can you accomplish in <em>1700 hours</em>?</h1>' +
        '<div class="s9-chart rv" style="--d:.45s"><img src="media/image11.png" alt="Gallup: hours per day teens spend on social media platforms"></div>' +
        '<div class="s9-photo rv" style="--d:.3s"><img src="media/image14.webp" alt=""></div>' +
        '<div class="s9-badge rv" style="--d:1.2s"><span class="n">' + (ctx.static || ctx.reduced ? '200' : '0') + '</span><span class="n" style="margin-left:-20px">+</span><span class="u">books</span></div>' +
        '<svg class="s9-arrow" viewBox="0 0 1920 1080" focusable="false" aria-hidden="true">' +
          '<defs><linearGradient id="s9-g" gradientUnits="userSpaceOnUse" x1="740" y1="840" x2="1050" y2="690"><stop stop-color="#ffe27a"/><stop offset="1" stop-color="#ff9f45"/></linearGradient>' +
          '<filter id="s9-glow" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter></defs>' +
          '<path d="M742 822C742 742 826 692 936 692L1010 692" pathLength="1" fill="none" stroke="#ffb940" stroke-width="22" stroke-linecap="round" filter="url(#s9-glow)" opacity=".55" class="shaft"/>' +
          '<path d="M742 822C742 742 826 692 936 692L1010 692" pathLength="1" fill="none" stroke="url(#s9-g)" stroke-width="15" stroke-linecap="round" class="shaft"/>' +
          '<path class="head" d="M1004 656L1068 692L1004 728Q1022 692 1004 656Z" fill="#ffb13d" stroke="#ffb13d" stroke-width="8" stroke-linejoin="round"/>' +
        '</svg>' +
        '<div class="s9-bubble rv" style="--d:3.1s">I read this many books every year. No Social Media. <em>Alhamdulillah!</em></div>');
      el.__s9 = r;
    },
    enter: function (el, ctx) {
      var r = el.__s9; if (!r || ctx.static || ctx.reduced) return;
      void r.offsetWidth; r.classList.add('go');
      var n = r.querySelector('.s9-badge .n'), t0 = 0, id;
      ctx.timeout(function () {
        t0 = performance.now();
        id = ctx.interval(function () {
          var p = Math.min(1, (performance.now() - t0) / 1500);
          n.textContent = Math.round(200 * (1 - Math.pow(1 - p, 3)));
          if (p >= 1) clearInterval(id);
        }, 33);
      }, 1350);
    }
  });
})();
/* ---------------------------------------------------------------- 19. #19 (on-screen 12) DQ Institute "cyber-pandemic"
   Rebuilt: the hand-drawn amber ink circles/arrows and the grey-wipe kid strip are replaced by one clean arrow from the
   "60%" to a big "6 out of 10", ten kid tiles that slump and glow red one by one, and numbered cyan rings on the three
   stats the talk calls out (45% / 29% / 17%) with matching chips on the right.
   Click 1 = arrow + "6 out of 10" + six kids hit. Clicks 2-4 = ring + chip 1 / 2 / 3. */
(function () {
  var X0 = 70, Y0 = 40;                       // infographic card; its 960 px image maps 1:1 onto stage px
  var KIDS = 10, HIT = 6, TW = 70, TH = 118;  // kid tile size (source strip is 681x115 for ten kids)
  var RINGS = [                               // image-space boxes around each stat, in the order the talk covers them
    { x: 22, y: 476, w: 176, h: 168, v: '45%', t: 'Cyber-bullied' },
    { x: 702, y: 234, w: 228, h: 168, v: '29%', t: 'Exposed to risky content' },
    { x: 22, y: 234, w: 246, h: 196, v: '17%', t: 'Risky contact with strangers' }
  ];
  var css = [
    '.s19{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse 720px 540px at 1470px 470px,rgba(255,138,60,.15),transparent 70%),radial-gradient(ellipse 780px 720px at 550px 520px,rgba(34,211,238,.09),transparent 70%)}',
    '.s19 *{box-sizing:border-box}',
    '.s19 .rv{opacity:0}.s19.go .rv{animation:s19-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '@keyframes s19-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}',
    '.s19-card{position:absolute;left:' + X0 + 'px;top:' + Y0 + 'px;width:960px;height:959px;border-radius:26px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.14)}',
    '.s19-card img{display:block;width:100%;height:100%}',
    '.s19-cap{position:absolute;left:1100px;top:62px;width:740px;display:flex;justify-content:space-between;align-items:center;font:700 22px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#cdbf9d;white-space:nowrap}',
    '.s19-leg{display:flex;align-items:center;gap:12px;font-size:24px;letter-spacing:0;text-transform:none;color:#ff9a9a;opacity:0;transition:opacity .4s ease}.s19-leg i{width:16px;height:16px;border-radius:50%;background:#ff4d4d;box-shadow:0 0 14px rgba(255,77,77,.9)}',
    '.s19.a1 .s19-leg{opacity:1;transition-delay:.9s}',
    '.s19-row{position:absolute;left:1100px;top:104px;width:740px;height:172px;padding:27px 20px 0;display:flex;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.03));box-shadow:0 22px 56px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.13)}',
    '.s19-kid{position:relative;flex:0 0 ' + TW + 'px;height:' + TH + 'px}',
    '.s19-kid .g{position:absolute;left:-4px;right:-4px;top:-6px;bottom:-14px;border-radius:26px;background:radial-gradient(ellipse at 50% 62%,rgba(255,77,77,.55),rgba(255,77,77,.14) 62%,transparent 78%);opacity:0;transition:opacity .45s ease}',
    '.s19-kid .f{position:absolute;inset:0;background-repeat:no-repeat;background-size:' + (TW * KIDS) + 'px ' + TH + 'px;transform-origin:50% 100%;transition:filter .45s ease,transform .55s cubic-bezier(.3,1.5,.5,1)}',
    '.s19-kid .x{position:absolute;right:-7px;top:-16px;width:32px;height:32px;border-radius:50%;background:#ff4d4d;color:#fff;font:800 21px/32px var(--f-body);text-align:center;box-shadow:0 4px 12px rgba(0,0,0,.5),0 0 0 3px rgba(20,8,8,.75);transform:scale(0);transition:transform .4s cubic-bezier(.2,1.7,.4,1)}',
    '.s19.a1 .s19-kid.bad .g{opacity:1;transition-delay:calc(.8s + var(--k) * .14s)}',
    '.s19.a1 .s19-kid.bad .f{filter:grayscale(1) brightness(.82) contrast(1.05);transform:translateY(5px) scale(.96);transition-delay:calc(.8s + var(--k) * .14s)}',
    '.s19.a1 .s19-kid.bad .x{transform:scale(1);transition-delay:calc(.95s + var(--k) * .14s)}',
    /* arrow from the "60%" to the headline */
    '.s19-arrow{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;pointer-events:none}',
    '.s19-arrow .shaft{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .35s ease}',
    '.s19-arrow .dot{opacity:0;transform-box:fill-box;transform-origin:50% 50%;transform:scale(.2);transition:opacity .25s ease,transform .25s ease}',
    '.s19-arrow .head{opacity:0;transform-box:fill-box;transform-origin:0% 50%;transform:scale(.2);transition:opacity .2s ease,transform .2s ease}',
    '.s19.a1 .s19-arrow .shaft{stroke-dashoffset:0;transition:stroke-dashoffset .85s cubic-bezier(.5,0,.25,1) .1s}',
    '.s19.a1 .s19-arrow .dot{opacity:1;transform:none;transition:opacity .3s ease,transform .45s cubic-bezier(.2,1.6,.4,1)}',
    '.s19.a1 .s19-arrow .head{opacity:1;transform:none;transition:opacity .3s ease .8s,transform .45s cubic-bezier(.2,1.5,.4,1) .8s}',
    /* "6 out of 10" */
    '.s19-head{position:absolute;left:1132px;top:330px;height:270px;display:flex;align-items:center;gap:30px;opacity:0;transform:translateX(-34px);transition:opacity .25s ease,transform .25s ease}',
    '.s19.a1 .s19-head{opacity:1;transform:none;transition:opacity .6s ease .7s,transform .8s cubic-bezier(.22,.8,.3,1) .7s}',
    '.s19-od{position:relative;width:206px;height:270px;overflow:hidden;filter:drop-shadow(0 8px 30px rgba(255,120,50,.35))}',
    '.s19-od .col{position:absolute;left:0;top:0;width:100%;transform:translateY(0);transition:transform .35s ease}',
    '.s19.a1 .s19-od .col{transform:translateY(' + (-270 * HIT) + 'px);transition:transform 1.05s cubic-bezier(.2,.75,.2,1) .95s}',
    '.s19-od span{display:block;height:270px;text-align:center;font:700 330px/270px var(--f-display);letter-spacing:-.04em;background:linear-gradient(180deg,#ffe27a 8%,#ffa23d 55%,#ff5a3c 100%);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '.s19-of{display:flex;flex-direction:column;gap:12px}',
    '.s19-of b{font:600 104px/1 var(--f-display);letter-spacing:-.03em;color:var(--ink);white-space:nowrap}',
    '.s19-of small{font:500 35px/1.25 var(--f-body);color:#b9c3c7;max-width:430px}',
    /* rings on the infographic + matching chips */
    '.s19-rings{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;pointer-events:none;filter:drop-shadow(0 0 12px rgba(34,211,238,.65))}',
    '.s19-rings rect{fill:rgba(34,211,238,0);stroke:#22d3ee;stroke-width:5;stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .3s ease,fill .3s ease}',
    '.s19.a2 .s19-rings .r1,.s19.a3 .s19-rings .r2,.s19.a4 .s19-rings .r3{stroke-dashoffset:0;fill:rgba(34,211,238,.1);transition:stroke-dashoffset .8s cubic-bezier(.5,0,.25,1),fill .6s ease .5s}',
    '.s19-bd,.s19-no{display:flex;align-items:center;justify-content:center;width:50px;height:50px;border-radius:50%;background:#22d3ee;color:#06222a;font:800 29px/1 var(--f-body)}',
    '.s19-bd{position:absolute;box-shadow:0 6px 16px rgba(0,0,0,.55),0 0 0 4px rgba(6,24,30,.85);transform:scale(0);transition:transform .25s ease}',
    '.s19.a2 .s19-bd.b1,.s19.a3 .s19-bd.b2,.s19.a4 .s19-bd.b3{transform:scale(1);transition:transform .5s cubic-bezier(.2,1.7,.4,1) .35s}',
    '.s19-chip{position:absolute;left:1100px;width:740px;height:100px;padding:0 30px 0 25px;display:flex;align-items:center;gap:24px;border-radius:26px;background:linear-gradient(100deg,rgba(34,211,238,.17),rgba(255,255,255,.05) 58%);box-shadow:0 14px 36px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.15);opacity:0;transform:translateX(56px);transition:opacity .3s ease,transform .3s ease}',
    '.s19.a2 .s19-chip.c1,.s19.a3 .s19-chip.c2,.s19.a4 .s19-chip.c3{opacity:1;transform:none;transition:opacity .5s ease .3s,transform .65s cubic-bezier(.2,1.1,.3,1) .3s}',
    '.s19-chip .v{flex:0 0 132px;font:700 62px/1 var(--f-display);letter-spacing:-.03em;font-variant-numeric:tabular-nums;background:linear-gradient(180deg,#ffe27a,#ff9f45);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '.s19-chip .t{font:600 32px/1.15 var(--f-body);letter-spacing:-.01em;color:var(--ink);white-space:nowrap}',
    '.s19.reduced *,.s19.static *{transition:none!important;animation:none!important}',
    '.s19.static .rv,.s19.reduced .rv{opacity:1;transform:none}'
  ].join('\n');
  (function () { if (document.getElementById('pc-s19-css')) return; var st = document.createElement('style'); st.id = 'pc-s19-css'; st.textContent = css; document.head.appendChild(st); })();

  // class a1..aN on the root = "build level >= n"; all builds are CSS transitions, so Back reverses them for free
  function level(r, n) { for (var i = 1; i <= 4; i++) r.classList.toggle('a' + i, n >= i); }

  Deck.registerSlide(19, {
    keepBase: false,
    steps: 4,
    render: function (el, ctx) {
      var r = h('div', 's19' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
      h('div', 's19-card rv', r, '<img src="media/blur/image32.webp" alt="DQ Institute: 60% of 8-12 year-old children online are exposed to cyber risks">').style.setProperty('--d', '.05s');
      var cap = h('div', 's19-cap rv', r, '<span>10 children &middot; ages 8&ndash;12</span><span class="s19-leg"><i></i>Exposed to cyber risks</span>');
      cap.style.setProperty('--d', '.35s');
      var row = h('div', 's19-row rv', r); row.style.setProperty('--d', '.5s');
      for (var i = 0; i < KIDS; i++) {
        var k = h('div', 's19-kid' + (i < HIT ? ' bad' : ''), row, '<span class="g"></span><span class="f"></span><span class="x">!</span>');
        k.style.setProperty('--k', i);
        k.querySelector('.f').style.backgroundImage = 'url(media/image33.png)';
        k.querySelector('.f').style.backgroundPosition = (-(TW * i) - 3.5) + 'px 0';
      }
      r.insertAdjacentHTML('beforeend',
        '<svg class="s19-arrow" viewBox="0 0 1920 1080" focusable="false" aria-hidden="true"><defs><linearGradient id="s19-g" gradientUnits="userSpaceOnUse" x1="' + (X0 + 690) + '" y1="0" x2="1100" y2="0"><stop stop-color="#ffe27a"/><stop offset="1" stop-color="#ff8a3d"/></linearGradient>' +
        '<filter id="s19-glow" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="8"/></filter></defs>' +
        '<path class="shaft" d="M762 512C850 470 960 470 1068 470" pathLength="1" fill="none" stroke="#ffb940" stroke-width="22" stroke-linecap="round" filter="url(#s19-glow)" opacity=".5"/>' +
        '<path class="shaft" d="M762 512C850 470 960 470 1068 470" pathLength="1" fill="none" stroke="url(#s19-g)" stroke-width="14" stroke-linecap="round"/>' +
        '<circle class="dot" cx="762" cy="512" r="13" fill="#ffe27a" stroke="#1b1305" stroke-width="4"/>' +
        '<path class="head" d="M1060 438L1112 470L1060 502Q1076 470 1060 438Z" fill="#ff9d3d" stroke="#ff9d3d" stroke-width="8" stroke-linejoin="round"/></svg>');
      var digits = ''; for (var d = 0; d <= HIT; d++) digits += '<span>' + d + '</span>';
      h('div', 's19-head', r,
        '<div class="s19-od" aria-label="6"><div class="col" aria-hidden="true">' + digits + '</div></div>' +
        '<div class="s19-of"><b>out of 10</b><small>children online are exposed to cyber risks today</small></div>');
      r.insertAdjacentHTML('beforeend', '<svg class="s19-rings" viewBox="0 0 1920 1080" focusable="false" aria-hidden="true">' + RINGS.map(function (g, i) {
        return '<rect class="r' + (i + 1) + '" x="' + (X0 + g.x) + '" y="' + (Y0 + g.y) + '" width="' + g.w + '" height="' + g.h + '" rx="28" pathLength="1"/>';
      }).join('') + '</svg>');
      RINGS.forEach(function (g, i) {
        var b = h('div', 's19-bd b' + (i + 1), r, String(i + 1));
        b.style.left = (X0 + g.x - 22) + 'px'; b.style.top = (Y0 + g.y - 22) + 'px';
        var c = h('div', 's19-chip c' + (i + 1), r, '<span class="s19-no">' + (i + 1) + '</span><span class="v">' + g.v + '</span><span class="t">' + g.t + '</span>');
        c.style.top = (655 + i * 118) + 'px';
      });
      el.__s19 = r;
      level(r, ctx.static ? 4 : 0);
    },
    enter: function (el, ctx) {
      var r = el.__s19; if (!r || ctx.static) return;
      void r.offsetWidth; r.classList.add('go');
    },
    step: function (el, i) { if (el.__s19) level(el.__s19, i); },
    unstep: function (el, i) { if (el.__s19) level(el.__s19, i - 1); }
  });
})();
/* ---------------------------------------------------------------- 20. NEW agenda as a journey (after #2)
   A fresh take on the agenda: one painted night landscape (media/agenda/journey.webp, generated with Codex),
   a lantern trail that draws itself along the footpath, and the six topics of the topic bar lighting up as
   stops along the way: from the phone-lit swamp, over the ravine, up to the lit home. No clicks. */
(function () {
  var CSSJ = [
    '.aj{position:absolute;inset:0;overflow:hidden;background:#070d18;font-family:var(--f-body);color:var(--ink)}',
    '.aj-world{position:absolute;inset:0;transform-origin:72% 42%}',
    '.aj.go .aj-world{animation:aj-push 38s cubic-bezier(.2,.6,.3,1) forwards}',
    '@keyframes aj-push{from{transform:scale(1.001)}to{transform:scale(1.055)}}',
    '.aj-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.05)}',
    '.aj-shade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(70% 62% at 0% 0%,rgba(4,8,16,.82),rgba(4,8,16,.45) 48%,rgba(4,8,16,0) 75%),linear-gradient(0deg,rgba(4,8,16,.35),rgba(4,8,16,0) 22%)}',
    '.aj-trail{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;pointer-events:none}',
    '.aj-trail path{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 1;stroke-dashoffset:1}',
    '.aj-trail .glow{stroke:#ffb940;stroke-width:26;opacity:.45;filter:url(#aj-blur)}',
    '.aj-trail .core{stroke:url(#aj-grad);stroke-width:6;stroke-dasharray:.006 .012;stroke-dashoffset:0}',
    '.aj-trail .mask-line{stroke:#fff;stroke-width:40;stroke-dasharray:1 1;stroke-dashoffset:1}',
    '.aj.go .aj-trail .glow,.aj.go .aj-trail .mask-line{transition:stroke-dashoffset var(--tt) cubic-bezier(.45,.05,.4,1) var(--t0);stroke-dashoffset:0}',
    '.aj.static .aj-trail .glow,.aj.static .aj-trail .mask-line,.aj.reduced .aj-trail .glow,.aj.reduced .aj-trail .mask-line{transition:none;stroke-dashoffset:0}',
    /* stops */
    '.aj-mk{position:absolute;width:0;height:0}',
    '.aj-mk i{position:absolute;left:-23px;top:-23px;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font:800 22px/1 var(--f-body);color:#08101c;background:var(--c);box-shadow:0 0 0 4px rgba(8,16,28,.85),0 0 30px var(--c),0 0 70px var(--c);transform:scale(0);opacity:0}',
    '.aj-mk b{position:absolute;left:-23px;top:-23px;width:46px;height:46px;border-radius:50%;border:3px solid var(--c);opacity:0}',
    '.aj.go .aj-mk i{animation:aj-pop .7s cubic-bezier(.2,1.6,.4,1) var(--d) forwards}',
    '.aj.go .aj-mk b{animation:aj-ring 2.8s ease-out calc(var(--d) + .2s) infinite}',
    '@keyframes aj-pop{from{transform:scale(0);opacity:0}to{transform:scale(1);opacity:1}}',
    '@keyframes aj-ring{0%{transform:scale(1);opacity:.9}70%,100%{transform:scale(2.4);opacity:0}}',
    '.aj-card{position:absolute;white-space:nowrap;padding:14px 24px 15px 20px;border-radius:14px;background:rgba(5,10,20,.74);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);',
    '  box-shadow:inset 4px 0 0 var(--c),inset 0 0 0 1px rgba(255,255,255,.08),0 18px 40px -14px rgba(0,0,0,.9);opacity:0;transform:translateY(16px)}',
    '.aj-card.rt{text-align:right;box-shadow:inset -4px 0 0 var(--c),inset 0 0 0 1px rgba(255,255,255,.08),0 18px 40px -14px rgba(0,0,0,.9);padding:14px 20px 15px 24px}',
    '.aj-card .t{display:block;font:600 34px/1.1 var(--f-display);letter-spacing:-.01em;color:#fff}',
    '.aj-card .t em{font-style:normal;color:var(--c);font:700 20px/1 var(--f-body);letter-spacing:.14em;margin-right:12px;vertical-align:4px}',
    '.aj-card .s{display:block;margin-top:6px;font:500 20px/1.25 var(--f-body);color:#b9c3c9}',
    '.aj.go .aj-card{animation:aj-card .8s cubic-bezier(.2,.9,.25,1) calc(var(--d) + .15s) forwards}',
    '@keyframes aj-card{to{opacity:1;transform:none}}',
    /* heading */
    '.aj-hd{position:absolute;left:96px;top:84px}',
    '.aj-k{font:700 24px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--amber)}',
    '.aj-t{margin:22px 0 0;font:600 98px/1.02 var(--f-display);letter-spacing:-.025em;color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.7)}',
    '.aj-t em{font-style:italic;color:#ffcf73;text-shadow:0 0 40px rgba(255,176,32,.45)}',
    '.aj-t .gl{color:#8fe9ff;text-shadow:0 0 34px rgba(34,211,238,.55)}',
    '.aj-hd .rv2{opacity:0;transform:translateY(22px)}',
    '.aj.go .aj-hd .rv2{animation:aj-card .9s cubic-bezier(.2,.9,.25,1) var(--d) forwards}',
    '.aj.static .aj-mk i,.aj.reduced .aj-mk i,.aj.static .aj-card,.aj.reduced .aj-card,.aj.static .aj-hd .rv2,.aj.reduced .aj-hd .rv2{animation:none;opacity:1;transform:none}',
    '.aj.static .aj-mk b,.aj.reduced .aj-mk b,.aj.reduced .aj-world{animation:none}'
  ];
  var st = document.createElement('style'); st.id = 'part-c-agenda-css'; st.textContent = CSSJ.join('\n'); document.head.appendChild(st);

  /* footpath centre line in stage px (traced on the 1920x1080 painting), bottom-left to the front door */
  var PATH = [[300, 1095], [420, 965], [560, 893], [690, 846], [770, 795], [760, 752], [850, 716], [960, 683],
    [1060, 650], [1230, 612], [1395, 578], [1480, 545], [1550, 495], [1560, 455], [1590, 405], [1660, 360], [1712, 322], [1722, 296]];
  /* stops: index into PATH, topic (same order and colours as the topic bar), card position */
  var STOPS = [
    { at: 2,  c: 'var(--cyan)',   t: 'The Problem',                 s: 'Where our children’s hours really go',     x: 600,  y: 905 },
    { at: 4,  c: 'var(--orange)', t: 'Why It’s Addictive',          s: 'Dopamine, endless feeds, game design',      x: 820,  y: 780 },
    { at: 7,  c: 'var(--amber)',  t: 'How to Treat It',             s: 'The child is the victim, not the culprit',  x: 930,  y: 520, rt: true },
    { at: 9,  c: 'var(--red)',    t: 'Drugs, Grooming and Suicide', s: 'The dangers hiding behind the screen',      x: 1150, y: 690 },
    { at: 12, c: 'var(--green)',  t: 'Practical Protection',        s: 'Zones, controls, browsers, a checklist',    x: 1505, y: 420, rt: true },
    { at: 15, c: '#F4F1EA',       t: 'Disturbing Trends',           s: 'What the research shows, and the way home', x: 1625, y: 255, rt: true }
  ];
  var T0 = .9, TT = 5.2;

  function smoothPath(P) { /* Catmull-Rom through every point -> cubic Beziers */
    var d = 'M' + P[0][0] + ' ' + P[0][1];
    for (var i = 0; i < P.length - 1; i++) {
      var p0 = P[i - 1] || P[i], p1 = P[i], p2 = P[i + 1], p3 = P[i + 2] || p2;
      d += 'C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ' ' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) + ' ' +
        (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ' ' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) + ' ' + p2[0] + ' ' + p2[1];
    }
    return d;
  }
  /* fraction of the trail travelled when it reaches PATH[k] (polyline estimate; the trail eases in/out like the CSS curve) */
  function frac(k) {
    var tot = 0, upto = 0;
    for (var i = 1; i < PATH.length; i++) { var l = Math.hypot(PATH[i][0] - PATH[i - 1][0], PATH[i][1] - PATH[i - 1][1]); tot += l; if (i <= k) upto += l; }
    return upto / tot;
  }
  function eased(f) { /* rough inverse of cubic-bezier(.45,.05,.4,1): time at which progress f is reached */
    var lo = 0, hi = 1;
    for (var n = 0; n < 30; n++) { var t = (lo + hi) / 2, u = 1 - t, y = 3 * u * u * t * .05 + 3 * u * t * t + t * t * t, x = 3 * u * u * t * .45 + 3 * u * t * t * .4 + t * t * t;
      if (y < f) lo = t; else hi = t; }
    var tt = (lo + hi) / 2, uu = 1 - tt; return 3 * uu * uu * tt * .45 + 3 * uu * tt * tt * .4 + tt * tt * tt;
  }

  Deck.insertSlide({
    after: 2, id: 'agenda-journey', title: 'Tonight’s journey', section: 'problem', tr: { type: 'fade', ms: 900 }, loop: false,
    notes: 'Here is where we are going tonight. We start down here, in the swamp of glowing phones, with the problem itself: where our children’s hours really go. ' +
      'Then why it is so addictive: dopamine, feeds and how games are built. Then how to treat it, remembering that the child is the victim. ' +
      'Then the ravine: drugs, grooming and suicide, the dangers hiding behind the screen. We cross that bridge into practical protection: what you can do at home tomorrow. ' +
      'And finally the research on where things are heading, and the way back home to a family that is together.',
    render: function (el, ctx) {
      var r = h('div', 'aj' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
      r.style.setProperty('--t0', T0 + 's'); r.style.setProperty('--tt', TT + 's');
      var w = h('div', 'aj-world', r);
      var img = h('img', 'aj-img', w); img.src = 'media/agenda/journey.webp'; img.alt = 'A night landscape: a footpath leads from a swamp of glowing phones, over a bridge across a red ravine, up to a warmly lit family home';
      h('div', 'aj-shade', w);
      var d = smoothPath(PATH);
      w.insertAdjacentHTML('beforeend', '<svg class="aj-trail" viewBox="0 0 1920 1080" aria-hidden="true" focusable="false"><defs>' +
        '<linearGradient id="aj-grad" gradientUnits="userSpaceOnUse" x1="300" y1="1095" x2="1722" y2="296"><stop offset="0" stop-color="#8fe9ff"/><stop offset=".55" stop-color="#ffd27a"/><stop offset="1" stop-color="#fff2c4"/></linearGradient>' +
        '<filter id="aj-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter>' +
        '<mask id="aj-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><path class="mask-line" d="' + d + '" pathLength="1"/></mask></defs>' +
        '<path class="glow" d="' + d + '" pathLength="1"/>' +
        '<path class="core" d="' + d + '" pathLength="1" mask="url(#aj-mask)"/></svg>');
      STOPS.forEach(function (s, i) {
        var p = PATH[s.at], dl = (T0 + eased(frac(s.at)) * TT).toFixed(2) + 's';
        var m = h('div', 'aj-mk', w, '<b></b><i>' + (i + 1) + '</i>');
        m.style.left = p[0] + 'px'; m.style.top = p[1] + 'px'; m.style.setProperty('--c', s.c); m.style.setProperty('--d', dl);
        var c = h('div', 'aj-card' + (s.rt ? ' rt' : ''), w, '<span class="t"><em>0' + (i + 1) + '</em>' + s.t + '</span><span class="s">' + s.s + '</span>');
        c.style.top = s.y + 'px'; c.style.setProperty('--c', s.c); c.style.setProperty('--d', dl);
        if (s.rt) c.style.right = (1920 - s.x) + 'px'; else c.style.left = s.x + 'px';
      });
      h('div', 'aj-hd', r,
        '<div class="aj-k rv2" style="--d:.15s">Tonight’s journey</div>' +
        '<h1 class="aj-t rv2" style="--d:.3s">From the <span class="gl">glow</span>…<br><em>back home.</em></h1>');
      el.__aj = r;
    },
    enter: function (el, ctx) {
      var r = el.__aj; if (!r || ctx.static || ctx.reduced) return;
      r.classList.remove('go'); void r.offsetWidth; r.classList.add('go');
    },
    leave: function (el) { if (el.__aj) el.__aj.classList.remove('go'); }
  });

  /* ---------------------------------------------------------------- 21. NEW chapter intros for topics 2-6
     Each topic opens by returning to the agenda painting: the camera pushes in from the full map to that topic's
     stop, the trail (already lit up to the previous stop) walks on to it, then the title and what is coming. No clicks. */
  var CSSC = [
    '.ach{position:absolute;inset:0;overflow:hidden;background:#070d18;font-family:var(--f-body);color:var(--ink)}',
    '.ach-world{position:absolute;left:0;top:0;width:1920px;height:1080px;transform-origin:0 0}',
    '.ach.go .ach-world{animation:ach-push 1.1s cubic-bezier(.6,0,.2,1) both}',
    '.ach.static .ach-world,.ach.reduced .ach-world{transform:var(--zoom)}',
    '@keyframes ach-push{from{transform:none}to{transform:var(--zoom)}}',
    '.ach-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(1.05)}',
    '.ach-shade{position:absolute;inset:0;pointer-events:none;opacity:0;background:linear-gradient(90deg,rgba(4,8,16,.92),rgba(4,8,16,.78) 34%,rgba(4,8,16,0) 64%),linear-gradient(0deg,rgba(4,8,16,.55),rgba(4,8,16,0) 30%)}',
    '.ach.go .ach-shade{animation:ach-in .8s ease .4s forwards}',
    '.ach-trail{position:absolute;left:0;top:0;width:1920px;height:1080px;overflow:visible;pointer-events:none}',
    '.ach-trail path{fill:none;stroke-linecap:round;stroke-linejoin:round}',
    '.ach-trail .ahead{stroke:rgba(255,236,196,.42);stroke-width:5;stroke-dasharray:.006 .012}',
    '.ach-trail .glow{stroke:#ffb940;stroke-width:26;opacity:.45;filter:url(#ach-blur)}',
    '.ach-trail .core{stroke:url(#ach-grad);stroke-width:6;stroke-dasharray:.006 .012}',
    '.ach-trail .mask-line{stroke:#fff;stroke-width:40}',
    '.ach-trail .glow,.ach-trail .mask-line{stroke-dasharray:1 1;stroke-dashoffset:var(--from)}',
    '.ach.go .ach-trail .glow,.ach.go .ach-trail .mask-line{stroke-dashoffset:var(--to);transition:stroke-dashoffset .7s cubic-bezier(.45,.05,.4,1) .5s}',
    '.ach.static .ach-trail .glow,.ach.static .ach-trail .mask-line,.ach.reduced .ach-trail .glow,.ach.reduced .ach-trail .mask-line{stroke-dashoffset:var(--to)}',
    /* stops: passed ones small and dim, this one pops in with a ring, later ones hollow */
    '.ach-mk{position:absolute;width:0;height:0}',
    '.ach-mk i{position:absolute;left:-23px;top:-23px;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font:800 22px/1 var(--f-body);color:#08101c;background:var(--c);box-shadow:0 0 0 4px rgba(8,16,28,.85),0 0 24px var(--c)}',
    '.ach-mk.past i{transform:scale(.72);opacity:.7}',
    '.ach-mk.next i{background:rgba(8,16,28,.75);color:rgba(255,255,255,.6);box-shadow:inset 0 0 0 3px rgba(255,255,255,.45);transform:scale(.72)}',
    '.ach-mk.cur i{box-shadow:0 0 0 4px rgba(8,16,28,.85),0 0 30px var(--c),0 0 70px var(--c);transform:scale(0);opacity:0}',
    '.ach-mk.cur b{position:absolute;left:-23px;top:-23px;width:46px;height:46px;border-radius:50%;border:3px solid var(--c);opacity:0}',
    '.ach.go .ach-mk.cur i{animation:aj-pop .4s cubic-bezier(.2,1.6,.4,1) 1.1s forwards}',
    '.ach.go .ach-mk.cur b{animation:aj-ring .7s ease-out 1.3s}',
    '.ach-here{position:absolute;white-space:nowrap;padding:10px 18px 11px;border-radius:999px;font:700 19px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;',
    '  color:#08101c;background:var(--c);box-shadow:0 12px 30px -10px rgba(0,0,0,.9),0 0 30px -4px var(--c);opacity:0;transform:translateY(12px)}',
    '.ach.go .ach-here{animation:aj-card .5s cubic-bezier(.2,.9,.25,1) 1.3s forwards}',
    /* heading + what is coming */
    '.ach-hd{position:absolute;left:110px;top:200px;width:860px}',
    '.ach-k{font:700 24px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--c)}',
    '.ach-k em{font-style:normal;color:#7f8b93;margin-left:.5em}',
    '.ach-t{margin:26px 0 0;font:600 124px/.98 var(--f-display);letter-spacing:-.03em;color:#fff;text-shadow:0 6px 40px rgba(0,0,0,.7)}',
    '.ach-t em{font-style:italic;color:var(--c);text-shadow:0 0 44px color-mix(in srgb,var(--c) 45%,transparent)}',
    '.ach-s{margin:30px 0 0;font:500 34px/1.35 var(--f-body);color:#c6d0d5;max-width:760px}',
    '.ach-ls{margin:52px 0 0;padding:0;list-style:none;display:grid;grid-template-columns:repeat(2,max-content);gap:16px 22px}',
    '.ach-ls li{display:flex;align-items:center;gap:14px;padding:14px 26px 15px 22px;border-radius:14px;font:600 27px/1 var(--f-body);color:#eef3f5;white-space:nowrap;',
    '  background:rgba(5,10,20,.72);box-shadow:inset 0 0 0 1px rgba(255,255,255,.09),0 16px 34px -16px rgba(0,0,0,.9)}',
    '.ach-ls li b{width:12px;height:12px;border-radius:50%;background:var(--c);box-shadow:0 0 14px var(--c)}',
    '.ach .rv3{opacity:0;transform:translateY(22px)}',
    '.ach.go .rv3{animation:aj-card var(--du,.7s) cubic-bezier(.2,.9,.25,1) var(--d) forwards}',
    '@keyframes ach-in{to{opacity:1}}',
    '.ach.static .rv3,.ach.reduced .rv3,.ach.static .ach-here,.ach.reduced .ach-here,.ach.static .ach-mk.cur i,.ach.reduced .ach-mk.cur i{animation:none;opacity:1;transform:none}',
    '.ach.static .ach-shade,.ach.reduced .ach-shade{animation:none;opacity:1}',
    '.ach.static .ach-mk b,.ach.reduced .ach-mk b{animation:none}',
    /* .rt: the stop sits on the left of the frame, so the text goes right */
    '.ach.rt .ach-shade{background:linear-gradient(270deg,rgba(4,8,16,.92),rgba(4,8,16,.78) 34%,rgba(4,8,16,0) 64%),linear-gradient(0deg,rgba(4,8,16,.55),rgba(4,8,16,0) 30%)}',
    '.ach.rt .ach-hd{left:auto;right:110px;text-align:right}',
    '.ach.rt .ach-s{margin-left:auto}',
    '.ach.rt .ach-ls{justify-content:end}'
  ];
  var stc = document.createElement('style'); stc.id = 'part-c-chapter-css'; stc.textContent = CSSC.join('\n'); document.head.appendChild(stc);

  /* stop: STOPS index; S: zoom; X,Y: where the stop lands on screen (S*1920 must still cover the frame); rt: text on the right */
  var CHAPTERS = [
    { stop: 1, after: 24, id: 'why-intro', section: 'why', S: 1.5, X: 600, Y: 700, rt: true,
      t: 'Why it’s<br><em>Addictive</em>', s: 'Why our children can’t put them down.',
      items: ['Device vs drug addiction', 'What screens do to the brain', 'Videos made for toddlers', 'How games are made addictive', 'Fortnite and Roblox', 'Two rules before any game'],
      notes: 'That is the problem. Now the question every parent asks: why can’t they put it down? We will compare device addiction with drug addiction, ' +
        'look at what screens do to a child’s brain and at the videos made for toddlers, then at how games are deliberately built to hook children, ' +
        'including Fortnite and Roblox. And two rules to check before you give your child any game.' },
    { stop: 2, after: 44, id: 'treat-intro', section: 'treat', S: 1.5, X: 1380, Y: 620,
      t: 'How to<br><em>Treat It</em>', s: 'It starts with us, not with them.',
      items: ['Your child is the victim', 'Children aren’t born addicts', 'We let it happen', 'A screen to make them eat', 'Make devices boring', 'Choose safer games'],
      notes: 'So what do we do about it? Before any tool or setting, it starts with how we see it. Your child is the victim, not the culprit. ' +
        'Children are not born addicts: we let it happen, often with good intentions, like a phone at the table to get them to eat. ' +
        'Then two first steps: make their devices boring, black and white with the sound off, and choose their games carefully: which popular games to avoid, and what to give them instead.' },
    { stop: 3, after: 74, id: 'harm-intro', section: 'grooming', S: 1.5, X: 1380, Y: 600, tsz: 104,
      t: 'Drugs, Grooming<br><em>and Suicide</em>', s: 'The dangers hiding behind the screen.',
      items: ['What the numbers say', 'The Lost Screen Memorial', 'How grooming works', 'Kayleigh’s story', 'Meet “Susan”', 'Never alone online'],
      notes: 'Now we come to the ravine, the darkest part of tonight, so please be prepared. We will look at the numbers, at children who lost their lives, ' +
        'and at how grooming works, through Kayleigh’s story and a groomer called Susan. A child with a device in their room is never alone.' },
    { stop: 4, after: 64, id: 'protect-intro', section: 'protect', S: 1.5, X: 1380, Y: 600,
      t: 'Practical<br><em>Protection</em>', s: 'What you can do at home, starting tomorrow.',
      items: ['Tech-free zones', 'The first phone', 'Parental controls', 'Safe browsers', 'WhatsApp privacy', 'A family checklist'],
      notes: 'We have walked through the ravine: drugs, grooming and suicide. That is the darkest part of tonight. Now we cross the bridge. ' +
        'This part is practical: what you can do at home, starting tomorrow. Tech-free zones, what the first phone should be, ' +
        'the parental controls already on your child’s device, safe browsers, WhatsApp privacy settings, and a checklist you can take home.' },
    { stop: 5, after: 105, id: 'trends-intro', section: 'evidence', S: 1.5, X: 1560, Y: 500,
      t: 'Disturbing<br><em>Trends</em>', s: 'What the research shows, and the way home.',
      items: ['Teen depression', 'Self-harm admissions', 'Suicide, ages 10–14', 'One change at home', 'Guard your families'],
      notes: 'Finally, where things are heading. The research on teenage depression, self-harm and suicide since smartphones arrived. ' +
        'Then the one change you need to make at home, and the verse that reminds us whose responsibility this is. And then, the way home.' }
  ];

  CHAPTERS.forEach(function (CH) { Deck.insertSlide({
    after: CH.after, id: CH.id, title: STOPS[CH.stop].t, section: CH.section, tr: { type: 'fade', ms: 900 }, loop: false, notes: CH.notes,
    render: function (el, ctx) {
      var s = STOPS[CH.stop], p = PATH[s.at];
      var tx = CH.X - CH.S * p[0], ty = CH.Y - CH.S * p[1];
      var r = h('div', 'ach' + (CH.rt ? ' rt' : '') + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
      r.style.setProperty('--c', s.c);
      r.style.setProperty('--zoom', 'translate(' + tx + 'px,' + ty + 'px) scale(' + CH.S + ')');
      r.style.setProperty('--from', String(1 - frac(STOPS[CH.stop - 1].at)));
      r.style.setProperty('--to', String(1 - frac(s.at)));
      var w = h('div', 'ach-world', r);
      var img = h('img', 'ach-img', w); img.src = 'media/agenda/journey.webp'; img.alt = 'The night landscape from the agenda, zoomed in on stop ' + (CH.stop + 1) + ' of the footpath: ' + s.t;
      var d = smoothPath(PATH);
      w.insertAdjacentHTML('beforeend', '<svg class="ach-trail" viewBox="0 0 1920 1080" aria-hidden="true" focusable="false"><defs>' +
        '<linearGradient id="ach-grad" gradientUnits="userSpaceOnUse" x1="300" y1="1095" x2="1722" y2="296"><stop offset="0" stop-color="#8fe9ff"/><stop offset=".55" stop-color="#ffd27a"/><stop offset="1" stop-color="#fff2c4"/></linearGradient>' +
        '<filter id="ach-blur" x="-10%" y="-10%" width="120%" height="120%"><feGaussianBlur stdDeviation="9"/></filter>' +
        '<mask id="ach-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1920" height="1080"><path class="mask-line" d="' + d + '" pathLength="1"/></mask></defs>' +
        '<path class="ahead" d="' + d + '" pathLength="1"/>' +
        '<path class="glow" d="' + d + '" pathLength="1"/>' +
        '<path class="core" d="' + d + '" pathLength="1" mask="url(#ach-mask)"/></svg>');
      STOPS.forEach(function (t, i) {
        var q = PATH[t.at], m = h('div', 'ach-mk ' + (i < CH.stop ? 'past' : i > CH.stop ? 'next' : 'cur'), w, (i === CH.stop ? '<b></b>' : '') + '<i>' + (i + 1) + '</i>');
        m.style.left = q[0] + 'px'; m.style.top = q[1] + 'px'; m.style.setProperty('--c', t.c);
      });
      var here = h('div', 'ach-here', r, 'We are here'); here.style.left = (CH.X + 54) + 'px'; here.style.top = (CH.Y + 20) + 'px';
      h('div', 'ach-shade', r);
      h('div', 'ach-hd', r,
        '<div class="ach-k rv3" style="--d:.5s">Part 0' + (CH.stop + 1) + '<em>of 0' + STOPS.length + '</em></div>' +
        '<h1 class="ach-t rv3" style="--d:.6s' + (CH.tsz ? ';font-size:' + CH.tsz + 'px' : '') + '">' + CH.t + '</h1>' +
        '<p class="ach-s rv3" style="--d:.75s">' + CH.s + '</p>' +
        '<ul class="ach-ls">' + CH.items.map(function (c, i) {
          return '<li class="rv3" style="--du:.6s;--d:' + (1 + i * .08).toFixed(2) + 's"><b></b>' + c + '</li>';
        }).join('') + '</ul>');
      el.__ach = r;
    },
    enter: function (el, ctx) {
      var r = el.__ach; if (!r || ctx.static || ctx.reduced) return;
      r.classList.remove('go'); void r.offsetWidth; r.classList.add('go');
    },
    leave: function (el) { if (el.__ach) el.__ach.classList.remove('go'); }
  }); });
})();

/* ---------------------------------------------------------------- 22. NEW three things to tackle (after #51, before #71)
   Sets up "Make devices boring" and the games slides: fast motion content, colour and sound are what make a
   screen so stimulating. One card per click, each with a small live visual. */
(function () {
  var css = [
    '.t3{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
    '.t3-k{position:absolute;left:0;right:0;top:118px;text-align:center;font:700 26px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--amber)}',
    '.t3-t{position:absolute;left:0;right:0;top:166px;margin:0;text-align:center;font:600 104px/1 var(--f-display);letter-spacing:-.03em;color:#fff}',
    '.t3-t em{font-style:italic;color:var(--amber);text-shadow:0 0 44px rgba(255,176,32,.4)}',
    '.t3-row{position:absolute;left:150px;top:372px;width:1620px;display:grid;grid-template-columns:repeat(3,1fr);gap:60px}',
    '.t3-cd{position:relative;height:580px;border-radius:30px;padding:22px 22px 34px;box-sizing:border-box;display:flex;flex-direction:column;',
    '  background:linear-gradient(180deg,rgba(var(--c),.16),rgba(255,255,255,.03) 62%);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1),0 30px 60px -30px rgba(0,0,0,.9);',
    '  transition:opacity .5s ease,transform .6s cubic-bezier(.2,1,.3,1)}',
    '.t3-cd.off{opacity:0;transform:translateY(34px) scale(.98)}',
    '.t3.inst .t3-cd{transition:none}',
    '.t3-viz{position:relative;height:250px;border-radius:20px;overflow:hidden;background:rgba(2,6,12,.55);box-shadow:inset 0 0 0 1px rgba(255,255,255,.06)}',
    '.t3-no{position:absolute;left:16px;top:16px;z-index:2;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font:800 22px/1 var(--f-body);color:#08101c;background:rgb(var(--c));box-shadow:0 0 24px rgba(var(--c),.6)}',
    '.t3-hd{margin:30px 8px 0;font:600 44px/1.05 var(--f-display);letter-spacing:-.02em;color:#fff;white-space:nowrap}',
    '.t3-sb{margin:14px 8px 0;font:500 27px/1.35 var(--f-body);color:#b9c3c9}',
    '.t3-fx{margin:auto 8px 0;align-self:flex-start;display:flex;align-items:center;gap:12px;padding:12px 22px 13px 16px;border-radius:999px;font:700 25px/1 var(--f-body);color:rgb(var(--c));background:rgba(var(--c),.12);box-shadow:inset 0 0 0 1px rgba(var(--c),.4)}',
    '.t3-fx b{font:700 26px/1 var(--f-body)}',
    /* 1. fast motion: streaks racing past a fast-forward glyph */
    '.t3-mo i{position:absolute;left:0;height:4px;border-radius:4px;width:var(--w);background:linear-gradient(90deg,rgba(var(--c),0),rgb(var(--c)));transform:translateX(var(--x));animation:t3-streak var(--t) linear var(--dl) infinite}',
    '@keyframes t3-streak{from{transform:translateX(-120%)}to{transform:translateX(560px)}}',
    '.t3-mo svg,.t3-so svg{position:absolute;left:50%;top:50%;width:120px;height:120px;margin:-60px 0 0 -60px;color:#fff;filter:drop-shadow(0 0 18px rgba(var(--c),.8))}',
    /* 2. colour: a saturated wheel that never stops turning */
    '.t3-co b{position:absolute;left:50%;top:50%;width:190px;height:190px;margin:-95px 0 0 -95px;border-radius:50%;',
    '  background:conic-gradient(#ff3b3b,#ffb020,#f5ff3b,#2ee59d,#22d3ee,#5b6bff,#ff3bd4,#ff3b3b);animation:t3-spin 5s linear infinite}',
    '.t3-co b.bl{filter:blur(38px);opacity:.7;transform:scale(1.25)}',
    '.t3-co b.bl{animation-name:t3-spin-bl}',
    '@keyframes t3-spin{to{transform:rotate(360deg)}}',
    '@keyframes t3-spin-bl{from{transform:scale(1.25) rotate(0)}to{transform:scale(1.25) rotate(360deg)}}',
    /* 3. sound: an equalizer around a speaker */
    '.t3-so .eq{position:absolute;left:24px;right:24px;bottom:30px;height:150px;display:flex;align-items:flex-end;justify-content:space-between}',
    '.t3-so .eq i{width:14px;height:100%;border-radius:7px;background:linear-gradient(0deg,rgba(var(--c),.35),rgb(var(--c)));transform-origin:50% 100%;transform:scaleY(var(--h));animation:t3-eq var(--t) ease-in-out var(--dl) infinite alternate}',
    '.t3-so .eq i.mid{opacity:0}',
    '@keyframes t3-eq{from{transform:scaleY(.12)}to{transform:scaleY(var(--h))}}',
    '.t3.still .t3-viz *{animation:none!important}'
  ].join('\n');
  if (!document.getElementById('pc-t3-css')) { var st = document.createElement('style'); st.id = 'pc-t3-css'; st.textContent = css; document.head.appendChild(st); }

  var rr = (function () { var s = 7; return function () { s = (s * 9301 + 49297) % 233280; return s / 233280; }; })();   // seeded: same render every time
  var streaks = ''; for (var i = 0; i < 11; i++) streaks += '<i style="top:' + (14 + i * 21 + rr() * 8).toFixed(0) + 'px;--w:' + (90 + rr() * 170).toFixed(0) + 'px;--x:' + (rr() * 420).toFixed(0) + 'px;--t:' + (.45 + rr() * .5).toFixed(2) + 's;--dl:-' + rr().toFixed(2) + 's"></i>';
  var bars = ''; for (var j = 0; j < 17; j++) bars += '<i class="' + (j >= 6 && j <= 10 ? 'mid' : '') + '" style="--h:' + (.35 + rr() * .65).toFixed(2) + ';--t:' + (.25 + rr() * .35).toFixed(2) + 's;--dl:-' + rr().toFixed(2) + 's"></i>';
  var SV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">';
  var CARDS = [
    { c: '34,211,238', hd: 'Fast Motion Content', sb: 'Rapid cuts and non-stop action keep the brain craving more.', fx: 'Slow, simple games',
      viz: '<div class="t3-viz t3-mo">' + streaks + SV + '<path d="M3 6l8 6-8 6zM12 6l8 6-8 6z" fill="currentColor"/></svg></div>' },
    { c: '255,59,212', hd: 'Color', sb: 'Bright, saturated screens overstimulate young eyes.', fx: 'Black &amp; white screen',
      viz: '<div class="t3-viz t3-co"><b class="bl"></b><b></b></div>' },
    { c: '255,176,32', hd: 'Sound', sb: 'Music loops and sound effects pull them back in.', fx: 'Sound off',
      viz: '<div class="t3-viz t3-so"><div class="eq">' + bars + '</div>' + SV + '<path d="M4 9h4l5-4v14l-5-4H4z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg></div>' }
  ];
  function show(el, k) { (el.__t3 || []).forEach(function (n, i) { n.classList.toggle('off', i >= k); }); }

  Deck.insertSlide({
    after: 51, id: 'three-things', title: 'Tackle three things', section: 'treat', tr: { type: 'fade', ms: 800 }, loop: false, steps: 3,
    notes: 'To curb the addiction, we need to tackle the three things that make a screen so stimulating. [click] One: fast motion content, ' +
      'rapid cuts and non-stop action. [click] Two: colour, bright saturated screens. [click] Three: sound, music loops and sound effects. ' +
      'Take these away and the device becomes boring, which is exactly what we want. Let’s see how.',
    render: function (el, ctx) {
      var r = h('div', 't3 inst' + (ctx.static || ctx.reduced ? ' still' : ''), el);
      h('div', 't3-k', r, 'To curb device addiction');
      h('h2', 't3-t', r, 'Tackle <em>three</em> things');
      var row = h('div', 't3-row', r, CARDS.map(function (c, i) {
        return '<div class="t3-cd off" style="--c:' + c.c + '">' + c.viz.replace('">', '"><div class="t3-no">' + (i + 1) + '</div>') +
          '<div class="t3-hd">' + c.hd + '</div><div class="t3-sb">' + c.sb + '</div><div class="t3-fx"><b>→</b>' + c.fx + '</div></div>';
      }).join(''));
      el.__t3 = [].slice.call(row.children);
      if (ctx.static) show(el, 3);
      void r.offsetWidth; r.classList.remove('inst');
    },
    step: function (el, i) { show(el, i); },
    unstep: function (el, i) { show(el, i - 1); }
  });
})();
})();
