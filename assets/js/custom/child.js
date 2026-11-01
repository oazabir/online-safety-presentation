/* ============================================================================
   child.js - the Child version (ages 10-14, about 30 minutes): when the chooser (edition.js) picks `child`, only the slides listed in
   `Deck.only` are shown, in their original order. Every other slide stays in the deck, hidden (not shown, not numbered, skipped by the
   arrow keys and the overview). The Adult version shows everything. Its speaker notes are in notes-child.json.
   To bring a slide back, add its id to the list below (ids and numbers for both versions: SLIDES.md).
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || Deck.edition !== 'child') return;
Deck.only = [
  'title', 'agenda-journey', 'year-gone', 'gallup-teen-hours',
  'hours-per-year', 'what-in-1700-hours', 'hours-tiles', 'phones-everywhere',
  'screen-time-research', 'couples-on-phones', 'dq-institute-report', 'kids-online-risks',
  'why-intro', 'dopamine-meet', 'dopamine-spikes', 'dopamine-crash', 'why-addictive',
  'kids-videos', 'bright-colors', 'intense-colors-effect',
  'games-made-addictive', 'persuasive-technology', 'popular-games', 'fortnite',
  'roblox', 'roblox-strangers', 'game-dangers', 'treat-intro',
  'three-things', 'gray-research', 'boring-devices-color', 'boring-devices-bw',
  'top-10-games', 'less-exciting-games', 'lost-screen-memorial', 'kayleigh-haywood',
  'meet-susan', 'susan-tricked', 'susan-blackmailed', 'photo-spot-the-risk',
  'photo-how-about-now', 'never-alone', 'night-contact-abuse', 'ai-intro',
  'ai-sewell', 'ai-juliana', 'ai-realistic', 'protect-intro',
  'tech-free-zones', 'safe-screen-time', 'protection-threats', 'kahfguard-website',
  'kahf-browser-hero', 'wa-privacy', 'remember-this', 'tahrim-66-6'
];
})();
