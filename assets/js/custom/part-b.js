/* ============================================================================
   part-b.js - custom, animated and interactive slides for original slides 48-112
   plus the new closing slide ("shepherd"). Self-contained: CSS is injected below.
   Sections: 0 helpers/css . 1 data patches . 2 section dividers (48, 54) . 3 slide 55 evidence
             4 chat slides (57, 59, 60) . 5 tech-free / slow phones (66, 70) . 6 boring-devices phone (71, 72)
             7 framed light pictures (97, 98, 112) . 8 charts (106-109) . 9 small loops . 10 closing slide
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

/* ---- 48 hopeful divider ---- */
'.pb48-rays{position:absolute;left:50%;top:-6%;width:2800px;height:2800px;margin:-1400px 0 0 -1400px;opacity:.5;mix-blend-mode:screen;pointer-events:none;',
' background:repeating-conic-gradient(from 0deg at 50% 50%,rgba(255,226,150,.0) 0deg,rgba(255,226,150,.5) 4deg,rgba(255,226,150,0) 9deg,rgba(255,226,150,0) 20deg);',
' -webkit-mask-image:radial-gradient(circle at 50% 50%,#000 0,rgba(0,0,0,.55) 22%,transparent 50%);mask-image:radial-gradient(circle at 50% 50%,#000 0,rgba(0,0,0,.55) 22%,transparent 50%);animation:pb48spin 160s linear infinite;will-change:transform}',
'@keyframes pb48spin{to{transform:rotate(360deg)}}',
'.pb48-warm{position:absolute;inset:0;background:radial-gradient(900px 600px at 66% 6%,rgba(255,214,120,.38),transparent 70%);mix-blend-mode:screen;pointer-events:none;animation:pbbreathe 7s ease-in-out infinite}',
'.pb48-mote{position:absolute;bottom:-30px;left:var(--x);width:var(--s);height:var(--s);border-radius:50%;background:rgba(255,236,170,.9);box-shadow:0 0 calc(var(--s)*3) rgba(255,214,120,.8);opacity:0;animation:pb48mote var(--t) ease-in-out infinite;animation-delay:var(--d);pointer-events:none}',
'@keyframes pb48mote{0%{transform:translate3d(0,0,0);opacity:0}15%{opacity:.9}85%{opacity:.7}100%{transform:translate3d(var(--dx),-1050px,0);opacity:0}}',
'.pb48-sweep{position:absolute;overflow:hidden;pointer-events:none;mix-blend-mode:soft-light}',
'.pb48-sweep::before{content:"";position:absolute;top:-20%;bottom:-20%;left:0;width:30%;background:linear-gradient(100deg,transparent,rgba(255,255,255,.95),transparent);transform:translateX(-120%) skewX(-14deg);animation:pb48sw 6s ease-in-out infinite}',
'@keyframes pb48sw{0%,35%{transform:translateX(-120%) skewX(-14deg)}85%,100%{transform:translateX(420%) skewX(-14deg)}}',

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

/* ---- closing slide ---- */
'.pbc{position:absolute;inset:0;overflow:hidden;background:#03040c;pointer-events:none}',
'.pbc *{box-sizing:border-box}',
'.pbc-room{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,#0a1a20 0%,#03040a 70%)}',
'.pbc-glow{position:absolute;left:50%;top:52%;width:1500px;height:1500px;margin:-750px 0 0 -750px;border-radius:50%;background:radial-gradient(circle,rgba(120,235,255,.55) 0%,rgba(34,211,238,.28) 28%,rgba(20,140,160,.12) 48%,transparent 66%);animation:pbcglow 2.6s ease-in-out infinite;transition:opacity 1.6s ease,transform 2s ease}',
'@keyframes pbcglow{0%,100%{opacity:.78}50%{opacity:1}}',
'.s1 .pbc-glow{opacity:0!important;transform:scale(.55)}',
'.pbc-sky{position:absolute;inset:0;opacity:0;background:linear-gradient(180deg,#02060C 0%,#03101A 34%,#062033 62%,#0B3B45 84%,#14564F 100%);transition:opacity 1.2s ease}',
'.s1 .pbc-sky{opacity:1;transition:opacity 3.2s ease 1.1s}',
'.pbc-aur{position:absolute;left:-10%;top:5%;width:120%;height:46%;opacity:0;background:radial-gradient(closest-side at 30% 60%,rgba(70,230,190,.14),transparent),radial-gradient(closest-side at 72% 40%,rgba(34,211,238,.16),transparent);animation:pbcaur 26s ease-in-out infinite alternate;transition:opacity 3s ease}',
'.s1 .pbc-aur{opacity:1;transition-delay:2.2s}',
'@keyframes pbcaur{from{transform:translateX(-5%) scaleY(.9)}to{transform:translateX(6%) scaleY(1.12)}}',
'.pbc-stars{position:absolute;inset:0;width:1920px;height:1080px}',
'.pbc-moon{position:absolute;left:1560px;top:96px;width:190px;height:190px;opacity:0;transition:opacity .8s}',
'.pbc-moon .halo{position:absolute;left:-150px;top:-150px;width:490px;height:490px;border-radius:50%;background:radial-gradient(circle,rgba(255,236,190,.34),rgba(255,236,190,.0) 66%);animation:pbbreathe 8s ease-in-out infinite}',
'.pbc-moon svg{position:absolute;inset:0;width:100%;height:100%}',
'.s1 .pbc-moon{opacity:1;transition:opacity 3s ease 2.2s}',
'.pbc-hills{position:absolute;inset:0;width:1920px;height:1080px;opacity:0;transition:opacity .8s}',
'.s1 .pbc-hills{opacity:1;transition:opacity 2.4s ease 1.6s}',
'.pbc-fig{position:absolute;left:1190px;top:305px;width:560px;height:640px;opacity:0;transform:translateY(46px);transition:opacity .8s,transform .8s}',
'.pbc-fig svg{width:100%;height:100%;overflow:visible;transform-origin:50% 100%;animation:pbcbreath 7s ease-in-out infinite}',
'@keyframes pbcbreath{0%,100%{transform:scale(1,1)}50%{transform:scale(1.004,1.008)}}',
'.s1 .pbc-fig{opacity:1;transform:none;transition:opacity 3s ease 3.2s,transform 3.4s cubic-bezier(.2,.7,.2,1) 3.2s}',
'.pbc-point{transform-origin:360px 408px;animation:pbcpoint 6s ease-in-out infinite}',
'@keyframes pbcpoint{0%,100%{transform:rotate(0)}50%{transform:rotate(-5deg)}}',
'.pbc-phone{position:absolute;left:760px;top:120px;width:400px;height:840px;border-radius:64px;background:#070C0F;padding:14px;box-shadow:0 0 0 2px #22302F,0 0 0 6px #0A1214,0 0 120px 20px rgba(34,211,238,.50),0 40px 100px rgba(0,0,0,.8);',
' transform-origin:50% 50%;transition:transform 2.4s cubic-bezier(.6,0,.3,1),opacity 1.4s,box-shadow 1.6s;pointer-events:auto;cursor:pointer;animation:pbcsh 3.4s ease-in-out infinite}',
'@keyframes pbcsh{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}',
'.pbc-phone .scr{position:relative;width:100%;height:100%;border-radius:50px;overflow:hidden;background:#0E171C}',
'.pbc-phone .feed{position:absolute;left:0;right:0;top:0;animation:pbcfeed 7s linear infinite}',
'@keyframes pbcfeed{to{transform:translateY(-50%)}}',
'.pbc-card{margin:0 16px 18px;border-radius:22px;background:rgba(255,255,255,.08);padding:14px 14px 16px;box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}',
'.pbc-card .hd{display:flex;align-items:center;gap:12px;margin-bottom:12px}.pbc-card .av{width:44px;height:44px;border-radius:50%}',
'.pbc-card .ln{height:11px;border-radius:6px;background:rgba(255,255,255,.4)}.pbc-card .ln.s{width:46%;margin-top:8px;opacity:.55}.pbc-card .ln.l{width:62%}',
'.pbc-card .im{height:var(--h,190px);border-radius:14px}',
'.pbc-card .ac{display:flex;gap:16px;margin-top:12px}.pbc-card .ac span{width:30px;height:26px;border-radius:9px;background:rgba(255,255,255,.4)}.pbc-card .ac span:first-child{background:#ff4d6d}',
'.pbc-phone .bar{position:absolute;top:0;left:0;right:0;height:78px;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:6px 30px 0;font:700 21px var(--f-body);color:#fff;background:linear-gradient(180deg,rgba(6,12,15,.95),transparent)}',
'.pbc-phone .notch{position:absolute;left:50%;top:14px;width:120px;height:32px;margin-left:-60px;border-radius:20px;background:#000;z-index:4}',
'.pbc-phone .off{position:absolute;inset:0;background:#05090b;opacity:0;z-index:5;transition:opacity 1.5s ease}',
'.s1 .pbc-phone .off{opacity:.97}',
'.s1 .pbc-phone{animation:none;box-shadow:0 0 0 2px #1d2a2c,0 0 0 6px #0a1214,0 20px 40px rgba(0,0,0,.7);transform:translate(-520px,415px) rotate(-76deg) scale(.17);opacity:.9;transition:transform 2.6s cubic-bezier(.6,0,.3,1) 1.6s,opacity 1.4s,box-shadow 1.6s}',
'.pbc-bub{position:absolute;width:66px;height:66px;opacity:0;pointer-events:none;animation:pbcbub 4.6s ease-in-out infinite;animation-delay:var(--d);transition:opacity .8s}',
'.pbc-bub svg{width:100%;height:100%}',
'@keyframes pbcbub{0%,100%{transform:translateY(0) rotate(-6deg);opacity:.9}50%{transform:translateY(-22px) rotate(6deg);opacity:1}}',
'.pbc-bubs{opacity:1;transition:opacity 1s}.s1 .pbc-bubs{opacity:0}',
'.pbc-bubs .pbc-bub{opacity:.9}',
'.pbc-hint{position:absolute;left:0;right:0;top:972px;text-align:center;font:600 26px var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:rgba(190,225,255,.8);pointer-events:auto;cursor:pointer;transition:opacity .8s;animation:pbbreathe 2.4s ease-in-out infinite}',
'.s1 .pbc-hint{animation:none;opacity:0;pointer-events:none}',
'.pbc-tx{position:absolute;left:128px;width:1010px;color:#F4F1EA;pointer-events:none}',
'.pbc-ar{font:400 64px/1.5 "Amiri","Noto Naskh Arabic","Traditional Arabic","Geeza Pro","Segoe UI",serif;direction:rtl;text-align:left;color:#ffe9b8;opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s}',
'.pbc-q{font:italic 500 62px/1.22 var(--f-display);margin-top:18px;opacity:0;transform:translateY(24px);transition:opacity .6s,transform .6s;text-shadow:0 4px 34px rgba(2,6,9,.9)}',
'.pbc-src{margin-top:26px;font:700 26px var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:var(--amber);opacity:0;transition:opacity .6s;text-shadow:0 2px 14px rgba(2,6,9,.9)}',
'.s2 .pbc-ar{opacity:1;transform:none;transition:opacity 1.6s ease .1s,transform 1.6s ease .1s}',
'.s2 .pbc-q{opacity:1;transform:none;transition:opacity 1.8s ease .9s,transform 1.8s ease .9s}',
'.s2 .pbc-src{opacity:1;transition:opacity 1.6s ease 2.2s}',
'.s3 .pbc-ar,.s3 .pbc-q,.s3 .pbc-src{opacity:.5;transition:opacity 1.4s ease}',
'.pbc-fin{position:absolute;left:128px;top:600px;width:1060px;font:600 104px/1.04 var(--f-display);letter-spacing:-.015em;color:#fff6df;opacity:0;transform:translateY(30px);filter:blur(10px);',
' text-shadow:0 0 50px rgba(255,176,32,.75),0 6px 40px rgba(2,6,9,.9);transition:opacity .5s,transform .5s,filter .5s;pointer-events:none}',
'.s3 .pbc-fin{opacity:1;transform:none;filter:blur(0);transition:opacity 2s ease .1s,transform 2s cubic-bezier(.2,.7,.2,1) .1s,filter 2s ease .1s}',
'.pbc-fin em{font-style:italic;color:var(--amber)}',
'.inst *{transition-duration:0s!important;transition-delay:0s!important}',
'.pbc-ghost{position:absolute;width:34px;height:34px;margin:-17px 0 0 -17px;border-radius:50%;background:radial-gradient(circle,rgba(255,236,170,.65),transparent 70%);opacity:0;pointer-events:none}',
'@media (prefers-reduced-motion:reduce){.pb48-rays,.pb48-warm,.pb48-mote,.pb48-sweep::before,.pb54-breath,.pb54-line,.pb-ring,.pb-shine::before,.pbc-phone,.pbc-phone .feed,.pbc-glow,.pbc-bub,.pbc-fig svg,.pbc-point,.pbc-aur,.pb-float,.pb7-buzz,.pb7-badge,.pb7-wiggle,.pb66-badge::before,.pb66-badge::after,.pb70-spin svg,.pbc-band::before{animation:none!important}}'
].join('\n');

(function injectCss() {
  if (document.getElementById('part-b-css')) return;
  var st = document.createElement('style'); st.id = 'part-b-css'; st.textContent = CSS; document.head.appendChild(st);
})();

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function svgEl(tag, attrs, parent) { var e = document.createElementNS(NS, tag); for (var k in attrs) e.setAttribute(k, attrs[k]); if (parent) parent.appendChild(e); return e; }
function clamp(v, a, b) { return Math.max(a, Math.min(b, v)); }
function rng(seed) { var s = (seed * 2654435761) >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
var byN = {}; D.slides.forEach(function (s) { byN[s.n] = s; });
function elData(n, id) { var s = byN[n]; if (!s) return null; for (var i = 0; i < s.els.length; i++) if (s.els[i].id === id) return s.els[i]; return null; }
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
  var s55 = byN[55];
  if (s55) {
    var t = elData(55, 'e2'); t.x = 5; t.y = 2.4; t.w = 90; t.h = 15.5; t.anchor = 'ctr'; t.paras.forEach(function (p) { p.al = 'center'; });
    var k = elData(55, 'e1026'); k.x = 25 - k.w / 2; k.y = 20;
    var ph = elData(55, 'e1028'); ph.w *= 1.2; ph.h *= 1.2; ph.x = 75 - ph.w / 2; ph.y = 17.5;
    // stats are two cards in their own band under the pictures (never under the UNSW picture)
    var a = elData(55, 'e3'); a.x = 6; a.y = 70; a.w = 38; a.h = 21.5; a.anchor = 'ctr';
    var b = elData(55, 'e4'); b.x = 52; b.y = 70; b.w = 34; b.h = 21.5; b.anchor = 'ctr';
    [a, b].forEach(function (e) { e.paras.forEach(function (p) { p.al = 'center'; p.runs.forEach(function (r) { r.sz = 42; }); }); });
    // UNSW card: sits above the stat band (y 19% .. 68%)
    var u = elData(55, 'e7'); u.w = 800 / W * 100; u.x = (100 - u.w) / 2; u.y = 19; u.h = u.w * W / 100 * (1594 / 2400) / H * 100;
    var q = elData(55, 'e12290'); q.x = 89; q.y = 79; q.w = 9; q.h = 9 * W / H;
  }
  // 97 / 98: light full-bleed pictures become framed cards
  var p97 = elData(97, 'e12');
  if (p97) { p97.bleed = false; p97.card = true; p97.x = 10; p97.y = 10; p97.w = 80; p97.h = 80; }
  if (byN[98]) {
    byN[98].els = byN[98].els.filter(function (e) { return e.id !== 'e4'; });
    var p98 = elData(98, 'e4098'); p98.x = (100 - 950 / W * 100) / 2; p98.y = 6.5; p98.w = 950 / W * 100; p98.h = 88;
  }
  var p112 = elData(112, 'e3');
  if (p112) { p112.bleed = false; p112.card = true; }
})();

/* ---------------------------------------------------------------- 2. dividers */
/* 48 - How to treat device addiction? (hopeful amber) */
add(48, {
  keepBase: true, loop: false,
  render: function (el, ctx) {
    var r = rng(48);
    h('div', 'pb48-warm', el);
    var rays = h('div', 'pb48-rays', el); rays.style.left = '66%'; rays.style.top = '4%';
    for (var i = 0; i < 22; i++) {
      var m = h('div', 'pb48-mote', el);
      m.style.cssText = '--x:' + Math.round(80 + r() * 1760) + 'px;--s:' + (3 + r() * 6).toFixed(1) + 'px;--t:' + Math.round(14 + r() * 14) + 's;--d:' + (-r() * 24).toFixed(1) + 's;--dx:' + Math.round((r() - .5) * 240) + 'px';
    }
    var t = px(48, 'e2'), sw = h('div', 'pb48-sweep', el);
    sw.style.cssText = 'left:' + t.x + 'px;top:' + (t.y + 20) + 'px;width:' + t.w + 'px;height:' + (t.h - 40) + 'px';
  }
});
/* 54 - Child Grooming & Suicide (dark, restrained). Title element + morph key untouched. */
add(54, {
  keepBase: true, loop: false,
  render: function (el, ctx) {
    h('div', 'pb54-breath', el); h('div', 'pb54-vig', el);
    var t = px(54, 'e2'), l = h('div', 'pb54-line', el); l.style.top = Math.round(t.y + t.h * .5 + 92) + 'px';
  }
});

/* ---------------------------------------------------------------- 3. slide 55 */
add(55, {
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
chatTyping(59, [[5100, 'e17', 'e19'], [8200, 'e12', 'e21'], [11300, 'e22', 'e23'], [14400, 'e26', 'e25'], [17500, 'e27', 'e28'], [18600, 'e29', 'e30']]);
chatTyping(60, [[4100, 'e6', 'e8'], [6200, 'e11', 'e13']]);
add(59, { loop: 'orbs' });
add(60, { loop: 'orbs' });
add(60, {
  keepBase: true,
  render: function (el, ctx) {
    var b = h('div', 'pb60-pres', el, '<span class="n">Susan</span><span class="d"></span><span class="o">online</span>');
    b.style.left = '1478px'; b.style.top = '40px';  // beside the phone, clear of the chat text
  }
});

/* 57 (video, calm): small typing indicator before each chat line - driven by the click step */
(function chat57() {
  var shown = [], tms = [], dog = 0;
  function clear() { shown.forEach(function (r) { r.pill.remove(); }); shown = []; tms.forEach(clearTimeout); tms = []; clearInterval(dog); dog = 0; }
  Deck.on('step', function (k, view) {
    if (!view || !view.slide || view.slide.n !== 57) return;
    clear();
    if (k !== 1) return;
    var ctx = view.ctx, el = view.custom;
    function hidden(id) { var x = view.map[id]; return !!x && x.classList.contains('pre'); }
    function drop(r) { r.pill.remove(); shown = shown.filter(function (q) { return q !== r; }); }
    function pillAt(id, tid, t0, t1) {
      var g = px(57, id), rec = null;
      tms.push(setTimeout(function () {
        if (!hidden(tid)) return;
        var p = typingPill(el, false, true); p.style.left = (g.x + 70) + 'px'; p.style.top = (g.y + 4) + 'px'; p.style.height = '54px';
        rec = { pill: p, tid: tid }; shown.push(rec);
      }, t0));
      tms.push(setTimeout(function () { if (rec && rec.pill.isConnected) drop(rec); }, t1));
    }
    pillAt('e4', 'e4', 1100, 2000);
    pillAt('e9', 'e9', 4700, 5500);
    dog = setInterval(function () { shown.slice().forEach(function (r) { if (!hidden(r.tid)) drop(r); }); }, 60);
  });
  add(57, { leave: clear });
  /* the two original cursor blocks (e6 after "Hey, how are you?", e10 after "Fine - who are you?") follow the revealed text edge */
  add(57, {
    render: function (el, ctx) { ['e6', 'e10'].forEach(function (id) { var c = ctx.view.map[id]; if (c) c.classList.add('pb-cur', 'on'); }); },
    enter: function (el, ctx) {
      var pairs = [['e4', 'e6'], ['e9', 'e10']].map(function (pr) {
        var t = E(ctx, pr[0]), c = E(ctx, pr[1]), sp = t && t.querySelector('p'); if (!sp || !c) return null;
        var r = document.createRange(); r.selectNodeContents(sp); var rc = r.getClientRects(); if (!rc.length || !t.offsetWidth) return null;
        var tb = t.getBoundingClientRect(), k = tb.width / t.offsetWidth, f = rc[0], l = rc[rc.length - 1];
        var fs = parseFloat(getComputedStyle(sp).fontSize) || 40, w = Math.round(fs * .52), hh = Math.round(fs * 1.02), gap = Math.round(fs * .1);
        var x0 = t.offsetLeft + (f.left - tb.left) / k, x1 = t.offsetLeft + (l.right - tb.left) / k;
        c.style.width = w + 'px'; c.style.height = hh + 'px'; c.style.minHeight = '0';
        c.style.top = (t.offsetTop + (f.top - tb.top) / k + ((f.height / k) - hh) / 2) + 'px';
        return { t: t, c: c, x0: x0, x1: x1, w: w, gap: gap, E: t.offsetWidth, L: t.offsetLeft };
      }).filter(Boolean);
      ctx.tick(function () {
        pairs.forEach(function (p) {
          var left, an = p.t.getAnimations ? p.t.getAnimations().filter(function (a) { return a.effect && a.playState === 'running'; })[0] : null;
          if (p.t.classList.contains('pre')) left = p.x0;
          else if (an) { var pr = an.effect.getComputedTiming().progress || 0; left = Math.max(p.x0, Math.min(p.x1 + p.gap, p.L + p.E * pr + p.gap)); }
          else left = p.x1 + p.gap;
          p.c.style.left = left + 'px';
        });
      });
    }
  });
})();

/* ---------------------------------------------------------------- 5. tech free zones (66) and slow phones (70) */
function noDeviceSVG() {
  var s = document.createElementNS(NS, 'svg'); s.setAttribute('viewBox', '0 0 170 170');
  s.innerHTML = '<circle cx="85" cy="85" r="76" fill="rgba(12,8,8,.8)" stroke="#FF4D4D" stroke-width="9"/>' +
    '<rect x="58" y="36" width="54" height="98" rx="11" fill="none" stroke="#fff" stroke-width="7"/><circle cx="85" cy="120" r="4.5" fill="#fff"/><rect x="72" y="44" width="26" height="4" rx="2" fill="#fff"/>' +
    '<path class="pb66-slash" d="M38 132 L132 38" stroke="#FF4D4D" stroke-width="10" stroke-linecap="round" fill="none"/>';
  return s;
}
add(66, {
  keepBase: true,
  render: function (el, ctx) {
    [['e12290', -2], ['e12292', -2]].forEach(function (pr) {
      var g = px(66, pr[0]), b = h('div', 'pb66-badge', el);
      b.style.left = (g.x + g.w - 6) + 'px'; b.style.top = (g.y + 8) + 'px'; b.appendChild(noDeviceSVG());
    });
  },
  loop: 'orbs'
});
loops(66, { float: ['e12290', 'e12292'] });

add(70, {
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
phoneMock(71, { bw: false, mute: false });
phoneMock(72, { bw: true, mute: true });
Deck.on('step', function (k, view) { if (view && view.slide && view.slide.n === 71 && view.__pb7) view.__pb7.setByStep(k); });
loops(72, { shine: ['e5', 'e6'] });
loops(71, { shine: ['e14', 'e15'] });

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
framed(97, 'e12'); framed(98, 'e4098'); framed(112, 'e3', 'pb-frame112');
loops(112, { ring: ['e6'], float: ['e2'] });

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
chart(106, 'e1026', 'e4', 'Smartphone era');
chart(107, 'e5122', 'e4', 'Smartphone era');
chart(108, 'e3074', 'e4', 'Smartphone era');
chart(109, 'e3074', 'e4', 'Smartphone era');
loops(109, { float: ['e1028', 'e1030', 'e1032', 'e1034'] });

/* ---------------------------------------------------------------- 9. light motion on other slides (calm slides 51, 57, 58, 74, 90, 93 are left alone) */
loops(49, { shine: ['e3'] });
loops(50, { shine: ['e3'], glow: ['e7'] });
loops(61, { shine: ['e7'] });
loops(62, { shine: ['e3'] });
loops(63, { shine: ['e7'] });
loops(64, { red: ['e10'] });
add(64, { loop: ['kenburns2', 'sparks', 'beam', 'scan', 'caret'] });
loops(73, { shine: ['e9218'], red: ['e2'] });
loops(87, { shine: ['e4'] });
loops(88, { shine: ['e7'], glow: ['e4'] });
loops(91, { shine: ['e3'], glow: ['e4'] });
loops(92, { shine: ['e3'] });
loops(94, { shine: ['e3'], glow: ['e4'] });
loops(95, { shine: ['e3', 'e5', 'e21506'] });
loops(96, { shine: ['e4'], glow: ['e2'] });
loops(105, { ring: ['e20482'], shine: ['e2'] });
loops(110, { glow: ['e6'] });
loops(56, { red: ['e3'] });
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
parkCaret(56, 'e3', 'e4', 900);
add(56, { loop: ['scan', 'embers'] });  // the parked original cursor is the caret here
parkCaret(58, 'e5', 'e7', 900);

/* ---------------------------------------------------------------- 10. NEW closing slide */
var CL = 'shepherd-close';
function figureSVG() {
  return '<svg viewBox="0 0 560 640" xmlns="http://www.w3.org/2000/svg">' +
    '<defs><linearGradient id="pbcrim" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d6f6ff" stop-opacity=".75"/><stop offset=".45" stop-color="#7fc8d6" stop-opacity=".25"/><stop offset="1" stop-color="#7fc8d6" stop-opacity="0"/></linearGradient></defs>' +
    '<g fill="#04080b" stroke="url(#pbcrim)" stroke-width="2.2" stroke-linejoin="round">' +
    /* parent: head, neck, long garment */
    '<ellipse cx="196" cy="150" rx="31" ry="36" transform="rotate(-9 196 150)"/>' +
    '<rect x="184" y="178" width="26" height="30" rx="8" stroke="none"/>' +
    '<path d="M158 214 C166 196 228 196 236 214 C248 262 252 300 258 360 C264 450 268 540 274 626 L128 626 C134 540 138 450 142 360 C146 300 150 262 158 214Z"/>' +
    '</g>' +
    '<g fill="none" stroke="#04080b" stroke-linecap="round" stroke-linejoin="round">' +
    /* parent arms: left arm rests, right arm holds the child's hand */
    '<path d="M168 228 Q142 300 154 392" stroke-width="22"/>' +
    '<path d="M228 228 Q266 312 296 408" stroke-width="22"/>' +
    '</g>' +
    '<g fill="#04080b" stroke="url(#pbcrim)" stroke-width="2" stroke-linejoin="round">' +
    /* child: head tilted up, tunic */
    '<circle cx="352" cy="352" r="25" transform="rotate(-14 352 352)"/>' +
    '<path d="M326 392 C334 380 372 380 380 392 L388 520 L318 520Z"/>' +
    '</g>' +
    '<g fill="none" stroke="#04080b" stroke-linecap="round">' +
    '<path d="M333 530 L330 626 M373 530 L376 626" stroke-width="17"/>' +
    '<path d="M330 402 L298 408" stroke-width="12"/>' +
    '<g class="pbc-point"><path d="M376 402 L428 330" stroke-width="12"/></g>' +
    '</g>' +
    '</svg>';
}
function moonSVG() {
  return '<svg viewBox="0 0 190 190"><defs><mask id="pbcmoon"><rect width="190" height="190" fill="#000"/><circle cx="95" cy="95" r="78" fill="#fff"/><circle cx="130" cy="78" r="70" fill="#000"/></mask></defs>' +
    '<circle cx="95" cy="95" r="78" fill="#fff1cf" mask="url(#pbcmoon)"/></svg>';
}
function feedHTML() {
  var cols = [[18, 42], [190, 155], [6, 30], [160, 190]], out = '', i;
  for (var rep = 0; rep < 2; rep++) {
    for (i = 0; i < 4; i++) {
      var c = cols[i];
      out += '<div class="pbc-card"><div class="hd"><div class="av" style="background:hsl(' + c[0] + ',80%,62%)"></div><div style="flex:1"><div class="ln l"></div><div class="ln s"></div></div></div>' +
        '<div class="im" style="--h:' + (150 + i * 24) + 'px;background:linear-gradient(135deg,hsl(' + c[0] + ',85%,58%),hsl(' + c[1] + ',85%,48%))"></div><div class="ac"><span></span><span></span><span></span></div></div>';
    }
  }
  return out;
}
function bubbleSVG(kind) {
  if (kind === 'heart') return '<svg viewBox="0 0 66 66"><path d="M33 56C12 41 8 28 12 20c4-8 15-8 21 0 6-8 17-8 21 0 4 8 0 21-21 36z" fill="#ff3b4e" stroke="#ffb3bb" stroke-width="2.5"/></svg>';
  if (kind === 'chat') return '<svg viewBox="0 0 66 66"><path d="M10 14h46a6 6 0 0 1 6 6v22a6 6 0 0 1-6 6H30l-12 10V48h-8a6 6 0 0 1-6-6V20a6 6 0 0 1 6-6z" fill="#51D0FF" stroke="#c6efff" stroke-width="2.5"/></svg>';
  return '<svg viewBox="0 0 66 66"><circle cx="33" cy="33" r="26" fill="#ff3b4e" stroke="#ffb3bb" stroke-width="2.5"/><rect x="29.5" y="16" width="7" height="22" rx="3.5" fill="#fff"/><circle cx="33" cy="47" r="4.2" fill="#fff"/></svg>';
}

Deck.insertSlide({
  after: 110, id: CL, title: 'Give them back their childhood', section: 'evidence', hidden: true,
  notes: 'Quiet closing. Click once (or tap the phone): the phone dims and the night sky appears with a parent and child. Move the mouse to light the stars. Click again for the hadith, once more for the closing line. Hadith: "Each of you is a shepherd, and each of you is responsible for his flock." - Sahih al-Bukhari and Sahih Muslim.',
  tr: { type: 'fade', ms: 1000 },
  steps: 3, loop: false,
  render: function (el, ctx) {
    var root = h('div', 'pbc', el);
    h('div', 'pbc-room', root);
    var glow = h('div', 'pbc-glow', root);
    h('div', 'pbc-sky', root); h('div', 'pbc-aur', root);
    var cv = h('canvas', 'pbc-stars', root); cv.width = W; cv.height = H;
    var moon = h('div', 'pbc-moon', root, '<div class="halo"></div>' + moonSVG());
    var hills = h('div', 'pbc-hills', root);
    hills.innerHTML = '<svg viewBox="0 0 1920 1080" width="1920" height="1080"><defs><linearGradient id="pbch1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B2A33"/><stop offset="1" stop-color="#040E14"/></linearGradient></defs>' +
      '<path fill="url(#pbch1)" d="M0 1080 L0 800 C300 740 560 790 860 822 C1160 852 1400 770 1700 792 C1800 800 1860 812 1920 802 L1920 1080Z"/>' +
      '<path fill="#04080b" d="M0 1080 L0 936 C260 886 520 906 800 944 C1100 986 1380 940 1620 932 C1760 928 1860 936 1920 946 L1920 1080Z"/>' +
      '<path fill="none" stroke="rgba(140,230,240,.22)" stroke-width="2" d="M0 936 C260 886 520 906 800 944 C1100 986 1380 940 1620 932 C1760 928 1860 936 1920 946"/></svg>';
    var fig = h('div', 'pbc-fig', root, figureSVG());
    // glowing phone
    var bubs = h('div', 'pbc-bubs', root);
    [['heart', 640, 250, 0], ['chat', 1210, 330, -1.4], ['alert', 700, 640, -2.6], ['heart', 1180, 700, -3.4], ['chat', 590, 470, -.8], ['alert', 1240, 520, -2]].forEach(function (b) {
      var d = h('div', 'pbc-bub', bubs, bubbleSVG(b[0])); d.style.left = b[1] + 'px'; d.style.top = b[2] + 'px'; d.style.setProperty('--d', b[3] + 's');
    });
    var phone = h('div', 'pbc-phone pe', root, '<div class="scr"><div class="bar"><span>9:41</span><span>5G</span></div><div class="notch"></div><div class="feed">' + feedHTML() + '</div><div class="off"></div></div>');
    phone.setAttribute('data-noadvance', '');
    var hint = h('div', 'pbc-hint pe', root, 'Switch it off'); hint.setAttribute('data-noadvance', '');
    function go(ev) { ev.stopPropagation(); if (ctx.view.k === 0) Deck.next(); }
    phone.addEventListener('click', go); hint.addEventListener('click', go);
    var tx = h('div', 'pbc-tx', root);
    tx.style.top = '150px';
    tx.innerHTML = '<div class="pbc-ar" lang="ar" dir="rtl">كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْئُولٌ عَنْ رَعِيَّتِهِ</div>' +
      '<div class="pbc-q">&ldquo;Each of you is a shepherd, and each of you is responsible for his flock.&rdquo;</div>' +
      '<div class="pbc-src">Sahih al-Bukhari &amp; Sahih Muslim</div>';
    h('div', 'pbc-fin', root, 'Give them back<br><em>their childhood.</em>');
    var ghost = h('div', 'pbc-ghost', root);

    /* ---- star field model ---- */
    var r = rng(2024), stars = [], i;
    for (i = 0; i < 230; i++) {
      var y = Math.pow(r(), 1.35) * 860;
      stars.push({ x: r() * W, y: y, z: .6 + r() * 1.7, p: r() * 6.28, v: .5 + r() * 1.6, lit: 0, gold: r() < .14 });
    }
    // guide stars bright enough to read as constellation (a little cluster over the figures)
    [[1330, 250], [1410, 205], [1500, 238], [1560, 300], [1470, 330], [1390, 300]].forEach(function (c) { stars.push({ x: c[0], y: c[1], z: 2.1, p: 1, v: .9, lit: 0, gold: true }); });
    var g = cv.getContext('2d');
    var model = { vis: ctx.static ? 1 : 0, targetVis: ctx.static ? 1 : 0, mx: -999, my: -999, last: 0, shoot: null, nextShoot: 5000, ghostOn: false };
    function draw(t, dt) {
      model.vis += (model.targetVis - model.vis) * Math.min(1, dt / (model.targetVis > model.vis ? 1400 : 300));
      g.clearRect(0, 0, W, H);
      if (model.vis < .01) return;
      var lit = [];
      for (var k = 0; k < stars.length; k++) {
        var s = stars[k], dx = s.x - model.mx, dy = s.y - model.my, d2 = dx * dx + dy * dy;
        if (d2 < 36000) s.lit = Math.max(s.lit, 1 - Math.sqrt(d2) / 190); else s.lit *= (1 - Math.min(1, dt / 900));
        var tw = .5 + .5 * Math.sin(s.p + t / 1000 * s.v), a = (.28 + .5 * tw) * model.vis;
        var L = s.lit, rad = s.z * (1 + L * 1.7);
        if (L > .03) {
          var gr = g.createRadialGradient(s.x, s.y, 0, s.x, s.y, rad * 11);
          gr.addColorStop(0, 'rgba(255,240,200,' + (.7 * L * model.vis) + ')'); gr.addColorStop(1, 'rgba(255,230,170,0)');
          g.fillStyle = gr; g.beginPath(); g.arc(s.x, s.y, rad * 11, 0, 6.2832); g.fill();
          if (L > .5) lit.push(s);
        }
        g.globalAlpha = Math.min(1, a + L * .8);
        g.fillStyle = s.gold ? '#ffe3a1' : (L > .1 ? '#fff7e0' : '#dfe8ff');
        g.beginPath(); g.arc(s.x, s.y, rad, 0, 6.2832); g.fill();
      }
      // constellation lines between nearby lit stars
      g.globalAlpha = 1; g.lineWidth = 1.4;
      for (var a = 0; a < lit.length; a++) for (var b = a + 1; b < lit.length; b++) {
        var ddx = lit[a].x - lit[b].x, ddy = lit[a].y - lit[b].y, dd = ddx * ddx + ddy * ddy;
        if (dd < 17000) { g.strokeStyle = 'rgba(255,225,160,' + (.42 * Math.min(lit[a].lit, lit[b].lit) * model.vis) + ')'; g.beginPath(); g.moveTo(lit[a].x, lit[a].y); g.lineTo(lit[b].x, lit[b].y); g.stroke(); }
      }
      // shooting star
      if (model.shoot) {
        var s2 = model.shoot; s2.x += s2.vx * dt; s2.y += s2.vy * dt; s2.life -= dt;
        var al = Math.max(0, s2.life / 1100) * model.vis, gr2 = g.createLinearGradient(s2.x, s2.y, s2.x - s2.vx * 160, s2.y - s2.vy * 160);
        gr2.addColorStop(0, 'rgba(255,255,255,' + al + ')'); gr2.addColorStop(1, 'rgba(255,255,255,0)');
        g.strokeStyle = gr2; g.lineWidth = 3; g.beginPath(); g.moveTo(s2.x, s2.y); g.lineTo(s2.x - s2.vx * 160, s2.y - s2.vy * 160); g.stroke();
        if (s2.life <= 0) model.shoot = null;
      }
      g.globalAlpha = 1;
    }
    el.__cl = { model: model, draw: draw, ghost: ghost, root: root, stars: stars };
    if (ctx.static) { setK(root, 3, true); draw(1500, 16); }
    else setK(root, 0, true);
  },
  enter: function (el, ctx) {
    var c = el.__cl, model = c.model, root = c.root, draw = c.draw, lastMove = performance.now(), reduced = ctx.reduced;
    setK(root, ctx.view.k, true);
    function stagePt(ev) { return Deck.stagePoint(ev.clientX, ev.clientY); }
    function mv(ev) { var p = stagePt(ev); model.mx = p.x; model.my = p.y; lastMove = performance.now(); model.ghostOn = false; c.ghost.style.opacity = 0; }
    window.addEventListener('pointermove', mv);
    ctx.onLeave(function () { window.removeEventListener('pointermove', mv); });
    var lastT = 0;
    ctx.tick(function (dt, t) {
      if (t - lastT < 30) return; var d = Math.min(t - lastT, 100); lastT = t;
      var now = performance.now(), night = ctx.view.k >= 1;
      model.targetVis = night ? (model.sAt && now - model.sAt < 1200 ? 0 : 1) : 0;
      if (night && now - lastMove > 3500 && !reduced) {         // idle: a gentle wandering light keeps the sky alive
        model.ghostOn = true;
        model.mx = 960 + 760 * Math.sin(t / 4300 + 1) * Math.cos(t / 11000); model.my = 330 + 210 * Math.sin(t / 3100);
        c.ghost.style.opacity = .55; c.ghost.style.transform = 'translate3d(' + model.mx + 'px,' + model.my + 'px,0)'; c.ghost.style.left = '0'; c.ghost.style.top = '0';
      }
      if (night && !model.shoot && t > model.nextShoot && !reduced) {
        model.shoot = { x: 300 + Math.random() * 900, y: 80 + Math.random() * 200, vx: .55 + Math.random() * .25, vy: .22 + Math.random() * .1, life: 1100 };
        model.nextShoot = t + 8000 + Math.random() * 5000;
      }
      draw(t, d);
    });
  },
  leave: function (el, ctx) {},
  step: function (el, i, ctx) { var c = el.__cl; setK(c.root, i, ctx.elapsed() < 80); if (i === 1) { var inst = ctx.elapsed() < 80; c.model.sAt = inst ? 0 : performance.now(); if (inst) c.model.vis = 1; } },
  unstep: function (el, i, ctx) { var c = el.__cl; setK(c.root, i - 1, false); }
});
function setK(root, k, instant) {
  root.classList.toggle('inst', !!instant);
  root.classList.toggle('s1', k >= 1); root.classList.toggle('s2', k >= 2); root.classList.toggle('s3', k >= 3);
  if (instant) { void root.offsetWidth; setTimeout(function () { root.classList.remove('inst'); }, 60); }
}

/* ---------------------------------------------------------------- register */
Object.keys(reg).forEach(function (n) { Deck.registerSlide(n, compose(reg[n])); });
})();
