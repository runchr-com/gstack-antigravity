// turbo-all
---
description: Post-deploy canary monitoring.
---

# /canary Workflow
This workflow is governed by [.agents/rules/persona-gstack-canary.md](/.agents/rules/persona-gstack-canary.md).

## Phase 1: Setup & Baseline
1. Create `.gstack/canary-reports/`.
2. **Baseline Capture:** If no baseline exists, take snapshots of key pages pre-deploy.

## Phase 2: Page Discovery
1. Auto-discover top 5 navigation targets via `$B links`.
2. Confirm target list with user.

## Phase 3: Continuous Monitoring
1. Monitor for defined duration (default 10m).
2. Check every 60s for:
   - Page load failures (CRITICAL).
   - NEW console errors (HIGH).
   - Performance regressions (MEDIUM).
3. Capture screenshots for every check.

## Phase 4: Alerting
1. If a Critical or High alert is detected for 2+ consecutive checks, trigger `AskUserQuestion`.
2. Options: Investigate, Continue, Rollback, or Dismiss.

## Phase 5: Health Report
1. Final verdict: **HEALTHY**, **DEGRADED**, or **BROKEN**.
2. Save summary to `.gstack/canary-reports/`.
3. Offer to update baseline with new "healthy" screenshots.

