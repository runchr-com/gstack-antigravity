// turbo-all
# /review: Pre-Landing PR Review

Load identity: [persona-gstack-review.md](/.agents/rules/persona-gstack-review.md)

## Phase 1: Setup & Detection
1. Run the detected base branch logic (Step 0) using `gh pr view` or `gh repo view`.
2. Check if on the base branch or if there's no diff. If so, stop.
3. Run Scope Drift Detection (Step 1.5). Identify stated intent vs. actual diff.

## Phase 2: Detailed Review (Two-Pass)
1. Read the checklist from `/.agents/rules/persona-gstack-review.md` (or the referenced bit-for-bit checklists).
2. Check for Greptile comments if applicable (Step 2.5).
3. Execute Pass 1 (CRITICAL): SQL safety, Race conditions, LLM trust boundaries, Enum completeness.
4. Execute Pass 2 (INFORMATIONAL): Side effects, Magic numbers, Dead code, Test gaps, Bundle impact.
5. If `SCOPE_FRONTEND=true`, run the diff-scoped design review (Step 4.5).

## Phase 3: The Fix Loop
1. Classify findings into AUTO-FIX or ASK per the Fix-First heuristic.
2. Auto-fix all AUTO-FIX items and report.
3. Batch-ask about ASK items using the designated `AskUserQuestion` format.
4. Apply user-approved fixes and verify.

## Phase 4: Verification & Escalation
1. Cross-reference against `TODOS.md` and check for documentation staleness.
2. Run auto-scaled Adversarial Review (Step 5.7) based on diff size (Codex/Antigravity subagent).
3. Synthesize findings and report final status: **DONE**, **DONE_WITH_CONCERNS**, **BLOCKED**, or **NEEDS_CONTEXT**.



