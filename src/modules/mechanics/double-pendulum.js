import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'mechanics',name:'🌀 آونگ دوگانه (آشوب)',d:18,tg:[0,2,0],sum:'دو آونگ دوگانه با اختلاف شرط اولیه فقط ۰٫۰۱°. بعد از مدتی کاملاً از هم جدا می‌شوند: آشوب قطعی.',
formula:'لاگرانژی: L = T − V\nمعادلات حرکت دو درجه‌آزادی غیرخطی\n(m₁=m₂=1 kg ، l₁=l₂=1 m)',num:'انتگرال‌گیری RK4 با گام ۲ms؛ انرژی تقریباً پایسته. خطای عددی نیز در آشوب رشد می‌کند.',
params:[{k:'a',l:'زاویه اولیه ۱',min:10,max:179,step:1,v:120,u:'°',w:'زاویه‌های بزرگ‌تر رفتار غیرخطی و آشفته‌تر می‌دهند.'},{k:'b',l:'زاویه اولیه ۲',min:-179,max:179,step:1,v:-10,u:'°',w:'زاویه دوم روی انرژی کل و آشوب اثر می‌گذارد.'}],
why:['چرا آشوب؟','معادلات غیرخطی‌اند','اختلاف کوچک اولیه به‌صورت نمایی رشد می‌کند','پیش‌بینی بلندمدت عملاً ناممکن می‌شود (دینامیک قطعی ولی غیرقابل‌پیش‌بینی)'],
onParam(){rb()},
f(s){const[a,b,w1,w2]=s,d=a-b,den=3-Math.cos(2*d),g=9.81;return[w1,w2,(-3*g*Math.sin(a)-g*Math.sin(a-2*b)-2*Math.sin(d)*(w2*w2+w1*w1*Math.cos(d)))/den,(2*Math.sin(d)*(2*w1*w1+2*g*Math.cos(a)+w2*w2*Math.cos(d)))/den]},
build(){const p=this.p,A=p.a*Math.PI/180,B=p.b*Math.PI/180;this.s=[[A,B,0,0],[A+1.7e-4,B,0,0]];this.t=0;this.o=[0x60a5fa,0xf97316].map(c=>{const l=lineOf([new THREE.Vector3(),new THREE.Vector3(),new THREE.Vector3()],c);scene.add(l);const m=new THREE.Mesh(new THREE.SphereGeometry(.35,12,10),new THREE.MeshBasicMaterial({color:c}));scene.add(m);const t=new Trail(1500,c);scene.add(t.l);return{l,m,t}})},
step(dt){const n=Math.ceil(dt/.002),h=dt/n;for(let k=0;k<n;k++){this.t+=h;this.s=this.s.map(s=>{const f=x=>this.f(x),ad=(x,y,c)=>x.map((v,i)=>v+c*y[i]),k1=f(s),k2=f(ad(s,k1,h/2)),k3=f(ad(s,k2,h/2)),k4=f(ad(s,k3,h));return s.map((v,i)=>v+h/6*(k1[i]+2*k2[i]+2*k3[i]+k4[i]))})}
 this.s.forEach((s,i)=>{const S=4,x1=S*Math.sin(s[0]),y1=5-S*Math.cos(s[0]),x2=x1+S*Math.sin(s[1]),y2=y1-S*Math.cos(s[1]),o=this.o[i],q=o.l.geometry.attributes.position;q.setXYZ(0,0,5,0);q.setXYZ(1,x1,y1,0);q.setXYZ(2,x2,y2,0);q.needsUpdate=true;o.m.position.set(x2,y2,0);o.t.add(x2,y2,0)})},
read(){const d=Math.abs(this.s[0][1]-this.s[1][1])*180/Math.PI,E=s=>{const[a,b,w1,w2]=s;return w1*w1+.5*w2*w2+w1*w2*Math.cos(a-b)-19.62*Math.cos(a)*1.5*0+0},g=9.81;const e=s=>{const[a,b,w1,w2]=s;return .5*(2*w1*w1+w2*w2+2*w1*w2*Math.cos(a-b))-g*(2*Math.cos(a)+Math.cos(b))};return `t = ${this.t.toFixed(1)} s<br>اختلاف زاویه ۲ دو آونگ: ${d.toFixed(3)}° (آغاز: ۰٫۰۱°)<br>انرژی مخصوص آونگ آبی = ${e(this.s[0]).toFixed(3)} J/kg (باید تقریباً ثابت بماند)`}};
