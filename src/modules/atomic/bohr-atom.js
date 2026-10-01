import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'atomic',name:'💡 اتم بور',d:36,tg:[0,0,0],
sum:'تراز n را عوض کن؛ الکترون می‌جهد و فوتونی با طول موج دقیق نشر یا جذب می‌شود. (شعاع‌ها فشرده‌شده‌اند)',
formula:'E_n = −13.6 eV · Z² / n²\nΔE = 13.6 · Z² · (1/n_f² − 1/n_i²)\nλ(nm) = 1239.84 / ΔE(eV)\nr_n = n²·a₀ / Z   ،   a₀ = 0.0529 nm',
num:'مدل بور فقط برای اتم‌های تک‌الکترونی (H, He⁺, Li²⁺) درست است؛ «مدل آموزشی». در مکانیک کوانتومی الکترون مدار مشخص ندارد بلکه ابر احتمال (اوربیتال) دارد.',
params:[{k:'n',l:'تراز انرژی n',min:1,max:6,step:1,v:2,u:'',w:'در پایین‌آمدن تراز فوتون نشر می‌شود و در بالا رفتن باید فوتون هم‌انرژی جذب شود.'},
{k:'Z',l:'عدد اتمی Z',min:1,max:3,step:1,v:1,u:'',w:'Z بزرگ‌تر یعنی بار هسته بیشتر: الکترون نزدیک‌تر و فاصله ترازها (انرژی فوتون) حدود Z² برابر می‌شود.'}],
why:['چرا اتم نور نشر می‌کند؟','الکترون فقط در ترازهای گسسته می‌تواند باشد','رفتن به تراز پایین‌تر انرژی اضافه دارد','انرژی به شکل یک فوتون خارج می‌شود','E = hf = hc/λ رنگ نور را تعیین می‌کند','مجموعه خطوط = طیف اتمی، اثر انگشت عنصر'],
rad(n){return 2.5+.5*n*n/this.p.Z},
build(){const p=this.p;this.n=p.n;this.ang=0;this.ph=[];this.msg='هنوز گذاری انجام نشده.';
 scene.add(new THREE.Mesh(new THREE.SphereGeometry(.8+.3*p.Z,24,18),new THREE.MeshStandardMaterial({color:0xef4444,emissive:0x551111})));
 for(let n=1;n<=6;n++){const r=this.rad(n),pts=[];for(let i=0;i<=64;i++){const a=i/64*6.2832;pts.push(new THREE.Vector3(r*Math.cos(a),0,r*Math.sin(a)))}scene.add(lineOf(pts,0x3b4d66))}
 this.e=new THREE.Mesh(new THREE.SphereGeometry(.6,16,12),new THREE.MeshStandardMaterial({color:0x60a5fa,emissive:0x1d3b73}));scene.add(this.e)},
onParam(k){if(k=='Z'){const n=this.p.n;rb();ctx.cur.n=n}},
jump(a,b){const Z=this.p.Z,dE=13.6*Z*Z*Math.abs(1/(a*a)-1/(b*b)),l=1239.84/dE,em=b<a;
 const reg=l<380?'فرابنفش (UV)':l>750?'فروسرخ (IR)':'مرئی';const ser=Math.min(a,b)==1?'لیمان':Math.min(a,b)==2?'بالمر':Math.min(a,b)==3?'پاشن':'سری بالاتر';
 this.msg=`${a}→${b}: ${em?'نشر':'جذب'} فوتون با ΔE = ${dE.toFixed(2)} eV ، λ = ${l.toFixed(1)} nm (${reg}، سری ${ser})`;
 const col=l<380?new THREE.Color(0xc4b5fd):l>750?new THREE.Color(0xf87171):wl(l),m=new THREE.Mesh(new THREE.SphereGeometry(.7,12,10),new THREE.MeshBasicMaterial({color:col}));scene.add(m);
 this.ph.push({m,dir:new THREE.Vector3(Math.cos(this.ang),0,Math.sin(this.ang)),d:em?this.rad(a):36,em,to:em?36:this.rad(a)})},
step(dt){const p=this.p;if(p.n!==this.n){this.jump(this.n,p.n);this.n=p.n}
 this.ang+=dt*12*p.Z*p.Z/Math.pow(this.n,3);const r=this.rad(this.n);this.e.position.set(r*Math.cos(this.ang),0,r*Math.sin(this.ang));
 for(let i=this.ph.length-1;i>=0;i--){const f=this.ph[i];f.d+=(f.em?1:-1)*dt*14;f.m.position.copy(f.dir).multiplyScalar(f.d);if(f.em?f.d>=f.to:f.d<=f.to){scene.remove(f.m);this.ph.splice(i,1)}}},
read(){const p=this.p,n=this.n;return `تراز فعلی n = ${n}<br>انرژی E = ${(-13.6*p.Z*p.Z/(n*n)).toFixed(3)} eV<br>شعاع واقعی r = ${(n*n*.0529/p.Z).toFixed(4)} nm<br>${this.msg}`}};
