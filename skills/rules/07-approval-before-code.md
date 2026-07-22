# Approval Before Code

## Rule

**No file changes until the user approves** the specific addition or edit.

## Workflow

```
1. Propose  →  structure / snippets in chat
2. Approve  →  user confirms ("ок", "делай", "приступай", …)
3. Implement →  only approved scope
```

## "Покажи как будет выглядеть"

Show in **chat only**. Do not write to the repo until the user approves implementation.

## Exceptions

- Explicit implementation request in the same message
- Read-only investigation (grep, read, non-destructive commands)

## Cursor

Mirrored in `.cursor/rules/approval-before-code.mdc` (`alwaysApply: true`).
