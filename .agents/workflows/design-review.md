// turbo-all
---
description: Visual QA and polish audit based on DESIGN.md and best practices.
---

# /design-review: Visual QA & Polish

Load identity: [persona-gstack-design-review.md](/.agents/rules/persona-gstack-design-review.md)

## Phase 1: Setup & Ingestion
1. Detect Target URL and scope. If no URL, enter diff-aware mode.
2. Check for `DESIGN.md`. All design decisions calibrate against it.
3. Verify clean working tree. If dirty, AskUserQuestion: A) Commit B) Stash C) Abort.
4. Verify `browse` binary and bootstrap test framework if needed (Phase 2 Setup).

## Phase 2: The Design Audit (Page-by-Page)
1. **First Impression:** Take screenshot and record gut reaction (Step 1).
2. **System Extraction:** Run JS audits for fonts, colors, hierarchy, and touch targets (Step 2).
3. **Visual Audit:** Apply the 10-category checklist (~80 items) across all pages in scope (Step 3).
   - Hierarchy, Typography, Color/Contrast, Spacing/Layout, Interaction, Responsive, Motion, Content, AI Slop, Performance.

## Phase 3: Interaction & Consistency
1. Walk key user flows (Phase 4). Check response feel, transitions, feedback.
2. Verify Cross-Page Consistency (Phase 5). Nav/Footer/Pattern reuse.

## Phase 4: Reporting & Scoring
1. Compile the Design Audit Report with letter grades (A-F) and headline scores (Design Score + AI Slop Score).
2. Write `design-baseline.json` for future regression detection.
3. Report status: **DONE**, **DONE_WITH_CONCERNS**, **BLOCKED**, or **NEEDS_CONTEXT**.



