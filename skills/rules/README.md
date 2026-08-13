# Project Rules

Conventions for the MCP Resume monorepo. Cursor picks up `.cursor/rules/*.mdc`; full docs live here.

| Rule                                                | File                                                       |
| --------------------------------------------------- | ---------------------------------------------------------- |
| Monorepo layout & deps (`@portfolio/*`)             | [01-monorepo.md](./01-monorepo.md)                         |
| TypeScript: no `.js`, model/types/index, interfaces | [02-typescript.md](./02-typescript.md)                     |
| Package & feature public API                        | [03-public-api.md](./03-public-api.md)                     |
| MCP stack                                           | [04-mcp-stack.md](./04-mcp-stack.md)                       |
| Backend API (`apps/api`)                            | [08-backend-api.md](./08-backend-api.md)                   |
| Web FSD (`apps/web`)                                | [09-web-fsd.md](./09-web-fsd.md)                           |
| Strict code review                                  | [05-code-review.md](./05-code-review.md)                   |
| Testing (Jest, «Если …, то …», pos/neutral/neg)     | [06-testing.md](./06-testing.md)                           |
| Approval before code changes                        | [07-approval-before-code.md](./07-approval-before-code.md) |
| Verify before handoff (no white screen / stale dist)| [10-verify-before-handoff.md](./10-verify-before-handoff.md) |
| Types in `types.ts`; web `lib/` vs `model/` (FSD)   | [09-web-fsd.md](./09-web-fsd.md) + `.cursor/rules/types-in-types-ts.mdc` |
