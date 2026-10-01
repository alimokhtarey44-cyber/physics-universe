import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'electricity',name:'🔋 مدار RC',d:30,tg:[0,3,0],sum:'باتری → مقاومت → خازن. ستون آبی ولتاژ خازن است و لامپ با جریان روشن می‌شود. (ساخت مدار با کشیدن قطعات در نسخه بعد)',
formula:'τ = R·C\nشارژ: V_c = V·(1 − e^(−t/τ))\nتخلیه: V_c = V₀·e^(−t/τ)\nI = (V − V_c)/R',num:'حل تحلیلی دقیق معادله مرتبه اول؛ قطعات ایده‌آل (بدون مقاومت داخلی و نشتی).',
params:[{k:'V',l:'ولتاژ باتری',min:1,max:12,step:.5,v:9,u:'V',w:'ولتاژ نهایی خازن برابر ولتاژ باتری می‌شود.'},{k:'R',l:'مقاومت',min:1,max:20,step:1,v:5,u:'kΩ',w:'R بزرگ‌تر یعنی جریان کمتر و شارژ کندتر (τ بزرگ‌تر).'},{k:'C',l:'ظرفیت خازن',min:100,max:1000,step:50,v:500,u:'µF',w:'C بزرگ‌تر بار بیشتری می‌گیرد و دیرتر پر می‌شود.'}],
why:['چرا شارژ خازن کند می‌شود؟','ابتدا اختلاف پتانسیل V−V_c بزرگ است → جریان زیاد','بار جمع می‌شود و V_c بالا می‌رود','اختلاف کم می‌شود → جریان کم','نتیجه: رشد نمایی با ثابت زمانی τ=RC'],
acts:[{l:'🔌 شارژ / تخلیه',f:()=>{ctx.cur.sw=!ctx.cur.sw}}],
build(){this.Vc=0;this.sw=true;this.I=0;const bx=(x,c,w,h)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(w,h,2),new THREE.MeshStandardMaterial({color:c}));m.position.set(x,h/2,0);scene.add(m)};bx(-9,0xfacc15,3,4);bx(0,0xa16207,5,1.2);
 this.bar=new THREE.Mesh(new THREE.BoxGeometry(3,1,3),new THREE.MeshStandardMaterial({color:0x38bdf8}));scene.add(this.bar);this.led=new THREE.Mesh(new THREE.SphereGeometry(1,16,12),new THREE.MeshBasicMaterial({color:0xff3030}));this.led.position.set(9,6,0);scene.add(this.led);scene.add(lineOf([new THREE.Vector3(-9,4.5,0),new THREE.Vector3(-9,7,0),new THREE.Vector3(9,7,0),new THREE.Vector3(9,0,0)],0x94a3b8));this.upd()},
onParam(){this.upd()},
upd(){const h=Math.max(.05,this.Vc/this.p.V*10);this.bar.scale.y=h;this.bar.position.set(9,h/2,0);this.led.material.color.setRGB(Math.min(1,Math.abs(this.I)/(this.p.V/this.p.R)),.05,.05)},
step(dt){const p=this.p,tau=p.R*1e3*p.C*1e-6,tg=this.sw?p.V:0;this.Vc=tg+(this.Vc-tg)*Math.exp(-dt/tau);this.I=(tg-this.Vc)/(p.R*1e3)*1000;this.upd()},
read(){const p=this.p;return `حالت: ${this.sw?'شارژ':'تخلیه'}<br>τ = RC = ${(p.R*p.C/1000).toFixed(2)} s<br>V_c = ${this.Vc.toFixed(2)} V<br>جریان I = ${this.I.toFixed(2)} mA<br>انرژی خازن = ${(.5*p.C*1e-6*this.Vc*this.Vc*1000).toFixed(2)} mJ`}};
