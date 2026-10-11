/* ============================================================================
   sky.js - ONE global canvas that sits behind the whole stage (#skycv in #viewport).
   It is created once and never rebuilt per slide, so stars and embers flow continuously across slide changes.
     - 3 parallax star layers (twinkling, very slow drift, slight mouse parallax)
     - fire ash: glowing embers and grey ash flakes drift up from the bottom edge, swaying in a slow
       draught, cooling from yellow-orange to deep red as they rise; a faint heat glow breathes along the bottom
     - modes: full | calm (video slides: sparse, dim) | groom (deeper red, a little denser) | off (layer hidden)
     - pauses when the tab is hidden or the overview is open; prefers-reduced-motion -> one static frame of stars
   API: window.Sky = { mode(name), state() }
   ============================================================================ */
(function () {
'use strict';
var cv = document.getElementById('skycv'); if (!cv) return;
var g = cv.getContext('2d');
var DPR = 1, VW = 1920, VH = 1080, raf = 0, last = 0, running = false;
var reduced = false; try { reduced = matchMedia('(prefers-reduced-motion: reduce)').matches; } catch (e) {}

var mode = 'full';
var fade = 1, fadeT = 1;               // layer opacity (eases toward fadeT)
var heat = 1, heatT = 1;               // ember density / glow strength per mode (eases)
var red = 0, redT = 0;                 // 0 = fire orange, 1 = deep blood red (grooming section)

/* ---- deterministic random for a stable starfield ---- */
function rng(seed) { var s = seed >>> 0 || 1; return function () { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }

/* ---- stars: 3 layers ---- */
var LAYERS = [
  { n: 170, r0: .6, r1: 1.1, a0: .4, a1: .8,  par: 6,  drift: 1.2 },
  { n: 90,  r0: .8, r1: 1.4, a0: .55, a1: 1, par: 15, drift: 2.6 },
  { n: 38,  r0: 1.2, r1: 2.1, a0: .6, a1: 1,   par: 32, drift: 5 }
];
var stars = [];
function buildStars() {
  var r = rng(20260), area = (VW * VH) / (1920 * 1080);
  stars = [];
  LAYERS.forEach(function (L, li) {
    var n = Math.round(L.n * Math.max(.6, area));
    for (var i = 0; i < n; i++) {
      var tint = r(), col = tint < .72 ? '244,241,234' : tint < .86 ? '170,235,248' : tint < .95 ? '255,214,150' : '190,255,225';
      stars.push({ l: li, x: r() * VW, y: r() * VH, rad: L.r0 + r() * (L.r1 - L.r0), a: L.a0 + r() * (L.a1 - L.a0),
        p: r() * 6.283, v: .5 + r() * 1.7, col: col });
    }
  });
}

/* ---- fire ash ---- */
var MAX = 220;                         // fuller ember bed, with a mix of distant sparks and close flakes
var ash = [], spawnAcc = 0, clock = 0;
var mx = 0, my = 0, tmx = 0, tmy = 0;
var glowSprites = [];

// Bake soft light falloff once. No hard-edged circles or per-particle blur filters.
function buildGlowSprites() {
  for (var tint = 0; tint < 2; tint++) {
    glowSprites[tint] = [];
    for (var j = 0; j < 6; j++) {
      var tile = document.createElement('canvas'); tile.width = tile.height = 64;
      var c = tile.getContext('2d'), gr = c.createRadialGradient(32, 32, 0, 32, 32, 32);
      var col = tint ? '230,55,32' : '255,' + (65 + j * 23) + ',' + (12 + j * 9);
      gr.addColorStop(0, 'rgba(' + col + ',.65)');
      gr.addColorStop(.12, 'rgba(' + col + ',.28)');
      gr.addColorStop(.34, 'rgba(' + col + ',.07)');
      gr.addColorStop(.68, 'rgba(' + col + ',.012)');
      gr.addColorStop(1, 'rgba(' + col + ',0)');
      c.fillStyle = gr; c.fillRect(0, 0, 64, 64); glowSprites[tint].push(tile);
    }
  }
}
function spawnAsh(prewarm) {
  var flake = Math.random() < .3, k = Math.max(.6, VH / 1080);
  var depth = Math.pow(Math.random(), 1.8), phase = Math.random() * 6.283;
  // Broad, shifting updrafts, with a few stray sparks between them.
  var plume = Math.floor(Math.random() * 4);
  var x = (plume + .5) * VW / 4 + Math.sin(clock * .15 + plume * 2) * VW * .065;
  x += (Math.random() + Math.random() - 1) * VW * .21;
  if (Math.random() < .22) x = Math.random() * VW;
  var life = 5 + Math.random() * 8, speed = (34 + depth * 48 + Math.random() * 32) * k;
  if (flake) { life *= 1.3; speed *= .62; }
  var age = prewarm ? Math.random() * life * .95 : 0;
  var shape = [];
  for (var j = 0; j < 5; j++) {
    var angle = j * 6.283 / 5, radius = .55 + Math.random() * .55;
    shape.push([Math.cos(angle) * radius, Math.sin(angle) * radius]);
  }
  ash.push({
    flake: flake, x: x, y: VH + 12 - speed * age * .83,
    vx: 0, vy: -speed, speed: speed, depth: depth,
    r: flake ? 1.1 + depth * 2.8 : .7 + depth * 1.9,
    rot: phase, vr: (Math.random() - .5) * 3, shape: shape,
    phase: phase, flicker: 3 + Math.random() * 5,
    a: .45 + Math.random() * .55, age: age, life: life
  });
}
function lerp(a, b, t) { return a + (b - a) * t; }
/* colour of an ember by "temperature" (1 hot .. 0 cold), mixed toward blood red in the grooming section */
function emberCol(temp, alpha) {
  var r = 255, gg, b;
  if (temp > .6) { gg = lerp(120, 205, (temp - .6) / .4); b = lerp(30, 90, (temp - .6) / .4); }
  else { gg = lerp(28, 120, temp / .6); b = lerp(18, 30, temp / .6); r = lerp(170, 255, temp / .6); }
  r = lerp(r, 190, red * .6); gg = lerp(gg, 18, red * .7); b = lerp(b, 26, red * .5);
  return 'rgba(' + (r | 0) + ',' + (gg | 0) + ',' + (b | 0) + ',' + alpha.toFixed(3) + ')';
}

function drawAsh(dt, t) {
  var wind = Math.sin(t * .19) * 12 + Math.sin(t * .071 + 1.7) * 18;
  for (var i = ash.length - 1; i >= 0; i--) {
    var p = ash[i]; p.age += dt;
    var h = p.age / p.life;
    if (h >= 1 || p.y < -24 || p.x < -80 || p.x > VW + 80) { ash.splice(i, 1); continue; }
    // Smooth turbulence with inertia: neighbouring particles share a draught,
    // while small eddies and tumbling give each flake its own path.
    var eddy = Math.sin(p.y * .012 + t * .8 + p.phase) * 17 + Math.sin(p.x * .008 - t * .53) * 11;
    var response = 1 - Math.exp(-dt * (p.flake ? 1.1 : 2.2));
    p.vx += (wind + eddy * (.45 + p.depth) - p.vx) * response;
    p.vy += (-p.speed * (1 - h * .48) + Math.sin(t * 1.3 + p.phase) * 8 - p.vy) * response;
    p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
    var x = p.x - mx * (3 + p.depth * 9), y = p.y - my * (2 + p.depth * 4);
    var env = Math.min(1, p.age / .45) * Math.pow(Math.max(0, 1 - h), .75);
    var temp = Math.max(0, 1 - h * 1.3);
    var flutter = .58 + .42 * Math.abs(Math.sin(p.rot * 1.7 + p.phase));
    var flicker = .78 + .14 * Math.sin(t * p.flicker + p.phase) + .08 * Math.sin(t * p.flicker * 2.37);
    var A = p.a * env * fade * (.25 + .75 * heat);
    if (p.flake || temp < .12) {
      // Uneven charcoal chips, turning edge-on and briefly catching the firelight.
      g.globalCompositeOperation = 'source-over';
      g.save(); g.translate(x, y); g.rotate(p.rot); g.scale(1, .18 + flutter * .65);
      g.fillStyle = 'rgba(177,159,139,' + (.50 * A * flutter).toFixed(3) + ')';
      g.beginPath();
      for (var j = 0; j < p.shape.length; j++) {
        var pt = p.shape[j];
        if (!j) g.moveTo(pt[0] * p.r, pt[1] * p.r);
        else g.lineTo(pt[0] * p.r, pt[1] * p.r);
      }
      g.closePath(); g.fill();
      if (temp > .45) {
        g.strokeStyle = emberCol(temp, .35 * A * flutter); g.lineWidth = .55;
        g.beginPath(); g.moveTo(-p.r * .65, 0); g.lineTo(0, -p.r * .65); g.stroke();
      }
      g.restore();
    } else {
      var light = Math.min(1, 1.45 * A * flicker * (.4 + .6 * temp)), size = p.r * (10 + p.depth * 6);
      var bin = Math.min(5, Math.floor(temp * 6));
      g.globalCompositeOperation = 'lighter';
      g.globalAlpha = light * (1 - red * .65);
      g.drawImage(glowSprites[0][bin], x - size / 2, y - size / 2, size, size);
      if (red > .01) {
        g.globalAlpha = light * red * .65;
        g.drawImage(glowSprites[1][bin], x - size / 2, y - size / 2, size, size);
      }
      g.globalAlpha = 1;
      // Short, tapered-looking spark streaks follow actual velocity.
      if (p.depth > .35) {
        g.strokeStyle = emberCol(temp, light * .23); g.lineWidth = p.r * .75; g.lineCap = 'round';
        g.beginPath(); g.moveTo(x - p.vx * .035, y - p.vy * .035); g.lineTo(x, y); g.stroke();
      }
      g.save(); g.translate(x, y); g.rotate(p.rot);
      g.fillStyle = emberCol(Math.min(1, temp + .18), light * .95);
      g.beginPath(); g.ellipse(0, 0, p.r * (.5 + flutter * .25), p.r * 1.2, 0, 0, 6.283); g.fill();
      if (temp > .65 && p.depth > .45) {
        g.fillStyle = 'rgba(255,237,187,' + (light * .7).toFixed(3) + ')';
        g.fillRect(-p.r * .2, -p.r * .35, p.r * .4, p.r * .7);
      }
      g.restore();
    }
  }
  g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
}
/* faint heat along the bottom edge: an uneven, breathing glow */
function drawHeat(t) {
  var b = (.55 + .2 * Math.sin(t * .9) + .12 * Math.sin(t * 2.3 + 1) + .08 * Math.sin(t * 5.1)) * heat * fade;
  if (b <= .01) return;
  var hh = VH * .25, gr = g.createLinearGradient(0, VH, 0, VH - hh);
  gr.addColorStop(0, emberCol(.55, .13 * b)); gr.addColorStop(.35, emberCol(.35, .035 * b)); gr.addColorStop(1, emberCol(.3, 0));
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = gr; g.fillRect(0, VH - hh, VW, hh);
  for (var k = 0; k < 3; k++) {                                                  // slow-moving hot spots
    var cx = VW * (.18 + .32 * k) + Math.sin(t * (.11 + k * .04) + k * 2) * VW * .08, r = VW * .22;
    var rg = g.createRadialGradient(cx, VH + r * .35, 0, cx, VH + r * .35, r);
    rg.addColorStop(0, emberCol(.6, .12 * b * (.7 + .3 * Math.sin(t * (1.3 + k * .4) + k)))); rg.addColorStop(1, emberCol(.4, 0));
    g.fillStyle = rg; g.fillRect(cx - r, VH - r, r * 2, r);
  }
  g.globalCompositeOperation = 'source-over';
}

function draw(dt, t) {
  g.setTransform(DPR, 0, 0, DPR, 0, 0);
  g.clearRect(0, 0, VW, VH);
  if (fade < .01) return;
  var calm = mode === 'calm';
  g.globalCompositeOperation = 'source-over';
  /* stars */
  for (var i = 0; i < stars.length; i++) {
    var s = stars[i], L = LAYERS[s.l];
    var tw = calm ? .8 + .2 * Math.sin(s.p + t * s.v * .45) : .35 + .65 * (.5 + .5 * Math.sin(s.p + t * s.v));
    var x = s.x - mx * L.par, y = s.y - my * L.par;
    if (!reduced && !calm) { s.y += L.drift * dt; s.x -= L.drift * .35 * dt; if (s.y > VH + 4) { s.y = -4; s.x = Math.random() * VW; } if (s.x < -4) s.x = VW + 4; }
    var a = s.a * tw * fade * (calm ? .8 : 1);
    g.fillStyle = 'rgba(' + s.col + ',' + a.toFixed(3) + ')';
    if (s.rad < 1.1) g.fillRect(x - s.rad, y - s.rad, s.rad * 2, s.rad * 2);
    else {
      g.beginPath(); g.arc(x, y, s.rad, 0, 6.283); g.fill();
      if (s.rad > 1.55 && tw > .75) {   // brightest twinkles get a tiny cross-flare
        g.fillStyle = 'rgba(' + s.col + ',' + (a * .35).toFixed(3) + ')';
        g.fillRect(x - s.rad * 3.4, y - .4, s.rad * 6.8, .8); g.fillRect(x - .4, y - s.rad * 3.4, .8, s.rad * 6.8);
      }
    }
  }
  if (reduced) return;
  drawHeat(t);
  drawAsh(dt, t);
}

function tick(ts) {
  if (!running) return; raf = requestAnimationFrame(tick);
  var t = ts / 1000, dt = Math.min(.05, last ? t - last : .016); last = t; clock += dt;
  var e = 1 - Math.exp(-dt * 1.6);
  fade += (fadeT - fade) * (1 - Math.exp(-dt * 3)); heat += (heatT - heat) * e; red += (redT - red) * e;
  mx += (tmx - mx) * (1 - Math.exp(-dt * 3)); my += (tmy - my) * (1 - Math.exp(-dt * 3));
  // keep the ember count near its target: a new one roughly every (life / target) seconds
  var target = MAX * heat * Math.max(.6, VW / 1920);
  spawnAcc += dt * target / 10;
  while (spawnAcc >= 1) { spawnAcc -= 1; if (ash.length < target * 1.3) spawnAsh(); }
  draw(dt, t);
}

/* ---- run control: only animate when it can be seen ---- */
function sync() {
  var want = !reduced && !document.hidden && !(window.Loops && Loops.paused) && !(window.Deck && Deck.mode === 'presenter');
  if (want && !running) { running = true; last = 0; raf = requestAnimationFrame(tick); }
  else if (!want && running) { running = false; cancelAnimationFrame(raf); }
  if (reduced || !want) staticFrame();
}
function staticFrame() { g.setTransform(DPR, 0, 0, DPR, 0, 0); if (reduced) { fade = fadeT; draw(0, 3); } }

function resize() {
  var w = innerWidth || 1920, h = innerHeight || 1080;
  DPR = Math.min(window.devicePixelRatio || 1, 1.5);
  VW = w; VH = h;
  cv.width = Math.round(w * DPR); cv.height = Math.round(h * DPR);
  buildStars(); staticFrame();
  ash = []; // reseed at the new viewport size, with physically consistent particle ages
  if (!reduced) for (var i = 0; i < MAX * .7 * Math.max(.6, VW / 1920); i++) spawnAsh(true);
}

/* ---- slide wiring ---- */
var HEAT = { full: 1, groom: 1.15, calm: .45, off: 0 };
function setMode(m) { mode = m; fadeT = m === 'off' ? 0 : 1; heatT = HEAT[m] == null ? 1 : HEAT[m]; }
function apply(slide) {
  if (!slide) return;
  var m = 'full';
  if (slide.section === 'grooming') m = 'groom';
  if (window.Deck && Deck.isCalm && Deck.isCalm(slide)) m = 'calm';
  if (/^shepherd/.test(String(slide.id || slide.key))) m = 'off';
  setMode(m); redT = slide.section === 'grooming' ? 1 : 0;
  if (reduced) { fade = fadeT; staticFrame(); }
}

addEventListener('resize', resize);
addEventListener('mousemove', function (e) { tmx = (e.clientX / VW - .5); tmy = (e.clientY / VH - .5); }, { passive: true });
document.addEventListener('visibilitychange', sync);
if (window.Loops) { var sp = Loops.setPaused; Loops.setPaused = function (p) { sp && sp.apply(Loops, arguments); sync(); }; }
if (window.Deck) {
  Deck.on('show', function (s) { apply(s); });
  Deck.on('ready', function () { apply(Deck.cur); sync(); });
}
buildGlowSprites(); resize(); sync();
window.Sky = { mode: setMode,
  state: function () { return { mode: mode, embers: ash.length, running: running, fade: fade, heat: heat, red: red, stars: stars.length, dpr: DPR }; } };
})();
