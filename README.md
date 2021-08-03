# Support Launcher Market

Support-launcher Market est le nom du site de vente utilisé pour le serveur discord Support-Launcher.

[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-yellow.svg)](https://opensource.org/licenses/GPL-3.0)
[![GitHub Super-Linter](https://github.com/Bricklou/supportlauncher-market/workflows/Lint%20Code%20Base/badge.svg)](https://github.com/marketplace/actions/super-linter)

# Installation

Pour l'installation, vous aurez besoin de Node.JS (>=14.16) et de NPM (optionnel : PNPM). La présence d'une base de donnée (Postgress) est conseillé même s'il est possible de passer par un fichier SQLite.

## Préparation

Tout d'abord, clonez le dépôt :

```sh
$ git clone https://github.com/Bricklou/supportlauncher-market
$ cd supportlauncher-market
```

Copiez les fichiers de configuration `.env.example` vers `.env` puis complétez-le.

## Dépendances

L'installation des dépendances se fait comme suit :

```sh
$ pnpm i # vous pouvez remplacer PNPM par NPM
```

## Déployer la base de donnée

Pour déployer la base de donnée, exécutez la commande suivante à la racine du projet (le fichier `.env` doit avoir été configuré) :

```sh
# pour créer les tables
$ node ace migration:run
# pour préremplir les donnée
$ node ace db:seed
```

### Notes pour SQLite

Lorsque AdonisJS est configuré pour utiliser SQLite, il va essayer de charger le fichier `tmp/database.sqlite`. Vous devrez au préalable créer le dossier `tmp` à la racine du projet.

# Démarrer le site

**En environnement de développement**, le site se démarre grâce à la commande suivante :

```sh
$ pnpm run dev # ou npm
```

Le site sera ensuite disponible à l'adresse [http://localhost:3000](http://localhost:3000) si le port par défaut n'as pas été changé.

**En environnement de production**, le site doit d'abord être compilé.

```sh
$ pnpm run build
```

Le projet final se trouvera dans `build/` et pourra être démarré via :

```sh
$ pnpm i --production # pour installer les dépendances nécessaires
$ pnpm run start # ou npm
```
