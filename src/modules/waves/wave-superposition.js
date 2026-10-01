import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'waves',name:'〰️ برهم‌نهی امواج',d:20,tg:[5,0,0],sum:'موج آبی و قرمز را تنظیم کن؛ موج سفید برآیند است (اصل برهم‌نهی).',
formula:'y = A·sin(2π·f·(t − x/v))\nλ = v / f\ny_کل = y₁ + y₂\nفرکانس تپش = |f₁ − f₂|',num:'امواج سینوسی خطی با سرعت ثابت v = 5 m/s (محیط غیرپاشنده)؛ بدون میرایی.',
params:[{k:'A1',l:'دامنه موج ۱',min:.2,max:2,step:.1,v:1,u:'m',w:'دامنه بزرگ‌تر یعنی انرژی بیشتر (∝A²).'},{k:'f1',l:'فرکانس موج ۱',min:.5,max:3,step:.1,v:1,u:'Hz',w:'f بیشتر یعنی λ=v/f کوتاه‌تر.'},{k:'A2',l:'دامنه موج ۲',min:.2,max:2,step:.1,v:1,u:'m',w:'مجموع دو دامنه بیشینه برآیند است.'},{k:'f2',l:'فرکانس موج ۲',min:.5,max:3,step:.1,v:1.2,u:'Hz',w:'اختلاف فرکانس باعث تپش می‌شود.'},{k:'ph',l:'فاز موج ۲',min:0,max:6.28,step:.1,v:0,u:'rad',w:'فاز π با دامنه برابر تداخل ویرانگر می‌دهد.'}],
why:['چرا امواج جمع می‌شوند؟','معادله موج خطی است','پس جواب‌ها قابل جمع‌زدن‌اند','هم‌فاز → تداخل سازنده، پادفاز → ویرانگر'],
build(){this.t=0;this.L=[[0x60a5fa,-4],[0xf97316,0],[0xffffff,4]].map(([c,z])=>{const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(new Float32Array(201*3),3));const l=new THREE.Line(g,new THREE.LineBasicMaterial({color:c}));l.frustumCulled=false;l.position.z=z;scene.add(l);return l});scene.add(new THREE.GridHelper(20,20,0x335577,0x223344))},
onParam(){this.step(0)},
step(dt){this.t+=dt;const p=this.p,v=5;for(let i=0;i<=200;i++){const x=i*.05,y1=p.A1*Math.sin(2*Math.PI*p.f1*(this.t-x/v)),y2=p.A2*Math.sin(2*Math.PI*p.f2*(this.t-x/v)+p.ph);[y1,y2,y1+y2].forEach((y,k)=>this.L[k].geometry.attributes.position.setXYZ(i,x,y*1.4,0))}this.L.forEach(l=>l.geometry.attributes.position.needsUpdate=true)},
read(){const p=this.p;return `λ₁ = ${(5/p.f1).toFixed(2)} m ، λ₂ = ${(5/p.f2).toFixed(2)} m<br>فرکانس تپش = ${Math.abs(p.f1-p.f2).toFixed(2)} Hz<br>بیشینه دامنه برآیند = ${(p.A1+p.A2).toFixed(2)} m`}};
