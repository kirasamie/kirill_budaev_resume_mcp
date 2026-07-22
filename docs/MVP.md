# MCP Resume — MVP

Публичное портфолио разработчика с **MCP-сервером**: AI-клиенты (Cursor, Claude Desktop и др.) могут запрашивать профиль, опыт, проекты и навыки через стандартный протокол. Один деплой: NestJS API + статическая landing-страница.

---

## 1. Цель MVP

| Для кого                      | Что получает                                          |
| ----------------------------- | ----------------------------------------------------- |
| **Рекрутер / hiring manager** | Landing с кратким профилем и ссылкой на MCP           |
| **AI-ассистент**              | 6 tools + 1 resource с актуальными данными резюме     |
| **Разработчик (мы)**          | Монорепо с чистым разделением data → domain → api/web |

**Критерий готовности MVP:** AI-клиент подключается к `https://<host>/mcp`, вызывает tools и получает валидный JSON/Markdown из реальных данных.

---

## 2. Scope

### В MVP

- [x] `@portfolio/data` — JSON/MD ассеты, `loadPortfolioRaw`, `readResumeMarkdown`
- [x] `@portfolio/domain` — Zod-схемы, `loadPortfolio`, `getResumeMarkdown`, input schemas для tools
- [x] `@portfolio/common` — shared enums/utilities
- [ ] `@portfolio/domain` — domain services (search, filter, lookup)
- [ ] `apps/api` — NestJS: `/health`, `/mcp` (Streamable HTTP, stateless)
- [ ] MCP: 6 tools + resource `profile://resume`
- [ ] `apps/web` — минимальный landing (React + Vite)
- [ ] Prod: api отдаёт static web + MCP на одном порту
- [ ] README: локальный запуск, подключение MCP в Cursor

### Вне MVP (явно откладываем)

| Item                                    | Причина                                                                                |
| --------------------------------------- | -------------------------------------------------------------------------------------- |
| OAuth / API keys                        | Публичный read-only сервер                                                             |
| База данных                             | Данные в JSON, достаточно для MVP                                                      |
| `@rekog/mcp-nest`, MCP Inspector        | Свой тонкий Nest-адаптер                                                               |
| fuse.js, semantic search                | Простой substring-match по skills                                                      |
| Killer tools (`compare_stack`, prompts) | Phase 2                                                                                |
| CI/CD, Railway                          | После локальной проверки                                                               |
| i18n                                    | Данные на русском, tools отвечают как есть                                             |
| Resume parser (HH PDF → JSON)           | Не блокирует MVP — JSON уже заполнены вручную; нужен для регулярных обновлений с hh.ru |

### Data maintenance (отдельно от MVP)

Сейчас `packages/portfolio-data/src/assets/*.json` и `resume.md` синхронизированы **вручную**. Для актуализации раз в ~6 месяцев (новые навыки, проекты, опыт) — **импорт из PDF-экспорта HeadHunter** — см. Epic H.

**Источник правды:** PDF с hh.ru (экспорт резюме).  
**Артефакты в репо:** `*.json` + `resume.md` (генерируется при импорте для MCP resource).

**Целевой workflow обновления:**

```
1. Обновляем резюме на hh.ru
2. Скачиваем PDF (экспорт резюме)
3. pnpm sync:portfolio --from ./path/to/resume.pdf
4. PortfolioSchema.parse(...)   # валидация в скрипте
5. Ручная донастройка overrides при необходимости (skills, projects, contact)
6. pnpm test + pnpm build
7. Коммит + деплой
```

`resume.md` — **производный** файл для `profile://resume` и чтения людьми; не редактируем вручную как primary source.

---

## 3. Архитектура

```
mcp_resume/
├── apps/
│   ├── api/          NestJS — /health, /mcp, static web (prod)
│   └── web/          React + Vite — landing
├── packages/
│   ├── common/       @portfolio/common
│   ├── portfolio-data/    @portfolio/data
│   └── portfolio-domain/  @portfolio/domain
├── skills/rules/     конвенции проекта
└── docs/             продуктовая документация
```

### Поток зависимостей

```
apps/web ──► (нет зависимости от api)
apps/api ──► @portfolio/domain ──► @portfolio/data ──► @portfolio/common
```

### Слои api

```
HTTP /mcp
    └── mcp/           McpServer + StreamableHTTPServerTransport
            └── tools/     регистрация handlers (только wiring)
                    └── portfolio/   Nest DI → domain services
                            └── @portfolio/domain
```

**Правило:** бизнес-логика только в `@portfolio/domain`, tool handlers — тонкая обёртка.

### Build order

```
common → data → domain → web → api
```

Root scripts:

```bash
pnpm build          # common + data + domain
pnpm build:api      # Nest api
pnpm test           # packages
```

---

## 4. Модель данных

Единый объект `Portfolio` (валидируется `PortfolioSchema`):

| Поле             | Источник              | Описание                                                      |
| ---------------- | --------------------- | ------------------------------------------------------------- |
| `profile`        | `profile.json`        | Имя, title, summary, локация, формат работы                   |
| `contact`        | `contact.json`        | Email, phone, telegram, preferredContact                      |
| `experience`     | `experience.json`     | Места работы, stack, highlights                               |
| `projects`       | `projects.json`       | Проекты с фильтрами tech/status                               |
| `skills`         | `skills.json`         | Навыки с category, level, aliases                             |
| `education`      | `education.json`      | Образование                                                   |
| `certifications` | `certifications.json` | Сертификаты                                                   |
| `resumeMarkdown` | `resume.md`           | Полное резюме в Markdown (генерируется при импорте из HH PDF) |

**Синхронизация:** на старте MVP — ручная. Импорт (Epic H): **HH PDF → `*.json` + `resume.md`**.

Input schemas для MCP tools уже в domain:

- `SearchSkillsInputSchema` — `{ query, category? }`
- `ListProjectsInputSchema` — `{ tech?, status? }`
- `GetProjectDetailsInputSchema` — `{ name }`

---

## 5. HTTP API

| Method | Path      | Назначение                               |
| ------ | --------- | ---------------------------------------- |
| `GET`  | `/health` | Liveness: `{ ok, version, mcp: '/mcp' }` |
| `*`    | `/mcp`    | MCP Streamable HTTP (stateless)          |
| `GET`  | `/*`      | Static web (prod only)                   |

**Transport:** `@modelcontextprotocol/sdk`, `sessionIdGenerator: undefined` (stateless).

---

## 6. MCP Surface

### Tools

| Tool                  | Input                    | Output         | Domain               |
| --------------------- | ------------------------ | -------------- | -------------------- |
| `get_profile`         | —                        | `Profile`      | `getProfile()`       |
| `get_contact_info`    | —                        | `Contact`      | `getContact()`       |
| `get_experience`      | —                        | `Experience[]` | portfolio.experience |
| `list_projects`       | `ListProjectsInput`      | `Project[]`    | `listProjects()`     |
| `get_project_details` | `GetProjectDetailsInput` | `Project`      | `getProjectByName()` |
| `search_skills`       | `SearchSkillsInput`      | `Skill[]`      | `searchSkills()`     |

### Resources

| URI                | MIME            | Content               |
| ------------------ | --------------- | --------------------- |
| `profile://resume` | `text/markdown` | `getResumeMarkdown()` |

### Поведение domain services (to implement)

**`searchSkills({ query, category? })`**

- Case-insensitive match по `name` и `aliases`
- Optional filter по `category`

**`listProjects({ tech?, status? })`**

- `tech`: substring match в `stack[]`
- `status`: exact match (`active` | `completed` | …)

**`getProjectByName({ name })`**

- Case-insensitive match по `name`
- Throw / MCP error если не найден

---

## 7. Web (landing)

Минимальная одностраничная витрина:

- Hero: имя, title, summary (из profile)
- Блок «Подключить MCP» — URL `/mcp`, пример `.cursor/mcp.json`
- Контакты (telegram, email)
- Ссылка на `profile://resume` / скачать MD (опционально)

Стек: React 19, Vite, Vitest (smoke tests позже).

---

## 8. Deploy (целевой)

- **Один сервис** (Railway / аналог): `node apps/api/dist/main`
- `@nestjs/serve-static` → `apps/web/dist`
- Env: `PORT` (default 3000)
- Публичный URL для MCP в README и на landing

---

## 9. Текущий статус

| Компонент                          | Статус                   |
| ---------------------------------- | ------------------------ |
| `@portfolio/common`                | ✅                       |
| `@portfolio/data`                  | ✅                       |
| `@portfolio/domain` schemas + load | ✅                       |
| `@portfolio/domain` services       | ❌                       |
| Resume import (HH PDF → JSON)      | ❌                       |
| `apps/api` MCP                     | ❌ (scaffold `getHello`) |
| `apps/web`                         | ❌ (только tsconfig)     |
| ESLint root                        | ✅                       |
| Docs                               | 🔄 этот файл             |

---

## 10. Задачи MVP

Задачи сгруппированы по эпикам. Порядок внутри эпика важен; эпики 2 и 3 можно частично параллелить после эпика 1.

### Epic A — Domain services

| ID  | Задача                                                        | DoD                                                |
| --- | ------------------------------------------------------------- | -------------------------------------------------- |
| A1  | `services/profile/` — `getProfile()`, `getContact()`          | Jest: pos/neutral, экспорт из package root         |
| A2  | `services/projects/` — `listProjects()`, `getProjectByName()` | Фильтры tech/status, ошибка если project не найден |
| A3  | `services/skills/` — `searchSkills()`                         | Match по name + aliases, filter category           |
| A4  | Barrel `services/index.ts` + re-export в `@portfolio/domain`  | Импорт только через package name                   |

### Epic B — API foundation

| ID  | Задача                                                              | DoD                                 |
| --- | ------------------------------------------------------------------- | ----------------------------------- |
| B1  | Deps: `@modelcontextprotocol/sdk`, `@portfolio/domain` в `apps/api` | `pnpm install`, api build           |
| B2  | Удалить scaffold: `AppController`, `AppService`, `getHello`         | Нет мёртвого кода                   |
| B3  | `health/` module — `GET /health`                                    | E2E 200, JSON body                  |
| B4  | `portfolio/` module — `PortfolioService` (thin wrapper над domain)  | Injectable, unit test с mock domain |

### Epic C — MCP transport

| ID  | Задача                                                 | DoD                               |
| --- | ------------------------------------------------------ | --------------------------------- |
| C1  | `mcp/` module — `McpService` (McpServer, onModuleInit) | Server создаётся при старте       |
| C2  | Streamable HTTP transport, stateless                   | `ALL /mcp` отвечает на initialize |
| C3  | `McpModule` imports `ToolsModule`, `PortfolioModule`   | Module graph без циклов           |

### Epic D — MCP tools & resource

| ID  | Задача                                                          | DoD                                 |
| --- | --------------------------------------------------------------- | ----------------------------------- |
| D1  | `tools/profile-tools` — `get_profile`, `get_contact_info`       | tools/list содержит оба             |
| D2  | `tools/experience-tools` — `get_experience`                     | Возвращает массив experience        |
| D3  | `tools/projects-tools` — `list_projects`, `get_project_details` | Zod input из domain                 |
| D4  | `tools/skills-tools` — `search_skills`                          | Zod input из domain                 |
| D5  | Resource `profile://resume`                                     | text/markdown, содержимое resume.md |

### Epic E — Web landing

| ID  | Задача                                   | DoD                                                                   |
| --- | ---------------------------------------- | --------------------------------------------------------------------- |
| E1  | Vite + React scaffold в `apps/web`       | `pnpm dev` на отдельном порту                                         |
| E2  | Landing page: profile + MCP instructions | Читает данные (import domain или static copy — решить при реализации) |
| E3  | Root script `build:web`                  | `web/dist` собирается                                                 |

### Epic F — Prod wiring & docs

| ID  | Задача                                                 | DoD                                                                                          |
| --- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| F1  | `@nestjs/serve-static` — web dist в prod               | Один процесс отдаёт `/` и `/mcp`                                                             |
| F2  | Root `build` chain: common → data → domain → web → api | Одна команда перед деплоем                                                                   |
| F3  | `README.md` — setup, MCP config для Cursor             | Copy-paste `.cursor/mcp.json`                                                                |
| F4  | Manual smoke: 5 demo prompts                           | get_profile, search_skills react, list_projects NestJS, get_project_details, resume resource |
| F5  | Dockerfile (optional для MVP, желательно)              | `docker build` + run                                                                         |

### Epic G — Quality

| ID  | Задача                              | DoD                   |
| --- | ----------------------------------- | --------------------- |
| G1  | API e2e: `/health`                  | supertest             |
| G2  | Tool handler unit tests             | mock PortfolioService |
| G3  | Проверка eslint на новых файлах api | `pnpm lint:ts` clean  |

### Epic H — HH PDF import → portfolio-data (data maintenance)

**Не блокирует MVP.** JSON уже есть; эпик нужен до первого обновления резюме с hh.ru (навыки, новый проект, смена работы).

**Pipeline:**

```
resume.pdf (HH export)
    → extractPdfText()      # pdf-parse
    → parseHhResume()       # секции HH: опыт, навыки, образование…
    → mapToPortfolioAssets() # profile, contact, experience, skills, …
    → generateResumeMarkdown() # resume.md для MCP resource
    → PortfolioSchema.parse()
    → write assets/*.json + resume.md
```

| ID  | Задача                                                                | DoD                                                                                      |
| --- | --------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| H1  | Контракт формата HH PDF + фикстура                                    | `docs/hh-resume-format.md`; тестовый `resume.hh.fixture.pdf` в `import-hh/__fixtures__/` |
| H2  | `import-hh/extract-pdf/` — извлечение текста из PDF                   | `extractPdfText(buffer): string`; dep `pdf-parse`                                        |
| H3  | `import-hh/parse-hh/` — парсер текста HH → промежуточная структура    | Секции: шапка, «О себе», «Опыт работы», «Навыки», «Образование», «Знание языков» и т.д.  |
| H4  | `import-hh/sync/` — маппинг → `assets/*.json`                         | `profile`, `contact`, `experience`, `skills`, `education`, `certifications`              |
| H5  | `generateResumeMarkdown()` — `resume.md` из распарсенных данных       | MCP resource остаётся MD; файл перезаписывается при sync                                 |
| H6  | Маппинг навыков HH → `Skill[]` + `skills-overrides.json`              | Эвристики level/category + ручные overrides после импорта                                |
| H7  | `projects.json` — не в HH PDF                                         | Оставляем ручным или merge: импорт не трогает файл без `--force-projects`                |
| H8  | Валидация через `PortfolioSchema` перед записью                       | Zod error → exit 1, файлы не перезаписываются                                            |
| H9  | CLI `pnpm sync:portfolio --from <path.pdf>` (+ `--dry-run`, `--diff`) | Dry-run: diff без записи                                                                 |
| H10 | Jest: extract + parse на `resume.hh.fixture.pdf`                      | pos: полный импорт; neg: битый PDF / неизвестный шаблон → throw                          |
| H11 | `docs/data-update.md` — «обновить резюме с HH»                        | Export PDF с hh.ru → sync → что проверить руками                                         |

**Где живёт код:**

```
packages/portfolio-data/src/
├── assets/                    # JSON + resume.md (output)
└── import-hh/
    ├── extract-pdf/           # extractPdfText()
    ├── parse-hh/              # parseHhResumeText()
    ├── sync/                  # syncFromHhPdf(), generateResumeMarkdown()
    ├── __fixtures__/          # resume.hh.fixture.pdf
    └── index.ts
```

**Ограничения (осознанно):**

- Только **PDF-экспорт hh.ru** — без HH API, без произвольных PDF-шаблонов на первом этапе
- После импорта возможна **ручная правка** `skills-overrides.json`, `projects.json`, `contact.json`
- Шаблон HH может меняться — фикстура + тесты ловят регрессии
- `contact`: telegram / preferredContact — из overrides, если HH не отдаёт

**Когда делать:** параллельно Sprint 2–3 или сразу после MVP ship — до дедлайна «обновить навыки на HH».

---

## 11. Рекомендуемый порядок спринта

```
Sprint 1 (backend core)
  A1 → A2 → A3 → A4
  B1 → B2 → B3 → B4

Sprint 2 (MCP)
  C1 → C2 → C3
  D1 → D2 → D3 → D4 → D5
  G1, G2, F4

Sprint 3 (web + ship)
  E1 → E2 → E3
  F1 → F2 → F3 → F5
  G3

Sprint 4 / parallel (data maintenance — до обновления на HH)
  H1 → H2 → H3 → H4 → H5 → H6 → H7 → H8 → H9 → H10 → H11
```

**Минимальный вертикальный срез (если нужен быстрый demo):** A1 + B1–B3 + C1–C2 + D1 + D5 — profile tool + resume resource через `/mcp`.

**Epic H** можно начать с H1 + фикстуры PDF — не зависит от api/mcp.

---

## 12. Demo prompts (acceptance)

После подключения MCP в Cursor:

1. «Покажи профиль кандидата» → `get_profile`
2. «Как связаться с Кириллом?» → `get_contact_info`
3. «Какой опыт с Module Federation?» → `search_skills` / `list_projects`
4. «Расскажи про проект анкеты РГС» → `get_project_details`
5. «Покажи полное резюме» → resource `profile://resume`

---

## 13. Ссылки

- After MVP: [`docs/AFTER_MVP.md`](./AFTER_MVP.md)
- Конвенции: [`skills/rules/`](../skills/rules/)
- MCP stack: [`skills/rules/04-mcp-stack.md`](../skills/rules/04-mcp-stack.md)
- Monorepo: [`skills/rules/01-monorepo.md`](../skills/rules/01-monorepo.md)
