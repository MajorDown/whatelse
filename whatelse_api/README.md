# 📦 WhatElse API – Modules

Ce backend gère les projets collaboratifs et l'authentification des utilisateurs via JWT.  
Les routes sont protégées par un `AuthGuard` personnalisé basé sur un token + email.

---

## 🔐 Authentification

la quasi-totalité des routes nécessitent les **headers suivants** :
Authorization: Bearer <JWT>
x-user-email: <email>

Le `AuthGuard` vérifie :

- que le token est valide (via `TokenManager`)
- que l’email dans le token correspond à celui du header

Le `RoleGuard` est un **guard paramétrable** qui contrôle l'accès en fonction du rôle de l'utilisateur **sur un projet donné**.

### Utilisation dans les contrôleurs :

```ts
@UseGuards(AuthGuard, RoleGuard(['creator'])) // accès réservé au créateur du projet
@UseGuards(AuthGuard, RoleGuard(['creator', 'contributor'])) // accès élargi aux contributeurs

---

# 📦 WhatElse API – Modules

Ce backend gère les projets collaboratifs et l'authentification des utilisateurs via JWT.
Les routes sont protégées par des guards personnalisés (`AuthGuard`, `RoleGuard`).

---

## 🔐 Authentification

La quasi-totalité des routes nécessitent les **headers suivants** :

```

Authorization: Bearer <JWT>
x-user-email: <email>

````

Le `AuthGuard` vérifie :

- que le token est valide (via `TokenManager`)
- que l’email dans le token correspond à celui du header
- ajoute automatiquement `request.user` dans les handlers suivants

---

## 🛡️ Gestion des rôles – `RoleGuard`

Le `RoleGuard` est un **guard paramétrable** qui contrôle l'accès en fonction du rôle de l'utilisateur **sur un projet donné**.

### Utilisation dans les contrôleurs :

```ts
@UseGuards(AuthGuard, RoleGuard(['creator'])) // accès réservé au créateur du projet
@UseGuards(AuthGuard, RoleGuard(['creator', 'contributor'])) // accès élargi aux contributeurs
````

Le `projectId` est détecté automatiquement via :

- `req.body.projectId`
- `req.params.projectId`
- ou en remontant depuis `taskId` dans les routes liées aux tâches

---

## 👤 Module `User`

| Verbe | Route          | Description                                                           |
| ----- | -------------- | --------------------------------------------------------------------- |
| POST  | `/user/signup` | Crée un nouvel utilisateur. Nécessite `name`, `email`, et `password`. |
| POST  | `/user/login`  | Authentifie un utilisateur et retourne un token JWT.                  |

---

## 📘 Module `Project`

> Toutes les routes du module sont protégées par : `@UseGuards(AuthGuard, RoleGuard(['creator']))`

| Verbe  | Route                      | Description                                                                  |
| ------ | -------------------------- | ---------------------------------------------------------------------------- |
| POST   | `/project`                 | Crée un projet. Le `creatorId` est extrait du token.                         |
| GET    | `/project/byCreator`       | Liste les projets créés par l'utilisateur connecté.                          |
| GET    | `/project/byContributions` | Liste les projets auxquels l'utilisateur est contributeur.                   |
| DELETE | `/project/:id`             | Supprime un projet (seulement si l'utilisateur est le créateur).             |
| PATCH  | `/project/:id`             | Met à jour un projet (titre, description, statusList…). Réservé au créateur. |

---

## ✅ Module `Task`

> Toutes les routes sont protégées par : `@UseGuards(AuthGuard, RoleGuard(['creator', 'contributor']))`

| Verbe  | Route                         | Description                                                                   |
| ------ | ----------------------------- | ----------------------------------------------------------------------------- |
| POST   | `/task`                       | Crée une tâche dans un projet donné.                                          |
| GET    | `/task/by-project/:projectId` | Récupère toutes les tâches associées à un projet.                             |
| PATCH  | `/task/update-content/:id`    | Modifie le titre et/ou la description d’une tâche.                            |
| PATCH  | `/task/update-status/:id`     | Met à jour le statut d’une tâche (`pending`, `done`, etc.).                   |
| DELETE | `/task/:id`                   | Supprime une tâche, si le user est créateur ou contributeur du projet parent. |

---

## 🧩 Services exposés (`UserService`)

- `create(dto: CreateUserDto)`  
  → Crée un utilisateur, hash le mot de passe et retourne `id` + token.

- `login(dto: LoginUserDto)`  
  → Authentifie un utilisateur, retourne l’objet `ConnectedUser` + token.

---

## 🧩 Services exposés (`ProjectService`)

- `create(dto: CreateProjectDto, creatorId: string)`
- `getByCreator(creatorId: string)`
- `getByContribution(userId: string)`
- `deleteById(projectId: string)`
- `updateById(projectId: string, updatedDto: Partial<CreateProjectDto>)`

---

## 🧩 Services exposés (`TaskService`)

- `create(data: CreateTaskInput)`
- `getByProject(projectId: string)`
- `updateContent(taskId: string, data)`
- `updateStatus(taskId: string, newStatus)`
- `delete(taskId: string)`

---
