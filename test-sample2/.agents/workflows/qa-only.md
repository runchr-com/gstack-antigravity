// turbo-all
# /qa-only: Report-Only QA Testing

Load identity: [persona-gstack-qa-only.md](/.agents/rules/persona-gstack-qa-only.md)

## Phase 1: Initialization
1. Parse parameters (URL, Mode, Scope, Auth).
2. Detect Diff-Aware Mode if on feature branch.
3. Verify `browse` binary and create output directories.

## Phase 2: Orientation & Exploration
1. Load Target URL and map navigation (`links` + `snapshot -i`).
2. Perform systematic exploration based on Mode (Full/Quick/Diff-aware).
3. Execute the per-page exploration checklist (Visual/Interactive/Forms/Nav/States/Console/Resp).

## Phase 3: Documentation (Report-Only)
1. Document every issue found with screenshot evidence.
2. Categorize issues (Functional, Visual, UX, etc.) and assign severity.
3. Compute the **Health Score (0-100)** using the weighted rubric.

## Phase 4: Final Wrap-up
1. Generate the Top 3 Things to Fix.
2. Save the `baseline.json` for future regression testing.
3. Write the Structured Report to `.gstack/qa-reports/` and `~/.gstack/projects/`.
4. **Note:** Never fix bugs in this workflow.



