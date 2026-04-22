// turbo-all
---
description: Restrict model edits to a specific directory for safety.
---

# /freeze: Restrict Edits to a Directory

Load identity: [persona-gstack-freeze.md](/.agents/rules/persona-gstack-freeze.md)

## Phase 1: Setup
1. Ask the user via `AskUserQuestion` which directory to restrict edits to.
2. Resolve to an absolute path.
3. Save the path to `./.gstack/freeze-dir.txt`.

## Phase 2: Activation
1. Inform the user that edits are now restricted.
2. Mention that `Edit` and `Write` outside this path will be blocked by the session hook.
3. Provide instructions on how to change or remove the boundary.



