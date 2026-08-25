# Blog Application

A full-stack blog: Next.js 14 (App Router, TypeScript) frontend, Node.js/Express + Prisma backend, PostgreSQL database.

```
Blog-Application/
├── frontend/   # Next.js app (UI)
└── backend/    # Express API + Prisma + PostgreSQL
```

## Cloning the Repository

```bash
git clone https://github.com/mostafaelsayed2002/Blog-Application.git
```

## Backend setup

The backend needs a PostgreSQL database. Point `DATABASE_URL` at any reachable Postgres instance (local install, your own Docker container, a hosted DB, etc).

```bash
cd backend
npm install
cp .env.example .env   # then edit DATABASE_URL if needed
npx prisma migrate dev # creates the tables
npx prisma db seed     # optional: seeds a sample post
npm run dev            # starts the API on http://localhost:4000
```

Run the test suite (no database required — Prisma is mocked):

```bash
npm test
```

### API

| Method | Path | Purpose |
|---|---|---|
| GET | `/api/posts` | list posts |
| GET | `/api/posts/:id` | single post |
| POST | `/api/posts` | create post `{ title, body, tags? }` |
| PATCH | `/api/posts/:id/reaction` | `{ type: "like"\|"dislike", delta: 1\|-1 }` |
| POST | `/api/posts/:id/view` | increment view count |
| GET | `/api/posts/:id/comments` | list comments |
| POST | `/api/posts/:id/comments` | create comment `{ body, authorName? }` |
| PATCH | `/api/comments/:id/like` | `{ delta: 1\|-1 }` |

## Frontend setup

```bash
cd frontend
npm install
cp .env.local.example .env.local  # NEXT_PUBLIC_API_URL, defaults to http://localhost:4000/api
npm run dev                       # starts the app on http://localhost:3000
```

Open [http://localhost:3000](http://localhost:3000) — it redirects to `/Home`.

## Notes

- Auth is intentionally out of scope: posts and comments are anonymous/free-text (`authorName`), matching the app's original design.
- Docker, deployment, and CI/CD are left for you to wire up.

## Images

### Home Page
![Image Description](https://i.imgur.com/lNyYeVE.png)

### Post Page
![Image Description](https://i.imgur.com/LKCotZ8.png)

### Create Post Page
![Image Description](https://i.imgur.com/fLbuFvZ.png)

### Responsive Design
![Image Description](https://i.imgur.com/37pcsCi.png)
![Image Description](https://i.imgur.com/8CpXsRr.png)

## Demo Video

[Youtube](https://www.youtube.com/watch?v=jygr0cXFmJY)
