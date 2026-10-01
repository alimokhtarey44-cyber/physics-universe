import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'mechanics',name:'💥 برخورد و بقای تکانه',d:30,tg:[0,2,0],sum:'دو جسم روی ریل. e=1 کشسان، e=0 کاملاً ناکشسان. تکانه همیشه پایسته است؛ انرژی جنبشی فقط در برخورد کشسان.',
formula:'m₁v₁ + m₂v₂ = m₁v₁′ + m₂v₂′\nv₁′ = ((m₁−e·m₂)v₁ + (1+e)·m₂v₂)/(m₁+m₂)\nv₂′ = ((m₂−e·m₁)v₂ + (1+e)·m₁v₁)/(m₁+m₂)\nKE = ½mv²',num:'حل تحلیلی برخورد لحظه‌ای یک‌بعدی با ضریب برگشت e؛ بدون اصطکاک و تغییر شکل (مدل آموزشی).',
params:[{k:'m1',l:'جرم جسم ۱',min:1,max:10,step:.5,v:2,u:'kg',w:'جسم سنگین‌تر کمتر تغییر سرعت می‌دهد.'},{k:'m2',l:'جرم جسم ۲',min:1,max:10,step:.5,v:1,u:'kg',w:'اگر جسم ۲ سبک‌تر باشد پس از برخورد تندتر می‌رود.'},{k:'v1',l:'سرعت جسم ۱',min:1,max:10,step:.5,v:4,u:'m/s',w:'تکانه اولیه m₁v₁ بیشتر می‌شود.'},{k:'e',l:'ضریب برگشت e',min:0,max:1,step:.05,v:1,u:'',w:'e کمتر یعنی انرژی بیشتری به گرما/تغییر شکل می‌رود.'}],
why:['چرا تکانه پایسته است؟','نیروی برخورد روی دو جسم برابر و مخالف است (قانون سوم نیوتن)','ضربه‌ها یکدیگر را خنثی می‌کنند','تکانه کل ثابت می‌ماند','انرژی جنبشی می‌تواند به گرما و تغییر شکل برود'],
onParam(){rb()},
build(){const p=this.p,mk=(m,c)=>{const r=.6*Math.cbrt(m),s=new THREE.Mesh(new THREE.SphereGeometry(r,24,16),new THREE.MeshStandardMaterial({color:c}));s.position.y=r;scene.add(s);return[s,r]};scene.add(lineOf([new THREE.Vector3(-18,0,0),new THREE.Vector3(18,0,0)],0x64748b));
 [this.a,this.r1]=mk(p.m1,0x60a5fa);[this.b,this.r2]=mk(p.m2,0xf97316);this.x1=-12;this.x2=6;this.u1=p.v1;this.u2=0;this.hit=false;this.P0=p.m1*p.v1;this.E0=.5*p.m1*p.v1*p.v1},
step(dt){const p=this.p;this.x1+=this.u1*dt;this.x2+=this.u2*dt;
 if(!this.hit&&this.x2-this.x1<=this.r1+this.r2){const M=p.m1+p.m2,a=this.u1,b=this.u2;this.u1=((p.m1-p.e*p.m2)*a+(1+p.e)*p.m2*b)/M;this.u2=((p.m2-p.e*p.m1)*b+(1+p.e)*p.m1*a)/M;this.hit=true}
 if(this.x1<-17){this.x1=-17;this.u1=Math.abs(this.u1)}if(this.x2>17){this.x2=17;this.u2=-Math.abs(this.u2)}this.a.position.x=this.x1;this.b.position.x=this.x2},
read(){const p=this.p,P=p.m1*this.u1+p.m2*this.u2,E=.5*p.m1*this.u1*this.u1+.5*p.m2*this.u2*this.u2;return `v₁ = ${this.u1.toFixed(2)} ، v₂ = ${this.u2.toFixed(2)} m/s<br>تکانه کل: ${P.toFixed(2)} (اولیه ${this.P0.toFixed(2)}) kg·m/s ✓ پایسته<br>انرژی جنبشی: ${E.toFixed(2)} J (اولیه ${this.E0.toFixed(2)})<br>${this.hit?`انرژی تلف‌شده: ${(this.E0-E).toFixed(2)} J`:'قبل از برخورد'}`}};
