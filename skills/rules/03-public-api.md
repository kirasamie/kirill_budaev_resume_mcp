# Package Public API

## Rule

Each package and feature folder exposes **one door** — `index.ts`.

Import **only the symbols you need** — named imports from the segment **public API** (`index.ts`).

```typescript
// ✅
import { loadPortfolio, ProfileSchema } from '@portfolio/domain';
import { Container } from '@shared/ui';
import { cn } from '@shared/lib';

// ❌ deep path — bypasses public API
import { loadPortfolioRaw } from '@portfolio/data/load-portfolio/model';
import { Container } from '@shared/ui/container/view';
```

## Minimal surface

**Export (`index.ts`):** every symbol that **other slices import** must be exported. Unused symbols — not exported (props, internal types stay inside the slice).

**Import:** only through the segment public API; named import for what you use:

```typescript
// ✅
import { Container, Section } from '@shared/ui';
import { getPortfolio } from '@shared/lib';

// ❌
import { Container } from '@shared/ui/container'; // deep path
export type { HeroProps } from './types'; // not used outside slice
```

Segment `index.ts` re-exports **only consumed symbols** — not the whole subtree «на всякий случай».

## Feature folder pattern (model / types / index)

```
feature/
  model.ts      — logic, export const functions
  types.ts      — interfaces & derived types
  index.ts      — view: public API re-exports
```

Import from sibling features only via their `index.ts`:

```typescript
import { readResumeMarkdown } from '../read-resume';
import { profile } from '../assets';
```

## `@portfolio/common`

```
enum/             types.ts (EnumValue), model.ts (enumValues), index.ts
text/             model.ts (containsNormalized), index.ts — normalizeText internal
pipe/             model.ts (pipe), types.ts, index.ts
index.ts          package root — EnumValue, enumValues, text helpers, pipe
```

Zero runtime deps. Import via `@portfolio/common` only.

## `@portfolio/data`

```
assets/           model.ts, types.ts, constants.ts, index.ts + JSON/MD
read-resume/      model.ts, index.ts
load-portfolio/   model.ts, types.ts, index.ts
index.ts          package root — only what consumers need
```

Package root exports only external surface (e.g. `loadPortfolioRaw`), not every internal asset.

## `@portfolio/domain`

```
schemas/          *.schema.ts (internal), model.ts, types.ts, index.ts
load-portfolio/   model.ts, types.ts, index.ts
search-skills/    model.ts, index.ts
list-projects/    model.ts, index.ts
index.ts          package root — loadPortfolio, searchSkills, listProjects, …
```

## package.json (workspace libs)

For private monorepo packages, `main` + `types` is enough:

```json
{
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts"
}
```

Use `exports` when publishing publicly or need conditional imports.

## `apps/api` (Nest)

Feature = `module.ts` + `service.ts` + `controller.ts` (если HTTP) + `index.ts`.

**`index.ts`** — public API feature для других потребителей: **Module** + **exported providers** (если sibling inject'ит). Пример: `portfolio/index.ts` → `PortfolioModule` + `PortfolioService`; `health/index.ts` → только `HealthModule`.

**`AppModule`** — только `imports: [XxxModule]`, не Services.

Cross-feature — `@Module({ imports, exports })`, import классов через feature `index.ts`, не deep import `service.ts`.

Подробнее: [08-backend-api.md](./08-backend-api.md).
