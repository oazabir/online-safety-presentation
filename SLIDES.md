# Slide map

Three versions of the talk share these slides (chosen on the start screen, or `index.html?edition=adult` / `?edition=teen` / `?edition=child`): the **Adult version** shows all of them; the **Teen version** (~30 min) shows only the slides with a number in the *Teen #* column (list in `assets/js/custom/teen.js`, notes in `notes-teen.json`). `—` in *Teen #* means hidden in the Teen version. The **Child version** (ages 10-12, a family session with a parent beside the child) starts as a copy of the Teen list: *Child #* is its numbering, list in `assets/js/custom/child.js`, notes in `notes-child.json`; it will diverge from Teen as slides are removed or adjusted, so keep both columns in step with the two lists.

Every slide has a **number** (its position in the show, 1-96, the one on screen and in the overview) and a unique, stable **id**
(the key used by `Deck.registerSlide`, `Deck.insertSlide({after})`, `Deck.goto`, and the URL: `#/roblox`). Numbers change when slides are
added, moved or removed; ids do not. `#/34` and `#/treat-intro` both work.

The *PowerPoint #* column is the original slide number the deck was converted from. Older comments, commit messages and notes (`#92`, `slide 41`)
use it; `—` marks slides that were added after the conversion.

| # (Adult) | id | section | PowerPoint # | Teen # | Child # |
|---:|---|---|---:|---:|---:|
| 1 | `title` | problem | 1 | 1 | 1 |
| 2 | `agenda-journey` | problem | — | 2 | 2 |
| 3 | `year-gone` | problem | — | — | — |
| 4 | `gallup-teen-hours` | problem | 7 | 3 | — |
| 5 | `hours-per-year` | problem | 8 | 4 | — |
| 6 | `what-in-1700-hours` | problem | 9 | 5 | — |
| 7 | `hours-tiles` | problem | 10 | 6 | 5 |
| 8 | `phones-everywhere` | problem | 12 | 7 | — |
| 9 | `screen-time-research` | problem | 13 | 8 | — |
| 10 | `screen-glow-brain` | problem | — | 9 | — |
| 11 | `couples-on-phones` | problem | 14 | 10 | — |
| 12 | `dq-institute-report` | problem | 18 | 11 | 8 |
| 13 | `kids-online-risks` | problem | 19 | 12 | 9 |
| 14 | `mood-swings` | problem | 21 | — | — |
| 15 | `common-scenario` | problem | 22 | — | — |
| 16 | `teen-tantrums` | problem | 23 | — | — |
| 17 | `signs-of-addiction` | problem | 24 | — | — |
| 18 | `why-intro` | why | — | 13 | 10 |
| 19 | `dopamine-meet` | why | — | 14 | — |
| 20 | `dopamine-spikes` | why | — | 15 | — |
| 21 | `dopamine-crash` | why | — | 16 | — |
| 22 | `dopamine-pathways` | why | 28 | — | — |
| 23 | `why-addictive` | why | 31 | 17 | 11 |
| 24 | `kids-videos` | why | 32 | 18 | 12 |
| 25 | `bright-colors` | why | 33 | 19 | 13 |
| 26 | `ms-rachel` | why | 34 | — | — |
| 27 | `intense-colors-effect` | why | 35 | 20 | 14 |
| 28 | `shorts-slowed` | why | — | 21 | 15 |
| 29 | `games-made-addictive` | why | 36 | 22 | 16 |
| 30 | `persuasive-technology` | why | 37 | 23 | 17 |
| 31 | `popular-games` | why | 38 | 24 | 18 |
| 32 | `fortnite` | why | 39 | 25 | 19 |
| 33 | `roblox` | why | 40 | 26 | 20 |
| 34 | `roblox-strangers` | why | 41 | 27 | 21 |
| 35 | `roblox-countries` | why | 42 | — | — |
| 36 | `roblox-news` | why | 43 | — | — |
| 37 | `game-dangers` | why | 44 | 28 | 22 |
| 38 | `treat-intro` | treat | — | 29 | 23 |
| 39 | `child-is-victim` | treat | 49 | — | — |
| 40 | `not-born-addict` | treat | 50 | — | — |
| 41 | `dont-drug-kids` | treat | 51 | — | — |
| 42 | `three-things` | treat | — | 30 | 24 |
| 43 | `gray-research` | treat | — | 31 | 25 |
| 44 | `boring-devices-color` | treat | 71 | 32 | 26 |
| 45 | `boring-devices-bw` | treat | 72 | 33 | 27 |
| 46 | `top-10-games` | treat | 73 | 34 | 28 |
| 47 | `less-exciting-games` | treat | 74 | 35 | 29 |
| 48 | `harm-intro` | grooming | — | — | — |
| 49 | `knife-vs-phone` | grooming | 55 | — | — |
| 50 | `lost-screen-memorial` | grooming | 45 | 36 | 30 |
| 51 | `child-grooming` | grooming | 56 | — | — |
| 52 | `kayleigh-haywood` | grooming | 57 | 37 | 31 |
| 53 | `meet-susan` | grooming | 58 | 38 | 32 |
| 54 | `susan-tricked` | grooming | 59 | 39 | 33 |
| 55 | `susan-blackmailed` | grooming | 60 | 40 | 34 |
| 56 | `photo-spot-the-risk` | grooming | 61 | 41 | 35 |
| 57 | `photo-how-about-now` | grooming | 62 | 42 | 36 |
| 58 | `never-alone` | grooming | 63 | 43 | 37 |
| 59 | `night-contact-abuse` | grooming | 64 | 44 | 38 |
| 60 | `ai-intro` | grooming | — | 45 | 39 |
| 61 | `ai-sewell` | grooming | — | 46 | 40 |
| 62 | `ai-juliana` | grooming | — | 47 | 41 |
| 63 | `ai-adam` | grooming | — | — | — |
| 64 | `ai-realistic` | grooming | — | 48 | 42 |
| 65 | `protect-intro` | protect | — | 49 | 43 |
| 66 | `tech-free-zones` | protect | 66 | 50 | 44 |
| 67 | `safe-screen-time` | protect | — | 51 | 45 |
| 68 | `slow-phones` | protect | 70 | — | — |
| 69 | `protection-threats` | protect | 87 | 52 | 46 |
| 70 | `parental-controls` | protect | — | — | — |
| 71 | `parental-gaps` | protect | — | — | — |
| 72 | `choose-browser` | protect | 91 | — | — |
| 73 | `kahf-browser-hero` | protect | 92 | 53 | 47 |
| 74 | `browser-comparison` | protect | 94 | — | — |
| 75 | `kahfguard-website` | protect | 88 | 54 | 48 |
| 76 | `kahf-browser-video` | protect | 90 | — | — |
| 77 | `youtube-hide-content` | protect | 95 | — | — |
| 78 | `youtube-train` | protect | 96 | — | — |
| 79 | `kahf-kids-app` | protect | 97 | — | — |
| 80 | `kid-google` | protect | — | — | — |
| 81 | `wa-privacy` | protect | — | 55 | 49 |
| 82 | `scam-parcel-sms` | protect | — | 56 | 50 |
| 83 | `scam-hi-mum` | protect | — | 57 | 51 |
| 84 | `scam-roblox-email` | protect | — | 58 | 52 |
| 85 | `scam-whatsapp-code` | protect | — | 59 | 53 |
| 86 | `scam-netflix-email` | protect | — | 60 | 54 |
| 87 | `scam-fake-captcha` | protect | — | 61 | 55 |
| 88 | `safety-checklist` | protect | 105 | — | — |
| 89 | `trends-intro` | evidence | — | — | — |
| 90 | `depression-chart` | evidence | 106 | — | — |
| 91 | `self-harm-chart` | evidence | 107 | — | — |
| 92 | `suicide-rate-chart` | evidence | 108 | — | — |
| 93 | `suicide-rate-social-apps` | evidence | 109 | — | — |
| 94 | `remember-this` | evidence | 110 | 62 | 56 |
| 95 | `tahrim-66-6` | evidence | — | 63 | — |
| 96 | `closing` | evidence | 112 | — | — |

Hidden (kept in the deck, not shown when presenting, no number): `kahf-browser-new-tab` (PowerPoint #93, was 66; set in part-c.js).

Removed: `device-vs-drug-addiction` (PowerPoint #27, the "Device addiction vs Drug Addiction" split screen; replaced by the three dopamine slides in part-g.js).

Removed (were hidden): PowerPoint #2 (three panels), #4 (684,932 years), #48 (How to treat device addiction? title), #98, the live screen-time counter, the screen-time calculator and the "shepherd" closing slide.

## Child-only slides

These four exist only in the Child version (`assets/js/custom/child-extra.js`, inserted there, so they have no Adult/Teen number). They replace the
Teen/Adult slides in the same place of the talk, which the Child version hides:

| Child # | id | replaces (Adult ids) |
|---:|---|---|
| 3 | `kid-screen-time` | `gallup-teen-hours`, `hours-per-year`: two sliders (TV hours, game hours a day) -> hours a day / month / year |
| 4 | `kid-books` | `what-in-1700-hours`: the child's own yearly hours and how many books that is (8 h a book) |
| 6 | `kid-light` | `phones-everywhere`, `screen-time-research`, `screen-glow-brain`: TV child + tablet child, bright screen light into the eyes, tired brain showing through the head |
| 7 | `kid-sleep` | (same three) six panels, one per click: can't sleep, body asleep but brain awake, wakes up tired, dozes off in class, angry with parents, fails the exam |

The yearly hours the child sets on `kid-screen-time` also drive `hours-tiles` ("What could N hours a year become?") through `Deck.hoursState.hpd`.
Hidden in the Child version only: `couples-on-phones`, `dopamine-meet`, `dopamine-spikes`, `dopamine-crash`, `tahrim-66-6`.
