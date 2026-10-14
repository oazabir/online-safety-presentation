/* ============================================================================
   part-d.js - interactive rebuilds of the opening "where does the time go" run
   (loaded after part-c, so these specs win). Keys are original slide numbers,
   on-screen numbers in brackets.
     1. #7  [4]  Gallup chart rebuilt live: All / Boys / Girls / Boys vs Girls, tap a platform.
                 Click 1 = Boys vs Girls.
     2. #8  [5]  4.8 h x 365 = 1,752 h with an hours-per-day slider and a year calendar.
                 Click 1 = "= 73 full days" + the days light up.
     3. #10 [7]  What those hours could become: six photo tiles (generated with Codex,
                 media/hours/*.webp). Clicks 1-5 reveal tiles 2-6; tap a tile to add or drop it
                 from the "years of screen time" bar.
   The hours-per-day value is shared: move the slider on [5] and [7] follows (S.hpd).
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;
var D = window.DECK_DATA;
var byOrig = {}; D.slides.forEach(function (s) { if (s.orig) byOrig[s.orig] = s; });
var GALLUP = 'https://news.gallup.com/poll/512576/teens-spend-average-hours-social-media-per-day.aspx';
var S = { hpd: 4.8 };                       // hours of screen time per day, shared by [5] and [7]

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }
function chips(r, list) {
  var box = h('div', 'chips', r);
  list.forEach(function (u) { var a = h('a', 'chip', box, '<b>source</b><span>' + u.replace(/^https?:\/\/(www\.)?/, '') + '</span>'); a.href = u; a.target = '_blank'; a.rel = 'noopener'; a.setAttribute('data-noadvance', ''); });
}
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
function f1(n) { return (Math.round(n * 10) / 10).toFixed(1); }
/** count an element's text from 0 to `to` (ease-out); final value straight away when static/reduced */
function countUp(ctx, node, to, ms, format) {
  format = format || fmt;
  if (ctx.static || ctx.reduced) { node.textContent = format(to); return; }
  var t0 = performance.now(), id = ctx.interval(function () {
    var p = Math.min(1, (performance.now() - t0) / ms);
    node.textContent = format(to * (1 - Math.pow(1 - p, 3)));
    if (p >= 1) clearInterval(id);
  }, 33);
}
/* NB: the stage advances on any click outside a,button,input,[data-noadvance] - '.pe' alone only enables pointer events */
/** stop sliders/buttons keeping focus, so arrow keys and Space go back to the deck */
function noFocus(node) { node.addEventListener('pointerup', function () { setTimeout(function () { node.blur(); }, 0); }); }

/* ---------------------------------------------------------------- data patches */
if (byOrig[7]) byOrig[7].notes = 'This 2023 Gallup study shows that teens are spending 4.8 hours on social media every day. ' +
  'YouTube and TikTok alone are over three hours. [click] And you can see here, girls spend more time on social media than boys: 5.3 hours against 4.4. ' +
  'Interactive: the All / Boys / Girls buttons switch the chart; tap a platform to see what it costs in a year. The QR code opens the Gallup article.';
if (byOrig[8]) {
  byOrig[8].tr = { type: 'fade', ms: 800 };
  byOrig[8].notes = 'Let’s do the maths. 4.8 hours a day, times 365 days, is 1,752 hours a year. [click] That is 73 full days, 24 hours a day, ' +
    'every year: from the 1st of January to the middle of March, gone. Interactive: drag the slider or tap a preset to try your own child’s number; ' +
    'the next slides use the same number.';
}
if (byOrig[10]) byOrig[10].notes = 'If you can stop your kids from wasting time on screens every day, and channel their time and energy into doing productive work, ' +
  'you can make your teen complete a year of college, [click] learn a new language the next year, [click] develop competitive level skill in a sport, ' +
  '[click] learn programming, [click] become a martial art expert, [click] and build a real body of creative work. \n\n' +
  'Interactive: tap any tile to drop it from (or add it back to) the bar at the bottom, which shows how many years of today’s screen time the plan takes. ' +
  '\n\nThe solution to this problem is easy. You don’t need to take devices away. I will show you later what you can do.';

/* ================================================================ 1. #7 [4] Gallup chart, live */
(function () {
  var PLAT = [
    { n: 'YouTube',   c: '255,78,78',   all: 1.9, boys: 2.1, girls: 1.7 },
    { n: 'TikTok',    c: '37,226,230',  all: 1.5, boys: 1.1, girls: 1.9 },
    { n: 'Instagram', c: '230,72,140',  all: 0.9, boys: 0.7, girls: 1.1 },
    { n: 'Facebook',  c: '86,128,255',  all: 0.3, boys: 0.3, girls: 0.4 },
    { n: 'X / Twitter', c: '190,200,210', all: 0.2, boys: 0.2, girls: 0.3 },
    { n: 'WhatsApp',  c: '46,214,110',  all: 0.1, boys: 0.1, girls: 0.2 }
  ];
  var TOT = { all: 4.8, boys: 4.4, girls: 5.3 };
  var MODES = [['all', 'All teens'], ['boys', 'Boys'], ['girls', 'Girls'], ['cmp', 'Boys vs Girls']];
  var TW = 640, MAXR = 2.4, MAXT = 5.6;      // track width (px); hours at full row / stack width
  addCss('pd-g7-css', [
    '.g7{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse 900px 700px at 640px 660px,rgba(34,211,238,.08),transparent 70%),radial-gradient(ellipse 700px 620px at 1560px 420px,rgba(255,176,32,.08),transparent 70%)}',
    '.g7 *{box-sizing:border-box}',
    '.g7 .rv{opacity:0}.g7.go .rv{animation:g7-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '@keyframes g7-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}',
    '.g7-k{position:absolute;left:104px;top:72px;font:700 24px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#eac583}',
    '.g7-t{position:absolute;left:98px;top:114px;width:1110px;margin:0;font:600 80px/1.04 var(--f-display);letter-spacing:-.035em}',
    '.g7-t em{font-style:italic;color:#ffd25e;white-space:nowrap}',
    /* chart card */
    '.g7-card{position:absolute;left:100px;top:318px;width:1110px;height:660px;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.03));box-shadow:0 22px 56px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.13)}',
    '.g7-seg{position:absolute;left:34px;top:32px;display:flex;gap:6px;padding:6px;border-radius:99px;background:rgba(0,0,0,.35);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}',
    '.g7-seg button{all:unset;pointer-events:auto;cursor:pointer;padding:13px 24px;border-radius:99px;font:600 23px/1 var(--f-body);color:#aeb9bf;white-space:nowrap;transition:color .25s ease,background .25s ease,box-shadow .25s ease}',
    '.g7-seg button:hover{color:#fff}',
    '.g7-seg button[aria-pressed=true]{color:#fff;background:rgba(34,211,238,.2);box-shadow:inset 0 0 0 1.5px rgba(34,211,238,.75),0 0 22px rgba(34,211,238,.25)}',
    '.g7-tot{position:absolute;right:40px;top:20px;display:flex;align-items:baseline;gap:14px;white-space:nowrap}',
    '.g7-tot b{font:700 74px/1 var(--f-display);letter-spacing:-.03em;font-variant-numeric:tabular-nums;background:linear-gradient(180deg,#ffe27a,#ff9f45);-webkit-background-clip:text;background-clip:text;color:transparent}',
    '.g7-tot i,.g7-tot .t2{display:none}',
    '.g7-tot i{font:italic 500 32px/1 var(--f-display);color:#8f9ca3}',
    '.g7-tot small{font:500 22px/1.1 var(--f-body);color:#aeb9bf;max-width:100px;white-space:normal}',
    '.g7.m-boys .g7-tot .t1,.g7.m-cmp .g7-tot .t1{background-image:linear-gradient(180deg,#9fd0ff,#4ea8ff)}',
    '.g7.m-girls .g7-tot .t1,.g7.m-cmp .g7-tot .t2{background-image:linear-gradient(180deg,#ffc2dc,#ff6fae)}',
    '.g7.m-cmp .g7-tot i,.g7.m-cmp .g7-tot .t2{display:inline}',
    /* stacked "all platforms" bar */
    '.g7-sr{position:absolute;left:34px;top:134px;width:1040px;height:56px}',
    '.g7-lab{position:absolute;left:0;top:0;width:236px;height:100%;display:flex;flex-direction:column;justify-content:center;font:700 24px/1.1 var(--f-body);color:#fff}',
    '.g7-lab span{display:block;transition:opacity .3s ease}',
    '.g7-lab .lb,.g7-lab .lg{display:none;font-size:20px}',
    '.g7.m-cmp .g7-lab .la{display:none}.g7.m-cmp .g7-lab .lb,.g7.m-cmp .g7-lab .lg{display:block}',
    '.g7-lab .lb{color:#8cc4ff}.g7-lab .lg{color:#ff9cc8}',
    '.g7-stk{position:absolute;left:250px;top:6px;width:' + TW + 'px;height:44px;border-radius:12px;overflow:hidden;background:rgba(255,255,255,.06);transition:transform .6s cubic-bezier(.22,.8,.3,1),opacity .4s ease}',
    '.g7-stk i{position:absolute;left:0;top:0;width:' + TW + 'px;height:100%;transform-origin:0 50%;transform:translateX(var(--x,0px)) scaleX(var(--sx,0));background:linear-gradient(180deg,rgba(var(--c),1),rgba(var(--c),.72));box-shadow:inset -3px 0 0 rgba(8,14,18,.85);transition:transform .9s cubic-bezier(.22,.8,.3,1) var(--dl,0s),opacity .3s ease}',
    '.g7-stk.s2{opacity:0;transform:translateY(12px) scaleY(.5)}',
    '.g7.m-cmp .g7-stk.s1{transform:translateY(-12px) scaleY(.5)}',
    '.g7.m-cmp .g7-stk.s2{opacity:1}',
    '.g7-sv{position:absolute;left:910px;top:0;height:100%;display:flex;align-items:center;font:700 26px/1 var(--f-body);color:#fff;font-variant-numeric:tabular-nums}',
    '.g7-rule{position:absolute;left:34px;right:34px;top:214px;height:1px;background:rgba(255,255,255,.12)}',
    /* platform rows */
    '.g7-row{position:absolute;left:34px;width:1040px;height:58px;border-radius:14px;cursor:pointer;transition:opacity .3s ease,background .3s ease}',
    '.g7-row:hover{background:rgba(255,255,255,.04)}',
    '.g7-row .nm{position:absolute;left:14px;top:0;height:100%;display:flex;align-items:center;gap:14px;font:600 27px/1 var(--f-body);color:#e6ebee;white-space:nowrap}',
    '.g7-row .nm i{width:14px;height:14px;border-radius:50%;background:rgb(var(--c));box-shadow:0 0 12px rgba(var(--c),.8)}',
    '.g7-row .tr{position:absolute;left:250px;top:0;width:' + TW + 'px;height:100%}',
    '.g7-row .tr::before{content:"";position:absolute;left:0;right:0;top:27px;height:4px;border-radius:4px;background:rgba(255,255,255,.05)}',
    '.g7-row .tr b{position:absolute;left:0;top:12px;width:100%;height:34px;border-radius:8px;transform-origin:0 50%;',
    '  transform:translateY(var(--ty,0px)) scale(var(--sx,0),var(--sy,1));transition:transform .9s cubic-bezier(.22,.8,.3,1) var(--dl,0s),opacity .3s ease;',
    '  background:linear-gradient(90deg,rgba(var(--c),.55),rgb(var(--c)))}',
    '.g7-row .tr .b2{opacity:0;--sy:.5}',
    '.g7.m-cmp .g7-row .tr .b1{--ty:-9px;--sy:.5;background:linear-gradient(90deg,rgba(78,168,255,.55),#4ea8ff)}',
    '.g7.m-cmp .g7-row .tr .b2{--ty:9px;opacity:1;background:linear-gradient(90deg,rgba(255,111,174,.55),#ff6fae)}',
    '.g7-row .vl{position:absolute;left:910px;top:0;height:100%;display:flex;align-items:center;gap:10px;font:700 27px/1 var(--f-body);font-variant-numeric:tabular-nums;color:#fff;white-space:nowrap}',
    '.g7-row .vl .v2,.g7-row .vl .sl{display:none}',
    '.g7.m-cmp .g7-row .vl .v1{color:#8cc4ff}.g7.m-cmp .g7-row .vl .v2{display:inline;color:#ff9cc8}.g7.m-cmp .g7-row .vl .sl{display:inline;color:#5d6a71;font-weight:400}',
    '.g7.foc .g7-row{opacity:.32}.g7.foc .g7-row.on{opacity:1;background:rgba(255,255,255,.06)}',
    '.g7.foc .g7-stk i{opacity:.3}.g7.foc .g7-stk i.on{opacity:1}',
    '.g7-foot{position:absolute;left:48px;right:40px;bottom:24px;font:500 22px/1.3 var(--f-body);color:#93a1a8}',
    '.g7-foot b{color:#fff;font-weight:700}.g7-foot em{font-style:normal;color:#ffd25e;font-weight:700}',
    /* right column: the article + QR */
    '.g7-news{position:absolute;left:1290px;top:92px;width:530px;cursor:zoom-in}',
    '.g7-news .in{border-radius:20px;overflow:hidden;transform:rotate(2deg);box-shadow:0 30px 80px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.18);transition:transform .4s cubic-bezier(.22,.8,.3,1)}',
    '.g7-news:hover .in{transform:rotate(0deg) scale(1.02)}',
    '.g7-news img{display:block;width:100%}',
    '.g7-qr{position:absolute;left:1290px;top:640px;width:236px;height:236px;padding:14px;border-radius:22px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.55)}',
    '.g7-qr img{display:block;width:100%;height:100%}',
    '.g7-qc{position:absolute;left:1556px;top:668px;width:270px;font:600 30px/1.2 var(--f-body);color:#fff}',
    '.g7-qc small{display:block;margin-top:12px;font:500 21px/1.35 var(--f-body);color:#93a1a8}',
    '.g7.static *,.g7.reduced *{transition:none!important;animation:none!important}',
    '.g7.static .rv,.g7.reduced .rv{opacity:1;transform:none}'
  ]);

  function apply(r, mode) {
    var st = r.__g7; if (!st) return;
    st.mode = mode;
    r.className = r.className.replace(/\s*\bm-\w+/g, '') + ' m-' + mode;
    var cmp = mode === 'cmp', k1 = cmp ? 'boys' : mode;
    st.rows.forEach(function (row, i) {
      var p = PLAT[i];
      row.b1.style.setProperty('--sx', (p[k1] / MAXR).toFixed(4));
      row.b2.style.setProperty('--sx', ((cmp ? p.girls : p[k1]) / MAXR).toFixed(4));
      row.v1.textContent = f1(p[k1]); row.v2.textContent = f1(p.girls);
    });
    [[st.s1, k1], [st.s2, cmp ? 'girls' : k1]].forEach(function (a) {
      var cum = 0;
      a[0].forEach(function (seg, i) { var v = PLAT[i][a[1]]; seg.style.setProperty('--x', (cum / MAXT * TW).toFixed(1) + 'px'); seg.style.setProperty('--sx', (v / MAXT).toFixed(4)); cum += v; });
    });
    st.t1.textContent = f1(TOT[k1]); st.t2.textContent = f1(TOT.girls);
    st.sv.innerHTML = cmp ? '<span style="color:#8cc4ff">4.4</span>&nbsp;<span style="color:#5d6a71;font-weight:400">/</span>&nbsp;<span style="color:#ff9cc8">5.3</span>' : f1(TOT[k1]) + ' h';
    st.btns.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.m === mode)); });
    foot(r);
  }
  function foot(r) {
    var st = r.__g7, i = st.focus, el = st.foot;
    if (i < 0) {
      el.innerHTML = st.mode === 'cmp'
        ? 'Girls spend <em>' + f1(TOT.girls - TOT.boys) + ' hours a day more</em> than boys. That is <b>' + fmt((TOT.girls - TOT.boys) * 365) + ' extra hours</b> a year.'
        : 'Average hours per day, U.S. teens 13-19. <b>Tap a platform</b> to see what it costs in a year.';
      return;
    }
    var p = PLAT[i], k = st.mode === 'cmp' ? 'all' : st.mode;
    el.innerHTML = '<b>' + p.n + '</b>: ' + f1(p[k]) + ' h a day = <em>' + fmt(p[k] * 365) + ' hours a year</em>' + (p[k] >= 1 ? ', about ' + Math.round(p[k] * 365 / 24) + ' full days.' : '.');
  }
  function setFocus(r, i) {
    var st = r.__g7; st.focus = st.focus === i ? -1 : i;
    r.classList.toggle('foc', st.focus >= 0);
    st.rows.forEach(function (row, j) { row.el.classList.toggle('on', j === st.focus); });
    st.s1.concat(st.s2).forEach(function (seg) { seg.classList.toggle('on', +seg.dataset.i === st.focus); });
    foot(r);
  }

  Deck.registerSlide(7, {
    keepBase: false, loop: false, steps: 1,
    render: function (el, ctx) {
      var r = h('div', 'g7 m-all' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
      var segs = PLAT.map(function (p, i) { return '<i data-i="' + i + '" style="--c:' + p.c + ';--dl:' + (i * .08).toFixed(2) + 's"></i>'; }).join('');
      r.innerHTML =
        '<div class="g7-k rv" style="--d:.05s">Gallup survey &middot; 1,567 U.S. teens &middot; 2023</div>' +
        '<h1 class="g7-t rv" style="--d:.15s">Teens spend <em>4.8 hours</em> a day on social media</h1>' +
        '<div class="g7-card rv" style="--d:.3s">' +
          '<div class="g7-seg">' + MODES.map(function (m) { return '<button type="button" data-m="' + m[0] + '" aria-pressed="false">' + m[1] + '</button>'; }).join('') + '</div>' +
          '<div class="g7-tot"><b class="t1">4.8</b><i>vs</i><b class="t2">5.3</b><small>hours a day</small></div>' +
          '<div class="g7-sr"><div class="g7-lab"><span class="la">All platforms</span><span class="lb">Boys</span><span class="lg">Girls</span></div>' +
            '<div class="g7-stk s1">' + segs + '</div><div class="g7-stk s2">' + segs + '</div><div class="g7-sv"></div></div>' +
          '<div class="g7-rule"></div>' +
          PLAT.map(function (p, i) {
            return '<div class="g7-row pe" data-noadvance data-i="' + i + '" style="top:' + (232 + i * 62) + 'px;--c:' + p.c + '">' +
              '<span class="nm"><i></i>' + p.n + '</span>' +
              '<span class="tr"><b class="b1" style="--dl:' + (.1 + i * .07).toFixed(2) + 's"></b><b class="b2" style="--dl:' + (.1 + i * .07).toFixed(2) + 's"></b></span>' +
              '<span class="vl"><span class="v1"></span><span class="sl">/</span><span class="v2"></span></span></div>';
          }).join('') +
          '<div class="g7-foot"></div>' +
        '</div>' +
        '<div class="g7-news pe rv" data-noadvance style="--d:.5s"><div class="in"><img src="media/image12.png" alt="Gallup News: Teens spend average of 4.8 hours on social media per day"></div></div>' +
        '<div class="g7-qr rv" style="--d:.7s"><img src="media/image13.png" alt="QR code to the Gallup article"></div>' +
        '<div class="g7-qc rv" style="--d:.8s">Scan to read the study<small>Gallup, October 2023</small></div>';
      chips(r, [GALLUP]);
      var rows = [].slice.call(r.querySelectorAll('.g7-row')).map(function (row) {
        return { el: row, b1: row.querySelector('.b1'), b2: row.querySelector('.b2'), v1: row.querySelector('.v1'), v2: row.querySelector('.v2') };
      });
      r.__g7 = { mode: 'all', focus: -1, rows: rows,
        s1: [].slice.call(r.querySelectorAll('.g7-stk.s1 i')), s2: [].slice.call(r.querySelectorAll('.g7-stk.s2 i')),
        t1: r.querySelector('.t1'), t2: r.querySelector('.t2'), sv: r.querySelector('.g7-sv'), foot: r.querySelector('.g7-foot'),
        btns: [].slice.call(r.querySelectorAll('.g7-seg button')) };
      r.__g7.btns.forEach(function (b) { noFocus(b); b.addEventListener('click', function () { apply(r, b.dataset.m); }); });
      rows.forEach(function (row, i) { row.el.addEventListener('click', function () { setFocus(r, i); }); });
      r.querySelector('.g7-news').addEventListener('click', function () { if (Deck.lightbox) Deck.lightbox('media/image12.png'); });
      el.__g7 = r;
      foot(r);
      if (ctx.static || ctx.reduced) { r.classList.add('go'); apply(r, 'all'); }
    },
    enter: function (el, ctx) {
      var r = el.__g7; if (!r || ctx.static) return;
      void r.offsetWidth; r.classList.add('go');
      if (ctx.reduced) return;
      if (r.__g7.mode === 'all' && r.__g7.rows[0].b1.style.getPropertyValue('--sx') === '') ctx.timeout(function () { apply(r, r.__g7.mode); }, 450);
    },
    step: function (el) { var r = el.__g7; if (!r) return; r.__g7.prev = r.__g7.mode === 'cmp' ? 'all' : r.__g7.mode; apply(r, 'cmp'); },
    unstep: function (el) { var r = el.__g7; if (r) apply(r, r.__g7.prev || 'all'); }
  });
})();

/* ================================================================ 2. #8 [5] 4.8 h x 365, year calendar */
(function () {
  var YEAR = 2025, MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var PRESETS = [[1, '1 h'], [2, '2 h'], [4.8, '4.8 h teen avg'], [7, '7 h']];
  addCss('pd-y8-css', [
    '.y8{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;--st:9ms;background:radial-gradient(ellipse 760px 700px at 440px 460px,rgba(255,176,32,.08),transparent 70%),radial-gradient(ellipse 900px 800px at 1340px 540px,rgba(255,77,77,.07),transparent 70%)}',
    '.y8 *{box-sizing:border-box}',
    '.y8 .rv{opacity:0}.y8.go .rv{animation:y8-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '@keyframes y8-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}',
    '.y8-k{position:absolute;left:104px;top:84px;font:700 24px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#eac583}',
    '.y8-eq{position:absolute;left:100px;top:132px;width:720px;font:600 70px/1 var(--f-display);letter-spacing:-.03em;color:#F4F1EA;white-space:nowrap}',
    '.y8-eq > div{position:absolute;left:0}',
    '.y8-eq .l1{top:0}.y8-eq .l2{top:96px}.y8-eq .rl{top:200px;width:640px;height:4px;border-radius:4px;background:linear-gradient(90deg,rgba(255,255,255,.7),rgba(255,255,255,.08))}',
    '.y8-eq .l3{top:232px}.y8-eq .l4{top:350px}.y8-eq .l5{top:470px;font:500 28px/1.3 var(--f-body);letter-spacing:0;color:#aab6bc}',
    '.y8-eq .hv{font-variant-numeric:tabular-nums;color:#5DE8F5;text-shadow:0 0 30px rgba(34,211,238,.35)}',
    '.y8-eq .op{display:inline-block;width:62px;color:#8f9ca3;font-style:normal}',
    '.y8-eq .yv{font-size:96px;font-variant-numeric:tabular-nums;background:linear-gradient(180deg,#ffe27a,#ff9f45);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 6px 26px rgba(255,170,60,.35))}',
    '.y8-eq .dv{font-size:96px;font-variant-numeric:tabular-nums;background:linear-gradient(180deg,#ffb48a,#ff4d4d);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 6px 26px rgba(255,77,77,.4))}',
    '.y8-eq .l5 b{color:#fff}',
    '.y8 .a1x{opacity:0;transform:translateY(22px);transition:opacity .35s ease,transform .35s ease}',
    '.y8.a1 .a1x{opacity:1;transform:none;transition:opacity .6s ease,transform .8s cubic-bezier(.22,.8,.3,1)}.y8.a1 .l5.a1x{transition-delay:.5s}',
    /* slider card */
    '.y8-ctl{position:absolute;left:100px;top:672px;width:700px;height:286px;padding:30px 34px;border-radius:28px;background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,.03));box-shadow:0 22px 56px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.13)}',
    '.y8-ctl .lb{font:700 21px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#5DE8F5}',
    '.y8-row{display:flex;align-items:center;gap:20px;margin-top:34px}',
    '.y8-btn{all:unset;pointer-events:auto;cursor:pointer;flex:none;width:58px;height:58px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:500 36px/1 var(--f-body);color:#fff;background:rgba(255,255,255,.08);box-shadow:inset 0 0 0 1px rgba(255,255,255,.2)}',
    '.y8-btn:hover{background:rgba(34,211,238,.2)}',
    '.y8-range{-webkit-appearance:none;appearance:none;flex:1;height:16px;border-radius:16px;outline:none;cursor:pointer;margin:0;background:linear-gradient(90deg,#22D3EE var(--p,48%),rgba(255,255,255,.12) var(--p,48%))}',
    '.y8-range::-webkit-slider-thumb{-webkit-appearance:none;width:52px;height:52px;border-radius:50%;background:#fff;border:7px solid var(--cyan);box-shadow:0 0 0 8px rgba(34,211,238,.22),0 8px 24px rgba(0,0,0,.6);cursor:grab}',
    '.y8-range::-moz-range-thumb{width:40px;height:40px;border-radius:50%;background:#fff;border:7px solid var(--cyan)}',
    '.y8-pre{display:flex;gap:12px;margin-top:36px}',
    '.y8-pre button{all:unset;pointer-events:auto;cursor:pointer;padding:12px 20px;border-radius:99px;font:600 22px/1 var(--f-body);color:#cfd8dc;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.16);white-space:nowrap}',
    '.y8-pre button:hover{color:#fff}',
    '.y8-pre button[aria-pressed=true]{color:#06222a;background:#5DE8F5;box-shadow:0 0 22px rgba(34,211,238,.4)}',
    /* calendar */
    '.y8-cal{position:absolute;left:870px;top:84px;width:960px;height:884px;padding:36px 40px;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.025));box-shadow:0 22px 56px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.12)}',
    '.y8-ch{display:flex;justify-content:space-between;align-items:baseline;white-space:nowrap}',
    '.y8-ch h3{margin:0;font:600 40px/1 var(--f-display);letter-spacing:-.02em;color:#fff}',
    '.y8-ch .lg{display:flex;align-items:center;gap:10px;font:500 21px/1 var(--f-body);color:#aab6bc}',
    '.y8-ch .lg i{width:20px;height:20px;border-radius:6px;background:linear-gradient(135deg,#ffb020,#ff4d4d)}',
    '.y8-gone{margin-top:16px;height:34px;font:500 27px/1.2 var(--f-body);color:#aab6bc}',
    '.y8-gone b{color:#ff8a6b;font-weight:700}',
    '.y8-gone span{opacity:0;transition:opacity .4s ease}.y8.a1 .y8-gone span{opacity:1;transition-delay:.6s}',
    '.y8-ms{display:grid;grid-template-columns:repeat(4,211px);column-gap:12px;row-gap:30px;margin-top:26px}',
    '.y8-m b{display:block;height:30px;font:700 19px/1 var(--f-body);letter-spacing:.14em;text-transform:uppercase;color:#7f8d94}',
    '.y8-g{display:grid;grid-template-columns:repeat(7,25px);grid-auto-rows:25px;gap:6px}',
    '.y8-g i{position:relative;border-radius:7px;background:rgba(255,255,255,.075)}',
    '.y8-g i.x{background:none}',
    '.y8-g i::after{content:"";position:absolute;inset:0;border-radius:inherit;background:linear-gradient(135deg,#ffb020,#ff4d4d);box-shadow:0 0 12px rgba(255,90,60,.55);opacity:0;transform:scale(.3);',
    '  transition:opacity .25s ease,transform .25s ease}',
    '.y8.a1 .y8-g i.on::after{opacity:1;transform:none;transition:opacity .3s ease calc(var(--i) * var(--st)),transform .45s cubic-bezier(.2,1.6,.4,1) calc(var(--i) * var(--st))}',
    '.y8.static *,.y8.reduced *{transition:none!important;animation:none!important}',
    '.y8.static .rv,.y8.reduced .rv{opacity:1;transform:none}'
  ]);

  function dateOf(n) { var d = new Date(YEAR, 0, 1 + n); return d.getDate() + ' ' + MON[d.getMonth()]; }
  function update(r, hpd, from) {
    var st = r.__y8; if (!st) return;
    hpd = Math.max(.5, Math.min(10, Math.round(hpd * 10) / 10)); S.hpd = hpd;
    var yr = hpd * 365, days = Math.round(yr / 24);
    st.hv.textContent = f1(hpd);
    if (!st.counting) st.yv.textContent = fmt(yr);
    st.dv.textContent = days;
    st.pct.textContent = Math.round(hpd / 16 * 100) + '%';
    st.dl.textContent = days === 1 ? 'full day' : 'full days';
    st.gone.innerHTML = days ? '<span>Gone: <b>1 Jan &rarr; ' + dateOf(days - 1) + '</b>, around the clock, every year</span>' : '';
    st.dots.forEach(function (d, i) { d.classList.toggle('on', i < days); });
    if (from !== 'range') st.range.value = hpd;
    st.range.style.setProperty('--p', ((hpd - .5) / 9.5 * 100).toFixed(1) + '%');
    st.pres.forEach(function (b) { b.setAttribute('aria-pressed', String(+b.dataset.v === hpd)); });
  }

  Deck.registerSlide(8, {
    keepBase: false, loop: false, steps: 1,
    render: function (el, ctx) {
      var r = h('div', 'y8' + (ctx.static ? ' static a1' : '') + (ctx.reduced ? ' reduced' : ''), el);
      var months = '', k = 0;
      for (var m = 0; m < 12; m++) {
        var off = (new Date(YEAR, m, 1).getDay() + 6) % 7, n = new Date(YEAR, m + 1, 0).getDate(), cells = '';
        for (var j = 0; j < off; j++) cells += '<i class="x"></i>';
        for (var d = 0; d < n; d++) cells += '<i class="d" style="--i:' + (k++) + '"></i>';
        months += '<div class="y8-m"><b>' + MON[m] + '</b><div class="y8-g">' + cells + '</div></div>';
      }
      r.innerHTML =
        '<div class="y8-k rv" style="--d:.05s">Do the maths</div>' +
        '<div class="y8-eq">' +
          '<div class="l1 rv" style="--d:.15s"><span class="hv">4.8</span> hours a day</div>' +
          '<div class="l2 rv" style="--d:.4s"><i class="op">&times;</i>365 days</div>' +
          '<div class="rl rv" style="--d:.65s"></div>' +
          '<div class="l3 rv" style="--d:.8s"><i class="op">=</i><span class="yv">1,752</span> hours a year</div>' +
          '<div class="l4 a1x"><i class="op">=</i><span class="dv">73</span> <span class="dl">full days</span></div>' +
          '<div class="l5 a1x">24 hours a day, non-stop. Or <b class="pct">30%</b> of every waking hour.</div>' +
        '</div>' +
        '<div class="y8-ctl pe rv" data-noadvance style="--d:1.1s"><div class="lb">Try your child’s number</div>' +
          '<div class="y8-row"><button type="button" class="y8-btn" data-d="-0.5" aria-label="Fewer hours">&minus;</button>' +
          '<input class="y8-range" type="range" min="0.5" max="10" step="0.1" value="4.8" aria-label="Screen hours per day">' +
          '<button type="button" class="y8-btn" data-d="0.5" aria-label="More hours">+</button></div>' +
          '<div class="y8-pre">' + PRESETS.map(function (p) { return '<button type="button" data-v="' + p[0] + '">' + p[1] + '</button>'; }).join('') + '</div>' +
        '</div>' +
        '<div class="y8-cal rv" style="--d:.5s"><div class="y8-ch"><h3>One year, 24 hours a day</h3><span class="lg"><i></i>a full day on a screen</span></div>' +
          '<div class="y8-gone"></div><div class="y8-ms">' + months + '</div></div>';
      chips(r, [GALLUP]);
      var q = function (s) { return r.querySelector(s); };
      r.__y8 = { hv: q('.hv'), yv: q('.yv'), dv: q('.dv'), dl: q('.dl'), pct: q('.pct'), gone: q('.y8-gone'), range: q('.y8-range'),
        dots: [].slice.call(r.querySelectorAll('.y8-g i.d')), pres: [].slice.call(r.querySelectorAll('.y8-pre button')) };
      var st = r.__y8;
      function live(v, from) { r.style.setProperty('--st', '1.5ms'); update(r, v, from); }
      st.range.addEventListener('input', function () { live(+st.range.value, 'range'); });
      noFocus(st.range); st.range.addEventListener('change', function () { st.range.blur(); });
      [].forEach.call(r.querySelectorAll('.y8-btn'), function (b) { noFocus(b); b.addEventListener('click', function () { live(S.hpd + +b.dataset.d); }); });
      st.pres.forEach(function (b) { noFocus(b); b.addEventListener('click', function () { live(+b.dataset.v); }); });
      el.__y8 = r;
      update(r, S.hpd);
      if (ctx.static || ctx.reduced) r.classList.add('go');
    },
    enter: function (el, ctx) {
      var r = el.__y8; if (!r || ctx.static) return;
      void r.offsetWidth; r.classList.add('go');
      if (ctx.reduced || r.classList.contains('a1')) return;
      var st = r.__y8; st.counting = true; st.yv.textContent = '0';
      ctx.timeout(function () { countUp(ctx, st.yv, S.hpd * 365, 1100); ctx.timeout(function () { st.counting = false; update(r, S.hpd); }, 1200); }, 850);
    },
    step: function (el) { var r = el.__y8; if (r) { r.style.setProperty('--st', '9ms'); r.classList.add('a1'); } },
    unstep: function (el) { var r = el.__y8; if (r) r.classList.remove('a1'); }
  });
})();

/* ================================================================ 3. #10 [7] what the hours could become */
(function () {
  var TILES = [
    { img: 'college',  c: '255,176,32',  hrs: 800,  hd: 'A full year of college',   sb: 'a year of university-level study' },
    { img: 'language', c: '34,211,238',  hrs: 1200, hd: 'A new language',           sb: 'to professional working fluency' },
    { img: 'sport',    c: '46,229,157',  hrs: 1000, hd: 'Competitive sport',        sb: 'amateur competition level' },
    { img: 'coding',   c: '139,123,255', hrs: 800,  hd: 'Full-stack programming',   sb: 'build real, professional web apps' },
    { img: 'martial',  c: '255,77,77',   hrs: 1500, hd: 'Martial arts',             sb: 'from beginner to advanced' },
    { img: 'creative', c: '255,126,182', hrs: 1000, hd: 'A body of creative work',  sb: 'in writing, art or music' }
  ];
  var X0 = 100, Y0 = 206, TWD = 560, THT = 304, GAP = 20, BAR = 1720;
  var CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  addCss('pd-b10-css', [
    '.b10{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse 1100px 600px at 960px 560px,rgba(34,211,238,.06),transparent 70%)}',
    '.b10 *{box-sizing:border-box}',
    '.b10 .rv{opacity:0}.b10.go .rv{animation:b10-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
    '@keyframes b10-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}',
    '.b10-k{position:absolute;left:104px;top:62px;font:700 24px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#eac583}',
    '.b10-t{position:absolute;left:98px;top:98px;width:1730px;margin:0;font:600 70px/1.05 var(--f-display);letter-spacing:-.035em;white-space:nowrap}',
    '.b10-t em{font-style:italic;color:#ffd25e;font-variant-numeric:tabular-nums}',
    /* tiles */
    '.b10-tile{position:absolute;width:' + TWD + 'px;height:' + THT + 'px;border-radius:24px;overflow:hidden;background:#0E171C;box-shadow:0 22px 50px rgba(0,0,0,.55),inset 0 0 0 1px rgba(255,255,255,.1);}',
    '.b10-tile.on{cursor:pointer}',
    '.b10-tile .ph{position:absolute;inset:0}',
    '.b10-tile .ph img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.14);transition:transform 1.6s cubic-bezier(.22,.8,.3,1)}',
    '.b10-tile.on .ph img{transform:scale(1)}',
    '.b10-tile.on:hover .ph img{transform:scale(1.05);transition-duration:.8s}',
    '.b10-tile .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,11,.55) 0%,rgba(5,8,11,0) 34%,rgba(5,8,11,0) 46%,rgba(5,8,11,.92) 100%)}',
    '.b10-tile .dim{position:absolute;inset:0;background:rgba(5,8,11,.62);opacity:0;transition:opacity .4s ease}',
    '.b10-tile.on:not(.sel) .dim{opacity:1}',
    '.b10-tile .rg{position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 0 3px rgb(var(--c)),inset 0 0 40px rgba(var(--c),.35);opacity:0;transition:opacity .4s ease}',
    '.b10-tile.sel .rg{opacity:1}',
    '.b10-tile .hr{position:absolute;left:24px;top:20px;display:flex;align-items:baseline;gap:8px;white-space:nowrap}',
    '.b10-tile .hr b{font:700 56px/1 var(--f-display);letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:rgb(var(--c));text-shadow:0 2px 22px rgba(0,0,0,.7),0 0 26px rgba(var(--c),.35)}',
    '.b10-tile .hr span{font:600 22px/1 var(--f-body);color:#e6ebee;text-shadow:0 1px 8px rgba(0,0,0,.8)}',
    '.b10-tile .ck{position:absolute;right:20px;top:20px;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#06141a;box-shadow:inset 0 0 0 2.5px rgba(255,255,255,.7);background:rgba(5,8,11,.35)}',
    '.b10-tile .ck svg{width:26px;height:26px;opacity:0;transform:scale(.4);transition:opacity .25s ease,transform .35s cubic-bezier(.2,1.6,.4,1)}',
    '.b10-tile .ck::before{content:"";position:absolute;inset:0;border-radius:50%;background:rgb(var(--c));opacity:0;transform:scale(.5);transition:opacity .25s ease,transform .35s cubic-bezier(.2,1.6,.4,1)}',
    '.b10-tile .ck svg{position:relative}',
    '.b10-tile.sel .ck svg,.b10-tile.sel .ck::before{opacity:1;transform:none}',
    '.b10-tile .tx{position:absolute;left:24px;right:24px;bottom:20px}',
    '.b10-tile .hd{font:700 34px/1.1 var(--f-body);letter-spacing:-.015em;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.8)}',
    '.b10-tile .sb{margin-top:6px;font:500 22px/1.25 var(--f-body);color:#c3ccd0;text-shadow:0 1px 10px rgba(0,0,0,.9)}',
    /* cover for tiles not yet revealed */
    '.b10-tile .cv{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:radial-gradient(ellipse at 50% 40%,rgba(var(--c),.10),transparent 70%),linear-gradient(180deg,#121d23,#0b1317);transition:opacity .7s ease}',
    '.b10-tile .cv span{font:600 120px/1 var(--f-display);color:rgba(255,255,255,.07)}',
    '.b10-tile.on .cv{opacity:0;pointer-events:none}',
    /* timeline */
    '.b10-sum{position:absolute;left:100px;top:846px;width:1720px;display:flex;justify-content:space-between;align-items:baseline;font:500 28px/1 var(--f-body);color:#aab6bc;white-space:nowrap}',
    '.b10-sum b{font:700 40px/1 var(--f-display);color:#fff;font-variant-numeric:tabular-nums}',
    '.b10-sum b.yrs{color:#ffd25e}',
    '.b10-sum .hint{font-size:22px;color:#7f8d94}',
    '.b10-tl{position:absolute;left:100px;top:894px;width:' + BAR + 'px;height:44px;border-radius:12px;overflow:hidden;background:rgba(255,255,255,.06);box-shadow:inset 0 0 0 1px rgba(255,255,255,.1)}',
    '.b10-tl .sg{position:absolute;left:0;top:0;width:' + BAR + 'px;height:100%;transform-origin:0 50%;transform:translateX(var(--x,0px)) scaleX(var(--sx,0));',
    '  background:linear-gradient(180deg,rgb(var(--c)),rgba(var(--c),.7));box-shadow:inset -3px 0 0 rgba(8,14,18,.9);transition:transform .7s cubic-bezier(.22,.8,.3,1)}',
    '.b10-tk{position:absolute;left:100px;top:894px;width:' + BAR + 'px;height:80px;pointer-events:none}',
    '.b10-tk i{position:absolute;top:0;width:2px;height:44px;margin-left:-1px;background:rgba(5,8,11,.8);box-shadow:1px 0 0 rgba(255,255,255,.3)}',
    '.b10-tk span{position:absolute;top:54px;transform:translateX(-100%);padding-right:8px;font:600 19px/1 var(--f-body);letter-spacing:.06em;color:#7f8d94;white-space:nowrap}',
    '.b10.static *,.b10.reduced *{transition:none!important;animation:none!important}',
    '.b10.static .rv,.b10.reduced .rv{opacity:1;transform:none}'
  ]);

  function timeline(r) {
    var st = r.__b10; if (!st) return;
    var yearH = S.hpd * 365, all = 0, sel = 0;
    TILES.forEach(function (t, i) { all += t.hrs; if (st.sel[i]) sel += t.hrs; });
    var years = Math.max(1, Math.ceil(all / yearH - 1e-9)), span = years * yearH, cum = 0;
    st.segs.forEach(function (sg, i) {
      var v = st.sel[i] ? TILES[i].hrs : 0;
      sg.style.setProperty('--x', (cum / span * BAR).toFixed(1) + 'px'); sg.style.setProperty('--sx', (v / span).toFixed(4)); cum += v;
    });
    var every = Math.ceil(years / 8), tk = '';
    for (var y = 1; y < years; y++) tk += '<i style="left:' + (y * yearH / span * BAR).toFixed(1) + 'px"></i>';
    for (y = every; y <= years; y += every) tk += '<span style="left:' + (y * yearH / span * BAR).toFixed(1) + 'px">' + (y === 1 ? '1 YEAR' : y + ' YEARS') + '</span>';
    st.tk.innerHTML = tk;
    st.tot.textContent = fmt(sel); st.yrs.textContent = f1(sel / yearH); st.hp.textContent = f1(S.hpd); st.yh.textContent = fmt(yearH);
  }
  function setTile(r, i, on, sel, ctx) {
    var st = r.__b10, t = st.tiles[i]; if (!t) return;
    var was = t.classList.contains('on');
    t.classList.toggle('on', on); t.classList.toggle('pe', on); t.toggleAttribute('data-noadvance', on); st.sel[i] = !!(on && sel); t.classList.toggle('sel', st.sel[i]);
    var b = t.querySelector('.hr b');
    if (on && !was && ctx && !ctx.static) countUp(ctx, b, TILES[i].hrs, 900);
    else if (!on) b.textContent = fmt(TILES[i].hrs);
    timeline(r);
  }

  Deck.registerSlide(10, {
    keepBase: false, loop: false, steps: 5,
    render: function (el, ctx) {
      var r = h('div', 'b10' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
      r.innerHTML =
        '<div class="b10-k rv" style="--d:.05s">If the screen gave those hours back</div>' +
        '<h1 class="b10-t rv" style="--d:.15s">What could <em><span class="yh">1,752</span> hours</em> a year become?</h1>' +
        TILES.map(function (t, i) {
          var x = X0 + (i % 3) * (TWD + GAP), y = Y0 + Math.floor(i / 3) * (THT + GAP);
          return '<div class="b10-tile rv" data-i="' + i + '" style="left:' + x + 'px;top:' + y + 'px;--c:' + t.c + ';--d:' + (.3 + i * .07).toFixed(2) + 's">' +
            '<div class="ph"><img src="media/hours/' + t.img + '.webp" alt=""></div><div class="sh"></div><div class="dim"></div>' +
            '<div class="hr"><b>' + fmt(t.hrs) + '</b><span>hours</span></div><div class="ck">' + CHECK + '</div>' +
            '<div class="tx"><div class="hd">' + t.hd + '</div><div class="sb">' + t.sb + '</div></div>' +
            '<div class="rg"></div><div class="cv"><span>' + (i + 1) + '</span></div></div>';
        }).join('') +
        '<div class="b10-sum rv" style="--d:.8s"><span><b class="tot">800</b> hours&nbsp; = &nbsp;<b class="yrs">0.5</b> years of screen time at <span class="hp">4.8</span> h a day</span>' +
          '<span class="hint">Tap a tile to add or remove it</span></div>' +
        '<div class="b10-tl rv" style="--d:.9s">' + TILES.map(function (t) { return '<i class="sg" style="--c:' + t.c + '"></i>'; }).join('') + '</div>' +
        '<div class="b10-tk rv" style="--d:.9s"></div>';
      var q = function (s) { return r.querySelector(s); };
      r.__b10 = { tiles: [].slice.call(r.querySelectorAll('.b10-tile')), segs: [].slice.call(r.querySelectorAll('.b10-tl .sg')), sel: TILES.map(function () { return false; }),
        tk: q('.b10-tk'), tot: q('.tot'), yrs: q('.yrs'), hp: q('.hp'), yh: q('.yh') };
      r.__b10.tiles.forEach(function (t, i) {
        t.addEventListener('click', function (ev) {
          if (!t.classList.contains('on')) return;          // unrevealed: let the click advance the deck
          setTile(r, i, true, !r.__b10.sel[i]);
        });
      });
      el.__b10 = r;
      var n = ctx.static ? TILES.length : 1;
      for (var i = 0; i < n; i++) setTile(r, i, true, true);
      timeline(r);
      if (ctx.static || ctx.reduced) r.classList.add('go');
    },
    enter: function (el, ctx) {
      var r = el.__b10; if (!r || ctx.static) return;
      timeline(r);                                           // pick up a new hours/day from [5]
      void r.offsetWidth; r.classList.add('go');
    },
    step: function (el, i, ctx) { var r = el.__b10; if (r) setTile(r, i, true, true, ctx); },
    unstep: function (el, i) { var r = el.__b10; if (r) setTile(r, i, false, false); }
  });
})();
})();
