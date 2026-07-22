# After MVP — бэклог

## Product

- [ ] `/resume` (public DTO, без лишнего contact)
- [ ] i18n ru/en (сначала: только UI или ещё контент)
- [ ] Download / ссылка на полное resume MD
- [ ] Clipboard UX (success/error)

## MCP / domain

- [ ] Killer tools / prompts
- [ ] Fuzzy search skills
- [ ] Жёстче input / JSON-RPC errors
- [ ] Timeout / concurrency на `/mcp`
- [ ] MCP smoke в CI

## Data

- [ ] HH PDF → JSON + `resume.md` (`pnpm sync:portfolio`)
- [ ] overrides / merge projects после импорта

## Ops

- [ ] CI: lint, test, `build:all`, audit; CD из main
- [ ] pre-commit / pre-push (lint-staged; без `build:all`)
- [ ] `trust proxy` при реальном edge
- [ ] metrics / logs (без PII)
- [ ] REST только под `/api/v1` (`/mcp`, `/health` не трогать)
- [ ] Vitest smoke / a11y по желанию

## Не сейчас

OAuth, БД, CMS, отдельный nginx ради static.
