/* ============================================================================
   child.js - the Child version (ages 10-12, a family session with a parent beside the child): when the chooser (edition.js) picks `child`, only the slides listed in
   `Deck.only` are shown, in their original order. Every other slide stays in the deck, hidden (not shown, not numbered, skipped by the
   arrow keys and the overview). The Adult version shows everything. Its speaker notes are in notes-child.json.
   To bring a slide back, add its id to the list below (ids and numbers for both versions: SLIDES.md).
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || Deck.edition !== 'child') return;
Deck.only = [
  'title', 'agenda-journey',
  'kid-screen-time', 'kid-books',                 // child-only (child-extra.js): sliders for TV / games hours, then "N hours = N books"
  'hours-tiles',
  'kid-light', 'kid-sleep',                       // child-only (child-extra.js): bright light into the eyes, then a bad night
  'dq-institute-report', 'kids-online-risks',
  'why-intro', 'why-addictive',
  'kids-videos', 'bright-colors', 'intense-colors-effect', 'shorts-slowed',
  'games-made-addictive', 'persuasive-technology', 'popular-games', 'fortnite',
  'roblox', 'roblox-strangers', 'game-dangers', 'treat-intro',
  'three-things', 'gray-research', 'boring-devices-color', 'boring-devices-bw',
  'top-10-games', 'less-exciting-games', 'lost-screen-memorial', 'kayleigh-haywood',
  'meet-susan', 'susan-tricked', 'susan-blackmailed', 'photo-spot-the-risk',
  'photo-how-about-now', 'never-alone', 'night-contact-abuse', 'audree-trap', 'ai-intro',
  'ai-sewell', 'ai-juliana', 'ai-realistic', 'protect-intro',
  'tech-free-zones', 'safe-screen-time', 'protection-threats', 'kahf-browser-hero',
  'kahfguard-website', 'wa-privacy',
  'scam-parcel-sms', 'scam-hi-mum', 'scam-roblox-email', 'scam-whatsapp-code', 'scam-netflix-email', 'scam-fake-captcha',
  'remember-this'
];
/* Susan chat (susan-tricked, and susan-blackmailed which repeats it scrolled up): wording for 10-12 year olds. Same lesson
   (a fake friend, a threat, "don't tell your parents", a demand for more photos), nothing sexual. Bubble sizes are unchanged,
   so keep each line about as long as the one it replaces. */
var CHAT = {
  e16: "Surprise. I'm not a 15 year old girl. I'm a grown man. If you block me, I'll send your photo to all your friends. Do what I say and I'll delete it.",
  e19: 'And if you tell your parents, I am sending it to your whole school',
  e23: 'Send me more photos. Right now.',
  e4: "If I don't send more photos, what is my other option?"
};
window.DECK_DATA.slides.forEach(function (s) {
  if (s.id !== 'susan-tricked' && s.id !== 'susan-blackmailed') return;
  s.els.forEach(function (e) {
    if (e.k !== 'text' || !CHAT[e.id] || !e.paras || !e.paras[0]) return;
    var r = e.paras[0].runs[0];
    e.paras[0].runs = [{ t: CHAT[e.id], sz: r.sz, c: r.c }];
  });
});
})();
