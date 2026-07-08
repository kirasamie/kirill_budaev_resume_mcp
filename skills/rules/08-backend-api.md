# Backend API (`apps/api`)

NestJS: HTTP boundary (`/health`, `/mcp`). Бизнес-логика — в `@portfolio/domain`.

Package public API — [03-public-api.md](./03-public-api.md). MCP tools и layering — [04-mcp-stack.md](./04-mcp-stack.md).

## Layout

```
apps/api/src/
├── main.ts
├── app.module.ts
├── health/
├── portfolio/
├── tools/
├── mcp/
└── shared/              # опционально
```

## Слои

```
Controller  →  Service (@Injectable)  →  @portfolio/domain  →  @portfolio/data
```

- Service и controllers — **тонкие**: wiring и DI, без бизнес-логики.
- Между `apps/api` и `apps/web` — только `@portfolio/*`, не cross-import apps.

## Feature folder

Имя папки = контекст. Файлы **без префикса** feature:

```
health/
├── module.ts
├── service.ts
├── controller.ts          # если HTTP
├── types.ts               # опционально
└── index.ts               # export { HealthModule } only
```

Классы остаются с префиксом: `HealthService`, `HealthController`, `HealthModule`.

- `kebab-case` папки, `PascalCase` классы.
- Между features — `@Module({ imports })`, не deep import чужих `service.ts`.
- `index.ts` экспортирует только Module; `exports` в module — только нужные providers.

## Module graph

```
AppModule
├── HealthModule          Controller → Service
├── McpModule             Controller → McpService → ToolsModule
└── ToolsModule           *ToolsService → PortfolioModule → @portfolio/domain
```
