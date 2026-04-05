// turbo-all
---
description: Performance regression detection using browse daemon.
---

# /benchmark Workflow
This workflow is governed by [.agents/rules/persona-gstack-benchmark.md](/.agents/rules/persona-gstack-benchmark.md).

## Phase 1: Setup & Discovery
1. Create report directories: `.gstack/benchmark-reports/`.
2. Discover target pages from navigation or arguments.

## Phase 2: Data Collection
1. **Metrics:** Capture TTFB, FCP, LCP, DOM Interactive, and Full Load.
2. **Resources:** Analyze transfer sizes, bundle sizes (JS/CSS), and request counts.
3. **Slowest Resources:** Identify the Top 10 slowest first-party and third-party resources.

## Phase 3: Comparison & Baseline
1. **Baseline Capture:** Save current metrics if `--baseline` requested.
2. **Regression Check:** Compare against baseline.
   - Timing: >50% increase = REGRESSION.
   - Bundle: >25% increase = REGRESSION.

## Phase 4: Performance Budget
1. Check against industry standards (FCP < 1.8s, JS < 500KB, etc.).
2. Assign a health Grade (A-F).

## Phase 5: Trend & Report
1. (Optional) Show trends from historical benchmark data.
2. Write report to Markdown and JSON formats.

