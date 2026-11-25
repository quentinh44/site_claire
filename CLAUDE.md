# Site vitrine – accompagnement post-partum

## Projet
- Site statique (HTML, CSS, un peu de JavaScript) pour l'auto-entreprise de Claire : accompagnement des parents, sommeil de bébé, nuits à domicile. En visio et à domicile.
- Offres : appel découverte (gratuit), séance d'accompagnement, forfait de suivi, nuits à domicile (sur demande).
- Public : nouveaux parents, souvent fatigués et sur téléphone. Le site doit être clair, rassurant et simple.
- Pas de back-end : la réservation (widget Cal.com prévu) et le formulaire de contact sont des démonstrations, rien n'est envoyé.

## Structure
- Pages : index, qui-suis-je, services, reservation, temoignages, faq, contact, mentions-legales (.html)
- `assets/style.css` : couleurs en variables CSS en haut du fichier, mode sombre inclus
- `assets/app.js` : démo de réservation, formulaire de contact, menu mobile
- Le menu et le pied de page sont dupliqués dans chaque page : toute modification doit être reportée dans les 8 fichiers.
- Mobile (≤ 760 px) : menu burger et barre « Réserver » fixe en bas.

## Ton et style
- Français, vouvoiement du visiteur. Ton chaleureux, bienveillant, sans jugement.
- Typographie française : apostrophes ’, guillemets « », espace avant ? ! : ;
- Couleurs : uniquement via les variables CSS (jamais en dur), contraste suffisant.
- Accessibilité : labels sur les champs, focus visible, zones tactiles ≥ 48 px.

## Règles de contenu (importantes)
- Ne jamais inventer de prix, de nom, de diplôme, de chiffre ni de témoignage : laisser le texte entre crochets [ ].
- Ne rien promettre sur le sommeil du bébé, ne rien présenter comme un avis médical. Renvoyer vers un professionnel de santé en cas de doute.
- Ne pas parler de « garde d'enfants », de crédit d'impôt, de CESU ou d'agrément tant que le statut légal n'est pas confirmé (voir « À confirmer »).
- Aucune donnée personnelle de client dans le dépôt.

## Avant de dire que c'est terminé
- Vérifier à 360 px et à 1280 px : pas de défilement horizontal.
- Vérifier que les liens internes fonctionnent.
- Lister les textes à remplacer : `grep -rn "\[" *.html`

## À ne pas faire
- Pas de framework ni d'étape de build, sauf demande explicite.
- Pas de `git push --force`. Ne pas pousser sur GitHub sans que je le demande.
- Ne pas retirer la balise `noindex` tant que je ne l'ai pas demandé.
- Pas de traceur ni de cookie sans en parler d'abord (RGPD).

## À confirmer (mettre à jour au fil du projet)
- Statut légal des nuits à domicile (agrément, déclaration)
- Nom de domaine, nom de marque, tarifs
- Outil de réservation et envoi du formulaire de contact
- Mentions légales, CGV, politique de confidentialité à rédiger