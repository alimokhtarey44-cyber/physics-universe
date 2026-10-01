import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'nuclear',name:'⏳ نیمه‌عمر',d:26,tg:[0,0,0],sum:'۲۰۰ هسته ناپایدار؛ هر هسته در هر لحظه با احتمال تصادفی واپاشی می‌کند (نارنجی → خاکستری).',
formula:'N(t) = N₀ · 2^(−t/T½)\nλ = ln2 / T½  ،  A = λ·N',num:'شبیه‌سازی مونت‌کارلو؛ با ۲۰۰ هسته نوسان آماری نسبت به منحنی تئوری طبیعی است.',
params:[{k:'T',l:'نیمه‌عمر',min:1,max:10,step:.5,v:4,u:'s',w:'نیمه‌عمر کوتاه‌تر یعنی واپاشی سریع‌تر و فعالیت اولیه بیشتر.'}],
why:['چرا نیمه‌عمر ثابت است؟','هر هسته «حافظه» ندارد','احتمال واپاشی در هر ثانیه ثابت است','پس سهم ثابتی از باقی‌مانده در هر بازه می‌شکند','نتیجه: نمایی کاهشی'],
build(){this.t=0;this.a=[];const g=new THREE.SphereGeometry(.4,8,6);this.mg=new THREE.MeshStandardMaterial({color:0xf97316,emissive:0x5a2100});this.md=new THREE.MeshStandardMaterial({color:0x334155});
 for(let i=0;i<200;i++){const m=new THREE.Mesh(g,this.mg);m.position.set((i%10-4.5)*1.3,(Math.floor(i/10)%10-4.5)*1.3,(Math.floor(i/100)-.5)*1.3);scene.add(m);this.a.push({m,on:1})}},
step(dt){this.t+=dt;const q=1-Math.pow(2,-dt/this.p.T);this.a.forEach(o=>{if(o.on&&Math.random()<q){o.on=0;o.m.material=this.md}})},
read(){const N=this.a.filter(o=>o.on).length,T=this.p.T;return `زمان = ${this.t.toFixed(1)} s<br>باقی‌مانده (شبیه‌سازی): ${N}<br>تئوری: ${(200*Math.pow(2,-this.t/T)).toFixed(1)}<br>فعالیت A ≈ ${(Math.LN2/T*N).toFixed(1)} واپاشی/s`}};
