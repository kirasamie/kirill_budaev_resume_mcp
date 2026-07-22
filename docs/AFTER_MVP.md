# MCP Resume — After MVP

Идеи и эпики **после** успешного ship MVP (живой `/mcp`, landing, один процесс api+static).  
Не блокируют первый прод-релиз.

Связано: [MVP.md](./MVP.md).

---

## Принципы

1. Сначала стабильный прод и фидбек с визитки / MCP.
2. Web не тащит полный private portfolio без явного public DTO.
3. Новые MCP tools — только если дают демо-ценность портфолио, не «фичи ради фич».

---

## P1 — Product surface

| ID | Фича | Зачем | Заметки |
|----|------|--------|---------|
| W1 | **Страница резюме** (`/resume` или якорь) | Людям без агентов — одностраничный просмотр опыта/проектов/навыков | Отдельный public DTO (не весь `contact`/phone); печать / PDF optional |
| W2 | **i18n (ru / en)** | Визитка для международного найма | Сначала решить: только UI chrome или ещё и контент резюме; иначе mixed language |
| W3 | Ссылка «полное резюме» / download MD | Мост landing → `profile://resume` без MCP | Может быть частью W1 |
| W4 | Clipboard UX на copy MCP config | Success/error без silent fail | Мелкий polish визитки |

---

## P2 — MCP & domain

| ID | Фича | Зачем |
|----|------|--------|
| M1 | Killer tools (`compare_stack`, …) / prompts | Более сильное демо агенту |
| M2 | Semantic / fuzzy search skills (fuse.js и т.п.) | Лучше UX tool `search_skills` |
| M3 | Input polish (`tech.max`, нормализация ошибок JSON-RPC) | Жёстче контракт |
| M4 | Timeout / concurrency budget на `/mcp` | Availability под нагрузкой |
| M5 | MCP Inspector / smoke scripts в CI | Регрессии протокола |

---

## P3 — Data maintenance

| ID | Фича | Зачем |
|----|------|--------|
| H\* | **HH PDF → JSON + resume.md** (Epic H из MVP) | Регулярное обновление резюме без ручной правки всех assets |
| D1 | `skills-overrides` / merge projects | Ручная донастройка после импорта |

---

## P4 — Platform & ops

| ID | Фича | Зачем |
|----|------|--------|
| O1 | README runbook + `.cursor/mcp.json` | Онбординг (препрод / сразу после ship) |
| O2 | CI (lint, test, `build:all`, audit) | Качество на каждый PR |
| O3 | Dockerfile / явный Railway config | Воспроизводимый деплой |
| O4 | `trust proxy` при реальном edge/nginx | Корректный IP для throttler |
| O5 | Metrics / uptime / structured logs (без PII резюме) | Наблюдаемость |
| O6 | ESM (или dual) emit для `@portfolio/*` | Проще Vite monorepo без CJS prebundle |
| O7 | **Префикс `/api` для HTTP API** (см. ниже) | Один `exclude` для static; меньше коллизий со SPA |

---

## Переезд роутов на `/api` (после MVP)

**Не делать в MVP.** Сейчас ок: `/mcp`, `/health` + `ServeStatic` `exclude` для этих путей.

### Целевая схема

| Путь | После MVP | Комментарий |
|------|-----------|-------------|
| `/` + SPA (`/resume`, …) | без изменений | отдаёт static / client router |
| `/health` | **оставить** | liveness платформы, без версии |
| `/mcp` | **оставить** (предпочтительно) | публичный MCP URL в Cursor / лендинге; не версионировать как REST |
| Новые REST (download, public JSON, …) | **`/api/v1/...`** | единый префикс для роста API |

Альтернатива (если очень нужен единый `/api`): `/api/mcp` **без** `v1` — breaking change для клиентов, делать осознанно + обновить `mcp.json`, `getMcpUrl`, e2e.

### Static exclude

Вместо перечисления каждого Nest-роута:

```ts
exclude: ['/health{/*path}', '/mcp{/*path}', '/api{/*path}']
```

Новые backend-эндпоинты класть только под `/api/...` — в `exclude` больше не лезть.

### DoD (O7)

- [ ] Конвенция: REST только под `/api/v1`
- [ ] `/mcp` и `/health` не переезжают без отдельного решения
- [ ] `ServeStatic` exclude обновлён под `/api{/*path}`
- [ ] README / landing MCP URL не сломаны
- [ ] e2e обновлены под новые пути (если что-то переехало)

---

## P5 — Web quality (по желанию)

| ID | Фича | Зачем |
|----|------|--------|
| Q1 | Vitest + Testing Library smoke | Регрессии UI |
| Q2 | a11y (axe) на landing / resume | Доступность |
| Q3 | Semantic design tokens / UI polish | Единый look |
| Q4 | SPA routing только если появится >1 страницы | Иначе якоря достаточно |

---

## Явно не в фокусе (пока)

| Item | Почему |
|------|--------|
| OAuth / API keys | Публичный read-only портфолио |
| База данных | JSON assets хватает |
| Отдельный nginx «ради статики» | Static уже внутри Nest |
| Полноценный CMS / admin | Оверкилл для личного резюме |

---

## Рекомендуемый порядок после ship

```
1. O1 runbook (если ещё не сделан на препроде)
2. W4 clipboard polish (быстро)
3. W1 resume page (+ W3)
4. W2 i18n (после решения: UI vs content)
5. H* data sync с HH
6. M1–M2 MCP depth / O2 CI
7. O7 `/api/v1` для новых REST — когда появится первый такой endpoint
```

---

## Критерий «можно начинать After MVP»

- [ ] Прод URL отдаёт `/`, `/health`, `/mcp`
- [ ] Cursor подключается к prod MCP
- [ ] Landing показывает актуальный MCP URL (не localhost)
- [ ] Есть хотя бы один внешний просмотр / фидбек по визитке
