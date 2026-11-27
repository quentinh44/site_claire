// Réservation et contact : VERSION DE DÉMONSTRATION, rien n’est envoyé.
// Pour de vraies réservations, remplacer le bloc de la page reservation.html par le widget Cal.com (voir README).
if (document.getElementById("fr")) {
  var SV = [   
      ["Séance d’accompagnement", "[DURÉE] · [PRIX] €"],
      ["Forfait de suivi", "[X] semaines · [PRIX] €"],
      ["Nuits à domicile", "sur demande"],
    ],
        HR = [],
    st = { s: 0, d: "", h: "" };
  for (var m = 8 * 60; m <= 19 * 60; m += 30) {
    HR.push(Math.floor(m / 60) + "h" + String(m % 60).padStart(2, "0"));
  }
  function bt(id, items, k, f) {
    document.getElementById(id).innerHTML = items
      .map(function (x, i) {
        return (
          '<button type="button" class="btn o" data-k="' +
          k +
          '" data-i="' +
          i +
          '" aria-pressed="' +
          (st[k] === i) +
          '">' +
          f(x) +
          "</button>"
        );
      })
      .join("");
  }
  function draw() {
    bt("bs", SV, "s", function (x) {
      return x[0] + " <small>(" + x[1] + ")</small>";
    });
    document.getElementById("rc").textContent =
      SV[st.s][0] +
      (st.d
        ? " · " +
          new Date(st.d + "T12:00:00").toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : "") +
            (st.h ? " à " + st.h : "");
  }
  draw();
      var bheure = document.getElementById("bheure");
  bheure.innerHTML =
    '<option value="">Choisir une heure</option>' +
    HR.map(function (h) {
      return '<option value="' + h + '">' + h + "</option>";
    }).join("");
  bheure.addEventListener("change", function () {
    st.h = bheure.value;
    draw();
  });
  var bdate = document.getElementById("bdate");
  function isoJour(x) {
    return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0");
  }
  var dMin = new Date(), dMax = new Date();
  dMin.setDate(dMin.getDate() + 1);
  dMax.setDate(dMax.getDate() + 60);
  bdate.min = isoJour(dMin);
  bdate.max = isoJour(dMax);
  bdate.addEventListener("change", function () {
    var v = bdate.value, n = document.getElementById("bdn"), fermes = typeof JOURS_FERMES !== "undefined" ? JOURS_FERMES : [0];
    n.textContent = "";
    if (v && fermes.indexOf(new Date(v + "T12:00:00").getDay()) > -1) {
      n.textContent = "Ce jour n’est pas proposé, merci d’en choisir un autre.";
      bdate.value = "";
      v = "";
    }
    st.d = v;
    draw();
  });
  document.addEventListener("click", function (e) {
    var b = e.target.closest("[data-k]");
    if (b) {
      st[b.dataset.k] = +b.dataset.i;
      draw();
    }
  });
  document.getElementById("fr").addEventListener("submit", function (e) {
    e.preventDefault();
    var m = document.getElementById("rm");
            if (!st.d || !st.h) {
      m.textContent = "Choisissez un jour et une heure.";
      return;
    }
    if (
      !document.getElementById("p").value ||
      !/.+@.+/.test(document.getElementById("e").value)
    ) {
      m.textContent = "Indiquez votre prénom et un e-mail valide.";
      return;
    }
    m.textContent =
      "Merci ! Votre demande est prise en compte (démo : rien n’est envoyé pour l’instant).";
  });
}
if (document.getElementById("fc")) {
  document.getElementById("fc").addEventListener("submit", function (e) {
    e.preventDefault();
    document.getElementById("cr").textContent =
      "Merci ! (démo : le message n’est pas encore envoyé)";
  });
}

// Menu mobile
(function () {
  var b = document.querySelector(".burger"),
    m = document.getElementById("menu");
  if (!b || !m) return;
  function basculer(o) {
    m.classList.toggle("open", o);
    b.setAttribute("aria-expanded", o);
    b.textContent = o ? "✕" : "☰";
  }
  b.addEventListener("click", function () {
    basculer(!m.classList.contains("open"));
  });
  // Échap ferme le menu et rend le focus au bouton
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && m.classList.contains("open")) {
      basculer(false);
      b.focus();
    }
  });
})();
// ===== Bandeau « appel découverte » et pop-up =====
// À FAIRE : créer une clé gratuite sur https://web3forms.com (elle arrive par e-mail), puis la coller ci-dessous.
var WEB3FORMS_KEY = "VOTRE_CLE_WEB3FORMS";
var CRENEAUX = []; // heures proposées : de 8h00 à 18h30, par pas de 30 minutes
for (var mn = 8 * 60; mn <= 19 * 60; mn += 30) {
  CRENEAUX.push(Math.floor(mn / 60) + "h" + String(mn % 60).padStart(2, "0"));
}
var JOURS_FERMES = [0]; // jours non proposés : 0 = dimanche, 6 = samedi
(function () {
  var ban = document.getElementById("bandeau");
  try {
    if (ban && sessionStorage.getItem("bandeau") === "0") ban.hidden = true;
  } catch (e) {}
  var d = document.createElement("dialog");
  d.id = "appel";
  d.setAttribute("aria-labelledby", "atitre");
  d.innerHTML =
    '<div class="dbox"><button type="button" class="dclose" aria-label="Fermer">✕</button>' +
    '<div id="av"><h2 id="atitre">Demander un appel découverte gratuit</h2><p>15 minutes pour faire connaissance. Choisissez un créneau : je vous rappelle à ce moment-là.</p>' +
    '<form id="fa" novalidate><p class="note">Les champs marqués d’un astérisque (*) sont obligatoires.</p>' +
    '<div class="cols"><div><label for="ap">Prénom *</label><input id="ap" autocomplete="given-name" aria-required="true"></div>' +
    '<div><label for="an">Nom *</label><input id="an" autocomplete="family-name" aria-required="true"></div></div>' +
    '<label for="aph">Téléphone *</label><input id="aph" type="tel" inputmode="tel" autocomplete="tel" aria-required="true">' +
    '<label for="ae">E-mail *</label><input id="ae" type="email" autocomplete="email" aria-required="true">' +
    '<label for="ad">Jour souhaité *</label><input id="ad" type="date" aria-required="true">' +
    '<label for="ah">Heure souhaitée *</label><select id="ah" style="margin-bottom:16px" aria-required="true"></select>' +
    '<label for="ac">Commentaire (facultatif)</label><textarea id="ac" rows="3"></textarea>' +
    '<label class="cons"><input type="checkbox" id="ak" aria-required="true"><span>J’accepte que ces informations servent à me recontacter. <a href="mentions-legales.html">Politique de confidentialité</a></span></label>' +
    '<input type="checkbox" id="abot" tabindex="-1" autocomplete="off" style="display:none">' +
    '<p class="err" id="aerr" role="alert"></p><button class="btn" type="submit" id="asub">Envoyer ma demande</button></form></div>' +
    '<div id="ao" hidden><h2 id="amerci" tabindex="-1">Merci !</h2><p>Votre demande est bien envoyée. Je vous confirme le créneau rapidement par téléphone ou par e-mail.</p><button type="button" class="btn fermer">Fermer</button></div></div>';
  document.body.appendChild(d);
  var $ = function (id) {
    return document.getElementById(id);
  };
  // Les liens « appel découverte » ouvrent une fenêtre : on le signale aux lecteurs d’écran
  if (d.showModal) {
    Array.prototype.forEach.call(
      document.querySelectorAll("[data-appel]"),
      function (a) {
        a.setAttribute("aria-haspopup", "dialog");
      },
    );
  }
  // Retire les marques d’erreur des champs
  function effacerErreurs() {
    $("aerr").textContent = "";
    Array.prototype.forEach.call(
      d.querySelectorAll("[aria-invalid]"),
      function (c) {
        c.removeAttribute("aria-invalid");
        c.removeAttribute("aria-describedby");
      },
    );
  }
  // Affiche l’erreur, la relie au champ concerné et place le focus dessus
  function erreur(id, msg) {
    effacerErreurs();
    $("aerr").textContent = msg;
    if (id) {
      $(id).setAttribute("aria-invalid", "true");
      $(id).setAttribute("aria-describedby", "aerr");
      $(id).focus();
    }
  }
    $("ah").innerHTML =
    '<option value="">Choisir une heure</option>' +
    CRENEAUX.map(function (h) {
      return '<option value="' + h + '">' + h + "</option>";
    }).join("");
  function iso(x) {
    return (
      x.getFullYear() +
      "-" +
      String(x.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(x.getDate()).padStart(2, "0")
    );
  }
  function ouvrir() {
    var a = new Date(),
      b = new Date();
    a.setDate(a.getDate() + 1);
    b.setDate(b.getDate() + 60);
    $("ad").min = iso(a);
    $("ad").max = iso(b);
    $("av").hidden = false;
    $("ao").hidden = true;
    effacerErreurs();
    $("asub").disabled = false;
    $("asub").textContent = "Envoyer ma demande";
    d.showModal();
  }
  document.addEventListener("click", function (e) {
    var a = e.target.closest("[data-appel]");
    if (a && d.showModal) {
      e.preventDefault();
      ouvrir();
      return;
    }
    if (e.target.closest(".dclose, .fermer") || e.target === d) d.close();
    if (e.target.closest(".bclose")) {
      ban.hidden = true;
      try {
        sessionStorage.setItem("bandeau", "0");
      } catch (x) {}
    }
  });
  $("fa").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target,
      v = function (id) {
        return $(id).value.trim();
      },
      err = $("aerr"),
      btn = $("asub"),
      h = $("ah").value;
    function fin() {
      $("av").hidden = true;
      $("ao").hidden = false;
      f.reset();
      effacerErreurs();
      // Le bouton « Envoyer » vient de disparaître : on place le focus sur le message de confirmation
      $("amerci").focus();
    }
    if ($("abot").checked) {
      fin();
      return;
    }
    if (!v("ap")) return erreur("ap", "Merci d’indiquer votre prénom.");
    if (!v("an")) return erreur("an", "Merci d’indiquer votre nom.");
    if (v("aph").replace(/\D/g, "").length < 9)
      return erreur("aph", "Merci d’indiquer un numéro de téléphone valide.");
    if (!/^\S+@\S+\.\S+$/.test(v("ae")))
      return erreur("ae", "Merci d’indiquer une adresse e-mail valide.");
    var jd = v("ad"),
      dt = new Date(jd + "T12:00:00");
    if (!jd || isNaN(dt) || jd < $("ad").min || jd > $("ad").max)
      return erreur(
        "ad",
        "Choisissez un jour dans le calendrier (à partir de demain).",
      );
    if (JOURS_FERMES.indexOf(dt.getDay()) > -1)
      return erreur(
        "ad",
        "Ce jour n’est pas proposé, merci d’en choisir un autre.",
      );
    if (!h) return erreur("ah", "Choisissez une heure.");
    if (!$("ak").checked)
      return erreur(
        "ak",
        "Merci de cocher la case d’accord pour être recontacté(e).",
      );
    if (WEB3FORMS_KEY.indexOf("VOTRE") === 0)
      return erreur(
        null,
        "Formulaire non configuré : la clé Web3Forms est manquante dans assets/app.js.",
      );
    effacerErreurs();
    btn.disabled = true;
    btn.textContent = "Envoi en cours…";
    var creneau =
      dt.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }) +
      " à " +
      h;
    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: "Demande d’appel découverte – " + v("ap") + " " + v("an"),
        from_name: "Site [NOM DE MARQUE]",
        name: v("ap") + " " + v("an"),
        email: v("ae"),
        telephone: v("aph"),
        creneau: creneau,
        commentaire: v("ac") || "(aucun)",
      }),
    })
      .then(function (r) {
        return r.json().then(function (j) {
          return r.ok && j.success;
        });
      })
      .then(function (ok) {
        if (!ok) throw new Error("echec");
        fin();
      })
      .catch(function () {
        err.textContent =
          "L’envoi a échoué. Réessayez dans un instant ou écrivez-moi à [E-MAIL].";
        btn.disabled = false;
        btn.textContent = "Envoyer ma demande";
      });
  });
})();
