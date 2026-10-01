import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'relativity',name:'⏱️ نسبیت خاص',d:30,tg:[0,3,0],sum:'ساعت آبی ساکن است؛ ساعت نارنجی روی فضاپیماست و از دید ناظر ساکن کندتر می‌زند و طول فضاپیما کوتاه می‌شود.',
formula:'γ = 1/√(1 − v²/c²)\nΔt = γ·Δτ\nL = L₀ / γ\nE = γ·m·c²   ،   E₀ = m·c²',num:'نسبیت خاص دقیق است (بدون گرانش). سرعت حرکت ظاهری فضاپیما در صحنه فقط مقیاس بصری دارد.',
params:[{k:'b',l:'سرعت (v/c)',min:0,max:.999,step:.001,v:.8,u:'c',w:'γ به‌صورت غیرخطی نزدیک c منفجر می‌شود؛ ساعت متحرک بسیار کند می‌شود.'}],
why:['چرا زمان کند می‌شود؟','سرعت نور برای همه ناظرها یکسان است','مسیر نور در ساعت متحرک از دید ناظر ساکن طولانی‌تر است','برای ثابت ماندن c، زمان باید کندتر بگذرد','نتیجه: Δt = γΔτ'],
onParam(){},
build(){const clk=(x,c)=>{const g=new THREE.Group();g.add(new THREE.Mesh(new THREE.TorusGeometry(2,.15,8,32),new THREE.MeshBasicMaterial({color:c})));const p=new THREE.Group(),h=new THREE.Mesh(new THREE.BoxGeometry(.15,1.7,.15),new THREE.MeshBasicMaterial({color:c}));h.position.y=.85;p.add(h);g.add(p);g.position.set(x,6,0);scene.add(g);return{g,p}};
 this.c1=clk(-12,0x60a5fa);this.c2=clk(0,0xf97316);this.s=new THREE.Mesh(new THREE.BoxGeometry(6,1.5,2),new THREE.MeshStandardMaterial({color:0xf97316}));this.s.position.y=1.5;scene.add(this.s);this.x=-12;this.t0=0;this.t1=0},
step(dt){const b=this.p.b,g=1/Math.sqrt(1-b*b);this.t0+=dt;this.t1+=dt/g;this.c1.p.rotation.z=-this.t0*Math.PI/2;this.c2.p.rotation.z=-this.t1*Math.PI/2;this.x+=b*6*dt;if(this.x>14)this.x=-14;this.s.position.x=this.x;this.s.scale.x=1/g;this.c2.g.position.x=this.x},
read(){const b=this.p.b,g=1/Math.sqrt(1-b*b);return `γ = ${g.toFixed(3)}<br>ساعت ساکن: ${this.t0.toFixed(1)} s ← ساعت متحرک: ${this.t1.toFixed(1)} s<br>طول فضاپیما: ${(6/g).toFixed(2)} m (طول ویژه ۶ m)<br>E/E₀ = ${g.toFixed(3)} ، KE = ${(g-1).toFixed(3)}·mc²`}};
