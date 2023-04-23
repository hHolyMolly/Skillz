
import modals from"./modals.js";import{scrollTo,formAction}from"../scripts.js";function preloader(speed){if(document.getElementById("preloader")){window.addEventListener("load",()=>{setTimeout(()=>{window.scrollTo(0,0);},1);function loadPage(){return new Promise((resolve)=>{setTimeout(resolve,speed);scrollTo();formAction();modals();});}
loadPage().then(()=>{document.getElementById("preloader").remove();document.body.classList.remove("_lock-scroll");new WOW({mobile:false,offset:100,}).init();});});}}
export default preloader;