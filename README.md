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

### TODO: настройка production deploy

- [ ] Подготовить VPS: установить Docker Engine и Compose plugin, открыть только
      необходимые порты, настроить firewall и SSH-доступ по ключу.
- [ ] Создать на VPS отдельного системного пользователя для deploy и каталог
      приложения с `compose.yaml` и `.env`.
- [ ] Опубликовать первый релизный тег (`v0.1.0`) и проверить, что workflow
      собрал, проверил Trivy и загрузил образ в GHCR.
- [ ] Определить видимость GHCR package. Для private package создать PAT
      (classic) со scope `read:packages` и выполнить на VPS `docker login ghcr.io`.
- [ ] Заполнить `.env` на VPS: `REGISTRY_URL`, `IMAGE_NAME`, точный
      `IMAGE_TAG` и внешний `APP_PORT`. Не хранить этот файл в Git.
- [ ] Добавить GitHub Environment `production`, включить required reviewers и
      сохранить repository/environment secrets для SSH-доступа к VPS.
- [ ] Добавить job `deploy`, который запускается после `publish`, копирует или
      обновляет конфигурацию на VPS и выполняет:
      `docker compose pull && docker compose up -d --remove-orphans --wait`.
- [ ] После deploy проверять `/health`; при ошибке завершать job с ошибкой и
      сохранять логи `docker compose logs`.
- [ ] Настроить reverse proxy (Caddy или Nginx), домен и автоматический TLS.
- [ ] Описать rollback: указать предыдущий `IMAGE_TAG` в `.env`, выполнить
      `docker compose pull` и повторно запустить `docker compose up -d --wait`.
- [ ] Настроить мониторинг доступности, оповещения, ротацию системных логов и
      регулярную очистку неиспользуемых Docker images.
- [ ] Защитить релизные теги `v*` GitHub Ruleset: ограничить создание и удаление
      тегов и разрешить bypass только ответственным за релиз.

## Monorepo

| Package                     | Scope               |
| --------------------------- | ------------------- |
| `packages/common`           | `@portfolio/common` |
| `packages/portfolio-data`   | `@portfolio/data`   |
| `packages/portfolio-domain` | `@portfolio/domain` |
| `apps/api`                  | NestJS API          |
| `apps/web`                  | React landing       |

Конвенции: [`skills/rules/`](./skills/rules/)
