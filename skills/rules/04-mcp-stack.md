# MCP Stack

## Required

| Package                     | Where               | Purpose                              |
| --------------------------- | ------------------- | ------------------------------------ |
| `@modelcontextprotocol/sdk` | `apps/api`          | MCP protocol + Streamable HTTP       |
| `zod`                       | `@portfolio/domain` | Data validation + tool input schemas |

## Not used

- `@rekog/mcp-nest`, `@nest-mcp/server` — custom Nest adapter
- MCP Inspector, fuse.js — skip
- DB, Redis, OAuth — not for MVP

## MCP tools (MVP)

- `get_profile`, `get_contact_info`, `get_experience`
- `list_projects`, `get_project_details`, `search_skills`
- Resource: `profile://resume`

## Layering

```
MCP tools (api) → Nest services → @portfolio/domain → @portfolio/data
```

Business logic never lives in tool handlers or controllers — only wiring.

Backend structure: [08-backend-api.md](./08-backend-api.md).

## Testing

- **web:** Vitest
- **api:** Jest (Nest default)
- **domain:** Jest (same as api)
