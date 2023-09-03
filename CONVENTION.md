## Syntaxe et nommage 
- L’encodage des fichiers et des bases de données doit se faire en UTF-8.
- Terminer les instructions par un `;` sauf si la configuration eslint du projet le permet autrement.
- Ne jamais laisser un appel à `console.log()` ou `eval()` dans le code en production.


## Langue
La langue employée pour tout texte rédigé au cours d’un projet est l'anglais :
- les commentaires dans un fichier de code
- les instructions dans le fichier README.md
- toute documentation explicative ou technique
- l'architecture et les dossiers du projet
- le nom des fichiers 
- les branches principales de versionning (`main`,`develop`), avec possibilités en français si besoin.

## Noms des classes
* Nom des classes SCSS 'camelCase';

## Noms des fichiers

<span style="color:DarkBlue">**Nommage**</span>

* Nom des fichiers js `main` en `camelCase`;
* Nom des fichiers js `components`, la première lettre de chaque mot sera en `UpperCase`;
* dossier Minuscule;

<span style="color:DarkBlue">**Versions**</span>

* **Pour chaque run.** Création des branches de developpement propre a chacun, une fois la run terminé push sur la branch `Develop` Puis supprimer les branches de chacun. Ensuite recréer les branches propre a chacun a partir de la même versions.

<span style="color:DarkBlue">**Bonnes pratiques**</span>:

* Ne pas utiliser de symboles spéciaux dans le nom du fichier (`-.,;:\/$`^`, caractères accentués, etc.);
* Privilégier le camelCase, utilisez-le systématiquement dans tout le script pour uniformiser le code.