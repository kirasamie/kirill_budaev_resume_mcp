# Testing Conventions

## Runners

| Layer        | Runner | Config                        |
| ------------ | ------ | ----------------------------- |
| `packages/*` | Jest   | `jest.config.cjs` → `...base` |
| `apps/api`   | Jest   | inline in `package.json`      |
| `apps/web`   | Vitest | when app exists               |

Shared preset: `jest.config.base.cjs` at repo root.

## File naming

- `*.spec.ts` next to the module under test
- Excluded from `tsc` build via `exclude: ["src/**/*.spec.ts"]`

## Jest globals (explicit imports)

Do **not** rely on ambient Jest types (`types: ["jest"]` in `tsconfig.spec.json`).

Import from `@jest/globals` in every `*.spec.ts`:

```typescript
import { afterEach, describe, expect, it, jest } from '@jest/globals';
```

Import only what the file uses (`describe`, `it`, `expect` — minimum).

`tsconfig.spec.json` per package: `"types": ["node", "@jest/globals"]` — no ambient global `describe` / `it` / `expect`.

## Test descriptions

- **Language:** Russian only in `it(...)` strings
- **Format:** **«Если …, то …»**
- **`describe`:** function or module name (English is ok)

```typescript
describe('readResumeMarkdown', () => {
  it('Если файл резюме существует и содержит текст, то возвращает непустую строку', () => {
    // ...
  });
});
```

## Case coverage

Each `describe` block covers three groups where applicable:

| Group        | Meaning                                    |
| ------------ | ------------------------------------------ |
| **positive** | Happy path — valid input, expected result  |
| **neutral**  | Edge but valid — empty string, single item |
| **negative** | Error / invalid — throws, missing data     |

Not every module needs all three (e.g. pure type helpers). Prefer real behavior over artificial cases.

## Mocking

- Use `jest.spyOn` / `jest.restoreAllMocks()` in `afterEach`
- Prefer spies over full module mocks when integration path matters
