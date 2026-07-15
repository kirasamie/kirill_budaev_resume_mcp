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
└── index.ts               # public API feature (см. ниже)
```

Классы остаются с префиксом: `HealthService`, `HealthController`, `HealthModule`.

- `kebab-case` папки, `PascalCase` классы.
- Между features — `@Module({ imports })`, не deep import чужих `service.ts`.
- **`index.ts`** — всё, что нужно **другим потребителям** feature: Module + exported providers (если sibling inject'ит). Internal — не экспортировать.
- **`lib/`** — чистые функции feature: `lib/content.ts`, `lib/register.ts`, `lib/index.ts` (public API lib). Service импортирует из `./lib`, не deep import.
- **`module.ts` → `exports`** — только providers, которые реально отдаём наружу через DI.

Примеры:

```typescript
// health/index.ts — HealthService никто снаружи не inject'ит
export { HealthModule } from './module';

// portfolio/index.ts — ToolsService inject'ит PortfolioService
export { PortfolioModule } from './module';
export { PortfolioService } from './service';
```

`AppModule` импортирует **только Modules**, не Services:

```typescript
imports: [HealthModule, ToolsModule]; // ✅
imports: [PortfolioService]; // ❌
```

## Module graph

```
AppModule
├── HealthModule          GET /health
└── McpModule             POST /mcp → McpService → ToolsModule
      └── ToolsModule     ToolsService → PortfolioModule → @portfolio/domain
```

`AppModule` подключает features через `imports`:

```typescript
import { Module } from '@nestjs/common';

import { HealthModule } from './health';
import { McpModule } from './mcp';

@Module({
  imports: [HealthModule, McpModule],
})
export class AppModule {}
```

## `mcp/` feature

```
mcp/
├── constants.ts
├── lib/
│   ├── content.ts
│   ├── register.ts
│   └── index.ts
├── service.ts
├── controller.ts
├── module.ts
└── index.ts
```

Import lib — через `./lib` (index). Внутри lib sibling import (`register` → `./content`) — ok.

## Package imports

`@portfolio/*` — в **корневом** `package.json` (`workspace:*`). В `apps/api/package.json` workspace deps не добавляем: резолв через root `node_modules`. Пакеты публикуют `dist/` — `build:api` запускает полный `pnpm build`.
