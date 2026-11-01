/* ============================================================================
   part-h.js - screens at bedtime (both versions): what the white glow of a screen does to the eyes, the brain and sleep.
     id 'phones-everywhere'     the bedroom photo comes alive: the phone glows and lights the face, the clock runs on past
                                midnight, notifications keep popping. Click 1 = the glow streams into the eye and a brain
                                lights up inside the head: wide awake.
     id 'screen-time-research'  the studies fan in (click a paper to zoom); clicks 1-3 = that night, the next day, and
                                every hour on a screen in bed (Hjetland et al. 2025).
     id 'screen-glow-brain'     (inserted after it) a cutaway head at night, melatonin dripping from the pineal gland.
                                Click 1 = the phone lights up and the glow pours into the eye; 2 = the signal races to the body
                                clock, which flips to "daytime"; 3 = the melatonin tap closes and the graph shows the night's
                                melatonin cut by about half and starting ~1.5 h later (Chang et al., PNAS 2015). The curves
                                are illustrative, shaped on that study's figures.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }

var lastPos = null, cameBack = false;           // arrived with Back: the slide is shown fully built, no replays
Deck.on('show', function (s) { cameBack = lastPos !== null && s.pos < lastPos; lastPos = s.pos; });

/* steps are classes k1..kN on the slide root; Back, reduced motion and re-entry jump without transitions */
function setK(r, k, n, ctx, back) {
  var jump = back || cameBack || ctx.reduced;
  if (jump) r.classList.add('inst');
  for (var i = 1; i <= n; i++) r.classList.toggle('k' + i, i <= k);
  if (jump) { void r.offsetWidth; r.classList.remove('inst'); }
}
function kOf(r) { var k = 0; while (r.classList.contains('k' + (k + 1))) k++; return k; }

var SI = {
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  zig: '<path d="M2 13h4l2.5-6 3.5 11 3-8 2 3h5"/>',
  storm: '<path d="M7 17.5a5 5 0 1 1 1.4-9.8A6 6 0 0 1 19.5 9a4.2 4.2 0 0 1-.6 8.4"/><path d="M13 11.5l-2.4 4.2h3.2L11.6 20"/>',
  battery: '<rect x="2" y="7" width="17" height="10" rx="2.4"/><path d="M22 10.5v3"/><path d="M5.5 10.5v3" stroke-width="3"/>',
  fog: '<path d="M3 8h13M6 12h15M3 16h12"/><path d="M19 8h2M18 16h3"/>',
  bolt: '<path d="M13.5 2L4.5 14h7l-1 8 9-12h-7z"/>',
  moon: '<path d="M20 14.6A8.4 8.4 0 0 1 9.4 4 8.4 8.4 0 1 0 20 14.6z"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  phone: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18.5h2"/>',
  eye: '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'
};
var FI = {
  heart: '<path d="M12 21s-7.5-4.6-9.5-9.3C1 8 3.3 4.5 7 4.5c2 0 3.5 1 5 2.8 1.5-1.8 3-2.8 5-2.8 3.7 0 6 3.5 4.5 7.2C19.5 16.4 12 21 12 21z"/>',
  chat: '<path d="M4 4h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z"/>',
  play: '<path d="M7 4.5v15l12.5-7.5z"/>',
  fire: '<path d="M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-3 2-5 3-6 0 2 1 3 2 3 0-3-1-6 1-9z"/>'
};
function sico(k) { return '<svg viewBox="0 0 24 24">' + SI[k] + '</svg>'; }
function fico(k) { return '<svg viewBox="0 0 24 24">' + FI[k] + '</svg>'; }

addCss('ph-css', [
  '.ph{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden}',
  '.ph *{box-sizing:border-box}',
  '.ph-k{position:absolute;left:120px;display:flex;align-items:center;gap:14px;font:700 19px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:#9FC9FF}',
  '.ph-k i{width:12px;height:12px;border-radius:50%;background:#9FC9FF;animation:ph-ping 2.2s ease-out infinite}',
  '@keyframes ph-ping{0%{box-shadow:0 0 0 0 rgba(159,201,255,.6)}80%,100%{box-shadow:0 0 0 16px rgba(159,201,255,0)}}',
  '.ph-t{position:absolute;left:114px;font:600 92px/1.02 var(--f-display);letter-spacing:-.025em;color:#fff;white-space:nowrap}',
  '.ph-t em{font-style:italic;color:#BFE0FF;text-shadow:0 0 40px rgba(140,200,255,.55)}',
  '.ph-card{position:absolute;border-radius:28px;background:linear-gradient(160deg,rgba(255,255,255,.075),rgba(255,255,255,.025));box-shadow:inset 0 0 0 1px var(--glass-b),0 30px 80px rgba(0,0,0,.45)}',
  '.ph-ch{position:absolute;left:34px;top:26px;display:flex;align-items:center;gap:12px;font:700 18px/1 var(--f-body);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}',
  '.ph-ch svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
  '.ph-src{position:absolute;font:400 16px/1.3 var(--f-body);color:rgba(154,167,173,.8)}',
  '.ph.static *{animation:none!important;transition:none!important}',
  '.ph.inst *{transition:none!important}',
  '@media (prefers-reduced-motion:reduce){.ph *{animation:none!important;transition-duration:.01s!important}}',

  /* ---- A. the bedroom */
  '.pha-sc{position:absolute;left:0;top:0;width:1920px;height:1280px;transform-origin:60% 36%;animation:pha-kb 40s ease-in-out infinite alternate}',
  '@keyframes pha-kb{from{transform:scale(1)}to{transform:scale(1.07)}}',
  '.pha-sc img{position:absolute;left:0;top:0;width:1920px;height:1280px}',
  '.pha-dim{position:absolute;inset:0;background:#03060a;opacity:0;transition:opacity 1.6s var(--ease)}',
  '.pha.k1 .pha-dim{opacity:.38}',
  '.pha-gl{position:absolute;border-radius:50%;mix-blend-mode:screen;pointer-events:none}',
  '.pha-ph{left:476px;top:247px;width:480px;height:480px;background:radial-gradient(closest-side,rgba(225,240,255,.85),rgba(140,190,255,.32) 38%,transparent);animation:pha-fl 5.2s steps(1) infinite}',
  '.pha-face{left:1040px;top:250px;width:420px;height:440px;background:radial-gradient(closest-side,rgba(170,205,255,.42),transparent);animation:pha-fl 5.2s steps(1) infinite}',
  /* a screen's light flickers as the video cuts */
  '@keyframes pha-fl{0%{opacity:.8}9%{opacity:.62}17%{opacity:.95}31%{opacity:.7}42%{opacity:.88}55%{opacity:.58}63%{opacity:1}78%{opacity:.74}89%{opacity:.9}}',
  '.pha-fx{position:absolute;left:0;top:0}',
  '.pha-cone{position:absolute;left:0;top:0;opacity:0;transition:opacity 1.2s}',
  '.pha.k1 .pha-cone{opacity:1}',
  '.pha-p{position:absolute;left:0;top:0;width:12px;height:12px;margin:-6px 0 0 -6px;border-radius:50%;background:#EAF4FF;box-shadow:0 0 12px 4px rgba(150,200,255,.9);pointer-events:none;will-change:transform,opacity}',
  '.pha-eye{position:absolute;width:60px;height:60px;margin:-30px 0 0 -30px;border-radius:50%;box-shadow:0 0 0 3px rgba(190,225,255,.9),0 0 30px 8px rgba(150,200,255,.7);opacity:0;transform:scale(.4);transition:opacity .6s .5s,transform .8s .5s cubic-bezier(.2,1.5,.4,1)}',
  '.pha.k1 .pha-eye{opacity:1;transform:none;animation:pha-eb 1.6s ease-in-out 1.4s infinite alternate}',
  '@keyframes pha-eb{to{transform:scale(1.18)}}',
  '.pha-br{position:absolute;left:1244px;top:244px;width:270px;height:200px;opacity:0;transform:scale(.85);transition:opacity 1s 1.3s,transform 1.2s 1.3s var(--ease)}',
  '.pha.k1 .pha-br{opacity:1;transform:none}',
  '.pha-br svg{overflow:visible}',
  '.pha-br .bo{fill:rgba(140,190,255,.18);stroke:#CFE6FF;stroke-width:4;stroke-linejoin:round;filter:drop-shadow(0 0 10px rgba(140,200,255,.9))}',
  '.pha-br .sl{fill:none;stroke:rgba(207,230,255,.7);stroke-width:3;stroke-linecap:round}',
  '.pha-br .sp{fill:#fff;transform-box:fill-box;transform-origin:center;animation:pha-sp 1.1s ease-in-out infinite alternate}',
  '@keyframes pha-sp{from{opacity:.15;transform:scale(.4)}to{opacity:1;transform:scale(1.3)}}',
  '.pha-tag{position:absolute;left:1545px;top:300px;padding:12px 22px;border-radius:99px;background:rgba(5,10,16,.78);box-shadow:inset 0 0 0 2px rgba(159,201,255,.7),0 0 30px rgba(120,180,255,.35);',
  '  font:600 26px/1 var(--f-body);color:#fff;white-space:nowrap;opacity:0;transform:translateY(10px);transition:opacity .6s 2s,transform .6s 2s}',
  '.pha-tag b{color:#9FC9FF}',
  '.pha.k1 .pha-tag{opacity:1;transform:none}',
  '.pha-top{position:absolute;left:0;top:0;width:1920px;height:330px;background:linear-gradient(180deg,rgba(3,6,10,.9),rgba(3,6,10,.55) 55%,transparent)}',
  '.pha-bot{position:absolute;left:0;bottom:0;width:1920px;height:380px;background:linear-gradient(0deg,rgba(3,6,10,.94),rgba(3,6,10,.6) 55%,transparent);opacity:0;transition:opacity 1.2s}',
  '.pha.k1 .pha-bot{opacity:1}',
  '.pha .ph-k{top:62px}',
  '.pha .ph-t{top:94px;font-size:84px}',
  '.pha-clk{position:absolute;right:110px;top:46px;text-align:right;color:#fff}',
  '.pha-clk b{display:block;font:600 112px/1 var(--f-body);letter-spacing:-.03em;font-variant-numeric:tabular-nums;text-shadow:0 0 36px rgba(140,200,255,.45)}',
  '.pha-clk b small{font-size:40px;margin-left:10px;letter-spacing:0;color:#9FC9FF}',
  '.pha-clk span{display:block;margin-top:10px;font:italic 400 26px/1 var(--f-display);color:var(--ink2)}',
  '.pha-n{position:absolute;left:0;top:0;display:flex;align-items:center;gap:12px;padding:10px 20px 10px 10px;border-radius:20px;white-space:nowrap;',
  '  background:rgba(30,34,46,.88);box-shadow:0 10px 30px rgba(0,0,0,.45),inset 0 0 0 1px rgba(255,255,255,.12);font:600 22px/1 var(--f-body);color:#fff;pointer-events:none;will-change:transform,opacity}',
  '.pha-n i{width:40px;height:40px;border-radius:11px;display:grid;place-items:center;background:var(--c)}',
  '.pha-n svg{width:24px;height:24px;fill:#fff}',
  '.pha-msg{position:absolute;left:120px;bottom:70px}',
  '.pha-msg p{margin:0;opacity:0;transform:translateY(16px);transition:opacity .8s,transform .8s}',
  '.pha-msg .a{font:600 74px/1.05 var(--f-display);color:#fff;transition-delay:.3s}',
  '.pha-msg .a em{font-style:italic;color:var(--red)}',
  '.pha-msg .b{margin-top:16px;font:400 32px/1.3 var(--f-body);color:var(--ink2);transition-delay:2.4s}',
  '.pha-msg .b b{color:#BFE0FF;font-weight:600}',
  '.pha.k1 .pha-msg p{opacity:1;transform:none}',
  '.ph.static .pha-n{display:none}',

  /* ---- B. the research */
  '.phb .ph-k{top:96px}',
  '.phb .ph-t{top:128px}',
  '.phb-sub{position:absolute;left:120px;top:240px;font:400 30px/1.3 var(--f-body);color:var(--ink2)}',
  '.phb-sub b{color:#fff;font-weight:600}',
  '.phb-pp{position:absolute;border-radius:14px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px rgba(255,255,255,.2),0 30px 70px rgba(0,0,0,.6);cursor:zoom-in;',
  '  opacity:0;transform:translate(-60px,30px) rotate(var(--r)) scale(.94);animation:phb-in .9s var(--ease) forwards;animation-delay:var(--d)}',
  '.phb-pp img{display:block;width:100%}',
  '.phb-pp:hover{box-shadow:0 0 0 3px #9FC9FF,0 30px 70px rgba(0,0,0,.6)}',
  '@keyframes phb-in{to{opacity:1;transform:rotate(var(--r))}}',
  '.ph.static .phb-pp,.phb.done .phb-pp{animation:none;opacity:1;transform:rotate(var(--r))}',
  '.phb-pl{position:absolute;right:12px;top:12px;padding:7px 14px;border-radius:99px;background:rgba(5,8,11,.86);font:600 17px/1 var(--f-body);color:#fff}',
  '.phb-c{opacity:0;transform:translateY(24px);transition:opacity .7s,transform .7s var(--ease)}',
  '.phb.k1 .phb-n,.phb.k2 .phb-d,.phb.k3 .phb-s{opacity:1;transform:none}',
  '.phb-n{left:820px;top:330px;width:1000px;height:236px;background:linear-gradient(160deg,rgba(80,100,200,.2),rgba(255,255,255,.02))}',
  '.phb-d{left:820px;top:588px;width:1000px;height:236px;background:linear-gradient(160deg,rgba(255,176,32,.13),rgba(255,255,255,.02))}',
  '.phb-n .ph-ch{color:#AEB8FF}.phb-d .ph-ch{color:var(--amber)}',
  '.phb-row{position:absolute;left:34px;right:34px;top:76px;display:flex;justify-content:space-between}',
  '.phb-it{width:300px;display:flex;align-items:center;gap:16px;opacity:0;transform:translateY(12px);transition:opacity .5s,transform .5s}',
  '.phb-it:nth-child(2){transition-delay:.25s}.phb-it:nth-child(3){transition-delay:.5s}',
  '.phb.k1 .phb-n .phb-it,.phb.k2 .phb-d .phb-it{opacity:1;transform:none}',
  '.phb-ic{flex:none;position:relative;width:70px;height:70px;border-radius:20px;display:grid;place-items:center;background:rgba(var(--c),.16);box-shadow:inset 0 0 0 2px rgba(var(--c),.6)}',
  '.phb-ic svg{width:38px;height:38px;fill:none;stroke:rgb(var(--c));stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
  '.phb-it span{font:600 25px/1.2 var(--f-body);white-space:nowrap;color:#fff}',
  '.phb-it span em{display:block;font-style:normal;font-weight:400;font-size:20px;white-space:normal;color:var(--muted);margin-top:4px}',
  /* little life in the icons: hands spin, the line jolts, the battery drains, the bolt flickers */
  '.phb-ic.spin svg path{transform-origin:12px 12px;animation:phb-spin 2.4s linear infinite}',
  '@keyframes phb-spin{to{transform:rotate(360deg)}}',
  '.phb-ic.jolt svg{animation:phb-jolt 2.6s ease-in-out infinite}',
  '@keyframes phb-jolt{0%,70%,100%{transform:none}74%{transform:translateY(-4px)}78%{transform:translateY(3px)}82%{transform:none}}',
  '.phb-ic.drain svg path:last-child{animation:phb-dr 1.4s steps(1) infinite}',
  '@keyframes phb-dr{0%{opacity:1}50%{opacity:.1}}',
  '.phb-ic.zap svg{animation:phb-zap 3s steps(1) infinite}',
  '@keyframes phb-zap{0%,100%{opacity:1}40%{opacity:.35}44%{opacity:1}48%{opacity:.35}52%{opacity:1}}',
  '.phb-z{position:absolute;right:6px;top:2px;font:700 18px/1 var(--f-body);color:#AEB8FF;animation:phb-zz 2.4s ease-out infinite}',
  '@keyframes phb-zz{0%{opacity:0;transform:translate(0,6px)}30%{opacity:1}100%{opacity:0;transform:translate(10px,-22px)}}',
  '.phb-ar{position:absolute;left:1296px;top:560px;width:48px;height:36px;opacity:0;transition:opacity .5s}',
  '.phb.k2 .phb-ar{opacity:1}',
  '.phb-ar svg{fill:none;stroke:rgba(255,255,255,.5);stroke-width:4;stroke-linecap:round;stroke-linejoin:round}',
  '.phb-s{left:820px;top:846px;width:1000px;height:158px;display:flex;align-items:center;padding:0 34px;gap:34px;',
  '  background:linear-gradient(100deg,rgba(255,77,77,.16),rgba(255,255,255,.03));box-shadow:inset 0 0 0 1px rgba(255,77,77,.35),0 30px 80px rgba(0,0,0,.45)}',
  '.phb-s .lb{width:250px;font:600 26px/1.2 var(--f-display);color:#fff}',
  '.phb-s .lb em{display:block;margin-top:6px;font:400 17px/1.3 var(--f-body);font-style:normal;color:var(--muted)}',
  '.phb-s .st b{display:block;font:600 70px/1 var(--f-display);color:#FF7A6A;letter-spacing:-.02em}',
  '.phb-s .st span{display:block;margin-top:6px;font:500 20px/1.2 var(--f-body);color:var(--ink2)}',
  '.phb-s .sep{width:1px;height:96px;background:rgba(255,255,255,.15)}',

  /* ---- C. inside the head */
  '.phc .ph-k{top:84px}',
  '.phc .ph-t{top:116px}',
  '.phc-hd{position:absolute;left:40px;top:150px;width:1000px;height:780px;overflow:visible;transform:scale(1.1);transform-origin:0 0}',
  '.phc-hd .head{fill:rgba(255,255,255,.035);stroke:rgba(255,255,255,.55);stroke-width:4;stroke-linejoin:round}',
  '.phc-hd .brain{fill:rgba(255,140,170,.1);stroke:rgba(255,170,195,.65);stroke-width:3.5;stroke-linejoin:round}',
  '.phc-hd .cb{fill:rgba(255,140,170,.07);stroke:rgba(255,170,195,.45);stroke-width:3}',
  '.phc-hd .ft{fill:none;stroke:rgba(255,255,255,.28);stroke-width:3;stroke-linecap:round}',
  '.phc-hd .sl{fill:none;stroke:rgba(255,170,195,.28);stroke-width:3;stroke-linecap:round}',
  '.phc-hd .stem{fill:none;stroke:rgba(255,170,195,.13);stroke-width:46;stroke-linecap:round}',
  '.phc-hd .nv{fill:none;stroke:rgba(159,201,255,.25);stroke-width:5;stroke-linecap:round;stroke-dasharray:3 9}',
  '.phc-hd .nvl{fill:none;stroke:#BFE0FF;stroke-width:6;stroke-linecap:round;filter:drop-shadow(0 0 8px rgba(140,200,255,.95));stroke-dasharray:1 1;stroke-dashoffset:1;transition:stroke-dashoffset 1.1s var(--ease)}',
  '.phc-hd .nvl.b{transition-delay:1s}',
  '.phc.k2 .phc-hd .nvl{stroke-dashoffset:0}',
  '.phc-hd .eye{fill:#f4f1ea;stroke:rgba(255,255,255,.7);stroke-width:2}',
  '.phc-hd .iris{fill:#3d6a8c}',
  '.phc-hd .eyeg{fill:rgba(190,225,255,.9);opacity:0;transform-box:fill-box;transform-origin:center;transition:opacity .8s .6s}',
  '.phc.k1 .phc-hd .eyeg{opacity:1;animation:phc-pulse 1.5s ease-in-out 1.4s infinite alternate}',
  '@keyframes phc-pulse{from{transform:scale(.8)}to{transform:scale(1.25)}}',
  '.phc-hd .case{fill:#15161c;stroke:#4a4d58;stroke-width:3}',
  '.phc-hd .scr{fill:#0c0d12;transition:fill .5s}',
  '.phc.k1 .phc-hd .scr{fill:#F2F8FF}',
  '.phc-hd .halo{opacity:0;transition:opacity .6s}',
  '.phc.k1 .phc-hd .halo{opacity:1}',
  '.phc-hd .cone{opacity:0;transition:opacity 1s .3s}',
  '.phc.k1 .phc-hd .cone{opacity:1}',
  '.phc-hd .scn{opacity:.35;transition:opacity .6s}',
  '.phc.k2 .phc-hd .scn{opacity:1;transition-delay:1s}',
  '.phc-hd .scn .face{fill:#1a2430;stroke:#9FC9FF;stroke-width:3}',
  '.phc-hd .scn .hand{stroke:#fff;stroke-width:3.5;stroke-linecap:round;transform-box:view-box;transform-origin:446px 398px}',
  '.phc.k2 .phc-hd .scn .hand{animation:phc-spin 1.2s linear 1.1s infinite}',
  '.phc-hd .scn .hand.m{animation-duration:7s!important}',
  '@keyframes phc-spin{to{transform:rotate(360deg)}}',
  '.phc-hd .sun{opacity:0;transform-box:fill-box;transform-origin:center;transform:scale(.4);transition:opacity .5s 1.9s,transform .7s 1.9s cubic-bezier(.2,1.6,.4,1)}',
  '.phc.k2 .phc-hd .sun{opacity:1;transform:none}',
  '.phc-hd .sun circle{fill:#FFD23F}.phc-hd .sun path{stroke:#FFD23F;stroke-width:4;stroke-linecap:round}',
  '.phc-hd .pin{fill:#9B8CFF;stroke:#CFC6FF;stroke-width:2.5;transition:fill 1.4s .4s,stroke 1.4s .4s}',
  '.phc-hd .ping{fill:rgba(155,140,255,.35);transform-box:fill-box;transform-origin:center;animation:phc-pulse 1.8s ease-in-out infinite alternate;transition:opacity 1.4s .4s}',
  '.phc.k3 .phc-hd .pin{fill:#4a4a5a;stroke:#77778a}',
  '.phc.k3 .phc-hd .ping{opacity:.15}',
  '.phc-hd .lbl{font:600 22px var(--f-body);fill:var(--ink2)}',
  '.phc-hd .lbl.m{fill:#BDB3FF}',
  '.phc-hd .bdg{opacity:0;transition:opacity .5s}',
  '.phc.k1 .phc-hd .bdg.b1,.phc.k2 .phc-hd .bdg.b2,.phc.k3 .phc-hd .bdg.b3{opacity:1}',
  '.phc.k2 .phc-hd .bdg.b2{transition-delay:1.1s}',
  '.phc-hd .bdg circle{fill:#0b1218;stroke:#9FC9FF;stroke-width:3}',
  '.phc-hd .bdg.b3 circle{stroke:#BDB3FF}',
  '.phc-hd .bdg text{font:700 22px var(--f-body);fill:#fff}',
  '.phc-dr{position:absolute;left:0;top:0;width:16px;height:22px;margin:-11px 0 0 -8px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;background:#B4A8FF;',
  '  box-shadow:0 0 12px 3px rgba(155,140,255,.75);pointer-events:none;will-change:transform,opacity}',
  '.phc-sig{position:absolute;left:0;top:0;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;background:#fff;box-shadow:0 0 18px 7px rgba(140,200,255,.95);opacity:0;pointer-events:none}',
  '.phc-g{left:1060px;top:250px;width:760px;height:430px}',
  '.phc-g .ph-ch{color:#BDB3FF}',
  '.phc-lv{position:absolute;right:34px;top:16px;text-align:right}',
  '.phc-lv b{display:block;font:600 56px/1 var(--f-display);color:#BDB3FF;font-variant-numeric:tabular-nums;transition:color 1s}',
  '.phc.k3 .phc-lv b{color:#FF8A5A}',
  '.phc-lv span{display:block;margin-top:4px;font:500 16px/1 var(--f-body);letter-spacing:.1em;text-transform:uppercase;color:var(--muted)}',
  '.phc-g>svg{position:absolute;left:44px;top:88px;overflow:visible}',
  '.phc-g .ax{stroke:rgba(255,255,255,.25);stroke-width:2}',
  '.phc-g .tl{font:500 17px var(--f-body);fill:var(--muted)}',
  '.phc-g .band{fill:rgba(159,201,255,.1);opacity:0;transition:opacity .8s}',
  '.phc-g .bandl{font:600 16px var(--f-body);fill:#9FC9FF;letter-spacing:.08em;opacity:0;transition:opacity .8s}',
  '.phc.k1 .phc-g .band,.phc.k1 .phc-g .bandl{opacity:1}',
  '.phc-g .cv{fill:none;stroke-width:6;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:1 1}',
  '.phc-g .cv.n{stroke:#9B8CFF;filter:drop-shadow(0 0 8px rgba(155,140,255,.7))}',
  '.phc-g .ar.n{fill:rgba(155,140,255,.14)}',
  '.phc-g .cv.s{stroke:#FF8A5A;filter:drop-shadow(0 0 8px rgba(255,120,80,.7));stroke-dashoffset:1;transition:stroke-dashoffset 2.4s var(--ease) .3s}',
  '.phc.k3 .phc-g .cv.n{opacity:.55}',
  '.phc.k3 .phc-g .cv.s{stroke-dashoffset:0}',
  '.phc-g .an{opacity:0;transition:opacity .7s 2.4s}',
  '.phc.k3 .phc-g .an{opacity:1}',
  '.phc-g .an text{font:700 20px var(--f-body)}',
  '.phc-g .lg{position:absolute;left:44px;bottom:22px;display:flex;gap:28px;font:500 19px/1 var(--f-body);color:var(--ink2)}',
  '.phc-g .lg span{display:flex;align-items:center;gap:10px}',
  '.phc-g .lg i{width:32px;height:6px;border-radius:3px;background:#9B8CFF}',
  '.phc-g .lg .s{opacity:0;transition:opacity .6s}',
  '.phc-g .lg .s i{background:#FF8A5A}',
  '.phc.k3 .phc-g .lg .s{opacity:1}',
  '.phc-g .ph-src{right:34px;bottom:22px;text-align:right}',
  '.phc-st{left:1060px;top:704px;width:760px;height:300px;padding:22px 30px}',
  '.phc-r{position:relative;display:flex;align-items:flex-start;gap:18px;height:66px}',
  '.phc-r i{flex:none;width:40px;height:40px;margin-top:2px;border-radius:50%;display:grid;place-items:center;font:700 20px/1 var(--f-body);font-style:normal;color:#fff;',
  '  background:rgba(var(--c),.2);box-shadow:inset 0 0 0 2px rgba(var(--c),.8)}',
  '.phc-r i svg{width:22px;height:22px;fill:none;stroke:rgb(var(--c));stroke-width:2;stroke-linecap:round;stroke-linejoin:round}',
  '.phc-r b{display:block;font:600 25px/1.15 var(--f-body);color:#fff}',
  '.phc-r span{display:block;margin-top:3px;font:400 19px/1.25 var(--f-body);color:var(--muted)}',
  '.phc-r.s{opacity:0;transform:translateX(-16px);transition:opacity .6s,transform .6s}',
  '.phc.k1 .phc-r.s1,.phc.k2 .phc-r.s2,.phc.k3 .phc-r.s3{opacity:1;transform:none}',
  '.phc.k2 .phc-r.s2{transition-delay:.9s}.phc.k3 .phc-r.s3{transition-delay:.4s}'
]);

/* ================================================================ A. phones-everywhere */
(function () {
  var PHONE = [716, 480], EYE = [1226, 452];       // stage px on the photo (1920 x 1280, top-aligned)
  var NOTES = [['heart', 'Sara liked your video', '255,59,92'], ['play', 'Up next in 5…', '255,0,0'], ['chat', '3 new messages', '37,211,102'],
    ['fire', 'Don’t lose your streak!', '255,122,26'], ['play', 'One more episode?', '229,9,20'], ['heart', '12 new likes', '255,59,92']];
  // brain inside the line-drawn head, facing left like the boy
  var BRAIN = '<svg width="270" height="200" viewBox="0 0 270 200">' +
    '<path class="bo" d="M18 118C4 84 16 40 58 22C96 6 150 2 196 18C240 34 264 70 258 108C254 136 232 154 204 156C188 172 156 178 130 170C104 180 70 176 52 160C30 152 22 136 18 118Z"/>' +
    '<path class="sl" d="M120 14C112 44 132 60 122 92M60 30C78 50 70 74 92 86M188 22C176 52 198 70 186 104M40 116C70 112 84 128 108 124M146 118C170 104 200 120 222 108M226 50C212 70 236 86 228 120M150 170C146 150 166 140 160 124"/>' +
    [[74, 60], [150, 52], [208, 86], [120, 132], [56, 132], [182, 140], [104, 96]].map(function (p, i) {
      return '<circle class="sp" cx="' + p[0] + '" cy="' + p[1] + '" r="5" style="animation-delay:' + (i * .17).toFixed(2) + 's"/>';
    }).join('') + '</svg>';
  function cone() {
    var dx = EYE[0] - PHONE[0], dy = EYE[1] - PHONE[1], L = Math.sqrt(dx * dx + dy * dy), nx = -dy / L, ny = dx / L;
    var a = [PHONE[0] + nx * 40, PHONE[1] + ny * 40], b = [PHONE[0] - nx * 40, PHONE[1] - ny * 40], c = [EYE[0] - nx * 12, EYE[1] - ny * 12], d = [EYE[0] + nx * 12, EYE[1] + ny * 12];
    return '<svg class="pha-cone" width="1920" height="1280"><defs><linearGradient id="pha-cg" gradientUnits="userSpaceOnUse" x1="' + PHONE[0] + '" y1="' + PHONE[1] + '" x2="' + EYE[0] + '" y2="' + EYE[1] + '">' +
      '<stop offset="0" stop-color="#EAF4FF" stop-opacity=".55"/><stop offset="1" stop-color="#9FC9FF" stop-opacity=".35"/></linearGradient></defs>' +
      '<path d="M' + a + 'L' + d + 'L' + c + 'L' + b + 'Z" fill="url(#pha-cg)" style="mix-blend-mode:screen;filter:blur(6px)"/></svg>';
  }
  function fmt(m) { var hh = Math.floor(m / 60) % 24, mm = m % 60, pm = hh >= 12; hh = hh % 12 || 12; return hh + ':' + (mm < 10 ? '0' : '') + mm + '<small>' + (pm ? 'PM' : 'AM') + '</small>'; }

  Deck.registerSlide('phones-everywhere', {
    title: 'The last thing we see before sleep', loop: false, calm: true, steps: 1,
    render: function (el, ctx) {
      var r = h('div', 'ph pha' + (ctx.static ? ' static k1' : ''), el);
      r.innerHTML =
        '<div class="pha-sc"><img src="media/image16.webp" alt="A boy lying in bed, looking at his phone">' +
          '<div class="pha-gl pha-face"></div><div class="pha-dim"></div><div class="pha-gl pha-ph"></div>' + cone() +
          '<div class="pha-fx"></div>' +
          '<div class="pha-eye" style="left:' + EYE[0] + 'px;top:' + EYE[1] + 'px"></div><div class="pha-br">' + BRAIN + '</div></div>' +
        '<div class="pha-top"></div><div class="pha-bot"></div>' +
        '<div class="ph-k"><i></i>Every night</div>' +
        '<div class="ph-t">The last thing we see <em>before sleep</em></div>' +
        '<div class="pha-clk"><b>' + fmt(ctx.static ? 24 * 60 + 47 : 22 * 60 + 58) + '</b><span>…still scrolling</span></div>' +
        '<div class="pha-tag">Brain: <b>“It’s daytime!”</b></div>' +
        '<div class="pha-msg"><p class="a">It feels harmless. <em>It isn’t.</em></p><p class="b">The glow pours in through the eyes and tells the brain: <b>stay awake.</b></p></div>';
      el.__ph = { r: r, fx: r.querySelector('.pha-fx'), clk: r.querySelector('.pha-clk b'), min: 22 * 60 + 58 };
    },
    enter: function (el, ctx) {
      var st = el.__ph; if (!st || ctx.reduced) return;
      ctx.interval(function () { st.min++; st.clk.innerHTML = fmt(st.min); }, 650);
      var ni = 0;
      function pop() {                                // a notification rises off the phone and fades
        var n = NOTES[ni++ % NOTES.length], c = h('div', 'pha-n', st.r.querySelector('.pha-sc'), '<i style="--c:rgb(' + n[2] + ')">' + fico(n[0]) + '</i>' + n[1]);
        if (!c.animate) { c.remove(); return; }
        var x = PHONE[0] - 330 + (ni % 2) * 60, y = PHONE[1] - 150;
        c.animate([
          { transform: 'translate(' + (x + 120) + 'px,' + (y + 60) + 'px) scale(.6)', opacity: 0 },
          { transform: 'translate(' + x + 'px,' + y + 'px) scale(1)', opacity: 1, offset: .18 },
          { transform: 'translate(' + x + 'px,' + (y - 70) + 'px) scale(1)', opacity: 1, offset: .75 },
          { transform: 'translate(' + x + 'px,' + (y - 110) + 'px) scale(.96)', opacity: 0 }
        ], { duration: 3000, easing: 'ease-out', fill: 'both' }).onfinish = function () { c.remove(); };
      }
      ctx.timeout(pop, 700);
      ctx.interval(function () { if (!st.r.classList.contains('k1')) pop(); }, 2300);
      ctx.interval(function () {                      // light particles from the phone to the eye
        if (!st.r.classList.contains('k1')) return;
        var p = h('div', 'pha-p', st.fx), j = (Math.random() - .5) * 50, s = .6 + Math.random() * .7;
        if (!p.animate) { p.remove(); return; }
        p.animate([
          { transform: 'translate(' + PHONE[0] + 'px,' + (PHONE[1] + j) + 'px) scale(' + s + ')', opacity: 0 },
          { opacity: 1, offset: .15 },
          { transform: 'translate(' + EYE[0] + 'px,' + (EYE[1] + j * .15) + 'px) scale(' + (s * .5) + ')', opacity: .2 }
        ], { duration: 900 + Math.random() * 300, easing: 'cubic-bezier(.5,0,.8,.6)', fill: 'both' }).onfinish = function () { p.remove(); };
      }, 70);
    },
    step: function (el, i, ctx) { if (el.__ph) setK(el.__ph.r, i, 1, ctx); },
    unstep: function (el, i, ctx) { if (el.__ph) setK(el.__ph.r, i - 1, 1, ctx, true); }
  });
})();

/* ================================================================ B. screen-time-research */
(function () {
  var PAPERS = [
    { src: 'media/blur/image17.png', l: 120, t: 318, w: 480, r: -3.5, d: 0, lb: '248 teens · Dhaka, 2025' },
    { src: 'media/image18.png', l: 300, t: 520, w: 470, r: 2.5, d: .35, lb: 'Systematic review · 2023' },
    { src: 'media/image19.png', l: 150, t: 742, w: 520, r: -1.5, d: .7, lb: 'Cohort study · 2021' }
  ];
  function item(ic, cls, c, t, s, extra) {
    return '<div class="phb-it"><div class="phb-ic ' + cls + '" style="--c:' + c + '">' + sico(ic) + (extra || '') + '</div><span>' + t + '<em>' + s + '</em></span></div>';
  }
  Deck.registerSlide('screen-time-research', {
    title: 'Screens at bedtime steal sleep', loop: ['orbs'], steps: 3,
    render: function (el, ctx) {
      var r = h('div', 'ph phb' + (ctx.static ? ' static k1 k2 k3' : ''), el);
      r.innerHTML =
        '<div class="ph-k"><i></i>The research</div>' +
        '<div class="ph-t">Screens at bedtime <em>steal sleep</em></div>' +
        '<div class="phb-sub">Study after study, on <b>thousands of young people</b>, finds the same thing.</div>' +
        PAPERS.map(function (p) {
          return '<div class="phb-pp pe" data-noadvance data-src="' + p.src + '" style="left:' + p.l + 'px;top:' + p.t + 'px;width:' + p.w + 'px;--r:' + p.r + 'deg;--d:' + (p.d + .2) + 's">' +
            '<img src="' + p.src + '" alt=""><div class="phb-pl">' + p.lb + '</div></div>';
        }).join('') +
        '<div class="ph-card phb-c phb-n"><div class="ph-ch">' + sico('moon') + 'That night</div><div class="phb-row">' +
          item('clock', 'spin', '174,184,255', 'Can’t fall asleep', 'Lying awake for ages', '<b class="phb-z">z</b>') +
          item('zig', 'jolt', '174,184,255', 'Wake up again', 'Broken, light sleep') +
          item('storm', '', '174,184,255', 'Stressful dreams', 'Vivid, restless nights') + '</div></div>' +
        '<div class="phb-ar"><svg width="48" height="36"><path d="M24 4v26M12 20l12 12 12-12"/></svg></div>' +
        '<div class="ph-card phb-c phb-d"><div class="ph-ch">' + sico('sun') + 'The next day</div><div class="phb-row">' +
          item('battery', 'drain', '255,176,32', 'Tired, drained', 'Sleep didn’t recharge you') +
          item('fog', '', '255,176,32', 'Foggy brain', 'Poor focus and memory') +
          item('bolt', 'zap', '255,176,32', 'Stressed, grumpy', 'Easily irritated') + '</div></div>' +
        '<div class="ph-card phb-c phb-s"><div class="lb">Every extra hour on a screen in bed<em>45,202 students, Norway · Frontiers in Psychiatry, 2025</em></div>' +
          '<div class="sep"></div><div class="st"><b>−24 min</b><span>of sleep</span></div>' +
          '<div class="sep"></div><div class="st"><b>+59%</b><span>higher odds of insomnia</span></div></div>';
      Array.prototype.forEach.call(r.querySelectorAll('.phb-pp'), function (p) {
        p.addEventListener('click', function (e) { e.stopPropagation(); Deck.lightbox(p.getAttribute('data-src')); });
      });
      if (cameBack) r.classList.add('done');   // papers already in place
      el.__ph = { r: r };
    },
    step: function (el, i, ctx) { if (el.__ph) setK(el.__ph.r, i, 3, ctx); },
    unstep: function (el, i, ctx) { if (el.__ph) setK(el.__ph.r, i - 1, 3, ctx, true); }
  });
})();

/* ================================================================ C. screen-glow-brain */
(function () {
  // head coordinates = SVG user units, placed at stage (40, 240); the head faces left, toward the phone
  var OX = 40, OY = 150, SC = 1.1;                  // the head SVG and the effects layer share this placement
  var EYE = [356, 402], SCN = [446, 398], PIN = [580, 382], NECK = [630, 770];
  // a real profile: sloping forehead, brow, nose bridge and tip, lips, chin, jaw and throat; the skull rounds back to the nape
  var HEAD = 'M800 780C790 720 782 660 784 610C786 570 800 545 812 500C828 420 826 300 795 228C750 140 660 92 560 92C450 92 370 150 338 240' +
    'C322 285 316 325 318 350C320 368 328 380 332 392C318 420 285 452 264 474C256 484 262 494 278 496C290 498 300 498 306 502' +
    'C304 512 300 520 298 528C292 534 294 542 304 546C298 550 298 556 304 560C298 568 300 578 312 584C318 592 316 600 314 608' +
    'C308 626 310 648 330 660C360 676 410 676 450 668C458 700 462 740 462 780';
  var FACE = 'M281 487C291 482 299 487 300 494M305 553H322M450 668C500 650 540 615 560 570';   // nostril, closed lips, jaw line
  // the brain is drawn in its own box and fitted inside the skull
  function fit(d) { var k = 0; return d.replace(/-?\d+(\.\d+)?/g, function (n) { n = +n; return (k++ % 2 ? 125 + (n - 130) * .885 : 355 + (n - 372) * .84).toFixed(1); }); }
  var BRAIN = fit('M372 380C352 300 392 200 492 165C592 130 742 150 812 230C872 300 872 400 832 450C802 490 752 500 702 495C662 520 602 520 562 505C502 500 442 470 412 440C397 425 377 405 372 380Z');
  var SULCI = fit('M600 150C590 200 620 230 600 290M470 190C500 210 490 250 520 270M720 170C700 210 730 240 712 290M410 330C450 320 470 350 500 340M540 330C580 300 640 320 680 300' +
    'M780 260C760 300 790 330 770 380M720 360C700 390 740 410 730 450M420 400C460 395 480 420 520 415');
  var OPT = 'M' + (EYE[0] + 18) + ' ' + EYE[1] + 'C' + (EYE[0] + 44) + ' ' + (EYE[1] + 22) + ' ' + (SCN[0] - 30) + ' ' + (SCN[1] + 18) + ' ' + SCN[0] + ' ' + SCN[1];
  var CLK = 'M' + SCN[0] + ' ' + SCN[1] + 'C' + (SCN[0] + 50) + ' ' + (SCN[1] - 34) + ' ' + (PIN[0] - 50) + ' ' + (PIN[1] - 26) + ' ' + PIN[0] + ' ' + PIN[1];

  /* melatonin through the night, 8 PM (t = 0) to 8 AM (t = 12); shape after Chang et al. 2015: about 55% lower in the evening
     and rising ~1.5 h later after reading on a light-emitting screen */
  var GW = 670, GH = 230, GB = 200, GA = 170;
  function sg(x) { return 1 / (1 + Math.exp(-x)); }
  function hill(t, c) { return .72 + .28 * Math.exp(-Math.pow((t - c) / 2.6, 2)); }   // peaks in the small hours
  function norm(t) { return sg((t - 1.5) / .45) * sg((10.4 - t) / .7) * hill(t, 6); }
  function scr(t) { return .78 * sg((t - 3) / .45) * sg((11.6 - t) / .7) * hill(t, 7.5); }
  function X(t) { return t * GW / 12; }
  function Y(v) { return GB - v * GA; }
  function path(f) { var s = ''; for (var t = 0; t <= 12.001; t += .1) s += (s ? 'L' : 'M') + X(t).toFixed(1) + ',' + Y(f(t)).toFixed(1); return s; }
  function graph() {
    var n = path(norm), s = path(scr), ticks = '';
    ['8 PM', '10', '12 AM', '2', '4', '6', '8 AM'].forEach(function (l, i) { ticks += '<text class="tl" x="' + X(i * 2) + '" y="' + (GB + 30) + '" text-anchor="middle">' + l + '</text>'; });
    var t3 = 3, a = Y(norm(t3)), b = Y(scr(t3)), half = Y(.45), t7 = 11;
    return '<svg width="' + GW + '" height="' + GH + '" viewBox="0 0 ' + GW + ' ' + GH + '">' +
      '<rect class="band" x="0" y="0" width="' + X(3) + '" height="' + GB + '"/><text class="bandl" x="10" y="22">SCREEN ON</text>' +
      '<line class="ax" x1="0" y1="' + GB + '" x2="' + GW + '" y2="' + GB + '"/>' + ticks +
      '<path class="ar n" d="' + n + 'L' + GW + ',' + GB + 'L0,' + GB + 'Z"/>' +
      '<path class="cv n" pathLength="1" d="' + n + '"/><path class="cv s" pathLength="1" d="' + s + '"/>' +
      '<g class="an">' +
        '<path d="M' + (X(t3) + 14) + ' ' + (a + 4) + 'V' + (b - 6) + '" stroke="#fff" stroke-width="3" marker-end="url(#phc-ah)"/>' +
        '<text x="' + (X(t3) + 8) + '" y="' + (a - 14) + '" fill="#FF8A5A" text-anchor="end">≈ −55%</text>' +
        '<path d="M' + X(1.5) + ' ' + half + 'H' + (X(2.95) - 4) + '" stroke="#FFD23F" stroke-width="3" stroke-dasharray="5 5" marker-end="url(#phc-ah2)"/>' +
                '<line x1="' + X(t7) + '" y1="20" x2="' + X(t7) + '" y2="' + GB + '" stroke="rgba(255,255,255,.4)" stroke-width="2" stroke-dasharray="4 6"/>' +
        '<text x="' + (X(t7) - 10) + '" y="' + (GB - 14) + '" fill="#ddd" text-anchor="end">7 AM: still sleepy</text></g>' +
      '<defs><marker id="phc-ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#fff"/></marker>' +
        '<marker id="phc-ah2" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#FFD23F"/></marker></defs></svg>';
  }
  function head() {
        return '<svg class="phc-hd" width="1000" height="780" viewBox="0 0 1000 780">' +
      '<defs><radialGradient id="phc-hg"><stop offset="0" stop-color="#EAF4FF" stop-opacity=".9"/><stop offset=".4" stop-color="#9FC9FF" stop-opacity=".35"/><stop offset="1" stop-color="#9FC9FF" stop-opacity="0"/></radialGradient>' +
        '<linearGradient id="phc-cg" x1="0" x2="1"><stop offset="0" stop-color="#EAF4FF" stop-opacity=".6"/><stop offset="1" stop-color="#9FC9FF" stop-opacity=".25"/></linearGradient></defs>' +
      '<path class="head" d="' + HEAD + '"/>' +
      '<path class="stem" d="M575 420C590 520 615 640 630 780"/>' +
      '<ellipse class="cb" cx="689" cy="457" rx="60" ry="39"/>' +
      '<path class="brain" d="' + BRAIN + '"/><path class="sl" d="' + SULCI + '"/><path class="ft" d="' + FACE + '"/>' +
      '<path class="nv" d="' + OPT + '"/><path class="nv" d="' + CLK + '"/>' +
      '<path class="nvl" pathLength="1" d="' + OPT + '"/><path class="nvl b" pathLength="1" d="' + CLK + '"/>' +
      '<circle class="halo" cx="120" cy="415" r="150" fill="url(#phc-hg)"/>' +
      '<path class="cone" d="M150 345L' + (EYE[0] + 4) + ' ' + (EYE[1] - 12) + 'L' + (EYE[0] + 4) + ' ' + (EYE[1] + 12) + 'L150 485Z" fill="url(#phc-cg)" style="filter:blur(5px)"/>' +
      '<rect class="case" x="70" y="300" width="110" height="230" rx="22" transform="rotate(-8 125 415)"/>' +
      '<rect class="scr" x="80" y="312" width="90" height="206" rx="14" transform="rotate(-8 125 415)"/>' +
      '<circle class="eyeg" cx="' + EYE[0] + '" cy="' + EYE[1] + '" r="30"/>' +
      '<path class="eye" d="M' + (EYE[0] - 22) + ' ' + EYE[1] + 'Q' + EYE[0] + ' ' + (EYE[1] - 18) + ' ' + (EYE[0] + 22) + ' ' + (EYE[1] - 6) + 'Q' + (EYE[0] + 4) + ' ' + (EYE[1] + 16) + ' ' + (EYE[0] - 22) + ' ' + EYE[1] + 'Z"/>' +
      '<circle class="iris" cx="' + (EYE[0] - 8) + '" cy="' + (EYE[1] - 1) + '" r="7"/>' +
      '<g class="scn"><circle class="face" cx="' + SCN[0] + '" cy="' + SCN[1] + '" r="24"/>' +
        '<line class="hand" x1="' + SCN[0] + '" y1="' + SCN[1] + '" x2="' + SCN[0] + '" y2="' + (SCN[1] - 15) + '"/>' +
        '<line class="hand m" x1="' + SCN[0] + '" y1="' + SCN[1] + '" x2="' + (SCN[0] + 10) + '" y2="' + SCN[1] + '"/></g>' +
      '<g transform="translate(' + (SCN[0] - 44) + ' ' + (SCN[1] - 62) + ')"><g class="sun"><circle cx="0" cy="0" r="12"/>' +
        [0, 45, 90, 135, 180, 225, 270, 315].map(function (a) { var c = Math.cos(a * Math.PI / 180), s = Math.sin(a * Math.PI / 180); return '<path d="M' + (c * 18).toFixed(1) + ' ' + (s * 18).toFixed(1) + 'L' + (c * 26).toFixed(1) + ' ' + (s * 26).toFixed(1) + '"/>'; }).join('') + '</g></g>' +
      '<circle class="ping" cx="' + PIN[0] + '" cy="' + PIN[1] + '" r="30"/>' +
      '<path class="pin" d="M' + PIN[0] + ' ' + (PIN[1] - 18) + 'C' + (PIN[0] + 16) + ' ' + (PIN[1] - 10) + ' ' + (PIN[0] + 16) + ' ' + (PIN[1] + 12) + ' ' + PIN[0] + ' ' + (PIN[1] + 18) + 'C' + (PIN[0] - 16) + ' ' + (PIN[1] + 12) + ' ' + (PIN[0] - 16) + ' ' + (PIN[1] - 10) + ' ' + PIN[0] + ' ' + (PIN[1] - 18) + 'Z"/>' +
      '<text class="lbl" x="' + (EYE[0] - 4) + '" y="' + (EYE[1] + 46) + '" text-anchor="middle">eye</text>' +
      '<text class="lbl" x="' + (SCN[0] + 8) + '" y="' + (SCN[1] + 70) + '" text-anchor="middle">body clock</text>' +
      '<text class="lbl m" x="' + (PIN[0] + 40) + '" y="' + (PIN[1] - 34) + '">pineal gland</text>' +
      '<text class="lbl m" x="' + (NECK[0] + 22) + '" y="' + (NECK[1] - 110) + '">melatonin<tspan x="' + (NECK[0] + 22) + '" dy="26">→ body</tspan></text>' +
      '<g class="bdg b1" transform="translate(' + (EYE[0] - 6) + ' ' + (EYE[1] - 70) + ')"><circle r="20"/><text y="8" text-anchor="middle">1</text></g>' +
      '<g class="bdg b2" transform="translate(' + (SCN[0] + 44) + ' ' + (SCN[1] - 48) + ')"><circle r="20"/><text y="8" text-anchor="middle">2</text></g>' +
      '<g class="bdg b3" transform="translate(' + (PIN[0] + 4) + ' ' + (PIN[1] - 62) + ')"><circle r="20"/><text y="8" text-anchor="middle">3</text></g>' +
      '</svg>';
  }

  Deck.insertSlide({
    after: 'screen-time-research', id: 'screen-glow-brain', title: 'What the glow does inside you', section: 'problem',
    tr: { type: 'fade', ms: 800 }, loop: false, steps: 3,
    render: function (el, ctx) {
      var r = h('div', 'ph phc' + (ctx.static ? ' static k1 k2 k3' : ''), el);
      r.innerHTML =
        '<div class="ph-k"><i></i>Why it happens</div>' +
        '<div class="ph-t">What the glow does <em>inside you</em></div>' +
        head() +
        '<div class="phc-fx"><div class="phc-sig"></div></div>' +
        '<div class="ph-card phc-g"><div class="ph-ch">' + sico('moon') + 'Melatonin through the night</div>' +
          '<div class="phc-lv"><b>' + (ctx.static ? 45 : 100) + '%</b><span>tonight</span></div>' + graph() +
          '<div class="lg"><span><i></i>Normal night</span><span class="s"><i></i>Screen before bed</span></div>' +
          '<div class="ph-src">Chang et al., PNAS 2015<br>(illustrative curves)</div></div>' +
        '<div class="ph-card phc-st">' +
          '<div class="phc-r" style="--c:155,140,255"><i>' + sico('moon') + '</i><div><b>At night, a tiny gland makes melatonin</b><span>The signal to sleep, and to repair the body.</span></div></div>' +
          '<div class="phc-r s s1" style="--c:159,201,255"><i>1</i><div><b>The glow floods your eyes</b><span>Light sensors read it as sunlight. Staring, we blink less: dry, sore eyes.</span></div></div>' +
          '<div class="phc-r s s2" style="--c:255,210,63"><i>2</i><div><b>Your body clock thinks it’s daytime</b><span>The brain switches to “stay awake” mode.</span></div></div>' +
          '<div class="phc-r s s3" style="--c:255,138,90"><i>3</i><div><b>Melatonin is cut by about half</b><span>The body clock slips about 1.5 h later; the body repairs less.</span></div></div>' +
        '</div>';
      var fx = r.querySelector('.phc-fx'); fx.style.cssText = 'position:absolute;left:' + OX + 'px;top:' + OY + 'px;transform:scale(' + SC + ');transform-origin:0 0';
      el.__ph = { r: r, fx: fx, sig: r.querySelector('.phc-sig'), lv: r.querySelector('.phc-lv b'), opt: r.querySelector('.nv'), clk: r.querySelectorAll('.nv')[1], val: ctx.static ? 45 : 100 };
      if (ctx.static) {                               // a few drops frozen on their way down
        [[.2, 1], [.5, .8], [.8, .5]].forEach(function (d) {
          var p = h('div', 'phc-dr', fx); p.style.transform = 'translate(' + (PIN[0] + (NECK[0] - PIN[0]) * d[0]) + 'px,' + (PIN[1] + 30 + (NECK[1] - PIN[1] - 60) * d[0]) + 'px)'; p.style.opacity = d[1] * .6;
        });
      }
    },
    enter: function (el, ctx) {
      var st = el.__ph; if (!st || ctx.reduced) return;
      var last = 0, sigT = -1;
      ctx.tick(function (dt, t) {
        var k = kOf(st.r);
        // melatonin drops: steady at night, a trickle once the tap closes
        var gap = k >= 3 ? 1700 : 420;
        if (t - last > gap) {
          last = t;
          var p = h('div', 'phc-dr', st.fx), j = (Math.random() - .5) * 26, sc = k >= 3 ? .6 : .8 + Math.random() * .4;
          if (p.animate) p.animate([
            { transform: 'translate(' + PIN[0] + 'px,' + (PIN[1] + 16) + 'px) scale(' + (sc * .4) + ')', opacity: 0 },
            { opacity: k >= 3 ? .5 : 1, offset: .15 },
            { transform: 'translate(' + (NECK[0] + j) + 'px,' + NECK[1] + 'px) scale(' + sc + ')', opacity: 0 }
          ], { duration: 2600, easing: 'cubic-bezier(.4,0,.8,.8)', fill: 'both' }).onfinish = function () { p.remove(); };
          else p.remove();
        }
        // the signal: eye -> body clock -> pineal gland, again and again once step 2 is reached
        if (k >= 2) {
          if (sigT < 0) sigT = t;
          var u = ((t - sigT) % 2200) / 1500;
          if (u <= 1) {
            var a = st.opt, b = st.clk, la = a.getTotalLength(), lb = b.getTotalLength(), d = u * (la + lb);
            var pt = d < la ? a.getPointAtLength(d) : b.getPointAtLength(d - la);
            st.sig.style.transform = 'translate(' + pt.x + 'px,' + pt.y + 'px)'; st.sig.style.opacity = 1;
          } else st.sig.style.opacity = 0;
        } else { sigT = -1; st.sig.style.opacity = 0; }
        // tonight's melatonin level counts down to 45% after step 3
        var target = k >= 3 ? 45 : 100;
        if (st.val !== target) {
          st.val = st.val > target ? Math.max(target, st.val - dt * .03) : Math.min(target, st.val + dt * .06);
          st.lv.textContent = Math.round(st.val) + '%';
        }
      });
      ctx.interval(function () {                      // light particles from the screen into the eye
        if (!st.r.classList.contains('k1')) return;
        var p = h('div', 'pha-p', st.fx), j = (Math.random() - .5) * 120;
        if (!p.animate) { p.remove(); return; }
        p.animate([
          { transform: 'translate(150px,' + (415 + j) + 'px)', opacity: 0 },
          { opacity: 1, offset: .2 },
          { transform: 'translate(' + EYE[0] + 'px,' + (EYE[1] + j * .08) + 'px) scale(.4)', opacity: .3 }
        ], { duration: 700 + Math.random() * 300, easing: 'cubic-bezier(.4,0,.8,.6)', fill: 'both' }).onfinish = function () { p.remove(); };
      }, 60);
    },
    step: function (el, i, ctx) { var st = el.__ph; if (!st) return; setK(st.r, i, 3, ctx); if (ctx.reduced || cameBack) { st.val = i >= 3 ? 45 : 100; st.lv.textContent = st.val + '%'; } },
    unstep: function (el, i, ctx) { var st = el.__ph; if (!st) return; setK(st.r, i - 1, 3, ctx, true); st.val = i - 1 >= 3 ? 45 : 100; st.lv.textContent = st.val + '%'; }
  });
})();

})();
