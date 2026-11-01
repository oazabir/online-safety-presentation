/* ============================================================================
   part-g.js - dopamine, told so a 10-year-old gets it (both versions). Three slides inserted after 'why-intro'; the Adult
   version follows them with the research slide 'dopamine-pathways' (the Child version hides it, see child.js).
     id 'dopamine-meet'    a brain whose glowing dopamine "messengers" flow from the VTA to the reward centre and the
                           thinking brain; clicks 1-3 = tasty food, a hug, winning a match: each sends a burst of messengers
                           and draws a gentle hill on the dopamine meter.
     id 'dopamine-spikes'  a phone beside a big dopamine graph with the real-life hills ghosted behind; clicks 1-4 = a like,
                           a message, a level-up, a mystery box: each pops on the phone, flies to the graph and fires a
                           tall spike; click 5 = notification after notification, spike after spike.
     id 'dopamine-crash'   click 1 = a spike, then a dip below normal (the crash); 2 = again and again: spikes shrink,
                           crashes deepen; 3 = the brain turns its "fun volume" down and everyday things go grey;
                           4 = the loop (bored -> phone -> spike -> crash); 5 = the good news: breaks turn it back up.
   The graphs are timelines (Graph below): each click animates the line forward to that step's fixed end, so a thumbnail,
   arriving with Back and reduced motion all draw the same picture instantly. Curves are illustrative, not measured data.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }

var lastPos = null, cameBack = false;           // arrived with Back: the slide is shown fully built, no replays
Deck.on('show', function (s) { cameBack = lastPos !== null && s.pos < lastPos; lastPos = s.pos; });

var NATURE = 'https://www.nature.com/articles/s41598-017-08824-y';

/* stroke icons (24x24) for rewards and everyday things; filled icons for the phone's app badges */
var SI = {
  apple: '<path d="M12 7.5c-2-2-6.5-1.6-6.5 3.6 0 4.2 2.6 8.4 4.6 8.4 1 0 1.2-.6 1.9-.6s.9.6 1.9.6c2 0 4.6-4.2 4.6-8.4 0-5.2-4.5-5.6-6.5-3.6z"/><path d="M12 7.5c0-2.2 1.1-3.7 3.2-4.3"/>',
  heart: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
  trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M10 17h4"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  book: '<path d="M2 5c3-1.5 6.5-1.5 10 1 3.5-2.5 7-2.5 10-1v14c-3-1.5-6.5-1.5-10 1-3.5-2.5-7-2.5-10-1z"/><path d="M12 6v14"/>',
  family: '<circle cx="8" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-3.5 2.7-6 6-6s6 2.5 6 6M14 20c0-2.6 1.3-4.6 3-4.6s4 1.8 4 4.6"/>',
  ball: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5l4 2.9-1.5 4.7h-5L8 10.4z"/>'
};
var FI = {
  heart: '<path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.3 4.5 7 4.5c2 0 3.5 1 5 2.8 1.5-1.8 3-2.8 5-2.8 3.7 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"/>',
  chat: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>',
  star: '<path d="M12 2l3 6.6 7.2.8-5.4 4.9 1.5 7.1L12 17.8 5.7 21.4l1.5-7.1L1.8 9.4 9 8.6z"/>',
  user: '<path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm-9 10c0-4.4 4-8 9-8s9 3.6 9 8z"/>',
  fire: '<path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-6 1-9z"/>',
  play: '<path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm7 3v6l5-3z"/>'
};
function sico(k) { return '<svg viewBox="0 0 24 24">' + SI[k] + '</svg>'; }
function fico(k) { return k === '?' ? '<b>?</b>' : '<svg viewBox="0 0 24 24">' + FI[k] + '</svg>'; }

addCss('pg-css', [
  '.pg{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
  '.pg *{box-sizing:border-box}',
  '.pg-glow{position:absolute;border-radius:50%;filter:blur(50px);pointer-events:none}',
  '.pg-k{position:absolute;left:120px;top:112px;display:flex;align-items:center;gap:14px;font:700 19px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:var(--orange)}',
  '.pg-k i{width:12px;height:12px;border-radius:50%;background:var(--orange);animation:pg-ping 2.2s ease-out infinite}',
  '@keyframes pg-ping{0%{box-shadow:0 0 0 0 rgba(255,122,26,.55)}80%,100%{box-shadow:0 0 0 16px rgba(255,122,26,0)}}',
  '.pg-t{position:absolute;left:114px;top:146px;font:600 120px/1.02 var(--f-display);letter-spacing:-.025em;color:#fff;white-space:nowrap}',
  '.pg-t em{font-style:italic;color:var(--orange)}',
  '.pg-sb{position:absolute;left:120px;font:400 34px/1.35 var(--f-body);color:var(--ink2)}',
  '.pg-sb b{color:#fff;font-weight:600}',
  '.pg-card{position:absolute;border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.075),rgba(255,255,255,.025));box-shadow:inset 0 0 0 1px var(--glass-b),0 30px 80px rgba(0,0,0,.45)}',
  '.pg-ch{position:absolute;left:36px;top:24px;font:700 17px/1 var(--f-body);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}',
  /* graph */
  '.pg-svg{position:absolute;overflow:visible}',
  '.pg-base{stroke:rgba(255,255,255,.3);stroke-width:2;stroke-dasharray:6 8}',
  '.pg-norm{fill:var(--muted);font:500 20px var(--f-body)}',
  '.pg-line{fill:none;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}',
  '.pg-ghost{fill:none;stroke:#2EE59D;stroke-width:4;stroke-dasharray:2 11;stroke-linecap:round;opacity:.6}',
  '.pg-head .pg-dot{fill:#fff}',
  '.pg-head .pg-ring{fill:none;stroke:#fff;stroke-width:3;transform-box:fill-box;transform-origin:center;animation:pg-ring 1.6s ease-out infinite}',
  '@keyframes pg-ring{from{transform:scale(.5);opacity:.9}to{transform:scale(1.9);opacity:0}}',
  '.pg-lgd{position:absolute;right:36px;top:18px;display:flex;gap:30px;font:500 21px/1.2 var(--f-body);color:var(--ink2)}',
  '.pg-lgd span{display:flex;align-items:center;gap:10px}',
  '.pg-lgd i{width:36px;height:0;border-top:4px dotted #2EE59D}',
  '.pg-lgd i.ph{border-top:6px solid var(--orange);border-radius:3px}',
  '.pg-fx{position:absolute;left:0;top:0;width:14px;height:14px;margin:-7px 0 0 -7px;border-radius:50%;background:#FFE0A0;box-shadow:0 0 14px 5px rgba(255,140,40,.85);pointer-events:none;will-change:transform,opacity;z-index:5}',
  '.pg.static *{animation:none!important;transition:none!important}',
  '.pg.static .pg-ring{display:none}',
  '.pg.inst *{transition:none!important}',
  '@media (prefers-reduced-motion:reduce){.pg *{animation:none!important;transition-duration:.01s!important}.pg .pg-ring{display:none}}',

  /* ---- 1. meet dopamine */
  '.pg1-q{position:absolute;left:120px;top:470px;font:italic 500 56px/1.15 var(--f-display);color:var(--amber);white-space:nowrap}',
  '.pg1-q b{font-weight:600;color:#fff}',
  '.pg1-lg{position:absolute;left:120px;top:586px;display:flex;align-items:center;gap:16px;font:400 26px/1.3 var(--f-body);color:var(--muted)}',
  '.pg1-lg i{flex:none;width:18px;height:18px;border-radius:50%;background:#FFE0A0;box-shadow:0 0 14px 4px rgba(255,176,32,.8)}',
  '.pg1-brain{position:absolute;left:1090px;top:80px;width:760px;height:560px}',
  '.pg1-brain svg{overflow:visible}',
  '.pg1-brain .bo{fill:rgba(255,140,170,.13);stroke:rgba(255,170,195,.75);stroke-width:4;stroke-linejoin:round}',
  '.pg1-brain .sl{fill:none;stroke:rgba(255,170,195,.32);stroke-width:3;stroke-linecap:round}',
  '.pg1-brain .rd{fill:none;stroke:rgba(255,176,32,.22);stroke-width:16;stroke-linecap:round}',
  '.pg1-brain .rl{fill:none;stroke:#FFB020;stroke-width:3;stroke-linecap:round;stroke-dasharray:2 9;opacity:.85}',
  '.pg1-brain .nd{fill:#FFB020;transform-box:fill-box;transform-origin:center}',
  '.pg1-brain .nd.big{fill:#FFD27A}',
  '.pg1-brain .nd.hit{animation:pg-hit 1s ease-out}',
  '@keyframes pg-hit{0%{transform:scale(1)}25%{transform:scale(2.4)}100%{transform:scale(1)}}',
  '.pg1-brain .halo{fill:rgba(255,176,32,.25);transform-box:fill-box;transform-origin:center;animation:pg-halo 2.6s ease-in-out infinite alternate}',
  '@keyframes pg-halo{from{transform:scale(.8);opacity:.5}to{transform:scale(1.3);opacity:1}}',
  '.pg1-brain .ld{stroke:rgba(255,255,255,.4);stroke-width:2}',
  '.pg1-brain .lb{font:700 26px var(--f-body);fill:#fff}',
  '.pg1-brain .ls{font:400 19px var(--f-body);fill:var(--muted)}',
  '.pg1-brain .dt{fill:#FFE0A0;filter:drop-shadow(0 0 6px rgba(255,170,40,.95))}',
  '.pg1-m{left:120px;top:688px;width:1680px;height:334px}',
  '.pg1-m .pg-line{filter:drop-shadow(0 0 10px rgba(46,229,157,.7))}',
  '.pg1-ok{position:absolute;right:36px;top:20px;font:500 24px/1.2 var(--f-body);color:var(--ink2);opacity:0;transform:translateY(8px);transition:opacity .6s,transform .6s}',
  '.pg1-ok b{color:var(--green);font-weight:700}',
  '.pg1-ok.on{opacity:1;transform:none}',
  '.pg-rw{position:absolute;display:flex;align-items:center;gap:10px;padding:10px 22px 10px 12px;border-radius:99px;background:rgba(46,229,157,.14);',
  '  box-shadow:inset 0 0 0 2px rgba(46,229,157,.55);font:600 24px/1 var(--f-body);color:#fff;white-space:nowrap;',
  '  opacity:0;transform:translate(-50%,14px) scale(.7);transition:opacity .45s,transform .6s cubic-bezier(.2,1.5,.4,1)}',
  '.pg-rw.on{opacity:1;transform:translate(-50%,0)}',
  '.pg-rw svg{width:32px;height:32px;fill:none;stroke:#2EE59D;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',

  /* ---- 2. phones make spikes */
  '.pg2-ph{position:absolute;left:130px;top:100px;width:440px;height:880px;border-radius:64px;background:#141418;padding:12px;',
  '  box-shadow:0 0 0 2px #3a3a42,0 40px 90px rgba(0,0,0,.65),0 0 160px rgba(255,122,26,.2)}',
  '.pg2-ph.buzz{animation:pg-buzz .45s linear}',
  '@keyframes pg-buzz{0%,100%{transform:none}20%{transform:rotate(-1.6deg)}40%{transform:rotate(1.6deg)}60%{transform:rotate(-1deg)}80%{transform:rotate(1deg)}}',
  '.pg2-ph .scr{position:relative;width:100%;height:100%;border-radius:54px;overflow:hidden;',
  '  background:radial-gradient(120% 70% at 30% 0%,#3b2a63,transparent 60%),radial-gradient(100% 60% at 90% 100%,#5a1d3a,transparent 60%),#0d0b14}',
  '.pg2-ph .isl{position:absolute;left:50%;top:14px;width:124px;height:36px;margin-left:-62px;border-radius:20px;background:#000}',
  '.pg2-ph .clk{position:absolute;left:0;right:0;top:76px;text-align:center;color:#fff}',
  '.pg2-ph .clk span{display:block;font:600 22px var(--f-body);opacity:.8}',
  '.pg2-ph .clk b{display:block;margin-top:4px;font:600 104px/1 var(--f-body);letter-spacing:-.02em}',
  '.pg2-nl{position:absolute;left:14px;right:14px;top:258px;bottom:0}',
  '.pg2-n{position:absolute;left:0;right:0;top:0;height:104px;display:flex;align-items:center;gap:14px;padding:14px 16px;border-radius:26px;',
  '  background:rgba(44,40,58,.86);box-shadow:0 8px 24px rgba(0,0,0,.35);opacity:0;transform:translateY(-40px) scale(.9);',
  '  transition:transform .5s cubic-bezier(.2,.9,.25,1),opacity .4s}',
  '.pg2-n .ic{flex:none;width:56px;height:56px;border-radius:15px;display:grid;place-items:center;background:var(--c)}',
  '.pg2-n .ic svg{width:32px;height:32px;fill:#fff}',
  '.pg2-n .ic b,.pg2-bd b{font:800 34px/1 var(--f-body);color:#fff}',
  '.pg2-n .tx{flex:1;min-width:0;line-height:1.22}',
  '.pg2-n .tx b{display:block;padding-right:44px;font:700 23px var(--f-body);color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.pg2-n .tx span{display:block;font:400 20px var(--f-body);color:#d8d4e4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  '.pg2-n .tm{position:absolute;right:18px;top:16px;font:500 16px var(--f-body);color:#a9a3b8}',
  '.pg2-sub{position:absolute;left:660px;top:292px;width:1140px;height:96px}',
  '.pg2-sub p{position:absolute;left:0;top:0;width:100%;margin:0;font:400 34px/1.35 var(--f-body);color:var(--ink2);transition:opacity .6s,transform .6s}',
  '.pg2-sub p b{color:#fff;font-weight:600}',
  '.pg2-sub .b{opacity:0;transform:translateY(14px)}',
  '.pg2-sub.end .a{opacity:0;transform:translateY(-14px)}',
  '.pg2-sub.end .b{opacity:1;transform:none}',
  '.pg2-sub .g{color:var(--green);font-weight:600}.pg2-sub .o{color:var(--orange);font-weight:600}',
  '.pg2-g{left:660px;top:404px;width:1140px;height:596px}',
  '.pg2-g .pg-line{filter:drop-shadow(0 0 10px rgba(255,90,40,.75))}',
  '.pg2-bd{position:absolute;width:56px;height:56px;margin:-28px 0 0 -28px;border-radius:50%;display:grid;place-items:center;background:var(--c);',
  '  box-shadow:0 0 26px var(--c);opacity:0;transform:scale(.3);transition:opacity .3s,transform .55s cubic-bezier(.2,1.6,.4,1)}',
  '.pg2-bd.on{opacity:1;transform:none}',
  '.pg2-bd svg{width:30px;height:30px;fill:#fff}',
  '.pg2-mq{position:absolute;width:320px;padding-left:16px;border-left:3px solid #8B5CF6;font:500 23px/1.3 var(--f-body);color:var(--ink2);',
  '  opacity:0;transform:translateX(-14px);transition:opacity .5s,transform .5s}',
  '.pg2-mq b{color:#fff;font-weight:700}',
  '.pg2-mq.on{opacity:1;transform:none}',

  /* ---- 3. the crash */
  '.pg3 .pg-t{font-size:104px}',
  '.pg3-g{left:120px;top:396px;width:1080px;height:420px}',
  '.pg3-g .pg-ch{left:auto;right:36px}',
  '.pg3-g .pg-line{filter:drop-shadow(0 0 10px rgba(255,90,40,.6))}',
  '.pg3-an{opacity:0;transition:opacity .6s}',
  '.pg3-an.on{opacity:1}',
  '.pg3-an text{font:600 22px var(--f-body)}',
  '.pg3-fc{transform-box:fill-box;transform-origin:center;opacity:0;transform:scale(.3);transition:opacity .35s,transform .6s cubic-bezier(.2,1.6,.4,1)}',
  '.pg3-fc.on{opacity:1;transform:none}',
  '.pg3-kn{left:1260px;top:110px;width:540px;height:514px}',
  '.pg3-kn .hd{position:absolute;left:36px;top:28px;font:600 36px/1.1 var(--f-display);color:#fff}',
  '.pg3-kn .hd em{font-style:italic;color:var(--amber)}',
  '.pg3-kn .sh{position:absolute;left:36px;top:76px;font:400 22px var(--f-body);color:var(--muted)}',
  '.pg3-kn svg{position:absolute;left:120px;top:118px;overflow:visible}',
  '.pg3-kn .num{font:600 64px var(--f-display);fill:#fff}',
  '.pg3-kn .tk{stroke:rgba(255,255,255,.35);stroke-width:3;stroke-linecap:round}',
  '.pg3-kn .tl{font:600 20px var(--f-body);fill:var(--muted)}',
  '.pg3-gn{position:absolute;left:50%;top:438px;display:flex;align-items:center;gap:10px;padding:10px 22px;border-radius:99px;white-space:nowrap;',
  '  background:rgba(46,229,157,.14);box-shadow:inset 0 0 0 2px rgba(46,229,157,.6);font:600 23px/1 var(--f-body);color:#fff;',
  '  opacity:0;transform:translate(-50%,12px);transition:opacity .6s,transform .6s}',
  '.pg3-gn b{color:var(--green)}',
  '.pg3.k5 .pg3-gn{opacity:1;transform:translate(-50%,0)}',
  '.pg3-ev{left:1260px;top:648px;width:540px;height:168px;overflow:hidden}',
  '.pg3-ev .row{position:absolute;left:20px;right:20px;top:20px;display:flex;justify-content:space-between}',
  '.pg3-tl{position:relative;width:118px;text-align:center}',
  '.pg3-tl .ic{position:relative;width:70px;height:70px;margin:0 auto}',
  '.pg3-tl .ic i{position:absolute;inset:0;border-radius:50%;display:grid;place-items:center;transition:opacity 1.2s}',
  '.pg3-tl .ic .c{background:rgba(var(--c),.18);box-shadow:inset 0 0 0 2px rgba(var(--c),.7)}',
  '.pg3-tl .ic .c svg{stroke:rgb(var(--c))}',
  '.pg3-tl .ic .g{background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 2px rgba(255,255,255,.18);opacity:0}',
  '.pg3-tl .ic .g svg{stroke:#6d7377}',
  '.pg3-tl svg{width:36px;height:36px;fill:none;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
  '.pg3-tl span{display:block;margin-top:10px;font:500 19px/1.2 var(--f-body);color:var(--ink2);transition:opacity 1.2s}',
  '.pg3.k3:not(.k5) .pg3-tl .c{opacity:0}.pg3.k3:not(.k5) .pg3-tl .g{opacity:1}.pg3.k3:not(.k5) .pg3-tl span{opacity:.45}',
  '.pg3-st{position:absolute;left:50%;top:50%;padding:6px 26px;border:4px solid rgba(255,77,77,.85);border-radius:12px;font:800 38px/1 var(--f-body);',
  '  letter-spacing:.12em;text-transform:uppercase;color:rgba(255,110,110,.95);background:rgba(20,8,10,.55);',
  '  opacity:0;transform:translate(-50%,-50%) rotate(-8deg) scale(1.6);transition:opacity .4s .5s,transform .5s cubic-bezier(.3,1.4,.5,1) .5s}',
  '.pg3.k3:not(.k5) .pg3-st{opacity:1;transform:translate(-50%,-50%) rotate(-8deg)}',
  '.pg3-lp{left:120px;top:846px;width:1680px;height:156px;opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s}',
  '.pg3.k4 .pg3-lp{opacity:1;transform:none}',
  '.pg3-lp .lt{position:absolute;left:36px;top:46px;font:600 34px/1 var(--f-display);color:#fff}',
  '.pg3-lp .lt em{display:block;margin-top:8px;font:italic 400 20px var(--f-body);color:var(--muted)}',
  '.pg3-p{position:absolute;top:24px;width:290px;height:64px;border-radius:99px;display:flex;align-items:center;justify-content:center;gap:12px;',
  '  background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 2px rgba(var(--c),.6);font:600 25px/1 var(--f-body);color:#fff}',
  '.pg3-p::before{content:"";position:absolute;inset:0;border-radius:99px;background:rgba(var(--c),.35);box-shadow:0 0 30px rgba(var(--c),.7);opacity:0;',
  '  animation:pg-lit 4.8s linear infinite;animation-delay:var(--d)}',
  '@keyframes pg-lit{0%{opacity:0}4%{opacity:1}22%{opacity:1}28%,100%{opacity:0}}',
  '.pg3-p i{position:relative;font:700 18px/1 var(--f-mono);color:rgb(var(--c))}',
  '.pg3-p span{position:relative}',
  '.pg3-lp svg{position:absolute;left:0;top:0;overflow:visible}',
  '.pg3-lp .ar{fill:none;stroke:rgba(255,255,255,.45);stroke-width:3;stroke-linecap:round;stroke-linejoin:round}',
  '.pg3-lp .ag{font:italic 500 20px var(--f-body);fill:var(--ink2)}'
]);

/* ---------------------------------------------------------------- the dopamine timeline graph */
/* event shapes: a = height (1 = a phone spike), r = rise and f = fall (seconds), d = dip below normal afterwards, dl = its length */
var KIND = {
  hill: { a: .34, r: 1.2, f: 2.4 },
  spike: { a: 1, r: .22, f: .8 },
  crash: { a: 1, r: .22, f: .7, d: .6, dl: 3.6 }
};
function ev(t, kind, more) { return Object.assign({ t: t }, KIND[kind], more || {}); }
function shape(x, e) {
  if (x <= 0) return 0;
  var v = 0, r = e.r, f = e.f;
  if (x < r) v = e.a * Math.pow(Math.sin(Math.PI / 2 * x / r), 2);
  else if (x < r + f) v = e.a * (1 + Math.cos(Math.PI * (x - r) / f)) / 2;
  if (e.d) {                                          // fast drop below normal, slow recovery
    var y = x - r - f * .5, dn = e.dl * .25;
    if (y > 0 && y < dn) v -= e.d * Math.pow(Math.sin(Math.PI / 2 * y / dn), 2);
    else if (y >= dn && y < e.dl) v -= e.d * (1 + Math.cos(Math.PI * (y - dn) / (e.dl - dn))) / 2;
  }
  return v;
}

var UID = 0;
/* o: {w, h, base (y of "normal"), amp (px for a = 1), span (seconds across w), ev: [events], ghost: [events] (dotted
   real-life line drawn in full), col: [top, normal, below]}. g.t = how far the line is drawn; g.onFire(e) when the line
   passes an event (e.ft, else e.t) while animating; g.onT(t) after every redraw. */
function Graph(o) { this.o = o; this.sx = o.w / o.span; this.t = 0; this.target = 0; this.uid = 'pg' + (++UID) + 'x' + Math.floor(Math.random() * 1e6); }
Graph.prototype.val = function (t, list) { var v = 0; (list || this.o.ev).forEach(function (e) { v += shape(t - e.t, e); }); return v; };
Graph.prototype.X = function (t) { return t * this.sx; };
Graph.prototype.Y = function (v) { return this.o.base - v * this.o.amp; };
Graph.prototype.d = function (t, list) {
  var n = Math.max(2, Math.ceil(this.X(t) / 3)), s = '';
  for (var i = 0; i <= n; i++) { var tt = t * i / n; s += (i ? 'L' : 'M') + this.X(tt).toFixed(1) + ',' + this.Y(this.val(tt, list)).toFixed(1); }
  return s;
};
Graph.prototype.html = function (extra) {
  var o = this.o, u = this.uid, b = o.base, c = o.col, y1 = b - o.amp, y2 = b + o.amp * .8, off = (o.amp / (y2 - y1)).toFixed(3);
  return '<svg class="pg-svg" style="left:' + o.x + 'px;top:' + o.y + 'px" width="' + o.w + '" height="' + o.h + '" viewBox="0 0 ' + o.w + ' ' + o.h + '">' +
    '<defs><linearGradient id="' + u + 'l" gradientUnits="userSpaceOnUse" x1="0" y1="' + y1 + '" x2="0" y2="' + y2 + '">' +
      '<stop offset="0" stop-color="' + c[0] + '"/><stop offset="' + off + '" stop-color="' + c[1] + '"/><stop offset="' + off + '" stop-color="' + c[2] + '"/><stop offset="1" stop-color="' + c[2] + '"/></linearGradient>' +
    '<linearGradient id="' + u + 'u" gradientUnits="userSpaceOnUse" x1="0" y1="' + y1 + '" x2="0" y2="' + b + '"><stop offset="0" stop-color="' + c[0] + '" stop-opacity=".38"/><stop offset="1" stop-color="' + c[1] + '" stop-opacity="0"/></linearGradient>' +
    '<linearGradient id="' + u + 'd" gradientUnits="userSpaceOnUse" x1="0" y1="' + b + '" x2="0" y2="' + y2 + '"><stop offset="0" stop-color="' + c[2] + '" stop-opacity="0"/><stop offset="1" stop-color="' + c[2] + '" stop-opacity=".5"/></linearGradient>' +
    '<clipPath id="' + u + 'cu"><rect x="-50" y="-2000" width="' + (o.w + 100) + '" height="' + (2000 + b) + '"/></clipPath>' +
    '<clipPath id="' + u + 'cd"><rect x="-50" y="' + b + '" width="' + (o.w + 100) + '" height="2000"/></clipPath></defs>' +
    '<line class="pg-base" x1="0" y1="' + b + '" x2="' + o.w + '" y2="' + b + '"/>' +
    '<text class="pg-norm" x="0" y="' + (b - 12) + '">normal</text>' +
    (o.ghost ? '<path class="pg-ghost" d="' + this.d(o.span, o.ghost) + '"/>' : '') +
    '<path class="pg-au" fill="url(#' + u + 'u)" clip-path="url(#' + u + 'cu)"/>' +
    '<path class="pg-ad" fill="url(#' + u + 'd)" clip-path="url(#' + u + 'cd)"/>' +
    '<path class="pg-line" stroke="url(#' + u + 'l)"/>' + (extra || '') +
    '<g class="pg-head"><circle class="pg-ring" r="16"/><circle class="pg-dot" r="9"/></g></svg>';
};
Graph.prototype.mount = function (root) {
  var s = root.querySelector('.pg-svg');
  this.line = s.querySelector('.pg-line'); this.au = s.querySelector('.pg-au'); this.ad = s.querySelector('.pg-ad'); this.head = s.querySelector('.pg-head');
  return this;
};
Graph.prototype.set = function (t, live) {
  var prev = this.t, self = this; this.t = t;
  var d = this.d(t), a = d + 'L' + this.X(t).toFixed(1) + ',' + this.o.base + 'L0,' + this.o.base + 'Z';
  this.line.setAttribute('d', d); this.au.setAttribute('d', a); this.ad.setAttribute('d', a);
  this.head.setAttribute('transform', 'translate(' + this.X(t).toFixed(1) + ',' + this.Y(this.val(t)).toFixed(1) + ')');
  if (live && this.onFire) this.o.ev.forEach(function (e) { var ft = e.ft != null ? e.ft : e.t; if (prev < ft && t >= ft) self.onFire(e); });
  if (this.onT) this.onT(t);
};
/* lowest point of the line between t0 and t1 -> [t, value] */
Graph.prototype.low = function (t0, t1) {
  var best = [t0, Infinity];
  for (var t = t0; t <= t1; t += .02) { var v = this.val(t); if (v < best[1]) best = [t, v]; }
  return best;
};

/* step plumbing shared by the three slides: a step either animates (forward click) or jumps (Back, reduced motion, re-entry) */
function instant(r, fn) { r.classList.add('inst'); fn(); void r.offsetWidth; r.classList.remove('inst'); }
function jumps(ctx) { return cameBack || ctx.reduced; }
function goTo(st, k, ctx, back) {                    // st: {r, g, T}; k: step reached; back: undoing a step (always jumps)
  var t = st.T[k];
  st.r.classList.toggle('k' + k, true);
  for (var i = k + 1; i <= 5; i++) st.r.classList.remove('k' + i);
  if (back || jumps(ctx) || t < st.g.t) instant(st.r, function () { st.g.target = t; st.g.set(t, false); });
  else st.g.target = t;
}
function drive(st, ctx, extra) {                     // per frame: move the line toward its target, one timeline second per second
  ctx.tick(function (dt) {
    dt = Math.min(dt, 50) / 1000;
    var g = st.g;
    if (g.t < g.target - 1e-4) g.set(Math.min(g.target, g.t + dt), true);
    if (extra) extra(dt);
  });
}

/* sparks flying from a point on the phone to a point on the graph (stage px) */
function sparks(r, x0, y0, x1, y1, n) {
  if (!r.animate) return;
  for (var i = 0; i < n; i++) {
    var p = h('div', 'pg-fx', r), jx = (Math.random() - .5) * 60, jy = (Math.random() - .5) * 50;
    var mx = (x0 + x1) / 2 + (Math.random() - .5) * 140, my = Math.min(y0, y1) - 90 - Math.random() * 120;
    var an = p.animate([
      { transform: 'translate(' + (x0 + jx) + 'px,' + (y0 + jy) + 'px) scale(.5)', opacity: 0 },
      { transform: 'translate(' + mx + 'px,' + my + 'px) scale(1.1)', opacity: 1, offset: .5 },
      { transform: 'translate(' + x1 + 'px,' + y1 + 'px) scale(.4)', opacity: 0 }
    ], { duration: 560 + Math.random() * 160, delay: i * 26, easing: 'cubic-bezier(.4,0,.4,1)', fill: 'both' });
    an.onfinish = (function (el) { return function () { el.remove(); }; })(p);
  }
}

/* ================================================================ 1. Meet dopamine */
(function () {
  var T = [.8, 5.4, 10, 14.6];
  var REW = [{ t: 1.2, ic: 'apple', l: 'Tasty food' }, { t: 5.8, ic: 'heart', l: 'A hug' }, { t: 10.4, ic: 'trophy', l: 'Winning a match' }];
  // the brain faces left; dopamine is made in the VTA and travels to the reward centre (nucleus accumbens) and the thinking brain
  var VTA = [468, 362], NAC = [305, 300], PFC = [205, 192];
  var PATHS = [[VTA, [420, 352], [350, 330], NAC], [VTA, [420, 300], [300, 222], PFC]];
  function bez(p, s) { var u = 1 - s; return [0, 1].map(function (k) { return u * u * u * p[0][k] + 3 * u * u * s * p[1][k] + 3 * u * s * s * p[2][k] + s * s * s * p[3][k]; }); }
  function pd(p) { return 'M' + p[0] + 'C' + p[1] + ' ' + p[2] + ' ' + p[3]; }
  function brain() {
    var sulci = ['M430 66C420 120 440 160 420 210C405 250 420 280 410 310', 'M270 340C330 300 400 300 470 290C500 286 520 270 540 250',
      'M205 152C245 170 232 210 272 222', 'M302 92C300 140 340 150 330 200', 'M520 80C510 130 550 150 540 200', 'M602 150C582 190 622 220 600 262',
      'M180 252C220 252 232 290 268 290', 'M352 218C376 236 372 262 350 282', 'M560 300C600 290 630 310 652 290', 'M482 120C470 170 500 200 490 240',
      'M535 400C575 410 620 405 655 385', 'M532 422C575 432 625 428 660 410', 'M545 444C585 452 620 448 645 432'];
    return '<svg width="760" height="560" viewBox="0 0 760 560">' +
      '<path class="bo" d="M470 392C480 430 486 470 480 524L522 526C520 480 520 440 515 400Z"/>' +
      '<path class="bo" d="M150 330C110 270 120 180 190 130C250 80 330 60 410 62C500 58 580 80 630 130C690 180 710 250 690 310C675 350 640 372 600 378C560 384 530 380 505 372C470 400 420 410 370 400C320 392 290 378 265 368C220 372 175 360 150 330Z"/>' +
      '<path class="bo" d="M520 378C560 384 620 382 650 360C680 380 682 425 650 448C615 472 555 466 528 440C512 424 510 396 520 378Z"/>' +
      sulci.map(function (d) { return '<path class="sl" d="' + d + '"/>'; }).join('') +
      PATHS.map(function (p) { return '<path class="rd" d="' + pd(p) + '"/><path class="rl" d="' + pd(p) + '"/>'; }).join('') +
      '<circle class="halo" cx="' + NAC[0] + '" cy="' + NAC[1] + '" r="46"/>' +
      '<line class="ld" x1="138" y1="100" x2="' + (PFC[0] - 8) + '" y2="' + (PFC[1] - 10) + '"/><line class="ld" x1="186" y1="424" x2="' + (NAC[0] - 10) + '" y2="' + (NAC[1] + 10) + '"/>' +
      '<line class="ld" x1="452" y1="482" x2="' + (VTA[0] - 4) + '" y2="' + (VTA[1] + 12) + '"/>' +
      '<circle class="nd" cx="' + PFC[0] + '" cy="' + PFC[1] + '" r="11"/><circle class="nd big pg1-nac" cx="' + NAC[0] + '" cy="' + NAC[1] + '" r="15"/>' +
      '<circle class="nd" cx="' + VTA[0] + '" cy="' + VTA[1] + '" r="12"/>' +
      '<text class="lb" x="10" y="62">Thinking brain</text><text class="ls" x="10" y="88">prefrontal cortex</text>' +
      '<text class="lb" x="20" y="452">Reward centre</text><text class="ls" x="20" y="478">nucleus accumbens</text>' +
      '<text class="lb" x="455" y="512" text-anchor="end">Dopamine factory</text><text class="ls" x="455" y="538" text-anchor="end">VTA</text>' +
      '<g class="dots"></g></svg>';
  }

  Deck.insertSlide({
    after: 'why-intro', id: 'dopamine-meet', title: 'Meet dopamine', section: 'why', tr: { type: 'fade', ms: 900 }, loop: false, steps: 3,
    render: function (el, ctx) {
      var g = new Graph({ x: 40, y: 50, w: 1600, h: 270, base: 240, amp: 300, span: 14.6, col: ['#2EE59D', '#22D3EE', '#22D3EE'],
        ev: REW.map(function (x) { return ev(x.t, 'hill'); }) });
      var r = h('div', 'pg pg1' + (ctx.static ? ' static' : ''), el);
      r.innerHTML =
        '<div class="pg-glow" style="left:1120px;top:90px;width:700px;height:520px;background:radial-gradient(closest-side,rgba(255,122,26,.26),transparent)"></div>' +
        '<div class="pg-k"><i></i>Your brain’s reward messenger</div>' +
        '<div class="pg-t">Meet <em>dopamine</em></div>' +
        '<div class="pg-sb" style="top:330px;width:900px">A tiny chemical your brain makes. When something feels good, it carries this message:</div>' +
        '<div class="pg1-q">“That was great. <b>Do it again!</b>”</div>' +
        '<div class="pg1-lg"><i></i>Each glowing dot is dopamine on its way to the reward centre.</div>' +
        '<div class="pg1-brain">' + brain() + '</div>' +
        '<div class="pg-card pg1-m"><div class="pg-ch">Dopamine meter</div>' +
        '<div class="pg1-ok">Up a little, then back to normal. <b>That’s healthy.</b></div>' + g.html() +
        REW.map(function (x, i) {
          var e = g.o.ev[i];
          return '<div class="pg-rw" style="left:' + (40 + g.X(e.t + e.r)) + 'px;top:' + (50 + g.Y(e.a) - 84) + 'px">' + sico(x.ic) + x.l + '</div>';
        }).join('') + '</div>';
      g.mount(r);
      var rw = r.querySelectorAll('.pg-rw'), ok = r.querySelector('.pg1-ok');
      g.onT = function (t) {
        REW.forEach(function (x, i) { rw[i].classList.toggle('on', t >= x.t + .15); });
        ok.classList.toggle('on', t >= T[3] - .2);
      };
      var st = el.__pg = { r: r, g: g, T: T, dots: [], host: r.querySelector('.dots'), nac: r.querySelector('.pg1-nac') };
      g.set(ctx.static ? T[3] : T[0], false);
      for (var i = 0; i < 12; i++) addDot(st, i % 3 === 2 ? 1 : 0, (i * .37) % 1, false);   // resting flow
      moveDots(st, 0);
    },
    enter: function (el, ctx) {
      var st = el.__pg; if (!st) return;
      st.g.onFire = function () {                    // a reward: a burst of messengers, and the reward centre lights up
        for (var i = 0; i < 18; i++) addDot(st, Math.random() < .7 ? 0 : 1, -Math.random() * .5, true);
        ctx.timeout(function () { st.nac.classList.remove('hit'); st.nac.getBoundingClientRect(); st.nac.classList.add('hit'); }, 700);
      };
      if (ctx.reduced) return;
      drive(st, ctx, function (dt) { moveDots(st, dt); });
    },
    steps: 3,
    step: function (el, i, ctx) { if (el.__pg) goTo(el.__pg, i, ctx); },
    unstep: function (el, i, ctx) { if (el.__pg) goTo(el.__pg, i - 1, ctx, true); }
  });

  function addDot(st, p, s, burst) {
    var c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('class', 'dt'); c.setAttribute('r', burst ? 6 + Math.random() * 3 : 5);
    st.host.appendChild(c);
    st.dots.push({ el: c, p: p, s: s, v: burst ? .6 + Math.random() * .35 : .1 + Math.random() * .04, burst: burst });
  }
  function moveDots(st, dt) {
    st.dots = st.dots.filter(function (d) {
      d.s += d.v * dt;
      if (d.s >= 1) { if (d.burst) { d.el.remove(); return false; } d.s -= 1; }
      var s = Math.max(0, d.s), pt = bez(PATHS[d.p], s);
      d.el.setAttribute('cx', pt[0].toFixed(1)); d.el.setAttribute('cy', pt[1].toFixed(1));
      d.el.setAttribute('opacity', d.s < 0 ? 0 : Math.min(1, s * 8, (1 - s) * 8).toFixed(2));
      return true;
    });
  }
})();

/* ================================================================ 2. Phones make spikes */
(function () {
  var T = [.5, 2.5, 4.5, 6.5, 9, 14.4];
  var NOTE = [
    { t: .9, ic: 'heart', c: '#FF3B6B', b: '24 new likes', s: 'People liked your photo' },
    { t: 2.9, ic: 'chat', c: '#22C55E', b: 'Zara', s: 'omg you HAVE to see this!!' },
    { t: 4.9, ic: 'star', c: '#F59E0B', b: 'LEVEL UP!', s: 'Level 12 unlocked · +500 coins' },
    { t: 7.2, ic: '?', c: '#8B5CF6', b: 'Mystery box!', s: 'Open it… what will you get?', a: 1.2 },
    { t: 9.4, ic: 'user', c: '#0EA5E9', b: '3 new followers', s: 'See who followed you', a: .9 },
    { t: 10.2, ic: 'fire', c: '#F97316', b: 'Your streak: 45 days', s: 'Don’t lose it! Play now' },
    { t: 10.9, ic: 'play', c: '#EF4444', b: 'New video for you', s: 'From a creator you follow', a: .85 },
    { t: 11.7, ic: 'heart', c: '#FF3B6B', b: '+18 likes', s: 'Your story is popular', a: .95 },
    { t: 12.4, ic: 'star', c: '#F59E0B', b: 'Daily reward ready', s: 'Claim it before midnight', a: .9 },
    { t: 13.2, ic: 'chat', c: '#22C55E', b: 'Class group', s: '12 new messages' }
  ];
  var GX = 660, GY = 404, SX = 40, SY = 74, NH = 116;       // graph card and its svg (stage px); notification pitch

  Deck.insertSlide({
    after: 'dopamine-meet', id: 'dopamine-spikes', title: 'Phones make spikes', section: 'why', tr: { type: 'fade', ms: 900 }, loop: false, steps: 5,
    render: function (el, ctx) {
      var g = new Graph({ x: SX, y: SY, w: 1060, h: 500, base: 470, amp: 330, span: 14.6, col: ['#FF4D4D', '#FFB020', '#7C8CFF'],
        ev: NOTE.map(function (n) { return ev(n.t, 'spike', { a: n.a || 1, ft: n.t - .3 }); }),
        ghost: [ev(1.2, 'hill'), ev(5.8, 'hill'), ev(10.4, 'hill')] });
      var r = h('div', 'pg pg2' + (ctx.static ? ' static' : ''), el);
      r.innerHTML =
        '<div class="pg-glow" style="left:60px;top:200px;width:600px;height:700px;background:radial-gradient(closest-side,rgba(139,92,246,.28),transparent)"></div>' +
        '<div class="pg2-ph"><div class="scr"><div class="isl"></div><div class="clk"><span>Tuesday</span><b>20:47</b></div><div class="pg2-nl">' +
          NOTE.map(function (n) {
            return '<div class="pg2-n" style="--c:' + n.c + '"><div class="ic">' + fico(n.ic) + '</div><div class="tx"><b>' + n.b + '</b><span>' + n.s + '</span></div><div class="tm">now</div></div>';
          }).join('') + '</div></div></div>' +
        '<div class="pg-k" style="left:660px"><i></i>How phones hack it</div>' +
        '<div class="pg-t" style="left:654px">Phones make <em>spikes</em></div>' +
        '<div class="pg2-sub"><p class="a">Every like, message and level-up gives your brain a quick, <b>strong</b> hit of dopamine.</p>' +
          '<p class="b">Real life: <span class="g">gentle hills</span>. Phones: <span class="o">tall spikes, again and again</span>.</p></div>' +
        '<div class="pg-card pg2-g"><div class="pg-ch">Your dopamine</div>' +
          '<div class="pg-lgd"><span><i></i>Real life</span><span><i class="ph"></i>Phone</span></div>' + g.html() +
          NOTE.slice(0, 4).map(function (n, i) {
            var e = g.o.ev[i];
            return '<div class="pg2-bd" style="--c:' + n.c + ';left:' + (SX + g.X(e.t + e.r)) + 'px;top:' + (SY + g.Y(e.a) - 46) + 'px">' + fico(n.ic) + '</div>';
          }).join('') +
          '<div class="pg2-mq" style="left:' + (SX + g.X(7.42) + 50) + 'px;top:' + (SY + g.Y(1.2) - 30) + 'px">Not knowing what you’ll get makes <b>the biggest spike</b>.</div>' +
        '</div>';
      var chips = h('div', 'chips', r); chips.appendChild(Deck.sourceChip(NATURE));
      g.mount(r);
      var cards = r.querySelectorAll('.pg2-n'), bds = r.querySelectorAll('.pg2-bd'), mq = r.querySelector('.pg2-mq'), sub = r.querySelector('.pg2-sub');
      g.onT = function (t) {
        var shown = NOTE.filter(function (n) { return t >= n.t - .3; }).length;
        NOTE.forEach(function (n, i) {                // newest on top, older ones pushed down
          var on = i < shown, c = cards[i];
          c.style.opacity = on ? 1 : 0;
          c.style.transform = on ? 'translateY(' + (shown - 1 - i) * NH + 'px)' : '';
        });
        bds.forEach(function (b, i) { b.classList.toggle('on', t >= NOTE[i].t + .15); });
        mq.classList.toggle('on', t >= 7.6);
        sub.classList.toggle('end', t >= T[5] - .4);
      };
      el.__pg = { r: r, g: g, T: T, ph: r.querySelector('.pg2-ph') };
      g.set(ctx.static ? T[5] : T[0], false);
    },
    enter: function (el, ctx) {
      var st = el.__pg; if (!st) return;
      st.g.onFire = function (e) {                     // the phone buzzes and the notification flies to the graph
        st.ph.classList.remove('buzz'); void st.ph.offsetWidth; st.ph.classList.add('buzz');
        var g = st.g;
        sparks(st.r, 350, 424, GX + SX + g.X(e.t + e.r), GY + SY + g.Y(e.a), 11);
      };
      if (!ctx.reduced) drive(st, ctx);
    },
    steps: 5,
    step: function (el, i, ctx) { if (el.__pg) goTo(el.__pg, i, ctx); },
    unstep: function (el, i, ctx) { if (el.__pg) goTo(el.__pg, i - 1, ctx, true); }
  });
})();

/* ================================================================ 3. The crash */
(function () {
  var T = [1.2, 6.4, 17.2, 17.2, 17.2, 17.2];         // clicks 3-5 change the knob, the everyday things and the loop, not the line
  var EV = [ev(1.6, 'crash'), ev(7, 'crash', { a: .85, d: .72, dl: 3.4 }), ev(10.2, 'crash', { a: .72, d: .86, dl: 3.4 }), ev(13.4, 'crash', { a: .6, d: 1, dl: 3.6 })];
  var KNOB = [10, 10, 10, 3, 3, 8];                     // fun volume after each step
  var THINGS = [['sun', 'Playing outside', '255,176,32'], ['book', 'Reading', '34,211,238'], ['family', 'Family time', '255,120,160'], ['ball', 'Sport', '46,229,157']];
  var LOOP = [['Feel bored', '124,140,255'], ['Grab the phone', '34,211,238'], ['Spike!', '255,122,26'], ['Crash', '255,77,77']];
  var R = 115, ARC = R * Math.PI * 1.5;
  function pt(a, rr) { a = a * Math.PI / 180; return [(150 + rr * Math.sin(a)).toFixed(1), (150 - rr * Math.cos(a)).toFixed(1)]; }
  function face(x, y, happy) {
    // the outer group places the face; the inner one pops (its CSS transform would override a transform attribute)
    return '<g transform="translate(' + x.toFixed(1) + ',' + y.toFixed(1) + ')"><g class="pg3-fc"><circle r="27" fill="' + (happy ? '#FFD23F' : '#9AA4FF') + '"/>' +
      '<circle cx="-9" cy="-6" r="3.6" fill="#1b1b22"/><circle cx="9" cy="-6" r="3.6" fill="#1b1b22"/>' +
      '<path d="' + (happy ? 'M-12 5Q0 17 12 5' : 'M-11 13Q0 4 11 13') + '" stroke="#1b1b22" stroke-width="3.6" fill="none" stroke-linecap="round"/></g></g>';
  }

  Deck.insertSlide({
    after: 'dopamine-spikes', id: 'dopamine-crash', title: 'Then comes the crash', section: 'why', tr: { type: 'fade', ms: 900 }, loop: false, steps: 5,
    render: function (el, ctx) {
      var g = new Graph({ x: 40, y: 62, w: 1000, h: 340, base: 150, amp: 120, span: 17.6, col: ['#FF4D4D', '#FFB020', '#7C8CFF'], ev: EV });
      // where the faces and the "smaller / deeper" trend lines go
      var p1 = [g.X(EV[0].t + EV[0].r), g.Y(g.val(EV[0].t + EV[0].r))], l1 = g.low(EV[0].t + .5, EV[0].t + 4);
      var pk = EV.slice(1).map(function (e) { return [g.X(e.t + e.r), g.Y(g.val(e.t + e.r))]; });
      var lo = EV.slice(1).map(function (e) { var l = g.low(e.t + .5, e.t + 3.4); return [g.X(l[0]), g.Y(l[1])]; });
      var dx = [g.X(l1[0]), g.Y(l1[1])];
      var ann =
        '<g class="pg3-an a1">' + face(p1[0] + 46, p1[1] + 8, true) + face(dx[0] + 44, dx[1] - 2, false) +
          '<text x="' + (dx[0] - 30) + '" y="' + (dx[1] + 62) + '" fill="#AEB8FF">The crash: bored, grumpy, restless</text></g>' +
        '<g class="pg3-an a2">' +
          '<line x1="' + pk[0][0] + '" y1="' + (pk[0][1] - 16) + '" x2="' + (pk[2][0] + 10) + '" y2="' + (pk[2][1] - 16) + '" stroke="#FFB020" stroke-width="3" stroke-dasharray="8 8"/>' +
          '<text x="' + (pk[2][0] + 26) + '" y="' + (pk[2][1] - 8) + '" fill="#FFB020">Spikes get smaller</text>' +
          '<line x1="' + lo[0][0] + '" y1="' + (lo[0][1] + 18) + '" x2="' + (lo[2][0] + 10) + '" y2="' + (lo[2][1] + 18) + '" stroke="#AEB8FF" stroke-width="3" stroke-dasharray="8 8"/>' +
          '<text x="' + (lo[2][0] + 26) + '" y="' + (lo[2][1] + 30) + '" fill="#AEB8FF">Crashes get deeper</text></g>';
      var r = h('div', 'pg pg3' + (ctx.static ? ' static' : ''), el);
      var ticks = '', i;
      for (i = 0; i <= 10; i++) { var a = pt(-135 + 27 * i, R + 16), b = pt(-135 + 27 * i, R + 28); ticks += '<line class="tk" x1="' + a[0] + '" y1="' + a[1] + '" x2="' + b[0] + '" y2="' + b[1] + '"/>'; }
      var s0 = pt(-135, R), s1 = pt(135, R), z = pt(-135, R + 50), t10 = pt(135, R + 50), arc = 'M' + s0 + 'A' + R + ' ' + R + ' 0 1 1 ' + s1;
      r.innerHTML =
        '<div class="pg-glow" style="left:180px;top:520px;width:900px;height:360px;background:radial-gradient(closest-side,rgba(124,140,255,.2),transparent)"></div>' +
        '<div class="pg-k"><i></i>What goes up…</div>' +
        '<div class="pg-t">Then comes the <em>crash</em></div>' +
        '<div class="pg-sb" style="top:276px;width:1080px">After a spike, dopamine drops <b>below normal</b>. So you reach for the phone again.</div>' +
        '<div class="pg-card pg3-g"><div class="pg-ch">Your dopamine</div>' + g.html(ann) + '</div>' +
        '<div class="pg-card pg3-kn"><div class="hd">Your brain’s <em>fun volume</em></div><div class="sh">How exciting normal things feel</div>' +
          '<svg width="300" height="300" viewBox="0 0 300 300">' + ticks +
            '<path d="' + arc + '" fill="none" stroke="rgba(255,255,255,.1)" stroke-width="18" stroke-linecap="round"/>' +
            '<path class="va" d="' + arc + '" fill="none" stroke-width="18" stroke-linecap="round" stroke-dasharray="0 9999"/>' +
            '<circle cx="150" cy="150" r="86" fill="#1d2329" stroke="rgba(255,255,255,.18)" stroke-width="2"/>' +
            '<circle cx="150" cy="150" r="76" fill="none" stroke="rgba(255,255,255,.07)" stroke-width="8" stroke-dasharray="3 7"/>' +
            '<g class="pt"><circle cx="150" cy="84" r="9" fill="#fff"/></g>' +
            '<text class="num" x="150" y="172" text-anchor="middle">10</text>' +
            '<text class="tl" x="' + z[0] + '" y="' + z[1] + '" text-anchor="middle">0</text><text class="tl" x="' + t10[0] + '" y="' + t10[1] + '" text-anchor="middle">10</text>' +
          '</svg><div class="pg3-gn"><b>↑</b> Screen breaks turn it back up</div></div>' +
        '<div class="pg-card pg3-ev"><div class="row">' + THINGS.map(function (x) {
          return '<div class="pg3-tl" style="--c:' + x[2] + '"><div class="ic"><i class="c">' + sico(x[0]) + '</i><i class="g">' + sico(x[0]) + '</i></div><span>' + x[1] + '</span></div>';
        }).join('') + '</div><div class="pg3-st">Boring…</div></div>' +
        '<div class="pg-card pg3-lp"><div class="lt">The loop<em>round and round</em></div>' +
          // pills at 250 + 360k (290 wide); the way back runs under them, broken around its label
          '<svg width="1680" height="156"><path class="ar" d="M1475 88V124Q1475 140 1459 140H1060M810 140H411Q395 140 395 124V96"/><path class="ar" d="M385 104L395 90L405 104"/>' +
          [0, 1, 2].map(function (k) { var x = 550 + k * 360; return '<path class="ar" d="M' + x + ' 56H' + (x + 48) + 'M' + (x + 38) + ' 46L' + (x + 50) + ' 56L' + (x + 38) + ' 66"/>'; }).join('') +
          '<text class="ag" x="935" y="147" text-anchor="middle">…and again, and again</text></svg>' +
          LOOP.map(function (x, k) { return '<div class="pg3-p" style="--c:' + x[1] + ';--d:' + (k * 1.2) + 's;left:' + (250 + k * 360) + 'px"><i>' + (k + 1) + '</i><span>' + x[0] + '</span></div>'; }).join('') +
        '</div>';
      g.mount(r);
      var a1 = r.querySelector('.a1'), a1f = a1.querySelectorAll('.pg3-fc'), a2 = r.querySelector('.a2');
      g.onT = function (t) {
        a1.classList.toggle('on', t >= EV[0].t);
        a1f[0].classList.toggle('on', t >= EV[0].t + .2);
        a1f[1].classList.toggle('on', t >= l1[0]);
        a2.classList.toggle('on', t >= T[2] - .3);
      };
      var st = el.__pg = { r: r, g: g, T: T, kv: 10, kt: 10, va: r.querySelector('.va'), pt: r.querySelector('.pt'), num: r.querySelector('.num') };
      if (ctx.static) { r.classList.add('k3', 'k4', 'k5'); st.kv = st.kt = KNOB[5]; }
      knob(st);
      g.set(ctx.static ? T[5] : T[0], false);
    },
    enter: function (el, ctx) {
      var st = el.__pg; if (!st) return;
      if (ctx.reduced) return;
      drive(st, ctx, function (dt) {                   // the knob turns at 3 units a second
        if (Math.abs(st.kv - st.kt) < 1e-3) return;
        st.kv = st.kv < st.kt ? Math.min(st.kt, st.kv + 3 * dt) : Math.max(st.kt, st.kv - 3 * dt);
        knob(st);
      });
    },
    steps: 5,
    step: function (el, i, ctx) { var st = el.__pg; if (!st) return; for (var k = 3; k <= i; k++) st.r.classList.add('k' + k); goTo(st, i, ctx); setKnob(st, i, ctx); },
    unstep: function (el, i, ctx) { var st = el.__pg; if (!st) return; goTo(st, i - 1, ctx, true); setKnob(st, i - 1, ctx, true); }
  });

  function setKnob(st, k, ctx, back) { st.kt = KNOB[k]; if (back || jumps(ctx)) { st.kv = st.kt; knob(st); } }
  function knob(st) {
    var v = st.kv;
    st.va.setAttribute('stroke-dasharray', (ARC * v / 10).toFixed(1) + ' 9999');
    st.va.setAttribute('stroke', v >= 6.5 ? '#2EE59D' : v >= 4.5 ? '#FFB020' : '#FF4D4D');
    st.pt.setAttribute('transform', 'rotate(' + (-135 + 27 * v).toFixed(1) + ' 150 150)');
    st.num.textContent = Math.round(v);
  }
})();

})();
