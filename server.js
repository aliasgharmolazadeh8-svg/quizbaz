const express=require('express'),http=require('http'),crypto=require('crypto'),fs=require('fs'),path=require('path');
const {Server}=require('socket.io');
const app=express(),srv=http.createServer(app),io=new Server(srv);
app.use(express.json());app.use(express.static(path.join(__dirname,'public')));
const F=path.join(__dirname,'data.json'),Q=require('./questions.json');
let db={users:{},sessions:{},results:[],chats:[]};
try{db=Object.assign(db,JSON.parse(fs.readFileSync(F)))}catch{}
let st;const save=()=>{clearTimeout(st);st=setTimeout(()=>fs.writeFile(F,JSON.stringify(db),()=>{}),300)};
const hash=(p,s)=>crypto.scryptSync(p,s,32).toString('hex');
const pub=u=>({id:u.id,name:u.name,points:u.points});
const sess=u=>{const t=crypto.randomBytes(24).toString('hex');db.sessions[t]=u.id;save();return{token:t,user:pub(u)}};
const auth=(req,res,n)=>{const u=db.users[db.sessions[req.headers.authorization]];if(!u)return res.status(401).json({error:'ابتدا وارد شوید'});req.u=u;n()};
const pick=(c,d,n=5)=>{let l=Q.filter(q=>(c==='all'||q.c===c)&&(d==='all'||q.d===d));if(!l.length)l=Q;
  return l.sort(()=>Math.random()-.5).slice(0,n).map(q=>{const o=q.o.map((t,k)=>[t,k]).sort(()=>Math.random()-.5);
    return{id:q.id,q:q.q,o:o.map(x=>x[0]),a:o.findIndex(x=>x[1]===q.a)}})};
const strip=q=>({q:q.q,o:q.o});

app.post('/api/register',(req,res)=>{
  const name=String(req.body.name||'').trim(),pass=String(req.body.pass||'');
  if(name.length<3||name.length>20||pass.length<4)return res.status(400).json({error:'نام ۳ تا ۲۰ و رمز حداقل ۴ حرف باشد'});
  if(Object.values(db.users).some(u=>u.name.toLowerCase()===name.toLowerCase()))return res.status(400).json({error:'این نام قبلاً گرفته شده'});
  const salt=crypto.randomBytes(8).toString('hex'),u={id:crypto.randomBytes(6).toString('hex'),name,salt,pass:hash(pass,salt),points:0};
  db.users[u.id]=u;res.json(sess(u));
});
app.post('/api/login',(req,res)=>{
  const name=String(req.body.name||'').trim().toLowerCase(),u=Object.values(db.users).find(x=>x.name.toLowerCase()===name);
  if(!u||u.pass!==hash(String(req.body.pass||''),u.salt))return res.status(400).json({error:'نام کاربری یا رمز اشتباه است'});
  res.json(sess(u));
});
app.get('/api/me',auth,(req,res)=>res.json(pub(req.u)));
app.get('/api/leaderboard',(req,res)=>res.json({
  top:Object.values(db.users).sort((a,b)=>b.points-a.points).slice(0,20).map(pub),
  recent:db.results.slice(-20).reverse()}));

app.get('/api/profile',auth,(req,res)=>{
  const u=req.u,rs=db.results.filter(r=>r.ids?r.ids.includes(u.id):r.names.includes(u.name));
  const all=Object.values(db.users).sort((a,b)=>b.points-a.points);
  res.json({user:pub(u),rank:all.findIndex(x=>x.id===u.id)+1,games:rs.length,recent:rs.slice(-10).reverse()});
});
app.post('/api/profile/name',auth,(req,res)=>{
  const name=String(req.body.name||'').trim();
  if(name.length<3||name.length>20)return res.status(400).json({error:'نام باید ۳ تا ۲۰ حرف باشد'});
  if(Object.values(db.users).some(x=>x.id!==req.u.id&&x.name.toLowerCase()===name.toLowerCase()))return res.status(400).json({error:'این نام قبلاً گرفته شده'});
  req.u.name=name;save();res.json(pub(req.u));
});
app.post('/api/profile/password',auth,(req,res)=>{
  const p=String(req.body.pass||'');
  if(hash(String(req.body.old||''),req.u.salt)!==req.u.pass)return res.status(400).json({error:'رمز فعلی اشتباه است'});
  if(p.length<4)return res.status(400).json({error:'رمز جدید حداقل ۴ حرف باشد'});
  req.u.salt=crypto.randomBytes(8).toString('hex');req.u.pass=hash(p,req.u.salt);save();res.json({ok:1});
});
const solos=new Map();
app.post('/api/solo/start',auth,(req,res)=>{
  const qs=pick(req.body.c,req.body.d),sid=crypto.randomBytes(8).toString('hex');
  solos.set(sid,{qs,uid:req.u.id});res.json({sid,qs:qs.map(strip)});
});
app.post('/api/solo/submit',auth,(req,res)=>{
  const s=solos.get(req.body.sid);if(!s||s.uid!==req.u.id)return res.status(400).json({error:'نشست نامعتبر'});
  solos.delete(req.body.sid);const a=req.body.answers||[];
  const score=s.qs.reduce((t,q,i)=>t+(a[i]===q.a?10:0),0);
  req.u.points+=score;db.results.push({ids:[req.u.id],names:[req.u.name],score,mode:'solo',t:Date.now()});save();
  res.json({score,answers:s.qs.map(q=>q.a),points:req.u.points});
});

const lobbies=new Map();
const QTIME = 60; // ثانیه برای هر سوال
const view=l=>({code:l.code,c:l.c,d:l.d,state:l.state,leader:l.leader,members:l.m.map(x=>({id:x.u.id,name:x.u.name,ready:x.ready}))});
const push=l=>io.to(l.code).emit('lobby',view(l));
const get=s=>lobbies.get(s.code);
function leave(s){
  const l=get(s);if(!l)return;s.leave(s.code);s.code=null;
  l.m=l.m.filter(x=>x.s!==s.id);
  if(!l.m.length){clearTimeout(l.t);return lobbies.delete(l.code)}
  if(l.leader===s.u.id)l.leader=l.m[0].u.id;push(l);
}
function enter(s,l){
  leave(s);s.code=l.code;s.join(l.code);l.m.push({s:s.id,u:s.u,ready:false});push(l);
  s.emit('chat',db.chats.filter(c=>c.code===l.code).slice(-30));
}
function ask(l){
  const q=l.qs[l.i];l.open=true;
  io.to(l.code).emit('question',{i:l.i,total:l.qs.length,q:strip(q),score:l.score,time:QTIME});
  l.deadline=Date.now()+QTIME*1000;
  clearTimeout(l.qTimer);
  l.qTimer=setTimeout(()=>{
    if(!l.open)return;
    l.open=false;
    const q2=l.qs[l.i];
    io.to(l.code).emit('reveal',{picked:-1,answer:q2.a,score:l.score,timeout:true});
    l.t=setTimeout(()=>{l.i++;l.i<l.qs.length?ask(l):end(l)},3000);
  },QTIME*1000+300);
}
function end(l){
  clearTimeout(l.qTimer);clearTimeout(l.t);
  l.state='wait';l.m.forEach(x=>{x.ready=false;x.u.points+=l.score});
  const names=l.m.map(x=>x.u.name);
  db.results.push({ids:l.m.map(x=>x.u.id),names,score:l.score,mode:'multi',t:Date.now()});save();
  io.to(l.code).emit('finish',{score:l.score,names});push(l);
}
io.use((s,n)=>{const u=db.users[db.sessions[s.handshake.auth.token]];if(!u)return n(new Error('auth'));s.u=u;n()});
io.on('connection',s=>{
  const err=m=>s.emit('err',m);
  s.on('create',({c,d})=>{
    let code;do{code=crypto.randomBytes(3).toString('hex').toUpperCase()}while(lobbies.has(code));
    const l={code,c:c||'all',d:d||'all',state:'wait',leader:s.u.id,m:[],qs:[],i:0,score:0};
    lobbies.set(code,l);enter(s,l);
  });
  s.on('join',({code})=>{
    const l=lobbies.get(String(code||'').trim().toUpperCase());
    if(!l)return err('لابی پیدا نشد');
    if(l.state!=='wait')return err('بازی در این لابی شروع شده');
    if(l.m.length>=8)return err('لابی پر است');
    enter(s,l);
  });
  s.on('ready',()=>{const l=get(s);if(!l||l.state!=='wait')return;const x=l.m.find(m=>m.s===s.id);x.ready=!x.ready;push(l)});
  s.on('promote',id=>{const l=get(s);if(!l||l.leader!==s.u.id||!l.m.some(x=>x.u.id===id))return;l.leader=id;push(l)});
  s.on('start',()=>{
    const l=get(s);if(!l||l.leader!==s.u.id||l.state!=='wait')return;
    if(!l.m.every(x=>x.u.id===l.leader||x.ready))return err('همه باید آماده باشند');
    l.qs=pick(l.c,l.d);l.i=0;l.score=0;l.state='play';push(l);ask(l);
  });
s.on('answer',idx=>{
  const l=get(s);if(!l||l.state!=='play'||!l.open||l.leader!==s.u.id)return;
  l.open=false;clearTimeout(l.qTimer);
  const q=l.qs[l.i];if(idx===q.a)l.score+=10;
  io.to(l.code).emit('reveal',{picked:idx,answer:q.a,score:l.score});
  l.t=setTimeout(()=>{l.i++;l.i<l.qs.length?ask(l):end(l)},3000);
});
  s.on('chat',text=>{
    if(!s.code)return;text=String(text||'').trim().slice(0,300);if(!text)return;
    const m={code:s.code,uid:s.u.id,name:s.u.name,text,t:Date.now()};
    db.chats.push(m);if(db.chats.length>1000)db.chats.splice(0,200);save();
    io.to(s.code).emit('chat',[m]);
  });
  s.on('leave',()=>leave(s));
  function leave(s){
  const l=get(s);if(!l)return;s.leave(s.code);s.code=null;
  clearTimeout(l.qTimer);clearTimeout(l.t);
  l.m=l.m.filter(x=>x.s!==s.id);
  if(!l.m.length){return lobbies.delete(l.code)}
  if(l.leader===s.u.id)l.leader=l.m[0].u.id;push(l);
}
  s.on('disconnect',()=>leave(s));

});
srv.listen(process.env.PORT||3000,()=>console.log('http://localhost:'+(process.env.PORT||3000)));
