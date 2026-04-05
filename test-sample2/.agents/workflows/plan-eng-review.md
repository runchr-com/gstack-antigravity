// turbo-all
# /plan-eng-review: Architecture & Execution Review

Load identity: [persona-gstack-plan-eng-review.md](/.agents/rules/persona-gstack-plan-eng-review.md)

## Phase 1: Scope Challenge (Step 0)
1. Perform the System Audit (history, diff, todos, pain points).
2. Run the Scope Challenge:
   - What existing code already solves this?
   - What is the minimum set of changes?
   - Complexity check (8+ files / 2+ classes).
   - Search for built-ins/best practices.
3. If no design doc, offer `/office-hours`.

## Phase 2: Multi-Pass Review
1. **Architecture Review:** System design, data flow diagrams, security, rollback.
2. **Code Quality Review:** Organization, DRY, error handling, ASCII diagrams.
3. **Test Review:** Create the Test Diagram (UX/Data/Codepaths). Identify gaps.
4. **Performance Review:** N+1 queries, memory, caching, complexity.

## Phase 3: Verification & Reporting
1. Produce the Test Plan Artifact for downstream consumption by `/qa`.
2. Update `TODOS.md` with deferred work.
3. Generate the Completion Summary and display the Review Readiness Dashboard.
4. Update the plan file with the `## GSTACK REVIEW REPORT` section.



