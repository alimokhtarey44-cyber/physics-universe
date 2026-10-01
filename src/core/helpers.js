import * as THREE from 'three';
// هسته گرافیکی مشترک: رندرر، دوربین، ابزارهای کمکی. ماژول‌ها فقط از اینجا import می‌کنند.
export const $=s=>document.querySelector(s);
export const cv=$('#c');
export const R=new THREE.WebGLRenderer({canvas:cv,antialias:true});
R.setPixelRatio(Math.min(devicePixelRatio,2));
export const scene=new THREE.Scene();
export const cam=new THREE.PerspectiveCamera(50,1,.1,500);
export const view={th:.9,ph:1.15,dist:24,tgt:new THREE.Vector3(),drag:null};
export const ctx={cur:null,playing:true,speed:1};
export function camUpd(){const{th,ph,dist,tgt}=view;cam.position.set(tgt.x+dist*Math.sin(ph)*Math.cos(th),tgt.y+dist*Math.cos(ph),tgt.z+dist*Math.sin(ph)*Math.sin(th));cam.lookAt(tgt)}
export function rs(){const w=cv.clientWidth,h=cv.clientHeight;R.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
export function zoom(f){view.dist=Math.min(120,Math.max(4,view.dist*f));camUpd()}
export function rb(){base();ctx.cur.build()}
addEventListener('resize',rs);
cv.addEventListener('pointerdown',e=>{view.drag=[e.clientX,e.clientY];cv.setPointerCapture(e.pointerId)});
cv.addEventListener('pointermove',e=>{const d=view.drag;if(!d)return;view.th-=(e.clientX-d[0])*.008;view.ph=Math.min(3,Math.max(.15,view.ph-(e.clientY-d[1])*.008));view.drag=[e.clientX,e.clientY];camUpd()});
cv.addEventListener('pointerup',()=>view.drag=null);
cv.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY>0?1.1:.9)},{passive:false});
$('#zi').onclick=()=>zoom(.85);$('#zo').onclick=()=>zoom(1.18);
export class Trail{constructor(n,c){this.n=n;this.c=0;this.a=new Float32Array(n*3);const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(this.a,3));g.setDrawRange(0,0);this.g=g;this.l=new THREE.Line(g,new THREE.LineBasicMaterial({color:c}));this.l.frustumCulled=false}
add(x,y,z){if(this.c<this.n)this.c++;else this.a.copyWithin(0,3);const i=(this.c-1)*3;this.a[i]=x;this.a[i+1]=y;this.a[i+2]=z;this.g.setDrawRange(0,this.c);this.g.attributes.position.needsUpdate=true}}
export function lineOf(pts,c){return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts),new THREE.LineBasicMaterial({color:c}))}
export function base(){while(scene.children.length)scene.remove(scene.children[0]);scene.add(new THREE.AmbientLight(0xffffff,.6));const p=new THREE.PointLight(0xffffff,1.1);p.position.set(20,30,20);scene.add(p)}
export function wl(l){let r=0,g=0,b=0;if(l>=380&&l<440){r=(440-l)/60;b=1}else if(l>=440&&l<490){g=(l-440)/50;b=1}else if(l>=490&&l<510){g=1;b=(510-l)/20}else if(l>=510&&l<580){r=(l-510)/70;g=1}else if(l>=580&&l<645){r=1;g=(645-l)/65}else if(l>=645&&l<=750)r=1;return new THREE.Color(r,g,b)}

