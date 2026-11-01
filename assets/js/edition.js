/* ============================================================================
   edition.js - which version of the talk to show. Loaded before the engine.
   The URL decides: index.html?edition=adult (full talk for parents) or ?edition=child (ages 10-14, about 30 minutes). With neither,
   a chooser is shown and the deck waits (boot.js does nothing); picking a card reloads the page with ?edition=... (and the same #/slide).
   The presenter window is opened with the same edition (ui.js). window.DECK_EDITION is null while the chooser is up.
   ============================================================================ */
(function () {
'use strict';
var m = /[?&]edition=(adult|child)(?:&|$)/.exec(location.search);
window.DECK_EDITION = m ? m[1] : null;
if (window.DECK_EDITION) return;

var CARDS = [
  { id: 'adult', n: '1', t: 'Adult version', s: 'For parents and carers. The full talk.' },
  { id: 'child', n: '2', t: 'Child version', s: 'For ages 10&ndash;14. Shorter, about 30 minutes.' }
];
var st = document.createElement('style');
st.textContent = [
  '#edpick{position:fixed;inset:0;z-index:300;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:44px;padding:24px;',
  '  background:radial-gradient(ellipse at 50% 38%,#10202b,#05080b 72%);color:var(--ink,#eef4f6);font-family:var(--f-body,system-ui,sans-serif)}',
  '#edpick h1{margin:0;text-align:center;font:600 clamp(28px,4.2vw,64px)/1.08 var(--f-display,Georgia,serif);letter-spacing:-.02em}',
  '#edpick h1 small{display:block;margin-top:.6em;font:500 clamp(14px,1.4vw,22px)/1.2 var(--f-body,system-ui,sans-serif);letter-spacing:.14em;text-transform:uppercase;color:var(--muted,#9ab)}',
  '#edpick .row{display:flex;gap:clamp(16px,2.2vw,36px);flex-wrap:wrap;justify-content:center}',
  '#edpick button{all:unset;box-sizing:border-box;cursor:pointer;width:clamp(260px,26vw,420px);padding:clamp(22px,2.4vw,40px);border-radius:22px;',
  '  background:rgba(255,255,255,.05);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);transition:transform .25s,background .25s,box-shadow .25s}',
  '#edpick button:hover,#edpick button:focus-visible{transform:translateY(-4px);background:rgba(34,211,238,.1);box-shadow:inset 0 0 0 2px var(--cyan,#22d3ee),0 24px 60px -24px rgba(34,211,238,.5)}',
  '#edpick .k{font:700 14px/1 var(--f-mono,monospace);letter-spacing:.14em;color:var(--cyan,#22d3ee)}',
  '#edpick .t{margin-top:14px;font:600 clamp(24px,2.4vw,38px)/1.1 var(--f-display,Georgia,serif);color:#fff}',
  '#edpick .s{margin-top:12px;font:400 clamp(15px,1.3vw,21px)/1.4 var(--f-body,system-ui,sans-serif);color:var(--ink2,#c5d2d8)}',
  '#edpick .h{font:400 14px/1 var(--f-body,system-ui,sans-serif);color:var(--muted,#9ab)}',
  '@media (prefers-reduced-motion:reduce){#edpick button{transition:none}}'
].join('\n');
document.head.appendChild(st);

var box = document.createElement('div'); box.id = 'edpick'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Choose a version');
box.innerHTML = '<h1>Online Safety &amp; Device Addiction<small>Choose a version</small></h1><div class="row">' +
  CARDS.map(function (c) { return '<button type="button" data-ed="' + c.id + '"><div class="k">' + c.n + '</div><div class="t">' + c.t + '</div><div class="s">' + c.s + '</div></button>'; }).join('') +
  '</div><div class="h">Press 1 or 2, or click</div>';
function choose(id) { location.href = location.href.split('#')[0].split('?')[0] + '?edition=' + id + location.hash; }
box.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('button[data-ed]'); if (b) choose(b.getAttribute('data-ed')); });
addEventListener('keydown', function (e) {
  if (!document.getElementById('edpick')) return;
  e.stopImmediatePropagation();                       // the deck's own key handlers must not run while the chooser is up (Enter/Tab keep their default on the buttons)
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  if (e.key === '1') choose('adult'); else if (e.key === '2') choose('child');
}, true);
function mount() { document.body.appendChild(box); var f = box.querySelector('button'); if (f) f.focus(); }
if (document.body) mount(); else addEventListener('DOMContentLoaded', mount);
})();
