# Poukave - Plateforme de Signalement Anonyme

## Description

Poukave est une plateforme web conçue pour permettre aux citoyens de signaler de manière anonyme les problèmes sociaux, environnementaux et civiques qui affectent leur communauté. Développée avec Next.js, elle offre une interface utilisateur moderne et intuitive, grâce à l'utilisation de Shadcn UI et des icônes Lucide. Le backend, alimenté par Express, communique avec une base de données PostgreSQL gérée par Prisma et Neon.

## Technologies Utilisées

### Frontend :

- **Next.js** : Framework React pour le rendu côté serveur et la génération de sites statiques.
- **Shadcn UI** : Bibliothèque de composants React pour une interface utilisateur moderne et accessible.
- **Lucide** : Bibliothèque d'icônes pour une expérience utilisateur claire et cohérente.

### Backend :

- **Express.js** : Framework Node.js pour la création d'API robustes.
- **Prisma** : ORM (Object-Relational Mapping) pour faciliter l'interaction avec la base de données.
- **Neon** : Plateforme serverless pour les bases de données PostgreSQL.

### Déploiement :

- **Vercel** : Plateforme de déploiement pour les applications Next.js.

## Fonctionnalités Principales

- **Signalement Anonyme** : Les utilisateurs peuvent signaler des problèmes sans révéler leur identité.
- **Catégorisation des Signalements** : Les signalements sont classés par catégories (fraude, environnement, etc.) pour une meilleure organisation.
- **Visualisation des Données** : Des statistiques et des analyses sont disponibles pour comprendre l'impact des signalements.
- **Interface Utilisateur Intuitive** : Grâce à Shadcn UI, la plateforme est facile à utiliser sur tous les appareils.
- **DotPattern de MagicUI** : Ajout de design graphique.

## Installation et Configuration

### Cloner le dépôt :

```bash
git clone https://github.com/YounessFTN/poukaves.git
cd poukaves
```

### Lancer le serveur de développement :

```bash
npm run dev  # ou yarn dev ou pnpm dev
```

## Notes Supplémentaires

- Ce projet utilise **Tailwind CSS** pour le style.
- La plateforme est conçue pour être **responsive** et **accessible**.
- La base de données **Neon** est utilisée pour le stockage des données.
- **Prisma** permet d'effectuer les requêtes à la base de données.
