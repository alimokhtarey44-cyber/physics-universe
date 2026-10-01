import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'optics',name:'🔦 شکست نور',d:24,tg:[0,0,0],sum:'پرتو زرد از بالا می‌تابد؛ خاکستری بازتاب است. اگر از محیط غلیظ‌تر بتابد و زاویه بزرگ شود بازتاب کلی می‌شود.',
formula:'n₁·sinθ₁ = n₂·sinθ₂\nزاویه بحرانی: sinθc = n₂/n₁  (n₁>n₂)',num:'اپتیک هندسی (پرتو)؛ پراش، قطبش و پاشندگی رنگ لحاظ نشده.',
params:[{k:'n1',l:'ضریب شکست محیط بالا',min:1,max:2.4,step:.01,v:1,u:'',w:'محیط غلیظ‌تر نور را کندتر می‌کند.'},{k:'n2',l:'ضریب شکست محیط پایین',min:1,max:2.4,step:.01,v:1.5,u:'',w:'n بزرگ‌تر یعنی پرتو به خط عمود نزدیک‌تر می‌شکند.'},{k:'t',l:'زاویه تابش',min:0,max:89,step:1,v:40,u:'°',w:'با افزایش زاویه، زاویه شکست هم زیاد می‌شود تا شاید بازتاب کلی رخ دهد.'}],
why:['چرا نور می‌شکند؟','سرعت نور در ماده کمتر است (v=c/n)','جبهه موج هنگام ورود کج می‌شود','نتیجه: n₁sinθ₁ = n₂sinθ₂'],
build(){const p=this.p,bx=(y,n)=>{const m=new THREE.Mesh(new THREE.BoxGeometry(26,9,6),new THREE.MeshBasicMaterial({color:0x60a5fa,transparent:true,opacity:.06+.12*(n-1)}));m.position.y=y;scene.add(m)};bx(4.5,p.n1);bx(-4.5,p.n2);this.g=new THREE.Group();scene.add(this.g);this.draw()},
onParam(){this.draw()},step(){},
draw(){const p=this.p,a=p.t*Math.PI/180,s=p.n1*Math.sin(a)/p.n2,L=9;this.tir=s>1;this.t2=this.tir?NaN:Math.asin(s)*180/Math.PI;while(this.g.children.length)this.g.remove(this.g.children[0]);
 const ad=(x,y,c)=>this.g.add(lineOf([new THREE.Vector3(0,0,0),new THREE.Vector3(x,y,0)],c));ad(-L*Math.sin(a),L*Math.cos(a),0xfacc15);ad(L*Math.sin(a),L*Math.cos(a),0x94a3b8);if(!this.tir){const b=Math.asin(s);ad(L*Math.sin(b),-L*Math.cos(b),0xfacc15)}},
read(){const p=this.p,c=p.n1>p.n2?Math.asin(p.n2/p.n1)*180/Math.PI:null;return `θ₁ = ${p.t}° ، θ₂ = ${this.tir?'—':this.t2.toFixed(1)+'°'}<br>زاویه بحرانی: ${c?c.toFixed(1)+'°':'وجود ندارد'}<br>${this.tir?'<b>بازتاب کلی داخلی</b>':'شکست رخ می‌دهد'}<br>سرعت نور در محیط ۲ ≈ ${(299792/p.n2).toFixed(0)} km/s`}};
