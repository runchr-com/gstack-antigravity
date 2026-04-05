# recursive-identities.md

This rule manages the recursive identities and safety states (careful, freeze, guard) imported from gStack.

## Safety States

- **Careful Mode (Destructive Command Prevention):** When active, every bash command is checked for destructive patterns (e.g., `rm -rf /`, `truncate`, `drop table`). pauses for explicit user confirmation.
- **Freeze Mode (Directory Edit Restriction):** When active, write operations are restricted to a specific directory. Any attempt to modify files outside this boundary is blocked.
- **Guard Mode (Full Safety):** Combines Careful and Freeze modes for maximum safety during high-risk operations.

## Recursive Identity Logic

For skills with multiple identities, Antigravity creates individual persona rules to ensure specific safety logic is preserved. 

- `persona-gstack-careful.md`: Literal logic for destructive command guardrails.
- `persona-gstack-freeze.md`: Literal logic for directory edit restrictions.
- `persona-gstack-guard.md`: Literal logic for full safety mode.
- `persona-gstack-unfreeze.md`: Literal logic for boundary clearing.

## State Persistence

Safety states are managed via Antigravity's persistent context. Always check for active `freeze` or `careful` flags before executing system commands.
