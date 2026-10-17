"""Capture the screen after every Next press on every slide (3 s after each press), for the presenter view's "Next" box.
Needs: pip install playwright pillow, Google Chrome installed (plays the H.264 videos), and the deck served at URL below
(python3 -m http.server 8765 --bind 127.0.0.1 from the repo root).
usage: python3 scripts/capture_steps.py WORKER NWORKERS [only-slide-ids...]   (env ENTRY_ONLY=1: only the first state of each slide)
  all slides, 4 parallel workers:  for i in 0 1 2 3; do python3 scripts/capture_steps.py $i 4 & done
  one slide:                       python3 scripts/capture_steps.py 0 1 wa-privacy
Writes media/steps/<slide-id>-<step>.webp (step = state reached after that many Next presses; -0 = the slide as it first appears,
3 s after arriving); re-run it after changing builds."""
import sys, io, json, time, os
from playwright.sync_api import sync_playwright
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = ROOT + '/media/steps'
URL = 'http://127.0.0.1:8765/index.html'
WAIT = 3.0
W, H = 1280, 720
OW, OH = 640, 360

worker, nworkers = int(sys.argv[1]), int(sys.argv[2])
only = sys.argv[3:]
os.makedirs(OUT, exist_ok=True)
log = open('/tmp/capture-steps-%d.log' % worker, 'w')
def L(*a):
    s = ' '.join(str(x) for x in a); log.write(s + '\n'); log.flush()

HIDE = '#progress,#counter,#toast,#topicbar,#help,#overview{display:none!important}'

with sync_playwright() as p:
    b = p.chromium.launch(channel='chrome', headless=True,
                          args=['--autoplay-policy=no-user-gesture-required', '--mute-audio'])
    pg = b.new_page(viewport={'width': W, 'height': H})
    pg.on('pageerror', lambda e: L('PAGEERROR', e))
    pg.goto(URL + '?cap' + str(worker))
    pg.add_style_tag(content=HIDE)
    pg.wait_for_function('window.Deck && Deck.cur')
    keys = pg.evaluate('Deck.order().map(s=>s.key)')
    mine = [k for i, k in enumerate(keys) if i % nworkers == worker]
    if only: mine = [k for k in keys if k in only]
    L('slides', len(mine))
    for key in mine:
        pg.evaluate('k=>Deck.goto(k)', key)
        time.sleep(WAIT)
        st = pg.evaluate('({key:Deck.state().key, k:Deck.view.k, total:Deck.view.total})')
        if st['key'] != key:
            L('WARN', key, 'goto landed on', st); continue
        total = st['total']; got = 0
        def shot(name):
            png = pg.screenshot()
            im = Image.open(io.BytesIO(png)).convert('RGB').resize((OW, OH), Image.LANCZOS)
            im.save('%s/%s-%d.webp' % (OUT, key, name), 'WEBP', quality=50, method=6)
        shot(0)                                    # first state, as it appears on arrival
        if st['k'] > 0: shot(st['k'])              # slides that build themselves on entry
        if os.environ.get('ENTRY_ONLY'): L(key, 'entry only'); continue
        L(key, 'start k=%d total=%d' % (st['k'], total))
        while True:
            cur = pg.evaluate('({key:Deck.state().key, k:Deck.view.k, total:Deck.view.total})')
            if cur['key'] != key or cur['k'] >= cur['total']: break
            pg.evaluate('Deck.next()')
            time.sleep(WAIT)
            nx = pg.evaluate('({key:Deck.state().key, k:Deck.view.k})')
            if nx['key'] != key:
                L('WARN', key, 'left slide after next, now', nx); break
            shot(nx['k'])
            got += 1
            L(key, 'saved step', nx['k'])
        L(key, 'done', got, '/', total)
    b.close()
L('ALL DONE')
