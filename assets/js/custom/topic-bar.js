/* ============================================================================
   topic-bar.js - bottom "chapter" progress bar.
   The deck is split into six major topics. Each topic starts at the slide named
   in `from` (original number or inserted id) and runs until the next topic
   starts, so a topic is always one contiguous run of slides in show order.
   Each segment fills as the talk moves through its slides; earlier topics stay
   full, later ones stay empty. Click a segment to jump to the start of a topic.
   T toggles the bar (the stage grows back to full height when it is off).
   ============================================================================ */
(function () {
'use strict';

var TOPICS = [
  { from: 1,   label: 'The Problem',       color: 'var(--cyan)'   },   // life lost to screens, sleep, family, signs of addiction
  { from: 27,  label: 'Why It’s Addictive',     color: 'var(--orange)' },   // dopamine, kids’ videos, how games are built, Roblox
  { from: 48,  label: 'How to Treat It',   color: 'var(--amber)'  },   // the child is the victim; we let it happen
  { from: 54,  label: 'Drugs, Grooming and Suicide', color: 'var(--red)' },   // knife vs phone, Lost Screen Memorial (45), grooming, Susan
  { from: 66,  label: 'Practical Protection', color: 'var(--green)'  },   // tech-free zones, slow phones, games, parental controls, browsers, YouTube, checklist (66-105)
  { from: 106, label: 'Evidence & Close', color: 'var(--ink)'    }    // research charts, close
];

var css = [
  ':root{--tb-h:46px}',
  'body.tb-off{--tb-h:0px}',
  '#viewport{bottom:var(--tb-h)}',                       /* the stage is fitted into this smaller viewport */
  '#progress{display:none}',                              /* superseded by the segments below */
  '#counter{bottom:calc(var(--tb-h) + 14px)}',
  '#topicbar{position:fixed;left:0;right:0;bottom:0;height:var(--tb-h);z-index:80;display:flex;gap:10px;align-items:stretch;padding:0 clamp(10px,1.1vw,22px);',
  '  background:rgba(5,8,11,.97);border-top:1px solid rgba(255,255,255,.08);user-select:none;-webkit-user-select:none}',
  'body.tb-off #topicbar,body.presenter #topicbar{display:none}',
  '.tb-seg{all:unset;box-sizing:border-box;flex:1 1 0;min-width:0;display:flex;flex-direction:column;justify-content:center;gap:7px;cursor:pointer}',
  '.tb-lab{display:flex;align-items:baseline;gap:.55em;white-space:nowrap;overflow:hidden;font:600 clamp(10px,.82vw,16px)/1 var(--f-body);letter-spacing:.035em;',
  '  color:var(--muted);transition:color .4s}',
  '.tb-lab b{font:700 .9em/1 var(--f-mono);color:var(--tb-c);opacity:.55;transition:opacity .4s}',
  '.tb-lab span{overflow:hidden;text-overflow:ellipsis}',
  '.tb-trk{height:5px;border-radius:3px;background:rgba(255,255,255,.10);overflow:hidden}',
  '.tb-trk i{display:block;height:100%;width:100%;border-radius:3px;background:var(--tb-c);transform:scaleX(0);transform-origin:0 50%;',
  '  transition:transform .6s var(--ease)}',
  '.tb-seg.done .tb-lab{color:var(--ink2)}.tb-seg.done .tb-lab b{opacity:.9}',
  '.tb-seg.cur .tb-lab{color:var(--ink)}.tb-seg.cur .tb-lab b{opacity:1}',
  '.tb-seg.cur .tb-trk{box-shadow:0 0 0 1px rgba(255,255,255,.14)}',
  '.tb-seg.cur .tb-trk i{box-shadow:0 0 12px 1px var(--tb-c)}',
  '.tb-seg:hover .tb-lab{color:var(--ink)}',
  '@media (prefers-reduced-motion:reduce){.tb-trk i,.tb-lab,.tb-lab b{transition:none}}'
].join('\n');
var st = document.createElement('style'); st.id = 'topic-bar-css'; st.textContent = css; document.head.appendChild(st);

var bar = document.createElement('nav');
bar.id = 'topicbar'; bar.setAttribute('aria-label', 'Talk progress by topic');
var segs = TOPICS.map(function (t, i) {
  var b = document.createElement('button'); b.type = 'button'; b.className = 'tb-seg'; b.tabIndex = -1;   // keys belong to the deck
  b.style.setProperty('--tb-c', t.color);
  b.innerHTML = '<span class="tb-lab"><b>' + (i + 1) + '</b><span></span></span><span class="tb-trk"><i></i></span>';
  b.querySelector('.tb-lab span').textContent = t.label;
  b.addEventListener('click', function (ev) {
    ev.stopPropagation(); b.blur();
    var s = Deck.find(t.from); if (s) Deck.goto(s, { dir: Deck.cur && s.pos < Deck.cur.pos ? -1 : 1, builtAll: false });
  });
  bar.appendChild(b);
  return { el: b, fill: b.querySelector('i') };
});
document.body.appendChild(bar);

/* topic index + fill fraction for the slide on screen. Works for hidden slides too (counter, calculator),
   which sit between visible ones and count as "just after the previous visible slide". */
function update() {
  var cur = Deck.cur; if (!cur) return;
  var starts = TOPICS.map(function (t) { var s = Deck.find(t.from); return s ? s.pos : Infinity; });
  var ti = 0; starts.forEach(function (p, i) { if (p <= cur.pos) ti = i; });
  var vis = Deck.order();
  segs.forEach(function (sg, i) {
    var lo = starts[i], hi = i + 1 < starts.length ? starts[i + 1] : Infinity, f;
    if (i < ti) f = 1; else if (i > ti) f = 0;
    else {
      var n = 0, k = 0;
      vis.forEach(function (s) { if (s.pos >= lo && s.pos < hi) { n++; if (s.pos <= cur.pos) k++; } });
      f = n ? Math.min(1, k / n) : 1;
    }
    sg.fill.style.transform = 'scaleX(' + f + ')';
    sg.el.classList.toggle('done', i < ti);
    sg.el.classList.toggle('cur', i === ti);
    var n2 = vis.filter(function (s) { return s.pos >= lo && s.pos < hi; }).length;
    sg.el.title = TOPICS[i].label + ' · ' + n2 + ' slides';
  });
}
Deck.on('show', update);

addEventListener('keydown', function (ev) {
  if (ev.key !== 't' && ev.key !== 'T') return;
  if (ev.metaKey || ev.ctrlKey || ev.altKey || document.body.classList.contains('presenter')) return;
  var t = ev.target; if (t && /^(input|textarea|select)$/i.test(t.tagName)) return;
  var off = document.body.classList.toggle('tb-off');
  dispatchEvent(new Event('resize'));                   // re-fit the stage to the new viewport height
  Deck.toast && Deck.toast('Topic bar ' + (off ? 'hidden' : 'shown'));
});
})();
