# MCP Resume

Публичное портфолио с MCP-сервером: AI-клиенты запрашивают резюме, навыки и проекты через [Model Context Protocol](https://modelcontextprotocol.io/).

**Бэклог:** [docs/AFTER_MVP.md](./docs/AFTER_MVP.md)

## Quick start

```bash
pnpm install
pnpm build:all
pnpm api start:dev
```

## Docker Deploy

Для запуска готового образа используется `compose.yaml` в корне проекта.

1. Скопируйте `.env.example` в `.env`
2. Подставьте свой `IMAGE_TAG` и значения registry
3. Выполните:

```bash
docker compose pull
docker compose up -d
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
