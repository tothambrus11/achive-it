import"./style-9f216c18.js";import{M as u,P as y}from "./progressbar.component-05715f1f.js";import{D as g,A as C,I as p,T as h,O as v}from "./target-type-selection.component-f50608ff.js";const t=document.querySelector(".app-layout");let b=new u({name:"My Goals",url:"/dashboard.html"});t.appendChild(b);const o=document.createElement("input");o.classList.add("goal-title");o.placeholder="Goal title";t.appendChild(o);let l=new y;l.style.marginBottom="10px";t.appendChild(l);const n=document.createElement("div");n.classList.add("goal-buttons");t.append(n);const s=document.createElement("div");n.append(s);const w=new v("");let r=new g(w);r.style.gap="3px";s.append(r);const E=new C("Add details","add-description",()=>{alert("Add details field to goal. To be implemented with the backend support. Currently we just display the details fields if they are already added to the goal.")});s.append(E);let c=document.createElement("div");n.appendChild(c);let m=new p("/icons/very-dissatisfied-circle.svg","CANCEL GOAL");m.classList.add("icon-button-red");c.appendChild(m);let f=0;l.setAttribute("rate",f.toString());const e=document.createElement("div");e.style.display="flex";e.style.justifyContent="center";e.style.marginTop="20px";t.appendChild(e);let i=document.createElement("div");i.classList.add("tts-cont");let a=new h;a.style.display="none";i.append(a);e.append(i);const d=new p("/icons/plus.svg","Add Target");d.classList.add("add-target-btn");d.addEventListener("click",()=>a.style.display="block");d.addEventListener("focusout",()=>a.style.display="none");e.appendChild(d);
