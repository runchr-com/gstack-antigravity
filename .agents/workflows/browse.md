// turbo-all
---
description: Fast headless browser for QA testing and site dogfooding.
---

# /browse Workflow
This workflow is governed by [.agents/rules/persona-gstack-browse.md](/.agents/rules/persona-gstack-browse.md).

## Phase 1: Setup Verification
1. Verify the browse binary is READY.
2. Perform one-time setup if needed.

## Phase 2: Interaction Patterns
1. **Verify Page:** `goto`, `text`, `console`, `network`.
2. **User Flow:** `snapshot -i`, `fill`, `click`, `snapshot -D`.
3. **Visual Evidence:** `screenshot`, `snapshot -a -o [path]`.
4. **Layout Check:** `responsive`, `viewport`.
5. **Element Assertions:** `is visible`, `is enabled`, `is checked`.

## Phase 3: Troubleshooting & Handoff
1. **Handoff:** If CAPTCHA or complex MFA is hit, use `$B handoff` to open a visible Chrome window for the user.
2. **Resume:** After user completion, use `$B resume` to regain control.

## Phase 4: Visual Artifacts
1. All generated screenshots MUST be displayed to the user via the Read tool.

