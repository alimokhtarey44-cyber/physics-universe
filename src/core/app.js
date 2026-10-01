import {$,R,scene,cam,view,camUpd,rs,ctx,rb,base} from './helpers.js';
import {modules} from '../modules/index.js';

/* ---------- UI ---------- */
function sel(i){ctx.cur=modules[i];ctx.cur.p={};ctx.cur.params.forEach(q=>ctx.cur.p[q.k]=q.v);base();ctx.cur.build();view.dist=ctx.cur.d;view.tgt.set(...cur.tg);camUpd();
 document.querySelectorAll('#tabs button').forEach((b,j)=>b.classList.toggle('on',j==i));
 $('#ttl').textContent=ctx.cur.name;$('#sm').textContent=ctx.cur.sum;$('#frm').textContent=ctx.cur.formula;$('#num').textContent=ctx.cur.num;$('#wl').innerHTML='';
 $('#tut').textContent='یک پارامتر را تغییر بده تا توضیح علمی تغییر را ببینی.';
 const box=$('#ctl');box.innerHTML='';
 ctx.cur.params.forEach(q=>{const d=document.createElement('label');d.innerHTML=`<span>${q.l}: <b>${q.v}</b> ${q.u}</span><input type="range" min="${q.min}" max="${q.max}" step="${q.step}" value="${q.v}">`;
  const inp=d.querySelector('input');inp.oninput=()=>{const o=ctx.cur.p[q.k],n=+inp.value;ctx.cur.p[q.k]=n;d.querySelector('b').textContent=n;ctx.cur.onParam&&ctx.cur.onParam(q.k,o,n);$('#tut').textContent=`«${q.l}» از ${o} به ${n} تغییر کرد. ${q.w}`};box.appendChild(d)});
 const ac=$('#acts');ac.innerHTML='';(ctx.cur.acts||[]).forEach(a=>{const b=document.createElement('button');b.textContent=a.l;b.onclick=a.f;ac.appendChild(b)})}
modules.forEach((m,i)=>{const b=document.createElement('button');b.textContent=m.name;b.onclick=()=>sel(i);$('#tabs').appendChild(b)});
$('#pp').onclick=()=>{ctx.playing=!ctx.playing;$('#pp').textContent=ctx.playing?'⏸ توقف':'▶ ادامه'};
$('#st').onclick=()=>ctx.cur.step(1/30);
$('#rs').onclick=()=>rb();
$('#sp').onchange=e=>ctx.speed=+e.target.value;
$('#lv').onchange=e=>document.body.dataset.lv=e.target.value;
$('#why').onclick=()=>{$('#wl').innerHTML='<ol>'+ctx.cur.why.map((s,i)=>i?`<li>${s}</li>`:`<b>${s}</b>`).join('')+'</ol>'};
let last=performance.now(),fr=0;
function loop(now){requestAnimationFrame(loop);const dt=Math.min(.05,(now-last)/1000);last=now;if(ctx.playing)ctx.cur.step(dt*ctx.speed);if(fr++%6==0)$('#rd').innerHTML=ctx.cur.read();R.render(scene,cam)}
rs();sel(0);requestAnimationFrame(loop);
