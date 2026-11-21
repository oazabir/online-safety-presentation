/* boot.js - runs last: custom slides have registered themselves, load the speaker notes for the chosen edition, then start the deck.
   No edition in the URL = the chooser (edition.js) is on screen and the deck waits. */
(function () {
  if (!window.DECK_EDITION) return;
  var ed = window.DECK_EDITION;
  var notes = { adult: ['notes.json', 'DECK_NOTES'], teen: ['notes-teen.json', 'DECK_NOTES_TEEN'], child: ['notes-child.json', 'DECK_NOTES_CHILD'] }[ed];
  Deck.loadNotes(notes[0], notes[1]).then(function () { Deck.start(); });
})();
