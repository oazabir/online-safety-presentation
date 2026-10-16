#!/usr/bin/env python3
"""Check notes.json is valid JSON and copy it into assets/js/notes-data.js.

notes.json is the file you edit. Browsers refuse to fetch() local files, so when the deck is opened straight from disk
(file://) it reads assets/js/notes-data.js instead; run this after editing notes.json. Not needed when serving over http.
(Unknown slide ids are reported in the browser console when the deck loads.)
"""
import json, os
root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
notes = json.load(open(os.path.join(root, 'notes.json'), encoding='utf-8'))
assert isinstance(notes, dict) and all(isinstance(v, str) for v in notes.values()), 'notes.json must be {"slide-id": "text"}'
with open(os.path.join(root, 'assets/js/notes-data.js'), 'w', encoding='utf-8') as f:
    f.write('/* generated from notes.json by scripts/sync_notes.py - edit notes.json, not this file */\n')
    f.write('window.DECK_NOTES=' + json.dumps(notes, ensure_ascii=False) + ';\n')
print('notes-data.js written: %d slides, %d with notes' % (len(notes), sum(1 for v in notes.values() if v.strip())))
