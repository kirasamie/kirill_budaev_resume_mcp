# Strict Code Review

Apply when reviewing PRs, diffs, or local changes before merge.

## Process

1. **Scope** — list changed files; ignore unrelated edits.
2. **Blockers first** — architecture boundaries, public API leaks, layering.
3. **Conventions** — TypeScript, naming, folder layout.
4. **Behavior** — logic, edge cases, regressions.
5. **Tests** — new/changed logic must have matching tests (when project uses tests for that layer).

Do not approve drive-by refactors mixed with the task unless they are required to satisfy the rules below.

## Severity

| Level       | Meaning                                                             | Action                |
| ----------- | ------------------------------------------------------------------- | --------------------- |
| **blocker** | Breaks boundaries, wrong layer, deep imports, logic in MCP handlers | Must fix before merge |
| **major**   | Convention violation, missing validation, untested behavior change  | Fix or justify in PR  |
| **minor**   | Naming, structure drift, redundant code                             | Should fix            |
| **nit**     | Style preference, optional simplification                           | Optional              |

## Checklist (derived from project rules)

### Monorepo & dependencies

- [ ] Imports use `@portfolio/*` package names — no deep paths (`@portfolio/domain/src/...`)
- [ ] Dependency direction: `data → domain → api/web`; no `packages → apps`, no `web → api`
- [ ] New package deps are justified; build tools not duplicated in package `devDependencies`
- [ ] Change respects build order when touching multiple packages

### Public API

- [ ] External consumers import only package `index.ts` or feature `index.ts`
- [ ] No imports of sibling `model.ts` / `types.ts` from outside the feature folder
- [ ] Package root exports minimal surface — internals stay internal
- [ ] New public symbols are intentional (not accidental re-export)

### TypeScript

- [ ] No `.js` extensions in TS imports
- [ ] Functions: `export const fn = () => {}`, not `export function`
- [ ] `interface` for object shapes; `type` only for unions / indexed access / mapped types
- [ ] Feature folders follow `model.ts` + `types.ts` + `index.ts`
- [ ] Magic strings / asset names → `constants.ts`
- [ ] Package `tsconfig` extends root `tsconfig.base.json`

### MCP & layering (when `apps/api` or domain tools change)

- [ ] MCP tool handlers are thin — wiring only; business logic in `@portfolio/domain`
- [ ] Validation / Zod schemas live in `@portfolio/domain`, not in api handlers
- [ ] No `@rekog/mcp-nest` or alternate MCP wrappers
- [ ] Data flow: `MCP tools → domain → data`

### General quality

- [ ] Diff is minimal for the stated goal — no unrelated renames/formatting
- [ ] No secrets, tokens, or `.env` values committed
- [ ] Error paths handled; no empty `catch`
- [ ] Names match project conventions (`kebab-case` folders, `PascalCase` types)

### Tests (when applicable)

- [ ] **web** — Vitest
- [ ] **api** — Jest
- [ ] **domain / data / common** — Jest (`*.spec.ts`)
- [ ] Descriptions in Russian: «Если …, то …»; positive / neutral / negative per [06-testing.md](./06-testing.md)
- [ ] Changed behavior covered; snapshots updated intentionally

## Review output format

Return findings as a markdown table, **blockers first**:

```markdown
| Severity | Location                                       | Finding                                                 | Suggestion                                     |
| -------- | ---------------------------------------------- | ------------------------------------------------------- | ---------------------------------------------- |
| blocker  | packages/domain/src/load-portfolio/model.ts:12 | Deep import from `@portfolio/data/load-portfolio/model` | Import via `@portfolio/data` public API        |
| major    | apps/api/src/tools/profile.tool.ts:8           | Business logic in MCP handler                           | Move to domain service, keep handler as wiring |
```

If no issues:

```markdown
No blockers or majors. Ready to merge (N nits optional).
```

## Approve only when

- Zero **blockers**
- Zero **majors**, or each major has explicit PR justification
- Scope matches the task; conventions in source rules satisfied

## References

Checklist items map to source rules — cite them in findings, do not duplicate examples here:

| Topic                  | Rule                                   |
| ---------------------- | -------------------------------------- |
| Monorepo & deps        | [01-monorepo.md](./01-monorepo.md)     |
| TypeScript conventions | [02-typescript.md](./02-typescript.md) |
| Public API boundaries  | [03-public-api.md](./03-public-api.md) |
| MCP layering           | [04-mcp-stack.md](./04-mcp-stack.md)   |
| Testing                | [06-testing.md](./06-testing.md)       |
