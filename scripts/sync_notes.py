#!/usr/bin/env python3
"""Check notes.json (Adult version) and notes-child.json (Child version) are valid JSON and copy them into assets/js/.

These are the files you edit. Browsers refuse to fetch() local files, so when the deck is opened straight from disk (file://) it reads
assets/js/notes-data.js (Adult) or assets/js/notes-child-data.js (Child) instead; run this after editing. Not needed when serving over http.
(Unknown slide ids are reported in the browser console when the deck loads.)
"""
import json, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for src, dst, var in [('notes.json', 'assets/js/notes-data.js', 'DECK_NOTES'), ('notes-child.json', 'assets/js/notes-child-data.js', 'DECK_NOTES_CHILD')]:
    notes = json.load(open(os.path.join(root, src), encoding='utf-8'))
    assert isinstance(notes, dict) and all(isinstance(v, str) for v in notes.values()), src + ' must be {"slide-id": "text"}'
    with open(os.path.join(root, dst), 'w', encoding='utf-8') as f:
        f.write('/* generated from %s by scripts/sync_notes.py - edit %s, not this file */\n' % (src, src))
        f.write('window.%s=' % var + json.dumps(notes, ensure_ascii=False) + ';\n')
    print('%s written: %d slides, %d with notes' % (dst, len(notes), sum(1 for v in notes.values() if v.strip())))
