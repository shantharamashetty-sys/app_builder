# AppBuilder

A hybrid monorepo: a React + Vite frontend (`apps/builder`) and a NestJS backend
(`apps/api`), plus shared TypeScript packages, database infrastructure, and a home for
AI-generated app output. See `CLAUDE.md` for the full architecture, module contract,
and standing conventions.

```
apps/builder/   React 19 + Vite + TypeScript frontend
apps/api/       NestJS backend
packages/       shared TypeScript types and the App Schema
infrastructure/ database schema (not yet wired to a live connection)
generated/      pipeline output — projects, previews, exports
```

## Commands

```
npm install          # installs all workspaces from the repo root

npm run dev:builder   # start the frontend dev server
npm run build:builder # type-check + build the frontend
npm run lint:builder  # lint the frontend

npm run dev:api       # start the backend in watch mode
npm run build:api     # build the backend
```

`docker-compose up postgres` starts a local Postgres instance for future use — nothing
in `apps/api` connects to it yet (see `CLAUDE.md`'s "apps/api backend contract").
