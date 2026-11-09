# Site vitrine – accompagnement post-partum

Site statique (HTML, CSS, un peu de JavaScript), sans outil de build.

## Structure
- `index.html`, `qui-suis-je.html`, `services.html`, `reservation.html`, `temoignages.html`, `faq.html`, `contact.html`, `mentions-legales.html`
- `assets/style.css` : tout le style (couleurs en haut du fichier, variables `--ac`, `--bg`, etc., avec mode sombre)
- `assets/app.js` : réservation et formulaire de contact en **démo**
- `robots.txt`, `sitemap.xml` : à compléter avec le nom de domaine

## À faire avant la mise en ligne
1. Remplacer tous les textes entre crochets : `grep -rn "\[" *.html`
2. Remplacer `[DOMAINE]` dans `robots.txt` et `sitemap.xml`
3. **Retirer le blocage Google** (balise `noindex`) : `sed -i '/name="robots"/d' *.html`
4. Brancher la vraie réservation (widget Cal.com) dans `reservation.html`, et un vrai envoi pour le formulaire de contact dans `contact.html`
5. Rédiger mentions légales, CGV et confidentialité (`mentions-legales.html`)
6. Ajouter photos et logo (dossier `assets/`)

## Déploiement
Hébergeur statique (Cloudflare Pages, Netlify, GitHub Pages) : dossier racine du dépôt, aucune commande de build, dossier de sortie `/`.
