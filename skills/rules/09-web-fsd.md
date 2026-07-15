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
app  →  pages  →  widgets  →  features  →  shared
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
  types.ts      # props interfaces (if needed)
  view.tsx      # main React component (PascalCase export)
  index.ts      # public API
```

### Feature with model segment

```
features/copy-mcp-config/
  model/
    copy-to-clipboard.ts
    index.ts              # public API of model
  types.ts
  view.tsx
  index.ts
```

### Secondary UI (`ui/`) — only when needed

Create `ui/<kebab-name>/` **only** when the slice has **secondary** components besides the main `view.tsx`. Single-component slices (hero, contact) — no `ui/` folder.

```
features/some-feature/
  ui/
    some-sub-button/
      types.ts
      view.tsx
      index.ts
    index.ts              # public API of ui segment
  view.tsx                # main component of slice
  index.ts
```

- **Folders/files:** `kebab-case`
- **React exports:** `PascalCase` (`CopyMcpConfigButton`, `Hero`)

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
- Prefer local variables over inline transforms in JSX (`telegramHandle`, not `.replace()` in markup)

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

## No `entities/` for MVP

Domain types come from `@portfolio/domain/schemas`. Add `entities/` when slice needs entity-specific UI state/hooks.

## Vite aliases

`@app`, `@pages`, `@widgets`, `@features`, `@shared`, `@portfolio/domain/schemas`, `@portfolio-data/assets`.

## Tailwind

v4 via `@tailwindcss/vite`. Global styles: `app/styles/index.css`.
