# MCP Resume

Публичное портфолио с MCP-сервером: AI-клиенты запрашивают резюме, навыки и проекты через [Model Context Protocol](https://modelcontextprotocol.io/).

**MVP-документация:** [docs/MVP.md](./docs/MVP.md) — scope, архитектура, MCP tools, задачи.  
**После MVP:** [docs/AFTER_MVP.md](./docs/AFTER_MVP.md) — resume page, i18n, CI/CD, hooks, хостинг и бэклог.

## Quick start

```bash
pnpm install
pnpm build
pnpm --filter api start:dev   # после реализации MCP
```

## Monorepo

| Package                     | Scope               |
| --------------------------- | ------------------- |
| `packages/common`           | `@portfolio/common` |
| `packages/portfolio-data`   | `@portfolio/data`   |
| `packages/portfolio-domain` | `@portfolio/domain` |
| `apps/api`                  | NestJS API          |
| `apps/web`                  | React landing (WIP) |

Конвенции: [`skills/rules/`](./skills/rules/)
