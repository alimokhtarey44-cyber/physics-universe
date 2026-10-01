import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'fluids',name:'🚢 شناوری ارشمیدس',d:42,tg:[0,-4,0],sum:'مکعبی به ضلع ۲۰ cm در آب (۱۰۰۰ kg/m³) رها می‌شود. چگالی مکعب را عوض کن.',
formula:'F_b = ρ_سیال · g · V_غوطه‌ور\nشناور: ρ_جسم < ρ_سیال ،  کسر غوطه‌وری = ρ_جسم / ρ_سیال',num:'اویلر نیمه‌ضمنی، گام ۵ms؛ میرایی خطی ساده (مدل تقریبی)؛ بدون موج و چرخش.',
params:[{k:'r',l:'چگالی جسم',min:200,max:2000,step:50,v:600,u:'kg/m³',w:'چگالی کمتر از آب: جسم شناور و بخش کمتری غوطه‌ور؛ بیشتر: غرق می‌شود.'}],
why:['چرا جسم شناور می‌شود؟','فشار آب با عمق زیاد می‌شود','فشار زیر جسم بیشتر از بالاست','برآیند = نیروی شناوری رو به بالا = وزن آب جابه‌جاشده','اگر از وزن جسم بیشتر باشد بالا می‌رود تا تعادل'],
acts:[{l:'⬇️ رها کردن از بالا',f:()=>rb()}],
build(){const w=new THREE.Mesh(new THREE.BoxGeometry(16,20,16),new THREE.MeshBasicMaterial({color:0x2a7fd6,transparent:true,opacity:.22}));w.position.y=-10;scene.add(w);this.b=new THREE.Mesh(new THREE.BoxGeometry(4,4,4),new THREE.MeshStandardMaterial({color:0xd97706}));scene.add(this.b);this.y=.3;this.v=0;this.b.position.y=6},
onParam(){rb()},
step(dt){const a=.2,p=this.p,m=p.r*a*a*a,n=Math.ceil(dt/.005),h=dt/n;for(let i=0;i<n;i++){const sub=Math.min(a,Math.max(0,a/2-this.y)),F=1000*9.81*a*a*sub-m*9.81;this.v+=(F/m-3*this.v)*h;this.y+=this.v*h;if(this.y<-.9){this.y=-.9;this.v=0}}this.b.position.y=this.y*20},
read(){const a=.2,p=this.p,sub=Math.min(a,Math.max(0,a/2-this.y)),m=p.r*a*a*a;return `ارتفاع مرکز = ${(this.y*100).toFixed(1)} cm<br>نیروی شناوری = ${(9810*a*a*sub).toFixed(2)} N ، وزن = ${(m*9.81).toFixed(2)} N<br>${p.r<1000?`تعادل: ${(p.r/10).toFixed(0)}٪ غوطه‌ور (شناور)`:'جسم چگال‌تر از آب است: غرق می‌شود'}`}};
