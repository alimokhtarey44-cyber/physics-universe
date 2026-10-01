import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'nuclear',name:'☢️ زنجیره شکافت و راکتور',d:22,tg:[0,0,0],
sum:'مدل مفهومی: نوترون‌ها (آبی) هسته‌های سوخت فعال (سبز) را می‌شکافند. میله‌های کنترل (نارنجی) نوترون می‌گیرند تا k ≈ 1 بماند. فقط آموزشی؛ نه مقیاس واقعی و نه طراحی.',
formula:'n + ²³⁵U → دو پاره شکافت + ۲ یا ۳ نوترون + ≈ 200 MeV\nk = نوترون‌های نسل بعد / نوترون‌های نسل قبل\nk < 1 زیربحرانی ، k = 1 بحرانی (راکتور پایدار) ، k > 1 فوق‌بحرانی',
num:'مونت‌کارلوی ذره‌ای ساده: مسیر مستقیم، شکافت هنگام ورود به مقطع مؤثر، جذب احتمالی در میله‌ها. k با میانگین نمایی ۲ ثانیه برآورد می‌شود. سوخت مصرف‌شده پس از ۴ ثانیه «جایگزین» می‌شود (ساده‌سازی). سقف ۳۵۰ نوترون برای نمایش. اعداد کیفی‌اند.',
params:[{k:'e',l:'غنای سوخت (سهم هسته‌های شکافت‌پذیر)',min:.1,max:1,step:.05,v:.4,u:'',w:'هسته شکافت‌پذیر بیشتر یعنی نوترون سریع‌تر هدف پیدا می‌کند و k بالا می‌رود.'},
{k:'r',l:'عمق ورود میله‌های کنترل',min:0,max:1,step:.05,v:.6,u:'',w:'میله‌های جاذب (مثل بور/کادمیوم) نوترون می‌بلعند؛ ورود بیشتر یعنی k کمتر.'},
{k:'m',l:'اثر کندکننده',min:1,max:1.6,step:.05,v:1.2,u:'×',w:'نوترون کندتر احتمال شکافت (مقطع مؤثر) بیشتری دارد؛ کندکننده k را بالا می‌برد.'}],
why:['چرا واکنش زنجیره‌ای می‌شود؟','نوترون به ²³⁵U می‌خورد و هسته ناپایدار می‌شود','هسته می‌شکافد: ≈200 MeV انرژی + ۲–۳ نوترون تازه','هر نوترون تازه می‌تواند هسته دیگری را بشکند','اگر به‌طور میانگین بیش از ۱ نوترون باقی بماند k>1 و رشد نمایی است','میله‌های کنترل نوترون می‌گیرند و k را کنار ۱ نگه می‌دارند'],
acts:[{l:'💥 تزریق ۱۰ نوترون',f:()=>ctx.cur.inject(10)}],
build(){this.fuel=[];this.ns=[];this.fis=0;this.prod=0;this.loss=0;this.tot=0;
 const gm=new THREE.SphereGeometry(.42,14,10);
 this.mats=[new THREE.MeshStandardMaterial({color:0x64748b}),new THREE.MeshStandardMaterial({color:0x22c55e,emissive:0x0a3d1a}),new THREE.MeshStandardMaterial({color:0x1f2937}),new THREE.MeshBasicMaterial({color:0xffffff})];
 for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++)for(let k=-2;k<=2;k++){const m=new THREE.Mesh(gm,this.mats[0]);m.position.set(i*2,j*2,k*2);scene.add(m);this.fuel.push({m,s:0,t:0,fl:0})}
 this.assign();
 scene.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(10,10,10)),new THREE.LineBasicMaterial({color:0x60a5fa})));
 this.rods=[[-1,1],[1,-1],[3,3],[-3,-3]].map(([x,z])=>{const m=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,10,12),new THREE.MeshStandardMaterial({color:0xf59e0b}));m.position.set(x,10,z);scene.add(m);return m});
 this.ng=new THREE.SphereGeometry(.14,8,6);this.nm=new THREE.MeshBasicMaterial({color:0x38bdf8});this.rods_();this.inject(6)},
rods_(){this.rods.forEach(m=>m.position.y=10*(1-this.p.r))},
assign(){this.fuel.forEach(f=>{f.s=Math.random()<this.p.e?1:0;f.m.material=this.mats[f.s]})},
onParam(k){if(k=='r')this.rods_();if(k=='e')this.assign()},
inject(n){for(let i=0;i<n;i++)this.spawn(new THREE.Vector3((Math.random()-.5)*8,(Math.random()-.5)*8,(Math.random()-.5)*8))},
spawn(p){if(this.ns.length>350)return;const d=new THREE.Vector3(Math.random()-.5,Math.random()-.5,Math.random()-.5).normalize().multiplyScalar(9),m=new THREE.Mesh(this.ng,this.nm);m.position.copy(p);scene.add(m);this.ns.push({m,v:d})},
step(dt){const n=Math.ceil(dt/.02),h=dt/n,p=this.p,r2=Math.pow(.8*p.m,2),dec=Math.exp(-h/2);
 for(let s=0;s<n;s++){this.fis*=dec;this.prod*=dec;this.loss*=dec;
  for(let i=this.ns.length-1;i>=0;i--){const q=this.ns[i],ps=q.m.position;ps.addScaledVector(q.v,h);let gone=0;
   if(Math.abs(ps.x)>5||Math.abs(ps.y)>5||Math.abs(ps.z)>5)gone=1;
   else{for(const r of this.rods){if(ps.y>r.position.y-5&&Math.hypot(ps.x-r.position.x,ps.z-r.position.z)<1.4&&Math.random()<.12){gone=1;break}}
    if(!gone)for(const f of this.fuel){if(f.s==1&&f.m.position.distanceToSquared(ps)<r2){f.s=2;f.t=0;f.fl=.25;f.m.material=this.mats[3];this.fis++;this.tot++;const k=Math.random()<.5?2:3;this.prod+=k;for(let j=0;j<k;j++)this.spawn(f.m.position);gone=1;break}}}
   if(gone){this.loss++;scene.remove(q.m);this.ns.splice(i,1)}}
  for(const f of this.fuel){if(f.fl>0){f.fl-=h;if(f.fl<=0)f.m.material=this.mats[2]}if(f.s==2){f.t+=h;if(f.t>4){f.s=1;f.m.material=this.mats[1]}}}}},
read(){const k=this.loss>.3?this.prod/this.loss:0,rate=this.fis/2,st=k<.95?'زیربحرانی (واکنش خاموش می‌شود)':k<=1.05?'بحرانی (پایدار)':'فوق‌بحرانی (رو به رشد)';
 return `نوترون‌های آزاد: ${this.ns.length}${this.ns.length>=350?' (سقف نمایش)':''}<br>ضریب تکثیر k ≈ <b>${k.toFixed(2)}</b> — ${st}<br>نرخ شکافت ≈ ${rate.toFixed(1)} در ثانیه<br>توان ≈ ${(rate*200).toFixed(0)} MeV/s (۲۰۰ MeV به‌ازای هر شکافت)<br>کل شکافت‌ها: ${this.tot}`}};
