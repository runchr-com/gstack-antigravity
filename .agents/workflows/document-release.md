// turbo-all
---
description: Post-ship documentation updates based on git history and diff analysis.
---

# /document-release: Post-Ship Documentation Update

Load identity: [persona-gstack-document-release.md](/.agents/rules/persona-gstack-document-release.md)

## Phase 1: Pre-flight & Diff Analysis
1. Detect base branch and current branch.
2. Run `git diff` and `git log` to categorize changes (features, behavior, removals, infra).
3. Find all `.md` files in the repo.

## Phase 2: Documentation Audit
1. Audit `README.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `README.md`, and other docs.
2. Classify updates as **Auto-update** (factual) or **Ask user** (narrative/risky).
3. Follow the generic heuristics for each file type.

## Phase 3: Apply Updates
1. Apply auto-updates using the Edit tool. Provide one-line summaries for each.
2. Batch-ask the user about risky/narrative changes using the `AskUserQuestion` format.

## Phase 4: Polish & Consistency
1. Polish `CHANGELOG.md` voice without overwriting entries.
2. Perform cross-doc consistency and discoverability checks.
3. Cleanup `TODOS.md` (mark completed, update stale, add deferred).
4. Ask about `VERSION` bump if not already done.

## Phase 5: Commit & Report
1. Commit modified docs with message `docs: update project documentation for vX.Y.Z.W`.
2. Update PR body with the Documentation section and diff preview.
3. Display the Structured Doc Health Summary.



