# IBuiltThis

A community-driven showcase where makers submit products they've built and the community votes on what's worth noticing. Submit your build, get discovered.

![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/Neon_PostgreSQL-00E699?style=flat-square&logo=postgresql&logoColor=black)
![Drizzle](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=flat-square&logoColor=black)

## Features

- Submit products you've built — name, description, URL, and organization
- Upvote / downvote with optimistic UI updates and per-user vote tracking
- Server-side caching with Next.js cache and path revalidation
- Suspense boundaries for improved streaming performance
- Product validation and detailed form error handling
- Drizzle ORM migrations with Neon serverless PostgreSQL

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, Server Actions) |
| Database | Neon PostgreSQL (serverless) |
| ORM | Drizzle ORM |
| UI | Tailwind CSS + shadcn/ui |
| Language | TypeScript |

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/dndmein-rgb/IBuiltThis
cd IBuiltThis
npm install
```

### 2. Configure environment

```bash
# .env.local
DATABASE_URL=your_neon_connection_string
```

### 3. Run migrations and start

```bash
npx drizzle-kit push
npm run dev
```

## Project Structure
app/          # Next.js App Router pages
components/   # React UI components
db/           # Drizzle schema + vote tracking
drizzle/      # Migration files
lib/          # Cache helpers, utilities
types/        # Shared TypeScript types
public/       # Static assets

## How It Works

1. Makers submit something they built (name, URL, description, organization)
2. It appears on the community feed
3. Visitors upvote or downvote
4. Vote state is tracked per user — one vote per product
5. Scores update instantly via optimistic UI, confirmed by the server

## Architecture Notes

- **Server Actions** — mutations (votes, submissions) run server-side, keeping logic off the client
- **Cache + revalidation** — product lists are cached and surgically revalidated on each write
- **Drizzle ORM** — fully type-safe queries with schema-first design; migrations in version control
- **Neon serverless** — Postgres on a serverless connection layer, edge-friendly
