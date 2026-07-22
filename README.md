# MCP Resume

Публичное портфолио с MCP-сервером: AI-клиенты запрашивают резюме, навыки и проекты через [Model Context Protocol](https://modelcontextprotocol.io/).

**Бэклог:** [docs/AFTER_MVP.md](./docs/AFTER_MVP.md)

## Quick start

```bash
pnpm install
pnpm build:all
pnpm api start:dev
```

## Monorepo

| Package                     | Scope               |
| --------------------------- | ------------------- |
| `packages/common`           | `@portfolio/common` |
| `packages/portfolio-data`   | `@portfolio/data`   |
| `packages/portfolio-domain` | `@portfolio/domain` |
| `apps/api`                  | NestJS API          |
| `apps/web`                  | React landing       |

Конвенции: [`skills/rules/`](./skills/rules/)
