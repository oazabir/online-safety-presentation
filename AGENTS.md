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
assets/js/slides-data.js    window.DECK_DATA = {w,h,slides:[{id,section,tr,els,steps,...}]}, in show order
notes.json                  SPEAKER NOTES: {"slide-id": "text"}, the one place to edit them (read by `Deck.loadNotes` in boot.js)
assets/js/notes-data.js     GENERATED copy of notes.json for file:// (`python3 scripts/sync_notes.py`); don't edit
assets/js/engine.js         Deck core: render, transitions, build steps, registerSlide/insertSlide, goto
assets/js/loops.js          ambient animation loops (orbs, aurora, embers, …), auto-assigned per slide
assets/js/ui.js             presenter tools: keys, overview, presenter window, laser, spotlight, magnifier
assets/js/sky.js            background night-sky canvas
assets/js/custom/part-a.js  hand-built slides for the first third of the deck
assets/js/custom/part-b.js  hand-built slides for the rest of the deck
assets/js/custom/part-c.js  latest revision pass; loaded after a/b so it overrides them
assets/js/custom/part-d.js  interactive rebuilds of on-screen 4, 5, 7, 33 (`gallup-teen-hours`, `hours-per-year`, `hours-tiles`, `game-dangers`)
assets/js/custom/topic-bar.js  bottom topic progress bar (6 topics, `TOPICS[].from` = first slide; `T` toggles it)
assets/js/boot.js           calls Deck.start(); must stay last
media/                      images, mp4 videos, plus charts/ games/ hours/ ink/ kahfkids/ posters/ whatsapp/ subfolders
                            (hours/ and games/ = Codex-generated photos for #10 and #44)
.claude/launch.json         local preview server config
```

`.remember/` is tool state, not part of the deck (git-ignored).

## How the deck is built (mental model)

1. **`slides-data.js`** is the base deck, converted from the original PowerPoint: 68 slides in show order, each an
   `els[]` list of pictures/text/shapes/videos positioned in % of a 1920×1080 stage, plus `steps[]` click-builds.
   Every slide (data or inserted) has a unique, stable **`id`** (`roblox`, `meet-susan`) — the key used everywhere
   (`Deck.goto('roblox')`, `registerSlide('roblox', …)`, URL `#/roblox`). The slide **number** `n` (1…N) is just its
   position in the show, assigned by the engine, so it changes when slides move; `#/34` also works. `SLIDES.md`
   lists number ↔ id ↔ old PowerPoint number. Sections: `problem`, `why`, `treat`, `grooming`, `protect`, `evidence`.
2. **`engine.js`** renders each slide from that data. A slide can be **overridden** with
   `Deck.registerSlide(id, spec)` or **added** with `Deck.insertSlide({after, id, …spec})`.
3. **`custom/part-*.js`** are the real authoring surface. Each is a self-contained IIFE that injects its own `<style>`
   (ids like `part-a-css`, class prefixes `pa-`, `pc-` …), registers/inserts slides, and may patch `DECK_DATA` in
   place (look slides up with `byId['<id>']`).
4. **Hidden slides** (`hidden: true`) are supported (kept in `Deck.slides`, skipped by `Deck.order()` and numbered 0), but the
   deck currently has none: the old hidden ones (counter, calculator, alternate closer, …) were deleted.
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
Edit the `registerSlide('<id>', …)` block in the custom file that owns it (grep `registerSlide('roblox-strangers'` across
`assets/js/custom/`). If none exists, add one — preferably in `part-c.js` (the newest revision layer). Use
`keepBase: true` to keep the converted pictures/text and just add an overlay; omit it to replace the slide entirely.

### Add a new slide
```js
Deck.insertSlide({ after: 'youtube-train', id: 'my-slide', title: '…', section: 'protect',
  tr: { type: 'fade', ms: 800 },   // speaker notes go in notes.json under this id
  render(el, ctx) { /* build DOM into el, 1920×1080 px coords */ },
  steps: 2, step(el, i, ctx) { /* click-build i */ }, unstep(el, i, ctx) { /* reverse on Back */ } });
```
`after` is the id of any slide, base or inserted (inserts may be registered in any order). The new slide's `id` must be
unique across the deck (`#/my-slide`); the engine warns on duplicates and unknown ids.

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

### Speaker notes
Edit `notes.json` (keys are slide ids, in show order; see `SLIDES.md`). Served over http a reload is enough. Opened from disk
(`file://`) browsers can't `fetch` local files, so the deck reads `assets/js/notes-data.js` instead: run
`python3 scripts/sync_notes.py` after editing (it also checks the JSON is valid). Unknown ids are warned about in the console.
Don't put `notes` in slide data or `insertSlide` specs; a note given there is only a fallback when `notes.json` has none.

### Presenter "Next" screenshots
When a click only builds the current slide, the presenter's Next box shows `media/steps/<slide-id>-<step>.webp` (640×360 screenshots taken
3 s after pressing Next); it falls back to a static render if the file is missing, and shows the next slide when there are no builds left.
After changing a slide's builds/animation, regenerate: `python3 scripts/capture_steps.py 0 1 <slide-id>` (see the script header).

### Change text or images of an un-customised slide
Prefer a small patch in a custom file (look up the element via `DECK_DATA.slides` by `id`, mutate `els`
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

- **`slides-data.js` was generated** by `scripts/gen_slides.py` (see `README-dev.md`), but **that script is not in this
  repository** and the data has since been edited by hand (hidden slides removed, reordered, ids added), so it must not be
  regenerated; make changes through `custom/part-*.js` patches. If you must edit it, edit surgically and keep it valid
  JSON after `window.DECK_DATA=`.
- Slide numbers (`#92`, `slide 41`) in older comments and commit messages are the *original PowerPoint* numbers; use
  `SLIDES.md` to translate them to ids / current positions. New code should refer to slides by id.
- Removing a slide = delete its entry from `slides-data.js` and its `registerSlide`/`insertSlide` code. `type: 'morph'`
  only runs between neighbouring slides (and falls back to a cross-fade otherwise), so check the slides around it.
- Fonts and assets must stay local; the deck is meant to run offline on a presentation laptop.
- Don't commit `.DS_Store` or `.remember/` (covered by `.gitignore`).
