// turbo-all
---
description: Multi-AI Second Opinion (Code Review, Challenge, Consult).
---

# /codex Workflow
This workflow is governed by [.agents/rules/persona-gstack-codex.md](/.agents/rules/persona-gstack-codex.md).

## Phase 0: Environment Check
1. Detect the target base branch (`main` fallback).
2. Verify `codex` CLI binary is installed.

## Phase 1: Detect Mode
1. **Review:** Code review against the diff.
2. **Challenge:** Adversarial mode to find edge cases/exploits.
3. **Consult:** Architecture discussion or plan review.

## Phase 2A: Review Mode
1. Run `codex review --base <branch>`.
2. **Gate Verdict:** If `[P1]` findings exist, Gate is **FAIL**.
3. **Cross-Model Analysis:** Compare findings with Antigravity's `/review` if available.
4. **Log:** Write results to review log.

## Phase 2B: Challenge Mode
1. Trigger adversarial prompt targeting potential failure modes, race conditions, or security holes.
2. Stream and display reasoning traces (`[codex thinking]`).

## Phase 2C: Consult Mode
1. Check for existing session ID in `.context/codex-session-id`.
2. Perform plan file review if a plan is active.
3. Stream consultation output and save session context.

## Phase 3: Synthesis
1. Display the full output verbatim.
2. Provide Antigravity's own synthesis and flag any disagreements.

