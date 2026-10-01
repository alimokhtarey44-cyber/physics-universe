import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'mechanics',name:'🎯 پرتابه',d:26,tg:[6,2,0],
sum:'مسیر سبز: بدون مقاومت هوا (تئوری). مسیر زرد: شبیه‌سازی با مقاومت.',
formula:'x = v·cosθ·t\ny = v·sinθ·t − ½·g·t²\nR = v²·sin(2θ)/g   (بدون هوا)\nمقاومت خطی: a = −c·v',
num:'اویلر نیمه‌ضمنی با گام ≤ ۵ms؛ خطا متناسب با گام است. مقاومت هوای خطی «مدل تقریبی» است (در واقعیت معمولاً ∝ v²).',
params:[{k:'v',l:'سرعت اولیه',min:5,max:50,step:1,v:25,u:'m/s',w:'برد با مجذور سرعت رشد می‌کند؛ دو برابر سرعت ≈ چهار برابر برد.'},
{k:'a',l:'زاویه پرتاب',min:5,max:85,step:1,v:45,u:'°',w:'بدون هوا، بیشترین برد در ۴۵° است و زاویه‌های مکمل برد برابر دارند.'},
{k:'g',l:'شتاب گرانش',min:1.6,max:25,step:.1,v:9.81,u:'m/s²',w:'گرانش کمتر (مثل ماه ۱٫۶) یعنی پرواز طولانی‌تر و برد بیشتر.'},
{k:'c',l:'مقاومت هوا',min:0,max:.2,step:.005,v:0,u:'1/s',w:'مقاومت انرژی می‌گیرد؛ برد و ارتفاع کمتر می‌شود و مسیر نامتقارن.'}],
why:['چرا توپ سقوط می‌کند؟','زمین میدان گرانشی دارد','نیروی F = m·g رو به پایین','شتاب ثابت g در راستای عمودی','سرعت عمودی کم و سپس زیاد می‌شود؛ افقی ثابت (بدون هوا)','ترکیب این دو = مسیر سهمی'],
acts:[{l:'🚀 پرتاب دوباره',f:()=>rb()}],
build(){const p=this.p,S=this.S=.05;scene.add(new THREE.GridHelper(40,40,0x335577,0x223344));
 this.ball=new THREE.Mesh(new THREE.SphereGeometry(.35,20,16),new THREE.MeshStandardMaterial({color:0xfacc15}));scene.add(this.ball);
 this.tr=new Trail(3000,0xfacc15);scene.add(this.tr.l);
 const a=p.a*Math.PI/180,T=2*p.v*Math.sin(a)/p.g,pts=[];
 for(let i=0;i<=60;i++){const t=T*i/60;pts.push(new THREE.Vector3(p.v*Math.cos(a)*t*S,(p.v*Math.sin(a)*t-.5*p.g*t*t)*S+.35,0))}
 scene.add(lineOf(pts,0x22c55e));
 this.t=0;this.x=0;this.y=0;this.vx=p.v*Math.cos(a);this.vy=p.v*Math.sin(a);this.land=false;this.hm=0;this.pos()},
pos(){this.ball.position.set(this.x*this.S,this.y*this.S+.35,0)},
onParam(){rb()},
step(dt){if(this.land)return;const p=this.p,n=Math.ceil(dt/.005),h=dt/n;
 for(let i=0;i<n&&!this.land;i++){this.vx+=-p.c*this.vx*h;this.vy+=(-p.g-p.c*this.vy)*h;this.x+=this.vx*h;this.y+=this.vy*h;this.t+=h;this.hm=Math.max(this.hm,this.y);if(this.y<0){this.y=0;this.land=true}}
 this.pos();this.tr.add(this.x*this.S,this.y*this.S+.35,0)},
read(){const p=this.p,a=p.a*Math.PI/180,R0=p.v*p.v*Math.sin(2*a)/p.g;
 return `زمان t = ${this.t.toFixed(2)} s<br>مکان: x = ${this.x.toFixed(1)} m ، y = ${this.y.toFixed(1)} m<br>سرعت |v| = ${Math.hypot(this.vx,this.vy).toFixed(1)} m/s<br>بیشینه ارتفاع = ${this.hm.toFixed(1)} m<br>برد تئوری (بدون هوا) = ${R0.toFixed(1)} m${this.land?`<br><b>فرود: برد واقعی = ${this.x.toFixed(1)} m</b>`:''}`}};
