# TypeScript Conventions

## Imports

No `.js` extensions in TypeScript imports:

```typescript
// ✅
import { ProfileSchema } from './profile.schema';

// ❌
import { ProfileSchema } from './profile.schema.js';
```

### Type-only imports

Type imports must use `import type` or inline `type` — never a value import for types only.

```typescript
// ✅ only types
import type { Portfolio } from './types';

// ✅ mixed: value + type
import { enumValues, type EnumValue } from '@portfolio/common';

// ✅ re-export
export { loadPortfolio, type Portfolio } from './load-portfolio';

// ❌ Portfolio is a type — do not import as value
import { Portfolio } from './types';
```

ESLint: `@typescript-eslint/consistent-type-imports` (`prefer: 'type-imports'`).

When both forms are valid, prefer **`import type`** for a separate type-only line; use **inline `type`** when importing values and types from the same module.

## Functions

Use `export const`, not `export function`:

```typescript
export const loadPortfolioRaw = (): PortfolioRaw => ({ ... });
```

### Return types

Skip explicit return type when inference yields a **simple** type:

```typescript
// ✅ inferred
export const getMcpUrl = () => import.meta.env.VITE_MCP_URL ?? `${window.location.origin}/mcp`;
export const copyToClipboard = async (text: string) => { await navigator.clipboard.writeText(text); };

// ❌ redundant simple annotation
export const getMcpUrl = (): string => ...;
export const copyToClipboard = async (text: string): Promise<void> => ...;
```

Keep return types for **named domain/complex** types (`Portfolio`, `McpServer`), unions, generics, non-obvious contracts.

## Types vs interfaces

- **`interface`** — object shapes (priority)
- **`type`** — only for constrained derivations: `(typeof json)[number]`, unions, `typeof`, mapped types

```typescript
// ✅ interface for object shape
export interface PortfolioAssetsRaw {
  profile: ProfileRaw;
  contact: ContactRaw;
}

// ✅ type for indexed access
export type SkillRaw = (typeof skillsJson)[number];
```

## Generic type parameters

Name generics by role, not single letters without context:

```typescript
// ✅
export type EnumValue<TObject extends Record<string, string>> =
  TObject[keyof TObject];

// ❌
export type EnumValue<T extends Record<string, string>> = T[keyof T];
```

Common names: `TObject`, `TInput`, `TResult`, `TArgs` (tuple of function args).

## Feature folder layout

Each feature folder uses **model / types / index** (`index` = public API view):

```
load-portfolio/
  model.ts      # export const handlers
  types.ts      # interfaces & derived types
  index.ts      # public API — only entry from outside
```

Never import `model.ts` or `types.ts` from outside the folder — only `index.ts`.

## Nest modules

- Public API = `@Module({ exports })`
- Feature folder: `module.ts`, `service.ts`, `controller.ts` (no feature prefix in filenames)
- Full backend conventions: `08-backend-api.md`

## File naming

- Folders: `kebab-case`
- Files: `model.ts`, `types.ts`, `constants.ts`, `index.ts`
- Types/classes: `PascalCase`

## TypeScript configs

```
tsconfig.base.json     — shared strict flags (root)
tsconfig.package.json  — @portfolio/* libs: target, module, declarations
packages/*/tsconfig.spec.json — *.spec.ts: node + jest types
jest.config.base.cjs   — shared Jest preset for packages
```

Each package extends `tsconfig.package.json` and sets path-specific options
(`outDir`, `rootDir`, `include`). Spec files: `tsconfig.spec.json` per package.

Apps extend `tsconfig.base.json` directly.

Jest in packages:

```javascript
const base = require('../../jest.config.base.cjs');

module.exports = {
  ...base,
  // setupFilesAfterEnv: ['...'], — override when needed
};
```

## Constants

Prefer **const objects** over arrays or TS `enum`. Shared helpers live in `@portfolio/common`:

```typescript
import { enumValues, type EnumValue } from '@portfolio/common';

export const SkillCategory = {
  Frontend: 'frontend',
  Backend: 'backend',
} as const;

export type SkillCategory = EnumValue<typeof SkillCategory>;
```

Use in Zod: `z.enum(enumValues(SkillCategory))`.  
Use in code: `SkillCategory.Frontend` instead of magic strings.

Simple literals (file names, encodings) stay as scalar `as const`:

```typescript
export const RESUME_FILE_NAME = 'resume.md' as const;
```
