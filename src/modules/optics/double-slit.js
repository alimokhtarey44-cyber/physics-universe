import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'optics',name:'🌈 دوشکاف یانگ',d:34,tg:[0,3,0],sum:'الگوی تداخل روی پرده به فاصله ۱ متر؛ ارتفاع میله‌ها = شدت نور.',
formula:'Δy = λ·L / d   (فاصله فریزها)\nI(y) ∝ cos²(π·d·y / (λ·L))',num:'مدل تقریبی: دو شکاف بی‌نهایت باریک، تقریب زاویه کوچک، بدون پوش پراش تک‌شکاف.',
params:[{k:'l',l:'طول موج',min:400,max:700,step:10,v:550,u:'nm',w:'طول موج بزرگ‌تر یعنی فریزها پهن‌تر.'},{k:'d',l:'فاصله دو شکاف',min:.05,max:.5,step:.01,v:.2,u:'mm',w:'شکاف‌های دورتر فریزهای فشرده‌تر می‌سازند.'}],
why:['چرا نوار روشن و تاریک می‌بینیم؟','نور موج است و از هر دو شکاف می‌گذرد','اختلاف مسیر در هر نقطه متفاوت است','اختلاف مسیر = مضرب صحیح λ → تداخل سازنده (روشن)','مضرب نیم‌صحیح → مخرب (تاریک)'],
build(){const p=this.p,col=wl(p.l);this.dy=p.l*1e-9/(p.d*1e-3)*1000;for(let i=0;i<121;i++){const y=(i-60)/60*.01,I=Math.pow(Math.cos(Math.PI*p.d*1e-3*y/(p.l*1e-9)),2),h=.1+8*I,m=new THREE.Mesh(new THREE.BoxGeometry(.3,h,1),new THREE.MeshBasicMaterial({color:col.clone().multiplyScalar(.15+.85*I)}));m.position.set((i-60)*.3,h/2,0);scene.add(m)}},
onParam(){rb()},step(){},read(){return `فاصله فریزها Δy = ${this.dy.toFixed(2)} mm<br>تعداد فریز روشن روی پرده ۲ cm: ≈ ${(20/this.dy).toFixed(1)}`}};
