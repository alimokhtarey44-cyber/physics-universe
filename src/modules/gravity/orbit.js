import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'gravity',name:'🪐 مدار و گرانش',d:34,tg:[0,0,0],
sum:'سیاره‌ای در میدان گرانشی ستاره؛ سرعت اولیه شکل مدار را تعیین می‌کند. (یکاهای بی‌بعد)',
formula:'F = G·M·m / r²\nv_دایره‌ای = √(GM/r)   ،   v_فرار = √2 · v_دایره‌ای\nE = v²/2 − GM/r\nخروج از مرکز: e = √(1 + 2E·h²/(GM)²)',
num:'ورله (Verlet) سرعتی با گام ۰٫۰۲ واحد؛ انرژی تقریباً پایسته می‌ماند. مسئله دوجسمی با ستاره ثابت (مدل تقریبی)؛ بدون نسبیت.',
params:[{k:'f',l:'سرعت اولیه نسبت به سرعت مداری',min:.3,max:1.6,step:.01,v:.85,u:'×',w:'۱ = دایره؛ بین ۱ و ۱٫۴۱ = بیضی؛ ≥ ۱٫۴۱ سیاره فرار می‌کند؛ کمتر از ۱ به ستاره نزدیک‌تر می‌شود.'},
{k:'m',l:'جرم ستاره',min:.5,max:3,step:.1,v:1,u:'×',w:'جرم بیشتر یعنی گرانش قوی‌تر، سرعت مداری بیشتر و دور سریع‌تر.'}],
why:['چرا سیاره دور ستاره می‌چرخد؟','گرانش نیوتن: F = GMm/r²','نیرو همیشه به سمت ستاره است','سرعت جانبی اجازه سقوط مستقیم نمی‌دهد','سقوط پیوسته + حرکت جانبی = مدار','سرعت بیشتر → بیضی کشیده‌تر؛ √۲ برابر → فرار'],
build(){const p=this.p;this.GM=p.m;this.rs=1+.4*p.m;
 scene.add(new THREE.Mesh(new THREE.SphereGeometry(this.rs,32,24),new THREE.MeshBasicMaterial({color:0xfbbf24})));
 scene.add(new THREE.GridHelper(80,40,0x223344,0x16202e));
 this.pl=new THREE.Mesh(new THREE.SphereGeometry(.5,20,16),new THREE.MeshStandardMaterial({color:0x60a5fa}));scene.add(this.pl);
 this.r=new THREE.Vector3(10,0,0);this.v=new THREE.Vector3(0,0,p.f*Math.sqrt(this.GM/10));
 this.tr=new Trail(4000,0x60a5fa);scene.add(this.tr.l);this.t=0;this.end='';this.pl.position.copy(this.r)},
onParam(){rb()},
step(dt){if(this.end)return;dt*=25;const n=Math.ceil(dt/.02),h=dt/n,GM=this.GM,acc=r=>r.clone().multiplyScalar(-GM/Math.pow(r.length(),3));let A=acc(this.r);
 for(let i=0;i<n;i++){this.r.addScaledVector(this.v,h).addScaledVector(A,.5*h*h);const B=acc(this.r);this.v.addScaledVector(A.add(B),.5*h);A=B;this.t+=h}
 const d=this.r.length();if(d<this.rs)this.end='💥 برخورد با ستاره';if(d>90)this.end='🚀 سیاره از سامانه خارج شد';
 this.pl.position.copy(this.r);this.tr.add(this.r.x,this.r.y,this.r.z)},
read(){const r=this.r.length(),v2=this.v.lengthSq(),E=v2/2-this.GM/r,h=this.r.clone().cross(this.v).length(),e=Math.sqrt(Math.max(0,1+2*E*h*h/(this.GM*this.GM)));
 const ty=e<.03?'دایره‌ای':e<.98?'بیضوی':e<1.02?'سهموی (مرز فرار)':'هذلولوی (فرار)';
 return `فاصله r = ${r.toFixed(2)}<br>سرعت v = ${Math.sqrt(v2).toFixed(3)} (فرار در این فاصله: ${Math.sqrt(2*this.GM/r).toFixed(3)})<br>انرژی کل E = ${E.toFixed(4)} ${E<0?'(مقید)':'(آزاد)'}<br>خروج از مرکز e = ${e.toFixed(3)}<br>نوع مدار: <b>${ty}</b>${this.end?'<br><b>'+this.end+'</b>':''}`}};
