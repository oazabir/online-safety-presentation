/* ============================================================================
   part-e.js - grayscale research slide (inserted after "Tackle three things", before #71
   "Make devices boring" and #72, the iPhone Colour Filters how-to: evidence, then how).
     id 'gray-research': a colourful social feed scrolls on a phone; click 1 sweeps it to
     grayscale and the thumb slows down. Click 2 brings in all three studies
     (Wickord & Quaiser-Pohl 2023, Holte & Ferraro 2020, Dekker et al. 2023) together, click 3 the
     "these were adults" punchline. The Colour / Grayscale chip under the phone toggles live.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }

var POST_H = 452;                            // px height of one feed post (header + image + actions + caption)
var POSTS = [
  { u: 'snack.hacks', a: '255,61,127;255,179,0', g: 'radial-gradient(120% 90% at 30% 20%,#ffe14d 0,#ff8a00 38%,#ff2d6f 72%,#b0007a 100%)', e: '🍔', t: 'This burger hack broke the internet 🤯', l: '284K', live: false },
  { u: 'goal.daily', a: '0,229,255;41,98,255', g: 'linear-gradient(160deg,#00f5a0 0,#00d9f5 45%,#2962ff 100%)', e: '⚽', t: 'Unbelievable last-minute goal!!!', l: '1.2M', live: true },
  { u: 'candy.world', a: '255,0,204;51,51,255', g: 'linear-gradient(135deg,#ff00cc 0,#ff5f9e 40%,#7a3cff 75%,#3333ff 100%)', e: '🍩', t: 'Rainbow donuts — would you try? 🌈', l: '96K', live: false },
  { u: 'gamer.zone', a: '178,255,89;0,200,83', g: 'radial-gradient(100% 100% at 70% 30%,#d4ff3a 0,#36e25d 40%,#00a86b 70%,#005f73 100%)', e: '🎮', t: 'New season drop — GET IT NOW', l: '531K', live: true },
  { u: 'party.vibes', a: '255,23,68;255,145,0', g: 'linear-gradient(200deg,#ff9100 0,#ff1744 50%,#d500f9 100%)', e: '🎉', t: 'POV: the weekend just started 🔥', l: '742K', live: false },
  { u: 'cute.pets', a: '255,214,0;255,64,129', g: 'radial-gradient(110% 90% at 40% 70%,#fff59d 0,#ffd600 30%,#ff9100 60%,#ff4081 100%)', e: '🐱', t: 'He does this EVERY morning 😂', l: '2.4M', live: false }
];

var STUDIES = [
  { n: 60, yr: '15', who: 'Adults · habitual scrollers', by: 'Wickord &amp; Quaiser-Pohl', y: '2023', j: 'Computers in Human Behavior Reports',
    d: 'Heavy, boredom-driven scrollers lost about <b>a full hour a day</b>. Without colour, the endless scroll simply stops paying off.' },
  { n: 38, yr: '10', who: 'Young adults · college students', by: 'Holte &amp; Ferraro', y: '2020', j: 'The Social Science Journal',
    d: 'Over <b>4 hours a week</b>, mostly from social media and browsing. Grey notification badges stop pulling the thumb.' },
  { n: 20, yr: '5', who: 'Adults · 2-week controlled trial', by: 'Dekker et al.', y: '2023', j: 'University of Amsterdam',
    d: 'A modest 7–10% overall, but people <b>felt</b> the difference:',
    x: ['↓ urge to check', '↓ anxiety', '↑ sense of control'] }
];

addCss('pe-gr-css', [
  '.gr{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
  /* ---- phone */
  '.gr-ph{position:absolute;left:150px;top:118px;width:424px;height:862px;border-radius:66px;background:linear-gradient(145deg,#2a3238,#0c1114 60%);',
  '  box-shadow:inset 0 0 0 2px rgba(255,255,255,.14),0 50px 110px -30px rgba(0,0,0,.9),0 0 0 1px rgba(0,0,0,.6)}',
  '.gr-ph::after{content:"";position:absolute;left:50%;top:26px;width:118px;height:34px;margin-left:-59px;border-radius:20px;background:#000;z-index:9}',
  '.gr-sc{position:absolute;left:14px;top:14px;right:14px;bottom:14px;border-radius:53px;overflow:hidden;background:#fff;isolation:isolate}',
  '.gr-glow{position:absolute;left:110px;top:240px;width:520px;height:620px;border-radius:50%;filter:blur(70px);opacity:.55;',
  '  background:conic-gradient(from 0deg,#ff2d6f,#ffb300,#00e5ff,#7a3cff,#ff2d6f);transition:opacity 1.6s ease}',
  '.gr.gray .gr-glow{opacity:0}',
  '.gr-feed{position:absolute;left:0;right:0;top:0;will-change:transform}',
  '.gr-bar{position:absolute;left:0;right:0;top:0;height:118px;background:rgba(255,255,255,.96);z-index:3;box-shadow:0 1px 0 rgba(0,0,0,.08)}',
  '.gr-bar .st{position:absolute;left:40px;top:20px;font:600 17px/1 var(--f-body);color:#000}',
  '.gr-bar .bt{position:absolute;right:34px;top:22px;width:27px;height:12px;border-radius:3px;border:1.5px solid #000;opacity:.8}',
  '.gr-bar .bt::after{content:"";position:absolute;left:1.5px;top:1.5px;bottom:1.5px;width:70%;background:#000;border-radius:1px}',
  '.gr-bar .lg{position:absolute;left:22px;top:68px;font:italic 700 30px/1 var(--f-display);letter-spacing:-.02em;',
  '  background:linear-gradient(90deg,#f9a825,#ff2d6f,#7a3cff);-webkit-background-clip:text;background-clip:text;color:transparent}',
  '.gr-ic{position:absolute;top:66px;width:30px;height:30px;color:#111}',
  '.gr-ic svg{width:100%;height:100%}',
  '.gr-bdg{position:absolute;right:-9px;top:-7px;min-width:22px;height:22px;padding:0 5px;box-sizing:border-box;border-radius:11px;background:#ff1f4b;color:#fff;',
  '  font:700 13px/22px var(--f-body);text-align:center;box-shadow:0 0 0 2px #fff}',
  '.gr-tab{position:absolute;left:0;right:0;bottom:0;height:78px;background:rgba(255,255,255,.97);z-index:3;box-shadow:0 -1px 0 rgba(0,0,0,.08);',
  '  display:flex;justify-content:space-around;align-items:flex-start;padding-top:16px;box-sizing:border-box;color:#111}',
  '.gr-tab svg{width:28px;height:28px}',
  '.gr-tab .rl{position:relative}.gr-tab .rl::after{content:"";position:absolute;right:-3px;top:-2px;width:9px;height:9px;border-radius:50%;background:#ff1f4b}',
  /* ---- one post */
  '.gr-po{height:' + POST_H + 'px;box-sizing:border-box;background:#fff;color:#111;position:relative}',
  '.gr-po .hd{height:58px;display:flex;align-items:center;gap:11px;padding:0 14px}',
  '.gr-po .av{width:38px;height:38px;border-radius:50%;padding:2.5px;box-sizing:border-box;background:linear-gradient(45deg,#ffd600,#ff2d6f,#d500f9)}',
  '.gr-po .av i{display:block;width:100%;height:100%;border-radius:50%;border:2px solid #fff;box-sizing:border-box;background:linear-gradient(135deg,rgb(var(--a1)),rgb(var(--a2)))}',
  '.gr-po .un{font:700 16px/1 var(--f-body)}',
  '.gr-po .im{height:300px;position:relative;overflow:hidden;display:flex;align-items:center;justify-content:center}',
  '.gr-po .im b{font-size:150px;line-height:1;filter:drop-shadow(0 14px 22px rgba(0,0,0,.35));transform:rotate(-8deg)}',
  '.gr-po .im::before{content:"";position:absolute;inset:-20%;background:repeating-conic-gradient(from 0deg,rgba(255,255,255,.18) 0 8deg,transparent 8deg 22deg);mix-blend-mode:overlay}',
  '.gr-po .lv{position:absolute;left:12px;top:12px;padding:5px 10px;border-radius:6px;background:#ff1f4b;color:#fff;font:800 13px/1 var(--f-body);letter-spacing:.06em}',
  '.gr-po .ac{height:46px;display:flex;align-items:center;gap:16px;padding:0 14px}',
  '.gr-po .ac svg{width:27px;height:27px}',
  '.gr-po .ac .hr{color:#ff1f4b}',
  '.gr-po .lk{padding:0 14px;font:700 15px/1.2 var(--f-body)}',
  '.gr-po .tx{padding:4px 14px 0;font:400 15px/1.3 var(--f-body);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
  /* ---- grayscale veil: a curtain with backdrop-filter that sweeps down the screen */
  '.gr-veil{position:absolute;left:0;right:0;top:0;height:100%;z-index:5;pointer-events:none;-webkit-backdrop-filter:grayscale(1) contrast(1.04);backdrop-filter:grayscale(1) contrast(1.04);',
  '  transform:translateY(-101%);transition:transform 1.5s cubic-bezier(.6,0,.25,1)}',
  '.gr-veil::after{content:"";position:absolute;left:0;right:0;bottom:-3px;height:6px;background:linear-gradient(90deg,transparent,#fff 20%,#fff 80%,transparent);',
  '  box-shadow:0 0 18px 6px rgba(255,255,255,.75);opacity:1;transition:opacity .4s ease 1.3s}',
  '.gr.gray .gr-veil{transform:translateY(0)}',
  '.gr.gray .gr-veil::after{opacity:0}',
  '.gr:not(.gray) .gr-veil::after{transition-delay:0s}',
  '.gr-touch{position:absolute;left:50%;bottom:150px;width:64px;height:64px;margin-left:-32px;border-radius:50%;z-index:6;pointer-events:none;',
  '  background:radial-gradient(circle,rgba(120,120,120,.55),rgba(120,120,120,.25) 60%,transparent 70%);opacity:0}',
  '.gr-touch.go{animation:gr-sw .5s cubic-bezier(.3,.7,.3,1)}',
  '.gr-touch.go.sm{animation-name:gr-sw2;animation-duration:.7s}',
  '@keyframes gr-sw{0%{opacity:0;transform:translateY(0) scale(.7)}15%{opacity:1;transform:translateY(-10px) scale(1)}100%{opacity:0;transform:translateY(-300px) scale(.9)}}',
  '@keyframes gr-sw2{0%{opacity:0;transform:translateY(0) scale(.7)}20%{opacity:.9;transform:translateY(-6px) scale(1)}100%{opacity:0;transform:translateY(-90px) scale(.9)}}',
  /* ---- toggle chip under the phone */
  '.gr-tg{position:absolute;left:150px;width:424px;top:996px;display:flex;justify-content:center}',
  '.gr-tg button{all:unset;pointer-events:auto;cursor:pointer;display:flex;align-items:center;gap:14px;padding:9px 20px 9px 12px;border-radius:30px;',
  '  background:rgba(14,23,28,.86);box-shadow:inset 0 0 0 1px rgba(255,255,255,.12);font:600 20px/1 var(--f-body);color:var(--ink2)}',
  '.gr-tg .sw{position:relative;width:52px;height:30px;border-radius:15px;background:linear-gradient(90deg,#ff2d6f,#ffb300,#00e5ff);transition:background .5s}',
  '.gr-tg .sw::after{content:"";position:absolute;left:3px;top:3px;width:24px;height:24px;border-radius:50%;background:#fff;transition:transform .45s var(--ease)}',
  '.gr.gray .gr-tg .sw{background:#8a8f93}.gr.gray .gr-tg .sw::after{transform:translateX(22px)}',
  '.gr-tg .lb b{color:#fff}.gr-tg .lb .g{display:none}.gr.gray .gr-tg .lb .c{display:none}.gr.gray .gr-tg .lb .g{display:inline}',
  /* ---- right column */
  '.gr-k{position:absolute;left:700px;top:96px;font:700 24px/1 var(--f-body);letter-spacing:.26em;text-transform:uppercase;color:var(--amber)}',
  '.gr-t{position:absolute;left:696px;top:134px;margin:0;font:600 88px/1 var(--f-display);letter-spacing:-.03em;color:#fff;white-space:nowrap}',
  '.gr-t em{font-style:italic;color:var(--amber);text-shadow:0 0 44px rgba(255,176,32,.4)}',
  '.gr-s{position:absolute;left:700px;top:244px;font:400 28px/1.3 var(--f-body);color:var(--ink2)}',
  '.gr-s b{color:#fff;font-weight:600}',
  '.gr-cards{position:absolute;left:700px;right:110px;top:312px;display:flex;flex-direction:column;gap:18px}',
  '.gr-cd{position:relative;height:178px;border-radius:22px;overflow:hidden;display:flex;align-items:center;background:rgba(14,23,28,.86);',
  '  box-shadow:inset 0 0 0 1px rgba(255,255,255,.09),var(--shadow);transition:opacity .7s ease calc(var(--i) * .22s),transform .8s cubic-bezier(.2,.8,.2,1) calc(var(--i) * .22s)}',
  '.gr-cd.off{opacity:0;transform:translateX(60px);transition-delay:0s}',
  '.gr-nm{flex:0 0 250px;text-align:center;color:var(--amber)}',
  '.gr-nm .v{font:700 104px/.9 var(--f-display);letter-spacing:-.04em;font-variant-numeric:tabular-nums}',
  '.gr-nm .u{margin-top:8px;font:700 17px/1 var(--f-body);letter-spacing:.18em;text-transform:uppercase;color:var(--muted)}',
  '.gr-bd{flex:1;min-width:0;padding:0 26px 0 6px;border-left:1px solid rgba(255,255,255,.08);padding-left:28px}',
  '.gr-by{display:flex;align-items:baseline;gap:12px;font:600 29px/1.1 var(--f-body);color:#fff;white-space:nowrap}',
  '.gr-mt{display:flex;align-items:center;gap:12px;margin-top:9px;white-space:nowrap}',
  '.gr-mt i{display:inline-flex;align-items:center;gap:7px;font:italic 500 20px/1 var(--f-body);color:#fff}',
  '.gr-mt i svg{width:20px;height:20px;color:var(--amber);flex:0 0 20px}',
  '.gr-who{display:inline-block;padding:5px 12px;border-radius:8px;background:rgba(255,176,32,.14);color:var(--amber);font:700 15px/1 var(--f-body);letter-spacing:.08em;text-transform:uppercase}',
  '.gr-d{margin-top:10px;font:400 21px/1.32 var(--f-body);color:var(--ink2)}',
  '.gr-d b{color:#fff;font-weight:600}',
  '.gr-x{display:inline-flex;gap:8px;margin-left:8px;vertical-align:middle}',
  '.gr-x span{padding:4px 11px;border-radius:14px;background:rgba(46,229,157,.14);color:var(--green);font:600 17px/1.2 var(--f-body);white-space:nowrap}',
  '.gr-yr{flex:0 0 150px;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:rgba(255,255,255,.035);border-left:1px solid rgba(255,255,255,.06)}',
  '.gr-yr .v{font:600 54px/1 var(--f-display);color:#fff}',
  '.gr-yr .u{margin-top:6px;font:500 16px/1.25 var(--f-body);color:var(--muted);text-align:center}',
  '.gr-mb{position:absolute;left:0;bottom:0;height:5px;width:100%;transform-origin:0 50%;transform:scaleX(0);background:linear-gradient(90deg,var(--amber),var(--orange));',
  '  transition:transform 1.3s cubic-bezier(.2,.8,.2,1) calc(.35s + var(--i) * .22s)}',
  '.gr-cd:not(.off) .gr-mb{transform:scaleX(var(--w))}',
  '.gr-pl{position:absolute;left:700px;right:110px;top:912px;height:76px;border-radius:18px;display:flex;align-items:center;gap:20px;padding:0 26px;box-sizing:border-box;',
  '  background:linear-gradient(90deg,rgba(255,176,32,.22),rgba(255,176,32,.06));box-shadow:inset 4px 0 0 var(--amber);',
  '  font:400 25px/1.25 var(--f-body);color:var(--ink2);transition:opacity .7s ease,transform .8s cubic-bezier(.2,.8,.2,1)}',
  '.gr-pl.off{opacity:0;transform:translateY(24px)}',
  '.gr-pl b{color:#fff;font-weight:700}.gr-pl em{font-style:normal;color:var(--amber);font-weight:700}',
  '.gr-pl svg{flex:0 0 38px;height:38px;color:var(--amber)}',
  '.gr.inst *{transition:none!important}'
]);

var SV = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
var I = {
  heart: SV + '<path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.4 3.2 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.8 0 5.9 3.9 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg>',
  heartF: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-7.5-4.6-9.5-9.3C1.1 8.4 3.2 4.5 7 4.5c2.1 0 3.6 1.2 5 3 1.4-1.8 2.9-3 5-3 3.8 0 5.9 3.9 4.5 7.2C19.5 16.4 12 21 12 21z"/></svg>',
  chat: SV + '<path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z"/></svg>',
  send: SV + '<path d="M22 3L10 14M22 3l-7 19-5-8-8-5z"/></svg>',
  home: SV + '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  search: SV + '<circle cx="11" cy="11" r="7"/><path d="M21 21l-5-5"/></svg>',
  plus: SV + '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M12 8v8M8 12h8"/></svg>',
  reel: SV + '<rect x="3" y="3" width="18" height="18" rx="5"/><path d="M10 9l5 3-5 3z"/></svg>',
  user: SV + '<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
  people: SV + '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20c1-3.6 3.6-5.5 6.5-5.5s5.5 1.9 6.5 5.5"/><circle cx="17" cy="9" r="2.8"/><path d="M16.5 14.6c2.5.2 4.3 2 5 5.4"/></svg>'
};

var DOC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h4"/></svg>';

function post(p) {
  var c = p.a.split(';');
  return '<div class="gr-po" style="--a1:' + c[0] + ';--a2:' + c[1] + '">' +
    '<div class="hd"><span class="av"><i></i></span><span class="un">' + p.u + '</span></div>' +
    '<div class="im" style="background:' + p.g + '"><b>' + p.e + '</b>' + (p.live ? '<span class="lv">LIVE</span>' : '') + '</div>' +
    '<div class="ac"><span class="hr">' + I.heartF + '</span>' + I.chat + I.send + '</div>' +
    '<div class="lk">' + p.l + ' likes</div><div class="tx"><b>' + p.u + '</b> ' + p.t + '</div></div>';
}

function setGray(el, on) { if (el.__gr) el.__gr.root.classList.toggle('gray', !!on); }
function showCards(el, k) {          // k = number of custom steps applied (1 = gray, 2 = all three studies, 3 = punchline)
  var g = el.__gr; if (!g) return;
  setGray(el, k >= 1);
  g.cards.forEach(function (c) { c.classList.toggle('off', k < 2); });
  g.pl.classList.toggle('off', k < 3);
}

Deck.insertSlide({
  after: 'three-things', id: 'gray-research', title: 'Grayscale research', section: 'treat', tr: { type: 'fade', ms: 800 }, loop: false, steps: 3,
  render: function (el, ctx) {
    var still = ctx.static || ctx.reduced;
    var r = h('div', 'gr inst', el);
    h('div', 'gr-glow', r);
    var ph = h('div', 'gr-ph', r);
    var sc = h('div', 'gr-sc', ph);
    var feedHtml = POSTS.map(post).join('');
    var feed = h('div', 'gr-feed', sc, feedHtml + feedHtml);   // doubled for a seamless wrap
    h('div', 'gr-bar', sc,
      '<span class="st">9:41</span><span class="bt"></span><span class="lg">Feedgram</span>' +
      '<span class="gr-ic" style="right:76px">' + I.heart + '<span class="gr-bdg">9+</span></span>' +
      '<span class="gr-ic" style="right:24px">' + I.send + '<span class="gr-bdg">12</span></span>');
    h('div', 'gr-tab', sc, I.home + I.search + I.plus + '<span class="rl">' + I.reel + '</span>' + I.user);
    var touch = h('div', 'gr-touch', sc);
    h('div', 'gr-veil', sc);

    var tg = h('div', 'gr-tg', r);
    var btn = h('button', '', tg, '<span class="sw"></span><span class="lb"><span class="c">Screen: <b>Colour</b></span><span class="g">Screen: <b>Grayscale</b></span></span>');
    btn.setAttribute('data-noadvance', '');
    btn.addEventListener('click', function (e) { e.stopPropagation(); r.classList.toggle('gray'); });

    h('div', 'gr-k', r, 'What the research says');
    h('h2', 'gr-t', r, 'Grey screen, <em>less</em> scrolling');
    h('div', 'gr-s', r, 'Three studies measured it — and <b>every participant was an adult</b>.');
    var box = h('div', 'gr-cards', r);
    var cards = STUDIES.map(function (s, i) {
      var c = h('div', 'gr-cd off', box,
        '<div class="gr-nm"><div class="v">−' + s.n + '</div><div class="u">min / day</div></div>' +
        '<div class="gr-bd"><div class="gr-by">' + s.by + ', ' + s.y + '</div>' +
        '<div class="gr-mt"><span class="gr-who">' + s.who + '</span><i>' + DOC + s.j + '</i></div>' +
        '<div class="gr-d">' + s.d + (s.x ? '<span class="gr-x">' + s.x.map(function (t) { return '<span>' + t + '</span>'; }).join('') + '</span>' : '') + '</div></div>' +
        '<div class="gr-yr"><div class="v">≈' + s.yr + '</div><div class="u">days back<br>per year</div></div>' +
        '<i class="gr-mb" style="--w:' + (s.n / 60).toFixed(3) + '"></i>');
      c.style.setProperty('--i', i);
      return c;
    });
    var pl = h('div', 'gr-pl off', r, I.people +
      '<span><b>Not just for kids.</b> If it works on grown-ups, imagine a child. <em>Switch yours on too.</em></span>');

    el.__gr = { root: r, cards: cards, pl: pl };
    if (ctx.static) showCards(el, 3);
    void r.offsetWidth; r.classList.remove('inst');
    if (still) return;

    /* thumb-flick scroll: frequent big flicks in colour, rare small ones in grayscale */
    var L = POST_H * POSTS.length, y = 0, v = 0, next = 700, K = 5.5;
    ctx.tick(function (dt) {
      dt = Math.min(dt, 50);
      var gray = r.classList.contains('gray');
      next -= dt;
      if (next <= 0) {
        var dist = gray ? POST_H * (0.25 + Math.random() * 0.3) : POST_H * (1 + Math.random() * 0.8);
        v = dist * K;                                   // distance travelled = v0 / K
        next = gray ? 2600 + Math.random() * 1600 : 850 + Math.random() * 450;
        touch.classList.remove('go', 'sm'); void touch.offsetWidth; touch.classList.add('go'); if (gray) touch.classList.add('sm');
      }
      y += v * dt / 1000; v *= Math.exp(-K * dt / 1000);
      if (y >= L) y -= L;
      feed.style.transform = 'translate3d(0,' + (-y).toFixed(1) + 'px,0)';
    });
  },
  step: function (el, i) { showCards(el, i); },
  unstep: function (el, i) { showCards(el, i - 1); }
});
})();
