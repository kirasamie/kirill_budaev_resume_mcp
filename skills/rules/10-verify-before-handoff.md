# Verify Before Handoff

Before treating a change as done or sending it for review:

1. **Typecheck** touched apps/packages (`pnpm --filter web exec tsc -b`, package builds when needed).
2. **Runtime smoke**: if web/API changed, confirm the affected route boots (no white screen, no missing ESM/CJS exports in the Vite console).
3. **Workspace packages**: after changing `@portfolio/*` public API, rebuild (`pnpm build:common` / `build:data` / `build:domain`) so `dist` matches source — Vite consumes linked package `dist`.
4. Do not hand off known broken boot or breaking public API without a fix.

Mirrored in `.cursor/rules/verify-before-handoff.mdc` (`alwaysApply: true`).
