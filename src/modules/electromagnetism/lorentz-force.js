import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'electromagnetism',name:'🧲 نیروی لورنتس',d:30,tg:[0,10,0],sum:'ذره باردار در میدان مغناطیسی یکنواخت (فلش سبز، در راستای y) مسیر مارپیچ می‌سازد. (q/m = 1 بی‌بعد)',
formula:'F = q·(v × B)\nr = m·v⊥ / (q·B)\nT = 2π·m / (q·B)\nگام مارپیچ = v∥ · T',num:'حل تحلیلی حرکت در میدان یکنواخت؛ بدون تابش، میدان الکتریکی یا اثر نسبیتی.',
params:[{k:'v',l:'تندی ذره',min:1,max:10,step:.5,v:5,u:'',w:'تندی بیشتر یعنی شعاع بزرگ‌تر (r ∝ v) ولی دوره ثابت.'},{k:'a',l:'زاویه سرعت با میدان',min:10,max:90,step:5,v:60,u:'°',w:'۹۰° دایره می‌دهد؛ زاویه کمتر یعنی مؤلفه موازی بیشتر و مارپیچ کشیده‌تر.'},{k:'B',l:'شدت میدان B',min:.3,max:2,step:.1,v:1,u:'',w:'B بیشتر یعنی شعاع کوچک‌تر و چرخش سریع‌تر (r ∝ 1/B).'}],
why:['چرا مسیر منحنی است؟','نیروی مغناطیسی همیشه بر سرعت عمود است','عمود بودن یعنی کار انجام نمی‌دهد و تندی ثابت می‌ماند','فقط جهت سرعت عوض می‌شود','مؤلفه موازی ثابت می‌ماند → مارپیچ'],
onParam(){rb()},
build(){scene.add(new THREE.ArrowHelper(new THREE.Vector3(0,1,0),new THREE.Vector3(0,0,0),22,0x22c55e));this.ball=new THREE.Mesh(new THREE.SphereGeometry(.5,16,12),new THREE.MeshStandardMaterial({color:0xef4444}));scene.add(this.ball);this.tr=new Trail(3000,0xef4444);scene.add(this.tr.l);this.t=0},
step(dt){const p=this.p,a=p.a*Math.PI/180,w=p.B,vp=p.v*Math.sin(a),vl=p.v*Math.cos(a);this.t+=dt;const r=vp/w,y=vl*this.t;if(y>40||(vl<.05&&this.t>8*Math.PI/w)){this.t=0;this.tr.c=0}const x=r*Math.sin(w*this.t),z=r*(1-Math.cos(w*this.t)),yy=vl*this.t;this.ball.position.set(x,yy,z);this.tr.add(x,yy,z)},
read(){const p=this.p,a=p.a*Math.PI/180,r=p.v*Math.sin(a)/p.B,T=2*Math.PI/p.B;return `شعاع r = ${r.toFixed(2)}<br>دوره T = ${T.toFixed(2)}<br>گام مارپیچ = ${(p.v*Math.cos(a)*T).toFixed(2)}<br>تندی = ${p.v} (ثابت ← نیرو کار نمی‌کند)`}};
