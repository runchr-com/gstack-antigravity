// turbo-all
---
description: Systematically QA test a web application and fix bugs found.
---

# /qa Workflow
This workflow is governed by [.agents/rules/persona-gstack-qa.md](/.agents/rules/persona-gstack-qa.md).

## Phase 1: Setup & Bootstrap
1. **Target URL Detection:**
   - Check request parameters or feature branch diff.
   - Detect running app on local ports (:3000, :4000, :8080).
   - If no URL found, ask the user.
2. **Test Framework Bootstrap:**
   - Detect runtime (Node, Ruby, Python, etc.) and existing test suites.
   - If no suite detected, research best practices and offer to bootstrap.
   - Create minimal config and example tests if approved.

## Phase 2: Orientation & Auth
1. **Orient:** Map navigation structure and detect the app framework.
2. **Authenticate:** If credentials provided, perform login or import cookies.

## Step 4-5: Explore & Document
1. **Systematic Navigation:** Visit reachable pages (Quick, Standard, or Exhaustive tier).
2. **Checklist:** Perform visual scan, test interactive elements, forms, and responsiveness.
3. **Immediate Documentation:**
   - Document each issue as it's found.
   - Capture "Before" screenshot and console errors.
   - Write to the report (.gstack/qa-reports/) immediately.

## Phase 6-7: Wrap Up & Triage
1. **Health Score:** Calculate weighted health score (Console, Links, Functional, etc.).
2. **Triage:** Sort by severity and filter based on the active Tier.

---

### Phase 8: The Fix Loop (Recursive)

For each fixable issue identified in Phase 7:

1. **Locate Source:**
   - Use `grep` for error text or component names.
   - Use `glob` to find relevant view/controller files.
2. **Minimal Fix:**
   - Read context and apply the smallest possible change to resolve the issue.
   - Do NOT perform unrelated refactorings.
3. **Atomic Commit:**
   - `git add <only-fixed-files>`
   - `git commit -m "fix(qa): ISSUE-NNN ??[short description]"`
4. **Re-test:**
   - Navigate to the affected page.
   - Capture "After" screenshot.
   - Run `$B snapshot -D` to verify the fix evidence.
5. **Regression Test:**
   - Create a new test file matching the project's existing patterns.
   - Verify the test passes before continuing.

#### Self-Regulation (Stop & Evaluate)
After every **5 fixes** (or any revert), calculate the **WTF-likelihood**:
- Base: 0%
- Each revert: +15%
- Each fix > 3 files: +5%
- Fix 15+: +1% per fix
- Touching unrelated files: +20%

**IF WTF > 20%:** STOP immediately and request user review of progress.

---

## Phase 9-11: Finalization
1. **Final QA:** Re-run the full suite to detect regressions.
2. **Final Report:** Update the report with fix status and health score delta.
3. **TODOS Update:** Sync findings and fixes with `TODOS.md`.

