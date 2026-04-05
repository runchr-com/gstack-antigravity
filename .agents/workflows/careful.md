---
description: Safety guardrails for destructive commands.
---

# /careful Workflow
This workflow is governed by [.agents/rules/persona-gstack-careful.md](/.agents/rules/persona-gstack-careful.md).

## Phase 1: Activation
1. Every subsequent bash command is automatically checked for destructive patterns:
   - `rm -rf`, `rm -r` (Recursive delete)
   - `DROP TABLE`, `DROP DATABASE`, `TRUNCATE` (Data loss)
   - `git push --force`, `git reset --hard` (History/Work loss)
   - `kubectl delete`, `docker rm -f` (Infrastructure impact)
2. If a match is found, the system will trigger an `AskUserQuestion` to confirm before proceeding.

## Phase 2: Exceptions
1. Common build artifacts are allowed without warning:
   - `node_modules`, `dist`, `build`, `__pycache__`, `coverage`.

## Phase 3: Deactivation
1. End the session to deactivate the hooks.

