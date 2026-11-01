/* ============================================================================
   part-i.js - Shorts, slowed down (both versions). Inserted after 'intense-colors-effect'.
     id 'shorts-slowed'  two phones side by side with the same Short. On arrival the left one plays at real speed
                         (media/ShortsOriginalSpeed.mp4); click 1 pauses it and plays the right one at quarter speed
                         (media/ShortQuarterSpeed.mp4, muted). Back swaps them again. Click a phone to pause / resume it.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }

var VOL = 0.1;                                       // every video in the deck plays at 10% volume (part-c.js)
var CLIPS = [
  { src: 'media/ShortsOriginalSpeed.mp4', poster: 'media/posters/shorts-original.jpg', tag: 'Real speed', sub: 'the way you<br>watch it', c: '255,77,77' },
  { src: 'media/ShortQuarterSpeed.mp4', poster: 'media/posters/shorts-quarter.jpg', tag: 'Real life speed', sub: 'the same Short,<br>slowed down', c: '46,229,157', mute: true }
];

addCss('pi-css', [
  '.pi{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
  '.pi *{box-sizing:border-box}',
  '.pi-t{position:absolute;left:0;right:0;top:26px;text-align:center;font:600 88px/1.05 var(--f-display);letter-spacing:-.025em;color:#fff}',
  '.pi-t em{font-style:italic;color:var(--red)}',
  '.pi-ph{position:absolute;top:142px;width:518px;height:920px;border-radius:66px;background:#111216;padding:12px;cursor:pointer;',
  '  box-shadow:0 0 0 2px #3a3a42,0 40px 90px rgba(0,0,0,.65);transition:box-shadow .6s,opacity .6s,transform .6s var(--ease)}',
  '.pi-ph.on{box-shadow:0 0 0 2px #3a3a42,0 0 0 8px rgba(var(--c),.55),0 40px 90px rgba(0,0,0,.65),0 0 120px rgba(var(--c),.35);transform:translateY(-6px)}',
  '.pi-ph.off{opacity:.55}',
  '.pi-ph .scr{position:relative;width:100%;height:100%;border-radius:55px;overflow:hidden;background:#000}',
  '.pi-ph video,.pi-ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}',
  '.pi-ph .isl{position:absolute;left:50%;top:14px;width:118px;height:34px;margin-left:-59px;border-radius:20px;background:#000;z-index:2}',
  '.pi-ph .pz{position:absolute;inset:0;display:grid;place-items:center;z-index:2;opacity:0;transition:opacity .4s;pointer-events:none}',
  '.pi-ph .pz i{width:110px;height:110px;border-radius:50%;background:rgba(0,0,0,.55);display:grid;place-items:center}',
  '.pi-ph .pz svg{width:46px;height:46px;fill:#fff;margin-left:6px}',
  '.pi-ph.off .pz{opacity:1}',
  '.pi-tg{position:absolute;top:560px;width:300px;transition:opacity .6s}',
  '.pi-tg.l{left:70px;text-align:right}.pi-tg.r{left:1550px}',
  '.pi-tg.off{opacity:.45}',
  '.pi-tg b{display:inline-flex;align-items:center;gap:12px;padding:10px 24px;border-radius:99px;background:rgba(var(--c),.16);box-shadow:inset 0 0 0 2px rgba(var(--c),.65);',
  '  font:700 28px/1 var(--f-body);color:#fff}',
  '.pi-tg b i{width:12px;height:12px;border-radius:50%;background:rgb(var(--c))}',
  '.pi-tg span{display:block;margin-top:12px;font:400 22px/1.3 var(--f-body);color:var(--muted)}',
  '.pi-bar{position:absolute;left:24px;right:24px;bottom:22px;height:6px;border-radius:3px;background:rgba(255,255,255,.25);z-index:2;overflow:hidden}',
  '.pi-bar i{display:block;height:100%;width:100%;background:rgb(var(--c));transform-origin:0 50%;transform:scaleX(0)}'
]);

Deck.insertSlide({
  after: 'intense-colors-effect', id: 'shorts-slowed', title: 'Shorts — how they hook you', section: 'why',
  tr: { type: 'fade', ms: 800 }, loop: false, calm: true, steps: 1,
  render: function (el, ctx) {
    var r = h('div', 'pi' + (ctx.static ? ' k1' : ''), el);
    r.innerHTML = '<div class="pi-t">Shorts — <em>how they hook you</em></div>';
    var st = el.__pi = { r: r, ph: [], v: [], bar: [], tg: [] };
    CLIPS.forEach(function (c, i) {
      var x = i ? 1000 : 402;                         // two 9:16 phones as tall as the stage allows, centred, 80 px apart
      var ph = h('div', 'pi-ph pe', r); ph.setAttribute('data-noadvance', ''); ph.style.cssText = 'left:' + x + 'px;--c:' + c.c;
      var scr = h('div', 'scr', ph);
      if (ctx.static) { var im = h('img', '', scr); im.src = c.poster; im.alt = ''; }
      else {
        var v = h('video', '', scr); v.playsInline = true; v.preload = i ? 'metadata' : 'auto'; v.loop = false; v.volume = VOL; v.muted = !!c.mute; v.poster = c.poster; v.src = c.src;
        st.v.push(v);
        v.addEventListener('ended', function () { mark(st, -1); });   // played once: both phones rest, tap to replay
        ph.addEventListener('click', function (e) { e.stopPropagation(); if (v.paused) play(st, i); else { v.pause(); mark(st, -1); } });
      }
      h('div', 'isl', scr); h('div', 'pz', scr, '<i><svg viewBox="0 0 24 24"><path d="M7 4.5v15l12.5-7.5z"/></svg></i>');
      st.bar.push(h('div', 'pi-bar', scr, '<i></i>').firstChild);
      st.ph.push(ph);
      st.tg.push(h('div', 'pi-tg ' + (i ? 'r' : 'l'), r, '<b style="--c:' + c.c + '"><i></i>' + c.tag + '</b><span>' + c.sub + '</span>'));
    });
    mark(st, ctx.static ? 1 : 0);
  },
  enter: function (el, ctx) {
    var st = el.__pi; if (!st || !st.v.length) return;
    if (!st.r.classList.contains('k1')) play(st, 0);  // arriving with Back, step() has already started the slow one
    ctx.tick(function () { st.v.forEach(function (v, i) { if (v.duration) st.bar[i].style.transform = 'scaleX(' + (v.currentTime / v.duration).toFixed(4) + ')'; }); });
    ctx.onLeave(function () { st.v.forEach(function (v) { try { v.pause(); } catch (e) {} }); });
  },
  step: function (el, i, ctx) { var st = el.__pi; if (!st) return; st.r.classList.add('k1'); if (st.v.length) play(st, 1, true); else mark(st, 1); },
  unstep: function (el, i, ctx) { var st = el.__pi; if (!st) return; st.r.classList.remove('k1'); if (st.v.length) play(st, 0, true); else mark(st, 0); }
});

/* play clip i (from the start when restart), pause the other one; the playing phone glows, the other dims */
function play(st, i, restart) {
  st.v.forEach(function (v, k) {
    if (k === i) {
      if (restart) { try { v.currentTime = 0; } catch (e) {} }
      var p = v.play(); if (p && p.catch) p.catch(function () { v.muted = true; v.play().catch(function () {}); });   // no sound allowed yet: play muted
    } else v.pause();
  });
  mark(st, i);
}
function mark(st, i) {
  st.ph.forEach(function (ph, k) { ph.classList.toggle('on', k === i); ph.classList.toggle('off', k !== i); });
  st.tg.forEach(function (tg, k) { tg.classList.toggle('off', i >= 0 && k !== i); });
}

})();
