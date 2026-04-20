---
description: Initialize gStack-Antigravity, verify shared engine, and establish workspace isolation.
---

# /gstack-setup: gStack-Antigravity Synchronization

This workflow ensures the workspace is ready for gStack-Antigravity operations, utilizing a shared global engine while maintaining local isolation.

// turbo
## Phase 1: Environment Detection
1. Detect Operating System (Mac, Linux, or Windows).
2. Check for prerequisites: `node`, `npm`/`bun`, `git`, and `gh`.
3. Detect installation mode: **Local Clone** (scripts/ exists) or **Initialized Workspace** (only .agents/ exists).

// turbo
## Phase 2: Project Initialization (Auto-Bootstrap)
1. Verify if the local skill router exists at `.agents/skills/gstack`.
2. **If missing (Self-Bootstrap)**:
   - Identify the global engine store: `~/.gemini/antigravity/skills/gstack`.
   - If found, **automatically initialize the project**:
     - Link the engine: `ln -s ~/.gemini/antigravity/skills/gstack .agents/skills/gstack`.
     - Copy latest rules and workflows from the engine if needed.
     - You may also run `gstack-antigravity init` if the command is available in PATH.
   - If the global engine is also missing, explain to the user that they must install the package first: `npm install -g @runchr/gstack-antigravity`.
3. Check if the skill is linked to the **Standard Global Store**.
   - If it is a hard copy instead of a symlink, recommend switching to a linked setup for better performance and updates.

// turbo
## Phase 3: Browser Setup (Shared)
1. Check if the `browse` binary is built in the shared engine:
   - Unix: `.agents/skills/gstack/browse/dist/browse`
   - Windows: `.agents/skills/gstack/browse/dist/browse.exe`
2. If binary is found: 
   - Inform user: "✅ Shared browsing engine detected. Skipping build."
3. If binary is missing:
   - Inform user: "gstack browse needs a one-time setup (~10 seconds)."
   - Run: `cd .agents/skills/gstack/browse && ./setup`
   - **Tip**: If in a corporate network, run `/gstack-setup --skip-browser` then install manually via `npx playwright install chromium`.

// turbo
## Phase 4: Project Context & Isolation
1. Check for project context files: `AGENT.md`, `README.md`, or `CLAUDE.md`.
2. **De-Claude-ify**: Offer to rename `CLAUDE.md` to `AGENT.md`.
3. **Verify Git Isolation**: Confirm `.gstack/` is in `.gitignore`.
4. Ensure the agent is aware that all work logs must stay in `./.gstack/`.

// turbo
## Phase 5: Verification
1. Run a smoke test: `/office-hours` (informational only).
2. Report final status: **DONE**.
