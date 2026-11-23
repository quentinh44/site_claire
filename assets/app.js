// Réservation et contact : VERSION DE DÉMONSTRATION, rien n’est envoyé.
// Pour de vraies réservations, remplacer le bloc de la page reservation.html par le widget Cal.com (voir README).
if (document.getElementById("fr")) {
  var SV = [
      ["Appel découverte", "15 min · gratuit"],
      ["Séance d’accompagnement", "[DURÉE] · [PRIX] €"],
      ["Forfait de suivi", "[X] semaines · [PRIX] €"],
      ["Nuits à domicile", "sur demande"],
    ],
    HR = ["9h00", "10h30", "14h00", "16h00", "18h30"],
    st = { s: 0, d: null, h: null },
    DS = [];
  for (var i = 1; DS.length < 10; i++) {
    var d = new Date();
    d.setDate(d.getDate() + i);
    if (d.getDay()) DS.push(d);
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
    bt("bd", DS, "d", function (d) {
      return d.toLocaleDateString("fr-FR", {
        weekday: "short",
        day: "numeric",
        month: "short",
      });
    });
    bt("bh", HR, "h", function (x) {
      return x;
    });
    document.getElementById("rc").textContent =
      SV[st.s][0] +
      (st.d !== null
        ? " · " +
          DS[st.d].toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : "") +
      (st.h !== null ? " à " + HR[st.h] : "");
  }
  draw();
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
    if (st.d === null || st.h === null) {
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
  b.addEventListener("click", function () {
    var o = m.classList.toggle("open");
    b.setAttribute("aria-expanded", o);
    b.textContent = o ? "✕" : "☰";
  });
})();
// ===== Bandeau « appel découverte » et pop-up =====
// À FAIRE : créer une clé gratuite sur https://web3forms.com (elle arrive par e-mail), puis la coller ci-dessous.
var WEB3FORMS_KEY = "VOTRE_CLE_WEB3FORMS";
var CRENEAUX = ["9h00", "10h30", "14h00", "16h00", "18h30"]; // heures proposées
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
    '<form id="fa" novalidate><div class="cols"><div><label for="ap">Prénom *</label><input id="ap" autocomplete="given-name"></div>' +
    '<div><label for="an">Nom *</label><input id="an" autocomplete="family-name"></div></div>' +
    '<label for="aph">Téléphone *</label><input id="aph" type="tel" inputmode="tel" autocomplete="tel">' +
    '<label for="ae">E-mail *</label><input id="ae" type="email" autocomplete="email">' +
    '<label for="ad">Jour souhaité *</label><input id="ad" type="date">' +
    '<fieldset><legend>Heure souhaitée *</legend><div class="row" id="ah"></div></fieldset>' +
    '<label for="ac">Commentaire (facultatif)</label><textarea id="ac" rows="3"></textarea>' +
    '<label class="cons"><input type="checkbox" id="ak"><span>J’accepte que ces informations servent à me recontacter. <a href="mentions-legales.html">Politique de confidentialité</a></span></label>' +
    '<input type="checkbox" id="abot" tabindex="-1" autocomplete="off" style="display:none">' +
    '<p class="err" id="aerr" role="alert"></p><button class="btn" type="submit" id="asub">Envoyer ma demande</button></form></div>' +
    '<div id="ao" hidden role="status"><h2>Merci !</h2><p>Votre demande est bien envoyée. Je vous confirme le créneau rapidement par téléphone ou par e-mail.</p><button type="button" class="btn dclose">Fermer</button></div></div>';
  document.body.appendChild(d);
  var $ = function (id) {
    return document.getElementById(id);
  };
  $("ah").innerHTML = CRENEAUX.map(function (h) {
    return (
      '<label class="chip"><input type="radio" name="heure" value="' +
      h +
      '"><span>' +
      h +
      "</span></label>"
    );
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
    $("aerr").textContent = "";
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
    if (e.target.closest(".dclose") || e.target === d) d.close();
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
      h = f.querySelector("input[name=heure]:checked");
    function fin() {
      $("av").hidden = true;
      $("ao").hidden = false;
      f.reset();
    }
    if ($("abot").checked) {
      fin();
      return;
    }
    if (!v("ap") || !v("an")) {
      err.textContent = "Merci d’indiquer votre prénom et votre nom.";
      return;
    }
    if (v("aph").replace(/\D/g, "").length < 9) {
      err.textContent = "Merci d’indiquer un numéro de téléphone valide.";
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(v("ae"))) {
      err.textContent = "Merci d’indiquer une adresse e-mail valide.";
      return;
    }
    var jd = v("ad"),
      dt = new Date(jd + "T12:00:00");
    if (!jd || isNaN(dt) || jd < $("ad").min || jd > $("ad").max) {
      err.textContent =
        "Choisissez un jour dans le calendrier (à partir de demain).";
      return;
    }
    if (JOURS_FERMES.indexOf(dt.getDay()) > -1) {
      err.textContent =
        "Ce jour n’est pas proposé, merci d’en choisir un autre.";
      return;
    }
    if (!h) {
      err.textContent = "Choisissez une heure.";
      return;
    }
    if (!$("ak").checked) {
      err.textContent =
        "Merci de cocher la case d’accord pour être recontacté(e).";
      return;
    }
    if (WEB3FORMS_KEY.indexOf("VOTRE") === 0) {
      err.textContent =
        "Formulaire non configuré : la clé Web3Forms est manquante dans assets/app.js.";
      return;
    }
    err.textContent = "";
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
      h.value;
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
