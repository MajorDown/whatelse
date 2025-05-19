# 📦 WhatElse API – Modules

Ce backend gère les projets collaboratifs et l'authentification des utilisateurs via JWT.  
Les routes sont protégées par un `AuthGuard` personnalisé basé sur un token + email.

---

## 🔐 Authentification

la quasi-totalité des routes nécessitent les **headers suivants** :
Authorization: Bearer <JWT>
x-user-email: <email>

Le `JwtAuthGuard` vérifie :

- que le token est valide (via `TokenManager`)
- que l’email dans le token correspond à celui du header

---

## 👤 Module `User`

| Verbe | Route          | Auth requise | Description                                                                                   |
| ----- | -------------- | ------------ | --------------------------------------------------------------------------------------------- |
| POST  | `/user/signup` | ❌           | Crée un nouvel utilisateur dans la base de données. Nécessite `name`, `email`, et `password`. |
| POST  | `/user/login`  | ❌           | Authentifie un utilisateur à partir de l’`email` et du `password`. Retourne un token JWT.     |

---

## 📘 Module `Project`

| Verbe  | Route                      | Auth requise | Description                                                                                                                                  |
| ------ | -------------------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------- |
| POST   | `/project`                 | ✅           | Crée un projet. Le `creatorId` est extrait du token. Nécessite `title`, `description2?`, `statusList?`.                                      |
| GET    | `/project/byCreator`       | ✅           | Retourne tous les projets créés par l'utilisateur connecté.                                                                                  |
| GET    | `/project/byContributions` | ✅           | Retourne tous les projets auxquels l'utilisateur participe en tant que contributeur.                                                         |
| DELETE | `/project/:id`             | ✅           | Supprime un projet par son `id`, seulement si l'utilisateur est le créateur.                                                                 |
| PATCH  | `/project/:id`             | ✅           | Met à jour un projet existant. Ne modifie que les champs envoyés (`title`, `description2`, `statusList`). Accessible uniquement au créateur. |

---

## 🧩 Services exposés (`UserService`)

- `create(dto: CreateUserDto)`  
  Crée un utilisateur. Hash le mot de passe avec `PasswordManager.encrypt` et enregistre en base. Retourne l'`id` de l'utilisateur créé.

- `login(dto: LoginUserDto)`  
  Authentifie un utilisateur. Vérifie l’`email` et le mot de passe avec `PasswordManager.check`. Retourne un objet `ConnectedUser` contenant `id`, `name`, `email`, et le `token` JWT généré via `TokenManager`.

---

## 🧩 Services exposés (`ProjectService`)

- `create(dto: CreateProjectDto, creatorId: string)`  
  Crée un projet avec le créateur issu du token.

- `getByCreator(creatorId: string)`  
  Récupère les projets dont l’utilisateur est le créateur.

- `getByContribution(userId: string)`  
  Récupère les projets auxquels l’utilisateur participe.

- `deleteById(projectId: string)`  
  Supprime un projet s’il appartient au user connecté.

- `updateById(projectId: string, updatedDto: Partial<CreateProjectDto>)`  
  Met à jour un projet avec uniquement les champs fournis.
