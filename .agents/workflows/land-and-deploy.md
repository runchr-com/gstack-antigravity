// turbo-all
---
description: Combined workflow for merging PRs, triggering deployment, and verification.
---

# /land-and-deploy: Merge, Deploy, Verify

Load identity: [persona-gstack-land-and-deploy.md](/.agents/rules/persona-gstack-land-and-deploy.md)

## Phase 1: Pre-flight
1. Verify `gh` auth and parse arguments (PR #, URL).
2. Detect PR from current branch if not specified.
3. Run CI checks and merge conflict detection.

## Phase 2: The Readiness Gate
1. Perform the **Pre-merge Readiness Gate** analysis:
   - Review staleness check (Stale/Recent/Current).
   - Run free tests and check recent E2E/LLM eval results.
   - PR body accuracy check.
   - Document-release check (CHANGELOG/VERSION).
2. Present the **Readiness Report** dashboard.
3. Get explicit user confirmation via `AskUserQuestion` before merging.

## Phase 3: Merge & Deploy
1. Merge the PR (auto-merge or squash) and delete branch.
2. Detect deploy strategy (platform, workflows, URL).
3. Poll GitHub Actions or platform CLI until deploy completes.

## Phase 4: Canary Verification
1. Perform Canary Verification based on diff-scope (Quick/Full).
2. Check page load, console errors, perf, and take visual snapshots.
3. If healthy, report success. If broken, offer to revert.

## Phase 5: Reporting
1. Generate the Deploy Report and save evidence to `.gstack/deploy-reports/`.
2. Write the test outcome artifact to `./.gstack/projects/`.



