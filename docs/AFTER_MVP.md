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
| O1 | README runbook + пример MCP config | Онбординг (препрод / сразу после ship) |
| O2 | **CI/CD** (см. ниже) | Проверки на PR + автодеплой |
| O3 | **Pre-commit / pre-push hooks** (см. ниже) | Ловить ошибки до push/CI |
| O4 | Dockerfile / явный config платформы | Воспроизводимый деплой |
| O5 | `trust proxy` при реальном edge/nginx | Корректный IP для throttler |
| O6 | Metrics / uptime / structured logs (без PII резюме) | Наблюдаемость |
| O7 | ESM (или dual) emit для `@portfolio/*` | Проще Vite monorepo без CJS prebundle |
| O8 | **Префикс `/api` для HTTP API** (см. ниже) | Один `exclude` для static; меньше коллизий со SPA |

---

## CI/CD (O2)

**Цель:** PR не мержится красным; main деплоит один сервис (Nest + static).

### CI (на каждый PR / push в ветку)

```text
pnpm install --frozen-lockfile
pnpm lint:ts
pnpm test                    # packages
pnpm api test                # unit api
pnpm api test:e2e            # при наличии env для MCP_*
pnpm audit --prod
pnpm build:all               # packages → web → copy static → api
```

`--frozen-lockfile` — install строго по lockfile, без тихого резолва других версий в CI.

### CD (после merge в main)

- Платформа (Railway / Render / …): Build = `pnpm build:all`, Start = `pnpm api start:prod` или `node apps/api/dist/main`
- Env: `PORT`, `MCP_ALLOWED_HOSTS`, `MCP_ALLOWED_ORIGINS`, опционально `THROTTLE_HARD_LIMIT`
- Optional smoke: `GET /health`, POST `/mcp` initialize

### DoD

- [ ] GitHub Actions (или аналог) на PR
- [ ] Deploy из main (GitHub integration платформы или workflow)
- [ ] Красный CI блокирует merge

---

## Pre-commit / pre-push hooks (O3)

**Цель:** быстрее, чем ждать CI; не дублировать весь pipeline локально.

| Hook | Что гонять | Зачем |
|------|------------|--------|
| **pre-commit** | lint staged (`lint-staged` + eslint/prettier) | стиль до коммита |
| **pre-push** | `pnpm test` и/или `pnpm api test` | не пушить заведомо красные тесты |

Стек: **Lefthook** или **Husky** + `lint-staged`.  
`build:all` в pre-commit не класть — слишком тяжело.

### DoD

- [ ] Хуки ставятся при `pnpm install` (prepare)
- [ ] Обход только осознанно (`--no-verify`)
- [ ] Кратко описано в runbook

---

## Переезд роутов на `/api` (O8)

**Не делать в MVP.** Сейчас ок: `/mcp`, `/health` + `ServeStatic` `exclude`.

### Целевая схема

| Путь | После MVP | Комментарий |
|------|-----------|-------------|
| `/` + SPA (`/resume`, …) | без изменений | отдаёт static / client router |
| `/health` | **оставить** | liveness платформы, без версии |
| `/mcp` | **оставить** (предпочтительно) | публичный MCP URL; не версионировать как REST |
| Новые REST (download, public JSON, …) | **`/api/v1/...`** | единый префикс для роста API |

Альтернатива: `/api/mcp` **без** `v1` — breaking change для клиентов.

### Static exclude

```ts
exclude: ['/health{/*path}', '/mcp{/*path}', '/api{/*path}']
```

### DoD (O8)

- [ ] REST только под `/api/v1`
- [ ] `/mcp` и `/health` не переезжают без отдельного решения
- [ ] `ServeStatic` exclude обновлён под `/api{/*path}`
- [ ] README / landing MCP URL не сломаны
- [ ] e2e обновлены под новые пути (если что-то переехало)

---

## Хостинг, домен, «нужен ли сервер» (MVP ship)

**Арендовать VPS не обязательно.** Один Nest-процесс + static удобно крутить на PaaS:

| Вариант | Заметки |
|---------|---------|
| Railway / Render / Fly | Git → build → HTTPS URL из коробки |
| VPS (Hetzner, Timeweb, …) | дешевле при 24/7, но сами nginx/SSL/systemd |

Для теста визитки + MCP достаточно URL платформы (`*.up.railway.app` и т.п.) — отдельный купленный домен не блокер.

### Бесплатный / дешёвый «домен» для теста

Полноценный бесплатный TLD (как старый Freenom `.tk`) по сути **умер**. Реалистичные варианты:

| Вариант | Что получаешь | Минусы |
|---------|---------------|--------|
| **Subdomain платформы** | `xxx.up.railway.app`, `xxx.onrender.com` | не «красивое» имя; на free tier возможен sleep |
| **[is-a.dev](https://is-a.dev/)** | `name.is-a.dev` через PR в GitHub | subdomain, не свой TLD; очередь на merge |
| **[Open Domains](https://github.com/open-domains/register)** / community free-domains | похожий PR-flow | зависит от community |
| **DuckDNS** | бесплатный subdomain → твой IP | нужен свой хост/IP; для PaaS обычно не нужен |
| Платный `.dev` / `.xyz` | свой домен ~недорого в год | уже не «бесплатно» |

**Практика для первого ship:** деплой на PaaS → сразу тестировать MCP по выданному HTTPS URL → красивый домен (is-a.dev или платный) повесить CNAME позже.

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
| Обязательный VPS | PaaS хватает для MVP |

---

## Рекомендуемый порядок после ship

```
1. O1 runbook (если ещё не сделан на препроде)
2. W4 clipboard polish (быстро)
3. W1 resume page (+ W3)
4. W2 i18n (после решения: UI vs content)
5. O3 hooks → O2 CI/CD
6. H* data sync с HH
7. M1–M2 MCP depth
8. O8 `/api/v1` — когда появится первый REST endpoint
```

---

## Критерий «можно начинать After MVP»

- [ ] Прод URL отдаёт `/`, `/health`, `/mcp`
- [ ] Cursor подключается к prod MCP
- [ ] Landing показывает актуальный MCP URL (не localhost)
- [ ] Есть хотя бы один внешний просмотр / фидбек по визитке
