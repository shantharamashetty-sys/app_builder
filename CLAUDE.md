# AppBuilder

A no-code platform for building apps. This is a hybrid monorepo: a React frontend
(`apps/builder`) built module-by-module from a single Figma design system, and a
NestJS backend (`apps/api`) that will eventually serve it — plus shared TypeScript
packages, database infrastructure, and a home for AI-generated app output.

**Figma file:** https://www.figma.com/design/OAxyp36G0zm7KYpj4Q2mbb/OKR---App-builder
**GitHub repo:** https://github.com/shantharamashetty-sys/app_builder — the sole remote
for this project. `origin` is already configured; every session pushes here.

## Working on this repo — standing contract

**Commit after each meaningful chunk of work, with clear, descriptive messages, and push
to `origin`.** This applies in every future session, regardless of who or what is doing
the work, and regardless of which part of the monorepo (`apps/builder`, `apps/api`,
`packages/*`, `infrastructure/*`) that work touches — this is not a one-time setup step.
Don't batch unrelated changes into one commit, and don't leave work uncommitted/unpushed
at the end of a session unless the user explicitly asks you to hold off.

## Monorepo layout

```
app_builder/
  apps/
    builder/          # React frontend — see "apps/builder (frontend)" below
    api/               # NestJS backend — see "apps/api (backend)" below
  packages/
    shared-types/      # @app-builder/shared-types — plain TS types, no logic
    generated-schema/  # @app-builder/generated-schema — the "App Schema" concept
  infrastructure/
    database/          # schema.sql (canonical reference, not yet live), migrations/, seeds/
  generated/
    projects/           # AI-generated app output — pure pipeline output, see below
    previews/
    exports/
  docker-compose.yml    # postgres service (no api service until apps/api/Dockerfile exists)
  .env.example
  package.json           # npm workspaces root: ["apps/*", "packages/*"]
```

`apps/builder` is the pre-existing frontend — it hasn't changed behaviorally, it just
moved into this subdirectory. `apps/api` is new. Everything below the frontend-specific
sections applies repo-wide; the frontend-specific sections are scoped to `apps/builder`
only.

### App Schema philosophy

AI generation must never emit app code directly from a prompt. It emits an `AppSchema`
(screens, components, workflows, data sources, theme — see
`packages/generated-schema/src/`) as an intermediate, versioned, inspectable artifact;
code and UI are rendered *from* that schema, never generated straight from free text.
Each schema snapshot maps to one row in `app_versions`
(`infrastructure/database/schema.sql`), which is what makes edit → regenerate → rollback
possible later without re-running the whole pipeline from scratch.

### `generated/` is pure output

Everything under `generated/` (`projects/`, `previews/`, `exports/`) is pipeline
output — never hand-edited, safe to delete and regenerate entirely. Its contents are
gitignored (only `.gitkeep` placeholders are tracked).

## packages/ and shared-types

- **`packages/shared-types`** (`@app-builder/shared-types`) — plain TypeScript
  interfaces mirroring the frontend's existing `apps/builder/src/models/*` shapes
  (`User`, `Project`, `Workflow`, `Widget`) plus net-new types with no frontend
  equivalent yet (`Organization`, `ProjectMember`). No logic, no React, no I/O — same
  rules as `apps/builder/src/models/`.
- **`packages/generated-schema`** (`@app-builder/generated-schema`) — the App Schema
  types described above: `AppSchema`, `ScreenSchema`, `ComponentSchema`,
  `WorkflowSchema`, `DataSchema`, `ThemeSchema`. Some of these are deliberately close to
  an existing frontend model (`ComponentSchema` ~ `Widget`, `DataSchema` ~ `DataModel` in
  `AppGeneration.ts`, `ThemeSchema` ~ `ThemeOption` in `ProjectWizard.ts`) — that overlap
  is flagged in comments, not resolved yet.
- **Non-goal, for now:** `apps/builder` does not import from either package. It keeps
  its own `src/models/*` untouched — zero behavior change, zero risk to already-shipped
  modules. Adopting these shared packages in the frontend (and reconciling the
  `Widget`/`ComponentSchema` and `DataModel`/`DataSchema` overlaps) is a deliberate,
  tracked future step, not something to do incidentally while working on something else.

## apps/api (backend)

**Stack:** NestJS + TypeScript, Node runtime. PostgreSQL via TypeORM — entities exist
but the connection is **not wired up yet** (see below).

NestJS's own module/controller/provider layering is the contract here, the same way the
MVC table below is the contract for `apps/builder`. Every domain gets one module under
`apps/api/src/<domain>/`, and every module is honestly labeled as one of three tiers —
**don't add a fourth kind that pretends to be more finished than it is**:

| Tier | Meaning | Current examples |
|---|---|---|
| Real, full slice | A working vertical slice — controller + service + DTOs, backed by an in-memory mock array (same pattern as `apps/builder/src/services/*.ts`) | `health/`, `users/`, `projects/` (CRUD only — see below) |
| Real, trivial utility | Small, genuinely finished, no business-logic ambiguity | `config/` (typed env access), `common/` (global exception filter + logging interceptor) |
| Labeled scaffold | A folder, a module class, and a comment explaining what it will hold — **no invented endpoints** | `auth/`, `ai/` (+ `prompts/`, `generation/{pipeline,generators,validators}/`), `files/` (+ `validators/`, `processors/`, `storage/`), `preview/`, `deployments/` |

When you're the one filling in a scaffold module: replace the tier in the table above,
don't just add an endpoint underneath it and leave the comment lying. When you're
adding a brand new domain: start it as a labeled scaffold unless you have a concrete,
decided requirement to build against — a plausible-sounding endpoint with no real
requirement behind it is exactly what this tier system exists to prevent.

`projects/` also has an unwired `AppVersionEntity` stub (`entities/app-version.entity.ts`)
for the version-management concept — no `/projects/:id/versions` endpoint exists yet,
because versioning semantics (what triggers a new version, diffing, rollback) haven't
been decided. Don't add that endpoint speculatively; decide the semantics first.

**Critical rule: `TypeOrmModule.forRoot(...)` is not imported into `AppModule`.**
Wiring it requires a live Postgres reachable at boot; without it, `npm run start`/
`start:dev` would fail in any environment without that container running. The explicit
next step, whenever real persistence is needed: `docker-compose up postgres`, set a
real `DATABASE_URL` in `.env` (see `.env.example`), then add
`TypeOrmModule.forRoot({ ...config, autoLoadEntities: true })` to `AppModule`'s imports.
Until then, entity classes under `apps/api/src/<domain>/entities/*.entity.ts` exist only
as the documented target shape for `infrastructure/database/schema.sql`.

## apps/builder (frontend) — architecture standing contract

**This is not a one-off pattern for Module 01. Every module added to this project, in
any future session, by any contributor, MUST follow this same MVC-style structure, and
its work MUST be committed and pushed to the GitHub repo above.** If you are implementing
a new module and are tempted to fetch data straight from a view, or put business logic in
a presentational component, stop — that breaks the contract below. Follow the reference
implementation (Module 01) instead of inventing a new shape.

### Stack

- **React 19** + **Vite**, **TypeScript** throughout — no `.js`/`.jsx` files in `src/`
- **Tailwind CSS v4** — CSS-first config via the `@tailwindcss/vite` plugin (no
  `tailwind.config.js`). Design tokens are plain CSS custom properties on `:root` in
  `apps/builder/src/index.css`, bridged into Tailwind's theme via a separate
  `@theme inline` block (which references the `:root` vars instead of redefining them)
  so bare utilities like `bg-primary`/`text-ink` keep working. Keep new tokens in
  `:root`, not `@theme` — add a matching entry in the `@theme inline` block to expose it
  as a utility.
- **React Router v7** — all routing is centralized in `apps/builder/src/routes/`
- **lucide-react** for icons — Figma icon layer names map 1:1 to lucide component names
  (a layer named `layout-grid` is lucide's `LayoutGrid`)
- **@fontsource/geist-sans** for the Geist typeface used throughout the design

The mapping of classic MVC onto React:

| Layer | Folder | Role | May import from |
|---|---|---|---|
| Model | `apps/builder/src/models/` | TS types/interfaces for core data. No logic, no React, no I/O. | nothing project-local |
| Service | `apps/builder/src/services/` | Data access — fetching/creating/updating. Owns mock data today; swapping in a real backend touches only this folder. | `models/` |
| Controller | `apps/builder/src/hooks/` | Custom hooks holding state + business logic, mediating between services and views. | `models/`, `services/` |
| View | `apps/builder/src/views/<module>/` | Top-level screen components, one subfolder per module. Compose `components/`, call `hooks/`. **Never import `services/` directly.** | `models/`, `hooks/`, `components/` |
| Component | `apps/builder/src/components/` | Small, reusable, presentation-only UI. No data-fetching, no business logic, props in/callbacks out. | `models/` (for prop types only) |
| Routes | `apps/builder/src/routes/` | Centralized React Router config. One route entry per module view. | `views/`, `components/layout/` |

Rules that keep the boundary real:

- **Views never call `services/` functions directly.** They always go through a hook in
  `hooks/`. If a view needs new data, add/extend a hook — don't reach past it.
- **Components never fetch data or hold business state.** If a component in
  `src/components/` needs data, it should receive it as props from a view. The one
  exception is layout chrome (`src/components/layout/`), which is static across modules.
  Shared components are shared to save on rewriting UI, so keep them free of
  module-specific logic — they compose the fetched data, they don't fetch it.
- **Models have zero dependencies on React or on `services/`/`hooks/`.** They're plain
  types, safe to import from anywhere without pulling in data-fetching code.
- **Services are the only place that knows about mock vs. real data.** All current
  services return `Promise`s and hold mock arrays in-memory. When a real backend exists,
  only the function bodies in `services/` change (e.g. an in-memory array becomes a
  `fetch(...)` call) — models, hooks, views, and components stay untouched.

### Reference implementation: Module 01

Read these four files together — they're the template every later module copies:

1. `apps/builder/src/models/Project.ts` — the `Project` type (and `CreateProjectInput`/`UpdateProjectInput`)
2. `apps/builder/src/services/projectService.ts` — `getProjects`/`createProject`/etc., mock data, all async
3. `apps/builder/src/hooks/useProjects.ts` — owns loading/error state, calls the service, exposes data + actions
4. `apps/builder/src/views/dashboard/DashboardView.tsx` + `apps/builder/src/components/ProjectCard.tsx` — the view calls
   `useProjects()` and passes each `Project` to the presentational `ProjectCard`

`apps/builder/src/models/User.ts`, `Widget.ts`, `Page.ts`, and `Workflow.ts` are stub
types for domains that later modules (auth, visual builder, pages manager, workflows)
will need — extend them in place rather than redefining similar shapes elsewhere.

### Adding a new module

1. Add/extend the relevant type(s) in `apps/builder/src/models/`.
2. Add a service file in `apps/builder/src/services/` with mock data and async CRUD functions.
3. Add a hook in `apps/builder/src/hooks/` that owns the state and calls the service.
4. Add `apps/builder/src/views/<module>/<Module>View.tsx` that calls the hook and composes components.
5. Add any new presentational pieces to `apps/builder/src/components/` (or a module
   subfolder there if truly not reusable elsewhere).
6. Register the view's route in `apps/builder/src/routes/index.tsx`, and give it a real
   `path` in `apps/builder/src/components/layout/Sidebar.tsx`'s nav item list once the
   route exists.

## Module list (22 modules, ~140 screens, one Figma section each)

This list is scoped to `apps/builder` — it's the frontend's Figma-driven module
roadmap, not the backend's.

01. Dashboard & Project Management — **implemented**, see reference above
02. User Authentication & Onboarding — **implemented**
03. Project Creation Wizard — **implemented**
04. AI App Generation — **implemented**
05. Visual App Builder — **implemented**
06. Pages Manager
07. Canvas & Widget Components
08. Design System & Tokens
09. Data Studio
10. API Integration
11. Events & Logic
12. Workflows & Automation
13. Authentication & Roles
14. AI Features
15. Asset Manager
16. State Management
17. Preview & Testing
18. Collaboration
19. Publish & Deploy
20. Settings & Admin
21. Command Palette
22. System States

Each module is a Figma **section** node; screens inside it are top-level **frames**
(Module 01's main frame is `dashboard`, node id `4:6`). The file is too large to pull in
one call — use `get_metadata` to find a module's section/frame ids, then
`get_design_context` on the specific frame you're implementing.

### Design tokens (from Module 01, hold across the whole system)

| Token | Value | Usage |
|---|---|---|
| `--color-canvas` | `#f7f7fa` | page background |
| `--color-surface` | `#ffffff` | cards, navbar, sidebar |
| `--color-border` | `#ececf1` | hairline borders |
| `--color-ink` | `#1a1a2e` | primary text |
| `--color-muted` | `#6b7280` | secondary text |
| `--color-primary` | `#5b4be0` | brand purple — CTAs, active nav state |
| `--color-primary-tint` | `#f1effe` | active/highlight backgrounds |
| `--color-success` | `#1f9d57` | positive deltas, status |
| `--color-success-tint` | `#eaf7f0` | success card backgrounds |

Corner radii: `12px` (buttons/inputs/icons), `20px` (cards). Font: Geist, weights
400/500/600/700/800.

## Structure

```
apps/builder/
  src/
    models/          # Project, User, Widget, Page, Workflow — pure types
    services/        # projectService... — mock data + async CRUD, one file per model
    hooks/           # useProjects... — state + business logic, calls services
    views/
      dashboard/     # DashboardView.tsx — Module 01
      auth/          # Module 02
      project-wizard/ # Module 03
      ai-generation/  # Module 04
      builder/        # Module 05
      ...            # one folder per module as it's built
    components/
      layout/        # AppLayout, Navbar, Sidebar — shared chrome, static across modules
      ProjectCard.tsx  # shared, reusable, presentation-only
    routes/
      index.tsx      # centralized React Router config, one entry per module view
    utils/           # presentation-only helpers (e.g. formatRelativeTime) with no I/O

apps/api/
  src/
    <domain>/
      <domain>.module.ts
      <domain>.controller.ts   # real/full-slice modules only
      <domain>.service.ts      # real/full-slice modules only
      dto/
      entities/                 # TypeORM entity stubs, not yet connected

packages/
  shared-types/src/
  generated-schema/src/

infrastructure/database/
  schema.sql
  migrations/
  seeds/
```

## Commands

Frontend (`apps/builder`) — run from the repo root via workspace scripts, or `cd
apps/builder` and drop the `:builder` suffix:
```
npm run dev:builder     # start dev server
npm run build:builder   # tsc -b && vite build
npm run lint:builder    # oxlint
```

Backend (`apps/api`):
```
npm run dev:api         # nest start --watch
npm run build:api       # nest build
```
