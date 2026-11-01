/* ============================================================================
   part-j.js - "Spot the scam" (both versions): five realistic scam messages, inserted after 'wa-privacy', in this order:
     'scam-parcel-sms'     SMS (iPhone Messages): unpaid parcel fee with a look-alike link
     'scam-hi-mum'         WhatsApp: "Hi Mum, it's me, new number" asking for money
     'scam-roblox-email'   email (desktop mail app): Roblox account "will be deleted", free Robux bait, link goes elsewhere
     'scam-whatsapp-code'  WhatsApp: a friend's stolen account asks for the 6-digit code that just arrived
     'scam-netflix-email'  email (desktop mail app): membership on hold, update your card, perfect English
   Each slide opens on the message alone and asks "would you ...?". Every click circles one warning sign on the screen
   (a numbered pin) and adds it to the "what to spot" list; the last one stamps SCAM and swaps the question for what to do
   instead. Back removes them again. The screens are HTML (crisp at any size), not pictures; all numbers, names, accounts
   and web addresses in them are made up.
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }

/* ---------------------------------------------------------------- icons */
var SIG = '<svg viewBox="0 0 18 12" fill="currentColor"><rect y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" width="3" height="12" rx="1"/></svg>';
var WIFI = '<svg viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.3-1.4A10.4 10.4 0 0 0 8 .3 10.4 10.4 0 0 0 .7 3.2L2 4.6a8.6 8.6 0 0 1 6-2.4zm0 3.6c1.3 0 2.5.5 3.4 1.3l1.3-1.4A6.8 6.8 0 0 0 8 3.9a6.8 6.8 0 0 0-4.7 1.8l1.3 1.4c.9-.8 2.1-1.3 3.4-1.3zM8 11.4l2.2-2.3A3 3 0 0 0 8 8.2c-.9 0-1.6.3-2.2.9z"/></svg>';
var BAT = '<svg viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/><path d="M25 4.5v4c.8-.3 1.3-1.1 1.3-2s-.5-1.7-1.3-2z" fill="currentColor" opacity=".45"/></svg>';
var PERSON = '<svg viewBox="0 0 24 24" fill="#fff"><circle cx="12" cy="9" r="4.2"/><path d="M4 21c.6-4.2 3.9-6.6 8-6.6s7.4 2.4 8 6.6z"/></svg>';
var BACK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
var VIDEO = '<svg viewBox="0 0 24 24" fill="#fff"><rect x="2" y="6" width="14" height="12" rx="3"/><path d="M17 10.5 22 7.5v9l-5-3z"/></svg>';
var CALL = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z"/></svg>';
var MIC = '<svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" fill="#fff"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
var BUBBLE = '<svg viewBox="0 0 24 24" fill="#fff"><path d="M12 3C6.5 3 2 6.7 2 11.2c0 2.6 1.5 4.9 3.8 6.4L5 21l4-2.1c.9.2 1.9.3 3 .3 5.5 0 10-3.7 10-8.2S17.5 3 12 3z"/></svg>';
var CURSOR = '<svg viewBox="0 0 24 24"><path d="M4 2l16 11.5-7 1.2 4.2 7.3-3 1.6-4.2-7.3L4 21z" fill="#000" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>';
function sb(cls) { return '<div class="sb ' + (cls || '') + '"><b>9:41</b><span>' + SIG + WIFI + BAT + '</span></div>'; }

/* ---------------------------------------------------------------- screens. data-f="n" marks what flag n circles (several
   elements may share n; the pin goes on the one with data-pin, else the first). data-pin="l" puts the pin on the left,
   "in" inside the right edge (for elements touching the edge of the screen). */
function waHead(av, name, sub, f) {
  return sb('wag') + '<div class="wa-h">' + BACK + '<div class="av"' + (av.length > 2 ? '' : ' style="background:#a35bd6"') + '>' + av + '</div>' +
    '<div class="who"><b data-f="' + f + '" data-pin="">' + name + '</b><small>' + sub + '</small></div><i>' + VIDEO + CALL + '</i></div>';
}
function waFoot() { return '<div class="wa-in"><div>Message</div><i>' + MIC + '</i></div>'; }
function tm(t, out) { return '<i class="tm">' + t + (out ? ' <u>✓✓</u>' : '') + '</i>'; }

function mail(o) {
  return '<div class="mw-tb"><i></i><i></i><i></i><span>Inbox &mdash; Mail</span></div><div class="mw-in">' +
    '<div class="mw-sd"><div class="on">Inbox<b>3</b></div><div>Starred</div><div>Sent</div><div>Drafts</div><div>Junk</div></div>' +
    '<div class="mw-rd"><div class="mw-sj"' + (o.sjF ? ' data-f="' + o.sjF + '"' : '') + '>' + o.subject + '</div>' +
    '<div class="mw-fr"><div class="av" style="background:' + o.avc + '">' + o.av + '</div><div class="who"><b>' + o.name + '</b> ' +
    '<span data-f="1">&lt;' + o.addr + '&gt;</span><small>to me</small></div><time>' + o.time + '</time></div>' +
    '<div class="mw-card"><div class="mw-bh" style="' + o.brandCss + '">' + o.brand + '</div><div class="mw-bd">' + o.body + '</div></div></div></div>';
}

var SCAMS = [
  { id: 'scam-parcel-sms', title: 'Spot the scam: parcel text', kind: 'phone', chip: 'SMS',
    ttl: 'Your parcel is <em>waiting</em>&hellip;', q: 'Would you tap the link?',
    ins: 'Don&rsquo;t tap. Check the delivery in the courier&rsquo;s own app, or type its website yourself.',
    scr: 'ms',
    html: sb() + '<div class="ms-h"><span class="bk">&lsaquo;</span><div class="av">' + PERSON + '</div>' +
      '<div class="nm" data-f="1">+44 7700 900417 &rsaquo;</div></div>' +
      '<div class="ms-b"><div class="ms-ts">Text Message<br>Today 08:47</div>' +
      '<div class="ms-m">Royal Mail: Your parcel RM48291035GB could not be delivered due to an unpaid shipping fee of <span data-f="3">&pound;1.45</span>. ' +
      '<span data-f="2">Please pay before 23:59 today</span> or it will be returned to sender:<br><span class="ln" data-f="4">https://royalmail.redelivery-uk.com/track</span></div>' +
      '<div class="ms-note">The sender is not in your contact list.<br><span class="ln">Report Junk</span></div></div>' +
      '<div class="ms-in"><b>+</b><div>Text Message</div></div>',
    flags: [
      ['A random mobile number', 'Delivery companies don&rsquo;t text from a personal number.'],
      ['&ldquo;Before 23:59 today&rdquo;', 'A deadline so you act before you think.'],
      ['A tiny fee: &pound;1.45', 'Too small to question. They want your card details, not &pound;1.45.'],
      ['A look-alike link', 'The real site name is the part just before .com: <b>redelivery-uk</b>, not Royal Mail.']
    ] },

  { id: 'scam-hi-mum', title: 'Spot the scam: “Hi Mum”', kind: 'phone', chip: 'WhatsApp',
    ttl: '&ldquo;Hi Mum, it&rsquo;s <em>me</em>&rdquo;', q: 'Would you send the money?',
    ins: 'Call your child on their <b>old</b> number, or ask something only they would know.',
    scr: 'wap',
    html: waHead(PERSON, '+44 7700 900283', 'online', 1) +
      '<div class="wa-b"><div class="wa-day">TODAY</div>' +
      '<div class="wa-unk" data-f="1">This number is not in your contacts<span><b>Block</b><b>Add</b></span></div>' +
      '<div class="wa-m i" data-f="2">Hi Mum 👋 it&rsquo;s me! Dropped my phone in the toilet 🙈 this is my new number, delete the old one' + tm('09:12') + '</div>' +
      '<div class="wa-m o">Oh no!! Are you ok?' + tm('09:14', 1) + '</div>' +
      '<div class="wa-m i">Mum I need a favour 🙏 got a bill to pay today and my banking app won&rsquo;t work on this phone' + tm('09:15') + '</div>' +
      '<div class="wa-m i" data-f="3">Can you send &pound;480 to this account? I&rsquo;ll pay you back tomorrow I promise ❤️<br>Name: J Mensah<br>Sort code: 20-45-77<br>Acc: 63018245' + tm('09:15') + '</div>' +
      '<div class="wa-m o">Can I call you?' + tm('09:17', 1) + '</div>' +
      '<div class="wa-m i" data-f="4">Can&rsquo;t talk rn, mic is broken 🙄 just text pls it&rsquo;s urgent' + tm('09:17') + '</div></div>' + waFoot(),
    flags: [
      ['A new, unknown number', '&ldquo;Delete the old one&rdquo; stops you checking with the real one.'],
      ['&ldquo;It&rsquo;s me&rdquo;, but no name', 'They wait for you to say the name for them.'],
      ['Money to a stranger&rsquo;s account', 'Your own child&rsquo;s bill isn&rsquo;t paid to a &ldquo;J Mensah&rdquo;.'],
      ['Won&rsquo;t take a call', 'A voice would give them away, so it stays on text.']
    ] },

  { id: 'scam-roblox-email', title: 'Spot the scam: Roblox email', kind: 'mail', chip: 'Email',
    ttl: 'Your Roblox account will be <em>deleted</em>', q: 'Would you click Verify?',
    ins: 'Never log in from an email link. Open the Roblox app yourself, and tell a parent.',
    html: mail({ subject: '<span data-f="3">⚠️ Final warning: your account will be deleted in 24 hours</span>', av: 'R', avc: '#e2231a', name: 'Roblox Support',
      addr: 'noreply@rob1ox-security.com', time: '07:52', brand: 'ROBLOX', brandCss: 'background:#232527;color:#fff',
      body: '<p><span data-f="2">Dear User,</span></p>' +
        '<p>We have detected suspicious activity on your account. <span data-f="3">Your account, your Robux and all your items will be permanently deleted within 24 hours</span> unless you verify your account.</p>' +
        '<div class="mw-cta"><span class="mw-btn" data-f="5">Verify my account</span><i class="cur">' + CURSOR + '</i>' +
        '<span class="mw-tip" data-f="5" data-pin="">https://roblox.com.account-verify.ru/login</span></div>' +
        '<p data-f="4" data-pin="l">🎁 As a thank-you for verifying, we will add <b>2,000 free Robux</b> to your account!</p>' +
        '<p class="sig">Roblox Security Team</p>' }),
    flags: [
      ['rob<i class="hl">1</i>ox, not roblox', 'A number 1 instead of the letter l. Read the address, not just the name.'],
      ['&ldquo;Dear User&rdquo;', 'Roblox knows your username. Scammers don&rsquo;t.'],
      ['A scary deadline', '&ldquo;Deleted in 24 hours&rdquo; is there to make you panic.'],
      ['Free Robux', 'Nobody gives away free Robux. It is always bait.'],
      ['The link goes somewhere else', 'Point at it first: <b>account-verify.ru</b> is not roblox.com.']
    ] },

  { id: 'scam-whatsapp-code', title: 'Spot the scam: “send me the code”', kind: 'phone', chip: 'WhatsApp',
    ttl: '&ldquo;Can you send me that <em>code</em>?&rdquo;', q: 'Would you send the code?',
    ins: 'Never share a code. Call your friend to check, and turn on two-step verification.',
    scr: 'wap',
    html: waHead('A', 'Aisha 💜', 'online', 1) +
      '<div class="wa-b"><div class="wa-day">TODAY</div>' +
      '<div class="wa-m o">are u coming to the park later?' + tm('16:02', 1) + '</div>' +
      '<div class="wa-m i">maybe!! 😄' + tm('16:20') + '</div>' +
      '<div class="wa-m i">heyy sorry I sent u a 6 digit code by mistake 🙈 can u send it back to me pls?' + tm('16:21') + '</div>' +
      '<div class="wa-m i" data-f="4">quick pls it&rsquo;s urgent!! I&rsquo;m getting locked out 😭😭' + tm('16:21') + '</div></div>' + waFoot() +
      '<div class="nb abs" data-f="2" data-pin="in"><div class="ic">' + BUBBLE + '</div><div><div class="hd"><b>Messages</b><span>now</span></div>' +
      '<p><b>WhatsApp</b><br>Your WhatsApp code: 482-917<br><span data-f="3">Don&rsquo;t share this code with others</span></p></div></div>',
    flags: [
      ['It&rsquo;s from a real friend', 'Their account has already been stolen. Now they want yours.'],
      ['The code came to <i class="hl">your</i> phone', 'It&rsquo;s the key to your WhatsApp. Someone is logging in as you.'],
      ['&ldquo;Don&rsquo;t share this code&rdquo;', 'WhatsApp tells you, right there in the message.'],
      ['Rush and panic', 'Send it and they take your account, then message all your friends.']
    ] },

  { id: 'scam-netflix-email', title: 'Spot the scam: Netflix email', kind: 'mail', chip: 'Email',
    ttl: 'Your membership is <em>on hold</em>', q: 'Would you update your card?',
    ins: 'Open the Netflix app or type netflix.com yourself. Never pay through an email link.',
    html: mail({ subject: 'Your membership is on hold &ndash; action required', av: 'N', avc: '#141414', name: 'Netflix',
      addr: 'billing@netflix-account-support.com', time: 'Yesterday', brand: 'NETFLIX', brandCss: 'background:#000;color:#e50914;letter-spacing:.12em',
      body: '<p><span data-f="2">Hi there,</span></p>' +
        '<p>We were unable to process the payment for your membership, so we have put your account on hold. To keep enjoying your favourite shows, please update your payment details.</p>' +
        '<p><span data-f="3">If we don&rsquo;t hear from you within 48 hours, your account will be suspended.</span></p>' +
        '<div class="mw-cta"><span class="mw-btn red" data-f="4">Update payment details</span></div>' +
        '<p class="sig">Thanks,<br>The Netflix Team</p>' }),
    flags: [
      ['Not from netflix.com', '<b>netflix-account-support.com</b> could belong to anyone.'],
      ['&ldquo;Hi there&rdquo;', 'Your real account knows your name.'],
      ['Pay in 48 hours or lose it', 'The deadline is there to make you rush.'],
      ['A button that wants your card', 'Never type card details after clicking an email link.'],
      ['Perfect English', 'AI writes flawless scams now. Don&rsquo;t wait for spelling mistakes.']
    ] }
];

/* ---------------------------------------------------------------- styles */
var RED = '255,77,77';
addCss('pj-css', [
  '.pj{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
  '.pj *{box-sizing:border-box}',
  /* right-hand column: kicker, title, question / answer, the list of warning signs */
  '.pj-col{position:absolute;top:96px;left:850px;width:960px}',
  '.pj.mail .pj-col{left:1110px;width:760px}',
  '.pj-k{display:flex;gap:16px;align-items:center;font:700 20px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:#ff8a8a}',
  '.pj-k span{letter-spacing:.04em;text-transform:none;padding:8px 18px;border-radius:99px;background:rgba(255,255,255,.08);color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.25)}',
  '.pj-t{margin-top:22px;font:600 68px/1.05 var(--f-display);letter-spacing:-.02em;color:#fff}',
  '.pj.mail .pj-t{font-size:60px}',
  '.pj-t em{font-style:italic;color:#ff6b6b}',
  '.pj-q{display:grid;margin-top:26px}',
  '.pj-q>*{grid-area:1/1;align-self:start;transition:opacity .5s,transform .5s var(--ease)}',
  '.pj-q .a{font:500 36px/1.25 var(--f-body);color:var(--ink2)}',
  '.pj-q .b{opacity:0;transform:translateY(14px);padding:14px 22px;border-radius:16px;background:rgba(46,229,157,.12);box-shadow:inset 0 0 0 2px rgba(46,229,157,.55);font:500 26px/1.35 var(--f-body);color:#d9ffe9}',
  '.pj-q .b em{font-style:normal;font-weight:800;color:#2ee59d;margin-right:10px}',
  '.pj.done .pj-q .a{opacity:0;transform:translateY(-14px)}',
  '.pj.done .pj-q .b{opacity:1;transform:none}',
  '.pj-fl{margin-top:30px;display:flex;flex-direction:column;gap:20px}',
  '.pj.mail .pj-fl{gap:14px}',
  '.pj-f{display:grid;grid-template-columns:50px 1fr;gap:18px;align-items:start;opacity:0;transform:translateX(30px);transition:opacity .45s,transform .55s var(--ease)}',
  '.pj-f.on{opacity:1;transform:none}',
  '.pj-f .n{width:50px;height:50px;border-radius:50%;background:rgb(' + RED + ');color:#fff;font:800 25px/50px var(--f-body);text-align:center;box-shadow:0 0 0 6px rgba(' + RED + ',.18)}',
  '.pj-f b{display:block;font:700 31px/1.2 var(--f-body);color:#fff}',
  '.pj-f span{display:block;margin-top:5px;font:400 24px/1.35 var(--f-body);color:var(--muted)}',
  '.pj-f span b{display:inline;font:inherit;font-weight:700;color:#ffb3b3}',
  '.pj-f .hl{font-style:normal;color:#ff8a8a}',
  /* what a warning sign looks like on the screen: a red ring, and its number in a pin */
  '.pj [data-f]{position:relative;transition:box-shadow .4s;-webkit-box-decoration-break:clone;box-decoration-break:clone}',
  '.pj .abs[data-f]{position:absolute}',
  '.pj span[data-f],.pj b[data-f]{border-radius:6px}',
  '.pj .hit{box-shadow:0 0 0 3px rgb(' + RED + '),0 0 22px rgba(' + RED + ',.7)!important}',
  '.pj span.hit:not(.mw-btn),.pj b.hit{background:rgba(' + RED + ',.16)}',
  '.pj-pin{position:absolute;top:-20px;right:-20px;width:40px;height:40px;border-radius:50%;background:rgb(' + RED + ');color:#fff;font:800 21px/40px var(--f-body);font-style:normal;text-align:center;',
  '  box-shadow:0 4px 14px rgba(0,0,0,.45);opacity:0;transform:scale(.3);transition:opacity .3s,transform .45s cubic-bezier(.3,1.6,.5,1);z-index:9;pointer-events:none;text-decoration:none;letter-spacing:0}',
  '.pj-pin.l{right:auto;left:-20px}',
  '.pj-pin.in{top:10px;right:12px}',
  '.pj .hit>.pj-pin{opacity:1;transform:none}',
  /* the stamp over the device once every sign is shown */
  '.pj-st{position:absolute;z-index:12;padding:8px 34px 12px;border:9px solid #ff3b3b;border-radius:20px;color:#ff3b3b;background:rgba(30,0,0,.55);font:900 104px/1 var(--f-body);letter-spacing:.08em;',
  '  text-shadow:0 0 30px rgba(255,59,59,.5);opacity:0;transform:rotate(-14deg) scale(1.8);transition:opacity .25s,transform .5s cubic-bezier(.3,1.5,.5,1);pointer-events:none}',
  '.pj.done .pj-st{opacity:.95;transform:rotate(-14deg)}',
  '.pj.phone .pj-st{left:560px;top:850px}',
  '.pj.mail .pj-st{left:640px;top:830px}',
  /* phone */
  '.pj-ph{position:absolute;left:250px;top:58px;width:476px;height:968px;border-radius:72px;background:#0e0f12;padding:13px;box-shadow:0 0 0 2px #3a3b42,0 50px 100px rgba(0,0,0,.7)}',
  '.pj-ph .scr{position:relative;width:100%;height:100%;border-radius:60px;overflow:hidden;display:flex;flex-direction:column;background:#fff;color:#000}',
  '.pj-ph .isl{position:absolute;left:50%;top:14px;width:122px;height:35px;margin-left:-61px;border-radius:20px;background:#000;z-index:8}',
  '.pj .sb{height:60px;flex:none;display:flex;align-items:center;justify-content:space-between;padding:10px 40px 0 50px;font:600 21px/1 var(--f-body);color:#000}',
  '.pj .sb span{display:flex;gap:7px;align-items:center}.pj .sb svg{height:15px;width:auto}',
  /* iPhone Messages */
  '.ms-h{flex:none;position:relative;display:flex;flex-direction:column;align-items:center;padding:2px 0 14px;background:#f6f6f7;border-bottom:1px solid #dcdcde}',
  '.ms-h .bk{position:absolute;left:22px;top:2px;color:#0a84ff;font:300 58px/1 var(--f-body)}',
  '.ms-h .av{width:64px;height:64px;border-radius:50%;background:linear-gradient(#a8abb5,#85888f);display:grid;place-items:center}',
  '.ms-h .av svg{width:42px;height:42px;margin-top:6px}',
  '.ms-h .nm{margin-top:8px;padding:3px 8px;font:500 18px/1.1 var(--f-body);color:#000}',
  '.ms-b{flex:1;padding:16px 20px;overflow:hidden}',
  '.ms-ts{text-align:center;font:500 16px/1.35 var(--f-body);color:#8e8e93;margin:4px 0 14px}',
  '.ms-m{max-width:88%;background:#e9e9eb;border-radius:24px;padding:14px 18px;font:400 24px/1.36 var(--f-body);color:#000}',
  '.ms-m .ln{color:#0a84ff;text-decoration:underline;word-break:break-all}',
  '.ms-note{margin-top:16px;text-align:center;font:400 16px/1.45 var(--f-body);color:#8e8e93}.ms-note .ln{color:#0a84ff}',
  '.ms-in{flex:none;display:flex;gap:14px;align-items:center;padding:12px 20px 38px}',
  '.ms-in b{width:40px;height:40px;border-radius:50%;background:#e9e9eb;color:#7c7c80;font:400 30px/38px var(--f-body);text-align:center}',
  '.ms-in div{flex:1;height:44px;border-radius:22px;border:1.5px solid #d1d1d6;padding:0 18px;font:400 19px/41px var(--f-body);color:#b0b0b5}',
  /* WhatsApp */
  '.pj .sb.wag{background:#008069;color:#fff}',
  '.wa-h{flex:none;display:flex;align-items:center;gap:12px;padding:8px 18px 14px 14px;background:#008069;color:#fff}',
  '.wa-h>svg{width:30px;height:30px;flex:none}',
  '.wa-h .av{width:52px;height:52px;flex:none;border-radius:50%;background:#c4ccd0;display:grid;place-items:center;font:700 26px/1 var(--f-body);color:#fff;overflow:hidden}',
  '.wa-h .av svg{width:36px;height:36px;margin-top:6px}',
  '.wa-h .who{flex:1;min-width:0;display:flex;flex-direction:column;align-items:flex-start}',
  '.wa-h .who b{padding:1px 6px;margin-left:-6px;font:600 22px/1.2 var(--f-body)}',
  '.wa-h .who small{font:400 15px/1.2 var(--f-body);opacity:.85}',
  '.wa-h>i{display:flex;gap:22px}.wa-h>i svg{width:26px;height:26px}',
  '.wa-b{flex:1;display:flex;flex-direction:column;justify-content:flex-end;gap:8px;padding:14px 16px;background:#efeae2;overflow:hidden}',
  '.wa-day{align-self:center;padding:6px 14px;border-radius:9px;background:#fff;font:600 14px/1 var(--f-body);letter-spacing:.04em;color:#54656f;box-shadow:0 1px 1px rgba(0,0,0,.08)}',
  '.wa-unk{align-self:center;max-width:92%;padding:12px 18px;border-radius:12px;background:#fff;text-align:center;font:400 16px/1.35 var(--f-body);color:#54656f;box-shadow:0 1px 1px rgba(0,0,0,.08)}',
  '.wa-unk span{display:flex;justify-content:center;gap:40px;margin-top:8px}.wa-unk span b{font-weight:600;color:#008069}',
  '.wa-m{max-width:82%;padding:8px 13px 8px;border-radius:14px;font:400 20px/1.3 var(--f-body);color:#111b21;box-shadow:0 1px 1px rgba(0,0,0,.1)}',
  '.wa-m.i{align-self:flex-start;background:#fff;border-top-left-radius:4px}',
  '.wa-m.o{align-self:flex-end;background:#d9fdd3;border-top-right-radius:4px}',
  '.wa-m .tm{float:right;margin:9px 0 -5px 12px;font:400 13px/1 var(--f-body);font-style:normal;color:#667781}',
  '.wa-m .tm u{text-decoration:none;color:#53bdeb;letter-spacing:-.25em;margin-right:.25em}',
  '.wa-in{flex:none;display:flex;gap:10px;align-items:center;padding:10px 12px 34px;background:#efeae2}',
  '.wa-in div{flex:1;height:50px;border-radius:25px;background:#fff;padding:0 22px;font:400 20px/50px var(--f-body);color:#8696a0}',
  '.wa-in i{width:50px;height:50px;border-radius:50%;background:#00a884;display:grid;place-items:center}.wa-in i svg{width:26px;height:26px}',
  /* iPhone notification banner */
  '.nb{left:14px;right:14px;top:150px;z-index:6;display:flex;gap:14px;padding:16px 18px;border-radius:28px;background:rgba(246,246,248,.96);box-shadow:0 14px 40px rgba(0,0,0,.35);color:#000;font-family:var(--f-body)}',
  '.nb .ic{width:48px;height:48px;flex:none;border-radius:12px;background:linear-gradient(#65f57d,#0bc935);display:grid;place-items:center}.nb .ic svg{width:30px;height:30px}',
  '.nb>div:last-child{flex:1;min-width:0}',
  '.nb .hd{display:flex;justify-content:space-between;font:600 17px/1.2 var(--f-body);color:#3c3c43}.nb .hd span{font-weight:400;color:#8e8e93}',
  '.nb p{margin:4px 0 0;font:400 20px/1.32 var(--f-body)}',
  /* desktop mail app */
  '.pj-mw{position:absolute;left:60px;top:120px;width:1000px;height:870px;border-radius:16px;overflow:hidden;display:flex;flex-direction:column;background:#fff;color:#1f1f1f;',
  '  box-shadow:0 0 0 1px rgba(255,255,255,.14),0 50px 100px rgba(0,0,0,.7)}',
  '.mw-tb{flex:none;height:48px;display:flex;align-items:center;gap:9px;padding:0 18px;background:#ececee;border-bottom:1px solid #d6d6d8;position:relative}',
  '.mw-tb i{width:14px;height:14px;border-radius:50%;background:#ff5f57}.mw-tb i+i{background:#febc2e}.mw-tb i+i+i{background:#28c840}',
  '.mw-tb span{position:absolute;left:0;right:0;text-align:center;font:600 16px/48px var(--f-body);color:#555;pointer-events:none}',
  '.mw-in{flex:1;display:flex;min-height:0}',
  '.mw-sd{width:190px;flex:none;padding:18px 10px;background:#f3f3f6;border-right:1px solid #e2e2e6;font:500 18px/1 var(--f-body);color:#444}',
  '.mw-sd div{display:flex;justify-content:space-between;padding:12px 14px;border-radius:8px}',
  '.mw-sd .on{background:#dfe6f6;color:#1a3d8f;font-weight:700}',
  '.mw-rd{flex:1;min-width:0;padding:26px 34px 20px}',
  '.mw-sj{display:inline;font:600 27px/1.3 var(--f-body);color:#1f1f1f}',
  '.mw-fr{display:flex;gap:14px;align-items:center;margin:20px 0 22px}',
  '.mw-fr .av{width:50px;height:50px;flex:none;border-radius:50%;display:grid;place-items:center;font:700 23px/1 var(--f-body);color:#fff}',
  '.mw-fr .who{flex:1;min-width:0;font:400 17px/1.4 var(--f-body);color:#5f6368}',
  '.mw-fr .who b{font-size:19px;color:#1f1f1f}.mw-fr .who small{display:block;font-size:15px}',
  '.mw-fr time{font:400 15px/1 var(--f-body);color:#5f6368}',
  '.mw-card{max-width:680px;border:1px solid #e3e3e6;border-radius:12px}',
  '.mw-bh{padding:18px 28px;border-radius:11px 11px 0 0;font:900 30px/1 var(--f-body);letter-spacing:.05em}',
  '.mw-bd{padding:22px 30px 10px;font:400 19px/1.5 var(--f-body);color:#333}',
  '.mw-bd p{margin:0 0 14px}.mw-bd .sig{color:#666}',
  '.mw-cta{position:relative;margin:6px 0 58px}',
  '.mw-btn{display:inline-block;padding:14px 30px;border-radius:8px;background:#335fff;color:#fff;font:700 19px/1 var(--f-body)}',
  '.mw-btn.red{background:#e50914}',
  '.mw-cta .cur{position:absolute;left:200px;top:22px;width:30px;height:30px;z-index:3}',
  '.mw-tip{position:absolute;left:150px;top:56px;z-index:2;white-space:nowrap;padding:6px 12px;border-radius:6px;background:#fffbe6;border:1px solid #d8cfa0;box-shadow:0 4px 12px rgba(0,0,0,.18);font:400 16px/1.2 var(--f-mono);color:#333}'
]);

/* ---------------------------------------------------------------- slides */
var prev = 'wa-privacy';
SCAMS.forEach(function (s, idx) {
  var N = s.flags.length;
  Deck.insertSlide({
    after: prev, id: s.id, title: s.title, section: 'protect', tr: { type: 'fade', ms: 800 }, loop: false, calm: true,
    steps: N,
    render: function (el, ctx) {
      var r = h('div', 'pj ' + s.kind, el), dev;
      if (s.kind === 'phone') { dev = h('div', 'pj-ph', r); var scr = h('div', 'scr ' + s.scr, dev, s.html); h('div', 'isl', scr); }
      else dev = h('div', 'pj-mw', r, s.html);
      var col = h('div', 'pj-col', r,
        '<div class="pj-k">Spot the scam &middot; ' + (idx + 1) + '/' + SCAMS.length + '<span>' + s.chip + '</span></div>' +
        '<div class="pj-t">' + s.ttl + '</div>' +
        '<div class="pj-q"><div class="a">' + s.q + '</div><div class="b"><em>Do this:</em>' + s.ins + '</div></div>');
      var fl = h('div', 'pj-fl', col), st = el.__pj = { r: r, items: [], hits: [] };
      s.flags.forEach(function (f, i) {
        st.items.push(h('div', 'pj-f', fl, '<div class="n">' + (i + 1) + '</div><div><b>' + f[0] + '</b><span>' + f[1] + '</span></div>'));
        var tg = dev.querySelectorAll('[data-f="' + (i + 1) + '"]');
        st.hits.push(tg);
        if (!tg.length) return;
        var at = dev.querySelector('[data-f="' + (i + 1) + '"][data-pin]') || tg[0];
        h('i', 'pj-pin ' + (at.getAttribute('data-pin') || ''), at, String(i + 1));
      });
      h('div', 'pj-st', r, 'SCAM');
      show(st, ctx.static ? N : 0);
    },
    step: function (el, i) { if (el.__pj) show(el.__pj, i); },
    unstep: function (el, i) { if (el.__pj) show(el.__pj, i - 1); }
  });
  prev = s.id;
});

/* show the first k warning signs (k = 0: just the message; k = all: stamped, with what to do instead) */
function show(st, k) {
  st.items.forEach(function (it, i) {
    it.classList.toggle('on', i < k);
    Array.prototype.forEach.call(st.hits[i], function (n) { n.classList.toggle('hit', i < k); });
  });
  st.r.classList.toggle('done', k >= st.items.length);
}
})();
