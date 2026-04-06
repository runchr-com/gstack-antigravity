// turbo-all
---
description: Fully automated release engine for merging, testing, and shipping.
---

# /ship Workflow
This workflow is governed by [.agents/rules/persona-gstack-ship.md](/.agents/rules/persona-gstack-ship.md).

## Step 1: Pre-flight
1. **Branch Check:** Verify current branch is not the base branch using `git branch`.
2. **Status Check:** Run `git status` to ensure work is ready.
3. **Diff Analysis:** Run `git diff <base>...HEAD --stat` to grasp change scope.

## Step 2: Dashboard
1. **Review Readiness:** Execute `gstack-review-read` (mapped to native terminal) to display the Review Readiness Dashboard.
2. **Verdict:** Ensure Eng Review is CLEAR. If not, trigger the Override logic as defined in the persona rule.

## Step 3: Merge
1. **Fetch & Merge:** `git fetch origin <base> && git merge origin/<base> --no-edit`.
2. **Atomic Merge Guard:**
   - If `git merge` returns a non-zero exit code (conflict detected):
     - **STOP** immediately.
     - **Do NOT** attempt to commit, fix, or run tests.
     - Run `git diff --name-only --diff-filter=U` to list conflicting files.
     - Use `AskUserQuestion` to ask the user for:
       - A) Manual resolution
       - B) Automated 'Ours' strategy (`git checkout --ours .`)
       - C) Automated 'Theirs' strategy (`git checkout --theirs .`)
       - D) Abort ship
   - This prevents accidentally committing merge markers (`<<<<<<< HEAD`) into the repository.

## Step 4: Test
1. **Execution:** Run the test suite (e.g., `npm run test` or `bin/test-lane`).
2. **Verification:** Inspect output. If failures exist, STOP and trigger Test Failure Ownership Triage.

## Step 5: Eval
1. **Prompt Analysis:** If prompt files (builders, services, scorers) are in the diff, run the relevant Eval suites.
2. **Quality Gate:** If evals fail or regress, STOP.

## Step 6: Coverage
1. **Audit:** Perform a Test Coverage Audit (100% path coverage goal).
2. **Diagram:** Generate and display the ASCII coverage diagram.
3. **Augment:** If gaps exist, generate missing tests (up to 20) and verify they pass.

## Step 7: Review
1. **Checklist Pass 1 (Critical):** SQL, Data Safety, LLM Trust Boundary.
2. **Checklist Pass 2 (Info):** Code quality, naming, design-system alignment.
3. **Adversarial:** Run auto-scaled adversarial review (Antigravity subagent and Codex if available).
4. **Fix-First:** Auto-fix mechanical issues and present ASK items for user decision.

## Step 8: Ship
1. **Version Bump:** Auto-decide bump level (MICRO/PATCH) and update `VERSION`.
2. **CHANGELOG:** Auto-generate entries from the full branch diff.
3. **TODOS:** Auto-mark completed items in `TODOS.md`.
4. **Commit Logic (Bisectable Chunks):**
5. **Push:** `git push -u origin <branch>`.
6. **PR Creation:** `gh pr create` with full body summary including Test Coverage, Review findings, and Eval results.
7. **Auto-Document:** Trigger `/document-release` workflow to sync docs.

---

### Step 8.4: Commit Logic (Bisectable Chunks)

Analyze the total diff and group into coherent, independently valid units:

1. **Infrastructure:** Stage migrations, config files, and route changes first.
   ```bash
   git add <infra-files>
   git commit -m "infra: setup <module> infrastructure"
   ```

2. **Models & Services:** Stage logic files with their corresponding test files.
   ```bash
   git add <model-files> <test-files>
   git commit -m "feat: implement <service> logic and tests"
   ```

3. **Controllers & View:** Stage UI files and interaction layers.
   ```bash
   git add <ui-files> <component-tests>
   git commit -m "feat: add <feature> interface"
   ```

4. **Meta:** Stage VERSION, CHANGELOG, and TODOS.md as the final commit.
   ```bash
   git add VERSION CHANGELOG.md TODOS.md
   git commit -m "chore: bump version to vX.Y.Z.W and update changelog"
   ```

**Rules:**
- A logic file and its test MUST be in the same commit.
- Each commit must pass tests independently (dependencies first).
- Use `git commit -m` directly in the native terminal.

