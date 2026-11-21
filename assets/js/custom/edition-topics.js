/* ============================================================================
   edition-topics.js - what the topics are called, and what they list, in each version of the talk. Loaded after part-c.js, teen.js and child.js
   and before topic-bar.js. The Adult version is the base (part-c.js agenda + chapter intros, topic-bar.js TOPICS) and is left alone.

   Topics, in order (index = position in topic-bar.js TOPICS and in the agenda map, Deck.agenda.stops):
     0 problem   1 why   2 treat   3 harm   4 ai (not on the map)   5 protect   6 trends

   Teen and Child hide the 'harm-intro' and 'trends-intro' slides, so topic 3 starts at 'lost-screen-memorial' and the last topic is the single
   closing slide 'remember-this'. Their chapter intros (why-intro, treat-intro, protect-intro) list only what that version really shows.
   Deck.topicEdits[i] = fields merged into TOPICS[i] by topic-bar.js (from, label). Edit the tables below to change a version.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || Deck.edition === 'adult') return;
var ed = Deck.edition;

/* ---- bottom bar + agenda map: topic names (same text in both, so they never disagree) */
var TOPIC = {
  3: { from: 'lost-screen-memorial', label: ed === 'child' ? 'Strangers and Grooming' : 'Drugs, Grooming and Suicide',
       sub: ed === 'child' ? 'The people online who prey on kids, and how to spot them' : 'The dangers hiding behind the screen' },
  4: { label: 'Destroying Our Children' },
  6: { from: 'remember-this', label: 'Remember This', sub: 'The one thing to remember, and the way home' }
};
Deck.topicEdits = {};
Object.keys(TOPIC).forEach(function (i) { Deck.topicEdits[i] = { from: TOPIC[i].from, label: TOPIC[i].label }; if (!TOPIC[i].from) delete Deck.topicEdits[i].from; });

/* ---- agenda map (agenda-journey): stop titles + one-line subtitles */
var SUB = {
  0: ed === 'child' ? 'Where your hours really go' : null,
  1: ed === 'child' ? 'Endless feeds, videos and game design' : null,
  2: 'Take back control: boring devices, safer games',
  4: 'Zones, safe browsers, apps, spotting scams'
};
/* ---- chapter intros: the list of what is coming, per version */
var ITEMS = {
  'why-intro': ed === 'child'
    ? ['Sneaky tactics to hook you', 'Videos made to hook you', 'Shorts, slowed down', 'How games are made addictive', 'Fortnite and Roblox', 'Two rules before any game']
    : ['Meet dopamine', 'Videos made to hook you', 'Shorts, slowed down', 'How games are made addictive', 'Fortnite and Roblox', 'Two rules before any game'],
  'treat-intro': ['Three things that hook you', 'Go grey: take out the colour', 'Make devices boring', 'The most popular games', 'Choose safer games'],
  'protect-intro': ['Tech-free zones', 'Safe screen time', 'A safer browser', 'Apps that block harm', 'WhatsApp privacy', 'Spot the scam']
};

var A = Deck.agenda; if (!A) return;
Object.keys(TOPIC).forEach(function (i) {
  var si = +i === 4 ? -1 : +i > 4 ? +i - 1 : +i;                   // the AI topic (4) is not on the map, so later topics sit one stop earlier
  var stop = A.stops[si]; if (!stop) return;
  if (TOPIC[i].label) stop.t = TOPIC[i].label;
  if (TOPIC[i].sub) stop.s = TOPIC[i].sub;
});
Object.keys(SUB).forEach(function (i) { if (SUB[i] && A.stops[i]) A.stops[i].s = SUB[i]; });
A.chapters.forEach(function (ch) { if (ITEMS[ch.id]) ch.items = ITEMS[ch.id]; });
})();
