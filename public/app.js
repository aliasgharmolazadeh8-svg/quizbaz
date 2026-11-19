const $=s=>document.querySelector(s),$$=s=>document.querySelectorAll(s);
const P={copy:'<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/>',send:'<path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z"/>',bolt:'<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>',crown:'<path d="m2 8 5 4 5-8 5 8 5-4-2 12H4L2 8z"/>',trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',target:'<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',users:'<circle cx="9" cy="8" r="3.5"/><path d="M2 21v-1a6 6 0 0 1 12 0v1M16 4.5a3.5 3.5 0 0 1 0 7M22 21v-1a6 6 0 0 0-4-5.6"/>',chat:'<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-5.5A8 8 0 1 1 21 12z"/>',flag:'<path d="M5 22V3M5 4h13l-2 4 2 4H5"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',check:'<path d="m5 12 5 5 9-10"/>',sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',moon:'<path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/>',spark:'<path d="M12 3l2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>',menu:'<path d="M4 6h16M4 12h16M4 18h16"/>'};
const ic=n=>`<svg class="i" viewBox="0 0 24 24">${P[n]}</svg>`;
/* ---------- i18n: [فارسی, English] ---------- */
const D={
  copy_code:['کپی کد','Copy code'],
copied:['کپی شد!','Copied!'],
copy_fail:['کپی نشد','Copy failed'],
time_up:['⏰ زمان تمام شد!','⏰ Time is up!'],
  send:['[send] ارسال','[send] Send'],
brand:['کوییز باز','Quiz Baz'],n_home:['خانه','Home'],n_why:['ویژگی‌ها','Features'],n_how:['روند بازی','How it works'],n_lb:['لیدربرد','Leaderboard'],n_about:['درباره ما','About'],
login:['ورود / ثبت‌نام','Sign in / up'],pill:['آماده بازی گروهی','Ready for team play'],
h1:['کوییزی که <em>با دوستات</em> بازی می‌کنی.','The quiz you play <em>with friends</em>.'],
hp:['تکی امتحان بده یا لابی بساز، باهم مشورت کنید و ببینید کی بیشتر می‌دونه.','Play solo or create a lobby, discuss together and see who knows more.'],
b_solo:['[target] شروع تک‌نفره','[target] Start solo'],b_multi:['[users] چندنفره','[users] Multiplayer'],
why_h:['چرا کوییز باز؟','Why Quiz Baz?'],why_s:['تجربه‌ای ساده، سریع و گروهی.','Simple, fast and social.'],
c1h:['زنده و سریع','Live & fast'],c1p:['چت و نتیجه سوال‌ها لحظه‌ای برای همه اعضا نمایش داده می‌شود.','Chat and answers update instantly for every member.'],
c2h:['لیدر تیم','Team leader'],c2p:['لیدر گزینه نهایی را می‌زند و می‌تواند لیدری را به عضو دیگری بدهد.','The leader locks in the final answer and can hand over leadership.'],
c3h:['رتبه‌بندی','Rankings'],c3p:['امتیازها ذخیره می‌شود و نفرات برتر در جدول دیده می‌شوند.','Scores are saved and top players show on the board.'],
how_h:['روند بازی','How it works'],how_s:['از ورود تا رتبه‌بندی، در چهار قدم.','From sign-up to rankings in four steps.'],
s1h:['ثبت‌نام','Sign up'],s1p:['حساب بساز یا وارد شو.','Create an account or sign in.'],s2h:['انتخاب','Choose'],s2p:['دسته و سختی سوالات.','Category and difficulty.'],
s3h:['لابی','Lobby'],s3p:['بساز یا با کد وارد شو.','Create one or join by code.'],s4h:['کوییز','Quiz'],s4p:['مشورت کن و امتیاز بگیر.','Discuss and score points.'],
top_h:['نفرات برتر','Top players'],top_s:['بهترین‌ها و آخرین نتایج.','The best and latest results.'],
about_h:['درباره ما','About us'],about_p:['کوییز باز یک پروژه سرگرمی و آموزشی است که با Node.js و Socket.io ساخته شده تا یادگیری و رقابت دوستانه را کنار هم تجربه کنی.','Quiz Baz is a fun, educational project built with Node.js and Socket.io so you can learn and compete with friends.'],
cta_h:['آماده‌ای شروع کنیم؟','Ready to start?'],cta_s:['یک لابی بساز و دوستانت را دعوت کن [spark]','Create a lobby and invite your friends [spark]'],
mk_lobby:['ساخت لابی','Create lobby'],foot_p:['بازی کن، مشورت کن، برنده شو.','Play, discuss, win.'],copy:['© 2026 کوییز باز · ساخته‌شده با Node.js','© 2026 Quiz Baz · Built with Node.js'],
t_solo:['تک‌نفره','Solo'],t_multi:['چندنفره','Multiplayer'],
lbl_cat:['دسته‌بندی سوالات','Question category'],lbl_dif:['سختی','Difficulty'],all:['همه','All'],gen:['عمومی','General'],sci:['علوم','Science'],tech:['فناوری','Tech'],
easy:['آسان','Easy'],medium:['متوسط','Medium'],hard:['سخت','Hard'],all_lv:['همه سطوح','All levels'],start_solo:['شروع کوییز','Start quiz'],
back:['بازگشت','Back'],join_h:['یا با کد وارد لابی شو','Or join with a code'],ph_code:['کد لابی','Lobby code'],enter:['ورود','Join'],
members:['اعضا','Members'],ready_b:['[check] آماده‌ام','[check] I\'m ready'],start_b:['شروع بازی','Start game'],leave:['خروج','Leave'],
chat_h:['[chat] چت','[chat] Chat'],ph_msg:['پیام...','Message...'],send:['ارسال','Send'],make_lead:['لیدر کن','Make leader'],ready_s:['آماده [check]','Ready [check]'],waiting:['منتظر','Waiting'],
q_of:['سوال {a} از {b}','Question {a} of {b}'],score:['امتیاز','Score'],
note_lead:['تو لیدر هستی؛ گزینه نهایی با توئه [crown]','You are the leader; the final pick is yours [crown]'],
note_mem:['در چت مشورت کنید؛ گزینه نهایی را لیدر می‌زند','Discuss in chat; the leader makes the final pick'],
chat_q:['[chat] مشورت','[chat] Discuss'],ph_opin:['نظرت رو بگو...','Share your thoughts...'],
fin:['[flag] پایان کوییز','[flag] Quiz finished'],again:['بازی دوباره','Play again'],home_b:['صفحه اصلی','Home'],
b_top:['[trophy] نفرات برتر','[trophy] Top players'],b_recent:['[clock] مبارزات اخیر','[clock] Recent battles'],none_p:['هنوز کسی نیست','Nobody yet'],none_g:['هنوز بازی‌ای ثبت نشده','No games yet'],
m_solo:['تکی','Solo'],m_grp:['گروهی','Team'],lb_h:['لیدربرد','Leaderboard'],lb_s:['۲۰ بازیکن برتر و آخرین مبارزات','Top 20 players and the latest battles'],
a_in:['ورود','Sign in'],a_up:['ثبت‌نام','Sign up'],ph_user:['نام کاربری','Username'],ph_pass:['رمز عبور','Password'],ok:['تأیید','Confirm'],close:['بستن','Close'],
pf_sub:['پروفایل من','My profile'],pf_pts:['امتیاز کل','Total score'],pf_rank:['رتبه','Rank'],pf_games:['مبارزه','Battles'],pf_recent:['مبارزات اخیر من','My recent battles'],
pf_name:['تغییر نام','Change name'],pf_pass:['تغییر رمز','Change password'],ph_newname:['نام جدید','New name'],ph_oldpass:['رمز فعلی','Current password'],ph_newpass:['رمز جدید','New password'],
save:['ذخیره','Save'],logout:['خروج از حساب','Log out'],saved:['ذخیره شد','Saved'],confirm_out:['از حساب خارج می‌شوی؟','Log out?'],conn:['اتصال برقرار نشد','Could not connect'],no_battle:['هنوز مبارزه‌ای نداری','No battles yet'],
/* پیام‌های سرور */
'ابتدا وارد شوید':['ابتدا وارد شوید','Please sign in first'],
'نام ۳ تا ۲۰ و رمز حداقل ۴ حرف باشد':['','Name 3–20 chars, password at least 4'],
'این نام قبلاً گرفته شده':['','This name is taken'],
'نام کاربری یا رمز اشتباه است':['','Wrong username or password'],
'نشست نامعتبر':['','Invalid session'],'لابی پیدا نشد':['','Lobby not found'],
'بازی در این لابی شروع شده':['','Game already started'],'لابی پر است':['','Lobby is full'],
'همه باید آماده باشند':['','Everyone must be ready'],'رمز فعلی اشتباه است':['','Current password is wrong'],
'رمز جدید حداقل ۴ حرف باشد':['','New password needs 4+ chars'],'نام باید ۳ تا ۲۰ حرف باشد':['','Name must be 3–20 chars']
};
let L=localStorage.lang==='en'?1:0;
const t=k=>(D[k]?(D[k][L]||k):k).replace(/\[(\w+)\]/g,(m,n)=>P[n]?ic(n):m),fmt=(k,o)=>t(k).replace(/\{(\w)\}/g,(_,x)=>o[x]);
const esc=x=>String(x).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const S={tk:localStorage.tk,user:null,mode:null,sock:null,L:null,view:'home',reg:0,after:null,chat:[]};
const toast=m=>{const e=$('#toast');e.textContent=m;e.hidden=false;setTimeout(()=>e.hidden=true,2500)};
const date=ts=>new Date(ts).toLocaleDateString(L?'en-US':'fa-IR');

function applyLang(){
 document.documentElement.lang=L?'en':'fa';document.documentElement.dir=L?'ltr':'rtl';
 $$('[data-i]').forEach(e=>e.innerHTML=t(e.dataset.i));$$('[data-ph]').forEach(e=>e.placeholder=t(e.dataset.ph));
 document.title=t('brand');$('#lng').textContent=L?'FA':'EN';hdr();setupTexts();renderLobby();renderChat();board();if(S.view==='profile')loadProfile()}
function toggleLang(){L=L?0:1;localStorage.lang=L?'en':'fa';applyLang()}
function setTheme(d){document.documentElement.dataset.theme=d;localStorage.theme=d;$('#thm').innerHTML=ic(d==='light'?'moon':'sun')}
function toggleTheme(){setTheme(document.documentElement.dataset.theme==='light'?'dark':'light')}

async function api(p,b){const r=await fetch('/api/'+p,{method:b?'POST':'GET',headers:{'Content-Type':'application/json',Authorization:S.tk||''},body:b&&JSON.stringify(b)});
 const j=await r.json();if(!r.ok)throw new Error(j.error||'Error');return j}
function go(v){S.view=v;scrollTo(0,0);$$('.v').forEach(e=>e.hidden=e.id!==v);if(['home','result','lb'].includes(v))board()}
function leaveIf(){if(S.L&&S.sock){S.sock.emit('leave');S.L=null}}
function nav(id){$('#links').classList.remove('open');if(S.view!=='home'){leaveIf();go('home')}
 setTimeout(()=>id==='home'?scrollTo({top:0,behavior:'smooth'}):$('#'+id).scrollIntoView({behavior:'smooth'}),40)}
function openLb(){$('#links').classList.remove('open');leaveIf();go('lb')}

/* ---------- auth & account ---------- */
function hdr(){$('#hdr').textContent=S.user?`${S.user.name} · ${S.user.points}`:t('login')}
function need(cb){if(S.user)return cb();S.after=cb;$('#aerr').textContent='';$('#auth').hidden=false}
function tab(r){S.reg=r;$('#tl').className=r?'':'on';$('#tr').className=r?'on':''}
async function doAuth(){try{const r=await api(S.reg?'register':'login',{name:$('#un').value,pass:$('#pw').value});
 S.tk=localStorage.tk=r.token;S.user=r.user;hdr();$('#auth').hidden=true;const f=S.after;S.after=null;f&&f()}catch(e){$('#aerr').textContent=t(e.message)}}
function acct(){if(!S.user)return need(()=>{});leaveIf();go('profile');loadProfile()}
function logout(){if(!confirm(t('confirm_out')))return;delete localStorage.tk;S.tk=S.user=null;
 if(S.sock){S.sock.disconnect();S.sock=null}S.L=null;hdr();go('home')}
async function loadProfile(){try{const p=await api('profile');S.user=p.user;hdr();
 $('#pname').textContent=p.user.name;$('#pav').textContent=[...p.user.name][0].toUpperCase();
 $('#pp').textContent=p.user.points;$('#pr').textContent='#'+p.rank;$('#pg').textContent=p.games;
 $('#prec').innerHTML=p.recent.map(r=>`<div class="li"><span>${t(r.mode==='solo'?'m_solo':'m_grp')} <small>${date(r.t)}</small></span><b>${r.score}</b></div>`).join('')||`<small>${t('no_battle')}</small>`}catch(e){toast(t(e.message))}}
async function chName(){try{S.user=await api('profile/name',{name:$('#nn').value});$('#nn').value='';toast(t('saved'));loadProfile()}catch(e){toast(t(e.message))}}
async function chPass(){try{await api('profile/password',{old:$('#op').value,pass:$('#np').value});$('#op').value=$('#np').value='';toast(t('saved'))}catch(e){toast(t(e.message))}}

/* ---------- leaderboard ---------- */
async function board(){try{const b=await api('leaderboard'),md=['#ffc83d','#c0c8d8','#cd7f32'].map(c=>`<span style="color:${c}">${ic('trophy')}</span>`);
 $$('.board').forEach(e=>{const n=e.dataset.full?20:5;
  e.innerHTML=`<div class="glass"><h3>${t('b_top')}</h3>${b.top.slice(0,n).map((u,i)=>`<div class="li"><span>${md[i]||(i+1)+'.'} ${esc(u.name)}</span><b>${u.points}</b></div>`).join('')||`<small>${t('none_p')}</small>`}</div>
  <div class="glass"><h3>${t('b_recent')}</h3>${b.recent.slice(0,n).map(r=>`<div class="li"><span>${esc(r.names.join(L?', ':'، '))} <small>${t(r.mode==='solo'?'m_solo':'m_grp')}</small></span><b>${r.score}</b></div>`).join('')||`<small>${t('none_g')}</small>`}</div>`})}catch{}}

/* ---------- setup & game ---------- */
function setupTexts(){if(!S.mode)return;$('#stitle').textContent=t(S.mode==='solo'?'t_solo':'t_multi');$('#sbtn').textContent=t(S.mode==='solo'?'start_solo':'mk_lobby')}
function setup(m){S.mode=m;setupTexts();$('#joinBox').hidden=m==='solo';go('setup')}
async function startGame(){const c=$('#cat').value,d=$('#dif').value;
 if(S.mode==='solo'){try{const r=await api('solo/start',{c,d});Object.assign(S,{sid:r.sid,qs:r.qs,i:0,ans:[]});soloQ()}catch(e){toast(t(e.message))}}
 else{connect();S.sock.emit('create',{c,d})}}
function join(){const code=$('#jcode').value;if(code){connect();S.sock.emit('join',{code})}}
function showQ(q,i,total,score,canPick,onPick,secs){
  go('quiz');$('#qn').textContent=fmt('q_of',{a:i+1,b:total});$('#qs').textContent=score===''?'':`${t('score')}: ${score}`;$('#qbar').style.width=(i/total*100)+'%';
  $('#qt').textContent=q.q;
  $('#qo').innerHTML=q.o.map((x,k)=>`<button ${canPick?'':'disabled'} data-k="${k}">${esc(x)}</button>`).join('');
  $$('#qo button').forEach(b=>b.onclick=()=>onPick(+b.dataset.k));
  clearInterval(S.qTick);
  const tm=$('#qtimer');
  if(secs){
    let left=secs;tm.hidden=false;tm.classList.remove('danger');
    tm.textContent=`⏱ ${left}`;
    S.qTick=setInterval(()=>{
      left--;
      if(left<=10)tm.classList.add('danger');
      tm.textContent=`⏱ ${Math.max(left,0)}`;
      if(left<=0){clearInterval(S.qTick);tm.hidden=true}
    },1000);
  }else{
    tm.hidden=true;
  }
}
function soloQ(){
  const i=S.i;
  $('#qchat').hidden=true;$('#qnote').textContent='';
  showQ(S.qs[i],i,S.qs.length,'',true,async k=>{
    clearInterval(S.qTick);
    S.ans.push(k);S.i++;
    if(S.i<S.qs.length)return soloQ();
    try{const r=await api('solo/submit',{sid:S.sid,answers:S.ans});S.user.points=r.points;hdr();finish(r.score,[S.user.name],'solo')}catch(e){toast(t(e.message))}
  },60);
  // اگه زمان تمام شد، جواب -1 ثبت بشه
  setTimeout(()=>{
    if(!S.qs||S.i!==i)return; // کاربر جواب داده
    // چک اینکه هنوز همون سواله
    if(S.view!=='quiz')return;
    clearInterval(S.qTick);
    S.ans.push(-1);S.i++;
    toast(t('time_up'));
    if(S.i<S.qs.length)soloQ();
    else api('solo/submit',{sid:S.sid,answers:S.ans}).then(r=>{S.user.points=r.points;hdr();finish(r.score,[S.user.name],'solo')});
  },60000);
}
function finish(score,names,mode){go('result');$('#rscore').textContent=score;$('#rnames').textContent=names.join(L?', ':'، ');S.rmode=mode}
function again(){S.rmode==='solo'?(S.mode='solo',startGame()):go('lobby')}

function connect(){if(S.sock)return;S.sock=io({auth:{token:S.tk}});
 S.sock.on('err',m=>toast(t(m)));S.sock.on('connect_error',()=>{toast(t('conn'));S.sock=null});
 S.sock.on('lobby',l=>{S.L=l;if(l.state==='wait'&&['setup','lobby'].includes(S.view)){if(S.view==='setup')S.chat=[];go('lobby')}renderLobby()});
 S.sock.on('chat',a=>{S.chat.push(...a);renderChat()});
S.sock.on('question',d=>{
  $('#qchat').hidden=false;
  const lead=S.L.leader===S.user.id;
  $('#qnote').innerHTML=t(lead?'note_lead':'note_mem');
  showQ(d.q,d.i,d.total,d.score,lead,k=>S.sock.emit('answer',k),d.time);
});
S.sock.on('reveal',d=>{
  clearInterval(S.qTick);
  $$('#qo button').forEach((b,k)=>{
    b.disabled=true;
    if(k===d.answer)b.classList.add('ok');
    else if(k===d.picked)b.classList.add('bad');
  });
  $('#qs').textContent=`${t('score')}: ${d.score}`;
  if(d.timeout)toast(t('time_up'));
});
 S.sock.on('finish',d=>{finish(d.score,d.names,'multi');api('me').then(u=>{S.user=u;hdr()})})}
function leaveLobby(){if(S.sock)S.sock.emit('leave');S.L=null;S.chat=[];go('home')}
function renderLobby(){const l=S.L;if(!l||!S.user)return;$('#lcode').textContent=l.code;const lead=l.leader===S.user.id;
 $('#mem').innerHTML=l.members.map(m=>`<div class="li"><span>${m.id===l.leader?`<span class="crown">${ic('crown')}</span> `:''}${esc(m.name)}</span>
  <span>${m.ready||m.id===l.leader?`<span class="ok">${t('ready_s')}</span>`:`<small>${t('waiting')}</small>`} ${lead&&m.id!==l.leader?`<button class="p" style="padding:3px 10px" onclick="S.sock.emit('promote','${m.id}')">${t('make_lead')}</button>`:''}</span></div>`).join('')
  +`<small style="color:var(--m)">${t(l.c)} · ${t(l.d==='all'?'all_lv':l.d)}</small>`;
 $('#stbtn').hidden=!lead}
function renderChat(){$$('.chat .msgs').forEach(b=>{
 b.innerHTML=S.chat.map(m=>{
  const me=S.user&&m.uid===S.user.id,tm=new Date(m.t).toLocaleTimeString(L?'en-US':'fa-IR',{hour:'2-digit',minute:'2-digit'});
  return `<div class="msg ${me?'me':''}"><span class="av">${esc([...m.name][0]||'?').toUpperCase()}</span><div class="bub">${me?'':`<b>${esc(m.name)}</b>`}<p>${esc(m.text)}</p><time>${tm}</time></div></div>`}).join('');
 b.scrollTop=b.scrollHeight})}
function sendChat(f){const i=f.querySelector('input');if(i.value.trim()&&S.sock)S.sock.emit('chat',i.value);i.value='';return false}

/* ---------- boot ---------- */
setTheme(localStorage.theme||'dark');
if(S.tk)api('me').then(u=>{S.user=u;hdr()}).catch(()=>{delete localStorage.tk;S.tk=null});
$$('[data-ic]').forEach(e=>e.outerHTML=ic(e.dataset.ic));
applyLang();
async function copyCode(){
  const code = ($('#lcode')?.textContent || '').trim();
  if(!code) return;
  const btn = $('#copyCode');
  const label = btn.querySelector('span');
  const setBtn = txt => { if(label) label.textContent = txt; };
  try{
    if(navigator.clipboard && window.isSecureContext){
      await navigator.clipboard.writeText(code);
    }else{
      // فالبک برای مرورگرهای قدیمی یا HTTP
      const ta = document.createElement('textarea');
      ta.value = code;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setBtn(t('copied'));
    toast(t('copied'));
    btn.classList.add('copied');
    setTimeout(()=>{ setBtn(t('copy_code')); btn.classList.remove('copied'); }, 1500);
  }catch(e){
    toast(t('copy_fail'));
  }
}
