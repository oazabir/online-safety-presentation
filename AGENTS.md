# Online Safety & Device Addiction — presentation

An HTML slide deck by Omar Al Zabir (Kahf.co) on children's online safety and device addiction.
It is a **static, offline, vanilla-JS deck**: no build step, no npm, no network. Open `index.html` from disk
(`file://`) or serve the folder (`.claude/launch.json` defines a `deck` server: `python3 -m http.server 8765`).
Videos are H.264 mp4 — use Chrome/Edge/Safari (Playwright's Chromium cannot play them).

`README-dev.md` is the full extension-API reference (spec fields, `ctx` helpers, CSS tokens, loops). Read it before
writing slide code. This file explains how the pieces fit together and how to change things safely.

## Layout

```
index.html                  shell: DOM hooks + ordered <script> tags (load order matters)
assets/css/deck.css         all base styling, design tokens, transitions
assets/fonts/               Fraunces (display), Inter (body), JetBrains Mono — local woff2
assets/js/slides-data.js    GENERATED: window.DECK_DATA = {w,h,slides:[{n,id,orig,section,tr,notes,els,steps,...}]}
assets/js/engine.js         Deck core: render, transitions, build steps, registerSlide/insertSlide, goto
assets/js/loops.js          ambient animation loops (orbs, aurora, embers, …), auto-assigned per slide
assets/js/ui.js             presenter tools: keys, overview, presenter window, laser, spotlight, magnifier
assets/js/sky.js            background night-sky canvas
assets/js/custom/part-a.js  hand-built slides for original #1–47 (+ inserted live counter, calculator)
assets/js/custom/part-b.js  hand-built slides for original #48–112 (+ closing slide "shepherd")
assets/js/custom/part-c.js  latest revision pass; loaded after a/b so it overrides them
assets/js/custom/part-d.js  interactive rebuilds of on-screen 4, 5, 7 (orig #7 Gallup chart, #8 hours x 365, #10 hour tiles)
assets/js/custom/topic-bar.js  bottom topic progress bar (6 topics, `TOPICS[].from` = first slide; `T` toggles it)
assets/js/boot.js           calls Deck.start(); must stay last
media/                      images, mp4 videos, plus charts/ hours/ ink/ kahfkids/ posters/ whatsapp/ subfolders
                            (hours/ = Codex-generated tile photos for #10)
.claude/launch.json         local preview server config
```

`.remember/` is tool state, not part of the deck (git-ignored).

## How the deck is built (mental model)

1. **`slides-data.js`** is the base deck, converted from the original PowerPoint: 72 slides, each an `els[]` list of
   pictures/text/shapes/videos positioned in % of a 1920×1080 stage, plus `steps[]` click-builds. Slide `n` is the
   position in the data; **`orig` is the original PowerPoint number and is the stable key** used everywhere
   (`Deck.goto(41)`, `registerSlide(41, …)`, URL `#/41`). Sections: `problem`, `why`, `treat`, `grooming`,
   `protect`, `evidence`.
2. **`engine.js`** renders each slide from that data. A slide can be **overridden** with
   `Deck.registerSlide(orig, spec)` or **added** with `Deck.insertSlide({after, id, …spec})`.
3. **`custom/part-*.js`** are the real authoring surface. Each is a self-contained IIFE that injects its own `<style>`
   (ids like `part-a-css`, class prefixes `pa-`, `pc-` …), registers/inserts slides, and may patch `DECK_DATA` in
   place (e.g. part-c hides slide 98 via `byN[98].hidden = true`).
4. **Hidden slides** (`hidden: true`) exist but are skipped in the show order — used for the live counter,
   calculator and alternate closers. `Deck.order()` is the visible sequence; `Deck.slides` is everything.
5. Later scripts win: `registerSlide` merges with `Object.assign`, so part-c can override part-a/b for the same slide.

## Running and previewing

- Open `index.html`, or `python3 -m http.server 8765 --bind 127.0.0.1` and visit `http://127.0.0.1:8765/`.
- Jump to a slide: `#/N` (original number or inserted id), or type digits + Enter while presenting.
- Keys: arrows/Space/PgUp/PgDn navigate, `O` overview, `P` presenter window (syncs over BroadcastChannel),
  `F` fullscreen, `B` blackout, `L` laser, `S` spotlight, `Z` magnifier, `?` help.
- Debug: `Loops.assign(slide)` shows which ambient loops a slide got; `Deck.cur`, `Deck.view` expose live state.
- After any change, load the deck, step through the touched slide **forward and backward** (Back must undo builds via
  `unstep`), open the overview (`O`) to check the static render, and watch the console for errors — `engine.js`
  wraps slide hooks in `safe()` so a broken hook logs a warning instead of crashing.

## Making modifications

### Change an existing slide's look or behaviour
Edit the `registerSlide(<orig>, …)` block in the custom file that owns it (grep `registerSlide(41` across
`assets/js/custom/`). If none exists, add one — preferably in `part-c.js` (the newest revision layer). Use
`keepBase: true` to keep the converted pictures/text and just add an overlay; omit it to replace the slide entirely.

### Add a new slide
```js
Deck.insertSlide({ after: 96, id: 'my-slide', title: '…', section: 'protect',
  tr: { type: 'fade', ms: 800 }, notes: 'speaker notes',
  render(el, ctx) { /* build DOM into el, 1920×1080 px coords */ },
  steps: 2, step(el, i, ctx) { /* click-build i */ }, unstep(el, i, ctx) { /* reverse on Back */ } });
```
`after` is an original number or another inserted id. Set `hidden: true` for a slide you want available but not in
the default run. Inserted slides get their own `id` as key (`#/my-slide`).

### Rules for custom slide code
- Classic scripts only (no modules, no bundler, no CDN). Keep it working from `file://`.
- Scope CSS with a unique class prefix and inject it from JS, as the existing parts do; don't leak global selectors.
- Animate with `transform`/`opacity` only; honour `ctx.reduced`; draw the final state when `ctx.static` is true
  (overview/presenter thumbnails render with no timers).
- Use `ctx.timeout / ctx.interval / ctx.tick / ctx.onLeave` instead of raw `setTimeout`/`rAF` so everything is
  cleaned up on slide exit.
- Interactive nodes need class `pe` to receive pointer events at all, **and** `data-noadvance` (or be an
  `a/button/input/select/textarea`) or the click also advances the deck (`onStageClick` in `engine.js`).
- Don't use `all:unset` on buttons without re-adding `pointer-events:auto`: it inherits `none` from `.custom`.
- New script file: create `assets/js/custom/<name>.js` and add a `<script>` tag in `index.html` **before the
  `<!-- CUSTOM-SCRIPTS-END -->` marker** (and therefore before `boot.js`). Order = override priority.

### Change text, images, or speaker notes of an un-customised slide
Prefer a small patch in a custom file (look up the element via `DECK_DATA.slides` by `orig`, mutate `els`/`notes`
before `Deck.start()`), as part-b/part-c already do. Avoid hand-editing `slides-data.js`: it is one 110 KB line.

### Add media
Drop files into `media/` (subfolders group related sets: `charts/`, `ink/`, `kahfkids/`, `posters/`, `whatsapp/`),
reference them with relative paths (`media/foo.webp`). Prefer webp/jpg, H.264 mp4 for video, and add a `posters/`
frame for video slides. Mind repo size — `media/` is ~100 MB and GitHub rejects single files over 100 MB.

### Styling / tokens
Use the CSS variables in `deck.css` (`--bg0 --bg1 --ink --muted --cyan --amber --red --green --violet`,
`--f-display/--f-body/--f-mono`, easing `var(--ease)`) and the existing classes (`.card`, `.stitle`, `.bignum`,
`.pill`, `.chip`, `.pic.card`, `.vid`) so new slides match the deck.

## Gotchas

- **`slides-data.js` is generated** by `scripts/gen_slides.py` (see `README-dev.md`), but **that script is not in this
  repository**. Until it is restored, the generator cannot be re-run; treat `slides-data.js` as read-only source
  data and make changes through `custom/part-*.js` patches. If you must edit it, edit surgically and keep it valid
  JSON after `window.DECK_DATA=`.
- Slide numbers in comments are the *original* PowerPoint numbers (`orig`), not the on-screen position — the
  on-screen counter shows both (`#<orig> · <position> / <total>`).
- Removing a slide = set `hidden: true`, don't delete its data; other slides' morph transitions (`mk` keys,
  `type: 'morph'` between consecutive originals) may depend on neighbours.
- Fonts and assets must stay local; the deck is meant to run offline on a presentation laptop.
- Don't commit `.DS_Store` or `.remember/` (covered by `.gitignore`).
