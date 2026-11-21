/* ============================================================================
   child-extra.js - slides that exist only in the Child version (ages 10-12, family session). Does nothing in the other versions.
   Their ids must be listed in child.js (Deck.only), their notes are in notes-child.json.

     kid-screen-time   (after agenda-journey)  two sliders: hours a day watching TV / playing games. Shows hours a day, then (click 1)
                       per month and per year. The total is shared with the rest of the deck: Deck.hoursState.hpd (part-d.js).
     kid-books         (after kid-screen-time) the man with the book tower: "What can you do in N hours?" and how many books N hours is.
     kid-light         (after hours-tiles)     a child at the TV and a child on a tablet, bright white light into their eyes, tired brain.
                       Click 1 = "your brain gets tired and exhausted" (the pictures dim a little).
     kid-sleep         (after kid-light)       what a bad night does: can't sleep, asleep but the brain is awake, wakes up tired, dozes off in class,
                       angry with parents, fails the exam. Six panels (3 x 2), one per click. Images: media/child/*.webp (generated with the Codex CLI).
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA || Deck.edition !== 'child') return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }
function fmt(n) { return Math.round(n).toLocaleString('en-US'); }
function fh(v) { v = Math.round(v * 10) / 10; return v % 1 ? v.toFixed(1) : String(v); }

/* ---------------------------------------------------------------- the child's own numbers (shared by the first two slides and hours-tiles) */
var IMG_V = '?v=3';                           // bump when a picture in media/child/ is regenerated (browsers cache images)
var KID = { tv: 2, gm: 1 };
var HOURS_PER_BOOK = 8;                       // a children's novel / short adult book, read at a relaxed pace
function totals() {
  var day = KID.tv + KID.gm, year = day * 365;
  return { day: day, month: day * 30, year: year, days: Math.round(year / 24), books: Math.round(year / HOURS_PER_BOOK) };
}
function publish() {                          // hours-tiles ('What could N hours a year become?') reads this on entry
  var hs = Deck.hoursState; if (hs) hs.hpd = Math.max(.5, totals().day);
}
publish();

var TV_ICON = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="11" width="52" height="34" rx="7"/><path d="M20 56h24M32 45v11"/></svg>';
var PAD_ICON = '<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 19h26a12 12 0 0 1 12 11l2.5 13a6.5 6.5 0 0 1-11 5.5L42 41H22l-6.5 7.5a6.5 6.5 0 0 1-11-5.5L7 30a12 12 0 0 1 12-11z"/><path d="M21 27v10M16 32h10"/><circle cx="43" cy="28" r="1.8" fill="currentColor"/><circle cx="49" cy="34" r="1.8" fill="currentColor"/></svg>';

/* ================================================================ 1. kid-screen-time */
addCss('kc-time-css', [
  '.kc{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse 800px 640px at 480px 560px,rgba(34,211,238,.09),transparent 70%),radial-gradient(ellipse 760px 700px at 1480px 560px,rgba(255,176,32,.1),transparent 70%)}',
  '.kc *{box-sizing:border-box}',
  '.kc .rv{opacity:0}.kc.go .rv{animation:kc-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
  '@keyframes kc-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}',
  '.kc-k{position:absolute;left:104px;top:70px;font:700 24px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#eac583}',
  '.kc-t{position:absolute;left:98px;top:108px;width:1740px;margin:0;font:600 82px/1.05 var(--f-display);letter-spacing:-.035em;white-space:nowrap}',
  '.kc-t em{font-style:italic;color:#ffd25e}',
  /* slider cards */
  '.kc-card{position:absolute;left:100px;width:900px;height:318px;padding:34px 44px;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03));box-shadow:0 22px 56px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.13)}',
  '.kc-card.tv{top:262px;--c:34,211,238}.kc-card.gm{top:612px;--c:255,176,32}',
  '.kc-ic{position:absolute;left:44px;top:34px;width:104px;height:104px;border-radius:30px;display:flex;align-items:center;justify-content:center;color:rgb(var(--c));background:rgba(var(--c),.14);box-shadow:inset 0 0 0 2px rgba(var(--c),.55)}',
  '.kc-ic svg{width:62px;height:62px}',
  '.kc-lb{position:absolute;left:180px;top:46px;font:700 46px/1.1 var(--f-body);letter-spacing:-.02em;color:#fff}',
  '.kc-lb small{display:block;margin-top:8px;font:500 26px/1.1 var(--f-body);letter-spacing:0;color:#9fb0b7}',
  '.kc-val{position:absolute;right:44px;top:22px;text-align:right;white-space:nowrap}',
  '.kc-val b{font:700 96px/1 var(--f-display);letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:rgb(var(--c));text-shadow:0 0 30px rgba(var(--c),.35)}',
  '.kc-val small{display:block;margin-top:2px;font:600 24px/1 var(--f-body);letter-spacing:.06em;color:#9fb0b7}',
  '.kc-rng{-webkit-appearance:none;appearance:none;position:absolute;left:44px;right:44px;top:188px;width:812px;height:20px;border-radius:20px;outline:none;cursor:pointer;margin:0;pointer-events:auto;',
  '  background:linear-gradient(90deg,rgb(var(--c)) var(--p,20%),rgba(255,255,255,.12) var(--p,20%))}',
  '.kc-rng::-webkit-slider-thumb{-webkit-appearance:none;width:64px;height:64px;border-radius:50%;background:#fff;border:9px solid rgb(var(--c));box-shadow:0 0 0 9px rgba(var(--c),.22),0 8px 24px rgba(0,0,0,.6);cursor:grab}',
  '.kc-rng::-moz-range-thumb{width:46px;height:46px;border-radius:50%;background:#fff;border:9px solid rgb(var(--c))}',
  '.kc-tk{position:absolute;left:44px;right:44px;top:252px;display:flex;justify-content:space-between;font:600 22px/1 var(--f-body);color:#7f8d94}',
  /* results */
  '.kc-res{position:absolute;left:1060px;top:262px;width:760px;height:668px;padding:34px 44px;border-radius:30px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03));box-shadow:0 22px 56px rgba(0,0,0,.5),inset 0 0 0 1px rgba(255,255,255,.13)}',
  '.kc-row{position:absolute;left:44px;right:44px;display:flex;justify-content:space-between;align-items:baseline;white-space:nowrap}',
  '.kc-row .lb{font:600 34px/1 var(--f-body);color:#cfd8dc}',
  '.kc-row .v{font:700 78px/1 var(--f-display);letter-spacing:-.03em;font-variant-numeric:tabular-nums;color:#fff}',
  '.kc-row .v small{margin-left:14px;font:600 28px/1 var(--f-body);letter-spacing:0;color:#9fb0b7}',
  '.kc-row.d{top:40px}.kc-row.d .v{color:#5DE8F5}',
  '.kc-row.m{top:190px}.kc-row.m .v{color:#ffd25e}',
  '.kc-row.y{top:340px}.kc-row.y .v{font-size:118px;background:linear-gradient(180deg,#ffe27a,#ff9f45 60%,#ff4d4d);-webkit-background-clip:text;background-clip:text;color:transparent;filter:drop-shadow(0 6px 26px rgba(255,150,60,.35))}',
  '.kc-row.y .lb{font-size:38px}',
  '.kc-line{position:absolute;left:44px;right:44px;height:3px;border-radius:3px;background:linear-gradient(90deg,rgba(255,255,255,.35),rgba(255,255,255,.04))}',
  '.kc-line.l1{top:150px}.kc-line.l2{top:300px}',
  '.kc-foot{position:absolute;left:44px;right:44px;top:522px;font:500 34px/1.3 var(--f-body);color:#b9c3c7}',
  '.kc-foot b{color:#ff8a7a;font-weight:700}',
  '.kc-hint{position:absolute;left:100px;top:962px;font:500 26px/1 var(--f-body);color:#7f8d94}',
  '.kc .a1x{opacity:0;transform:translateY(22px);transition:opacity .35s ease,transform .35s ease}',
  '.kc.a1 .a1x{opacity:1;transform:none;transition:opacity .6s ease,transform .8s cubic-bezier(.22,.8,.3,1)}',
  '.kc.a1 .kc-row.y{transition-delay:.35s}.kc.a1 .kc-foot{transition-delay:.7s}',
  '.kc.static *,.kc.reduced *{transition:none!important;animation:none!important}.kc.static .rv,.kc.reduced .rv{opacity:1;transform:none}'
]);

function countUp(ctx, node, to, ms, done) {
  if (ctx.static || ctx.reduced) { node.textContent = fmt(to); if (done) done(); return; }
  var t0 = performance.now(), id = ctx.interval(function () {
    var p = Math.min(1, (performance.now() - t0) / ms);
    node.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
    if (p >= 1) { clearInterval(id); if (done) done(); }
  }, 33);
}

function sliderCard(cls, icon, label, sub, key) {
  return '<div class="kc-card ' + cls + ' rv" style="--d:' + (cls === 'tv' ? '.25' : '.4') + 's">' +
    '<div class="kc-ic">' + icon + '</div><div class="kc-lb">' + label + '<small>' + sub + '</small></div>' +
    '<div class="kc-val"><b>' + fh(KID[key]) + '</b><small>HOURS A DAY</small></div>' +
    '<input class="kc-rng pe" data-noadvance type="range" min="0" max="8" step="1" value="' + KID[key] + '" data-k="' + key + '" aria-label="' + label + ', hours a day">' +
    '<div class="kc-tk"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span></div></div>';
}

Deck.insertSlide({
  after: 'agenda-journey', id: 'kid-screen-time', title: 'How much time do you spend on screens?', section: 'problem',
  tr: { type: 'fade', ms: 800 }, loop: false, steps: 1,
  render: function (el, ctx) {
    var r = h('div', 'kc' + (ctx.static ? ' static a1' : '') + (ctx.reduced ? ' reduced' : ''), el);
    r.innerHTML =
      '<div class="kc-k rv" style="--d:.05s">Be honest!</div>' +
      '<h1 class="kc-t rv" style="--d:.15s">How much time do <em>you</em> spend on screens?</h1>' +
      sliderCard('tv', TV_ICON, 'Watching TV and videos', 'YouTube, Netflix, Shorts, cartoons', 'tv') +
      sliderCard('gm', PAD_ICON, 'Playing games', 'Phone, tablet, console, computer', 'gm') +
      '<div class="kc-res rv" style="--d:.55s">' +
        '<div class="kc-row d"><span class="lb">Every day</span><span class="v"><span class="dv">3.5</span><small>hours</small></span></div>' +
        '<div class="kc-line l1 a1x"></div>' +
        '<div class="kc-row m a1x"><span class="lb">In a month</span><span class="v"><span class="mv">105</span><small>hours</small></span></div>' +
        '<div class="kc-line l2 a1x"></div>' +
        '<div class="kc-row y a1x"><span class="lb">In a year</span><span class="v"><span class="yv">1,278</span><small>hours</small></span></div>' +
        '<div class="kc-foot a1x">That is <b class="fd">53</b> full days. Day and night, with no sleeping.</div>' +
      '</div>' +
      '<div class="kc-hint rv" style="--d:.8s">Drag the dots to your own numbers</div>';
    var q = function (s) { return r.querySelector(s); };
    var st = el.__kc = { r: r, dv: q('.dv'), mv: q('.mv'), yv: q('.yv'), fd: q('.fd'), counting: false };
    function paint() {
      var T = totals();
      st.dv.textContent = fh(T.day); st.mv.textContent = fmt(T.month); st.fd.textContent = T.days;
      if (!st.counting) st.yv.textContent = fmt(T.year);
      [].forEach.call(r.querySelectorAll('.kc-rng'), function (inp) {
        var k = inp.getAttribute('data-k'), card = inp.parentNode;
        card.querySelector('.kc-val b').textContent = fh(KID[k]);
        inp.style.setProperty('--p', (KID[k] / 8 * 100).toFixed(1) + '%');
      });
      publish();
    }
    st.paint = paint;
    [].forEach.call(r.querySelectorAll('.kc-rng'), function (inp) {
      inp.addEventListener('input', function () { KID[inp.getAttribute('data-k')] = +inp.value; paint(); });
      inp.addEventListener('pointerup', function () { setTimeout(function () { inp.blur(); }, 0); });   // keys go back to the deck
    });
    paint();
    if (ctx.static || ctx.reduced) r.classList.add('go');
  },
  enter: function (el, ctx) {
    var st = el.__kc; if (!st || ctx.static) return;
    st.paint(); void st.r.offsetWidth; st.r.classList.add('go');
  },
  step: function (el, i, ctx) {
    var st = el.__kc; if (!st) return;
    st.r.classList.add('a1'); st.counting = true;
    ctx.timeout(function () { countUp(ctx, st.yv, totals().year, 1100, function () { st.counting = false; st.paint(); }); }, 450);
  },
  unstep: function (el) { var st = el.__kc; if (!st) return; st.counting = false; st.r.classList.remove('a1'); st.paint(); }
});

/* ================================================================ 2. kid-books */
addCss('kc-books-css', [
  '.kb-card{position:absolute;left:104px;top:392px;width:600px;height:392px;padding:28px 38px;border-radius:26px;background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(255,255,255,.03));box-shadow:0 30px 70px rgba(0,0,0,.55),inset 0 0 0 1px rgba(255,255,255,.14)}',
  '.kb-card .hd{font:700 22px/1 var(--f-body);letter-spacing:.16em;text-transform:uppercase;color:#5DE8F5}',
  '.kb-card .ln{display:flex;justify-content:space-between;align-items:baseline;margin-top:22px;font:500 34px/1 var(--f-body);color:#cfd8dc;white-space:nowrap}',
  '.kb-card .ln b{font:700 40px/1 var(--f-display);color:#fff;font-variant-numeric:tabular-nums}',
  '.kb-card .rl{height:3px;margin-top:22px;border-radius:3px;background:linear-gradient(90deg,rgba(255,255,255,.5),rgba(255,255,255,.05))}',
  '.kb-card .ln.big{margin-top:22px;font-size:30px}.kb-card .ln.big b{font-size:52px;background:linear-gradient(180deg,#ffe27a,#ff9f45);-webkit-background-clip:text;background-clip:text;color:transparent}',
  '.kb-note{position:absolute;left:236px;top:1000px;font:500 25px/1 var(--f-body);color:#8f9ca3}',
  '.kb-t{width:780px!important}'
]);

Deck.insertSlide({
  after: 'kid-screen-time', id: 'kid-books', title: 'What can you do with all those hours?', section: 'problem',
  tr: { type: 'fade', ms: 800 }, loop: false,
  render: function (el, ctx) {
    var r = h('div', 's9' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
    r.innerHTML =
      '<div class="s9-k rv" style="--d:.05s">Swap the screen for the shelf</div>' +
      '<h1 class="s9-t kb-t rv" style="--d:.15s">What can you do in <em class="kb-h">1,278 hours</em>?</h1>' +
      '<div class="kb-card rv" style="--d:.45s"><div class="hd">Your year on screens</div>' +
        '<div class="ln"><span>TV and videos</span><b class="kb-tv"></b></div>' +
        '<div class="ln"><span>Games</span><b class="kb-gm"></b></div><div class="rl"></div>' +
        '<div class="ln"><span>Every day</span><b class="kb-dy"></b></div>' +
        '<div class="ln big"><span>&times; 365 days</span><b class="kb-yr"></b></div>' +
        '</div>' +
      '<div class="s9-photo rv" style="--d:.3s"><img src="media/image14.webp" alt=""></div>' +
      '<div class="s9-badge rv" style="--d:1.2s"><span class="n kb-n">0</span><span class="u">books</span></div>' +
      '<div class="kb-note rv" style="--d:1.6s">A book takes about ' + HOURS_PER_BOOK + ' hours to read</div>' +
      '<svg class="s9-arrow" viewBox="0 0 1920 1080" focusable="false" aria-hidden="true">' +
        '<defs><linearGradient id="kb-g" gradientUnits="userSpaceOnUse" x1="740" y1="840" x2="1050" y2="690"><stop stop-color="#ffe27a"/><stop offset="1" stop-color="#ff9f45"/></linearGradient>' +
        '<filter id="kb-glow" x="-30%" y="-60%" width="160%" height="220%"><feGaussianBlur stdDeviation="9"/></filter></defs>' +
        '<path d="M742 822C742 742 826 692 936 692L1010 692" pathLength="1" fill="none" stroke="#ffb940" stroke-width="22" stroke-linecap="round" filter="url(#kb-glow)" opacity=".55" class="shaft"/>' +
        '<path d="M742 822C742 742 826 692 936 692L1010 692" pathLength="1" fill="none" stroke="url(#kb-g)" stroke-width="15" stroke-linecap="round" class="shaft"/>' +
        '<path class="head" d="M1004 656L1068 692L1004 728Q1022 692 1004 656Z" fill="#ffb13d" stroke="#ffb13d" stroke-width="8" stroke-linejoin="round"/>' +
      '</svg>' +
      '<div class="s9-bubble rv" style="--d:3.1s">I read this many books a year, instead of watching screens. <em>Alhamdulillah!</em></div>';
    el.__kb = r; fill(r);
    if (ctx.static || ctx.reduced) r.querySelector('.kb-n').textContent = fmt(totals().books);
  },
  enter: function (el, ctx) {
    var r = el.__kb; if (!r || ctx.static || ctx.reduced) return;
    fill(r); var n = r.querySelector('.kb-n'), books = totals().books; n.textContent = '0';
    void r.offsetWidth; r.classList.add('go');
    ctx.timeout(function () { countUp(ctx, n, books, 1500); }, 1350);
  }
});
function fill(r) {
  var T = totals(), q = function (s) { return r.querySelector(s); };
  q('.kb-h').textContent = fmt(T.year) + ' hours';
  q('.kb-tv').textContent = fh(KID.tv) + ' h'; q('.kb-gm').textContent = fh(KID.gm) + ' h'; q('.kb-dy').textContent = fh(T.day) + ' h';
  q('.kb-yr').textContent = fmt(T.year) + ' hours';
}

/* ================================================================ 3. kid-light + 4. kid-sleep */
addCss('kc-light-css', [
  '.kl{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink);overflow:hidden;background:radial-gradient(ellipse 900px 600px at 50% 46%,rgba(255,255,255,.07),transparent 70%)}',
  '.kl *{box-sizing:border-box}',
  '.kl .rv{opacity:0}.kl.go .rv{animation:kl-rise .8s cubic-bezier(.22,.8,.3,1) var(--d,0s) both}',
  '@keyframes kl-rise{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}',
  '.kl-t{position:absolute;left:0;right:0;top:34px;margin:0;text-align:center;font:600 84px/1.05 var(--f-display);letter-spacing:-.035em;white-space:nowrap}',
  '.kl-t em{font-style:italic;color:#fff2b8;text-shadow:0 0 40px rgba(255,244,190,.5)}',
  '.kl-fig{position:absolute;top:176px;width:880px;height:587px;margin:0;border-radius:30px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.65),0 0 0 2px rgba(255,255,255,.5),0 0 90px rgba(255,255,255,.28)}',
  '.kl-fig.a{left:60px}.kl-fig.b{left:980px}',
  '.kl-fig img{display:block;width:100%;height:100%;object-fit:cover}',
  '.kl-fig .hot{position:absolute;inset:0;border-radius:inherit;opacity:0;transition:opacity .9s ease;background:rgba(6,10,24,.18)}',
  '.kl.fry .kl-fig .hot{opacity:1}',
  '.kl-fig figcaption{position:absolute;left:24px;bottom:22px;padding:12px 24px;border-radius:99px;font:700 34px/1 var(--f-body);color:#fff;background:rgba(6,10,14,.72);box-shadow:inset 0 0 0 2px rgba(255,255,255,.35)}',
  '.kl-cap{position:absolute;left:60px;right:60px;text-align:center;font:600 54px/1.15 var(--f-display);letter-spacing:-.02em}',
  '.kl-cap.c1{top:816px;color:#fff}.kl-cap.c1 b{color:#fff2b8}',
  '.kl-cap.c2{top:904px;color:#b9c7ff;opacity:0;transform:translateY(18px);transition:opacity .5s ease,transform .6s cubic-bezier(.22,.8,.3,1)}',
  '.kl.fry .kl-cap.c2{opacity:1;transform:none;transition-delay:.35s}',
  '.kl.static *,.kl.reduced *{transition:none!important;animation:none!important}.kl.static .rv,.kl.reduced .rv{opacity:1;transform:none}',
  /* sleep grid */
  '.ks-s{position:absolute;width:590px;height:393px;border-radius:26px;background:radial-gradient(ellipse at 50% 40%,rgba(255,255,255,.05),transparent 70%),linear-gradient(180deg,#121d23,#0b1317);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;font:600 170px/1 var(--f-display);color:rgba(255,255,255,.07)}',
  '.ks-p{position:absolute;width:590px;height:393px;border-radius:26px;overflow:hidden;background:#0c1418;box-shadow:0 24px 60px rgba(0,0,0,.6),0 0 0 1px rgba(255,255,255,.16);opacity:0;transform:scale(.93) translateY(24px);transition:opacity .55s ease,transform .7s cubic-bezier(.22,.9,.3,1)}',
  '.ks-p.on{opacity:1;transform:none}',
  '.ks-p img{display:block;width:100%;height:100%;object-fit:cover}',
  '.ks-p .sh{position:absolute;inset:0;background:linear-gradient(180deg,rgba(5,8,11,0) 55%,rgba(5,8,11,.88) 100%)}',
  '.ks-p .n{position:absolute;left:18px;top:16px;width:50px;height:50px;border-radius:50%;display:flex;align-items:center;justify-content:center;font:800 28px/1 var(--f-body);color:#07121a;background:var(--c);box-shadow:0 6px 18px rgba(0,0,0,.5)}',
  '.ks-p .tx{position:absolute;left:22px;right:22px;bottom:16px;font:700 38px/1.08 var(--f-body);letter-spacing:-.02em;color:#fff;text-shadow:0 2px 14px rgba(0,0,0,.85)}',
  '.ks.static .ks-p,.ks.reduced .ks-p{opacity:1;transform:none;transition:none}'
]);

Deck.insertSlide({
  after: 'hours-tiles', id: 'kid-light', title: 'Bright screen light, straight into your eyes', section: 'problem',
  tr: { type: 'fade', ms: 800 }, loop: false, steps: 1,
  render: function (el, ctx) {
    var r = h('div', 'kl' + (ctx.static ? ' static fry' : '') + (ctx.reduced ? ' reduced' : ''), el);
    r.innerHTML =
      '<h1 class="kl-t rv" style="--d:.05s">Screens shine <em>bright white light</em> into your eyes</h1>' +
      '<figure class="kl-fig a rv" style="--d:.3s"><img src="media/child/tv.webp' + IMG_V + '" alt="A boy sitting close to a TV, bright white light streaming into his eyes"><div class="hot"></div><figcaption>TV</figcaption></figure>' +
      '<figure class="kl-fig b rv" style="--d:.5s"><img src="media/child/tablet.webp' + IMG_V + '" alt="A girl on a tablet, bright white light streaming into her eyes"><div class="hot"></div><figcaption>Tablet</figcaption></figure>' +
      '<div class="kl-cap c1 rv" style="--d:.9s">The light goes in. <b>Your brain gets no rest.</b></div>' +
      '<div class="kl-cap c2">Your brain gets tired and exhausted.</div>';
    el.__kl = r;
    if (ctx.static || ctx.reduced) r.classList.add('go');
  },
  enter: function (el, ctx) { var r = el.__kl; if (!r || ctx.static) return; void r.offsetWidth; r.classList.add('go'); },
  step: function (el) { var r = el.__kl; if (r) r.classList.add('fry'); },
  unstep: function (el) { var r = el.__kl; if (r) r.classList.remove('fry'); }
});

var SLEEP = [
  { img: 'sleep-awake', t: 'Can’t fall asleep', c: '#5DE8F5' },
  { img: 'sleep-brain', t: 'Body asleep, brain awake', c: '#b58cff' },
  { img: 'sleep-tired', t: 'Wakes up tired', c: '#ffd25e' },
  { img: 'sleep-class', t: 'Dozing off in class', c: '#ff9f45' },
  { img: 'sleep-angry', t: 'Angry with Mum and Dad', c: '#ff6b6b' },
  { img: 'sleep-exam', t: 'Fails the exam', c: '#ff5a8a' }
];
Deck.insertSlide({
  after: 'kid-light', id: 'kid-sleep', title: 'When screens steal your sleep', section: 'problem',
  tr: { type: 'fade', ms: 800 }, loop: false, steps: SLEEP.length - 1,
  render: function (el, ctx) {
    var r = h('div', 'kl ks' + (ctx.static ? ' static' : '') + (ctx.reduced ? ' reduced' : ''), el);
    r.innerHTML = '<h1 class="kl-t rv" style="--d:.05s">Then screens steal your <em>sleep</em></h1>' +
      SLEEP.map(function (s, i) {
        var x = 45 + (i % 3) * 620, y = 150 + Math.floor(i / 3) * 423;
        return '<div class="ks-s" style="left:' + x + 'px;top:' + y + 'px">' + (i + 1) + '</div>' +
          '<div class="ks-p" style="left:' + x + 'px;top:' + y + 'px;--c:' + s.c + '"><img src="media/child/' + s.img + '.webp' + IMG_V + '" alt="' + s.t + '"><div class="sh"></div>' +
          '<div class="n">' + (i + 1) + '</div><div class="tx">' + s.t + '</div></div>';
      }).join('');
    el.__ks = { r: r, p: [].slice.call(r.querySelectorAll('.ks-p')) };
    el.__ks.p.forEach(function (p, i) { p.classList.toggle('on', i === 0 || ctx.static); });
    if (ctx.static || ctx.reduced) r.classList.add('go');
  },
  enter: function (el, ctx) { var st = el.__ks; if (!st || ctx.static) return; void st.r.offsetWidth; st.r.classList.add('go'); },
  step: function (el, i) { var st = el.__ks; if (st && st.p[i]) st.p[i].classList.add('on'); },
  unstep: function (el, i) { var st = el.__ks; if (st && st.p[i]) st.p[i].classList.remove('on'); }
});
})();
