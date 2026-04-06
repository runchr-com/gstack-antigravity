---
description: Initialize gStack-Antigravity, build browser binaries, and verify skills.
---

# /gstack-setup: gStack-Antigravity Initialization

This workflow ensures the workspace is ready for gStack-Antigravity operations across all platforms.

// turbo
## Phase 1: Environment Detection
1. Detect Operating System (Mac, Linux, or Windows).
2. Check for prerequisites: `node`, `npm`/`bun`, `git`, and `gh`.
3. Detect installation mode: **Local Clone** (scripts/ exists) or **NPX/Library** (only .agents/ exists).

// turbo
## Phase 2: Skill Installation
1. If in a **Local Clone**:
   - On **Mac/Linux**: Run `./scripts/install-antigravity-skill.sh copy`.
   - On **Windows**: Run `powershell ./scripts/install-antigravity-skill.ps1 -Mode copy`.
2. If in **NPX/Library** mode:
   - Verify `.agents/skills/gstack` exists. If not, alert the user to re-run `npx @runchr/gstack-antigravity`.

## Phase 3: Browser Setup
1. Check if the `browse` binary is built:
   - Unix: `.agents/skills/gstack/browse/dist/browse`
   - Windows: `.agents/skills/gstack/browse/dist/browse.exe`
2. If binary is missing:
   - Tell the user: "gstack browse needs a one-time build (~10 seconds)."
   - Run: `cd .agents/skills/gstack/browse && ./setup`
   - **Tip**: If in a corporate network with download restrictions, the user can run `/gstack-setup --skip-browser` to skip Playwright Chromium installation and install it manually later via `npx playwright install chromium`.

// turbo
## Phase 4: Project Context (Branding)
1. Check for project context files: `AGENT.md`, `README.md`, or `CLAUDE.md`.
2. **De-Claude-ify**: 
   - If `CLAUDE.md` exists, offer to rename it to `AGENT.md` or `README_CONTEXT.md` to align with the Antigravity port.
   - If no context file exists, offer to create a baseline `AGENT.md` with:
     ```markdown
     # Project Context
     ## Test Commands
     - Unit: npm test
     ## Build Commands
     - Build: npm run build
     ```

// turbo
## Phase 5: Verification
1. Run a smoke test: `/office-hours` (informational only).
2. Confirm `.gstack/` is in `.gitignore`.
3. Report final status: **DONE**.
