/* boot.js - runs last: custom slides have registered themselves, load the speaker notes for the chosen edition, then start the deck.
   No edition in the URL = the chooser (edition.js) is on screen and the deck waits for it. */
(function () {
  if (!window.DECK_EDITION) return;
  var child = window.DECK_EDITION === 'child';
  Deck.loadNotes(child ? 'notes-child.json' : 'notes.json', child ? 'DECK_NOTES_CHILD' : 'DECK_NOTES').then(function () { Deck.start(); });
})();
