# Web — FSD (`apps/web`)

React + Vite landing. Feature-Sliced Design with monorepo boundaries.

## Dependencies

```
apps/web ──► @portfolio/domain/schemas (types + Zod only, no Node/fs)
apps/web ──✗ apps/api
```

Data: Vite imports JSON/MD from `packages/portfolio-data/src/assets`, validates via `PortfolioSchema`.

## Layers & imports

```
app  →  pages  →  widgets  →  features  →  entities  →  shared
```

- Import **only** through slice `index.ts` (public API) — `@shared/ui`, not `@shared/ui/container`
- Import **only named symbols you use**
- `index.ts` exports symbols **consumed by siblings**; props/types — not exported unless sibling needs them

## `app/` exception

`app/App.tsx` stays named **App.tsx** (not `view.tsx`) — layout shell entry.

## Slice layout

### Main component (single UI of slice)

```
widgets/hero/
  types.ts      # all interfaces/types for this segment
  view.tsx      # main React component (PascalCase export)
  index.ts      # public API
```

### Feature with model segment (single helper module)

```
features/copy-mcp-config/
  model/
    copy-to-clipboard.ts
    index.ts
  types.ts
  view.tsx
  index.ts
```

When a slice needs **several** pure helpers, use `lib/` (FSD) instead of growing `model/`:

```
widgets/career-sections/
  lib/
    format-*.ts
    to-link-items.ts
    types.ts
    index.ts              # public API of lib
  ui/…
  types.ts
  view.tsx
  index.ts
```

### Secondary UI (`ui/`) — only when needed

Create `ui/<kebab-name>/` **only** when the slice has **secondary** components besides the main `view.tsx`. Single-component slices (hero, contact) — no `ui/` folder.

```
widgets/career-sections/
  ui/
    experience-section/
    experience-card/
    …
  view.tsx
  index.ts
```

- **Folders/files:** `kebab-case`
- **React exports:** `PascalCase`
- **Types:** only in that segment’s `types.ts` (lib-only types → `lib/types.ts`)
- **Props:** prefer `Pick` / `Omit` / `PropsWithChildren`; pass only fields the UI uses
- **Lists:** section maps to **card** components; no transforms buried in `.map()` bodies
- **Simple string ops** (`mailto:`, template join): compute in the component **before** `return`, not in JSX and not in `lib/`
- **Non-trivial / reusable** (`replace` with shared prefixes, grouping): `lib` or `@shared/lib`; regex literals → shared constants

## `shared/`

```
shared/
  types/          ClassNameProps + index.ts
  ui/             index.ts (public API) + container/, section/, …
  lib/            index.ts (public API) + cn.ts, portfolio.ts, …
  config/         env.ts + index.ts
```

### className

- `cn()` (`tailwind-merge`) from `@shared/lib` — **only** when merging with `className` prop
- Static classes — plain string, no `cn()`
- Pattern: `cn(className, 'base tailwind classes')`

### JSX

- Conditional render: `condition && <El />`, not `condition ? <El /> : null`
- Event handlers: `onClick={handleCopy}` — no `() => void fn()` wrappers
- Prefer `lib` formatters / small cards over transforms buried in list `.map()` bodies

```typescript
import type { PropsWithChildren } from 'react';
import type { ClassNameProps } from '@shared/types';

export interface ContainerProps extends PropsWithChildren<ClassNameProps> {}
```

### Props types

- **`interface`** — object shapes (props)
- **`type`** — only unions, indexed access, `typeof`, utility derivations

## Return types (web + whole repo)

Do **not** annotate when TypeScript infers a **simple** type:

- `: void`, `: Promise<void>`
- `: string`, `: number`, `: boolean`, `: undefined`

Keep explicit return types for **named domain/complex** types (`Portfolio`, `McpServer`, unions, generics).

## `entities/`

Use for domain entity API hooks (e.g. `useQueryResume`) and entity-scoped logic. Pages own the query call; widgets stay presentational.

## Vite aliases

`@app`, `@pages`, `@widgets`, `@features`, `@entities`, `@shared`.

## Tailwind

v4 via `@tailwindcss/vite`. Global styles: `app/styles/index.css`.
