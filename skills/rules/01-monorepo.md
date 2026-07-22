# Monorepo Architecture

## Layout

```
apps/       — deployable (api, web)
packages/   — reusable (@portfolio/common, @portfolio/data, @portfolio/domain)
```

## Dependency rules

```
apps → packages ✅
packages → packages ✅ (downstream only: common → data → domain)
packages → apps ❌
web → api ❌
```

## Scope

- npm scope: `@portfolio/*`
- Import only via package name: `@portfolio/domain`, never deep paths

## Build order

```
common → data → domain → web → api
```

Root `package.json` — scripts, shared dev tooling (`typescript`, `@types/node`), and **workspace deps** for `@portfolio/*` (apps/packages import via package name; no `workspace:*` in individual app `package.json`).

Package `devDependencies` for build tools are **not** duplicated — pnpm workspace resolves `tsc` from root.

## Stack

- **api:** NestJS + `@modelcontextprotocol/sdk` (custom adapter, no community Nest MCP libs)
- **web:** React + Vite + Vitest
- **domain:** Zod schemas + services (framework-agnostic)
- **common:** shared types & utilities (zero runtime deps)
- **data:** JSON assets + loaders (zero runtime deps)
- **deploy:** single Railway service (api serves `/mcp`, `/health`, static web)
