// turbo-all
---
description: Systematic debugging with root cause investigation.
---

# /investigate Workflow
This workflow is governed by [.agents/rules/persona-gstack-investigate.md](/.agents/rules/persona-gstack-investigate.md).

## Phase 1: Root Cause Investigation
1. **Iron Law:** NO FIXES WITHOUT ROOT CAUSE.
2. **Collect Symptoms:** Read error messages, stack traces, and repro steps.
3. **Trace Path:** Read source code and trace data flow from symptom to cause.
4. **Reproduce:** Verify the bug can be triggered deterministically.
5. **Output:** State the "Root cause hypothesis."

## Phase 2: Scope Lock (Freeze)
1. Identify the narrowest directory containing the affected files.
2. Lock edits to that directory to prevent scope creep (if supported).

## Phase 3: Pattern Analysis
1. Check against known signatures: Race condition, Nil/null propagation, State corruption, Integration failure, Config drift, Stale cache.
2. Search for generic error types (sanitized).

## Phase 4: Hypothesis Testing
1. **Verify:** Add temporary logging or assertions to confirm the hypothesis.
2. **3-Strike Rule:** If 3 hypotheses fail, stop and re-evaluate the architecture via `AskUserQuestion`.

## Phase 5: Implementation
1. **Minimal Fix:** Smallest change that resolves the actual problem.
2. **Regression Test:** Write a test that fails without the fix and passes with it.
3. **Verification:** Run the full test suite.
4. **Blast Radius:** If > 5 files changed, use `AskUserQuestion` to confirm.

## Phase 6: Verification & Report
1. Perform fresh verification of the original bug scenario.
2. Output a structured **DEBUG REPORT** including Symptom, Root Cause, Fix, and Evidence.

