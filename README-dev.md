# Deck dev notes (extension API)

Open `index.html` from disk (file://). Classic scripts only, no network. Stage = 1920x1080 px, auto-scaled.
Data: `assets/js/slides-data.js` was originally generated (`scripts/gen_slides.py`, no longer in the repo); slides are in show order, each with a unique `id`. Edit surgically; see `SLIDES.md` for the slide map.
Load order: slides-data, engine, loops, ui, `custom/*.js` (add your own `<script>` in index.html), boot.

## Registering / inserting slides (put code in `assets/js/custom/<name>.js`)
```js
Deck.registerSlide('signs-of-addiction', spec)  // override/augment a slide by id (base or inserted)
Deck.insertSlide({after: 'year-gone', id: 'my-slide', title: '...', section: 'problem',
                  tr: {type: 'fade', ms: 800}, ...spec})   // new slide after slide 'year-gone'; id must be unique
// spec (all optional):
{ render(el, ctx),            // build DOM into el (1920x1080 layer, px coords). Replaces base elements...
  keepBase: true,             // ...unless keepBase: base converted elements stay, el is an overlay
  enter(el, ctx), leave(el, ctx),             // after transition ends / before leaving
  steps: n, step(el, i, ctx), unstep(el, i, ctx),   // n extra click-builds (i = 1..n); unstep reverses on Back
  calm: bool,                 // true = no decorative loops (video slides are calm automatically)
  loop: 'orbs' | ['aurora','float'] | false }       // override ambient loops
```
Speaker notes live in `notes.json` ({id: text}); `Deck.loadNotes()` (boot.js) loads it before `Deck.start()`; file:// falls back to `assets/js/notes-data.js` (`python3 scripts/sync_notes.py`).
Insert order: several inserts with the same `after` keep call order; `after` may be any slide id, including an insert registered later.
`tr.type`: fade | slide (pageturn, peel = aliases) | circle | wipe | cover | pull | none | morph(only between neighbouring slides).
`ctx`: `{deck, slide, el, root, n, id, section, step, steps, static, W, H, reduced}` plus helpers
`ctx.onLeave(fn)`, `ctx.timeout(fn,ms)`, `ctx.interval(fn,ms)`, `ctx.tick((dt,t)=>..)` (rAF, auto-stopped), `ctx.q/qa(sel)`, `ctx.elapsed()`.
`ctx.static` is true when rendered as overview/presenter thumbnail: draw the end state, no timers.
Clicks on `a, button, input, select, textarea, video, .chip, [data-noadvance]` do not advance the deck; everything else in `el` does
(`el` itself ignores the pointer: give interactive nodes class `pe` so they get events, plus `data-noadvance` if they are not one of those tags). Keys: set `Deck.keyHook = ev => handled?`.

## Useful API
`Deck.next/prev/first/last()`, `Deck.goto(idOrNumber)`, `Deck.gotoNumber(n)` (n-th visible slide; what typed digits + Enter use), `Deck.number(slide)` (= `slide.n`), `Deck.cur` (slide), `Deck.view` (live DOM/state), `Deck.order()`,
`Deck.toast(msg)`, `Deck.lightbox(src)`, `Deck.on('enter'|'leave'|'step'|'show'|'state', fn)`,
`Deck.renderStatic(slide, container)`. Slide object: `{n, key, id, pos, hidden, section, tr, notes, calm, loop, els, steps}` (`key` = `id`; `n` = 1-based position, 0 if hidden).
Debug: `#/<id>` or `#/N` opens a slide; `Loops.assign(slide)` shows the loops chosen.

## Loops (ambient, `loops.js`)
orbs, particles, embers, kenburns, float, pulse, shimmer, scan, stars, aurora, grid, underline, caret, calm.
Auto-assigned by section + content (cards -> float, big numbers -> pulse, full-bleed photo -> kenburns, mono text -> caret/scan,
video -> calm), rotated by slide number. Add your own: `Loops.lib.myloop = (view) => { ...; return cleanup }`.

## CSS tokens / classes (`deck.css`)
Colours: `--bg0 --bg1 --ink --ink2 --muted --cyan --amber --red --green --violet --glass --glass-b`; section accent `--acc`,
glow triplets `--g1 --g2` ("r,g,b"). Fonts: `--f-display` (Fraunces), `--f-body` (Inter), `--f-mono` (JetBrains Mono).
Classes: `.card` (glass panel), `.stitle` (big serif title), `.ssub`, `.bignum`, `.pill`, `.chip`, `.acc-cyan|amber|red|green|violet`,
`.glow-cyan|amber|red`, `.pic.card` (floating screenshot: rounded, shadow, tilt, click-to-zoom), `.vid`.
Easing: `var(--ease)` = cubic-bezier(.65,0,.35,1). Animate with transform/opacity only; honour `ctx.reduced`.

## Element data (generated slides)
`els[]`: `{id,k:'pic|ink|text|shape|video|audio|embed|line',x,y,w,h (% of stage),rot,z,src,crop,mk (morph key),hide0,...}`.
`steps[]`: `{auto, fx:[{ids,t,d,do:'in|out|emph|play',a,dir,p}]}` (auto steps run on entry; others = one click each).
Morph pairs share `mk` (see `scripts/gen_slides.py` MORPH_SLIDES / ALIAS); slide 60 has `tr.rise` for new chat bubbles.
Source URLs become `slide.chips`. Videos: H.264 mp4 (Chrome/Edge/Safari play it; Playwright's Chromium cannot).
