/* boot.js - runs last: custom slides have registered themselves, load the speaker notes, then start the deck */
(function () { Deck.loadNotes('notes.json').then(function () { Deck.start(); }); })();
