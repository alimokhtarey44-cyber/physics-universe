import * as THREE from 'three';
import {ctx,scene,rb,Trail,lineOf,wl} from '../../core/helpers.js';

export default {cat:'thermo',name:'🌡️ گاز ایده‌آل',d:26,tg:[6,3,3],sum:'۱۲۰ مولکول در جعبه. دما را بالا ببر یا حجم را کم کن و فشار دیواره قرمز را ببین.',
formula:'P·V = N·k_B·T\n½·m·v²_rms = (3/2)·k_B·T\nفشار = میانگین ضربه مولکول‌ها به دیواره',num:'مدل مولکولی ساده: برخورد کشسان با دیواره، بدون برخورد بین مولکولی؛ فشار بر حسب یکای دلخواه.',
params:[{k:'T',l:'دما',min:100,max:1000,step:10,v:300,u:'K',w:'دما بیشتر یعنی سرعت مولکول‌ها (∝√T) و ضربه به دیواره بیشتر → فشار بالاتر.'},{k:'L',l:'حجم (طول جعبه)',min:4,max:14,step:.5,v:10,u:'',w:'حجم کمتر یعنی برخورد بیشتر به دیواره در ثانیه → فشار بالاتر (قانون بویل).'}],
why:['چرا گاز فشار دارد؟','مولکول‌ها پیوسته حرکت می‌کنند','هر برخورد به دیواره ضربه کوچکی می‌دهد','میانگین میلیون‌ها ضربه = فشار','دما بیشتر = تندتر = ضربه قوی‌تر'],
build(){const N=120,p=this.p;this.x=new Float32Array(N*3);this.vl=new Float32Array(N*3);this.imp=0;const s=Math.sqrt(p.T/300)*4;for(let i=0;i<N*3;i+=3){this.x[i]=Math.random()*p.L;this.x[i+1]=Math.random()*6;this.x[i+2]=Math.random()*6;for(let k=0;k<3;k++)this.vl[i+k]=(Math.random()+Math.random()+Math.random()-1.5)*s*1.4}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(this.x,3));this.pt=new THREE.Points(g,new THREE.PointsMaterial({color:0xfbbf24,size:.5}));this.pt.frustumCulled=false;scene.add(this.pt);
 this.bx=new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1,1,1)),new THREE.LineBasicMaterial({color:0x60a5fa}));scene.add(this.bx);this.w=new THREE.Mesh(new THREE.PlaneGeometry(6,6),new THREE.MeshBasicMaterial({color:0xef4444,transparent:true,opacity:.35,side:2}));this.w.rotation.y=Math.PI/2;this.w.position.set(0,3,3);scene.add(this.w);this.geo()},
geo(){const L=this.p.L;this.bx.scale.set(L,6,6);this.bx.position.set(L/2,3,3);this.w.position.x=L;for(let i=0;i<this.x.length;i+=3)this.x[i]=Math.min(this.x[i],L-.1)},
onParam(k,o,n){if(k=='T'){const f=Math.sqrt(n/o);for(let i=0;i<this.vl.length;i++)this.vl[i]*=f}else this.geo()},
step(dt){const L=this.p.L,x=this.x,v=this.vl;this.imp*=Math.exp(-dt/2);for(let i=0;i<x.length;i+=3){for(let k=0;k<3;k++){x[i+k]+=v[i+k]*dt;const hi=k?6:L;if(x[i+k]<0){x[i+k]=-x[i+k];v[i+k]*=-1}else if(x[i+k]>hi){x[i+k]=2*hi-x[i+k];if(k==0)this.imp+=2*Math.abs(v[i]);v[i+k]*=-1}}}this.pt.geometry.attributes.position.needsUpdate=true},
read(){const p=this.p,V=p.L*36,P=this.imp/2/36;let s=0;for(let i=0;i<this.vl.length;i++)s+=this.vl[i]*this.vl[i];return `دما T = ${p.T} K ، حجم V = ${V.toFixed(0)}<br>فشار P ≈ ${P.toFixed(2)} (یکای دلخواه)<br>P·V/T ≈ ${(P*V/p.T).toFixed(2)} (باید تقریباً ثابت بماند)<br>v_rms = ${Math.sqrt(s/120).toFixed(2)}`}};
