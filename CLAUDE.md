# AppBuilder

A no-code platform for building apps. This repo is the frontend implementation, built
module-by-module from a single Figma design system.

**Figma file:** https://www.figma.com/design/OAxyp36G0zm7KYpj4Q2mbb/OKR---App-builder
**GitHub repo:** https://github.com/shantharamashetty-sys/app_builder — the sole remote
for this project. `origin` is already configured; every session pushes here.

## Working on this repo — standing contract

**Commit after each meaningful chunk of work, with clear, descriptive messages, and push
to `origin`.** This applies in every future session, regardless of who or what is doing
the work — this is not a one-time setup step. Don't batch unrelated changes into one
commit, and don't leave work uncommitted/unpushed at the end of a session unless the
user explicitly asks you to hold off.

## Stack

- **React 19** + **Vite**, **TypeScript** throughout — no `.js`/`.jsx` files in `src/`
- **Tailwind CSS v4** — CSS-first config via the `@tailwindcss/vite` plugin (no
  `tailwind.config.js`). Design tokens are plain CSS custom properties on `:root` in
  `src/index.css`, bridged into Tailwind's theme via a separate `@theme inline` block
  (which references the `:root` vars instead of redefining them) so bare utilities like
  `bg-primary`/`text-ink` keep working. Keep new tokens in `:root`, not `@theme` — add a
  matching entry in the `@theme inline` block to expose it as a utility.
- **React Router v7** — all routing is centralized in `src/routes/`
- **lucide-react** for icons — Figma icon layer names map 1:1 to lucide component names
  (a layer named `layout-grid` is lucide's `LayoutGrid`)
- **@fontsource/geist-sans** for the Geist typeface used throughout the design

## Architecture — standing contract

**This is not a one-off pattern for Module 01. Every module added to this project, in
any future session, by any contributor, MUST follow this same MVC-style structure, and
its work MUST be committed and pushed to the GitHub repo above.** If you are implementing
a new module and are tempted to fetch data straight from a view, or put business logic in
a presentational component, stop — that breaks the contract below. Follow the reference
implementation (Module 01) instead of inventing a new shape.

The mapping of classic MVC onto React:

| Layer | Folder | Role | May import from |
|---|---|---|---|
| Model | `src/models/` | TS types/interfaces for core data. No logic, no React, no I/O. | nothing project-local |
| Service | `src/services/` | Data access — fetching/creating/updating. Owns mock data today; swapping in a real backend touches only this folder. | `models/` |
| Controller | `src/hooks/` | Custom hooks holding state + business logic, mediating between services and views. | `models/`, `services/` |
| View | `src/views/<module>/` | Top-level screen components, one subfolder per module. Compose `components/`, call `hooks/`. **Never import `services/` directly.** | `models/`, `hooks/`, `components/` |
| Component | `src/components/` | Small, reusable, presentation-only UI. No data-fetching, no business logic, props in/callbacks out. | `models/` (for prop types only) |
| Routes | `src/routes/` | Centralized React Router config. One route entry per module view. | `views/`, `components/layout/` |

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

1. `src/models/Project.ts` — the `Project` type (and `CreateProjectInput`/`UpdateProjectInput`)
2. `src/services/projectService.ts` — `getProjects`/`createProject`/etc., mock data, all async
3. `src/hooks/useProjects.ts` — owns loading/error state, calls the service, exposes data + actions
4. `src/views/dashboard/DashboardView.tsx` + `src/components/ProjectCard.tsx` — the view calls
   `useProjects()` and passes each `Project` to the presentational `ProjectCard`

`src/models/User.ts`, `Widget.ts`, `Page.ts`, and `Workflow.ts` are stub types for
domains that later modules (auth, visual builder, pages manager, workflows) will need —
extend them in place rather than redefining similar shapes elsewhere.

### Adding a new module

1. Add/extend the relevant type(s) in `src/models/`.
2. Add a service file in `src/services/` with mock data and async CRUD functions.
3. Add a hook in `src/hooks/` that owns the state and calls the service.
4. Add `src/views/<module>/<Module>View.tsx` that calls the hook and composes components.
5. Add any new presentational pieces to `src/components/` (or a module subfolder there
   if truly not reusable elsewhere).
6. Register the view's route in `src/routes/index.tsx`, and give it a real `path` in
   `src/components/layout/Sidebar.tsx`'s nav item list once the route exists.

## Module list (22 modules, ~140 screens, one Figma section each)

01. Dashboard & Project Management — **implemented**, see reference above
02. User Authentication & Onboarding
03. Project Creation Wizard
04. AI App Generation
05. Visual App Builder
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
src/
  models/          # Project, User, Widget, Page, Workflow — pure types
  services/        # projectService... — mock data + async CRUD, one file per model
  hooks/           # useProjects... — state + business logic, calls services
  views/
    dashboard/     # DashboardView.tsx — Module 01
    auth/          # (future) Module 02
    builder/       # (future) Module 05
    ...            # one folder per module as it's built
  components/
    layout/        # AppLayout, Navbar, Sidebar — shared chrome, static across modules
    ProjectCard.tsx  # shared, reusable, presentation-only
  routes/
    index.tsx      # centralized React Router config, one entry per module view
  utils/           # presentation-only helpers (e.g. formatRelativeTime) with no I/O
```

## Commands

```
npm run dev       # start dev server
npm run build     # tsc -b && vite build
npm run lint      # oxlint
```
