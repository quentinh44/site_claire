// Réservation et contact : VERSION DE DÉMONSTRATION, rien n’est envoyé.
// Pour de vraies réservations, remplacer le bloc de la page reservation.html par le widget Cal.com (voir README).
if(document.getElementById("fr")){
var SV=[["Appel découverte","15 min · gratuit"],["Séance d’accompagnement","[DURÉE] · [PRIX] €"],["Forfait de suivi","[X] semaines · [PRIX] €"],["Nuits à domicile","sur demande"]],HR=["9h00","10h30","14h00","16h00","18h30"],st={s:0,d:null,h:null},DS=[];
for(var i=1;DS.length<10;i++){var d=new Date();d.setDate(d.getDate()+i);if(d.getDay())DS.push(d)}
function bt(id,items,k,f){document.getElementById(id).innerHTML=items.map(function(x,i){return '<button type="button" class="btn o" data-k="'+k+'" data-i="'+i+'" aria-pressed="'+(st[k]===i)+'">'+f(x)+'</button>'}).join("")}
function draw(){bt("bs",SV,"s",function(x){return x[0]+" <small>("+x[1]+")</small>"});bt("bd",DS,"d",function(d){return d.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})});bt("bh",HR,"h",function(x){return x});document.getElementById("rc").textContent=SV[st.s][0]+(st.d!==null?" · "+DS[st.d].toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"}):"")+(st.h!==null?" à "+HR[st.h]:"")}
draw();
document.addEventListener("click",function(e){var b=e.target.closest("[data-k]");if(b){st[b.dataset.k]=+b.dataset.i;draw()}});
document.getElementById("fr").addEventListener("submit",function(e){e.preventDefault();var m=document.getElementById("rm");if(st.d===null||st.h===null){m.textContent="Choisissez un jour et une heure.";return}if(!document.getElementById("p").value||!/.+@.+/.test(document.getElementById("e").value)){m.textContent="Indiquez votre prénom et un e-mail valide.";return}m.textContent="Merci ! Votre demande est prise en compte (démo : rien n’est envoyé pour l’instant)."});
}
if(document.getElementById("fc")){
document.getElementById("fc").addEventListener("submit",function(e){e.preventDefault();document.getElementById("cr").textContent="Merci ! (démo : le message n’est pas encore envoyé)"});
}

// Menu mobile
(function(){var b=document.querySelector(".burger"),m=document.getElementById("menu");if(!b||!m)return;b.addEventListener("click",function(){var o=m.classList.toggle("open");b.setAttribute("aria-expanded",o);b.textContent=o?"✕":"☰"})})();
