import"./style-9f216c18.js";const o=document.querySelector("#login-box"),t=o.querySelector(".flying-thingy"),i=o.querySelector("#sign-in-button"),s=o.querySelector("#sign-up-button"),c=o.querySelector("#form-sign-in"),g=o.querySelector("#form-sign-up");function n(u){t.style.left=`${u}px`}let e=!0;i.addEventListener("click",()=>{e=!0,n(f()),r()});s.addEventListener("click",()=>{e=!1,n(l()),r()});function r(){c.style.display=e?"block":"none",g.style.display=e?"none":"block"}function f(){return i.offsetLeft+i.offsetWidth/2-t.offsetWidth/2}function l(){return s.offsetLeft+s.offsetWidth/2-t.offsetWidth/2}document.addEventListener("readystatechange",()=>{r(),n(f())});window.addEventListener("resize",()=>{t.style.transition=".0s",n(e?f():l()),setTimeout(()=>{t.style.transition=".2s"},100)});setTimeout(()=>{t.style.transition=".2s"},100);
