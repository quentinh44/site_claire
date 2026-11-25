// ===== Réservation avec Cal.com (page reservation.html) : un seul agenda =====
// À FAIRE (plus tard) : créer un compte sur https://cal.com, puis remplacer VOTRE-IDENTIFIANT/NOM-EVENEMENT
// par l'adresse de votre événement : identifiant/adresse-de-l-événement (fin de l'adresse de la page de réservation Cal.com).
var CAL_LIEN = "VOTRE-IDENTIFIANT/NOM-EVENEMENT";
var CAL_ORIGIN = "https://app.cal.com"; // à vérifier avec le code généré par Cal.com (Embed > Inline)
var CAL_COULEUR = "#B5432A"; // couleur des boutons dans l'agenda

// Chargeur officiel Cal.com
(function (C, A, L) {
  var p = function (a, ar) { a.q.push(ar); };
  var d = C.document;
  C.Cal = C.Cal || function () {
    var cal = C.Cal, ar = arguments;
    if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; }
    if (ar[0] === L) {
      var api = function () { p(api, arguments); };
      var namespace = ar[1];
      api.q = api.q || [];
      typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar);
      return;
    }
    p(cal, ar);
  };
})(window, CAL_ORIGIN + "/embed/embed.js", "init");

(function () {
  var zone = document.getElementById("cal-agenda");
  if (!zone) return;
  if (CAL_LIEN.indexOf("VOTRE-IDENTIFIANT") > -1) {
    zone.innerHTML = '<p class="note">[Agenda de réservation : à brancher une fois Cal.com configuré, voir assets/cal.js]</p>';
    return;
  }
  Cal("init", "agenda", { origin: CAL_ORIGIN });
  Cal.ns.agenda("inline", { elementOrSelector: "#cal-agenda", calLink: CAL_LIEN, layout: "month_view" });
  Cal.ns.agenda("ui", { styles: { branding: { brandColor: CAL_COULEUR } }, hideEventTypeDetails: false, layout: "month_view" });
})();