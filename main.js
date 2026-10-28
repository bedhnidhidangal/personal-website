(function(){
var root=document.documentElement;
try{var t=localStorage.getItem("theme");if(t)root.setAttribute("data-theme",t)}catch(e){}
var tb=document.getElementById("theme");
if(tb)tb.addEventListener("click",function(){
var next=root.getAttribute("data-theme")==="light"?"dark":"light";
root.setAttribute("data-theme",next);
try{localStorage.setItem("theme",next)}catch(e){}
});

/* Photo slots: if the image file is missing, show a hint with the file name to add */
document.querySelectorAll(".photo img").forEach(function(img){
var box=img.parentElement;
function miss(){box.classList.add("empty")}
if(img.complete&&img.naturalWidth===0)miss();
img.addEventListener("error",miss);
});

/* Gallery: click a photo to see it large */
var gal=document.querySelectorAll(".gallery .photo img,.shots .photo img,.masonry .photo img");
if(gal.length){
var dlg=document.createElement("dialog");
dlg.className="lb";
dlg.innerHTML='<img alt="">';
document.body.appendChild(dlg);
dlg.addEventListener("click",function(){dlg.close()});
gal.forEach(function(img){
img.addEventListener("click",function(){
if(img.parentElement.classList.contains("empty"))return;
dlg.querySelector("img").src=img.src;
dlg.querySelector("img").alt=img.alt;
dlg.showModal();
});
});
}

/* Watering demo on the home page */
var s=document.getElementById("moist");
if(s){
var m=document.getElementById("meter"),f=document.getElementById("fill"),v=document.getElementById("val"),p=document.getElementById("pump");
var upd=function(){
var n=+s.value;
f.style.width=n+"%";
v.textContent="Moisture "+n+"%";
var dry=n<35;
m.classList.toggle("dry",dry);
p.textContent=dry?"Dry: pump on":"Pump off";
};
s.addEventListener("input",upd);upd();
}
var yr=document.getElementById("yr");
if(yr)yr.textContent=new Date().getFullYear();
})();

/* Contact page: copy email and send-by-email form */
(function(){
var mail="bedhnidhidangal@gmail.com";
var c=document.getElementById("copy");
if(c)c.addEventListener("click",function(){
function ok(){c.textContent="Copied";setTimeout(function(){c.textContent="Copy email"},1800)}
if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(mail).then(ok,function(){})}
else{var t=document.createElement("textarea");t.value=mail;document.body.appendChild(t);t.select();try{document.execCommand("copy");ok()}catch(x){}t.remove()}
});
var f=document.getElementById("cform");
if(f)f.addEventListener("submit",function(ev){
ev.preventDefault();
var n=f.elements.fn.value.trim(),e=f.elements.fe.value.trim(),m=f.elements.fm.value.trim();
var body=m+"\n\nFrom: "+n+(e?" ("+e+")":"");
location.href="mailto:"+mail+"?subject="+encodeURIComponent("Message from "+n)+"&body="+encodeURIComponent(body);
});
})();

/* Picture page: filter photos by category */
(function(){
var bs=document.querySelectorAll(".chipbtn[data-f]");
if(!bs.length)return;
bs.forEach(function(b){
b.addEventListener("click",function(){
var f=b.getAttribute("data-f");
bs.forEach(function(x){x.setAttribute("aria-pressed",x===b?"true":"false")});
document.querySelectorAll(".masonry .photo").forEach(function(p){
p.classList.toggle("hide",f!=="all"&&p.getAttribute("data-cat")!==f);
});
});
});
})();
