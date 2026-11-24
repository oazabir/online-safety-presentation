/* ============================================================================
   part-k.js - 'audree-trap' (all three versions, after 'night-contact-abuse'; own notes in each notes file):the story of Audree, 13, Kentucky (died 2024),
   told as three phones side by side: Roblox -> TikTok -> Discord. Each click brings in the next phone with the hand-off line
   that moved her there; then the ultimatum; then what her mother says now.
     click 1  TikTok phone      click 2  Discord phone      click 3  the ultimatum (phones fade)      click 4  what is left
   The chats are ILLUSTRATIONS of the pattern with an invented child ("pixel_kid09"); they are not Audree's messages and the
   slide says so. No method of death, no shooter names, no real chat. Sources: CBS News (12 Jan 2026), WORLD (19 Nov 2026).
   Back undoes every build. Draws the end state when ctx.static (overview / presenter thumbnails).
   ============================================================================ */
(function () {
'use strict';
if (!window.Deck || !window.DECK_DATA) return;

function h(tag, cls, parent, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; if (parent) parent.appendChild(e); return e; }
function addCss(id, rules) { if (document.getElementById(id)) return; var st = document.createElement('style'); st.id = id; st.textContent = rules.join('\n'); document.head.appendChild(st); }

var SIG = '<svg viewBox="0 0 18 12" fill="currentColor"><rect y="8" width="3" height="4" rx="1"/><rect x="5" y="5.5" width="3" height="6.5" rx="1"/><rect x="10" y="3" width="3" height="9" rx="1"/><rect x="15" width="3" height="12" rx="1"/></svg>';
var BAT = '<svg viewBox="0 0 27 13"><rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".45"/><rect x="2" y="2" width="16" height="9" rx="2" fill="currentColor"/></svg>';
function sb(c) { return '<div class="ak-sb" style="color:' + c + '"><b>9:41</b><span>' + SIG + BAT + '</span></div>'; }
function bb(i, cls, html, st) { return '<div class="bb ' + cls + '" style="--i:' + i + (st ? ';' + st : '') + '">' + html + '</div>'; }

/* ---------------------------------------------------------------- 1 Roblox: a blocky world, a friendly stranger in the chat */
function robloxScreen() {
  var L = function (i, n, c, t) { return bb(i, 'rb-l', '<b style="color:' + c + '">' + n + ':</b> ' + t); };
  return sb('#fff') +
    '<div class="rb-sc"><i class="sun"></i><i class="cl c1"></i><i class="cl c2"></i>' +
      '<i class="blk" style="left:46px;bottom:96px;background:#e2231a"></i><i class="blk" style="left:46px;bottom:132px;background:#f2c94c;width:30px;height:30px"></i>' +
      '<i class="blk" style="left:300px;bottom:96px;background:#7b61ff;width:44px;height:44px"></i>' +
      '<div class="rb-av a1"><em>pixel_kid09</em></div><div class="rb-av a2"><em>Kai_x</em></div><div class="rb-gr"></div></div>' +
    '<div class="rb-chat"><div class="rb-hd">Chat</div>' +
      L(1, 'Kai_x', '#ff9f43', 'omg ur build is insane 😮') +
      L(2, 'pixel_kid09', '#6ec1ff', 'haha thanks!!') +
      L(3, 'Kai_x', '#ff9f43', 'ur way cooler than the kids at ur school lol') +
      L(4, 'Kai_x', '#ff9f43', 'chat here is boring') +
      L(5, 'Kai_x', '#ff9f43', '<span class="mv">follow me on TikTok 👀</span>') +
    '</div><div class="rb-in">Tap here to chat</div>';
}

/* ---------------------------------------------------------------- 2 TikTok: a dark video, then a private chat */
function tiktokScreen() {
  var M = function (i, o, t) { return bb(i, 'tk-m ' + (o ? 'o' : 'i'), t); };
  return sb('#fff') +
    '<div class="tk-h"><i class="bk">&lsaquo;</i><div class="av">K</div><div><b>kai.x</b><small>Active now</small></div></div>' +
    '<div class="tk-b">' +
      bb(0, 'tk-vid', '<div class="v"><i class="moon"></i><i class="fg"></i><span class="pl">&#9654;</span></div><div class="c">dark edit &middot; part 12 🖤<small>@kai.x</small></div>') +
      M(1, 0, 'that&rsquo;s how u feel right?') +
      M(2, 1, 'omg yes 😭 how did u know') +
      M(3, 0, 'we all feel it. there&rsquo;s a private group for us') +
      M(4, 0, '<span class="mv">i&rsquo;ll send u the Discord. don&rsquo;t tell anyone</span>') +
    '</div><div class="tk-in">Send a message...</div>';
}

/* ---------------------------------------------------------------- 3 Discord: the private room, "friends", secrecy */
function discordScreen() {
  var H = '<div class="av" style="background:#f0b232">K</div>';
  return sb('#fff') +
    '<div class="dc-h"><i class="bk">&lsaquo;</i><div class="av" style="background:#f0b232">K<u></u></div><b>Kai_x</b><span>&#9906;</span></div>' +
    '<div class="dc-b">' +
      bb(0, 'dc-sys', 'Kai_x added you to a private server<br><small>6 members</small>') +
      bb(1, 'dc-m', H + '<div><b style="color:#f0b232">Kai_x</b><time>Today at 21:47</time><p>welcome home 🖤</p></div>') +
      bb(2, 'dc-m', '<div class="av" style="background:#3ba55d">M</div><div><b style="color:#3ba55d">Mira_7</b><time>21:47</time><p>we get u. u belong here now</p></div>') +
      bb(3, 'dc-m', '<div class="av" style="background:#5865f2">P</div><div><b style="color:#9aa4ff">pixel_kid09</b><time>21:48</time><p>finally ppl who get me</p></div>') +
      bb(4, 'dc-m', H + '<div><b style="color:#f0b232">Kai_x</b><time>21:49</time><p><span class="mv">ur parents wouldn&rsquo;t understand. keep it between us</span></p></div>') +
    '</div><div class="dc-in">Message @Kai_x</div>';
}

var COLS = [
  { n: 1, name: 'Roblox', sub: 'A friendly stranger', dot: 'linear-gradient(135deg,#ff5a4f,#c4140c)', scr: 'rb', html: robloxScreen },
  { n: 2, name: 'TikTok', sub: 'Dark videos. A private chat.', dot: 'linear-gradient(135deg,#25f4ee,#fe2c55)', scr: 'tk', html: tiktokScreen },
  { n: 3, name: 'Discord', sub: 'A secret room of &ldquo;friends&rdquo;', dot: 'linear-gradient(135deg,#7983f5,#4752c4)', scr: 'dc', html: discordScreen }
];
var HAND = ['&ldquo;Follow me on TikTok&rdquo;', '&ldquo;Join my private Discord&rdquo;'];
var SRC = ['https://www.cbsnews.com/news/tcc-764-online-extremists-school-shooters-parents-warning/', 'https://wng.org/roundups/unsafe-play-1795130420'];

addCss('ak-css', [
  '.ak{position:absolute;inset:0;font-family:var(--f-body);color:var(--ink)}',
  '.ak *{box-sizing:border-box}',
  '.ak-k{position:absolute;left:120px;top:36px;font:700 20px/1 var(--f-body);letter-spacing:.2em;text-transform:uppercase;color:#ff8a8a}',
  '.ak-t{position:absolute;left:120px;top:66px;font:600 68px/1.05 var(--f-display);letter-spacing:-.02em;color:#fff}',
  '.ak-t em{font-style:italic;color:#ff6b6b}',
  '.ak-il{position:absolute;right:120px;top:50px;padding:9px 20px;border-radius:99px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 1.5px rgba(255,255,255,.22);font:500 20px/1.2 var(--f-body);color:var(--muted)}',
  /* a column = platform label + phone. Hidden columns wait to the right; the transform is rebuilt from custom properties */
  '.ak-col{position:absolute;top:150px;width:400px;transform:translateX(var(--tx,0)) rotate(var(--r,0deg)) scale(var(--s,1));transition:opacity .7s,transform .9s var(--ease),filter .7s}',
  '.ak-col.c1{left:150px;--r:-1.2deg}.ak-col.c2{left:760px;--tx:70px;--s:.94;opacity:0}.ak-col.c3{left:1370px;--r:1.2deg;--tx:70px;--s:.94;opacity:0}',
  '.ak.k1 .c2,.ak.k2 .c3{--tx:0px;--s:1;opacity:1}',
  '.ak-lb{height:70px;padding-left:6px}',
  '.ak-lb b{display:flex;align-items:center;gap:14px;font:600 36px/1 var(--f-display);color:#fff}',
  '.ak-lb b i{width:20px;height:20px;border-radius:6px;flex:none;transform:rotate(12deg)}',
  '.ak-lb span{display:block;margin-top:9px;font:500 23px/1.1 var(--f-body);color:var(--muted)}',
  '.ak-ph{position:relative;margin-top:14px;width:400px;height:728px;border-radius:64px;background:#0e0f12;padding:12px;box-shadow:0 0 0 2px #3a3b42,0 40px 90px rgba(0,0,0,.65)}',
  '.ak-ph .scr{position:relative;width:100%;height:100%;border-radius:53px;overflow:hidden;display:flex;flex-direction:column;color:#fff}',
  '.ak-ph .isl{position:absolute;left:50%;top:13px;width:112px;height:32px;margin-left:-56px;border-radius:20px;background:#000;z-index:8}',
  '.ak-sb{flex:none;height:58px;display:flex;align-items:center;justify-content:space-between;padding:8px 36px 0 44px;font:600 20px/1 var(--f-body);position:relative;z-index:5}',
  '.ak-sb span{display:flex;gap:7px;align-items:center}.ak-sb svg{height:14px;width:auto}',
  /* messages: each .bb waits (hidden) until its phone is on, then pops in one after another */
  '.ak .bb{opacity:0;transform:translateY(16px) scale(.96)}',
  '.ak.k0 .c1 .bb,.ak.k1 .c2 .bb,.ak.k2 .c3 .bb{opacity:1;transform:none;transition:opacity .45s,transform .55s cubic-bezier(.3,1.4,.5,1);transition-delay:calc(var(--i) * .75s + .55s)}',
  '.ak.rm .bb,.ak.rm .ak-col,.ak.rm *{transition:none!important;animation:none!important}',
  '.ak.rm .bb{transition-delay:0s!important}',
  '.ak .mv{font-weight:700;color:#ffb3b3;background:rgba(255,77,77,.16);border-radius:6px;box-shadow:0 0 0 3px rgba(255,77,77,.16)}',
  /* Roblox */
  '.ak .rb{background:#1b1d21}.ak .rb .ak-sb{position:absolute;left:0;right:0;top:0;color:#12304f!important}',
  '.rb-sc{position:relative;flex:none;height:290px;background:linear-gradient(#4f9ff0,#cfeaff 78%)}',
  '.rb-sc .sun{position:absolute;right:46px;top:76px;width:54px;height:54px;border-radius:50%;background:#fff6c4;box-shadow:0 0 40px 12px rgba(255,246,196,.7)}',
  '.rb-sc .cl{position:absolute;height:22px;border-radius:12px;background:rgba(255,255,255,.85)}.rb-sc .c1{left:30px;top:92px;width:92px}.rb-sc .c2{left:180px;top:150px;width:70px}',
  '.rb-sc .blk{position:absolute;width:36px;height:36px;border-radius:3px;box-shadow:inset 0 -5px 0 rgba(0,0,0,.18)}',
  '.rb-gr{position:absolute;left:0;right:0;bottom:0;height:92px;background:repeating-linear-gradient(90deg,#4f9b3a 0 40px,#478f34 40px 80px);border-top:6px solid #3a7a2a}',
  '.rb-av{position:absolute;bottom:92px;width:38px;height:46px;border-radius:5px;background:#2a6fdb;box-shadow:inset 0 -5px 0 rgba(0,0,0,.18)}',
  '.rb-av::before{content:"";position:absolute;left:5px;top:-29px;width:28px;height:28px;border-radius:6px;background:#f2c94c;box-shadow:inset 0 -4px 0 rgba(0,0,0,.12)}',
  '.rb-av::after{content:"";position:absolute;left:0;bottom:-28px;width:38px;height:28px;background:linear-gradient(90deg,#3b3f46 0 46%,transparent 46% 54%,#3b3f46 54%)}',
  '.rb-av em{position:absolute;left:50%;top:-62px;transform:translateX(-50%);white-space:nowrap;padding:3px 10px;border-radius:99px;background:rgba(0,0,0,.55);color:#fff;font:600 15px/1.2 var(--f-body);font-style:normal}',
  '.rb-av.a1{left:112px}.rb-av.a2{left:200px;background:#8e3dd1}',
  '.rb-chat{flex:1;padding:14px 16px;background:#1b1d21;display:flex;flex-direction:column;gap:9px;overflow:hidden}',
  '.rb-hd{font:600 17px/1 var(--f-body);color:#8d93a0;letter-spacing:.14em;text-transform:uppercase}',
  '.rb-l{padding:9px 14px;border-radius:10px;background:rgba(255,255,255,.07);font:400 21px/1.28 var(--f-body);color:#eef0f4}',
  '.rb-l b{font-weight:700}',
  '.rb-in{flex:none;margin:6px 16px 30px;height:46px;border-radius:23px;background:#2c2f36;padding:0 20px;font:400 19px/46px var(--f-body);color:#7f8593}',
  /* TikTok */
  '.ak .tk{background:#000}.ak .tk .ak-sb{background:#000}',
  '.tk-h{flex:none;display:flex;align-items:center;gap:12px;padding:8px 18px 14px 14px;border-bottom:1px solid #222}',
  '.tk-h .bk{font:300 50px/1 var(--f-body);font-style:normal;color:#fff;margin-top:-6px}',
  '.tk-h .av,.tk .av{width:50px;height:50px;border-radius:50%;background:linear-gradient(135deg,#25f4ee,#fe2c55);display:grid;place-items:center;font:700 24px/1 var(--f-body);color:#000}',
  '.tk-h b{display:block;font:700 22px/1.1 var(--f-body)}.tk-h small{font:400 16px/1.2 var(--f-body);color:#8a8b91}',
  '.tk-b{flex:1;padding:14px 16px;display:flex;flex-direction:column;gap:10px;overflow:hidden;background:#0b0b0d}',
  '.tk-vid{display:flex;gap:14px;align-items:center;max-width:92%;padding:10px;border-radius:20px;background:#1e1e22}',
  '.tk-vid .v{position:relative;flex:none;width:88px;height:116px;border-radius:14px;overflow:hidden;background:linear-gradient(#1a0f2e,#05050a 70%)}',
  '.tk-vid .moon{position:absolute;right:16px;top:16px;width:26px;height:26px;border-radius:50%;background:#e7e2ff;box-shadow:-7px 0 0 0 #1a0f2e inset,0 0 18px rgba(231,226,255,.6)}',
  '.tk-vid .fg{position:absolute;left:50%;bottom:-6px;width:60px;height:76px;margin-left:-30px;background:#000;border-radius:35px 35px 0 0}',
  '.tk-vid .fg::before{content:"";position:absolute;left:15px;top:-24px;width:30px;height:30px;border-radius:50%;background:#000}',
  '.tk-vid .pl{position:absolute;left:50%;top:50%;width:38px;height:38px;margin:-19px 0 0 -19px;border-radius:50%;background:rgba(255,255,255,.22);display:grid;place-items:center;font-size:15px;color:#fff;padding-left:3px}',
  '.tk-vid .c{font:600 20px/1.3 var(--f-body);color:#f1f1f3}.tk-vid small{display:block;margin-top:6px;font:400 16px/1 var(--f-body);color:#8a8b91}',
  '.tk-m{max-width:80%;padding:12px 17px;border-radius:22px;font:400 21px/1.3 var(--f-body)}',
  '.tk-m.i{align-self:flex-start;background:#2a2a2f;border-bottom-left-radius:7px}',
  '.tk-m.o{align-self:flex-end;background:#fe2c55;border-bottom-right-radius:7px}',
  '.tk-in{flex:none;margin:6px 16px 30px;height:46px;border-radius:23px;background:#1e1e22;padding:0 20px;font:400 19px/46px var(--f-body);color:#6e6f76}',
  /* Discord */
  '.ak .dc{background:#313338}.ak .dc .ak-sb{background:#2b2d31}',
  '.dc-h{flex:none;display:flex;align-items:center;gap:12px;padding:6px 18px 14px 12px;background:#2b2d31;border-bottom:1px solid #1e1f22}',
  '.dc-h .bk{font:300 50px/1 var(--f-body);font-style:normal;color:#b5bac1;margin-top:-6px}',
  '.dc-h b{flex:1;font:700 24px/1 var(--f-body)}.dc-h span{font-size:26px;color:#b5bac1}',
  '.dc .av{position:relative;flex:none;width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font:700 22px/1 var(--f-body);color:#fff}',
  '.dc-h .av u{position:absolute;right:-2px;bottom:-2px;width:15px;height:15px;border-radius:50%;background:#23a55a;box-shadow:0 0 0 3px #2b2d31}',
  '.dc-b{flex:1;padding:16px 16px;display:flex;flex-direction:column;gap:15px;overflow:hidden}',
  '.dc-sys{align-self:center;text-align:center;padding:10px 20px;border-radius:12px;background:#404249;font:500 19px/1.3 var(--f-body);color:#dbdee1}.dc-sys small{color:#949ba4;font-size:16px}',
  '.dc-m{display:flex;gap:13px;align-items:flex-start}',
  '.dc-m b{font:700 21px/1.2 var(--f-body)}.dc-m time{margin-left:9px;font:400 15px/1 var(--f-body);color:#949ba4}',
  '.dc-m p{margin:3px 0 0;font:400 21px/1.3 var(--f-body);color:#dbdee1}',
  '.dc-in{flex:none;margin:6px 14px 30px;height:48px;border-radius:12px;background:#383a40;padding:0 18px;font:400 20px/48px var(--f-body);color:#6d6f78}',
  /* hand-off between phones: the line that moved her, with chevrons pointing the way */
  '.ak-ar{position:absolute;top:470px;width:210px;display:flex;flex-direction:column;align-items:center;gap:16px;opacity:0;transform:translateY(10px);transition:opacity .6s .5s,transform .7s .5s var(--ease)}',
  '.ak-ar.a1{left:550px}.ak-ar.a2{left:1160px}',
  '.ak.k1 .a1,.ak.k2 .a2{opacity:1;transform:none}',
  '.ak-ar .tag{margin:0 14px;padding:10px 16px;border-radius:16px;background:rgba(255,77,77,.14);box-shadow:inset 0 0 0 2px rgba(255,77,77,.55);font:600 21px/1.25 var(--f-body);color:#ffd0d0;text-align:center}',
  '.ak-ar .ch{display:flex;gap:2px;font:300 78px/1 var(--f-body);color:#ff6b6b}',
  '.ak-ar .ch i{font-style:normal;animation:ak-ch 1.5s infinite}.ak-ar .ch i:nth-child(2){animation-delay:.25s}.ak-ar .ch i:nth-child(3){animation-delay:.5s}',
  '@keyframes ak-ch{0%,100%{opacity:.15}40%{opacity:1}}',
  /* intro bullets beside the first phone; they leave when the TikTok phone arrives */
  '.ak-in{position:absolute;left:720px;top:300px;width:1030px;transition:opacity .6s,transform .7s var(--ease)}',
  '.ak.k1 .ak-in{opacity:0;transform:translateX(-40px);pointer-events:none}',
  '.ak-b{display:flex;gap:28px;align-items:flex-start;margin-bottom:40px;opacity:0;transform:translateX(44px)}',
  '.ak.k0 .ak-b{opacity:1;transform:none;transition:opacity .6s,transform .8s var(--ease);transition-delay:calc(var(--i) * .8s + .5s)}',
  '.ak-b .m{flex:none;width:20px;height:20px;margin-top:20px;border-radius:5px;background:#ff6b6b;transform:rotate(12deg);box-shadow:0 0 18px rgba(255,107,107,.55)}',
  '.ak-b span{font:500 48px/1.22 var(--f-body);color:#fff}',
  '.ak-b span em{font-style:normal;font-weight:700;color:#ff9a9a}',
  '.ak-b.q span{font:italic 600 52px/1.18 var(--f-display)}',
  '.ak-b.q span small{display:block;margin-top:8px;font:500 24px/1.2 var(--f-body);font-style:normal;color:var(--muted)}',
  '.ak-b.go span{font-weight:700;color:#ff9a9a}',
  /* the ultimatum, over the faded phones */
  '.ak-red{position:absolute;inset:0;background:radial-gradient(78% 72% at 50% 50%,rgba(150,10,20,.6),rgba(40,0,6,.45) 65%,rgba(0,0,0,0) 100%);opacity:0;transition:opacity .8s;pointer-events:none}',
  '.ak.k3 .ak-red{opacity:1}.ak.k4 .ak-red{opacity:.7}',
  /* the ultimatum, drawn as a big Discord DM; its lines pop in one by one */
  '.ak-ul{position:absolute;left:340px;width:1240px;top:210px;opacity:0;transform:scale(.94);transition:opacity .7s,transform .9s cubic-bezier(.3,1.3,.5,1);pointer-events:none}',
  '.ak-ul>small{display:block;margin-bottom:26px;text-align:center;font:700 26px/1 var(--f-body);letter-spacing:.24em;text-transform:uppercase;color:#ff8a8a}',
  '.ak-dw{border-radius:28px;overflow:hidden;background:#313338;box-shadow:0 0 0 2px rgba(255,255,255,.1),0 40px 120px rgba(0,0,0,.7),0 0 120px rgba(255,40,40,.25)}',
  '.ak-dh{display:flex;align-items:center;gap:20px;padding:20px 34px;background:#2b2d31;border-bottom:2px solid #1e1f22;color:#fff}',
  '.ak-dh b{font:700 36px/1 var(--f-body)}.ak-dh span{margin-left:auto;font:500 24px/1 var(--f-body);color:#949ba4}',
  '.ak-dw .av{position:relative;flex:none;width:76px;height:76px;border-radius:50%;display:grid;place-items:center;font:700 36px/1 var(--f-body);color:#fff}',
  '.ak-dh .av{width:62px;height:62px;font-size:30px}',
  '.ak-dh .av u{position:absolute;right:-2px;bottom:-2px;width:20px;height:20px;border-radius:50%;background:#23a55a;box-shadow:0 0 0 4px #2b2d31}',
  '.ak-db{padding:34px 34px 30px;display:flex;flex-direction:column;gap:30px}',
  '.ak-dm{display:flex;gap:24px;align-items:flex-start;opacity:0;transform:translateY(18px);transition:opacity .45s,transform .55s cubic-bezier(.3,1.4,.5,1)}',
  '.ak.k3 .ak-dm{opacity:1;transform:none;transition-delay:calc(var(--i) * 1.1s + .7s)}',
  '.ak.k4 .ak-dm{opacity:1;transform:none}',
  '.ak-dm .nm{font:700 36px/1.1 var(--f-body)}.ak-dm time{margin-left:16px;font:400 24px/1 var(--f-body);color:#949ba4}',
  '.ak-dm p{margin:8px 0 0;font:400 46px/1.25 var(--f-body);color:#dbdee1}',
  '.ak-dm p+p{margin-top:6px}',
  '.ak-dm p .hot{font-weight:700;color:#fff;background:rgba(255,77,77,.28);border-radius:8px;padding:0 10px;box-shadow:0 0 0 3px rgba(255,77,77,.28)}',
  '.ak-di{margin:0 34px 34px;height:70px;border-radius:16px;background:#383a40;padding:0 26px;font:400 28px/70px var(--f-body);color:#6d6f78}',
  '.ak.rm .ak-dm{transition:none!important;transition-delay:0s!important}',
  '.ak.k3 .ak-col{opacity:.12;filter:blur(3px);--tx:0px;--s:.96}.ak.k3 .ak-ar,.ak.k3 .ak-il{opacity:0}.ak.k4 .ak-il{opacity:0}',
  '.ak-il{transition:opacity .6s}',
  '.ak.k4 .ak-col{opacity:.06}',
  '.ak.k3 .ak-ul{opacity:1;transform:none}.ak.k4 .ak-ul{opacity:0;transform:scale(1.06)}',
  /* what is left: three facts and her mother's advice */
  '.ak-end{position:absolute;left:120px;right:120px;top:190px;opacity:0;transform:translateY(24px);transition:opacity .8s .2s,transform .9s .2s var(--ease);pointer-events:none}',
  '.ak.k4 .ak-end{opacity:1;transform:none}',
  '.ak-tl{display:flex;gap:34px;justify-content:center}',
  '.ak-tile{flex:1;max-width:520px;padding:34px 30px 30px;border-radius:30px;background:rgba(255,255,255,.07);box-shadow:inset 0 0 0 2px rgba(255,255,255,.14);text-align:center}',
  '.ak-tile b{display:block;font:600 190px/.95 var(--f-display);letter-spacing:-.03em;color:#fff}',
  '.ak-tile.r b{color:#ff6b6b}',
  '.ak-tile span{display:block;margin-top:18px;font:500 31px/1.25 var(--f-body);color:var(--ink2)}',
  '.ak-q{margin-top:54px;text-align:center;font:italic 600 76px/1.1 var(--f-display);color:#fff}',
  '.ak-q small{display:block;margin-top:18px;font:500 27px/1.2 var(--f-body);font-style:normal;color:var(--muted);letter-spacing:.02em}',
  '.ak-ft{position:absolute;left:120px;right:120px;bottom:104px;text-align:center;font:400 21px/1.4 var(--f-body);color:var(--muted);opacity:0;transition:opacity .8s .6s}',
  '.ak.k4 .ak-ft{opacity:1}'
]);

Deck.insertSlide({
  after: 'night-contact-abuse', id: 'audree-trap', title: 'Audree: from a game to a trap', section: 'grooming',
  tr: { type: 'fade', ms: 900 }, loop: false, calm: true, steps: 4,
  render: function (el, ctx) {
    var r = h('div', 'ak', el), kid = Deck.edition === 'child';   /* Child version (ages 10-12): no "suicide" on screen, and a tell-an-adult footer instead of the lawsuit */
    if (ctx.reduced) r.classList.add('rm');
    h('div', 'ak-red', r);
    h('div', 'ak-k', r, 'A true story &middot; 2024');
    h('div', 'ak-t', r, 'From a game to a <em>trap</em>');
    h('div', 'ak-il', r, 'Illustration of the pattern, not her real messages');
    COLS.forEach(function (c, i) {
      var col = h('div', 'ak-col c' + c.n, r,
        '<div class="ak-lb"><b><i style="background:' + c.dot + '"></i>' + c.name + '</b><span>' + c.sub + '</span></div>');
      var ph = h('div', 'ak-ph', col), scr = h('div', 'scr ' + c.scr, ph, c.html());
      h('div', 'isl', ph);
      if (i < 2) h('div', 'ak-ar a' + (i + 1), r, '<div class="tag">' + HAND[i] + '</div><div class="ch"><i>&rsaquo;</i><i>&rsaquo;</i><i>&rsaquo;</i></div>');
    });
    var B = function (i, cls, html) { return '<div class="ak-b ' + cls + '" style="--i:' + i + '"><i class="m"></i><span>' + html + '</span></div>'; };
    h('div', 'ak-in', r,
      B(0, '', '<em>Audree</em>, a 13-year-old girl from Kentucky') +
      B(1, '', 'Started playing Roblox at <em>8</em>') +
      B(2, 'q', '&ldquo;Funny, smart, and very caring.&rdquo;<small>Her mother, Jaimee Seitz</small>') +
      B(3, '', 'In 7th grade, she felt left out at school') +
      B(4, 'go', 'Then, in the game chat, a stranger noticed her.'));
    var AVK = '<div class="av" style="background:#f0b232">K</div>', AVP = '<div class="av" style="background:#5865f2">P</div>';
    h('div', 'ak-ul', r,
      '<small>Then, the ultimatum</small>' +
      '<div class="ak-dw">' +
        '<div class="ak-dh"><div class="av" style="background:#f0b232">K<u></u></div><b>Kai_x</b><span>Direct Message</span></div>' +
        '<div class="ak-db">' +
          '<div class="ak-dm" style="--i:0">' + AVK + '<div><span class="nm" style="color:#f0b232">Kai_x</span><time>Today at 22:14</time>' +
            '<p>u want to stay in the group right?</p><p>then u have to prove it</p>' +
            '<p><span class="hot">hurt someone else.</span></p><p><span class="hot">or hurt urself.</span> ur choice</p></div></div>' +
          '<div class="ak-dm" style="--i:3">' + AVP + '<div><span class="nm" style="color:#9aa4ff">pixel_kid09</span><time>22:15</time><p>wait what</p></div></div>' +
        '</div>' +
        '<div class="ak-di">Message @Kai_x</div>' +
      '</div>');
    h('div', 'ak-end', r,
      '<div class="ak-tl">' +
        '<div class="ak-tile"><b>8</b><span>when she joined Roblox</span></div>' +
        '<div class="ak-tile r"><b>ON</b><span>parental controls</span></div>' +
        '<div class="ak-tile"><b>13</b><span>when she died' + (kid ? '' : ' by suicide') + '</span></div>' +
      '</div>' +
      '<div class="ak-q">&ldquo;Monitor as much as possible.&rdquo;<small>Jaimee Seitz, Audree&rsquo;s mother</small></div>');
    h('div', 'ak-ft', r, kid
      ? 'If anything online scares or upsets you, tell a trusted adult. Always, even if someone told you to keep it secret.'
      : 'Her mother is suing Roblox, Discord and TikTok; these are allegations. If you or your child are struggling, tell a trusted adult or call your local crisis line today.');
    var box = h('div', 'chips', r); SRC.forEach(function (u) { box.appendChild(Deck.sourceChip(u)); });
    el.__ak = r;
    if (ctx.static) { for (var k = 0; k <= 4; k++) r.classList.add('k' + k); }
    else if (ctx.reduced) r.classList.add('k0');
  },
  enter: function (el, ctx) {
    var r = el.__ak; if (!r || ctx.static) return;
    if (ctx.reduced) r.classList.add('k0'); else ctx.timeout(function () { r.classList.add('k0'); }, 350);
  },
  step: function (el, i) { set(el.__ak, i); },
  unstep: function (el, i) { set(el.__ak, i - 1); }
});

function set(r, k) {
  if (!r) return;
  for (var n = 1; n <= 4; n++) r.classList.toggle('k' + n, k >= n);
  r.classList.add('k0');
}
})();
