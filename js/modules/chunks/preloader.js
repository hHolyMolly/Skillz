
function preloader(speed){if(document.getElementById("preloader")){window.addEventListener("load",()=>{function loadPage(){return new Promise((resolve)=>{setTimeout(resolve,speed);});}
loadPage().then(()=>{document.getElementById("preloader").remove();document.body.classList.remove("_lock-scroll");});});}}
export default preloader;