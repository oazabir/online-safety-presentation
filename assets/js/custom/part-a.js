/* ============================================================================
   part-a.js - custom, animated & interactive slides for original slides 1-47
   (+ new: live counter after 4, screen-time calculator after 10).
   Self-contained: injects <style id="part-a-css">, uses only Deck/ctx helpers.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck) return;

var T0 = Date.now();                       // deck load = start of the live counter
var YEARS_PER_DAY = 684932;                // 6h40m x 900M Muslims / 8760 h per year (slide 4)
var RATE = YEARS_PER_DAY / 86400;          // years per second  (~7.93)

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

/* ---- slide 1 */
'.pa1-beam{position:absolute;left:880px;top:-120px;width:1100px;height:1100px;background:radial-gradient(ellipse at 78% 12%,rgba(110,215,255,.5),rgba(34,211,238,.12) 45%,transparent 68%);animation:pa-breathe 5s ease-in-out infinite alternate;pointer-events:none;-webkit-mask-image:linear-gradient(180deg,transparent 110px,#000 330px),linear-gradient(90deg,#000 800px,transparent 1030px);-webkit-mask-composite:source-in;mask-image:linear-gradient(180deg,transparent 110px,#000 330px),linear-gradient(90deg,#000 800px,transparent 1030px);mask-composite:intersect}',
'.pa1-phone{position:absolute;left:1600px;top:56px;width:150px;height:300px;border-radius:30px;background:#04080b;border:3px solid #1c5560;',
'  --r0:8deg;--r1:13deg;animation:pa-float 6s ease-in-out infinite alternate;box-shadow:0 0 110px 26px rgba(34,211,238,.38),inset 0 0 0 2px rgba(255,255,255,.07)}',
'.pa1-phone i{position:absolute;inset:11px;border-radius:21px;background:linear-gradient(165deg,#b6f0ff,#22D3EE 38%,#0891B2);animation:pa-np 3.2s ease-in-out infinite}',
'.pa1-phone b{position:absolute;left:50%;top:18px;width:46px;height:9px;margin-left:-23px;border-radius:9px;background:#04080b}',
'.pa1-t1,.pa1-t2{position:absolute;left:104px;font-family:var(--f-display);font-weight:600;letter-spacing:-.02em;line-height:1;white-space:nowrap}',
'.pa1-t1{top:74px;font-size:116px;color:var(--ink)}',
'.pa1-t2{top:196px;font-size:132px;background:linear-gradient(100deg,#7fe4ff 0%,#22D3EE 30%,#2EE59D 60%,#7fe4ff 100%);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;animation:pa-grad 7s linear infinite;filter:drop-shadow(0 0 28px rgba(34,211,238,.45))}',
'@keyframes pa-grad{to{background-position:-220% 0}}',
'.pa1-sub{position:absolute;left:108px;top:362px;font-size:44px;font-weight:600;color:var(--amber);letter-spacing:.005em;display:flex;align-items:center;gap:22px}',
'.pa1-photo{position:absolute;left:930px;top:440px;width:900px;height:490px;--r0:-2.4deg;--r1:-1.4deg;animation:pa-float 9s ease-in-out infinite alternate}',
'.pa1-photo:before{content:"";position:absolute;inset:-70px;border-radius:50%;background:radial-gradient(ellipse,rgba(34,211,238,.30),transparent 66%);animation:pa-breathe 4.5s ease-in-out infinite alternate}',
'.pa1-frame{position:absolute;inset:0;border-radius:22px;overflow:hidden;box-shadow:var(--shadow),0 0 0 1px rgba(255,255,255,.18)}',
'.pa1-frame img{width:100%;height:100%;object-fit:cover;display:block;animation:pa-kb 32s ease-in-out infinite alternate;will-change:transform}',
'@keyframes pa-kb{from{transform:scale(1.02) translate3d(0,0,0)}to{transform:scale(1.13) translate3d(-1.8%,-1.2%,0)}}',
'.pa1-frame:after{content:"";position:absolute;top:-10%;bottom:-10%;width:30%;left:0;background:linear-gradient(100deg,transparent,rgba(160,230,255,.34),transparent);transform:translateX(-140%) skewX(-18deg);animation:pa-sw 8s ease-in-out infinite;animation-delay:2s;mix-blend-mode:screen}',
'.pa1-who{position:absolute;left:108px;top:640px;width:760px}',
'.pa1-who .n{font-family:var(--f-display);font-weight:700;font-size:70px;line-height:1.05}',
'.pa1-who .r{margin-top:14px;font-size:38px;font-weight:700;color:var(--cyan)}',
'.pa1-who .x{margin-top:16px;font-size:29px;line-height:1.38;color:var(--ink2);font-weight:500}',

/* ---- live counter */
'.lc-k{position:absolute;left:0;right:0;top:92px;text-align:center;font-size:40px;letter-spacing:.2em;text-transform:uppercase;color:var(--cyan);font-weight:700}',
'.lc-h{position:absolute;left:0;right:0;top:170px;text-align:center;font-family:var(--f-display);font-size:70px;font-weight:500;color:var(--ink)}',
'.lc-odo{position:absolute;left:0;right:0;top:268px;display:flex;justify-content:center;align-items:center;font-family:var(--f-display);font-weight:700;font-size:270px;line-height:1.05;',
'  font-variant-numeric:tabular-nums;color:#fff;text-shadow:0 0 70px rgba(34,211,238,.65),0 0 14px rgba(34,211,238,.45)}',
'.od{display:inline-block;height:1.05em;width:.6em;overflow:hidden;position:relative;-webkit-mask-image:linear-gradient(transparent,#000 14%,#000 86%,transparent);mask-image:linear-gradient(transparent,#000 14%,#000 86%,transparent)}',
'.od i{display:block;font-style:normal;will-change:transform}',
'.od b{display:block;height:1.05em;line-height:1.05em;text-align:center;font-weight:700}',
'.od-c{display:inline-block;width:.26em;text-align:center;line-height:1.05em;opacity:.8}',
'.lc-u{position:absolute;left:0;right:0;top:566px;text-align:center;font-family:var(--f-display);font-size:92px;font-weight:600;color:var(--amber);text-shadow:0 0 40px rgba(255,176,32,.45)}',
'.lc-life{position:absolute;left:0;right:0;top:716px;text-align:center;font-size:44px;color:var(--ink2);font-weight:500}',
'.lc-life b{color:#fff;font-variant-numeric:tabular-nums;font-size:58px;font-weight:700;margin:0 6px}',
'.lc-stats{position:absolute;left:160px;right:160px;top:826px;display:flex;gap:28px}',
'.lc-stats div{flex:1;text-align:center;padding:20px 12px 18px;border-radius:20px;background:var(--glass);box-shadow:inset 0 0 0 1px var(--glass-b)}',
'.lc-stats b{display:block;font-family:var(--f-display);font-size:60px;color:#fff;font-variant-numeric:tabular-nums}',
'.lc-stats span{font-size:27px;color:var(--ink2);text-transform:uppercase;letter-spacing:.1em}',
'.lc-ring{position:absolute;left:50%;top:410px;width:1500px;height:1500px;margin:-750px 0 0 -750px;border-radius:50%;border:2px solid rgba(34,211,238,.5);animation:pa-ring 9s linear infinite;animation-delay:var(--d)}',
'.lc-meta{position:absolute;right:52px;bottom:34px;font-size:24px;color:var(--muted);display:flex;gap:18px;align-items:center}',
'.pa-btn{font:600 24px var(--f-body);color:var(--ink);background:var(--glass);border:1px solid var(--glass-b);border-radius:99px;padding:10px 24px;cursor:pointer;transition:background .2s,transform .2s}',
'.pa-btn:hover{background:rgba(255,255,255,.16);transform:translateY(-2px)}',

/* ---- calculator */
'.cx-title{position:absolute;left:100px;top:54px;font-family:var(--f-display);font-size:80px;font-weight:600;line-height:1.05}',
'.cx-sub{position:absolute;left:104px;top:150px;font-size:32px;color:var(--ink2)}',
'.cx-card{position:absolute;border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.09),rgba(255,255,255,.035));box-shadow:inset 0 0 0 1px var(--glass-b),var(--shadow);padding:30px 40px}',
'.cx-lab{font-size:28px;letter-spacing:.14em;text-transform:uppercase;color:var(--cyan);font-weight:700}',
'.cx-val{font-family:var(--f-display);font-weight:700;font-size:150px;line-height:1;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 40px rgba(34,211,238,.5)}',
'.cx-val small{font-size:56px;font-weight:500;color:var(--ink2);margin-left:14px;text-shadow:none}',
'.cx-row{display:flex;align-items:center;gap:20px;margin-top:14px}',
'.cx-btn{flex:none;width:76px;height:76px;border-radius:50%;border:1px solid var(--glass-b);background:rgba(255,255,255,.08);color:#fff;font:600 44px/1 var(--f-body);cursor:pointer;transition:background .2s,transform .15s}',
'.cx-btn:hover{background:rgba(34,211,238,.35)}.cx-btn:active{transform:scale(.92)}',
'.cx-range{-webkit-appearance:none;appearance:none;flex:1;height:22px;border-radius:22px;outline:none;cursor:pointer;margin:0;',
'  background:linear-gradient(90deg,var(--cyan) var(--p,40%),rgba(255,255,255,.16) var(--p,40%))}',
'.cx-range::-webkit-slider-thumb{-webkit-appearance:none;width:64px;height:64px;border-radius:50%;background:#fff;border:8px solid var(--cyan);box-shadow:0 0 0 8px rgba(34,211,238,.22),0 8px 24px rgba(0,0,0,.6);cursor:grab}',
'.cx-range:active::-webkit-slider-thumb{cursor:grabbing;box-shadow:0 0 0 14px rgba(34,211,238,.3),0 8px 24px rgba(0,0,0,.6)}',
'.cx-range::-moz-range-thumb{width:48px;height:48px;border-radius:50%;background:#fff;border:8px solid var(--cyan)}',
'.cx-scale{display:flex;justify-content:space-between;margin:8px 98px 0 98px;font-size:24px;color:var(--muted)}',
'.cx-chip{position:absolute;right:36px;top:28px;font:600 26px var(--f-body);color:var(--amber);background:rgba(255,176,32,.12);border:1px solid rgba(255,176,32,.4);border-radius:99px;padding:8px 22px;cursor:pointer}',
'.cx-chip:hover{background:rgba(255,176,32,.25)}',
'.cx-tile{position:absolute;top:226px;width:284px;height:204px;border-radius:24px;background:linear-gradient(160deg,rgba(34,211,238,.16),rgba(34,211,238,.04));box-shadow:inset 0 0 0 1px rgba(34,211,238,.35);padding:22px 24px}',
'.cx-tile.hot{background:linear-gradient(160deg,rgba(255,77,77,.26),rgba(255,77,77,.05));box-shadow:inset 0 0 0 1px rgba(255,77,77,.55),0 0 50px rgba(255,77,77,.25)}',
'.cx-tile b{display:block;font-family:var(--f-display);font-size:66px;line-height:1.05;color:#fff;font-variant-numeric:tabular-nums}',
'.cx-tile span{display:block;margin-top:10px;font-size:30px;line-height:1.25;color:var(--ink2)}',
'.cx-eq{position:absolute;left:920px;top:466px;width:880px}',
'.cx-eqh{font-size:28px;letter-spacing:.14em;text-transform:uppercase;color:var(--amber);font-weight:700;margin-bottom:12px}',
'.cx-r{position:relative;height:132px;margin-bottom:14px;border-radius:24px;background:var(--glass);box-shadow:inset 0 0 0 1px var(--glass-b);padding:16px 26px 0 128px;overflow:hidden}',
'.cx-r svg{position:absolute;left:24px;top:22px;width:84px;height:84px;animation:pa-float 4.5s ease-in-out infinite alternate;--r0:-3deg;--r1:3deg}',
'.cx-r b{font-family:var(--f-display);font-size:62px;color:#fff;font-variant-numeric:tabular-nums;line-height:1}',
'.cx-r em{font-style:normal;font-size:30px;color:var(--ink2);margin-left:14px;font-weight:600}',
'.cx-r u{display:block;text-decoration:none;font-size:22px;color:var(--muted);margin-top:6px}',
'.cx-bar{position:absolute;left:0;right:0;bottom:0;height:12px;background:rgba(255,255,255,.07)}',
'.cx-bar i{position:absolute;inset:0;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,var(--cyan),var(--green),var(--amber));will-change:transform}',
'.cx-foot{position:absolute;left:100px;right:100px;bottom:26px;font-size:22px;color:var(--muted);line-height:1.35}',

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
'.dp-card{position:absolute;left:1000px;top:70px;width:870px;height:610px;border-radius:26px;background:linear-gradient(160deg,rgba(255,255,255,.085),rgba(255,255,255,.03));box-shadow:inset 0 0 0 1px var(--glass-b),var(--shadow)}',
'.dp-card svg{position:absolute;left:0;top:0;width:870px;height:610px;overflow:visible}',
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
function fmt(n, d) { return Number(n).toLocaleString('en-US', { minimumFractionDigits: d || 0, maximumFractionDigits: d || 0 }); }
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
    var a = document.createElement('a'); a.className = 'chip'; a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('data-noadvance', '');
    a.innerHTML = '<b>source</b><span>' + u.replace(/^https?:\/\/(www\.)?/, '') + '</span>'; box.appendChild(a);
  });
}

/* ================================================================ SLIDE 1 - opener */
Deck.registerSlide(1, {
  loop: 'orbs',
  render: function (el, ctx) {
    var r = root(el, 'pa1', ctx);
    r.innerHTML =
      '<div class="pa1-beam"></div><div class="pa1-phone"><i></i><b></b></div><div class="pa1-pts"></div>' +
      '<div class="pa1-t1 rv" style="--d:.2s">Online Safety &amp;</div>' +
      '<div class="pa1-t2 rv" style="--d:.45s">Device Addiction</div>' +
      '<div class="pa1-sub rv" style="--d:.8s">Understand, Diagnose &amp; Prevent addiction</div>' +
      '<div class="pa1-photo rv" style="--d:1s"><div class="pa1-frame"><img src="media/image3.webp" alt="A family sitting together, each looking at a screen"></div></div>' +
      '<div class="pa1-who rv" style="--d:1.25s"><div class="n">Omar AL Zabir</div><div class="r">Co-Founder CTO of Kahf.co</div>' +
      '<div class="x">Ex-Engineering Manager of Child Safety team at Messenger &amp; Instagram.<br>M.Sc. From Oxford<br>MA Islamic Studies</div></div>';
    if (!ctx.static) particles(r.querySelector('.pa1-pts'), 34, 5, ['110,215,255', '46,229,157', '255,255,255'], { t: 15 });
    ctx.onLeave(function () {});
    go(r, ctx);
  }
});

/* ================================================================ SLIDE 2 - three panels light up in turn */
Deck.registerSlide(2, {
  keepBase: true,
  render: function (el, ctx) {
    var host = ctx.view.map.e7; if (!host || ctx.static) return;
    var t = host.querySelector('.in') || host; t.classList.add('pa-hs');
    for (var i = 0; i < 3; i++) { var d = document.createElement('div'); d.className = 'pa-pan'; d.style.left = (i * 33.3) + '%'; d.style.setProperty('--d', (i * 3) + 's'); t.appendChild(d); }
    addSweep(ctx, 'e7', 2);
  }
});

/* ================================================================ SLIDE 4 - count up the headline */
Deck.registerSlide(4, {
  keepBase: true,
  render: function (el, ctx) {
    addSweep(ctx, 'e14', 0.5);
    var h = ctx.view.map.e14; if (h) h.classList.add('pa-hs');
  },
  enter: function (el, ctx) { countOnShow(ctx, 'e14', '684,932', { dur: 2600, pulse: true }); }
});

/* ================================================================ NEW - live counter (after 4) */
(function () {
  var NDIG = 8;
  Deck.insertSlide({
    after: 4, id: 'live-counter', title: 'Live screen-time counter', section: 'problem', hidden: true,
    tr: { type: 'fade', ms: 900 }, loop: 'orbs',
    notes: 'The counter started the moment this deck was opened. It uses the figures from the previous slide: 6h 40m per day x 900M Muslims = 684,932 years per day = about 7.93 years every second. Use the restart button if you opened the deck before the talk began. Lifetimes assume a 70-year life.',
    render: function (el, ctx) {
      var r = root(el, 'lc', ctx);
      var cols = '';
      for (var i = NDIG - 1; i >= 0; i--) {
        var strip = ''; for (var k = 0; k <= 10; k++) strip += '<b>' + (k % 10) + '</b>';
        cols += '<span class="od" data-i="' + i + '"><i>' + strip + '</i></span>' + (i % 3 === 0 && i > 0 ? '<span class="od-c" data-c="' + i + '">,</span>' : '');
      }
      r.innerHTML = '<div class="lc-ring" style="--d:0s"></div><div class="lc-ring" style="--d:-3s"></div><div class="lc-ring" style="--d:-6s"></div>' +
        '<div class="lc-k rv" style="--d:.1s">Since this talk began</div>' +
        '<div class="lc-h rv" style="--d:.25s">the Ummah has spent</div>' +
        '<div class="lc-odo rv" style="--d:.4s">' + cols + '</div>' +
        '<div class="lc-u rv" style="--d:.6s">years on screens</div>' +
        '<div class="lc-life rv" style="--d:.8s">that is <b class="lt">0.0</b> lifetimes of 70 years</div>' +
        '<div class="lc-stats rv" style="--d:1s"><div><b>' + fmt(RATE, 2) + '</b><span>years every second</span></div><div><b>' + fmt(RATE * 60) + '</b><span>years every minute</span></div><div><b>' + fmt(YEARS_PER_DAY / 24) + '</b><span>years every hour</span></div></div>' +
        '<div class="lc-meta rv" style="--d:1.2s"><span>6h 40m per day &times; 900M Muslims = 684,932 years per day</span><span>Talk time <b class="tm" style="color:#fff;font-variant-numeric:tabular-nums">00:00:00</b></span><button class="pa-btn" data-act="reset" title="Restart the counter from zero">&#8635; Restart count</button></div>';
      chipsFor(r, ['https://datareportal.com/reports/digital-2024-global-overview-report']);
      var cols_ = r.querySelectorAll('.od'), commas = r.querySelectorAll('.od-c'), strips = [], lt = r.querySelector('.lt'), tm = r.querySelector('.tm');
      cols_.forEach(function (c) { strips.push(c.firstChild); });
      var last = { n: -1, lt: '', tm: '' };
      function draw() {
        var v = (Date.now() - T0) / 1000 * RATE;
        var iv = Math.floor(v), ndig = Math.max(1, String(iv).length);
        for (var i = 0; i < NDIG; i++) {
          var q = v / Math.pow(10, i), fl = Math.floor(q), fr = q - fl;
          var pos = (fl % 10) + smooth(i === 0 ? .55 : .92, 1, fr);
          strips[NDIG - 1 - i].style.transform = 'translate3d(0,' + (-pos * 100 / 11).toFixed(3) + '%,0)';
          if (i + 1 > ndig && last.n !== ndig) cols_[NDIG - 1 - i].style.display = 'none';
          else if (last.n !== ndig) cols_[NDIG - 1 - i].style.display = '';
        }
        if (last.n !== ndig) { commas.forEach(function (c) { c.style.display = (+c.dataset.c < ndig) ? '' : 'none'; }); last.n = ndig; }
        var l = (v / 70).toFixed(1); if (l !== last.lt) { lt.textContent = l; last.lt = l; }
        var s = Math.floor((Date.now() - T0) / 1000), t = pad(Math.floor(s / 3600)) + ':' + pad(Math.floor(s / 60) % 60) + ':' + pad(s % 60);
        if (t !== last.tm) { tm.textContent = t; last.tm = t; }
      }
      function pad(n) { return (n < 10 ? '0' : '') + n; }
      draw();
      r.querySelector('[data-act=reset]').addEventListener('click', function (e) { e.stopPropagation(); T0 = Date.now(); last.n = -1; draw(); Deck.toast && Deck.toast('Counter restarted', 1600); });
      if (!ctx.static) ctx.tick(draw);
      go(r, ctx);
    }
  });
})();

/* ================================================================ SLIDES 8, 9, 10 - numbers count up */
Deck.registerSlide(7, { keepBase: true, render: function (el, ctx) { addSweep(ctx, 'e5', 1.5); } });
Deck.registerSlide(8, {
  keepBase: true,
  render: function (el, ctx) { addSweep(ctx, 'e5', 1); },
  enter: function (el, ctx) { countOnShow(ctx, 'e2', '1752', { dur: 2200, delay: 600, pulse: false }); }
});
Deck.registerSlide(9, {
  keepBase: true,
  render: function (el, ctx) { var t = ctx.view.map.e16; if (t) t.classList.add('pa9-books'); },
  enter: function (el, ctx) { countOnShow(ctx, 'e16', '200', { dur: 1800, pulse: true }); }
});
Deck.registerSlide(10, {
  keepBase: true, loop: ['glow', 'pulse', 'beam'],
  enter: function (el, ctx) {
    [['e5', '1200'], ['e6', '1000'], ['e8', '800'], ['e10', '1500'], ['e11', '1000']].forEach(function (a, i) {
      countOnShow(ctx, a[0], a[1], { dur: 1600, delay: 300 + i * 160 });
    });
  }
});

/* ================================================================ NEW - screen-time calculator (after 10) */
(function () {
  var ICON_BOOK = '<svg viewBox="0 0 64 64"><path d="M8 12c8-4 17-4 24 2 7-6 16-6 24-2v38c-8-4-17-4-24 2-7-6-16-6-24-2z" fill="rgba(34,211,238,.22)" stroke="#22D3EE" stroke-width="3" stroke-linejoin="round"/><path d="M32 14v38" stroke="#22D3EE" stroke-width="3"/></svg>';
  var ICON_CAP = '<svg viewBox="0 0 64 64"><path d="M32 12 3 26l29 14 29-14z" fill="rgba(255,176,32,.25)" stroke="#FFB020" stroke-width="3" stroke-linejoin="round"/><path d="M14 33v13c10 8 26 8 36 0V33" fill="none" stroke="#FFB020" stroke-width="3"/><path d="M58 28v18" stroke="#FFB020" stroke-width="3" stroke-linecap="round"/></svg>';
  var ICON_CLK = '<svg viewBox="0 0 64 64"><circle cx="32" cy="32" r="25" fill="rgba(255,122,26,.22)" stroke="#FF7A1A" stroke-width="3"/><path d="M32 17v16l11 7" fill="none" stroke="#FF7A1A" stroke-width="3.5" stroke-linecap="round"/></svg>';
  var MAXH = 10 * 365 * 15;                       // 10 h/day from age 3 = scale for the bars
  Deck.insertSlide({
    after: 10, id: 'calculator', title: 'Screen-time calculator', section: 'problem', hidden: true, tr: { type: 'fade', ms: 800 }, loop: 'orbs',
    notes: 'Interactive. Drag the daily-hours slider (default 4.8, the Gallup teen average from slide 8) and the child\'s age. Assumptions: 365 days a year, same daily hours until 18; a book takes about 6 hours; a year of college is about 800 hours (slide 10); 1,700 hours is the yardstick from slide 9.',
    render: function (el, ctx) {
      var r = root(el, 'cx', ctx);
      r.innerHTML =
        '<div class="cx-title rv" style="--d:.1s">What do screen hours really cost?</div>' +
        '<div class="cx-sub rv" style="--d:.2s">Move the sliders. Every number below updates live.</div>' +
        '<div class="cx-card pe rv" style="left:100px;top:226px;width:770px;height:362px;--d:.3s">' +
          '<div class="cx-lab">Screen time per day</div>' +
          '<div class="cx-val"><span data-o="h">4.8</span><small>hours</small></div>' +
          '<div class="cx-row"><button class="cx-btn" data-d="h-">&minus;</button><input class="cx-range" type="range" min="0" max="10" step="0.1" value="4.8" data-in="h" aria-label="Screen hours per day"><button class="cx-btn" data-d="h+">+</button></div>' +
          '<div class="cx-scale"><span>0</span><span>5</span><span>10</span></div>' +
          '<span class="cx-chip" data-preset="4.8">Teen avg 4.8 h</span>' +
        '</div>' +
        '<div class="cx-card pe rv" style="left:100px;top:612px;width:770px;height:322px;--d:.45s">' +
          '<div class="cx-lab">Child\'s age today</div>' +
          '<div class="cx-val" style="font-size:120px"><span data-o="age">12</span><small>years old</small></div>' +
          '<div class="cx-row" style="margin-top:6px"><button class="cx-btn" data-d="a-">&minus;</button><input class="cx-range" type="range" min="3" max="17" step="1" value="12" data-in="age" aria-label="Child age"><button class="cx-btn" data-d="a+">+</button></div>' +
          '<div class="cx-scale"><span>3</span><span>10</span><span>17</span></div>' +
        '</div>' +
        '<div class="cx-tile rv" style="left:920px;--d:.5s"><b data-o="hy">0</b><span>hours a year</span></div>' +
        '<div class="cx-tile rv" style="left:1224px;--d:.6s"><b data-o="dy">0</b><span>full days a year</span></div>' +
        '<div class="cx-tile hot rv" style="left:1528px;--d:.7s"><b data-o="h18">0</b><span>hours by age 18</span></div>' +
        '<div class="cx-eq rv" style="--d:.8s"><div class="cx-eqh">What those hours could become</div>' +
          '<div class="cx-r">' + ICON_BOOK + '<b data-o="bk">0</b><em>books</em><u>assumption: about 6 hours per book</u><div class="cx-bar"><i data-bar="bk"></i></div></div>' +
          '<div class="cx-r">' + ICON_CAP + '<b data-o="cl">0</b><em>years of college</em><u>assumption: about 800 study hours per college year</u><div class="cx-bar"><i data-bar="cl"></i></div></div>' +
          '<div class="cx-r">' + ICON_CLK + '<b data-o="bl">0</b><em>&times; the 1,700-hour year</em><u>200+ books, or a new language</u><div class="cx-bar"><i data-bar="bl"></i></div></div>' +
        '</div>' +
        '<div class="cx-foot rv" style="--d:1s">Estimates, not predictions. Assumes the same daily screen time every day of the year, from today until age 18 (365 days a year).</div>';
      var S = { h: 4.8, age: 12 }, cur = {}, tgt = {};
      var o = {}; r.querySelectorAll('[data-o]').forEach(function (n) { o[n.dataset.o] = n; });
      var bars = {}; r.querySelectorAll('[data-bar]').forEach(function (n) { bars[n.dataset.bar] = n; });
      var rangeH = r.querySelector('[data-in=h]'), rangeA = r.querySelector('[data-in=age]');
      function targets() {
        var ht = Math.round(S.h * 10), yl = 18 - S.age, hy = ht * 365 / 10, h18 = ht * 365 * yl / 10;   // integer tenths: exact, deterministic
        tgt = { hy: hy, dy: hy / 24, h18: h18, bk: h18 / 6, cl: h18 / 800, bl: h18 / 1700 };
        tgt.bkb = tgt.bk / (MAXH / 6); tgt.clb = tgt.cl / (MAXH / 800); tgt.blb = tgt.bl / (MAXH / 1700);
      }
      function text(k, v) {
        if (k === 'cl' || k === 'bl') return v < 10 ? v.toFixed(1) : fmt(v);
        return fmt(v);
      }
      var lastTxt = {};
      function render(now) {
        ['hy', 'dy', 'h18', 'bk', 'cl', 'bl'].forEach(function (k) {
          var t = text(k, cur[k]); if (lastTxt[k] !== t) { o[k].textContent = t; lastTxt[k] = t; }
        });
        bars.bk.style.transform = 'scaleX(' + Math.max(.012, Math.min(1, cur.bkb)).toFixed(4) + ')';
        bars.cl.style.transform = 'scaleX(' + Math.max(.012, Math.min(1, cur.clb)).toFixed(4) + ')';
        bars.bl.style.transform = 'scaleX(' + Math.max(.012, Math.min(1, cur.blb)).toFixed(4) + ')';
      }
      function setP(inp) { inp.style.setProperty('--p', ((inp.value - inp.min) / (inp.max - inp.min) * 100) + '%'); }
      function sync() {
        o.h.textContent = S.h.toFixed(1); o.age.textContent = S.age; if (o.yl) o.yl.textContent = 18 - S.age;
        rangeH.value = S.h; rangeA.value = S.age; setP(rangeH); setP(rangeA); targets();
        if (ctx.static) { for (var k in tgt) cur[k] = tgt[k]; render(); }
      }
      ['hy', 'dy', 'h18', 'bk', 'cl', 'bl', 'bkb', 'clb', 'blb'].forEach(function (k) { cur[k] = 0; });
      sync();
      rangeH.addEventListener('input', function () { S.h = Math.round(parseFloat(rangeH.value) * 10) / 10; sync(); });
      rangeA.addEventListener('input', function () { S.age = parseInt(rangeA.value, 10); sync(); });
      [rangeH, rangeA].forEach(function (inp) { inp.addEventListener('pointerup', function () { inp.blur(); }); inp.addEventListener('change', function () { inp.blur(); }); });
      r.addEventListener('click', function (e) {
        var b = e.target.closest('[data-d],[data-preset]'); if (!b) return; e.stopPropagation();
        if (b.dataset.preset) S.h = parseFloat(b.dataset.preset);
        else if (b.dataset.d === 'h-') S.h = Math.max(0, Math.round((S.h - .5) * 10) / 10);
        else if (b.dataset.d === 'h+') S.h = Math.min(10, Math.round((S.h + .5) * 10) / 10);
        else if (b.dataset.d === 'a-') S.age = Math.max(3, S.age - 1);
        else if (b.dataset.d === 'a+') S.age = Math.min(17, S.age + 1);
        sync();
      });
      if (!ctx.static) ctx.tick(function (dt) {
        var a = 1 - Math.pow(.0016, dt / 1000), dirty = false;
        for (var k in tgt) { var d = tgt[k] - cur[k]; if (Math.abs(d) > (/^(hy|dy|h18|bk|cl|bl)$/.test(k) ? .02 : 1e-4 * Math.max(1, Math.abs(tgt[k])))) { cur[k] += d * a; dirty = true; } else cur[k] = tgt[k]; }
        if (dirty || !lastTxt.hy) render();
      });
      go(r, ctx);
    }
  });
})();

/* ================================================================ SLIDE 21 / 23 - mood */
Deck.registerSlide(21, {
  keepBase: true,
  render: function (el, ctx) {
    if (ctx.static) return;
    var r = root(el, 'pa21', ctx); r.style.pointerEvents = 'none';
    r.innerHTML = '<div class="dv-glow" style="left:60px;top:300px;width:1000px;height:520px;background:radial-gradient(ellipse,rgba(255,60,50,.28),transparent 70%)"></div><div class="dv-beam" style="--d:0s"></div>';
  }
});
Deck.registerSlide(23, {
  keepBase: true,
  render: function (el, ctx) {
    if (ctx.static) return;
    var r = root(el, 'pa23', ctx); r.style.pointerEvents = 'none';
    r.innerHTML = '<div class="pa-redglow"></div>';
    var h = ctx.view.map.e9218; if (h) h.classList.add('pa-flick');
  }
});

/* ================================================================ SLIDE 24 - clickable signs checklist */
Deck.registerSlide(24, {
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
Deck.registerSlide(27, {
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
  Deck.registerSlide(28, {
    keepBase: true,
    render: function (el, ctx) {
      var m = ctx.view.map, pic = m.e5, qr = m.e10242;
      if (pic) { pic.style.left = '1000px'; pic.style.top = '716px'; pic.style.width = '330px'; pic.style.height = '310px'; }
      if (qr) { qr.style.left = '1380px'; qr.style.top = '728px'; qr.style.width = '300px'; qr.style.height = '300px'; }
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
        '<div class="dp-ill" style="left:130px;text-align:right;right:24px">Illustrative schematic, not measured data</div></div>';
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
Deck.registerSlide(31, divider({ c1: '#FF4D4D', c2: '#FFB020', glow: 'left:70px;top:40px;width:1220px;height:420px;background:radial-gradient(ellipse,rgba(255,70,60,.30),transparent 70%)' }));
Deck.registerSlide(36, divider({ c1: '#FF4D4D', c2: '#FFB020', glow: 'left:70px;top:40px;width:1220px;height:420px;background:radial-gradient(ellipse,rgba(255,60,60,.30),transparent 70%)' }));

/* ================================================================ SLIDE 38 - Which games are most popular nowadays? */
Deck.registerSlide(38, {
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
